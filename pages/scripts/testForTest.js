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
  document.getElementById("messeage").style.opacity = "1";
  document.getElementById("messeage").innerText =
    'Тест почнеться, як тільки натиснете клавішу "Пробіл"';

  let testIsRunning = false;
  let show = false;
  const results = { times: {} };
  results.repeats = repeats;
  // console.log("клавіша K натиснута");
  document.addEventListener("keydown", onePress);
  function onePress(event) {
    if (event.code == "Space") {
      if (show) {
        results.times[iter].hide = performance.now();
        show = false;
        hideFigure(figures[iter]);
        const pause = getRandomInt(
          data.common.pause.from,
          data.common.pause.for
        );
        if (iter + 1 >= repeats) {
          document.removeEventListener("keydown", onePress);
          calculateResult(results); // calculate
          console.log(results);
          document.getElementById("messeage").innerText =
            "Середній час реакції " + results.average.AT;
        } else {
          setTimeout(() => {
            iter++;
            show = true;
            document.getElementById("messeage").innerText = `Фігура ${iter +
              1} з ${repeats}`;
            document.addEventListener("keydown", onePress);
            showFigure(figures[iter], data.figures.thickness);
            results.times[iter] = { show: performance.now() };
          }, pause);
        }
      }
      if (!testIsRunning) {
        setTimeout(() => {
          testIsRunning = true;
          show = true;
          document.getElementById("messeage").innerText = `Фігура ${iter +
            1} з ${repeats}`;
          const sh = performance.now();
          showFigure(figures[iter], data.figures.thickness);
          console.log(performance.now() - sh);
          results.times[iter] = { show: performance.now() };
        }, 1200);
      }
    }
  }
}
function showFigure(type, thickness) {
  switch (type) {
    case 0:
      document.getElementById("square").style.display = "block";
      document
        .getElementById("square")
        .style.setProperty(
          "--border-thickness",
          getRandomInt(thickness.from, thickness.for) + "px"
        );
      break;
    case 1:
      document.getElementById("circle").style.display = "block";
      document
        .getElementById("circle")
        .style.setProperty(
          "--border-thickness",
          getRandomInt(thickness.from, thickness.for) + "px"
        );
      break;
    case 2:
      document.getElementById("triangle").style.display = "block";
      document
        .getElementById("triangle")
        .style.setProperty(
          "--border-thickness",
          getRandomInt(thickness.from, thickness.for) + "px"
        );
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

function calculateResult(results) {
  let AT = 0;
  Object.keys(results.times).forEach(key => {
    const at = results.times[key].hide - results.times[key].show;
    results.times[key].at = at;
    AT += at;
  });
  results.average = {
    AT: AT / results.repeats
  };
}
