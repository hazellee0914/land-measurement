import { HomePage, initHomePage } from './pages/HomePage.js';

import {
  MeasurementPage,
  initMeasurementPage,
} from './pages/MeasurementPage.js';

import { ResultPage, initResultPage } from './pages/ResultPage';

export const routes = {
  '/': {
    page: HomePage,
    init: initHomePage,
  },

  '/measurement': {
    page: MeasurementPage,
    init: initMeasurementPage,
  },

  '/result': {
    page: ResultPage,
    init: initResultPage,
  },
};
