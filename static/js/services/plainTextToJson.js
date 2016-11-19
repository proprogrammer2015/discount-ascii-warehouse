define(["lodash"], function (_) {
    /**
    * Common parsing, parsing invalid JSON response to valid JSON response.
    * @param {String} data - Text response form server.
    * @param {Function} headersGetter - Returns headers.
    * @param {Number} status - Http response status.
    * @returns {Array} - Array of json objects.
    */
    var parse = function (data, headersGetter, status) {
        // Http success status code
        var HTTP_SUCCESS = 200;
        var RESPONSE_DELIMITER = /\n/g;

        if (status !== HTTP_SUCCESS)
            return [];

        function parseJson(str) {
            var json = null;
            try {
                json = JSON.parse(str);
            } finally {
                return json;
            }
        }

        return data.split(RESPONSE_DELIMITER).map(parseJson).filter(_.isObject);
    };

    return parse;
});
