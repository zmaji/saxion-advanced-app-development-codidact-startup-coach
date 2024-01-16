import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import SubTitle from '../SubTitle.vue'

describe('SubTitle', () => {
  it('renders slot content', () => {
    const wrapper = shallowMount(SubTitle, {
      slots: {
        default: 'Sub Title Text'
      }
    })

    expect(wrapper.text()).toContain('Sub Title Text')
  })

  it('applies dynamic classes based on props', () => {
    const wrapper = shallowMount(SubTitle, {
      props: {
        marginBottom: 'mb-3',
        marginTop: 'mt-3',
        type: 'primary'
      },
      slots: {
        default: 'Sub Title Text'
      }
    })

    expect(wrapper.classes()).toContain('mb-3')
    expect(wrapper.classes()).toContain('mt-3')
    expect(wrapper.classes()).toContain('bg-primary-subtle')
    expect(wrapper.classes()).toContain('text-primary')
  })

  it('applies default type class', () => {
    const wrapper = shallowMount(SubTitle, {
      slots: {
        default: 'Sub Title Text'
      }
    })

    expect(wrapper.classes()).toContain('bg-secondary-subtle')
    expect(wrapper.classes()).toContain('text-dark')
  })
})
