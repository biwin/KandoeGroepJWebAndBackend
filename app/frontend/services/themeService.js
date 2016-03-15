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
var ThemeService = (function () {
    function ThemeService(http, path) {
        this.http = null;
        this.path = path;
        this.http = http;
    }
    ThemeService.prototype.getAll = function () {
        return this.http.get(this.path + 'themes', false, true, true);
    };
    ThemeService.prototype.getTheme = function (themeId) {
        return this.http.get(this.path + 'themes/' + themeId, false, true, true);
    };
    ThemeService.prototype.create = function (theme) {
        return this.http.post(this.path + 'themes', JSON.stringify(theme), true, true, true);
    };
    ThemeService.prototype.createSubTheme = function (theme, parentId) {
        return this.http.post(this.path + 'themes/' + parentId, JSON.stringify(theme), true, true, true);
    };
    ThemeService.prototype.createCard = function (name, themeId) {
        return this.http.post(this.path + 'themes/' + themeId + '/cards', JSON.stringify({ '_name': name }), true, true, true);
    };
    ThemeService.prototype.getCards = function (themeId) {
        return this.http.get(this.path + 'themes/' + themeId + '/cards', false, true, true);
    };
    ThemeService.prototype.unlinkCard = function (themeId, cardId) {
        return this.http.delete(this.path + 'themes/' + themeId + '/cards/' + cardId, false, false, true);
    };
    ThemeService.prototype.deleteTheme = function (themeId) {
        return this.http.delete(this.path + 'themes/' + themeId, false, false, true);
    };
    ThemeService.prototype.getCardsByIds = function (cardIds) {
        return this.http.get(this.path + 'themes/cards/' + encodeURI(JSON.stringify(cardIds)), true, true, true);
    };
    ThemeService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject('App.BackendPath')), 
        __metadata('design:paramtypes', [httpWrapperService_1.HttpWrapperService, String])
    ], ThemeService);
    return ThemeService;
})();
exports.ThemeService = ThemeService;
//# sourceMappingURL=themeService.js.map