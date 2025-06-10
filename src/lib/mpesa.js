
import axios from 'axios';

// For demo purposes - in production, use proper Mpesa integration
export class MpesaService {
  constructor() {
    this.isProduction = false; // Set to true for production
  }

  async initiatePayment(phoneNumber, amount, projectId, transactionId) {
    // Simulate Mpesa STK Push for demo
    if (!this.isProduction) {
      return this.simulatePayment(phoneNumber, amount, projectId, transactionId);
    }

    // Real Mpesa implementation would go here
    return this.realMpesaPayment(phoneNumber, amount, projectId, transactionId);
  }

  async simulatePayment(phoneNumber, amount, projectId, transactionId) {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Random success/failure for demo (90% success rate)
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      return {
        success: true,
        checkoutRequestId: `sim_${transactionId}`,
        message: 'Payment initiated successfully. Check your phone for M-Pesa prompt.',
        transactionId
      };
    } else {
      return {
        success: false,
        error: 'Payment initiation failed. Please try again.',
        transactionId
      };
    }
  }

  async realMpesaPayment(phoneNumber, amount, projectId, transactionId) {
    try {
      // Get access token
      const token = await this.getAccessToken();
      
      // Format phone number
      const formattedPhone = this.formatPhoneNumber(phoneNumber);
      
      // STK Push request
      const timestamp = this.generateTimestamp();
      const password = this.generatePassword(timestamp);

      const stkData = {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(amount),
        PartyA: formattedPhone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: formattedPhone,
        CallBackURL: `${process.env.PUBLIC_APP_URL}/api/mpesa/callback`,
        AccountReference: `DONATION_${projectId}`,
        TransactionDesc: `Donation to project ${projectId}`
      };

      const response = await axios.post(
        'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
        stkData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        checkoutRequestId: response.data.CheckoutRequestID,
        message: 'Payment initiated successfully. Check your phone for M-Pesa prompt.',
        transactionId
      };

    } catch (error) {
      console.error('Mpesa error:', error.response?.data || error.message);
      return {
        success: false,
        error: 'Payment initiation failed. Please try again.',
        transactionId
      };
    }
  }

  async getAccessToken() {
    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
    
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${auth}`
        }
      }
    );

    return response.data.access_token;
  }

  formatPhoneNumber(phone) {
    let formatted = phone.replace(/^\+/, '').replace(/\s+/g, '');
    if (formatted.startsWith('0')) {
      formatted = '254' + formatted.substring(1);
    } else if (!formatted.startsWith('254')) {
      formatted = '254' + formatted;
    }
    return formatted;
  }

  generateTimestamp() {
    const now = new Date();
    return now.getFullYear() +
           String(now.getMonth() + 1).padStart(2, '0') +
           String(now.getDate()).padStart(2, '0') +
           String(now.getHours()).padStart(2, '0') +
           String(now.getMinutes()).padStart(2, '0') +
           String(now.getSeconds()).padStart(2, '0');
  }

  generatePassword(timestamp) {
    const data = process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + timestamp;
    return Buffer.from(data).toString('base64');
  }

  static validatePhone(phone) {
    const phoneRegex = /^(\+254|254|0)?([17]\d{8})$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  }

  // Simulate callback processing for demo
  async simulateCallback(transactionId, delay = 5000) {
    setTimeout(() => {
      // This would typically be handled by a webhook
      // For demo, we'll just mark as completed
      console.log(`Simulating callback for transaction: ${transactionId}`);
    }, delay);
  }
}

export const mpesa = new MpesaService();

