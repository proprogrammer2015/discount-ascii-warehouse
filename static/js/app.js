/**
 * Basic configuration of the application.
 */
define(['angular', 'service/plainTextToJson', 'appConfig', 'infinitiveScroll'], function (angular, plainTextToJson, config) {

    var app = angular.module(config.APPLICATION_NAME, ['infinite-scroll']);

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.transformResponse = plainTextToJson;
    }]);

    return app;
});