import {Faction} from './game_elements.js';
import {regions} from './regions.js';
import {characters} from './characters.js';
import {map} from './map.js'

const factions = {
    hre: new Faction(
        'Regno di Germania',
        characters.otto,
        //[regions.sassonia, regions.bavaria, regions.franconia, regions.lorena],
        ['IT-23', 'IT-21', 'IT-42'],
        'catholic',
        'black'
    ),
    italy: new Faction(
        'Regno di Italia',
        characters.berengar,
        ['IT-25'],
        //[regions.lombardy, regions.tuscia, regions.friuli, regions.romagna],
        'catholic',
        'green'
    )
};

function createInterface(id, panel, human){
    let CURRENT_REGION = '';
    function deleteColors(arr) {
        return arr.forEach(e=>e.style.fill=null)
    }
    function createCSSClass(){
        let style_sheet = document.createElement('style');
        document.querySelector('head').appendChild(style_sheet);
        Object.keys(factions).forEach(e=>style_sheet.innerHTML += ('\n.' + e + ' { fill: ' + factions[e].color + '; } \n'));
    }
    function checkNeighbours(path, arr, regions, human){
        arr.forEach(e => {
            if (regions[path.id].neighbours.includes(e.id)){
                if (human.provinces.includes(e.id)){
                    e.style.fill = 'yellow';
                } else {
                    e.style.fill = 'red';
                }
            }
        });
    }
    function battleEvent(attacker, target) {
        let result = (attacker.troops + (Math.random()*10) - (target.troops * target.defence));
        if (result > 0){
            target.troops = Math.round(attacker.troops - (target.troops * (Math.random()*1)));
            attacker.troops = 0;
            return 'won'
        } else {
            attacker.troops = Math.round(attacker.troops - (target.troops * (Math.random()*1)));
            if (attacker.troops < 0){
                attacker.troops = 0;
            }
            target.troops = Math.round(target.troops - (attacker.troops * (Math.random()*1)));
            return 'losed'
        }
    }
    function mooveTroops(target){
        let t_reg = regions[target.id]; //Target Region
        let f_reg = regions[CURRENT_REGION]; //Current Region Selected
        if (target.style.fill == 'red'){
            PANEL.innerHTML = `
                Attack region ${t_reg.name} from ${f_reg.name}
                with ${f_reg.troops} troops
            `;
            target.style.opacity = '0.5';
            setTimeout(function(){
                let result = battleEvent(f_reg, t_reg);
                PANEL.innerHTML = `
                    Battle is ${result}
                `;
                if (result == 'won'){
                    let current_faction = Object.keys(factions).filter(e => factions[e].provinces.includes(target.id))[0];
                    let new_faction = Object.keys(factions).filter(e => factions[e].provinces.includes(CURRENT_REGION))[0];
                    target.classList.remove(current_faction);
                    factions[current_faction].provinces.filter(e => e !== target.id);
                    target.classList.add(new_faction);
                    factions[new_faction].provinces.push(target.id);
                    console.log(factions[current_faction].provinces);
                } else {
                    PANEL.innerHTML += `
                        \nTroops remained ${f_reg.troops}
                    `;
                }
                target.style.fill = null;
                target.style.opacity = null;
            }, 2000);
        } else {
            console.log(path.style.fill)
        }
    }
    document.getElementById(id).innerHTML = `
        <!--<div class="canvas-container">
            <canvas id="game_canvas" width="700" height="400" style="background: rgb(225,225,225); margin: auto;"></canvas>
        </div>-->
        <div style="width: 900px; height: 100%;">
            ${map}
        </div>      
        <div id="panel"></div>  
        <div class="bar">
            <span>Nome fazione: ${human.name}</span>
            <span>Nome sovrano: ${human.king.name}</span>
        </div>
    `;
    const mapPathRegions = document.querySelectorAll('path');
    const PANEL = document.getElementById(panel);
    createCSSClass();
    mapPathRegions.forEach(e => {
        e.classList.add('path');
        e.classList.remove('land');
    });
    mapPathRegions.forEach(path=>{
        Object.keys(factions)
            .filter(el => factions[el].provinces.includes(path.id) == true)
            .forEach(el => path.classList.add(el));
        path.addEventListener('click', () =>{
            deleteColors(mapPathRegions);
            CURRENT_REGION = path.id;
            let get_faction = Object.keys(factions).filter(e => factions[e].provinces.includes(path.id))[0];
            PANEL.innerHTML = `
                    Faction: ${factions[get_faction].name}
                    \nLeader: ${factions[get_faction].king.name}
                    \nRank: ?
                `;
            if (human.provinces.includes(path.id)){
                path.style.fill = 'blue';
                checkNeighbours(path, mapPathRegions, regions, human);
                PANEL.innerHTML += `
                    Province: ${regions[CURRENT_REGION].name}
                    \nCapital: ${regions[CURRENT_REGION].capital}
                    \nTroops: ${regions[CURRENT_REGION].troops}
                    \nDefence: ${regions[CURRENT_REGION].defence}
                `;
            } else {

            }
        });
        path.addEventListener('contextmenu', ev => {
            ev.preventDefault();
            if (regions[CURRENT_REGION].troops > 0){
                mooveTroops(path);
            } else {
                PANEL.innerHTML = 'There are no troops in this province';
            }
            return false;
        }, false);
    });
}
function selectFaction(faction, arr){
    arr.filter(e => e === faction).forEach(e=>{
        factions[e].human = true;
        let human = factions[e];
        createInterface('app', 'panel', human);
    });
    arr.forEach(f => console.log(`Fazione ${f} creata`));
}

console.log('Load complete list of factions: ' + Object.keys(factions));
console.log('Load complete list of regions: ' + Object.keys(regions));
document.getElementById('factions_list').innerHTML += `
    ${Object.keys(factions).map(function (el) {
        return `<li style="padding: 5px;"><a href="javascript:void(0)" class="faction_selector">${el}</a></li>` 
    }).join('')}
`;

const factionSelectors = document.querySelectorAll('.faction_selector');
factionSelectors.forEach(e => e.addEventListener('click', () => {
    selectFaction(e.innerHTML, Object.keys(factions));
}));

export {factions};
