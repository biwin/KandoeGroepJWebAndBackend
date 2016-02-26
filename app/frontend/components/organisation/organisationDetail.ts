import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {NgClass} from "angular2/common";

import {Organisation} from "../../../backend/model/organisation";

@Component({
    selector: 'organisation-detail',
    template: `
    <div class="row container">
        <h5>{{organisation._name}}</h5>

        <div class="card"><div class="card-content">
            # leden: {{organisation._memberIds.length}}
        </div></div>
    </div>
    `,
    directives: [NgClass]
})

export class OrganisationDetail {
    private organisation = new Organisation("Delhaize", ["Michaël", "Jan", "Jasper"]);
}