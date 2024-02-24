/**
 * Retrieves various elements related to the command palette.
 * @returns An object containing references: command palette container, the command palette element,
 * an array of action items, the input element, and a boolean indicating the visibility status of the container.
 */
export const getElements = () => {
  const container = document.querySelector(
    'astro-command-palette'
  ) as HTMLElement;

  const commandPalette = document.querySelector(
    'command-palette'
  ) as HTMLElement;

  const actionItems = [
    ...container.querySelectorAll('command-palette-action')
  ] as HTMLElement[];

  const getActionItemsVisible = () => {
    return actionItems.filter(item => {
      return window.getComputedStyle(item).display === 'flex';
    });
  };

  const input = container.querySelector(
    'command-palette-header input'
  ) as HTMLInputElement;

  const isVisible =
    container.getAttribute('data-visible') === 'true' ? true : false;

  return {
    getActionItemsVisible,
    commandPalette,
    actionItems,
    container,
    isVisible,
    input
  };
};
