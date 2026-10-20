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

    const trainingDay = document.querySelector(".training-day-info p");

    const dayNames = {
      segunda: "Segunda-feira",
      terca: "Terça-feira",
      quarta: "Quarta-feira",
      quinta: "Quinta-feira",
      sexta: "Sexta-feira",
      sabado: "Sábado",
      domingo: "Domingo",
    };

    if (selectedDay && trainingDay) {
      trainingDay.textContent = dayNames[selectedDay] || "";
    }

    if (!training) {
      trainingName.textContent = "Nenhum treino cadastrado para este dia";
      exerciseCardList.innerHTML = "";
      return;
    }

    trainingName.textContent = training.training_name;

    training.exercises.forEach((exercise) => {
      const exerciseCard = document.createElement("li");
      exerciseCard.classList.add("exercise-card");

      // Nome do exercício
      const exerciseTitle = document.createElement("h3");
      exerciseTitle.textContent = exercise.name;
      exerciseCard.appendChild(exerciseTitle);

      // Informações do exercício
      const exerciseDetails = [
        ["Séries", exercise.series],
        ["Repetições", exercise.repetitions],
        ["Carga", exercise.load],
        ["Intervalo", exercise.rest],
      ];

      exerciseDetails.forEach(([label, value]) => {
        const detail = document.createElement("p");
        detail.textContent = `${label}: ${value || "Não informado"}`;
        exerciseCard.appendChild(detail);
      });

      // Método, quando informado
      if (exercise.method && exercise.method.trim() !== "") {
        const method = document.createElement("p");
        method.textContent = `Método: ${exercise.method}`;
        exerciseCard.appendChild(method);
      }

      exerciseCardList.appendChild(exerciseCard);
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
