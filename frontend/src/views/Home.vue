<script setup lang="ts">
  import { AppButton } from '../components';
</script>

<template>
  <main class="home-bg">
    <div class="container">
      <div class="d-flex justify-content-center align-items-center">
        <div class="text-white text-center">
          <h1 class="home-title">Codidact Startup Coach</h1>

          <h2 class="pt-2">Boost your start-up</h2>

          <appButton
            class="me-2"
            type="primary"
            renderAs="a"
            :to="{ name: 'login'}"
          >
            Login
          </appButton>

          <AppButton
            type="success"
            renderAs="a"
            :to="{ name: 'register'}"
          >
            Register
          </AppButton>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
  .home-bg {
    height: 100vh;
    width: 100vw;
    background: linear-gradient(to bottom, rgba(63,61,86,0.65), rgba(63,61,86,0.95)),
    url(../images/home-bg.jpg)
    no-repeat center/cover;
    padding-top: 25vh;
  }

  .home-title {
    font-size: 4rem;
  }
</style>