import { initTraining } from "./training.js";
import { initExercise } from "./exercise.js";
import { initDashboard } from "./dashboard.js";

initExercise();
const renderDashboard = initDashboard();
initTraining(renderDashboard);

const createButton = document.querySelector(".btn-create");
const emptyState = document.querySelector(".empty-state");
const trainingForm = document.querySelector(".training-form");
const trainingDashboard = document.querySelector(".training-dashboard");

createButton.addEventListener("click", () => {
  emptyState.hidden = true;
  trainingForm.hidden = false;
  trainingDashboard.hidden = true;
});
