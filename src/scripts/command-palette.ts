import {getElements} from './internals/elements';
import {setCurrentItem, dispatchSearch} from './internals/list';
import {renderItems} from './internals/render';
import store from './internals/store';

/**
 * Opens the command palette by displaying it, setting the current item to the
 * first item, and focusing on the command palette input.
 * @returns void
 */
export function openCommandPalette(): void {
  const {container, commandPalette, input} = getElements();
  renderItems();
  setCurrentItem(0);

  if (input.value !== '') dispatchSearch();

  container.style.display = 'flex';
  setCurrentItem(0);

  commandPalette.addEventListener('animationend', () =>
    container.setAttribute('data-visible', 'true')
  );

  // backup in case the event doesn't fire
  setTimeout(() => container.setAttribute('data-visible', 'true'), 200);

  input.focus();
}

/**
 * Closes the command palette by hiding it.
 * @returns void
 */
export function closeCommandPalette(): void {
  const {container, input} = getElements();
  setTimeout(() => container.setAttribute('data-visible', 'false'), 150);
  container.style.display = 'none';
  store.setCurrentRoute('');
  input.value = '';
}

/**
 * Hides the command palette without clearing the input value or
 * dispatching a search.
 * @returns void
 */
export function hideCommandPalette(): void {
  const {container} = getElements();
  setTimeout(() => container.setAttribute('data-visible', 'false'), 150);
  container.style.display = 'none';
}
