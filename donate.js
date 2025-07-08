// Category selection functionality
function selectCategory(element, category) {
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
    document.getElementById('category').value = category;
}

// Load recent donations from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const donations = JSON.parse(localStorage.getItem('recentDonations')) || [];
    donations.forEach(donation => {
        addDonationToRecent(donation);
    });
});

// Form submission
document.getElementById('donationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        donorName: document.getElementById('donorName').value,
        category: document.getElementById('category').value,
        itemName: document.getElementById('itemName').value,
        quantity: document.getElementById('quantity').value,
        time: new Date().toISOString()
    };

    // Load existing donations from localStorage
    let donations = JSON.parse(localStorage.getItem('recentDonations')) || [];

    // Add new donation at the top
    donations.unshift(formData);

    // Keep only the latest 3 donations
    if (donations.length > 3) {
        donations = donations.slice(0, 3);
    }

    // Save back to localStorage
    localStorage.setItem('recentDonations', JSON.stringify(donations));

    // Re-render recent donations
    renderRecentDonations(donations);

    // Simulate form submission
    alert('Thank you for your donation! Your submission has been received and will be processed shortly.');
    this.reset();
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Update impact stats (simulate real-time updates)
    updateImpactStats();
});

// Render all recent donations
function renderRecentDonations(donations) {
    const container = document.querySelector('.recent-donations');
    container.innerHTML = `
        <h3 class="sidebar-title">
            <span class="icon" style="color: #ff6b6b;">👥</span>
            Recent Donations
        </h3>
    `;

    donations.forEach(donation => {
        addDonationToRecent(donation, container);
    });
}

// Add single donation entry
function addDonationToRecent(donation, container = document.querySelector('.recent-donations')) {
    const elapsedTime = getElapsedTime(donation.time);
    const donorInitials = getInitials(donation.donorName);
    const categoryClass = donation.category.toLowerCase();

    const div = document.createElement('div');
    div.className = 'donation-item';
    div.innerHTML = `
        <div class="donor-avatar">${donorInitials}</div>
        <div class="donation-details">
            <h4>${donation.donorName}</h4>
            <p><strong>${donation.itemName}</strong> - ${donation.quantity}</p>
            <span class="donation-category category-${categoryClass}">${donation.category}</span>
            <span style="color: #8b7355; font-size: 0.8rem; margin-left: 8px;">${elapsedTime}</span>
        </div>
    `;
    container.appendChild(div);
}

// Get initials from name
function getInitials(name) {
    return name.split(' ').map(part => part[0].toUpperCase()).join('');
}

// Calculate elapsed time in "x min ago" or "x hours ago"
function getElapsedTime(timestamp) {
    const now = new Date();
    const donationTime = new Date(timestamp);
    const diffMs = now - donationTime;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) {
        return `${diffMins} min ago`;
    } else {
        const diffHours = Math.floor(diffMins / 60);
        return `${diffHours} hours ago`;
    }
}

// Auto-update elapsed times every minute
setInterval(() => {
    const donations = JSON.parse(localStorage.getItem('recentDonations')) || [];
    renderRecentDonations(donations);
}, 60000);

// Update impact stats
function updateImpactStats() {
    const peopleFed = document.querySelector('.stat-number.blue');
    const donationsToday = document.querySelector('.stat-number.red');
    const ngosHelped = document.querySelectorAll('.stat-number.blue')[1];

    peopleFed.textContent = parseInt(peopleFed.textContent) + Math.floor(Math.random() * 5) + 1;
    donationsToday.textContent = parseInt(donationsToday.textContent) + 1;
}
