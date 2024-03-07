import {expect, test} from 'vitest';
import store from './store';
import type {CommandPaletteItem} from '../../types';

test('get currentRoute', () => {
  expect(store.getItem('currentRoute')).toBe('');
});

test('set currentRoute', () => {
  store.setItem('currentRoute', 'nested-page');
  expect(store.getItem('currentRoute')).toBe('nested-page');
});

test('get currentItem', () => {
  expect(store.getItem('currentItem')).toBe(null);
});

test('set currentItem', () => {
  store.setItem('currentItem', 0);
  expect(store.getItem('currentItem')).toBe(0);
});

test('get items', () => {
  expect(store.getItem('items')).toStrictEqual([]);
});

test('set items', () => {
  const item: CommandPaletteItem = {
    name: 'Documentation',
    type: 'action',
    url: 'https://github.com/pauchiner/astro-command-palette',
    id: 'b73e51f51be5'
  };

  store.setItem('items', item);
  expect(store.getItem('items')).toStrictEqual(item);
});
