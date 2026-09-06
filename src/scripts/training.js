export function initTraining() {
  const form = document.querySelector(".training-form form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("Formulário enviado!");
  });
}
