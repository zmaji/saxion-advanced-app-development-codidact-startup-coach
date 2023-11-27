<script setup lang="ts">
  import { computed } from 'vue';
  import { RouterLink, useRoute } from 'vue-router'

  import { AppButton } from '@/components';

  const route = useRoute();

  const showPrimaryNavMeta = computed(() => {
    return route.meta.showPrimaryNav;
  });

  const dynamicDomClasses = computed(() => {
    const showPrimaryNav = showPrimaryNavMeta.value;

    return {
      'd-none': showPrimaryNav === false
    };
  });
</script>

<template>
  <nav :class="dynamicDomClasses" class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">Codidact Startup Coach</RouterLink>

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

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link">About</RouterLink>
          </li>
        </ul>
      </div>

      <div class="d-none d-md-flex">
        <AppButton
          class="me-2"
          type="primary"
          renderAs="a"
          :to="{ name: 'login'}"
        >
          Login
        </AppButton>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>