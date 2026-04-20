/**
 * Subscription tier definitions — wire price IDs to env in feature work.
 */
export const plans = {
  freeTrial: {
    id: "free_trial",
    label: "Free trial",
  },
  paid: {
    id: "paid",
    label: "Paid",
    /** Stripe Price ID — set STRIPE_PRICE_ID_PAID in env */
    priceId: process.env.STRIPE_PRICE_ID_PAID ?? "",
  },
} as const;
