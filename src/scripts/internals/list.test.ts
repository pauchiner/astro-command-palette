import {
  getCurrentItem,
  setCurrentItem,
  incrementItem,
  decrementItem
} from './list';
import {describe, it, expect, test, beforeEach} from 'vitest';
import {getElements} from '.';
import store from './store';

beforeEach(() => {
  store.setCurrentItem(null);
});

test('getCurrentItem', () => {
  expect(getCurrentItem()).toBe(store.getCurrentItem() ?? 0);
});

describe('setCurrentItem', () => {
  it('should not assign if is out of range', () => {
    setCurrentItem(10);
    expect(store.getCurrentItem()).toBe(null);
  });

  it('should assign a index', () => {
    setCurrentItem(0);
    expect(store.getCurrentItem()).toBe(0);
  });

  it('should update the attribute', () => {
    setCurrentItem(1);
    const {getItemsVisible} = getElements();
    getItemsVisible().forEach((item, _index) => {
      const selected = item.getAttribute('data-selected');

      if (_index === 1) expect(selected).toBe('true');
      else expect(selected).toBe('false');
    });
  });
});

describe('incrementItem', () => {
  it('should increment by one', () => {
    store.setCurrentItem(0);
    incrementItem();
    expect(store.getCurrentItem()).toBe(1);
  });

  it('should return to zero at the end of the list', () => {
    store.setCurrentItem(2);
    incrementItem();
    expect(getCurrentItem()).toBe(0);
  });
});

describe('decrementItem', () => {
  it('should decrement by one', () => {
    store.setCurrentItem(1);
    decrementItem();
    expect(store.getCurrentItem()).toBe(0);
  });

  it('should return to the end of the list on reach zero', () => {
    store.setCurrentItem(0);
    decrementItem();
    expect(getCurrentItem()).toBe(2);
  });
});

// describe('dispatchSearch', () => {});

// describe('dispatchAction', () => {});
