/// <reference path="../../../../typings/jquery/jquery.d.ts" />
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
var common_1 = require("angular2/common");
var core_2 = require("angular2/core");
var TagInput = (function () {
    function TagInput() {
        this.title = "Tags";
        this.tagArray = [];
    }
    TagInput.prototype.typing = function ($event) {
        var text = $event.target.value;
        if (text.slice(-1) === ";" && text.trim().length > 0) {
            this.tagArray.push(text.trim().replace(/;/g, ""));
            $event.target.value = " ";
        }
        else if ($event.which === 8 && text.trim().length == 0) {
            this.remove(this.tagArray.length - 1);
        }
    };
    TagInput.prototype.remove = function (index) {
        this.tagArray.splice(index, 1);
        if (this.tagArray.length > 0)
            $('#tagInput').val(" ");
    };
    __decorate([
        core_2.Input(), 
        __metadata('design:type', String)
    ], TagInput.prototype, "title", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Array)
    ], TagInput.prototype, "tagArray", void 0);
    TagInput = __decorate([
        core_1.Component({
            selector: 'tags',
            template: "\n        <div class=\"input-field col s12\">\n        <div style=\"float:left\">\n          <div class=\"chip\" style=\"position:relative; top:10px;\" *ngFor=\"#tag of tagArray #i = index\">\n            {{tag}}\n             <i class=\"material-icons\" (click)=\"remove(i)\">close</i>\n          </div>\n          </div>\n\n          <span style=\"overflow:hidden; padding-right:5px; display:block;\">\n            <input #txt (keyup)=\"typing($event)\" id=\"tagInput\" type=\"text\" value=\"{{tagArray.length > 0 ? ' ' : ''}}\"/>\n            <label [class.active]=\"tagArray.length > 0 || txt.value.length > 0\" for=\"tagInput\">{{title}}</label>\n          </span>\n        </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], TagInput);
    return TagInput;
}());
exports.TagInput = TagInput;
//# sourceMappingURL=tagInput.js.map