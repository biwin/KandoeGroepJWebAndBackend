"use strict";
var CircleMathToolbox = (function () {
    function CircleMathToolbox() {
    }
    CircleMathToolbox.POS_ON_CIRCLE = function (center, r, angle, f) {
        var pos = center;
        pos += r;
        pos *= f(CircleMathToolbox.DEG_TO_RAD(angle));
        return pos;
    };
    CircleMathToolbox.DEG_TO_RAD = function (deg) {
        return deg * Math.PI / 180;
    };
    return CircleMathToolbox;
}());
exports.CircleMathToolbox = CircleMathToolbox;
//# sourceMappingURL=circleMathToolbox.js.map