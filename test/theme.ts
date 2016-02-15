/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
import assert = require('assert');
import {Theme} from "../app/backend/model/theme";

describe('Theme', () => {
    describe('#constructor', () => {
        it('constructor name equals a', () => {
            var theme = new Theme("a", "description");
            assert.equal(theme.name, 'a');
        });
    });
});