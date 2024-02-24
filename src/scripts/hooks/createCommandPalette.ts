import type {CommandPaletteItem} from '../../types';
import {renderItems} from '../internals/render';
import store from '../internals/store';

const createCommandPaletteItems = (items: CommandPaletteItem[]) => {
  store.setItem('items', items);
  renderItems();
};

export default createCommandPaletteItems;
