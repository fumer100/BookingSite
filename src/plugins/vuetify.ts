// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { VDataTableServer, VDataTable } from 'vuetify/labs/VDataTable'
// import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
// import { useI18n } from 'vue-i18n'
// import  i18n from '@/plugins/i18n'

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
  defaults: {
    VBtn: {
      class: 'text-none' // disables text uppercase
    }
  },
  components: {
    VDataTableServer,
    VDataTable
  }
  // locale: {
  //   adapter: createVueI18nAdapter({i18n, useI18n}),
  // }
})
