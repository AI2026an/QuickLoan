// Razorpay payment utilities

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export async function initializeRazorpayPayment(
  amount: number,
  phoneNumber: string,
  onSuccess: (paymentData: any) => void,
  onError: (error: string) => void
): Promise<void> {
  try {
    // Check if Razorpay is loaded
    if (!window.Razorpay) {
      throw new Error('Razorpay not loaded');
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    // Create order on server
    const response = await fetch('/api/wallet/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    });

    const orderData = await response.json();
    
    if (!orderData.success) {
      throw new Error(orderData.message || 'Failed to create payment order');
    }

    // Configure Razorpay options
    const options: RazorpayOptions = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: '💳 PayWallet',
      description: 'Wallet Top-up',
      order_id: orderData.orderId,
      handler: async (response: any) => {
        try {
          // Verify payment on server
          const verifyResponse = await fetch('/api/wallet/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyResponse.json();
          
          if (verifyData.success) {
            onSuccess({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              amount: amount,
              currency: 'INR'
            });
          } else {
            onError(verifyData.message || 'Payment verification failed');
          }
        } catch (error) {
          onError('Payment verification failed');
        }
      },
      prefill: {
        contact: phoneNumber,
      },
      notes: {
        address: 'India',
      },
      theme: {
        color: '#3B82F6',
      },
      modal: {
        ondismiss: () => {
          onError('Payment cancelled');
        },
      },
    };

    // Open Razorpay checkout
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error('Payment initialization error:', error);
    onError(error instanceof Error ? error.message : 'Payment initialization failed');
  }
}

export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}