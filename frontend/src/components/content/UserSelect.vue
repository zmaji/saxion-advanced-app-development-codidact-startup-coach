<script setup lang="ts">
  import type { SimpleUser, User } from '@/typings/User';
  import type { Ref } from 'vue';
  
  import VueMultiselect from 'vue-multiselect'
  import { ref, onMounted } from 'vue';
  import { jwtDecode } from 'jwt-decode';

  import httpService from '@/plugins/http/httpService';
  import { useTokenStore } from '@/stores/token';

  interface Props {
    showCurrentUser?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    showCurrentUser: true,
  });

  const tokenStore = useTokenStore();
  const userToken = tokenStore.getToken;
  const currentUser = ref<User | null>(null);
  const selectedUsers: Ref<SimpleUser[]> = ref([]);
  const users: Ref<SimpleUser[]> = ref<SimpleUser[]>([]);

  if (userToken) {
    currentUser.value = jwtDecode(userToken);
  }

  const fetchUsers = async () => {
    try {
      const response = await httpService.getRequest<SimpleUser[]>('/users', true);

      if (response && response.data) {
        users.value = response.data;
      }

      if (!props.showCurrentUser && currentUser) {
        users.value = props.showCurrentUser
          ? response.data
          : response.data.filter((user) => user.userID !== currentUser.value!.userID);
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