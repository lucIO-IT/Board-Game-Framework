import {regions} from './utils/regions.js';
import {characters} from './utils/characters.js';
import {map} from './utils/map.js'
import {factions} from "./utils/factions.js";
import {GameEngine} from "./utils/game_engine.js";

function main(){
    document.getElementById('factions_list').innerHTML += `
    ${Object.keys(factions).map(function (el) {
        return `<li style="padding: 5px;"><a href="javascript:void(0)" class="faction_selector">${el}</a></li>`
    }).join('')}
    `;

    let engine = new GameEngine(map,'app', 'panel', factions, regions);
    const factionSelectors = document.querySelectorAll('.faction_selector');
    factionSelectors.forEach(e => e.addEventListener('click', () => {
        engine.selectFaction(e.innerHTML);
    }));
}

window.onload = () => {
    console.log('Load complete list of factions: ' + Object.keys(factions));
    console.log('Load complete list of regions: ' + Object.keys(regions));
    main();
};

window.onbeforeunload = () => {
    alert('Are you sure to leave the page?')
};

