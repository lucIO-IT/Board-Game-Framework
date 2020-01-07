import {DataModel} from './core.js';

class GameObject extends DataModel {

    constructor(args){
        super(args);
        this.name = args.name;
        this.src = args.src;
        this.css_class = args.cls;
        this.width = args.width;
        this.height = args.height;
        this.actions = args.actions;
        this.selectable = args.selectable;
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

    __name__(){
        return this.name;
    }

    __addCustomEvents__(){
        const elems = Array.from(document.getElementsByClassName(this.css_class));
        const addEvent = name => {
            const nuEvent = new CustomEvent(name, {
                bubbles: true,
                cancelable: true,
                detail: {
                    obj: this
                }
            });
            document.body.dispatchEvent(nuEvent);
        };
        elems.forEach(e => e.addEventListener('click', () => {
            const event_name = `objectSelected`;
            addEvent(event_name);
        }, false));
        elems.forEach(e => e.addEventListener('contextmenu', () => {
            event.preventDefault();
            const event_name = `objectIsTarget`;
            addEvent(event_name);
        }, false));
    }

    __render__(target_id){
        const gO = document.createElement('DIV');
        gO.id = this.__getId__();
        gO.style = `width:${this.width}; height:${this.height};`;
        gO.classList.add(this.css_class);
        gO.innerHTML = `${this.src}`;
        document.getElementById(target_id).appendChild(gO);
        this.registerActions(this.actions);
        if (this.selectable){
            this.__addCustomEvents__();
        }
    }

}

export {GameObject};