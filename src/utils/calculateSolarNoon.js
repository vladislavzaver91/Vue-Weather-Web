export function calculateSolarNoon(sunrise, sunset) {
  const solarNoonTimestamp = (sunrise + sunset) / 2
  const formatter = new Intl.DateTimeFormat('default', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return formatter.format(new Date(solarNoonTimestamp))
}
