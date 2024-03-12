import {describe, expect, test} from 'vitest';
import {getElements} from './elements';

const mockDOM = () => {
  // Items
  const items = [];
  const listToAttach = document.createElement('command-palette-items');
  for (let index = 0; index < 2; index++) {
    const item = document.createElement('command-palette-item') as HTMLElement;
    if (index === 0) item.style.display = 'none';
    else item.style.display = 'flex';
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

  // Document
  const mockDocument = document.createElement('div');
  mockDocument.appendChild(container);

  return {
    mockInput: input,
    mockItems: items,
    mockBackdrop: backdrop,
    mockContainer: container,
    mockListToAttach: listToAttach,
    mockCommandPalette: commandPalette,
    mockDocument
  };
};

describe('getElements', () => {
  test('container', () => {
    const {mockDocument, mockContainer} = mockDOM();
    const {container} = getElements(mockDocument);

    expect(container).toBe(mockContainer);
  });

  test('commandPalette', () => {
    const {mockDocument, mockCommandPalette} = mockDOM();
    const {commandPalette} = getElements(mockDocument);

    expect(commandPalette).toBe(mockCommandPalette);
  });

  test('backdrop', () => {
    const {mockDocument, mockBackdrop} = mockDOM();
    const {backdrop} = getElements(mockDocument);

    expect(backdrop).toBe(mockBackdrop);
  });

  test('listToAttach', () => {
    const {mockDocument, mockListToAttach} = mockDOM();
    const {listToAttach} = getElements(mockDocument);

    expect(listToAttach).toBe(mockListToAttach);
  });

  test('items', () => {
    const {mockDocument, mockItems} = mockDOM();
    const {items} = getElements(mockDocument);

    expect(items).toStrictEqual(mockItems);
  });

  test('input', () => {
    const {mockDocument, mockInput} = mockDOM();
    const {input} = getElements(mockDocument);

    expect(input).toBe(mockInput);
  });

  test('isVisible', () => {
    const {mockDocument, mockContainer} = mockDOM();
    const {isVisible} = getElements(mockDocument);

    expect(isVisible).toBe(
      mockContainer.getAttribute('data-visible') === 'true' ? true : false
    );
  });
});
