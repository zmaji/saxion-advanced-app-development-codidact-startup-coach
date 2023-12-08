<script setup lang="ts" type="text/javascript">
  import VueMultiselect from 'vue-multiselect'

  let taggingSelected: any = []
  let taggingOptions = [
    { name: 'Vue.js', code: 'vu' },
    { name: 'Javascript', code: 'js' },
    { name: 'Open Source', code: 'os' }
  ]

  function addTag (newTag: any) {
    const tag = {
      name: newTag,
      code: newTag.substring(0, 2)
    }
    taggingOptions.push(tag)
    taggingSelected.push(tag)
  }

</script>

<template>

    <VueMultiselect
      class="form-select"
      update:modelValue
      v-model="taggingSelected"
      :options="taggingOptions"
      :multiple="true"
      :taggable="true"
      label="name"
      track-by="code"
      @tag="addTag"
      placeholder="Zoek of voeg een lebel toe"
      >
    </VueMultiselect>
            <!-- <select class="form-select" size="5" id="content-label" multiple>
            <option class="pb-2" value="" selected>Selecteer één of meer labels</option>

            <option class="pb-2" value="1">
                           Afspraken
            </option>

            <option class="pb-2" value="2">Interview</option>
            <option class="pb-2" value="3">Pitch</option>
            <option class="pb-2" value="4">Starter</option>
            <option class="pb-2" value="5">Start-up</option>
            <option class="pb-2" value="6">Scale-up</option>
            <option class="pb-2" value="7">Vervolg Afspraken</option>
          </select>  -->

</template>

<style scoped src=vue-multiselect/dist/vue-multiselect.css>

</style>
