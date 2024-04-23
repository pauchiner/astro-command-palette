import {describe, expect, test} from 'vitest';
import {mockDOM, mockWindow} from '../utils';
import {getElements} from './elements';

describe('getElements', () => {
  test('container', () => {
    const {mockContainer} = mockDOM();
    const {container} = getElements(mockWindow);

    expect(container).toStrictEqual(mockContainer);
  });

  test('commandPalette', () => {
    const {mockCommandPalette} = mockDOM();
    const {commandPalette} = getElements(mockWindow);

    expect(commandPalette).toStrictEqual(mockCommandPalette);
  });

  test('backdrop', () => {
    const {mockBackdrop} = mockDOM();
    const {backdrop} = getElements(mockWindow);

    expect(backdrop).toStrictEqual(mockBackdrop);
  });

  test('listToAttach', () => {
    const {mockListToAttach} = mockDOM();
    const {listToAttach} = getElements(mockWindow);

    expect(listToAttach).toStrictEqual(mockListToAttach);
  });

  test('items', () => {
    const {mockItems} = mockDOM();
    const {items} = getElements(mockWindow);

    expect(items).toStrictEqual(mockItems);
  });

  test('getItemsVisible', () => {
    mockDOM();
    const {getItemsVisible} = getElements(mockWindow);

    expect(getItemsVisible().length).toBe(3);
  });

  test('input', () => {
    const {mockInput} = mockDOM();
    const {input} = getElements(mockWindow);

    expect(input).toStrictEqual(mockInput);
  });

  test('isVisible', () => {
    const {mockContainer} = mockDOM();
    const {isVisible} = getElements(mockWindow);

    expect(isVisible).toBe(
      mockContainer.getAttribute('data-visible') === 'true' ? true : false
    );
  });
});
