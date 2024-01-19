import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import CategoryCrumb from '../CategoryCrumb.vue'

describe('CategoryCrumb', () => {
  const mockCategory = {
    categoryID: '1',
    name: 'Category 1',
    subCategories: [{
      categoryID: '1-1',
      name: 'SubCategory 1-1',
      subCategories: []
    }]
  }

  it('renders category name', () => {
    const wrapper = mount(CategoryCrumb, {
      props: { category: mockCategory },
      global: {
        components: {
          RouterLink: RouterLinkStub
        },
        stubs: {
          'router-link': RouterLinkStub
        }
      }
    })

    expect(wrapper.text()).toContain(mockCategory.name)
  })

  it('renders subcategories if available', () => {
    const wrapper = mount(CategoryCrumb, {
      props: { category: mockCategory },
      global: {
        components: {
          RouterLink: RouterLinkStub
        },
        stubs: {
          'router-link': RouterLinkStub
        }
      }
    })

    expect(wrapper.findAllComponents(CategoryCrumb).length).toBeGreaterThan(0)
    expect(wrapper.text()).toContain(mockCategory.subCategories[0].name)
  })
})
