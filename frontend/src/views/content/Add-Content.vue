<script setup lang="ts">
  import { PageTitle, SecondaryTitle, TextButton } from '@/components'
  import { ContentLabels } from '@/components'
  
</script>

<template>
  <div class="g-2 g-lg-3">
    <PageTitle>Content Toevoegen</PageTitle>

    <p>Pad naar categorie !</p>
  </div>

  <div class="row row-clos-2 g-2 g-lg-3">
    <div class="col">
      <SecondaryTitle> Algemene gegevens </SecondaryTitle>
    </div>

    <div class="col">
      <SecondaryTitle> Content labels </SecondaryTitle>
    </div>
  </div>

  <form>
    <div class="row row-cols-2">
      <div class="col">
        <div class="pb-3 col-lg-10">
          <label for="title" class="form-label">Titel</label>
          <input
            type="text"
            class="form-control"
            id="title"
            placeholder="Bijvoorbeeld: Mijn Leuke Titel"
          />
        </div>

        <div class="pb-3 col-lg-10">
          <label for="description" class="form-label">Beschrijving</label>
          <textarea
            type="text"
            class="form-control"
            id="description"
            placeholder="Bijvoorbeeld: Mijn Content is handig !"
            rows="5"
            style="resize: none"
          >
          </textarea>
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

        <SecondaryTitle> Toegangsniveau </SecondaryTitle>

        <div class="d-flex flex-md-row flex-column flex-wrap">
          <TextButton class="mb-3 mb-md-0 me-md-2"> Toevoegen </TextButton>

          <TextButton :to="{ name: 'content.base' }" display-style="tertiary">
            Annuleren
          </TextButton>
        </div>
      </div>

      <div class="col">
        <div class="pb-3 col-lg-10">
          <label class="pb-2" for="content-labels">Content Labels</label>
          
          <ContentLabels></ContentLabels>
          <!-- <select class="form-select" size="5" id="content-label">
            <option class="pb-2" value="" selected>Selecteer één of meer labels</option>

            <option class="pb-2" value="1">
              <input type="checkbox" class="btn-check" id="content-label-check" />
              <label class="btn btn-outline-primary" for="content-label-check"></label>
              Afspraken
            </option>

            <option class="pb-2" value="2">Interview</option>
            <option class="pb-2" value="3">Pitch</option>
            <option class="pb-2" value="4">Starter</option>
            <option class="pb-2" value="5">Start-up</option>
            <option class="pb-2" value="6">Scale-up</option>
            <option class="pb-2" value="7">Vervolg Afspraken</option>
          </select> -->
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
