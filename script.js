// Portfolio Interactive Script

// Typewriter Effect
function startTypewriter() {
    const typewriterText = document.getElementById('typewriter-text');
    if (!typewriterText) {
        console.error('❌ Elemento typewriter-text não encontrado!');
        return;
    }
    
    // Use config if available, fallback to default
    const text = window.PORTFOLIO_CONFIG ? 
        `Olá, eu sou ${window.PORTFOLIO_CONFIG.personal.name}` : 
        "Olá, eu sou João Victor Effgen";
    
    console.log('⌨️ Iniciando Typewriter com texto:', text);
    
    let index = 0;
    
    // Clear any existing text and reset styles
    typewriterText.textContent = '';
    typewriterText.style.borderRight = 'none'; // Remove border initially
    
    function type() {
        if (index < text.length) {
            typewriterText.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100); // Slightly slower for better readability
        } else {
            // Add cursor after the last character
            typewriterText.innerHTML += '<span class="typing-cursor">|</span>';
            console.log('✅ Typewriter concluído!');
        }
    }
    
    // Start typing after a short delay
    setTimeout(type, 1000);
}

// Color schemes for dynamic color changing - Only Blues
const colorSchemes = [
    {
        name: 'Blue',
        primary: '#2563eb',
        secondary: '#1e40af',
        accent: '#3b82f6',
        background: '#0f172a',
        surface: '#1e293b',
        textPrimary: '#f1f5f9',
        textSecondary: '#cbd5e1',
        border: '#334155',
        shadow: 'rgba(37, 99, 235, 0.2)',
        gradientStart: '#2563eb',
        gradientEnd: '#1e40af'
    },
    {
        name: 'Light Blue',
        primary: '#0ea5e9',
        secondary: '#0284c7',
        accent: '#38bdf8',
        background: '#0c1e2e',
        surface: '#1e3a4a',
        textPrimary: '#f1f5f9',
        textSecondary: '#cbd5e1',
        border: '#334155',
        shadow: 'rgba(14, 165, 233, 0.2)',
        gradientStart: '#0ea5e9',
        gradientEnd: '#0284c7'
    },
    {
        name: 'Dark Blue',
        primary: '#1e40af',
        secondary: '#1e3a8a',
        accent: '#3b82f6',
        background: '#0a0f1a',
        surface: '#1e1b4b',
        textPrimary: '#f1f5f9',
        textSecondary: '#cbd5e1',
        border: '#334155',
        shadow: 'rgba(30, 64, 175, 0.2)',
        gradientStart: '#1e40af',
        gradientEnd: '#1e3a8a'
    },
    {
        name: 'Cyan Blue',
        primary: '#0891b2',
        secondary: '#0e7490',
        accent: '#22d3ee',
        background: '#0c1e2e',
        surface: '#1e3a4a',
        textPrimary: '#f1f5f9',
        textSecondary: '#cbd5e1',
        border: '#334155',
        shadow: 'rgba(8, 145, 178, 0.2)',
        gradientStart: '#0891b2',
        gradientEnd: '#0e7490'
    },
    {
        name: 'Indigo Blue',
        primary: '#4f46e5',
        secondary: '#4338ca',
        accent: '#6366f1',
        background: '#0f0f23',
        surface: '#1e1b4b',
        textPrimary: '#f1f5f9',
        textSecondary: '#cbd5e1',
        border: '#334155',
        shadow: 'rgba(79, 70, 229, 0.2)',
        gradientStart: '#4f46e5',
        gradientEnd: '#4338ca'
    },
    {
        name: 'Ocean Blue',
        primary: '#0f766e',
        secondary: '#115e59',
        accent: '#14b8a6',
        background: '#0f1f1f',
        surface: '#1e3a3a',
        textPrimary: '#f1f5f9',
        textSecondary: '#cbd5e1',
        border: '#334155',
        shadow: 'rgba(15, 118, 110, 0.2)',
        gradientStart: '#0f766e',
        gradientEnd: '#115e59'
    }
];

let currentColorScheme = 0;
let isAnimating = false;

// DOM Elements
const body = document.body;
const logo = document.querySelector('.logo');
const navLinks = document.querySelectorAll('.nav-links a');
const heroTitle = document.querySelector('.hero-title .highlight');
// const floatingCards = document.querySelectorAll('.floating-card'); // Removido
const projectCards = document.querySelectorAll('.project-card');
const skillTags = document.querySelectorAll('.skill-tag');
const statItems = document.querySelectorAll('.stat-item');

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
    setupEventListeners();
    startColorAnimation();
    setupScrollAnimations();
    setupFormHandling();
    initFlipCard(); // Initialize flip card
    startTypewriter(); // Start typewriter effect
    
    // Delay para garantir que o DOM esteja pronto
    // setTimeout(() => {
    //     startTypingAnimation(); // Start typing animation
    // }, 100);
});

