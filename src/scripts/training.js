export function initTraining() {
  const form = document.querySelector(".training-form form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const trainingData = Object.fromEntries(formData);
    const exerciseForms = document.querySelectorAll(".exercise-form");

    exerciseForms.forEach((exerciseForm) => {
      const exerciseName = exerciseForm.querySelector('[name="exercise-name"]');
      console.log(exerciseName.value);
    });

    console.log(trainingData);
    console.log(exerciseForms);
  });
}
