const hx = (a, i) => Math.round(Math.min(1, Math.max(0, a[i])) * 255);
const accentRgba = (a, alpha) => `rgba(${hx(a, 0)},${hx(a, 1)},${hx(a, 2)},${alpha})`;
function buildPhotoSvg(ch) {
  const c1 = `rgb(${hx(ch.accent, 0)},${hx(ch.accent, 1)},${hx(ch.accent, 2)})`;
  const c2 = `rgb(${hx(ch.accent, 2)},${hx(ch.accent, 0)},${hx(ch.accent, 1)})`;
  const icons = {
    house: '<path d="M120 300 L350 150 L580 300 L580 470 L120 470 Z"/><path d="M120 300 L580 300"/><rect x="320" y="360" width="60" height="110"/><rect x="180" y="330" width="55" height="55"/><rect x="465" y="330" width="55" height="55"/><path d="M150 300 L150 175 L200 175 L200 220"/>',
    facade: '<rect x="130" y="120" width="440" height="360"/><path d="M130 190 H570 M130 260 H570 M130 330 H570 M130 400 H570"/><path d="M215 120 V480 M300 120 V480 M400 120 V480 M485 120 V480"/>',
    land: '<path d="M90 400 L230 260 L320 340 L430 200 L610 400 Z"/><circle cx="480" cy="180" r="42"/><path d="M90 430 H610"/>',
    interior: '<rect x="150" y="110" width="400" height="330"/><path d="M350 110 V440 M150 275 H550"/><path d="M400 340 q0 -55 60 -55" stroke-width="1.2"/><rect x="190" y="330" width="90" height="70" rx="4"/>',
    ridge: '<path d="M100 360 L260 250 L520 250 L600 340 L600 460 L100 460 Z"/><path d="M260 250 L260 460 M180 460 V400 L260 340"/><rect x="330" y="300" width="220" height="20"/>'
  };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 560"><defs><radialGradient id="a" cx="30%" cy="24%" r="75%"><stop offset="0" stop-color="${c1}" stop-opacity=".9"/><stop offset="1" stop-color="#0F1B2B" stop-opacity="0"/></radialGradient><radialGradient id="b" cx="78%" cy="88%" r="70%"><stop offset="0" stop-color="${c2}" stop-opacity=".55"/><stop offset="1" stop-color="#0F1B2B" stop-opacity="0"/></radialGradient></defs><rect width="700" height="560" fill="#0F1B2B"/><rect width="700" height="560" fill="url(#a)"/><rect width="700" height="560" fill="url(#b)"/><g fill="none" stroke="#EEF4F7" stroke-width="2" stroke-linejoin="round" opacity=".85">${icons[ch.icon || "house"] || icons.house}</g></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
export {
  accentRgba,
  buildPhotoSvg
};
