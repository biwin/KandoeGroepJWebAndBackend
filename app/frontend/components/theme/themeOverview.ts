///<reference path="../../../../typings/jquery/jquery.d.ts" />
///<reference path="../../../../typings/materialize-css/materialize-css.d.ts"/>


import {Component, Inject} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {ROUTER_DIRECTIVES} from "angular2/router";

import {Theme} from "../../../backend/model/theme";
import {ThemeCard} from "./themeCard";
import {ThemeService} from "../../services/themeService";


@Component({
    selector: 'theme-overview',
    template: `
        <div class="container">
            <div class="modal" id="mDelTheme">
                <div class="modal-content">
                    <h4>Thema verwijderen?</h4>
                    <p>Bent u zeker dat u dit thema en alle bijhorende kaarten wilt verwijderen?</p>
                </div>
                <div class="modal-footer">
                    <a class="modal-action modal-close waves-effect waves-green btn-flat" (click)="doDelete = false">Nee, ga terug</a>
                    <a class="modal-action modal-close waves-effect waves-red btn-flat" (click)="doDelete = true">Ja, verwijder</a>
                </div>
            </div>

            <h5>Jouw thema's</h5>
            <div>
                <a [routerLink]="['CreateTheme']" class="btn-floating waves-effect waves-light red" title="Creëer thema">
                    <i class="material-icons">add</i>
                </a>
            </div>

            <div *ngIf="loading" class="row center margin-top">
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
            </div>

            <div class="row">
                <theme-card *ngFor="#theme of themes" [theme]="theme" (onDelete)="deleteTheme($event)">
                </theme-card>
            </div>
        </div>
    `,
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, ThemeCard]
})
export class ThemeOverview {
    private loading:boolean = true;
    private themes:Theme[] = [];
    private service:ThemeService;
    private doDelete:boolean = false;

    constructor(service:ThemeService) {
        this.service = service;
        service.getAll().subscribe((themes:Theme[]) => {
            themes.forEach((t:Theme) => this.themes.push(t));
            this.loading = false;
        });
    }

    deleteTheme(id:string) {
        $('#mDelTheme').openModal({
            opacity: .75,
            complete: () => {
                if(this.doDelete) {
                    this.service.deleteTheme(id).subscribe((b:boolean) => {
                        if (b) {
                            this.removeThemeFromArray(id);
                            Materialize.toast('Thema verwijderd.', 3000, 'rounded');
                        } else {
                            Materialize.toast('Verwijderen mislukt.', 3000, 'rounded');
                        }

                        this.doDelete = false;
                    }, () => {
                            Materialize.toast('Verwijderen mislukt.', 3000, 'rounded');
                            console.warn('Delete theme failed, theme not found');
                    });
                }
            }
        });
    }

    private removeThemeFromArray(id:string) {
        var i = this.themes.findIndex((t:Theme) => t._id == id);
        this.themes.splice(i, 1);
    }
}


