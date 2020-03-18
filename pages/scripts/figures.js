const files = require("modules/../../pages/scripts/files.js");

async function start() {
  const data = await files.getData();
  const repeats = getRandomInt(
    data.common.numbers.from,
    data.common.numbers.for
  );
  let iter = 0;
  // 0 - square, 1 - circle, 2 - triangle
  const figures = [];
  for (let i = 0; i < repeats; i++) {
    figures.push(getRandomInt(0, 2));
  }
  console.log(figures);
  // ------------------------------------
  document.getElementById("messeage").style.color = "red";
  document.getElementById("messeage").innerText =
    'тест почнеться, як тільки натиснете клавішу "Л"';

  document.getElementById("attention-message").style.color = "green";

  let testIsRunning = false;
  let begin = false;
  let show = false;
  let unpressOne = false;
  let unpressTwo = true;
  const results = {};
  // console.log("клавіша K натиснута");
  document.addEventListener("keydown", onePress);
  function onePress(event) {
    if (event.code == "KeyK") {
      unpressOne = false;
      if (!testIsRunning && !begin) {
        testIsRunning = true;
        begin = true;
        results.begin = performance.now();
      }
      if (begin && unpressTwo && !show) {
        begin = false;
        show = true;
        document.getElementById("messeage").innerText = `Фігура ${iter +
          1} з ${repeats}`;
        document.getElementById("attention-message").innerText =
          "Необхідно відтиснути Л клавішу";
        showFigure(figures[iter]);
        results[iter] = {
          begin: performance.now()
        };
      }
    }
  }
  // console.log("клавіша K відпущена");
  document.addEventListener("keyup", oneUnPress);
  function oneUnPress(event) {
    unpressOne = true;
    if (event.code == "KeyK") {
      if (show && unpressTwo) {
        results[iter].sensor = performance.now();
        document.getElementById("attention-message").innerText =
          "Необхідно натиснути О клавішу";
      }
    }
  }
  // console.log("клавіша J натиснута");
  document.addEventListener("keydown", twoPress);
  function twoPress(event) {
    if (event.code == "KeyJ") {
      unpressTwo = false;
      if (show && unpressOne) {
        show = false;
        hideFigure(figures[iter]);
        results[iter].moving = performance.now();
        document.getElementById("attention-message").innerText =
          "Необхідно відтиснути О клавішу";
      }
    }
  }
  // console.log("клавіша J відпущена");
  document.addEventListener("keyup", twoUnPress);
  function twoUnPress(event) {
    if (event.code == "KeyJ") {
      unpressTwo = true;
      if (!show) {
        const pause = getRandomInt(
          data.common.pause.from,
          data.common.pause.for
        );
        results[iter].pause = pause;
        if (iter + 1 == repeats) {
          results.end = performance.now();
          document.getElementById("attention-message").innerText =
            "Відпустіть всі клавіші";
          console.log(results);
          document.getElementById("messeage").innerText = "Тест завершено";
          document.removeEventListener("keydown", onePress);
          document.removeEventListener("keydown", twoPress);
          document.removeEventListener("keyup", oneUnPress);
          document.removeEventListener("keyup", twoUnPress);
        } else {
          document.getElementById("attention-message").innerText =
            "Необхідно тримати Л клавішу";
          iter++;
          setTimeout(() => {
            begin = true;
          }, pause); // pause
        }
      }
    }
  }
}

function showFigure(type) {
  switch (type) {
    case 0:
      document.getElementById("square").style.display = "block";
      break;
    case 1:
      document.getElementById("circle").style.display = "block";
      break;
    case 2:
      document.getElementById("triangle").style.display = "block";
      break;
  }
}

function hideFigure(type) {
  switch (type) {
    case 0:
      document.getElementById("square").style.display = "none";
      break;
    case 1:
      document.getElementById("circle").style.display = "none";
      break;
    case 2:
      document.getElementById("triangle").style.display = "none";
      break;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Включаючи мінімум та максимум
}
