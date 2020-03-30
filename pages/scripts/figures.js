const files = require(require("path")
  .join(__dirname, "../scripts", "files.js")
  .replace(/\\/g, "/"));

async function start() {
  const data = await files.getData();
  let iter = 0;
  // 0 - square, 1 - circle, 2 - triangle
  const figures = [];
  for (let i = 0; i < data.common.numbers; i++) {
    figures.push(getRandomInt(0, 2));
  }
  console.log(figures);
  // ------------------------------------
  document.getElementById("messeage").style.opacity = "1";
  document.getElementById("messeage").innerText =
    'Тест почнеться, як тільки натиснете клавішу "Л"';

  let testIsRunning = false;
  let begin = false;
  let show = false;
  let unpressOne = false;
  let unpressTwo = true;
  const results = { times: {} };

  document.addEventListener("keydown", event => {
    console.log(event.code);
  });

  // console.log("клавіша K натиснута");
  document.addEventListener("keydown", onePress);
  function onePress(event) {
    if (event.code == "ShiftRight") {
      unpressOne = false;
      if (!testIsRunning && !begin) {
        testIsRunning = true;
        begin = true;
        results.begin = performance.now();
      }
      if (begin && unpressTwo && !show) {
        begin = false;
        show = true;
        document.getElementById("messeage").innerText = `Фігура ${iter + 1} з ${
          data.common.numbers
        }`;
        document.getElementById("attention-message").style.opacity = "1";
        document.getElementById("attention-message").innerText =
          "Необхідно відтиснути Л клавішу";
        showFigure(figures[iter], data.figures.thickness);
        results.times[iter] = {
          begin: performance.now()
        };
      }
    }
  }
  // console.log("клавіша K відпущена");
  document.addEventListener("keyup", oneUnPress);
  function oneUnPress(event) {
    unpressOne = true;
    //ShiftRight Enter
    if (event.code == "ShiftRight") {
      if (show && unpressTwo) {
        results.times[iter].sensor = performance.now();
        document.getElementById("attention-message").innerText =
          "Необхідно натиснути О клавішу";
      }
    }
  }
  // console.log("клавіша J натиснута");
  document.addEventListener("keydown", twoPress);
  function twoPress(event) {
    //Slash Quote
    if (event.code == "Slash") {
      unpressTwo = false;
      if (show && unpressOne) {
        show = false;
        hideFigure(figures[iter]);
        results.times[iter].moving = performance.now();
        document.getElementById("attention-message").innerText =
          "Необхідно відтиснути О клавішу";
      }
    }
  }
  // console.log("клавіша J відпущена");
  document.addEventListener("keyup", twoUnPress);
  function twoUnPress(event) {
    if (event.code == "Slash") {
      unpressTwo = true;
      if (!show) {
        const pause = getRandomInt(
          data.common.pause.from,
          data.common.pause.for
        );
        if (iter + 1 == data.common.numbers) {
          results.end = performance.now();
          results.repeats = data.common.numbers;
          document.getElementById("attention-message").innerText =
            "Відпустіть всі клавіші";
          document.getElementById("messeage").innerText = "Тест завершено";
          document.removeEventListener("keydown", onePress);
          document.removeEventListener("keydown", twoPress);
          document.removeEventListener("keyup", oneUnPress);
          document.removeEventListener("keyup", twoUnPress);
          calculateResult(results); // calculate
          console.log(results);
          localStorage.setItem("results", JSON.stringify(results));
          document.location.href = "./showRes.html";
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

function showFigure(type, thickness) {
  console.log(thickness);
  switch (type) {
    case 0:
      document.getElementById("square").style.display = "block";
      document
        .getElementById("square")
        .style.setProperty("--border-thickness", thickness + "px");
      break;
    case 1:
      document.getElementById("circle").style.display = "block";
      document
        .getElementById("circle")
        .style.setProperty("--border-thickness", thickness + "px");
      break;
    case 2:
      document.getElementById("triangle").style.display = "block";
      document
        .getElementById("triangle")
        .style.setProperty("--border-thickness", thickness + "px");
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
  let CK = 0;
  let DP = 0;
  let MK = 0;
  Object.keys(results.times).forEach(key => {
    const ck = results.times[key].sensor - results.times[key].begin;
    const dp = results.times[key].moving - results.times[key].begin;
    const mk = dp - ck;
    results.times[key].ck = ck;
    results.times[key].dp = dp;
    results.times[key].mk = mk;
    CK += ck;
    DP += dp;
    MK += mk;
  });
  results.average = {
    CK: CK / results.repeats,
    DP: DP / results.repeats,
    MK: MK / results.repeats
  };
}
