//import {factions} from "./factions";

/* Utils */

function deleteColors(arr) {
    return arr.forEach(e=>e.style.fill=null)
}
function getDialog(text=undefined){
    document.querySelector('.loading-modal').classList.toggle('flex');
    if (text) {
        document.querySelector('.loading-modal').innerHTML = text;
    }
}

/* Classes */

class Map {
    constructor(map){
        this.map = map;
    }
    initializeMap(human, div, map=this.map) {
        return document.getElementById(div).innerHTML = `
                <div class="panel"></div>
                <div class="panel block-panel">
                    ${map}
                </div>
                <div class="panel">
                    <ul id="panel">
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
    createCSSClass(factions){
        let style_sheet = document.createElement('style');
        document.querySelector('head').appendChild(style_sheet);
        Object.keys(factions).forEach(e=>style_sheet.innerHTML += ('\n.' + e + ' { fill: ' + factions[e].color + '; } \n'));
    }
    addMapMethods(human, factions, regions, panel, events){

        console.log('Caricamento funzionalità della mappa')
        
        const mapPathRegions = document.querySelectorAll('path');
        const PANEL = document.getElementById(panel);
        let CURRENT_REGION = '';

        console.log(PANEL);

        //Add Methods

        mapPathRegions.forEach(path=>{
            path.classList.add('path');
            path.classList.remove('land');
            Object.keys(factions)
                .filter(el => factions[el].provinces.includes(path.id) == true)
                .forEach(el => path.classList.add(el));
            path.addEventListener('click', () =>{
                deleteColors(mapPathRegions);
                CURRENT_REGION = path.id;
                let get_faction = Object.keys(factions).filter(e => factions[e].provinces.includes(path.id))[0];
                console.log(get_faction);
                PANEL.innerHTML = factions[get_faction].get_panel_info();
                if (human.provinces.includes(path.id)){
                    path.style.fill = 'blue';
                    events.checkNeighbours(path, mapPathRegions, regions, human);
                    PANEL.innerHTML += regions[CURRENT_REGION].render_panel_info();
                    document.querySelectorAll('.region-action').forEach(e => e.addEventListener('click', () => {
                        events.regionUpdate(e, CURRENT_REGION, human, PANEL);
                    }));
                }
            });
            path.addEventListener('contextmenu', ev => {
                ev.preventDefault();
                if (regions[CURRENT_REGION].troops > 0){
                    if (human.check_mv_points() === true ){
                        events.moveTroops(path, CURRENT_REGION, PANEL, events, human);
                    } else {
                        PANEL.innerHTML = 'No more movement points';
                    }
                } else {
                    PANEL.innerHTML = 'There are no troops in this province';
                }
                return false;
            }, false);
        });
        document.querySelector('.end-turn').addEventListener('click', () =>{
            events.endTurn(mapPathRegions, human, PANEL);
        });
    }
}

class GameEngine {
    constructor(map, div, panel, factions, regions){
        this.map = new Map(map);
        this.div = div;
        this.panel = panel;
        this.factions = factions;
        this.regions = regions;
        this.events = {
            endTurn: (arr, human, PANEL) => {
                Object.keys(factions).forEach(e => factions[e].faction_end_turn(regions));
                deleteColors(arr);
                getDialog('loading');
                PANEL.innerHTML = '<li>Loading</li>';
                setTimeout(() =>{
                    document.querySelector('.bar').querySelector('.info').innerHTML = human.update_info_bar();
                    getDialog();
                    PANEL.innerHTML = '<li>Turn Start</li>';
                }, 2000);

            },
            checkNeighbours: (path, arr, regions, human) => {
                arr.forEach(e => {
                    if (regions[path.id].neighbours.includes(e.id)){
                        if (human.provinces.includes(e.id)){
                            e.style.fill = 'yellow';
                        } else {
                            e.style.fill = 'red';
                        }
                    }
                });
            },
            aliveFactions: (human, factions) => {
                function endGame(human) {
                    if (human.provinces.length == 0){
                        getDialog('Your Faction has been destroyed!\nTry again')
                    } else {
                        getDialog('Congratulations! You Win')
                    }
                }
                let ai_factions = Object.keys(factions).filter(e => factions[e].human == false).filter(el => factions[el].provinces.length > 0);
                console.log(`Ai factions remained are: ${ai_factions}`);
                if (ai_factions == 0 || human.provinces.length == 0) {
                    endGame(human);
                }
            },
            battle: (attacker, target) => {

                let att_looses = (attacker.troops - (target.troops * target.defence));
                let def_looses = ((target.troops * target.defence) - attacker.troops + (Math.random()*10));

                if (att_looses > def_looses){
                    target.troops = Math.round(att_looses);
                    if (target.troops < 0){
                        target.troops = 0;
                    }
                    attacker.troops = 0;
                    return 'won'
                } else {
                    attacker.troops = Math.round(att_looses);
                    if (attacker.troops < 0){
                        attacker.troops = 0;
                    }
                    target.troops = Math.round(def_looses);
                    if (target.troops < 0){
                        target.troops = 0;
                    }
                    return 'losed'
                }
            },
            conquest: (factions, regions, target, current) => {
                let current_faction = Object.keys(factions).filter(e => factions[e].provinces.includes(target.id))[0];
                let new_faction = Object.keys(factions).filter(e => factions[e].provinces.includes(current))[0];
                console.log(current);
                console.log(new_faction);
                target.classList.remove(current_faction);
                factions[current_faction].loseRegion(target.id);
                target.classList.add(new_faction);
                factions[new_faction].acquireRegion(target.id);
            },
            moveTroops: (target, current, panel, events, human) => {
                let t_reg = regions[target.id]; //Target Region
                let f_reg = regions[current]; //Current Region Selected
                if (target.style.fill == 'red'){
                    panel.innerHTML = `
                        Attack region ${t_reg.name} from ${f_reg.name}
                        with ${f_reg.troops} troops
                    `;
                    target.style.opacity = '0.5';
                    setTimeout(function(){
                        let result = events.battle(f_reg, t_reg);
                        panel.innerHTML = `
                                Battle is ${result}
                            `;
                        if (result == 'won'){
                            events.conquest(factions, regions, target, current);
                            events.aliveFactions(human, factions);
                        } else {
                            panel.innerHTML += `
                                \nTroops remained ${f_reg.troops}
                            `;
                        }
                        target.style.fill = null;
                        target.style.opacity = null;
                    }, 2000);
                }
                if (target.style.fill == 'yellow'){
                    panel.innerHTML = `
                        Move ${f_reg.troops} troops from from ${f_reg.name}
                        to ${t_reg.name}
                    `;
                    target.style.opacity = '0.5';
                    setTimeout(function() {
                        regions[target.id].troops += regions[current].troops;
                        regions[current].troops = 0;
                        target.style.opacity = null;
                    }, 2000);
                }
                human.consume_mv_points();
            },
            regionUpdate: (elem, current, human, panel)=> {
                if (elem.innerHTML == 'Raise Troops') {
                    panel.innerHTML = regions[current].raise_troops(human);
                    document.querySelector('.bar').querySelector('.info').innerHTML = human.update_info_bar();
                } else {
                    panel.innerHTML = regions[current].incrase_defence(human);
                    document.querySelector('.bar').querySelector('.info').innerHTML = human.update_info_bar();
                }
            }
        };
    }
    createInterface(map, div, panel, human, factions, regions, events=this.events){        
        map.initializeMap(human, div);
        map.createCSSClass(factions);
        map.addMapMethods(human, factions, regions, panel, events);
    }
    selectFaction(faction){
        Object.keys(this.factions).filter(e => e === faction).forEach(e=>{
            this.factions[e].human = true;
            this.human = this.factions[e];
            this.createInterface(this.map, this.div, this.panel, this.human, this.factions, this.regions);
        });
        Object.keys(this.factions).forEach(f => console.log(`Fazione ${f} creata`));
    }
}

export {GameEngine}

