<script setup lang="ts">

  import { PageTitle, SubTitle, SecondaryTitle } from '@/components';

</script>

<template>
  <PageTitle>Login Page</PageTitle>

  <SubTitle>Sub title</SubTitle>

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