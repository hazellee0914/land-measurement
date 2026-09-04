import { HomePage, initHomePage } from './pages/HomePage.js';
import {
  SavedDetailPage,
  initSavedDetailPage,
} from './pages/SavedDetailPage.js';

import {
  MeasurementPage,
  initMeasurementPage,
} from './pages/MeasurementPage.js';

import { ResultPage, initResultPage } from './pages/ResultPage';

import { SavedPage, initSavedPage } from './pages/SavedPage.js';

import { SettingsPage, initSettingsPage } from './pages/SettingsPage.js';

import {
  AddressSearchPage,
  initAddressSearchPage,
} from './pages/AddressSearchPage.js';

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

  '/saved': {
    page: SavedPage,
    init: initSavedPage,
  },

  '/settings': {
    page: SettingsPage,
    init: initSettingsPage,
  },

  '/saved-detail': {
    page: SavedDetailPage,
    init: initSavedDetailPage,
  },
  '/address-search': {
    page: AddressSearchPage,
    init: initAddressSearchPage,
  },
};
