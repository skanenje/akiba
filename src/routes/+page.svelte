<script>
  import { onMount } from 'svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import StatsOverview from '$lib/components/StatsOverview.svelte';

  export let data;

  let projects = data.projects || [];
  let stats = data.stats || { totalDonations: 0, totalAmount: 0, activeProjects: 0 };
  let loading = false;
  let selectedCategory = 'all';

  // Sample categories for filtering
  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'education', name: 'Education', count: projects.filter(p => p.category === 'education').length },
    { id: 'health', name: 'Health', count: projects.filter(p => p.category === 'health').length },
    { id: 'environment', name: 'Environment', count: projects.filter(p => p.category === 'environment').length },
    { id: 'community', name: 'Community', count: projects.filter(p => p.category === 'community').length }
  ];

  $: filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  /**
   * Format a number as currency
   */
  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  }
</script>

<svelte:head>
  <title>Akiba- Support Social Projects</title>
  <meta name="description" content="Support social projects across Kenya through secure M-Pesa donations. Every contribution makes a difference." />
  <link rel="stylesheet" href="/routes/+page.css" />
</svelte:head>

<!-- Header -->
<header class="header">
  <nav class="container">
    <div class="nav">
      <a href="#" class="logo">
        <div class="logo-icon">💝</div>
        DonateKenya
      </a>

      <ul class="nav-links">
        <li><a href="#" class="nav-link active">Dashboard</a></li>
        <li><a href="#" class="nav-link">Projects</a></li>
        <li><a href="#" class="nav-link">About</a></li>
      </ul>

      <div class="nav-actions">
        <a href="#" class="btn btn-secondary">Sign In</a>
        <a href="#" class="btn btn-primary">Donate Now</a>
      </div>
    </div>
  </nav>
</header>

<!-- Hero Section -->
<section class="hero">
  <div class="container">
    <div class="hero-content">
      <div class="hero-text">
        <h1>Make a Difference Today</h1>
        <p>Support social projects across Kenya through secure, anonymous M-Pesa donations. Every shilling counts towards building stronger communities.</p>

        <div class="hero-actions">
          <a href="#" class="btn btn-primary btn-large">Start Donating</a>
          <a href="#" class="btn btn-secondary btn-large">Explore Projects</a>
        </div>

        <div class="hero-stats">
          <div class="stat">
            <span class="stat-number">{stats.totalDonations.toLocaleString()}</span>
            <span class="stat-label">Total Donations</span>
          </div>
          <div class="stat">
            <span class="stat-number">{formatCurrency(stats.totalAmount)}</span>
            <span class="stat-label">Amount Raised</span>
          </div>
          <div class="stat">
            <span class="stat-number">{stats.activeProjects}</span>
            <span class="stat-label">Active Projects</span>
          </div>
        </div>
      </div>

      <div class="dashboard-preview floating">
        <div class="dashboard-card">
          <div class="dashboard-header">
            <div>
              <div class="dashboard-title">Your Donations</div>
              <div class="dashboard-subtitle">Track your impact</div>
            </div>
            <button class="start-campaign-btn">+ Donate Now</button>
          </div>

          <div class="campaigns-grid">
            {#if filteredProjects.length > 0}
              {#each filteredProjects.slice(0, 2) as project (project.id)}
                <div class="campaign-card">
                  <div class="campaign-image"></div>
                  <div class="campaign-title">{project.title}</div>
                  <div class="campaign-progress">
                    <span class="campaign-amount">{formatCurrency(project.amountRaised)}</span>
                    <span class="campaign-backers">{project.backers} backers</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: {project.progress}%"></div>
                  </div>
                  <div class="campaign-days">{project.daysLeft} days left</div>
                </div>
              {/each}
            {:else}
              <div class="campaign-card">
                <div class="campaign-image"></div>
                <div class="campaign-title">No projects found</div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Features Section -->
<section class="features">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Everything You Need to Succeed</h2>
      <p class="section-subtitle">Powerful tools and features designed to help your donations make a real impact</p>
    </div>

    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">🚀</div>
        <h3 class="feature-title">Quick Donations</h3>
        <p class="feature-description">Donate to projects in minutes with our intuitive process and secure M-Pesa integration.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">📊</div>
        <h3 class="feature-title">Real-time Tracking</h3>
        <p class="feature-description">Track your donations with detailed insights and analytics to see your impact in real-time.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🔒</div>
        <h3 class="feature-title">Secure Transactions</h3>
        <p class="feature-description">Bank-level security ensures all transactions are safe and supporters can donate with confidence.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🌟</div>
        <h3 class="feature-title">Social Sharing</h3>
        <p class="feature-description">Built-in social media tools help amplify your message and reach more potential supporters.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">💬</div>
        <h3 class="feature-title">Community Engagement</h3>
        <p class="feature-description">Keep supporters engaged with updates, comments, and direct messaging features.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">📱</div>
        <h3 class="feature-title">Mobile Optimized</h3>
        <p class="feature-description">Your donations look great and work perfectly on all devices and screen sizes.</p>
      </div>
    </div>
  </div>
</section>

<!-- Projects Section -->
<section class="features">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Current Projects</h2>
      <p class="section-subtitle">Select a project that resonates with you and make an anonymous donation using M-Pesa. Track your impact in real-time.</p>
    </div>

    <!-- Category Filter -->
    <div class="category-filter">
      {#each categories as category}
        <button
          class="category-btn"
          class:bg-primary={selectedCategory === category.id}
          class:text-white={selectedCategory === category.id}
          on:click={() => selectedCategory = category.id}
        >
          {category.name}
          <span class="category-count">{category.count}</span>
        </button>
      {/each}
    </div>

    <!-- Projects Grid -->
    {#if loading}
      <div class="loading-spinner"></div>
    {:else if filteredProjects.length === 0}
      <div class="empty-state">
        <p>No projects found in the {selectedCategory === 'all' ? 'selected category' : categories.find(c => c.id === selectedCategory)?.name.toLowerCase()} category.</p>
      </div>
    {:else}
      <div class="projects-grid">
        {#each filteredProjects as project (project.id)}
          <ProjectCard {project} />
        {/each}
      </div>
    {/if}
  </div>
</section>

<!-- Call to Action -->
<section class="hero">
  <div class="container">
    <div class="hero-content">
      <div class="hero-text">
        <h1>Ready to Make an Impact?</h1>
        <p>Your donation, no matter the size, creates real change in Kenyan communities. Donate securely and anonymously with M-Pesa.</p>

        <div class="hero-actions">
          <a href="#" class="btn btn-primary btn-large">Start Donating Now</a>
          <a href="#" class="btn btn-secondary btn-large">View All Projects</a>
        </div>

        <div class="hero-stats">
          <div class="stat">
            <div class="feature-icon">🔒</div>
            <span class="stat-label">256-bit SSL Encryption</span>
          </div>
          <div class="stat">
            <div class="feature-icon">🌟</div>
            <span class="stat-label">Complete Anonymity</span>
          </div>
          <div class="stat">
            <div class="feature-icon">📱</div>
            <span class="stat-label">Instant M-Pesa Processing</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
