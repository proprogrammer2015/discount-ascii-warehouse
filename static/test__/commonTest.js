define(function () {

    return {
        getPoductsResponse: function (limit, sort) {
            var limit = limit || 20;
            var items = [];
            for (var i = 1; i <= limit; i++) {
                items.push('{"id":"' + i + '-bbjznd3mpjg4px464xgjeb3xr","size":' + (i + 6) + ',"price":' +
                    (i + 124) + ',"face":"♥‿♥","date":"Sun Jun 12 20' + i + ' 11:33:34 GMT+0200 (CEST)"}');
                items.push('\n');
            }
            return items.join('\n');
        },
        getPoductsCollectionResponse: function (limit) {
            var limit = limit || 20;
            var items = [];
            for (var i = 1; i <= limit; i++) {

                items.push({
                    id: i + '-bbjznd3mpjg4px464xgjeb3x',
                    size: i + 6,
                    price: i + 124,
                    face: 'sth' + i,
                    date: Date.now() + i * 1000
                });
            }
            return items;
        }
    }

});
