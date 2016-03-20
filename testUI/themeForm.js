module.exports = {
    'theme form test': function (browser) {
        browser
            .url("http://localhost:8080/#/loginUser")
            .waitForElementVisible('#email', 10000)
            .setValue('#name', 'a new theme')
            .execute(function () {
                $('#description').val('this is a theme description');
                return true;
            }, [], function () {
                browser.click('#submit')
                    .assert.urlContains('themes').end();
                    });
    }
};