import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import TextButton from '../TextButton.vue'

describe('TextButton', () => {
  it('renders as a button with default props', () => {
    const wrapper = shallowMount(TextButton, { props: { icon: 'home' } })
    expect(wrapper.find('routerlink').exists()).toBe(true)
    expect(wrapper.find('routerlink').attributes('class')).toContain('btn btn-primary')
  })

  it('renders as a link when renderAs is set to "a"', () => {
    const wrapper = shallowMount(TextButton, { props: { renderAs: 'a', icon: 'link', to: '/' } })
    expect(wrapper.find('routerlink').exists()).toBe(true)
    expect(wrapper.find('routerlink').attributes('class')).toContain('btn btn-primary')
    expect(wrapper.find('routerlink').attributes('to')).toBe('/')
  })

  it('applies the correct size class', () => {
    const wrapper = shallowMount(TextButton, { props: { size: 'large', icon: 'large-icon' } })
    expect(wrapper.attributes('class')).toContain('btn-large')
  })

  it('changes style based on displayStyle prop', () => {
    const wrapperSecondary = shallowMount(TextButton, { props: { displayStyle: 'secondary', icon: 'secondary-icon' } })
    expect(wrapperSecondary.attributes('class')).toContain('btn')
    expect(wrapperSecondary.attributes('class')).toContain('text-primary')
    expect(wrapperSecondary.attributes('class')).toContain('bg-primary-subtle')

    const wrapperTertiary = shallowMount(TextButton, { props: { displayStyle: 'tertiary', icon: 'tertiary-icon' } })
    expect(wrapperTertiary.attributes('class')).toContain('btn')
    expect(wrapperTertiary.attributes('class')).toContain('bg-white')
    expect(wrapperTertiary.attributes('class')).toContain('text-primary')
})

  it('renders as circle when renderAsCircle is true', () => {
    const wrapper = shallowMount(TextButton, { props: { renderAsCircle: true, icon: 'circle-icon' } })
    expect(wrapper.attributes('icon')).toContain('circle-icon')
  })
})
