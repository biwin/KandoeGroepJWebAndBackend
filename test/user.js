/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
var userManager_1 = require("../app/backend/logic/userManager");
var assert = require('assert');
describe('UserManager', function () {
    describe('createUser', function () {
        it('should return the created user object', function () {
            var userManager = new userManager_1.UserManager();
            var user = userManager.registerUser('t1', 'jasper.catthoor@gmail.be', 'pass123');
            if (user != null) {
                assert.equal(user.id, 't1');
            }
            else {
                assert.equal(false, true);
            }
        });
    });
});
//# sourceMappingURL=user.js.map