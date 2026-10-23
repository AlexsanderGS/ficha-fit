export function initDashboard() {
  const weekdays = [
    "segunda",
    "terca",
    "quarta",
    "quinta",
    "sexta",
    "sabado",
    "domingo",
  ];

  function updateWeekDates() {
    const today = new Date();

    // Converte domingo = 0 para segunda = 0
    const currentDayIndex = (today.getDay() + 6) % 7;

    // Encontra a segunda-feira da semana atual
    const monday = new Date(today);
    monday.setDate(today.getDate() - currentDayIndex);

    const dayButtons = document.querySelectorAll(".day-button");

    dayButtons.forEach((button, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);

      const dayNumber = button.querySelector("strong");

      if (dayNumber) {
        dayNumber.textContent = date.getDate();
      }
    });
  }

  const dayNames = {
    segunda: "Segunda-feira",
    terca: "Terça-feira",
    quarta: "Quarta-feira",
    quinta: "Quinta-feira",
    sexta: "Sexta-feira",
    sabado: "Sábado",
    domingo: "Domingo",
  };

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
    const trainingDay = document.querySelector(".training-day-info p");

    exerciseCardList.innerHTML = "";

    if (selectedDay && trainingDay) {
      const today = new Date();

      // Índice da semana: segunda = 0, domingo = 6
      const currentDayIndex = (today.getDay() + 6) % 7;
      const selectedDayIndex = weekdays.indexOf(selectedDay);

      // Calcula a data do dia selecionado na semana atual
      const selectedDate = new Date(today);
      selectedDate.setDate(
        today.getDate() + selectedDayIndex - currentDayIndex,
      );

      const formattedDate = selectedDate.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
      });

      trainingDay.textContent = `${dayNames[selectedDay]}, ${formattedDate}`;
    }

    if (!training) {
      trainingName.textContent = "Nenhum treino cadastrado para este dia";
      exerciseCardList.innerHTML = "";
      return;
    }

    trainingName.textContent = training.training_name;

    training.exercises.forEach((exercise, index) => {
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

      const exerciseActions = document.createElement("div");
      exerciseActions.classList.add("exercise-card-actions");

      const editExerciseButton = document.createElement("button");
      editExerciseButton.type = "button";
      editExerciseButton.classList.add("btn-edit-exercise");
      editExerciseButton.textContent = "Editar";
      editExerciseButton.dataset.exerciseIndex = index;

      const deleteExerciseButton = document.createElement("button");
      deleteExerciseButton.type = "button";
      deleteExerciseButton.classList.add("btn-delete-exercise");
      deleteExerciseButton.textContent = "Excluir";
      deleteExerciseButton.dataset.exerciseIndex = index;

      exerciseActions.appendChild(editExerciseButton);
      exerciseActions.appendChild(deleteExerciseButton);
      exerciseCard.appendChild(exerciseActions);

      exerciseCardList.appendChild(exerciseCard);

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

  updateWeekDates();

  const today = new Date();
  const todayIndex = (today.getDay() + 6) % 7;
  const todayName = weekdays[todayIndex];

  dayButtons.forEach((button) => {
    const isToday = button.dataset.day === todayName;

    button.classList.toggle("day-active", isToday);
  });

  renderDashboard(todayName);

  return renderDashboard;
}
