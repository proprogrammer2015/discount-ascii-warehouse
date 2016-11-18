define(['app', 'tmpconfig'], function (app, common) {

    // Items to load by default.
    var LOAD_ITEMS = 20;
    var CACHE_PRODUCTS = LOAD_ITEMS * 3;

    var controller = function ($scope, dataService, advertisementService) {
        /**
         * Check if more products can be inserted into buffer (cache).
         * @returns {Boolean} Return true if more products can be inserted into buffer, false otherwise.
         */
        function canLoadToCache() {
            // If buffer (productsBuffer) have products for additional 2 scrolls ( 2 scrolls = 2 x LOAD_ITEMS)
            // then load more products ( prevention of showing Loading... too many times during scroll)
            return that.productsBuffer.length < CACHE_PRODUCTS && that.loadMoreItems;
        }

        var that = this;

        // All advertisement numbers displayed on the page
        that.uniqueAds = [];

        // Products loaded in advance
        that.productsBuffer = [];

        // All items (products, advertisement) displayed on the page
        $scope.products = [];

        // Prevent multiple ajax calls at the same time.
        that.loadMoreItems = true;

        $scope.isLoading = false;
        $scope.isEndOfCatalogue = false;

        // Available sort options
        $scope.sortOptions = {
            DEFAULT: '',
            ID: 'id',
            PRICE: 'price',
            SIZE: 'size'
        };
        // Selected sort order
        $scope.sortBy = '';

        // Store first advertisement (sponsor advertisement)
        $scope.firstAd = {};

        /**
         * Make ajax call to retrieve more products from server.
         */
        $scope.getMore = function () {
            // Prevent of try to call server side if end of catalogue occured.
            if ($scope.isEndOfCatalogue || !canLoadToCache()) {
                return;
            }

            that.loadMoreItems = false;
            $scope.isLoading = true;

            var response = dataService.getProducts(CACHE_PRODUCTS, $scope.sortBy);
            response.then(success, error);

            function success(response) {
                if (!response.data.length) {
                    $scope.isEndOfCatalogue = true;
                }
                $scope.isLoading = false;

                that.productsBuffer = that.productsBuffer.concat(response.data);

                // Load first bunch of items
                if (!$scope.products.length) {
                    $scope.loadMore();
                }
                that.loadMoreItems = true;
            }

            function error(response) {
                $scope.isLoading = false;
                $scope.isEndOfCatalogue = true;
            }
        }

        /**
         * Function invoked after scroll to load more products from buffer (cache).
         */
        $scope.loadMore = function () {
            var isBufferEmpty = that.productsBuffer.length === 0;

            if (!isBufferEmpty) {
                // Load LOAD_ITEMS (i.e. 20) products from buffer (cache)
                var newAadvertisement = advertisementService.getRandomAdvertisement(that.uniqueAds);
                var loaded = that.productsBuffer.splice(0, LOAD_ITEMS);
                $scope.products = $scope.products.concat(loaded);
                // Add advertisement after each bunch of products
                if (loaded.length === LOAD_ITEMS) {
                    $scope.products = $scope.products.concat(newAadvertisement);
                }
            }

            if (canLoadToCache()) {
                $scope.getMore();
            }
        }

        /**
         * Trigger sort order change. Reset all nesessery variables.
         */
        $scope.sortChange = function () {
            that.productsBuffer = [];
            that.uniqueAds = [];
            that.loadMoreItems = true;

            $scope.products = [];
            $scope.firstAd = advertisementService.getRandomAdvertisement(that.uniqueAds);
            $scope.isEndOfCatalogue = false;
            $scope.isLoading = false;
            $scope.getMore();
        }

        /**
         * Initiate products load.
         */
        $scope.sortChange();

    };

    // Products grid controller
    controller.$inject = ['$scope', 'dataService', 'advertisementService'];
    app.controller('productGalleryCtrl', controller);
});
