/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
var assert = require('assert');
var theme_1 = require("../app/backend/model/theme");
describe('Theme', function () {
    describe('#constructor', function () {
        it('constructor name equals a', function () {
            var theme = new theme_1.Theme("a", "description");
            assert.equal(theme.name, 'a');
        });
    });
});
//# sourceMappingURL=theme.js.map