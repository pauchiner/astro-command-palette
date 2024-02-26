import {store, getElements} from '.';

/**
 * Retrieves the index of the currently selected item in the container.
 * @returns The index of the currently selected item, represented as a number. Returns 0 if no item is selected.
 */
export const getCurrentItem = () => {
  try {
    return Number(store.getItem('currentSelected'));
  } catch {
    return 0;
  }
};

/**
 * Sets the current item in the command palette based on the given index.
 * @param index - The index of the item to set as current.
 * @remarks If the index is out of range, it will not be selected.
 * @returns void
 */
export const setCurrentItem = (index: number) => {
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

  items[index].scrollIntoView({
    behavior: 'instant',
    block: 'nearest'
  });

  store.setItem('currentSelected', index);
};

/**
 * Increments the currently selected item in the command palette by one.
 * If the last item is reached, it wraps around to the first item.
 * @returns void
 */
export const incrementItem = () => {
  const {getItemsVisible} = getElements();
  const items = getItemsVisible();
  const current = getCurrentItem();

  if (current >= items.length - 1) setCurrentItem(0);
  else setCurrentItem(current + 1);
};

/**
 * Decrements the currently selected item in the command palette by one.
 * If the first item is reached, it wraps around to the last item.
 * @returns void
 */
export const decrementItem = () => {
  const {getItemsVisible} = getElements();
  const items = getItemsVisible();
  const current = getCurrentItem();

  if (current <= 0) setCurrentItem(items.length - 1);
  else setCurrentItem(current - 1);
};

/**
 * Dispatches a search event by filtering command palette items based on the input query.
 * @returns void
 */
export const dispatchSearch = () => {
  const {items, input} = getElements();

  items.forEach((item, _index) => {
    const text = item.querySelector('span')?.innerText.toLowerCase() ?? '';

    if (text.includes(input.value)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
  setCurrentItem(0);
};

/**
 * Dispatches the action associated with the currently selected item in the command palette.
 * This typically involves simulating a click event on the selected item.
 * @returns void
 */
export const dispatchAction = () => {
  const {getItemsVisible} = getElements();
  const current = getCurrentItem();
  const items = getItemsVisible();
  if (items.length === 0) return;
  items[current].click();
};
