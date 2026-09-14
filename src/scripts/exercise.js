export function initExercise() {
  const addExerciseButton = document.querySelector(".bt-add-exercise");
  const exerciseList = document.querySelector(".exercise-list");
  const firstExerciseForm = document.querySelector(".exercise-form");

  addExerciseButton.addEventListener("click", () => {
    const exerciseForm = document.createElement("div");
    exerciseForm.classList.add("exercise-form");

    const newExerciseForm = firstExerciseForm.cloneNode(true);

    exerciseList.appendChild(newExerciseForm);
  });

  console.log(addExerciseButton);
  console.log(exerciseList);
}
