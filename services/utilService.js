var dungboss = angular.module('dungboss');

dungboss.factory('UtilService',
    function () {

        return {

            // extract an attribute from the heroes json file and find its unique values
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
            findIndex: function (items, value) {
                return _.findIndex(items, function (v) {
                    return value.indexOf(v.name) > -1;
                });
            }
        }
    });