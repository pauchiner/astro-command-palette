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
  container.setAttribute('data-selected', '0');
  container.style.display = 'flex';
  updateCurrentItem();

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

  container.setAttribute('data-selected', '0');
  updateCurrentItem();
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
    if (target.id === id) {
      container.setAttribute('data-selected', index.toString());
      updateCurrentItem();
    }
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
