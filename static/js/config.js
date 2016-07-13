/**
 * RequireJS configuration.
 */
var config = {
    baseUrl: 'js/',
    paths: {
        text: 'lib/text',
        angular: 'lib/angular',
        infinitiveScroll: 'lib/ng-infinite-scroll',
        app: 'app',
        productGallery: 'moduleFrontPage/controllers/productGallery',
        dataService: 'moduleFrontPage/services/dataService',
        common: 'common/common',
        dateformat: 'lib/dateformat',
        productGalleryDirective: 'moduleFrontPage/directives/productGallery',
        relativeDateFilter: 'moduleFrontPage/filters/relativeDateFilter'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        infinitiveScroll: {
            deps: ['angular']
        }
    }
};

requirejs.config(config);

/**
 * Run application.
 */
requirejs([
    'angular',
    'common',
    'text',
    'infinitiveScroll',
    'dateformat',
    'app',
    'productGallery',
    'dataService',
    'productGalleryDirective',
    'relativeDateFilter'],
    function (angular, common) {
        angular.bootstrap(document, [common.APPLICATION_NAME]);
    }
);
