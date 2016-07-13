define([
    'app',
    'text!../templates/product.gallery.html',
    'text!../templates/product.list.html',
    'text!../templates/product.html',
    'text!../templates/advertisement.html'
],
    function (app, productGalleryTemplate, productListTemplate, productTemplate, advertisementTemplate) {

        var productGalleryDirective = function () {
            return {
                restrict: 'E',
                controller: 'productGalleryCtrl',
                template: productGalleryTemplate
            };
        };
        app.directive('productGallery', productGalleryDirective);


        // ----

        var productListDirective = function () {
            return {
                restrict: 'E',
                require: '^^productGallery',
                template: productListTemplate
            };
        };
        app.directive('productList', productListDirective);

        // ---

        var productDirective = function () {
            return {
                scope: {
                    item: '='
                },
                restrict: 'E',
                template: productTemplate
            };
        }
        app.directive('product', productDirective);

        // ---

        var advertisementDirective = function () {
            return {
                scope: {
                    item: '='
                },
                restrict: 'E',
                template: advertisementTemplate
            };
        }
        app.directive('advertisement', advertisementDirective);

    });
