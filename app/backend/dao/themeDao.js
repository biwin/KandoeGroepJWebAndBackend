System.register(["mongodb", "./daoConstants"], function(exports_1) {
    var mongodb_1, daoConstants_1;
    var ThemeDao;
    return {
        setters:[
            function (mongodb_1_1) {
                mongodb_1 = mongodb_1_1;
            },
            function (daoConstants_1_1) {
                daoConstants_1 = daoConstants_1_1;
            }],
        execute: function() {
            ThemeDao = (function () {
                function ThemeDao() {
                    this.client = new mongodb_1.MongoClient();
                }
                ThemeDao.prototype.clearDatabase = function (callback) {
                    this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
                        db.collection('themes').deleteMany({}, function () {
                            callback();
                        });
                    });
                };
                ThemeDao.prototype.createTheme = function (t, callback) {
                    this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
                        db.collection('themes').insertOne(t).then(function () {
                            db.close();
                            callback();
                        });
                    });
                };
                ThemeDao.prototype.readTheme = function (name, callback) {
                    this.client.connect(daoConstants_1.DaoConstants.CONNECTION_URL, function (err, db) {
                        db.collection('themes').find({ '_name': name }).limit(1).next().then(function (cursor) {
                            db.close();
                            callback(cursor);
                        });
                    });
                };
                return ThemeDao;
            })();
            exports_1("ThemeDao", ThemeDao);
        }
    }
});
//# sourceMappingURL=themeDao.js.map