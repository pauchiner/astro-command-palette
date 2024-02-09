import type {CommandPaletteItem} from '../types';
import Action from '../components/Action.ts';

export const openUrl = (url: string, target = '_blank') => {
  window.open(url, target);
};

const createCommandPaletteItems = (items: CommandPaletteItem[]) => {
  const listToAttach = document.querySelector(
    '#command-palette-items'
  ) as HTMLDivElement;

  items.forEach(item => {
    if (item.type === 'group') return;

    const component = new Action(item).createComponent();
    listToAttach.appendChild(component);
  });
};

export default createCommandPaletteItems;
