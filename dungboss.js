var dungboss = angular.module('dungboss', []);

dungboss.controller('DungbossController', ['$scope', '$http',
    function ($scope, $http) {

        $http.get('heroes.json').success(function (data) {
            $scope.heroes = data;

            $scope.elements = uniques("element");
            $scope.classes = extractClasses();

            $scope.selectAllElements = true;
            $scope.selectAll('elements');

            $scope.selectAllClasses = true;
            $scope.selectAll('classes');

        });

        var uniques = function (type) {
            return _.chain($scope.heroes)
                .map(type)
                .uniq()
                .sort()
                .map(function (name) {
                    return {name: name, enabled: false};
                })
                .value();
        };

        var extractClasses = function () {
            return _.chain($scope.heroes)
                .reduce(function (result, h) {
                    return result.concat(_.words(h.class));
                }, [])
                .uniq()
                .sort()
                .map(function (clazz) {
                    return {name: clazz, enabled: false}
                })
                .value();
        };

        var isEnabled = function (hero) {
            var elementIndex = findIndex($scope.elements, hero.element);
            if (elementIndex === -1) {
                return false;
            }
            var element = $scope.elements[elementIndex];
            if (!element.enabled) {
                return false;
            }

            var result = false;
            _.each(_.words(hero.class), function (c) {
                var classIndex = findIndex($scope.classes, c);
                if (classIndex > -1) {
                    var clazz = $scope.classes[classIndex];
                    if (clazz.enabled) {
                        result = true;
                    }
                }
            });
            return result;
        };

        $scope.selectHeroes = function () {
            $scope.selectedHeroes = _.chain($scope.heroes)
                .filter(function (hero) {
                    return isEnabled(hero);
                })
                .sortBy(function (hero) {
                    return hero.name;
                })
                .value();
        };

        var findIndex = function (items, value) {
            return _.findIndex(items, function (v) {
                return value.indexOf(v.name) > -1;
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
                case 'elements':
                    sa = $scope.selectAllElements;
                    items = $scope.elements;
                    break;
            }

            if (sa) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }

            angular.forEach(items, function (item) {
                var i = findIndex(items, item.name);
                items[i].enabled = $scope.selectedAll;
            });
            $scope.selectHeroes();
        }
    }]);
