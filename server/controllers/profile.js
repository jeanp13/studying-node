// module.exports = function (app) {

//     var authService = require('../services/authService')();
//     var User = app.models.user;

//     var controller = {}

//     controller.getUserProfile = function (req, res) {

//         var decodedToken =  authService.restoreToken(req.headers);
//         if (decodedToken) {

//             console.log(decodedToken);

//             User.findOne({'_id': decodedToken.sub}).exec().then(
//                 function(response){
//                     if (!response) {
//                         return res.status(404).send('User Info failed. User not found.');
//                     } else {
//                         return res.json(response);
//                     }
//                 },
//                 function(error){
//                     res.status(500).json(error);
//                 }
//             );
//         } else {
//             return res.status(403).send('No token provided.');
//         }

//     };

//     return controller;

// }