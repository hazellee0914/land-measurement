const REVERSE_GEOCODING_URL = 'https://nominatim.openstreetmap.org/reverse';

const ADDRESS_SEARCH_URL = 'https://nominatim.openstreetmap.org/search';

export async function searchAddress(query) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  try {
    const searchParams = new URLSearchParams({
      query: trimmedQuery,
    });

    const response = await fetch(`/api/address-search?${searchParams}`);

    if (response.ok) {
      const data = await response.json();

      if (data.results?.length > 0) {
        return data.results;
      }
    }
  } catch (error) {
    console.warn(
      'VWorld 검색을 사용할 수 없어 OpenStreetMap으로 검색합니다.',
      error,
    );
  }

  // VWorld 결과가 없거나 요청이 실패하면 기존 검색 사용
  const searchParams = new URLSearchParams({
    format: 'jsonv2',
    q: trimmedQuery,
    addressdetails: '1',
    'accept-language': 'ko',
    countrycodes: 'kr',
    limit: '5',
  });

  const response = await fetch(`${ADDRESS_SEARCH_URL}?${searchParams}`);

  if (!response.ok) {
    throw new Error('주소를 검색할 수 없습니다.');
  }

  const results = await response.json();

  return results.map((result) => ({
    latitude: Number(result.lat),
    longitude: Number(result.lon),
    displayName: result.display_name,
  }));
}

function createShortAddress(address) {
  const addressParts = [
    address.state,
    address.city || address.county,
    address.town || address.municipality,
    address.village || address.hamlet || address.suburb,
    address.road,
    address.house_number,
  ];

  return addressParts.filter(Boolean).join(' ');
}

export async function getAddressFromPosition(position) {
  const searchParams = new URLSearchParams({
    format: 'jsonv2',
    lat: String(position.latitude),
    lon: String(position.longitude),
    addressdetails: '1',
    'accept-language': 'ko',
    layer: 'address',
  });

  const response = await fetch(`${REVERSE_GEOCODING_URL}?${searchParams}`);

  if (!response.ok) {
    throw new Error('주소 정보를 가져올 수 없습니다.');
  }

  const result = await response.json();

  return {
    shortAddress: createShortAddress(result.address ?? {}) || '주소 정보 없음',
    fullAddress: result.display_name ?? '주소 정보 없음',
  };
}
