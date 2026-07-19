export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigation.geolocation) {
      reject(new Error('이 브라우저는 위치 기능을 지원하지 않습니다.'));
      return;
    }

    navigation.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        reject(error);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      },
    );
  });
}
