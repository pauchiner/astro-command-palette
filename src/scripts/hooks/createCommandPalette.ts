import type { CommandPaletteItem, CommandPaletteItemProps } from '../../types';
import createCommandPaletteItem from '../../components/Item';
import { navigate } from '../internals/navigation';

const dispatchItemEvent = (item: CommandPaletteItem) => {
  const element = document.querySelector(`#${item.id}`) as HTMLElement;

  if (item.type === 'page') {
    element.addEventListener('click', () => {
      navigate(item.id);
    });

    return;
  }
  if (item.type === 'action') {
    if (item.handler) element.addEventListener('click', item.handler);
    if (item.url)
      element.addEventListener('click', () =>
        window.open(item.url, '_blank', 'noopener nofollow')
      );

    return;
  }
};

const generateId = () => {
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
    const item = { ...data, id: generateId() };
    const component = createCommandPaletteItem(item);
    listToAttach.append(component);
    dispatchItemEvent(item);
  });
};

export default createCommandPaletteItems;
