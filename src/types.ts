type CommandPaletteItemType = 'action' | 'page';

type CommandPaletteBaseItem = {
  id: string;
  name: string;
  selected?: boolean;
  type: CommandPaletteItemType;
};

type CommandPaletteButtonAction = CommandPaletteBaseItem & {
  type: 'action';
  url?: never;
  handler: () => void;
};

type CommandPaletteLinkAction = CommandPaletteBaseItem & {
  type: 'action';
  url: string;
  handler?: never;
};

export type CommandPaletteAction =
  | CommandPaletteButtonAction
  | CommandPaletteLinkAction;

export type CommandPalettePage = CommandPaletteBaseItem & {
  type: 'page';
  actions: CommandPaletteAction[];
};

export type CommandPaletteItem = CommandPaletteAction | CommandPalettePage;
