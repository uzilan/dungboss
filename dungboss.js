var dungboss = angular.module('dungboss', []);

dungboss.controller('DungbossController', ['$scope', '$http',
    function ($scope, $http) {

        $http.get('heroes.json').success(function (data) {
            $scope.heroes = data;

            $scope.elements = uniques("element");
            $scope.classes = uniques("class");
        });

        var uniques = function (type) {
            return _.chain($scope.heroes)
                .map(type)
                .uniq()
                .sort()
                .value();
        };

        var isEnabled = function (hero) {
            var e = $scope.elements[hero.element];
            var c = $scope.classes[hero.class];
            return e && e.enabled &&
                c && c.enabled;
        };

        $scope.selectHeroes = function () {
            $scope.selectedHeroes = _.chain($scope.heroes)
                .filter(function (hero) {
                    return isEnabled(hero);
                })
                .sort()
                .value();
        };

        $scope.selectAll = function (type) {

            var sa;
            var items;
            switch(type) {
                case 'classes':
                   sa =  $scope.selectAllClasses;
                   items = $scope.classes
                    break;
            }

            if (sa) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }

            angular.forEach(items, function (item) {
                $scope.classes[item].enabled = $scope.selectedAll;
            });
        }
    }]);
