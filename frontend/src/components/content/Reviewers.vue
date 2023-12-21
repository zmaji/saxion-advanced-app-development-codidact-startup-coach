<script setup lang="ts">
  import type { ContentUser } from '@/typings/User';

  import { toast } from 'vue3-toastify';
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';

  import httpService from '@/plugins/http/httpService';
  import { IconLabel, TextButton, UserSelect } from '@/components';

  interface Props {
    contentReviewers?: ContentUser[];
  }

  const props = withDefaults(defineProps<Props>(), {
    contentReviewers: undefined
  });

  const route = useRoute();
  const addingMoreReviewers = ref(false);
  const currentReviewers = ref<ContentUser[]>([]);
  const newReviewers = ref<ContentUser[]>([]);
  const emit = defineEmits<{(event: 'update:modelValue', value: ContentUser[]): void,}>();
  
  const addReviewers = async () => {
    try {
      const reviewersAlreadyExist = newReviewers.value.some(newReviewer =>
        currentReviewers.value.some(currentReviewer =>
          currentReviewer.userID === newReviewer.userID
        )
      );
      
      if (reviewersAlreadyExist) {
        toast.warning('De geselecteerde gebruiker is al een reviewer!', {
          position: toast.POSITION.TOP_RIGHT,
        });

        return null;
      }

      const response = await httpService.postRequest<ContentUser[]>(
        `/contentUsers/${route.params.contentID}`,
        newReviewers.value,
        true
      );

      if (response && response.data) {
        for (let user of response.data) {
          currentReviewers.value.push(user);
        }
        toast.success('Content reviewers succesvol toegevoegd!', {
          position: toast.POSITION.TOP_RIGHT,
        });
        emit('update:modelValue', currentReviewers);
        addingMoreReviewers.value = false;
        newReviewers.value = [];
      }
    } catch (e) {
      toast.error(
        'Er ging iets fout met reviewers toevoegen.', {
          position: toast.POSITION.TOP_RIGHT,
        });
      console.error(e);
    }
  }

  onMounted(() => {
    currentReviewers.value = props.contentReviewers;
  });
</script>

<template>
  <div class="bg-white px-4 py-3 border rounded w-fit">
    <div
      v-for="(contentUser, key) in contentReviewers"
      :key="key"
      class="d-flex align-items-center pb-3"
    >
      <IconLabel icon="user" type="primary" display-style="secondary" />

      <span class="text-secondary">{{ contentUser.fullName }}</span>
    </div>

    <TextButton v-show="!addingMoreReviewers" @click="(addingMoreReviewers = true)" display-style="secondary">
      Toevoegen
    </TextButton>

    <UserSelect v-show="addingMoreReviewers" v-model="newReviewers" />

    <TextButton v-show="addingMoreReviewers" @click="addReviewers()" display-style="secondary">
      Opslaan
    </TextButton>
  </div>
</template>