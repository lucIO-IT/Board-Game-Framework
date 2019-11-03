

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
    constructor(name, capital, income, pop, neighbours, troops=0, defence=1, structures=1){
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
    render_panel_info(){
        return `
            <li>Province: ${this.name}</li>
            <li>Capital: ${this.capital}</li>
            <li>Troops: ${this.troops}</li>
            <li>Defence: ${this.defence}</li>
            <li><button class="region-action">Raise Troops</button></li>
            <li><button class="region-action">Incrase Defence</button></li>
        `;
    }
    raise_troops(faction){
        if (faction.money > 150){
            this.troops += 25;
            faction.money = faction.money - 150;
            faction.update_info_bar();
            return `<li>25 troops raised in ${this.name}</li>`
        } else {
            return `<li>Treasury is not enough to raise troops</li>`
        }
    }
    incrase_defence(faction){
        if (faction.money > 250 && this.defence < 5){
            this.defence += 1;
            faction.money = faction.money - 250;
            return `<li>Defence upgraded in ${this.name}</li>`
        } else {
            return `<li>Is not possible to upgrade defence of this province</li>`
        }
    }
}

class Faction {
    constructor(name, king, provinces, color, money=0, rank='?', human=false, mv_points=5){
        this.name = name;
        this.king = king;
        this.provinces = provinces; //factions is an array
        this.color = color;
        this.money = money;
        this.rank = rank;
        this.human = human;
        this.mv_points = mv_points;
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
    check_mv_points(){
        return this.mv_points > 0;
    }
    consume_mv_points(){
        this.mv_points = this.mv_points - 1;
    }
    update_mv_points(){
        this.mv_points = 5;
    }
    get_income(regions){
        this.provinces.forEach(e => {
            this.money += Math.round(regions[e].income * (regions[e].population/10))
        });
    }
    faction_end_turn(regions){
        this.get_income(regions);
        this.update_mv_points();
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

export {Region, Character, Faction};