<script setup lang="ts">
const props = defineProps<{
    prev?: { _path: string; title?: string } | null
    next?: { _path: string; title?: string } | null
}>()
</script>

<template>
    <div style="display:flex; justify-content:space-between; gap:12px; margin-top:20px;">
        <NuxtLink v-if="props.prev" :to="props.prev._path" class="button">⬅️ {{ props.prev.title || 'Anterior' }}
        </NuxtLink>
        <span v-else>&nbsp;</span>
        <NuxtLink v-if="props.next" :to="props.next._path" class="button">{{ props.next.title || 'Siguiente' }} ➡️
        </NuxtLink>
        <span v-else>&nbsp;</span>
    </div>
</template>