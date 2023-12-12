<script setup lang="ts">
  import type { User } from '@/typings/User';
  import type { Ref } from 'vue';
  
  import VueMultiselect from 'vue-multiselect'
  import { ref } from 'vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  import { SmallHeader } from '@/components';

  let selectedUsers: Ref<User[]> = ref([])
  let userOptions: Ref<User[]> = ref<User[]>([
    {
      userID: '1',
      company: '',
      userName: '',
      password: '',
      secret: '',
      emailAddress: '',
      fullName: 'Saied',
    },
    {
      userID: '2',
      company: '',
      userName: '',
      password: '',
      secret: '',
      emailAddress: '',
      fullName: 'Zikria',
    },
    {
      userID: '3',
      company: '',
      userName: '',
      password: '',
      secret: '',
      emailAddress: '',
      fullName: 'Maurice',
    },
    {
      userID: '4',
      company: '',
      userName: '',
      password: '',
      secret: '',
      emailAddress: '',
      fullName: 'Nils',
    },
  ]);

  const removeUser = (selectedUser: User): void => {
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
      {{user.fullName}}

      <FontAwesomeIcon icon="circle-xmark" class="ps-2 label-icon" @click="removeUser(user)"/>
    </div>
  </div>
</template>

<style scoped>
  .label-icon:hover {
    cursor: pointer;
  }
</style>
