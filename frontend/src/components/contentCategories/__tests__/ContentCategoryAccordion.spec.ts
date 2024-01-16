import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ContentCategoryAccordion from '../ContentCategoryAccordion.vue'
import { ContentCategory } from '@/components'

describe('ContentCategoryAccordion', () => {
  const mockCategories = [
    { categoryID: '1', name: 'Category 1', subCategories: [] },
    { categoryID: '2', name: 'Category 2', subCategories: [] }
  ]

  it('renders all categories', () => {
    const wrapper = mount(ContentCategoryAccordion, {
      props: { categories: mockCategories },
      global: {
        components: {
          ContentCategory
        }
      }
    })

    expect(wrapper.findAllComponents(ContentCategory).length).toBe(mockCategories.length)
  })

  it('renders category names', () => {
    const wrapper = mount(ContentCategoryAccordion, {
      props: { categories: mockCategories },
      global: {
        components: {
          ContentCategory
        }
      }
    })

    mockCategories.forEach(category => {
      expect(wrapper.text()).toContain(category.name)
    })
  })
})
