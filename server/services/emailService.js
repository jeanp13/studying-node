// module.exports = function (app) {

//     var nodemailer = require('nodemailer');
//     var config = require('../config/variables');

//     var nodemailer = require('nodemailer');
//     var generator = require('xoauth2').createXOAuth2Generator(config.smtpConfig);

//     generator.getToken(function(err, token){
//         if(err){
//             return console.log(err);
//         }
//         console.log("AUTH XOAUTH2 " + token);
//     });

//     var transporter = nodemailer.createTransport(({
//         service: 'gmail',
//         auth: {
//             xoauth2: generator
//         }
//     }));

//     var resetPassowrdHtml = ""

//     var functions = {};
    
//     functions.test = function () {
//         return 'teste';
//     }
    
//     /*
//     * mailOptions = {
//     * from:
//     * to:
//     * subject:
//     * generateTextFromHTML : true | false
//     * html
//     * }
//     */
//     functions.sendEmail = function(mailOptions, callback){

//         console.log(transporter);

//         transporter.sendMail(mailOptions, function(error, response) {
//             if (error) {
//                 callback(error, null);
//             } else {
//                 callback(null, response);
//             }
//         })
//     }

//     return functions;

// }