/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
"use strict";
var assert = require('assert');
var userManager_1 = require("../app/backend/logic/userManager");
var user_1 = require("../app/backend/model/user");
var userManager;
before(function (done) {
    this.timeout(0);
    userManager = new userManager_1.UserManager();
    done();
});
describe('UserManager', function () {
    //region user-tests
    describe('createUser', function () {
        var user = new user_1.User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'web');
        it('Register user, should return user from database', function (done) {
            this.timeout(0);
            userManager.registerUser(user, function (u) {
                try {
                    assert.equal(u._name, user._name);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
        after(function (done) {
            this.timeout(0);
            try {
                userManager.removeUser(user._name, function () {
                    done();
                });
            }
            catch (e) {
                done();
            }
        });
    });
    describe('getUserByName', function () {
        it('Read non-existing user, should return the null', function (done) {
            this.timeout(0);
            userManager.getUser('I do not exist in the db', function (u) {
                try {
                    assert.equal(null, u);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
    });
    describe('getUserByName', function () {
        var user = new user_1.User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'web');
        before(function (done) {
            this.timeout(0);
            try {
                userManager.registerUser(user, function (u) {
                    user = u;
                    done();
                });
            }
            catch (e) {
                done(e);
            }
        });
        it('Read existing user, should return the user', function (done) {
            this.timeout(0);
            userManager.getUser(user._name, function (u) {
                try {
                    assert.equal(user._name, u._name);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
        after(function (done) {
            this.timeout(0);
            try {
                userManager.removeUser(user._name, function () {
                    done();
                });
            }
            catch (e) {
                done();
            }
        });
    });
    describe('getAllUsers', function () {
        var users = [new user_1.User('Jasper', 'getAllUsers1@testing.com', 'password', 'test'),
            new user_1.User('Jan', 'getAllUsers2@testing.com', 'password', 'test'),
            new user_1.User('Enio', 'getAllUsers3@testing.com', 'password', 'test')];
        before(function (done) {
            this.timeout(0);
            try {
                userManager.deleteTestUsers(function () {
                    userManager.registerUser(users[0], function (u1) {
                        users[0] = u1;
                        userManager.registerUser(users[1], function (u2) {
                            users[1] = u2;
                            userManager.registerUser(users[2], function (u3) {
                                users[2] = u3;
                                done();
                            });
                        });
                    });
                });
            }
            catch (e) {
                done(e);
            }
        });
        it('Read all existing users', function (done) {
            this.timeout(0);
            try {
                userManager.getAllUsers(function (userArray) {
                    var createdUsersFromGet = userArray.map(function (u) {
                        u._id = u._id.toString();
                        return u;
                    }).filter(function (u) {
                        return u._id === users[0]._id || u._id === users[1]._id || u._id === users[2]._id;
                    });
                    assert.equal(createdUsersFromGet.length, users.length);
                    done();
                });
            }
            catch (e) {
                done(e);
            }
        });
        after(function (done) {
            this.timeout(0);
            try {
                userManager.removeUserById(users[0]._id, function () {
                    userManager.removeUserById(users[1]._id, function () {
                        userManager.removeUserById(users[2]._id, function () {
                            done();
                        });
                    });
                });
            }
            catch (e) {
                done(e);
            }
        });
    });
    describe('getUserById', function () {
        var user = new user_1.User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'web');
        before(function (done) {
            this.timeout(0);
            try {
                userManager.registerUser(user, function (u) {
                    user = u;
                    done();
                });
            }
            catch (e) {
                done(e);
            }
        });
        it('Read existing user by id, should return the user', function (done) {
            this.timeout(0);
            userManager.getUserById(user._id, function (u) {
                try {
                    assert.equal('Jasper', u._name);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
        after(function (done) {
            this.timeout(0);
            try {
                userManager.removeUser(user._name, function () {
                    done();
                });
            }
            catch (e) {
                done();
            }
        });
    });
    describe('removeUser', function () {
        it('Delete non-existing user, should return false', function (done) {
            this.timeout(0);
            userManager.removeUser('Jasper', function (b) {
                try {
                    assert.equal(b, false);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
    });
    describe('removeUser', function () {
        var user = new user_1.User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'web');
        before(function (done) {
            this.timeout(0);
            try {
                userManager.registerUser(user, function (u) {
                    user = u;
                    done();
                });
            }
            catch (e) {
                done(e);
            }
        });
        it('Delete existing user, should return true', function (done) {
            this.timeout(0);
            userManager.removeUser(user._name, function (b) {
                try {
                    assert.equal(b, true);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
    });
    //endregion
});
//# sourceMappingURL=user.js.map