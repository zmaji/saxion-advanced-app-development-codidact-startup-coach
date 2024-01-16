import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import DateLabel from '../DateLabel.vue'
import IconLabel from '@/components/labels/IconLabel.vue'

describe('DateLabel', () => {
  const mockDate = '2022-01-01'

  it('renders formatted date', () => {
    const wrapper = shallowMount(DateLabel, {
      props: { date: mockDate },
      global: {
        components: {
          IconLabel
        }
      }
    })

    expect(wrapper.text()).toContain('1 januari 2022')
  })

  it('renders icon label', () => {
    const wrapper = shallowMount(DateLabel, {
      props: { date: mockDate },
      global: {
        components: {
          IconLabel
        }
      }
    })

    expect(wrapper.findComponent(IconLabel).exists()).toBe(true)
  })
})
