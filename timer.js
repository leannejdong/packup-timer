let totalSeconds = 5 * 60;
let remaining = totalSeconds;
let timerId = null;
let running = false;
let audioCtx = null;

const clockEl = document.getElementById('clock');
const statusLabel = document.getElementById('statusLabel');
const doneMsg = document.getElementById('doneMsg');
const tint = document.getElementById('tint');
const catImg = document.getElementById('catImg');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const presetBtns = document.querySelectorAll('.presets button');
const fsBtn = document.getElementById('fsBtn');

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
}

function render() {
  clockEl.textContent = formatTime(remaining);
  clockEl.classList.remove('warn', 'danger');

  const pct = remaining / totalSeconds;

  if (remaining <= 10 && remaining > 0) {
    clockEl.classList.add('danger');
    tint.style.background = 'rgba(180,20,20,0.28)';
    statusLabel.textContent = 'Almost out of time!';
  } else if (pct <= 0.34) {
    clockEl.classList.add('warn');
    tint.style.background = 'rgba(255,140,0,0.16)';
    statusLabel.textContent = 'Wrap it up';
  } else {
    tint.style.background = 'rgba(0,0,0,0)';
    statusLabel.textContent = 'Pack-up time';
  }

  catImg.style.filter = pct <= 0.34 ? 'saturate(1.25) contrast(1.08)' : 'saturate(1.05) contrast(1.02)';
}

function tick() {
  if (remaining <= 0) {
    stop();
    doneMsg.classList.add('show');
    statusLabel.textContent = "Time's up!";
    playBeep(3);
    return;
  }
  remaining--;
  render();
}

function start() {
  if (running) return;
  if (remaining <= 0) remaining = totalSeconds;
  doneMsg.classList.remove('show');
  running = true;
  timerId = setInterval(tick, 1000);
}

function stop() {
  running = false;
  clearInterval(timerId);
}

function reset() {
  stop();
  remaining = totalSeconds;
  doneMsg.classList.remove('show');
  render();
}

function setPreset(minutes) {
  totalSeconds = minutes * 60;
  remaining = totalSeconds;
  stop();
  doneMsg.classList.remove('show');
  render();
  presetBtns.forEach(b => b.classList.toggle('active', Number(b.dataset.min) === minutes));
}

function playBeep(times) {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    let count = 0;
    const doBeep = () => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
      count++;
      if (count < times) setTimeout(doBeep, 500);
    };
    doBeep();
  } catch (e) {
    // Web Audio not available — fail silently, timer still works visually
  }
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);

presetBtns.forEach(btn => {
  btn.addEventListener('click', () => setPreset(Number(btn.dataset.min)));
});

fsBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') { e.preventDefault(); running ? stop() : start(); }
  if (e.key.toLowerCase() === 'r') reset();
});

render();
