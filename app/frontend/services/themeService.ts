import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
@Injectable()
export class ThemeService {
    private http:Http = null;
    private path: string;

    constructor(http:Http) {
        this.http = http;
    }
}
