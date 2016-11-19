define(
    [
        'app',
        'lodash',
        'appConfig',
        'service/productService',
        'service/productCache'
    ],
    function (app, _, config) {

        /**
         * Service responsible for ajax calls and response transformation.
         */
        var productRepository = function ($http, $q, productService, productCacheService) {

            var isLoading = false;

            function clearCache() {
                productCacheService.removeAll();
            }

            function getProducts(limit, sortBy) {
                var productsCache = productCacheService.get(config.CACHE_ID_PRODUCTS) || [];

                if (productsCache.length) {
                    var deffered = $q.defer();
                    var data = {
                        products: productsCache.splice(0, limit),
                        isEndOfCatalogue: false
                    };
                    productCacheService.put(config.CACHE_ID_PRODUCTS, productsCache);
                    deffered.resolve(data);
                    return deffered.promise;

                } else if (!productsCache.length && !isLoading) {
                    isLoading = true;
                    return productService
                        .downloadProducts(config.CACHE_PRODUCTS, sortBy)
                        .then(function downloaded(data) {
                            products = data.products;

                            var display = products.slice(0, limit);
                            var cache = products.slice(limit);

                            Array.prototype.push.apply(productsCache, cache);
                            productCacheService.put(config.CACHE_ID_PRODUCTS, productsCache);

                            isLoading = false;
                            return {
                                products: display,
                                isEndOfCatalogue: data.isEndOfCatalogue
                            };
                        });
                }
                return null;
            };

            return serviceAPI = {
                getProducts: getProducts,
                clearCache: clearCache
            };
        };

        productRepository.$inject = ['$http', '$q', 'productService', 'productCache'];
        app.factory('productRepository', productRepository);
    });