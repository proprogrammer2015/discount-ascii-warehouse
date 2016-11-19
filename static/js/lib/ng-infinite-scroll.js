/**
 * This Angular plugin has been modified (by me) to meet task criteria.
 * Original plugin: https://github.com/juanxme/angular-whenScrolled/blob/master/angular-whenScrolled.js
 */

var mod;
mod = angular.module('angular-whenScrolled', []);
mod.directive("whenScrolled", ['$window', function ($window) {
    var firstLoad = true;
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            raw = elem[0];

            var checkLoadMore = function (evt) {
                var rectObject = raw.getBoundingClientRect();
                if ($window.innerHeight > rectObject.bottom) {
                    scope.$apply(attrs.whenScrolled);
                }
            };

            /*var checkGetMore = function (evt) {
                var rectObject = raw.getBoundingClientRect();
                if (!scope.isLoading) {
                    if ($window.innerHeight + 500 > rectObject.bottom) {
                        scope.$apply(attrs.requestItems);
                    }
                }
            };*/

            angular.element($window).bind('scroll load', checkLoadMore);
            //angular.element($window).bind('scroll', checkGetMore);
        }
    };
}]);