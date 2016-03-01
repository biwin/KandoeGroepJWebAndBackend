/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/express/express.d.ts" />

import assert = require('assert');
import e = require("express");

import {timeout} from "rxjs/operator/timeout";
import {ObjectID} from "mongodb";

import {UserManager} from "../app/backend/logic/userManager";
import {Group} from "../app/backend/model/group";
import {Organisation} from "../app/backend/model/organisation";
import {User} from "../app/backend/model/user";

var userManager:UserManager;

before(function(done: any) {
    this.timeout(0);
    userManager = new UserManager();
    userManager.clearDatabase(() => {
        done();
    });
});

describe('UserManager', () => {

    //region user-tests
    describe('createUser', () => {
        var user = new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password');
        it('Register user, should return user from database', function (done:any) {
            this.timeout(0);
            userManager.registerUser(user, (u:User) => {
                try {
                    assert.equal(u._name, user._name);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
        after(function (done:any) {
            this.timeout(0);
            try {
                userManager.removeUser(user._name, () => {
                    done();
                });
            } catch (e) {
                done();
            }
        });

    });


    describe('getUserByName', () => {
        it('Read non-existing user, should return the null', function (done:any) {
            this.timeout(0);
            userManager.getUser('Jasper', (u:User) => {
                try {
                    assert.equal(null, u);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
    });


    describe('getUserByName', () => {
        var user = new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password');
        before(function (done:any) {
            this.timeout(0);
            try {
                userManager.registerUser(user, (u:User) => {
                    user = u;
                    done();
                });
            } catch (e) {
                done(e);
            }
        });
        it('Read existing user, should return the user', function (done:any) {
            this.timeout(0);
            userManager.getUser(user._name, (u:User) => {
                try {
                    assert.equal(user._name, u._name);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
        after(function (done:any) {
            this.timeout(0);
            try {
                userManager.removeUser(user._name, () => {
                    done();
                });
            } catch (e) {
                done();
            }
        });
    });

    describe('getAllUsers', () => {
        var users = [new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password'),
            new User('Jan', 'jasper.catthoor@student.kdg.be', 'password'),
            new User('Enio', 'jasper.catthoor@student.kdg.be', 'password')];
        before(function (done:any) {
            this.timeout(0);
            try {
                userManager.registerUser(users[0], (u1:User) => {
                    users[0] = u1;
                    userManager.registerUser(users[1], (u2:User) => {
                        users[1] = u2;
                        userManager.registerUser(users[2], (u3:User) => {
                            users[2] = u3;
                            done();
                        });
                    });
                });
            } catch (e) {
                done(e);
            }
        });
        it('Read all existing users', function (done:any) {
            this.timeout(0);
            try {
                userManager.getAllUsers((userArray:User[]) => {
                    assert.equal(userArray.length == users.length, true);
                    done();
                });
            } catch (e) {
                done(e);
            }
        });
        after(function (done:any) {
            this.timeout(0);
            try {
                userManager.removeUserById(users[0]._id, () => {
                    userManager.removeUserById(users[1]._id, () => {
                        userManager.removeUserById(users[2]._id, () => {
                            done();
                        });
                    });
                });
            } catch (e) {
                done(e);
            }
        });
    });

    describe('getUserById', () => {
        var user = new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password');
        before(function (done:any) {
            this.timeout(0);
            try {
                userManager.registerUser(user, (u:User) => {
                    user = u;
                    done();
                });
            } catch (e) {
                done(e);
            }
        });
        it('Read existing user by id, should return the user', function (done:any) {
            this.timeout(0);
            userManager.getUserById(user._id, (u:User) => {
                try {
                    assert.equal('Jasper', u._name);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
        after(function (done:any) {
            this.timeout(0);
            try {
                userManager.removeUser(user._name, () => {
                    done();
                });
            } catch (e) {
                done();
            }
        });
    });

    describe('removeUser', () => {
        it('Delete non-existing user, should return false', function (done:any) {
            this.timeout(0);
            userManager.removeUser('Jasper', (b:boolean) => {
                try {
                    assert.equal(b, false);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
    });

    describe('removeUser', () => {
        var user = new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password');
        before(function (done:any) {
            this.timeout(0);
            try {
                userManager.registerUser(user, (u:User) => {
                    user = u;
                    done();
                });
            } catch (e) {
                done(e);
            }
        });
        it('Delete existing user, should return true', function (done:any) {
            this.timeout(0);
            userManager.removeUser(user._name, (b:boolean) => {
                try {
                    assert.equal(b, true);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
    });
    //endregion

    //region organisation-test
    describe('createOrganisation', () => {
        var jasper:User = new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password');
        var rob:User = new User('Rob', 'rob.hendrickx@student.kdg.be', 'password');
        var users = [jasper._id, rob._id];
        var organisation = new Organisation('OrganisationName', users);
        before(function (done:any) {
            this.timeout(0);
            try {
                userManager.registerUser(jasper, (j:User) => {
                    jasper = j;
                    userManager.registerUser(rob, (r:User) => {
                        rob = r;
                        done();
                    });
                });
            } catch (e) {
                done(e);
            }
        });
        it('Create organisation, should return organisation from database', function (done:any) {
            this.timeout(0);
            userManager.createOrganisation(organisation, (o:Organisation) => {
                try {
                    organisation = o;
                    assert.equal(organisation._name, o._name);
                    assert.equal(organisation._memberIds.length, users.length);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
        after(function (done:any) {
            this.timeout(0);
            try {
                userManager.removeUserById(jasper._id, () => {
                    userManager.removeUserById(rob._id, () => {
                        userManager.removeOrganisationById(organisation._id, () => {
                            done();
                        })
                    });
                });
            } catch (e) {
                done(e);
            }
        });
    });


});