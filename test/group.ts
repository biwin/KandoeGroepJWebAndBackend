/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import assert = require('assert');

import {GroupManager} from "../app/backend/logic/groupManager";
import {OrganisationManager} from "../app/backend/logic/organisationManager";
import {UserManager} from "../app/backend/logic/userManager";

import {Group} from "../app/backend/model/group";
import {Organisation} from "../app/backend/model/organisation";
import {User} from "../app/backend/model/user";

var groupManager: GroupManager;
var organisationManager: OrganisationManager;
var userManager: UserManager;

before(function(done: any) {
    groupManager = new GroupManager();
    organisationManager = new OrganisationManager();
    userManager = new UserManager();

    done();
});

describe("GroupManager", () => {
    describe("createGroup", () => {
        var group: Group;
        var organisation: Organisation;
        var user: User;

        before(function(done: any) {
            this.timeout(0);

            user = new User("Michaël", "test@GroupTesting.com", "password", "test");
            userManager.deleteTestUsers(() => {
                userManager.registerUser(user, (u: User) => {
                    user = u;

                    organisation = new Organisation("createGroupTestOrg", []);
                    organisation._organisatorIds.push(u._id);

                    organisationManager.createOrganisation(organisation, (o: Organisation) => {
                        organisation = o;

                        done();
                    });
                });
            });
        });

        it("Create group, should return group from database", function(done: any) {
            this.timeout(0);

            group = new Group("Voeding", "Ploeg voeding", organisation._id, [user._id]);
            groupManager.createGroup(group, (g: Group) => {
                try {
                    groupManager.getGroupById(g._id, (newGroup: Group) => {
                        assert.equal(group._name, newGroup._name);
                        assert.equal(group._description, newGroup._description);
                        assert.equal(group._organisationId, newGroup._organisationId);

                        group = g;

                        organisationManager.getOrganisationById(organisation._id, (newOrganisation: Organisation) => {
                            assert.ok(newOrganisation._groupIds.indexOf(group._id) > -1);

                            userManager.getUserById(user._id, (newUser: User) => {
                                assert.ok(newUser._memberOfGroupIds.indexOf(group._id) > -1);

                                done();
                            });
                        });
                    });
                } catch (e) {
                    done(e);
                }
            });
        });

        after(function(done: any) {
            this.timeout(0);

            try {
                userManager.removeUserById(user._id, () => {
                    groupManager.removeGroupById(group._id, () => {
                        organisationManager.removeOrganisationById(organisation._id, () => {
                            done();
                        });
                    });
                });
            } catch (e) {
                done(e);
            }
        });
    });

    describe("createGroupTwice", () => {
        var organisation: Organisation;
        var group: Group;

        before(function(done: any) {
            this.timeout(100000);

            organisation = new Organisation("Delhaize", []);

            organisationManager.createOrganisation(organisation, (newOrganisation: Organisation) => {
                organisation = newOrganisation;

                groupManager.createGroup(new Group("Voeding", "Ploeg voeding", newOrganisation._id, []), (g: Group) => {
                    try {
                        group = g;

                        done();
                    } catch (e) {
                        done(e);
                    }
                });
            });
        });

        it("Create group with the same name in the same organisation, should return null from database", function(done: any) {
            this.timeout(100000);

            var group2 = new Group("Voeding", "Ploeg voeding", organisation._id, []);
            groupManager.createGroup(group2, (g: Group) => {
                try {
                    assert.equal(g, null);

                    done();
                } catch (e) {
                    done(e);
                }
            });
        });

        after(function(done: any) {
            this.timeout(100000);

            try {
                groupManager.removeGroupById(group._id, () => {
                    organisationManager.removeOrganisationById(organisation._id, () => {
                        done();
                    });
                });
            } catch (e) {
                done(e);
            }
        });
    });

    describe("removeGroupById", () => {
        var organisation: Organisation;
        var group: Group;
        var member1: User;
        var member2: User;

        before(function(done: any) {
            this.timeout(100000);

            organisation = new Organisation("Delhaize", []);
            group = new Group("Voeding", "Ploeg voeding", "", []);
            member1 = new User("Michaël", "michael.deboey@student.kdg.be", "password", "test");
            member2 = new User("Michaël2", "michael.deboey.2@student.kdg.be", "password", "test");

            userManager.deleteTestUsers(() => {
                userManager.registerUser(member1, (u1: User) => {
                    member1 = u1;
                    
                    userManager.registerUser(member2, (u2: User) => {
                        member2 = u2;

                        organisationManager.createOrganisation(organisation, (o: Organisation) => {
                            organisation = o;
                            group._organisationId = o._id;

                            groupManager.createGroup(group, (g: Group) => {
                                group = g;
                                
                                groupManager.addUserByEmailToGroupById(member1._email, group._id, () => {
                                    groupManager.addUserByEmailToGroupById(member2._email, group._id, () => {
                                        done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        it("Delete group, should also the references from users", function(done: any) {
            this.timeout(100000);
            
            groupManager.removeGroupById(group._id, () => {
                try {
                    groupManager.getGroupById(group._id, (g: Group) => {
                        assert.ok(g == null, "Group should be deleted, database should return null");
                        
                        userManager.getUserById(member1._id, (u1: User) => {
                            assert.ok(u1._memberOfGroupIds.indexOf(group._id) < 0, "Reference in _memberOfGroupIds array of User-object should be deleted");

                            userManager.getUserById(member2._id, (u2: User) => {
                                assert.ok(u2._memberOfGroupIds.indexOf(group._id) < 0, "Reference in _memberOfGroupIds array of User-object should be deleted");

                                done();
                            });
                        });
                    });
                } catch (e) {
                    done(e);
                }
            });
        });

        after(function(done: any) {
            this.timeout(0);

            try {
                userManager.removeUserById(member1._id, () => {
                    userManager.removeUserById(member2._id, () => {
                        done();
                    });
                });
            } catch (e) {
                done(e);
            }
        });
    });
});

after(function(done: any) {
    userManager.deleteTestUsers(() => {
        done();
    })
});