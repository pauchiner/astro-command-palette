const container = document.querySelector(
  '#command-palette-container'
) as HTMLDivElement;

const commandPalette = container.querySelector(
  '#command-palette'
) as HTMLDivElement;

const commandPaletteInput = container.querySelector(
  '#command-palette-input'
) as HTMLInputElement;

const commandPaletteItems = [
  ...container.querySelectorAll('.command-palette-action')
] as HTMLDivElement[];

const openCommandPalette = (): void => {
  container.style.display = 'flex';
  setCurrentItem(0);

  commandPalette.addEventListener('animationend', () => {
    container.setAttribute('data-visible', 'true');
  });

  commandPaletteInput.focus();
};

const closeCommandPalette = (): void => {
  setTimeout(() => container.setAttribute('data-visible', 'false'), 150);
  commandPaletteInput.value = '';
  container.style.display = 'none';
};

/**
 * Sets the current item in the command palette based on the given index.
 * @param index - The index of the item to set as current.
 * @remarks If the index is out of range or if the item's style is set to 'none', it will not be selected.
 * @returns void
 */
const setCurrentItem = (index: number) => {
  let match = false;

  commandPaletteItems.forEach((item, _index) => {
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

  commandPaletteItems[index].scrollIntoView({
    behavior: 'smooth',
    block: 'end'
  });

  container.setAttribute('data-selected', index.toString());
};

const incrementIndex = (): void => {
  const currentIndex = Number(container.getAttribute('data-selected'));

  if (currentIndex >= commandPaletteItems.length - 1) setCurrentItem(0);
  else setCurrentItem(currentIndex + 1);
};

const decrementIndex = (): void => {
  const currentIndex = Number(container.getAttribute('data-selected'));

  if (currentIndex <= 0) setCurrentItem(commandPaletteItems.length - 1);
  else setCurrentItem(currentIndex - 1);
};

const handleAction = (): void => {
  const currentIndex = Number(container.getAttribute('data-selected'));
  commandPaletteItems[currentIndex].click();

  closeCommandPalette();
};

const handleSearch = (_event: Event) => {
  const query = commandPaletteInput.value;

  commandPaletteItems.forEach(function (item) {
    const text = item.innerText.toLowerCase();

    if (text.includes(query)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
  setCurrentItem(0);
};

const handleKeyboard = (event: KeyboardEvent): void => {
  const isVisible = container.getAttribute('data-visible') === 'true';

  const commandPressed = event.metaKey && event.key === 'k';
  const escapePressed = event.key === 'Escape';
  const enterPressed = event.key === 'Enter';
  const downPressed =
    event.key === 'ArrowDown' || (!event.shiftKey && event.key === 'Tab');
  const upPressed =
    event.key === 'ArrowUp' || (event.shiftKey && event.key === 'Tab');

  if (isVisible && (commandPressed || escapePressed)) closeCommandPalette();
  if (!isVisible && commandPressed) openCommandPalette();

  if (isVisible) {
    if (downPressed) {
      event.preventDefault();
      incrementIndex();
    }
    if (upPressed) {
      event.preventDefault();
      decrementIndex();
    }
    if (enterPressed) {
      event.preventDefault();
      handleAction();
    }
  }
};

const handleMouse = (event: MouseEvent): void => {
  const isVisible = container.getAttribute('data-visible') === 'true';
  if (!isVisible) return;

  const target = event.target as HTMLElement;

  commandPaletteItems.forEach(({id}, index) => {
    if (target.id === id) setCurrentItem(index);
  });
};

const handleMouseExit = (event: MouseEvent): void => {
  const target = event.target as HTMLElement;

  if (target.id === 'command-palette-container') closeCommandPalette();
};

commandPaletteInput.addEventListener('input', handleSearch);
document.addEventListener('keydown', handleKeyboard);
document.addEventListener('mouseover', handleMouse);
document.addEventListener('click', handleMouseExit);
