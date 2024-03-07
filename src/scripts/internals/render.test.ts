import type {CommandPaletteItem} from '../../types';
import {renderItems} from './render';
import {expect, test} from 'vitest';

const mockDOM = () => {
  const listToAttach = document.createElement('div');
  document.appendChild(listToAttach);
  return listToAttach;
};

const items: CommandPaletteItem[] = [
  {
    id: 'docs',
    name: 'Documentation',
    type: 'action',
    url: 'https://github.com/pauchiner/astro-command-palette'
  },
  {
    id: 'author',
    name: 'Author',
    type: 'action',
    url: 'https://pauchiner.es'
  },
  {
    id: 'change-theme',
    name: 'Change theme',
    type: 'page',
    actions: [
      {
        id: 'change-theme-light',
        name: 'Light mode',
        type: 'action',
        handler: () => alert('Light mode')
      },
      {
        id: 'change-theme-dark',
        name: 'Dark mode',
        type: 'action',
        handler: () => alert('Dark mode')
      }
    ]
  }
];

test('render a empty array of items', () => {
  const listToAttach = mockDOM();
  renderItems({
    listToAttach,
    items: []
  });

  const result = Array.from(listToAttach.children);
  expect(result.length).toBe(0);
});

test('render a list of items', () => {
  const listToAttach = mockDOM();

  renderItems({
    listToAttach,
    items
  });

  const result = Array.from(listToAttach.children);
  expect(result.length).toBe(3);
});

test('render a nested page', () => {
  const listToAttach = mockDOM();

  renderItems({
    currentRoute: 'change-theme',
    listToAttach,
    items
  });

  const result = Array.from(listToAttach.children);
  expect(result.length).toBe(2);
});
