export function initExercise() {
  const addExerciseButton = document.querySelector(".bt-add-exercise");
  const exerciseList = document.querySelector(".exercise-list");
  const firstExerciseItem = document.querySelector(".exercise-item");

  function addExercise() {
    const newExerciseItem = firstExerciseItem.cloneNode(true);

    // Limpa os campos do novo exercício.
    newExerciseItem.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });

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
