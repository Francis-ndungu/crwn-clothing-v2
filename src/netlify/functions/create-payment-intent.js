/* We has set up a very basic function that receives the request we expect, an amount value that we 
 pass it into the stripe to make a payment intent and then we return that intent back to the front-end*/
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    // there are couple of things that you need to know. I need to know the currency, payment method that I am going to accept as well as the amount
    const { amount } = JSON.parse(event.body);
    const paymentIntent = await stripe.paymentIntent.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      status: 400,
      body: JSON.stringify({ error }),
    };
  }
};
