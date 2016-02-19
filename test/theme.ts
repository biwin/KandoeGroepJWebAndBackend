/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/*import assert = require('assert');
import {Theme} from "../app/backend/model/theme";
import {ThemeDao} from "../app/backend/dao/themeDao";
import {timeout} from "rxjs/operator/timeout";

describe('Theme', () => {
    describe('#addTheme', () => {
        it('theme must be saved in the database', function(done: any) {
            this.timeout(0);
            var themeDao:ThemeDao = new ThemeDao();
            var theme:Theme = new Theme(1,"Bars","Bars we want to visit");
            themeDao.create(theme, () => {
                themeDao.read("Bars", (t:Theme) => {
                    assert.equal(t._name, theme._name);
                    done();
                });
            });
        });
    });
});*/