exports.config = {
    specs: ['./spec/*-spec.js'],
    chromeOnly: true,
    directConnect: true,
    capabilities: {
        browserName: 'chrome'
    },
    baseUrl: 'http://localhost:8080',
    framework: 'jasmine',
    onPrepare: function() {
        browser.ignoreSynchronization = true;
    }
};
