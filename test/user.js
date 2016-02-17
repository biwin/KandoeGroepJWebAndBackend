/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
var assert = require('assert');
var userManager_1 = require("../app/backend/logic/userManager");
var user_1 = require("../app/backend/model/user");
describe('UserManager', function () {
    describe('createUser', function () {
        it('user must be saved in the database', function (done) {
            //this.timeout(0);
            var userManager = new userManager_1.UserManager();
            var user = new user_1.User("Jasper", "jasper.catthoor@student.kdg.be", "password");
            userManager.registerUser(user, function (u) {
                assert.equal(u._name, user._name);
                done();
            });
        });
    });
});
//# sourceMappingURL=user.js.map