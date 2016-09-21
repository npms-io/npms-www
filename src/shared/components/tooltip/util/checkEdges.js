export default function checkEdges(tooltipEl) {
    const bodyBounds = document.body.getBoundingClientRect();
    const bounds = tooltipEl.getBoundingClientRect();
    const cssPosition = {
        top: parseFloat(tooltipEl.style.top),
        left: parseFloat(tooltipEl.style.left),
    };

    if (bounds.left < 10) {
        tooltipEl.style.left = `${cssPosition.left + 10 - bounds.left}px`;
    } else if (bounds.left + bounds.width > bodyBounds.width - 10) {
        tooltipEl.style.left = `${cssPosition.left - 10 + (bodyBounds.width - bounds.left - bounds.width)}px`;
    }

    if (bounds.top < 10) {
        tooltipEl.style.top = `${cssPosition.top + 10 - bounds.top}px`;
    } else if (bounds.top + bounds.height > bodyBounds.height - 10) {
        tooltipEl.style.top = `${cssPosition.top - 10 + (bounds.top + bounds.height - bodyBounds.height)}px`;
    }
}
