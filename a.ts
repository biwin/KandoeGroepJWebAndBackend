import {Theme} from "./app/backend/model/theme";
import {ThemeDao} from "./app/backend/dao/themeDao";
var t = new Theme(1, "Bars", "ae");

/**
 * for testing purposes
 * */

new ThemeDao().read("Bars", (t:Theme) => {
    console.log(t);
});