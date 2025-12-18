export const state = {
  level: 'elementary',
  index: 0
};

export function setLevel(level) {
  state.level = level;
  state.index = 0;
}

export function nextIndex(max) {
  if (state.index < max - 1) state.index++;
}

export function prevIndex() {
  if (state.index > 0) state.index--;
}

export function getProgress() {
  return JSON.parse(localStorage.getItem('lexdepth-progress')) || {
    elementary: [],
    intermediate: [],
    advanced: []
  };
}

export function markLearned() {
  const progress = getProgress();
  if (!progress[state.level].includes(state.index)) {
    progress[state.level].push(state.index);
    localStorage.setItem('lexdepth-progress', JSON.stringify(progress));
  }
}

export function isLearned() {
  const progress = getProgress();
  return progress[state.level].includes(state.index);
}
