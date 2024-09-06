import { useStorage } from '@vueuse/core';

export function baseStorage() {
  const selectedUnit = useStorage('selectedUnit', 'metric');
  const weight = useStorage('weight', '');
  const wakeUpTime = useStorage('wakeUpTime', '09:00');
  const sleepTime = useStorage('sleepTime', '21:00');

  return {
    selectedUnit,
    weight,
    wakeUpTime,
    sleepTime
  };
}
