import {GameObject} from './core/game_object.js';
import {draggableScroll} from './core/utils/draggable_scroll.js';

class Map extends GameObject {
    constructor(args){
        super(args, args.actions.push({
                cls: 'map',
                pointer: null,
                action: draggableScroll
            }));
        this.factions = args.factions;
        this.regions = args.regions;
        this.current = null
    }

    __loadRegionsfaction__(){
        document.querySelectorAll('path').forEach(path => {
            this.factions.forEach((faction) => {
                if (faction.holdings.includes(path.id)){
                    path.classList.add(faction.name);
                }
            });
        });
    }

    __getRegion__(f){
        const paths = document.querySelectorAll('path');
        let handler = () => {
            event.preventDefault();
            f();
            return paths.forEach(e => e.removeEventListener('contextmenu', handler, false));
        }
        paths.forEach(e => e.addEventListener('contextmenu', handler, false));
    }
}

export {Map}