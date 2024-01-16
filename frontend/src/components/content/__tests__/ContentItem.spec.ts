import { describe, it, expect } from 'vitest'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import ContentItem from '../ContentItem.vue'
import { IconLabel, TextLabel, DateLabel } from '@/components'

describe('ContentItem', () => {
  const mockContent = {
    contentID: '1',
    title: 'Test Content',
    labels: [{ name: 'Label 1' }, { name: 'Label 2' }, { name: 'Label 3' }],
    createdAt: new Date().toISOString()
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
