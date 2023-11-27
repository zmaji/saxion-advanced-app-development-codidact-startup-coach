<script setup lang="ts">
  import type { RouteLocationRaw } from 'vue-router';
  import type { buttonTypes, buttonSizes } from '.';

  import { computed } from 'vue';

  interface Props {
    size?: buttonSizes;
    renderAs?: 'button' | 'a';
    buttonType?: 'submit' | 'button' | null;
    type?: buttonTypes;
    to?: RouteLocationRaw;
  }

  const props = withDefaults(defineProps<Props>(), {
    size: undefined,
    renderAs: 'button',
    buttonType: 'submit',
    type: 'info',
    to: '#',
  });

  const dynamicDomClasses = computed<string[]>(() => {
    return ['btn btn-' + (props.type ? props.type : 'primary'), props.size ? 'btn-' + props.size : ''];
  });
</script>

<template>
  <button
    v-if="props.renderAs === 'button'"
    :type="buttonType ? buttonType : 'submit'"
    :class="dynamicDomClasses"
  >
    <slot></slot>
  </button>

  <RouterLink
    v-else
    :class="dynamicDomClasses"
    :to="to"
  >
    <slot></slot>
  </RouterLink>
</template>