import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import SecondaryTitle from '../SecondaryTitle.vue'

describe('SecondaryTitle', () => {
  it('renders slot content', () => {
    const wrapper = shallowMount(SecondaryTitle, {
      slots: {
        default: 'Secondary Title'
      }
    })

    expect(wrapper.text()).toContain('Secondary Title')
  })

  it('applies default padding top class', () => {
    const wrapper = shallowMount(SecondaryTitle, {
      slots: {
        default: 'Secondary Title'
      }
    })

    expect(wrapper.classes()).toContain('pt-2')
  })

  it('applies padding classes based on props', () => {
    const wrapper = shallowMount(SecondaryTitle, {
      props: {
        paddingBottom: 'pb-4',
        paddingTop: 'pt-4'
      },
      slots: {
        default: 'Secondary Title'
      }
    })

    expect(wrapper.classes()).toContain('pb-4')
    expect(wrapper.classes()).toContain('pt-4')
  })
})
