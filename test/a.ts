/**
 * even om te testen
 * */

import {ThemeDao} from "../app/backend/dao/themeDao";
import {Theme} from "../app/backend/model/theme";
var a:ThemeDao = new ThemeDao();

var theme = a.read("Bars");
console.log(theme);