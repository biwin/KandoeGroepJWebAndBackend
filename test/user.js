/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
var userManager_1 = require("../app/backend/logic/userManager");
var assert = require('assert');
describe('UserManager', function () {
    describe('createUser', function () {
        it('should return the created user object', function () {
            var userManager = new userManager_1.UserManager();
            var user = userManager.createUser('t1', 'jasper.catthoor@gmail.be', 'pass123');
            assert.equal(user.id, 't1');
        });
    });
});
//# sourceMappingURL=user.js.map