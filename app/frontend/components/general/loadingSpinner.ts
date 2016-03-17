import {Component} from "angular2/core";

@Component({
    selector: 'loading',
    template: `
        <div class="row center margin-top">
            <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue-only">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
            </div>
        </div>`,
    directives: []
})
export class LoadingSpinner {}