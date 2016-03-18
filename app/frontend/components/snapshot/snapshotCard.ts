import {Component, Input} from "angular2/core";
import {Router} from "angular2/router";

import {Snapshot} from "../../../backend/model/snapshot";

@Component({
    selector: 'snapshot-card',
    template: `
    <div class="col s5">
         <div (click)="openSnapshot()" class="card hoverable clickable">
            <div class="card-content">
                <h5>{{snapshot._gameName}}</h5>
                <p>{{snapshot._timestamp}}</p>
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

    openSnapshot() {
        this.router.navigate(['/Snapshot', {id: this.snapshot._id}]);
    }
}
