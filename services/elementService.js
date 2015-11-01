var dungboss = angular.module('dungboss');

dungboss.factory('ElementService', ['UtilService',
    function (UtilService) {

        return {

            // check if an element is enabled by the user
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