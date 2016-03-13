/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import assert = require('assert');
import {CircleSession} from "../app/backend/model/circleSession";
import {CircleSessionManager} from "../app/backend/logic/circleSessionManager";
import {CardPosition} from "../app/backend/model/cardPosition";
import {ThemeManager} from "../app/backend/logic/themeManager";
import {UserManager} from "../app/backend/logic/userManager";
import {Theme} from "../app/backend/model/theme";
import {Group} from "../app/backend/model/group";
import {User} from "../app/backend/model/user";
import {GroupManager} from "../app/backend/logic/groupManager";
import {CircleSessionCreateWrapper} from "../app/backend/model/circleSessionCreateWrapper";

var circleSessionManager:CircleSessionManager;
var themeManager:ThemeManager;
var userManager:UserManager;
var groupManager:GroupManager;

before(function(done) {
    circleSessionManager = new CircleSessionManager();
    themeManager = new ThemeManager();
    userManager = new UserManager();
    groupManager = new GroupManager();
    done();
});
describe('CircleSessionManager', () => {
    describe('createCircleSession', () => {
        var theme:Theme = new Theme("test theme", "dit is een thema om te testen", [], [], []);
        var userOne:User = new User("stef", "email@test.com", "test", "web");
        var userTwo:User = new User("andre", "email@test.be", "test", "web");
        var group:Group = new Group("test group", "test group", "Albert Hein", []);
        var circleSession:CircleSession;

        before(function(done) {
            this.timeout(0);
            themeManager.createTheme(theme, (t:Theme)=>{
                theme = t;
                userManager.registerUser(userOne, (u:User) =>{
                    userOne = u;
                   userManager.registerUser(userTwo, (u2:User)=>{
                       userTwo = u2;
                       try {
                           group._memberIds.push(userOne._id);
                           group._memberIds.push(userTwo._id);
                       } catch(e) {
                           done(e);
                       }

                       //FIXME group doesn't have real organisationid yet
                       groupManager.createGroup(group, (g:Group) =>{
                           group = g;
                           done();
                       });
                   });
                });
            });
        });
        it('Created circlesession should contain the users from the group', function(done:any) {
            this.timeout(0);
            circleSession = new CircleSession(group._id,[],theme._id,"","","",false,false,0,false);
            var circleSessionWrapper:CircleSessionCreateWrapper = new CircleSessionCreateWrapper(circleSession, []);
            circleSessionManager.createCircleSession(circleSessionWrapper, (c:CircleSession) => {
                circleSession = c;
                assert.equal(c._userIds.length, group._memberIds.length);
                assert.deepEqual(c._userIds, group._memberIds);
                done();
            });
        });
        after(function(done) {
            this.timeout(0);
            circleSessionManager.removeCircleSessionById(circleSession._id, (bc:boolean)=> {
               groupManager.removeGroupById(group._id, (bg:boolean)=>{
                   userManager.removeUserById(userOne._id, (bu1:boolean)=>{
                      userManager.removeUserById(userTwo._id, (bu2:boolean)=>{
                         themeManager.removeThemeById(theme._id, (bt:boolean)=>{
                            done();
                         });
                      });
                   });
               });
            });
        });
    });

    /*describe('movecardup', () =>{
       it('non-existent card should be created and have position 0', function(done:any) {
           this.timeout(0);
           circleSessionManager.cardUp("123456789","123456", "12", (cp:CardPosition) =>{
               assert.equal(cp._position, 0);
               assert.notEqual(cp._id, null);
               done();
           });
       });
    });*/
});

describe('CircleSessionModel', function() {
    describe('inProgress', function() {
        it('circleSession with startDate in future should return false', function() {
            var cs:CircleSession = CircleSession.empty();
            var d:Date = new Date();
            cs._startDate = "24/12/" + (d.getFullYear()+1) + " 08:30";
            var b = cs.isInProgress;
            assert.equal(b, false);
        });
        it('circleSession with startDate in past should return true', function() {
            var cs:CircleSession = CircleSession.empty();
            var d:Date = new Date();
            cs._startDate = "24/12/" + (d.getFullYear()-1) + " 08:30";
            var b = cs.isInProgress;
            assert.equal(b, true);
        });
    });
});
