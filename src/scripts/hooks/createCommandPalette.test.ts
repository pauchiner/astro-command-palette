import { _assignID, createCommandPaletteItems } from './createCommandPalette';
import type { CommandPaletteItemProps } from '../../types';
import { describe, expect, it } from 'vitest';
import store from '../internals/store';

describe('assignID', () => {
  const item1: CommandPaletteItemProps = {
    name: 'Documentation',
    type: 'action',
    url: 'https://github.com/pauchiner/astro-command-palette'
  };

  const item2: CommandPaletteItemProps = {
    name: 'Author',
    type: 'action',
    url: 'https://pauchiner.es'
  };

  it('should assign a unique ID to the provided item', () => {
    const result = _assignID(item1);

    expect(result).toHaveProperty('id');
    expect(result.id.length).toBe(13);
    expect(result.id).toEqual(expect.any(String));
    expect(result).toMatchObject({ ...item1, id: result.id });
  });

  it('should generate different IDs for different calls', () => {
    const result1 = _assignID(item1);
    const result2 = _assignID(item2);

    expect(result1.id).not.toEqual(result2.id);
  });
});

describe('createCommandPalette', () => {
  const mockItems = (): CommandPaletteItemProps[] => {
    return [
      {
        name: 'Documentation',
        type: 'action',
        url: 'https://github.com/pauchiner/astro-command-palette'
      },
      {
        name: 'Author',
        type: 'action',
        url: 'https://pauchiner.es'
      },
      {
        name: 'Change theme',
        type: 'page',
        actions: [
          {
            name: 'Light mode',
            type: 'action',
            handler: () => alert('Light mode')
          },
          {
            name: 'Dark mode',
            type: 'action',
            handler: () => alert('Dark mode')
          }
        ]
      }
    ];
  };

  it('should add items to the store', () => {
    createCommandPaletteItems(mockItems());
    expect(store.getItems()).not.toBe([]);
  });
});
