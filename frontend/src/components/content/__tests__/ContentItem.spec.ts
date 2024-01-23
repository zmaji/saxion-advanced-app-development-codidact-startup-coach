import { describe, it, expect } from 'vitest'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import ContentItem from '../ContentItem.vue'

import { IconLabel, TextLabel, DateLabel } from '@/components'
import type { Content } from '@/typings/Content'
import { randomUUID } from 'crypto'

describe('ContentItem', () => {
  const mockContent: Content = {
    contentID: '1',
    title: 'Test Content',
    labels: [
      { name: 'Label 1', labelID: randomUUID(), isDefault: false }, 
      { name: 'Label 2', labelID: randomUUID(), isDefault: false }, 
      { name: 'Label 3', labelID: randomUUID(), isDefault: false }
    ],
    createdAt: new Date().toISOString(),
    accessLevel: 'public',
    description: 'Test Description',
    category: 'Test Category'
  }

  it('renders correctly with content prop', () => {
    const wrapper = shallowMount(ContentItem, {
      props: { content: mockContent },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        },
        components: {
          IconLabel,
          TextLabel,
          DateLabel
        }
      }
    })

    expect(wrapper.text()).toContain(mockContent.title)
    expect(wrapper.findAllComponents(TextLabel).length).toBeGreaterThanOrEqual(mockContent.labels.length)
    expect(wrapper.findComponent(DateLabel).exists()).toBe(true)
    expect(wrapper.findComponent(IconLabel).exists()).toBe(true)
  })

  it('renders correct number of labels', () => {
    const wrapper = shallowMount(ContentItem, {
      props: { content: mockContent },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        },
        components: {
          IconLabel,
          TextLabel,
          DateLabel
        }
      }
    })

    const labels = wrapper.findAllComponents(TextLabel)
    expect(labels.length).toBe(mockContent.labels.length)
  })
})
