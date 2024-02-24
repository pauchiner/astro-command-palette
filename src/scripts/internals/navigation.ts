import {renderItems} from './render';
import store from './store';

const STORAGE_KEY = 'currentRoute';

const setRoute = (route: string) => {
  store.setItem(STORAGE_KEY, route);
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
  const current = getCurrentRoute();

  if (current === '') {
    setRoute(route);
    return;
  }

  setRoute(`${current}/${route}`);
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
