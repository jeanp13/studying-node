'use strict';

var CarroCtrl = function(app){

    var CarroModel = app.models.carro;

    var controller = {};

    controller.create = function (req, res){

        CarroModel.create(req.body).then(
            function(response) {
                // 201 means that post was created
                res.status(201).json(response);
            },
            function(error) {
                res.status(500).json(error);
            }
        );

    }

    controller.findAll = function (req, res) {
        
        CarroModel.find().populate('marca').exec().then(
            function(response){
                res.json(response);
            },
            function(error){
                res.status(500).json(error);
            }
        );

    }; 

    return controller;

}

module.exports = CarroCtrl;