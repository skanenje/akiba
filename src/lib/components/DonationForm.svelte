<script>
  import { goto } from '$app/navigation';

  export let projectId;

  let amount = 0;
  let loading = false;
  let errorMessage = '';

  async function handleSubmit() {
    loading = true;
    errorMessage = '';

    try {
      const response = await fetch('/api/mpesa/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectId: projectId,
          amount: amount
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to confirmation page
        goto('/confirmation');
      } else {
        errorMessage = data.message || 'Failed to initiate M-Pesa payment.';
      }
    } catch (error) {
      console.error('Error initiating M-Pesa payment:', error);
      errorMessage = 'An unexpected error occurred.';
    } finally {
      loading = false;
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="donation-form">
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}

  <div class="form-group">
    <label for="amount" class="form-label">Donation Amount (KES):</label>
    <input type="number" id="amount" bind:value={amount} min="1" required class="form-input">
  </div>

  <button type="submit" disabled={loading} class="btn btn-primary">
    {#if loading}
      <span class="loading-spinner"></span> Processing...
    {:else}
      Donate with M-Pesa
    {/if}
  </button>
</form>

<style>
  .donation-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background: white;
    border-radius: var(--border-radius-xl);
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--color-grey-200);
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-label {
    display: block;
    margin-bottom: 4px;
    font-weight: 600;
    color: var(--color-text-primary);
  }

  .form-input {
    width: 100%;
    padding: 8px 12px;
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-grey-300);
    font-size: var(--font-size-base);
    transition: var(--transition-colors);
  }

  .form-input:focus {
    border-color: var(--color-primary);
    outline: none;
  }

  .error {
    color: var(--color-error);
    margin-bottom: 16px;
  }

  .btn-primary {
    width: 100%;
    padding: 12px;
    font-size: var(--font-size-base);
    font-weight: 600;
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: var(--border-radius-md);
    transition: var(--transition-all);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .loading-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.6);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 8px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
