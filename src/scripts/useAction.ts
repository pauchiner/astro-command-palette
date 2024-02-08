import type { Action } from '../types';

export const useCommandPaletteAction = (
  id: string,
  action: () => void
): void => {
  const commandPalette = document.querySelector(
    '#command-palette'
  ) as HTMLDivElement;

  const actionButton = commandPalette.querySelector(
    `#${id}`
  ) as HTMLButtonElement;

  actionButton.addEventListener('click', action);
};

export const useCommandPaletteActions = (actions: Action[]) => {
  actions.forEach(action => {
    useCommandPaletteAction(action.id, action.action);
  });
};

export default useCommandPaletteActions;
