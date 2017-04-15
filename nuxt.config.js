module.exports = {
    /*
     ** Headers of the page
     */
    head: {
        title: 'Intramurals - Fanshawe',
        meta: [{
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Nuxt.js project'
            }
        ],
        link: [{
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            },

            {
                rel: 'manifest',
                href: '/manifest.json'
            },
            {
                rel: 'stylesheet',
                type: 'link',
                href: 'https://unpkg.com/element-ui/lib/theme-default/index.css'
            },
            {
                rel: 'stylesheet',
                type: 'link',
                href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
            },
            {
                rel: 'stylesheet',
                type: 'link',
                href: 'https://unpkg.com/vue-multiselect@2.0.0-beta.14/dist/vue-multiselect.min.css'
            }
        ],
        script: [{
                src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.1/TweenMax.min.js'
            }, {
                src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js'
            },
            {
                src: 'http://cdnjs.cloudflare.com/ajax/libs/jquery.form/3.51/jquery.form.min.js'
            }
        ]
    },

    /*
     ** Global CSS
     */
    css: ['~assets/css/materialize.min.css', 'vuetify/dist/vuetify.min.css', '~assets/css/main.css'],
    /*
     ** Add axios globally
     */
    build: {
        vendor: ['axios', 'vuetify', 'socket.io-client']
    },
    plugins: ['plugins/element-ui', '~plugins/vuetify.js', '~plugins/favicon.js', '~plugins/vee-validate.js'],
    loading: false,
    // cache: true,
    env: {
        HOST_URL: process.env.HOST_URL || 'http://localhost:3000'
    }

}
