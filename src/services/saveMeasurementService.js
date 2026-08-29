const SAVED_MEASUREMENTS_KEY = 'saved-measurements';

export function getSavedMeasurements() {
  const savedMeasurements = localStorage.getItem(SAVED_MEASUREMENTS_KEY);

  if (!savedMeasurements) {
    return [];
  }

  return JSON.parse(savedMeasurements);
}

export function saveMeasurement(measurement) {
  const savedMeasurements = getSavedMeasurements();

  const newMeasurement = {
    id: Date.now(),
    savedAt: new Date().toISOString(),
    ...measurement,
  };

  savedMeasurements.unshift(newMeasurement);

  const limitedMeasurements = savedMeasurements.slice(0, 20);

  localStorage.setItem(
    SAVED_MEASUREMENTS_KEY,
    JSON.stringify(limitedMeasurements),
  );

  return newMeasurement;
}

export function clearSavedMeasurements() {
  localStorage.removeItem(SAVED_MEASUREMENTS_KEY);
}

export function deleteSavedMeasurement(measurementId) {
  const savedMeasurements = getSavedMeasurements();

  const remainingMeasurements = savedMeasurements.filter(
    (measurement) => measurement.id !== measurementId,
  );

  localStorage.setItem(
    SAVED_MEASUREMENTS_KEY,
    JSON.stringify(remainingMeasurements),
  );
}

// ID 결과 찾는 함수 추가
export function getSavedMeasurementById(measurementId) {
  const savedMeasurements = getSavedMeasurements();

  return (
    savedMeasurements.find((measurement) => measurement.id === measurementId) ??
    null
  );
}
