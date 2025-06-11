<script>
  import { onMount } from 'svelte';

  export let stats = {
    totalDonations: 0,
    totalAmount: 0,
    activeProjects: 0,
    avgDonation: 0
  };

  let animatedStats = {
    totalDonations: 0,
    totalAmount: 0,
    activeProjects: 0,
    avgDonation: 0
  };

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  function animateNumber(target, current, key, duration = 2000) {
    const start = performance.now();
    const startValue = current;
    const difference = target - startValue;

    function update(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      animatedStats[key] = Math.round(startValue + (difference * easeOutQuart));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  onMount(() => {
    // Animate numbers on mount
    setTimeout(() => {
      animateNumber(stats.totalDonations, 0, 'totalDonations');
      animateNumber(stats.totalAmount, 0, 'totalAmount');
      animateNumber(stats.activeProjects, 0, 'activeProjects');
      animateNumber(stats.avgDonation, 0, 'avgDonation');
    }, 300);
  });
</script>

<div class="stats-overview">
  <div class="stat-card">
    <div class="icon">💰</div>
    <div class="stat-value">{animatedStats.totalDonations}</div>
    <div class="stat-label">Total Donations</div>
  </div>

  <div class="stat-card">
    <div class="icon">💵</div>
    <div class="stat-value">{formatCurrency(animatedStats.totalAmount)}</div>
    <div class="stat-label">Total Amount</div>
  </div>

  <div class="stat-card">
    <div class="icon">📈</div>
    <div class="stat-value">{animatedStats.activeProjects}</div>
    <div class="stat-label">Active Projects</div>
  </div>

  <div class="stat-card">
    <div class="icon">💸</div>
    <div class="stat-value">{formatCurrency(animatedStats.avgDonation)}</div>
    <div class="stat-label">Average Donation</div>
  </div>
</div>

<style>
  .stats-overview {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
  }

  .stat-card {
    background: white;
    padding: 20px;
    border-radius: var(--border-radius-xl);
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--color-grey-200);
    text-align: center;
    width: 150px;
    transition: var(--transition-all);
  }

  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  .icon {
    font-size: 32px;
    margin-bottom: 8px;
    color: var(--color-primary);
  }

  .stat-value {
    font-size: 24px;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 4px;
  }

  .stat-label {
    font-size: 14px;
    color: var(--color-text-secondary);
  }
</style>
