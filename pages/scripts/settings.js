const files = require("modules/../../pages/scripts/files.js");

document.addEventListener("DOMContentLoaded", setValues);

async function setValues() {
  files
    .getData()
    .then(data => {
      document.getElementById("show_time_from").value =
        data.common.show_time.from;
      document.getElementById("show_time_from").onchange = () => {
        data.common.show_time.from = Number(
          document.getElementById("show_time_from").value
        );
        files.setData(data).catch(e => console.log(e));
      };
      //
      document.getElementById("show_time_for").value =
        data.common.show_time.for;
      document.getElementById("show_time_for").onchange = () => {
        data.common.show_time.for = Number(
          document.getElementById("show_time_for").value
        );
        files.setData(data).catch(e => console.log(e));
      };
      //
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
      document.getElementById("numbers_from").value = data.common.numbers.from;
      document.getElementById("numbers_from").onchange = () => {
        data.common.pause.from = Number(
          document.getElementById("numbers_from").value
        );
        files.setData(data).catch(e => console.log(e));
      };
      //
      document.getElementById("numbers_for").value = data.common.numbers.for;
      document.getElementById("numbers_for").onchange = () => {
        data.common.pause.for = Number(
          document.getElementById("numbers_for").value
        );
        files.setData(data).catch(e => console.log(e));
      };
      //
      /*-- figures -- */
      document.getElementById("thickness_from").value =
        data.figures.thickness.from;
      document.getElementById("thickness_from").onchange = () => {
        data.figures.thickness.from = Number(
          document.getElementById("thickness_from").value
        );
        files.setData(data).catch(e => console.log(e));
      };
      //
      document.getElementById("thickness_for").value =
        data.figures.thickness.for;
      document.getElementById("thickness_for").onchange = () => {
        data.figures.thickness.for = Number(
          document.getElementById("thickness_for").value
        );
        files.setData(data).catch(e => console.log(e));
      };
      //
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
