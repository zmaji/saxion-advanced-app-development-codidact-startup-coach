<script setup lang="ts">
  import type { Label } from '@/typings/Label';
  import type { Ref } from 'vue';
  import type { User } from '@/typings/User';

  import {
    onMounted,
    reactive,
    ref,
    watch
  } from 'vue';
  import { useTokenStore } from '../../stores/token';
  import { jwtDecode } from 'jwt-decode';

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
  let currentUser = ref<User | null>(null)
  let currentUserID = ref<string | undefined>('');
  const fetchUserData = async () => {
    try {
      const userToken = tokenStore.getToken;
      currentUser.value = jwtDecode(userToken);
      currentUserID.value = currentUser.value?.userID;
      
    } catch (error) {
      console.error('Error fetching current userID:', error);
    }
  };
  
  interface NewContent {
    contentID?: string | null;
    user: string | undefined;
    title: string | null;
    description: string | number | string[] | undefined;
    category: string | null;
    labels: Label[] | null;
    accessLevel: string | null;
    attachment: string | null;
    createdAt: string | null;
  }

  let accessLevel: Ref<string> = ref('');
  let contentLabels: Ref<Label[]> = ref<Label[]>([])

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
  })

  const addSelectedLabels = (selectedLabels: Label[]) => {
    contentLabels.value = selectedLabels;
  }

  const addContent = async () => {
    try {
      await httpService.postRequest(
        '/content',
        JSON.parse(JSON.stringify(contentTemplate))
      );

      navigateToContentOverview();

    } catch (error) {
      console.error(error);
    }
  }

  const navigateToContentOverview = () => {
    router.push({ name: 'content.overview' })
  }
  
  onMounted(fetchUserData);

</script>

<template>
  <PageTitle>Content Toevoegen</PageTitle>

  <p>Pad naar categorie !</p>

  <div class="row row-cols-2 g-2 g-lg-3">
    <div class="col">
      <SecondaryTitle> Algemene gegevens </SecondaryTitle>

      <form>
        <div class="pb-3 col-lg-10">
          <label for="title" class="form-label">Titel</label>

          <input v-model="contentTemplate.title" type="text" class="form-control" id="title"
            placeholder="Bijvoorbeeld: Mijn Leuke Titel" />
        </div>

        <div class="pb-3 col-lg-10">
          <label for="description" class="form-label">Beschrijving</label>

          <!-- <textarea v-model="contentTemplate.description" type="text" class="form-control" id="description"
            placeholder="Bijvoorbeeld: Mijn Content is handig !" rows="5" style="resize: none" /> -->
        </div>

        <div class="pb-3 col-lg-10">
          <label class="pb-2" for="category">Categorie</label>
          <select class="form-select" id="category" v-model="contentTemplate.category">
            <option selected>Selecteer een categorie</option>
            <option value="Software">Software</option>
            <option value="Zorg">Zorg</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <div class="pb-3 col-lg-10">
          <label for="formFile" class="form-label">Bijlage</label>

          <input class="form-control" type="file" id="formFile" />
        </div>
      </form>
    </div>

    <div class="col">
      <SecondaryTitle> Content labels </SecondaryTitle>

      <label class="form-label">Content labels</label>
      <LabelSelect :model-value="contentLabels" @update:updateLabels="addSelectedLabels" />
    </div>

    <div class="col">
      <SecondaryTitle> Toegangsniveau </SecondaryTitle>
    </div>

    <div class="col">
      <!-- Een lege col om de divs te alignen  -->
    </div>
    <div class="col">
      <div class="pb-3 col-lg-10">
        <label class="pb-2" for="accessLevel">Zichtbaarheid</label>
        <select class="form-select" id="accessLevel" v-model="accessLevel">
          <option selected value="">Selecteer toegangsniveau (Standaard Openbaar)</option>
          <option value="private">Privé</option>
          <option value="restricted">Beperkt</option>
          <option value="public">Openbaar</option>
        </select>
      </div>
    </div>

    <div class="col">
      <div v-if="accessLevel === 'restricted'">
        <label class="pb-2" for="company"> Welke bedrijven mogen uw content zien</label>
        <CompanySelect />
      </div>
    </div>

    <div class="col">
      <div v-if="accessLevel === 'restricted'">
        <label class="pb-2" for="user"> Welke gebruikers mogen uw content zien</label>
        <UserSelect />
      </div>
    </div>

  </div>
  <div class="d-flex flex-md-row flex-column flex-wrap">
    <TextButton class="button mb-3 mb-md-0 me-md-2" data-bs-toggle="modal" data-bs-target="#confirmationModal"
      @click="addContent"> Toevoegen </TextButton>

    <TextButton :to="{ name: 'content.overview' }" display-style="tertiary">
      Annuleren
    </TextButton>
  </div>

  <div class="modal fade" id="confirmationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="confirmationModal">Gelukt !</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Uw content is succesvol toegevoegd !
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
            @click="navigateToContentOverview">Prima</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>