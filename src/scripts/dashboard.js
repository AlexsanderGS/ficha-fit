export function initDashboard() {
  function renderDashboard() {
    const trainingJSON = localStorage.getItem("training");

    if (!trainingJSON) {
      return;
    }

    const trainings = JSON.parse(trainingJSON);
    const training = trainings[0];

    const trainingName = document.querySelector(".training-day-info h2");
    const exerciseCardList = document.querySelector(".exercise-card-list");
    exerciseCardList.innerHTML = "";

    trainingName.textContent = training.training_name;

    training.exercises.forEach((exercise) => {
      console.log("Exercício encontrado:", exercise.name);
      const exerciseCard = document.createElement("li");
      exerciseCard.classList.add("exercise-card");

      const exerciseTitle = document.createElement("h3");
      exerciseTitle.textContent = exercise.name;

      exerciseCard.appendChild(exerciseTitle);
      exerciseCardList.appendChild(exerciseCard);

      console.log(exerciseCard);
    });
  }

  renderDashboard();
  return renderDashboard;

  console.log(trainings);
}
