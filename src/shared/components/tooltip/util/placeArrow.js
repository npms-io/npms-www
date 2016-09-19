import positions from 'positions';

const placementsMap = {
    tc: 'top center',
    bc: 'bottom center',
    cl: 'center right',
    cr: 'center left',
};

export default function placeArrow(tooltipEl, align) {
    const arrowEl = tooltipEl.querySelector('.tooltip-component-arrow');
    const targetEl = this.getRootDomNode();  // eslint-disable-line no-invalid-this

    const position = positions(arrowEl, placementsMap[align.points[0]], targetEl, placementsMap[align.points[1]]);

    if (align.points[0] === 'tc' || align.points[0] === 'bc') {
        arrowEl.style.top = '';
        arrowEl.style.left = `${position.left}px`;
    } else {
        arrowEl.style.top = `${position.top}px`;
        arrowEl.style.left = '';
    }
}
