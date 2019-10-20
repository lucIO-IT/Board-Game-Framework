import {Faction} from './game_elements.js';
import {regions} from './regions.js';
import {characters} from './characters.js';

const factions = {
    hre: new Faction(
        'Regno di Germania',
        characters.otto,
        //[regions.sassonia, regions.bavaria, regions.franconia, regions.lorena],
        ['IT-23', 'IT-21', 'IT-42'],
        'black'
    ),
    italy: new Faction(
        'Regno di Italia',
        characters.berengar,
        ['IT-25', 'IT-32'],
        //[regions.lombardy, regions.tuscia, regions.friuli, regions.romagna],
        'green'
    )
};

export {factions};
