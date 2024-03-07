class Store {
  private readonly initialState = {
    items: [],
    currentRoute: '',
    currentItem: null
  };

  constructor() {
    if (!window.AstroCommandPalette) {
      window.AstroCommandPalette = this.initialState;
    }
  }

  public setItem = (key: string, data: unknown) => {
    try {
      window.AstroCommandPalette[key] = data;
    } catch {
      console.error(
        "Something has overwritten the object 'window.AstroCommandPalette' which is necessary to use the astro-command-palette"
      );
    }
  };

  public getItem = (key: string) => {
    try {
      return window.AstroCommandPalette[key];
    } catch {
      console.error(
        "Something has overwritten the object 'window.AstroCommandPalette' which is necessary to use the astro-command-palette"
      );
    }
  };

  public clearItem = (key: string) => {
    try {
      delete window.AstroCommandPalette[key];
    } catch {
      console.error(
        "Something has overwritten the object 'window.AstroCommandPalette' which is necessary to use the astro-command-palette"
      );
    }
  };
}

export const defaultStore = new Store();

export default defaultStore;
