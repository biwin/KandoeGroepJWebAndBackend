System.register(['assert'], function(exports_1) {
    var assert;
    return {
        setters:[
            function (assert_1) {
                assert = assert_1;
            }],
        execute: function() {
            describe('theme', function () {
                describe('test', function () {
                    it('1 = 1', function () {
                        assert.equal(1, 1);
                    });
                });
            });
        }
    }
});
//# sourceMappingURL=theme.js.map