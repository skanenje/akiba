<script>
    import { onMount } from 'svelte';

    let phoneNumber = '';
    let amount = '';
    let message = '';
    let loading = false;
    let success = false;
    let error = '';

    async function donate() {
        loading = true;
        error = '';
        success = false;

        // Validate phone number
        const phoneRegex = /^(2547(?:(?:[12][0-9])|(?:0[0-8])|(?:9[0-9])))[0-9]{6}$/;
        if (!phoneRegex.test(phoneNumber)) {
            error = 'Invalid phone number format. Use 2547XXXXXXXXX';
            loading = false;
            return;
        }

        // Validate amount
        if (!amount || isNaN(amount) || amount < 1 || amount > 70000) {
            error = 'Amount must be between 1 and 70000 KES';
            loading = false;
            return;
        }

        try {
            const response = await fetch('/api/donate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phoneNumber,
                    amount
                })
            });

            const data = await response.json();

            if (response.ok) {
                success = true;
                message = data.message;
            } else {
                error = data.error;
            }
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        // You can add any client-side logic here
    });
</script>

<style>
    /* Add your component styles here */
    .donation-form {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .form-group {
        margin-bottom: 15px;
    }

    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    input[type="text"],
    input[type="number"] {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    button {
        background-color: #4CAF50;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #3e8e41;
    }

    .success {
        color: green;
        margin-top: 10px;
    }

    .error {
        color: red;
        margin-top: 10px;
    }
</style>

<div class="donation-form">
    <h2>Make a Donation</h2>
    {#if success}
        <p class="success">{message}</p>
    {:else if error}
        <p class="error">{error}</p>
    {/if}
    <div class="form-group">
        <label for="phoneNumber">Phone Number:</label>
        <input type="text" id="phoneNumber" bind:value={phoneNumber} placeholder="2547XXXXXXXX" />
    </div>
    <div class="form-group">
        <label for="amount">Amount (KES):</label>
        <input type="number" id="amount" bind:value={amount} placeholder="Enter amount" />
    </div>
    <button on:click={donate} disabled={loading}>
        {#if loading}
            Donating...
        {:else}
            Donate
        {/if}
    </button>
</div>
