/**
 * Class that gives a simple model to gain the needed information of a card and it's position in a game.
 * Used for snapshots. Full name and position are saved.
 * References would be lost as cards and games can be removed whereas snapshots should be able to keep existing.
 */
var SnapshotCardWrapper = (function () {
    function SnapshotCardWrapper(_cardName, _position, _userHistory) {
        this._cardName = _cardName;
        this._position = _position;
        this._userHistory = _userHistory;
    }
    return SnapshotCardWrapper;
})();
exports.SnapshotCardWrapper = SnapshotCardWrapper;
//# sourceMappingURL=snapshotCardWrapper.js.map