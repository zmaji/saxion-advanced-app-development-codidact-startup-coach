import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CompanySelect from '../CompanySelect.vue'
import VueMultiselect from 'vue-multiselect'

describe('CompanySelect', () => {
  it('renders VueMultiselect component', () => {
    const wrapper = mount(CompanySelect)
    const multiselect = wrapper.findComponent(VueMultiselect)

    expect(multiselect.exists()).toBe(true)
  })

  it('VueMultiselect should have correct default props', () => {
    const wrapper = mount(CompanySelect)
    const multiselect = wrapper.findComponent(VueMultiselect)

    expect(multiselect.props('multiple')).toBe(true)
    expect(multiselect.props('taggable')).toBe(true)
    expect(multiselect.props('closeOnSelect')).toBe(false)
  })
})
