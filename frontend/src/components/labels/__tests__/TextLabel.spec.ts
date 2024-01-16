import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import TextLabel from '../TextLabel.vue'

describe('TextLabel', () => {
  it('renders with default type', () => {
    const wrapper = shallowMount(TextLabel, {
      slots: {
        default: 'Test Label'
      }
    })

    expect(wrapper.classes()).toContain('bg-secondary-subtle')
    expect(wrapper.text()).toContain('Test Label')
  })

  it('applies type class based on props', () => {
    const wrapper = shallowMount(TextLabel, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'Primary Label'
      }
    })

    expect(wrapper.classes()).toContain('bg-primary')
    expect(wrapper.text()).toContain('Primary Label')
  })
})
