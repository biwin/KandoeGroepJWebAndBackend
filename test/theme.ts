/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
import assert = require('assert');
import {Theme} from "../app/backend/model/theme";
import {ThemeDao} from "../app/backend/dao/themeDao";

describe('Theme', () => {
    describe('#addTheme', () => {
        it('theme must be saved in the database', () =>{
            var themeDao:ThemeDao = new ThemeDao();
            var theme:Theme = new Theme(1,"Bars","Bars we want to visit");
            themeDao.create(theme);
            var themeResult = themeDao.read("Bars");
            assert.equal(themeResult._name, theme._name);
        });
    });
});

