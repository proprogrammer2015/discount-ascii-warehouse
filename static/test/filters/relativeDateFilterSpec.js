define(['app',
    'angular',
    'angularMocks',
    'test/commonTest',
    'productGallery',
    'infinitiveScroll',
    'relativeDateFilter'], function (app, angular, mocks, commonTest) {

        describe('ecommerce app', function () {

            beforeEach(module('ecommerce'));

            describe('relativeDateFilter filter', function () {

                var relativeDateFilter;

                beforeEach(inject(function ($filter) {
                    relativeDateFilter = $filter('relativeDate');
                }));

                it('should return relative date format', function () {
                    var timeNow = Date();
                    var result = relativeDateFilter(timeNow);

                    expect(result.indexOf('ago') !== -1).toBe(true);
                });

                it('should return normal date format', function () {
                    var time = "Tue Jun 14 2016 02:48:51 GMT+0200 (CEST)";
                    var result = relativeDateFilter(time);

                    expect(result).toEqual('Jun 14th 2016 2:48 AM');
                });

                it('should return normal date format due to invalid validity parameter', function () {
                    var time = "Tue Jun 14 2016 02:48:51 GMT+0200 (CEST)";
                    var result = relativeDateFilter(time, 'year');

                    expect(result).toEqual('Jun 14th 2016 2:48 AM');
                });

            });
        });
    });
