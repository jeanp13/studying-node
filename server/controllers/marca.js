module.exports = function (app) {


    var Marca = app.models.marca;

    // objeto para agregar todas funções
    var controller = {}

    controller.findAll = function (req, res) {
        
        Marca.find().exec().then(
            function(response){
                res.json(response);
            },
            function(error){
                res.status(500).json(error);
            }
        );

    };

    controller.findOne = function (req, res) {
        var id = req.params.id;

        Marca.findById(id).exec().then(
            function(response){
                if(!response){
                    res.status(404).json("Marca não foi localizada!");
                }
                res.json(response);
            },
            function(error){
                res.status(500).json(error);
            }
        );
    };

    controller.delete = function (req, res) {
        var id = req.params.id;

        Marca.remove({"_id": id}).exec().then(
            function(){
                // 204 means no content
                res.status(204).end();
            },
            function(error){
                res.status(500).json(error);
            }
        );

    };

    controller.update = function(req, res){
        var id = req.body.id;

        Marca.findByIdAndUpdate(id, req.body).exec().then(
            function(response) {
                res.json(response);
            },
            function(error) {
                res.status(500).json(error);
            }
        );
    };

    controller.create = function(req, res){

        Marca.create(req.body).then(
            function(response) {
                // 201 means that post was created
                res.status(201).json(response);
            },
            function(error) {
                res.status(500).json(error);
            }
        );
    };


    return controller;

}