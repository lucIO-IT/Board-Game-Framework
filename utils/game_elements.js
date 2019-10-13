//import {regions} from "./regions";

class Character {
    constructor(name, age, married=false, sons=false, father){
        this.name = name;
        this.age = age;
        this.married = married;
        this.sons = sons; //sons is an array
        this.father = father;
    }

    //methods
}

class Region {
    constructor(name, capital, income, pop, neighbours, troops=0, defence=0, structures=0){
        this.name = name;
        this.capital = capital;
        this.income = income;
        this.population = pop;
        this.neighbours = neighbours;
        this.troops = troops;
        this.defence = defence;
        this.structures = structures;
    }

    //methods
    upgrade_defence(){
        if (this.defence < 5){
            this.defence += 1;
        }
    }
    upgrade_structures(){
        if (this.structures < 5){
            this.structures += 1;
        }
    }
    create_port(){
        if(this.port = false){
            this.port = true;
        }
    }
    render_panel_info(){
        return `
            <li>Province: ${this.name}</li>
            <li>Capital: ${this.capital}</li>
            <li>Troops: ${this.troops}</li>
            <li>Defence: ${this.defence}</li>
            <li><button class="raise-troops">Raise Troops</button></li>
        `;
    }
    raise_troops(faction){
        if (faction.money > 150){
            this.troops += 25;
            faction.money = faction.money - 150;
            return `<li>25 troops raised in ${this.name}</li>`
        } else {
            return `<li>Treasury is not enough to raise troops</li>`
        }
    }
}

class Faction {
    constructor(name, king, provinces, color, money=0, rank='?', human=false){
        this.name = name;
        this.king = king;
        this.provinces = provinces; //factions is an array
        this.color = color;
        this.money = money;
        this.rank = rank;
        this.human = human;
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
    /*
    get_faction_info(){
        return `
            The faction ${this.name} is ruled by ${this.king} and owns this provinces:
            ${this.provinces.map(function(obj){return obj})}.
            ${this.human ? `
                Is controlled by human player.` 
                : `Is controlled by AI.`
            }
        `
    }
    */
    check_if_alive(){
        if(this.king && this.provinces > 0){
            return `${this.name} continues`
        }
    }
    show_culture_properties(){
        return `This faction joined ${this.culture_type} culture and can do:
            ...
        `
    }
    get_income(regions){
        this.provinces.forEach(e => {
            this.money += Math.round(regions[e].income * (regions[e].population/10))
        });
    }
}

export {Region, Character, Faction};