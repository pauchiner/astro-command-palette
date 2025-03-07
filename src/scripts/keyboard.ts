import {
  openCommandPalette,
  closeCommandPalette,
  hideCommandPalette
} from './command-palette';
import {getElements} from './internals/elements';
import {incrementItem, decrementItem, dispatchAction} from './internals/list';
import {renderItems} from './internals/render';
import store from './internals/store';

function handleKeystrokes(event: KeyboardEvent) {
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

  const pageUpPressed = event.key === 'PageUp';
  const pageDownPressed = event.key === 'PageDown';

  return {
    commandPressed,
    escapePressed,
    enterPressed,
    downPressed,
    upPressed,
    pageUpPressed,
    pageDownPressed
  };
}

export function handleKeyboard(event: KeyboardEvent) {
  const current = store.getCurrentRoute();

  const {commandPalette, input, isVisible} = getElements();
  const {
    commandPressed,
    escapePressed,
    enterPressed,
    downPressed,
    upPressed,
    pageDownPressed,
    pageUpPressed
  } = handleKeystrokes(event);

  if (!isVisible && commandPressed) openCommandPalette();
  if (isVisible && commandPressed) hideCommandPalette();

  if (isVisible && escapePressed) {
    if (current !== '') {
      store.setCurrentRoute('');
      input.value = '';
      renderItems();
      resetAnimation();
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
    if (pageUpPressed) {
      event.preventDefault();
      decrementItem(10);
    }
    if (pageDownPressed) {
      event.preventDefault();
      incrementItem(10);
    }
    if (enterPressed) {
      event.preventDefault();
      dispatchAction();
      resetAnimation();
    }
  }

  function resetAnimation() {
    commandPalette.style.animationName = 'none';
    requestAnimationFrame(() => {
      setTimeout(() => {
        commandPalette.style.animationName = '';
      }, 0);
    });
  }
}
