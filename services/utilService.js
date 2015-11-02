var dungboss = angular.module('dungboss');

/**
 * @ngdoc service
 * @name UtilService
 * @description Utility service
 */
dungboss.factory('UtilService',
    function () {

        return {

            /**
             * @ngdoc method
             * @name uniques
             * @methodOf UtilService
             * @param {array} heroes the list of heroes to choose from
             * @param {string} type the type of values to choose
             * @returns {string} a list of unique values
             * @description Find unique values of given type from a list of heroes
             */
            uniques: function (heroes, type) {
                return _.chain(heroes)
                    .map(type)
                    .uniq()
                    .sort()
                    .map(function (name) {
                        return {name: name, enabled: false};
                    })
                    .value();
            },

            // find the index of an item in a list of items
            /**
             * @ngdoc method
             * @name findIndex
             * @methodOf UtilService
             * @param {array} items the list of items to look in
             * @param {string} value the value to look for
             * @returns {number} the index of the value
             * @description Find the index of a value in a list
             */
            findIndex: function (items, value) {
                return _.findIndex(items, function (v) {
                    return value.indexOf(v.name) > -1;
                });
            }
        }
    });