async function start() {
  document.getElementById("messeage").innerText =
    "Натисніть клавішу Space якумога більше разів за 10 секунд";
    document.getElementById("messeage").style.color = 'red';  
  document.getElementById("attention-message").innerText =
    "для початку натисніть Space";
    document.getElementById("attention-message").style.color = 'red';

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
            document.getElementById("attention-message").innerText = `тест завершено`;
            document.getElementById("messeage").innerText = `Результат ${clicks}`;
          }, 3000);
        }, 1000);
      } else {
        clicks++;
      }
    }
  }
}
