var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    mongoose = require('mongoose'),
    config = require('./variables');
    // Usuario = require('../models/user');

module.exports = function(){

    var Usuario = mongoose.model('Usuario');

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    var opts = {};
    opts.secretOrKey = config.secret;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();

    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        Usuario.findOne({_id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy(
        {
            clientID: config.facebookAuth.clientID,
            clientSecret: config.facebookAuth.clientSecret,
            callbackURL: config.facebookAuth.callbackURL,
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        function (token, refreshToken, profile, done) {

            process.nextTick( function () {

                /*Usuario.findOrCreate(
                    {'facebook.id': profile.id},
                    {
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        facebook: {
                            id: profile.id,
                            token: token
                        }
                    },
                    function(error, usuario){
                        if(error) {
                            return done(error);
                        }
                        return done(null, usuario);
                    }
                );*/

                Usuario.findOne({'facebook.id': profile.id}, function(err, user) {
                 if (err) {
                 return done(err, false);
                 }
                 if (user) {
                 done(null, user);
                 } else {

                 var usuario = new Usuario();
                 usuario.name = profile.displayName;
                 usuario.email = profile.emails[0].value;
                 usuario.facebook = {
                 id: profile.id,
                 token: token
                 };
                 usuario.save(function (err) {
                 if(err){
                 throw err;
                 }
                 return done(null, usuario);

                 });

                 }
                 });

            } );

        }
    ));


    // indica ao passport para serializar apenas o _id do usuário, para não onerar a memória
    passport.serializeUser(function(usuario, done) {
        done(null, usuario._id);
    });

    // recebe o _id do usuario armazenado na sessão e realiza a desserialização
    passport.deserializeUser(function(id, done) {
        Usuario.findById(id).exec()
            .then(function(usuario) {
                done(null, usuario);
            });
    });

};