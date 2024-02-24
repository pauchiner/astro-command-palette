import {getElements, setCurrentItem} from '.';
import type {CommandPaletteItem, CommandPalettePage} from '../../types';
import {closeCommandPalette} from '../command-palette';
import {getCurrentRoute, navigate} from './navigation';
import store from './store';

export const renderItems = () => {
  const items = store.getItem('items') as CommandPaletteItem[];
  const {listToAttach} = getElements();
  const current = getCurrentRoute();

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

  console.info(
    `astro-command-palette: ${itemsToRender.length} items rendered.`
  );

  setCurrentItem(0);
};

const dispatchItemEvent = (item: CommandPaletteItem) => {
  const element = document.querySelector(`#${item.id}`);
  if (!(element instanceof HTMLElement)) {
    console.error(
      "astro-command-palette: The item can't be event dispatched because is undefined"
    );
    return;
  }

  if (item.type === 'page') {
    element.addEventListener('click', () => navigate(item.id));
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

  component.id = item.id;
  component.setAttribute('data-selected', (item.selected ?? false).toString());

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
