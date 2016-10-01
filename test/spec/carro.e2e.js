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

        it("GET /carro", function (done) {
            request(app)
                .get('/carro')
                .set('Accept', 'application/json')
                .end(function (err, result) {

                    assert.equal(result.status, 404);
                    assert.equal(result.body[0].modelo, "320i");

                    console.log("RESULT = ", result.body)
                    console.log("STATUS = ", result.status)
                    done();
                })
        });

    });

});