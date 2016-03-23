/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import assert = require('assert');
import {CircleSession} from "../app/backend/model/circleSession";
import {CircleSessionManager} from "../app/backend/logic/circleSessionManager";
import {ThemeManager} from "../app/backend/logic/themeManager";
import {UserManager} from "../app/backend/logic/userManager";
import {Theme} from "../app/backend/model/theme";
import {Group} from "../app/backend/model/group";
import {User} from "../app/backend/model/user";
import {GroupManager} from "../app/backend/logic/groupManager";
import {CircleSessionCreateWrapper} from "../app/backend/model/circleSessionCreateWrapper";
import {Organisation} from "../app/backend/model/organisation";
import {OrganisationManager} from "../app/backend/logic/organisationManager";

var circleSessionManager:CircleSessionManager;
var themeManager:ThemeManager;
var userManager:UserManager;
var groupManager:GroupManager;
var organisationManager:OrganisationManager;

before(function (done) {
    this.timeout(10000);
    circleSessionManager = new CircleSessionManager();
    themeManager = new ThemeManager();
    userManager = new UserManager();
    groupManager = new GroupManager();
    organisationManager = new OrganisationManager();
    done();
});
describe('CircleSessionManager', () => {
    describe('createCircleSession', () => {
        var theme:Theme = new Theme("test theme", "dit is een thema om te testen", [], [], []);
        var userOne:User = new User("stef", "email@test.com", "test", "test");
        var userTwo:User = new User("andre", "email@test.be", "test", "test");
        var org:Organisation = new Organisation("CreateCSTestOrg", []);
        var group:Group = new Group("CreateCSTestGroup", "test group", "", []);
        var circleSession:CircleSession;

        before(function (done) {
            this.timeout(100000);
            userManager.deleteTestUsers(() => {
                themeManager.createTheme(theme, (t:Theme)=> {
                    theme = t;
                    userManager.registerUser(userOne, (u:User) => {
                        userOne = u;
                        userManager.registerUser(userTwo, (u2:User)=> {
                            userTwo = u2;
                            try {
                                group._memberIds.push(userOne._id);
                                group._memberIds.push(userTwo._id);
                            } catch (e) {
                                done(e);
                            }

                            organisationManager.createOrganisation(org, (o:Organisation) => {
                                try {
                                    group._organisationId = o._id.toString();
                                } catch(e) {
                                    done(e);
                                }
                                groupManager.createGroup(group, (g:Group) => {
                                    group = g;
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });
        it('Created circlesession should contain the users from the group', function (done:any) {
            this.timeout(100000);
            circleSession = new CircleSession(group._id, [], theme._id, "", "", "", false, false, 0, false, false, false);
            var circleSessionWrapper:CircleSessionCreateWrapper = new CircleSessionCreateWrapper(circleSession, []);
            circleSessionManager.createCircleSession(circleSessionWrapper, (c:CircleSession) => {
                circleSession = c;
                try {
                    assert.equal(c._userIds.length, group._memberIds.length);
                    assert.deepEqual(c._userIds, group._memberIds);
                } catch(e) {
                    done(e);
                }
                done();
            });
        });
        after(function (done) {
            this.timeout(100000);
            circleSessionManager.deleteCircleSession("", circleSession._id, () => {
                groupManager.removeGroupById(group._id, (bg:boolean)=> {
                    organisationManager.removeOrganisationById(org._id, (b:boolean) => {
                        userManager.removeUserById(userOne._id, (bu1:boolean)=> {
                            userManager.removeUserById(userTwo._id, (bu2:boolean)=> {
                                themeManager.removeThemeById(theme._id, (bt:boolean)=> {
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
