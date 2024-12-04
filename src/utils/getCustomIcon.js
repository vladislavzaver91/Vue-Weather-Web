export function getCustomIcon(icon) {
  return new URL(`/src/assets/images/${icon}.png`, import.meta.url).href
}
