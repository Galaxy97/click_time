const files = require('modules/../../pages/scripts/files.js'); 

async function getSetupData() {
  const data =  await files.getData();
  console.log(data);
  data.common.show_time.from = 701;
  const saved = await files.setData(data);
  if (saved) {
    console.log('ok');
  }
}
