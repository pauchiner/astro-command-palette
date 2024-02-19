import {setCurrentItem, getElements} from './internals';
import {closeCommandPalette} from './command-palette';

const useMouse = () => {
  const {actionItems, container} = getElements();

  const handleHover = (event: MouseEvent): void => {
    const isVisible = container.getAttribute('data-visible') === 'true';
    if (!isVisible) return;

    const target = event.target as HTMLElement;

    actionItems.forEach(({id}, index) => {
      if (target.id === id) setCurrentItem(index);
    });
  };

  const handleClick = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;

    if (target.id === 'command-palette-container') closeCommandPalette();
  };

  return {handleHover, handleClick};
};

export default useMouse;
