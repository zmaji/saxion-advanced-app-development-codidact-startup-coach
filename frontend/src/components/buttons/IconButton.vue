<script setup lang="ts">
  import type { RouteLocationRaw } from 'vue-router';
  import type { buttonTypes, buttonSizes, buttonDisplayStyles } from '.';

  import { computed, useSlots } from "vue";
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  interface Props {
    size?: buttonSizes;
    renderAs?: 'button' | 'a';
    buttonType?: 'submit' | 'button' | null;
    icon: string;
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

  const slots = useSlots();
  const hasDefualtSlot = !!slots['default'];

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
      // primary
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
    class="px-3"
    :class="dynamicDomClasses"
  >
    <font-awesome-icon :icon="icon" :class="hasDefualtSlot ? 'me-2' : null"/>

    <slot></slot>
  </button>

  <RouterLink
    v-else
    :class="dynamicDomClasses"
    class="px-3"
    :to="to"
  >
    <font-awesome-icon :icon="icon" :class="hasDefualtSlot ? 'me-1' : null"/>

    <slot></slot>
  </RouterLink>
</template>