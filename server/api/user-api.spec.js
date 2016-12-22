var frisby = require('frisby');

frisby.create('Retrieve all users')
    .get('http://localhost:3001/api/v1/user/')
    .expectStatus(200)
    .toss();

frisby.create('Update a user')
    .post('http://localhost:3001/api/v1/user/')
    .expectStatus(400)
    .toss();