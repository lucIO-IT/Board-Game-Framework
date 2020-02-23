class DataModel {
    /* ****************************************************************
    Questa è la classe madre dei models utilizzata per interfacciarsi
    con il database (TinyDB o Web Storage) tramite JSON
    **************************************************************** */
    constructor(...restArgs) {
        this.name = this.__checkData__(restArgs);
        this.id = this.__checkID__(restArgs);
    }

    __checkData__(data_arg){
        const args = Array.from(data_arg)[0];
        if (!args.name){
            throw 'Attention: name is not defined';
        } else {
            return args.name;
        }
    }

    __check_arg__(arg){
        // Integer fields are 0 if not defined in constructor
        return (arg) ? arg : 0
    }

    __checkID__(data_arg){
        const args = Array.from(data_arg)[0];
        if (!args.id){
            return this.__createID__();
        } else {
            return args.id;
        }

    }

    __createID__(){
        //Return obj ID
        const name = this.name.replace(/[`~!@#$%^&*()_|+\-=?;:'", .<>\{\}\[\]\\\/]/gi, '');
        const token = Math.random().toString(36).substr(2);
        return `${name}_${token}`;
    }

    readItem(){
        return this;
    }

    updateItem(args){
        Object.keys(args).forEach(e => {
            this[e] = args[e];
        });
    }

    saveItem(){
        //Create and Overwrite JSON item in localStorage
        const data = JSON.stringify(this);
        const id = this.__getId__();
        localStorage.setItem(id, data);
    }

    loadItem(){
        //Load item as JSON from localStorage
        const id = this.__getId__();
        return localStorage.getItem(id);
    }

    deleteItem(){
        //Delete item from localStorage
        const id = this.__getId__();
        localStorage.removeItem(id);
    }

    static __loadDB__(){
        return localStorage;
    }

}

class GameElement extends HTMLElement {

    constructor(){
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.template_url = false;
        this.template = 'insert content';
        this.details = JSON.parse(this.getAttribute('details'));
        console.log(this.details);
    }

    __ajaxTemplateLoad__(f, div, shadow, url){
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
         } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                f(div, shadow, xhr.responseText);
            }
        };
        xhr.open('GET', url);
        xhr.send();
    }

    __load_template__(div, shadow, response){
        div.innerHTML = response;
        shadow.appendChild(div);
    }

    connectedCallback(){
        const div = document.createElement('div');
        div.style.width = `${this.getAttribute('width')}px`;
        div.style.height = `${this.getAttribute('height')}px`;
        div.style.overflow = 'hidden';
        if (this.template_url){
            this.__ajaxTemplateLoad__(this.__load_template__, div, this.shadow, this.template_url)
        } else {
            div.innerHTML = this.template;
            this.shadow.appendChild(div);
        }
        this.__connectTimeout__(div);
    }

    querySelector(x){
        const s = this.shadow;
        return s.querySelector(x)
    }

    __connectTimeout__(div){
        const f = () => {
            this.__registerCode__(div);
        }
        setTimeout(f, 500)
    }

    __getData__(){
        //insert code here
    }

    static get observedAttributes() {
        return ['details'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        if (oldValue !== newValue){
            switch(name){
                case 'details':
                    this.details = JSON.parse(newValue);
                    break
            }
        }
        this.__getData__();
    }

    __registerCode__(div){
        //custom code here
        console.log('no actions');
    }

    static renderElement(name, target, args){
        let el = document.createElement(name);
        Object.keys(args).forEach(key => {
            el.setAttribute(key, args[key]);
        });
        target.appendChild(el);
    }

}

export {DataModel, GameElement};