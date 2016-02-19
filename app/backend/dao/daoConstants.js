System.register([], function(exports_1) {
    var DaoConstants;
    return {
        setters:[],
        execute: function() {
            DaoConstants = (function () {
                function DaoConstants() {
                }
                Object.defineProperty(DaoConstants, "CONNECTION_URL", {
                    get: function () {
                        return "mongodb://KandoeNodeUser:omgenio1234@ds055895.mongolab.com:55895/kandoe";
                    },
                    enumerable: true,
                    configurable: true
                });
                return DaoConstants;
            })();
            exports_1("DaoConstants", DaoConstants);
        }
    }
});
//# sourceMappingURL=daoConstants.js.map