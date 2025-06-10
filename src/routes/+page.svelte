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
   * @param {number} amount - The amount to format
   * @returns {string} - The formatted currency string
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
  <title>DonateKenya - Support Social Projects</title>
  <meta name="description" content="Support social projects across Kenya through secure M-Pesa donations. Every contribution makes a difference." />
</svelte:head>

<!-- Hero Section -->
<section class="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white overflow-hidden">
  <div class="absolute inset-0 bg-black/20"></div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div class="text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
        Make a Difference
        <span class="block text-yellow-300">Today</span>
      </h1>
      <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-slide-up">
        Support social projects across Kenya through secure, anonymous donations.
        Every shilling counts towards building stronger communities.
      </p>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 animate-slide-up">
          <div class="flex items-center justify-center mb-2">
            <div class="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 4.62 16.5 6.38 18.5 4.62 20.17 3.81 21.5 3c2.08 0 4.5 1.42 4.5 4.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
              </svg>
            </div>
          </div>
          <div class="text-2xl font-bold">{stats.totalDonations.toLocaleString()}</div>
          <div class="text-sm opacity-80">Total Donations</div>
        </div>

        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 animate-slide-up">
          <div class="flex items-center justify-center mb-2">
            <div class="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.9-9.31L12 10.17l3.31-2.59 1.41 1.41-2.59 2.59 1.41 1.41-2.59 2.59-2.59-2.59-2.59 2.59-1.41-1.41 2.59-2.59-1.41-1.41z"></path>
              </svg>
            </div>
          </div>
          <div class="text-2xl font-bold">{formatCurrency(stats.totalAmount)}</div>
          <div class="text-sm opacity-80">Amount Raised</div>
        </div>

        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 animate-slide-up">
          <div class="flex items-center justify-center mb-2">
            <div class="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.59L12 10.59l-2.59-2.59L7.41 12l-2.59 2.59 2.59 2.59L10.59 14l2.59 2.59 2.59-2.59 2.59 2.59 1.41-1.41-2.59-2.59 2.59-2.59 1.41 1.41-4.59 4.59z"></path>
              </svg>
            </div>
          </div>
          <div class="text-2xl font-bold">{stats.activeProjects}</div>
          <div class="text-sm opacity-80">Active Projects</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Decorative elements -->
  <div class="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32"></div>
  <div class="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"></div>
</section>

<!-- Stats Overview -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <StatsOverview {stats} />
  </div>
</section>

<!-- Projects Section -->
<section class="py-16 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Section Header -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Current Projects
      </h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Choose a project that resonates with you and make an anonymous donation using M-Pesa
      </p>
    </div>

    <!-- Category Filter -->
    <div class="flex flex-wrap justify-center gap-3 mb-12">
      {#each categories as category}
        <button
          class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border"
          class:bg-blue-600={selectedCategory === category.id}
          class:text-white={selectedCategory === category.id}
          class:border-blue-600={selectedCategory === category.id}
          class:bg-white={selectedCategory !== category.id}
          class:text-gray-700={selectedCategory !== category.id}
          class:border-gray-300={selectedCategory !== category.id}
          class:hover:border-blue-400={selectedCategory !== category.id}
          on:click={() => selectedCategory = category.id}
        >
          {category.name}
          <span class="ml-1 text-xs opacity-75">({category.count})</span>
        </button>
      {/each}
    </div>

    <!-- Projects Grid -->
    {#if loading}
      <div class="flex justify-center items-center py-16">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p class="text-gray-600">Loading projects<span class="loading-dots"></span></p>
        </div>
      </div>
    {:else if filteredProjects.length === 0}
      <div class="text-center py-16">
        <div class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.9-9.31L12 10.59l3.31-2.59 1.41 1.41-2.59 2.59 1.41 1.41-2.59 2.59-2.59-2.59-2.59 2.59-1.41-1.41 2.59-2.59-1.41-1.41z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-medium text-gray-900 mb-2">No projects found</h3>
        <p class="text-gray-600">
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
<section class="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      Ready to Make an Impact?
    </h2>
    <p class="text-xl mb-8 opacity-90">
      Your donation, no matter the size, creates real change in Kenyan communities.
      Donate securely and anonymously with M-Pesa.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <div class="flex items-center space-x-2 text-lg">
        <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <span>100% Secure</span>
      </div>
      <div class="flex items-center space-x-2 text-lg">
        <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <span>Anonymous</span>
      </div>
      <div class="flex items-center space-x-2 text-lg">
        <div class="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <span>Instant via M-Pesa</span>
      </div>
    </div>
  </div>
</section>