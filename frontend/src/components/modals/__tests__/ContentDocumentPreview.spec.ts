import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ContentDocumentPreview from '../ContentDocumentPreview.vue'
import { IconButton, SubTitle, TextButton } from '@/components'

describe('ContentDocumentPreview', () => {
  const mockContentID = '123'
  const mockAttachment = 'document.txt'

  it('renders different types of attachments', async () => {
    const wrapper = mount(ContentDocumentPreview, {
      props: { contentID: mockContentID, attachment: mockAttachment },
      global: {
        components: {
          IconButton,
          SubTitle,
          TextButton
        }
      }
    })

    expect(wrapper.text()).toContain(mockAttachment)

    wrapper.vm.textFileContents = 'Example text content'
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Example text content')
  })

  it('displays download button for supported file types', () => {
    const wrapper = mount(ContentDocumentPreview, {
      props: { contentID: mockContentID, attachment: 'image.jpg' },
      global: {
        components: {
          IconButton,
          SubTitle,
          TextButton
        }
      }
    })

    expect(wrapper.findComponent(IconButton).exists()).toBe(true)
    expect(wrapper.findComponent(IconButton).text()).toContain('Download')
  })
})
