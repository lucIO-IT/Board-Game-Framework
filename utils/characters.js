import {Character} from './game_elements.js';

//Game starts in 946

const characters = {
    otto: new Character(
        'Otto',
        38,
        false,
        [],
        'Enrico'
    ),
    berengar: new Character(
        'Berengario',
        50,
        true,
        [],
        'Adalberto'
    )
};

export {characters};
