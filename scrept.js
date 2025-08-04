// Portfolio Website JavaScript

// Global Variables
let currentSection = 'home';
let isScrolling = false;

// Data Arrays
const skills = [
    { name: 'HTML5', icon: 'fab fa-html5', level: 95 },
    { name: 'CSS3', icon: 'fab fa-css3-alt', level: 90 },
    { name: 'JavaScript', icon: 'fab fa-js-square', level: 85 },
    { name: 'Python', icon: 'fab fa-python', level: 85 },
    { name: 'Git', icon: 'fab fa-git-alt', level: 80 }
];

const services = [
    {
        title: 'تصميم المواقع',
        icon: 'fas fa-palette',
        description: 'تصميم مواقع ويب عصرية ومتجاوبة مع جميع الأجهزة باستخدام أحدث التقنيات والمعايير.',
        features: ['تصميم متجاوب', 'واجهات تفاعلية', 'تحسين الأداء', 'تجربة مستخدم ممتازة']
    },
    {
        title: 'تطوير الواجهات الأمامية',
        icon: 'fas fa-code',
        description: 'تطوير واجهات المستخدم التفاعلية باستخدام React, Vue.js وأحدث تقنيات الويب.',
        features: [ 'TypeScript', 'تطبيقات أحادية الصفحة']
    },
    {
        title: 'تحليل البيانات',
        icon: 'fas fa-chart-line',
        description: 'تحليل البيانات وإنشاء تقارير بصرية تفاعلية لمساعدة الشركات في اتخاذ القرارات.',
        features: ['Python & R', 'تصور البيانات', 'التعلم الآلي', 'تقارير تفاعلية']
    },

];

const projects = [

    {
        title: 'تطبيق إدارة المهام',
        description: 'تطبيق ويب لإدارة المهام والمشاريع مع واجهة سهلة الاستخدام',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=500',
        category: 'app',
        tech: ['Vue.js', 'Firebase', 'Vuetify'],
        liveUrl: '#',
        codeUrl: '#'
    },
    {
        title: 'لوحة تحليل البيانات',
        description: 'لوحة تحكم تفاعلية لتحليل وعرض البيانات بطريقة بصرية',
        image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=500',
        category: 'data',
        tech: ['Python', 'Plotly', 'Pandas', 'Streamlit'],
        liveUrl: '#',
        codeUrl: '#'
    },
    {
        title: 'تطبيق الطقس',
        description: 'تطبيق ويب لعرض حالة الطقس مع تنبؤات دقيقة',
        image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=500',
        category: 'app',
        tech: ['JavaScript', 'Weather API', 'Chart.js'],
        liveUrl: '#',
        codeUrl: '#'
    },
    {
        title: 'تحليل مبيعات المتجر',
        description: 'تحليل شامل لبيانات المبيعات مع تقارير بصرية تفاعلية',
        image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=500',
        category: 'data',
        tech: ['Python', 'Matplotlib', 'Seaborn', 'Jupyter'],
        liveUrl: '#',
        codeUrl: '#'
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize Website
function initializeWebsite() {
    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('hidden');
    }, 2000);

    // Initialize components
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    populateSkills();
    populateServices();
    populateProjects();
    initializeContactForm();
    initializeProjectFilter();
    
    // Add event listeners
    addEventListeners();
}

// Navigation Functions
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            scrollToSection(targetSection);
            
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active link
            updateActiveNavLink(link);
        });
    });
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Scroll Functions
function initializeScrollEffects() {
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        handleSectionHighlight();
    });
}

function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function handleSectionHighlight() {
    if (isScrolling) return;

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    if (currentSectionId && currentSectionId !== currentSection) {
        currentSection = currentSectionId;
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSectionId) {
                link.classList.add('active');
            }
        });
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    isScrolling = true;
    
    section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    setTimeout(() => {
        isScrolling = false;
    }, 1000);
}

