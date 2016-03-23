/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/express/express.d.ts" />

import assert = require('assert');
import e = require("express");

import {UserManager} from "../app/backend/logic/userManager";
import {User} from "../app/backend/model/user";
import {Group} from "../app/backend/model/group";
import {Organisation} from "../app/backend/model/organisation";

var userManager:UserManager;

before(function (done:any) {
    this.timeout(50000);
    userManager = new UserManager();
    done();
});

describe('UserManager', () => {
    //region user-tests
    describe('createUser', () => {
        var user = new User('Jasper', 'createUserTest@testing.com', 'password', 'test');
        before(function(done: any) {
            this.timeout(100000);
            userManager.deleteTestUsers(() => {
                done();
            });
        });

        it('Register user, should return user from database', function (done:any) {
            this.timeout(100000);
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
            this.timeout(100000);
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
            this.timeout(100000);
            userManager.getUser('I do not exist in the db', (u:User) => {
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
        var user = new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'web');
        before(function (done:any) {
            this.timeout(50000);
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
            this.timeout(50000);
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
            this.timeout(50000);
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
        var users = [new User('Jasper', 'getAllUsers1@testing.com', 'password', 'test'),
            new User('Jan', 'getAllUsers2@testing.com', 'password', 'test'),
            new User('Enio', 'getAllUsers3@testing.com', 'password', 'test')];
        before(function (done:any) {
            this.timeout(50000);
            try {
                userManager.deleteTestUsers(() => {
                    userManager.registerUser(users[0], (u1:User) => {
                        users[0] = u1;
                        assert.notEqual(u1, null);
                        userManager.registerUser(users[1], (u2:User) => {
                            users[1] = u2;
                            assert.notEqual(u2, null);
                            userManager.registerUser(users[2], (u3:User) => {
                                users[2] = u3;
                                assert.notEqual(u3, null);
                                done();
                            });
                        });
                    });
                });
            } catch (e) {
                done(e);
            }
        });
        it('Read all existing users', function (done:any) {
            this.timeout(100000);
            try {
                userManager.getAllUsers((userArray:User[]) => {
                    var createdUsersFromGet:User[] = userArray.map((u:User) => {
                        u._id = u._id.toString();
                        return u;
                    }).filter((u:User) => {
                        return u._id === users[0]._id || u._id === users[1]._id || u._id === users[2]._id;
                    });
                    assert.equal(createdUsersFromGet.length, users.length);
                    done();
                });
            } catch (e) {
                done(e);
            }
        });
        after(function (done:any) {
            this.timeout(50000);
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
        var user = new User('Jasper', 'getUserByIdTest@testing.com', 'password', 'test');
        before(function (done:any) {
            this.timeout(50000);
            try {
                userManager.registerUser(user, (u:User) => {
                    user = u;
                    assert.notEqual(u, null);
                    done();
                });
            } catch (e) {
                done(e);
            }
        });
        it('Read existing user by id, should return the user', function (done:any) {
            this.timeout(100000);
            userManager.getUserById(user._id, (u:User) => {
                try {
                    assert.equal(user._name, u._name);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
        after(function (done:any) {
            this.timeout(50000);
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
            this.timeout(100000);
            userManager.removeUser('I will not exist in the db', (b:boolean) => {
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
        var user = new User('Jasper', 'removeUser@testing.com', 'password', 'test');
        before(function (done:any) {
            this.timeout(50000);
            try {
                userManager.registerUser(user, (u:User) => {
                    assert.notEqual(u, null);
                    user = u;
                    done();
                });
            } catch (e) {
                done(e);
            }
        });
        it('Delete existing user, should return true', function (done:any) {
            this.timeout(100000);
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
});