<script>
  import { onMount } from 'svelte';
  import { Heart, TrendingUp, Users, Target } from 'lucide-svelte';

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
          <div class="icon"><Heart /></div>
          <div class="stat-value">{animatedStats.totalDonations}</div>
          <div class="stat-label">Total Donations</div>
        </div>
      
        <div class="stat-card">
          <div class="icon"><TrendingUp /></div>
          <div class="stat-value">{formatCurrency(animatedStats.totalAmount)}</div>
          <div class="stat-label">Total Amount</div>
        </div>
      
        <div class="stat-card">
          <div class="icon"><Users /></div>
          <div class="stat-value">{animatedStats.activeProjects}</div>
          <div class="stat-label">Active Projects</div>
        </div>
      
        <div class="stat-card">
          <div class="icon"><Target /></div>
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
          background-color: #f0f0f0;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          width: 200px;
        }
      
        .icon {
          font-size: 24px;
          margin-bottom: 8px;
        }
      
        .stat-value {
          font-size: 20px;
          font-weight: bold;
        }
      
        .stat-label {
          font-size: 14px;
          color: #777;
        }
      </style>