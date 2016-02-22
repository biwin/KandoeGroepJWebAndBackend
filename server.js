var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    UserApi = require('./app/backend/restApi/userApi.js'),
    morgan = require('morgan'),
    server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
    server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/static', express.static('node_modules'));
app.use('/app/frontend/components', express.static('app/frontend/components'));
app.use('/app/backend/restApi', express.static('/app/backend/restApi'));

app.get('/test', function(req, res) {
    res.sendfile('index.html');
});

var server = app.listen(server_port, server_ip_address, function() {
    console.log('Listening on port %d', server.address().port);
    console.log(__dirname);
});

app.get('/api/user/get', function(req, res) {
    console.log(UserApi.UserApi.getUser(req.query.id, res));
});

app.get('/api/user/createDummy', function(req, res) {
    console.log(UserApi.UserApi.createDummyUser(res));
});