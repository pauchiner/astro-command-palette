const container = document.querySelector(
  '#command-palette-container'
) as HTMLDivElement;

const commandPalette = container.querySelector(
  '#command-palette'
) as HTMLDivElement;

const commandPaletteinput = container.querySelector(
  '#command-palette-input'
) as HTMLInputElement;

const commandPaletteItems = [
  ...container.querySelectorAll('.command-palette-action')
] as HTMLDivElement[];

const openCommandPalette = (): void => {
  container.setAttribute('data-selected', '0');
  container.style.display = 'flex';
  updateCurrentItem();

  commandPalette.addEventListener('animationend', () => {
    container.setAttribute('data-visible', 'true');
  });

  commandPaletteinput.focus();
};

const closeCommandPalette = (): void => {
  setTimeout(() => container.setAttribute('data-visible', 'false'), 150);

  container.style.display = 'none';
};

const updateCurrentItem = (): void => {
  const currentIndex = Number(container.getAttribute('data-selected'));

  commandPaletteItems.forEach((item, index) =>
    item.setAttribute('data-selected', (index === currentIndex).toString())
  );

  commandPaletteItems[currentIndex].scrollIntoView({
    behavior: 'smooth',
    block: 'end'
  });
};

const incrementIndex = (): void => {
  const currentIndex = Number(container.getAttribute('data-selected'));

  if (currentIndex >= commandPaletteItems.length - 1) {
    container.setAttribute('data-selected', '0');
  } else container.setAttribute('data-selected', (currentIndex + 1).toString());

  updateCurrentItem();
};

const decrementIndex = (): void => {
  const currentIndex = Number(container.getAttribute('data-selected'));

  if (currentIndex <= 0) {
    container.setAttribute(
      'data-selected',
      (commandPaletteItems.length - 1).toString()
    );
  } else container.setAttribute('data-selected', (currentIndex - 1).toString());

  updateCurrentItem();
};

const handleAction = (): void => {
  const currentIndex = Number(container.getAttribute('data-selected'));
  commandPaletteItems[currentIndex].click();

  closeCommandPalette();
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

document.addEventListener('keydown', handleKeyboard);
