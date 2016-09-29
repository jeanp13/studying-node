// module.exports = function (app) {

//     var moment = require('moment');
//     var jwt = require('jwt-simple');
//     var User = app.models.user;
//     var config = require('../config/variables');
//     var authService = require('../services/authService')();
//     var emailService = require('../services/emailService')();
//     var request = require('request');

//     var ejs = require('ejs');
//     var fs = require('fs');

//     function createJWT(user) {
//         var payload = {
//             sub: user._id,
//             iat: moment().unix(),
//             exp: moment().add(14, 'days').unix()
//         };
//         return jwt.encode(payload, config.secret);
//     }

//     function createLinkToken(email, accessKey) {
//         var payload = {
//             user: email,
//             accessKey: accessKey,
//             iat: moment().unix(),
//             exp: moment().add(24, 'hours').unix()
//         };
//         return jwt.encode(payload, config.secret);
//     }


//     var controller = {

//         resetPassword: function(req, res){

//             console.log('Controller = '+req.body.email);

//             if (!req.body.email) {
//                 res.status(500).json({message: 'Please inform your email.'});
//             } else {

//                 User.findOne({email: req.body.email}, function (error, user) {
//                     console.log(user);

//                     if(user){

//                         var accessKey = authService.epicRandomString(6);
//                         var mailOptions = {
//                             from: "numap.app@gmail.com",
//                             to: "millysfabrielle@gmail.com",
//                             subject: "Recuperação de senha",
//                             generateTextFromHTML: true
//                         };

//                         fs.readFile(__dirname+'/../views/resetPassword.html', 'utf-8', function(err, content) {
//                             if (err) {
//                                 return res.status(500).json({message: 'Internal error while loading email template. '+ err});
//                             }

//                             var linkToken = createLinkToken(user.email, accessKey);

//                             mailOptions.html = ejs.render(content, {name: user.name, accessKey: accessKey, linkToken: linkToken});  //get redered HTML code

//                             emailService.sendEmail(mailOptions, function(error, response) {
//                                 if (error) {
//                                     return res.status(500).json({message: 'Internal error while sending email. '+error});
//                                 } else {
//                                     return res.status(200).json({message: 'Email sent'});
//                                 }
//                             });
//                         });


//                     } else {
//                         res.status(404).send({message: 'User not founded.'});
//                     }
//                 });
//             }


//         },
//         signUp: function(req, res){

//             if (!req.body.name || !req.body.password) {
//                 res.status(500).json({message: 'Please pass name and password.'});
//             } else {

//                 User.findOne({email: req.body.email}, function (error, fetchedUser) {

//                     if(fetchedUser){
//                         res.status(409).send({message: 'E-mail already exists'});
//                     }

//                     var user = new User();
//                     user.name = req.body.name;
//                     user.email = req.body.email;
//                     user.local.password = req.body.password;

//                     User.create(user).then(
//                         function(response) {
//                             res.send({token: createJWT(user)});
//                         },
//                         function(error) {
//                             res.status(500).send({message: error.message});
//                         }
//                     );

//                 });
//             }
//         },
//         logIn: function(req, res){
//             User.findOne({email: req.body.email}, function (error, fetchedUser) {
//                 if(fetchedUser == null){
//                     return res.status(401).send({message: 'Invalid email and/or password'});
//                 } else {
//                     fetchedUser.comparePassword(req.body.password, function (error, isMatch) {
//                         if (!isMatch) {
//                             return res.status(401).send({message: 'Invalid email and/or password'});
//                         }
//                         res.send({token: createJWT(fetchedUser)});
//                     });
//                 }
//             });
//         },
//         facebookLogIn: function (req, res) {

//             var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
//             var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
//             var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
//             var params = {
//                 code: req.body.code,
//                 client_id: req.body.clientId,
//                 client_secret: config.facebookAuth.clientSecret,
//                 redirect_uri: req.body.redirectUri
//             };

//             // Step 1. Exchange authorization code for access token.
//             request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {

//                 if (response.statusCode !== 200) {
//                     return res.status(500).send({ message: accessToken.error.message });
//                 }

//                 // Step 2. Retrieve facebook profile information about the current user.
//                 request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {

//                     if (response.statusCode !== 200) {
//                         return res.status(500).send({ message: profile.error.message });
//                     }

//                     /*
//                     If TRUE means that user already have one Authorization header set
//                         1 - Try find users by their facebook profile ID
//                           - IF FOUND, means that user already exist and is authenticated, send back with status 409
//                           - IF NOT FOUND, means that user does not have a facebook linked account, try to find the
//                             authenticated user to attach facebook account
//                     */

//                     if (req.header('Authorization')) {

//                         User.findOne({ 'facebook.id': profile.id }, function(err, existingUser) {
//                             if (existingUser) {
//                                 return res.status(409).send({ message: 'There is already a Facebook account that belongs to you' });
//                             }

//                             var token = req.header('Authorization').split(' ')[1];
//                             var payload = jwt.decode(token, config.secret);

//                             User.findById(payload.sub, function(err, user) {
//                                 if (!user) {
//                                     return res.status(400).send({ message: 'User not found' });
//                                 }
//                                 user.facebook = {id: profile.id};
//                                 user.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
//                                 user.name = user.displayName || profile.name;
//                                 user.save(function() {
//                                     var token = createJWT(user);
//                                     res.send({ token: token });
//                                 });
//                             });
//                         });
//                     } else {
//                         // Step 3. Create a new user account or return an existing one.

//                         /*
//                          * Means the user does not have an Authorization header
//                          * TRY find the user account though facebook id
//                          * IF FOUND - generate JWT token from existing user account
//                          * IF NOT FOUND - create new account and generate the token
//                          */

//                         User.findOne({ 'facebook.id': profile.id }, function(err, existingUser) {
//                             if (existingUser) {
//                                 var token = createJWT(existingUser);
//                                 return res.send({ token: token });
//                             }
//                             var user = new User();
//                             user.name = profile.name;
//                             user.email = profile.email;
//                             user.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
//                             user.facebook = {id: profile.id};

//                             user.save(function() {
//                                 var token = createJWT(user);
//                                 res.send({ token: token });
//                             });
//                         });
//                     }
//                 });
//             });


//         }
//     };
//     return controller;
// }
