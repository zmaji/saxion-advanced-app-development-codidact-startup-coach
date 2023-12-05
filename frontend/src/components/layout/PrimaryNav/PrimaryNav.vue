<script setup lang="ts">
  import { RouterLink, useRoute } from 'vue-router'
  import { computed } from 'vue';

  import { TextButton } from '@/components';

  const route = useRoute();

  const showPrimaryNavMeta = computed(() => {
    return route.meta.showNavigationBars;
  });

  const dynamicDomClasses = computed(() => {
    return {
      'd-none': !showPrimaryNavMeta.value,
    };
  });
</script>

<template>
  <nav :class="dynamicDomClasses" class="navbar navbar-expand-lg bg-white shadow-sm">
    <div class="container py-3">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end pe-5" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Kennisbank</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink to="/about" class="nav-link">Over</RouterLink>
          </li>
        </ul>
      </div>

      <div class="d-none d-md-flex">
        <TextButton
          class="me-2"
          type="primary"
          renderAs="a"
          :to="{ name: 'login'}"
        >
          Login
        </TextButton>
      </div>
    </div>
  </nav>
</template>

<style scoped>
 .navbar {
   height: 5.5rem;
 }

 .nav-item {
   padding-right: 2rem;
   font-weight: 500;
 }

 .nav-item:last-child {
   padding-right: 0;
 }
</style>