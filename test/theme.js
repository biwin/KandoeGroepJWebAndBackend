System.register(['assert', "../app/backend/logic/themeManager", "../app/backend/model/theme", "../app/backend/logic/userManager", "../app/backend/model/user"], function(exports_1) {
    var assert, themeManager_1, theme_1, userManager_1, user_1;
    var themeManager, userManager;
    return {
        setters:[
            function (assert_1) {
                assert = assert_1;
            },
            function (themeManager_1_1) {
                themeManager_1 = themeManager_1_1;
            },
            function (theme_1_1) {
                theme_1 = theme_1_1;
            },
            function (userManager_1_1) {
                userManager_1 = userManager_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            before(function (done) {
                themeManager = new themeManager_1.ThemeManager();
                userManager = new userManager_1.UserManager();
                var completion = 0;
                themeManager.clearDatabase(function () {
                    if (++completion == 2)
                        done();
                });
                userManager.clearDatabase(function () {
                    if (++completion == 2)
                        done();
                });
            });
            describe('ThemeManager', function () {
                describe('createTheme', function () {
                    var user;
                    before(function (done) {
                        this.timeout(0);
                        userManager.registerUser(new user_1.User('Enio', 'enio.serluppens@student.kdg.be', 'password', 'admin'), function (u) {
                            try {
                                user = u;
                                done();
                            }
                            catch (e) {
                                done(e);
                            }
                        });
                    });
                    it('Create theme, should return theme from database', function (done) {
                        this.timeout(0);
                        var theme = new theme_1.Theme('First', 'This is a sample theme', [user._id]);
                        themeManager.createTheme(theme, function (t) {
                            try {
                                assert.equal(theme._name, t._name);
                                done();
                            }
                            catch (e) {
                                return done(e);
                            }
                        });
                    });
                });
            });
        }
    }
});
//# sourceMappingURL=theme.js.map