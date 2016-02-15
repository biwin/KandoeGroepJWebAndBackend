System.register([], function(exports_1) {
    var Theme;
    return {
        setters:[],
        execute: function() {
            Theme = (function () {
                function Theme(name, description, tags) {
                    this.name = name;
                    this.description = description;
                    this.tags = tags;
                }
                return Theme;
            })();
            exports_1("Theme", Theme);
        }
    }
});
//# sourceMappingURL=theme.js.map