import {GameElement} from './core/core.js';
import {Faction, Region} from './core/models.js';
import {settings} from './settings/settings.js';
import {controllers} from './controllers.js';
import {GameMap} from './component/game_map.js';
import * as widgets from './component/widgets.js';

class GameEngine {
    constructor(app){
        this.app = app;
        this.settings = settings;
        this.panel = this.settings.panel_info.id;
        this.bar= this.settings.panel_faction.id;
        this.factions = this.__loadData__('factions');
        this.regions = this.__loadData__('regions');
        this.actions = controllers;
        this.start = this.__starterGame__();
    }

    __loadData__(name){
        let obj = new Object();
        const args = this.settings[name];
        Object.keys(args).forEach(key => {
            switch(name){
              case 'regions':
                obj[key] = new Region(args[key]);
                break
              case 'factions':
                obj[key] = new Faction(args[key]);
                break
            }
        });
        return obj;
    }

    __starterGame__(){
        var btn = document.createElement('button');
        btn.style = 'width: 200px; position: fixed; top: 45%; left: 45%;'
        btn.innerHTML = 'Start Game';
        document.body.appendChild(btn);
        btn.addEventListener('click', () => {
            this.__create_game__();
            btn.style.display = 'none';
        });
    }

    __create_game__(){
        console.log(this.factions);
        console.log(this.regions);
        const map = document.createElement('game-map');
        Object.keys(settings.map).forEach(key => {
            map.setAttribute(key, settings.map[key])
        });
        map.factions = this.factions;
        map.regions = this.regions;
        document.getElementById(this.app).appendChild(map);
        GameElement.renderElement('panel-faction', map, settings.panel_faction);
        GameElement.renderElement('panel-info', map, settings.panel_info);
        this.__engineButton__('raise_troops', 'engine-action helm shadow circle', this.panel);
        this.__engineButton__('incrase_defence', 'engine-action castle shadow circle', this.panel);
        setTimeout(() => this.__add_engine_actions__(), 1000);
        const soundtrack = new Audio("sc/sounds/soundtrack.mp3");
        soundtrack.volume = this.settings.audio.volume;
        soundtrack.loop = true;
        soundtrack.play();
    }

    __engineButton__(name, cls, target){
        const btn = document.createElement('button');
        btn.id = name;
        btn.slot = name;
        btn.setAttribute('action', name);
        btn.setAttribute('class', cls);
        console.log(btn);
        document.getElementById(target).appendChild(btn);
    }

    __getAction__(name){
        return this.actions[name];
    }

    __getRegion__(name){
        return this.regions[name];
    }

    __getFaction__(name){
        return this.factions[Object.keys(this.factions).filter(e => this.factions[e].provinces.includes(name) == true)[0]];
    }

    __update_panel__(obj){
        document.getElementById(this.panel).setAttribute('details', JSON.stringify(obj.readItem()));
    }

    __update_bar__(obj){
        document.getElementById(this.bar).setAttribute('details', JSON.stringify(obj.readItem()));
    }

    __audioButton__(f) {
        const action_build = new Audio("sc/sounds/action_build.mp3");
        const action_failed = new Audio("sc/sounds/action_failed.mp3");
        if (f == true){
            action_build.volume = this.settings.audio.volume;
            action_build.play()
        } else {
            action_failed.volume = this.settings.audio.volume;
            action_failed.play()
        }
    }

    __add_engine_actions__(){
        document.querySelectorAll('.engine-action').forEach(e => {
            e.addEventListener('click', () => {
                var action = this.__getAction__(e.getAttribute('action'));
                var region = this.__getRegion__(e.getAttribute('target'));
                var faction = this.__getFaction__(e.getAttribute('target'));
                var f = action(region, faction);
                this.__audioButton__(f);
                this.__update_panel__(region);
                this.__update_bar__(faction);
            });
        });
    }

}

export {GameEngine}