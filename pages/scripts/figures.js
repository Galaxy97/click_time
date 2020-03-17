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
  document.getElementById("messeage").innerText =
    'тест почнеться, як тільки натиснете клавішу "Л"';

  let testIsRunning = false;
  let begin = false;
  let show = false;
  let unpressOne = false;
  let unpressTwo = false;
  let clickOne = false;

  window.addEventListener("keydown", function(event) {
    if (event.code == "KeyK") {
      console.log("клавіша K натиснута");
      if (!testIsRunning && !begin) {
        setTimeout(() => {
          testIsRunning = true;
          begin = true;
        }, 0);
      }
      if (begin) {
        begin = false;
        document.getElementById("messeage").innerText = "Тест розпочато";
        showFigure(figures[iter]);
        show = true;
      }
    }
  });
  window.addEventListener("keyup", function(event) {
    if (event.code == "KeyK") {
      console.log("клавіша K відпущена");
      if (show) {
        unpressOne = true;
      }
    }
  });
  window.addEventListener("keydown", function(event) {
    if (event.code == "KeyJ") {
      console.log("клавіша J натиснута");
      if (unpressOne) {
        hideFigure(figures[iter]);
        show = false;
      }
    }
  });
  window.addEventListener("keyup", function(event) {
    if (event.code == "KeyJ") {
      console.log("клавіша J відпущена");
      if (!show) {
        setTimeout(() => {
          if (iter + 1 != repeats) {
            iter++;
            begin = true;
          } else {
            alert("end");
          }
        }, 1000);
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
