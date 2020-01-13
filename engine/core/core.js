const handler = {
    get: (target, name) => {
        if (name in target){
            return target[name];
        }
    },
    set: (target, prop, value) => {
        if (prop in target) {
            target[prop] = value;
            const nuEvent = new CustomEvent('objectUpdated', {
                bubbles: true,
                cancelable: true,
                detail: {
                    obj: target
                }
            });
            document.body.dispatchEvent(nuEvent);            
            return true;
        } else {
            console.log(target);
            console.log(prop);
            console.log(value);
        }
    }
}

class DataModel {
    constructor(...restArgs) {
        this.name = this.__checkData__(restArgs);
        this.id = this.__checkID__(restArgs);
        this.proxy = new Proxy(this, handler);
    }

    __checkData__(data_arg){
        const args = Array.from(data_arg)[0];
        if (!args.name){
            throw 'Attention: name is not defined';
        } else {
            return args.name;
        }
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

    __read__(){
        return this.proxy;
    }

    __detailString__(){
        return `${Object.keys(this.proxy).map(key => `${key}: ${this.proxy[key]}`).join("\n")}`;
    }

    __update__(args){
        Object.keys(args).forEach(e => {
            this.proxy[e] = args[e];
        });
    }

    __saveItem__(){
        //Create and Overwrite JSON item in localStorage
        const data = JSON.stringify(this);
        const id = this.__getId__();
        localStorage.setItem(id, data);
    }

    __loadItem__(){
        //Load item as JSON from localStorage
        const id = this.__getId__();
        return localStorage.getItem(id);
    }

    __deleteItem__(){
        //Delete item from localStorage
        const id = this.__getId__();
        localStorage.removeItem(id);
    }

    static __loadDB__(){
        return localStorage;
    }

}

export {DataModel};