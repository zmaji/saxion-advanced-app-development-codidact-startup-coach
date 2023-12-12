<script setup lang="ts">

  import { PageTitle, SecondaryTitle, TextButton } from '@/components';

</script>

<template>
  
  <div class="row row-cols-2 g-2 g-lg-3">
    <div class="col">
      <PageTitle>Kennisbank</PageTitle>
    </div>
    <div class="col">
      <TextButton
        :to="{ name: 'content.create' }"
        class="mb-3 mb-md-0 me-md-2">
          Content Toevoegen
      </TextButton>
    </div>
  </div>
  
    <SecondaryTitle>Related Content</SecondaryTitle>
  
    <div class="row row-cols-2 g-2 g-lg-3">
      <div class="col">
        <div class="rounded p-3 shadow-sm bg-white"> 
          <h3>titel</h3>

          <p>Likes: 150</p>

        </div>
      </div>
  
      <div class="col">
        <div class="rounded p-3 shadow-sm bg-white"> 
          <h3>titel</h3>

          <p>Likes: 125</p>
          
        </div>
      </div>
  
      <div class="col">
        <div class="rounded p-3 shadow-sm bg-white"> 
          <h3>titel</h3>

          <p>Likes: 102</p>
          
        </div>
      </div>
  
      <div class="col">
        <div class="rounded p-3 shadow-sm bg-white"> 
          <h3>titel</h3>

          <p>Likes: 14</p>
          
        </div>
      </div>
   
    </div>
</template>

<style scoped>
  
</style>