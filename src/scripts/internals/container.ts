/**
 * Retrieves the command palette container element and its visibility status.
 * @returns An object containing the container element and a boolean indicating its visibility status.
 */
export const getContainer = () => {
  const container = document.querySelector(
    '#command-palette-container'
  ) as HTMLElement;

  const isVisible = Boolean(container.getAttribute('data-visible') ?? false);

  return {
    container,
    isVisible
  };
};
