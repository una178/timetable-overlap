const cells = document.querySelectorAll(".cell");

let mySchedule = [];
let friendSchedule = [];

let currentMode = "me"; // 현재 입력 모드

function setMode(mode) {
  currentMode = mode;
  alert(mode === "me" ? "내 시간표 입력 모드" : "친구 시간표 입력 모드");
}

// 초기화
cells.forEach((cell, index) => {
  mySchedule[index] = "";
  friendSchedule[index] = "";

  cell.addEventListener("click", () => {
    const subject = prompt("과목 입력:");

    if (!subject) return;

    if (currentMode === "me") {
      mySchedule[index] = subject;
    } else {
      friendSchedule[index] = subject;
    }

    updateUI();
  });
});

function updateUI() {
  cells.forEach((cell, index) => {
    const my = mySchedule[index];
    const friend = friendSchedule[index];

    cell.textContent = "";

    if (my && friend) {
      cell.textContent = my;
      cell.style.backgroundColor = "purple";
      cell.style.color = "white";
    } else if (my) {
      cell.textContent = my;
      cell.style.backgroundColor = "#87CEFA";
      cell.style.color = "black";
    } else if (friend) {
      cell.textContent = friend;
      cell.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
      cell.style.color = "black";
    } else {
      cell.style.backgroundColor = "";
    }
  });
}

updateUI();