import type { buttonSizes, buttonTypes } from '..'

import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import TextButtonDisabled from '../TextButtonDisabled.vue'

describe('TextButtonDisabled', () => {
  it('renders with default props', () => {
    const wrapper = shallowMount(TextButtonDisabled)
    expect(wrapper.find('button').classes()).toContain('btn')
    expect(wrapper.find('button').classes()).toContain('btn-primary')
    expect(wrapper.find('button').classes()).toContain('px-4')
    expect(wrapper.find('button').classes()).toContain('py-2')
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('renders with different types', () => {
    const types: buttonTypes[] = ['primary', 'secondary', 'info', 'success', 'warning', 'danger']
    types.forEach(type => {
      const wrapper = shallowMount(TextButtonDisabled, { props: { type } })
      expect(wrapper.find('button').classes()).toContain(`btn-${type}`)
      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })
  })

  it('renders with different display styles', () => {
    const wrapperSecondary = shallowMount(TextButtonDisabled, { props: { displayStyle: 'secondary' } })
    expect(wrapperSecondary.find('button').classes()).toContain('btn')
    expect(wrapperSecondary.find('button').classes()).toContain('text-primary')
    expect(wrapperSecondary.find('button').classes()).toContain('bg-primary-subtle')

    const wrapperTertiary = shallowMount(TextButtonDisabled, { props: { displayStyle: 'tertiary' } })
    expect(wrapperTertiary.find('button').classes()).toContain('btn')
    expect(wrapperTertiary.find('button').classes()).toContain('bg-white')
    expect(wrapperTertiary.find('button').classes()).toContain('text-primary')
  })

  it('renders with different sizes', () => {
    const sizes: buttonSizes[] = ['sm', 'lg']
    sizes.forEach(size => {
      const wrapper = shallowMount(TextButtonDisabled, { props: { size } })
      expect(wrapper.find('button').classes()).toContain(`btn-${size}`)
      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })
  })
})
