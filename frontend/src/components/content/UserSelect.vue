<script setup lang="ts">
  import type { SimpleUSer } from '@/typings/User';
  import type { Ref } from 'vue';
  
  import VueMultiselect from 'vue-multiselect'
  import { ref, onMounted } from 'vue';

  import httpService from '@/plugins/http/httpService';

  let selectedUsers: Ref<SimpleUSer[]> = ref([])
  let users: Ref<SimpleUSer[]> = ref<SimpleUSer[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await httpService.getRequest<SimpleUSer[]>('/users', true);

      if (response && response.data) {
        users.value = response.data;
      }
    } catch (e) {
      console.error(e);
    }
  }

  onMounted(() => {
    fetchUsers();
  });

</script>

<template>
  <VueMultiselect
    v-model="selectedUsers"
    tag-placeholder="Deze gebruiker bestaat niet"
    placeholder="Selecteer gebruikers om uit te nodigen"
    label="fullName"
    track-by="userID"
    class="pb-2"
    :options="users"
    :multiple="true"
    :taggable="true"
    :close-on-select="false"
  />
</template>