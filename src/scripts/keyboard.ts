import {
  openCommandPalette,
  closeCommandPalette,
  hideCommandPalette
} from './command-palette';
import {
  getCurrentRoute,
  goBack,
  incrementItem,
  dispatchAction,
  decrementItem,
  getElements
} from './internals';

const handleKeystrokes = (event: KeyboardEvent) => {
  /*
   * The main shortcut to open a close the command palette.
   * @returns if the keybinding is pressed
   */
  const commandPressed = event.metaKey && event.key === 'k';

  /*
   * The shortcut to close the command palette or exit from a submenu.
   * @returns if the keybinding is pressed
   */
  const escapePressed = event.key === 'Escape';

  /*
   * The shortcut to run an action inside the command palette.
   * @returns if the keybinding is pressed
   */
  const enterPressed = event.key === 'Enter';

  /*
   * The shortcut to move down between actions inside the command palette.
   * @returns if the keybinding is pressed
   */
  const downPressed =
    event.key === 'ArrowDown' || (!event.shiftKey && event.key === 'Tab');

  /*
   * The shortcut to move up between actions inside the command palette.
   * @returns if the keybinding is pressed
   */
  const upPressed =
    event.key === 'ArrowUp' || (event.shiftKey && event.key === 'Tab');

  return {
    commandPressed,
    escapePressed,
    enterPressed,
    downPressed,
    upPressed
  };
};

export const handleKeyboard = (event: KeyboardEvent) => {
  const current = getCurrentRoute();

  const {input, isVisible} = getElements();
  const {commandPressed, escapePressed, enterPressed, downPressed, upPressed} =
    handleKeystrokes(event);

  if (!isVisible && commandPressed) openCommandPalette();
  if (isVisible && commandPressed) hideCommandPalette();

  if (isVisible && escapePressed) {
    if (current !== '') {
      input.value = '';
      goBack();
      return;
    }
    closeCommandPalette();
  }

  if (isVisible) {
    if (downPressed) {
      event.preventDefault();
      incrementItem();
    }
    if (upPressed) {
      event.preventDefault();
      decrementItem();
    }
    if (enterPressed) {
      event.preventDefault();
      dispatchAction();
    }
  }
};
