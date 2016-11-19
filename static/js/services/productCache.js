define(['app', 'appConfig'], function (app, config) {

    var productCache = function ($cacheFactory) {
        return $cacheFactory('productsCache');
    };

    productCache.$inject = ['$cacheFactory'];
    app.factory('productCache', productCache);
});
