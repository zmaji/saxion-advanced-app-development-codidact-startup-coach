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
    const btnType = props.type || 'primary';
    const btnSize = props.size ? `btn-${props.size}` : '';
  
    switch (props.displayStyle) {
    case 'secondary':
      return `btn text-${btnType} bg-${btnType}-subtle ${btnSize}`;
    case 'tertiary':
      return `btn bg-white text-${btnType} ${btnSize}`;
    default:
      return `btn btn-${btnType} ${btnSize}`;
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