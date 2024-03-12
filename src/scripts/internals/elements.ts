/**
 * Retrieves various elements related to the command palette.
 * @returns An object containing references: command palette container, the command palette element,
 * an array of action items, the input element, and a boolean indicating the visibility status of the container.
 */
export const getElements = (mockDocument?: HTMLDivElement) => {
  const current = mockDocument ?? document;

  const container = current.querySelector(
    'astro-command-palette'
  ) as HTMLElement;

  const commandPalette = current.querySelector(
    'command-palette'
  ) as HTMLElement;

  const listToAttach = current.querySelector(
    'command-palette-items'
  ) as HTMLDivElement;

  const backdrop = current.querySelector(
    'command-palette-backdrop'
  ) as HTMLDivElement;

  const items = [
    ...container.querySelectorAll('command-palette-item')
  ] as HTMLElement[];

  // TODO: add tests to this function
  const getItemsVisible = () => {
    return items.filter(item => {
      return window.getComputedStyle(item).display === 'flex';
    });
  };

  const input = container.querySelector(
    'command-palette-header input'
  ) as HTMLInputElement;

  const isVisible =
    container.getAttribute('data-visible') === 'true' ? true : false;

  return {
    getItemsVisible,
    commandPalette,
    listToAttach,
    backdrop,
    items,
    container,
    isVisible,
    input
  };
};
