<script setup lang="ts">

  import {
    AppButton,
    PageTitle,
    SubTitle,
    SecondaryTitle
  } from '@/components';

</script>

<template>
  <PageTitle>Componenten overzicht (PageTitle)</PageTitle>

  <SubTitle>Alle elementen hier zijn een compoment, dit element ook! (SubTitle)</SubTitle>

  <SecondaryTitle>SecondaryTitle</SecondaryTitle>


  <SecondaryTitle>Buttons</SecondaryTitle>

  <div class="row row-cols-1 g-3">
    <div class="col">
      <AppButton class="me-2">
        Button primary
      </AppButton>

      <AppButton display-style="secondary"  class="me-2">
        Button secondary
      </AppButton>

      <AppButton display-style="tertiary">
        Button tertiary
      </AppButton>
    </div>

    <div class="col">
      <AppButton type="success" class="me-2">
        Button primary
      </AppButton>

      <AppButton type="success" display-style="secondary"  class="me-2">
        Button secondary
      </AppButton>

      <AppButton type="success" display-style="tertiary">
        Button tertiary
      </AppButton>
    </div>

    <div class="col">
      <AppButton type="info" class="me-2">
        Button primary
      </AppButton>

      <AppButton type="info" display-style="secondary"  class="me-2">
        Button secondary
      </AppButton>

      <AppButton type="info" display-style="tertiary">
        Button tertiary
      </AppButton>
    </div>

    <div class="col">
      <AppButton type="warning" class="me-2">
        Button primary
      </AppButton>

      <AppButton type="warning" display-style="secondary"  class="me-2">
        Button secondary
      </AppButton>

      <AppButton type="warning" display-style="tertiary">
        Button tertiary
      </AppButton>
    </div>

    <div class="col">
      <AppButton type="danger" class="me-2">
        Button primary
      </AppButton>

      <AppButton type="danger" display-style="secondary"  class="me-2">
        Button secondary
      </AppButton>

      <AppButton type="danger" display-style="tertiary">
        Button tertiary
      </AppButton>
    </div>
  </div>

</template>

<style scoped>

</style>