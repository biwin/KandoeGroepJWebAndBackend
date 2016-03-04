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
var core_2 = require("angular2/core");
var httpWrapperService_1 = require("./httpWrapperService");
var router_1 = require("angular2/router");
var UserService = (function () {
    function UserService(router, http, path) {
        this.router = router;
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
        return this.http.post(this.path + 'user/change-profile', JSON.stringify({ 'username': newName, 'smallPicture': newSmallPictureLink, 'largePicture': newLargePictureLink }), true, false, true);
    };
    UserService.prototype.getUser = function (email, password) {
        return this.http.post(this.path + 'user/login', JSON.stringify({ 'email': email, 'password': password }), true, false, false);
    };
    UserService.prototype.registerUser = function (name, password, email, registrar) {
        return this.http.post(this.path + 'user/register', JSON.stringify({ 'username': name, 'password': password, 'email': email, 'registrar': registrar }), true, false, false);
    };
    UserService.prototype.loginUserFacebook = function (id, name, email, pictureSmall, pictureLarge) {
        return this.http.post(this.path + 'user/login-facebook', JSON.stringify({ 'name': name, 'email': email, 'facebookId': id, 'pictureSmall': pictureSmall, 'pictureLarge': pictureLarge, 'registrar': 'facebook' }), true, false, false);
    };
    UserService.prototype.getUserPicture = function (type) {
        return this.http.post(this.path + 'user/get-picture', JSON.stringify({ 'type': type }), true, false, true);
    };
    UserService.prototype.getUsername = function (callback) {
        var token = localStorage.getItem('token');
        if (token == null || token == "")
            callback("");
        var payloadEncoded = token.split('.')[1];
        var payloadDecoded = atob(payloadEncoded);
        callback(JSON.parse(payloadDecoded).name);
    };
    UserService.prototype.getUserId = function (callback) {
        var token = localStorage.getItem('token');
        if (token == null || token == "")
            callback("");
        var payloadEncoded = token.split('.')[1];
        var payloadDecoded = atob(payloadEncoded);
        callback(JSON.parse(payloadDecoded).id);
    };
    UserService.prototype.getImageLinks = function (callback) {
        var _this = this;
        this.getUserPicture('small').subscribe(function (res1) {
            _this.getUserPicture('large').subscribe(function (res2) {
                callback(res1.text(), res2.text());
            });
        });
    };
    UserService = __decorate([
        core_1.Injectable(),
        __param(2, core_2.Inject('App.BackendPath')), 
        __metadata('design:paramtypes', [router_1.Router, httpWrapperService_1.HttpWrapperService, String])
    ], UserService);
    return UserService;
})();
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map