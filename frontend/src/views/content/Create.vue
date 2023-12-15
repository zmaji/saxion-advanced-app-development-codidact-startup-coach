<script setup lang="ts">
  import type { Label } from '@/typings/Label';
  import type { Ref } from 'vue';
  import type { User } from '@/typings/User';
  import type { Category } from '@/typings/Category';

  import { onMounted, reactive, ref } from 'vue';
  import { jwtDecode } from 'jwt-decode';
  import { toast } from 'vue3-toastify';

  import { useTokenStore } from '@/stores/token';
  import router from '@/router/index';
  import httpService from '@/plugins/http/httpService';
  import {
    PageTitle,
    SecondaryTitle,
    TextButton,
    UserSelect
  } from '@/components';
  import { LabelSelect } from '@/components'
  import { CompanySelect } from '@/components'

  const tokenStore = useTokenStore()
  const categories: Ref<Category[]> = ref<Category[]>([]);
  const currentUser = ref<User | null>(null)
  const currentUserID = ref<string | undefined>('');
  let accessLevel: Ref<string> = ref('public');
  let contentLabels: Ref<Label[]> = ref<Label[]>([]);

  interface NewContent {
    contentID?: string | null;
    user: string | undefined;
    title: string | null;
    description: string;
    category: string | null;
    labels: Label[];
    accessLevel: string | null;
    attachment: string | null;
    createdAt: string | null;
  }

  const contentTemplate: NewContent = reactive({
    contentID: null,
    user: currentUserID,
    title: null,
    description: '',
    category: null,
    labels: contentLabels,
    accessLevel: accessLevel,
    attachment: null,
    createdAt: null,
  });

  const addContent = async () => {
    try {
      const result = await httpService.postRequest(
        '/content',
        JSON.parse(JSON.stringify(contentTemplate))
      );

      if (result.status === 200) {
        toast.success('Content succesvol toegevoegd!', {
          position: toast.POSITION.TOP_RIGHT,
        });

        setTimeout(() => {
          navigateToContentOverview();
        }, 2000);
      } else {
        toast.warning('Er ging iets fout', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error('Er ging iets fout', {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error(error);
    }
  }

  const navigateToContentOverview = () => {
    router.push({ name: 'knowledgeBase.overview' });
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

  const fetchCategories = async () => {
    try {
      const response = await httpService.getRequest<Category[]>('/categories/flattened', false);

      if (response && response.data) {
        categories.value = response.data;
      }
    } catch (e) {
      console.error(e);
    }
  }

  onMounted(() => {
    fetchCategories();
    fetchUserData();
  });
</script>

<template>
  <PageTitle>Content Toevoegen</PageTitle>

  <form class="row g-2 g-lg-3">
    <div class="col col-lg-6">
      <SecondaryTitle>Algemene gegevens</SecondaryTitle>

      <div class="pb-3 col-lg-10">
        <label for="content-title" class="form-label">Titel</label>

        <input
          v-model="contentTemplate.title"
          type="text"
          class="form-control"
          id="content-title"
          placeholder="Vul een titel in"
        />
      </div>

      <div class="pb-3 col-lg-10">
        <label for="content-description" class="form-label">Beschrijving</label>

        <textarea
          v-model="contentTemplate.description"
          type="text"
          class="form-control"
          id="content-description"
          placeholder="Vul een beschrijving in"
          rows="5"
          style="resize: none"
        />
      </div>

      <div class="pb-3 col-lg-10">
        <label class="pb-2" for="category-select">Categorie</label>

        <select class="form-select" id="category-select" v-model="contentTemplate.category">
          <option selected :value="null" disabled>Selecteer een categorie</option>

          <option
            v-for="(category, key) in categories"
            :key="key"
            :value="category.categoryID"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="pb-3 col-lg-10">
        <label class="form-label" for="content-file">Bijlage</label>

        <input class="form-control" type="file" id="content-file" />
      </div>
    </div>

    <div class="col col-lg-6">
      <SecondaryTitle> Content labels </SecondaryTitle>

      <div class="pb-3 col-lg-10">
        <label class="form-label">Content labels</label>

        <LabelSelect v-model="contentTemplate.labels"/>
      </div>
    </div>

    <div class="col">
      <SecondaryTitle> Toegangsniveau </SecondaryTitle>

      <div class="row g-2 g-lg-3">
        <div class="col-lg-6">
          <div class="pb-3 col-lg-10">
            <label class="pb-2" for="content-access-level">Zichtbaarheid (Standaard Openbaar)</label>

            <select class="form-select" id="content-access-level" v-model="accessLevel">
              <option selected value="public">Openbaar</option>
              <option value="private">Privé</option>
              <option value="restricted">Beperkt</option>
            </select>
          </div>

          <div v-if="accessLevel === 'restricted'" class="pb-3 col-lg-10">
            <label class="pb-2" for="user"> Welke gebruikers mogen uw content zien</label>
            <UserSelect/>
          </div>
        </div>

        <div v-if="accessLevel === 'restricted'" class="col-lg-6">
          <div class="pb-3 col-lg-10">
            <label class="pb-2" for="company"> Welke bedrijven mogen uw content zien</label>
            <CompanySelect/>
          </div>
        </div>
      </div>
    </div>
  </form>

  <div class="d-flex flex-md-row flex-column flex-wrap">
    <TextButton 
      class="button mb-3 mb-md-0 me-md-2"
      @click="addContent"
    >
      Content toevoegen
    </TextButton>

    <TextButton :to="{ name: 'knowledgeBase.overview' }" display-style="secondary">
      Annuleren
    </TextButton>
  </div>

</template>

<style scoped></style>