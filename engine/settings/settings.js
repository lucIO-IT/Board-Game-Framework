const settings = {
    audio: {
        volume: "0.35"
    },
    map: {
      width: "1150",
      //height: "600"
    },
    panel_faction: {
        id: 'panel-faction',
        width: "1150",
        //height: "150",
        slot: "panel-faction",
        details: '{"name":"Kingdom of Sicily","symbol":"sc/symbols/sicily.png", "money": 1000}'
    },
    panel_info: {
        id: 'panel_info',
        width: "250",
        slot: "panel-info",
        details: '{"this": "this"}',
        url: "",
        style: "display: none; "
    },
    factions: {
        hre: {
            name: 'Regno di Germania',
            royal_family: {name: 'Otto', age: 24, sons: [{name: 'Otto', age: 4, sons: []}, {name: 'Heinrich', age: 2, sons: []}]},
            provinces: ['IT-23', 'IT-21', 'IT-42'],
            color: 'black',
            symbol: 'sc/symbols/sicily.png',
            money: 1000,
            rank: 1,
            human: false
        },
        italy: {
            name: 'Regno di Sicilia',
            royal_family: {name: 'Berengar', age: 36, sons: []},
            provinces: ['IT-25', 'IT-32'],
            color: 'green',
            symbol: 'sc/symbols/sicily.png',
            money: 1000,
            rank: 1,
            human: false
        }
    },
    regions: {
        'IT-23': {
            id: 'IT-23',
            name: 'Aosta',
            capital: 'Aosta',
            income: 2,
            population: 10,
            neighbours: ['IT-21'],
            army: null,
            garrison: 50,
            troops: 50,
            defence: 1,
            structures: 1,
            image: 'sc/terrains/terrain.jpg'
        },
        'IT-21': {
            id: 'IT-21',
            name: 'Piemonte',
            capital: 'Torino',
            income: 7,
            population: 35,
            neighbours: ['IT-23', 'IT-42', 'IT-25'],
            army: null,
            garrison: 50,
            troops: 50,
            defence: 1,
            structures: 1,
            image: 'sc/terrains/terrain.jpg'
        },
        'IT-42': {
            id: 'IT-42',
            name: 'Liguria',
            capital: 'Genova',
            income: 4,
            population: 20,
            neighbours: ['IT-21'],
            army: null,
            garrison: 50,
            troops: 50,
            defence: 1,
            structures: 1,
            image: 'sc/terrains/terrain.jpg'
        },
        'IT-25': {
            id: 'IT-25',
            name: 'Lombardia',
            capital: 'Milano',
            income: 10,
            population: 50,
            neighbours: ['IT-21', 'IT-32'],
            army: null,
            garrison: 50,
            troops: 50,
            defence: 1,
            structures: 1,
            image: 'sc/terrains/terrain.jpg'
        },
        'IT-32': {
            id: 'IT-32',
            name: 'Sud Tirolo',
            capital: 'Trento',
            income: 2,
            population: 10,
            neighbours: ['IT-25'],
            army: null,
            garrison: 50,
            troops: 50,
            defence: 1,
            structures: 1,
            image: 'sc/terrains/terrain.jpg'
        }
    }
}

export {settings};