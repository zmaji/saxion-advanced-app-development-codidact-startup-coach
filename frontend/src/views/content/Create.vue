<script setup lang="ts">
  import type { Content } from '@/typings/content';
  import type { ContentLabel } from '@/typings/label';
  import type { Ref } from 'vue';

  import { reactive, ref } from 'vue';

  import {
    PageTitle,
    SecondaryTitle,
    TextButton,
    UserSelect
  } from '@/components';
  import { LabelSelect } from '@/components'
  import { CompanySelect } from '@/components'

  interface NewContent {
    contentID?: string | null;
    user: string | null;
    title: string | null;
    description: string | null;
    category: string | null;
    labels: ContentLabel[] | null;
    accessLevel: string | null;
    attachment: string | null;
    createdAt: string | null;
  }

  const contentTemplate: NewContent = reactive({
    contentID: null,
    user: null,
  })

  let accessLevel: Ref<string> = ref('');
  let contentLabels: Ref<ContentLabel[]> = ref<ContentLabel[]>([])

  const addSelectedLabels = (selectedLabels: ContentLabel[]) => {
    console.log('incoming',contentLabels);
    
    contentLabels.value = selectedLabels;
  }
  
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

          <input type="text" class="form-control" id="title" placeholder="Bijvoorbeeld: Mijn Leuke Titel" />
        </div>

        <div class="pb-3 col-lg-10">
          <label for="description" class="form-label">Beschrijving</label>

          <textarea type="text" class="form-control" id="description"
           placeholder="Bijvoorbeeld: Mijn Content is handig !"
            rows="5" style="resize: none" />
        </div>

        <div class="pb-3 col-lg-10">
          <label class="pb-2" for="category">Categorie</label>
          <select class="form-select" id="category">
            <option selected>Selecteer een categorie</option>
            <option value="1">Software</option>
            <option value="2">Zorg</option>
            <option value="3">Business</option>
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

      <div v-for="(label, key) in contentLabels" :key="key" >
          {{ label }}
      </div>
      
      <label class="form-label">Content labels</label>
      <LabelSelect :model-value="contentLabels" @update:modelValue="addSelectedLabels" />
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
            <UserSelect/>
      </div>
    </div>
    

  </div>
  <div class="d-flex flex-md-row flex-column flex-wrap">
        <TextButton class="mb-3 mb-md-0 me-md-2"> Toevoegen </TextButton>

        <TextButton :to="{ name: 'content.overview' }" display-style="tertiary">
          Annuleren
        </TextButton>
      </div>
</template>

<style scoped></style>
