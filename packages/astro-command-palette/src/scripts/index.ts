import {getElements, dispatchSearch, store} from './internals';
import {handleClick} from './mouse';
import {handleKeyboard} from './keyboard';
import createCommandPaletteItems from './hooks';

const {input} = getElements();

if(store.getItems().length < 1) createCommandPaletteItems([]);

input.addEventListener('input', dispatchSearch);
document.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeyboard);

