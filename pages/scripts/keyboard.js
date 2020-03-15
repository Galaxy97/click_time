window.addEventListener("keyup", function(event) {
  if (event.code == "ArrowDown") {
    console.log('клавіша відпущена');
  }
});
window.addEventListener("keydown", function(event) {
  if (event.code == "ArrowDown") {
    console.log('клавіша натиснута');
  }
});
