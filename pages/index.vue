<script setup lang="ts">
import { onMounted, ref } from 'vue'

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})
</script>

<template>
    <main class="blog-home" :class="{ 'loaded': isLoaded }">
        <!-- Partículas flotantes de fondo -->
        <div class="background-particles">
            <div class="particle" v-for="i in 15" :key="i" :style="{ 
                '--delay': `${i * 0.5}s`,
                '--duration': `${15 + i * 2}s`,
                '--size': `${Math.random() * 4 + 2}px`
            }"></div>
        </div>

        <div class="hero-section">
            <div class="hero-content">
                <h1 class="blog-title">
                    <span class="title-highlight animate-text">Blog de Noticias</span>
                    <span class="title-subtitle animate-text-delay">Nacionales</span>
                </h1>
                <p class="hero-description animate-fade-up">
                    Mantente informado con las últimas noticias de Costa Rica
                </p>
                <div class="pulse-indicator"></div>
            </div>
        </div>

        <nav class="navigation">
            <NuxtLink to="/sucesos" class="nav-card sucesos" data-category="sucesos">
                <div class="nav-background"></div>
                <div class="nav-content">
                    <div class="nav-icon floating">🚨</div>
                    <h3 class="slide-up">Sucesos</h3>
                    <p class="slide-up-delay">Últimas noticias policiales y de seguridad</p>
                </div>
                <div class="hover-ripple"></div>
            </NuxtLink>
            
            <NuxtLink to="/deportes" class="nav-card deportes" data-category="deportes">
                <div class="nav-background"></div>
                <div class="nav-content">
                    <div class="nav-icon floating">⚽</div>
                    <h3 class="slide-up">Deportes</h3>
                    <p class="slide-up-delay">Resultados, análisis y noticias deportivas</p>
                </div>
                <div class="hover-ripple"></div>
            </NuxtLink>
            
            <NuxtLink to="/espectaculos" class="nav-card espectaculos" data-category="espectaculos">
                <div class="nav-background"></div>
                <div class="nav-content">
                    <div class="nav-icon floating">🎬</div>
                    <h3 class="slide-up">Espectáculos</h3>
                    <p class="slide-up-delay">Entretenimiento y mundo del espectáculo</p>
                </div>
                <div class="hover-ripple"></div>
            </NuxtLink>
            
            <NuxtLink to="/search" class="nav-card search" data-category="search">
                <div class="nav-background"></div>
                <div class="nav-content">
                    <div class="nav-icon floating">🔍</div>
                    <h3 class="slide-up">Buscar</h3>
                    <p class="slide-up-delay">Encuentra noticias específicas</p>
                </div>
                <div class="hover-ripple"></div>
            </NuxtLink>
        </nav>

        <div class="footer-cta">
            <div class="cta-content animate-fade-up-late">
                <p>Selecciona una categoría para comenzar a explorar las noticias</p>
                <div class="scroll-indicator">
                    <div class="scroll-dot"></div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
* {
    box-sizing: border-box;
}

.blog-home {
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 30%, #e2e8f0 70%, #f8fafc 100%);
    background-size: 400% 400%;
    animation: gradientShift 20s ease infinite;
    padding: 2rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    position: relative;
    overflow-x: hidden;
}

/* Animación sutil del fondo */
@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Partículas flotantes */
.background-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
}

.particle {
    position: absolute;
    background: rgba(102, 126, 234, 0.08);
    border-radius: 50%;
    width: var(--size);
    height: var(--size);
    animation: float var(--duration) var(--delay) infinite linear;
}

.particle:nth-child(odd) {
    background: rgba(118, 75, 162, 0.05);
}

@keyframes float {
    0% {
        transform: translateY(100vh) translateX(0) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100px) translateX(100px) rotate(360deg);
        opacity: 0;
    }
}

/* Posicionamiento aleatorio de partículas */
.particle:nth-child(1) { left: 10%; }
.particle:nth-child(2) { left: 20%; }
.particle:nth-child(3) { left: 30%; }
.particle:nth-child(4) { left: 40%; }
.particle:nth-child(5) { left: 50%; }
.particle:nth-child(6) { left: 60%; }
.particle:nth-child(7) { left: 70%; }
.particle:nth-child(8) { left: 80%; }
.particle:nth-child(9) { left: 90%; }
.particle:nth-child(10) { left: 15%; }
.particle:nth-child(11) { left: 25%; }
.particle:nth-child(12) { left: 35%; }
.particle:nth-child(13) { left: 45%; }
.particle:nth-child(14) { left: 55%; }
.particle:nth-child(15) { left: 75%; }

.hero-section {
    text-align: center;
    margin-bottom: 4rem;
    padding: 3rem 0;
    position: relative;
}

.hero-content {
    position: relative;
    z-index: 2;
}

.blog-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    margin-bottom: 1rem;
    line-height: 1.1;
}

