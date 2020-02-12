import {GameElement} from './core/core.js';
import {settings} from './settings/settings.js';
import {GameMap} from './component/game_map.js';
import * as widgets from './component/widgets.js';
import {factions} from './factions.js';
import {regions} from './regions.js';

class GameEngine {
    constructor(app){
        this.app = app;
        this.factions = factions;
        this.regions = regions;
        this.actions = {};
        this.start = this.__create_game__();
    }

    __create_game__(){
        const map = document.createElement('game-map');
        Object.keys(settings.map).forEach(key => {
            map.setAttribute(key, settings.map[key])
        });
        map.factions = this.factions;
        map.regions = this.regions;
        document.getElementById(this.app).appendChild(map);
        GameElement.renderElement('panel-faction', map, settings.panel_faction);
        GameElement.renderElement('panel-info', map, settings.panel_info);
        console.log(document.querySelectorAll('path'));
        this.__add_engine_actions__();
    }

    __getAction__(name){
        return this.actions[name];
    }

    __getFaction__(name){
        return Object.keys(this.factions).filter(e => this.factions[e].provinces.includes(name) == true)[0];
    }

    __update_panel__(obj){
        document.getElementById(this.panel).setAttribute('details', obj.read());
    }

    __add_engine_actions__(){
        document.querySelectorAll('.engine-action').forEach(e => {
            const action = this.__getAction__(e.getAttribute('data-action'));
            const region = this.__getRegion__(e.getAttribute('data-value'))
            const faction = this.__getFaction__(e.getAttribute('data-value'))
            e.addEventListener('click', action(region, factions))
        });
    }

}

export {GameEngine}