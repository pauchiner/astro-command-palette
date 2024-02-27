class Store {
  private readonly initialState = {
    items: [],
    currentRoute: '',
    currentItem: null
  };

  constructor() {
    if (!window.___astro_command_palette___) {
      window.___astro_command_palette___ = this.initialState;
    }
  }

  public setItem = (key: string, data: unknown) => {
    try {
      window.___astro_command_palette___[key] = data;
    } catch {
      console.error(
        "Something has overwritten the object 'window._astroCommandPaletteStore' which is necessary to use the astro-command-palette"
      );
    }
  };

  public getItem = (key: string) => {
    try {
      return window.___astro_command_palette___[key];
    } catch {
      console.error(
        "Something has overwritten the object 'window._astroCommandPaletteStore' which is necessary to use the astro-command-palette"
      );
    }
  };

  public clearItem = (key: string) => {
    try {
      delete window.___astro_command_palette___[key];
    } catch {
      console.error(
        "Something has overwritten the object 'window._astroCommandPaletteStore' which is necessary to use the astro-command-palette"
      );
    }
  };
}

export const defaultStore = new Store();

export default defaultStore;
