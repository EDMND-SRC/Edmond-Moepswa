import DodoPayments from 'dodopayments';
const client = new DodoPayments({ bearerToken: 'i2C7srYd2mlUpXtJ.nSef762JdjKvNHHjT2lAH_oKQH7GrAU6tHsHcpF6Epf8O7dW', environment: 'test' });
async function run() {
  const products = await client.products.list();
  console.log(JSON.stringify(products, null, 2));
}
run();
