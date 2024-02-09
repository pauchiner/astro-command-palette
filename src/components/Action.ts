import type {CommandPaletteAction} from '../types';

class Action extends HTMLElement {
  private readonly handler: () => void;
  private readonly identifier: string;
  private readonly selected: string;
  private readonly text: string;

  constructor(action: CommandPaletteAction) {
    super();

    this.text = action.name;
    this.identifier = action.id;
    this.handler = action.handler;
    this.selected = String(action.selected ?? false);
  }

  private attachAttributes(component: HTMLElement) {
    component.id = this.identifier;
    component.setAttribute('data-selected', this.selected);
  }

  private attachStyles(component: HTMLElement) {
    component.innerHTML = `
      <style>
        command-palette-action {
          width: 100%;
          height: 3rem;
          display: flex;
          cursor: pointer;
          padding-left: 1rem;
          align-items: center;
          text-decoration: none;
        }
      </style>
    `;
    component.classList.add('command-palette-action');
  }

  private attachContent(component: HTMLElement) {
    const span = document.createElement('span');
    const text = document.createTextNode(this.text);
    span.appendChild(text);

    component.appendChild(span);
  }

  private attachHandler(component: HTMLElement) {
    component.addEventListener('click', this.handler);
  }

  createComponent() {
    const component = document.createElement(
      'command-palette-action'
    ) as HTMLElement;

    this.attachStyles(component);
    this.attachContent(component);
    this.attachHandler(component);
    this.attachAttributes(component);

    return component;
  }
}

customElements.define('command-palette-action', Action);

export default Action;
