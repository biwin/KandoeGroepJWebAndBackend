/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
import assert = require('assert');
import {UserManager} from "../app/backend/logic/userManager";
import {timeout} from "rxjs/operator/timeout";
import {User} from "../app/backend/model/user";

describe('UserManager', () => {
    describe('createUser', () => {
        it('user must be saved in the database', function(done: any) {
            //this.timeout(0);
            var userManager: UserManager = new UserManager();
            var user: User = new User("Jasper", "jasper.catthoor@student.kdg.be", "password");
            userManager.registerUser(user, (u: User) => {
                assert.equal(u._name, user._name);
                done();
            });
        });
    });
});