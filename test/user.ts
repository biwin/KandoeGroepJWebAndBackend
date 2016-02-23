/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
import assert = require('assert');
import {UserManager} from "../app/backend/logic/userManager";
import {timeout} from "rxjs/operator/timeout";
import {User} from "../app/backend/model/user";
import {Organisation} from "../app/backend/model/organisation";
import {ObjectID} from "mongodb";
import {Group} from "../app/backend/model/group";

var userManager: UserManager;

before(function(done: any) {
    userManager = new UserManager();
    userManager.clearDatabase(() => {
        done();
    });
});

describe('UserManager', () => {

    describe('deleteUser', () => {
        it('Delete non-existing user, should return false', function (done:any) {
            userManager.deleteUser('Jasper', (b:boolean) => {
                try {
                    assert.equal(b, false);
                    done();
                } catch (e) {
                    return done(e);
                }
            });
        });
    });

    describe('createUser', () => {
        it('Register user, should return user from database', function (done:any) {
            this.timeout(0);
            var user = new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'admin');
            userManager.registerUser(user, (u:User) => {
                try {
                    assert.equal(u._name, user._name);
                    done();
                } catch (e) {
                    return done(e);
                }
            });
        });
    });

    var userId:string;
    describe('getUserByName', () => {
        it('Read existing user, should return the user', function (done:any) {
            userManager.getUser('Jasper', (u:User) => {
                try {
                    assert.equal('Jasper', u._name);
                    userId = u._id;
                    done();
                } catch (e) {
                    return done(e);
                }
            });
        });
    });



    describe('getUserById', () => {
        it('Read existing user, should return the user', function (done:any) {
            userManager.getUserById(userId, (u:User) => {
                try {
                    assert.equal('Jasper', u._name);
                    done();
                } catch (e) {
                    return done(e);
                }
            });
        });
    });

    describe('deleteUser', () => {
        it('Delete existing user, should return true', function (done:any) {
            this.timeout(0);
            userManager.deleteUser('Jasper', (b:boolean) => {
                try {
                    assert.equal(b, true);
                    done();
                } catch (e) {
                    return done(e);
                }
            });
        });
    });

    describe('getUser', () => {
        it('Read non-existing user, should return the null', function (done:any) {
            this.timeout(0);
            userManager.getUser('Jasper', (u:User) => {
                try {
                    assert.equal(null, u);
                    done();
                } catch (e) {
                    return done(e);
                }
            });
        });
    });

    describe('createOrganisation', () => {
        var jasper:User;
        var rob:User;
        before(function (done:any) {
            this.timeout(0);
            var users:number = 0;
            try {
                userManager.registerUser(new User('Jasper', 'jasper.catthoor@student.kdg.be', 'password', 'admin'), (u:User) => {
                    jasper = u;
                    if (++users == 2) done();
                });
                userManager.registerUser(new User('Rob', 'rob.hendrickx@student.kdg.be', 'password', 'admin'), (u:User) => {
                    rob = u;
                    if (++users == 2) done();
                });
            } catch (e) {
                done(e);
            }
        });
        it('Create organisation, should return organisation from database', function (done:any) {
            this.timeout(0);
            var organisation = new Organisation('OrganisationName', [jasper._id, rob._id]);
            userManager.createOrganisation(organisation, (o:Organisation) => {
                try {
                    assert.equal(organisation._name, o._name);
                    done();
                } catch (e) {
                    return done(e);
                }
            });
        });
    });


    describe('addUserToOrganisation', () => {
        var jan:User;
        before(function (done:any) {
            this.timeout(0);
            try {
                userManager.registerUser(new User('Jan', 'jan.somers@student.kdg.be', 'password', 'admin'), (u:User) => {
                    jan = u;
                    done();
                });
            } catch (e) {
                done(e);
            }
        });
        it('Add user to organisation, should return organisation from database', function (done:any) {
            this.timeout(0);
            userManager.addToOrganisation('OrganisationName', jan._id, (o:Organisation) => {
                try {
                    assert.equal(o._organisators.length, 3);
                    done();
                } catch (e) {
                    return done(e);
                }
            });
        });
    });

    describe('removeUserFromOrganisation', () => {
        var michael:User;
        before(function (done:any) {
            this.timeout(0);
            try {
                userManager.registerUser(new User('Michael', 'michael.deboey@student.kdg.be', 'password', 'admin'), (u:User) => {
                    michael = u;
                    userManager.addToOrganisation('OrganisationName', michael._id, () => {
                        done();
                    });
                });
            } catch (e) {
                done(e);
            }
        });
        it('Remove user from organisation, should return true since user was in organisation', function (done:any) {
            this.timeout(0);
            userManager.removeUserFromOrganisation('OrganisationName', michael._id, (b:boolean) => {
                try {
                    console.log('Michael id2: ' + michael._id);
                    assert.equal(b, true);
                    done();
                } catch (e) {
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

    //Group-testen
    //todo testjes bij steken
    describe('addUserToGroup', () => {
        var jan:User;
        var group:Group;
        before(function (done:any) {
            this.timeout(0);
            try {
                userManager.registerUser(new User('Jan', 'addusertogroup@student.kdg.be', 'password', 'admin'), (u:User) => {
                    jan = u;
                    var organisation = new Organisation('Organisation');
                    userManager.registerGroup(new Group(organisation._name,'Group', 'Description'),  (g:Group) => {
                        group = g;
                        done();
                    });
                });

            } catch (e) {
                done(e);
            }

        });
        it('Add user to group', function (done:any) {
            this.timeout(0);
            userManager.addToGroup(jan._id, group._name, (g:Group) => {
                try {
                    assert.equal((group._users.indexOf(jan._id) > -1), true);
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
        });
    });

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
                    userManager.addToGroup(jan._id, group._name, () => {
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
                    return done(e);
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
                    return done(e);
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
            userManager.removeGroup(group._id, (b: boolean) => {
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

});

