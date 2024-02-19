/**
 * Retrieves various elements related to the command palette.
 * @returns An object containing references: command palette container, the command palette element,
 * an array of action items, the input element, and a boolean indicating the visibility status of the container.
 */
export const getElements = () => {
  const container = document.querySelector(
    '#command-palette-container'
  ) as HTMLElement;

  const commandPalette = document.querySelector(
    '#command-palette'
  ) as HTMLElement;

  const actionItems = [
    ...container.querySelectorAll('.command-palette-action')
  ] as HTMLButtonElement[];

  const input = container.querySelector(
    '#command-palette-input'
  ) as HTMLInputElement;

  const isVisible =
    container.getAttribute('data-visible') === 'true' ? true : false;

  return {
    commandPalette,
    actionItems,
    container,
    isVisible,
    input
  };
};
