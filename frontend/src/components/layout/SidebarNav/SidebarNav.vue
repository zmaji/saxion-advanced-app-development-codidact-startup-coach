<script setup lang="ts">
  import { RouterLink, useRoute } from 'vue-router';

  const route = useRoute();
</script>

<template>
  <nav class="sidebar-nav-wrapper">
    <div class="sidebar-nav-logo">
      <h1 class="text-center text-white">
        <RouterLink :to="{ name: 'home' }" class="nav-link">Codi</RouterLink>
      </h1>
    </div>

    <ul class="sidebar-nav" id="sidebar-nav">
      <slot v-if="(route.name !== 'knowledgeBase.overview') && (route.name !== 'knowledgeBase.show')">
        <li class="sidebar-nav-item">
          <RouterLink :to="{ name: 'company.overview' }" class="nav-link">Mijn bedrijf</RouterLink>
        </li>

        <li class="sidebar-nav-item">
          <RouterLink :to="{ name: 'company.roadmap' }" class="nav-link">Roadmap</RouterLink>
        </li>

        <li class="sidebar-nav-item">
          <RouterLink :to="{ name: 'company.overview' }" class="nav-link">Interne kennisbank</RouterLink>
        </li>

        <li class="sidebar-nav-item">
          <RouterLink :to="{ name: 'company.overview' }" class="nav-link">Modules</RouterLink>
        </li>

        <li class="sidebar-nav-item">
          <RouterLink :to="{ name: 'components' }" class="nav-link">Componenten</RouterLink>
        </li>
      </slot>
    </ul>
  </nav>
</template>

<style scoped>
 .sidebar-nav-logo {
   min-height: 5.7rem;
 }
</style>