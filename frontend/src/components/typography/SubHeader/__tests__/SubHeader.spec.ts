import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import SubHeader from '../SubHeader.vue'

describe('SubHeader', () => {
  it('renders slot content', () => {
    const wrapper = shallowMount(SubHeader, {
      slots: {
        default: 'Sub Header Text'
      }
    })

    expect(wrapper.text()).toContain('Sub Header Text')
  })

  it('applies default padding top class', () => {
    const wrapper = shallowMount(SubHeader, {
      slots: {
        default: 'Sub Header Text'
      }
    })

    expect(wrapper.classes()).toContain('pt-2')
  })

  it('applies padding classes based on props', () => {
    const wrapper = shallowMount(SubHeader, {
      props: {
        paddingBottom: 'pb-4',
        paddingTop: 'pt-4'
      },
      slots: {
        default: 'Sub Header Text'
      }
    })

    expect(wrapper.classes()).toContain('pb-4')
    expect(wrapper.classes()).toContain('pt-4')
  })
})
