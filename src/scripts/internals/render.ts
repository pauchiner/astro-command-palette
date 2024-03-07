import {store, getElements} from '.';
import type {CommandPaletteItem, CommandPalettePage} from '../../types';
import {closeCommandPalette} from '../command-palette';

interface MockOptions {
  currentRoute?: string;
  listToAttach?: HTMLDivElement;
  items?: Array<CommandPaletteItem>;
}

const getItems = (mockItems?: Array<CommandPaletteItem>) => {
  if (mockItems) {
    return mockItems;
  } else {
    return store.getItems();
  }
};

const getListToAttach = (mockListToAttach?: HTMLDivElement) => {
  if (mockListToAttach) {
    return mockListToAttach;
  } else {
    const {listToAttach} = getElements();
    return listToAttach;
  }
};

const getCurrentRoute = (mockCurrentRoute?: string) => {
  if (mockCurrentRoute) {
    return mockCurrentRoute;
  } else {
    return store.getCurrentRoute();
  }
};
export const renderItems = (mockData?: MockOptions) => {
  const listToAttach = getListToAttach(mockData?.listToAttach);
  const current = getCurrentRoute(mockData?.currentRoute);
  const items = getItems(mockData?.items);

  listToAttach.innerText = '';

  let itemsToRender = items;
  if (current !== '') {
    const page = items.filter(
      item => item.id === current
    )[0] as CommandPalettePage;

    itemsToRender = page.actions;
  }

  itemsToRender.forEach(item => {
    const component = createCommandPaletteItem(item);
    listToAttach.append(component);
    dispatchItemEvent(item);
  });

  /*
  console.info(
    `astro-command-palette: ${itemsToRender.length} items rendered.`
  );
  */
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
  const component = document.createElement(
    'command-palette-item'
  ) as HTMLElement;

  component.setAttribute('data-selected', (item.selected ?? false).toString());
  component.setAttribute('data-items-uid', item.id);

  component.innerHTML = `
    <style>
      command-palette-item {
        width: 100%;
        height: 3rem;
        display: flex;
        padding-left: 1rem;
        align-items: center;
        text-decoration: none;
      }
    </style>
  `;

  const span = document.createElement('span');
  const text = document.createTextNode(item.name);
  span.appendChild(text);
  component.appendChild(span);

  return component;
};
