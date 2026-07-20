import './css/main.css';
import { Router } from './Router.js';

const app = document.querySelector('#app');

if (!app) {
  throw new Error('#app 요소를 찾을 수 없습니다.');
}

const router = new Router(app);

router.start();
