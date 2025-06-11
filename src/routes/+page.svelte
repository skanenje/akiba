<!-- src/routes/+page.svelte -->
<script>
    import { onMount } from 'svelte';
    import { fly, fade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    
    export let data;
    
    let heroVisible = false;
    let featuresVisible = false;
    let campaignCards = [];
    let featureCards = [];
    
    onMount(() => {
        heroVisible = true;
        
        // Initialize campaign cards with animation delays
        campaignCards = [
            {
                id: 1,
                title: "Community Garden Project",
                amount: "$2,847",
                backers: "156 backers",
                progress: 68,
                daysLeft: "23 days left",
                delay: 0
            },
            {
                id: 2,
                title: "Tech Education Fund",
                amount: "$5,230",
                backers: "89 backers",
                progress: 43,
                daysLeft: "12 days left",
                delay: 100
            }
        ];
        
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
            
            <div class="dashboard-preview">
                {#if heroVisible}
                    <div 
                        in:fly={{ x: 100, duration: 1000, delay: 300, easing: cubicOut }}
                        class="dashboard-card floating"
                    >
                        <div class="dashboard-header">
                            <div>
                                <div class="dashboard-title">Your Campaigns (4)</div>
                                <div class="dashboard-subtitle">Manage your fundraising projects</div>
                            </div>
                            <button class="start-campaign-btn">+ Start Campaign</button>
                        </div>
                        
                        <div class="campaigns-grid">
                            {#each campaignCards as campaign (campaign.id)}
                                <div 
                                    class="campaign-card"
                                    in:fly={{ y: 30, duration: 600, delay: 500 + campaign.delay, easing: cubicOut }}
                                    on:mouseenter={(e) => handleCampaignHover(e, true)}
                                    on:mouseleave={(e) => handleCampaignHover(e, false)}
                                    role="button"
                                    tabindex="0"
                                >
                                    <div class="campaign-image"></div>
                                    <div class="campaign-title">{campaign.title}</div>
                                    <div class="campaign-progress">
                                        <span class="campaign-amount">{campaign.amount}</span>
                                        <span class="campaign-backers">{campaign.backers}</span>
                                    </div>
                                    <div class="progress-bar">
                                        <div 
                                            class="progress-fill" 
                                            style="width: {campaign.progress}%"
                                        ></div>
                                    </div>
                                    <div class="campaign-days">{campaign.daysLeft}</div>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
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

    /* Dashboard Preview */
    .dashboard-preview {
        position: relative;
    }

    .dashboard-card {
        background: white;
        border-radius: var(--border-radius-2xl);
        padding: var(--space-8);
        box-shadow: var(--shadow-xl);
        border: 1px solid var(--color-grey-200);
        position: relative;
        overflow: hidden;
    }

    .dashboard-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: var(--gradient-primary);
    }

    .dashboard-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--space-6);
    }

    .dashboard-title {
        font-size: var(--font-size-lg);
        font-weight: 600;
        color: var(--color-text-primary);
    }

    .dashboard-subtitle {
        font-size: var(--font-size-sm);
        color: var(--color-text-light);
    }

    .start-campaign-btn {
        padding: var(--space-2) var(--space-4);
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: var(--border-radius-md);
        font-size: var(--font-size-sm);
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition-all);
    }

    .start-campaign-btn:hover {
        transform: translateY(-1px);
        box-shadow: var(--shadow-md);
    }

    /* Campaign Cards */
    .campaigns-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-4);
        margin-top: var(--space-6);
    }

    .campaign-card {
        background: var(--color-grey-50);
        border-radius: var(--border-radius-lg);
        padding: var(--space-4);
        transition: var(--transition-all);
        cursor: pointer;
        border: 1px solid var(--color-grey-200);
    }

    .campaign-image {
        width: 100%;
        height: 120px;
        background: linear-gradient(45deg, var(--color-primary-light), var(--color-secondary-light));
        border-radius: var(--border-radius-md);
        margin-bottom: var(--space-3);
        position: relative;
        overflow: hidden;
    }

    .campaign-image::after {
        content: '🎯';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: var(--font-size-2xl);
    }

    .campaign-title {
        font-size: var(--font-size-base);
        font-weight: 600;
        margin-bottom: var(--space-2);
        color: var(--color-text-primary);
    }

    .campaign-progress {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-2);
    }

    .campaign-amount {
        font-weight: 700;
        color: var(--color-primary);
    }

    .campaign-backers {
        font-size: var(--font-size-sm);
        color: var(--color-text-light);
    }

    .progress-bar {
        width: 100%;
        height: 4px;
        background: var(--color-grey-200);
        border-radius: 2px;
        overflow: hidden;
        margin-bottom: var(--space-2);
    }

    .progress-fill {
        height: 100%;
        background: var(--gradient-primary);
        border-radius: 2px;
        transition: var(--transition-all);
    }

    .campaign-days {
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
        margin: 0 auto;
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

    /* Floating Animation */
    .floating {
        animation: floating 3s ease-in-out infinite;
    }

    @keyframes floating {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .hero-content {
            grid-template-columns: 1fr;
            gap: var(--space-8);
            text-align: center;
        }

        .hero-title {
            font-size: var(--font-size-4xl);
        }

        .campaigns-grid {
            grid-template-columns: 1fr;
        }

        .hero-actions {
            flex-direction: column;
            align-items: center;
        }

        .hero-stats {
            justify-content: center;
        }
    }
</style>