import { defineNuxtConfig } from 'nuxt/config'



export default defineNuxtConfig({
    modules: ['@nuxt/content', '@vueuse/nuxt'],
    components: true,
    app: {
        head: {
            titleTemplate: '%s - Nuxt.js',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: 'Blog de noticias con Nuxt 3 y @nuxt/content' }
            ],
            link: [
                { rel: 'stylesheet', href: 'http://fonts.googleapis.com/css?family=Raleway:400,300,600' },
                { rel: 'stylesheet', href: '/css/global.css' },
                { rel: 'stylesheet', href: '/css/normalize.css' },
                { rel: 'stylesheet', href: '/css/skeleton.css' }
            ]
        }
    }
})