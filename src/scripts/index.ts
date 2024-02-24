import {getElements, dispatchSearch} from './internals';
import {handleClick} from './mouse';
import {handleKeyboard} from './keyboard';

const {input} = getElements();

input.addEventListener('input', dispatchSearch);
document.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeyboard);
