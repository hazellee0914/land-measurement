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

  localStorage.setItem(
    SAVED_MEASUREMENTS_KEY,
    JSON.stringify(savedMeasurements),
  );

  return newMeasurement;
}
