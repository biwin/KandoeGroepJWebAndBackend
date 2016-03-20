
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

before(function(done: any) {
    this.timeout(0);
    userManager = new UserManager();
    done();
});

describe('UserManager', () => {
    //region user-tests
    describe('createUser', () => {
        var user = new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'web');
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
        var user = new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'web');
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
        var users = [new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'web'),
            new User('Jan', 'jasper.catthoor@student.kdg.be', 'password', 'web'),
            new User('Enio', 'jasper.catthoor@student.kdg.be', 'password', 'web')];
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
        var user = new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'web');
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
        var user = new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'web');
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
});
 /*   describe('createOrganisation', () => {
        var jasper:User = new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'web');
        var rob:User = new User('Rob', 'rob.hendrickx@student.kdg.be', 'password', 'web');
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

    describe('createGroupInOrganisation', () => {
        var jan: User = new User('Jan', 'jan.somers@student.kdg.be', 'password', 'web');
        var organisation: Organisation = new Organisation('Organisatie', []);
        var group: Group = new Group('Groupname', 'GroupDescription', "", []);
        before(function (done:any) {
            this.timeout(0);
            try {
                userManager.registerUser(jan, (u:User) => {
                    jan = u;
                    organisation._organisatorIds.push(u._id);
                    userManager.createOrganisation(organisation, (o: Organisation) => {
                        organisation = o;
                        group._organisationId = o._id;
                        group._memberIds.push(u._id);
                        userManager.setUserOrganisatorOf(u._id, o._id, () => {
                            done();
                        });
                    });
                });
            } catch (e) {
                done(e);
            }
        });
        it('Add group to organisation', function (done: any) {
            this.timeout(0);
            try {
                userManager.registerGroup(group, (g:Group) => {
                    userManager.getOrganisationById(organisation._id, (o: Organisation) => {
                        assert.equal(o._groupIds.map((orgGroup) => {return orgGroup.toString()}).indexOf(g._id.toString()) > -1, true);
                        done();
                    });
                });
            } catch (e) {
                done(e);
            }
        });
        after(function (done:any) {
            this.timeout(0);
            try {
                userManager.removeUserById(jan._id, () => {
                    userManager.removeGroupById(group._id, () => {
                        userManager.removeOrganisationById(organisation._id, () => {
                            done();
                        });
                    });
                });
            } catch (e) {
                done(e);
            }
        });
    });

    describe('addUserToOrganisation', () => {
        var jan:User = new User('Jan', 'jan.somers@student.kdg.be', 'password', 'web');
        var organisation = new Organisation('OrganisationName', []);
        before(function (done:any) {
            this.timeout(0);
            try {
                userManager.registerUser(jan, (u:User) => {
                    jan = u;
                    userManager.createOrganisation(organisation, (o:Organisation) => {
                        organisation = o;
                        done();
                    });
                });
            } catch (e) {
                done(e);
            }
        });
        it('Add user to organisation, should return organisation from database', function (done:any) {
            this.timeout(0);
            userManager.addToOrganisation(organisation._id, jan._id, true, (b: boolean) => {
                try {
                    assert.equal(b, true);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
        after(function (done:any) {
            this.timeout(0);
            try {
                userManager.removeUserById(jan._id, () => {
                    userManager.removeOrganisationById(organisation._id, () => {
                        done();
                    });
                });
            } catch (e) {
                done(e);
            }
        });
    });

    describe('addUserToGroup', () => {
        var jan:User = new User('Jan', 'addusertogroup@student.kdg.be', 'password', 'web');
        var organisation:Organisation = new Organisation('Organisation', []);
        var group:Group = new Group('GroupName', 'GroupDescription', '', []);
        before(function (done:any) {
            this.timeout(4000);
            try {
                userManager.registerUser(jan, (u:User) => {
                    jan = u;
                    organisation._memberIds.push(jan._id);
                    userManager.createOrganisation(organisation, (o:Organisation) => {
                        organisation = o;
                        group._organisationId = o._id;
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
            this.timeout(4000);
            try {
                userManager.addToGroupById(jan._id, group._id, () => {
                    userManager.getGroupById(group._id, (g: Group) => {
                        assert.equal(g._memberIds.map((member) => {return member.toString()}).indexOf(jan._id.toString()) > -1, true);
                        done();
                    });
                });
            } catch (e) {
                done(e);
            }

        });
        after(function (done:any) {
            this.timeout(5000);
            try {
                userManager.removeUserById(jan._id, () => {
                    userManager.removeGroupById(group._id, () => {
                        userManager.removeOrganisationById(organisation._id, () => {
                            done();
                        });
                    });
                });
            } catch (e) {
                done(e);
            }
        });
    });

    describe('removeUserFromOrganisation', () => {
        var user:User = new User('Michael', 'michael.deboey@student.kdg.be', 'password', 'web');
        var organisation:Organisation = new Organisation('Organisation', [user._id]);
        before(function (done:any) {
            this.timeout(0);
            try {
                userManager.registerUser(user, (u:User) => {
                    user = u;
                    organisation._organisatorIds.push(u._id);
                    userManager.createOrganisation(organisation, (o:Organisation) => {
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

            userManager.removeUserFromOrganisationById(organisation._id, user._id, () => {

                done();
            });
        });
        after(function (done:any) {
            this.timeout(0);
            try {
                userManager.removeOrganisationById(organisation._id, () => {
                    userManager.removeUserById(user._id, () => {
                        done();
                    });
                });
            } catch (e) {
                done(e);
            }
            done();
        });
    });

    describe('removeOrganisation', () => {
        var organisation:Organisation = new Organisation('Organisation', []);
        before(function (done:any) {
            try {
                userManager.createOrganisation(organisation, (o:Organisation) => {
                    organisation = o;
                    done();
                });
            } catch (e) {
                done(e);
            }
        });
        it('Remove Organisation', function (done:any) {
            try {
                this.timeout(0);
                userManager.removeOrganisationById(organisation._id, (b:boolean) => {
                    assert.equal(b, true);
                    done();
                });
            } catch (e) {
                done(e);
            }
        });
    })

    describe('removeUserFromGroupById', () => {
        var jan:User;
        var group:Group;
        before(function (done:any) {
            this.timeout(0);
            try {
                userManager.registerUser(new User('Jan', 'addusertogroup@student.kdg.be', 'password', 'web'), (u:User) => {
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
            userManager.removeUserFromGroupById(jan._id, group._id, (b:boolean) => {
                try {
                    assert.equal(b, true);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
        after(function (done:any) {
            this.timeout(0);
            userManager.removeGroupById(group._id, () => {
                userManager.removeUser(jan._id, () => {
                    done();
                });
            });

        });
    });

    describe('getGroupByName', () => {
        var group:Group = new Group('Organisation', 'Group', 'Descript');
        before(function (done:any) {
            this.timeout(0);

            try {
                userManager.registerGroup(group, (g:Group) => {
                    group = g;
                });
            } catch (e) {
                done(e);
            }
        });
        it('Read existing group, should return the group', function (done:any) {
            userManager.getGroupById(group._id, (g:Group) => {
                try {
                    assert.equal(group._id, g._id);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
        after(function (done:any) {
            this.timeout(0);
            userManager.removeGroupById(group._id, () => {
                done();
            });
        });

    });

    describe('getGroupById', () => {
        var group:Group = new Group('Organisation', 'Group', 'Descript');
        before(function (done:any) {
            this.timeout(0);

            try {
                userManager.registerGroup(group, (g:Group) => {
                    group = g;
                });
            } catch (e) {
                done(e);
            }
        });
        it('Read existing group, should return the group', function (done:any) {
            userManager.getGroupById(group._id, (g:Group) => {
                try {
                    assert.equal(group._id, g._id);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
        after(function (done:any) {
            userManager.removeGroupById(group._id, () => {
            });
        });

    });

    describe('removeGroup', () => {
        var organisation = new Organisation('Organisation', []);
        var group:Group = new Group('Group', 'Description', organisation._id, []);
        before(function (done:any) {
            this.timeout(0);
            try {
                userManager.createOrganisation(organisation, (o:Organisation) => {
                    organisation = o;
                    userManager.registerGroup(group, (g:Group) => {
                        group = g;
                        done();
                    });
                });
            } catch (e) {
                done(e);
            }
        });
        it('Remove group and reference in organisation', function (done:any) {
            this.timeout(0);
            userManager.removeGroupById(group._id, (b:boolean) => {
                try {
                    assert.equal(b, true);
                    done();

                } catch (e) {
                    done(e);
                }
            });
        });
        after(function (done:any) {
            userManager.removeGroupById(group._id, () => {
                userManager.removeOrganisationById(organisation._id, () => {
                    done();
                });
            });
        });
    });*/


