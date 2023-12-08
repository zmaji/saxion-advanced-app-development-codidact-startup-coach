<script setup lang="ts">
  import type { ContentUser } from '@/typings/user';

  import VueMultiselect from 'vue-multiselect'
  import { Ref, ref } from 'vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  import { SmallHeader } from '@/components';

  let selectedUsers: Ref<ContentUser[]> = ref([])
  let userOptions: Ref<ContentUser[]> = ref([
    {
      userID: 1,
      name: 'Saied',
    },
    {
      userID: 2,
      name: 'Zikria',
    },
    {
      userID: 3,
      name: 'Nils',
    },
    {
      userID: 4,
      name: 'Maurice',
    },
  ]);

  const removeUser = (selectedUser: ContentUser): void => {
    const index = selectedUsers.value.findIndex(user => user.userID === selectedUser.userID);

    if (index !== -1) {
      selectedUsers.value.splice(index, 1);
    }
  }

</script>

<template>
  <VueMultiselect
    v-model="selectedUsers"
    tag-placeholder="Deze gebruiker bestaat niet"
    placeholder="Selecteer gebruikers om uit te nodigen"
    label="name"
    track-by="userID"
    class="pb-2"
    :options="userOptions"
    :multiple="true"
    :taggable="true"
    :close-on-select="false"
  />

  <SmallHeader>Geselecteerde gebruikers</SmallHeader>

  <div class="d-flex flex-direction-row flex-wrap">
    <div
      v-for="(user,key) in selectedUsers"
      :key="key"
      class="bg-secondary text-white px-3 py-1 rounded-pill me-2 mb-2"
    >
      {{user.name}}

      <FontAwesomeIcon icon="circle-xmark" class="ps-2 label-icon" @click="removeUser(user)"/>
    </div>
  </div>
</template>

<style scoped>
  .label-icon:hover {
    cursor: pointer;
  }
</style>
