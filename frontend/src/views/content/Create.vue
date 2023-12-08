<script setup lang="ts">
  import { Ref, ref } from 'vue';

  import { PageTitle, SecondaryTitle, TextButton } from '@/components'
  import { LabelSelect } from '@/components'
  import { CompanySelect } from '@/components'


  let accessLevel: Ref<string> = ref('');

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

      <label class="form-label">Content labels</label>
      <LabelSelect />
    </div>

    <div class="col">
      <SecondaryTitle> Toegangsniveau </SecondaryTitle>
      <div class="pb-3 col-lg-10">
        <label class="pb-2" for="category">Zichtbaarheid</label>
        <select class="form-select" id="category" v-model="accessLevel">
          <option selected value="">Selecteer toegangsniveau (Standaard Openbaar)</option>
          <option value="private">Privé</option>
          <option value="restricted">Beperkt</option>
          <option value="public">Openbaar</option>
        </select>
      </div>

      <div v-if="accessLevel === 'restricted'">
          <CompanySelect/>
      </div>

      <div class="d-flex flex-md-row flex-column flex-wrap">
        <TextButton class="mb-3 mb-md-0 me-md-2"> Toevoegen </TextButton>

        <TextButton :to="{ name: 'content.overview' }" display-style="tertiary">
          Annuleren
        </TextButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
