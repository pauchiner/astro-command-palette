import type {CommandPaletteAction} from '../types';

const createActionItem = (item: CommandPaletteAction) => {
  const component = document.createElement(
    'command-palette-action'
  ) as HTMLElement;

  component.id = item.id;
  component.setAttribute('data-selected', (item.selected ?? false).toString());

  component.innerHTML = `
    <style>
      command-palette-action {
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

export default createActionItem;
