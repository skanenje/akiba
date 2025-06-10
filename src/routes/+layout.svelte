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
  <title>Let's Make Education For All - DonateKenya</title>
</svelte:head>

<div class="min-h-screen bg-white">
  <!-- Navigation Header -->
  <nav class="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <a href="/" class="flex items-center space-x-3 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" style="width: 1em; height: 1em;">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">DonateKenya</span>
          </a>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <a
            href="/"
            class="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            class:bg-blue-50={$page.url.pathname === '/'}
            class:text-blue-600={$page.url.pathname === '/'}
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style="width: 1em; height: 1em;">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span class="font-medium">Projects</span>
          </a>

          <a
            href="/stats"
            class="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            class:bg-blue-50={$page.url.pathname === '/stats'}
            class:text-blue-600={$page.url.pathname === '/stats'}
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style="width: 1em; height: 1em;">
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
            </svg>
            <span class="font-medium">Impact</span>
          </a>

          <a
            href="/admin"
            class="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            class:bg-blue-50={isAdmin}
            class:text-blue-600={isAdmin}
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style="width: 1em; height: 1em;">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
            <span class="font-medium">Admin</span>
          </a>
        </div>

        <!-- CTA Button -->
        <div class="hidden md:flex items-center space-x-4">
          <button class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Donate Now
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button class="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Open Menu">
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
  <footer class="bg-gray-900 text-white relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90"></div>
    <div class="absolute top-0 left-0 w-full h-full">
      <div class="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      <div class="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
    </div>
    
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24" style="width: 1em; height: 1em;">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div>
              <span class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">DonateKenya</span>
              <p class="text-sm text-gray-400">Making Education Accessible</p>
            </div>
          </div>
          <p class="text-gray-300 mb-6 max-w-md leading-relaxed">
            Empowering communities across Kenya through education and social impact projects. 
            Every contribution creates lasting change in our society.
          </p>
          <div class="flex space-x-4">
            <div class="flex items-center space-x-2 text-green-400">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style="width: 1em; height: 1em;">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span class="text-sm font-medium">Verified Projects</span>
            </div>
            <div class="flex items-center space-x-2 text-blue-400">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style="width: 1em; height: 1em;">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z"/>
              </svg>
              <span class="text-sm font-medium">Secure Donations</span>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-6 text-white">Quick Links</h3>
          <ul class="space-y-4">
            <li><a href="/" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 group">
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
              <span>All Projects</span>
            </a></li>
            <li><a href="/stats" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 group">
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
              <span>Impact Dashboard</span>
            </a></li>
            <li><a href="/admin" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 group">
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
              <span>Admin Panel</span>
            </a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-lg font-semibold mb-6 text-white">Get Support</h3>
          <ul class="space-y-4">
            <li class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" style="width: 1em; height: 1em;">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <div>
                <p class="text-white font-medium">M-Pesa</p>
                <p class="text-gray-400 text-sm">174379</p>
              </div>
            </li>
            <li class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </div>
              <div>
                <p class="text-white font-medium">24/7 Support</p>
                <p class="text-gray-400 text-sm">Always available</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <div class="flex items-center space-x-4 mb-4 md:mb-0">
          <p class="text-gray-400 text-sm">
            &copy; 2024 DonateKenya. Transforming communities through education.
          </p>
        </div>
        <div class="flex items-center space-x-6">
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-gray-400 text-sm">Secure Platform</span>
          </div>
          <span class="text-gray-600">•</span>
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span class="text-gray-400 text-sm">Trusted by 10K+ donors</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :global(*) {
    box-sizing: border-box;
  }

  /* Custom scrollbar */
  :global(::-webkit-scrollbar) {
    width: 8px;
  }

  :global(::-webkit-scrollbar-track) {
    background: #f1f5f9;
  }

  :global(::-webkit-scrollbar-thumb) {
    background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
    border-radius: 4px;
  }

  :global(::-webkit-scrollbar-thumb:hover) {
    background: linear-gradient(to bottom, #2563eb, #7c3aed);
  }

  /* Smooth transitions for all interactive elements */
  :global(a, button) {
    transition: all 0.2s ease-in-out;
  }

  /* Focus styles for accessibility */
  :global(a:focus, button:focus) {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
</style>