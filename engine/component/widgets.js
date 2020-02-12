import {GameElement} from '../core/core.js';

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
        this.querySelector('.panel-info').style.width =  this.getAttribute('width') + 'px';
        this.__getData__();
    }
}
customElements.define('panel-info', PanelInfo)
class PanelFaction extends GameElement {
    constructor(){
        super();
        this.template_url = 'engine/core/templates/panel_faction.html';
    }

    __getData__(){
        this.querySelector('#symbol').src =  this.details.symbol;
        this.querySelector('#faction-name').innerHTML = this.details.name;
    }

    __registerCode__(div){
        this.__getData__();
    }

}
customElements.define('panel-faction', PanelFaction)

export {PanelInfo, PanelFaction};