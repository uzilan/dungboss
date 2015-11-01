/**
 * @ngdoc overview
 * @description The dungboss module contain all the implementations for the Dungeon Boss Filter application
 */
var dungboss = angular.module('dungboss', []);

/**
 * @ngdoc controller
 * name DungbossController
 * @description Main controller for the Dungeon Boss Filter application
 */
dungboss.controller('DungbossController', ['$scope', '$http', 'HeroService', 'ElementService', 'ClassService', 'UtilService',
    function ($scope, $http, HeroService, ElementService, ClassService, UtilService) {

        // read all hero information from the json file and extract elements, classes and other information from it
        $http.get('heroes.json').success(function (data) {
            $scope.heroes = data;

            $scope.elements = UtilService.uniques($scope.heroes, "element");
            $scope.classes = ClassService.extractClasses($scope.heroes);

            $scope.selectAllElements = true;
            $scope.selectAll('elements');

            $scope.selectAllClasses = true;
            $scope.selectAll('classes');
        });

        $scope.selectionMode = {
            mode: 'or'
        };


        // toggle the selection of all elements in a given list
        var toggleAll = function () {
            var unselectedElementsFound = _.find($scope.elements, function (element) {
                return !element.enabled
            });

            var unselectedClassesFound = _.find($scope.classes, function (clazz) {
                return !clazz.enabled
            });

            $scope.selectAllElements = !unselectedElementsFound;
            $scope.selectAllClasses = !unselectedClassesFound;
        };

        /**
         * @ngdoc method
         * @name selectHeroes
         * @methodOf DungbossController
         * @description Select which heroes should be shown, based on the user's selections
         */
        $scope.selectHeroes = function () {
            $scope.selectedHeroes = _.chain($scope.heroes)
                .filter(function (hero) {
                    return HeroService.isHeroEnabled($scope.elements, $scope.classes, hero, $scope.selectionMode);
                })
                .sortBy(function (hero) {
                    return hero.name;
                })
                .value();
            toggleAll();
        };

        /**
         * @ngdoc method
         * @name selectAll
         * @methodOf DungbossController
         * @description Select all elements or classes
         */
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
                var i = UtilService.findIndex(items, item.name);
                items[i].enabled = $scope.selectedAll;
            });
            $scope.selectHeroes();
        }
    }]);
