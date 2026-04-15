import DodoPayments from 'dodopayments'

const client = new DodoPayments({
  bearerToken: 'i2C7srYd2mlUpXtJ.nSef762JdjKvNHHjT2lAH_oKQH7GrAU6tHsHcpF6Epf8O7dW',
  environment: 'test_mode',
})

async function test() {
  try {
    const response = await client.products.list({ limit: 5 } as any)
    console.log(response)
    console.log("Keys in response:", Object.keys(response))
  } catch(e) {
    console.error(e)
  }
}

test()
