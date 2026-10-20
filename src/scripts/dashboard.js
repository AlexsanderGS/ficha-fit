export function initDashboard() {
  function renderDashboard(selectedDay) {
    const trainingJSON = localStorage.getItem("training");

    if (!trainingJSON) {
      return;
    }

    const trainings = JSON.parse(trainingJSON);
    const training = selectedDay
      ? trainings.find((item) => item.dia_da_semana === selectedDay)
      : trainings[0];

    const trainingName = document.querySelector(".training-day-info h2");
    const exerciseCardList = document.querySelector(".exercise-card-list");
    exerciseCardList.innerHTML = "";

    if (!training) {
      trainingName.textContent = "Nenhum treino cadastrado para este dia";
      exerciseCardList.innerHTML = "";
      return;
    }

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

  const dayButtons = document.querySelectorAll(".day-button");

  dayButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedDay = button.dataset.day;

      dayButtons.forEach((dayButton) => {
        dayButton.classList.remove("day-active");
      });

      button.classList.add("day-active");

      renderDashboard(selectedDay);
    });
  });

  const activeDayButton = document.querySelector(".day-button.day-active");
  renderDashboard(activeDayButton?.dataset.day);
  return renderDashboard;

  console.log(trainings);
}
