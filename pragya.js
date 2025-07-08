
        // Mobile menu toggle
        function toggleMobileMenu() {
            const navMenu = document.getElementById('navMenu');
            navMenu.classList.toggle('active');
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    document.getElementById('navMenu').classList.remove('active');
                }
            });
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });

        // Active navigation highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-menu a');
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeight - 100;
                const sectionHeight = section.offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Theme toggle functionality
        let isDarkMode = false;
        function toggleTheme() {
            isDarkMode = !isDarkMode;
            const body = document.body;
            const themeToggle = document.querySelector('.theme-toggle');
            
            if (isDarkMode) {
                body.style.filter = 'invert(1) hue-rotate(180deg)';
                themeToggle.textContent = '☀️';
            } else {
                body.style.filter = 'none';
                themeToggle.textContent = '🌙';
            }
        }

        // Counter animation for stats
        function animateCounter(element, target, duration = 2500) {
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                element.textContent = Math.floor(current).toLocaleString();
            }, 16);
        }

        // Animate counters when they come into view
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(statNumber => {
                        const target = parseInt(statNumber.getAttribute('data-target'));
                        animateCounter(statNumber, target);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        document.querySelector('.impact-stats').forEach?.(() => {
            statsObserver.observe(document.querySelector('.impact-stats'));
        });

        // Observe the impact stats section
        const impactStats = document.querySelector('.impact-stats');
        if (impactStats) {
            statsObserver.observe(impactStats);
        }

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 247, 236, 0.98)';
                header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.12)';
            } else {
                header.style.background = 'rgba(255, 247, 236, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const navMenu = document.getElementById('navMenu');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });

