// module.exports = function (app) {
//     var controller = app.controllers.user;

//     var authService = require('../services/authService');

//     app.route('/user/profile')
//         .get(authService().isAuthenticated, controller.profile);

//     app.route('/user')
//         .get(authService().isAuthenticated, controller.findAll)
//         .post(authService().isAuthenticated, controller.create)
//         .put(authService().isAuthenticated, controller.update);

//     app.route('/user/:id')
//         .get(authService().isAuthenticated, controller.findOne)
//         .delete(authService().isAuthenticated, controller.delete);



// }