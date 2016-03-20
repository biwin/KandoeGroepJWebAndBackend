/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/express/express.d.ts" />

import assert = require('assert');

import {OrganisationManager} from "../app/backend/logic/organisationManager";
import {UserManager} from "../app/backend/logic/userManager";
import {GroupManager} from "../app/backend/logic/groupManager";
import {ThemeManager} from "../app/backend/logic/themeManager";

import {Organisation} from "../app/backend/model/organisation";
import {User} from "../app/backend/model/user";
import {Group} from "../app/backend/model/group";
import {Theme} from "../app/backend/model/theme";

var organisationManager: OrganisationManager;
var userManager: UserManager;

before(function(done: any) {
    organisationManager = new OrganisationManager();
    userManager = new UserManager();

    done();
});

describe("OrganisationManager", () => {
    describe("createOrganisation", () => {
        var organisation: Organisation;
        var user: User;

        before(function(done: any) {
            this.timeout(0);

            user = new User("MichaelDeBoey", "michael.deboey@student.kdg.be", "password", "test");
            userManager.registerUser(user, (u: User) => {
                try {
                    user = u;

                    done();
                } catch(e) {
                    done(e);
                }
            });
        });

        it("Create organisation, should return organisation from database", function(done: any) {
            this.timeout(0);

            organisation = new Organisation("Delhaize", []);
            organisation._organisatorIds.push(user._id);

            organisationManager.createOrganisation(organisation, (o: Organisation) => {
                try {
                    organisationManager.getOrganisationById(o._id, (newOrganisation: Organisation) => {
                        assert.equal(organisation._name, newOrganisation._name);

                        organisation = o;

                        userManager.getUserById(user._id, (newUser: User) => {
                            assert.ok(newUser._organisatorOf.indexOf(organisation._id) > -1);

                            done();
                        });
                        done();
                    });
                } catch(e) {
                    done(e);
                }
            });
        });

        after(function(done: any) {
            this.timeout(0);

            try {
                userManager.removeUserById(user._id, () => {
                    organisationManager.removeOrganisationById(organisation._id, () => {
                        done();
                    });
                });
            } catch (e) {
                done(e);
            }
        });
    });

    describe("createOrganisationTwice", () => {
        var organisation: Organisation;

        before(function(done: any) {
            this.timeout(0);

            organisationManager.createOrganisation(new Organisation("Delhaize", []), (o: Organisation) => {
                try {
                    organisation = o;

                    done();
                } catch(e) {
                    done(e);
                }
            });
        });

        it("Create organisation with the same name, should return null from database", function(done: any) {
            this.timeout(0);

            var organisation2 = new Organisation("Delhaize", []);
            organisationManager.createOrganisation(organisation2, (o: Organisation) => {
                try {
                    assert.equal(o, null);

                    done();
                } catch(e) {
                    done(e);
                }
            });
        });

        after(function(done: any) {
            this.timeout(0);

            try {
                organisationManager.removeOrganisationById(organisation._id, () => {
                    done();
                });
            } catch (e) {
                done(e);
            }
        });
    });
    
    describe("removeOrganisationById", () => {
        var organisation: Organisation;
        var admin: User;
        var member: User;
        var group: Group;
        var theme: Theme;
        
        var groupManager: GroupManager = new GroupManager();
        var themeManager: ThemeManager = new ThemeManager();
        
        before(function(done: any) {
            this.timeout(0);

            organisation = new Organisation("Delhaize", []);
            admin = new User("Michaël", "michael.deboey@student.kdg.be", "password", "test");
            member = new User("Michaël2", "michael.deboey.2@student.kdg.be", "password", "test");
            group = new Group("Voeding", "Ploeg voeding", "", []);
            theme = new Theme("Nieuwe producten", "", []);
            
            userManager.deleteTestUsers(() => {
                userManager.registerUser(admin, (u: User) => {
                    admin = u;
                    organisation._organisatorIds.push(u._id);

                    organisationManager.createOrganisation(organisation, (o: Organisation) => {
                        organisation = o;
                        group._organisationId = organisation._id;
                        theme._organisationId = organisation._id;

                        userManager.registerUser(member, (u2: User) => {
                            member = u2;

                            organisationManager.addUserByEmailToOrganisationById(member._email, false, organisation._id, () => {
                                groupManager.createGroup(group, (g: Group) => {
                                    group = g;
                                    
                                    themeManager.createTheme(theme, (t: Theme) => {
                                        theme = t;
                                        
                                        done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
        
        it("Delete organisation, should also delete all groups and delete the references from users and themes", function(done: any) {
            this.timeout(0);
            
            organisationManager.removeOrganisationById(organisation._id, () => {
                try {
                    organisationManager.getOrganisationById(organisation._id, (o: Organisation) => {
                        assert.ok(o == null, "Organisation should be deleted, database should return null");

                        userManager.getUserById(admin._id, (u: User) => {
                            assert.ok(u._organisatorOf.indexOf(organisation._id) < 0, "Reference in _organisatorOf array User-object should be deleted");

                            userManager.getUserById(member._id, (u2: User) => {
                                assert.ok(u2._memberOf.indexOf(organisation._id) < 0, "Reference in _memberOf array User-object should be deleted");
                                
                                groupManager.getGroupById(group._id, (g: Group) => {
                                    assert.ok(g == null, "Group should be deleted, database should return null");
                                    
                                    themeManager.getTheme(theme._id, (t: Theme) => {
                                        assert.ok(t._organisationId == null, "Reference of _organisationId in Theme-object should be deleted (= null)");
                                        
                                        done();
                                    });
                                });
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
                userManager.removeUserById(admin._id, () => {
                    userManager.removeUserById(member._id, () => {
                        themeManager.removeThemeById(theme._id, () => {
                            done();
                        });
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