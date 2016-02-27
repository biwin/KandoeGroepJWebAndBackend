/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
var assert = require('assert');
var circleSession_1 = require("../app/backend/model/circleSession");
var circleSessionManager_1 = require("../app/backend/logic/circleSessionManager");
var circleSessionManager;
before(function (done) {
    circleSessionManager = new circleSessionManager_1.CircleSessionManager();
});
describe('CircleSessionManager', function () {
    describe('createCircleSession', function () {
        it('Created circlesession should return from the database', function (done) {
            this.timeout(0);
            var circleSession = new circleSession_1.CircleSession("g1", "t1", "u1", "21/03/2016", true, false, 5);
            circleSessionManager.createCircleSession(circleSession, function (c) {
                assert.notEqual(c._id, null);
                assert.notEqual(c._id, "");
                done();
            });
        });
    });
});
//# sourceMappingURL=circleSession.js.map