/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
import assert = require('assert');
import {UserManager} from "../app/backend/logic/userManager";
import {timeout} from "rxjs/operator/timeout";
import {User} from "../app/backend/model/user";

describe('UserManager', () => {

    var userManager: UserManager;

    before(() => { userManager = new UserManager(); });

    describe('deleteUser', () => {
        it('Delete non-existing user, should return false', function(done: any) {
            userManager.deleteUser('Jasper', (b: boolean) => {
                try {
                    assert.equal(b, false);
                    done();
                } catch(e) {
                    return done(e);
                }
            });
        });
    });

    describe('createUser', () => {
        it('Register user, should return user from database', function(done: any) {
            var user = new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'admin');
            userManager.registerUser(user, (u: User) => {
                try {
                    assert.equal(u._name, user._name);
                    done();
                } catch(e) {
                    return done(e);
                }
            });
        });
    });

    describe('getUser', () => {
        it('Read existing user, should return the user', function(done: any) {
            userManager.getUser('Jasper', (u: User) => {
                try {
                    assert.equal('Jasper', u._name);
                    done();
                } catch(e) {
                    return done(e);
                }
            });
        });
    });

    describe('deleteUser', () => {
        it('Delete existing user, should return true', function(done: any) {
            userManager.deleteUser('Jasper', (b: boolean) => {
                try {
                    assert.equal(b, true);
                    done();
                } catch(e) {
                    return done(e);
                }
            });
        });
    });

    describe('getUser', () => {
        it('Read non-existing user, should return the null', function(done: any) {
            this.timeout(0);
            userManager.getUser('Jasper', (u: User) => {
                try {
                    assert.equal(null, u);
                    done();
                } catch(e) {
                    return done(e);
                }
            });
        });
    });
});