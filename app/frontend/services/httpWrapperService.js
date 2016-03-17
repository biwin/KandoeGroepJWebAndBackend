"use strict";
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
var http_1 = require("angular2/http");
var HttpWrapperService = (function () {
    function HttpWrapperService(http, path) {
        this.http = null;
        this.path = path;
        this.http = http;
    }
    HttpWrapperService.prototype.get = function (url, isJson, needsJson, needsToken, options) {
        if (options == null) {
            options = new http_1.RequestOptions();
            options.headers = new http_1.Headers();
        }
        if (isJson)
            options.headers.append('Content-Type', 'application/json');
        if (needsToken)
            options.headers.append('Bearer', localStorage.getItem('token'));
        return this.http.get(url, options).map(function (res) {
            return needsJson ? res.json() : res;
        });
    };
    HttpWrapperService.prototype.post = function (url, body, isJson, needsJson, needsToken, options) {
        if (options == null) {
            options = new http_1.RequestOptions();
            options.headers = new http_1.Headers();
        }
        if (isJson)
            options.headers.append('Content-Type', 'application/json');
        if (needsToken)
            options.headers.append('Bearer', localStorage.getItem('token'));
        return this.http.post(url, body, options).map(function (res) {
            var r = res;
            return needsJson ? res.json() : res;
        });
    };
    HttpWrapperService.prototype.delete = function (url, isJson, needsJson, needsToken, options) {
        if (options == null) {
            options = new http_1.RequestOptions();
            options.headers = new http_1.Headers();
        }
        if (isJson)
            options.headers.append('Content-Type', 'application/json');
        if (needsToken)
            options.headers.append('Bearer', localStorage.getItem('token'));
        return this.http.delete(url, options).map(function (res) {
            return needsJson ? res.json() : res;
        });
    };
    HttpWrapperService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject('App.BackendPath')), 
        __metadata('design:paramtypes', [http_1.Http, String])
    ], HttpWrapperService);
    return HttpWrapperService;
}());
exports.HttpWrapperService = HttpWrapperService;
//# sourceMappingURL=httpWrapperService.js.map