import {Region} from './game_elements.js';

const regions = {
    'IT-23': new Region(
        'Aosta',
        'Aosta',
        2,
        10,
        ['IT-21'],
        5
    ),
    'IT-21': new Region(
        'Piemonte',
        'Torino',
        7,
        35,
        ['IT-23', 'IT-42', 'IT-25'],
        35
    ),
    'IT-42': new Region(
        'Liguria',
        'Genova',
        4,
        20,
        ['IT-21']
    ),
    'IT-25': new Region(
        'Lombardia',
        'Milano',
        10,
        50,
        ['IT-21', 'IT-32'],
        15,
        3
    ),
    'IT-32': new Region(
        'Sud Tirolo',
        'Trento',
        2,
        10,
        ['IT-25'],
        5
    )
    /*
    sassonia: new Region(
        'Sassonia',
        'Magdeburgo',
        4,
        60
    ),

    lorena: new Region(
        'Lorena',
        'Aquisgrana',
        5,
        90
    ),

    franconia: new Region(
        'Franconia',
        'Colonia',
        6,
        120
    ),

    bavaria: new Region(
        'Bavaria',
        'Ratisbona',
        5,
        90
    ),

    friuli: new Region(
        'Friuli',
        'Verona',
        7,
        150
    ),

    lombardy: new Region(
        'Lombardia',
        'Milano',
        9,
        210
    ),

    tuscia: new Region(
        'Tuscia',
        'Lucca',
        7,
        150
    ),

    romagna: new Region(
        'Romagna',
        'Ravenna',
        5,
        90
    ),
    VA: new Region(
        'Va',
        'Ravenna',
        5,
        90
    ),
     */
};

export {regions};