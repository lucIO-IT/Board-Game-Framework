class GameObject extends HTMLElement {

    constructor(args){
        super()
        this.shadow = this.attachShadow({mode: 'open'});          
    }

    ajaxTemplateLoad(f, div, val, url){
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
         } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }        
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {   
                f(div, xhr.responseText, val);
            }   
        };      
        xhr.open('GET', url);
        xhr.send();  
    }

    load_template(div, template, shadow){        
        div.innerHTML = template;
        shadow.appendChild(div);
    }

    moveSelf(element){
        element.addEventListener('click', () => {
            const obj = element;
            console.log('check');
            obj.parentNode.addEventListener('contextmenu', () => {
                event.preventDefault();
                obj.style.top =event.clientY + 'px';
                obj.style.left = event.clientX + 'px';
                return false
            });           
        });
    }

    connectedCallback(){
        const div = document.createElement('div');
        this.style.position = 'absolute';
        this.style.top = '0';
        this.style.left = '0';
        div.style.width = `${this.getAttribute('width')}px`;
        div.style.height = `${this.getAttribute('height')}px`;
        this.style.margin = '15px';
        div.style.background = `url("${this.getAttribute('src')}") no-repeat`;        
        div.style.backgroundSize = 'contain, cover';
        this.ajaxTemplateLoad(this.load_template, div, this.shadow, 'engine/core/templates/game_object.html');
        this.moveSelf(this);
    }

    registerActions(args){
        args.forEach(arg => {
            let els = Array.from(document.getElementsByClassName(arg.cls));
            if (arg.pointer){
                els.forEach(ev => ev.addEventListener(arg.pointer, arg.action), false);
            } else {
                els.forEach(e => arg.action(e));
            }
        });
    }

    static __render__(name, target, args){        
        let el = document.createElement(name);
        Object.keys(args).forEach(key => {
            el.setAttribute(key) = args[key];
        });
        target.appendChild(el);
    }

}

customElements.define('game-object', GameObject)

export {GameObject};