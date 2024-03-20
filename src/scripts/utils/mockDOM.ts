import {Window} from 'happy-dom';

export const mockDOM = () => {
  // Items
  const items = [];
  const listToAttach = document.createElement('command-palette-items');
  for (let index = 0; index < 4; index++) {
    const item = document.createElement('command-palette-item') as HTMLElement;
    if (index !== 0) item.style.display = 'flex';
    else item.style.display = 'none';
    listToAttach.appendChild(item);
    items.push(item);
  }

  // Body
  const listContainer = document.createElement('command-palette-list');
  listContainer.appendChild(listToAttach);
  const body = document.createElement('command-palette-body');
  body.appendChild(listToAttach);

  // Header
  const input = document.createElement('input');
  const header = document.createElement('command-palette-header');
  header.appendChild(input);

  // Command Palette
  const commandPalette = document.createElement('command-palette');
  commandPalette.appendChild(header);
  commandPalette.appendChild(body);

  // Backdrop
  const backdrop = document.createElement('command-palette-backdrop');

  // Container
  const container = document.createElement('astro-command-palette');
  container.setAttribute('data-visible', 'false');
  container.appendChild(commandPalette);
  container.appendChild(backdrop);

  return {
    mockInput: input,
    mockItems: items,
    mockBackdrop: backdrop,
    mockContainer: container,
    mockListToAttach: listToAttach,
    mockCommandPalette: commandPalette
  };
};

const _mockWindow = () => {
  const element = new Window({url: 'http:localhost:1234'});
  const {mockContainer} = mockDOM();
  const current = element.document;

  // @ts-ignore
  current.body.appendChild(mockContainer);

  return element;
};

export const mockWindow = _mockWindow();

export default mockDOM;
