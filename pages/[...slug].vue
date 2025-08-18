<template>
    <main class="container" style="padding:20px;">
        <ContentDoc v-slot="{ doc }">
            <article>
                <h1>{{ doc.title }}</h1>
                <p><small>Por {{ doc.author?.name || doc.author }} — {{ doc.date }}</small></p>
                <img v-if="doc.img" :src="doc.img" :alt="doc.title"
                    style="max-width:720px; width:100%; margin:12px 0;" />
                <ContentRenderer :value="doc" />
                <Author v-if="doc.author" :author="doc.author" />
            </article>
        </ContentDoc>
    </main>
</template>