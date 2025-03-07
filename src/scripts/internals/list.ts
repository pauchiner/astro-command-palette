import store from './store';
import {getElements} from './elements';

/**
 * Retrieves the index of the currently selected item in the container.
 * @returns The index of the currently selected item, represented as a number. Returns 0 if no item is selected.
 */
export function getCurrentItem() {
  const current = store.getCurrentItem();
  return current ?? 0;
}

/**
 * Sets the current item in the command palette based on the given index.
 * @param index - The index of the item to set as current.
 * @remarks If the index is out of range, it will not be selected.
 * @returns void
 */
export function setCurrentItem(index: number) {
  const {getItemsVisible} = getElements();
  const items = getItemsVisible();

  let match = false;
  items.forEach((item, _index) => {
    if (_index !== index) {
      item.setAttribute('data-selected', 'false');
      return;
    }
    item.setAttribute('data-selected', 'true');
    match = true;
  });

  if (!match) return;
  store.setCurrentItem(index);

  if (import.meta.env.NODE_ENV === 'test') return;

  items[index].scrollIntoView({
    behavior: 'instant',
    block: 'nearest'
  });
}

/**
 * Increments the currently selected item in the command palette by one.
 * If the last item is reached, it wraps around to the first item.
 * @returns void
 */
export function incrementItem() {
  const {getItemsVisible} = getElements();
  const items = getItemsVisible();
  const current = getCurrentItem();

  if (current >= items.length - 1) setCurrentItem(0);
  else setCurrentItem(current + 1);
}

/**
 * Decrements the currently selected item in the command palette by one.
 * If the first item is reached, it wraps around to the last item.
 * @returns void
 */
export function decrementItem() {
  const {getItemsVisible} = getElements();
  const items = getItemsVisible();
  const current = getCurrentItem();

  if (current <= 0) setCurrentItem(items.length - 1);
  else setCurrentItem(current - 1);
}

/**
 * Dispatches a search event by filtering command palette items based on the input query.
 * @returns void
 */
export function dispatchSearch() {
  const {items, input} = getElements();
  const value = input.value.toLowerCase();

  for (let item of items) {
    const text = item.querySelector('span')?.innerText.toLowerCase() ?? '';
    item.style.display = text.includes(value) ? 'flex' : 'none';
  }
  setCurrentItem(0);
}

/**
 * Dispatches the action associated with the currently selected item in the command palette.
 * This typically involves simulating a click event on the selected item.
 * @returns void
 */
export function dispatchAction() {
  const {getItemsVisible} = getElements();
  const current = getCurrentItem();
  const items = getItemsVisible();
  if (items.length === 0) return;
  items[current].click();
}
