import type {CommandPaletteAction, CommandPaletteItem} from '../../types';
import createActionItem from '../../components/Action';

const dispatchActionItem = (item: CommandPaletteAction) => {
  const action = document.querySelector(`#${item.id}`) as HTMLElement;
  if (item.handler) action.addEventListener('click', item.handler);
  if (item.url)
    action.addEventListener('click', () => window.open(item.url, '_blank'));
};

const createCommandPaletteItems = (items: CommandPaletteItem[]) => {
  const listToAttach = document.querySelector(
    'command-palette-items'
  ) as HTMLDivElement;
  listToAttach.innerText = '';

  items.forEach(item => {
    if (item.type === 'page') return;
    const component = createActionItem(item);
    listToAttach.append(component);
    dispatchActionItem(item);
  });
};

export default createCommandPaletteItems;
