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
  <div v-if="loaded && content">
    <PageTitle>{{ content.title }}</PageTitle>

    <div class="d-flex flex-row flex-wrap align-items-center pb-3">
      <CategoryBreadCrumb :categoryID="content.category"/>
    </div>

    <div class="d-flex flex-row flex-wrap justify-content-start pb-2">
      <div class="d-flex align-items-center pe-4">
        <IconLabel icon="user" type="primary" display-style="secondary" />

        <span class="text-secondary">{{ content.user?.fullName }}</span>
      </div>

      <DateLabel :date="content.createdAt" class="pe-4" />

      <div class="d-flex align-items-center">
        <IconLabel icon="thumbs-up" type="success" display-style="secondary" />

        <span class="text-secondary">867</span>
      </div>
    </div>

    <div class="d-flex flex-row flex-wrap pb-4">
      <IconLabel
        v-if="content.labels.find((label: Label) => label.name === 'Standaard sjabloon')"
        icon="file"
        type="success"
        display-style="secondary"
        size="lg"
        class="mt-2"
      >
        Standaard sjabloon
      </IconLabel>

      <template v-for="(label, key) in content.labels">
        <TextLabel v-if="label.name !== 'Standaard sjabloon'" :key="key" type="white" class="mt-2">
          {{ label.name }}
        </TextLabel>
      </template>
    </div>

    <p class="mb-0 pb-4">{{ content!.description }}</p>

    <SecondaryTitle>Bijlage</SecondaryTitle>

    <div
      data-bs-toggle="modal"
      data-bs-target="#document-preview-modal"
      class="d-block bg-white px-4 py-3 border rounded hover-pointer
      d-flex flex-row justify-content-start align-items-center w-fit"
    >
      <IconLabel icon="file" type="primary" display-style="secondary" class="me-3" />

      {{ content?.attachment }}
    </div>

    <div v-if="canReview || isOwner" class="row pt-4">
      <div class="col col-lg-7">
        <SecondaryTitle>Feedback</SecondaryTitle>

        <SubTitle v-if="!content.feedback || content.feedback.length === 0">
          Er is nog geen feedback geplaatst op deze content
        </SubTitle>

        <div v-for="(feedback, key) in content.feedback" :key="key" class="bg-white px-4 py-3 border rounded mb-3">
          <div class="d-flex flex-row flex-wrap justify-content-start pb-2">
            <div class="d-flex align-items-center pe-4">
              <IconLabel icon="user" type="primary" display-style="secondary" />

              <span class="text-secondary">{{ feedback.user?.fullName }}</span>
            </div>

            <DateLabel :date="feedback.createdAt" class="pe-4" />
          </div>

          <p>{{ feedback.feedback }}</p>
        </div>

        <SecondaryTitle class="pt-3">Feedback plaatsen</SecondaryTitle>

        <textarea
          v-model="newFeedback"
          class="form-control mb-2"
          id="contentFeedback"
          placeholder="Vul hier uw feedback in"
          rows="4"
        />

        <TextButton v-show="newFeedback.length > 0" display-style="primary" @click="postFeedback()">
          Feedback plaatsen
        </TextButton>

        <TextButtonDisabled v-show="newFeedback.length === 0" type="secondary" display-style="primary">
          Feedback plaatsen
        </TextButtonDisabled>
      </div>

      <div v-if="isOwner" class="col">
        <SecondaryTitle>Reviewers</SecondaryTitle>

        <Reviewers
          v-model:content-reviewers="content.contentUsers"
        />
      </div>
    </div>
  </div>

  <ContentDocumentPreview v-if="content?.attachment" :attachment="content.attachment" :contentID="content.contentID"/>
  <CategorySidebar />
</template>