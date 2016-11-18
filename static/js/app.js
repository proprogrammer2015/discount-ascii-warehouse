/**
 * Basic configuration of the application.
 */
define(['angular', 'tmpconfig'], function (angular, config) {

    // Http success status code
    var HTTP_SUCCESS = 200;
    var RESPONSE_DELIMITER = '\n';

    /**
     * Common parsing, parsing invalid JSON response to valid JSON response.
     * @param {String} data - Text response form server.
     * @param {Number} status - Response status.
     * @returns {Array} - Array of json objects.
     */
    var httpResponseParser = function (data, headersGetter, status) {
        if (status !== HTTP_SUCCESS) return [];

        function notEmpty(item) {
            return item.trim().length > 0;
        }

        function parseJson(item) {
            var json = null;
            try {
                json = JSON.parse(item);
            } catch (ex) {
                json = null;
            }
            return json;
        }

        var response = data.split(RESPONSE_DELIMITER).filter(notEmpty).map(parseJson);
        return response;
    };

    var app = angular.module(config.APPLICATION_NAME, ['angular-whenScrolled']);

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.transformResponse = httpResponseParser;
    }]);

    return app;
});