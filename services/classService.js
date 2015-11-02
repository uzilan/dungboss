var dungboss = angular.module('dungboss');

/**
 * @ngdoc service
 * @name ClassService
 * @description A class-related service
 */
dungboss.factory('ClassService', ['UtilService',
    function (UtilService) {

        return {

            /**
             * @ngdoc method
             * @name extractClasses
             * @methodOf ClassService
             * @param {json} heroes
             * @returns {array} extracted list of classes
             * @description Extract all classes from the heroes json
             */
            extractClasses: function (heroes) {
                return _.chain(heroes)
                    .reduce(function (result, h) {
                        return result.concat(_.words(h.class));
                    }, [])
                    .uniq()
                    .sort()
                    .map(function (clazz) {
                        return {name: clazz, enabled: false}
                    })
                    .value();
            },

            /**
             * @ngdoc method
             * @name isClassEnabled
             * @methodOf ClassService
             * @param {array} classes the list of classes
             * @param {string} c the class to check
             * @returns {boolean} true if the class is enabled, otherwise false
             * @description Check if an class is enabled by the user
             */
            isClassEnabled: function (classes, c) {
                var classIndex = UtilService.findIndex(classes, c);
                if (classIndex > -1) {
                    var clazz = classes[classIndex];
                    if (clazz.enabled) {
                        return true;
                    }
                }
                return false;
            }

        }
    }]);