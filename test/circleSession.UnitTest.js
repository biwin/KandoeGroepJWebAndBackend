/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
var assert = require('assert');
var themeManager_1 = require("../app/backend/logic/themeManager");
var userManager_1 = require("../app/backend/logic/userManager");
var circleSessionManager_1 = require("../app/backend/logic/circleSessionManager");
var theme_1 = require("../app/backend/model/theme");
var organisation_1 = require("../app/backend/model/organisation");
var group_1 = require("../app/backend/model/group");
var circleSession_1 = require("../app/backend/model/circleSession");
var card_1 = require("../app/backend/model/card");
var user_1 = require("../app/backend/model/user");
var organisationManager_1 = require("../app/backend/logic/organisationManager");
var groupManager_1 = require("../app/backend/logic/groupManager");
var circleSessionCreateWrapper_1 = require("../app/backend/model/circleSessionCreateWrapper");
var themeManager;
var userManager;
var organisationManager;
var circleSessionManager;
var groupManager;
before(function (done) {
    this.timeout(0);
    themeManager = new themeManager_1.ThemeManager();
    userManager = new userManager_1.UserManager();
    groupManager = new groupManager_1.GroupManager();
    organisationManager = new organisationManager_1.OrganisationManager();
    circleSessionManager = new circleSessionManager_1.CircleSessionManager();
    done();
});
describe('CircleSession Unittest', function () {
    var user;
    var organisation;
    var theme;
    var card;
    var group;
    var circleSession;
    var circleSessionCreateWrapper;
    before(function (done) {
        this.timeout(0);
        user = new user_1.User("Enio", "enio.serluppens@protester.eu", "mykandoepass01", "");
        userManager.registerUser(user, function (registerdUser) {
            try {
                user = registerdUser;
                organisation = new organisation_1.Organisation("Enio's outrageous five Organisation", []);
                organisation._organisatorIds.push(registerdUser._id);
                organisationManager.createOrganisation(organisation, function (createdOrganisation) {
                    organisation = createdOrganisation;
                    group = new group_1.Group("Enio's Group", "A group", createdOrganisation._id, [registerdUser._id]);
                    groupManager.createGroup(group, function (createdGroup) {
                        group = createdGroup;
                        theme = new theme_1.Theme("Enio's theme", "a theme", [registerdUser._id]);
                        themeManager.createTheme(theme, function (createdTheme) {
                            theme = createdTheme;
                            card = new card_1.Card("Enio's Card", createdTheme._id);
                            themeManager.createCard(card, function (createdCard) {
                                card = createdCard;
                                circleSession = new circleSession_1.CircleSession(createdGroup._id, [registerdUser._id], createdTheme._id, "", registerdUser._id, "2016-03-17 15:57", true, true, null, true, true, false, null, registerdUser._id);
                                circleSessionCreateWrapper = new circleSessionCreateWrapper_1.CircleSessionCreateWrapper(circleSession, []);
                                circleSessionManager.createCircleSession(circleSessionCreateWrapper, function (createdCircleSession) {
                                    circleSession = createdCircleSession;
                                    done();
                                });
                            });
                        });
                    });
                });
            }
            catch (e) {
                done(e);
            }
        });
    });
    it("Game should be played. A card has been picked and then placed onto the ring (position = 1)", function (done) {
        this.timeout(0);
        circleSessionManager.initCardsForSession(user._id, circleSession._id, [card._id], function (preGameEnded, currentUserId, errMessage) {
            circleSessionManager.getCardPositions(circleSession._id, function (cardpositions) {
                circleSessionManager.cardUp(circleSession._id, card._id, user._id, function (newPlayerId, cardPosition, mongoError) {
                    assert.equal(cardPosition._cardId, card._id);
                    assert.equal(cardPosition._sessionId, circleSession._id);
                    assert.equal(cardPosition._userId, user._id);
                    assert.equal(cardPosition._position, 1);
                    done();
                });
            });
        });
    });
    after(function (done) {
        this.timeout(0);
        try {
            organisationManager.removeOrganisationById(organisation._id, function () {
                circleSessionManager.deleteCircleSession(user._id, circleSession._id, function () {
                    userManager.removeUserById(user._id, function () {
                        themeManager.removeThemeById(theme._id, function () {
                            done();
                        });
                    });
                });
            });
        }
        catch (e) {
            done(e);
        }
    });
});
//# sourceMappingURL=circleSession.UnitTest.js.map