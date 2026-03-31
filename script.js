const cells = document.querySelectorAll(".cell");

let schedules = {}; // {이름: []}
let selected = [];
let currentPerson = null;

// 🔥 데이터 저장
function saveData() {
  localStorage.setItem("timetableData", JSON.stringify(schedules));
}

// 🔥 데이터 불러오기
function loadData() {
  const data = localStorage.getItem("timetableData");

  if (data) {
    schedules = JSON.parse(data);

    for (let name in schedules) {
      createButton(name);
    }
  }
}

// 사람 추가
function addPerson() {
  const name = document.getElementById("nameInput").value;
  if (!name || schedules[name]) return;

  schedules[name] = Array(45).fill(""); // 9교시 x 5일
  createButton(name);

  if (!currentPerson) currentPerson = name;

  document.getElementById("nameInput").value = "";

  saveData(); // 추가 후 저장
}

// 버튼 생성
function createButton(name) {
  const btn = document.createElement("button");
  btn.textContent = name;

  btn.onclick = () => {
    if (selected.includes(name)) {
      selected = selected.filter(n => n !== name);
      btn.classList.remove("selected");
    } else {
      selected.push(name);
      btn.classList.add("selected");
    }
    updateUI();
  };

  btn.ondblclick = () => {
    currentPerson = name;
    alert(name + " 시간표 입력 모드");
  };

  document.getElementById("buttons").appendChild(btn);
}

// 칸 클릭 → 시간표 입력
cells.forEach(cell => {
  const index = cell.dataset.index;

  cell.addEventListener("click", () => {
    if (!currentPerson) return;

    const subject = prompt(`${currentPerson} 과목 입력`);

    if (subject !== null) {
      schedules[currentPerson][index] = subject;
      saveData(); // 🔥 입력할 때마다 저장
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
    cell.style.color = "black";

    if (active.length === 0) {
      cell.style.background = "";
      return;
    }

    if (peopleWithClass.length === 0) {
      // 공강 → 표시 안 함
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
    }
  });
}

// 🔥 페이지 로드 시 실행
loadData();
updateUI();