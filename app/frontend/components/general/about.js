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
var core_1 = require("angular2/core");
var router_1 = require("angular2/router");
var About = (function () {
    function About() {
    }
    About = __decorate([
        core_1.Component({
            selector: 'about-card',
            template: "\n    <div class=\"col s5\">\n         <div class=\"card\">\n            <div class=\"card-content\">\n                <span class=\"card-title\">Wat is KanDoe?</span>\n                <p>\n                    Kandoe is een methodiek van de UAB, die een groep\n                    toelaat om gezamenlijk tot een prioritering van items rond een bepaald thema te komen. Het\n                    wordt bijvoorbeeld gebruikt om na te gaan wat er leeft en kan aangepakt worden in een buurt of\n                    organisatie, om vertegenwoordigers te kiezen,... Het kan echter evengoed gebruikt worden om samen te bepalen naar welk caf\u00E9 er\n                    gegaan zal worden of wat het diner zal zijn voor nieuwjaar. Kortom alle levensbelangrijke\n                    beslissingen kunnen met deze tool gefaciliteerd worden!\n                </p><br/>\n                <p>\n                    Ga van start met deze online oplossing. <a [routerLink]=\"['OrganisationsOverview']\">Word lid van een organisatie</a> of maak er \u00E9\u00E9n. \n                    <a [routerLink]=\"['ThemeOverview']\">Kies een thema</a>. Nodig je vrienden uit. <a [routerLink]=\"['CircleSessionOverview']\">En start met spelen!</a>\n                </p><br/>\n                <p>\n                    Nieuw hier? <a [routerLink]=\"['Profile']\">Vergeet dan ook niet je profiel aan te passen!</a>\n                </p>\n            </div>\n        </div>\n    </div>\n  ",
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], About);
    return About;
}());
exports.About = About;
//# sourceMappingURL=about.js.map