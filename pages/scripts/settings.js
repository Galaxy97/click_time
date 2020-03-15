const files = require("modules/../../pages/scripts/files.js");

document.addEventListener("DOMContentLoaded", setValues);

async function setValues() {
  files
    .getData()
    .then(data => {
      document.getElementById("show_time_from").value =
        data.common.show_time.from;
      document.getElementById("show_time_from").onchange = () => {
        data.common.show_time.from = document.getElementById(
          "show_time_from"
        ).value;
        files.setData(data).catch(e => console.log(e));
      };
      //
      document.getElementById("show_time_for").value =
        data.common.show_time.for;
      document.getElementById("show_time_for").onchange = () => {
        data.common.show_time.for = document.getElementById(
          "show_time_for"
        ).value;
        files.setData(data).catch(e => console.log(e));
      };
      //
      document.getElementById("pause_from").value = data.common.pause.from;
      document.getElementById("pause_from").onchange = () => {
        data.common.pause.from = document.getElementById("pause_from").value;
        files.setData(data).catch(e => console.log(e));
      };
      //
      document.getElementById("pause_for").value = data.common.pause.for;
      document.getElementById("pause_for").onchange = () => {
        data.common.pause.for = document.getElementById("pause_for").value;
        files.setData(data).catch(e => console.log(e));
      };
      //
      document.getElementById("numbers_from").value = data.common.numbers.from;
      document.getElementById("numbers_from").onchange = () => {
        data.common.pause.from = document.getElementById("numbers_from").value;
        files.setData(data).catch(e => console.log(e));
      };
      //
      document.getElementById("numbers_for").value = data.common.numbers.for;
      document.getElementById("numbers_for").onchange = () => {
        data.common.pause.for = document.getElementById("numbers_for").value;
        files.setData(data).catch(e => console.log(e));
      };
      //

      document.getElementById("thickness_from").value =
        data.figures.thickness.from;
      document.getElementById("thickness_from").onchange = () => {
        data.figures.thickness.from = document.getElementById(
          "thickness_from"
        ).value;
        files.setData(data).catch(e => console.log(e));
      };
      //
      document.getElementById("thickness_for").value =
        data.figures.thickness.for;
      document.getElementById("thickness_for").onchange = () => {
        data.figures.thickness.for = document.getElementById(
          "thickness_for"
        ).value;
        files.setData(data).catch(e => console.log(e));
      };
      //
    })
    .catch(error => console.log(error));
}

async function getSetupData() {
  const data = await files.getData();
  console.log(data);
  data.common.show_time.from = 701;
  const saved = await files.setData(data);
  if (saved) {
    console.log("ok");
  }
}
