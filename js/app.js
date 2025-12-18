import { setupEvents } from './events.js';
import { renderWord } from './ui.js';
import { setLevel } from './state.js';

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('lexdepth-theme') === 'dark') {
    document.body.classList.add('dark');
  }

  setLevel(localStorage.getItem('lexdepth-level') || 'elementary');
  setupEvents();
  renderWord();
});
