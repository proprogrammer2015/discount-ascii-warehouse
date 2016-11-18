define(['app', 'tmpconfig'], function (app, config) {

    /**
     * Add transform function to transform functions array.
     * @param {Object} defaults - Angular default transform functions object.
     * @param {Function} transform - Function, that transforms response.
     * @returns {Object} Returns Angular object with transform functions array.
     */
    var transformResponse = function (defaults, transform) {
        defaults = angular.isArray(defaults) ? defaults : [defaults];
        return defaults.concat(transform);
    };

    /**
     * Transform product properties into appropriate format.
     * @param {Object} data - Product object from ajax response.
     * @returns {Object} Product object with properly formatted properties.
     */
    var transform = function (data) {
        data = data.map(function (item) {
            // Convert price from cents into dollars format (i.e. 3.81)
            item.price /= 100;

            // Get font size in pixels
            item.productStyle = item.size + 'px';

            // Set type of the item
            item.type = config.TYPE.PRODUCT;
            return item;
        });
        return data;
    };

    /**
     * Service responsible for ajax calls and response transformation.
     */
    var dataService = function ($http) {

        var skip = 0;
        var lastSortBy = null;
        var serviceConfig = {
            transformResponse: transformResponse($http.defaults.transformResponse, transform)
        };

        /**
         * Get products depends on limit and sort order.
         * @param {Number} limit - Products list size.
         * @param {String} sortBy - Sort products by (id | price | size).
         * @returns {Promise}
         */
        function getProducts(limit, sortBy) {
            skip = 0;
            if (sortBy == lastSortBy && lastSortBy !== null) {
                skip += limit;
            }
            lastSortBy = sortBy;

            var url = config.REST_API.getProductsUrl(limit, sortBy, skip);
            return $http.get(url, serviceConfig);
        }

        return {
            getProducts: getProducts
        };
    };

    dataService.$inject = ['$http'];
    app.factory('dataService', dataService);
});