define(['app', 'tmpconfig'], function (app, config) {

    /**
     * Get advertisement number, that is not the same twice in a row.
     * @param {Array} numbers - Array of advertisement numbers.
     * @returns {Number} Number, which is not the same twice in a row.
     */
    var getAdvertisementNumber = function (numbers) {
        var adRandom = Math.floor(Math.random() * 1000) % 16 + 1;
        if (numbers.length >= 10) {
            while (numbers[numbers.length - 1] === adRandom) {
                adRandom = Math.floor(Math.random() * 1000) % 16 + 1;
            }
            return adRandom;
        }

        while (numbers.indexOf(adRandom) >= 0) {
            adRandom = Math.floor(Math.random() * 1000) % 16 + 1;
        }
        return adRandom;
    };

    /**
     * Get random advertisement.
     * @param {Array} advertisements - List of all loaded advertisements.
     * @returns {Object} Advertisement object.
     */
    var getRandomAdvertisement = function (advertisements) {
        var adRandom = getAdvertisementNumber(advertisements);
        advertisements.push(adRandom);
        return advertisement = {
            type: config.TYPE.ADVERTISEMENT,
            src: config.REST_API.ADVERTISEMENT + advertisements[advertisements.length - 1]
        };
    };

    var advertisementService = function () {
        return {
            getRandomAdvertisement: getRandomAdvertisement
        };
    };

    app.factory('advertisementService', advertisementService);
});
