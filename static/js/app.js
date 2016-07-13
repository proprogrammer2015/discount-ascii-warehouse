/**
 * Basic configuration of Angular application.
 */
define(['angular', 'common'], function (angular, common) {

    var httpResponseParser = function (data, headersGetter, status) {
        return common.http.httpResponseParser(data, status);
    };

    var app = angular.module(common.APPLICATION_NAME, ['angular-whenScrolled']);

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.transformResponse = httpResponseParser;
    }]);

    return app;
});