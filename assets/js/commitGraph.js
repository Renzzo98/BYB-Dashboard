fetch('/api/commits')
  .then(response => response.json())
  .then(commitMap => {
    const container = document.getElementById('heatmapContainer');
    const today = new Date();
    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const NUM_WEEKS = 13;
    const GAP = 2;

    // Calculate cell size to fill the container width
    const containerWidth = container.parentElement.offsetWidth || 600;
    const cellSize = Math.floor((containerWidth - GAP * NUM_WEEKS) / NUM_WEEKS);

    const startDate = new Date(threeMonthsAgo);
    startDate.setDate(startDate.getDate() - startDate.getDay() + 1);

    let currentMonth = -1;
    const monthLabels = [];

    const cells = document.createElement('div');
    cells.className = 'heatmap-cells';

    for (let i = 0; i < NUM_WEEKS; i++) {
      const weekStart = new Date(startDate);
      weekStart.setDate(weekStart.getDate() + i * 7);

      if (weekStart.getMonth() !== currentMonth) {
        currentMonth = weekStart.getMonth();
        const monthLabel = document.createElement('div');
        monthLabel.className = 'heatmap-month-label';
        monthLabel.textContent = weekStart.toLocaleDateString('en-US', { month: 'short' });
        monthLabel.style.width = cellSize + 'px';
        monthLabels.push(monthLabel);
      } else {
        const empty = document.createElement('div');
        empty.style.width = cellSize + 'px';
        monthLabels.push(empty);
      }

      const week = document.createElement('div');
      week.className = 'heatmap-week';
      week.style.width = cellSize + 'px';

      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        const date = new Date(weekStart);
        date.setDate(date.getDate() + dayOfWeek);

        const cell = document.createElement('div');
        cell.className = 'heatmap-day';
        cell.style.width = cellSize + 'px';
        cell.style.height = cellSize + 'px';

        if (date > today || date < threeMonthsAgo) {
          cell.style.backgroundColor = 'transparent';
          cell.style.border = 'none';
        } else {
          const dateStr = date.toISOString().split('T')[0];
          const count = commitMap[dateStr] || 0;
          cell.style.backgroundColor = getHeatmapColor(count);
          cell.title = `${dateStr}: ${count} contribution${count !== 1 ? 's' : ''}`;

          cell.addEventListener('mouseenter', () => {
            const tooltip = document.createElement('div');
            tooltip.className = 'heatmap-tooltip';
            tooltip.textContent = cell.title;
            cell.appendChild(tooltip);
          });
          cell.addEventListener('mouseleave', () => {
            const tooltip = cell.querySelector('.heatmap-tooltip');
            if (tooltip) tooltip.remove();
          });
        }

        week.appendChild(cell);
      }
      cells.appendChild(week);
    }

    const monthRow = document.createElement('div');
    monthRow.className = 'heatmap-months';
    monthLabels.forEach(label => monthRow.appendChild(label));

    const heatmap = document.createElement('div');
    heatmap.className = 'heatmap-grid';
    heatmap.appendChild(monthRow);
    heatmap.appendChild(cells);

    const legend = document.createElement('div');
    legend.className = 'heatmap-legend';
    legend.innerHTML = `
      <span>Less</span>
      <div class="heatmap-legend-cell" style="background-color: #ebedf0; width:${cellSize}px; height:${cellSize}px;"></div>
      <div class="heatmap-legend-cell" style="background-color: #c6e48b; width:${cellSize}px; height:${cellSize}px;"></div>
      <div class="heatmap-legend-cell" style="background-color: #7bc96f; width:${cellSize}px; height:${cellSize}px;"></div>
      <div class="heatmap-legend-cell" style="background-color: #239a3b; width:${cellSize}px; height:${cellSize}px;"></div>
      <div class="heatmap-legend-cell" style="background-color: #196127; width:${cellSize}px; height:${cellSize}px;"></div>
      <span>More</span>
    `;
    heatmap.appendChild(legend);

    container.innerHTML = '';
    container.appendChild(heatmap);
  })
  .catch(error => {
    console.error('Error fetching commits:', error);
    document.getElementById('commitGraph').innerHTML = '<p>Unable to load contribution data</p>';
  });

function getHeatmapColor(count) {
  if (count === 0) return '#ebedf0';
  if (count <= 1) return '#c6e48b';
  if (count <= 3) return '#7bc96f';
  if (count <= 5) return '#239a3b';
  return '#196127';
}

