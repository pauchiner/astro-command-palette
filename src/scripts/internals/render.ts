import {store, getElements, setCurrentItem} from '.';
import type {CommandPaletteItem, CommandPalettePage} from '../../types';
import {closeCommandPalette} from '../command-palette';

export const renderItems = () => {
  const defaultPlaceholder = store.getDefaultPlaceholder();
  const {listToAttach, input} = getElements();
  const current = store.getCurrentRoute();
  const items = store.getItems();

  if (defaultPlaceholder === '') store.setDefaultPlaceholder(input.placeholder);
  listToAttach.innerText = '';

  let itemsToRender = items;
  if (current !== '') {
    const page = items.filter(
      item => item.id === current
    )[0] as CommandPalettePage;

    itemsToRender = page.actions;
    input.placeholder = page.name;
  } else {
    if (defaultPlaceholder !== '') input.placeholder = defaultPlaceholder;
  }

  itemsToRender.forEach(item => {
    const component = createCommandPaletteItem(item);
    listToAttach.append(component);
    dispatchItemEvent(item);
  });

  setCurrentItem(0);
};

const dispatchItemEvent = (item: CommandPaletteItem) => {
  const element = document.querySelector(
    `command-palette-item[data-items-uid="${item.id}"]`
  );
  if (!(element instanceof HTMLElement)) {
    console.error(
      "astro-command-palette: The item can't be event dispatched because is undefined"
    );
    return;
  }

  if (item.type === 'page') {
    element.addEventListener('click', () => {
      const {input} = getElements();
      store.setCurrentRoute(item.id);
      input.value = '';
      renderItems();
    });
    return;
  }

  if (item.handler)
    element.addEventListener('click', () => {
      item.handler();
      closeCommandPalette();
    });

  if (item.url)
    element.addEventListener('click', () => {
      window.open(item.url, '_blank', 'noopener nofollow');
      closeCommandPalette();
    });
};

const createCommandPaletteItem = (item: CommandPaletteItem) => {
  const component = document.createElement('command-palette-item');

  component.setAttribute('data-selected', (item.selected ?? false).toString());
  component.setAttribute('data-items-uid', item.id);

  if (item.icon) {
    const icon = document.createElement('astro-command-palette-icon');
    icon.style.color = 'var(--command-palette-icons-color)';
    icon.style.marginRight = '8px';
    icon.style.height = '20px';
    icon.style.width = '20px';
    icon.innerHTML = item.icon;
    component.appendChild(icon);
  }

  const span = document.createElement('span');
  const text = document.createTextNode(item.name);
  span.appendChild(text);
  component.appendChild(span);

  return component;
};