// Initialize portfolio with first color scheme
function initializePortfolio() {
    applyColorScheme(colorSchemes[currentColorScheme]);
    logo.addEventListener('click', changeColorScheme);
}

// Setup event listeners
function setupEventListeners() {
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects to project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to skill tags
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add interaction to stat items
    statItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    });
}

// Change color scheme function
function changeColorScheme() {
    if (isAnimating) return;
    
    isAnimating = true;
    currentColorScheme = (currentColorScheme + 1) % colorSchemes.length;
    
    // Add transition effect
    body.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Apply new color scheme
    applyColorScheme(colorSchemes[currentColorScheme]);
    
    // Add celebration effect
    addCelebrationEffect();
    
    setTimeout(() => {
        isAnimating = false;
        body.style.transition = 'all 0.3s ease';
    }, 800);
}

// Apply color scheme to CSS variables
function applyColorScheme(scheme) {
    const root = document.documentElement;
    
    root.style.setProperty('--primary-color', scheme.primary);
    root.style.setProperty('--secondary-color', scheme.secondary);
    root.style.setProperty('--accent-color', scheme.accent);
    root.style.setProperty('--background-color', scheme.background);
    root.style.setProperty('--surface-color', scheme.surface);
    root.style.setProperty('--text-primary', scheme.textPrimary);
    root.style.setProperty('--text-secondary', scheme.textSecondary);
    root.style.setProperty('--border-color', scheme.border);
    root.style.setProperty('--shadow-color', scheme.shadow);
    root.style.setProperty('--gradient-start', scheme.gradientStart);
    root.style.setProperty('--gradient-end', scheme.gradientEnd);
}

// Add celebration effect when changing colors
function addCelebrationEffect() {
    // Create confetti effect
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
    
    // Add pulse effect to hero title
    heroTitle.style.animation = 'pulse 0.6s ease-in-out';
    setTimeout(() => {
        heroTitle.style.animation = '';
    }, 600);
}

// Create confetti particles
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colorSchemes[currentColorScheme].primary;
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.zIndex = '9999';
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    
    document.body.appendChild(confetti);
    
    const animation = confetti.animate([
        { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => {
        confetti.remove();
    };
}

// Start automatic color animation - DESABILITADO
function startColorAnimation() {
    // Mudança automática de cores desabilitada
    // As cores só mudam quando o usuário clica manualmente
    console.log('🎨 Mudança automática de cores desabilitada. Use o logo ou barra de espaço para mudar as cores.');
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Setup form handling
function setupFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Por favor, preencha todos os campos!', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Mensagem enviada com sucesso!', 'success');
            
            // Reset form
            this.reset();
            
            // Add success animation
            const submitBtn = this.querySelector('.btn');
            submitBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                submitBtn.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '8px';
    notification.style.color = 'white';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '10000';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    
    if (type === 'success') {
        notification.style.backgroundColor = '#059669';
    } else {
        notification.style.backgroundColor = '#dc2626';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Spacebar to change colors
    if (e.code === 'Space' && !isAnimating) {
        e.preventDefault();
        changeColorScheme();
    }
    
    // Arrow keys for navigation
    if (e.code === 'ArrowRight' && !isAnimating) {
        e.preventDefault();
        changeColorScheme();
    }
    
    if (e.code === 'ArrowLeft' && !isAnimating) {
        e.preventDefault();
        currentColorScheme = (currentColorScheme - 1 + colorSchemes.length) % colorSchemes.length;
        applyColorScheme(colorSchemes[currentColorScheme]);
        logo.textContent = `Portfolio - ${colorSchemes[currentColorScheme].name}`;
    }
});

// Mouse movement effect para cards flutuantes - Removido

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .floating-card {
        transition: transform 0.3s ease;
    }
    
    .project-card {
        transition: all 0.3s ease;
    }
    
    .stat-item {
        transition: all 0.3s ease;
    }
    
    .skill-tag {
        transition: all 0.2s ease;
        cursor: pointer;
    }
    
    .skill-tag:hover {
        transform: scale(1.1);
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Botão flutuante removido - Simplificação do projeto

// Coffee Modal Functions
function showCoffeeModal() {
    const modal = document.getElementById('coffee-modal');
    modal.classList.add('show');
    
    // Add celebration effect
    addCoffeeCelebration();
}

function closeCoffeeModal() {
    const modal = document.getElementById('coffee-modal');
    modal.classList.remove('show');
}

// Coffee celebration effect
function addCoffeeCelebration() {
    for (let i = 0; i < 20; i++) {
        createCoffeeParticle();
    }
}

// Create coffee particles
function createCoffeeParticle() {
    const particle = document.createElement('div');
    particle.innerHTML = '☕';
    particle.style.cssText = `
        position: fixed;
        font-size: 1.5rem;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 10001;
        animation: coffeeParticle 2s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 2000);
}

// Add coffee particle animation CSS
const coffeeStyle = document.createElement('style');
coffeeStyle.textContent = `
    @keyframes coffeeParticle {
        0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(coffeeStyle);

// Make coffee element move around screen randomly
function moveCoffeeRandomly() {
    const coffee = document.getElementById('floating-coffee');
    if (!coffee) return;
    
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    coffee.style.left = randomX + 'px';
    coffee.style.top = randomY + 'px';
}

// Move coffee every 10 seconds
setInterval(moveCoffeeRandomly, 10000);

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('coffee-modal');
    const coffee = document.getElementById('floating-coffee');
    
    if (e.target === modal) {
        closeCoffeeModal();
    }
    
    if (e.target !== coffee && !coffee.contains(e.target)) {
        // Don't close if clicking on coffee element
    }
});

// Function to copy donation link
function copyDonationLink() {
    const link = 'https://nubank.com.br/cobrar/b9fsn/68a8e39d-4f77-8e1b-343048b961a5';
    
    // Try to use the modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(link).then(() => {
            showNotification('Link copiado com sucesso! 📋', 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(link);
        });
    } else {
        fallbackCopyTextToClipboard(link);
    }
}

