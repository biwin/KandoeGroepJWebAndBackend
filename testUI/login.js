module.exports = {
    'Login': function (browser) {
        browser
            .url("http://localhost:8080/#/loginUser")
            .waitForElementVisible('#email', 10000)
            .setValue('#password', 'testpaswoord')
            .setValue('#email', 'testemail@detesters.eu')
            .click('#loginButton')
            .pause(100000)
            .assert.urlContains('profile')
            .end();
    }
};