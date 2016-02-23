/// <reference path="../../../../typings/jquery/jquery.d.ts" />

import {Component} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {Input} from "angular2/core";

@Component({
    selector: 'tags',
    template: `
        <div class="input-field col s12">
        <div style="float:left">
          <div class="chip" style="position:relative; top:10px;" *ngFor="#tag of tagArray; #i = index">
            {{tag}}
             <i class="material-icons" (click)="remove(i)">close</i>
          </div>
          </div>

          <span style="overflow:hidden; padding-right:5px; display:block;">
            <input #txt (keyup)="typing($event)" id="tagInput" type="text" value="{{tagArray.length > 0 ? ' ' : ''}}"/>
            <label [class.active]="tagArray.length > 0 || txt.value.length > 0" for="tagInput">{{title}}</label>
          </span>
        </div>
    `,
    directives: [CORE_DIRECTIVES]
})
export class TagInput {
    @Input() public title:string = "Tags";
    @Input() tagArray:string[] = [];

    typing($event) {
        var text:string = $event.target.value;
        if(text.slice(-1) === ";" && text.trim().length > 0) {
            this.tagArray.push(text.trim().replace(/;/g, ""));
            $event.target.value = " ";
        } else if ($event.which === 8 && text.trim().length == 0) {
            this.remove(this.tagArray.length - 1);
        }
    }

    remove(index:number) {
        this.tagArray.splice(index, 1);
        if(this.tagArray.length > 0)
            $('#tagInput').val(" ");
    }
}