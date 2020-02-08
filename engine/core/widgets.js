import {GameElement} from './core.js';

class PanelInfo extends GameElement {
    constructor(){
        super();
        this.template_url = 'engine/core/templates/panel_info.html';
        this.width;
        this.content;
        this.url;
    }

    __updateValue__(){        
        this.querySelector('.content ul').innerHTML = this.content;
        this.querySelector('#terrain-image').src = this.url;
    }

    __registerCode__(div){
        const f = () => {
            this.querySelector('.panel-info').style.width =  this.getAttribute('width') + 'px';
            this.querySelector('#terrain-image').src = this.getAttribute('url');
            this.querySelector('.content ul').innerHTML = this.getAttribute('content');
        }
        setTimeout(f, 500);      
    }

    static get observedAttributes() {
        return ['content', 'url'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        if (oldValue !== newValue){
            switch(name){
                case 'content':
                    this.content = newValue;
                    break
                case 'url':
                    this.url = newValue;
                    break            
            }
        }
        this.__updateValue__();
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
            let p = JSON.parse(this.getAttribute('details'));
            console.log(p);
            this.querySelector('#symbol').src =  p.symbol;
            this.querySelector('#faction-name').innerHTML = JSON.parse(this.getAttribute('details')).name;
        }
        setTimeout(f, 500);
    }

}
customElements.define('panel-faction', PanelFaction)

export {PanelInfo, PanelFaction};