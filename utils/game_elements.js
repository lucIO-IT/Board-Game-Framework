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
    get_income(){
        return this.income * (this.structures/10) * (this.population/100)
    }

}

class Faction {
    constructor(name, king, provinces, culture, color, human=false){
        this.name = name;
        this.king = king;
        this.provinces = provinces; //factions is an array
        this.culture_type = culture;
        this.color = color;
        this.human = human;
    }

    //methods
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
}

export {Region, Character, Faction};