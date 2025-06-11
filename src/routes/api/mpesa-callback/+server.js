import { json } from '@sveltejs/kit';
import { updateMpesaTransaction, getMpesaTransaction } from '$lib/database/transactions';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const callbackData = await request.json();

        // Log the callback data for debugging
        console.log('M-Pesa callback data:', callbackData);

  const MerchantRequestID = callbackData.Body.stkCallback.MerchantRequestID;
  const CheckoutRequestID = callbackData.Body.stkCallback.CheckoutRequestID;
  const ResultCode = callbackData.Body.stkCallback.ResultCode;
  const ResultDesc = callbackData.Body.stkCallback.ResultDesc;

        // Find the transaction by checkoutRequestId or merchantRequestId
        // const transaction = await getMpesaTransaction({ checkoutRequestId: CheckoutRequestID });
        // if (!transaction) {
        //     console.error('Transaction not found for checkoutRequestId:', CheckoutRequestID);
        //     return json({ message: 'Transaction not found' }, { status: 404 });
        // }

        // Extract relevant data from the callback
        const mpesaReceiptNumber = callbackData.Body.stkCallback.CallbackMetadata?.Item.find(item => item.Name === 'MpesaReceiptNumber')?.Value;
        const transactionDate = callbackData.Body.stkCallback.CallbackMetadata?.Item.find(item => item.Name === 'TransactionDate')?.Value;
        const phoneNumber = callbackData.Body.stkCallback.CallbackMetadata?.Item.find(item => item.Name === 'PhoneNumber')?.Value;

        // Update the transaction status in the database
        await updateMpesaTransaction({ MerchantRequestID }, {
            resultCode: ResultCode,
            resultDesc: ResultDesc,
            mpesaReceiptNumber: mpesaReceiptNumber,
            transactionDate: transactionDate,
            phoneNumber: phoneNumber
        });

        return json({ message: 'Callback received successfully' });
    } catch (error) {
        console.error('Error processing M-Pesa callback:', error);
        return json({ error: error.message }, { status: 500 });
    }
}