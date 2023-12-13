<script setup lang="ts">
  import type { Label } from '@/typings/Label';
  import type { Ref } from 'vue';

  import { onMounted, ref, watch } from 'vue'
  import VueMultiselect from 'vue-multiselect'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  import httpService from '@/plugins/http/httpService';
  import { SmallHeader } from '@/components';

  interface Props {
    modelValue?: Label[]
  }

  withDefaults(defineProps<Props>(), {
    modelValue: undefined
  });

  const emit = defineEmits<{(event: 'update:updateLabels', value: Label[]): void,}>();

  let selectedLabels: Ref<Label[]> = ref<Label[]>([]);
  let labelOptions: Ref<Label[]> = ref<Label[]>([]);
  let newLabelID : Ref<string> = ref('');

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
    emit('update:updateLabels', selectedLabels.value);
  }, { deep: true });

  const removeLabel = (selectedLabel: Label): void => {
    const index = selectedLabels.value.findIndex(label => label.labelID === selectedLabel.labelID);

    if (index !== -1) {
      selectedLabels.value.splice(index, 1);
    }
  };

  const postLabel = async (newLabel: Label) => {
    try {
      const response = await httpService.postRequest(
        '/labels',
        newLabel
      );

      let label: Label = response.data as Label;
      newLabelID.value = label.labelID;
      fetchAddedlabel();
    } catch (error) {
      console.log(error);
    }
  }

  const fetchLabels = async () => {
    labelOptions.value = []
    const fetchedLabels = await httpService.getRequest<Label[]>(
      '/labels'
    )
    labelOptions.value = fetchedLabels.data;
  }

  const fetchAddedlabel = async () => {
    labelOptions.value = []
    const result = await httpService.getRequest<Label>(
      `/labels/${newLabelID.value}`
    )

    if (result) {
      const label = result.data;
      selectedLabels.value.push(label);
    }
  }

  onMounted(fetchLabels)

</script>

<template>
  <VueMultiselect
    v-model="selectedLabels"
    tag-placeholder="Voeg deze label nieuw toe"
    placeholder="Selecteer de gewenste content labels"
    label="name"
    track-by="labelID"
    class="pb-2"
    :options="labelOptions"
    :multiple="true"
    :taggable="true"
    :close-on-select="false"
    @tag="addLabel"
  />

  <SmallHeader>Geselecteerde labels</SmallHeader>

  <div class="d-flex flex-direction-row flex-wrap">
    <div
      v-for="(label,key) in selectedLabels"
      :key="key"
      class="bg-secondary text-white px-3 py-1 rounded-pill me-2 mb-2"
    >
      {{label.name}}

      <FontAwesomeIcon icon="circle-xmark" class="ps-2 label-icon" @click="removeLabel(label)"/>
    </div>
  </div>
</template>

<style scoped>
  .label-icon:hover {
    cursor: pointer;
  }
</style>