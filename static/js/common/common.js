define(['angular', 'dateformat'], function (angular, dateformat) {

    var APPLICATION_NAME = 'ecommerce';

    var REST_API = {
        PRODUCTS: '/api/products',
        ADVERTISEMENT: '/ad/?r=',
        // TODO: add comments
        getProductsUrl: function (limit, sort, skip) {
            var url = this.PRODUCTS;
            var argsCount = arguments.length;

            if (argsCount && limit) {
                url += '?';
            }

            if (limit && argsCount >= 1) {
                url += 'limit=' + limit;
            }
            if (sort && argsCount >= 2) {
                url += '&sort=' + sort;
            }
            if (skip && argsCount >= 3) {
                url += '&skip=' + skip;
            }
            return url;
        }
    };

    var SORTBY = {
        DEFAULT: '',
        ID: 'id',
        PRICE: 'price',
        SIZE: 'size'
    };

    var TYPE = {
        PRODUCT: 'product',
        ADVERTISEMENT: 'advertisement'
    };

    /* Time in seconds */
    var MINUTE = 60;
    var HOUR = MINUTE * 60;
    var DAY = HOUR * 24;
    var WEEK_DAYS = 7;
    var WEEK = DAY * WEEK_DAYS;

    var TIME = {
        MINUTE: MINUTE,
        HOUR: HOUR,
        DAY: DAY,
        WEEK_DAYS: WEEK_DAYS,
        WEEK: WEEK
    };

    var HTTP_SUCCESS = 200;
    var RESPONSE_DELIMITER = '\n';

    /**
     * Common parsing, parsing invalid JSON response to valid JSON response.
     * @param {String} data - Text response form server.
     * @param {Number} status - Response status.
     * @returns {Array} - Array of json objects.
     */
    var httpResponseParser = function (data, status) {
        if (status !== HTTP_SUCCESS) return [];

        function notEmpty(item) {
            return item.trim().length > 0;
        }

        function parseJson(item) {
            var json = null;
            try {
                json = JSON.parse(item);
            } catch (ex) {
                json = null;
            }
            return json;
        }

        // Remove invalid lines (i.e. empty lines without json object)
        var tmpResponse = data.split(RESPONSE_DELIMITER).filter(notEmpty);

        // Parse each object individually
        var response = tmpResponse.map(parseJson);
        return response;
    }

    /**
     * Check if date is older than validity range. If so return date in format (i.e. May 21st 2016 4:37 PM), 
     * otherwise convert date into relative format (i.e. 3 days ago, 7 days ago).
     * @param {String} date - Date of item.
     * @param {Number} validity - Time range.
     * @returns {String} Relative date from now to validity.
     */
    var convertDate = function (date, validity) {

        var date = new Date(date);
        // Get time in seconds
        var itemDate = date.getTime() / 1000;
        var timeNow = Date.now() / 1000;

        var relativeTime = Math.round(timeNow - itemDate);

        // if current time is in range of validity time then return relative time (i.e. 2 days ago)
        if (relativeTime <= validity) {

            if (relativeTime < MINUTE) {
                relativeTime = relativeTime + (relativeTime === 1 ? ' second' : ' seconds');
            }
            if (relativeTime < HOUR) {
                relativeTime = Math.round(relativeTime / MINUTE);
                relativeTime = relativeTime + (relativeTime === 1 ? ' minute' : ' minutes');
            }
            if (relativeTime < DAY) {
                relativeTime = Math.round(relativeTime / HOUR);
                relativeTime = relativeTime + (relativeTime === 1 ? ' hour' : ' hours');
            }
            if (relativeTime <= WEEK) {
                relativeTime = Math.round(relativeTime / DAY);
                if (relativeTime < WEEK_DAYS)
                    relativeTime = relativeTime + (relativeTime === 1 ? ' day' : ' days');
                else
                    relativeTime = ' a week';
            }
            return relativeTime + ' ago';
        }
        // otherwise return date in format (May 21st 2016 4:37 PM)
        return dateformat(date, "mmm dS yyyy h:MM TT");
    };

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
            type: TYPE.ADVERTISEMENT,
            src: REST_API.ADVERTISEMENT + advertisements[advertisements.length - 1]
        };
    };

    /**
     * Add transform function to transform functions array.
     * @param {Object} defaults - Angular default transform functions object.
     * @param {Function} transform - Function, that transforms response.
     * @returns {Object} Returns Angular object with transform functions array.
     */
    var transformResponse = function (defaults, transform) {
        defaults = angular.isArray(defaults) ? defaults : [defaults];
        return defaults.concat(transform);
    };

    /**
     * Helper object for HTTP service.
     */
    var http = {
        transformResponse: transformResponse,
        httpResponseParser: httpResponseParser
    };

    return publicAPI = {
        APPLICATION_NAME: APPLICATION_NAME,
        REST_API: REST_API,
        SORTBY: SORTBY,
        TYPE: TYPE,
        TIME: TIME,
        http: http,
        convertDate: convertDate,
        getAdvertisementNumber: getAdvertisementNumber,
        getRandomAdvertisement: getRandomAdvertisement
    };
});