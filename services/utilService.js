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