// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products, userName, email, shippingAddress, billingAddress } = ctx.request.body;

    try {

      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::product.product")
            .findOne(product.id);

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.title,
              },
              unit_amount: item.price * 100,
            },
            quantity: product.quantity,
          };
        })
      );

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/checkout/success`,
        cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
        line_items: lineItems,
        payment_method_types: ["card"],
        customer_email: email
      });

      await strapi
        .service("api::order.order")
        .create({
          data: {
            products,
            shippingAddress,
            billingAddress,
            userName,
            email,
            stripeId: session.id,
          },
        });

      return { stripeSession: session };
    } catch (err) {
      ctx.response.state = 500;
      return err;
    }
  }
}));