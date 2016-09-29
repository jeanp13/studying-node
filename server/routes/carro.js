module.exports = function(app){
    
    var controller = app.controllers.carro;

    app.route('/carro')
        .post(controller.create)
        .get(controller.findAll);


}