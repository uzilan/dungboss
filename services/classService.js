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