System.register([], function(exports_1) {
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(_name, _email, _password, _role) {
                    this._name = _name;
                    this._email = _email;
                    this._password = _password;
                    this._role = _role;
                }
                return User;
            })();
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.js.map