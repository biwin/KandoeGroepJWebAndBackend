import {Component} from "angular2/core";
import {Input} from "angular2/core";
import {Snapshot} from "../../../backend/model/snapshot";
import {Router} from "angular2/router";

@Component({
    selector: 'snapshot-card',
    template: `
    <div class="col s5">
         <div class="card hoverable small">
            <div class="card-content">
                <p>{{snapshot._gameName}}</p>
            </div>
        </div>
    </div>
  `
})

export class SnapshotCard {
    @Input() private snapshot:Snapshot;

    private router:Router;

    constructor(router:Router){
        this.router = router;
    }

}
