import {handleClick} from './mouse';
import {handleKeyboard} from './keyboard';
import {createCommandPaletteItems} from './hooks/createCommandPalette';
import {getElements} from './internals/elements';
import {dispatchSearch} from './internals/list';
import store from './internals/store';

const {input} = getElements();

if (store.getItems().length < 1) createCommandPaletteItems([]);

input.addEventListener('input', dispatchSearch);
document.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeyboard);
