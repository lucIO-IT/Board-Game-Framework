import {GameElement} from '../core/core.js';
import * as utils from '../core/utils/draggable_scroll.js';

class GameMap extends GameElement {
    constructor(){
        super();
        this.factions = [];
        this.regions = [];
        this.template_url = 'engine/core/templates/map.html';
    }

    __panelInfo__(info){
        const panel = document.querySelector('panel-info');
        panel.setAttribute('details', JSON.stringify(info));
        panel.style.display = 'block';
    }

    __loadRegionsfaction__(div){
        console.log('Start load factions list');
        const paths = div.querySelectorAll('path');
        paths.forEach(path => {
            Object.keys(this.factions).forEach((faction) => {
                if (this.factions[faction].provinces.includes(path.id)){
                    //path.classList.add(this.factions[faction].name);
                    path.setAttribute('style', 'fill: ' + this.factions[faction].color + ';');
                    path.addEventListener('click', event => {
                        this.__panelInfo__(this.regions[event.target.id].readItem());
                        let handler = event => {
                            event.preventDefault();
                            console.log(event.target.id)
                            return paths.forEach(e => e.removeEventListener('contextmenu', handler, false));
                        }
                        paths.forEach(e => e.addEventListener('contextmenu', handler, false));
                    })
                }
            });
        });
        console.log('End load factions list');
    }

    __registerCode__(div){
        utils.draggableScroll(div);
        this.__loadRegionsfaction__(div);
        this.shadow.appendChild(div);
    }
}

customElements.define('game-map', GameMap)

export {GameMap};