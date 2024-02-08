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
}

interface CommandPaletteGroup extends CommandPaletteItem {
  actions: Action[];
}

export interface CommandPaletteLinkAction extends CommandPaletteAction {
  href: string;
}

export interface CommandPaletteButtonAction extends CommandPaletteAction { }

export interface Action {
  id: string;
  action: () => void;
}
