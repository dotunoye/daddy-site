/**
 * script.js
 * Ultra-Premium Portfolio - Dynamic Content & Interactivity
 * Handles grid population, modal interactions, and navigation
 */

// ============================================================================
// 1. DATA (The CMS)
// ============================================================================

/**
 * Thoughts Data
 * Array of 12 insight objects with metadata and content
 */
const thoughtsData = [
    {
        id: 1,
        title: "The Forex Game: Beyond Charts and Candles",
        category: "Forex Trading",
        summary: "Understanding the psychology behind forex movements and how elite traders position themselves ahead of the masses.",
        fullContent: "The forex market moves on sentiment, data, and institutional positioning. But the real game is about understanding what moves sentiment. Elite traders don't just read charts—they read geopolitics, economic trends, and central bank psychology. This insight explores how to build a trading thesis that accounts for multiple variables and positions you ahead of reactive traders. The forex market moves on sentiment, data, and institutional positioning. But the real game is about understanding what moves sentiment. Elite traders don't just read charts—they read geopolitics, economic trends, and central bank psychology. This insight explores how to build a trading thesis that accounts for multiple variables and positions you ahead of reactive traders.The forex market moves on sentiment, data, and institutional positioning. But the real game is about understanding what moves sentiment. Elite traders don't just read charts—they read geopolitics, economic trends, and central bank psychology. This insight explores how to build a trading thesis that accounts for multiple variables and positions you ahead of reactive traders.",
        date: "2025-11-28"
    },
    {
        id: 2,
        title: "Personal Branding in the Digital Age: Why Visibility Equals Opportunity",
        category: "Personal Branding",
        summary: "In a world of noise, your personal brand is your moat. Here's how thought leaders build unshakeable positioning.",
        fullContent: "Your personal brand is the intersection of your expertise, your values, and how consistently you communicate them. Building a premium personal brand isn't about going viral—it's about becoming the obvious choice for your target audience. This requires clarity of message, consistency across platforms, and the courage to have a distinct point of view.",
        date: "2025-11-25"
    },
    {
        id: 3,
        title: "The Entrepreneur's Paradox: Risk, Capital, and Timing",
        category: "Entrepreneurship",
        summary: "Why most entrepreneurs fail isn't because of bad ideas—it's because they don't understand capital dynamics and market timing.",
        fullContent: "Every successful entrepreneur understands one thing: capital is oxygen. The ability to deploy capital at the right moment—when markets are dislocated, competition is weak, or asset prices are irrational—separates winners from the rest. But knowing when to deploy capital requires deep market knowledge, pattern recognition, and the discipline to wait for asymmetric opportunities.",
        date: "2025-11-20"
    },
    {
        id: 4,
        title: "International Markets: The New Frontier for Wealth Creation",
        category: "International Markets",
        summary: "Emerging markets and cross-border investments are where the next generation of wealth will be built.",
        fullContent: "While developed markets are saturated and heavily regulated, emerging markets offer asymmetric growth opportunities. Real estate in fast-growing African cities, forex positions in developing economies, and cross-border e-commerce are creating millionaires today. But success requires on-the-ground knowledge, cultural intelligence, and the willingness to invest where others fear to go.",
        date: "2025-11-18"
    },
    {
        id: 5,
        title: "The Art of Investment Thesis Development",
        category: "Investments",
        summary: "How to build conviction in your investments by developing a coherent, evidence-based thesis.",
        fullContent: "An investment thesis isn't just a hunch—it's a detailed framework of assumptions, risk factors, and catalysts. Professional investors spend weeks building a thesis before deploying capital. Your thesis should answer: Why is this undervalued? What's the catalyst for repricing? What could go wrong? By thinking systematically, you reduce emotion and improve returns.",
        date: "2025-11-15"
    },
    {
        id: 6,
        title: "Luxury Business Culture: The Economics of Premium Positioning",
        category: "Luxury Business",
        summary: "Understanding the economics of luxury brands and how scarcity, exclusivity, and status drive premium pricing.",
        fullContent: "Luxury isn't about price—it's about perception. Rolex doesn't charge $15,000 for a watch because of the materials; they charge it because of exclusivity, heritage, and status. Building a premium business requires mastering the art of scarcity, creating aspirational positioning, and building a brand narrative that transcends functional benefits.",
        date: "2025-11-12"
    },
    {
        id: 7,
        title: "Wealth Building 101: The Foundation of Financial Mastery",
        category: "Finances",
        summary: "The fundamental principles that separate wealth builders from those stuck in the rat race.",
        fullContent: "Wealth building follows predictable patterns: income, capital formation, intelligent deployment, and compounding. Most people fail at step one—they don't earn enough. The second failure point is capital formation—they spend everything. The third is deployment—they're too conservative or too reckless. And the fourth is patience—they exit positions too early. Master these four stages and you're in the top 1%.",
        date: "2025-11-08"
    },
    {
        id: 8,
        title: "The Thought Leader's Edge: How to Build Authority and Influence",
        category: "Personal Branding",
        summary: "Why some people build devoted followings while others shout into the void. It's about consistency, uniqueness, and value.",
        fullContent: "Authority is built through consistent, high-quality contribution over time. You can't fake it; your audience will know. The path to thought leadership is: 1) Find a niche where you have genuine expertise. 2) Create content that's 10x better than what exists. 3) Be consistent for 2-3 years minimum. 4) Engage authentically with your community. Success is inevitable if you follow this path.Authority is built through consistent, high-quality contribution over time. You can't fake it; your audience will know. The path to thought leadership is: 1) Find a niche where you have genuine expertise. 2) Create content that's 10x better than what exists. 3) Be consistent for 2-3 years minimum. 4) Engage authentically with your community. Success is inevitable if you follow this path.Authority is built through consistent, high-quality contribution over time. You can't fake it; your audience will know. The path to thought leadership is: 1) Find a niche where you have genuine expertise. 2) Create content that's 10x better than what exists. 3) Be consistent for 2-3 years minimum. 4) Engage authentically with your community. Success is inevitable if you follow this path.Authority is built through consistent, high-quality contribution over time. You can't fake it; your audience will know. The path to thought leadership is: 1) Find a niche where you have genuine expertise. 2) Create content that's 10x better than what exists. 3) Be consistent for 2-3 years minimum. 4) Engage authentically with your community. Success is inevitable if you follow this path.",
        date: "2025-11-05"
    },
    {
        id: 9,
        title: "Currency Markets: Understanding Global Flows and Positioning",
        category: "Forex Trading",
        summary: "How central banks, geopolitical events, and capital flows shape forex trends over weeks, months, and years.",
        fullContent: "Forex moves on macro fundamentals. When you understand that the ECB is hiking rates while the Fed is cutting, you can position for EUR/USD moves weeks in advance. When you see capital fleeing emerging markets due to geopolitical risk, you can trade currency depreciation. The key is reading macro indicators, understanding policy intentions, and positioning before the consensus catches on.",
        date: "2025-10-30"
    },
    {
        id: 10,
        title: "Building Multiple Income Streams: The Wealthy Person's Playbook",
        category: "Entrepreneurship",
        summary: "Why relying on a single income source is risky, and how to structure diversified revenue.",
        fullContent: "The wealthy don't rely on a single paycheck. They build a portfolio of income streams: business revenue, investment returns, royalties, and passive income. Each stream has different risk profiles, timing, and growth rates. By building 3-5 income streams, you're insulated from market shocks and positioned for exponential growth. Start with your core business, then add complementary revenue sources.",
        date: "2025-10-25"
    },
    {
        id: 11,
        title: "The Psychology of Money: Why Smart People Make Dumb Financial Decisions",
        category: "Finances",
        summary: "Behavioral finance reveals that money decisions are emotional, not rational. Understanding this is the first step to mastery.",
        fullContent: "IQ and financial success don't correlate. Why? Because money is emotional. Fear makes us sell winners too early. Greed makes us chase bubbles. Overconfidence makes us take excessive risks. Social proof makes us follow the crowd. By understanding these psychological biases, you can build systems that protect you from yourself—automated investments, predetermined stop-losses, and written investment theses.",
        date: "2025-10-20"
    },
    {
        id: 12,
        title: "Positioning in Chaos: How Uncertainty Creates Wealth Opportunities",
        category: "Investments",
        summary: "Market dislocations and crises are the richest hunting grounds for investors willing to act when others panic.",
        fullContent: "The greatest wealth is built during uncertainty. When markets crash 40%, most people panic and sell. Smart investors see opportunity. They've done their homework, built conviction in undervalued assets, and positioned capital on the sidelines for moments like these. The next recession will create thousands of new millionaires—will you be one of them, or will you be panicking with the masses?",
        date: "2025-10-15"
    }
];

