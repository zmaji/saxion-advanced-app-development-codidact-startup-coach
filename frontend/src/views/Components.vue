<script setup lang="ts">

  import {
    TextButton,
    IconButton,
    PageTitle,
    SubHeader,
    SubTitle,
    SecondaryTitle
  } from '@/components';
</script>

<template>
  <PageTitle>Componenten overzicht (PageTitle)</PageTitle>

  <SubTitle>Alle elementen hier zijn een compoment, dit element ook! (SubTitle)</SubTitle>

  <SecondaryTitle>Buttons (SecondaryTitle)</SecondaryTitle>

  <SubHeader>Text buttons</SubHeader>
  <p>Buttons that can only display text</p>

  <section class="row row-cols-1 g-3 pb-4">
    <div class="col">
      <TextButton class="me-2">
        Button primary
      </TextButton>

      <TextButton display-style="secondary"  class="me-2">
        Button secondary
      </TextButton>

      <TextButton display-style="tertiary">
        Button tertiary
      </TextButton>
    </div>

    <div class="col">
      <TextButton type="success" class="me-2">
        Button primary
      </TextButton>

      <TextButton type="success" display-style="secondary"  class="me-2">
        Button secondary
      </TextButton>

      <TextButton type="success" display-style="tertiary">
        Button tertiary
      </TextButton>
    </div>

    <div class="col">
      <TextButton type="info" class="me-2">
        Button primary
      </TextButton>

      <TextButton type="info" display-style="secondary"  class="me-2">
        Button secondary
      </TextButton>

      <TextButton type="info" display-style="tertiary">
        Button tertiary
      </TextButton>
    </div>

    <div class="col">
      <TextButton type="warning" class="me-2">
        Button primary
      </TextButton>

      <TextButton type="warning" display-style="secondary"  class="me-2">
        Button secondary
      </TextButton>

      <TextButton type="warning" display-style="tertiary">
        Button tertiary
      </TextButton>
    </div>

    <div class="col">
      <TextButton type="danger" class="me-2">
        Button primary
      </TextButton>

      <TextButton type="danger" display-style="secondary"  class="me-2">
        Button secondary
      </TextButton>

      <TextButton type="danger" display-style="tertiary">
        Button tertiary
      </TextButton>
    </div>
  </section>

  <SecondaryTitle>Icon buttons</SecondaryTitle>

  <p>Can display buttons with icons only but also supports displaying text together with an icon</p>

  <section class="row row-cols-1 g-3">
    <div class="col">
      <IconButton icon="circle-info" class="me-2"/>

      <IconButton icon="circle-info" display-style="secondary"  class="me-2">
        Button secondary
      </IconButton>

      <IconButton icon="circle-info" display-style="tertiary">
        Button tertiary
      </IconButton>
    </div>

    <div class="col">
      <IconButton icon="circle-info" type="info" class="me-2"/>

      <IconButton icon="circle-info" type="info" display-style="secondary"  class="me-2">
        Button secondary
      </IconButton>

      <IconButton icon="circle-info" type="info" display-style="tertiary">
        Button tertiary
      </IconButton>
    </div>

    <div class="col">
      <IconButton icon="check" type="success" class="me-2"/>

      <IconButton icon="check" type="success" display-style="secondary"  class="me-2">
        Button secondary
      </IconButton>

      <IconButton icon="check" type="success" display-style="tertiary">
        Button tertiary
      </IconButton>
    </div>

    <div class="col">
      <IconButton icon="triangle-exclamation" type="warning" class="me-2"/>

      <IconButton icon="triangle-exclamation" type="warning" display-style="secondary"  class="me-2">
        Button secondary
      </IconButton>

      <IconButton icon="triangle-exclamation" type="warning" display-style="tertiary">
        Button tertiary
      </IconButton>
    </div>

    <div class="col">
      <IconButton icon="xmark" type="danger" class="me-2"/>

      <IconButton icon="xmark" type="danger" display-style="secondary"  class="me-2">
        Button secondary
      </IconButton>

      <IconButton icon="xmark" type="danger" display-style="tertiary">
        Button tertiary
      </IconButton>
    </div>
  </section>

</template>