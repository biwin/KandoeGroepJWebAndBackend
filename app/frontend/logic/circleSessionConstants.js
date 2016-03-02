var circleMathToolbox_1 = require("./circleMathToolbox");
var CircleSessionConstants = (function () {
    function CircleSessionConstants() {
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
        this._colors = [];
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
    CircleSessionConstants.prototype.CardColor = function (i) {
        return this._colors[i % this._colors.length];
    };
    Object.defineProperty(CircleSessionConstants.prototype, "CARD_STROKE_COLOR", {
        get: function () {
            return this._colors[this._colors.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CircleSessionConstants.prototype, "HOVERED_COLOR", {
        get: function () {
            return "yellow";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CircleSessionConstants.prototype, "PANEL_DIMENSIONS", {
        get: function () {
            return 800;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CircleSessionConstants.prototype, "CENTER", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CircleSessionConstants.prototype, "RING_WIDTH", {
        get: function () {
            return 30;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CircleSessionConstants.prototype, "VIEWBOX", {
        get: function () {
            var min = (this.CENTER - this.PANEL_DIMENSIONS / 2);
            var str = min + ' ' + min + ' ';
            str += this.PANEL_DIMENSIONS + ' ' + this.PANEL_DIMENSIONS;
            return str;
        },
        enumerable: true,
        configurable: true
    });
    CircleSessionConstants.prototype.CircleRadius = function (n) {
        if (n < 1 || n > 5)
            return NaN;
        return (this.PANEL_DIMENSIONS - this.RING_WIDTH) / 2 - ((n - 1) * this.PANEL_DIMENSIONS / 10);
    };
    Object.defineProperty(CircleSessionConstants.prototype, "RINGS", {
        get: function () {
            //true for inner ring
            var arr = [];
            for (var i = 0; i < 4; i++) {
                arr.push(false);
            }
            arr.push(true);
            return arr;
        },
        enumerable: true,
        configurable: true
    });
    CircleSessionConstants.prototype.YPOS_CIRCLE = function (depth, positionRatio) {
        var angle = positionRatio * 360;
        return circleMathToolbox_1.CircleMathToolbox.POS_ON_CIRCLE(this.CENTER, this.CircleRadius(depth), angle, Math.sin);
    };
    CircleSessionConstants.prototype.XPOS_CIRCLE = function (depth, positionRatio) {
        var angle = positionRatio * 360;
        return circleMathToolbox_1.CircleMathToolbox.POS_ON_CIRCLE(this.CENTER, this.CircleRadius(depth), angle, Math.cos);
    };
    return CircleSessionConstants;
})();
exports.CircleSessionConstants = CircleSessionConstants;
//# sourceMappingURL=circleSessionConstants.js.map