define(
    [
        'app',
        'appConfig',
        'service/productRepository',
        'service/advertisementService'
    ], function (app, config) {

        var controller = function ($scope, productRepository, advertisementService) {

            function init() {
                // All items (products, advertisement) displayed on the page
                $scope.galleryItems = [];
                $scope.isEndOfCatalogue = false;
            }

            // Selected sort order
            $scope.sortBy = '';

            /**
             * Function invoked after scroll to load more products from buffer (cache).
             */
            $scope.loadMore = function () {

                var advertisement = advertisementService.getRandomAdvertisement();
                var products = productRepository.getProducts(config.LOAD_ITEMS, $scope.sortBy);

                function success(data) {
                    if (data.isEndOfCatalogue) {
                        $scope.isEndOfCatalogue = data.isEndOfCatalogue;
                    }
                    else {
                        $scope.galleryItems.push(advertisement);
                        Array.prototype.push.apply($scope.galleryItems, data.products);
                    }
                }

                function error() {
                    $scope.isEndOfCatalogue = true;
                }

                if (products)
                    products.then(success, error);
            };

            /**
             * Trigger sort order change. Reset all nesessery variables.
             */
            $scope.sortChange = function () {
                init();
                productRepository.clearCache();
                $scope.loadMore();
            }

            init();
        };

        // Products grid controller
        controller.$inject = ['$scope', 'productRepository', 'advertisementService'];
        app.controller('productGalleryCtrl', controller);
    });
