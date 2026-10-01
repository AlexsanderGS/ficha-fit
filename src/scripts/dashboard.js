export function initDashboard() {
  const trainingJSON = localStorage.getItem("training");

  if (!trainingJSON) {
    return;
  }

  const trainings = JSON.parse(trainingJSON);
  const training = trainings[0];

  const trainingName = document.querySelector(".training-day-info h2");
  trainingName.textContent = training.training_name;

  console.log(trainings);
}
