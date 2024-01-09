<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import axios from 'axios';

  import { IconButton, SubTitle, TextButton } from '@/components';

  interface Props {
    contentID: string;
    attachment: string;
  }

  const textFileContents = ref('');
  const props = withDefaults(defineProps<Props>(), {});

  const attachmentType = computed(() => {
    if (!props.attachment) return null;

    const ext = props.attachment?.split('.').pop()?.toLowerCase() ?? '';

    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return 'image';
    if (['pdf'].includes(ext)) return 'pdf';
    if (['txt'].includes(ext)) return 'txt';

    return 'other';
  });

  const attachmentUrl = computed(() => {
    const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;

    return `${baseUrl}/${props.contentID}_${props.attachment}`;
  });

  const downloadAttachment = async (attachmentLink: string, fileName: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get(attachmentLink, { responseType: 'blob' });
      const blob = new Blob([response.data]);
      const link = document.createElement('a');

      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      throw error;
    }
  }

  const loadTxtFile = async () => {
    try {
      const response = await axios.get(attachmentUrl.value);

      if (response && response.data) {
        textFileContents.value = response.data;
      }
    } catch (e) {
      console.error(e);
    }
  }

  onMounted(() => {
    if (attachmentType.value === 'txt') {
      loadTxtFile();
    }
  });
</script>

<template>
  <div class="modal fade" id="document-preview-modal" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Weergave van {{ attachment }}</h5>

          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body px-4 py-3">
          <div v-if="attachmentType === 'other'">
            <SubTitle class="d-block">
              Het weergeven van dit bestandstype wordt momenteel niet ondersteund.
              Als u dit bestand alsnog wilt inzien kunt u deze downloaden met de knop hieronder.
            </SubTitle>

            <IconButton
              icon="cloud-arrow-down"
              :href="attachmentUrl"
              target="_blank"
              display-style="secondary"
            >
              Download {{ attachment }}
            </IconButton>
          </div>

          <p v-if="attachmentType === 'txt'">
            {{ textFileContents }}
          </p>

          <img v-else-if="attachmentType === 'image'" :src="attachmentUrl" alt="Afbeelding" class="w-100"/>

          <iframe v-else-if="attachmentType === 'pdf'" :src="attachmentUrl" class="frame-ratio"/>
        </div>

        <div class="modal-footer">
          <IconButton
            v-if="attachmentType !== 'other'"
            display-style="secondary"
            icon="cloud-arrow-down"
            class="d-inline-block"
            :href="attachmentUrl"
            @click.prevent="downloadAttachment(attachmentUrl, attachment)"
          >
            Download {{ attachment }}
          </IconButton>
          <TextButton render-as="button" type="secondary" data-bs-dismiss="modal">Sluiten</TextButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .modal-body {
    min-height: 80vh;
  }

  .frame-ratio {
    width: 100%;
    height: 100%;
    aspect-ratio: 16/9;
  }
</style>