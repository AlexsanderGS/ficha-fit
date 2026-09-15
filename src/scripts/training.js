export function initTraining() {
  const form = document.querySelector(".training-form form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const trainingData = Object.fromEntries(formData);
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

      console.log(exercise);
    });

    console.log(trainingData);
    console.log(exerciseForms);
  });
}
