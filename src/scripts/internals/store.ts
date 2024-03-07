import type {CommandPaletteItem} from '../../types';

interface State {
  currentRoute: string;
  currentItem: number | null;
  items: Array<CommandPaletteItem>;
}

class Store {
  private static instance: Store;
  private state: State;

  private readonly initialState: State = {
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

  public setItems = (items: Array<CommandPaletteItem>) => {
    this.state.items = items;
  };

  public getItems = () => {
    return this.state.items;
  };

  public setCurrentRoute = (route: string) => {
    this.state.currentRoute = route;
  };

  public getCurrentRoute = () => {
    return this.state.currentRoute;
  };

  public setCurrentItem = (current: number | null) => {
    this.state.currentItem = current;
  };

  public getCurrentItem = () => {
    return this.state.currentItem;
  };
}

export const defaultStore = Store.getInstance();

export default defaultStore;
