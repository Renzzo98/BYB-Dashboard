fetch('/api/commits')
  .then(response => response.json())
  .then(commitMap => {
    const container = document.getElementById('heatmapContainer');
    const today = new Date();
    const ninetyDaysAgo = new Date(today);
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const NUM_WEEKS = 13;
    const GAP = 2;
    // Only render Mon (1), Wed (3), Fri (5)
    const VISIBLE_DAYS = [1, 3, 5];

    const containerWidth = container.parentElement.offsetWidth || 600;
    const cellSize = Math.floor((containerWidth - GAP * NUM_WEEKS) / NUM_WEEKS);

    // Start from the first Monday ON or AFTER 90 days ago
    const startDate = new Date(ninetyDaysAgo);
    const day = startDate.getDay();
    const daysUntilMonday = day === 1 ? 0 : day === 0 ? 1 : 8 - day;
    startDate.setDate(startDate.getDate() + daysUntilMonday);

    let currentMonth = -1;
    const monthLabels = [];

    const cells = document.createElement('div');
    cells.className = 'heatmap-cells';

    for (let i = 0; i < NUM_WEEKS; i++) {
      const weekStart = new Date(startDate);
      weekStart.setDate(weekStart.getDate() + i * 7);

      // Skip weeks where no visible days fall within the range
      const hasValidDay = VISIBLE_DAYS.some(d => {
        const date = new Date(weekStart);
        date.setDate(date.getDate() + d);
        return date >= ninetyDaysAgo && date <= today;
      });
      if (!hasValidDay) continue;

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

      for (const dayOfWeek of VISIBLE_DAYS) {
        const date = new Date(weekStart);
        date.setDate(date.getDate() + dayOfWeek);

        const cell = document.createElement('div');
        cell.className = 'heatmap-day';
        cell.style.width = cellSize + 'px';
        cell.style.height = cellSize + 'px';

        if (date > today || date < ninetyDaysAgo) {
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

