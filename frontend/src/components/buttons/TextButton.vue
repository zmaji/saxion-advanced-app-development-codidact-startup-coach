<script setup lang="ts">
  import type { RouteLocationRaw } from 'vue-router';
  import type { buttonTypes, buttonSizes, buttonDisplayStyles } from '.';

  import { computed } from 'vue';

  interface Props {
    size?: buttonSizes;
    renderAs?: 'button' | 'a';
    buttonType?: 'submit' | 'button' | null;
    type?: buttonTypes;
    displayStyle?: buttonDisplayStyles;
    to?: RouteLocationRaw;
  }

  const props = withDefaults(defineProps<Props>(), {
    size: undefined,
    renderAs: 'a',
    buttonType: 'button',
    type: 'primary',
    displayStyle: 'primary',
    to: '#',
  });

  const dynamicDomClasses = computed<string>(() => {
    switch (props.displayStyle) {
    case 'secondary':
      return `
        btn text-${(props.type ? props.type : 'primary')}
        bg-${(props.type ? props.type : 'primary')}-subtle
        ${props.size ? 'btn-' + props.size : ''}
       `;
    case 'tertiary':
      return `
        btn bg-white text-${(props.type ? props.type : 'primary')}
        ${props.size ? 'btn-' + props.size : ''}
       `;
    default:
      return `
        btn btn-${(props.type ? props.type : 'primary')}
        ${props.size ? 'btn-' + props.size : ''}
       `;
    }
  });
</script>

<template>
  <button
    v-if="props.renderAs === 'button'"
    :type="buttonType ? buttonType : 'submit'"
    :class="dynamicDomClasses"
     class="px-4 py-2"
  >
    <slot></slot>
  </button>

  <RouterLink
    v-else
    :class="dynamicDomClasses"
    class="px-4 py-2"
    :to="to"
  >
    <slot></slot>
  </RouterLink>
</template>