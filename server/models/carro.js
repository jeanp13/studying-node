var mongoose = require("mongoose");

module.exports = function(){

    var schema = mongoose.Schema({
        nome: {
            type: String,
            required: true
        },
        modelo: {
            type: String,
            required: true
        },
        marca: {
            type: mongoose.Schema.ObjectId,
            ref: 'Marca'

        }

    });

    return mongoose.model('Carro', schema);

};