"use strict";

const input = document.getElementById("input");

const addBtn = document.getElementById("add-btn");

const ulEl = document.getElementById("ul");

ulEl.innerHTML = "";

let tasks = [];
let liList = [];

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let inputValue = input.value.trim();

  input.value = "";

  if (inputValue) {
    if (tasks.length < 7) {
      tasks.push({ text: inputValue, ticked: false });

      updateList();
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      alert("No more than 7 tasks is recommended!");
    }
  }
  input.focus();
});

const updateList = () => {
  ulEl.innerHTML = "";
  liList = [];
  tasks.forEach((task) => {
    const li = document.createElement("li");
    task.ticked ? li.classList.add("line") : li.classList.remove("line");
    task.ticked ? li.classList.add("border") : li.classList.remove("border");

    li.innerHTML = `          
    <p class="li-content">${task.text}</p>
    <div class="btns">
      <button class="done" id="doneBtn"><i class="fa-solid fa-check"></i></button>
      <button class="deleteBtn"><i class="fa-solid fa-xmark"></i></button>
    </div>`;

    ulEl.append(li);
    liList.push(li);
  });

  const doneBtns = document.querySelectorAll(".done");
  doneBtns.forEach((btnDone, index) => {
    btnDone.addEventListener("click", () => {
      if (liList[index].classList.contains("line")) {
        liList[index].classList.remove("line");
        liList[index].classList.remove("border");
      } else {
        liList[index].classList.add("line");
        liList[index].classList.add("border");
      }
      tasks[index].ticked = !tasks[index].ticked;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      updateList();
    });
  });

  const deleteBtns = document.querySelectorAll(".deleteBtn");
  deleteBtns.forEach((btnDel, index) => {
    btnDel.addEventListener("click", () => {
      removeLi(index);
    });
  });
};

const removeLi = (index) => {
  tasks.splice(index, 1);
  liList.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateList();
};

const getData = () => {
  const storedData = JSON.parse(localStorage.getItem("tasks"));
  if (storedData) {
    tasks = storedData;
  }
  updateList();
};

getData();
