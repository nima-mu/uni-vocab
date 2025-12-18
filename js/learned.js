import { vocabularyData } from "./data.js";
import { getProgress } from "./state.js";

const container = document.getElementById("learnedList");
const progress = getProgress();

Object.keys(progress).forEach((level) => {
  progress[level].forEach((index) => {
    const word = vocabularyData[level][index];
    const div = document.createElement("div");
    div.innerHTML = `<h3>${word.word}</h3><p>${word.definition}</p>`;
    container.appendChild(div);
  });
});
