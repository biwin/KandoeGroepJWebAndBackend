var circleMathToolbox_1 = require("./circleMathToolbox");
var CircleSessionConstants = (function () {
    function CircleSessionConstants() {
        this._colors = [];
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
    CircleSessionConstants.prototype.CardColor = function (i) {
        return this._colors[i % this._colors.length];
    };
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