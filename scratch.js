const fetch = require('node-fetch');
async function run() {
  const res = await fetch('https://test.dodopayments.com/api/products', {
    headers: { 'Authorization': 'Bearer i2C7srYd2mlUpXtJ.nSef762JdjKvNHHjT2lAH_oKQH7GrAU6tHsHcpF6Epf8O7dW' }
  });
  console.log(await res.text());
}
run();
