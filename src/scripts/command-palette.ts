import {navigate} from 'astro/virtual-modules/transitions-router.js';
import {setCurrentItem, getElements, dispatchSearch} from './internals';

/**
 * Opens the command palette by displaying it and setting the current item to the first item.
 * Also focuses on the command palette input.
 * @returns void
 */
export const openCommandPalette = (): void => {
  const {container, commandPalette, input} = getElements();

  container.style.display = 'flex';
  setCurrentItem(0);

  commandPalette.addEventListener('animationend', () => {
    container.setAttribute('data-visible', 'true');
  });

  input.focus();
};

/**
 * Closes the command palette by hiding it and clearing the input value after a short delay.
 * @returns void
 */
export const closeCommandPalette = (): void => {
  const {container, input} = getElements();
  setTimeout(() => container.setAttribute('data-visible', 'false'), 150);
  container.style.display = 'none';
  dispatchSearch();
  input.value = '';
  navigate('');
};

export const hideCommandPalette = (): void => {
  const {container} = getElements();
  setTimeout(() => container.setAttribute('data-visible', 'false'), 150);
  container.style.display = 'none';
};
