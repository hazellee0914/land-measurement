const POSITION_KEY = 'measurement-position';

export function savePosition(position) {
  sessionStorage.setItem(POSITION_KEY, JSON.stringify(position));
}

export function getPosition() {
  const position = sessionStorage.getItem(POSITION_KEY);
  if (!position) {
    return null;
  }
  return JSON.parse(position);
}
