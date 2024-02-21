type CommandPaletteItemType = 'action' | 'page';

type CommandPaletteBaseItem = {
  id: string;
  name: string;
  type: CommandPaletteItemType;
};

type CommandPaletteButtonAction = CommandPaletteBaseItem & {
  type: 'action';
  selected?: boolean;
  url?: never;
  page?: never;
  handler: () => void;
};

type CommandPaletteLinkAction = CommandPaletteBaseItem & {
  type: 'action';
  selected?: boolean;
  url: string;
  page?: never;
  handler?: never;
};

type CommandPalettePageAction = CommandPaletteBaseItem & {
  type: 'action';
  selected?: boolean;
  url?: never;
  page: string;
  handler?: never;
};

export type CommandPaletteAction =
  | CommandPaletteButtonAction
  | CommandPaletteLinkAction
  | CommandPalettePageAction;

export type CommandPalettePage = CommandPaletteBaseItem & {
  type: 'page';
  actions: CommandPaletteAction[];
};

export type CommandPaletteItem = CommandPaletteAction | CommandPalettePage;
