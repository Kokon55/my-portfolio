import Stripe from 'stripe';

const key = process.env.STRIPE_SECRET_KEY;

export const getStripe = (): Stripe => {
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(key, { apiVersion: '2025-02-24.acacia' });
};

export const PRODUCT = {
  name: 'データ探偵 SNS編 - 全6ケース永久アクセス',
  // 早期割引価格(税込・JPY)
  earlyBirdPriceJpy: 1980,
  regularPriceJpy: 2480,
};
