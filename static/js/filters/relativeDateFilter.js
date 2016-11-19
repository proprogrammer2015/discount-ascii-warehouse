define(['app', 'dateformat'], function (app, dateformat) {

    /* Time in seconds */
    var MINUTE = 60;
    var HOUR = MINUTE * 60;
    var DAY = HOUR * 24;
    var WEEK_DAYS = 7;
    var WEEK = DAY * WEEK_DAYS;

    /**
     * Check if date is older than validity range. If so return date in format 
     * (i.e. May 21st 2016 4:37 PM), 
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
     * If date is equal or earlier than week (7 days) then convert item
     * into relative format (i.e. 3 days ago, 7 days ago)
     * otherwise return date in format (May 21st 2016 10:43 AM)
     */
    app.filter('relativeDate', function () {
        return function (input, validity) {
            var validityRange = null;
            switch (validity) {
                case 'week':
                default:
                    validityRange = WEEK
                    break;
            }
            var date = convertDate(input, validityRange);
            return date;
        };
    });
});