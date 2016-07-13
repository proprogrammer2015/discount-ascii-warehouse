var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
        // then do not normalize the paths
        var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
        allTestFiles.push(normalizedTestModule);
    }
});

require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base',

    paths: {
        angular: 'js/lib/angular',
        angularMocks: 'js/lib/angular-mocks',
        infinitiveScroll: 'js/lib/ng-infinite-scroll',
        app: 'js/app',
        productGallery: 'js/moduleFrontPage/controllers/productGallery',
        dataService: 'js/moduleFrontPage/services/dataService',
        relativeDateFilter: 'js/moduleFrontPage/filters/relativeDateFilter',
        common: 'js/common/common',
        dateformat: 'js/lib/dateformat'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        infinitiveScroll: {
            deps: ['angular']
        },
        angularMocks: {
            deps: ['angular'],
            exports: 'angular.mock'
        },
        productGallery: {
            deps: ['angularMocks']
        }
    },

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});