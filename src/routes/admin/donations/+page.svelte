<script>
  import { onMount } from 'svelte';

  let donations = [];
  let loading = false;
  let error = '';

  async function fetchDonations() {
    loading = true;
    try {
      const response = await fetch('/api/donations');
      if (response.ok) {
        donations = await response.json();
      } else {
        error = 'Failed to fetch donations';
      }
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    fetchDonations();
  });
</script>

<h1>Donations Management</h1>

{#if error}
  <p style="color: red;">{error}</p>
{/if}

{#if loading}
  <p>Loading donations...</p>
{:else}
  {#each donations as donation (donation.id)}
    <div class="donation-card">
      <p>Amount: {donation.amount}</p>
      <p>Phone Number: {donation.phoneNumber}</p>
      <p>Transaction Date: {donation.transactionDate}</p>
      <p>Mpesa Receipt Number: {donation.mpesaReceiptNumber}</p>
    </div>
  {/each}
{/if}

<style>
  .donation-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  }
</style>