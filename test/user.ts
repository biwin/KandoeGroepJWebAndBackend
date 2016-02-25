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

var userManager: UserManager;

before(function(done: any) {
    userManager = new UserManager();
    userManager.clearDatabase(() => {
        done();
    });
});

describe('UserManager', () => {

    //region user-tests
    describe('createUser', () => {
        var user = new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'admin');
        it('Register user, should return user from database', function (done: any) {
            this.timeout(0);
            userManager.registerUser(user, (u: User) => {
                try {
                    assert.equal(u._name, user._name);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
        after(function(done: any) {
            this.timeout(0);
            try {
                userManager.deleteUser(user._name, () => { done(); });
            } catch (e) {
                done();
            }
        });

    }); //check

    describe('getUserByName', () => {
        it('Read non-existing user, should return the null', function (done: any) {
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
    }); //check

    describe('getUserByName', () => {
        var user = new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'admin');
        before(function (done: any) {
            this.timeout(0);
            try {
                userManager.registerUser(user, (u: User) => {
                    user = u;
                    done();
                });
            } catch (e) {
                done(e);
            }
        });
        it('Read existing user, should return the user', function (done:any) {
            userManager.getUser(user._name, (u:User) => {
                try {
                    assert.equal(user._name, u._name);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
        after(function(done: any) {
            this.timeout(0);
            try {
                userManager.deleteUser(user._name, () => { done(); });
            } catch (e) {
                done();
            }
        });
    }); //check

    describe('getAllUsers', () => {
        var users = [new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'admin'),
            new User('Jan', 'jasper.catthoor@student.kdg.be', 'password', 'admin'),
            new User('Enio', 'jasper.catthoor@student.kdg.be', 'password', 'admin')];
        before(function (done: any) {
            this.timeout(0);
            try {
                var amountOfUsersRegistered: number = 0;
                for (var index in users) {
                    userManager.registerUser(users[index], (u: User) => {
                        users[index] = u;
                        if (++amountOfUsersRegistered == 3) done();
                    });
                }
            } catch (e) {
                done(e);
            }
        });
        it('Read all existing users', function (done: any) {
            try {
                userManager.getAllUsers((userArray:User[]) => {
                    assert.equal(userArray.length == users.length, true);
                    done();
                });
            } catch (e) {
                done(e);
            }
        });
        after(function(done: any) {
            this.timeout(0);
            try {
                var amountOfUsersDeleted: number = 0;
                for (var index in users) {
                    userManager.deleteUserById(users[index]._id, () => {
                        if (++amountOfUsersDeleted == 3) done();
                    });
                }
            } catch (e) {
                done();
            }
        });
    }); //check

    describe('getUserById', () => {
        var user = new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'admin');
        before(function (done: any) {
            this.timeout(0);
            try {
                userManager.registerUser(user, (u: User) => {
                    user = u;
                    done();
                });
            } catch (e) {
                done(e);
            }
        });
        it('Read existing user, should return the user', function (done: any) {
            userManager.getUserById(user._id, (u: User) => {
                try {
                    assert.equal('Jasper', u._name);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
        after(function(done: any) {
            this.timeout(0);
            try {
                userManager.deleteUser(user._name, () => { done(); });
            } catch (e) {
                done();
            }
        });
    }); //check

    describe('deleteUser', () => {
        it('Delete non-existing user, should return false', function (done: any) {
            userManager.deleteUser('Jasper', (b: boolean) => {
                try {
                    assert.equal(b, false);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
    }); //check

    describe('deleteUser', () => {
        var user = new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'admin');
        before(function (done: any) {
            this.timeout(0);
            try {
                userManager.registerUser(user, (u: User) => {
                    user = u;
                    done();
                });
            } catch (e) {
                done(e);
            }
        });
        it('Delete existing user, should return true', function (done: any) {
            this.timeout(0);
            userManager.deleteUser(user._name, (b: boolean) => {
                try {
                    assert.equal(b, true);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
    }); //check
    //endregion

    //region organisation-test
    describe('createOrganisation', () => {
        var jasper: User = new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'admin');
        var rob: User = new User('Rob', 'rob.hendrickx@student.kdg.be', 'password', 'admin');
        var users = [jasper._id, rob._id];
        var organisation = new Organisation('OrganisationName', users);
        before(function (done: any) {
            this.timeout(0);
            var users: number = 0;
            try {
                userManager.registerUser(jasper, (u: User) => {
                    jasper = u;
                    if (++users == 2) done();
                });
                userManager.registerUser(rob, (u: User) => {
                    rob = u;
                    if (++users == 2) done();
                });
            } catch (e) {
                done(e);
            }
        });
        it('Create organisation, should return organisation from database', function (done: any) {
            this.timeout(0);
            userManager.createOrganisation(organisation, (o: Organisation) => {
                try {
                    organisation = o;
                    assert.equal(organisation._name, o._name);
                    assert.equal(organisation._organisators.length, users.length);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
        after(function(done: any) {
            var steps: number = 0;
            try {
                userManager.deleteUserById(jasper._id, () => {
                    if (++steps == 3) done();
                });
                userManager.deleteUserById(rob._id, () => {
                    if (++steps == 3) done();
                });
                userManager.removeOrganisationById(organisation._id, () => {
                    if (++steps == 3) done();
                })
            } catch (e) {
                done(e);
            }
        });
    }); //check

    describe('addUserToOrganisation', () => {
        var jan: User = new User('Jan', 'jan.somers@student.kdg.be', 'password', 'admin');
        var organisation = new Organisation('OrganisationName', []);
        before(function (done:any) {
            this.timeout(0);
            try {
                var steps: number = 0;
                userManager.registerUser(jan, (u: User) => {
                    jan = u;
                    if (++steps == 2) done();
                });
                userManager.createOrganisation(organisation, (o: Organisation) => {
                    organisation = o;
                    if (++steps == 2) done();
                });
            } catch (e) {
                done(e);
            }
        });
        it('Add user to organisation, should return organisation from database', function (done:any) {
            this.timeout(0);
            userManager.addToOrganisation(organisation._name, jan._id, (o: Organisation) => {
                try {
                    assert.equal(o._organisators.length, 1);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
        after(function (done: any) {
            this.timeout(0);
            try {
                var steps: number = 0;
                userManager.deleteUserById(jan._id, () => {
                    if (++steps == 2) done();
                });
                userManager.removeOrganisationById(organisation._id, () => {
                    if (++steps == 2) done();
                });
            } catch (e) {
                done(e);
            }
        });
    }); //check

    describe('removeUserFromOrganisation', () => {
        var user: User = new User('Michael', 'michael.deboey@student.kdg.be', 'password', 'admin');
        var organisation: Organisation = new Organisation('Organisation' ,[user._id]);
        before(function (done:any) {
            this.timeout(0);
            try {
                userManager.registerUser(user, (u:User) => {
                    user = u;
                    userManager.createOrganisation(organisation, (o: Organisation) => {
                        organisation = o;
                        done();
                    });
                });
            } catch (e) {
                done(e);
            }
        });
        it('Remove user from organisation, should return true since user was in organisation', function (done:any) {
            this.timeout(0);
            userManager.removeUserFromOrganisationById(organisation._id, user._id, (b:boolean) => {
                try {
                    assert.equal(b, true);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
        after( function (done: any) {
            this.timeout(0);
            try {
                userManager.removeOrganisationById(organisation._id, () => {
                    userManager.deleteUserById(user._id, () => {
                       done();
                    });
                });
            } catch (e) {
                done(e);
            }
        });
    }); //check

    describe('addUserToGroup', () => {
        var jan:User = new User('Jan', 'addusertogroup@student.kdg.be', 'password', 'admin');
        var organisation:Organisation = new Organisation('Organisation', [jan._id]);
        var group:Group = new Group(organisation._name, 'Group', 'Description');
        before(function (done:any) {
            this.timeout(0);
            try {
                userManager.registerUser(jan, (u:User) => {
                    jan = u;
                    userManager.createOrganisation(organisation, (o:Organisation) => {
                        organisation = o;
                        userManager.registerGroup(group, (g:Group) => {
                            group = g;
                            done();
                        });
                    });

                });

            } catch (e) {
                done(e);
            }

        });
        it('Add user to group', function (done:any) {
            this.timeout(0);
            userManager.addToGroupById(jan._id, group._id, (g:Group) => {
                try {
                    assert.equal((group._users.indexOf(jan._id) > -1), true);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
        after(function (done:any) {
            userManager.deleteUserById(jan._id, () => {
                userManager.removeGroupById(group._id, () => {
                    userManager.removeOrganisationById(organisation._id, () => {
                        done();
                    });
                });
            });
        });
    }); // check


    describe('removeUserFromGroupById', () => {
        var jan:User;
        var group:Group;
        before(function (done:any) {
            this.timeout(0);
            try {
                userManager.registerUser(new User('Jan', 'addusertogroup@student.kdg.be', 'password', 'admin'), (u:User) => {
                    jan = u;
                    userManager.registerGroup(new Group('Organisatie', 'Group', 'Description'), (g:Group) => {
                        group = g;
                    });
                    userManager.addToGroupById(jan._id, group._name, () => {
                        done();
                    });

                });

            } catch (e) {
                done(e);
            }

        });
        it('Add user to group', function (done:any) {
            this.timeout(0);
            userManager.removeUserFromGroupById(jan._id, group._id, (g:Group) => {
                try {
                    assert.equal((group._users.indexOf(jan._id) > -1), false);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
    });

    describe('getGroupByName', () => {
        var group: Group;
        before(function (done:any) {
            this.timeout(0);

            try {
                userManager.registerGroup(new Group('Organisation', 'Group', 'Descript'), (g: Group) => {
                    group = g;
                });
            } catch (e) {
                done(e);
            }
        });
        it('Read existing group, should return the group', function (done:any) {
            userManager.getGroupByName(group._name, (g: Group) => {
                try {
                    assert.equal(group._name, g._name);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });

    });

    describe('getGroupById', () => {
        var group: Group;
        before(function (done:any) {
            this.timeout(0);

            try {
                userManager.registerGroup(new Group('Organisation', 'Group', 'Descript'), (g: Group) => {
                    group = g;
                });
            } catch (e) {
                done(e);
            }
        });
        it('Read existing group, should return the group', function (done:any) {
            userManager.getGroupByName(group._id, (g: Group) => {
                try {
                    assert.equal(group._id, g._id);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });

    });



    describe('createGroupInOrganisation', () => {
        var jan:User;
        var organisatie:Organisation;
        before(function (done:any) {
            this.timeout(0);
            try {
                userManager.registerUser(new User('Jan', 'jan.somers@student.kdg.be', 'password', 'admin'), (u:User) => {
                    jan = u;
                });
                userManager.createOrganisation(new Organisation('Organisatie'), (o:Organisation) => {
                    organisatie = o;
                });
                userManager.addToOrganisation(organisatie._name, jan._id, () => {
                    done();
                });

            } catch (e) {
                done(e);
            }
        });
        it('Add group to organisation of the user', function (done:any) {
            this.timeout(0);

            var userInOrg = organisatie._organisators.indexOf(jan._id) > -1;
            if (userInOrg) {
                var group = new Group(organisatie._name, 'Groep', 'Description');
                userManager.registerGroup(group, (g:Group) => {
                    try {
                        assert.equal(g._name, group._name);
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
            }
            else {
                throw new Error('user not in organiation');
            }
        });
    });

    describe('deleteGroup', () => {
        var group:Group;
        var organisation = new Organisation('Organisation');
        before(function (done:any) {
            this.timeout(0);
            try {

                userManager.registerGroup(new Group(organisation._name,'Group', 'Description'),  (g:Group) => {
                    group = g;
                    done();
                });

            } catch (e) {
                done(e);
            }

        });
        it('Remove group and reference in organisation', function(done: any) {
            this.timeout(0);
            userManager.removeGroupById(group._id, (b: boolean) => {
                try {
                    var inOrg = organisation.groups.indexOf(group._id) > -1;
                    assert.equal(b, false);
                    assert.equal(inOrg, false);
                    done();

                } catch(e) {
                    done(e);
                }
            });
        });
    });
    //endregion

});