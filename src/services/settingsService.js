const AREA_UNIT_KEY = 'area-unit';

export const AREA_UNIT = {
  BOTH: 'both',
  SQUARE_METER: 'square-meter',
};

// 면적 표시 단위를 저장하는 함수
export function saveAreaUnit(areaUnit) {
  localStorage.setItem(AREA_UNIT_KEY, areaUnit);
}

export function getAreaUnit() {
  const savedAreaUnit = localStorage.getItem(AREA_UNIT_KEY);

  if (
    savedAreaUnit === AREA_UNIT.BOTH ||
    savedAreaUnit === AREA_UNIT.SQUARE_METER
  ) {
    return savedAreaUnit;
  }

  return AREA_UNIT.BOTH;
}
