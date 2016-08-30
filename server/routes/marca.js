module.exports = function(app){
    
    var controller = app.controllers.marca;

    app.route('/marca')
        .get( controller.findAll)
        .post(controller.create)
        .put(controller.update);

    app.route('/marca/:id')
        .get(controller.findOne)
        .delete(controller.delete);

}