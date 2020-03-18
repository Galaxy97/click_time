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

  document.getElementById("attention-message").style.color = 'green';

  let testIsRunning = false;
  let begin = false;
  let show = false;
  let unpressOne = false;
  let unpressTwo = true;
  const results = {};
  // console.log("клавіша K натиснута");
  window.addEventListener("keydown", function(event) {
    if (event.code == "KeyK") {
      if (!testIsRunning && !begin) {
        testIsRunning = true;
        begin = true;
        results.begin = performance.now();
      }
      if (begin && unpressTwo) {
        begin = false;
        unpressOne = false;
        document.getElementById("messeage").innerText = `Фігура ${iter +
          1} з ${repeats}`;
        document.getElementById("attention-message").innerText = 'Необхідно відтиснути Л клавішу';
        showFigure(figures[iter]);
        show = true;
        results[iter] = {
          begin: performance.now()
        };
      }
    }
  });
  // console.log("клавіша K відпущена");
  window.addEventListener("keyup", function(event) {
    if (event.code == "KeyK") {
      if (show) {
        unpressOne = true;
        results[iter].sensor = performance.now();
        document.getElementById("attention-message").innerText = 'Необхідно натиснути О клавішу';
      }
    }
  });
  // console.log("клавіша J натиснута");
  window.addEventListener("keydown", function(event) {
    if (event.code == "KeyJ") {
      if (unpressOne) {
        unpressTwo = false;
        hideFigure(figures[iter]);
        show = false;
        results[iter].moving = performance.now();
        document.getElementById("attention-message").innerText = 'Необхідно відтиснути О клавішу';
      }
    }
  });
  // console.log("клавіша J відпущена");
  window.addEventListener("keyup", function(event) {
    if (event.code == "KeyJ") {
      unpressTwo = true;
      if (!show) {
        const pause = getRandomInt(
          data.common.pause.from,
          data.common.pause.for
        );
        results[iter].pause = pause;
        document.getElementById("attention-message").innerText = 'Необхідно тримати Л клавішу';
        setTimeout(() => {
          if (iter + 1 != repeats) {
            iter++;
            begin = true;
          } else {
            results.end = performance.now();
            console.log(results);
            document.getElementById("messeage").innerText = "Тест завершено";
          }
        }, pause); // pause
      }
    }
  });
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
