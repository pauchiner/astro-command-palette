export interface CommandPalette {
  placeholder?: string;
  children: CommandPaletteItem[];
}

export interface CommandPaletteItem {
  id: string;
  children: string;
}

interface CommandPaletteAction extends CommandPaletteItem {
  selected?: boolean;
  href?: string;
}

interface CommandPaletteGroup extends CommandPaletteItem {
  actions: Action[];
}

export interface Action {
  id: string;
  action: () => void;
}
