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
        advertisementService: 'moduleFrontPage/services/advertisementService',
        tmpconfig: 'common/config',
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
    'tmpconfig',
    'text',
    'infinitiveScroll',
    'dateformat',
    'app',
    'productGallery',
    'dataService',
    'advertisementService',
    'productGalleryDirective',
    'relativeDateFilter'],
    function (angular, config) {
        angular.bootstrap(document, [config.APPLICATION_NAME]);
    }
);
