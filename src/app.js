import './css/main.css';
import { Router } from './Router.js';
import { registerSW } from 'virtual:pwa-register';

registerSW({
  immediate: true,

  onOfflineReady() {
    console.log('앱을 오프라인에서도 사용할 준비가 되었습니다.');
  },

  onNeedRefresh() {
    console.log('새로운 버전이 준비되었습니다.');
  },
});

const app = document.querySelector('#app');

if (!app) {
  throw new Error('#app 요소를 찾을 수 없습니다.');
}

const router = new Router(app);

router.start();
