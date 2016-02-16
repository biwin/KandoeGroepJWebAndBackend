var theme_1 = require("./app/backend/model/theme");
var themeDao_1 = require("./app/backend/dao/themeDao");
var t = new theme_1.Theme(1, "Bars", "ae");
/**
 * for testing purposes
 * */
new themeDao_1.ThemeDao().read("Bars", function (t) {
    console.log(t);
});
//# sourceMappingURL=a.js.map