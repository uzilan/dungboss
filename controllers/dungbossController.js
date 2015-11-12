/**
 * @ngdoc overview
 * @description The dungboss module contain all the implementations for the Dungeon Boss Filter application
 */
var dungboss = angular.module('dungboss', ['720kb.tooltips']);

/**
 * @ngdoc controller
 * name DungbossController
 * @description Main controller for the Dungeon Boss Filter application
 */
dungboss.controller('DungbossController', ['$scope', '$http', 'HeroService', 'ElementService', 'ClassService', 'UtilService',
    function ($scope, $http, HeroService, ElementService, ClassService, UtilService) {

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

        $scope.showAbility = function (hero, ability) {
            if (hero === $scope.currentHero && $scope.ability && ability === $scope.ability.name) {
                $scope.ability = null;
                return;
            }

            $scope.currentHero = hero;
            $scope.ability = _.find($scope.abilities, function (a) {
                return a.name == ability;
            });
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

        $scope.getAbilityImg = function (type, name) {
            return "img/" + type + "/active/" + name.replace(" ", "_") + ".png";
        };

        $http.get('/heroes').success(function (hs) {
            $scope.heroes = hs;

            $http.get('/elements').success(function (es) {
                $scope.elements = es;
                $scope.selectAllElements = true;
                $scope.selectAll('elements');
            });

            $http.get('/classes').success(function (cs) {
                $scope.classes = cs;
                $scope.selectAllClasses = true;
                $scope.selectAll('classes');
            });
        });

        $http.get('/abilities').success(function (as) {
            $scope.abilities = as;

            $http.get('/abilities/active').success(function (as) {
                $scope.actives = as;
            });

            $http.get('/abilities/passive').success(function (as) {
                $scope.passives = as;
            });
        });

        $scope.selectionMode = {
            mode: 'or'
        };
    }]);
