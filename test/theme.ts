import assert = require('assert');

import {ThemeManager} from "../app/backend/logic/themeManager";
import {UserManager} from "../app/backend/logic/userManager";

import {Theme} from "../app/backend/model/theme";
import {User} from "../app/backend/model/user";
import {Card} from "../app/backend/model/card";

var themeManager: ThemeManager;
var userManager: UserManager;

before(function(done: any) {
    themeManager = new ThemeManager();
    userManager = new UserManager();

    done();
});

describe('ThemeManager', () => {
    describe('createTheme', () => {
        var user: User;
        var theme: Theme;

        before(function(done: any) {
            this.timeout(0);

            userManager.registerUser(new User('Enio', 'enio.serluppens@student.kdg.be', 'password'), (u: User) => {
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

            theme = new Theme('first', 'This is a sample theme', [user._id]);
            themeManager.createTheme(theme, (t: Theme) => {
                try {
                    assert.equal(theme._name, t._name);

                    done();
                } catch(e) {
                    done(e);
                }
            });
        });

        after(function (done:any) {
            this.timeout(0);

            try {
                userManager.removeUserById(user._id, () => {
                    themeManager.removeThemeById(theme._id, () => {
                        done();
                    });
                });
            } catch (e) {
                done(e);
            }
        });
    });

    describe('AddCard', () => {
        var card:Card;

        before(function(done: any){
            card = new Card ('Cafe de vissers', 't1235');
            done();
        });

        it('Card must be added to a theme', function(done: any){
            this.timeout(0);

            themeManager.createCard(card, (c:Card) => {
                assert.notEqual(c._id, null);
                done();
            });
        });
    });
});