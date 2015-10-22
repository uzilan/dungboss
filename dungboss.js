var dungboss = angular.module('dungboss', []);

dungboss.controller('DungbossController', ['$scope', 'HeroService',
    function ($scope, HeroService) {

        $scope.heroes = HeroService.heroes;

        var uniques = function (type) {
            return _.uniq(_.map(HeroService.heroes, function (hero) {
                return hero[type];
            }));
        };

        $scope.selectedHeroes = [];

        var isEnabled = function (hero) {
            var e = $scope.elements[hero.element];
            var c = $scope.classes[hero.class];
            return e && e.enabled &&
                c && c.enabled;
        };

        $scope.selectHeroes = function () {
            $scope.selectedHeroes = _.chain(HeroService.heroes)
                .filter(function (hero) {
                    return isEnabled(hero);
                })
                .value();
        };

        $scope.elements = uniques("element");
        $scope.classes = uniques("class");

    }]);


