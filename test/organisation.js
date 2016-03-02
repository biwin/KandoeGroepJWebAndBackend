var assert = require('assert');
var organisationManager_1 = require("../app/backend/logic/organisationManager");
var organisation_1 = require("../app/backend/model/organisation");
var organisationManager;
before(function (done) {
    organisationManager = new organisationManager_1.OrganisationManager();
    done();
});
describe("OrganisationManager", function () {
    describe("createOrganisation", function () {
        var organisation;
        it("Create organisation, should return organisation from database", function (done) {
            this.timeout(0);
            organisation = new organisation_1.Organisation("Delhaize", []);
            organisationManager.createOrganisation(organisation, function (o) {
                try {
                    organisationManager.getOrganisationById(o._id, function (newOrganisation) {
                        assert.equal(organisation._name, newOrganisation._name);
                        done();
                    });
                }
                catch (e) {
                    done(e);
                }
            });
        });
        after(function (done) {
            this.timeout(0);
            try {
                organisationManager.removeOrganisationById(organisation._id, function () {
                    done();
                });
            }
            catch (e) {
                done(e);
            }
        });
    });
});
//# sourceMappingURL=organisation.js.map