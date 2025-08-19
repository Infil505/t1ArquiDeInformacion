<script setup lang="ts">
import { useRoute } from 'vue-router'
import { queryContent } from '#imports'

const route = useRoute()

const category = route.path.split('/')[1] 

const { data: surround } = await useAsyncData('surround', () =>
    queryContent(`/${category}`)
        .only(['title', '_path'])
        .sort({ date: -1 })
        .findSurround(route.path)
)

const [prev, next] = surround.value || [null, null]
</script>

<template>
    <main class="article-container">
        <ContentDoc v-slot="{ doc }">
            <article class="article-content">
                <header class="article-header">
                    <h1 class="article-title">{{ doc.title }}</h1>
                    <div class="article-meta">
                        <span class="author">Por {{ doc.author?.name || doc.author }}</span>
                        <span class="separator">—</span>
                        <time class="date">{{ doc.date }}</time>
                    </div>
                </header>

                <div class="article-image" v-if="doc.img">
                    <img :src="doc.img" :alt="doc.title" />
                </div>

                <div class="article-body">
                    <ContentRenderer :value="doc" />
                </div>

                <Author v-if="doc.author" :author="doc.author" class="article-author" />

                <PrevNext :prev="prev" :next="next" class="article-navigation" />
                
                <div class="back-home">
                    <NuxtLink to="/" class="home-button">
                        <span class="home-icon">🏠</span>
                        Volver al inicio
                    </NuxtLink>
                </div>
            </article>
        </ContentDoc>
    </main>
</template>

<style scoped>
.article-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    padding: 2rem 1rem;
}

.article-content {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
}

.article-header {
    padding: 3rem 3rem 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    position: relative;
}

.article-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><defs><radialGradient id="a" cx="50%" cy="0%" r="100%"><stop offset="0%" stop-color="rgba(255,255,255,.1)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/></radialGradient></defs><rect width="100" height="20" fill="url(%23a)"/></svg>') repeat-x;
    opacity: 0.3;
}

.article-title {
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.2;
    margin: 0;
    position: relative;
    z-index: 1;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.article-meta {
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.95rem;
    opacity: 0.9;
    position: relative;
    z-index: 1;
}

.author {
    font-weight: 600;
}

.separator {
    opacity: 0.6;
}

.date {
    font-weight: 400;
}

.article-image {
    position: relative;
    overflow: hidden;
}

.article-image img {
    width: 100%;
    height: auto;
    max-height: 400px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.article-image:hover img {
    transform: scale(1.02);
}

.article-body {
    padding: 3rem;
    line-height: 1.8;
    font-size: 1.1rem;
    color: #374151;
}

.article-body :deep(p) {
    margin-bottom: 1.5rem;
    text-align: justify;
}

.article-body :deep(h2) {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin: 2.5rem 0 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e5e7eb;
}

.article-body :deep(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin: 2rem 0 1rem;
}

.article-body :deep(blockquote) {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f8fafc;
    border-left: 4px solid #667eea;
    border-radius: 0 8px 8px 0;
    font-style: italic;
}

.article-body :deep(ul), 
.article-body :deep(ol) {
    margin: 1.5rem 0;
    padding-left: 2rem;
}

.article-body :deep(li) {
    margin-bottom: 0.5rem;
}

.article-author {
    margin: 2rem 3rem;
    padding: 2rem;
    background: #f8fafc;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
}

.article-navigation {
    margin: 2rem 3rem 3rem;
    padding-top: 2rem;
    border-top: 1px solid #e2e8f0;
}

.back-home {
    display: flex;
    justify-content: center;
    padding: 2rem 3rem 3rem;
    border-top: 1px solid #e2e8f0;
    background: #f8fafc;
}

.home-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.home-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    text-decoration: none;
}

.home-icon {
    font-size: 1.2rem;
}

@media (max-width: 768px) {
    .article-container {
        padding: 1rem 0.5rem;
    }
    
    .article-header {
        padding: 2rem 1.5rem 1.5rem;
    }
    
    .article-body {
        padding: 2rem 1.5rem;
    }
    
    .article-author,
    .article-navigation {
        margin: 2rem 1.5rem;
        padding: 1.5rem;
    }
    
    .back-home {
        padding: 2rem 1.5rem;
    }
    
    .article-title {
        font-size: 1.8rem;
    }
    
    .article-body {
        font-size: 1rem;
        line-height: 1.7;
    }
}

@media (max-width: 480px) {
    .article-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
    }
    
    .separator {
        display: none;
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.article-content {
    animation: fadeInUp 0.6s ease-out;
}

@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
</style>