import type {CommandPaletteItem} from '../../types';
import {expect, test} from 'vitest';
import store from './store';

test('get currentRoute', () => {
  expect(store.getCurrentRoute()).toBe('');
});

test('set currentRoute', () => {
  store.setCurrentRoute('nested-page');
  expect(store.getCurrentRoute()).toBe('nested-page');
});

test('get currentItem', () => {
  expect(store.getCurrentItem()).toBe(null);
});

test('set currentItem', () => {
  store.setCurrentItem(0);
  expect(store.getCurrentItem()).toBe(0);
});

test('get items', () => {
  expect(store.getItems()).toStrictEqual([]);
});

test('set items', () => {
  const item: CommandPaletteItem = {
    name: 'Documentation',
    type: 'action',
    url: 'https://github.com/pauchiner/astro-command-palette',
    id: 'b73e51f51be5'
  };

  store.setItems([item]);
  expect(store.getItems()).toStrictEqual([item]);
});
