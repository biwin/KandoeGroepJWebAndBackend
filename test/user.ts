/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
var assert = require('assert');


describe('UserManager', () => {
    describe('createUser', () => {
        it('should return the created user object', () => {
            var userManager = new UserManager();
            var user = userManager.createUser('t1','jasper.catthoor@gmail.be','pass123');
            assert.equal(user.id, 't1')
        });
    });
});