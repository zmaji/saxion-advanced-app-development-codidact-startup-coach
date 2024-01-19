import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import SmallHeader from '../SmallHeader.vue'

describe('SmallHeader', () => {
  it('renders slot content', () => {
    const wrapper = shallowMount(SmallHeader, {
      slots: {
        default: 'Small Header Text'
      }
    })

    expect(wrapper.text()).toContain('Small Header Text')
  })

  it('applies default padding classes', () => {
    const wrapper = shallowMount(SmallHeader, {
      slots: {
        default: 'Small Header Text'
      }
    })

    expect(wrapper.classes()).toContain('pb-2')
    expect(wrapper.classes()).toContain('pt-2')
  })

  it('applies padding classes based on props', () => {
    const wrapper = shallowMount(SmallHeader, {
      props: {
        paddingBottom: 'pb-3',
        paddingTop: 'pt-3'
      },
      slots: {
        default: 'Small Header Text'
      }
    })

    expect(wrapper.classes()).toContain('pb-3')
    expect(wrapper.classes()).toContain('pt-3')
  })
})
