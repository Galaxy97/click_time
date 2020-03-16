const files = require("modules/../../pages/scripts/files.js");

let btnDown = false;
let btnLeft = false;

window.addEventListener("keyup", function(event) {
  if (event.code == "ArrowDown") {
    console.log("клавіша Down відпущена");
    btnDown = false;
  }
});
window.addEventListener("keydown", function(event) {
  if (event.code == "ArrowDown") {
    console.log("клавіша Down натиснута");
    btnDown = true;
  }
});
window.addEventListener("keyup", function(event) {
  if (event.code == "ArrowLeft") {
    console.log("клавіша Left відпущена");
    btnLeft = false;
  }
});
window.addEventListener("keydown", function(event) {
  if (event.code == "ArrowLeft") {
    console.log("клавіша Left натиснута");
    btnLeft = true;
  }
});

async function start() {
  const data = await files.getData();
  const repeats = getRandomInt(
    data.common.numbers.from,
    data.common.numbers.for
  );
  let iterator = 0;
  let show = false;
  let hide = false;
  // 0 - square, 1 - circle, 2 - triangle
  const figures = [];
  for (let i = 0; i < repeats; i++) {
    figures.push(getRandomInt(0, 2));
  }
  console.log(figures);
  // ------------------------------------

  // -------------------- TEST BEGIN -----+++++++++
  const time_start = performance.now();
  show = true;
  const timerId = setInterval(() => {
    if (iterator == repeats) clearInterval(timerId);
    if (show) {
      show = false;
      showFigure(figures[iterator]);
    }
    if (hide) {
      hide = false;
      hideFigure(figures[iterator]);
    }
  }, 0);
  const time_end = performance.now();
  console.log(time_end - time_start);
  // -------------------- TEST END -----============
}

function showFigure(type) {
  switch (type) {
    case 0:
      document.getElementById('square').style.display = 'block';
      break;
    case 1:
      document.getElementById('circle').style.display = 'block';
      break;
    case 2:
      document.getElementById('triangle').style.display = 'block';
      break;
  }
}

function hideFigure(type) {
  switch (type) {
    case 0:
      document.getElementById('square').style.display = 'none';
      break;
    case 1:
      document.getElementById('circle').style.display = 'none';
      break;
    case 2:
      document.getElementById('triangle').style.display = 'none';
      break;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Включаючи мінімум та максимум
}
