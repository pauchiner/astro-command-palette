import type {
  CommandPaletteAction,
  CommandPaletteItem,
  CommandPaletteItemProps
} from '../../types';
import {store, renderItems} from '../internals';

const assignID = (item: CommandPaletteItemProps) => {
  const id = Math.random().toString(16).slice(2);
  return {...item, id} as CommandPaletteItem;
};

const assignActionsID = (item: CommandPaletteItemProps) => {
  return assignID(item) as CommandPaletteAction;
};

const createCommandPaletteItems = (items: CommandPaletteItemProps[]) => {
  const data = items.map(item => {
    if (item.type === 'page') {
      item.actions = item.actions.map(action => {
        return assignActionsID(action);
      });
    }
    return assignID(item);
  });

  store.setItems(data);
  renderItems();
};

export default createCommandPaletteItems;
