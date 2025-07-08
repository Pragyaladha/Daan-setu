// Utility: Load requirements from localStorage
function loadRequirements() {
    const requirements = JSON.parse(localStorage.getItem('requirements')) || [];
    const section = document.querySelector('.requirements-section');

    requirements.forEach(data => {
        const card = createRequirementCard(data);
        section.appendChild(card);
    });

    updateElapsedTimes(); // Start updating times on load
}

// Utility: Save a new requirement to localStorage
function saveRequirement(data) {
    const requirements = JSON.parse(localStorage.getItem('requirements')) || [];
    data.postedAt = Date.now(); // Save timestamp when posting
    requirements.unshift(data);
    localStorage.setItem('requirements', JSON.stringify(requirements));
}

// Utility: Create card HTML structure
function createRequirementCard(data) {
    const card = document.createElement('div');
    card.classList.add('requirement-card');

    // Calculate elapsed time
    const timeSpan = document.createElement('span');
    timeSpan.classList.add('elapsed-time');
    timeSpan.dataset.postedAt = data.postedAt || Date.now();
    timeSpan.textContent = formatElapsedTime(timeSpan.dataset.postedAt);

    card.innerHTML = `
        <div class="card-header">
            <div>
                <h3 class="card-title">${data.ngoName}</h3>
                <p class="contact-info">Contact: ${data.contactPerson}</p>
            </div>
            <span class="priority-badge ${data.urgency === 'high' ? 'priority-high' : data.urgency === 'medium' ? 'priority-medium' : 'priority-low'}">
                ${data.urgency.charAt(0).toUpperCase() + data.urgency.slice(1)} Priority
            </span>
        </div>
        <div class="tags">
            ${data.items.map(item => `<span class="tag">${item.charAt(0).toUpperCase() + item.slice(1)}</span>`).join('')}
        </div>
        <p class="requirement-description">${data.details}</p>
        <div class="card-footer">
            <div class="card-stats">
                <span>👥 ${data.beneficiaries}</span>
                <span>📍 ${data.location}</span>
            </div>
        </div>
    `;

    // Append timeSpan in card stats
    card.querySelector('.card-stats').appendChild(timeSpan);

    // Add event listener for contact button
    const contactBtn = document.createElement('button');
    contactBtn.classList.add('contact-btn');
    contactBtn.textContent = 'Contact NGO';
    contactBtn.addEventListener('click', function () {
        alert(`Contacting ${data.ngoName}\nContact: ${data.contactPerson}\nEmail: ${data.email}\nPhone: ${data.phone}`);
    });

    card.querySelector('.card-footer').appendChild(contactBtn);

    return card;
}

// Format elapsed time
function formatElapsedTime(postedAt) {
    const now = Date.now();
    const diffMs = now - postedAt;
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
}

// Auto-update elapsed times every minute
function updateElapsedTimes() {
    setInterval(() => {
        document.querySelectorAll('.elapsed-time').forEach(span => {
            const postedAt = parseInt(span.dataset.postedAt);
            span.textContent = formatElapsedTime(postedAt);
        });
    }, 60000); // every 60 seconds
}

// Form submission handler
document.getElementById('requirementForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {};

    for (let [key, value] of formData.entries()) {
        if (key === 'items') {
            if (!data.items) data.items = [];
            data.items.push(value);
        } else {
            data[key] = value;
        }
    }

    // Validation
    if (!data.ngoName || !data.contactPerson || !data.email || !data.phone || !data.urgency || !data.beneficiaries || !data.location || !data.details) {
        alert('Please fill in all required fields');
        return;
    }

    if (!data.items || data.items.length === 0) {
        alert('Please select at least one required item');
        return;
    }

    // Save and render
    saveRequirement(data);
    const section = document.querySelector('.requirements-section');
    const card = createRequirementCard(data);
    section.appendChild(card);

    alert('Thank you! Your requirement has been posted successfully. We will contact you soon.');
    this.reset();
});

// Load on page ready
document.addEventListener('DOMContentLoaded', loadRequirements);

// Existing static contact button handlers
document.querySelectorAll('.contact-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const card = this.closest('.requirement-card');
        const ngoName = card.querySelector('.card-title').textContent;
        const contactInfo = card.querySelector('.contact-info').textContent;

        alert(`Contacting ${ngoName}\n${contactInfo}\n\nYou will be redirected to the contact form.`);
    });
});
function deleteRequirement(dataToDelete) {
    const requirements = JSON.parse(localStorage.getItem('requirements')) || [];

    const updatedRequirements = requirements.filter(req => {
        return !(req.postedAt === dataToDelete.postedAt && req.ngoName === dataToDelete.ngoName);
    });

    localStorage.setItem('requirements', JSON.stringify(updatedRequirements));
}
