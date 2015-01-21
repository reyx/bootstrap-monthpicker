'use strict';
angular.module('ui.bootstrap-month-picker', []).directive('monthPicker', ['$parse',
    function ($parse) {
        return {
            restrict: 'A',
            require: '^ngModel',
            templateUrl: 'bootstrap-monthpicker/bootstrap-monthpicker.html',
            link: function ($scope, $element, $attrs, ngModel) {
                $scope.periods = [];

                $scope.setPeriod = function (period) {
                    $scope.periods.length = 0;
                    $scope.brand = $attrs.monthPickerBrand;

                    var start = window.moment(period).subtract(3, 'months').toDate();

                    for (var i = 0; i < 7; i++) {
                        var idx = i;

                        if (i === 0) {
                            idx = 2;
                        }
                        else if (i === 6) {
                            idx = 4;
                        }

                        $scope.periods.push({
                            active: i === 3,
                            date: window.moment(start).add(idx, 'months').toDate()
                        });
                    }

                    ngModel.$setViewValue(period);
                };

                $scope.goToCurrentMonth = function () {
                    $scope.setPeriod(new Date());
                };

                $scope.goToCurrentMonth();
            }
        };
    }
]);

angular.module('ui.bootstrap-month-picker').run(['$templateCache', function ($templateCache) {
    $templateCache.put('bootstrap-monthpicker/bootstrap-monthpicker.html', '<button data-ng-click="goToCurrentMonth()" class="btn btn-default">  <i class="fa fa-calendar-o fa-only"></i></button><button data-ng-repeat="period in periods" data-ng-class="period.active ? \'btn-\' + brand : \'\'" data-ng-click="setPeriod(period.date)" class="btn btn-default half-left">  <i data-ng-if="$first" class="fa fa-chevron-left fa-only"></i>  <i data-ng-if="$last" class="fa fa-chevron-right fa-only"></i>  <span data-ng-if="!$first &amp;&amp; !$last" data-ng-bind="period.date | date: \'MMM\'" class="uppercase"></span>  <span data-ng-if="!$first &amp;&amp; !$last" data-ng-bind="period.date | date: \'yyyy\'"></span></button>');
}]);
