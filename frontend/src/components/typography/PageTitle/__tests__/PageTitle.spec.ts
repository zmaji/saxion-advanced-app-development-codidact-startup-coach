import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import PageTitle from '../PageTitle.vue'

describe('PageTitle', () => {
  it('renders slot content', () => {
    const wrapper = shallowMount(PageTitle, {
      slots: {
        default: 'Page Title'
      }
    })

    expect(wrapper.text()).toContain('Page Title')
  })

  it('applies padding classes based on props', () => {
    const wrapper = shallowMount(PageTitle, {
      props: {
        paddingBottom: 'pb-4',
        paddingTop: 'pt-4'
      },
      slots: {
        default: 'Page Title'
      }
    })

    expect(wrapper.classes()).toContain('pb-4')
    expect(wrapper.classes()).toContain('pt-4')
  })
})
