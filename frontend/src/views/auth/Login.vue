<script setup lang="ts">
  import { PageTitle, TextButton, IconButton } from '@/components';
  import httpService from '@/plugins/http/httpService';
  import router from '@/router';
  import { useTokenStore } from '@/stores/token';
  import { ref } from 'vue';

  const userName = ref('');
  const password = ref('');
  const error = ref('');

  const login = async () => {
    try{
      const response = await httpService.postRequest('/credentials', {userName: userName.value, password: password.value}, false);

      if (response.status === 200) {
        useTokenStore().setToken(response.data.token);
        router.push({ name: 'company.overview' });
      } else {
        error.value = response.data.error;
      }
    } catch (e) {
      let errorMessage = (e as Error & { response?: { data?: { error?: string } } })?.response?.data?.error;
      if (errorMessage === 'Missing required fields') {
        errorMessage = "Vul alstublieft alle velden in";
      } else if (errorMessage === 'Invalid credentials') {
        errorMessage = "De ingevoerde gegevens zijn onjuist";
      }
      error.value = errorMessage || 'An error occurred during login';
    }
  };
</script>

<template>
  <main class="d-flex flex-row min-vh-100">
    <div class="col col-md-6 col-lg-5 px-2 py-5 px-md-5 ps-lg-10">
      <div class="container h-100">
        <IconButton
          icon="arrow-left"
          type="primary"
          display-style="secondary"
          :to="{ name: 'home' }"
        >
          Terug
        </IconButton>

        <div class="d-flex align-items-center h-100">
          <div class="col">
            <PageTitle padding-bottom="pb-3">Login op uw account</PageTitle>

            <form>
              <div class="pb-4 col-lg-8">
                <label for="username" class="form-label">Gebruikersnaam</label>
                <input type="text" class="form-control" id="username" placeholder="Uw gebruikersnaam" v-model="userName">
              </div>

              <div class="pb-4 col-lg-8">
                <label for="password" class="form-label">Wachtwoord</label>
                <input type="password" class="form-control" id="password" placeholder="Uw wachtwoord" v-model="password">
              </div>

              <div class="pb-4 col-lg-8" v-if="error">
                <p class="text-danger">{{ error }}</p>
              </div>

              <div class="d-flex flex-md-row flex-column flex-wrap">
                <TextButton
                  class="mb-3 mb-md-0 me-md-2"
                  @click="login"
                >
                  Inloggen
                </TextButton>

                <TextButton
                  :to="{ name: 'company.overview' }"
                  display-style="tertiary"
                >
                  Ik ben mijn wachtwoord vergeten
                </TextButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="d-none d-md-block col page-background"/>
  </main>
</template>

<style scoped>
  .page-background {
    background: linear-gradient(to right, rgba(191, 204, 229, 0.65), transparent),
    url(../images/auth-page.jpg)
    no-repeat center/cover;
  }

  .page-background::before {
    content: '';
    display: block;
    height: 100%;
    background: url(../images/skewed-side.svg) no-repeat;
  }
</style>