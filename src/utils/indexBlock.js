export function getAirPollutionColor(level) {
  const pollutionLevels = [
    '#00FF00', // 1 - Очень хороший
    '#FFFF00', // 2 - Хороший
    '#FF8000', // 3 - Умеренный
    '#FF0000', // 4 - Плохой
    '#800000', // 5 - Очень плохой
  ]
  return pollutionLevels[level - 1] || '#00FF00'
}

export function getUVIndexColor(index) {
  const uvColors = [
    '#00FF00', // 1-2 (низкий)
    '#FFFF00', // 3-5 (умеренный)
    '#FFA500', // 6-7 (высокий)
    '#FF4500', // 8-10 (очень высокий)
    '#800080', // 11+ (экстремальный)
  ]
  if (index <= 2) return uvColors[0]
  if (index <= 5) return uvColors[1]
  if (index <= 7) return uvColors[2]
  if (index <= 10) return uvColors[3]
  return uvColors[4]
}
