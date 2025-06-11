import { json } from '@sveltejs/kit';
import { initiateStkPush } from '$lib/mpesa/service';
import { createMpesaTransaction } from '$lib/database/transactions';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const { phoneNumber, amount } = await request.json();

        // Validate phone number and amount
        if (!phoneNumber || !amount) {
            return json({ error: 'Phone number and amount are required' }, { status: 400 });
        }

        // Initiate STK Push
        const stkPushResponse = await initiateStkPush(phoneNumber, amount);

        // Create transaction record in database
        const transaction = await createMpesaTransaction({
            phoneNumber,
            amount,
            checkoutRequestId: stkPushResponse.CheckoutRequestID,
            merchantRequestId: stkPushResponse.MerchantRequestID
        });

        return json({
            success: true,
            message: 'STK Push initiated successfully',
            transactionId: transaction.id,
            checkoutRequestId: stkPushResponse.CheckoutRequestID,
            merchantRequestId: stkPushResponse.MerchantRequestID
        });
    } catch (error) {
        console.error('Error initiating payment:', error);
        return json({ error: error.message }, { status: 500 });
    }
}