/**
 * Gallery Data
 * Array of 12 gallery items with images and captions
 */
const galleryData = [
    {
        id: 1,
        src: "",
        caption: "Market Analysis Session - Tracking Global Flows",
        date: "2025-10-15"
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=500&h=500&fit=crop",
        caption: "Premium Networking Event - Lagos",
        date: "2025-10-15"
    },
    {
        id: 3,
        src: "assets/fav7.webp",
        caption: "International Business Summit - Dubai",
        date: "2025-10-15"
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=500&fit=crop",
        caption: "Trading Floor - Real Time Decision Making",
        date: "2025-10-15"
    },
    {
        id: 5,
        src: "assets/panel meeting.webp",
        caption: "Thought Leadership Panel - Wealth Creation Strategies",
        date: "2025-10-15"
    },
    {
        id: 6,
        src: "assets/fav6.jpg",
        caption: "Strategic Planning Session",
        date: "2025-10-15"
    },
    {
        id: 7,
        src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
        caption: "International Markets Mastery Conference",
        date: "2025-10-15"
    },
    {
        id: 8,
        src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop",
        caption: "Premium Lifestyle - Luxury Events",
        date: "2025-10-15"
    },
    {
        id: 9,
        src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=500&h=500&fit=crop",
        caption: "Entrepreneur Networking - Building Connections",
        date: "2025-10-15"
    },
    {
        id: 10,
        src: "https://images.unsplash.com/photo-1552674605-5defe6aa44bb?w=500&h=500&fit=crop",
        caption: "Business Protocol - Fine Dining & Conversations",
        date: "2025-10-15"
    },
    {
        id: 11,
        src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
        caption: "Market Leadership - Thought Leader Conference",
        date: "2025-10-15"
    },
    {
        id: 12,
        src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop",
        caption: "Global Positioning - International Markets",
        date: "2025-10-15"
    }
];

