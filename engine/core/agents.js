import {GameElement} from './core.js';

const template = `
    <style>

        div {
            border-radius: 50%;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            overflow: visible;
            position: relative;
            padding: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        div:active::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255,255,255,0.4);
        }



        label {
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: transparent;
            cursor: pointer;
            z-index: 1;
        }

        #check:checked + label, .selected {
            box-shadow: 0 0 5px 5px goldenrod;
        }

    </style>
    <input id="check" type="checkbox" hidden/>
    <label for="check"></label>
    <script>
        document.querySelector('#check').onclick = alert('ciao');
    </script>
`;

class Agent extends GameElement {

    constructor(args){
        super()
        this.template = template;
    }

    __moveSelf__(element=this){
        element.addEventListener('click', () => {
            this.querySelector('div').classList.add('selected');
            const handler = () => {
                event.preventDefault();
                const y = event.clientY - this.getAttribute('height')/2;
                const x = event.clientX - this.getAttribute('width')/2;
                element.style.top = y + 'px';
                element.style.left = x + 'px';
                console.log(x)
                this.querySelector('div').classList.remove('selected');
                return element.parentNode.removeEventListener('contextmenu', handler, false)
            }
            element.parentNode.addEventListener('contextmenu', handler, false);
        });
    }

    __registerCode__(div){
        // 'this' is the component
        // 'div' is the template into the component
        this.style.position = 'absolute';
        this.style.zIndex = '1';
        this.style.transition = `all ${this.getAttribute("transition")}s`;
        div.style.background = `url("${this.getAttribute('src')}") no-repeat`;
        div.style.backgroundSize = 'contain, cover';
        this.__moveSelf__();
    }

}

customElements.define('game-agent', Agent)