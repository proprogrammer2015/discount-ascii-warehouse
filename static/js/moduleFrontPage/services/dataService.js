define(['app', 'common'], function (app, common) {

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
            item.type = common.TYPE.PRODUCT;
            return item;
        });
        return data;
    };

    /**
     * Service responsible for ajax calls and response transformation.
     */
    var dataService = function ($http) {
        /**
         * Transform http response.
         */
        var localConfig = {
            transformResponse: common.http.transformResponse($http.defaults.transformResponse, transform)
        };

        var skip = 0;
        var lastSortBy = null;

        /**
         * Get products depends on limit and sort order.
         * @param {Number} limit - Products list size.
         * @param {String} sortBy - Sort products by (id | price | size).
         * @returns {Promise}
         */
        function getProducts(limit, sortBy) {

            if (sortBy == lastSortBy && lastSortBy !== null) {
                skip += limit;
            } else {
                skip = 0;
            }
            lastSortBy = sortBy;

            var url = common.REST_API.getProductsUrl(limit, sortBy, skip);
            return $http.get(url, localConfig);
        }

        return {
            getProducts: getProducts
        };
    };

    dataService.$inject = ['$http'];
    app.factory('dataService', dataService);
});