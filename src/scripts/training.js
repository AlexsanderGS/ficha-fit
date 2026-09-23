export function initTraining() {
  const form = document.querySelector(".training-form form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const exercises = [];

    const formData = new FormData(form);

    const trainingData = {
      training_name: formData.get("training_name"),
      dia_da_semana: formData.get("dia_da_semana"),
    };

    const exerciseForms = document.querySelectorAll(".exercise-form");

    exerciseForms.forEach((exerciseForm) => {
      const exerciseName = exerciseForm.querySelector('[name="exercise-name"]');
      const method = exerciseForm.querySelector('[name="method"]');
      const series = exerciseForm.querySelector('[name="series"]');
      const repetitions = exerciseForm.querySelector('[name="repetitions"]');
      const load = exerciseForm.querySelector('[name="load"]');
      const rest = exerciseForm.querySelector('[name="rest"]');

      const exercise = {
        name: exerciseName.value,
        method: method.value,
        series: series.value,
        repetitions: repetitions.value,
        load: load.value,
        rest: rest.value,
      };

      exercises.push(exercise);
    });

    const training = {
      ...trainingData,
      exercises: exercises,
    };
    console.log(training);
  });
}
