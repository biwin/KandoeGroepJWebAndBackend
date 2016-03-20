module.exports = {
    'Login.getIt': function (browser) {
        browser
            .url("http://localhost:8080/#/loginUser")
            .waitForElementVisible('body', 10000)
            .assert.visible('#logo-container')
            .assert.visible('#email')
            .assert.visible('#password')
            .assert.containsText('#loginButton', 'LOG IN')
            .assert.containsText('#registerButton', 'REGISTREER')
            .assert.visible('#facebookButton');
    }
};