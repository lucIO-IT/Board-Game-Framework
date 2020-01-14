import {Map} from './engine/components.js';
import {wmap} from './templates/world_map.js';
import {factions} from './define/factions.js';
import {When} from './engine/core/utils/when.js';

// For loading create a static method and model class list
if (window.localStorage.length > 0){
    factions = window.localStorage.getItem('faction');
}

let gameMap = new Map({
    name: 'map',
    src: wmap,
    cls: 'map',
    width: '100%',
    height: '450px',
    factions: factions,
    selectable: true,
    regions: [],
    actions: [{
            cls: 'zoom-btn',
            pointer: 'click',
            action: () => event.target.parentNode.querySelector('svg').classList.toggle('zoom-object')
        }
    ]
});

function alertId(){
    alert(event.target.id);
    return true
}

var x = 0;
var y = 1;

gameMap.__render__('map');
gameMap.__loadRegionsfaction__();
new When({
    name: 'objectSelected',
    condition: x > 0
}).then( obj => {
    if (obj.name == 'map'){
        alert('si tratta di ' + obj.name)
    }    
});
document.querySelectorAll('.premi').forEach(e => e.addEventListener('click', ()=>{
    x = 1;
    gameMap.__getRegion__(alertId);
}));