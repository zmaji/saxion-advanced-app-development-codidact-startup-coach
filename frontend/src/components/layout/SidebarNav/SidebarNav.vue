<script setup lang="ts">
  import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="sidebar-nav-wrapper">
    <div class="sidebar-nav-logo">
      <h1 class="text-center text-white">
        <RouterLink :to="{ name: 'home' }" class="nav-link">Codi</RouterLink>
      </h1>
    </div>

    <ul class="sidebar-nav">
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
    </ul>
  </nav>
</template>

<style scoped>
 .sidebar-nav-logo {
   height: 5.5rem;
 }
</style>