import {getElements, dispatchSearch} from './internals';
import useKeyboard from './useKeyboard';
import useMouse from './useMouse';

const {container, input} = getElements();
const {handleHover, handleClick} = useMouse();

input.addEventListener('input', dispatchSearch);
document.addEventListener('click', handleClick);
document.addEventListener('keydown', useKeyboard);
container.addEventListener('mouseover', handleHover);
