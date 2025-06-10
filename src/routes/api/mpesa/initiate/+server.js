import { json } from '@sveltejs/kit';
import { mpesa, initiateMpesaPayment } from '$lib/mpesa';

export async function POST({ request }) {
  try {
    const { projectId, amount } = await request.json();

    // Validate amount
    if (amount <= 0) {
      return json({ message: 'Invalid donation amount.' }, { status: 400 });
    }

    // Initiate M-Pesa payment
    const paymentResult = await initiateMpesaPayment(projectId, amount);

    if (paymentResult.success) {
      return json({ message: 'M-Pesa payment initiated successfully.' });
    } else {
      return json({ message: paymentResult.message || 'Failed to initiate M-Pesa payment.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error initiating M-Pesa payment:', error);
    return json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}