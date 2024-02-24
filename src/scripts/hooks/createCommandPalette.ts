import type {CommandPaletteItem} from '../../types';
import {store, renderItems} from '../internals';

const createCommandPaletteItems = (items: CommandPaletteItem[]) => {
  store.setItem('items', items);
  renderItems();
};

export default createCommandPaletteItems;
