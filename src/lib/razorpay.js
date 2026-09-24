// Razorpay Standard Web Checkout Integration for ZAKAAS Storefront

export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_Tfr2bvLS5sYcOL';

export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/**
 * Initiates Razorpay checkout flow
 * @param {Object} params
 * @param {number} params.amountInRupees - Order total in INR (e.g. 450)
 * @param {Array} params.items - Cart items
 * @param {Function} params.onSuccess - Callback on verified payment
 * @param {Function} params.onFailure - Callback on payment failure/error
 * @param {Function} params.onDismiss - Callback when user closes payment modal
 */
export async function startRazorpayCheckout({
  amountInRupees,
  items = [],
  customerInfo = {},
  onSuccess,
  onFailure,
  onDismiss,
}) {
  try {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded || !window.Razorpay) {
      throw new Error('Razorpay SDK failed to load. Please check your connection.');
    }

    // Amount in paise (minimum 100 paise = ₹1)
    const amountInPaise = Math.max(100, Math.round(amountInRupees * 100));

    // 1. Call Backend to create Razorpay Order
    const orderRes = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `zakaas_${Date.now()}`,
      }),
    });

    const orderData = await orderRes.json();
    if (!orderRes.ok || !orderData.order_id) {
      throw new Error(orderData.error || 'Failed to create Razorpay payment order');
    }

    // 2. Configure and open Razorpay Checkout modal
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency || 'INR',
      name: 'ZAKAAS Farsan & Snacks',
      description: items.length
        ? `${items.length} item${items.length > 1 ? 's' : ''} from Maharashtra`
        : 'Authentic Maharashtrian Delicacies',
      image: '/zakaas-logo.png',
      order_id: orderData.order_id,
      prefill: {
        name: customerInfo.name || '',
        email: customerInfo.email || '',
        contact: customerInfo.phone || '',
      },
      theme: {
        color: '#B82823', // Zakaas Brand Crimson Red
      },
      handler: async function (response) {
        // 3. Verify Payment Signature on Backend
        try {
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyRes.ok && verifyData.success) {
            if (onSuccess) {
              onSuccess({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                amount: orderData.amount / 100,
              });
            }
          } else {
            const errorMsg = verifyData.error || 'Payment verification failed.';
            if (onFailure) onFailure(new Error(errorMsg));
          }
        } catch (err) {
          if (onFailure) onFailure(err);
        }
      },
      modal: {
        ondismiss: function () {
          if (onDismiss) onDismiss();
        },
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on('payment.failed', function (response) {
      console.error('Razorpay payment failed:', response.error);
      const desc = response.error?.description || response.error?.reason || 'Payment was unsuccessful.';
      if (onFailure) onFailure(new Error(desc));
    });

    rzp.open();
  } catch (error) {
    console.error('Checkout error:', error);
    if (onFailure) onFailure(error);
  }
}
