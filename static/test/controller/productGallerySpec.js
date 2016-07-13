define(['app',
    'angular',
    'angularMocks',
    'test/commonTest',
    'productGallery',
    'infinitiveScroll',
    'dataService'], function (app, angular, mocks, commonTest) {

        describe('ecommerce app', function () {

            beforeEach(module('ecommerce'));

            describe('productGallery controller', function () {

                var scope, getController;
                var dataService = {
                    getProducts: function () { }
                };
                var limit = 80;

                beforeEach(inject(function ($rootScope, $controller) {
                    scope = $rootScope.$new();

                    getController = function () {
                        return $controller('productGalleryCtrl', {
                            '$scope': scope,
                            'dataService': dataService
                        });
                    };
                }));

                describe('with product list', function () {

                    beforeEach(function () {
                        spyOn(dataService, 'getProducts').and.callFake(function () {
                            return {
                                then: function (callback) {
                                    return callback({
                                        data: commonTest.getPoductsCollectionResponse(limit)
                                    });
                                }
                            };
                        });
                    });

                    it('should be defined', function () {
                        var controller = getController();
                        expect(scope).toBeDefined();
                    });

                    it('should have correct state', function () {
                        var controller = getController();

                        expect(controller.productsBuffer.length).toEqual(60);
                        expect(controller.uniqueAds.length).toEqual(2);
                        expect(controller.loadMoreItems).toEqual(false);

                        expect(scope.isEndOfCatalogue).toEqual(false);
                        expect(scope.sortBy).toEqual('');
                        expect(scope.sortOptions).toBeDefined();
                        expect(scope.firstAd).toBeDefined();
                        expect(scope.sortOptions).toBeDefined();
                    });

                    it('should call getMore() and fill products collection after load', function () {
                        var controller = getController();
                        var productsCount = 20;
                        var advertisementCount = 1;
                        var expectedCollectionLen = productsCount + advertisementCount;

                        expect(scope.products.length).toEqual(expectedCollectionLen);
                        expect(dataService.getProducts).toHaveBeenCalledWith(jasmine.any(Number), '');
                    });

                    it('should call twice getMore() and fill products collection', function () {
                        var controller = getController();
                        var productsCount = 40;
                        var advertisementCount = 2;
                        var expectedCollectionLen = productsCount + advertisementCount;
                        scope.loadMore();
                        expect(scope.products.length).toEqual(expectedCollectionLen);
                        expect(controller.productsBuffer.length).toEqual(40);
                    });

                    it('should call getMore() with sort order', function () {
                        var controller = getController();
                        var productsCount = 20;
                        var advertisementCount = 1;
                        var expectedCollectionLen = productsCount + advertisementCount;

                        scope.sortBy = 'price';
                        scope.sortChange();

                        expect(controller.productsBuffer.length).toEqual(60);
                        expect(controller.uniqueAds.length).toEqual(2);
                        expect(controller.loadMoreItems).toEqual(false);

                        expect(scope.products.length).toEqual(expectedCollectionLen);
                        expect(scope.sortBy).toEqual('price');
                        expect(dataService.getProducts).toHaveBeenCalledWith(jasmine.any(Number), 'price');
                    });

                });


                it('should be end of catalogue', function () {

                    spyOn(dataService, 'getProducts').and.callFake(function () {
                        return {
                            then: function (callback) {
                                return callback({
                                    data: []
                                });
                            }
                        };
                    });

                    var controller = getController();

                    expect(scope.products.length).toEqual(0);
                    expect(scope.isEndOfCatalogue).toEqual(true);

                    expect(controller.productsBuffer.length).toEqual(0);
                    expect(controller.uniqueAds.length).toEqual(1);
                    expect(controller.loadMoreItems).toEqual(false);
                });

            });
        });

    });
