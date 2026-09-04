const VWORLD_ADDRESS_URL = 'https://api.vworld.kr/req/address';

async function requestVWorldAddress(address, type, referer) {
  const searchParams = new URLSearchParams({
    service: 'address',
    request: 'getcoord',
    version: '2.0',
    crs: 'epsg:4326',
    address,
    refine: 'true',
    simple: 'false',
    format: 'json',
    type,
    key: process.env.VWORLD_API_KEY,
  });

  const response = await fetch(`${VWORLD_ADDRESS_URL}?${searchParams}`, {
    headers: {
      Referer: referer,
    },
  });

  if (!response.ok) {
    throw new Error('VWorld 서버 요청에 실패했습니다.');
  }

  return response.json();
}

function createSearchResult(data) {
  const responseData = data.response;

  if (responseData?.status !== 'OK') {
    return null;
  }

  const point = responseData.result?.point;
  const refined = responseData.refined;

  if (!point) {
    return null;
  }

  return {
    latitude: Number(point.y),
    longitude: Number(point.x),
    displayName: refined?.text || responseData.input?.address || '검색한 주소',
  };
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    return response.status(405).json({
      message: '허용되지 않은 요청입니다.',
    });
  }

  const query = String(request.query.query ?? '').trim();

  if (!query) {
    return response.status(400).json({
      message: '검색할 주소를 입력해주세요.',
    });
  }

  if (!process.env.VWORLD_API_KEY) {
    return response.status(500).json({
      message: '주소 검색 인증키가 설정되지 않았습니다.',
    });
  }

  const host = request.headers.host;
  const referer = `https://${host}/`;

  try {
    // 지번 주소로 먼저 검색
    const parcelData = await requestVWorldAddress(query, 'PARCEL', referer);

    const parcelResult = createSearchResult(parcelData);

    if (parcelResult) {
      return response.status(200).json({
        results: [parcelResult],
      });
    }

    // 지번 검색 결과가 없으면 도로명 주소로 검색
    const roadData = await requestVWorldAddress(query, 'ROAD', referer);

    const roadResult = createSearchResult(roadData);

    return response.status(200).json({
      results: roadResult ? [roadResult] : [],
    });
  } catch (error) {
    console.error('VWorld 주소 검색 실패:', error);

    return response.status(500).json({
      message: '주소를 검색할 수 없습니다.',
    });
  }
}
