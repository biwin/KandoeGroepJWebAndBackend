var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    CircleSessionApi = require('./app/backend/restApi/circleSessionApi.js'),
    ThemeApi = require('./app/backend/restApi/themeApi.js'),
    UserApi = require('./app/backend/restApi/userApi.js'),
    morgan = require('morgan'),
    server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
    server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/static', express.static('node_modules'));
app.use('/app/frontend/', express.static('app/frontend/'));
app.use('/app/backend/model', express.static('app/backend/model'));

/*app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});*/

var server = app.listen(server_port, server_ip_address, function() {
    console.log('Listening on port %d', server.address().port);
    console.log(__dirname);
});

app.get('/', function(req, res) {
    res.sendfile('static/html/index.html');
});

//region user routes

app.get('/api/user/get', function(req, res) {
    console.log(UserApi.UserApi.getUser(req.query.id, res));
});

app.get('/api/user/createDummy', function(req, res) {
    console.log(UserApi.UserApi.createDummyUser(res));
});

//endregion

//region circlesession routes
app.get('/api/circlesessions', function(req, res){
   CircleSessionApi.CircleSessionApi.findAll(res);
});

app.get('/api/circlesessions/:id', function(req, res){
    CircleSessionApi.CircleSessionApi.find(req.params.id, res);
});

app.post('/api/circlesessions', function(req, res) {
    CircleSessionApi.CircleSessionApi.createCircleSession(req.body, res);
});

//endregion

//region theme routes
app.get('/api/themes', function(req, res) {
    ThemeApi.ThemeApi.findAll(res);
});

app.post('/api/themes', function(req, res) {
    ThemeApi.ThemeApi.create(req.body, res);
});

app.get('/api/themes/:id/cards', function(req, res) {
    ThemeApi.ThemeApi.getCards(req.params.id, res);
});

app.get('/api/themes/:id', function(req, res){
   ThemeApi.ThemeApi.find(req.params.id, res);
});

app.post('/api/themes/:id', function(req, res) {
    ThemeApi.ThemeApi.createCard(req.body, req.params.id, res);
});
//endregion

//region auth routes
app.post('/api/user/login', function(req, res) {
    var token = req.header('Bearer');
    if (token != null && token != "") {
        res.send("You are already logged in");
    } else {
        UserApi.UserApi.getUser(req.body.username, req.body.password, res);
    }
});

app.post('/api/user/register', function(req, res) {
    var token = req.header('Bearer');
    if (token != null && token != "") {
        res.send("You are already registered");
    } else {
        UserApi.UserApi.createUser(req.body.username, req.body.email, req.body.password, req.body.registrar, res);
    }
});

app.post('/api/user/login-facebook', function(req, res) {
    console.log("hi");
    var token = req.header('Bearer');
    if (token != null && token != "") {
        res.send("You are already logged in");
    } else {
        UserApi.UserApi.getFacebookUser(req.body.facebookId, req.body.name, req.body.registrar, res);
    }
});

app.get('*', function(req, res) {
    res.sendfile("static/html/index.html");
});

//endregion