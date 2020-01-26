class GameObject {

    constructor(args){
        this.name = args.name;
        this.template = args.template;
        this.width = args.width;
        this.height = args.height;
        this.actions = args.actions;
        this.__render__(args.target_id);
    }
    
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

    __registerActions__(args){
        args.forEach(arg => {
            let els = Array.from(document.getElementsByClassName(arg.cls));
            if (arg.pointer){
                els.forEach(ev => ev.addEventListener(arg.pointer, arg.action), false);
            } else {
                els.forEach(e => arg.action(e));
            }
        });
    }

    __render__(target_id){
        const go = document.createElement('DIV');
        go.id = this.__getId__();
        go.style = `width:${this.width}; height:${this.height};`;
        go.classList.add(this.css_class);
        go.innerHTML = this.__ajaxTemplateLoad__(this.__load_template__, go, this.template);
        document.getElementById(target_id).appendChild(go);
        this.registerActions(this.actions);
    }

}

export {GameObject};