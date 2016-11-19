define(['app', 'lodash', 'appConfig', 'service/restManager'], function (app, _, config) {
    /**
     * Service responsible for ajax calls and response transformation.
     */
    var productService = function ($http, restManager, productCacheService) {

        /**
         * Transform product properties into appropriate format.
         * @param {Object} data - Product object from ajax response.
         * @returns {Object} Product object with properly formatted properties.
         */
        var transform = function (data) {
            return data.map(function (item) {
                // Convert price from cents into dollars format (i.e. 3.81)
                item.price /= 100;

                // Get font size in pixels
                item.productStyle = item.size + 'px';

                // Set type of the item
                item.type = config.TYPE.PRODUCT;
                return item;
            });
        };

        function getServiceConfig() {
            var defaults = $http.defaults.transformResponse;
            var defaultTransformation = angular.isArray(defaults) ? defaults : [defaults];
            return serviceConfig = {
                transformResponse: defaultTransformation.concat(transform)
            };
        };

        /**
         * Get products depends on limit and sort order.
         * @param {Number} limit - Products list size.
         * @param {String} sortBy - Sort products by (id | price | size).
         * @returns {Promise}
         */
        function downloadProducts(limit, sortBy) {
            var skip = productCacheService.get(config.CACHE_ID_SKIP) || 0;
            var url = restManager.getProductsUrl(limit, sortBy, skip);
            var serviceConfig = getServiceConfig();

            return $http.get(url, serviceConfig)
                .then(function (response) {
                    var products = response.data;
                    
                    skip += products.length;
                    productCacheService.put(config.CACHE_ID_SKIP, skip);

                    return {
                        products: products,
                        isEndOfCatalogue: !products.length
                    };
                });
        }

        return serviceAPI = {
            downloadProducts: downloadProducts
        };
    };

    productService.$inject = ['$http', 'restManager', 'productCache'];
    app.factory('productService', productService);
});