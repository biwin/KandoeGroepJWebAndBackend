/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
var assert = require('assert');
var theme_1 = require("../app/backend/model/theme");
var themeDao_1 = require("../app/backend/dao/themeDao");
describe('Theme', function () {
    describe('#addTheme', function () {
        it('', function () {
            var themeDao = new themeDao_1.ThemeDao();
            var theme = new theme_1.Theme(1, "Bars", "Bars we want to visit");
            themeDao.create(theme);
            var themeResult = themeDao.read("Bars");
            assert.equal(themeResult._name, theme._name);
        });
    });
});
//# sourceMappingURL=theme.js.map