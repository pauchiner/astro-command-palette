type CommandPaletteItemType = 'action' | 'group';

interface CommandPaletteBaseItem {
  id: string;
  name: string;
  type: CommandPaletteItemType;
}

export type CommandPaletteAction = CommandPaletteBaseItem & {
  type: 'action';
  selected?: boolean;
  handler: () => void;
};

export type CommandPaletteGroup = CommandPaletteBaseItem & {
  type: 'group';
  actions: CommandPaletteAction[];
};

export type CommandPaletteItem = CommandPaletteAction | CommandPaletteGroup;
