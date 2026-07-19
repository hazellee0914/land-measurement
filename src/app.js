import './css/main.css';
import { HomePage } from './pages/HomePage';

const app = document.querySelector('#app');
// console.log(app);
// 오류 방지
if (!app) {
  throw new Error('#app 요소를 찾을 수 없습니다.');
}

app.innerHTML = HomePage();
