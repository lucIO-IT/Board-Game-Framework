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
        document.querySelector('#raise_troops').setAttribute('target', this.details.id);
        document.querySelector('#incrase_defence').setAttribute('target', this.details.id);
    }

    __registerCode__(div){
        this.querySelector('.panel-info').style.width =  this.getAttribute('width') + 'px';
        this.querySelector('#army_recruit_btn').addEventListener('click', () => this.call_army_panel(this.details))
        this.__getData__();
    }

    call_army_panel(region) {
            const div = document.createElement('div');
            div.style = 'position: fixed; top: 20%; left: 30%; width: 40%; background: white; z-index: 1; padding: 20px;'
            div.innerHTML = `
                <a href="javascript:void()" class="f", onclick="document.body.removeChild(this.parentNode);">close</a>
                <form class="form fl100 engine-form" target="${region.id}" action="raise_army">
                    <span class="fl100 title">Create Army in ${region.name}</span>
                    <hr/>
                    <label for="cavalry" class="fl50">Cavalry</label>
                    <input id="cavalry" type="number" value="0" class="fl50"/>
                    <label for="spearmen" class="fl50">Spearmen</label>
                    <input id="spearmen" type="number" value="0" class="fl50"/>
                    <label for="archers" class="fl50">Archers</label>
                    <input id="archers" type="number" value="0" class="fl50"/>
                    <button>Send</button>
                </form>
            `;
            document.body.appendChild(div);
        }


}
customElements.define('panel-info', PanelInfo);

class PanelFaction extends GameElement {
    constructor(){
        super();
        this.template_url = 'engine/core/templates/panel_faction.html';
    }

    __getData__(){
        this.querySelector('#symbol').src =  this.details.symbol;
        this.querySelector('#faction-name').innerHTML = this.details.name;
        this.querySelector('#faction-treasury').innerHTML = this.details.money;
    }

    __registerCode__(div){
        this.__getData__();
    }

}
customElements.define('panel-faction', PanelFaction);

export {PanelInfo, PanelFaction};