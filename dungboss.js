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
                .map(function (name) {
                    return {name: name, enabled: false};
                })
                .sort()
                .value();
        };

        var isEnabled = function (hero) {
            var elementIndex = findIndex($scope.elements, hero.element);
            var element = $scope.elements[elementIndex];

            var classIndex = findIndex($scope.classes, hero.class);
            var clazz = $scope.classes[classIndex];

            return element.enabled && clazz.enabled;
        };

        $scope.selectHeroes = function () {
            $scope.selectedHeroes = _.chain($scope.heroes)
                .filter(function (hero) {
                    return isEnabled(hero);
                })
                .sort()
                .value();
        };

        var findIndex = function (items, value) {
            return _.findIndex(items, function (v) {
                return v.name === value;
            });
        };

        $scope.selectAll = function (type) {

            var sa;
            var items;

            switch (type) {
                case 'classes':
                    sa = $scope.selectAllClasses;
                    items = $scope.classes;
                    break;
            }

            if (sa) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }

            angular.forEach(items, function (item) {
                var i = findIndex($scope.classes, item.name);
                items[i].enabled = $scope.selectedAll;
            });
            $scope.selectHeroes();
        }
    }]);
