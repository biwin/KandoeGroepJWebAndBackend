var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("angular2/core");
var httpWrapperService_1 = require("./httpWrapperService");
/**
 * Class that is responsible for a link between the frontend and the backend for users.
 * Uses the user routes in the server.js file
 */
var UserService = (function () {
    function UserService(http, path) {
        this.http = null;
        this.subscribers = [];
        this.path = path;
        this.http = http;
    }
    UserService.prototype.subscribeMe = function (subscriber) {
        this.subscribers.push(subscriber);
    };
    UserService.prototype.notifyLoggedIn = function () {
        for (var index in this.subscribers)
            this.subscribers[index].notifyLoggedIn();
    };
    UserService.prototype.notifyLoggedOut = function () {
        for (var index in this.subscribers)
            this.subscribers[index].notifyLoggedOut();
    };
    UserService.prototype.notifyProfileUpdated = function () {
        for (var index in this.subscribers)
            this.subscribers[index].notifyProfileUpdated();
    };
    UserService.prototype.isLoggedIn = function () {
        var token = localStorage.getItem('token');
        return token != null && token != "";
    };
    UserService.prototype.changeProfile = function (newName, newSmallPictureLink, newLargePictureLink) {
        return this.http.post(this.path + 'user/change-profile', JSON.stringify({ '_username': newName, '_smallPicture': newSmallPictureLink, '_largePicture': newLargePictureLink }), true, false, true).map(function (res) { return res.json()._message; });
    };
    UserService.prototype.getUser = function (email, password) {
        return this.http.post(this.path + 'user/login', JSON.stringify({ '_email': email, '_password': password }), true, false, false).map(function (res) { return res.json()._message; });
    };
    UserService.prototype.registerUser = function (name, password, email, registrar) {
        return this.http.post(this.path + 'user/register', JSON.stringify({ '_username': name, '_password': password, '_email': email, '_registrar': registrar }), true, false, false).map(function (res) { return res.json()._message; });
    };
    UserService.prototype.loginUserFacebook = function (id, name, email, pictureSmall, pictureLarge) {
        return this.http.post(this.path + 'user/login-facebook', JSON.stringify({ '_name': name, '_email': email, '_facebookId': id, '_pictureSmall': pictureSmall, '_pictureLarge': pictureLarge, '_registrar': 'facebook' }), true, false, false).map(function (res) { return res.json()._message; });
    };
    UserService.prototype.getUserPicture = function (type) {
        return this.http.post(this.path + 'user/get-picture', JSON.stringify({ '_type': type }), true, false, true).map(function (res) { return res.json()._message; });
    };
    UserService.prototype.getUsername = function () {
        var token = localStorage.getItem('token');
        if (token == null || token == "")
            return "";
        var payloadEncoded = token.split('.')[1];
        var payloadDecoded = atob(payloadEncoded);
        return JSON.parse(payloadDecoded)._name;
    };
    UserService.prototype.getUserId = function () {
        var token = localStorage.getItem('token');
        if (token == null || token == "")
            return "";
        var payloadEncoded = token.split('.')[1];
        var payloadDecoded = atob(payloadEncoded);
        return JSON.parse(payloadDecoded)._id;
    };
    UserService.prototype.getImageLinks = function (callback) {
        var _this = this;
        this.getUserPicture('small').subscribe(function (p1) {
            _this.getUserPicture('large').subscribe(function (p2) {
                callback(p1, p2);
            });
        });
    };
    UserService.prototype.getAllGroupsOfUser = function (userId) {
        return this.http.get(this.path + 'user/' + userId + '/groups', false, true, true);
    };
    UserService.prototype.getCircleSessionsOfCurrentUser = function () {
        return this.http.get(this.path + 'user/circlesessions', false, true, true);
    };
    UserService.prototype.getUsers = function (userIds) {
        return this.http.get(this.path + 'user/bulk/' + encodeURI(JSON.stringify(userIds)), false, true, true);
    };
    UserService.prototype.getAllOrganisationsOfCurrentUser = function () {
        return this.http.get(this.path + "user/organisations", false, true, true);
    };
    UserService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject('App.BackendPath')), 
        __metadata('design:paramtypes', [httpWrapperService_1.HttpWrapperService, String])
    ], UserService);
    return UserService;
})();
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map