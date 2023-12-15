<script setup lang="ts">
  import type { Label } from '@/typings/Label';
  import type { Ref } from 'vue';

  import { onMounted, ref, watch } from 'vue'
  import VueMultiselect from 'vue-multiselect'

  import httpService from '@/plugins/http/httpService';

  interface Props {
    modelValue?: Label[]
  }

  withDefaults(defineProps<Props>(), {
    modelValue: undefined
  });

  const emit = defineEmits<{(event: 'update:modelValue', value: Label[]): void,}>();

  let selectedLabels: Ref<Label[]> = ref<Label[]>([]);
  let labels: Ref<Label[]> = ref<Label[]>([]);

  const addLabel = (newLabelName: string) => {
    const newLabel = {
      labelID: '',
      name: newLabelName,
      isDefault: false
    };
    postLabel(newLabel);
    fetchLabels();
  }

  watch(selectedLabels, () => {
    emit('update:modelValue', selectedLabels.value);
  }, { deep: true });

  const postLabel = async (newLabel: Label) => {
    try {
      const response = await httpService.postRequest(
        '/labels',
        newLabel
      );

      let label: Label = response.data as Label;
      await fetchAddedLabel(label.labelID);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchLabels = async () => {
    labels.value = []
    const fetchedLabels = await httpService.getRequest<Label[]>(
      '/labels'
    )
    labels.value = fetchedLabels.data;
  }

  const fetchAddedLabel = async (labelID: string) => {
    const result = await httpService.getRequest<Label>(
      `/labels/${labelID}`
    )

    if (result) {
      const label = result.data;
      selectedLabels.value.push(label);
    }
  }

  onMounted(() => {
    fetchLabels();
  });
</script>

<template>
  <VueMultiselect
    v-model="selectedLabels"
    tag-placeholder="Voeg deze label nieuw toe"
    placeholder="Selecteer de gewenste content labels"
    label="name"
    track-by="labelID"
    class="pb-2"
    :options="labels"
    :multiple="true"
    :taggable="true"
    :close-on-select="false"
    @tag="addLabel"
  />
</template>