import { vocabularyData } from "./data.js";
import { state, isLearned } from "./state.js";

const wordEl = document.getElementById("word");
const examplesEl = document.getElementById("examples");
const definitionEl = document.getElementById("definition");
const exerciseEl = document.getElementById("exercise");
const feedbackEl = document.getElementById("feedback");
const progressEl = document.getElementById("progressFill");
const wordCountEl = document.getElementById("wordCount");
const levelEl = document.getElementById("currentLevel");

export function renderWord() {
  const word = vocabularyData[state.level][state.index];

  // Word title
  wordEl.textContent = word.word;

  // Examples
  examplesEl.innerHTML = "";
  word.examples.forEach((ex) => {
    examplesEl.innerHTML += `
      <div class="example">
        <p>${ex.text}</p>
        <div class="source">— ${ex.source}</div>
      </div>
    `;
  });

  // Definition (hidden by default)
  definitionEl.style.display = "none";
  definitionEl.innerHTML = `
    <strong>Definition</strong>
    <p>${word.definition}</p>
    ${word.notes ? `<div class="notes">${word.notes}</div>` : ""}
  `;

  // Reset feedback
  feedbackEl.textContent = "";
  feedbackEl.style.color = "";

  // Practice
  renderExercise(word);

  // Progress + UI state
  updateProgress();
  updateLevelButtons();
  updateLearnedButton();
}

function renderExercise(word) {
  exerciseEl.innerHTML = `
    <p><strong>Fill in the blank</strong></p>
    <p>${word.exercise.sentence}</p>
    <input id="userInput" type="text" />

    <hr>

    <p><strong>Match the word to the context</strong></p>
    <p>${word.match.question}</p>

    ${word.match.options
      .map(
        (opt, i) => `
      <div class="option" data-index="${i}">
        <input
          type="radio"
          name="match"
          value="${i}"
          id="option${i}"
        />
        <label for="option${i}">${opt}</label>
      </div>
    `
      )
      .join("")}
  `;
}

function updateProgress() {
  const total = vocabularyData[state.level].length;
  progressEl.style.width = `${((state.index + 1) / total) * 100}%`;
  wordCountEl.textContent = `Word ${state.index + 1} of ${total}`;
  levelEl.textContent = state.level;
}

function updateLevelButtons() {
  ["elementary", "intermediate", "advanced"].forEach((level) => {
    const btn = document.getElementById(`${level}Btn`);
    btn.classList.toggle("active", level === state.level);
  });
}

function updateLearnedButton() {
  const btn = document.getElementById("learnedBtn");
  if (isLearned()) {
    btn.textContent = "✓ Learned";
    btn.disabled = true;
  } else {
    btn.textContent = "Mark as Learned";
    btn.disabled = false;
  }
}
