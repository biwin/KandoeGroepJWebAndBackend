import assert = require('assert');

import {OrganisationManager} from "../app/backend/logic/organisationManager";
import {UserManager} from "../app/backend/logic/userManager";

import {Organisation} from "../app/backend/model/organisation";
import {User} from "../app/backend/model/user";

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

        before(function (done: any) {
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

        after(function (done: any) {
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

        before(function (done: any) {
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

        after(function (done: any) {
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
});