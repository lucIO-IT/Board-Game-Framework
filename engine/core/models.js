import {DataModel} from './core.js'

class Faction extends DataModel {
    constructor(args){
        super(args)
        this.name = args.name;
        this.royal_family = args.royal_family;
        this.provinces = args.provinces; //factions is an array
        this.color = args.color;
        this.money = args.money;
        this.rank = args.rank;
        this.human = args.human;
    }

    //methods
    get_panel_info(){
        return `
            <li>Faction: ${this.name}</li>
            <li>Leader: ${this.king.name}</li>
            <li>Rank: ${this.rank}</li>
        `;
    }
    update_info_bar(){
        return `
            <span>Faction name: ${this.name}</span>
            <span>Leader: ${this.king.name}</span>
            <span>Treasury: ${this.money}</span>
        `;
    }
    get_income(regions){
        this.provinces.forEach(e => {
            this.money += Math.round(regions[e].income * (regions[e].population/10))
        });
    }
    faction_end_turn(regions){
        this.get_income(regions);
    }
    /*acquireRegion(){
        let current_faction = Object.keys(factions).filter(e => factions[e].provinces.includes(target.id))[0];
        let new_faction = Object.keys(factions).filter(e => factions[e].provinces.includes(CURRENT_REGION))[0];
        target.classList.remove(current_faction);
        factions[current_faction].provinces = factions[current_faction].provinces.filter(e => e !== target.id);
        target.classList.add(new_faction);
        factions[new_faction].provinces.push(target.id);
    }*/
    acquireRegion(region){
        this.provinces.push(region)
    }
    loseRegion(region){
        this.provinces = this.provinces.filter(e => e !== region);
    }
}

class Region extends DataModel {
    constructor(args){
        super(args);
        this.name = args.name;
        this.capital = args.capital;
        this.income = this.__check_arg__(args.income);
        this.population = this.__check_arg__(args.pop);
        this.neighbours = args.neighbours;
        this.army = this.__check_arg__(args.army);
        this.garrison = this.__check_arg__(args.garrison);
        this.troops = this.__check_arg__(args.troops);
        this.defence = this.__check_arg__(args.defence);
        this.structures = this.__check_arg__(args.structures);
        this.terrain_image_url = args.image;
    }

    //methods
    get_panel_info(){
        return `
            <li>Province: ${this.name}</li>
            <li>Capital: ${this.capital}</li>
            <li>Troops: ${this.troops}</li>
            <li>Defence: ${this.defence}</li>
        `;
    }
    get_terrain(){
        return `${this.terrain_image_url}`;
    }
    raise_troops(faction){
        if (faction.money > 50){
            this.army += 25;
            faction.money = faction.money - 50;
            faction.update_info_bar();
            set_troops()
            return `<li>25 troops raised in ${this.name}</li>`
        } else {
            return `<li>Treasury is not enough to raise troops</li>`
        }
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
        if (faction.money > 150 && this.defence < 5){
            this.defence += 1;
            faction.money = faction.money - 150;
            return `<li>Defence upgraded in ${this.name}</li>`
        } else {
            return `<li>Is not possible to upgrade defence in this province</li>`
        }
    }
    incrase_structures(faction){
        if (faction.money > 150 && this.structures < 5){
            this.structures += 1;
            faction.money = faction.money - 150;
            return `<li>Structures upgraded in ${this.name}</li>`
        } else {
            return `<li>Is not possible to upgrade structures in this province</li>`
        }
    }
}

export {Faction, Region}