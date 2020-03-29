async function start() {
  document.getElementById("messeage").style.opacity = "1";
  document.getElementById("messeage").innerText =
    "Натисніть клавішу \"стрілка вниз\" як омога більше разів за 10 секунд";
  document.getElementById("attention-message").innerText =
    "Час відраховуватиметься від вашого першого натиску";
  document.getElementById("attention-message").style.opacity = "1";

  let activeTest = false;
  const results = {};
  let clicks = 0;

  document.addEventListener("keydown", onePress);
  function onePress(event) {
    if (event.code == "ArrowDown") {
      if (!activeTest) {
        setTimeout(() => {
          activeTest = true;
          document.getElementById("attention-message").innerText = `Йде тест`;
          results.start = performance.now();
          setTimeout(() => {
            results.end = performance.now();
            document.removeEventListener("keydown", onePress);
            document.getElementById(
              "attention-message"
            ).innerText = `Tест завершено`;
            const avTime =  (results.end - results.start) / clicks;
            document.getElementById(
              "messeage"
            ).innerText = `Результат ${clicks}, середній час натиску ${avTime.toFixed(3)}`;
          }, 10000);
        }, 500);
      } else {
        clicks++;
      }
    }
  }
}
