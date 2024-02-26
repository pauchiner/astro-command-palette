import {store, renderItems, getElements} from '.';

const STORAGE_KEY = 'currentRoute';

const setRoute = (route: string) => {
  const {input} = getElements();

  store.setItem(STORAGE_KEY, route);
  input.value = '';
  renderItems();
};

export const getCurrentRoute = () => {
  try {
    const current = store.getItem(STORAGE_KEY);
    return String(current) ?? '';
  } catch {
    return '';
  }
};

export const navigate = (route: string) => {
  setRoute(route);
};

export const goBack = () => {
  const current = getCurrentRoute();

  if (current === '') {
    return;
  }

  if (!current.includes('/')) {
    setRoute('');
    return;
  }

  const routes = current.split('/');
  routes.pop();

  setRoute(routes.join('/'));
};
