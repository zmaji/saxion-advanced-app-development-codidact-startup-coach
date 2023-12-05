<script setup lang="ts">

import {
  TextButton,
  PageTitle,
  SubTitle,
  SecondaryTitle,
  SubHeader
} from '@/components';
import { reactive, ref } from 'vue';

let currentStep = ref(0);

const nextStep = () => {
  currentStep.value += 1;
};

const prevStep = () => {
  currentStep.value -= 1;
};

let formData = reactive({
  industry: '',
  nrOfEmployees: '',
  stage: '',
  serviceInformation: '',
  businessGoals: '',
  painPoints: '',
  targetAudience: '',
  competitors: '',
  budget: '',
});

const submitForm = () => {
  // TODO: Form logic
  // alert('Form submitted successfully!');
};

</script>

<template>
  <!-- Step 0: Overview -->
  <div v-if="currentStep === 0">
    <PageTitle>Bedrijfsoverzicht</PageTitle>

    <SecondaryTitle>Behoefteanalyse</SecondaryTitle>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget imperdiet neque, ac ultrices nunc. Praesent non
      turpis elementum, vestibulum augue sit amet, interdum justo. Nunc gravida eros in lorem interdum sagittis. Fusce
      vulputate, turpis vel suscipit mattis, risus mauris dignissim felis, ut molestie urna libero eu magna.</p>

    <div class="row">
      <div class="col">
        <SubTitle type="secondary">0/5 stappen voltooid</SubTitle>
      </div>
      <div class="col">
        <SubTitle type="warning">1/5 stappen voltooid</SubTitle>
      </div>
      <div class="col">
        <SubTitle type="success">5/5 stappen voltooid</SubTitle>
      </div>
    </div>

    <TextButton class="me-2" @click="nextStep">
      Start de analyse
    </TextButton>
  </div>

  <!-- Step 1: Bedrijfsgegevens -->
  <div v-if="currentStep === 1">
    <PageTitle>Behoefteanalyse</PageTitle>

    <form @submit.prevent="submitForm" class="rounded py-5 shadow-sm bg-white">
      <div class="row">
        <div class="col-1"></div>

        <div class="col-7">
          <SubHeader>Stap 1: Bedrijfsgegevens</SubHeader>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget imperdiet neque, ac ultrices nunc. Praesent
            non turpis elementum, vestibulum augue sit amet, interdum justo.</p>

          <div class="col-7">
            <div class="mb-3">
              <label for="industry" class="form-label">Industrie</label>
              <input type="text" class="form-control" id="industry" v-model="formData.industry" required>
            </div>

            <div class="mb-3">
              <label for="nrOfEmployees" class="form-label">Aantal werknemers</label>
              <input type="text" class="form-control" id="nrOfEmployees" v-model="formData.nrOfEmployees" required>
            </div>

            <div class="mb-3">
              <label for="stage" class="form-label">Fase</label>
              <input type="text" class="form-control" id="stage" v-model="formData.stage" required>
            </div>
          </div>
        </div>
      </div>

      <div class="row justify-content-center mt-4">
        <div class="col-auto">
          <TextButton display-style="secondary" class="me-2" @click="prevStep">
            Vorige
          </TextButton>
        </div>
        <div class="col-auto">
          <TextButton @click="nextStep">
            Volgende
          </TextButton>
        </div>
      </div>

    </form>
  </div>

  <!-- Step 2: Doelen -->
  <div v-if="currentStep === 2">
    <PageTitle>Behoefteanalyse</PageTitle>

    <form @submit.prevent="submitForm" class="rounded py-5 shadow-sm bg-white">
      <div class="row">
        <div class="col-1"></div>

        <div class="col-7">
          <SubHeader>Stap 2: Doelen</SubHeader>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget imperdiet neque, ac ultrices nunc. Praesent
            non turpis elementum, vestibulum augue sit amet, interdum justo.</p>

          <div class="col-8">
            <div class="mb-3">
              <label for="serviceInformation" class="form-label">Service informatie</label>
              <input type="text" class="form-control" id="serviceInformation" v-model="formData.serviceInformation"
                required>
            </div>

            <div class="mb-3">
              <label for="businessGoals" class="form-label">Doelen</label>
              <input type="text" class="form-control" id="businessGoals" v-model="formData.businessGoals" required>
            </div>

            <div class="mb-3">
              <label for="painPoints" class="form-label">Pijnpunten</label>
              <input type="text" class="form-control" id="painPoints" v-model="formData.painPoints" required>
            </div>
          </div>
        </div>
      </div>

      <div class="row justify-content-center mt-4">
        <div class="col-auto">
          <TextButton display-style="secondary" class="me-2" @click="prevStep">
            Vorige
          </TextButton>
        </div>
        <div class="col-auto">
          <TextButton @click="nextStep">
            Volgende
          </TextButton>
        </div>
      </div>

    </form>
  </div>

  <!-- Step 3: Doelgroep -->
  <div v-if="currentStep === 3">
    <PageTitle>Behoefteanalyse</PageTitle>

    <form @submit.prevent="submitForm" class="rounded py-5 shadow-sm bg-white">
      <div class="row">
        <div class="col-1"></div>

        <div class="col-7">
          <SubHeader>Stap 3: Doelgroep</SubHeader>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget imperdiet neque, ac ultrices nunc. Praesent
            non turpis elementum, vestibulum augue sit amet, interdum justo.</p>

          <div class="col-8">
            <div class="mb-3">
              <label for="targetAudience" class="form-label">Doelgroep</label>
              <input type="text" class="form-control" id="targetAudience" v-model="formData.targetAudience" required>
            </div>

            <div class="mb-3">
              <label for="competitors" class="form-label">Concurrentie</label>
              <input type="text" class="form-control" id="competitors" v-model="formData.competitors" required>
            </div>

            <div class="mb-3">
              <label for="budget" class="form-label">Budget</label>
              <input type="text" class="form-control" id="budget" v-model="formData.budget" required>
            </div>
          </div>
        </div>
      </div>

      <div class="row justify-content-center mt-4">
        <div class="col-auto">
          <TextButton display-style="secondary" class="me-2" @click="prevStep">
            Vorige
          </TextButton>
        </div>
        <div class="col-auto">
          <TextButton type="success" @click="nextStep">
            Voltooi analyse
          </TextButton>
        </div>
      </div>

    </form>
  </div>

  <div class="progress-bar">
    <template v-for="(step, index) in 3" :key="index">
      <div v-if="index === 0" class="progress-circle not-active"
        :class="{ 'active': currentStep === 1, 'completed': currentStep > 1 }"></div>
      <div v-else class="progress-line"></div>
      <div v-if="index > 0" class="progress-circle not-active"
        :class="{ 'active': currentStep === index + 1, 'completed': currentStep > index + 1 }"></div>
    </template>
  </div>
</template>

<style scoped>
.progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  flex-direction: row;
}

.progress-circle {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}

.not-active {
  background-color: var(--bs-secondary);
}

.active {
  background-color: var(--bs-primary);
}

.completed {
  background-color: var(--bs-success);
}

.progress-line {
  width: 20px;
  height: 2px;
  background-color: #ddd;
  margin: 0 5px;
  display: inline-block;
}
</style>
