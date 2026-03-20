const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let lastSeconds = null;

function buildClock() {
    const clockElement = document.getElementById('clock');
    if (!clockElement) return;

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const nextSec = String((parseInt(seconds) + 1) % 60).padStart(2, '0');
    const dayName = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];

    clockElement.innerHTML = `
        <div class="clock-time">
            <span class="clock-hours">${hours}</span>
            <span class="clock-colon">:</span>
            <span class="clock-minutes">${minutes}</span>
        </div>
        <div class="clock-meta">
            <div class="clock-date">
                <span class="clock-day">${dayName},</span>
                <span class="clock-month"> ${date} ${month}</span>
            </div>
            <div class="scroll-seconds">
                <div class="scroll-drum" id="scroll-drum">
                    <div class="scroll-item">${seconds}</div>
                    <div class="scroll-item">${nextSec}</div>
                </div>
            </div>
        </div>
    `;

    lastSeconds = seconds;
}

function updateClock() {
    const now = new Date();
    const seconds = String(now.getSeconds()).padStart(2, '0');

    if (seconds === lastSeconds) return;
    lastSeconds = seconds;

    const drum = document.getElementById('scroll-drum');
    if (!drum) { buildClock(); return; }

    // Update hours/minutes
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const hoursEl = document.querySelector('.clock-hours');
    const minutesEl = document.querySelector('.clock-minutes');
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;

    // Scroll seconds animation
    const itemHeight = drum.querySelector('.scroll-item').offsetHeight;
    const nextNextSec = String((parseInt(seconds) + 1) % 60).padStart(2, '0');

    // Add incoming item at bottom
    const newItem = document.createElement('div');
    newItem.className = 'scroll-item';
    newItem.textContent = nextNextSec;
    drum.appendChild(newItem);

    // Animate scroll up
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            drum.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            drum.style.transform = `translateY(-${itemHeight}px)`;
        });
    });

    // After animation: reset and remove old item
    setTimeout(() => {
        drum.style.transition = 'none';
        drum.style.transform = 'translateY(0)';
        drum.firstElementChild.remove();
    }, 450);
}

buildClock();
setInterval(updateClock, 1000);
