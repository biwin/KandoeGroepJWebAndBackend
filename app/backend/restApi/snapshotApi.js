"use strict";
var snapshotManager_1 = require("../logic/snapshotManager");
var userApi_1 = require("./userApi");
var SnapshotApi = (function () {
    function SnapshotApi() {
    }
    SnapshotApi.findAll = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                SnapshotApi.mgr.getSnapshotsByUserId(currentUserId, function (snapshots) {
                    res.status(200).send(snapshots);
                });
            }
            else {
                res.status(401).send({ _error: 'Unauthorized' });
            }
        });
    };
    SnapshotApi.createSnapshot = function (req, res) {
        userApi_1.UserApi.getCurrentUserId(req.header('Bearer'), function (currentUserId) {
            if (currentUserId != null) {
                SnapshotApi.mgr.createSnapshot(currentUserId, req.body._sessionId, function (snapshot) {
                    res.status(200).send(snapshot);
                });
            }
            else {
                res.status(401).send({ _error: 'Unauthorized' });
            }
        });
    };
    SnapshotApi.mgr = new snapshotManager_1.SnapshotManager();
    return SnapshotApi;
}());
exports.SnapshotApi = SnapshotApi;
//# sourceMappingURL=snapshotApi.js.map