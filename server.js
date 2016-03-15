var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

var bodyParser = require('body-parser'),
    CircleSessionApi = require('./app/backend/restApi/circleSessionApi.js'),
    GroupAPI = require("./app/backend/restApi/groupAPI.js"),
    OrganisationAPI = require("./app/backend/restApi/organisationAPI.js"),
    ThemeApi = require('./app/backend/restApi/themeApi.js'),
    UserApi = require('./app/backend/restApi/userApi.js'),
    ChatApi = require('./app/backend/restApi/chatApi.js'),
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

app.get('/', function (req, res) {
    res.sendfile('static/html/index.html');
});

//region user routes
app.get('/api/user/get', function (req, res) {
    UserApi.UserApi.getUser(req.query.id, res);
});

app.get('/api/user/bulk/:array', UserApi.UserApi.getUsers);
app.get('/api/user/:id/groups', GroupAPI.GroupAPI.getGroupsOfUserById);
app.get('/api/user/circlesessions', CircleSessionApi.CircleSessionApi.getCircleSessionsOfCurrentUser);
app.get('/api/user/organisations', UserApi.UserApi.getAllOrganisationsOfCurrentUser);
//endregion

//region circlesession routes
app.get('/api/circlesessions', CircleSessionApi.CircleSessionApi.findAll);
app.get('/api/circlesessions/:id', CircleSessionApi.CircleSessionApi.find);
app.post('/api/circlesessions', CircleSessionApi.CircleSessionApi.createCircleSession);
app.get('/api/circlesessions/:id/cards', CircleSessionApi.CircleSessionApi.getCircleSessionCards);
app.post('/api/circlesessions/:id/cards', CircleSessionApi.CircleSessionApi.initCardsForSession);
app.delete('/api/circlesessions/:id', CircleSessionApi.CircleSessionApi.deleteCircleSession);
app.post('/api/circlesessions/:id', CircleSessionApi.CircleSessionApi.addUser);
app.get('/api/circlesessions/:id/positions', CircleSessionApi.CircleSessionApi.getCardPositions);
app.post('/api/circlesessions/:id/positions', CircleSessionApi.CircleSessionApi.playCard);
app.get('/api/circlesessions/:id/chat', ChatApi.ChatApi.getMessages);
//endregion

//region organisation routes
app.get("/api/organisations/:id", function(req, res) {
    OrganisationAPI.OrganisationAPI.find(req.params.id, res);
});

app.post("/api/organisations", function(req, res) {
    OrganisationAPI.OrganisationAPI.create(req.body, res);
});

app.get("/api/organisations/:id/admins", function(req, res) {
    OrganisationAPI.OrganisationAPI.getAdmins(req.params.id, res);
});

app.get("/api/organisations/:id/groups", function(req, res) {
    OrganisationAPI.OrganisationAPI.getGroups(req.params.id, res);
});

app.get("/api/organisations/:id/members", function(req, res) {
    OrganisationAPI.OrganisationAPI.getMembers(req.params.id, res);
});

app.delete("/api/organisations/:id/members/:memberId", function(req, res) {
    OrganisationAPI.OrganisationAPI.deleteMemberById(req.params.memberId, req.params.id, res)
});

app.get("/api/organisations/:id/themes", function(req, res) {
    OrganisationAPI.OrganisationAPI.getThemes(req.params.id, res);
});
//endregion

//region group routes
app.get("/api/groups/:id", function(req, res) {
    GroupAPI.GroupAPI.find(req.params.id, res);
});

app.post("/api/groups", function(req, res) {
    GroupAPI.GroupAPI.create(req.body, res);
});

app.get("/api/groups/:id/members", function(req, res) {
    GroupAPI.GroupAPI.getMembers(req.params.id, res);
});

app.get("/api/groups/:id/organisation", function(req, res) {
    GroupAPI.GroupAPI.getOrganisation(req.params.id, res);
});
//endregion

//region theme routes
app.get('/api/themes', ThemeApi.ThemeApi.findAll);
app.post('/api/themes', ThemeApi.ThemeApi.create);
app.post('/api/themes/:id', ThemeApi.ThemeApi.createSubTheme);
app.get('/api/themes/:id/cards', ThemeApi.ThemeApi.getCards);
app.get('/api/themes/:id', ThemeApi.ThemeApi.find);
app.post('/api/themes/:id/cards', ThemeApi.ThemeApi.createCard);
app.delete('/api/themes/:id', ThemeApi.ThemeApi.deleteThemeWithCards);
app.delete('/api/themes/:id/cards/:cid', ThemeApi.ThemeApi.deleteCardFromTheme);
app.get('/api/themes/cards/:array', ThemeApi.ThemeApi.getCardsByIds);
//endregion

//region auth routes
app.post('/api/user/login', function (req, res) {
    console.log(req.body);
    var token = req.header('Bearer');
    if (token != null && token != "") {
        res.send({_message:'You are already logged in'});
    } else {
        UserApi.UserApi.getUser(req.body._email, req.body._password, res);
    }
});

app.post('/api/user/register', function (req, res) {
    var token = req.header('Bearer');
    if (token != null && token != "") {
        res.send("{\"_message\":\"You are already registered\"}");
    } else {
        UserApi.UserApi.createUser(req.body._username, req.body._email, req.body._password, req.body._registrar, res);
    }
});

app.post('/api/user/login-facebook', function (req, res) {
    UserApi.UserApi.getFacebookUser(req.body._facebookId, req.body._email, req.body._pictureSmall, req.body._pictureLarge, req.body._name, req.body._registrar, res);
});

app.post('/api/user/change-profile', function (req, res) {
    var token = req.header('Bearer');
    if (token != null && token != "") {
        UserApi.UserApi.changeProfile(token, req.body._username, req.body._smallPicture, req.body._largePicture, res);
    } else {
        res.send("{\"_message\":\"You are not logged in\"}");
    }
});

app.post('/api/user/get-picture', function (req, res) {
    var token = req.header('Bearer');
    if (token != null && token != "") {
        UserApi.UserApi.getPicture(token, req.body._type, res);
    } else {
        res.send("{\"_message\":\"You are not logged in\"}");
    }
});

app.get('*', function (req, res) {
    res.sendfile("static/html/index.html");
});
//endregion

//region Socket.io
io.on('connection', function (socket) {
    socket.on('join session', function (message) {
        var object = JSON.parse(message);
        var sessionId = object.sessionId;
        socket.join("kandoe-" + sessionId);
    });
    socket.on('send message', function(message) {
        var roomName = Object.keys(socket.rooms).filter(function(room) {
            return room.startsWith('kandoe-')
        })[0];

        ChatApi.ChatApi.addMessage(message, function(b, updatedMessage){
            if(b === true) {
                io.to(roomName).emit('send message', JSON.stringify(updatedMessage));
            }
        });
    });
    socket.on('send move', function(message) {
        var roomName = Object.keys(socket.rooms).filter(function(room) {
            return room.startsWith('kandoe-');
        })[0];

        io.to(roomName).emit('send move', JSON.stringify(message));
    });
});
//endregion Socket.io

http.listen(server_port, server_ip_address, function () {
    console.log("Started listening to "+server_ip_address+" on port "+server_port+"!");
});