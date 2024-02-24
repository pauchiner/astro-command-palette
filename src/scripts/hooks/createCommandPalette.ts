import type {CommandPaletteAction, CommandPaletteItem} from '../../types';
import createActionItem from '../../components/Action';

const dispatchActionItem = (item: CommandPaletteAction) => {
  const action = document.querySelector(`#${item.id}`) as HTMLElement;
  if (item.handler) action.addEventListener('click', item.handler);
  if (item.url)
    action.addEventListener('click', () =>
      window.open(item.url, '_blank', 'noopener nofollow')
    );
};

const createUID = () => {
  return (
    Date.now().toString(36) +
    Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
    ).toString(36)
  );
};

const createCommandPaletteItems = (items: CommandPaletteItemProps[]) => {
  const listToAttach = document.querySelector(
    'command-palette-items'
  ) as HTMLDivElement;
  listToAttach.innerText = '';

  items.forEach(data => {
    const item = { ...data, id: createUID() };
    const component = createCommandPaletteItem(item);
    listToAttach.append(component);
    dispatchActionItem(item);
  });
};

export default createCommandPaletteItems;
