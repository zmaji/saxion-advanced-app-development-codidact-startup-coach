<script setup lang="ts">
  import type { labelTypes, labelDisplayStyles } from '.';

  import { computed, useSlots } from 'vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  interface Props {
    icon: string;
    type?: labelTypes;
    displayStyle?: labelDisplayStyles;
    renderAsCircle?: boolean,
    size?: string,
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'primary',
    displayStyle: 'primary',
    renderAsCircle: true,
    size: 'sm'
  });

  const slots = useSlots();
  const hasDefaultSlot = !!slots['default'];

  const dynamicDomClasses = computed<string>(() => {
    switch (props.displayStyle) {
    case 'secondary':
      return `
        text-${(props.type ? props.type : 'primary')}
        bg-${(props.type ? props.type : 'primary')}-subtle
        ${props.renderAsCircle && !hasDefaultSlot ? 'label-circle' : 'rounded-pill'}
        ${props.size === 'sm' ? 'px-3 py-1' : 'px-4 py-2'}
       `;
    case 'tertiary':
      return `
        bg-white text-${(props.type ? props.type : 'primary')}
        ${props.renderAsCircle && !hasDefaultSlot ? 'label-circle' : 'rounded-pill'}
        ${props.size === 'sm' ? 'px-3 py-1' : 'px-4 py-2'}
       `;
    default:
      // primary
      return `
        bg-${(props.type ? props.type : 'primary')}
        text-white'
        ${props.renderAsCircle && !hasDefaultSlot ? 'label-circle' : 'rounded-pill'}
        ${props.size === 'sm' ? 'px-3 py-1' : 'px-4 py-2'}
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