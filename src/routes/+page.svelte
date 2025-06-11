<!-- src/routes/+page.svelte -->
<script>
    import { onMount } from 'svelte';
    import { fly, fade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import DonationForm from '$lib/components/DonationForm.svelte';
    import ProjectCard from '$lib/components/ProjectCard.svelte';

    let heroVisible = false;
    let featuresVisible = false;
    let projects = [];
    let selectedProjectId = null;
    let featureCards = [];
    
    import { browser } from '$app/environment';

    onMount(async () => {
        heroVisible = true;

        if (browser) {
            const response = await fetch('/api/projects');
            projects = await response.json();
        }

        // Initialize feature cards
        featureCards = [
            {
                icon: "🚀",
                title: "Quick Launch",
                description: "Get your campaign live in minutes with our intuitive setup process and professional templates."
            },
            {
                icon: "📊",
                title: "Real-time Analytics",
                description: "Track your progress with detailed insights and analytics to optimize your campaign performance."
            },
            {
                icon: "🔒",
                title: "Secure Payments",
                description: "Bank-level security ensures all transactions are safe and supporters can donate with confidence."
            },
            {
                icon: "🌟",
                title: "Social Sharing",
                description: "Built-in social media tools help amplify your message and reach more potential supporters."
            },
            {
                icon: "💬",
                title: "Community Engagement",
                description: "Keep supporters engaged with updates, comments, and direct messaging features."
            },
            {
                icon: "📱",
                title: "Mobile Optimized",
                description: "Your campaigns look great and work perfectly on all devices and screen sizes."
            }
        ];
        
        // Trigger features animation after a delay
        setTimeout(() => {
            featuresVisible = true;
        }, 800);
    });
    
    function handleCampaignHover(event, isEntering) {
        const card = event.currentTarget;
        if (isEntering) {
            card.style.transform = 'translateY(-4px) scale(1.02)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
        }
    }

    function selectProject(projectId) {
        selectedProjectId = projectId;
    }
</script>

<svelte:head>
    <title>FundFlow - Modern Donation Platform</title>
    <meta name="description" content="Create meaningful campaigns, connect with supporters, and make a real impact. The modern platform for crowdfunding success." />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
    <div class="container">
        <div class="hero-content">
            <div class="hero-text">
                {#if heroVisible}
                    <h1
                        in:fly={{ y: 50, duration: 800, easing: cubicOut }}
                        class="hero-title"
                    >
                        Fund What Matters Most
                    </h1>
                    <p
                        in:fly={{ y: 50, duration: 800, delay: 200, easing: cubicOut }}
                        class="hero-description"
                    >
                        Create meaningful campaigns, connect with supporters, and make a real impact.
                        The modern platform for crowdfunding success.
                    </p>

                    <div
                        in:fly={{ y: 50, duration: 800, delay: 400, easing: cubicOut }}
                        class="hero-actions"
                    >
                        <a href="/create" class="btn btn-primary btn-large">Start Your Campaign</a>
                        <a href="/discover" class="btn btn-secondary btn-large">Explore Projects</a>
                    </div>

                    <div
                        in:fly={{ y: 50, duration: 800, delay: 600, easing: cubicOut }}
                        class="hero-stats"
                    >
                        <div class="stat">
                            <span class="stat-number">$2.4M+</span>
                            <span class="stat-label">Raised</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">15K+</span>
                            <span class="stat-label">Backers</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">800+</span>
                            <span class="stat-label">Projects</span>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
</div>


</section>
<section class="content-section features">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Sample Projects</h2>
        </div>
        <div class="projects-grid">
            {#each projects as project (project.id)}
                <ProjectCard project={project} on:click={() => selectProject(project.id)} />
            {/each}
        </div>
    </div>
</section>
{#if selectedProjectId}
    <DonationForm projectId={selectedProjectId} />
{/if}
<section>

</section>
<!-- Features Section -->
<section class="features">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Everything You Need to Succeed</h2>
            <p class="section-subtitle">
                Powerful tools and features designed to help your campaigns reach their full potential
            </p>
        </div>

        <div class="features-grid">
            {#each featureCards as feature, index}
                {#if featuresVisible}
                    <div
                        class="feature-card"
                        in:fly={{ y: 50, duration: 600, delay: index * 100, easing: cubicOut }}
                    >
                        <div class="feature-icon">{feature.icon}</div>
                        <h3 class="feature-title">{feature.title}</h3>
                        <p class="feature-description">{feature.description}</p>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</section>
<style>
  .grid-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-8);
    padding: var(--space-16) 0;
    text-align: center;
  }
    .projects-section {
        padding: var(--space-16) 0;
        text-align: center;
    }

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--space-8);
        margin-top: var(--space-8);
    }
    /* Hero Section */
    .hero {
        padding: var(--space-20) 0 var(--space-16);
        background: linear-gradient(135deg, 
            rgba(var(--color-primary-rgb), 0.05) 0%, 
            rgba(16, 185, 129, 0.05) 100%);
        position: relative;
        overflow: hidden;
    }

    .hero::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 100%;
        height: 200%;
        background: radial-gradient(circle, rgba(var(--color-primary-rgb), 0.1) 0%, transparent 70%);
        animation: float 20s ease-in-out infinite;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
    }

    .hero-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-16);
        align-items: center;
        position: relative;
        z-index: 2;
    }

    .hero-title {
        font-size: var(--font-size-5xl);
        font-weight: 800;
        line-height: 1.1;
        margin-bottom: var(--space-6);
        background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .hero-description {
        font-size: var(--font-size-xl);
        color: var(--color-text-secondary);
        margin-bottom: var(--space-8);
        line-height: 1.7;
    }

    .hero-actions {
        display: flex;
        gap: var(--space-4);
        margin-bottom: var(--space-8);
    }

    .hero-stats {
        display: flex;
        gap: var(--space-8);
    }

    .stat {
        text-align: center;
    }

    .stat-number {
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--color-primary);
        display: block;
    }

    .stat-label {
        font-size: var(--font-size-sm);
        color: var(--color-text-light);
    }


    /* Features Section */
    .features {
        padding: var(--space-20) 0;
        background: var(--color-background-light);
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
    }

    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--space-8);
    }

    .feature-card {
        background: white;
        padding: var(--space-8);
        border-radius: var(--border-radius-xl);
        box-shadow: var(--shadow-sm);
        border: 1px solid var(--color-grey-200);
        transition: var(--transition-all);
    }

    .feature-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
    }

    .feature-icon {
        width: 64px;
        height: 64px;
        background: var(--gradient-primary);
        border-radius: var(--border-radius-lg);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: var(--space-6);
        font-size: var(--font-size-2xl);
    }

    .feature-title {
        font-size: var(--font-size-xl);
        font-weight: 600;
        margin-bottom: var(--space-3);
        color: var(--color-text-primary);
    }

    .feature-description {
        color: var(--color-text-secondary);
        line-height: 1.7;
    }
</style>