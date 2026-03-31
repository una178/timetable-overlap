const cells = document.querySelectorAll(".cell");

let schedules = {};
let selected = [];
let currentPerson = null;

// 저장
function saveData() {
  localStorage.setItem("timetableData", JSON.stringify(schedules));
}

// 불러오기
function loadData() {
  const data = localStorage.getItem("timetableData");

  if (data) {
    schedules = JSON.parse(data);

    for (let name in schedules) {
      createButton(name);
    }

    currentPerson = Object.keys(schedules)[0];
  }
}

// 사람 추가
function addPerson() {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();

  if (!name || schedules[name]) return;

  schedules[name] = Array(45).fill("");
  createButton(name);

  if (!currentPerson) currentPerson = name;

  input.value = "";
  saveData();
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

// 클릭 입력 (🔥 여기 안정화)
cells.forEach(cell => {
  const index = Number(cell.dataset.index);

  cell.addEventListener("click", () => {
    if (!currentPerson) {
      alert("먼저 사람을 추가하세요");
      return;
    }

    const subject = prompt(`${currentPerson} 과목 입력`);

    if (subject === null) return;

    schedules[currentPerson][index] = subject;
    saveData();
    updateUI();
  });
});

// UI 업데이트 (🔥 이름 + 과목 표시 포함)
function updateUI() {
  cells.forEach(cell => {
    const index = Number(cell.dataset.index);

    const active = selected.length ? selected : [currentPerson];

    if (!active[0]) {
      cell.textContent = "";
      cell.style.background = "";
      return;
    }

    const peopleWithClass = active
      .filter(name => schedules[name][index])
      .map(name => `${name}(${schedules[name][index]})`);

    cell.textContent = "";
    cell.style.color = "black";

    if (peopleWithClass.length === 0) {
      cell.style.background = "";
    } else if (peopleWithClass.length === active.length) {
      cell.textContent = peopleWithClass.join(", ");
      cell.style.background = "purple";
      cell.style.color = "white";
    } else {
      cell.textContent = peopleWithClass.join(", ");
      cell.style.background = "orange";
    }
  });
}

// 현재 사람 초기화
function resetCurrent() {
  if (!currentPerson) return;

  if (confirm(currentPerson + " 시간표를 초기화할까요?")) {
    schedules[currentPerson] = Array(45).fill("");
    saveData();
    updateUI();
  }
}

// 전체 초기화
function resetData() {
  if (confirm("전체 데이터를 초기화할까요?")) {
    localStorage.removeItem("timetableData");
    location.reload();
  }
}

// 실행
loadData();
updateUI();