.title-highlight {
    display: block;
    background: linear-gradient(45deg, #1e293b, #475569, #334155);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 10px rgba(30, 41, 59, 0.2);
    animation: textShimmer 4s ease-in-out infinite;
}

@keyframes textShimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

.title-subtitle {
    display: block;
    font-size: 0.6em;
    color: rgba(71, 85, 105, 0.8);
    font-weight: 400;
    margin-top: 0.5rem;
}

.hero-description {
    font-size: 1.2rem;
    color: rgba(51, 65, 85, 0.9);
    font-weight: 300;
    max-width: 600px;
    margin: 0 auto;
}

/* Indicador de pulso sutil */
.pulse-indicator {
    width: 8px;
    height: 8px;
    background: rgba(102, 126, 234, 0.6);
    border-radius: 50%;
    margin: 2rem auto 0;
    animation: gentlePulse 3s ease-in-out infinite;
    position: relative;
}

.pulse-indicator::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(102, 126, 234, 0.3);
    animation: ripple 3s ease-in-out infinite;
}

@keyframes gentlePulse {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.2); opacity: 1; }
}

@keyframes ripple {
    0% { transform: scale(1); opacity: 0.3; }
    100% { transform: scale(3); opacity: 0; }
}

.navigation {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.nav-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 0;
    text-decoration: none;
    color: #2d3748;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(20px);
    opacity: 0;
}

.loaded .nav-card {
    transform: translateY(0);
    opacity: 1;
}

.loaded .nav-card:nth-child(1) { animation-delay: 0.1s; }
.loaded .nav-card:nth-child(2) { animation-delay: 0.2s; }
.loaded .nav-card:nth-child(3) { animation-delay: 0.3s; }
.loaded .nav-card:nth-child(4) { animation-delay: 0.4s; }

.nav-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transform: scaleX(0);
    transition: transform 0.4s ease;
    transform-origin: left;
}

.nav-content {
    padding: 2rem;
    position: relative;
    z-index: 2;
}

.nav-card:hover .nav-background {
    transform: scaleX(1);
}

.nav-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* Efecto ripple en hover */
.hover-ripple {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: all 0.6s ease;
    pointer-events: none;
}

.nav-card:hover .hover-ripple {
    width: 200px;
    height: 200px;
}

.nav-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;
    animation: gentleFloat 4s ease-in-out infinite;
}

@keyframes gentleFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
}

.floating:nth-child(1) { animation-delay: 0s; }
.floating:nth-child(2) { animation-delay: 1s; }
.floating:nth-child(3) { animation-delay: 2s; }
.floating:nth-child(4) { animation-delay: 3s; }

.nav-card h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #1a202c;
    transition: color 0.3s ease;
}

.nav-card p {
    color: #4a5568;
    font-size: 0.95rem;
    margin: 0;
    opacity: 0.8;
    transition: all 0.3s ease;
}

.nav-card:hover h3,
.nav-card:hover p {
    transform: translateY(-2px);
}

/* Colores específicos para cada categoría */
.sucesos:hover {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(255, 255, 255, 0.95));
}

.deportes:hover {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(255, 255, 255, 0.95));
}

.espectaculos:hover {
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(255, 255, 255, 0.95));
}

.search:hover {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(255, 255, 255, 0.95));
}

.footer-cta {
    text-align: center;
    margin-top: 4rem;
    padding: 2rem;
}

.cta-content {
    transform: translateY(20px);
    opacity: 0;
}

.loaded .cta-content {
    transform: translateY(0);
    opacity: 1;
    transition: all 0.6s ease 0.8s;
}

.footer-cta p {
    color: rgba(71, 85, 105, 0.8);
    font-size: 1.1rem;
    font-weight: 300;
    margin-bottom: 1rem;
}

.scroll-indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
}

.scroll-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(102, 126, 234, 0.6);
    animation: scrollBounce 2s ease-in-out infinite;
}

@keyframes scrollBounce {
    0%, 100% { transform: translateY(0); opacity: 0.4; }
    50% { transform: translateY(-8px); opacity: 1; }
}

/* Animaciones de entrada */
.animate-text {
    animation: slideInFromTop 0.8s ease-out forwards;
    animation-delay: 0.2s;
    opacity: 0;
}

.loaded .animate-text {
    opacity: 1;
}

.animate-text-delay {
    animation: slideInFromTop 0.8s ease-out forwards;
    animation-delay: 0.4s;
    opacity: 0;
}

.loaded .animate-text-delay {
    opacity: 1;
}

.animate-fade-up {
    animation: fadeInUp 0.8s ease-out forwards;
    animation-delay: 0.6s;
    opacity: 0;
}

.loaded .animate-fade-up {
    opacity: 1;
}

@keyframes slideInFromTop {
    from {
        transform: translateY(-30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes fadeInUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Responsive */
@media (max-width: 768px) {
    .blog-home {
        padding: 1rem;
    }
    
    .navigation {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .nav-content {
        padding: 1.5rem;
    }
    
    .hero-section {
        padding: 2rem 0;
        margin-bottom: 3rem;
    }
    
    .nav-icon {
        font-size: 2.5rem;
    }
}

@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .particle {
        display: none;
    }
}</style>