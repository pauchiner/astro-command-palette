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

export type CommandPaletteActionProps =
  | Omit<CommandPaletteButtonAction, 'id'>
  | Omit<CommandPaletteLinkAction, 'id'>;

type CommandPalettePageProps = Omit<CommandPaletteBaseItem, 'id'> & {
  type: 'page';
  actions: CommandPaletteActionProps[];
};

export type CommandPaletteItemProps =
  | CommandPaletteActionProps
  | CommandPalettePageProps;
