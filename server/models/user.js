var mongoose = require('mongoose'),
    findOrCreate = require('mongoose-findorcreate'),
    bcrypt = require('bcryptjs');

module.exports = function(){

    var schema = mongoose.Schema({
        name:{ type: String, required: true },
        email: { type:String, required: true, unique: true},
        picture: {type: String },
        local:{
            password: {type: String}
        },
        facebook: {
            id: {type: String}
        },
        inclusao: { type: Date, default: Date.now }
    });
    schema.plugin(findOrCreate);

    //http://blog.matoski.com/articles/jwt-express-node-mongoose/
    schema.pre('save', function (next) {
        var user = this;
        // if (this.isModified('local.password') || this.isNew) {
        if (user.local.password != null) {
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    return next(err);
                }
                bcrypt.hash(user.local.password, salt, function (err, hash) {
                    if (err) {
                        return next(err);
                    }
                    user.local.password = hash;
                    next();
                });
            });
        } else {
            return next();
        }
    });

    schema.methods.comparePassword = function (passw, cb) {
        bcrypt.compare(passw, this.local.password, function (err, isMatch) {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    }

    return mongoose.model('Usuario', schema);

}