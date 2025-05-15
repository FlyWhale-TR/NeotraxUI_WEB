document.querySelector('.NUI-control-range').addEventListener('input', (e) => {
    const range = e.target;
    const percent1 = (range.value - range.min) / (range.max - range.min);
    range.style.setProperty('--track-width', `${percent1 * 100}%`);
});