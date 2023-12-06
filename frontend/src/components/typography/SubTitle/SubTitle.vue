<script setup lang="ts">
  import type { colorTypes, marginBottomOptions, marginTopOptions } from './..';

  import { computed } from 'vue';


  interface Props {
    marginBottom?: marginBottomOptions | null;
    marginTop?: marginTopOptions | null;
    type?: colorTypes;
  }

  const props = withDefaults(defineProps<Props>(), {
    marginBottom: null,
    marginTop: null,
    type: 'secondary'
  });

  const dynamicDomClasses = computed<string>(() => {
    return `bg-${props.type}-subtle text-${props.type === 'secondary' ? 'dark' : props.type}`;
  });
</script>

<template>
  <p :class="[props.marginBottom, dynamicDomClasses]" class="d-inline-block px-3 py-2 rounded">
    <slot></slot>
  </p>
</template>