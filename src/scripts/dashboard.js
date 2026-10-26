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

  let selectedDate = new Date();
  const calendarButton = document.querySelector(".dashboard-calendar button");

  const datePicker = document.createElement("input");
  datePicker.type = "date";
  datePicker.setAttribute("aria-label", "Selecionar data da semana");
  datePicker.style.position = "absolute";
  datePicker.style.width = "1px";
  datePicker.style.height = "1px";
  datePicker.style.opacity = "0";
  datePicker.style.pointerEvents = "none";

  document.querySelector(".dashboard-calendar").appendChild(datePicker);

  function updateWeekDates() {
    const referenceDate = new Date(selectedDate);

    // Converte domingo = 0 para segunda = 0
    const dayIndex = (referenceDate.getDay() + 6) % 7;

    // Encontra a segunda-feira da semana selecionada
    const monday = new Date(referenceDate);
    monday.setDate(referenceDate.getDate() - dayIndex);

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
      // Índice da semana selecionada: segunda = 0, domingo = 6
      const currentDayIndex = (selectedDate.getDay() + 6) % 7;
      const selectedDayIndex = weekdays.indexOf(selectedDay);

      // Calcula a data do dia dentro da semana selecionada
      const dayDate = new Date(selectedDate);
      dayDate.setDate(
        selectedDate.getDate() + selectedDayIndex - currentDayIndex,
      );

      const formattedDate = dayDate.toLocaleDateString("pt-BR", {
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

  function selectDay(dayName) {
    dayButtons.forEach((button) => {
      button.classList.toggle("day-active", button.dataset.day === dayName);
    });

    renderDashboard(dayName);
  }

  dayButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectDay(button.dataset.day);
    });
  });

  // Inicializa a semana e seleciona o dia atual
  updateWeekDates();

  const today = new Date();
  const todayIndex = (today.getDay() + 6) % 7;
  const todayName = weekdays[todayIndex];

  selectDay(todayName);

  // Abre o seletor de data ao clicar no ícone do calendário
  calendarButton.addEventListener("click", () => {
    datePicker.value = [
      selectedDate.getFullYear(),
      String(selectedDate.getMonth() + 1).padStart(2, "0"),
      String(selectedDate.getDate()).padStart(2, "0"),
    ].join("-");

    if (typeof datePicker.showPicker === "function") {
      datePicker.showPicker();
    } else {
      datePicker.click();
    }
  });

  // Atualiza a semana quando uma data for escolhida
  datePicker.addEventListener("change", () => {
    if (!datePicker.value) return;

    const [year, month, day] = datePicker.value.split("-").map(Number);

    selectedDate = new Date(year, month - 1, day);

    updateWeekDates();

    const selectedDayIndex = (selectedDate.getDay() + 6) % 7;
    const selectedDay = weekdays[selectedDayIndex];

    selectDay(selectedDay);
  });

  return renderDashboard;
}
