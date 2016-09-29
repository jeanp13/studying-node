// module.exports = function (app) {
//     var controller = app.controllers.category;
//     var authService = require('../services/authService');

//     app.route('/category')
//         .post(authService().isAuthenticated, controller.create);

//     app.route('/category/:id')
//         .get(authService().isAuthenticated, controller.findOne);
    
// }