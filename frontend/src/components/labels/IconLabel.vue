<script setup lang="ts">
  import type { labelTypes, labelDisplayStyles } from '.';

  import { computed, useSlots } from 'vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  interface Props {
    icon: string;
    type?: labelTypes;
    displayStyle?: labelDisplayStyles;
    renderAsCircle?: boolean,
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'primary',
    displayStyle: 'primary',
    renderAsCircle: true,
  });

  const slots = useSlots();
  const hasDefaultSlot = !!slots['default'];

  const dynamicDomClasses = computed<string>(() => {
    switch (props.displayStyle) {
    case 'secondary':
      return `
        text-${(props.type ? props.type : 'primary')}
        bg-${(props.type ? props.type : 'primary')}-subtle
        ${props.renderAsCircle && !hasDefaultSlot ? 'label-circle' : 'px-3 py-1 rounded-pill'}
       `;
    case 'tertiary':
      return `
        bg-white text-${(props.type ? props.type : 'primary')}
        ${props.renderAsCircle && !hasDefaultSlot ? 'label-circle' : 'px-3 py-1 rounded-pill'}
       `;
    default:
      // primary
      return `
        bg-${(props.type ? props.type : 'primary')}
        text-white'
        ${props.renderAsCircle && !hasDefaultSlot ? 'label-circle' : 'px-3 py-1 rounded-pill'}
       `;
    }
  });
</script>

<template>
  <span
    :class="dynamicDomClasses"
    class="me-2 fw-medium"
  >
    <font-awesome-icon :icon="icon" :class="hasDefaultSlot ? 'me-2' : null"/>

    <slot></slot>
  </span>
</template>