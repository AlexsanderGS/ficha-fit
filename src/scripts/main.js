import { initTraining } from "./training.js";
import { initExercise } from "./exercise.js";

initTraining();
initExercise();

const createButton = document.querySelector(".btn-create");
const emptyState = document.querySelector(".empty-state");
const trainingForm = document.querySelector(".training-form");

createButton.addEventListener("click", () => {
  emptyState.hidden = true;
  trainingForm.hidden = false;
});
