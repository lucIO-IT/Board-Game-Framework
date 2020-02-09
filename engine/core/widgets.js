import {GameElement} from './core.js';

class PanelInfo extends GameElement {
    constructor(){
        super();
        this.template_url = 'engine/core/templates/panel_info.html';
        this.width;
        this.url;
    }

    __getData__(){
        this.querySelector('#name').innerHTML = `${this.details.name} - ${this.details.capital}`;
        this.querySelector('#terrain').src = `${this.details.terrain_image_url}`;
        this.querySelector('#population').innerHTML = `${this.details.population}`;
        this.querySelector('#defence').innerHTML = `${this.details.defence}`;
        this.querySelector('#garrison').innerHTML = `${this.details.troops}`;
        this.querySelector('#income').innerHTML = `${this.details.income}`;
    }

    __registerCode__(div){
        const f = () => {
            this.querySelector('.panel-info').style.width =  this.getAttribute('width') + 'px';
            this.__getData__();
        }
        setTimeout(f, 500);      
    }

    static get observedAttributes() {
        return ['details', 'url'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        if (oldValue !== newValue){
            switch(name){
                case 'details':
                    this.details = JSON.parse(newValue);
                    break
                case 'url':
                    this.url = newValue;
                    break            
            }
        }
        this.__getData__();
    }
}
customElements.define('panel-info', PanelInfo)
class PanelFaction extends GameElement {
    constructor(){
        super();
        this.template_url = 'engine/core/templates/panel_faction.html';
    }
    __registerCode__(div){
        const f = () => {
            this.querySelector('#symbol').src =  this.details.symbol;
            this.querySelector('#faction-name').innerHTML = this.details.name;
        }
        setTimeout(f, 500);
    }

}
customElements.define('panel-faction', PanelFaction)

export {PanelInfo, PanelFaction};