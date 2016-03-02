import {CircleMathToolbox} from "./circleMathToolbox";
export class CircleSessionConstants {
    private _colors:string[] = [];

    constructor() {
        // deep - purple
        /*this._colors.push("#ede7f6");
        this._colors.push("#d1c4e9");
        this._colors.push("#b39ddb");
        this._colors.push("#9575cd");
        this._colors.push("#7e57c2");
        this._colors.push("#673ab7");
        this._colors.push("#5e35b1");
        this._colors.push("#512da8");
        this._colors.push("#4527a0");
        this._colors.push("#311b92");
        this._colors.push("#b388ff");
        this._colors.push("#7c4dff");
        this._colors.push("#651fff");
        this._colors.push("#6200ea");*/

        // indigo
        this._colors.push("#e8eaf6");
        this._colors.push("#c5cae9");
        this._colors.push("#9fa8da");
        this._colors.push("#7986cb");
        this._colors.push("#5c6bc0");
        this._colors.push("#3f51b5");
        this._colors.push("#3949ab");
        this._colors.push("#303f9f");
        this._colors.push("#283593");
        this._colors.push("#1a237e");
        this._colors.push("#8c9eff");
        this._colors.push("#536dfe");
        this._colors.push("#3d5afe");
        this._colors.push("#304ffe");
    }

    public CardColor(i:number): string {
        return this._colors[i % this._colors.length];
    }

    public get CARD_STROKE_COLOR():string {
        return this._colors[this._colors.length - 1];
    }

    public get HOVERED_COLOR(): string {
        return "yellow";
    }

    public get PANEL_DIMENSIONS():number {
        return 800;
    }

    public get CENTER(): number {
        return 0;
    }

    public get RING_WIDTH(): number {
        return 30;
    }

    public get VIEWBOX(): string {
        var min:number = (this.CENTER - this.PANEL_DIMENSIONS / 2);

        var str:string = min + ' ' + min + ' ';
            str       +=  this.PANEL_DIMENSIONS + ' ' + this.PANEL_DIMENSIONS;
        return str;
    }

    public CircleRadius(n:number): number {
        if(n < 1 || n > 5)
            return NaN;
        return (this.PANEL_DIMENSIONS - this.RING_WIDTH) / 2 - ((n-1) * this.PANEL_DIMENSIONS / 10);
    }

    public get RINGS(): boolean[] {
        //true for inner ring

        var arr: boolean[] = [];

        for(var i:number = 0; i < 4; i++) {
            arr.push(false);
        }

        arr.push(true);
        return arr;
    }

    public YPOS_CIRCLE(depth:number, positionRatio:number) {
        var angle:number = positionRatio * 360;
        return CircleMathToolbox.POS_ON_CIRCLE(this.CENTER, this.CircleRadius(depth), angle, Math.sin);
    }

    public XPOS_CIRCLE(depth:number, positionRatio:number) {
        var angle:number = positionRatio * 360;
        return CircleMathToolbox.POS_ON_CIRCLE(this.CENTER, this.CircleRadius(depth), angle, Math.cos);
    }
}