// Fallback method for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Link copiado com sucesso! 📋', 'success');
    } catch (err) {
        showNotification('Erro ao copiar link. Tente manualmente.', 'error');
    }
    
    document.body.removeChild(textArea);
}



// Flip Card functionality with mobile support
function initFlipCard() {
    const flipCards = document.querySelectorAll('.flip-card, .skill-flip-card');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    flipCards.forEach(card => {
        if (isMobile) {
            // Mobile: Use touch/click events with better handling
            let touchStartTime = 0;
            let touchEndTime = 0;
            
            card.addEventListener('touchstart', function(e) {
                touchStartTime = new Date().getTime();
            });
            
            card.addEventListener('touchend', function(e) {
                touchEndTime = new Date().getTime();
                const touchDuration = touchEndTime - touchStartTime;
                
                // Only flip if it's a quick tap (less than 300ms)
                if (touchDuration < 300) {
                    e.preventDefault();
                    this.classList.toggle('flipped');
                    
                    // Add visual feedback
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                }
            });
            
            // Remove click event to prevent double triggering
            card.addEventListener('click', function(e) {
                if (isMobile) {
                    e.preventDefault();
                }
            });
            
            // Add mobile hint only for main flip card
            if (card.classList.contains('flip-card')) {
                const existingHint = card.querySelector('.mobile-hint');
                if (!existingHint) {
                    const hint = document.createElement('div');
                    hint.className = 'mobile-hint';
                    hint.innerHTML = '👆 Toque para girar';
                    hint.style.cssText = `
                        position: absolute;
                        bottom: 10px;
                        left: 50%;
                        transform: translateX(-50%);
                        background: rgba(37, 99, 235, 0.8);
                        color: white;
                        padding: 8px 12px;
                        border-radius: 20px;
                        font-size: 0.8rem;
                        font-weight: 600;
                        z-index: 10;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                    `;
                    
                    card.style.position = 'relative';
                    card.appendChild(hint);
                }
            }
        }
        // Desktop: CSS hover handles the flip automatically
    });
    
    console.log(`🎴 Flip Cards ativos! ${isMobile ? 'Modo Mobile (toque)' : 'Modo Desktop (hover)'}`);
}

// Initialize flip card when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initFlipCard();
    
    // No more auto-flip or click functionality
    // Cards flip automatically on hover
});

// Typing Text Animation Function - Removida, agora usando CSS puro
// function startTypingAnimation() {
//     const typingText = document.getElementById('typing-text');
//     if (!typingText) {
//         console.log('❌ Elemento typing-text não encontrado');
//         return;
//     }
//     
//     const text = 'Olá, eu sou João Victor';
//     let index = 0;
//     
//     // Limpa o texto inicial
//     typingText.textContent = '';
//     
//     // Função para adicionar letra por letra
//     function typeNextChar() {
//         if (index < text.length) {
//             typingText.textContent += text.charAt(index);
//             index++;
//             setTimeout(typeNextChar, 120); // Delay de 120ms entre cada letra (mais rápido para texto maior)
//         }
//     }
//     
//     // Inicia a animação
//     setTimeout(typeNextChar, 500); // Delay inicial de 500ms
//     
//     console.log('⌨️ Efeito de máquina de escrever iniciado:', text);
// }

// Função de compatibilidade removida - agora temos o efeito real de máquina de escrever

console.log('✨ Portfolio interativo carregado! Clique no logo ou use a barra de espaço para mudar as cores! 🎴 Flip Cards com hover (desktop) e toque (mobile) ativos!'); 