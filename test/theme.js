/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
var assert = require('assert');
var theme_1 = require("../app/backend/model/theme");
var themeDao_1 = require("../app/backend/dao/themeDao");
describe('Theme', function () {
    describe('#constructor', function () {
        it('constructor name equals a', function () {
            var theme = new theme_1.Theme("a", "description");
            assert.equal(theme.name, 'a');
        });
    });
    describe('#addTheme', function () {
        it('', function () {
            var themeDao = new themeDao_1.ThemeDao();
            var theme = new theme_1.Theme("Bars", "The bars we could visit this weekend");
            themeDao.create(theme);
            var themeResult = themeDao.read("Bars");
            assert.equal(themeResult.name, theme.name);
        });
    });
});
//# sourceMappingURL=theme.js.map