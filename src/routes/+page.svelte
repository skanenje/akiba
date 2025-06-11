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

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Header scroll effect
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = 'none';
    }
  });

  // Progress bar animation
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = width;
          }, 300);
        });
      }
    });
  }, observerOptions);

  observer.observe(document.querySelector('.dashboard-preview'));

  // Campaign card hover effects
  document.querySelectorAll('.campaign-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Feature cards staggered animation
  const featureCards = document.querySelectorAll('.feature-card');
  const featuresObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }, { threshold: 0.2 });

  featureCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    featuresObserver.observe(card);
  });
</script>

<svelte:head>
  <title>DonateKenya - Support Social Projects</title>
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
    <div class="flex flex-wrap justify-center gap-3 mb-16">
      {#each categories as category}
        <button
          class="px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 border-2"
          class:bg-blue-600={selectedCategory === category.id}
          class:text-white={selectedCategory === category.id}
          class:border-blue-600={selectedCategory === category.id}
          class:shadow-lg={selectedCategory === category.id}
          class:bg-white={selectedCategory !== category.id}
          class:text-slate-700={selectedCategory !== category.id}
          class:border-slate-200={selectedCategory !== category.id}
          class:hover:border-blue-300={selectedCategory !== category.id}
          class:hover:bg-slate-50={selectedCategory !== category.id}
          on:click={() => selectedCategory = category.id}
        >
          {category.name}
          <span class="ml-2 px-2 py-1 text-xs rounded-full"
                class:bg-white-20={selectedCategory === category.id}
                class:bg-slate-100={selectedCategory !== category.id}
                class:text-slate-600={selectedCategory !== category.id}>
            {category.count}
          </span>
        </button>
      {/each}
    </div>

    <!-- Projects Grid -->
    {#if loading}
      <div class="flex justify-center items-center py-24">
        <div class="text-center">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-6"></div>
          <p class="text-slate-600 text-lg">Loading projects<span class="loading-dots"></span></p>
        </div>
      </div>
    {:else if filteredProjects.length === 0}
      <div class="text-center py-24">
        <div class="w-32 h-32 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <svg class="w-16 h-16 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-slate-900 mb-3">No projects found</h3>
        <p class="text-slate-600 text-lg">
          {selectedCategory === 'all'
            ? 'No projects are currently available.'
            : `No projects found in the ${categories.find(c => c.id === selectedCategory)?.name.toLowerCase()} category.`}
        </p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
