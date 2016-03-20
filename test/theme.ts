import assert = require('assert');
import {ThemeManager} from "../app/backend/logic/themeManager";
import {UserManager} from "../app/backend/logic/userManager";

import {Theme} from "../app/backend/model/theme";
import {Card} from "../app/backend/model/card";
import {User} from "../app/backend/model/user";

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

            userManager.registerUser(new User('Enio', 'enio.serluppens@student.kdg.be', 'password', ""), (u: User) => {
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
                themeManager.getTheme(t._id, (themeGet:Theme) => {
                    try {
                        assert.equal(t._id, themeGet._id);
                        assert.equal(theme._name, themeGet._name);
                        assert.deepEqual(theme._organisatorIds, themeGet._organisatorIds);
                        assert.equal(theme._description, themeGet._description);

                        done();
                    } catch(e) {
                        done(e);
                    }    
                })
            });
        });

        after(function (done: any) {
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
        var card: Card;
        var theme: Theme;
        var user:User;

        before(function(done: any){
            userManager.registerUser(new User('Enio', 'enio.serluppens@student.kdg.be', 'password', ""), (u: User) => {
                try {
                    user = u;
                    theme = new Theme('Cafes', 'thema van cafes', [u._id]);
                    themeManager.createTheme(theme, (t:Theme) => {
                        theme = t;
                        done();
                    });
                } catch(e) {
                    done(e);
                }
            });
        });

        it('Card must be added to a theme', function(done: any){
            this.timeout(0);

            card = new Card('cafe de vissers', theme._id);
            
            themeManager.getTheme(theme._id, (getTheme:Theme) => {
                themeManager.createCard(card, (c: Card) => {
                    assert.notEqual(c._id, null);
                    assert.equal(c._themeId, getTheme._id);
                    assert.equal(c._name, card._name);
                    done();
                });
            });
            
        });

        after(function (done: any) {
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
});
