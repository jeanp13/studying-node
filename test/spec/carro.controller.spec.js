"use strict";

var assert = require('assert'),
    expect = require('chai').expect,
	sinon = require('sinon'),
	mongoose = require('mongoose');

require('sinon-as-promised');
require('sinon-mongoose');

// import mongoose model
var CarroModel = require('../../server/models/carro')();
describe("Carro Controller", function(){
    describe("findAll()", function(){
        it("Should call find", function(done){
            var CarroMock = sinon.mock(CarroModel);
            CarroMock
                .expects("find")
                .chain('exec')
                .resolves('RESULT');
            CarroModel.find()
            .then(
                function(response){
                    CarroMock.verify();
                    CarroMock.restore();
                    assert.equal(response, 'RESULT');
                    done();
                }
            );
        });
    });
});