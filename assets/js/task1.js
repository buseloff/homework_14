"use strict";
/*  Задание 1.Доделать todo (добавление, удаление задачи):
- застилить;
- валидация на ввод;
- добавление времени заметки;
- добавить к задаче chеckbox, чтобы можно было выделить несколько задач: 
А. удалите несколько задач сразу 
В. поменять цвет, бэкграунд, нескольких задач сразу при выделении чекбоксами.
 */

"use strict";
/*Регулярное выражение для ввода данных*/
const myRegExp = /^[\w\d\.:\?\&\!\ \,\ -\%\*\(\)]{6,40}$/;
/*Поиск на странице поля ввода, кнопок и списка задач*/
const userTaskInput = document.querySelector('input[name="task"]');
const createTaskButton = document.getElementById("createTaskButton");
const deleteTaskButton = document.getElementById("deleteTaskButton");
const tasksList = document.getElementById("tasksList");

/*Добавление для поля ввода и кнопок событий и их обработка функциями*/
createTaskButton.addEventListener("click", createTaskItem);
deleteTaskButton.addEventListener("click", deleteTaskItem);
userTaskInput.addEventListener("input", onInputValidator);

/*Функция создания и добавления задачи в виде элемента списка с проверкой:
на соответствие регулярному выражению и на наличие такой же задачи в списке*/ 
function createTaskItem() {
  let isValid = false;
  let isTheSameData = false;
  isValid = myRegExp.test(userTaskInput.value);
  let userTasks = document.getElementsByTagName("li");
  Array.from(userTasks).forEach((element) => {
    if (element.innerText.includes(userTaskInput.value)) {
      isTheSameData = true;
    }
  });
  if (isValid & !isTheSameData) {
    let newTask = document.createElement("li");
    newTask.classList.add("taskItem");
    newTask.textContent = userTaskInput.value;
    newTask.append(addTimeAndCheckbox());
    tasksList.append(newTask);
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    Array.from(checkboxes).forEach((element) => {
      element.addEventListener("change", checkedTaskItem);
    });
  } else {
    if (!isValid) alert("Incorrect data!!!");
    if (isTheSameData) alert("Task already exists!!!");
  }
}

/*Функция удаления задачи в виде элемента списка*/
function deleteTaskItem() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let counter = 0;
  Array.from(checkboxes).forEach((element) => {
    if (element.checked) {
      counter++;
    }
  });

  if (counter > 0) {
    if (confirm("Do you want to delete your task?")) {
      let deleteTask = document.getElementsByTagName("li");
      Array.from(deleteTask).forEach((element) => {
        if (element.querySelector('input[type="checkbox"]').checked) {
          element.remove();
        } else {
          return;
        }
      });
    }
  } else {
    alert("Choose task to delete!!!");
  }
}

/*Функция проверки поля ввода на соответствие регулярному выражению 
с изменением полю ввода соответств. класса(стиля) оформления*/
function onInputValidator() {
  let isValid = false;
  isValid = myRegExp.test(this.value);
  if (isValid) {
    this.classList.remove("invalid_style");
    this.classList.add("valid_style");
  } else {
    this.classList.remove("valid_style");
    this.classList.add("invalid_style");
  }
}

/* Функция добавления задаче в виде элемента списка даты создания и чекбокса*/
function addTimeAndCheckbox() {
  const timeElement = document.createElement("div");
  timeElement.classList.add("timeElement");
  const time = new Date();
  timeElement.textContent =
    "    Time: " +
    time.getFullYear() +
    "/" +
    dateFormat2(time.getMonth() + 1) +
    "/" +
    dateFormat2(time.getDate()) +
    " " +
    dateFormat2(time.getHours()) +
    ":" +
    dateFormat2(time.getMinutes()) +
    " ";
  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  timeElement.appendChild(checkBox);
  return timeElement;
}

/*Функция форматирования даты создания*/
function dateFormat2(value) {
  return value < 10 ? `0${value}` : value;
}

/*Функция изменения класса (стиля) для оформления элементов 
списка с отмеченными чекбоксами*/
function checkedTaskItem(event) {
  if (event.target.checked) {
    event.target.parentElement.parentElement.classList.add("checkedItem");
  } else {
    event.target.parentElement.parentElement.classList.remove("checkedItem");
  }
}
