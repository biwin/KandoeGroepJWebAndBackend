/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
import assert = require('assert');
import {timeout} from "rxjs/operator/timeout";
import {ThemeManager} from "../app/backend/logic/themeManager";
import {Theme} from "../app/backend/model/theme";
import {UserManager} from "../app/backend/logic/userManager";
import {User} from "../app/backend/model/user";

var themeManager: ThemeManager;
var userManager: UserManager;

before(function(done: any) {
    themeManager = new ThemeManager();
    userManager = new UserManager();
    var completion: number = 0;
    themeManager.clearDatabase(() => {
        if (++completion == 2) done();
    });
    userManager.clearDatabase(() => {
        if (++completion == 2) done();
    })
});

describe('ThemeManager', () => {

    describe('createTheme', () => {
        var user: User;
        before(function(done: any) {
            this.timeout(0);
            userManager.registerUser(new User('Enio', 'enio.serluppens@student.kdg.be', 'password', 'admin'), (u: User) => {
                try {
                    user = u;
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
        it('Create theme, should return theme from database', function(done: any) {
            this.timeout(0);
            var theme = new Theme('First', 'This is a sample theme', [user._id]);
            themeManager.createTheme(theme, (t: Theme) => {
                try {
                    assert.equal(theme._name, t._name);
                    done();
                } catch(e) {
                    return done(e);
                }
            });
        });
    });

});