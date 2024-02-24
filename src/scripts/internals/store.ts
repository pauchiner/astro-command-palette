class Store {
  constructor() {
    if (!window._astroCommandPaletteStore) {
      window._astroCommandPaletteStore = {};
      window._astroCommandPaletteStore.currentRoute = '';
    }
  }

  public setItem = (key: string, data: unknown) => {
    try {
      window._astroCommandPaletteStore[key] = data;
    } catch {
      console.error(
        "Something has overwritten the object 'window._astroCommandPaletteStore' which is necessary to use the astro-command-palette"
      );
    }
  };

  public getItem = (key: string) => {
    try {
      return window._astroCommandPaletteStore[key];
    } catch {
      console.error(
        "Something has overwritten the object 'window._astroCommandPaletteStore' which is necessary to use the astro-command-palette"
      );
    }
  };

  public clearItem = (key: string) => {
    try {
      delete window._astroCommandPaletteStore[key];
    } catch {
      console.error(
        "Something has overwritten the object 'window._astroCommandPaletteStore' which is necessary to use the astro-command-palette"
      );
    }
  };
}

export const defaultStore = new Store();

export default defaultStore;
