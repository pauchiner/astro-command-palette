import type {CommandPaletteItem} from '../../types';

interface State {
  currentRoute: string;
  currentItem: number | null;
  defaultPlaceholder: string;
  items: Array<CommandPaletteItem>;
}

let _defaultInstance: Store;

class Store {
  private state: State;

  private readonly initialState: State = {
    items: [],
    currentRoute: '',
    currentItem: null,
    defaultPlaceholder: ''
  };

  constructor() {
    this.state = this.initialState;
  }

  public static get instance(): Store {
    if (!_defaultInstance) {
      _defaultInstance = new Store();
    }
    return _defaultInstance;
  }

  public setItems = (items: Array<CommandPaletteItem>) => {
    this.state.items = items;
  };

  public getItems = () => this.state.items;

  public setCurrentRoute = (route: string) => {
    this.state.currentRoute = route;
  };

  public getCurrentRoute = () => this.state.currentRoute;

  public setCurrentItem = (current: number | null) => {
    this.state.currentItem = current;
  };

  public setDefaultPlaceholder = (value: string) => {
    this.state.defaultPlaceholder = value;
  };

  public getDefaultPlaceholder = () => {
    return this.state.defaultPlaceholder;
  };

  public getCurrentItem = () => {
    return this.state.currentItem;
  };
}

export const defaultStore = Store.instance;

export default defaultStore;
