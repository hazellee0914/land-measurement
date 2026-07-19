import './css/main.css';
import { HomePage, initHomePage } from './pages/HomePage';

const app = document.querySelector('#app');
// console.log(app);
// 오류 방지
if (!app) {
  throw new Error('#app 요소를 찾을 수 없습니다.');
}

app.innerHTML = HomePage(); // 먼저 화면을 만듦
initHomePage(); // 만들어진 버튼에 이벤트 연결
