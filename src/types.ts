type CommandPaletteItemType = 'action' | 'group';

type CommandPaletteBaseItem = {
  id: string;
  name: string;
  type: CommandPaletteItemType;
};

type CommandPaletteButtonAction = CommandPaletteBaseItem & {
  type: 'action';
  selected?: boolean;
  url?: never;
  handler: () => void;
};

type CommandPaletteLinkAction = CommandPaletteBaseItem & {
  type: 'action';
  selected?: boolean;
  url: string;
  handler?: never;
};

export type CommandPaletteAction =
  | CommandPaletteButtonAction
  | CommandPaletteLinkAction;

export type CommandPaletteGroup = CommandPaletteBaseItem & {
  type: 'group';
  actions: CommandPaletteAction[];
};

export type CommandPaletteItem = CommandPaletteAction | CommandPaletteGroup;
