const EARTH_RADIUS = 6378137;

// 도(degree)를 라디안(radian)으로 바꾸는 함수
function toRadians(degree) {
  return (degree * Math.PI) / 180;
}

export function calculateArea(points) {
  if (points.length < 3) {
    return 0;
  }

  const referencePoint = points[0];

  // 평균 위도 구하기 : 모든 점의 위도를 더해서 평균을 구한다.
  const averageLatitude =
    points.reduce((sum, point) => sum + point.latitude, 0) / points.length;

  // 평균 위도를 라디안으로 변환
  const averageLatitudeRadians = toRadians(averageLatitude);

  // GPS를 미터 좌표로 바꾸기
  const meterPoints = points.map((point) => {
    // 경도 차이 계산
    const longitudeDifference = toRadians(
      point.longitude - referencePoint.longitude,
    );

    // 위도 차이도 계산
    const latitudeDifference = toRadians(
      point.latitude - referencePoint.latitude,
    );

    return {
      // x 좌표 계산 : 경도 차이를 실제 가로 거리(m)로 변환한다.
      x: EARTH_RADIUS * longitudeDifference * Math.cos(averageLatitudeRadians),
      y: EARTH_RADIUS * latitudeDifference,
    };
  });

  let area = 0;

  for (let index = 0; index < meterPoints.length; index += 1) {
    const currentPoint = meterPoints[index];
    const nextPoint = meterPoints[(index + 1) % meterPoints.length];

    area += currentPoint.x * nextPoint.y - nextPoint.x * currentPoint.y;
  }

  return Math.abs(area) / 2;
}

export function calculateCenter(points) {
  if (points.length === 0) {
    return null;
  }

  const total = points.reduce(
    (result, point) => ({
      latitude: result.latitude + point.latitude,
      longitude: result.longitude + point.longitude,
    }),
    {
      latitude: 0,
      longitude: 0,
    },
  );

  return {
    latitude: total.latitude / points.length,
    longitude: total.longitude / points.length,
  };
}
