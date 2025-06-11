import Mpesa from 'mpesapay';
import {
    MPESA_CONSUMER_KEY,
    MPESA_CONSUMER_SECRET,
    MPESA_SHORT_CODE,
    MPESA_PASSKEY,
    MPESA_ACCOUNT_REFERENCE,
    MPESA_TRANSACTION_DESCRIPTION,
    MPESA_PARTYA,
    MPESA_B2C_SECURITY_CREDENTIAL,
    MPESA_INITIATOR_NAME,
    MPESA_ENVIRONMENT,
    MPESA_TRANSACTION_TYPE
} from '$env/static/private';

const mpesa = new Mpesa({
    consumerKey: MPESA_CONSUMER_KEY,
    consumerSecret: MPESA_CONSUMER_SECRET,
    shortCode: MPESA_SHORT_CODE,
    passkey: MPESA_PASSKEY,
    accountReference: MPESA_ACCOUNT_REFERENCE,
    transactionDesc: MPESA_TRANSACTION_DESCRIPTION,
    partyA: MPESA_PARTYA,
    b2cSecurityCredential: MPESA_B2C_SECURITY_CREDENTIAL,
    initiatorName: MPESA_INITIATOR_NAME,
    environment: MPESA_ENVIRONMENT,
    transactionType: MPESA_TRANSACTION_TYPE
});

export async function initiateStkPush(phoneNumber, amount) {
    try {
        const response = await mpesa.lipaNaMpesaOnline({
            phoneNumber,
            amount
        });
        return response;
    } catch (error) {
        console.error('M-Pesa STK Push error:', error);
        throw new Error('M-Pesa STK Push failed');
    }
}

export async function getPaymentStatus(checkoutRequestId) {
    try {
        const response = await mpesa.getPaymentStatus({
            checkoutRequestId
        });
        return response;
    } catch (error) {
        console.error('M-Pesa Payment Status error:', error);
        throw new Error('M-Pesa Payment Status check failed');
    }
}