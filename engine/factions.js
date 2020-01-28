import {Faction} from './core/models.js';

const factions = {
    hre: new Faction({
        name: 'Regno di Germania',
        royal_family: {name: 'Otto', age: 24, sons: [{name: 'Otto', age: 4, sons: []}, {name: 'Heinrich', age: 2, sons: []}]},
        provinces: ['IT-23', 'IT-21', 'IT-42'],
        color: 'black',
        symbol: 'sc/ad.png',
        money: 0,
        rank: 1,
        human: false
    }),
    italy: new Faction({
        name: 'Regno di Italia',
        royal_family: {name: 'Berengar', age: 36, sons: []},
        provinces: ['IT-25', 'IT-32'],
        color: 'green',
        symbol: 'sc/ad.png',
        money: 0,
        rank: 1,
        human: false
    })
};

export {factions};
