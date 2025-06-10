<script>
  import '../app.css';
  import { page } from '$app/stores';

  /**
   * Check if the current page is an admin page
   * @type {boolean}
   */
  $: isAdmin = $page.url.pathname.startsWith('/admin');
</script>

<svelte:head>
  <title>Donation Platform - Support Social Projects</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
  <!-- Navigation Header -->
  <nav class="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <a href="/" class="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 4.62 16.5 6.38 18.5 4.62 20.17 3.81 21.5 3c2.08 0 4.5 1.42 4.5 4.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
              </svg>
            </div>
            <span>DonateKenya</span>
          </a>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <a
            href="/"
            class="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
            class:text-blue-600={$page.url.pathname === '/'}
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
            </svg>
            <span>Projects</span>
          </a>

          <a
            href="/stats"
            class="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
            class:text-blue-600={$page.url.pathname === '/stats'}
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.59L12 10.59l-2.59-2.59L7.41 12l-2.59 2.59 2.59 2.59L10.59 14l2.59 2.59 2.59-2.59 2.59 2.59 1.41-1.41-2.59-2.59 2.59-2.59 1.41 1.41-4.59 4.59z"></path>
            </svg>
            <span>Impact</span>
          </a>

          <a
            href="/admin"
            class="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
            class:text-blue-600={isAdmin}
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.9-9.31L12 10.17l3.31-2.59 1.41 1.41-2.59 2.59 1.41 1.41-2.59 2.59-2.59-2.59-2.59 2.59-1.41-1.41 2.59-2.59-1.41-1.41z"></path>
            </svg>
            <span>Admin</span>
          </a>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Main Content -->
  <main class="flex-1">
    <slot />
  </main>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 4.62 16.5 6.38 18.5 4.62 20.17 3.81 21.5 3c2.08 0 4.5 1.42 4.5 4.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
              </svg>
            </div>
            <span class="text-xl font-bold">DonateKenya</span>
          </div>
          <p class="text-gray-400 mb-4 max-w-md">
            Supporting social projects across Kenya through secure, anonymous donations.
            Every contribution makes a difference in our communities.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><a href="/" class="text-gray-400 hover:text-white transition-colors">All Projects</a></li>
            <li><a href="/stats" class="text-gray-400 hover:text-white transition-colors">Impact Stats</a></li>
            <li><a href="/admin" class="text-gray-400 hover:text-white transition-colors">Admin Panel</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Support</h3>
          <ul class="space-y-2">
            <li class="text-gray-400">M-Pesa: 174379</li>
            <li class="text-gray-400">Available 24/7</li>
            <li class="text-gray-400">Secure & Anonymous</li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400 text-sm">
          &copy; 2024 DonateKenya. Making a difference together.
        </p>
        <div class="flex space-x-4 mt-4 md:mt-0">
          <span class="text-gray-400 text-sm">Powered by M-Pesa</span>
          <span class="text-gray-400 text-sm">•</span>
          <span class="text-gray-400 text-sm">Secure Donations</span>
        </div>
      </div>
    </div>
  </footer>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Inter', sans-serif;
  }
</style>