const cells = document.querySelectorAll(".cell");

let schedules = {}; // {이름: []}
let selected = [];
let currentPerson = null;

// 사람 추가
function addPerson() {
  const name = document.getElementById("nameInput").value;
  if (!name || schedules[name]) return;

  schedules[name] = Array(45).fill(""); // 9교시 x 5일
  createButton(name);

  if (!currentPerson) currentPerson = name;

  document.getElementById("nameInput").value = "";
}

// 버튼 생성
function createButton(name) {
  const btn = document.createElement("button");
  btn.textContent = name;

  btn.onclick = () => {
    if (selected.includes(name)) {
      selected = selected.filter(n => n !== name);
      btn.style.background = "";
    } else {
      selected.push(name);
      btn.style.background = "#87CEFA";
    }
    updateUI();
  };

  btn.ondblclick = () => {
    currentPerson = name;
    alert(name + " 시간표 입력 모드");
  };

  document.getElementById("buttons").appendChild(btn);
}

// 클릭해서 입력
cells.forEach(cell => {
  const index = cell.dataset.index;

  cell.addEventListener("click", () => {
    if (!currentPerson) return;

    const subject = prompt(`${currentPerson} 과목 입력`);

    if (subject !== null) {
      schedules[currentPerson][index] = subject;
      updateUI();
    }
  });
});

// UI 업데이트
function updateUI() {
  cells.forEach(cell => {
    const index = cell.dataset.index;

    const active = selected.length ? selected : [];

    const peopleWithClass = active.filter(name => schedules[name][index]);

    cell.textContent = "";

    if (active.length === 0) {
      cell.style.background = "";
      return;
    }

    if (peopleWithClass.length === 0) {
      // 공강
      cell.textContent = "";
      cell.style.background = "";
    } else if (peopleWithClass.length === active.length) {
      // 전원 수업
      cell.textContent = peopleWithClass.join(", ");
      cell.style.background = "purple";
      cell.style.color = "white";
    } else {
      // 일부만 수업
      cell.textContent = peopleWithClass.join(", ");
      cell.style.background = "orange";
      cell.style.color = "black";
    }
  });
}