import { vocabularyData } from "./data.js";
import { state, setLevel, nextIndex, prevIndex, markLearned } from "./state.js";
import { renderWord } from "./ui.js";

export function setupEvents() {
  document.getElementById("nextBtn").onclick = () => {
    nextIndex(vocabularyData[state.level].length);
    renderWord();
  };

  document.getElementById("prevBtn").onclick = () => {
    prevIndex();
    renderWord();
  };

  document.getElementById("revealBtn").onclick = () => {
    document.getElementById("definition").style.display = "block";
  };

  document.getElementById("checkBtn").onclick = checkAnswer;
  document.getElementById("learnedBtn").onclick = () => {
    markLearned();
    renderWord();
  };

  ["elementary", "intermediate", "advanced"].forEach((level) => {
    document.getElementById(`${level}Btn`).onclick = () => {
      setLevel(level);
      renderWord();
    };
  });

  document.getElementById("themeToggle").onclick = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "lexdepth-theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  };

  document.addEventListener("click", (e) => {
    const option = e.target.closest(".option");
    if (!option) return;

    document
      .querySelectorAll(".option")
      .forEach((o) => o.classList.remove("selected"));

    option.classList.add("selected");
    option.querySelector("input").checked = true;
  });

  document.getElementById("reviewBtn").onclick = () => {
    window.location.href = "learned.html";
  };
}

function checkAnswer() {
  const word = vocabularyData[state.level][state.index];
  let score = 0;
  const feedback = [];

  // Fill in the blank
  const input = document
    .getElementById("userInput")
    ?.value.trim()
    .toLowerCase();

  if (input === word.exercise.answer.toLowerCase()) {
    score++;
    feedback.push("✓ Fill-in correct");
  } else {
    feedback.push(`✗ Correct answer: ${word.exercise.answer}`);
  }

  // Match question
  const selected = document.querySelector('input[name="match"]:checked');
  if (selected && Number(selected.value) === word.match.correctIndex) {
    score++;
    feedback.push("✓ Context match correct");
  } else {
    feedback.push(
      `✗ Best choice: ${word.match.options[word.match.correctIndex]}`
    );
  }

  const feedbackEl = document.getElementById("feedback");
  feedbackEl.innerHTML = `<strong>Score: ${score}/2</strong><br>${feedback.join(
    "<br>"
  )}`;

  // Color feedback
  if (score === 2) {
    feedbackEl.style.color = "#10b981"; // green
  } else if (score === 1) {
    feedbackEl.style.color = "#f59e0b"; // orange
  } else {
    feedbackEl.style.color = "#ef4444"; // red
  }
}
