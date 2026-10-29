export function initPdf() {
  const generatePdfButton = document.querySelector(".btn-generate-pdf");

  if (!generatePdfButton) {
    return;
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };

      return entities[character];
    });
  }

  function generatePdf() {
    const savedTrainings = localStorage.getItem("training");
    const trainings = savedTrainings ? JSON.parse(savedTrainings) : [];

    console.log("Todos os treinos:", trainings);

    console.log(
      "Treinos de segunda-feira:",
      trainings.filter((training) => training.dia_da_semana === "segunda"),
    );

    if (!trainings.length) {
      alert("Cadastre pelo menos um treino antes de gerar o PDF.");
      return;
    }

    // Mantém apenas os treinos que possuem exercícios.
    const trainingsWithExercises = trainings.filter(
      (training) =>
        Array.isArray(training.exercises) && training.exercises.length > 0,
    );

    if (!trainingsWithExercises.length) {
      alert("Não há exercícios cadastrados para gerar o PDF.");
      return;
    }

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert(
        "Não foi possível abrir a impressão. Permita pop-ups para este site e tente novamente.",
      );
      return;
    }

    const logoPath = new URL(
      "../assets/images/logo-fichaFit.png",
      import.meta.url,
    ).href;

    const dayNames = {
      segunda: "Segunda-feira",
      terca: "Terça-feira",
      quarta: "Quarta-feira",
      quinta: "Quinta-feira",
      sexta: "Sexta-feira",
      sabado: "Sábado",
      domingo: "Domingo",
    };

    const trainingSections = trainingsWithExercises
      .map((training) => {
        const dayName =
          dayNames[training.dia_da_semana] ||
          training.dia_da_semana ||
          "Dia não informado";

        const exerciseRows = training.exercises
          .map(
            (exercise, index) => `
              <tr>
                <td class="number">${index + 1}</td>
                <td class="exercise-name">
                  ${escapeHTML(exercise.name || "Exercício não informado")}
                  ${
                    exercise.method?.trim()
                      ? `<small>${escapeHTML(exercise.method)}</small>`
                      : ""
                  }
                </td>
                <td>${escapeHTML(exercise.series || "-")}</td>
                <td>${escapeHTML(exercise.repetitions || "-")}</td>
                <td class="load-cell"></td>
                <td>${escapeHTML(exercise.rest || "-")}</td>
              </tr>
            `,
          )
          .join("");

        return `
          <section class="training-section">
            <div class="training-heading">
              <h2>${escapeHTML(training.training_name || "Treino sem nome")}</h2>
              <p>${escapeHTML(dayName)}</p>
            </div>

            <table>
              <thead>
                <tr>
                  <th class="number">#</th>
                  <th>EXERCÍCIO</th>
                  <th>SÉRIES</th>
                  <th>REPETIÇÕES</th>
                  <th>CARGA</th>
                  <th>DESCANSO</th>
                </tr>
              </thead>
              <tbody>
                ${exerciseRows}
              </tbody>
            </table>
          </section>
        `;
      })
      .join("");

    printWindow.document.open();
    printWindow.document.write(`
      <!doctype html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Ficha de Treinos - FichaFit</title>

          <style>
            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              padding: 24px;
              color: #000;
              background: #fff;
              font-family: Arial, Helvetica, sans-serif;
              font-size: 12px;
            }

            .document-header {
              display: flex;
              align-items: center;
              gap: 12px;
              padding-bottom: 16px;
              margin-bottom: 24px;
              border-bottom: 2px solid #000;
            }

            .document-header img {
              width: 90px;
              height: 90px;
              object-fit: contain;
            }

            .document-header h1 {
              margin: 0;
              font-size: 26px;
            }

            .document-header p {
              margin: 4px 0 0;
              font-size: 12px;
            }

            .training-section {
              margin-bottom: 28px;
              break-inside: auto;
            }

            .training-heading {
              display: flex;
              align-items: baseline;
              justify-content: space-between;
              gap: 12px;
              margin-bottom: 10px;
              border-bottom: 1px solid #000;
            }

            .training-heading h2 {
              margin: 0 0 8px;
              font-size: 17px;
            }

            .training-heading p {
              margin: 0 0 8px;
              font-weight: bold;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              table-layout: fixed;
            }

            th,
            td {
              padding: 8px 6px;
              border: 1px solid #777;
              text-align: center;
              overflow-wrap: anywhere;
            }

            th {
              background: #eee;
              font-size: 10px;
            }

            .number {
              width: 7%;
            }

            .exercise-name {
              width: 29%;
              text-align: left;
            }

            .exercise-name small {
              display: block;
              margin-top: 4px;
              font-size: 10px;
            }

            .load-cell {
              height: 34px;
            }

            thead {
              display: table-header-group;
            }

            tr {
              break-inside: avoid;
            }

            @page {
              size: A4;
              margin: 12mm;
            }

            @media print {
              body {
                padding: 0;
              }

              .training-section {
                margin-bottom: 20px;
              }

              th {
                background: #eee !important;
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
              }
            }
          </style>
        </head>

        <body>
          <header class="document-header">
            <img id="fichafit-logo" src="${escapeHTML(logoPath)}" alt="Logo FichaFit">
            <div>
              <h1>FichaFit</h1>
              <p>Ficha de treinos</p>
            </div>
          </header>

          <main>
            ${trainingSections}
          </main>
        </body>
      </html>
    `);
    printWindow.document.close();

    const logo = printWindow.document.querySelector("#fichafit-logo");

    function openPrintDialog() {
      printWindow.focus();
      printWindow.print();
    }

    if (logo.complete) {
      openPrintDialog();
    } else {
      logo.addEventListener("load", openPrintDialog, { once: true });
      logo.addEventListener("error", openPrintDialog, { once: true });
    }
  }

  generatePdfButton.addEventListener("click", generatePdf);
}
