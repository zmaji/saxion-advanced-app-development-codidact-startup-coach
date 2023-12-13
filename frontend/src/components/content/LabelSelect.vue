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

  let selectedLabels: Ref<Label[]> = ref([])
  let labelOptions: Ref<Label[]> = ref<Label[]>([
    {
      labelID: '1',
      name: 'Sjabloon',
      isDefault: false
    },
    {
      labelID: '2',
      name: 'Document',
      isDefault: false
    },
    {
      labelID: '3',
      name: 'Pitch',
      isDefault: false
    },
    {
      labelID: '4',
      name: 'Presentatie',
      isDefault: false
    },
  ]);

  const addLabel = (newLabel: string) => {
    // axios with httpservice request to save new label, also check if it already exists
    const result = {
      labelID: '',
      name: newLabel,
      isDefault: false
    };

    labelOptions.value.push(result);
    selectedLabels.value.push(result);
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

  const fetchLabels = async () => {
    labelOptions.value = []
    const fetchedLabels = await httpService.getRequest<Label[]>(
      '/labels'
    )
    labelOptions.value = fetchedLabels.data;
    console.log('fetched labels', fetchedLabels.data);
    console.log('current labels', labelOptions.value);
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