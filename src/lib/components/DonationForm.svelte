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

<form on:submit|preventDefault={handleSubmit}>
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}

  <label for="amount">Donation Amount (KES):</label>
  <input type="number" id="amount" bind:value={amount} min="1" required>

  <button type="submit" disabled={loading}>
    {#if loading}
      Processing...
    {:else}
      Donate with M-Pesa
    {/if}
  </button>
</form>

<style>
  .error {
    color: red;
  }
</style>