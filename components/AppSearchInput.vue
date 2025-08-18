<script setup lang="ts">
import { ref } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { queryContent } from '#imports'

const searchQuery = ref('')
const results = ref<any[]>([])
const isLoading = ref(false)

watchDebounced(
    searchQuery,
    async (q) => {
        if (!q) { 
            results.value = []
            isLoading.value = false
            return 
        }
        
        isLoading.value = true
        try {
            results.value = await queryContent('/')
                .only(['title', '_path', 'description'])
                .where({
                    $or: [
                        { title: { $icontains: q } },
                        { description: { $icontains: q } },
                        { _path: { $icontains: q } }
                    ]
                })
                .limit(8)
                .find()
        } finally {
            isLoading.value = false
        }
    },
    { debounce: 250, maxWait: 500 }
)

const clearSearch = () => {
    searchQuery.value = ''
    results.value = []
}
</script>

<template>
    <div class="search-container">
        <div class="search-input-wrapper">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
            
            <input 
                v-model="searchQuery" 
                type="search" 
                placeholder="Buscar artículos..." 
                class="search-input"
                :class="{ 'has-results': results.length > 0 }"
            />
            
            <button 
                v-if="searchQuery"
                @click="clearSearch"
                class="clear-button"
                type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Loading indicator -->
        <div v-if="isLoading" class="loading-indicator">
            <div class="spinner"></div>
            <span>Buscando...</span>
        </div>

        <!-- Results -->
        <div v-else-if="results.length" class="results-container">
            <div class="results-header">
                <span class="results-count">{{ results.length }} resultado{{ results.length !== 1 ? 's' : '' }}</span>
            </div>
            <ul class="results-list">
                <li v-for="r in results" :key="r._path" class="result-item">
                    <NuxtLink :to="r._path" class="result-link" @click="clearSearch">
                        <div class="result-content">
                            <h3 class="result-title">{{ r.title }}</h3>
                            <p v-if="r.description" class="result-description">{{ r.description }}</p>
                            <span class="result-path">{{ r._path }}</span>
                        </div>
                        <svg class="result-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </NuxtLink>
                </li>
            </ul>
        </div>

        <!-- No results -->
        <div v-else-if="searchQuery && !isLoading" class="no-results">
            <svg class="no-results-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
            <p>No se encontraron resultados para "<strong>{{ searchQuery }}</strong>"</p>
            <p class="no-results-suggestion">Intenta con palabras diferentes o más generales</p>
        </div>
    </div>
</template>

<style scoped>
.search-container {
    max-width: 600px;
    margin: 0 auto;
    position: relative;
}

/* Input de búsqueda */
.search-input-wrapper {
    position: relative;
    margin-bottom: 1rem;
}

.search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: #9ca3af;
    pointer-events: none;
    z-index: 2;
}

.search-input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    font-size: 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    background: #ffffff;
    transition: all 0.3s ease;
    outline: none;
    font-family: inherit;
}

.search-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-input.has-results {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
}

.clear-button {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    background: #f3f4f6;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #6b7280;
}

.clear-button:hover {
    background: #e5e7eb;
    color: #374151;
}

.clear-button svg {
    width: 14px;
    height: 14px;
}

/* Loading */
.loading-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1.5rem;
    background: #ffffff;
    border: 2px solid #e5e7eb;
    border-top: none;
    border-radius: 0 0 12px 12px;
    color: #6b7280;
    font-size: 0.875rem;
}

.spinner {
    width: 16px;
    height: 16px;
    border: 2px solid #e5e7eb;
    border-top: 2px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Resultados */
.results-container {
    background: #ffffff;
    border: 2px solid #e5e7eb;
    border-top: none;
    border-radius: 0 0 12px 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    max-height: 400px;
    overflow-y: auto;
}

.results-header {
    padding: 0.75rem 1rem;
    background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
}

.results-count {
    font-size: 0.75rem;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.results-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.result-item {
    border-bottom: 1px solid #f3f4f6;
}

.result-item:last-child {
    border-bottom: none;
}

.result-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s ease;
}

.result-link:hover {
    background: #f9fafb;
}

.result-content {
    flex: 1;
}

.result-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #111827;
    margin: 0 0 0.25rem 0;
    line-height: 1.4;
}

.result-description {
    font-size: 0.75rem;
    color: #6b7280;
    margin: 0 0 0.25rem 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.result-path {
    font-size: 0.6875rem;
    color: #9ca3af;
    font-family: 'Monaco', 'Menlo', monospace;
}

.result-arrow {
    width: 16px;
    height: 16px;
    color: #d1d5db;
    transition: all 0.2s ease;
    margin-left: 0.75rem;
    flex-shrink: 0;
}

.result-link:hover .result-arrow {
    color: #3b82f6;
    transform: translateX(2px);
}

/* Sin resultados */
.no-results {
    background: #ffffff;
    border: 2px solid #e5e7eb;
    border-top: none;
    border-radius: 0 0 12px 12px;
    padding: 2rem;
    text-align: center;
}

.no-results-icon {
    width: 48px;
    height: 48px;
    color: #d1d5db;
    margin: 0 auto 1rem auto;
}

.no-results p {
    margin: 0 0 0.5rem 0;
    color: #6b7280;
}

.no-results-suggestion {
    font-size: 0.875rem;
    color: #9ca3af;
}

/* Responsivo */
@media (max-width: 640px) {
    .search-container {
        margin: 0 1rem;
    }
    
    .search-input {
        font-size: 16px; /* Previene zoom en iOS */
    }
    
    .results-container {
        max-height: 300px;
    }
    
    .result-link {
        padding: 0.75rem;
    }
}
</style>