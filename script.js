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
        title: "The HMO Dilemma: Balancing Cost vs. Employee Satisfaction in Nigeria",
        category: "Benefits Administration",
        summary: "Navigating the complex landscape of HMO provision while managing organizational costs and maximizing employee satisfaction.",
        fullContent: "The HMO challenge facing Nigerian organizations is one of the most pressing issues in modern HR practice. Organizations must balance premium coverage, employee choice, and cost containment. The key is understanding that health benefits aren't just a compliance checkbox—they're a strategic tool for retention and culture. The best organizations don't ask 'how do we save on HMO?' but rather 'how do we provide excellent healthcare while managing cost?' This insight explores the data-driven approaches to selecting HMO providers, structuring benefit packages, and communicating value to employees. When managed strategically, HMO becomes a competitive advantage that improves both employee satisfaction and organizational cost efficiency.",
        date: "2025-11-28"
    },
    {
        id: 2,
        title: "Pension Reform: What Every Employee (and Employer) Needs to Know",
        category: "Pension Strategy",
        summary: "Understanding the evolving pension landscape and its implications for workforce planning and retirement security.",
        fullContent: "Nigeria's pension reform has created both opportunities and challenges for employers and employees. The shift from Defined Benefit to Defined Contribution schemes fundamentally changes how organizations approach retirement benefits. Employers must now become custodians of financial literacy, helping employees understand contribution rates, investment options, and long-term retirement planning. This insight examines the critical aspects of modern pension administration: regulatory compliance, employee communication, investment performance monitoring, and bridging the retirement preparedness gap. Organizations that excel at pension administration don't just meet minimum requirements—they empower employees to take ownership of their retirement futures.",
        date: "2025-11-25"
    },
    {
        id: 3,
        title: "Retaining Gen Z Talent: It's Not Just About the Salary",
        category: "Talent Management",
        summary: "Why millennials and Gen Z employees are reshaping workplace expectations and how organizations must adapt to compete for talent.",
        fullContent: "The war for talent has fundamentally shifted. Gen Z employees prioritize purpose, growth, flexibility, and culture over salary alone. They want to know what their organization stands for, how they'll develop professionally, and whether their workplace respects work-life boundaries. The organizations winning at Gen Z retention understand that this generation is more data-driven about career choices and less loyal to companies that treat them as interchangeable resources. This insight explores data on what drives Gen Z engagement: transparent career pathways, meaningful mentorship, learning opportunities, flexibility, and authentic company purpose. The organizations investing in these areas are seeing retention improvements of 30-40%, proving that modern talent retention requires a fundamental shift in how we structure work and careers.",
        date: "2025-11-20"
    },
    {
        id: 4,
        title: "Navigating Redundancy: How to Manage Layoffs with Empathy",
        category: "Employee Relations",
        summary: "The human and strategic approach to workforce reductions that preserve organizational culture and maintain employer brand.",
        fullContent: "Redundancy is one of the most challenging situations an HR leader will manage. How organizations handle layoffs says everything about their values and culture. The best-managed redundancy processes balance organizational necessity with genuine care for affected employees. This requires transparency about decision-making, clarity on selection criteria, fair severance packages, and genuine outplacement support. This insight covers the psychological aspects of layoff management—survivor guilt, organizational trust erosion, and the long-term impact on remaining employees. Organizations that manage redundancy with empathy maintain higher engagement post-layoff and recover faster to high performance. The cost of poor redundancy management extends far beyond severance—it includes reputation damage, talent exodus, and cultural deterioration.",
        date: "2025-11-18"
    },
    {
        id: 5,
        title: "The 300-Staff Threshold: How Culture Shifts When You Scale",
        category: "Organizational Culture",
        summary: "Why scaling from 100 to 300 employees requires a fundamental redesign of how you build and maintain organizational culture.",
        fullContent: "Organizations managing 300+ employees face a critical inflection point: they can no longer rely on informal communication and founder-led culture. This is where many organizations fail—they scale operations but not culture. The data shows that organizations crossing the 300-person threshold experience significant culture deterioration without intentional intervention. This requires moving from culture-by-osmosis to culture-by-design: documented values, deliberate onboarding, formal feedback systems, and explicit norm-setting. The key insight: culture doesn't 'happen' at scale—it must be engineered. Organizations that succeed understand that scaling culture is as important as scaling operations. They invest in structure, communication systems, and leadership development. Companies that view this as a cost rather than an investment often see retention drop 20-30% during this transition.",
        date: "2025-11-15"
    },
    {
        id: 6,
        title: "Remote Work vs. Office Culture: Finding the Hybrid Sweet Spot",
        category: "Workplace Strategy",
        summary: "The data-driven approach to hybrid work design that balances productivity, collaboration, and employee wellbeing.",
        fullContent: "Post-pandemic, the hybrid work debate continues. The question isn't whether remote work is 'good' or 'bad'—it's how to design a hybrid model that serves organizational and individual needs. The research is clear: full remote or full office have trade-offs. Remote work delivers flexibility and focus; office work delivers collaboration and culture. The organizations winning at hybrid work have made strategic choices about: which roles suit remote work, which require in-office presence, how often collaboration is needed, and what the employee experience looks like. This insight examines the framework for building a hybrid strategy: role-based policies (not one-size-fits-all), transparent communication, technology investment for equity, and regular assessment of what's working. The best hybrid models aren't static—they evolve based on business needs and employee feedback. Organizations treating hybrid as a permanent shift (not a temporary measure) are building more resilient, engaged workforces.",
        date: "2025-11-12"
    },
    {
        id: 7,
        title: "Building High-Performance Teams: The Science of Team Composition",
        category: "Talent Management",
        summary: "How to scientifically assess and assemble teams that consistently deliver exceptional results.",
        fullContent: "Team performance isn't random—it's predictable when you understand the science. High-performing teams have deliberate composition: complementary skills, diverse thinking styles, psychological safety, and clear accountability. The best HR leaders use data to understand which team compositions drive performance. This includes assessment tools for cognitive styles, behavioral tendencies, and skills gaps. The insight examines how to build teams that avoid groupthink while maintaining alignment. It's about balancing diversity with cohesion, expertise with openness to learning, and individual achievement with collective goals. Organizations investing in team science see 25-40% improvements in team productivity and significantly higher retention of high performers.",
        date: "2025-11-08"
    },
    {
        id: 8,
        title: "The Art of Strategic HR Planning: Aligning Talent with Business Strategy",
        category: "HR Strategy",
        summary: "Why most organizations fail at workforce planning and how to build a talent strategy that drives business success.",
        fullContent: "The gap between business strategy and talent strategy is where most organizations struggle. Strategic HR requires understanding not just current needs but future talent requirements. This means analyzing business growth plans, competitive dynamics, skill evolution, and market availability. Best-in-class organizations integrate talent planning into strategic planning, not as an afterthought. They model scenarios: what talent do we need for growth? What skills will become obsolete? Where are talent gaps likely to emerge? This insight explores the frameworks for scenario planning, competitive talent positioning, and proactive capability building. Organizations that excel at strategic HR planning reduce time-to-fill by 30-40%, improve quality-of-hire, and retain critical talent. The investment in planning pays dividends through faster execution and reduced attrition.",
        date: "2025-11-05"
    },
    {
        id: 9,
        title: "Creating Psychological Safety: The Foundation of High-Trust Organizations",
        category: "Organizational Culture",
        summary: "How psychological safety drives innovation, engagement, and organizational resilience.",
        fullContent: "Psychological safety—the belief that you can take interpersonal risks without fear of negative consequences—is the foundation of high-performing organizations. When employees feel safe to speak up, make mistakes, ask for help, and challenge ideas, organizations innovate faster and execute better. Research by Google, Amazon, and other high-performers confirms this pattern. Yet many organizations claim to value safety while inadvertently punishing candor, vulnerability, and dissent. This insight explores how to deliberately build psychological safety: through leadership behavior, explicit norms, equitable treatment, and responsive listening. It's not about being soft—it's about building organizations where people do their best thinking because they're not anxious about political consequences. Organizations with high psychological safety see higher innovation rates, faster problem-solving, and significantly better retention.",
        date: "2025-10-30"
    },
    {
        id: 10,
        title: "The Future of Work: Skills Evolution and Continuous Learning",
        category: "Talent Development",
        summary: "Why continuous learning is no longer optional and how to build learning organizations that thrive amid change.",
        fullContent: "The pace of skill obsolescence is accelerating. Technical skills that took 20 years to become outdated now have half-lives of 2-3 years in many fields. This fundamentally changes what HR must focus on: not hiring perfect talent but hiring people who can learn continuously. The organizations building learning cultures invest in: access to quality learning, time for learning, a culture that values growth over perfection, and feedback systems that support development. This insight examines the business case for learning investment: organizations with strong learning cultures see 30-40% higher engagement, lower attrition, and better innovation rates. The ROI isn't just financial—it's organizational resilience. In uncertain times, organizations full of continuous learners adapt faster.",
        date: "2025-10-25"
    },
    {
        id: 11,
        title: "Compensation Strategy: Moving Beyond Benchmarking to Strategic Positioning",
        category: "Compensation & Benefits",
        summary: "How to use compensation strategically to attract talent, drive performance, and align with business objectives.",
        fullContent: "Most organizations approach compensation defensively: 'what does the market pay?' The best organizations ask strategically: 'what do we need to pay to win talent in our market, attract the right profile, and sustain high performance?' This requires understanding compensation beyond salary: total rewards including benefits, career development, flexibility, and meaningful work. This insight explores compensation as a strategic lever: for high performers you want to retain, for underperformers you want to transition, and for critical roles where you need to lead market. It also examines the relationship between pay transparency and equity—organizations moving toward transparent pay structures see improvements in trust and retention while forcing systemic equity conversations. The framework moves from 'what's the standard rate' to 'what's our talent strategy and how does compensation support it?'",
        date: "2025-10-20"
    },
    {
        id: 12,
        title: "Employee Wellness Beyond Fitness: A Holistic Approach to Employee Wellbeing",
        category: "Employee Wellness",
        summary: "Why traditional wellness programs fail and how to build comprehensive wellbeing strategies that stick.",
        fullContent: "Many wellness programs fail because they treat wellbeing as an afterthought—a perks checklist rather than a strategic priority. True wellbeing spans physical health, mental health, financial wellness, social connection, and sense of purpose. Organizations building comprehensive wellbeing programs see measurable impact: reduced absenteeism, improved engagement, and better retention. This insight examines the distinction between wellness programs (activities and perks) and wellbeing culture (systems and norms that prioritize health). It includes how to assess true employee wellbeing (not just satisfaction surveys), design interventions that stick, and measure impact. The data shows that organizations treating wellbeing as core to strategy—not as a benefits department initiative—see 20-30% improvements in engagement and measurable reductions in burnout.",
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
        caption: "HR Strategy Session - Organizational Transformation Planning",
        date: "2025-10-15"
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=500&h=500&fit=crop",
        caption: "Corporate Leadership Event - Lagos HR Summit",
        date: "2025-10-15"
    },
    {
        id: 3,
        src: "assets/fav7.webp",
        caption: "International Talent Management Conference - Dubai",
        date: "2025-10-15"
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=500&fit=crop",
        caption: "Executive Coaching Session - Leadership Development",
        date: "2025-10-15"
    },
    {
        id: 5,
        src: "assets/panel meeting.webp",
        caption: "Thought Leadership Panel - Organizational Culture Strategies",
        date: "2025-10-15"
    },
    {
        id: 6,
        src: "assets/fav6.jpg",
        caption: "Strategic HR Planning Meeting - Talent Acquisition",
        date: "2025-10-15"
    },
    {
        id: 7,
        src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
        caption: "Annual HR Excellence Conference - Best Practices Showcase",
        date: "2025-10-15"
    },
    {
        id: 8,
        src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop",
        caption: "Corporate Wellness Summit - Employee Wellbeing Innovation",
        date: "2025-10-15"
    },
    {
        id: 9,
        src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=500&h=500&fit=crop",
        caption: "Executive Networking Event - Building Strategic Partnerships",
        date: "2025-10-15"
    },
    {
        id: 10,
        src: "https://images.unsplash.com/photo-1552674605-5defe6aa44bb?w=500&h=500&fit=crop",
        caption: "Corporate Governance Summit - Leadership Excellence",
        date: "2025-10-15"
    },
    {
        id: 11,
        src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
        caption: "HR Innovation Conference - Future of Work",
        date: "2025-10-15"
    },
    {
        id: 12,
        src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop",
        caption: "International HR Leadership Summit - Global Best Practices",
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
