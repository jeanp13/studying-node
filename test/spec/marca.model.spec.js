'use strict' //http://www.w3schools.com/js/js_strict.asp

// Module dependencies.
var assert = require('assert');
var should = require('chai').should();
var expect = require('chai').expect;
var mongoose = require("mongoose");

// import mongoose model
var Marca = require('../../server/models/marca')();


describe('Marca Model', function(){

    before(function(done){
        mongoose.connect('mongodb://localhost/numap-dev');
        Marca.remove().exec();
        done();
    });

    it("should be empty", function(done){
        Marca.count({}, function(err, response){
            should.not.exist(err);
            response.should.equal(0);
            done();
        });
    });

    describe("Create()", function(done){

        it("should create when valid", function(){
            var marca = { nome: "Bulgati" };
            Marca.create(marca, function (err, response){
                should.not.exist(err);
                response.nome.should.equal("Bulgati");
                done();
            });
        });

        it("should not create when invalid", function(){
            var marca = {};
            Marca.create(marca, function(err, response){
                should.exist(err);
                done();
            });
        });


        it("should have just one register", function(){
            Marca.count({}, function(err, response){
                should.not.exist(err);
                response.should.equal(0);
                done();
            });
        });

    });

});
