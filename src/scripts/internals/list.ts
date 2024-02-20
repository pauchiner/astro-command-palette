import {getElements} from './elements';

/**
 * Retrieves the index of the currently selected item in the container.
 * @returns The index of the currently selected item, represented as a number. Returns 0 if no item is selected.
 */
export const getCurrentItem = () => {
  try {
    const {container} = getElements();
    return Number(container.getAttribute('data-selected'));
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
  const {container, actionItems} = getElements();
  let match = false;

  actionItems.forEach((item, _index) => {
    if (_index !== index) {
      item.setAttribute('data-selected', 'false');
      return;
    }
    item.setAttribute('data-selected', 'true');
    match = true;
  });

  if (!match) return;

  actionItems[index].scrollIntoView({
    behavior: 'instant',
    block: 'nearest'
  });

  container.setAttribute('data-selected', index.toString());
};

/**
 * Increments the currently selected item in the command palette by one.
 * If the last item is reached, it wraps around to the first item.
 * @returns void
 */
export const incrementItem = () => {
  const {actionItems} = getElements();
  const current = getCurrentItem();

  if (current >= actionItems.length - 1) setCurrentItem(0);
  else setCurrentItem(current + 1);
};

/**
 * Decrements the currently selected item in the command palette by one.
 * If the first item is reached, it wraps around to the last item.
 * @returns void
 */
export const decrementItem = () => {
  const {actionItems} = getElements();
  const current = getCurrentItem();

  if (current <= 0) setCurrentItem(actionItems.length - 1);
  else setCurrentItem(current - 1);
};

/**
 * Dispatches a search event by filtering command palette items based on the input query.
 * @returns void
 */
export const dispatchSearch = () => {
  const {actionItems, input} = getElements();

  /*
  const data = Array.from(actionItems).map(
    item => item.querySelector('span')?.innerText.toLowerCase() ?? ''
  );

  const results = search(data, input.value);
  */

  actionItems.forEach((item, _index) => {
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
  const {actionItems} = getElements();
  const current = getCurrentItem();
  actionItems[current].click();
};
