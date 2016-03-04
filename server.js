var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    CircleSessionApi = require('./app/backend/restApi/circleSessionApi.js'),
    GroupAPI = require("./app/backend/restApi/groupAPI.js"),
    OrganisationAPI = require("./app/backend/restApi/organisationAPI.js"),
    ThemeApi = require('./app/backend/restApi/themeApi.js'),
    UserApi = require('./app/backend/restApi/userApi.js'),
    morgan = require('morgan'),
    server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
    server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/static', express.static('node_modules'));
app.use('/app/frontend/', express.static('app/frontend/'));
app.use('/app/backend/model', express.static('app/backend/model'));

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

app.get('/api/user/:id/groups', function(req,res){
    UserApi.UserApi.getGroups(req.params.id, res);
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

//region organisation routes
app.get("/api/organisations/:id", function(req, res) {
    OrganisationAPI.OrganisationAPI.find(req.params.id, res);
});

app.post("/api/organisations", function(req, res) {
    OrganisationAPI.OrganisationAPI.create(req.body, res);
});

app.get("/api/organisations/:id/groups", function(req, res) {
    OrganisationAPI.OrganisationAPI.getGroups(req.params.id, res);
});
//endregion

//region group routes
app.get("/api/groups/:id", function(req, res) {
    GroupAPI.GroupAPI.find(req.params.id, res);
});

app.post("/api/groups", function(req, res) {
    GroupAPI.GroupAPI.create(req.body, res);
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
        UserApi.UserApi.getUser(req.body.email, req.body.password, res);
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
    UserApi.UserApi.getFacebookUser(req.body.facebookId, req.body.email, req.body.pictureSmall, req.body.pictureLarge, req.body.name, req.body.registrar, res);
});

app.post('/api/user/change-profile', function(req, res) {
    var token = req.header('Bearer');
    if (token != null && token != "") {
        UserApi.UserApi.changeProfile(token, req.body.username, req.body.smallPicture, req.body.largePicture, res);
    } else {
        res.send("You are not logged in");
    }
});

app.post('/api/user/get-picture', function(req, res) {
    var token = req.header('Bearer');
    if (token != null && token != "") {
        UserApi.UserApi.getPicture(token, req.body.type, res);
    } else {
        res.send("You are not logged in");
    }
});

app.get('*', function(req, res) {
    res.sendfile("static/html/index.html");
});

//endregion