import {DataModel} from './core.js'

class Faction extends DataModel {
    constructor(args){
        super(args)
        this.name = args.name;
        this.royal_family = args.royal_family;
        this.provinces = args.provinces; //factions is an array
        this.symbol = args.symbol;
        this.color = args.color;
        this.money = args.money;
        this.rank = args.rank;
        this.human = args.human;
    }

    //methods
    get_income(regions){
        this.provinces.forEach(e => {
            this.money += Math.round(regions[e].income * (regions[e].population/10))
        });
    }
    faction_end_turn(regions){
        this.get_income(regions);
    }
}

class Region extends DataModel {
    constructor(args){
        super(args);
        this.id = args.id;
        this.name = args.name;
        this.capital = args.capital;
        this.income = this.__check_arg__(args.income);
        this.population = this.__check_arg__(args.population);
        this.neighbours = args.neighbours;
        this.army = this.__check_arg__(args.army);
        this.garrison = this.__check_arg__(args.garrison);
        this.troops = this.__check_arg__(args.troops);
        this.defence = this.__check_arg__(args.defence);
        this.structures = this.__check_arg__(args.structures);
        this.terrain_image_url = args.image;
    }

    //methods
    get_terrain(){
        return `${this.terrain_image_url}`;
    }
    raise_troops(faction){
        let success;
        if (faction.money > 50){
            this.army += 25;
            faction.money = faction.money - 50;
            //faction.update_info_bar();
            this.set_troops()
            console.log(`25 troops raised in ${this.name}`)
            success = true;
        } else {
            console.log(`Treasury is not enough to raise troops`)
            success = false;
        }
        return success;
    }
    set_troops(){
        this.troops = this.army + this.garrison;
    }
    restore_garrison(){
        if (this.garrison < this.defence * 50){
            this.garrison += 5;
        }
    }
    region_end_turn(){
        restore_garrison();
    }
    incrase_defence(faction){
        let success;
        if (faction.money > 150 && this.defence < 5){
            this.defence += 1;
            faction.money = faction.money - 150;
            console.log(`Defence upgraded in ${this.name}`);
            success = true;
        } else {
            console.log(`Is not possible to upgrade defence in this province`);
            success = false;
        }
        return success;
    }
    incrase_structures(faction){
        let success;
        if (faction.money > 150 && this.structures < 5){
            this.structures += 1;
            faction.money = faction.money - 150;
            console.log(`Structures upgraded in ${this.name}`);
            success = true;
        } else {
            console.log(`Is not possible to upgrade structures in this province`);
            success = false;
        }
        return success;
    }
}

export {Faction, Region}