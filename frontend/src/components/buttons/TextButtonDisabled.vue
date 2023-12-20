<script setup lang="ts">
  import type { buttonTypes, buttonSizes, buttonDisplayStyles } from '.';

  import { computed } from 'vue';

  interface Props {
    size?: buttonSizes;
    type?: buttonTypes;
    displayStyle?: buttonDisplayStyles;
  }

  const props = withDefaults(defineProps<Props>(), {
    size: undefined,
    type: 'primary',
    displayStyle: 'primary',
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
    type="button"
    :class="dynamicDomClasses"
    class="px-4 py-2"
    disabled
  >
    <slot></slot>
  </button>
</template>