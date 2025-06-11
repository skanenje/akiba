<script>
  import { onMount } from 'svelte';
  import ProjectCard from './ProjectCard.svelte';
  import StatsOverview from './StatsOverview.svelte';

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

<div class="admin-dashboard">
  <!-- Header -->
  <header class="header">
    <nav class="container">
      <div class="nav">
        <a href="#" class="logo">
          <div class="logo-icon">💝</div>
          Admin Dashboard
        </a>

        <ul class="nav-links">
          <li><button class="nav-link active">Dashboard</button></li>
          <li><button class="nav-link">Projects</button></li>
          <li><button class="nav-link">Reports</button></li>
        </ul>

        <div class="nav-actions">
          <button class="btn btn-secondary">Sign Out</button>
        </div>
      </div>
    </nav>
  </header>

  <!-- Main Content -->
  <main class="container">
    <div class="stats-section">
      <StatsOverview {stats} />
    </div>

    <div class="projects-section">
      <div class="section-header">
        <h2 class="section-title">Active Projects</h2>
        <p class="section-subtitle">Manage your fundraising projects</p>
      </div>

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
  </main>
</div>

<style>
  .admin-dashboard {
    font-family: var(--font-family-primary);
    color: var(--color-text-primary);
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--color-grey-200);
    z-index: 1000;
    transition: var(--transition-all);
  }

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-4) 0;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--color-primary);
    text-decoration: none;
  }

  .logo-icon {
    width: 24px;
    height: 24px;
    background: var(--gradient-primary);
    border-radius: var(--border-radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .nav-links {
    display: flex;
    gap: var(--space-8);
    list-style: none;
  }

  .nav-link {
    color: var(--color-text-secondary);
    text-decoration: none;
    font-weight: 500;
    transition: var(--transition-colors);
    position: relative;
  }

  .nav-link:hover {
    color: var(--color-primary);
  }

  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--color-primary);
    border-radius: 1px;
  }

  .nav-actions {
    display: flex;
    gap: var(--space-4);
    align-items: center;
  }

  .btn {
    padding: var(--space-3) var(--space-6);
    border-radius: var(--border-radius-md);
    font-weight: 600;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    transition: var(--transition-all);
    cursor: pointer;
    border: none;
    font-size: var(--font-size-sm);
  }

  .btn-secondary {
    background: transparent;
    color: var(--color-text-secondary);
    border: 1px solid var(--color-grey-300);
  }

  .btn-secondary:hover {
    background: var(--color-grey-50);
    color: var(--color-text-primary);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-6);
  }

  .stats-section {
    padding: var(--space-20) 0;
    background: var(--color-background-light);
  }

  .projects-section {
    padding: var(--space-20) 0;
  }

  .section-header {
    text-align: center;
    margin-bottom: var(--space-16);
  }

  .section-title {
    font-size: var(--font-size-4xl);
    font-weight: 700;
    margin-bottom: var(--space-4);
    color: var(--color-text-primary);
  }

  .section-subtitle {
    font-size: var(--font-size-xl);
    color: var(--color-text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }

  .category-filter {
    display: flex;
    justify-content: center;
    gap: var(--space-4);
    margin-bottom: var(--space-16);
    flex-wrap: wrap;
  }

  .category-btn {
    padding: var(--space-3) var(--space-6);
    border-radius: var(--border-radius-md);
    font-weight: 600;
    font-size: var(--font-size-sm);
    transition: var(--transition-all);
    cursor: pointer;
    border: 1px solid var(--color-grey-300);
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .category-btn.bg-primary {
    background: var(--gradient-primary);
    color: white;
    border: none;
  }

  .category-btn:hover {
    background: var(--color-grey-50);
  }

  .category-count {
    font-size: var(--font-size-xs);
    color: var(--color-text-light);
    margin-left: var(--space-2);
  }

  .loading-spinner {
    width: 48px;
    height: 48px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .empty-state {
    text-align: center;
    color: var(--color-text-secondary);
    padding: var(--space-20) 0;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-8);
  }
</style>
