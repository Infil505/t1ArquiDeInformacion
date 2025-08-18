<script setup lang="ts">
interface Author { name: string; bio?: string; image?: string }
const props = defineProps<{ author: Author }>()
</script>

<template>
    <div style="display:flex; gap:16px; align-items:center; margin-top:16px;">
        <img v-if="props.author?.image" :src="props.author.image" alt="Foto del autor" width="64" height="64"
            style="border-radius:50%; object-fit:cover;" />
        <div>
            <h4 style="margin:0 0 4px;">Autor</h4>
            <p style="margin:0;"><strong>{{ props.author?.name }}</strong></p>
            <p v-if="props.author?.bio" style="margin:0;">{{ props.author.bio }}</p>
        </div>
    </div>
</template>