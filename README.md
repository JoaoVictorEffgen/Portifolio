# ✨ Portfólio Interativo

Um portfólio pessoal moderno e interativo com sistema de cores dinâmicas que mudam automaticamente! Inclui projetos reais como Jogo do Saber, Sistema de Padaria integrado, App Mobile e Site Empresarial.

## ✨ Características

- **✨ Cores Dinâmicas**: 6 esquemas de cores diferentes que mudam automaticamente
- **📱 Design Responsivo**: Funciona perfeitamente em todos os dispositivos
- **🚀 Animações Suaves**: Transições e efeitos visuais elegantes
- **🎯 Navegação Intuitiva**: Menu fixo com rolagem suave
- **💫 Efeitos Interativos**: Cards flutuantes, confetti e muito mais

## ✨ Esquemas de Cores

1. **Azul** (padrão) - #2563eb
2. **Roxo** - #7c3aed
3. **Verde** - #059669
4. **Vermelho** - #dc2626
5. **Laranja** - #ea580c
6. **Teal** - #0d9488

## 🎮 Como Usar

### Mudança Manual de Cores
- **Clique no logo** "Portfolio" no cabeçalho
- **Pressione a barra de espaço**
- **Use as setas do teclado** (← →)
- **Clique no logo** "Portfolio" no cabeçalho

### Navegação
- **Menu fixo** no topo para navegação rápida
- **Rolagem suave** entre seções
- **Barra de progresso** no topo da página

## 🛠️ Personalização

### 1. Informações Pessoais
Edite o arquivo `index.html`:
```html
<!-- Seu nome -->
<h1 class="hero-title">Olá, eu sou <span class="highlight">Seu Nome</span></h1>

<!-- Sua profissão -->
<p class="hero-subtitle">Desenvolvedor Full Stack & Designer</p>

<!-- Suas habilidades já estão configuradas -->
<span class="skill-tag">JavaScript</span>
<span class="skill-tag">React</span>
<span class="skill-tag">React Native</span>
<span class="skill-tag">Node.js</span>
<span class="skill-tag">HTML5/CSS3</span>
<span class="skill-tag">MySQL</span>
<span class="skill-tag">Expo</span>
<span class="skill-tag">Bootstrap</span>
<!-- Adicione mais habilidades se necessário -->
```

### 2. Projetos
Seus projetos já estão configurados:
- **🎮 Jogo do Saber** - Jogo educativo interativo
- **🥖 Sistema de Padaria** - Sistema integrado mobile/web/desktop
- **📱 App Mobile Simples** - Aplicação mobile básica
- **🏢 Site Empresarial** - Website profissional

Para personalizar ainda mais:
```html
<div class="project-card">
    <div class="project-image">
        <div class="project-placeholder">📱</div>
    </div>
    <div class="project-content">
        <h3>Nome do Seu Projeto</h3>
        <p>Descrição do projeto</p>
        <div class="project-tech">
            <span>Tecnologia 1</span>
            <span>Tecnologia 2</span>
        </div>
        <div class="project-links">
            <a href="#" class="project-link">Demo</a>
            <a href="#" class="project-link">GitHub</a>
        </div>
    </div>
</div>
```

### 3. Estatísticas
Atualize suas estatísticas:
```html
<div class="stat-item">
    <div class="stat-number">5+</div>
    <div class="stat-label">Anos de Experiência</div>
</div>
```

### 4. Contato e Redes Sociais
**Método Fácil:** Edite o arquivo `config.js`:
```javascript
const PORTFOLIO_CONFIG = {
    personal: {
        name: "João Victor Effgen",
        email: "joaoeffgens@gmail.com"
    },
    contact: {
        whatsapp: {
            number: "27995187615", // Seu número (apenas números)
            message: "Olá! Vi seu portfólio e gostaria de conversar sobre um projeto."
        },
        instagram: "joaoeffgen", // Sem @
        github: "JoaoVictorEffgen",
        linkedin: "joao-victor-effgen-84888b239"
    }
};
```

