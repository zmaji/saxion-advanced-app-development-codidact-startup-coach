<script setup lang="ts">
  import type { User } from '@/typings/User';

  import { RouterLink, useRoute } from 'vue-router'
  import { computed, ref } from 'vue';
  import { jwtDecode } from 'jwt-decode';

  import { TextButton } from '@/components';
  import { useTokenStore } from '@/stores/token';
  import IconLabel from '@/components/labels/IconLabel.vue';
  
  const route = useRoute();
  const tokenStore = useTokenStore()
  const userToken = tokenStore.getToken;
  const currentUser = ref<User | null>(null);
  const userIcon = ref<string>('user');

  if (userToken) {
    currentUser.value = jwtDecode(userToken);
  }

  const showPrimaryNavMeta = computed(() => {
    return route.meta.showNavigationBars;
  });

  const dynamicDomClasses = computed(() => {
    return {
      'd-none': !showPrimaryNavMeta.value,
    };
  });

  const changeIcon = (icon: string):void => {
    userIcon.value = icon;
  }
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
            <RouterLink :to="{ name: 'content.overview' }" class="nav-link">Kennisbank</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink :to="{ name: 'knowledgeBase.overview' }" class="nav-link">categorieën</RouterLink>
          </li>
        </ul>
      </div>

      <div class="d-none d-md-flex">

        <span v-if="currentUser">
          <IconLabel
            :icon="userIcon"
            type="primary"
            display-style="secondary"
            @mouseover="changeIcon('right-from-bracket')"
            @mouseout="changeIcon('user')"
          />

          {{ currentUser.fullName }}
        </span>

        <TextButton
          v-else
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
   min-height: 5.7rem;
 }

 .nav-item {
   padding-right: 2rem;
   font-weight: 500;
 }

 .nav-item:last-child {
   padding-right: 0;
 }
</style>