// Animation Functions
function initializeAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillBar(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-card, .service-card, .project-card, .contact-card, .skill-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function animateSkillBar(skillElement) {
    const progressBar = skillElement.querySelector('.skill-progress');
    const level = progressBar.getAttribute('data-level');
    
    setTimeout(() => {
        progressBar.style.width = level + '%';
    }, 300);
}

// Content Population Functions
function populateSkills() {
    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid) return;
    
    skillsGrid.innerHTML = skills.map(skill => `
        <div class="skill-item">
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-level">
                <div class="skill-progress" data-level="${skill.level}"></div>
            </div>
        </div>
    `).join('');
}

function populateServices() {
    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) return;
    
    servicesGrid.innerHTML = services.map(service => `
        <div class="service-card">
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3 class="service-title">${service.title}</h3>
            <p class="service-description">${service.description}</p>
            <ul class="service-features">
                ${service.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

function populateProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card" data-category="${project.category}">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.liveUrl}" class="project-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i>
                        مشاهدة المشروع
                    </a>
                    <a href="${project.codeUrl}" class="project-link" target="_blank">
                        <i class="fab fa-github"></i>
                        الكود المصدري
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Project Filter Functions
function initializeProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            filterProjects(filter);
        });
    });
}

function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Contact Form Functions
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Add real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Simulate form submission
    showNotification('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.', 'success');
    
    // Reset form
    e.target.reset();
    
    // In a real application, you would send the data to a server
    console.log('Form data:', data);
}

function validateForm(data) {
    let isValid = true;
    
    // Validate name
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'يرجى إدخال اسم صحيح (حرفين على الأقل)');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError('email', 'يرجى إدخال بريد إلكتروني صحيح');
        isValid = false;
    }
    
    // Validate message
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', 'يرجى إدخال رسالة (10 أحرف على الأقل)');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(field);
    
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                showFieldError(fieldName, 'يرجى إدخال اسم صحيح (حرفين على الأقل)');
                return false;
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(fieldName, 'يرجى إدخال بريد إلكتروني صحيح');
                return false;
            }
            break;
        case 'message':
            if (value.length < 10) {
                showFieldError(fieldName, 'يرجى إدخال رسالة (10 أحرف على الأقل)');
                return false;
            }
            break;
    }
    
    return true;
}

function showFieldError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const fieldElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    if (fieldElement) {
        fieldElement.style.borderColor = 'var(--error-color)';
    }
}

function clearFieldError(field) {
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (errorElement) {
        errorElement.classList.remove('show');
    }
    
    field.style.borderColor = 'var(--gray-300)';
}

// Notification Functions
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = notification.querySelector('.notification-text');
    const notificationIcon = notification.querySelector('.notification-icon');
    
    // Set message and icon
    notificationText.textContent = message;
    
    if (type === 'success') {
        notificationIcon.className = 'notification-icon fas fa-check-circle';
        notification.classList.remove('error');
    } else if (type === 'error') {
        notificationIcon.className = 'notification-icon fas fa-exclamation-circle';
        notification.classList.add('error');
    }
    
    // Show notification
    notification.classList.add('show');
    
    // Hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Utility Functions
function addEventListeners() {
    // Smooth scroll for internal links
    document.addEventListener('click', (e) => {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            scrollToSection(targetId);
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Typing Animation for Hero Name
function initializeTypingAnimation() {
    const heroName = document.getElementById('hero-name');
    const text = 'Abdelrhman';
    let index = 0;
    
    heroName.textContent = '';
    
    function typeWriter() {
        if (index < text.length) {
            heroName.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 150);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// Initialize typing animation after loading
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeTypingAnimation, 2500);
});

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    handleNavbarScroll();
    handleSectionHighlight();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Add smooth reveal animations
function addRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.15 });
    
    revealElements.forEach(el => revealObserver.observe(el));
}

// Theme toggle functionality (bonus feature)
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    addRevealAnimations();
    initializeThemeToggle();
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.showNotification = showNotification;