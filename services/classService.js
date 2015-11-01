var dungboss = angular.module('dungboss');

dungboss.factory('ClassService', ['UtilService',
    function (UtilService) {

        return {

            // extract all hero unique classes
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

            // check if an class is enabled by the user
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