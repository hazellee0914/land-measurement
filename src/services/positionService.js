const POSITION_KEY = 'measurement-position';

export function savePosition(position) {
  // position 객체를 문자열로 변환한다.
  sessionStorage.setItem(POSITION_KEY, JSON.stringify(position));
  // sessionStorage에 POSITION_KEY로 저장한다.
}

export function getPosition() {
  // sessionStorage에서 POSITION_KEY 값을 가져온다.
  const position = sessionStorage.getItem(POSITION_KEY);
  // 값이 없으면 null을 반환한다.
  if (!position) {
    return null;
  }
  // 값이 있으면 객체로 변환해서 반환한다.
  return JSON.parse(position);
}
