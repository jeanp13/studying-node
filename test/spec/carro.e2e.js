"use strict";

var assert = require('assert'),
    expect = require('chai').expect,
    should = require('chai').should(),
	sinon = require('sinon'),
	mongoose = require('mongoose'),
    request = require('supertest'),
    app = require("../../server.js"),
    agent = request.agent(app);

describe('Carro CRUD integration testing', function () {

    describe("Get All", function (done) {

        var expectedResult = [
            {
                "_id": "57ed27e534e375050ce548de",
                "modelo": "320i",
                "marca": {
                    "_id": "57db1fc6bd86ca728590ba1b",
                    "nome": "BMW",
                    "__v": 0
                },
                "__v": 0
            }
        ];


        it("GET /carro", function (done) {
            request(app)
                .get('/carro')
                .set('Accept', 'application/json')
                .expect(
                    function (response) {
                        response = 123;
                    }
                )
                // .expect(200, expectedResult, done);
                .end(function (err, result) {
                    console.log("RESULT = ", result.body)
                    console.log("STATUS = ", result.status)
                    done();
                })
        });

    });

});