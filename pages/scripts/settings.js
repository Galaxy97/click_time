const files = require(require("path").join(__dirname, "../scripts","files.js").replace(/\\/g, '/'));

document.addEventListener("DOMContentLoaded", setValues);

async function setValues() {
  files
    .getData()
    .then(data => {
      document.getElementById("pause_from").value = data.common.pause.from;
      document.getElementById("pause_from").onchange = () => {
        data.common.pause.from = Number(
          document.getElementById("pause_from").value
        );
        files.setData(data).catch(e => console.log(e));
      };
      //
      document.getElementById("pause_for").value = data.common.pause.for;
      document.getElementById("pause_for").onchange = () => {
        data.common.pause.for = Number(
          document.getElementById("pause_for").value
        );
        files.setData(data).catch(e => console.log(e));
      };
      //
      document.getElementById("numbers").value = data.common.numbers;
      document.getElementById("numbers").onchange = () => {
        data.common.numbers = Number(
          document.getElementById("numbers").value
        );
        files.setData(data).catch(e => console.log(e));
      };
      //
      /*-- figures -- */
      document.getElementById("thickness").value =
        data.figures.thickness;
      document.getElementById("thickness").onchange = () => {
        data.figures.thickness = Number(
          document.getElementById("thickness").value
        );
        files.setData(data).catch(e => console.log(e));
      };
      // ------------ words --------
      document.getElementById("words").value = data.words.join(", ");
      document.getElementById("words").onchange = () => {
        data.words = document.getElementById("words").value.split(", ");
        files.setData(data).catch(e => console.log(e));
      };
      // ------------ colours --------
      document.getElementById("red").value = data.colours.red;
      document.getElementById("red").onchange = () => {
        data.colours.red = document.getElementById("red").value;
        files.setData(data).catch(e => console.log(e));
      };
      document.getElementById("green").value = data.colours.green;
      document.getElementById("green").onchange = () => {
        data.colours.green = document.getElementById("green").value;
        files.setData(data).catch(e => console.log(e));
      };
      document.getElementById("blue").value = data.colours.blue;
      document.getElementById("blue").onchange = () => {
        data.colours.blue = document.getElementById("blue").value;
        files.setData(data).catch(e => console.log(e));
      };
    })
    .catch(error => console.log(error));
}
