//import {factions} from "./factions";

/* Utils */

function deleteColors(arr) {
    return arr.forEach(e=>e.classList.remove('current', 'target-local', 'target-enemy'))
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
                <style>
                    .current {fill: blue;}
                    .target-local {fill: yellow;}
                    .target-enemy {fill: red;}
                </style>
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
    deleteColors() {
        const mapPathRegions = document.querySelectorAll('path');
        return mapPathRegions.forEach(e=>e.classList.remove('current', 'target-local', 'target-enemy'))
    }
    addMapMethods(human, factions, regions, panel_id, events, utils){

        console.log('Caricamento funzionalità della mappa')
        const mapPathRegions = document.querySelectorAll('path');
        const panel = document.getElementById(panel_id);
        const addAction = utils.addAction;
        const endTurn = e => events.endTurn(mapPathRegions, human, panel);
        
        function addCSSClass(path) {
            path.classList.add('path');
            path.classList.remove('land');
            Object.keys(factions)
                .filter(el => factions[el].provinces.includes(path.id) == true)
                .forEach(el => path.classList.add(el));
        }
        function regionLeftClick(event){
            deleteColors(mapPathRegions);
            let path = event.target;
            let region = path.id;
            let region_faction = utils.getRegionFaction(region);
            console.log(region_faction);
            panel.innerHTML = factions[region_faction].get_panel_info();
            function regionRightClick(event){
                let path = event.target;   
                event.preventDefault();
                events.attackRegion(path, region, panel, events, human);
                return false;
            }
            if (human.provinces.includes(region)){
                path.classList.add('current');
                events.checkNeighbours(path, mapPathRegions, regions, human);
                panel.innerHTML += regions[region].render_panel_info();
                document.querySelectorAll('.region-action').forEach(e => e.addEventListener('click', () => {
                    events.regionUpdate(e, region, human, panel);
                }));
                addAction('path', regionRightClick, 'contextmenu');
            }
        }

        //Add Methods
        addAction('path', addCSSClass);
        addAction('path', regionLeftClick, 'click');        
        addAction('.end-turn', endTurn, 'click');
    }
}

class GameEngine {
    constructor(map, div, panel, factions, regions){
        this.map = new Map(map);
        this.div = div;
        this.panel = panel;
        this.factions = factions;
        this.regions = regions;        
        this.utils = {
            deleteColors: (arr) => {
                return arr.forEach(e=>e.style.fill=null)
            },
            getDialog: (text=undefined) => {
                document.querySelector('.loading-modal').classList.toggle('flex');
                if (text) {
                    document.querySelector('.loading-modal').innerHTML = text;
                }
            },
            getRegionFaction: (region) => {
                return Object.keys(factions).filter(e => factions[e].provinces.includes(region))[0];
            },
            addAction: (cls, action, pointer) => {
                const els = document.querySelectorAll(cls);
                if (pointer != null){
                    els.forEach(ev => ev.addEventListener(pointer, action), false);
                } else {
                    els.forEach(e => action(e));
                }    
            }
        };
        this.events = {
            endTurn: (arr, human, panel) => {
                Object.keys(factions).forEach(e => factions[e].faction_end_turn(regions));
                deleteColors(arr);
                getDialog('loading');
                panel.innerHTML = '<li>Loading</li>';
                setTimeout(() =>{
                    document.querySelector('.bar').querySelector('.info').innerHTML = human.update_info_bar();
                    getDialog();
                    panel.innerHTML = '<li>Turn Start</li>';
                }, 2000);
            },
            checkNeighbours: (path, arr, regions, human) => {
                arr.forEach(e => {
                    if (regions[path.id].neighbours.includes(e.id)){
                        if (human.provinces.includes(e.id)){
                            e.classList.add('target-local');
                        } else {
                            e.classList.add('target-enemy');
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
                const mapPathRegions = document.querySelectorAll('path');                
                if (target.classList.contains('target-enemy')){
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
                        deleteColors(mapPathRegions);
                        target.style.opacity = null;
                    }, 2000);
                }
                if (target.classList.contains('target-local')){
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
            },
            attackRegion: (path, current_region, panel, events, human) => {
                const mover = factions[this.utils.getRegionFaction(current_region)];
                console.log('Tst');
                console.log(mover.name);
                console.log(mover.check_mv_points());
                if (regions[current_region].troops > 0){                
                    if (mover.check_mv_points() === true ){
                        events.moveTroops(path, current_region, panel, events, human);
                        mover.consume_mv_points();
                    } else {
                        panel.innerHTML = 'No more movement points';
                    }
                } else {
                    panel.innerHTML = 'There are no troops in this province';
                }
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
    createInterface(map, div, panel, human, factions, regions, events=this.events, utils=this.utils){        
        map.initializeMap(human, div);
        map.createCSSClass(factions);
        map.addMapMethods(human, factions, regions, panel, events, utils);
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