// ============================================================================
// 2. RENDER FUNCTIONS
// ============================================================================

/**
 * renderCards(dataArray, containerId, limit)
 * Populates a grid container with card elements
 * @param {Array} dataArray - Array of data objects (thoughts or gallery)
 * @param {String} containerId - ID of the target container element
 * @param {Number|null} limit - Number of items to display (null = all)
 */
function renderCards(dataArray, containerId, limit) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Determine which items to render
    const itemsToRender = limit ? dataArray.slice(0, limit) : dataArray;

    // Render based on data type
    if (containerId.includes('thought')) {
        renderThoughts(itemsToRender, container);
    } else if (containerId.includes('gallery')) {
        renderGallery(itemsToRender, container);
    }
}

/**
 * renderThoughts(data, container)
 * Generates and inserts thought cards into the container
 */
function renderThoughts(data, container) {
    container.innerHTML = data.map(thought => `
        <article class="card thought-card" data-id="${thought.id}" role="button" tabindex="0" aria-label="Open thought: ${thought.title}">
            <div class="card-header">
                <span class="card-category">${thought.category}</span>
                <span class="card-date">${formatDate(thought.date)}</span>
            </div>
            <h3 class="card-title">${thought.title}</h3>
            <p class="card-summary">${thought.summary}</p>
            <div class="card-footer">
                <span class="card-cta">Read Full Insight →</span>
            </div>
        </article>
    `).join('');

    // Attach click handlers
    attachCardListeners(container, thoughtsData, 'thought');
}

