import {setCurrentItem, getElements} from './internals';

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
  input.value = '';
};

/**
 * Sets the current item in the command palette based on the given index.
 * @param index - The index of the item to set as current.
 * @remarks If the index is out of range or if the item's style is set to 'none', it will not be selected.
 * @returns void
 */
