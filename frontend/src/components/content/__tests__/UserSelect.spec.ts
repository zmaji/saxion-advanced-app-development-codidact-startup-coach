import {
describe,
it,
expect,
beforeEach
} from 'vitest';
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import UserSelect from '../UserSelect.vue'
import VueMultiselect from 'vue-multiselect'

describe('UserSelect', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders VueMultiselect component', () => {
    const wrapper = mount(UserSelect, {
      global: {
        plugins: [createPinia()],
        components: {
          VueMultiselect
        }
      }
    })

    expect(wrapper.findComponent(VueMultiselect).exists()).toBe(true)
  })

  it('VueMultiselect should have correct default props', () => {
    const wrapper = mount(UserSelect, {
      global: {
        plugins: [createPinia()],
        components: {
          VueMultiselect
        }
      }
    })

    const multiselect = wrapper.findComponent(VueMultiselect)
    expect(multiselect.props('multiple')).toBe(true)
    expect(multiselect.props('taggable')).toBe(true)
    expect(multiselect.props('closeOnSelect')).toBe(false)
  })
})
