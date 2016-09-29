// module.exports = function (app) {

//     var jwt = require('jwt-simple'),
//         mongoose = require('mongoose');
//     var config = require('../config/variables');

//     var Usuario = mongoose.model('Usuario');
//     var moment = require('moment');

//     var getToken = function(headers) {
//         if (headers && headers.authorization) {
//             var parted = headers.authorization.split(' ');
//             if (parted.length === 2) {
//                 return parted[1];
//             } else {
//                 return null;
//             }
//         } else {
//             return null;
//         }
//     };

//     var functions = {}

//     functions.epicRandomString = function (b){
//         for(var a=(Math.random()*eval("1e"+~~(50*Math.random()+50))).toString(36).split(""),c=3;c<a.length;c++)c==~~(Math.random()*c)+1&&a[c].match(/[a-z]/)&&(a[c]=a[c].toUpperCase());a=a.join("");a=a.substr(~~(Math.random()*~~(a.length/3)),~~(Math.random()*(a.length-~~(a.length/3*2)+1))+~~(a.length/3*2));if(24>b)return b?a.substr(a,b):a;a=a.substr(a,b);if(a.length==b)return a;for(;a.length<b;)a+=epicRandomString();return a.substr(0,b)
//     };

//     functions.restoreToken = function (headers) {
//         var token = getToken(headers);
//         return jwt.decode(token, config.secret);
//     };

//     functions.isAuthenticated = function (req, res, next) {
//         if (!req.header('Authorization')) {
//             return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
//         }
//         var token = req.header('Authorization').split(' ')[1];

//         var payload = null;
//         try {
//             payload = jwt.decode(token, config.secret);
//         }
//         catch (err) {
//             return res.status(401).send({ message: err.message });
//         }

//         if (payload.exp <= moment().unix()) {
//             return res.status(401).send({ message: 'Token has expired' });
//         }
//         req.user = payload.sub;
//         next();
//     };



//     return functions;

// }