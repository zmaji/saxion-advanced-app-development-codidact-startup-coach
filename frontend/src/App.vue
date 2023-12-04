<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router';
  import {
    computed,
    onMounted,
    ref,
    watch
  } from 'vue';

  import { PrimaryNav, SidebarNav } from '@/components';

  const router = useRouter();
  const route = useRoute();
  const showMainElement = ref(false);
  const loaded = ref(false);

  const showNavigationBars = computed(() => {
    return route?.meta?.showNavigationBars && loaded.value;
  });

  onMounted(async () => {
    router.beforeEach((to, from, next) => {
      const appName = import.meta.env.VITE_APP_NAME as string;

      document.title = appName ? `${appName} ~ ${to.meta.title}` : `${to.meta.title}`;

      next();
    });

    loaded.value = true;
  });

  watch(loaded, () => {
    showMainElement.value = loaded.value;
  });
</script>

<template>
  <div :class="showNavigationBars ? 'd-flex flex-row' : null">
    <SidebarNav v-if="showNavigationBars"/>

    <div :class="showNavigationBars ? 'flex-grow-1 bg-light' : null">
      <PrimaryNav v-if="showNavigationBars"/>

      <main
        v-show="showMainElement"
        :class="showNavigationBars ? 'container py-5 mt-3' : null"
      >
        <RouterView v-if="showMainElement"/>
      </main>
    </div>
  </div>
</template>