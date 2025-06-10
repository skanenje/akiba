<script>
  export let project;

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

  /**
   * Format a date as a string
   * @param {string} date - The date to format (ISO string)
   * @returns {string} - The formatted date string
   */
  function formatDate(date) {
    return new Date(date).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * Get the color class for a category
   * @param {string} category - The category name
   * @returns {string} - The color class
   */
  function getCategoryColor(category) {
    const colors = {
      education: 'bg-blue-100 text-blue-800',
      health: 'bg-red-100 text-red-800',
      environment: 'bg-green-100 text-green-800',
      community: 'bg-purple-100 text-purple-800',
      default: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.default;
  }

  /**
   * Calculate progress percentage
   * @param {number} current - The current amount
   * @param {number} goal - The goal amount
   * @returns {number} - The progress percentage
   */
  function getProgressPercentage(current, goal) {
    if (!goal) return 0;
    return Math.min((current / goal) * 100, 100);
  }

  $: progressPercentage = getProgressPercentage(project.currentAmount, project.goalAmount);
</script>

<div class="donation-card bg-white rounded-xl shadow-lg overflow-hidden group">
  <!-- Project Image -->
  <div class="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
    {#if project.imageUrl}
      <img
        src={project.imageUrl}
        alt={project.title}
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    {:else}
      <div class="w-full h-full flex items-center justify-center">
        <div class="text-white/80">
          <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center mb-2">
            <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 4.62 16.5 6.38 18.5 4.62 20.17 3.81 21.5 3c2.08 0 4.5 1.42 4.5 4.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
            </svg>
          </div>
          <p class="text-sm font-medium">Project Image</p>
        </div>
      </div>
    {/if}

    <!-- Category Badge -->
    <div class="absolute top-3 left-3">
      <span class="px-2 py-1 text-xs font-medium rounded-full {getCategoryColor(project.category)}">
        {project.category?.charAt(0).toUpperCase() + project.category?.slice(1) || 'General'}
      </span>
    </div>

    <!-- Donation Count -->
    <div class="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
      {project.donationCount || 0} donations
    </div>
  </div>

  <!-- Project Details -->
  <div class="p-6">
    <!-- Title -->
    <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
      {project.title}
    </h3>

    <!-- Description -->
    <p class="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
      {project.description}
    </p>

    <!-- Progress Section -->
    {#if project.goalAmount}
      <div class="mb-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-medium text-gray-700">Progress</span>
          <span class="text-sm text-gray-500">{progressPercentage.toFixed(0)}%</span>
        </div>

        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            class="progress-bar bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
            style="width: {progressPercentage}%"
          ></div>
        </div>

        <!-- Amount Progress -->
        <div class="flex justify-between text-sm">
          <span class="text-gray-600">
            Raised: <span class="font-semibold text-green-600">{formatCurrency(project.currentAmount)}</span>
          </span>
          <span class="text-gray-600">
            Goal: <span class="font-semibold">{formatCurrency(project.goalAmount)}</span>
          </span>
        </div>
      </div>
    {:else}
      <div class="mb-4">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-700">Amount Raised</span>
          <span class="text-lg font-bold text-green-600">{formatCurrency(project.currentAmount)}</span>
        </div>
      </div>
    {/if}

    <!-- Meta Information -->
    <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
      <div class="flex items-center space-x-1">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm-5-5.5H7.5V9h7v2.5z"></path>
        </svg>
        <span>Created {formatDate(project.createdAt)}</span>
      </div>
      <div class="flex items-center space-x-1">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.59L12 10.59l-2.59-2.59L7.41 12l-2.59 2.59 2.59 2.59L10.59 14l2.59 2.59 2.59-2.59 2.59 2.59 1.41-1.41-2.59-2.59 2.59-2.59 1.41 1.41-4.59 4.59z"></path>
        </svg>
        <span>{project.donationCount || 0} supporters</span>
      </div>
    </div>

    <!-- Donate Button -->
    <a
      href="/donate/{project.id}"
      class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group"
    >
      <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center">
        <svg class="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 4.62 16.5 6.38 18.5 4.62 20.17 3.81 21.5 3c2.08 0 4.5 1.42 4.5 4.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
        </svg>
      </div>
      <span>Donate Now</span>
    </a>
  </div>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>