import {getElements, dispatchSearch} from './internals';
import {handleClick, handleHover} from './mouse';
import useKeyboard from './useKeyboard';

const {container, input} = getElements();

input.addEventListener('input', dispatchSearch);
document.addEventListener('click', handleClick);
document.addEventListener('keydown', useKeyboard);
container.addEventListener('mouseover', handleHover);
