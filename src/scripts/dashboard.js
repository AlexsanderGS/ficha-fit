export function initDashboard() {
  const trainingJSON = localStorage.getItem("training");

  if (!trainingJSON) {
    return;
  }

  const trainings = JSON.parse(trainingJSON);

  console.log(trainings);
}
