var express = require('express');
var fs = require('fs');
var _ = require('lodash');

var app = express();

var init = function () {

    // read all hero information from the json file and extract elements, classes and other information from it
    var collectHeroes = function (jsonFile) {
        heroes = heroes.concat(JSON.parse(fs.readFileSync(jsonFile, 'utf8')));
    };

    var uniques = function (hers, type) {
        return _.chain(hers)
            .map(type)
            .uniq()
            .sort()
            .map(function (name) {
                return {name: name, enabled: false};
            })
            .value();
    };

    var extractClasses = function (heroes) {
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
    };

    collectHeroes("heroes/dark.json");
    collectHeroes("heroes/fire.json");
    collectHeroes("heroes/light.json");
    collectHeroes("heroes/nature.json");
    collectHeroes("heroes/water.json");

    elements = uniques(heroes, "element");
    classes = extractClasses(heroes);
};

var heroes = [];
var elements = [];
var classes = [];

init();

app.get('/heroes', function (req, res) {
    res.json(heroes);
});

app.get('/elements', function (req, res) {
    res.json(elements);
});

app.get('/classes', function (req, res) {
    res.json(classes);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get(/^(.+)$/, function (req, res) {
    res.sendFile(__dirname + req.params[0]);
});

var PORT = process.env.PORT || 3000;

app.listen(PORT);

