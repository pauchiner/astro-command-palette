import {
  store,
  renderItems,
  getElements,
  setCurrentItem,
  dispatchSearch
} from './internals';

/**
 * Opens the command palette by displaying it, setting the current item to the
 * first item, and focusing on the command palette input.
 * @returns void
 */
export const openCommandPalette = (): void => {
  const {container, commandPalette, input} = getElements();
  renderItems();
  setCurrentItem(0);

  if (input.value !== '') dispatchSearch();

  container.style.display = 'flex';
  setCurrentItem(0);

  commandPalette.addEventListener('animationend', () => {
    container.setAttribute('data-visible', 'true');
  });

  input.focus();
};

/**
 * Closes the command palette by hiding it.
 * @returns void
 */
export const closeCommandPalette = (): void => {
  const {container, input} = getElements();
  setTimeout(() => container.setAttribute('data-visible', 'false'), 150);
  container.style.display = 'none';
  store.setCurrentRoute('');
  input.value = '';
};

/**
 * Hides the command palette without clearing the input value or
 * dispatching a search.
 * @returns void
 */
export const hideCommandPalette = (): void => {
  const {container} = getElements();
  setTimeout(() => container.setAttribute('data-visible', 'false'), 150);
  container.style.display = 'none';
};
