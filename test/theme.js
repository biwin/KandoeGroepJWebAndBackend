/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
var assert = require('assert');
var theme_1 = require("../app/backend/model/theme");
var themeDao_1 = require("../app/backend/dao/themeDao");
describe('Theme', function () {
    describe('#addTheme', function () {
        it('theme must be saved in the database', function (done) {
            this.timeout(0);
            setTimeout(function () {
                var themeDao = new themeDao_1.ThemeDao();
                var theme = new theme_1.Theme(1, "Bars", "Bars we want to visit");
                themeDao.create(theme, function () {
                    themeDao.read("Bars", function (t) {
                        assert.equal(t._name, theme._name);
                        done();
                    });
                });
            }, 3000);
        });
    });
});
//# sourceMappingURL=theme.js.map