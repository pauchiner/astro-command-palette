import {store, renderItems, getElements} from '.';

const setRoute = (route: string) => {
  const {input} = getElements();

  store.setCurrentRoute(route);
  input.value = '';
  renderItems();
};

export const getCurrentRoute = () => {
  return store.getCurrentRoute();
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
