import {getElements, dispatchSearch} from './internals';
import {handleClick, handleHover} from './mouse';
import {handleKeyboard} from './keyboard';

const {container, input} = getElements();

input.addEventListener('input', dispatchSearch);
document.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeyboard);
container.addEventListener('mouseover', handleHover);
