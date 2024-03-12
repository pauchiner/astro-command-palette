import type {
  CommandPaletteAction,
  CommandPaletteItem,
  CommandPaletteItemProps
} from '../../types';
import {store} from '../internals';

export const _assignID = (item: CommandPaletteItemProps) => {
  const id = Math.random().toString(16).slice(2);
  return {...item, id} as CommandPaletteItem;
};

export const _assignActionsID = (item: CommandPaletteItemProps) => {
  return _assignID(item) as CommandPaletteAction;
};

export const createCommandPaletteItems = (items: CommandPaletteItemProps[]) => {
  const data = items.map(item => {
    if (item.type === 'page') {
      item.actions = item.actions.map(action => {
        return _assignActionsID(action);
      });
    }
    return _assignID(item);
  });

  store.setItems(data);
};

export default createCommandPaletteItems;
