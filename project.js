// Form Validation
const form = document.querySelector('.container');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = form.querySelector('input[name="name"]');
        const phone = form.querySelector('input[name="phone"]');
        const email = form.querySelector('input[name="email"]');
        let valid = true;
        let message = '';

        // Name validation
        if (!name.value.trim()) {
            valid = false;
            message += 'Please enter your name.\n';
        }
        // Phone validation (10-15 digits)
        if (!/^\d{10,15}$/.test(phone.value.trim())) {
            valid = false;
            message += 'Please enter a valid phone number (10-15 digits).\n';
        }
        // Email validation
        if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
            valid = false;
            message += 'Please enter a valid email address.';
        }

        if (!valid) {
            alert(message);
        } else {
            alert('Registration successful!');
            form.reset();
        }
    });
}

// Modal Popup for Event Details
// Add event listeners to all .ctn links in the events section
const eventLinks = document.querySelectorAll('.row .ctn');
if (eventLinks.length) {
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.display = 'none';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close" tabindex="0">&times;</span>
            <div class="modal-body"></div>
        </div>
    `;
    document.body.appendChild(modal);

    // Modal styles
    const style = document.createElement('style');
    style.textContent = `
    .modal-overlay {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center;
        z-index: 9999;
    }
    .modal-content {
        background: #181818; color: #fff; padding: 2rem; border-radius: 12px; max-width: 400px; width: 90vw; position: relative;
        box-shadow: 0 4px 32px rgba(0,0,0,0.4);
        text-align: center;
    }
    .modal-close {
        position: absolute; top: 1rem; right: 1rem; font-size: 2rem; color: #39ff14; cursor: pointer;
    }
    .modal-close:focus { outline: 2px solid #39ff14; }
    `;
    document.head.appendChild(style);

    // Event details (customize as needed)
    const eventDetails = [
        {
            title: 'Family Workout Sessions',
            content: 'Group workout sessions for the whole family! Kids and adults can enjoy fun, healthy activities together. Separate sections for kids and adults.'
        },
        {
            title: 'Free Gym For All',
            content: 'Enjoy free access to our gym and classes for a limited time. Just provide your contact details and email to participate!'
        },
        {
            title: 'Weight Lifting Contest',
            content: 'Compete in our weight-lifting contest for a chance to win prizes and a free gym membership. Open to all skill levels!'
        }
    ];

    eventLinks.forEach((link, idx) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            modal.querySelector('.modal-body').innerHTML = `
                <h2>${eventDetails[idx].title}</h2>
                <p>${eventDetails[idx].content}</p>
            `;
            modal.style.display = 'flex';
            modal.querySelector('.modal-close').focus();
        });
    });

    // Close modal on click or ESC
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    modal.querySelector('.modal-close').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            modal.style.display = 'none';
        }
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
    // Close modal if clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Gallery Lightbox
const galleryImages = document.querySelectorAll('.gallery-grid img');
if (galleryImages.length) {
    // Create lightbox modal elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.style.display = 'none';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close" tabindex="0">&times;</span>
            <img src="" alt="Gallery large view" class="lightbox-img">
            <div class="lightbox-nav">
                <button class="lightbox-prev" aria-label="Previous image">&#8592;</button>
                <button class="lightbox-next" aria-label="Next image">&#8594;</button>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Lightbox styles
    const style = document.createElement('style');
    style.textContent = `
    .lightbox-overlay {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center;
        z-index: 10000;
    }
    .lightbox-content {
        position: relative; background: #181818; border-radius: 16px; padding: 1.5rem;
        box-shadow: 0 4px 32px rgba(0,0,0,0.5); display: flex; flex-direction: column; align-items: center;
        max-width: 90vw; max-height: 90vh;
    }
    .lightbox-img {
        max-width: 70vw; max-height: 60vh; border-radius: 12px; margin-bottom: 1rem;
        box-shadow: 0 2px 16px rgba(0,0,0,0.3);
    }
    .lightbox-close {
        position: absolute; top: 1rem; right: 1rem; font-size: 2rem; color: #39ff14; cursor: pointer;
    }
    .lightbox-close:focus { outline: 2px solid #39ff14; }
    .lightbox-nav {
        display: flex; gap: 1.5rem; justify-content: center; margin-top: 0.5rem;
    }
    .lightbox-nav button {
        background: var(--secondary-accent, #00fff7); color: #000; border: none; border-radius: 6px;
        font-size: 1.2rem; padding: 0.5rem 1.2rem; cursor: pointer; font-weight: bold;
        transition: background 0.2s;
    }
    .lightbox-nav button:hover, .lightbox-nav button:focus {
        background: var(--accent-color, #39ff14); color: #000; outline: none;
    }
    `;
    document.head.appendChild(style);

    let currentIdx = 0;
    function showLightbox(idx) {
        currentIdx = idx;
        const img = galleryImages[idx];
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.style.display = 'flex';
        lightbox.querySelector('.lightbox-close').focus();
    }
    function closeLightbox() {
        lightbox.style.display = 'none';
    }
    function showPrev() {
        showLightbox((currentIdx - 1 + galleryImages.length) % galleryImages.length);
    }
    function showNext() {
        showLightbox((currentIdx + 1) % galleryImages.length);
    }

    galleryImages.forEach((img, idx) => {
        img.addEventListener('click', () => showLightbox(idx));
        img.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                showLightbox(idx);
            }
        });
    });
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-close').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') closeLightbox();
    });
    lightbox.querySelector('.lightbox-prev').addEventListener('click', showPrev);
    lightbox.querySelector('.lightbox-next').addEventListener('click', showNext);
    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        }
    });
    // Close if clicking outside content
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
} 