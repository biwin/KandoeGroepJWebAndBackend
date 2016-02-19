/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
import assert = require('assert');
import {UserManager} from "../app/backend/logic/userManager";
import {timeout} from "rxjs/operator/timeout";
import {User} from "../app/backend/model/user";
import {Organisation} from "../app/backend/model/organisation";
import {ObjectID} from "mongodb";

var userManager: UserManager;

before(function(done: any) {
    userManager = new UserManager();
    userManager.clearDatabase(() => {
        done();
    });
});

describe('UserManager', () => {

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
            this.timeout(0);
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

    var userId: string;
    describe('getUserByName', () => {
        it('Read existing user, should return the user', function(done: any) {
            userManager.getUser('Jasper', (u: User) => {
                try {
                    assert.equal('Jasper', u._name);
                    userId = u._id;
                    done();
                } catch(e) {
                    return done(e);
                }
            });
        });
    });

    describe('getUserById', () => {
        it('Read existing user, should return the user', function(done: any) {
            userManager.getUserById(userId, (u: User) => {
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
            this.timeout(0);
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

    describe('createOrganisation', () => {
        var jasper: User;
        var rob: User;
        before(function(done: any) {
            this.timeout(0);
            var users: number = 0;
            try {
                userManager.registerUser(new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'admin'), (u: User) => {
                    jasper = u;
                    if (++users == 2) done();
                });
                userManager.registerUser(new User('Rob', 'rob.hendrickx@student.kdg.be', 'password', 'admin'), (u: User) => {
                    rob = u;
                    if (++users == 2) done();
                });
            } catch(e) {
                done(e);
            }
        });
        it('Create organisation, should return organisation from database', function(done: any) {
            this.timeout(0);
            var organisation = new Organisation('OrganisationName', [jasper._id, rob._id]);
            userManager.createOrganisation(organisation, (o: Organisation) => {
                try {
                    assert.equal(organisation._name, o._name);
                    done();
                } catch(e) {
                    return done(e);
                }
            });
        });
    });

    describe('addUserToOrganisation', () => {
        var jan: User;
        before(function(done: any) {
            this.timeout(0);
            try {
                userManager.registerUser(new User('Jan', 'jan.somers@student.kdg.be', 'password', 'admin'), (u: User) => {
                    jan = u;
                    done();
                });
            } catch(e) {
                done(e);
            }
        });
        it('Add user to organisation, should return organisation from database', function(done: any) {
            this.timeout(0);
            userManager.addToOrganisation('OrganisationName', jan._id, (o: Organisation) => {
                try {
                    assert.equal(o._organisators.length, 3);
                    done();
                } catch(e) {
                    return done(e);
                }
            });
        });
    });

    describe('removeUserFromOrganisation', () => {
        var michael: User;
        before(function(done: any) {
            this.timeout(0);
            try {
                userManager.registerUser(new User('Michael', 'michael.deboey@student.kdg.be', 'password', 'admin'), (u: User) => {
                    michael = u;
                    userManager.addToOrganisation('OrganisationName', michael._id, () => { done(); });
                });
            } catch(e) {
                done(e);
            }
        });
        it('Remove user from organisation, should return true since user was in organisation', function(done: any) {
            this.timeout(0);
            userManager.removeUserFromOrganisation('OrganisationName', michael._id, (b: boolean) => {
                try {
                    console.log('Michael id2: ' + michael._id);
                    assert.equal(b, true);
                    done();
                } catch(e) {
                    return done(e);
                }
            });
        });
    });

  /*  describe('removeUserFromOrganisation', () => {
        it('Remove user from organisation, should return false since user was NOT in organisation', function(done: any) {
            this.timeout(0);
            userManager.removeUserFromOrganisation('OrganisationName', 'nonExistingUserId1234', (b: boolean) => {
                try {
                    assert.equal(b, false);
                    done();
                } catch(e) {
                    return done(e);
                }
            });
        });
    });*/
});