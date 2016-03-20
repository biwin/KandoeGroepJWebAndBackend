"use strict";
var Snapshot = (function () {
    function Snapshot(_creatorId, _gameName, _playerNames, _cards, _chat, _timestamp) {
        this._creatorId = _creatorId;
        this._gameName = _gameName;
        this._playerNames = _playerNames;
        this._cards = _cards;
        this._chat = _chat;
        this._timestamp = _timestamp;
    }
    Snapshot.empty = function () {
        return new Snapshot("", "", [], [], [], "");
    };
    return Snapshot;
}());
exports.Snapshot = Snapshot;
//# sourceMappingURL=snapshot.js.map