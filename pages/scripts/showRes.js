module.exports = (documentId, results) => {
  const table = document.createElement("table");
  table.style.color = "white";
  table.append(createHeaders());
  createBody(table, results.times);
  document.getElementById(documentId).append(table);
  const div = document.createElement("div");
  div.style.color = "white";
  document.getElementById(documentId).append(div);
  const averageCK = document.createElement("div");
  averageCK.innerHTML = `<h3>Cереднє значення сенсорного компоненту</h3> ${results.average.CK.toFixed(3)} (мс)`;
  div.append(averageCK);
  const averageDP = document.createElement("div");
  averageDP.innerHTML = `<h3>Cереднє значення сенсорного компоненту</h3> ${results.average.DP.toFixed(3)} (мс)`;
  div.append(averageDP);
  const averageMK = document.createElement("div");
  averageMK.innerHTML = `<h3>Cереднє значення сенсорного компоненту</h3> ${results.average.MK.toFixed(3)} (мс)`;
  div.append(averageMK);
};

function createHeaders() {
  const tr = document.createElement("tr");
  const experiment = document.createElement("th");
  experiment.innerText = "номер досліду";
  tr.append(experiment);

  const sensor = document.createElement("th");
  sensor.innerText = "сенсорний компонент";
  tr.append(sensor);

  const moving = document.createElement("th");
  moving.innerText = "час рухомої реакції";
  tr.append(moving);

  return tr;
}

function createBody(table, data) {
  Object.keys(data).forEach(key => {
    const tr = document.createElement("tr");
    const num = document.createElement("td");
    num.innerText = `${Number(key) + 1}`;
    tr.append(num);
    const ck = document.createElement("td");
    ck.innerText = `${data[key].ck.toFixed(3)} (мс)`;
    tr.append(ck);
    const dp = document.createElement("td");
    dp.innerText = `${data[key].dp.toFixed(3)} (мс)`;
    tr.append(dp);
    const mk = document.createElement("td");
    mk.innerText = `${data[key].mk.toFixed(3)} (мс)`;
    tr.append(mk);
    table.append(tr);
  });
}
