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
let showForm = ref(false);
let showInformation = ref(true);
let finishedAnalysis = ref(false);
let canValidate = ref(false);

const startAnalysis = () => {
  showInformation.value = false;
  showForm.value = true;
  currentStep.value += 1;
}

const nextStep = () => {
  const currentStepFields = Object.values(formData).slice(
    (currentStep.value - 1) * 3,
    currentStep.value * 3
  );

  const isStepValid = currentStepFields.every((field) => {
    canValidate.value = true;
    field.valid = field.value !== '';
    return field.valid;
  });

  if (isStepValid) {
    currentStep.value += 1;
    showInformation.value = false;
    showForm.value = true;
    canValidate.value = false;
  } else {
    alert('Vul alle verplichte velden in.');
  }
};

const previousStep = () => {
  canValidate.value = true;

  if (currentStep.value === 1) {
    showInformation.value = true;
    showForm.value = false;
    alert('U gaat terug naar het overzicht.');
  }
  currentStep.value -= 1;
};

const continueAnalysis = () => {
  showForm.value = true;
  showInformation.value = false;
};

const restartAnalysis = () => {
  resetForm();
  finishedAnalysis.value = false;
  showInformation.value = false;
  showForm.value = true;
  currentStep.value = 1;
  alert('U herstart de analyse.');
};

const goToOverview = () => {
  showInformation.value = true;
  showForm.value = false;
  alert('U herstart de analyse.');
};

let formData = reactive({
  industry: {
    value: '',
    valid: false,
    errorMessage: 'Vul een geldige industrie in.',
  },
  nrOfEmployees: {
    value: '',
    valid: false,
    errorMessage: 'Vul een geldig aantal werknemers in.',
  },
  stage: {
    value: '',
    valid: false,
    errorMessage: 'Vul een geldige fase in.',
  },
  serviceInformation: {
    value: '',
    valid: false,
    errorMessage: 'Vul geldige service-informatie in.',
  },
  businessGoals: {
    value: '',
    valid: false,
    errorMessage: 'Vul geldige zakelijke doelen in.',
  },
  painPoints: {
    value: '',
    valid: false,
    errorMessage: 'Vul geldige pijnpunten in.',
  },
  targetAudience: {
    value: '',
    valid: false,
    errorMessage: 'Vul een geldige doelgroep in.',
  },
  competitors: {
    value: '',
    valid: false,
    errorMessage: 'Vul geldige informatie over concurrenten in.',
  },
  budget: {
    value: '',
    valid: false,
    errorMessage: 'Vul een geldig budget in.',
  },
});

const submitForm = () => {
  const currentStepFields = Object.values(formData).slice(
    (currentStep.value - 1) * 3,
    currentStep.value * 3
  );

  const isFormValid = currentStepFields.every((field) => {
    canValidate.value = true;
    field.valid = field.value !== '';
    return field.valid;
  });

  if (isFormValid) {
    finishedAnalysis.value = true;
    showInformation.value = true;
    showForm.value = false;
    canValidate.value = false;
    alert('Analyse succesvol opgeslagen.');
  } else {
    alert('Vul alle verplichte velden in.');
  }
};

const resetForm = () => {
  for (const key in formData) {
    // @ts-ignore
    formData[key].value = '';
    // @ts-ignore
    formData[key].valid = false;
  }
  currentStep.value = 1;
  canValidate.value = false;
};
</script>

