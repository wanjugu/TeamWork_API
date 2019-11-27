
const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app');
//const request = require("request");
const base_url = "http://localhost:3000/";


    describe("GET All articles",function(){
        it("Should return status code 200", function(){
           return request(app)
           .get('/articles')
           .then(function(response){
               assert.equal(response.status,200)
           });
        });
    });

    describe("GET articles by id",function(){
        it("Should return status code 200", function(){
           return request(app)
           .get('/articles/id')
           .then(function(response){
               assert.equal(response.status,200)
           });
        });
    });
 
