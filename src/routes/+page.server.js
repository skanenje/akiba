// src/routes/+page.server.js

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, url, locals }) {
    try {
        // Simulate API calls for homepage data
        // In a real app, these would be actual database calls or API requests
        
        // Get platform statistics
        const platformStats = await getPlatformStats();
        
        // Get featured campaigns
        const featuredCampaigns = await getFeaturedCampaigns();
        
        // Get recent activity/testimonials
        const recentActivity = await getRecentActivity();
        
        // Get success stories
        const successStories = await getSuccessStories();
        
        return {
            platformStats,
            featuredCampaigns,
            recentActivity,
            successStories,
            meta: {
                title: 'FundFlow - Modern Donation Platform',
                description: 'Create meaningful campaigns, connect with supporters, and make a real impact. The modern platform for crowdfunding success.',
                keywords: 'crowdfunding, fundraising, donations, campaigns, nonprofit, charity'
            }
        };
    } catch (error) {
        console.error('Error loading homepage data:', error);
        
        // Return fallback data if there's an error
        return {
            platformStats: getDefaultStats(),
            featuredCampaigns: [],
            recentActivity: [],
            successStories: [],
            meta: {
                title: 'FundFlow - Modern Donation Platform',
                description: 'Create meaningful campaigns, connect with supporters, and make a real impact.',
                keywords: 'crowdfunding, fundraising, donations'
            }
        };
    }
}

// Simulated data functions - replace with real database calls
async function getPlatformStats() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
        totalRaised: {
            amount: 2400000,
            formatted: '$2.4M+',
            growth: '+23% this month'
        },
        totalBackers: {
            count: 15000,
            formatted: '15K+',
            growth: '+12% this month'
        },
        totalProjects: {
            count: 800,
            formatted: '800+',
            growth: '+45 this week'
        },
        successRate: {
            percentage: 78,
            formatted: '78%',
            description: 'Success rate'
        }
    };
}

async function getFeaturedCampaigns() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 150));
    
    return [
        {
            id: 'campaign-1',
            title: 'Clean Water for Rural Communities',
            description: 'Bringing clean, safe drinking water to underserved communities in rural Africa.',
            goal: 50000,
            raised: 34500,
            backers: 234,
            daysLeft: 18,
            category: 'humanitarian',
            image: '/api/placeholder/400/300',
            creator: {
                name: 'Water Aid International',
                avatar: '/api/placeholder/50/50',
                verified: true
            },
            featured: true,
            urgent: false
        },
        {
            id: 'campaign-2',
            title: 'Youth Coding Bootcamp',
            description: 'Empowering underprivileged youth with coding skills and technology education.',
            goal: 25000,
            raised: 18750,
            backers: 156,
            daysLeft: 25,
            category: 'education',
            image: '/api/placeholder/400/300',
            creator: {
                name: 'TechForGood Foundation',
                avatar: '/api/placeholder/50/50',
                verified: true
            },
            featured: true,
            urgent: false
        },
        {
            id: 'campaign-3',
            title: 'Emergency Medical Equipment',
            description: 'Critical medical equipment for a local hospital serving remote areas.',
            goal: 75000,
            raised: 52000,
            backers: 312,
            daysLeft: 8,
            category: 'medical',
            image: '/api/placeholder/400/300',
            creator: {
                name: 'Rural Health Initiative',
                avatar: '/api/placeholder/50/50',
                verified: true
            },
            featured: true,
            urgent: true
        }
    ];
}

async function getRecentActivity() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 120));
    
    return [
        {
            id: 'activity-1',
            type: 'donation',
            user: {
                name: 'Sarah Chen',
                avatar: '/api/placeholder/40/40'
            },
            campaign: 'Clean Water Project',
            amount: 250,
            timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
            message: 'Such an important cause! Happy to support.'
        },
        {
            id: 'activity-2',
            type: 'milestone',
            campaign: 'Youth Coding Bootcamp',
            milestone: '75% funded',
            timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
        },
        {
            id: 'activity-3',
            type: 'launch',
            campaign: 'Community Garden Initiative',
            creator: 'Green Spaces Collective',
            timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
        },
        {
            id: 'activity-4',
            type: 'donation',
            user: {
                name: 'Michael Rodriguez',
                avatar: '/api/placeholder/40/40'
            },
            campaign: 'Emergency Medical Equipment',
            amount: 500,
            timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
        }
    ];
}

async function getSuccessStories() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return [
        {
            id: 'story-1',
            title: 'School Library Renovation Complete',
            description: 'Thanks to 200+ donors, Lincoln Elementary now has a modern library with over 5,000 new books.',
            image: '/api/placeholder/300/200',
            raised: 15000,
            impact: '500 students now have access to modern learning resources',
            completedDate: new Date('2024-12-15'),
            testimonial: {
                text: 'The support from our community was overwhelming. Our students are already spending more time reading!',
                author: 'Ms. Johnson, School Librarian'
            }
        },
        {
            id: 'story-2',
            title: 'Mobile Health Clinic Launched',
            description: 'Rural healthcare access improved with a fully equipped mobile clinic serving 12 remote villages.',
            image: '/api/placeholder/300/200',
            raised: 85000,
            impact: '2,000+ people now have regular access to healthcare',
            completedDate: new Date('2024-11-28'),
            testimonial: {
                text: 'This clinic has been a lifeline for our community. Thank you to everyone who made this possible.',
                author: 'Dr. Patel, Mobile Clinic Director'
            }
        }
    ];
}

function getDefaultStats() {
    return {
        totalRaised: {
            amount: 2400000,
            formatted: '$2.4M+',
            growth: null
        },
        totalBackers: {
            count: 15000,
            formatted: '15K+',
            growth: null
        },
        totalProjects: {
            count: 800,
            formatted: '800+',
            growth: null
        },
        successRate: {
            percentage: 78,
            formatted: '78%',
            description: 'Success rate'
        }
    };
}

// Additional utility functions that might be useful

/**
 * Get trending campaigns based on recent activity
 */
export async function getTrendingCampaigns(limit = 6) {
    // This would typically query campaigns with high recent activity
    // For now, return a subset of featured campaigns
    const featured = await getFeaturedCampaigns();
    return featured.slice(0, limit);
}

/**
 * Get campaigns by category
 */
export async function getCampaignsByCategory(category, limit = 10) {
    const allCampaigns = await getFeaturedCampaigns();
    return allCampaigns
        .filter(campaign => campaign.category === category)
        .slice(0, limit);
}

/**
 * Get platform-wide metrics for admin dashboard
 */
export async function getPlatformMetrics() {
    const stats = await getPlatformStats();
    const campaigns = await getFeaturedCampaigns();
    
    return {
        ...stats,
        activeCampaigns: campaigns.length,
        averageDonation: stats.totalRaised.amount / stats.totalBackers.count,
        categoryBreakdown: getCategoryBreakdown(campaigns)
    };
}

function getCategoryBreakdown(campaigns) {
    const breakdown = {};
    campaigns.forEach(campaign => {
        breakdown[campaign.category] = (breakdown[campaign.category] || 0) + 1;
    });
    return breakdown;
}