<template>
  <div v-if="!showForm && showInformation">
    <PageTitle>Bedrijfsoverzicht</PageTitle>

    <SecondaryTitle>Behoefteanalyse</SecondaryTitle>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget imperdiet neque, ac ultrices nunc. Praesent non
      turpis elementum, vestibulum augue sit amet, interdum justo. Nunc gravida eros in lorem interdum sagittis. Fusce
      vulputate, turpis vel suscipit mattis, risus mauris dignissim felis, ut molestie urna libero eu magna.</p>

    <div class="row">
      <div v-if="!finishedAnalysis" class="col">
        <SubTitle type="secondary" v-if="currentStep === 0">0/3 stappen voltooid</SubTitle>
        <SubTitle type="secondary" v-if="currentStep === 1">0/3 stappen voltooid</SubTitle>

        <SubTitle type="warning" v-if="currentStep === 2 && currentStep < 4">1/3 stappen voltooid</SubTitle>
        <SubTitle type="warning" v-if="currentStep === 3 && currentStep < 4">2/3 stappen voltooid</SubTitle>
      </div>

      <div v-else class="col">
        <SubTitle type="success" v-if="finishedAnalysis === true">3/3 stappen voltooid</SubTitle>
      </div>
    </div>

    <div>
      <TextButton v-if="currentStep === 0" class="me-2" @click="startAnalysis">Start de analyse</TextButton>

      <TextButton v-if="currentStep > 0 && !finishedAnalysis" class="me-2" @click="continueAnalysis">Ga verder
      </TextButton>
      <TextButton v-if="currentStep > 0" class="me-2" type="warning" @click="restartAnalysis">Herstart de analyse
      </TextButton>
    </div>
  </div>

  <!-- Step 1: Bedrijfsgegevens -->
  <div v-if="currentStep === 1 && showForm">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <PageTitle>Behoefteanalyse</PageTitle>

      <TextButton type="warning" @click="goToOverview">
        Terug naar overzicht
      </TextButton>
    </div>

    <form @submit.prevent="submitForm" class="rounded py-5 shadow-sm bg-white">
      <div class="row">
        <div class="col-1"></div>

        <div class="col-7">
          <SubHeader>Stap 1: Bedrijfsgegevens</SubHeader>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget imperdiet neque, ac ultrices nunc. Praesent
            non turpis elementum, vestibulum augue sit amet, interdum justo.</p>

          <div class="col-7">
            <div class="mb-3">
              <div class="mb-3">
                <label for="industry" class="form-label">Industrie</label>
                <input type="text" class="form-control" id="industry" v-model="formData.industry.value"
                  :class="{ 'is-invalid': !formData.industry.valid && canValidate }">
                <div class="invalid-feedback">{{ formData.industry.errorMessage }}</div>
              </div>
            </div>

            <div class="mb-3">
              <label for="nrOfEmployees" class="form-label">Aantal werknemers</label>
              <input type="text" class="form-control" id="nrOfEmployees" v-model="formData.nrOfEmployees.value"
                :class="{ 'is-invalid': !formData.nrOfEmployees.valid && canValidate }">
              <div class="invalid-feedback">{{ formData.nrOfEmployees.errorMessage }}</div>
            </div>

            <div class="mb-3">
              <label for="stage" class="form-label">Fase</label>
              <input type="text" class="form-control" id="stage" v-model="formData.stage.value"
                :class="{ 'is-invalid': !formData.stage.valid && canValidate }">
              <div class="invalid-feedback">{{ formData.stage.errorMessage }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="progress-bar mt-5">
        <template v-if="currentStep > 0">
          <template v-for="(step, index) in 3" :key="index">
            <div v-if="index === 0" class="progress-circle not-active"
              :class="{ 'active': currentStep === 1, 'completed': currentStep > 1 }"></div>
            <div v-else class="progress-line"></div>
            <div v-if="index > 0" class="progress-circle not-active"
              :class="{ 'active': currentStep === index + 1, 'completed': currentStep > index + 1 }"></div>
          </template>
        </template>
      </div>

      <div class="row justify-content-center mt-4">
        <div class="col-auto">
          <TextButton display-style="secondary" class="me-2" @click="previousStep">
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
  <div v-if="currentStep === 2 && showForm">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <PageTitle>Behoefteanalyse</PageTitle>

      <TextButton type="warning" @click="goToOverview">
        Terug naar overzicht
      </TextButton>
    </div>

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
              <input type="text" class="form-control" id="serviceInformation" v-model="formData.serviceInformation.value"
                :class="{ 'is-invalid': !formData.serviceInformation.valid && canValidate }" required>
              <div class="invalid-feedback">{{ formData.serviceInformation.errorMessage }}</div>
            </div>

            <div class="mb-3">
              <label for="businessGoals" class="form-label">Doelen</label>
              <input type="text" class="form-control" id="businessGoals" v-model="formData.businessGoals.value"
                :class="{ 'is-invalid': !formData.businessGoals.valid && canValidate }" required>
              <div class="invalid-feedback">{{ formData.businessGoals.errorMessage }}</div>
            </div>

            <div class="mb-3">
              <label for="painPoints" class="form-label">Pijnpunten</label>
              <input type="text" class="form-control" id="painPoints" v-model="formData.painPoints.value"
                :class="{ 'is-invalid': !formData.painPoints.valid && canValidate }" required>
              <div class="invalid-feedback">{{ formData.painPoints.errorMessage }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="progress-bar mt-5">
        <template v-if="currentStep > 0">
          <template v-for="(step, index) in 3" :key="index">
            <div v-if="index === 0" class="progress-circle not-active" :class="{ 'completed': currentStep > 1 }"></div>
            <div v-else class="progress-line"></div>
            <div v-if="index > 0" class="progress-circle not-active"
              :class="{ 'active': currentStep === index + 1, 'completed': currentStep > index + 1 }"></div>
          </template>
        </template>
      </div>

      <div class="row justify-content-center mt-4">
        <div class="col-auto">
          <TextButton display-style="secondary" class="me-2" @click="previousStep">
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
  <div v-if="currentStep === 3 && showForm">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <PageTitle>Behoefteanalyse</PageTitle>

      <TextButton type="warning" @click="goToOverview">
        Terug naar overzicht
      </TextButton>
    </div>

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
              <input type="text" class="form-control" id="targetAudience" v-model="formData.targetAudience.value"
                :class="{ 'is-invalid': !formData.targetAudience.valid && canValidate }" required>
              <div class="invalid-feedback">{{ formData.targetAudience.errorMessage }}</div>
            </div>

            <div class="mb-3">
              <label for="competitors" class="form-label">Concurrentie</label>
              <input type="text" class="form-control" id="competitors" v-model="formData.competitors.value"
                :class="{ 'is-invalid': !formData.competitors.valid && canValidate }" required>
              <div class="invalid-feedback">{{ formData.competitors.errorMessage }}</div>
            </div>

            <div class="mb-3">
              <label for="budget" class="form-label">Budget</label>
              <input type="text" class="form-control" id="budget" v-model="formData.budget.value"
                :class="{ 'is-invalid': !formData.budget.valid && canValidate }" required>
              <div class="invalid-feedback">{{ formData.budget.errorMessage }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="progress-bar mt-5">
        <template v-if="currentStep > 0">
          <template v-for="(step, index) in 3" :key="index">
            <div v-if="index === 0" class="progress-circle not-active" :class="{ 'completed': currentStep > 1 }"></div>
            <div v-else class="progress-line"></div>
            <div v-if="index > 0" class="progress-circle not-active"
              :class="{ 'active': currentStep === index + 1, 'completed': currentStep > index + 1 }"></div>
          </template>
        </template>
      </div>

      <div class="row justify-content-center mt-4">
        <div class="col-auto">
          <TextButton display-style="secondary" class="me-2" @click="previousStep">
            Vorige
          </TextButton>
        </div>

        <div class="col-auto">
          <TextButton type="success" @click="submitForm">
            Voltooi analyse
          </TextButton>
        </div>
      </div>

    </form>
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

.progress-line {
  width: 20px;
  height: 2px;
  background-color: #ddd;
  margin: 0 5px;
  display: inline-block;
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

.is-invalid {
  border-color: #dc3545 !important;
}

.invalid-feedback {
  color: #dc3545;
}
</style>