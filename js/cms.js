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

// 5. FORM & MENU INITIALIZATION
function initUI() {
    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
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
    initUI();
});