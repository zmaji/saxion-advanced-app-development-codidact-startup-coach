import {
describe,
it,
expect,
beforeEach
} from 'vitest';
import { shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Reviewers from '../Reviewers.vue'

import { IconLabel, TextButton, UserSelect } from '@/components'

describe('Reviewers', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const mockReviewers = [
    { userID: '1', fullName: 'Reviewer 1' },
    { userID: '2', fullName: 'Reviewer 2' }
  ]

  it('renders current reviewers', () => {
    const wrapper = shallowMount(Reviewers, {
      props: { contentReviewers: mockReviewers },
      global: {
        plugins: [createPinia()],
        components: {
          IconLabel,
          TextButton,
          UserSelect
        }
      }
    })

    expect(wrapper.findAll('.d-flex.align-items-center').length).toBe(mockReviewers.length)
    expect(wrapper.text()).toContain(mockReviewers[0].fullName)
    expect(wrapper.text()).toContain(mockReviewers[1].fullName)
  })
})
