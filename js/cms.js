import { createClient } from "https://esm.sh/@sanity/client";

// 1. CONFIGURATION
const client = createClient({
  projectId: "b6k55yzj", 
  dataset: "production",
  useCdn: false, 
  apiVersion: "2024-01-01",
});

// 2. UTILITIES
function formatDate(dateString) {
  if (!dateString) return "Recent";
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// 3. CORE CMS FUNCTIONS
async function loadThoughts() {
  const container = document.getElementById("thoughts-grid") || document.getElementById("home-thoughts-grid") || document.getElementById("all-thoughts-grid");
  if (!container) return;

  container.innerHTML = `<div class="loading-msg">Loading Executive Insights...</div>`;

  const isHomePage = container.id === "home-thoughts-grid";
  const limit = isHomePage ? "[0...3]" : "[0...20]";

  try {
    const query = `*[_type == "post"] | order(date desc) ${limit} {
      _id,
      title,
      category,
      summary,
      fullContent,
      date
    }`;
    
    const posts = await client.fetch(query);

    if (posts.length === 0) {
      container.innerHTML = "<p>No insights published yet.</p>";
      return;
    }

    container.innerHTML = posts.map(post => `
       <article class="card thought-card" data-id="${post._id}" role="button" tabindex="0" aria-label="Open thought: ${post.title}">
            <div class="card-header">
                <span class="card-category">${post.category || 'Strategy'}</span>
                <span class="card-date">${formatDate(post.date)}</span>
            </div>
            <h3 class="card-title">${post.title}</h3>
            <p class="card-summary">${post.summary || ''}</p>
            <div class="card-footer">
                <span class="card-cta">Read Full Insight →</span>
            </div>
        </article>
    `).join("");

    // Attach Modal Listeners
    attachCardListeners(container, posts, 'thought');

  } catch (err) {
    console.error("❌ Error loading thoughts:", err);
    container.innerHTML = "<p>Unable to load insights.</p>";
  }
}

async function loadGallery() {
  const container = document.getElementById("gallery-grid") || document.getElementById("home-gallery-grid") || document.getElementById("all-gallery-grid");
  if (!container) return;

  container.innerHTML = `<div class="loading-msg">Opening Gallery...</div>`;
  
  const isHomePage = container.id === "home-gallery-grid";
  const limit = isHomePage ? "[0...5]" : "[0...30]";

  try {
    const query = `*[_type == "galleryImage"] | order(date desc) ${limit} {
      _id,
      caption,
      date,
      "imageUrl": image.asset->url
    }`;
    const images = await client.fetch(query);

    if (images.length === 0) {
      container.innerHTML = "<p>No images found.</p>";
      return;
    }

    container.innerHTML = images.map(item => `
      <div class="gallery-item" data-id="${item._id}" role="button" tabindex="0" aria-label="View gallery item: ${item.caption}">
            <img src="${item.imageUrl}" alt="${item.caption}" class="gallery-image" loading="lazy">
            <div class="gallery-overlay">
                <p class="gallery-caption">${item.caption}</p>
                <p class="gallery-date">${formatDate(item.date)}</p>
            </div>
      </div>
    `).join("");

    attachCardListeners(container, images, 'gallery');

  } catch (err) {
    console.error("❌ Error loading gallery:", err);
  }
}
function renderExperience() {
  const container = document.getElementById("experience-timeline");
  if (!container) return;

  container.innerHTML = '';

  const timeline = document.createElement('div');
  timeline.className = 'timeline';
  
  const spine = document.createElement('div');
  spine.className = 'timeline-spine';
  timeline.appendChild(spine);

  const itemsContainer = document.createElement('div');
  itemsContainer.className = 'timeline-items';

  experienceData.forEach((job, index) => {
    const item = document.createElement('div');
    // Removed the left/right logic. All items are now standard.
    item.className = 'timeline-item';
    item.setAttribute('data-index', index);

    // Optional: Keep the node but make it small. 
    // If you want it TOTALLY gone, just comment out the next two lines.
    const node = document.createElement('div');
    node.className = 'timeline-node';
    item.appendChild(node);
    
    const card = document.createElement('div');
    card.className = 'timeline-card';

    // 1. REORDERED: Header (Title/Company) first
    const header = document.createElement('div');
    header.className = 'timeline-card-header';
    
    const headerText = document.createElement('div');
    headerText.className = 'timeline-header-text';
    
    const role = document.createElement('h3');
    role.className = 'timeline-role';
    role.textContent = job.role;
    
    const company = document.createElement('p');
    company.className = 'timeline-company';
    company.textContent = job.company;
    
    headerText.appendChild(role);
    headerText.appendChild(company);

    // 2. Date/Year comes AFTER/Beside the header
    const yearSpan = document.createElement('span');
    yearSpan.className = 'timeline-year';
    yearSpan.textContent = job.year;

    header.appendChild(headerText);
    header.appendChild(yearSpan);

    // 3. Description
    const description = document.createElement('p');
    description.className = 'timeline-description';
    description.textContent = job.description;

    // Assemble card
    card.appendChild(header);
    card.appendChild(description);
    
    item.appendChild(card);
    itemsContainer.appendChild(item);
  });

  timeline.appendChild(itemsContainer);
  container.appendChild(timeline);
}

// 4. INTERACTIVE FUNCTIONS (MODALS)
function attachCardListeners(container, dataArray, type) {
    const cards = container.querySelectorAll('[data-id]');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const data = dataArray.find(item => item._id === card.dataset.id);
            if (type === 'thought') openThoughtModal(data);
            else if (type === 'gallery') openGalleryModal(data);
        });
    });
}

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
            <div class="modal-body"><p>${thought.fullContent}</p></div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    setupModalClose(modal);
}

