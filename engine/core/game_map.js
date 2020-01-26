import {GameElement} from './core.js';
import {draggableScroll} from './utils/draggable_scroll.js';

class GameMap extends GameElement {
    constructor(){
        super();
        this.template_url = 'engine/core/templates/map.html';
    }

    __loadRegionsfaction__(){
        this.querySelectorAll('path').forEach(path => {
            this.factions.forEach((faction) => {
                if (faction.holdings.includes(path.id)){
                    path.classList.add(faction.name);
                }
            });
        });
    }

    /*

    __getRegion__(f){
        const paths = document.querySelectorAll('path');
        let handler = () => {
            event.preventDefault();
            f();
            return paths.forEach(e => e.removeEventListener('contextmenu', handler, false));
        }
        paths.forEach(e => e.addEventListener('contextmenu', handler, false));
    }

    */

    __ajaxTemplateLoad__(f, div, url){
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
         } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                f(div, xhr.responseText);
            }
        };
        xhr.open('GET', url);
        xhr.send();
    }

    __load_template__(div, template){
        div.innerHTML = template;
    }

    __registerCode__(div){
        const self = this;
        self.__ajaxTemplateLoad__(self.__load_template__, div, self.template_url);
        draggableScroll(div);
        self.__loadRegionsfaction__();

    }
}

customElements.define('game-map', GameMap)

export {GameMap};