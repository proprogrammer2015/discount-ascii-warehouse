define(['app', 'lodash', 'appConfig'], function (app, _, config) {

    var advertisementService = function (restManager) {
        var advertisements = [];

        /**
         * Get advertisement number, which is not the same twice in a row.
         * @param {Array} numbers - Array of advertisement numbers.
         * @returns {Number} Number, which is not the same twice in a row.
         */
        var __getAdvertisementNumber = function (numbers) {
            var adRandom = _.random(1, 16);
            if (!numbers.length)
                return adRandom;
            
            while (_.last(numbers) === adRandom) {
                adRandom = _.random(1, 16);
            }
            return adRandom;
        };

        /**
         * Get random advertisement.
         * @param {Array} advertisements - List of all loaded advertisements.
         * @returns {Object} Advertisement object.
         */
        var getRandomAdvertisement = function () {
            var adRandom = __getAdvertisementNumber(advertisements);
            advertisements.push(adRandom);
            return advertisement = {
                type: config.TYPE.ADVERTISEMENT,
                src: restManager.ADVERTISEMENT + advertisements[advertisements.length - 1]
            };
        };
        return {
            getRandomAdvertisement: getRandomAdvertisement
        };
    };

    advertisementService.$inject = ['restManager'];
    app.factory('advertisementService', advertisementService);
});
