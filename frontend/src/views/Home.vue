<script setup lang="ts">
  import { PageTitle, TextButton, SubHeader } from '../components';
</script>

<template>
  <main class="d-flex flex-row min-vh-100">
    <div class="col col-md-6 col-lg-5 px-2 py-5 px-md-5 ps-lg-10">
      <div class="container h-100">
        <div class="d-flex align-items-center h-100">
          <div class="col">
            <PageTitle class="home-title">The Startup Coach</PageTitle>

            <SubHeader padding-bottom="pb-3">
              Navigate Growth, Conquer Peaks: <br>
              Your Startup's Odyssey.
            </SubHeader>

            <div class="d-flex flex-md-row flex-column flex-wrap">
              <TextButton
                :to="{ name: 'login' }"
                class="mb-3 mb-md-0 me-md-3"
              >
                Inloggen
              </TextButton>

              <TextButton
                :to="{ name: 'register' }"
                display-style="secondary"
              >
                Registreren
              </TextButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-none d-md-block col page-background"/>
  </main>
</template>

<style scoped>
  .home-title {
    font-size: 4rem!important;
  }

  .page-background {
    background: linear-gradient(to right, rgba(191, 204, 229, 0.65), transparent),
    url(../images/home-bg.jpg)
    no-repeat center/cover;
  }

  .page-background::before {
    content: '';
    display: block;
    height: 100%;
    background: url(../images/skewed-side.svg) no-repeat;
    transform: scaleY(-1) translateX(-1px);
    background-size: cover;
  }
</style>