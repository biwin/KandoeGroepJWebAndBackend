/*
import assert = require('assert');

import {OrganisationManager} from "../app/backend/logic/organisationManager";

import {Organisation} from "../app/backend/model/organisation";

var organisationManager: OrganisationManager;

before(function(done: any) {
    organisationManager = new OrganisationManager();

    done();
});

describe("OrganisationManager", () => {
    describe("createOrganisation", () => {
        var organisation: Organisation;

        it("Create organisation, should return organisation from database", function(done: any) {
            this.timeout(0);

            organisation = new Organisation("Delhaize", []);
            organisationManager.createOrganisation(organisation, (o: Organisation) => {
                try {
                    organisationManager.getOrganisationById(o._id, (newOrganisation: Organisation) => {
                        assert.equal(organisation._name, newOrganisation._name);

                        organisation = o;

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
                organisationManager.removeOrganisationById(organisation._id, () => {
                    done();
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
});*/
