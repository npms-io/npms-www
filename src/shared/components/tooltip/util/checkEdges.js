export default function checkEdges(tooltipEl) {
    const tooltipBounds = tooltipEl.getBoundingClientRect();
    const bodyBounds = document.body.getBoundingClientRect();

    if (tooltipBounds.left < 10) {
        tooltipEl.style.left = `${parseInt(tooltipEl.style.left, 10) + 10}px`;
    } else if (tooltipBounds.left + tooltipBounds.width > bodyBounds.width - 10) {
        tooltipEl.style.left = `${parseInt(tooltipEl.style.left, 10) - 10}px`;
    }

    if (tooltipBounds.top < 10) {
        tooltipEl.style.top = `${parseInt(tooltipEl.style.top, 10) + 10}px`;
    } else if (tooltipBounds.top + tooltipBounds.height > bodyBounds.height - 10) {
        tooltipEl.style.top = `${parseInt(tooltipEl.style.top, 10) - 10}px`;
    }
}
