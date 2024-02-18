/**
 * Retrieves the index of the currently selected item in the container.
 * @returns The index of the currently selected item, represented as a number. Returns 0 if no item is selected.
 */
export const getCurrentItem = () => {
  try {
    const container = document.querySelector(
      '#command-palette-container'
    ) as HTMLDivElement;
    return Number(container.getAttribute('data-selected'));
  } catch {
    return 0;
  }
};

/**
 * Sets the current item in the command palette based on the given index.
 * @param index - The index of the item to set as current.
 * @remarks If the index is out of range or if the item's style is set to 'none', it will not be selected.
 * @returns void
 */
export const setCurrentItem = (index: number) => {
  const items = [
    ...document.querySelectorAll('.command-palette-action')
  ] as HTMLButtonElement[];
  const container = document.querySelector(
    '#command-palette-container'
  ) as HTMLDivElement;
  let match = false;

  items.forEach((item, _index) => {
    if (item.style.display === 'none') {
      return;
    }

    if (_index !== index) {
      item.setAttribute('data-selected', 'false');
      return;
    }

    item.setAttribute('data-selected', 'true');
    match = true;
  });

  if (!match) return;

  items[index].scrollIntoView({
    behavior: 'smooth',
    block: 'end'
  });

  container.setAttribute('data-selected', index.toString());
};

/**
 * Increments the currently selected item in the command palette by one.
 * If the last item is reached, it wraps around to the first item.
 * @returns void
 */
export const incrementItem = () => {
  const items = [
    ...document.querySelectorAll('.command-palette-action')
  ] as HTMLButtonElement[];
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
  const items = [
    ...document.querySelectorAll('.command-palette-action')
  ] as HTMLButtonElement[];
  const current = getCurrentItem();

  if (current <= 0) setCurrentItem(items.length - 1);
  else setCurrentItem(current - 1);
};

/**
 * Dispatches a search event by filtering command palette items based on the input query.
 * @returns void
 */
export const dispatchSearch = () => {
  const input = document.querySelector(
    '#command-palette-input'
  ) as HTMLInputElement;

  const items = [
    ...document.querySelectorAll('.command-palette-action')
  ] as HTMLButtonElement[];

  const query = input.value;

  items.forEach(function(item) {
    const text = item.innerText.toLowerCase();

    if (text.includes(query)) {
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
  const items = [
    ...document.querySelectorAll('.command-palette-action')
  ] as HTMLButtonElement[];
  const current = getCurrentItem();
  items[current].click();
};