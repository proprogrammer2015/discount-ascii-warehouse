define(['app', 'common'], function (app, common) {
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
                    validityRange = common.TIME.WEEK
                    break;
            }
            var date = common.convertDate(input, validityRange);
            return date;
        };
    });
});