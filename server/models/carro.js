
var mongoose = require('mongoose');

module.exports = function(){

    var schema = mongoose.Schema({
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
