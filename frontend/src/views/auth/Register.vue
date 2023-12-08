<script setup lang="ts">
  import { PageTitle, TextButton, IconButton } from '@/components';
</script>

<template>
  <main class="d-flex flex-row min-vh-100">
    <div class="col col-md-6 col-lg-7 col-xl-5 px-2 py-5 px-md-5 ps-lg-10">
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
            <PageTitle padding-bottom="pb-3">Registreer een nieuw account</PageTitle>

            <form>
              <div class="pb-4 col-lg-10 col-xl-8">
                <label for="username" class="form-label">Gebruikersnaam</label>
                <input type="text" class="form-control" id="username" placeholder="Uw gebruikersnaam">
              </div>

              <div class="pb-4 col-lg-10 col-xl-8">
                <label for="email" class="form-label">E-mail</label>
                <input type="email" class="form-control" id="email" placeholder="Uw e-mailadres">
              </div>


              <div class="pb-4 col-lg-10 col-xl-8">
                <label for="password" class="form-label">Wachtwoord</label>
                <input type="password" class="form-control" id="password" placeholder="Uw wachtwoord">
              </div>

              <div class="pb-4 col-lg-10 col-xl-8">
                <label for="repeat-password" class="form-label">Herhaal wachtwoord</label>
                <input type="password" class="form-control" id="repeat-password" placeholder="Uw wachtwoord">
              </div>

              <div class="d-flex flex-md-row flex-column flex-wrap">
                <TextButton
                  :to="{ name: 'company.overview' }"
                  class="mb-3 mb-md-0 me-md-2"
                >
                  Registreren
                </TextButton>

                <TextButton
                  :to="{ name: 'login' }"
                  display-style="tertiary"
                >
                  Ik heb al een account
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
    background-size: cover;
    margin: -1px;
  }
</style>