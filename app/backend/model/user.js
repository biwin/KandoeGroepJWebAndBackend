var mongoose_1 = require("mongoose");
var mongoose_2 = require("mongoose");
var userSchema = new mongoose_1.Schema({ email: String, password: String, displayName: String });
var User = mongoose_2.model("User", userSchema);
module.exports = User;
//# sourceMappingURL=User.js.map