function openGalleryModal(item) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content modal-gallery">
            <img src="${item.imageUrl}" alt="${item.caption}" class="modal-image">
            <div class="modal-gallery-info">
                <p class="modal-gallery-caption">${item.caption}</p>
                <p class="modal-gallery-date">${formatDate(item.date)}</p>
            </div>
            <button class="modal-close close-gallery" aria-label="Close modal">✕</button>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    setupModalClose(modal);
}

function setupModalClose(modal) {
    const closeModal = () => {
        modal.remove();
        document.body.style.overflow = 'auto'; // Restore scroll
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
}

function initUI() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Debugging: This will tell you in the Console if the script even sees the menu
    if (!hamburger || !navLinks) {
        console.error("Navigation elements missing on this page!");
        return;
    }

    // Use 'addEventListener' instead of '.onclick' for better compatibility
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Hamburger clicked"); // Check your console (F12) for this
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const formStatus = document.getElementById('form-status');
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.innerText = "SENDING...";

    const formData = new FormData(event.target);
    formData.append("access_key", "71f51bec-4efb-41f8-a256-52e9aa010032");

    try {
        const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
        const result = await response.json();
        if (result.success) {
            formStatus.innerHTML = '✓ Message received.';
            formStatus.className = "status-message active";
            event.target.reset();
        }
    } catch (error) {
        formStatus.innerHTML = '✕ Error submitting.';
    } finally {
        submitBtn.innerText = "SEND MESSAGE";
    }
}

// 6. MAIN ROUTER
document.addEventListener('DOMContentLoaded', () => {
    loadThoughts();
    loadGallery();
    renderExperience();
    initUI();
});


// /**
//  * initializeMobileMenu()
//  * Handles mobile navigation toggle
//  */
// function initializeMobileMenu() {
//     // Add mobile menu button if needed
//     const nav = document.querySelector('.site-nav');
//     if (!nav) return;

//     // Create mobile menu toggle (if screen is small)
//     if (window.innerWidth < 768) {
//         // Mobile logic can be added here if needed
//     }

//     // Handle responsive behavior
//     window.addEventListener('resize', () => {
//         // Additional responsive logic can go here
//     });
// }

// /* =========================================
//    MOBILE MENU LOGIC (Animation + Click Outside)
//    ========================================= */
// const hamburger = document.querySelector('.hamburger');
// const navLinks = document.querySelector('.nav-links');

// if (hamburger && navLinks) {
//     // 1. Toggle Menu & Animation on Click
//     hamburger.addEventListener('click', (e) => {
//         e.stopPropagation(); // Stop click from bubbling to document immediately
//         hamburger.classList.toggle('active'); // Triggers the "X" CSS
//         navLinks.classList.toggle('active');  // Shows the Menu
//     });

//     // 2. Close when clicking a Link
//     document.querySelectorAll('.nav-links a').forEach(link => {
//         link.addEventListener('click', () => {
//             hamburger.classList.remove('active');
//             navLinks.classList.remove('active');
//         });
//     });

//     // 3. Close when Clicking Outside
//     document.addEventListener('click', (e) => {
//         // If click is NOT on the menu AND NOT on the hamburger icon
//         if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
//             hamburger.classList.remove('active'); // Turn X back to Bars
//             navLinks.classList.remove('active');  // Hide Menu
//         }
//     });
// }



/**
 * Professional Experience Data
 * Array of career milestones with detailed roles, achievements, and impact
 */
const experienceData = [
    {
        id: 1,
        year: "2020 — Present",
        role: "Group Head, Human Capital Management",
        company: "Sterling Assurance plc",
        description: "Leading strategic HR transformation for a multinational insurance organization managing 500+ staff across multiple business units. Architected and implemented comprehensive talent management, employee relations, and organizational culture initiatives that improved retention by 28% while building high-performance leadership pipeline.",
       
    },
    {
        id: 2,
        year: "2017 — 2020",
        role: "Senior HR Manager, Talent & Culture",
        company: "Lagos Business School",
        description: "Transformed HR operations for a leading business education institution with 300+ academic and support staff. Designed and implemented talent acquisition strategies, organizational culture frameworks, and executive leadership development programs.",
       
    },
    {
        id: 3,
        year: "2014 — 2017",
        role: "HR Manager, Employee Relations & Compliance",
        company: "First Bank Nigeria Limited",
        description: "Managed employee relations and regulatory compliance for one of Nigeria's largest financial institutions with 4,000+ staff. Led conflict resolution, disciplinary processes, and dialogue initiatives that strengthened organizational trust and reduced legal disputes.",
        
    },
    {
        id: 4,
        year: "2011 — 2014",
        role: "HR Officer, Talent Acquisition & Onboarding",
        company: "Guaranty Trust Bank",
        description: "Built recruitment and onboarding infrastructure for a rapidly expanding organization, scaling from 1,500 to 2,500 employees. Designed recruitment processes, employer branding initiatives, and structured onboarding programs.",
        
    },
    {
        id: 5,
        year: "2008 — 2011",
        role: "Human Resources Executive",
        company: "KPMG Advisory Services",
        description: "Founded and built HR operations department for a rapidly growing management consulting firm. Designed all HR processes from scratch, built management team, and established HR culture as strategic differentiator in competitive consulting market.",
        
    }
    
];