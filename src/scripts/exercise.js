export function initExercise() {
  const addExerciseButton = document.querySelector(".bt-add-exercise");
  const exerciseList = document.querySelector(".exercise-list");
  const firstExerciseItem = document.querySelector(".exercise-item");

  function addExercise() {
    const newExerciseItem = firstExerciseItem.cloneNode(true);
    const newAddExerciseButton =
      newExerciseItem.querySelector(".bt-add-exercise");

    newAddExerciseButton.addEventListener("click", () => {
      addExercise();
    });

    exerciseList.appendChild(newExerciseItem);
  }

  addExerciseButton.addEventListener("click", () => {
    addExercise();
  });

  console.log(addExerciseButton);
  console.log(exerciseList);
}
