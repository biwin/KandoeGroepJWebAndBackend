/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
var assert = require('assert');
var userManager_1 = require("../app/backend/logic/userManager");
var organisation_1 = require("../app/backend/model/organisation");
var user_1 = require("../app/backend/model/user");
var userManager;
before(function (done) {
    this.timeout(0);
    userManager = new userManager_1.UserManager();
    userManager.clearDatabase(function () {
        done();
    });
});
describe('UserManager', function () {
    //region user-tests
    describe('createUser', function () {
        var user = new user_1.User('Jasper', 'jasper.catthoor@student.kdg.be', 'password');
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
            userManager.getUser('Jasper', function (u) {
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
        var user = new user_1.User('Jasper', 'jasper.catthoor@student.kdg.be', 'password');
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
        var users = [new user_1.User('Jasper', 'jasper.catthoor@student.kdg.be', 'password'),
            new user_1.User('Jan', 'jasper.catthoor@student.kdg.be', 'password'),
            new user_1.User('Enio', 'jasper.catthoor@student.kdg.be', 'password')];
        before(function (done) {
            this.timeout(0);
            try {
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
            }
            catch (e) {
                done(e);
            }
        });
        it('Read all existing users', function (done) {
            this.timeout(0);
            try {
                userManager.getAllUsers(function (userArray) {
                    assert.equal(userArray.length == users.length, true);
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
        var user = new user_1.User('Jasper', 'jasper.catthoor@student.kdg.be', 'password');
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
        var user = new user_1.User('Jasper', 'jasper.catthoor@student.kdg.be', 'password');
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
    //region organisation-test
    describe('createOrganisation', function () {
        var jasper = new user_1.User('Jasper', 'jasper.catthoor@student.kdg.be', 'password');
        var rob = new user_1.User('Rob', 'rob.hendrickx@student.kdg.be', 'password');
        var users = [jasper._id, rob._id];
        var organisation = new organisation_1.Organisation('OrganisationName', users);
        before(function (done) {
            this.timeout(0);
            try {
                userManager.registerUser(jasper, function (j) {
                    jasper = j;
                    userManager.registerUser(rob, function (r) {
                        rob = r;
                        done();
                    });
                });
            }
            catch (e) {
                done(e);
            }
        });
        it('Create organisation, should return organisation from database', function (done) {
            this.timeout(0);
            userManager.createOrganisation(organisation, function (o) {
                try {
                    organisation = o;
                    assert.equal(organisation._name, o._name);
                    assert.equal(organisation._memberIds.length, users.length);
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
                userManager.removeUserById(jasper._id, function () {
                    userManager.removeUserById(rob._id, function () {
                        userManager.removeOrganisationById(organisation._id, function () {
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
    /*
        describe('createGroupInOrganisation', () => {
            var jan: User = new User('Jan', 'jan.somers@student.kdg.be', 'password');
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
        });*/
    /*
        describe('addUserToOrganisation', () => {
            var jan:User = new User('Jan', 'jan.somers@student.kdg.be', 'password');
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
        });*/
    /*
        describe('addUserToGroup', () => {
            var jan:User = new User('Jan', 'addusertogroup@student.kdg.be', 'password');
            var organisation:Organisation = new Organisation('Organisation', [jan._id]);
            var group:Group = new Group('GroupName', 'GroupDescription', '', ['']);
            before(function (done:any) {
                this.timeout(4000);
                try {
                    userManager.registerUser(jan, (u:User) => {
                        jan = u;
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
                //this.timeout(0);
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
        });*/
    /*  describe('removeUserFromOrganisation', () => {
          var user:User = new User('Michael', 'michael.deboey@student.kdg.be', 'password');
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
            /*  try {
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
  */
    /*
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
    });


    describe('removeUserFromGroupById', () => {
        var jan:User;
        var group:Group;
        before(function (done:any) {
            this.timeout(0);
            try {
                userManager.registerUser(new User('Jan', 'addusertogroup@student.kdg.be', 'password'), (u:User) => {
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
    }); // check

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

    }); //check

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

    }); //check


    describe('removeGroup', () => {
        var organisation = new Organisation('Organisation', []);
        var group:Group = new Group(organisation._name, 'Group', 'Description');
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
    });
    */
    //endregion
});
//# sourceMappingURL=user.js.map