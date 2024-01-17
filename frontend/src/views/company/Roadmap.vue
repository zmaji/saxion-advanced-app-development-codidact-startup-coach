<script setup lang="ts">
  import type { Content, ContentFeedback } from '@/typings/Content';
  import type { Label } from '@/typings/Label';
  import type { User } from '@/typings/User';
  import type { Ref } from 'vue';

  import { onMounted, ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { jwtDecode } from 'jwt-decode';
  import { toast } from 'vue3-toastify';

  import {
    CategoryBreadCrumb,
    CategorySidebar,
    DateLabel,
    PageTitle,
    SecondaryTitle,
    TextLabel,
    TextButton,
    TextButtonDisabled,
    IconLabel,
    Reviewers,
    ContentDocumentPreview,
    SubTitle
  } from '@/components';
  import httpService from '@/plugins/http/httpService';
  import { useTokenStore } from '@/stores/token';

  const route = useRoute();
  const loaded = ref(false);
  const content: Ref<Content | undefined> = ref<Content>();
  const tokenStore = useTokenStore()
  const currentUser = ref<User | null>(null)
  const currentUserID = ref<string | undefined>('');
  const newFeedback = ref<string>('');

  const canReview = computed(() => content.value?.contentUsers?.some(
    user => user.userID === currentUser.value?.userID)
  );

  const isOwner = computed(() => content.value?.user?.userID === currentUser.value?.userID)

  const postFeedback = async () => {
    try {
      const response = await httpService.postRequest<ContentFeedback>(
        `/feedback/${route.params.contentID}`,
        {
          feedback: newFeedback.value
        },
        true
      );

      if (response && response.data) {
        content.value?.feedback?.push(response.data);

        toast.success('Feedback succesvol geplaatst!', {
          position: toast.POSITION.TOP_RIGHT,
        });
        newFeedback.value = '';
      }
    } catch (e) {
      toast.error('Fout bij het plaatsen van feedback.', {
        position: toast.POSITION.TOP_RIGHT
      });
      console.error(e);
    }
  }

  const fetchContent = async () => {
    try {
      const response = await httpService.getRequest<Content>(`/content/${route.params.contentID}`, false);

      if (response && response.data) {
        content.value = response.data;
      }
    } catch (e) {
      console.error(e);
    } finally {
      loaded.value = true;
    }
  }

  const fetchUserData = async () => {
    try {
      const userToken = tokenStore.getToken;
      currentUser.value = jwtDecode(userToken);
      currentUserID.value = currentUser.value?.userID;

    } catch (error) {
      console.error('Error fetching current userID:', error);
    }
  };

  onMounted(() => {
    fetchContent();
    fetchUserData();
  });
</script>

<template>
  <PageTitle>Roadmap index</PageTitle>

  <SubTitle>Overzicht van roadmap</SubTitle>

  <SecondaryTitle>Secondary header</SecondaryTitle>

  <div class="row row-cols-3 g-2 g-lg-3">
    <div class="col">
      <div class="rounded p-3 shadow-sm bg-white">Row column</div>
    </div>

    <div class="col">
      <div class="rounded p-3 shadow-sm bg-white">Row column</div>
    </div>

    <div class="col">
      <div class="rounded p-3 shadow-sm bg-white">Row column</div>
    </div>

  </div>
</template>