var frisby = require('frisby');

var server    = 'http://localhost:';
var port      = '3001';
var testEmail = new Date().getMilliseconds().toString().concat('@email.com');
var testToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTAzQGVtYWlsLmNvbSIsImlhdCI6MTQ4MjQzNzUxNiwiZXhwIjoxNDgyNTIzOTE2fQ.2xoSbf2S0P1Jb9jtYYiVYjI5kYcQnqDnbOQp696L_a0';
var testUser =
    {}

    frisby.create('User register')
        .post(
            server.concat(port).concat('/api/v1/auth/register'),
            {email: testEmail, password: 'password'}, {json: true})
        .inspectRequest()
        .expectStatus(201)
        .expectJSONTypes(
            {success: Boolean, msg: String, cd_token: String, email: String})
        .afterJSON(function(res) {
          testToken = res.cd_token
        })
        .toss();

frisby.create('User login')
    .post(
        server.concat(port).concat('/api/v1/auth/login'),
        {email: testEmail, password: 'password'}, {json: true})
    .inspectRequest()
    .expectStatus(200)
    .expectJSONTypes({
      success: Boolean,
      msg: String,
      cd_token: String,
      email: String,
      admin: Boolean
    })
    .afterJSON(function(res) {
      testToken = res.cd_token
    })
    .toss();

frisby.create('Retrieve All Users')
    .get(server.concat(port).concat('/api/v1/user/'))
    .inspectRequest()
    .expectStatus(200)
    .expectJSONTypes({success: Boolean, msg: String, users: Array})
    .toss();

frisby.create('Retrieve User')
    .get(
        server.concat(port).concat('/api/v1/user/').concat(testEmail),
        {headers: {'Content-Type': 'application/json', 'cd_token': testToken}})
    .inspectRequest()
    .expectStatus(200)
    .expectJSONTypes({msg: String, user: Array, success: Boolean})
    .afterJSON(function(res) {
      testUser = res.user;
    })
    .toss();

frisby.create('Update User')
    .put(
        server.concat(port).concat('/api/v1/user/').concat(testEmail), testUser,
        {headers: {'Content-Type': 'application/json', 'cd_token': testToken}})
    .inspectRequest()
    .expectStatus(201)
    .expectJSONTypes({msg: String, success: Boolean})
    .toss();

frisby.create('Delete User')
    .get(
        server.concat(port).concat('/api/v1/user/').concat(testEmail),
        {headers: {'Content-Type': 'application/json', 'cd_token': testToken}})
    .inspectRequest()
    .expectStatus(200)
    .expectJSONTypes({msg: String, success: Boolean})
    .toss();
