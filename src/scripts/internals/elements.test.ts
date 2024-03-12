import {describe, expect, test} from 'vitest';
import {getElements} from './elements';
import {Window} from 'happy-dom';

const mockDOM = () => {
  // Items
  const items = [];
  const listToAttach = document.createElement('command-palette-items');
  for (let index = 0; index < 2; index++) {
    const item = document.createElement('command-palette-item') as HTMLElement;
    if (index === 0) item.style.display = 'flex';
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

  // Window
  const mockWindow = new Window({url: 'http://localhost:1234'});
  const mockDocument = mockWindow.document;
  // @ts-ignore
  mockDocument.body.appendChild(container);

  return {
    mockInput: input,
    mockItems: items,
    mockBackdrop: backdrop,
    mockContainer: container,
    mockListToAttach: listToAttach,
    mockCommandPalette: commandPalette,
    mockWindow
  };
};

describe('getElements', () => {
  test('container', () => {
    const {mockWindow, mockContainer} = mockDOM();
    const {container} = getElements(mockWindow);

    expect(container).toBe(mockContainer);
  });

  test('commandPalette', () => {
    const {mockWindow, mockCommandPalette} = mockDOM();
    const {commandPalette} = getElements(mockWindow);

    expect(commandPalette).toBe(mockCommandPalette);
  });

  test('backdrop', () => {
    const {mockWindow, mockBackdrop} = mockDOM();
    const {backdrop} = getElements(mockWindow);

    expect(backdrop).toBe(mockBackdrop);
  });

  test('listToAttach', () => {
    const {mockWindow, mockListToAttach} = mockDOM();
    const {listToAttach} = getElements(mockWindow);

    expect(listToAttach).toBe(mockListToAttach);
  });

  test('items', () => {
    const {mockWindow, mockItems} = mockDOM();
    const {items} = getElements(mockWindow);

    expect(items).toStrictEqual(mockItems);
  });

  test('getItemsVisible', () => {
    const {mockWindow} = mockDOM();
    const {getItemsVisible} = getElements(mockWindow);

    expect(getItemsVisible().length).toBe(1);
  });

  test('input', () => {
    const {mockWindow, mockInput} = mockDOM();
    const {input} = getElements(mockWindow);

    expect(input).toBe(mockInput);
  });

  test('isVisible', () => {
    const {mockWindow, mockContainer} = mockDOM();
    const {isVisible} = getElements(mockWindow);

    expect(isVisible).toBe(
      mockContainer.getAttribute('data-visible') === 'true' ? true : false
    );
  });
});
