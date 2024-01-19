import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import IconButton from '../IconButton.vue'

describe('IconButton', () => {
  it('renders with default props', () => {
    const wrapper = shallowMount(IconButton, { props: { icon: 'home' } })
    expect(wrapper.html()).toContain('class="btn btn-primary')
  })

  it('renders as a button with given buttonType', () => {
    const wrapper = shallowMount(IconButton, 
      { 
        props: { renderAs: 'button', buttonType: 'submit', icon: 'submit-icon' } 
      })
    expect(wrapper.find('button').attributes('type')).toBe('submit')
  })

  it('renders as a link with given to property', () => {
    const toRoute = '/some-route'
    const wrapper = shallowMount(IconButton, { props: { renderAs: 'a', to: toRoute, icon: 'link-icon' } })
    expect(wrapper.find('routerlink').attributes('to')).toBe(toRoute)
  })

  it('renders with different display styles', () => {
    const wrapperPrimary = shallowMount(IconButton, { props: { displayStyle: 'primary', icon: 'primary-icon' } })
    expect(wrapperPrimary.find('routerlink').attributes('class')).toContain('btn btn-primary')

    const wrapperSecondary = shallowMount(IconButton, { props: { displayStyle: 'secondary', icon: 'secondary-icon' } })
    expect(wrapperSecondary.find('routerlink').attributes('class')).toContain('btn')
    expect(wrapperSecondary.find('routerlink').attributes('class')).toContain('text-primary')
    expect(wrapperSecondary.find('routerlink').attributes('class')).toContain('bg-primary-subtle')

    const wrapperTertiary = shallowMount(IconButton, { props: { displayStyle: 'tertiary', icon: 'tertiary-icon' } })
    expect(wrapperTertiary.find('routerlink').attributes('class')).toContain('btn bg-white text-primary')
  })

  it('renders with different sizes', () => {
    const sizes = ['small', 'medium', 'large']
    sizes.forEach(size => {
      const wrapper = shallowMount(IconButton, { props: { size: size, icon: `${size}-icon` } })
      expect(wrapper.html()).toContain(`btn-${size}`)
    })
  })

  it('renders as circle when renderAsCircle is true', () => {
    const wrapper = shallowMount(IconButton, { props: { renderAsCircle: true, icon: 'circle-icon' } })
    expect(wrapper.html()).toContain('btn-circle')
  })
})
