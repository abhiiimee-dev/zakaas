import Razorpay from 'razorpay';
import fs from 'fs';
import path from 'path';

function getEnvVariable(key) {
  if (process.env[key]) return process.env[key];
  
  // Fallback to reading .env / .env.local if not loaded into process.env
  try {
    for (const envFile of ['.env.local', '.env']) {
      const fullPath = path.resolve(process.cwd(), envFile);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const match = content.match(new RegExp(`^${key}=(.*)$`, 'm'));
        if (match) return match[1].trim();
      }
    }
  } catch {
    // Ignore error
  }
  return null;
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const key_id = getEnvVariable('RAZORPAY_KEY_ID') || getEnvVariable('VITE_RAZORPAY_KEY_ID');
  const key_secret = getEnvVariable('RAZORPAY_KEY_SECRET');

  if (!key_id || !key_secret) {
    return res.status(500).json({ error: 'Razorpay credentials not configured in environment' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }
    body = body || {};

    const { amount, currency = 'INR', receipt = `rcpt_${Date.now()}` } = body;

    // Validate amount (must be integer paise >= 100)
    const parsedAmount = Math.round(Number(amount));
    if (isNaN(parsedAmount) || parsedAmount < 100) {
      return res.status(400).json({ 
        error: 'Amount must be at least 100 paise (₹1)' 
      });
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const order = await razorpay.orders.create({
      amount: parsedAmount,
      currency: currency.toUpperCase(),
      receipt: String(receipt).slice(0, 40),
    });

    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Razorpay create order error:', error);
    if (error.statusCode === 401 || (error?.error?.code === 'BAD_REQUEST_ERROR' && error?.error?.description?.includes('auth'))) {
      return res.status(401).json({ error: error.message || 'Razorpay authentication failed' });
    }
    return res.status(500).json({ 
      error: error?.error?.description || error.message || 'Failed to create Razorpay order' 
    });
  }
}
