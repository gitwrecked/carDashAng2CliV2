var frisby = require('frisby');

frisby.create('Add a purchase to a user')
    .post('http://localhost:3001/api/v1/purchase/')
    .expectStatus(401)
    .toss();
