import {CircleMathToolbox} from "./circleMathToolbox";
export class CircleSessionConstants {
    private _colors:string[] = [];

    constructor() {
        this._colors.push("#f44336");
        this._colors.push("#E91E63");
        this._colors.push("#9C27B0");
        this._colors.push("#673AB7");
        this._colors.push("#3F51B5");
        this._colors.push("#004D40");
        this._colors.push("#BDBDBD");
        this._colors.push("#00BCD4");
        this._colors.push("#009688");
        this._colors.push("#4CAF50");
        this._colors.push("#8BC34A");
        this._colors.push("#CDDC39");
        this._colors.push("#3d5afe");
        this._colors.push("#FFEB3B");
        this._colors.push("#FFC107");
        this._colors.push("#FF9800");
        this._colors.push("#FF5722");
        this._colors.push("#795548");
        this._colors.push("#9E9E9E");
        this._colors.push("#607D8B");
        this._colors.push("#DD2C00");
    }

    public CardColor(i:number): string {
        return this._colors[i % this._colors.length];
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