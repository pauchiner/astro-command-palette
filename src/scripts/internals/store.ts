class Store {
  private static instance: Store;
  private state: Record<string, unknown>;

  private readonly initialState = {
    items: [],
    currentRoute: '',
    currentItem: null
  };

  constructor() {
    this.state = this.initialState;
  }

  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  public setItem = (key: string, data: unknown) => {
    this.state[key] = data;
  };

  public getItem = (key: string) => {
    return this.state[key];
  };

  public clearItem = (key: string) => {
    delete this.state[key];
  };
}

export const defaultStore = new Store();

export default defaultStore;
