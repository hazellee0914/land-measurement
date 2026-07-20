import { HomePage, initHomePage } from './pages/HomePage.js';

import { MeasurementPage } from './pages/MeasurementPage.js';

export const routes = {
  '/': {
    page: HomePage,
    init: initHomePage,
  },

  '/measurement': {
    page: MeasurementPage,
  },
};
