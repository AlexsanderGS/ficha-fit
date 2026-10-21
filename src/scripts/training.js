export function initTraining(renderDashboard) {
  const form = document.querySelector(".training-form form");
  const trainingForm = document.querySelector(".training-form");
  const trainingDashboard = document.querySelector(".training-dashboard");
  const emptyState = document.querySelector(".empty-state");
  const editButton = document.querySelector(".btn-edit-training");
  const exerciseList = document.querySelector(".exercise-list");

  // Abre o formulário com os dados do treino selecionado.
  editButton.addEventListener("click", () => {
    const activeDayButton = document.querySelector(".day-button.day-active");

    if (!activeDayButton) return;

    const selectedDay = activeDayButton.dataset.day;
    const savedTrainings = localStorage.getItem("training");
    const trainings = savedTrainings ? JSON.parse(savedTrainings) : [];

    const training = trainings.find(
      (item) => item.dia_da_semana === selectedDay,
    );

    // Não abre a edição se não existir treino nesse dia.
    if (!training) {
      // Abre o formulário para cadastrar o primeiro treino desse dia.
      form.reset();
      delete form.dataset.editingDay;

      const exerciseItems = exerciseList.querySelectorAll(".exercise-item");

      exerciseItems.forEach((item, index) => {
        if (index > 0) item.remove();
      });

      form.elements.namedItem("dia_da_semana").value = selectedDay;

      const formTitle = document.querySelector(".training-form-name");
      formTitle.textContent = "Criar novo treino";

      emptyState.hidden = true;
      trainingDashboard.hidden = true;
      trainingForm.hidden = false;

      return;
    }

    form.dataset.editingDay = selectedDay;

    form.elements.namedItem("training_name").value = training.training_name;

    form.elements.namedItem("dia_da_semana").value = training.dia_da_semana;

    // Mantém somente o primeiro bloco de exercício antes de preencher.
    const exerciseItems = exerciseList.querySelectorAll(".exercise-item");

    exerciseItems.forEach((item, index) => {
      if (index > 0) item.remove();
    });

    const exercises = training.exercises || [];
    const addExerciseButton = exerciseList.querySelector(".bt-add-exercise");

    // Recria a quantidade de blocos necessária usando o botão existente.
    for (let i = 1; i < exercises.length; i++) {
      addExerciseButton.click();
    }

    const exerciseForms = exerciseList.querySelectorAll(".exercise-form");

    exerciseForms.forEach((exerciseForm, index) => {
      const exercise = exercises[index];
      if (!exercise) return;

      exerciseForm.querySelector('[name="exercise-name"]').value =
        exercise.name || "";

      exerciseForm.querySelector('[name="method"]').value =
        exercise.method || "";

      exerciseForm.querySelector('[name="series"]').value =
        exercise.series || "";

      exerciseForm.querySelector('[name="repetitions"]').value =
        exercise.repetitions || "";

      exerciseForm.querySelector('[name="load"]').value = exercise.load || "";

      exerciseForm.querySelector('[name="rest"]').value = exercise.rest || "";
    });

    emptyState.hidden = true;
    trainingDashboard.hidden = true;
    trainingForm.hidden = false;

    const formTitle = document.querySelector(".training-form-name");
    formTitle.textContent = "Editar treino";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const editingDay = form.dataset.editingDay;
    const newDay = formData.get("dia_da_semana");

    if (!formData.get("training_name") || !newDay) {
      alert("Informe o nome do treino e selecione um dia da semana.");
      return;
    }

    const exerciseForms = form.querySelectorAll(".exercise-form");
    const exercises = [];

    exerciseForms.forEach((exerciseForm) => {
      const getValue = (name) =>
        exerciseForm.querySelector(`[name="${name}"]`).value.trim();

      const exercise = {
        name: getValue("exercise-name"),
        method: getValue("method"),
        series: getValue("series"),
        repetitions: getValue("repetitions"),
        load: getValue("load"),
        rest: getValue("rest"),
      };

      // Não salva blocos de exercício completamente vazios.
      if (Object.values(exercise).some((value) => value !== "")) {
        exercises.push(exercise);
      }
    });

    const training = {
      training_name: formData.get("training_name").trim(),
      dia_da_semana: newDay,
      exercises,
    };

    const savedTrainings = localStorage.getItem("training");
    const trainings = savedTrainings ? JSON.parse(savedTrainings) : [];

    if (editingDay) {
      const editingIndex = trainings.findIndex(
        (item) => item.dia_da_semana === editingDay,
      );

      if (editingIndex === -1) {
        alert("Não foi possível encontrar o treino que você está editando.");
        return;
      }

      // Só verifica conflito se o treino estiver mudando de dia.
      if (newDay !== editingDay) {
        const conflictingTraining = trainings.some(
          (item, index) =>
            index !== editingIndex && item.dia_da_semana === newDay,
        );

        if (conflictingTraining) {
          alert("Já existe um treino cadastrado para o dia selecionado.");
          return;
        }
      }

      // Atualiza o treino existente, em vez de criar outro.
      trainings[editingIndex] = training;
    } else {
      // Fluxo original: cadastrar um novo treino.
      const conflictingTraining = trainings.some(
        (item) => item.dia_da_semana === newDay,
      );

      if (conflictingTraining) {
        alert("Já existe um treino cadastrado para esse dia.");
        return;
      }

      trainings.push(training);
    }

    localStorage.setItem("training", JSON.stringify(trainings));

    const selectedDayButton = document.querySelector(
      `.day-button[data-day="${training.dia_da_semana}"]`,
    );

    document.querySelectorAll(".day-button").forEach((button) => {
      button.classList.remove("day-active");
    });

    if (selectedDayButton) {
      selectedDayButton.classList.add("day-active");
    }

    // Limpa o formulário e volta ao estado de criação.
    form.reset();

    const exerciseItems = exerciseList.querySelectorAll(".exercise-item");

    exerciseItems.forEach((item, index) => {
      if (index > 0) item.remove();
    });

    delete form.dataset.editingDay;

    const formTitle = document.querySelector(".training-form-name");
    formTitle.textContent = "Criar novo treino";

    trainingForm.hidden = true;
    emptyState.hidden = true;
    trainingDashboard.hidden = false;

    renderDashboard(training.dia_da_semana);
  });
}
