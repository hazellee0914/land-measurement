const REVERSE_GEOCODING_URL = 'https://nominatim.openstreetmap.org/reverse';

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
