const xlsx = require("xlsx");

const workbook = xlsx.readFile("test.xlsx");

const ws_data = [["kjedshgfsajd", "workjHADJKHJKld"]];
const ws = xlsx.utils.aoa_to_sheet(ws_data);
workbook.Sheets["Sheet1"] = ws;
xlsx.writeFile(workbook, 'test.xlsx');