const BOUNDARY_POINTS_KEY = 'measurement-boundary-points';

export function saveBoundaryPoints(points) {
  sessionStorage.setItem(BOUNDARY_POINTS_KEY, JSON.stringify(points));
}

export function getBoundaryPoints() {
  const points = sessionStorage.getItem(BOUNDARY_POINTS_KEY);

  if (!points) {
    return [];
  }

  return JSON.parse(points);
}

export function clearBoundaryPoints() {
  sessionStorage.removeItem(BOUNDARY_POINTS_KEY);
}
