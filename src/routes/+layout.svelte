<!-- src/routes/+layout.svelte -->
<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    
    let headerElement;
    let scrollY = 0;
    
    onMount(() => {
        const handleScroll = () => {
            scrollY = window.scrollY;
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });
    
    $: headerScrolled = scrollY > 100;
</script>

<svelte:window bind:scrollY />

<!-- Header -->
<header 
    class="header" 
    class:scrolled={headerScrolled}
    bind:this={headerElement}
>
    <nav class="container">
        <div class="nav">
            <a href="/" class="logo">
                <div class="logo-icon">💝</div>
                FundFlow
            </a>
            
            <ul class="nav-links">
                <li>
                    <a 
                        href="/dashboard" 
                        class="nav-link" 
                        class:active={$page.url.pathname === '/dashboard'}
                    >
                        Dashboard
                    </a>
                </li>
                <li>
                    <a 
                        href="/campaigns" 
                        class="nav-link"
                        class:active={$page.url.pathname === '/campaigns'}
                    >
                        Campaigns
                    </a>
                </li>
                <li>
                    <a 
                        href="/discover" 
                        class="nav-link"
                        class:active={$page.url.pathname === '/discover'}
                    >
                        Discover
                    </a>
                </li>
                <li>
                    <a 
                        href="/about" 
                        class="nav-link"
                        class:active={$page.url.pathname === '/about'}
                    >
                        About
                    </a>
                </li>
            </ul>
            
            <div class="nav-actions">
                <a href="/auth/signin" class="btn btn-secondary">Sign In</a>
                <a href="/auth/signup" class="btn btn-primary">Get Started</a>
            </div>
        </div>
    </nav>
</header>

<!-- Main Content -->
<main class="main-content">
    <slot />
</main>

<!-- Footer -->
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <div class="footer-logo">
                    <div class="logo-icon">💝</div>
                    FundFlow
                </div>
                <p class="footer-description">
                    The modern platform for crowdfunding success. Create meaningful campaigns and make a real impact.
                </p>
            </div>
            
            <div class="footer-section">
                <h4 class="footer-title">Platform</h4>
                <ul class="footer-links">
                    <li><a href="/campaigns">Browse Campaigns</a></li>
                    <li><a href="/create">Start Campaign</a></li>
                    <li><a href="/how-it-works">How It Works</a></li>
                    <li><a href="/pricing">Pricing</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h4 class="footer-title">Support</h4>
                <ul class="footer-links">
                    <li><a href="/help">Help Center</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                    <li><a href="/community">Community</a></li>
                    <li><a href="/blog">Blog</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h4 class="footer-title">Legal</h4>
                <ul class="footer-links">
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/terms">Terms of Service</a></li>
                    <li><a href="/security">Security</a></li>
                    <li><a href="/cookies">Cookie Policy</a></li>
                </ul>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2025 FundFlow. All rights reserved.</p>
            <div class="social-links">
                <a href="#" class="social-link">Twitter</a>
                <a href="#" class="social-link">LinkedIn</a>
                <a href="#" class="social-link">Facebook</a>
            </div>
        </div>
    </div>
</footer>

<style>
    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :global(body) {
        font-family: var(--font-family-primary);
        line-height: 1.6;
        color: var(--color-text-primary);
        background: var(--color-background);
        overflow-x: hidden;
    }

    :global(:root) {
        /* Updated Color System - Modern & Professional */
        --color-primary: #6366f1;           /* Indigo primary */
        --color-primary-light: #818cf8;     /* Light indigo */
        --color-primary-dark: #4f46e5;      /* Dark indigo */
        --color-primary-rgb: 99, 102, 241;
        
        --color-secondary: #10b981;         /* Emerald green */
        --color-secondary-light: #34d399;   /* Light emerald */
        --color-secondary-dark: #059669;    /* Dark emerald */
        
        --color-accent: #f59e0b;            /* Amber accent */
        --color-accent-light: #fbbf24;      /* Light amber */
        --color-accent-dark: #d97706;       /* Dark amber */
        
        /* Neutral Colors */
        --color-white: #ffffff;
        --color-grey-50: #f9fafb;
        --color-grey-100: #f3f4f6;
        --color-grey-200: #e5e7eb;
        --color-grey-300: #d1d5db;
        --color-grey-400: #9ca3af;
        --color-grey-500: #6b7280;
        --color-grey-600: #4b5563;
        --color-grey-700: #374151;
        --color-grey-800: #1f2937;
        --color-grey-900: #111827;
        
        /* Background Colors */
        --color-background: var(--color-white);
        --color-background-light: var(--color-grey-50);
        --color-background-dark: var(--color-grey-900);
        
        /* Text Colors */
        --color-text-primary: var(--color-grey-900);
        --color-text-secondary: var(--color-grey-600);
        --color-text-light: var(--color-grey-400);
        
        /* Status Colors */
        --color-success: var(--color-secondary);
        --color-warning: var(--color-accent);
        --color-error: #ef4444;
        --color-info: var(--color-primary);
        
        /* Gradients */
        --gradient-primary: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
        --gradient-secondary: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-dark) 100%);
        --gradient-hero: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
        --gradient-card: linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
        
        /* Shadows */
        --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        --shadow-card: 0 4px 20px rgba(var(--color-primary-rgb), 0.1);
        --shadow-hover: 0 8px 30px rgba(var(--color-primary-rgb), 0.15);
        
        /* Transitions */
        --transition-all: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        --transition-transform: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        --transition-colors: color 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        
        /* Typography */
        --font-family-primary: 'Inter', system-ui, -apple-system, sans-serif;
        --font-size-xs: 0.75rem;
        --font-size-sm: 0.875rem;
        --font-size-base: 1rem;
        --font-size-lg: 1.125rem;
        --font-size-xl: 1.25rem;
        --font-size-2xl: 1.5rem;
        --font-size-3xl: 1.875rem;
        --font-size-4xl: 2.25rem;
        --font-size-5xl: 3rem;
        
        /* Layout */
        --border-radius-sm: 0.375rem;
        --border-radius-md: 0.5rem;
        --border-radius-lg: 0.75rem;
        --border-radius-xl: 1rem;
        --border-radius-2xl: 1.5rem;
        
        /* Spacing */
        --space-1: 0.25rem;
        --space-2: 0.5rem;
        --space-3: 0.75rem;
        --space-4: 1rem;
        --space-5: 1.25rem;
        --space-6: 1.5rem;
        --space-8: 2rem;
        --space-10: 2.5rem;
        --space-12: 3rem;
        --space-16: 4rem;
        --space-20: 5rem;
    }

    :global(.container) {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--space-6);
    }

    /* Header Styles */
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

    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: var(--shadow-md);
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
        width: 32px;
        height: 32px;
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

    /* Button Styles */
    :global(.btn) {
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

    :global(.btn-primary) {
        background: var(--gradient-primary);
        color: white;
        box-shadow: var(--shadow-sm);
    }

    :global(.btn-primary:hover) {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
    }

    :global(.btn-secondary) {
        background: transparent;
        color: var(--color-text-secondary);
        border: 1px solid var(--color-grey-300);
    }

    :global(.btn-secondary:hover) {
        background: var(--color-grey-50);
        color: var(--color-text-primary);
    }

    :global(.btn-large) {
        padding: var(--space-4) var(--space-8);
        font-size: var(--font-size-base);
    }

    /* Main Content */
    .main-content {
        min-height: 100vh;
        padding-top: 80px; /* Account for fixed header */
    }

    /* Footer Styles */
    .footer {
        background: var(--color-grey-900);
        color: var(--color-grey-300);
        padding: var(--space-16) 0 var(--space-8);
        margin-top: var(--space-20);
    }

    .footer-content {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: var(--space-12);
        margin-bottom: var(--space-12);
    }

    .footer-section h4 {
        color: var(--color-white);
        font-weight: 600;
        margin-bottom: var(--space-4);
    }

    .footer-logo {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        font-size: var(--font-size-xl);
        font-weight: 700;
        color: var(--color-primary);
        margin-bottom: var(--space-4);
    }

    .footer-description {
        line-height: 1.7;
        color: var(--color-grey-400);
    }

    .footer-links {
        list-style: none;
    }

    .footer-links li {
        margin-bottom: var(--space-2);
    }

    .footer-links a {
        color: var(--color-grey-400);
        text-decoration: none;
        transition: var(--transition-colors);
    }

    .footer-links a:hover {
        color: var(--color-primary);
    }

    .footer-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: var(--space-8);
        border-top: 1px solid var(--color-grey-800);
    }

    .social-links {
        display: flex;
        gap: var(--space-6);
    }

    .social-link {
        color: var(--color-grey-400);
        text-decoration: none;
        transition: var(--transition-colors);
    }

    .social-link:hover {
        color: var(--color-primary);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }

        .footer-content {
            grid-template-columns: 1fr;
            gap: var(--space-8);
        }

        .footer-bottom {
            flex-direction: column;
            gap: var(--space-4);
            text-align: center;
        }
    }
</style>