import {closeCommandPalette} from './command-palette';

export const handleClick = (event: MouseEvent): void => {
  const target = event.target as HTMLElement;

  if (target.id === 'command-palette-container') closeCommandPalette();
};
