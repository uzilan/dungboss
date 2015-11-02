var dungboss = angular.module('dungboss');

/**
 * @ngdoc service
 * @name ElementService
 * @description An element-related service
 */
dungboss.factory('ElementService', ['UtilService',
    function (UtilService) {

        return {

            /**
             * @ngdoc method
             * @name isElementEnabled
             * @methodOf ElementService
             * @param {array} elements the list of elements
             * @param {string} e the element to check
             * @returns {boolean} true if the elements is enabled, otherwise false
             * @description Check if an elements is enabled by the user
             */
            isElementEnabled: function (elements, e) {
                var elementIndex = UtilService.findIndex(elements, e);
                if (elementIndex === -1) {
                    return false;
                }
                var element = elements[elementIndex];
                return element.enabled;
            }
        }
    }]);