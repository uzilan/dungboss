var dungboss = angular.module('dungboss');

dungboss.factory('HeroService', function () {

    return {
        heroes: [
            {
                "name": "Abigail the Brutal",
                "element": "Fire",
                "class": "Warrior"
            },
            {
                "name": "Ignus the Mad",
                "element": "Fire",
                "class": "Caster"
            },
            {
                "name": "Lady Nimriel",
                "element": "Fire",
                "class": "Elf Rogue"
            },
            {
                "name": "Lupina",
                "element": "Fire",
                "class": "Beast Warrior"
            },
            {
                "name": "Mangle Jaw",
                "element": "Fire",
                "class": "Beast Warrior"
            },
            {
                "name": "Nitpick",
                "element": "Fire",
                "class": "Magical Demon Caster"
            },
            {
                "name": "Rogar Stonecrusher",
                "element": "Fire",
                "class": "Armored Dwarf Warrior"
            },
            {
                "name": "Squinch",
                "element": "Fire",
                "class": "Goblin Warrior"
            },
            {
                "name": "Torchy",
                "element": "Fire",
                "class": "Fast Flying Beast"
            }
        ]
    }
});