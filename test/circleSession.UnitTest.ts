/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import assert = require('assert');
import {ThemeManager} from "../app/backend/logic/themeManager";
import {UserManager} from "../app/backend/logic/userManager";
import {CircleSessionManager} from "../app/backend/logic/circleSessionManager";
import {Theme} from "../app/backend/model/theme";
import {Organisation} from "../app/backend/model/organisation";
import {Group} from "../app/backend/model/group";
import {CircleSession} from "../app/backend/model/circleSession";
import {Card} from "../app/backend/model/card";
import {User} from "../app/backend/model/user";
import {OrganisationManager} from "../app/backend/logic/organisationManager";
import {GroupManager} from "../app/backend/logic/groupManager";
import {CircleSessionCreateWrapper} from "../app/backend/model/circleSessionCreateWrapper";
import {CardPosition} from "../app/backend/model/cardPosition";

var themeManager:ThemeManager;
var userManager:UserManager;
var organisationManager:OrganisationManager;
var circleSessionManager:CircleSessionManager;
var groupManager:GroupManager;

before(function (done:any) {
    this.timeout(0);

    themeManager = new ThemeManager();
    userManager = new UserManager();
    groupManager = new GroupManager();
    organisationManager = new OrganisationManager();
    circleSessionManager = new CircleSessionManager();

    done();
});

describe('CircleSession Unittest', () => {
    var user:User;
    var organisation:Organisation;
    var theme:Theme;
    var card:Card;
    var group:Group;
    var circleSession:CircleSession;
    var circleSessionCreateWrapper:CircleSessionCreateWrapper;

    describe('CardPositions in a CircleSession', () => {
        before(function (done:any) {
            this.timeout(0);

            user = new User("Enio", "enio.serluppens@protester.eu", "mykandoepass01", "test");
            userManager.deleteTestUsers(() => {
                userManager.registerUser(user, (registerdUser:User)=> {
                    try {
                        user = registerdUser;
                        organisation = new Organisation("Enio's outrageous five Organisation", []);
                        organisation._organisatorIds.push(registerdUser._id);
                        organisationManager.createOrganisation(organisation, (createdOrganisation:Organisation) => {
                            organisation = createdOrganisation;
                            group = new Group("Enio's Group", "A group", createdOrganisation._id, [registerdUser._id]);
                            groupManager.createGroup(group, (createdGroup:Group) => {
                                group = createdGroup;
                                theme = new Theme("Enio's theme", "a theme", [registerdUser._id]);
                                themeManager.createTheme(theme, (createdTheme:Theme)=> {
                                    theme = createdTheme;
                                    card = new Card("Enio's Card", createdTheme._id);
                                    themeManager.createCard(card, (createdCard:Card)=> {
                                        card = createdCard;
                                        circleSession = new CircleSession(createdGroup._id, [registerdUser._id], createdTheme._id, "", registerdUser._id,
                                            "2016-03-17 15:57", true, true, null, true, true, false, null, registerdUser._id);
                                        circleSessionCreateWrapper = new CircleSessionCreateWrapper(circleSession, []);
                                        circleSessionManager.createCircleSession(circleSessionCreateWrapper, (createdCircleSession:CircleSession) => {
                                            circleSession = createdCircleSession;
                                            done();
                                        });
                                    });
                                });
                            });
                        });
                    } catch (e) {
                        done(e);
                    }

                });
            });
        });
        it("Game should be played. A card has been picked and then placed onto the ring (position = 1)", function (done:any) {
            this.timeout(0);

            circleSessionManager.initCardsForSession(user._id, circleSession._id, [card._id], (preGameEnded:boolean, currentUserId:string, errMessage?:string) => {
                circleSessionManager.getCardPositions(circleSession._id, (cardpositions:CardPosition[]) => {
                    circleSessionManager.cardUp(circleSession._id, card._id, user._id, (newPlayerId:string, cardPosition:CardPosition, mongoError:string) => {
                        assert.equal(cardPosition._cardId, card._id);
                        assert.equal(cardPosition._sessionId, circleSession._id);
                        assert.equal(cardPosition._userId, user._id);
                        assert.equal(cardPosition._position, 1);
                        done();
                    });
                });
            });
        });
        after(function (done:any) {
            this.timeout(0);

            try {
                groupManager.removeGroupById(group._id, (b:boolean) => {
                    organisationManager.removeOrganisationById(organisation._id, () => {
                        circleSessionManager.deleteCircleSession(user._id, circleSession._id, () => {
                            userManager.removeUserById(user._id, () => {
                                themeManager.removeThemeById(theme._id, () => {
                                    done();
                                });
                            });
                        });
                    });
                });
            } catch (e) {
                done(e);
            }
        });
    });
});