/**
 * renderGallery(data, container)
 * Generates and inserts gallery items into the container
 */
function renderGallery(data, container) {
    container.innerHTML = data.map(item => `
        <div class="gallery-item" data-id="${item.id}" role="button" tabindex="0" aria-label="View gallery item: ${item.caption}">
            <img src="${item.src}" alt="${item.caption}" class="gallery-image" loading="lazy">
            <div class="gallery-overlay">
                <p class="gallery-caption">${item.caption}</p>
                <p class="gallery-date">${formatDate(item.date)}</p>
            </div>
        </div>
    `).join('');

    // Attach click handlers
    attachCardListeners(container, galleryData, 'gallery');
}

/**
 * attachCardListeners(container, dataArray, type)
 * Adds click and keyboard event listeners to cards
 */
function attachCardListeners(container, dataArray, type) {
    const cards = container.querySelectorAll('[data-id]');

    cards.forEach(card => {
        const cardId = parseInt(card.dataset.id);
        const data = dataArray.find(item => item.id === cardId);

        // Click event
        card.addEventListener('click', () => {
            if (type === 'thought') {
                openThoughtModal(data);
            } else if (type === 'gallery') {
                openGalleryModal(data);
            }
        });

        // Keyboard event (Enter/Space)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}

// ============================================================================
// 3. MODAL FUNCTIONS
// ============================================================================

/**
 * openThoughtModal(thought)
 * Opens a modal with the full thought content
 */
function openThoughtModal(thought) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content modal-thought">
            <button class="modal-close" aria-label="Close modal">✕</button>
            <div class="modal-header">
                <span class="modal-category">${thought.category}</span>
                <span class="modal-date">${formatDate(thought.date)}</span>
            </div>
            <h2 class="modal-title">${thought.title}</h2>
            <div class="modal-body">
                <p>${thought.fullContent}</p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.focus();

    // Close on button click
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

/**
 * openGalleryModal(galleryItem)
 * Opens a modal with the full gallery image
 */
function openGalleryModal(galleryItem) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content modal-gallery">
           
            <img src="${galleryItem.src}" alt="${galleryItem.caption}" class="modal-image">
            <div class="modal-gallery-info">
            <p class="modal-gallery-caption">${galleryItem.caption}</p>
            <p class="modal-gallery-date">${formatDate(galleryItem.date)}</p>
            </div>
             <button class="modal-close close-gallery" aria-label="Close modal">✕</button>
        </div>
    `;

    document.body.appendChild(modal);
    modal.focus();

    // Close on button click
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// ============================================================================
// 4. ROUTER LOGIC (Critical)
// ============================================================================

/**
 * Initialize on page load
 * Check which grids exist and populate them accordingly
 */
document.addEventListener('DOMContentLoaded', () => {
    // Home page - Thoughts preview (3 items)
    if (document.getElementById('home-thoughts-grid')) {
        renderCards(thoughtsData, 'home-thoughts-grid', 3);
    }

    // Thoughts page - All thoughts (12 items)
    if (document.getElementById('all-thoughts-grid')) {
        renderCards(thoughtsData, 'all-thoughts-grid', null);
    }

    // Home page - Gallery preview (6 items)
    if (document.getElementById('home-gallery-grid')) {
        renderCards(galleryData, 'home-gallery-grid', 6);
    }

    // Gallery page - All gallery (12 items)
    if (document.getElementById('all-gallery-grid')) {
        renderCards(galleryData, 'all-gallery-grid', null);
    }

    // Initialize mobile menu toggle
    initializeMobileMenu();
});

// ============================================================================
// 5. UTILITY FUNCTIONS
// ============================================================================

/**
 * formatDate(dateString)
 * Converts date string to readable format
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * initializeMobileMenu()
 * Handles mobile navigation toggle
 */
function initializeMobileMenu() {
    // Add mobile menu button if needed
    const nav = document.querySelector('.site-nav');
    if (!nav) return;

    // Create mobile menu toggle (if screen is small)
    if (window.innerWidth < 768) {
        // Mobile logic can be added here if needed
    }

    // Handle responsive behavior
    window.addEventListener('resize', () => {
        // Additional responsive logic can go here
    });
}

  
/* =========================================
   NUCLEAR OPTION CONTACT HANDLER
   ========================================= */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
        // 1. STOP REDIRECT IMMEDIATELY
        event.preventDefault(); 
        event.stopPropagation();

        const allInputs = contactForm.querySelectorAll('input, textarea, button');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;

        // 2. Lock Form
        allInputs.forEach(input => input.disabled = true);
        submitBtn.innerText = "SENDING...";

        // 3. FORCE THE KEY INTO THE DATA
        const formData = new FormData(contactForm);
        formData.append("access_key", "71f51bec-4efb-41f8-a256-52e9aa010032"); // <--- PASTE KEY HERE

        try {
            const response = await fetch("https://api.web3forms.com/submit", { 
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                formStatus.innerHTML = '<span class="status-icon">✓</span> Message received. We will be in touch.';
                formStatus.className = "status-message active";
                contactForm.reset(); 
            } else {
                throw new Error(result.message || "Submission failed.");
            }

        } catch (error) {
            console.error(error); // See exact error in console if it fails
            formStatus.innerHTML = '<span class="status-icon">✕</span> Error: ' + error.message;
            formStatus.className = "status-message active error";
        } finally {
            // 4. Unlock Form
            allInputs.forEach(input => input.disabled = false);
            submitBtn.innerText = originalBtnText;

            setTimeout(() => {
                formStatus.classList.remove('active');
            }, 5000);
        }
    });
}

// document.addEventListener('DOMContentLoaded', () => {
//     const hamburger = document.querySelector('.hamburger');
//     const navLinks = document.querySelector('.nav-links');

//     // 1. Toggle Menu on Hamburger Click
//     if (hamburger && navLinks) {
//         hamburger.addEventListener('click', () => {
//             // This toggles the 'active' class defined in your CSS
//             navLinks.classList.toggle('active');
            
//             // Optional: Animate the hamburger icon (turn X) if you add CSS for it later
//             hamburger.classList.toggle('open');
//         });
//     }

//     // 2. Auto-Close Menu When a Link is Clicked (Crucial for Mobile UX)
//     document.querySelectorAll('.nav-links a').forEach(link => {
//         link.addEventListener('click', () => {
//             navLinks.classList.remove('active');
//             if (hamburger) hamburger.classList.remove('open');
//         });
//     });
// });



/* =========================================
   MOBILE MENU LOGIC (Animation + Click Outside)
   ========================================= */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    // 1. Toggle Menu & Animation on Click
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // Stop click from bubbling to document immediately
        hamburger.classList.toggle('active'); // Triggers the "X" CSS
        navLinks.classList.toggle('active');  // Shows the Menu
    });

    // 2. Close when clicking a Link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 3. Close when Clicking Outside
    document.addEventListener('click', (e) => {
        // If click is NOT on the menu AND NOT on the hamburger icon
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active'); // Turn X back to Bars
            navLinks.classList.remove('active');  // Hide Menu
        }
    });
}
// End of script.js
