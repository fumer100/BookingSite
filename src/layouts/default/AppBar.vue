<template>
<v-navigation-drawer temporary v-model="drawer">
  <v-list nav>
    <v-list-item 
      v-for="link in links" 
      :key="link.title" 
      :to="link.to" exact
      :title="link.title"
    >
    </v-list-item>
  </v-list>
</v-navigation-drawer>

<v-app-bar>
  <v-app-bar-nav-icon class="hidden-sm-and-up" @click.stop="drawer = !drawer" />
  <v-app-bar-title >
    <router-link to="/">
      <v-icon icon="mdi-domain" start/> Firmenname
    </router-link>
  </v-app-bar-title>
  <!-- <v-toolbar-items> -->
  <v-btn
    v-for="link in links" 
    :key="link.title" 
    :to="link.to" exact
    density="default"
    class="d-none d-sm-flex"
  >
    {{ link.title }}
  </v-btn>
  <!-- </v-toolbar-items> -->
</v-app-bar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const drawer = ref(false)
const links = [
  { title: 'Startseite', to: { name: 'Home' } },
  { title: 'Buchung', to: { name: 'MainForm' } },
  { title: 'Kontakt', to: { name: 'Contact' } },
]
</script>

<style scoped> 
  a {
    color: inherit;
    text-decoration: none;
  }
</style>