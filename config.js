// Configuração do Portfólio - Personalize aqui seus links!

const PORTFOLIO_CONFIG = {
    // Informações Pessoais
    personal: {
        name: "João Victor Effgen",
        title: "Desenvolvedor Full Stack & Mobile",
        email: "joaoeffgens@gmail.com",
        location: "Espírito Santo, Brasil"
    },
    
    // Links de Contato Direto
    contact: {
        whatsapp: {
            number: "27995187615", // Seu número do WhatsApp (apenas números)
            message: "Olá! Vi seu portfólio e gostaria de conversar sobre um projeto." // Mensagem padrão
        },
        instagram: "joaoeffgen", // Seu usuário do Instagram (sem @)
        github: "JoaoVictorEffgen", // Seu usuário do GitHub
        linkedin: "joao-victor-effgen-84888b239" // Seu ID do LinkedIn
    },
    
    // Links das Redes Sociais (serão gerados automaticamente)
    social: {
        whatsapp: null, // Será gerado automaticamente
        instagram: null, // Será gerado automaticamente
        github: null, // Será gerado automaticamente
        linkedin: null // Será gerado automaticamente
    }
};

// Função para gerar link do WhatsApp com mensagem personalizada
function getWhatsAppLink(number, message = "") {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${number}?text=${encodedMessage}`;
}

// Função para atualizar todos os links automaticamente
function updateAllLinks() {
    // Atualizar WhatsApp
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    const whatsappNumber = PORTFOLIO_CONFIG.contact.whatsapp.number;
    const whatsappMessage = PORTFOLIO_CONFIG.contact.whatsapp.message;
    
    whatsappLinks.forEach(link => {
        link.href = getWhatsAppLink(whatsappNumber, whatsappMessage);
    });
    
    // Atualizar Instagram
    const instagramLinks = document.querySelectorAll('a[href*="instagram.com"]');
    instagramLinks.forEach(link => {
        link.href = `https://instagram.com/${PORTFOLIO_CONFIG.contact.instagram}`;
    });
    
    // Atualizar GitHub
    const githubLinks = document.querySelectorAll('a[href*="github.com"]');
    githubLinks.forEach(link => {
        link.href = `https://github.com/${PORTFOLIO_CONFIG.contact.github}`;
    });
    
    // Atualizar LinkedIn
    const linkedinLinks = document.querySelectorAll('a[href*="linkedin.com"]');
    linkedinLinks.forEach(link => {
        link.href = `https://linkedin.com/in/${PORTFOLIO_CONFIG.contact.linkedin}`;
    });
    
    // Atualizar email
    const emailElements = document.querySelectorAll('.contact-method span:last-child');
    emailElements.forEach(element => {
        if (element.textContent.includes('@')) {
            element.textContent = PORTFOLIO_CONFIG.personal.email;
        }
    });
    
    // Atualizar nome
    const nameElements = document.querySelectorAll('.hero-title .highlight');
    nameElements.forEach(element => {
        element.textContent = PORTFOLIO_CONFIG.personal.name;
    });
    
    // Atualizar título
    const titleElements = document.querySelectorAll('.hero-subtitle');
    titleElements.forEach(element => {
        element.textContent = PORTFOLIO_CONFIG.personal.title;
    });
    
    // Atualizar links das redes sociais na seção de contato
    updateSocialContactLinks();
}

// Função para atualizar os links da seção de contato
function updateSocialContactLinks() {
    const whatsappNumber = PORTFOLIO_CONFIG.contact.whatsapp.number;
    const whatsappMessage = PORTFOLIO_CONFIG.contact.whatsapp.message;
    
    // Atualizar WhatsApp na seção de contato
    const whatsappContact = document.querySelector('.social-icon.whatsapp');
    if (whatsappContact) {
        whatsappContact.href = getWhatsAppLink(whatsappNumber, whatsappMessage);
    }
    
    // Atualizar Instagram na seção de contato
    const instagramContact = document.querySelector('.social-icon.instagram');
    if (instagramContact) {
        instagramContact.href = `https://instagram.com/${PORTFOLIO_CONFIG.contact.instagram}`;
    }
    
    // Atualizar LinkedIn na seção de contato
    const linkedinContact = document.querySelector('.social-icon.linkedin');
    if (linkedinContact) {
        linkedinContact.href = `https://linkedin.com/in/${PORTFOLIO_CONFIG.contact.linkedin}`;
    }
    
    // Atualizar GitHub na seção de contato
    const githubContact = document.querySelector('.social-icon.github');
    if (githubContact) {
        githubContact.href = `https://github.com/${PORTFOLIO_CONFIG.contact.github}`;
    }
}

// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    updateAllLinks();
    // Links atualizados com sucesso
});

// Tornar config disponível globalmente
window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;

// Exportar configuração para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PORTFOLIO_CONFIG;
} 