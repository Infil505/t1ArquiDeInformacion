<script setup lang="ts">
import { queryContent } from '#imports'
const { data: list } = await useAsyncData('espectaculos-list', () =>
    queryContent('/espectaculos').only(['title', '_path', 'author', 'date']).sort({ date: -1 }).find()
)

</script>

<template>
    <main class="news-list-container">
        <h2>Noticias de Espectaculos</h2>
        <ul class="news-list">
            <li v-for="a in list" :key="a._path" class="news-item">
                <NuxtLink :to="a._path" class="news-item-link">
                    <h3 class="news-item-title">{{ a.title }}</h3>
                    <small class="news-item-meta">
                        Por {{ a.author?.name || a.author }} — {{ a.date }}
                    </small>
                </NuxtLink>
            </li>
        </ul>
    </main>
</template>

<style scoped>
.news-list-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
}

.news-list-container h2 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #111827;
    margin-bottom: 2rem;
    text-align: center;
    letter-spacing: -0.025em;
    position: relative;
    padding-bottom: 1rem;
}

.news-list-container h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #9333ea, #7c3aed);
    border-radius: 2px;
}

.news-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 1.5rem;
}

.news-item {
    background: #ffffff;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.news-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, #9333ea, #7c3aed);
    transform: scaleY(0);
    transition: transform 0.3s ease;
}

.news-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: #9333ea;
}

.news-item:hover::before {
    transform: scaleY(1);
}

.news-item-link {
    text-decoration: none;
    color: inherit;
    display: block;
}

.news-item-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 0.75rem 0;
    line-height: 1.4;
    transition: color 0.3s ease;
}

.news-item:hover .news-item-title {
    color: #9333ea;
}

.news-item-meta {
    color: #6b7280;
    font-size: 0.875rem;
    font-weight: 500;
    display: inline-block;
    padding: 0.375rem 0.75rem;
    background: #f9fafb;
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
}

.news-item:hover .news-item-meta {
    background: #faf5ff;
    border-color: #d8b4fe;
    color: #6b21a8;
}

/* Responsivo */
@media (max-width: 768px) {
    .news-list-container {
        padding: 1rem;
    }

    .news-list-container h2 {
        font-size: 2rem;
    }

    .news-item {
        padding: 1.25rem;
    }

    .news-item-title {
        font-size: 1.125rem;
    }
}
</style>