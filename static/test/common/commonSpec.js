define(['common', 'test/commonTest',], function (common, commonTest) {

    describe("Common module", function () {

        describe('should return correct products url', function () {
            var constUrl = '';

            beforeEach(function () {
                constUrl = common.REST_API.PRODUCTS;
            });

            it('without parameters', function () {
                var result = common.REST_API.getProductsUrl();
                expect(result).toEqual(constUrl);
            });

            it('with limit parameter', function () {
                var limit = 20;
                constUrl += '?limit=' + limit;

                var result = common.REST_API.getProductsUrl(limit);
                expect(result).toEqual(constUrl);
            });

            it('with limit and sort parameter', function () {
                var limit = 20;
                var sort = 'price';
                constUrl += '?limit=' + limit + '&sort=' + sort;

                var result = common.REST_API.getProductsUrl(limit, sort);
                expect(result).toEqual(constUrl);
            });

            it('with limit, sort and skip parameter', function () {
                var limit = 20;
                var sort = 'price';
                var skip = 40;
                constUrl += '?limit=' + limit + '&sort=' + sort + '&skip=' + skip;

                var result = common.REST_API.getProductsUrl(limit, sort, skip);
                expect(result).toEqual(constUrl);
            });

        });

        describe('should return correct date format', function () {
            var validity = common.TIME.WEEK;
            var now = Date.now();

            beforeEach(function () {
                now = Date.now();
            });

            it('if item was added within 1 second ago', function () {
                now = now - 1 * 1000;
                var result = common.convertDate(now, validity);
                expect(result).toEqual('1 second ago');
            });

            it('if item was added within 20 seconds ago', function () {
                now = now - 20 * 1000;
                var result = common.convertDate(now, validity);
                expect(result).toEqual('20 seconds ago');
            });

            it('if item was added within 1 minute ago', function () {
                now = now - common.TIME.MINUTE * 1000;
                var result = common.convertDate(now, validity);
                expect(result).toEqual('1 minute ago');
            });

            it('if item was added within 2 minutes ago', function () {
                now = now - 2 * common.TIME.MINUTE * 1000;
                var result = common.convertDate(now, validity);
                expect(result).toEqual('2 minutes ago');
            });

            it('if item was added within 1 hour ago', function () {
                now = now - common.TIME.HOUR * 1000;
                var result = common.convertDate(now, validity);
                expect(result).toEqual('1 hour ago');
            });

            it('if item was added within 2 hours ago', function () {
                now = now - 2 * common.TIME.HOUR * 1000;
                var result = common.convertDate(now, validity);
                expect(result).toEqual('2 hours ago');
            });

            it('if item was added within 1 day ago', function () {
                now = now - common.TIME.DAY * 1000;
                var result = common.convertDate(now, validity);
                expect(result).toEqual('1 day ago');
            });

            it('if item was added within 2 days ago', function () {
                now = now - 2 * common.TIME.DAY * 1000;
                var result = common.convertDate(now, validity);
                expect(result).toEqual('2 days ago');
            });

            it('if item was added within one week ago', function () {
                now = now - common.TIME.WEEK * 1000;
                var result = common.convertDate(now, validity);
                expect(result).toEqual(' a week ago');
            });

            it('if item was added more than one week ago', function () {
                now = new Date('Sun Jun 26 2016 12:19:35 GMT+0200 (Central European Standard Time)');
                now = now - 2 * common.TIME.WEEK * 1000;
                var result = common.convertDate(now, validity);
                expect(result).toEqual('Jun 12th 2016 12:19 PM');
            });
        });

        it('should not have duplicates in two last array items', function () {
            var numbers = [];
            var maxSize = 50;
            for (var i = 0; i < maxSize; i++) {
                var randomNumber = common.getAdvertisementNumber(numbers);
                numbers.push(randomNumber);
            }
            var lastItem = numbers.length - 1;
            expect(numbers[lastItem - 1]).not.toEqual(numbers[lastItem]);
        });

        it('should return proper advertisement', function () {
            var advertisementNumbers = [1, 2, 3, 4, 5, 6];
            var adsLen = 6;
            var advertisement = common.getRandomAdvertisement(advertisementNumbers);

            var expectedAd = {
                type: common.TYPE.ADVERTISEMENT,
                src: common.REST_API.ADVERTISEMENT + advertisementNumbers[advertisementNumbers.length - 1]
            };
            var expectedAdLen = 7;

            expect(advertisement).toEqual(expectedAd);
            expect(adsLen + 1).toEqual(expectedAdLen);
        });

        describe('http response', function () {
            it('should return 4 objects from text response', function () {
                var res = commonTest.getPoductsResponse(4);

                var statusHttpOk = 200;
                var response = common.http.httpResponseParser(res, statusHttpOk);

                expect(response.length).toEqual(4);
            });

            it('should return empty array', function () {
                var res = '';

                var statusHttpOk = 200;
                var response = common.http.httpResponseParser(res, statusHttpOk);

                expect(response.length).toEqual(0);
            });

            it('should return null due to status 404 - not found', function () {
                var res = '';

                var statusHttpNotFound = 404;
                var response = common.http.httpResponseParser(res, statusHttpNotFound);

                expect(response.length).toEqual(0);
            });
        });
    });
});
