<script>
  export let project;

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

  /**
   * Format a date as a string
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
   */
  function getProgressPercentage(current, goal) {
    if (!goal) return 0;
    return Math.min((current / goal) * 100, 100);
  }

  $: progressPercentage = getProgressPercentage(project.currentAmount, project.goalAmount);
</script>

<button type="button" class="campaign-card p-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-200" on:click>
  <!-- Project Image -->
  <!-- <div class="campaign-image">
    {#if project.imageUrl}
      <img
        src={project.imageUrl}
        alt={project.title}
        class="w-full h-full object-cover"
      />
    {:else}
      <div class="w-full h-full flex items-center justify-center">
        <div class="text-gray-500">
          <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mb-2">
            <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 4.62 16.5 6.38 18.5 4.62 20.17 3.81 21.5 3c2.08 0 4.5 1.42 4.5 4.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
            </svg>
          </div>
          <p class="text-sm font-medium">Project Image</p>
        </div>
      </div>
    {/if}
  </div> -->

  <!-- Project Details -->
  <div class="p-4">
    <!-- Title -->
    <h3 class="text-base font-bold text-gray-900 mb-2 line-clamp-2">
      {project.title}
    </h3>

    <!-- Description -->
    <p class="text-gray-600 mb-3 line-clamp-3 text-sm leading-relaxed">
      {project.description}
    </p>

    <!-- Progress Section -->
    {#if project.goalAmount}
      <div class="mb-3">
        <div class="flex justify-between items-center mb-1">
          <span class="text-sm font-medium text-gray-700">Progress</span>
          <span class="text-sm text-gray-500">{progressPercentage.toFixed(0)}%</span>
        </div>

        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            class="progress-fill bg-gradient-primary h-2 rounded-full"
            style="width: {progressPercentage}%"
          ></div>
        </div>

        <!-- Amount Progress -->
        <div class="flex justify-between text-sm">
          <span class="text-gray-600">
            Raised: <span class="font-semibold text-primary">{formatCurrency(project.currentAmount)}</span>
          </span>
          <span class="text-gray-600">
            Goal: <span class="font-semibold">{formatCurrency(project.goalAmount)}</span>
          </span>
        </div>
      </div>
    {:else}
      <div class="mb-3">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-700">Amount Raised</span>
          <span class="text-lg font-bold text-primary">{formatCurrency(project.currentAmount)}</span>
        </div>
      </div>
    {/if}

    <!-- Meta Information -->
    <div class="flex items-center justify-between text-xs text-gray-500 mb-3">
      <div class="flex items-center space-x-1">
        <span>Created {formatDate(project.createdAt)}</span>
      </div>
      <div class="flex items-center space-x-1">
        <span>{project.donationCount || 0} supporters</span>
      </div>
    </div>

    <!-- Donate Button -->
    <!-- <a
      href="/donate/{project.id}"
      class="w-full btn btn-primary py-2 px-4 rounded-md text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 group"
    >
      <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center">
        <svg class="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 4.62 16.5 6.38 18.5 4.62 20.17 3.81 21.5 3c2.08 0 4.5 1.42 4.5 4.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
        </svg>
      </div>
      <span>Donate Now</span>
    </a> -->
  </div>
</button>

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
