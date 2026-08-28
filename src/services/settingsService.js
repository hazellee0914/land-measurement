const AREA_UNIT_KEY = 'area-unit';

export const AREA_UNIT = {
  BOTH: 'both',
  SQUARE_METER: 'square-meter',
};

// 선택한 설정을 저장(면적 단위 저장)
export function saveAreaUnit(areaUnit) {
  localStorage.setItem(AREA_UNIT_KEY, areaUnit);
}

// 저장했던 설정을 다시 가져옴 (면적 단위 가져오기)
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
