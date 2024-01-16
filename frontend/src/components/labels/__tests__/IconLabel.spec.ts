import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import IconLabel from '../IconLabel.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

describe('IconLabel', () => {
  it('renders icon', () => {
    const wrapper = shallowMount(IconLabel, {
      props: { icon: 'check' },
      global: {
        components: {
          FontAwesomeIcon
        }
      }
    })

    expect(wrapper.findComponent(FontAwesomeIcon).exists()).toBe(true)
  })

  it('applies dynamic classes based on props', () => {
    const wrapper = shallowMount(IconLabel, {
      props: { icon: 'check', type: 'secondary', displayStyle: 'secondary', renderAsCircle: false },
      global: {
        components: {
          FontAwesomeIcon
        }
      }
    })

    expect(wrapper.classes()).toContain('text-secondary')
    expect(wrapper.classes()).toContain('bg-secondary-subtle')
    expect(wrapper.classes()).toContain('rounded-pill')
  })
})