**Links Reais Configurados:**
- **WhatsApp:** +55 (27) 99518-7615
- **Instagram:** [@joaoeffgen](https://www.instagram.com/joaoeffgen/)
- **GitHub:** [JoaoVictorEffgen](https://github.com/JoaoVictorEffgen)
- **LinkedIn:** [João Victor Effgen](https://www.linkedin.com/in/joao-victor-effgen-84888b239/)

**Método Manual:** Atualize diretamente no HTML:
```html
<div class="contact-method">
    <span class="contact-icon">📧</span>
    <span>seu.email@exemplo.com</span>
</div>
<div class="contact-method">
    <span class="contact-icon">📱</span>
    <span>+55 (11) 99999-9999</span>
</div>
```

### 5. Cores Personalizadas
Para adicionar novos esquemas de cores, edite o arquivo `script.js`:
```javascript
const colorSchemes = [
    // ... esquemas existentes ...
    {
        name: 'Sua Cor',
        primary: '#sua-cor-primaria',
        secondary: '#sua-cor-secundaria',
        accent: '#sua-cor-accent',
        background: '#sua-cor-background',
        surface: '#sua-cor-surface',
        textPrimary: '#sua-cor-texto-principal',
        textSecondary: '#sua-cor-texto-secundario',
        border: '#sua-cor-borda',
        shadow: 'rgba(sua-cor-sombra, 0.1)',
        gradientStart: '#sua-cor-gradiente-inicio',
        gradientEnd: '#sua-cor-gradiente-fim'
    }
];
```

## 📁 Estrutura do Projeto

```
portifolio/
├── index.html          # Estrutura HTML principal
├── styles.css          # Estilos CSS com variáveis dinâmicas
├── script.js           # JavaScript com funcionalidades interativas
└── README.md           # Este arquivo
```

## 🚀 Como Executar

1. **Clone ou baixe** os arquivos para sua pasta
2. **Abra o arquivo** `index.html` em qualquer navegador moderno
3. **Pronto!** Seu portfólio está funcionando

## 🌐 Hospedagem

Para publicar online, você pode usar:
- **GitHub Pages** (gratuito)
- **Netlify** (gratuito)
- **Vercel** (gratuito)
- **Qualquer servidor web**

## 🎯 Funcionalidades Avançadas

### 📱 **Links Diretos de Contato**
- **WhatsApp:** Link direto para conversa com mensagem personalizada
- **Instagram:** Acesso direto ao seu perfil
- **GitHub:** Link para seus repositórios
- **LinkedIn:** Perfil profissional
- **Email:** Contato direto por email

### ✨ **Ícones das Redes Sociais**
- **Ícones oficiais** do Font Awesome
- **Cores autênticas** de cada plataforma
- **Efeitos hover** com animações suaves
- **Seção dedicada** na área de contato

### 🔗 **Como Funcionam os Links:**
- **WhatsApp:** Abre o app/WhatsApp Web com mensagem pré-definida
- **Instagram:** Abre seu perfil no Instagram
- **Todos os links** abrem em nova aba para não perder o portfólio

- **Mudança automática de cores** a cada 15 segundos
- **Efeito confetti** ao mudar cores
- **Animações de scroll** para elementos
- **Efeitos de hover** em todos os elementos interativos
- **Formulário de contato** funcional
- **Atalhos de teclado** para navegação
- **Barra de progresso** de scroll

## 🔧 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com variáveis CSS
- **JavaScript ES6+** - Funcionalidades interativas
- **Google Fonts** - Tipografia Inter
- **CSS Grid & Flexbox** - Layout responsivo

## 📱 Responsividade

O portfólio é totalmente responsivo e funciona em:
- 📱 Smartphones
- 📱 Tablets
- 💻 Desktops
- 🖥️ Monitores grandes

## ✨ Personalização Avançada

### Adicionar Novas Seções
```html
<section id="nova-secao" class="nova-secao">
    <h2 class="section-title">Nova Seção</h2>
    <div class="container">
        <!-- Conteúdo da nova seção -->
    </div>
</section>
```

### Estilos CSS Personalizados
```css
.nova-secao {
    padding: 80px 0;
    background: var(--surface-color);
}

.nova-secao .section-title {
    color: var(--text-primary);
}
```

## 🚀 Próximos Passos

1. **Personalize** suas informações
2. **Adicione** seus projetos reais
3. **Atualize** suas habilidades
4. **Configure** suas informações de contato
5. **Teste** em diferentes dispositivos
6. **Publique** online

## 📞 Suporte

Se precisar de ajuda para personalizar:
1. Verifique se todos os arquivos estão na mesma pasta
2. Certifique-se de que está usando um navegador moderno
3. Verifique o console do navegador para possíveis erros

---

**🎉 Seu portfólio interativo está pronto para impressionar!** 