import {Region} from './core/models.js';

const regions = {
    'IT-23': new Region({
        name: 'Aosta',
        capital: 'Aosta',
        income: 2,
        population: 10,
        neighbours: ['IT-21'],
        army: 0,
        garrison: 50,
        troops: 50,
        defence: 1,
        structures: 1,
        image: 'sc/terrains/terrain.jpg'
    }),
    'IT-21': new Region({
        name: 'Piemonte',
        capital: 'Torino',
        income: 7,
        population: 35,
        neighbours: ['IT-23', 'IT-42', 'IT-25'],
        army: 0,
        garrison: 50,
        troops: 50,
        defence: 1,
        structures: 1,
        image: 'sc/terrains/terrain.jpg'
    }),
    'IT-42': new Region({
        name: 'Liguria',
        capital: 'Genova',
        income: 4,
        population: 20,
        neighbours: ['IT-21'],
        army: 0,
        garrison: 50,
        troops: 50,
        defence: 1,
        structures: 1,
        image: 'sc/terrains/terrain.jpg'
    }),
    'IT-25': new Region({
        name: 'Lombardia',
        capital: 'Milano',
        income: 10,
        population: 50,
        neighbours: ['IT-21', 'IT-32'],
        army: 0,
        garrison: 50,
        troops: 50,
        defence: 1,
        structures: 1,
        image: 'sc/terrains/terrain.jpg'
    }),
    'IT-32': new Region({
        name: 'Sud Tirolo',
        capital: 'Trento',
        income: 2,
        population: 10,
        neighbours: ['IT-25'],
        army: 0,
        garrison: 50,
        troops: 50,
        defence: 1,
        structures: 1,
        image: 'sc/terrains/terrain.jpg'
    })
};

export {regions};