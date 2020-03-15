window.addEventListener("keyup", function(event) {
  if (event.code == "KeyZ") {
    console.log('клавіша відпущена');
  }
});
window.addEventListener("keydown", function(event) {
  if (event.code == "KeyZ") {
    console.log('клавіша натиснута');
  }
});
