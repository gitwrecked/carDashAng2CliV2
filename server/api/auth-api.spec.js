var frisby = require('frisby');

frisby.create('User login')
    .post('http://localhost:3001/api/v1/auth/login')
    .expectStatus(400)
    .toss();
