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
<section class="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
  <!-- Background Pattern -->
  <div class="absolute inset-0 opacity-10">
    <div class="absolute inset-0" style="background-image: radial-gradient(circle at 25% 25%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 75% 75%, #34d399 0%, transparent 50%);"></div>
  </div>
  
  <!-- Floating Elements -->
  <div class="absolute top-20 left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
  <div class="absolute bottom-20 right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
  
  <div class="relative max-w-7xl mx-auto px-6 py-24 flex items-center min-h-screen">
    <div class="grid lg:grid-cols-2 gap-16 items-center w-full">
      <!-- Left Column - Content -->
      <div class="space-y-8">
        <div class="inline-flex items-center space-x-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 text-sm">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span class="text-blue-200">Live Impact Tracking</span>
        </div>
        
        <h1 class="text-5xl lg:text-7xl font-bold leading-tight">
          Make a
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Difference
          </span>
          <br />Today
        </h1>
        
        <p class="text-xl text-slate-300 max-w-xl leading-relaxed">
          Support social projects across Kenya through secure, anonymous donations. 
          Every shilling counts towards building stronger communities.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4">
          <button class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
            Start Donating
          </button>
          <button class="border border-slate-400/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
            Learn More
          </button>
        </div>

        <!-- Trust Indicators -->
        <div class="flex items-center space-x-8 pt-4">
          <div class="flex items-center space-x-2 text-sm text-slate-400">
            <div class="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
            </div>
            <span>100% Secure</span>
          </div>
          <div class="flex items-center space-x-2 text-sm text-slate-400">
            <div class="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            </div>
            <span>Anonymous</span>
          </div>
          <div class="flex items-center space-x-2 text-sm text-slate-400">
            <div class="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
            </div>
            <span>Instant M-Pesa</span>
          </div>
        </div>
      </div>

      <!-- Right Column - Stats Dashboard -->
      <div class="relative">
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold mb-2">Live Impact</h3>
            <p class="text-slate-300 text-sm">Real-time donation statistics</p>
          </div>
          
          <div class="grid grid-cols-1 gap-6">
            <!-- Total Donations -->
            <div class="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl p-6 border border-red-400/20">
              <div class="flex items-center justify-between mb-3">
                <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                </div>
                <div class="text-right">
                  <div class="text-3xl font-bold">{stats.totalDonations.toLocaleString()}</div>
                  <div class="text-sm text-slate-300">Total Donations</div>
                </div>
              </div>
            </div>

            <!-- Amount Raised -->
            <div class="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl p-6 border border-emerald-400/20">
              <div class="flex items-center justify-between mb-3">
                <div class="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" />
                  </svg>
                </div>
                <div class="text-right">
                  <div class="text-3xl font-bold">{formatCurrency(stats.totalAmount)}</div>
                  <div class="text-sm text-slate-300">Amount Raised</div>
                </div>
              </div>
            </div>

            <!-- Active Projects -->
            <div class="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl p-6 border border-blue-400/20">
              <div class="flex items-center justify-between mb-3">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                  </svg>
                </div>
                <div class="text-right">
                  <div class="text-3xl font-bold">{stats.activeProjects}</div>
                  <div class="text-sm text-slate-300">Active Projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Stats Overview -->
<section class="py-24 bg-slate-50">
  <div class="max-w-7xl mx-auto px-6">
    <StatsOverview {stats} />
  </div>
</section>

<!-- Projects Section -->
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-6">
    <!-- Section Header -->
    <div class="text-center mb-16">
      <div class="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 rounded-full px-4 py-2 text-sm font-medium mb-6">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
        <span>Current Projects</span>
      </div>
      <h2 class="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
        Choose Your Impact
      </h2>
      <p class="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
        Select a project that resonates with you and make an anonymous donation using M-Pesa. 
        Track your impact in real-time.
      </p>
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
<section class="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
  <!-- Background Elements -->
  <div class="absolute inset-0 opacity-20">
    <div class="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
  </div>
  
  <div class="relative max-w-5xl mx-auto px-6 text-center">
    <div class="inline-flex items-center space-x-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 text-sm mb-8">
      <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      <span class="text-blue-200">Ready to Help?</span>
    </div>
    
    <h2 class="text-4xl lg:text-5xl font-bold mb-8">
      Ready to Make an Impact?
    </h2>
    <p class="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
      Your donation, no matter the size, creates real change in Kenyan communities.
      Donate securely and anonymously with M-Pesa.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
      <button class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
        Start Donating Now
      </button>
      <button class="border border-slate-400/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
        View All Projects
      </button>
    </div>
    
    <!-- Trust Indicators -->
    <div class="flex flex-col sm:flex-row gap-8 justify-center items-center text-sm">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
          </svg>
        </div>
        <span class="text-slate-200">256-bit SSL Encryption</span>
      </div>
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" />
          </svg>
        </div>
        <span class="text-slate-200">Complete Anonymity</span>
      </div>
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
          </svg>
        </div>
        <span class="text-slate-200">Instant M-Pesa Processing</span>
      </div>
    </div>
  </div>
</section>