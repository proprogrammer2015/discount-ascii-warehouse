define(['angular', 'dateformat'], function (angular, dateformat) {

    var APPLICATION_NAME = 'ecommerce';

    var REST_API = {
        PRODUCTS: '/api/products',
        ADVERTISEMENT: '/ad/?r=',
        // Generate url to get products
        getProductsUrl: function (limit, sort, skip) {
            var url = this.PRODUCTS;
            var argsCount = arguments.length;

            if (argsCount && limit) {
                url += '?';
            }

            if (limit && argsCount >= 1) {
                url += 'limit=' + limit;
            }
            if (sort && argsCount >= 2) {
                url += '&sort=' + sort;
            }
            if (skip && argsCount >= 3) {
                url += '&skip=' + skip;
            }
            return url;
        }
    };

    var TYPE = {
        PRODUCT: 'product',
        ADVERTISEMENT: 'advertisement'
    };  

    

    return publicAPI = {
        APPLICATION_NAME: APPLICATION_NAME,
        REST_API: REST_API,
        TYPE: TYPE
    };
});