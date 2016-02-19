System.register(["../dao/themeDao"], function(exports_1) {
    var themeDao_1;
    var ThemeManager;
    return {
        setters:[
            function (themeDao_1_1) {
                themeDao_1 = themeDao_1_1;
            }],
        execute: function() {
            ThemeManager = (function () {
                function ThemeManager() {
                    this._dao = new themeDao_1.ThemeDao();
                }
                ThemeManager.prototype.clearDatabase = function (callback) {
                    this._dao.clearDatabase(callback);
                };
                ThemeManager.prototype.createTheme = function (theme, callback) {
                    var _this = this;
                    this.themeExists(theme._name, function (exists) {
                        if (exists) {
                            callback(null);
                        }
                        else {
                            _this._dao.createTheme(theme, function () {
                                _this.getTheme(theme._name, callback);
                            });
                        }
                    });
                };
                ThemeManager.prototype.getTheme = function (name, callback) {
                    this._dao.readTheme(name, callback);
                };
                ThemeManager.prototype.themeExists = function (name, callback) {
                    this.getTheme(name, function (t) {
                        callback(t != null);
                    });
                };
                return ThemeManager;
            })();
            exports_1("ThemeManager", ThemeManager);
        }
    }
});
//# sourceMappingURL=themeManager.js.map