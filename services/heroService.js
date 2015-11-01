var dungboss = angular.module('dungboss');

dungboss.factory('HeroService', ['ElementService', 'ClassService',
    function (ElementService, ClassService) {

        return {


            // check if a hero should be shown, based on the user's selections
            isHeroEnabled: function (elements, classes, hero, selectionMode) {

                if (!ElementService.isElementEnabled(elements, hero.element)) {
                    return false;
                }

                var result = selectionMode.mode === 'and';

                _.each(_.words(hero.class), function (c) {
                    if (selectionMode.mode === 'or') {
                        result |= ClassService.isClassEnabled(classes, c);
                    } else {
                        result &= ClassService.isClassEnabled(classes, c);
                    }
                });

                return result;
            }
        }
    }]);