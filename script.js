const cells = document.querySelectorAll(".cell");

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const subject = prompt("과목 입력:");

    if (subject) {
      cell.textContent = subject;
      cell.style.backgroundColor = "#87CEFA";
    }
  });
});