export interface CommandPalette {
  placeholder?: string;
  children: CommandPaletteItem[];
}

export interface CommandPaletteItem {
  id: string;
  children: string;
}

interface CommandPaletteAction extends CommandPaletteItem {
  icon?: Element;
  selected?: boolean;
}

interface CommandPaletteGroup extends CommandPaletteItem {
  actions: Action[];
}

export interface CommandPaletteLinkAction extends CommandPaletteAction {
  href: string;
}

export interface CommandPaletteButtonAction extends CommandPaletteAction {
  onClick: () => void;
}
