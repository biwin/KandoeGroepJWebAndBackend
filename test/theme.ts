/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
import assert = require('assert');
import {Theme} from "../app/backend/model/theme";
import {ThemeDao} from "../app/backend/dao/themeDao";

describe('Theme', () => {
    describe('#constructor', () => {
        it('constructor name equals a', () => {
            var theme = new Theme("a", "description");
            assert.equal(theme.name, 'a');
        });
    });
    describe('#addTheme', () => {
        it('', () =>{
            var themeDao:ThemeDao = new ThemeDao();
            var theme:Theme = new Theme("Bars", "The bars we could visit this weekend");
            themeDao.create(theme);
            var themeResult = themeDao.read("Bars");
            assert.equal(themeResult.name, theme.name)
        });
    });
});
