/**
 * Class that provides a toolbox to calculate where cards on the gameboard should be placed
 */
export class CircleMathToolbox {
    public static POS_ON_CIRCLE(center:number, r:number, angle:number, f:(n:number) => number):number {
        var pos:number = center;

        pos += r;
        pos *= f(CircleMathToolbox.DEG_TO_RAD(angle));

        return pos;
    }

    public static DEG_TO_RAD(deg:number):number {
        return deg * Math.PI / 180;
    }
}