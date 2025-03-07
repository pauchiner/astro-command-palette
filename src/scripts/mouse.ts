import {hideCommandPalette} from './command-palette';
import {getElements} from './internals/elements';

export const handleClick = (event: MouseEvent): void => {
  const target = event.target as HTMLElement;
  const {backdrop} = getElements();

  if (target === backdrop) hideCommandPalette();
};
