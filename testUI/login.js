module.exports = {
    'Login': function (browser) {
        browser
            .url("http://localhost:8080/#/loginUser")
            .waitForElementVisible('#email', 10000)
            .setValue('#email', 'testemail@detesters.eu')
            .execute(function () {
                $('#password').val('test');
                return true;
            }, [], function () {
                browser.click('#loginButton')
                    .pause(10000)
                    .getText('#error', function (result) {
                        if (result.value === 'Email is reeds in gebruik') {
                            browser.click('#loginButton').pause(10000);
                        }
                        browser.assert.urlContains('#/');
                    });
            });
    }
};