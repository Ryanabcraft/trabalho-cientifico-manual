document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Scroll effect for header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for start button
    document.getElementById('start-guide').addEventListener('click', () => {
        document.getElementById('materiais').scrollIntoView({ behavior: 'smooth' });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('reveal-on-scroll');
        observer.observe(section);
    });

    // Adding dynamic writing effect to mockup
    const writingLines = document.querySelectorAll('.writing-lines span');
    writingLines.forEach((line, index) => {
        line.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Adding styles for reveal animation dynamically
const style = document.createElement('style');
style.textContent = `
    .reveal-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    .nav-links a.active {
        color: #e67e22;
        font-weight: 700;
    }
`;
document.head.appendChild(style);
