define(['app'], function (app) {

    var restManager = function () {
        return {
            PRODUCTS: '/api/products',
            ADVERTISEMENT: '/ad/?r=',
            // Generate url to get products
            getProductsUrl: function (limit, sort, skip) {
                var url = this.PRODUCTS;

                if (limit) {
                    url += '?limit=' + limit;
                }
                if (sort) {
                    url += '&sort=' + sort;
                }
                if (skip) {
                    url += '&skip=' + skip;
                }
                return url;
            }
        };
    };

    app.factory('restManager', restManager);
});
