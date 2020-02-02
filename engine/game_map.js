import {GameElement} from './core/core.js';
import {draggableScroll} from './core/utils/draggable_scroll.js';
import {factions} from './factions.js';
import {regions} from './regions.js';

class GameMap extends GameElement {
    constructor(){
        super();
        this.factions = factions;
        this.template_url = 'engine/core/templates/map.html';
    }

    __panelInfo__(info){
        const panel = document.querySelector('panel-info');
        panel.setAttribute('content', info.content);
        panel.setAttribute('url', info.image);
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
                        this.__panelInfo__({
                            content: regions[event.target.id].get_panel_info(),
                            image: regions[event.target.id].get_terrain()
                        });
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
        const f = () => {
            draggableScroll(div);
            this.__loadRegionsfaction__(div);
            this.shadow.appendChild(div);
        }
        setTimeout(f, 500)
    }
}

customElements.define('game-map', GameMap)

export {GameMap};