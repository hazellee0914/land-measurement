import { routes } from './routes.js';

export class Router {
  constructor(app) {
    this.app = app;

    this.render = this.render.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  start() {
    window.addEventListener('popstate', this.render);

    this.render();
  }

  navigate(path) {
    window.history.pushState({}, '', path);

    this.render();
  }

  render() {
    const path = window.location.pathname;

    const route = routes[path] || routes['/'];

    this.app.innerHTML = route.page();

    if (route.init) {
      route.init(this.navigate);
    }
  }
}
