/**
 * Class that gives a simple model to combine a card with a boolean for when it's in play or not
 */
var CircleSessionCardWrapper = (function () {
    function CircleSessionCardWrapper(card, inPlay, cardId) {
        this.card = card;
        this.inPlay = inPlay;
        this.cardId = cardId;
    }
    return CircleSessionCardWrapper;
})();
exports.CircleSessionCardWrapper = CircleSessionCardWrapper;
//# sourceMappingURL=circleSessionCardWrapper.js.map