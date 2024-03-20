import {describe, expect, test} from 'vitest';
import {getElements} from './elements';
import {mockDOM} from '../utils';

describe('getElements', () => {
  test('container', () => {
    const {mockContainer} = mockDOM();
    const {container} = getElements();

    expect(container).toStrictEqual(mockContainer);
  });

  test('commandPalette', () => {
    const {mockCommandPalette} = mockDOM();
    const {commandPalette} = getElements();

    expect(commandPalette).toStrictEqual(mockCommandPalette);
  });

  test('backdrop', () => {
    const {mockBackdrop} = mockDOM();
    const {backdrop} = getElements();

    expect(backdrop).toStrictEqual(mockBackdrop);
  });

  test('listToAttach', () => {
    const {mockListToAttach} = mockDOM();
    const {listToAttach} = getElements();

    expect(listToAttach).toStrictEqual(mockListToAttach);
  });

  test('items', () => {
    const {mockItems} = mockDOM();
    const {items} = getElements();

    expect(items).toStrictEqual(mockItems);
  });

  test('getItemsVisible', () => {
    mockDOM();
    const {getItemsVisible} = getElements();

    expect(getItemsVisible().length).toBe(3);
  });

  test('input', () => {
    const {mockInput} = mockDOM();
    const {input} = getElements();

    expect(input).toStrictEqual(mockInput);
  });

  test('isVisible', () => {
    const {mockContainer} = mockDOM();
    const {isVisible} = getElements();

    expect(isVisible).toBe(
      mockContainer.getAttribute('data-visible') === 'true' ? true : false
    );
  });
});
