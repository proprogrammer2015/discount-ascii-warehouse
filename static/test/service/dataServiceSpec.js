define(['app',
    'angular',
    'angularMocks',
    'common',
    'test/commonTest',
    'infinitiveScroll',
    'dataService'], function (app, angular, mocks, common, commonTest) {

        describe('ecommerce app', function () {

            beforeEach(module('ecommerce'));

            describe('dataService', function () {
                var _service, $httpBackend;
                var responseMock;

                beforeEach(function () {
                    inject(function ($injector) {
                        _service = $injector.get('dataService');
                        $httpBackend = $injector.get('$httpBackend');
                    });

                    responseMock = function (method, url, data, headers, params) {
                        var res = commonTest.getPoductsResponse(params.limit, params.sort);
                        return [200, res];
                    }
                });

                // Testing correctness of the url calls. Test sort and skip parameters within service.

                it('should call products api without params', function () {
                    var getProducts = $httpBackend.whenGET('/api/products').respond(responseMock);
                    _service.getProducts();
                    $httpBackend.expectGET('/api/products');
                    $httpBackend.flush();
                });

                it('should call products api with limit param', function () {
                    var getProducts = $httpBackend.whenGET('/api/products?limit=10').respond(responseMock);
                    _service.getProducts(10);
                    $httpBackend.expectGET('/api/products?limit=10');
                    $httpBackend.flush();
                });

                it('should call products api with limit and sort param', function () {
                    var getProducts = $httpBackend.whenGET('/api/products?limit=10&sort=size').respond(responseMock);

                    _service.getProducts(10, 'size');
                    $httpBackend.expectGET('/api/products?limit=10&sort=size');
                    $httpBackend.flush();

                });

                it('should call products api with limit, sort and skip param', function () {
                    var getProducts = $httpBackend.whenGET('/api/products?limit=10&sort=size').respond(responseMock);

                    _service.getProducts(10, 'size');
                    $httpBackend.expectGET('/api/products?limit=10&sort=size');
                    $httpBackend.flush();

                    getProducts = $httpBackend.whenGET('/api/products?limit=10&sort=size&skip=10').respond(responseMock);

                    _service.getProducts(10, 'size');
                    $httpBackend.expectGET('/api/products?limit=10&sort=size&skip=10');
                    $httpBackend.flush();

                    getProducts = $httpBackend.whenGET('/api/products?limit=10&sort=size&skip=20').respond(responseMock);

                    _service.getProducts(10, 'size');
                    $httpBackend.expectGET('/api/products?limit=10&sort=size&skip=20');
                    $httpBackend.flush();
                });

                it('should call products api with different sort params', function () {
                    var getProducts = $httpBackend.whenGET('/api/products?limit=10&sort=size').respond(responseMock);

                    _service.getProducts(10, 'size');
                    $httpBackend.expectGET('/api/products?limit=10&sort=size');
                    $httpBackend.flush();

                    getProducts = $httpBackend.whenGET('/api/products?limit=10&sort=size&skip=10').respond(responseMock);

                    _service.getProducts(10, 'size');
                    $httpBackend.expectGET('/api/products?limit=10&sort=size&skip=10');
                    $httpBackend.flush();

                    getProducts = $httpBackend.whenGET('/api/products?limit=10&sort=size&skip=20').respond(responseMock);

                    _service.getProducts(10, 'size');
                    $httpBackend.expectGET('/api/products?limit=10&sort=size&skip=20');
                    $httpBackend.flush();

                    getProducts = $httpBackend.whenGET('/api/products?limit=40&sort=price').respond(responseMock);

                    _service.getProducts(40, 'price');
                    $httpBackend.expectGET('/api/products?limit=40&sort=price');
                    $httpBackend.flush();

                    getProducts = $httpBackend.whenGET('/api/products?limit=40&sort=price&skip=40').respond(responseMock);

                    _service.getProducts(40, 'price');
                    $httpBackend.expectGET('/api/products?limit=40&sort=price&skip=40');
                    $httpBackend.flush();

                    getProducts = $httpBackend.whenGET('/api/products?limit=60').respond(responseMock);

                    _service.getProducts(60);
                    $httpBackend.expectGET('/api/products?limit=60');
                    $httpBackend.flush();
                });
            });
        });

    });
