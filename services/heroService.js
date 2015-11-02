var dungboss = angular.module('dungboss');

/**
 * @ngdoc service
 * @name HeroService
 * @description A hero-related service
 */
dungboss.factory('HeroService', ['ElementService', 'ClassService',
    function (ElementService, ClassService) {

        return {


            /**
             * @ngdoc method
             * @name isHeroEnabled
             * @methodOf HeroService
             * @param {array} elements the list of elements
             * @param {classes} classes the list of classes
             * @param {object} hero the hero object
             * @param {object} selectionMode selection object, with attribute mode: 'or' or 'and'
             * @returns {boolean} true of the hero's element and classes are enabled.
             * If the selectionMode is 'and' then all classes must be enabled. If it's 'or',
             * then at least one class must be enabled.
             * @description Check if a hero is enabled or not.
             */
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