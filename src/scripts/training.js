export function initTraining(renderDashboard) {
  const form = document.querySelector(".training-form form");
  const trainingForm = document.querySelector(".training-form");
  const trainingDashboard = document.querySelector(".training-dashboard");
  const emptyState = document.querySelector(".empty-state");
  const editButton = document.querySelector(".btn-edit-training");
  const deleteTrainingButton = document.querySelector(".btn-delete-training");
  const exerciseList = document.querySelector(".exercise-list");

  const dashboardAddExerciseButton = document.querySelector(
    ".training-day > .bt-add-exercise",
  );

  const trainingNameField = form.elements
    .namedItem("training_name")
    .closest(".form-field");

  const trainingDayField = form.elements
    .namedItem("dia_da_semana")
    .closest(".form-field");

  function showTrainingFields() {
    trainingNameField.hidden = false;
    trainingDayField.hidden = false;
  }

  function resetExerciseFields() {
    const exerciseItems = exerciseList.querySelectorAll(".exercise-item");

    exerciseItems.forEach((item, index) => {
      if (index > 0) item.remove();
    });

    exerciseList.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
  }

  // Escuta os cliques nos botões dos cards de exercícios.
  const exerciseCardList = document.querySelector(".exercise-card-list");

  exerciseCardList.addEventListener("click", (event) => {
    const deleteExerciseButton = event.target.closest(".btn-delete-exercise");

    if (deleteExerciseButton) {
      const confirmed = confirm(
        "Tem certeza de que deseja excluir este exercício?",
      );

      if (!confirmed) return;

      const activeDayButton = document.querySelector(".day-button.day-active");

      if (!activeDayButton) return;

      const selectedDay = activeDayButton.dataset.day;
      const exerciseIndex = Number(deleteExerciseButton.dataset.exerciseIndex);

      const savedTrainings = localStorage.getItem("training");
      const trainings = savedTrainings ? JSON.parse(savedTrainings) : [];

      const training = trainings.find(
        (item) => item.dia_da_semana === selectedDay,
      );

      if (
        !training ||
        !Number.isInteger(exerciseIndex) ||
        exerciseIndex < 0 ||
        exerciseIndex >= training.exercises.length
      ) {
        alert("Não foi possível encontrar o exercício selecionado.");
        return;
      }

      // Remove somente o exercício escolhido.
      training.exercises.splice(exerciseIndex, 1);

      localStorage.setItem("training", JSON.stringify(trainings));

      renderDashboard(selectedDay);
      return;
    }

    const editExerciseButton = event.target.closest(".btn-edit-exercise");

    if (!editExerciseButton) return;

    const activeDayButton = document.querySelector(".day-button.day-active");

    if (!activeDayButton) return;

    const selectedDay = activeDayButton.dataset.day;
    const exerciseIndex = Number(editExerciseButton.dataset.exerciseIndex);

    const savedTrainings = localStorage.getItem("training");
    const trainings = savedTrainings ? JSON.parse(savedTrainings) : [];

    const training = trainings.find(
      (item) => item.dia_da_semana === selectedDay,
    );

    const exercise = training?.exercises?.[exerciseIndex];

    if (!training || !exercise) {
      alert("Não foi possível encontrar o exercício selecionado.");
      return;
    }

    // Prepara o formulário para editar somente este exercício.
    form.reset();
    resetExerciseFields();

    delete form.dataset.editingDay;
    delete form.dataset.addingExerciseDay;

    form.dataset.editingExerciseIndex = String(exerciseIndex);
    form.dataset.editingExerciseDay = selectedDay;

    const trainingNameInput = form.elements.namedItem("training_name");
    const trainingDayInput = form.elements.namedItem("dia_da_semana");

    trainingNameInput.value = training.training_name;
    trainingDayInput.value = training.dia_da_semana;

    trainingNameInput.readOnly = true;
    trainingDayInput.disabled = true;

    showTrainingFields();

    const exerciseForm = exerciseList.querySelector(".exercise-form");

    exerciseForm.querySelector('[name="exercise-name"]').value =
      exercise.name || "";

    exerciseForm.querySelector('[name="method"]').value = exercise.method || "";

    exerciseForm.querySelector('[name="series"]').value = exercise.series || "";

    exerciseForm.querySelector('[name="repetitions"]').value =
      exercise.repetitions || "";

    exerciseForm.querySelector('[name="load"]').value = exercise.load || "";

    exerciseForm.querySelector('[name="rest"]').value = exercise.rest || "";

    document.querySelector(".training-form-name").textContent =
      "Editar exercício";

    emptyState.hidden = true;
    trainingDashboard.hidden = true;
    trainingForm.hidden = false;
  });

  deleteTrainingButton.addEventListener("click", () => {
    const activeDayButton = document.querySelector(".day-button.day-active");

    if (!activeDayButton) return;

    const selectedDay = activeDayButton.dataset.day;
    const savedTrainings = localStorage.getItem("training");
    const trainings = savedTrainings ? JSON.parse(savedTrainings) : [];

    const training = trainings.find(
      (item) => item.dia_da_semana === selectedDay,
    );

    if (!training) {
      alert("Não existe treino cadastrado para este dia.");
      return;
    }

    const confirmed = confirm(
      `Tem certeza de que deseja excluir o treino "${training.training_name}"? Todos os exercícios desse treino também serão removidos.`,
    );

    if (!confirmed) return;

    const updatedTrainings = trainings.filter(
      (item) => item.dia_da_semana !== selectedDay,
    );

    localStorage.setItem("training", JSON.stringify(updatedTrainings));

    renderDashboard(selectedDay);
  });

  dashboardAddExerciseButton.addEventListener("click", () => {
    const activeDayButton = document.querySelector(".day-button.day-active");

    if (!activeDayButton) return;

    const selectedDay = activeDayButton.dataset.day;
    const savedTrainings = localStorage.getItem("training");
    const trainings = savedTrainings ? JSON.parse(savedTrainings) : [];

    const trainingExists = trainings.some(
      (item) => item.dia_da_semana === selectedDay,
    );

    if (!trainingExists) {
      alert("Cadastre um treino para este dia antes de adicionar exercícios.");
      return;
    }

    form.reset();
    resetExerciseFields();

    delete form.dataset.editingDay;
    form.dataset.addingExerciseDay = selectedDay;

    const selectedTraining = trainings.find(
      (item) => item.dia_da_semana === selectedDay,
    );

    form.elements.namedItem("training_name").value =
      selectedTraining.training_name;

    form.elements.namedItem("dia_da_semana").value =
      selectedTraining.dia_da_semana;

    showTrainingFields();

    // Mantém os dados visíveis, mas impede alterações neste modo.
    form.elements.namedItem("training_name").readOnly = true;
    form.elements.namedItem("dia_da_semana").disabled = true;

    document.querySelector(".training-form-name").textContent =
      "Adicionar exercício";

    emptyState.hidden = true;
    trainingDashboard.hidden = true;
    trainingForm.hidden = false;
  });

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
      form.elements.namedItem("training_name").readOnly = false;
      form.elements.namedItem("dia_da_semana").disabled = false;

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

    const editingExerciseIndex = form.dataset.editingExerciseIndex;

    if (editingExerciseIndex !== undefined) {
      const editingDay = form.dataset.editingExerciseDay;
      const exerciseForm = exerciseList.querySelector(".exercise-form");

      const getValue = (name) =>
        exerciseForm.querySelector(`[name="${name}"]`).value.trim();

      const updatedExercise = {
        name: getValue("exercise-name"),
        method: getValue("method"),
        series: getValue("series"),
        repetitions: getValue("repetitions"),
        load: getValue("load"),
        rest: getValue("rest"),
      };

      if (!updatedExercise.name) {
        alert("Informe o nome do exercício.");
        return;
      }

      const savedTrainings = localStorage.getItem("training");
      const trainings = savedTrainings ? JSON.parse(savedTrainings) : [];

      const training = trainings.find(
        (item) => item.dia_da_semana === editingDay,
      );

      if (!training || !training.exercises[Number(editingExerciseIndex)]) {
        alert("Não foi possível encontrar o exercício selecionado.");
        return;
      }

      training.exercises[Number(editingExerciseIndex)] = updatedExercise;

      localStorage.setItem("training", JSON.stringify(trainings));

      delete form.dataset.editingExerciseIndex;
      delete form.dataset.editingExerciseDay;

      form.reset();
      resetExerciseFields();

      showTrainingFields();

      document.querySelector(".training-form-name").textContent =
        "Criar novo treino";

      form.elements.namedItem("training_name").readOnly = false;
      form.elements.namedItem("dia_da_semana").disabled = false;

      trainingForm.hidden = true;
      trainingDashboard.hidden = false;

      renderDashboard(editingDay);
      return;
    }

    // Modo especial: adicionar um exercício a um treino existente.
    const addingExerciseDay = form.dataset.addingExerciseDay;

    if (addingExerciseDay) {
      const exerciseForm = exerciseList.querySelector(".exercise-form");

      const getValue = (name) =>
        exerciseForm.querySelector(`[name="${name}"]`).value.trim();

      const newExercise = {
        name: getValue("exercise-name"),
        method: getValue("method"),
        series: getValue("series"),
        repetitions: getValue("repetitions"),
        load: getValue("load"),
        rest: getValue("rest"),
      };

      if (!newExercise.name) {
        alert("Informe o nome do exercício.");
        return;
      }

      const savedTrainings = localStorage.getItem("training");
      const trainings = savedTrainings ? JSON.parse(savedTrainings) : [];

      const training = trainings.find(
        (item) => item.dia_da_semana === addingExerciseDay,
      );

      if (!training) {
        alert("Não foi possível encontrar o treino desse dia.");
        return;
      }

      // Acrescenta o exercício sem apagar os anteriores.
      training.exercises = training.exercises || [];
      training.exercises.push(newExercise);

      localStorage.setItem("training", JSON.stringify(trainings));

      delete form.dataset.addingExerciseDay;

      form.reset();
      resetExerciseFields();
      showTrainingFields();

      document.querySelector(".training-form-name").textContent =
        "Criar novo treino";

      // Reabilita os campos para os próximos usos do formulário.
      form.elements.namedItem("training_name").readOnly = false;
      form.elements.namedItem("dia_da_semana").disabled = false;

      trainingForm.hidden = true;
      trainingDashboard.hidden = false;

      renderDashboard(addingExerciseDay);

      return;
    }

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
