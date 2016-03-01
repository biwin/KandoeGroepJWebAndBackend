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
    describe('movecardup', function () {
        it('non-existent card should be created and have position 0', function (done) {
            this.timeout(0);
            circleSessionManager.cardUp("123456789", "123456", "12", function (cp) {
                assert.equal(cp._position, 0);
                assert.notEqual(cp._id, null);
                done();
            });
        });
    });
});
//# sourceMappingURL=circleSession.js.map