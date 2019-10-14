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

function createInterface(div, panel, human){
    let CURRENT_REGION = '';
    function initializeMap() {
        return document.getElementById(div).innerHTML = `
            <!--<div class="canvas-container">
                <canvas id="game_canvas" width="700" height="400" style="background: rgb(225,225,225); margin: auto;"></canvas>
            </div>-->
            <div style="width: 900px; height: 100%;">
                ${map}
            </div>      
            <div id="panel">
                <ul>
                    <li>Turn Start</li>
                </ul>
            </div>  
            <div class="bar">
                <div class="info">
                    <span>Faction name: ${human.name}</span>
                    <span>Leader: ${human.king.name}</span>
                    <span>Treasury: ${human.money}</span>
                </div>                
                <div>
                    <button class="end-turn">End Turn</button>
                </div>
            </div>
        `;
    }
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
            target.troops = Math.round(attacker.troops - target.troops);
            if (target.troops < 0){
                target.troops = 0;
            }
            attacker.troops = 0;
            return 'won'
        } else {
            attacker.troops = Math.round(attacker.troops - target.troops);
            if (attacker.troops < 0){
                attacker.troops = 0;
            }
            target.troops = Math.round(attacker.troops - target.troops);
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
                    factions[current_faction].provinces = factions[current_faction].provinces.filter(e => e !== target.id);
                    target.classList.add(new_faction);
                    factions[new_faction].provinces.push(target.id);
                    console.log(current_faction);
                    console.log(factions[current_faction].provinces);
                } else {
                    PANEL.innerHTML += `
                        \nTroops remained ${f_reg.troops}
                    `;
                }
                target.style.fill = null;
                target.style.opacity = null;
            }, 2000);
        }
        if (target.style.fill == 'yellow'){
            PANEL.innerHTML = `
                Move ${f_reg.troops} troops from from ${f_reg.name}
                to ${t_reg.name} 
            `;
            target.style.opacity = '0.5';
            setTimeout(function() {
                regions[target.id].troops = regions[CURRENT_REGION].troops;
                regions[CURRENT_REGION].troops = 0;
                target.style.opacity = null;
            }, 2000);
        }
    }
    function endTurnEvent(arr) {
        Object.keys(factions).forEach(e => factions[e].get_income(regions));
        deleteColors(arr);
        document.querySelector('.loading-modal').style.display = 'flex';
        PANEL.innerHTML = '<li>Loading</li>';
        setTimeout(() =>{
            document.querySelector('.bar').querySelector('.info').innerHTML = human.update_info_bar();
            PANEL.innerHTML = '<li>Turn Start</li>';
            document.querySelector('.loading-modal').style.display = null;
        }, 2000);

    }
    initializeMap();
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
            PANEL.innerHTML = factions[get_faction].get_panel_info();
            if (human.provinces.includes(path.id)){
                path.style.fill = 'blue';
                checkNeighbours(path, mapPathRegions, regions, human);
                PANEL.innerHTML += regions[CURRENT_REGION].render_panel_info();
                document.querySelectorAll('.region-action').forEach(e => e.addEventListener('click', () => {
                    console.log(e);
                    if (e.innerHTML == 'Raise Troops') {
                        PANEL.innerHTML = regions[CURRENT_REGION].raise_troops(human);
                        document.querySelector('.bar').querySelector('.info').innerHTML = human.update_info_bar();
                    } else {
                        PANEL.innerHTML = regions[CURRENT_REGION].incrase_defence(human);
                        document.querySelector('.bar').querySelector('.info').innerHTML = human.update_info_bar();
                    }
                }));
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
    document.querySelector('.end-turn').addEventListener('click', () =>{
        endTurnEvent(mapPathRegions);
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
