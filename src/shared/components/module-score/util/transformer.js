import ColourMeLife from 'colour-me-life';
import range from 'lodash/range';

const gradient = new ColourMeLife()
    .setSpectrum('#6e4b46', '#9e6b64', '#1ac391')
    .setNumberRange(0, 1);

const colors = range(101).map((index) => gradient.colourAt(index / 100));

export function getText(score) {
    return Math.round(score * 100);
}

export function getColor(score) {
    return `#${colors[Math.round(score * 100)]}`;
}

export default { getText, getColor };
