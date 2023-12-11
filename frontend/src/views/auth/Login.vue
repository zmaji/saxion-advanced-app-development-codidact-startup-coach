<script setup lang="ts">
  import { ref } from 'vue';

  import { PageTitle, TextButton, IconButton } from '@/components';
  import httpService from '@/plugins/http/httpService';
  import router from '@/router';
  import { useTokenStore } from '@/stores/token';

  const userName = ref('');
  const password = ref('');
  const error = ref('');

  const login = async () => {
    try {
      const response = await httpService.postRequest(
        '/credentials',
        {
          userName: userName.value,
          password: password.value
        },
        false
      );

      if (response) {
        useTokenStore().setToken(response.data.token);
        await router.push({ name: 'company.overview' });
      }
    } catch (e) {
      const errorMappings: { [key: string]: string } = {
        'Missing required fields': 'Vul alstublieft alle velden in',
        'Invalid credentials': 'De ingevoerde gegevens zijn onjuist',
      };

      let errorMessage =
        (e as Error & { response?: { data?: { error?: string } } })?.response?.data?.error ||
        'An error occurred during login';

      error.value = errorMappings[errorMessage] || errorMessage;
    }
  };
</script>

<template>
  <main class="d-flex flex-row min-vh-100">
    <div class="col col-md-6 col-lg-7 col-xl-5 px-2 py-5 px-md-5 ps-lg-10">
      <div class="container h-100">
        <IconButton icon="arrow-left" type="primary" display-style="secondary" :to="{ name: 'home' }">
          Terug
        </IconButton>

        <div class="d-flex align-items-center h-100">
          <div class="col">
            <PageTitle padding-bottom="pb-3">Login op uw account</PageTitle>

            <form>
              <div class="pb-4 col-lg-10 col-xl-8">
                <label for="username" class="form-label">Gebruikersnaam</label>
                <input type="text" class="form-control" :class="error && !userName ? 'border border-danger' : null"
                  id="username" placeholder="Uw gebruikersnaam" v-model="userName">

                <small v-show="(error && !userName)" class="text-danger">U moet uw gebruikersnaam invullen</small>
              </div>

              <div class="pb-4 col-lg-10 col-xl-8">
                <label for="password" class="form-label">Wachtwoord</label>
                <input type="password" class="form-control" :class="error && !password ? 'border border-danger' : null"
                  id="password" placeholder="Uw wachtwoord" v-model="password">

                <small v-if="error && !password" class="text-danger">Het wachtwoord moet ingevuld worden</small>
              </div>

              <div class="pb-4 col-lg-8" v-if="error">
                <p class="alert alert-danger">{{ error }}</p>
              </div>

              <div class="d-flex flex-md-row flex-column flex-wrap">
                <TextButton class="mb-3 mb-md-0 me-md-2" @click="login">
                  Inloggen
                </TextButton>

                <TextButton :to="{ name: 'company.overview' }" display-style="tertiary">
                  Ik ben mijn wachtwoord vergeten
                </TextButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="d-none d-md-block col page-background" />
  </main>
</template>

<style scoped>
.page-background {
  background: linear-gradient(to right, rgba(191, 204, 229, 0.65), transparent),
    url(../images/auth-page.jpg) no-repeat center/cover;
}

.page-background::before {
  content: '';
  display: block;
  height: 100%;
  background: url(../images/skewed-side.svg) no-repeat;
  background-size: cover;
  margin: -1px;
}
</style>
