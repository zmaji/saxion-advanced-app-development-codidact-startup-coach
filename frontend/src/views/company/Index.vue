<script setup lang="ts">
  import type { FormData, FormStep } from '@/typings/form';

  import { reactive, ref } from 'vue';

  import {
    TextButton,
    PageTitle,
    SubTitle,
    SecondaryTitle,
    SubHeader
  } from '@/components';

  // let currentStep = ref(0);
  let currentStep = ref<FormStep | null>(null);
  let currentStepFields = ref<FormData[] | null>(null);
  let showForm = ref(false);
  let showInformation = ref(true);
  let finishedAnalysis = ref(false);
  let canValidate = ref(false);
  let showOverview = ref(false);

  let formSteps = reactive({
    1: {
      number: 1,
      name: 'Bedrijfsgegevens',
      description: 'Vul de benodigde informatie in met betrekking tot de bedrijfsgegevens.',
      completed: false,
    },
    2: {
      number: 2,
      name: 'Doelen',
      description: 'Definieer de doelen die het bedrijf in de toekomst wil bereiken.',
      completed: false,
    },
    3: {
      number: 3,
      name: 'Doelgroep',
      description: 'Identificeer en beschrijf de doelgroep van het bedrijf.',
      completed: false,
    },
  } as Record<string, FormStep>);

  let formData = reactive({
    industry: {
      label: 'Industrie',
      step: formSteps[1],
      value: '',
      isValid: false,
      errorMessage: 'Vul een geldige industrie in.',
    },
    nrOfEmployees: {
      label: 'Aantal werknemers',
      step: formSteps[1],
      value: '',
      isValid: false,
      errorMessage: 'Vul een geldig aantal werknemers in.',
    },
    stage: {
      label: 'Fase',
      step: formSteps[1],
      value: '',
      isValid: false,
      errorMessage: 'Vul een geldige fase in.',
    },
    serviceInformation: {
      label: 'Service informatie',
      step: formSteps[2],
      value: '',
      isValid: false,
      errorMessage: 'Vul geldige service-informatie in.',
    },
    businessGoals: {
      label: 'Doelen',
      step: formSteps[2],
      value: '',
      isValid: false,
      errorMessage: 'Vul geldige zakelijke doelen in.',
    },
    painPoints: {
      label: 'Pijnpunten',
      step: formSteps[2],
      value: '',
      isValid: false,
      errorMessage: 'Vul geldige pijnpunten in.',
    },
    targetAudience: {
      label: 'Doelgroep',
      step: formSteps[3],
      value: '',
      isValid: false,
      errorMessage: 'Vul een geldige doelgroep in.',
    },
    competitors: {
      label: 'Competitie',
      step: formSteps[3],
      value: '',
      isValid: false,
      errorMessage: 'Vul geldige informatie over concurrenten in.',
    },
    budget: {
      label: 'Budget',
      step: formSteps[3],
      value: '',
      isValid: false,
      errorMessage: 'Vul een geldig budget in.',
    },
  } as Record<string, FormData>);

  const startAnalysis = () => {
    showInformation.value = false;
    showForm.value = true;
    // currentStep.value += 1;
    currentStep.value = formSteps[1];
    currentStepFields.value = getCurrentStepFields();
  }

  const nextStep = () => {
    // const currentStepFields = Object.values(formData).slice(
    //   (currentStep.value - 1) * 3,
    //   currentStep.value * 3
    // );

    currentStepFields.value = getCurrentStepFields();

    const isStepValid = currentStepFields.value.every((field) => {
      canValidate.value = true;
      field.isValid = field.value !== '';

      return field.isValid;
    });

    if (isStepValid) {
      // currentStep.value += 1;
      currentStep.value.completed = true;
      currentStep.value = formSteps[currentStep.value!.number + 1]
      currentStepFields.value = getCurrentStepFields();
      showInformation.value = false;
      showForm.value = true;
      canValidate.value = false;
    } else {
      alert('Vul alle verplichte velden in.');
      currentStep.value.completed = false;
    }
  };

  const previousStep = () => {
    canValidate.value = true;

    // if (currentStep.value === 1) {
    if (currentStep.value === formSteps[1]) {
      showInformation.value = true;
      showForm.value = false;
      alert('U gaat terug naar het overzicht.');
    } else {
      currentStep.value = formSteps[currentStep.value!.number - 1]
      currentStepFields.value = getCurrentStepFields();
    }
    // currentStep.value -= 1;
  };

  const continueAnalysis = () => {
    showForm.value = true;
    showInformation.value = false;

    if (!currentStep.value) {
      currentStep.value = formSteps[1];
      currentStepFields.value = getCurrentStepFields();
    }
  };

  const restartAnalysis = () => {
    resetForm();
    finishedAnalysis.value = false;
    showInformation.value = false;
    showForm.value = true;
    // currentStep.value = 1;
    currentStep.value = formSteps[1];
    currentStep.value.completed = false;
    alert('U herstart de analyse.');
  };

  const goToOverview = () => {
    showInformation.value = true;
    showForm.value = false;
    alert('U gaat terug naar het overzicht.');
  };

  const reviewForm = () => {
    // const currentStepFields = Object.values(formData).slice(
    //   (currentStep.value - 1) * 3,
    //   currentStep.value * 3
    // );

    currentStepFields.value = getCurrentStepFields();

    const isFormValid = currentStepFields.value.every((field) => {
      canValidate.value = true;
      field.isValid = field.value.length > 0;
      console.log(field)
      console.log(field.value)
      console.log(field.value.length)

      return field.isValid;
    });

    if (isFormValid) {
      showForm.value = false;
      showOverview.value = true;
      canValidate.value = false;
    }
  }

  const closeOverview = () => {
    showForm.value = true;
    showOverview.value = false;
  }

  const submitForm = () => {
    showOverview.value = false;
    finishedAnalysis.value = true;
    showInformation.value = true;
    showForm.value = false;
    alert('Analyse succesvol opgeslagen.');
  };

  const resetForm = () => {
    for (const key in formData) {
      // @ts-ignore
      formData[key].value = '';
      // @ts-ignore
      formData[key].isValid = false;
    }
    currentStep.value = formSteps[1];
    currentStepFields.value = getCurrentStepFields();
    canValidate.value = false;
  };

  const getCurrentStepFields = () => {
    return Object.values(formData).filter((field) => field.step === currentStep.value);
  }
</script>

<template>
  <div v-if="!showForm && showInformation">
    <PageTitle>Bedrijfsoverzicht</PageTitle>

    <SecondaryTitle>Behoefteanalyse</SecondaryTitle>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed eget imperdiet neque, ac ultrices nunc. Praesent non
      turpis elementum, vestibulum augue sit amet, interdum justo.
      Nunc gravida eros in lorem interdum sagittis. Fusce
      vulputate, turpis vel suscipit mattis, risus mauris dignissim felis, ut molestie urna libero eu magna.</p>

    <div class="row">
      <div v-if="!finishedAnalysis" class="col">
        <SubTitle type="secondary" v-if="!currentStep">Analyse nog niet begonnen</SubTitle>

        <SubTitle type="warning" v-if="currentStep">
          {{ currentStep.completed === true ? currentStep.number : currentStep.number - 1 }}
          /
          {{ Object.keys(formSteps).length }} stappen voltooid</SubTitle>
<!--        <SubTitle type="warning" v-if="currentStep === 3 && currentStep < 4">2/3 stappen voltooid</SubTitle>-->
      </div>

      <div v-else class="col">
        <SubTitle type="success" v-if="finishedAnalysis === true">Analyse voltooid</SubTitle>
      </div>
    </div>

    <div>
      <TextButton v-if="!currentStep" class="me-2" @click="startAnalysis">Start de analyse</TextButton>

      <TextButton v-if="currentStep && !finishedAnalysis" class="me-2" @click="continueAnalysis">
        Ga verder
      </TextButton>

      <TextButton v-if="currentStep" class="me-2" type="danger" display-style="secondary" @click="restartAnalysis">
        Herstart de analyse
      </TextButton>
    </div>
  </div>

  <div v-if="currentStep && showForm">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <PageTitle>Behoefteanalyse</PageTitle>

      <TextButton type="primary" display-style="secondary" @click="goToOverview">
        Terug naar overzicht
      </TextButton>
    </div>

    <form @submit.prevent="submitForm" class="rounded py-5 shadow-sm bg-white">
      <div class="row">
        <div class="col-1"/>

        <div class="col-7">
          <SubHeader>Stap {{ currentStep.number }}: {{ currentStep.name }}</SubHeader>

          <p>{{ currentStep.description }}</p>

          <div class="col-7">
            <div class="pb-3" v-for="(formField, key) in currentStepFields" :key="key">
              <label :for="formField.label" class="form-label">{{ formField.label }}</label>

              <input
                type="text"
                class="form-control"
                :id="formField.label"
                v-model="formField.value"
                :class="{ 'is-invalid': !formField.isValid && canValidate }"
              >

              <small class="invalid-feedback">{{ formField.errorMessage }}</small>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex flex-row align-items-center justify-content-center pt-5">
        <template v-if="currentStep.number > 0">
          <template v-for="(step, key, index) in formSteps" :key="key">
            <div
              v-if="index === 0" class="progress-circle not-active"
              :class="{ 'active': currentStep.number === 1, 'completed': currentStep.number > 1 }"
            />

            <div v-else class="progress-line"/>

            <div
              v-if="index > 0"
              class="progress-circle not-active"
              :class="{ 'active': currentStep.number === index + 1, 'completed': currentStep.number > index + 1 }"
            />
          </template>
        </template>
      </div>

      <div class="d-flex flex-wrap justify-content-center pt-4">
        <TextButton
          v-if="currentStep && currentStep.number === 1"
          type="secondary" display-style="secondary" class="me-4"
        >
          Vorige
        </TextButton>

        <TextButton v-else display-style="secondary" class="me-4" @click="previousStep">
          Vorige
        </TextButton>

        <TextButton v-if="currentStep.number !== Object.keys(formSteps).length" @click="nextStep">
          Volgende
        </TextButton>

        <TextButton v-else type="primary" @click="reviewForm">
          Controleer analyse
        </TextButton>
      </div>
    </form>
  </div>

  <!-- Step 1: Bedrijfsgegevens -->
  <div v-if="currentStep && currentStep.number === 1 && showForm">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <PageTitle>Behoefteanalyse</PageTitle>

      <TextButton type="primary" display-style="secondary" @click="goToOverview">
        Terug naar overzicht
      </TextButton>
    </div>

    <form @submit.prevent="submitForm" class="rounded py-5 shadow-sm bg-white">
      <div class="row">
        <div class="col-1"></div>

        <div class="col-7">
          <SubHeader>Stap 1: Bedrijfsgegevens</SubHeader>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed eget imperdiet neque, ac ultrices nunc. Praesent
            non turpis elementum, vestibulum augue sit amet, interdum justo.</p>

          <div class="col-7">
            <div class="mb-3">
              <div class="mb-3">
                <label for="industry" class="form-label">Industrie</label>
                <input type="text" class="form-control" id="industry" v-model="formData.industry.value"
                  :class="{ 'is-invalid': !formData.industry.isValid && canValidate }">
                <div class="invalid-feedback">{{ formData.industry.errorMessage }}</div>
              </div>
            </div>

            <div class="mb-3">
              <label for="nrOfEmployees" class="form-label">Aantal werknemers</label>
              <input type="text" class="form-control" id="nrOfEmployees" v-model="formData.nrOfEmployees.value"
                :class="{ 'is-invalid': !formData.nrOfEmployees.isValid && canValidate }">
              <div class="invalid-feedback">{{ formData.nrOfEmployees.errorMessage }}</div>
            </div>

            <div class="mb-3">
              <label for="stage" class="form-label">Fase</label>
              <input type="text" class="form-control" id="stage" v-model="formData.stage.value"
                :class="{ 'is-invalid': !formData.stage.isValid && canValidate }">
              <div class="invalid-feedback">{{ formData.stage.errorMessage }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="progress-bar mt-5">
        <template v-if="currentStep.number > 0">
          <template v-for="(step, key, index) in formSteps" :key="index">
            <div v-if="index === 0" class="progress-circle not-active"
              :class="{ 'active': currentStep.number === 1, 'completed': currentStep.number > 1 }"/>
            <div v-else class="progress-line"/>
            <div v-if="index > 0" class="progress-circle not-active"
              :class="{ 'active': currentStep.number === index + 1, 'completed': currentStep.number > index + 1 }"/>
          </template>
        </template>
      </div>

      <div class="d-flex flex-wrap justify-content-center pt-4">
          <TextButton type="secondary" display-style="secondary" class="me-4">
            Vorige
          </TextButton>

          <TextButton @click="nextStep">
            Volgende
          </TextButton>
      </div>
    </form>
  </div>

  <!-- Step 2: Doelen -->
  <div v-if="currentStep && currentStep.number === 2 && showForm">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <PageTitle>Behoefteanalyse</PageTitle>

      <TextButton type="primary" display-style="secondary" @click="goToOverview">
        Terug naar overzicht
      </TextButton>
    </div>

    <form @submit.prevent="submitForm" class="rounded py-5 shadow-sm bg-white">
      <div class="row">
        <div class="col-1"></div>

        <div class="col-7">
          <SubHeader>Stap 2: Doelen</SubHeader>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed eget imperdiet neque, ac ultrices nunc. Praesent
            non turpis elementum, vestibulum augue sit amet, interdum justo.</p>

          <div class="col-8">
            <div class="mb-3">
              <label for="serviceInformation" class="form-label">Service informatie</label>
              <input
                type="text"
                class="form-control"
                id="serviceInformation"
                v-model="formData.serviceInformation.value"
                :class="{ 'is-invalid': !formData.serviceInformation.isValid && canValidate }"
                required
              >
              <div class="invalid-feedback">{{ formData.serviceInformation.errorMessage }}</div>
            </div>

            <div class="mb-3">
              <label for="businessGoals" class="form-label">Doelen</label>
              <input type="text" class="form-control" id="businessGoals" v-model="formData.businessGoals.value"
                :class="{ 'is-invalid': !formData.businessGoals.isValid && canValidate }" required>
              <div class="invalid-feedback">{{ formData.businessGoals.errorMessage }}</div>
            </div>

            <div class="mb-3">
              <label for="painPoints" class="form-label">Pijnpunten</label>
              <input type="text" class="form-control" id="painPoints" v-model="formData.painPoints.value"
                :class="{ 'is-invalid': !formData.painPoints.isValid && canValidate }" required>
              <div class="invalid-feedback">{{ formData.painPoints.errorMessage }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="progress-bar mt-5">
        <template v-if="currentStep.number > 0">
          <template v-for="(step, key, index) in formSteps" :key="index">
            <div
              v-if="index === 0"
              class="progress-circle not-active" :class="{ 'completed': currentStep.number > 1 }"
            />
            <div v-else class="progress-line"></div>
            <div v-if="index > 0" class="progress-circle not-active"
              :class="{ 'active': currentStep.number === index + 1, 'completed': currentStep.number > index + 1 }"/>
          </template>
        </template>
      </div>

      <div class="d-flex flex-wrap justify-content-center pt-4">
          <TextButton display-style="secondary" class="me-4" @click="previousStep">
            Vorige
          </TextButton>

          <TextButton @click="nextStep">
            Volgende
          </TextButton>
      </div>
    </form>
  </div>

  <!-- Step 3: Doelgroep -->
  <div v-if="currentStep && currentStep.number === 3 && showForm">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <PageTitle>Behoefteanalyse</PageTitle>

      <TextButton type="primary" display-style="secondary" @click="goToOverview">
        Terug naar overzicht
      </TextButton>
    </div>

    <form @submit.prevent="submitForm" class="rounded py-5 shadow-sm bg-white">
      <div class="row">
        <div class="col-1"></div>

        <div class="col-7">
          <SubHeader>Stap 3: Doelgroep</SubHeader>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed eget imperdiet neque, ac ultrices nunc. Praesent
            non turpis elementum, vestibulum augue sit amet, interdum justo.</p>

          <div class="col-8">
            <div class="mb-3">
              <label for="targetAudience" class="form-label">Doelgroep</label>
              <input type="text" class="form-control" id="targetAudience" v-model="formData.targetAudience.value"
                :class="{ 'is-invalid': !formData.targetAudience.isValid && canValidate }" required>
              <div class="invalid-feedback">{{ formData.targetAudience.errorMessage }}</div>
            </div>

            <div class="mb-3">
              <label for="competitors" class="form-label">Concurrentie</label>
              <input type="text" class="form-control" id="competitors" v-model="formData.competitors.value"
                :class="{ 'is-invalid': !formData.competitors.isValid && canValidate }" required>
              <div class="invalid-feedback">{{ formData.competitors.errorMessage }}</div>
            </div>

            <div class="mb-3">
              <label for="budget" class="form-label">Budget</label>
              <input type="text" class="form-control" id="budget" v-model="formData.budget.value"
                :class="{ 'is-invalid': !formData.budget.isValid && canValidate }" required>
              <div class="invalid-feedback">{{ formData.budget.errorMessage }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="progress-bar mt-5">
        <template v-if="currentStep.number > 0">
          <template v-for="(step, key, index) in formSteps" :key="index">
            <div
              v-if="index === 0"
              class="progress-circle not-active" :class="{ 'completed': currentStep.number > 1 }"
            />
            <div v-else class="progress-line"></div>
            <div v-if="index > 0" class="progress-circle not-active"
              :class="{ 'active': currentStep.number === index + 1, 'completed': currentStep.number > index + 1 }"/>
          </template>
        </template>
      </div>

      <div class="d-flex flex-wrap justify-content-center pt-4">
          <TextButton display-style="secondary" class="me-4" @click="previousStep">
            Vorige
          </TextButton>

          <TextButton type="primary" @click="reviewForm">
            Controleer analyse
          </TextButton>
      </div>
    </form>
  </div>

  <!-- Controleer gegevens -->
  <div v-if="showOverview">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <PageTitle>Behoefteanalyse</PageTitle>
    </div>

    <div class="row rounded py-5 shadow-sm bg-white">
      <div class="col-1"></div>

      <div class="col-7">
        <SubHeader>Controleer uw gegevens</SubHeader>
        <SubTitle>Deze gegevens zijn nog niet definitief</SubTitle>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget imperdiet neque, ac ultrices nunc. Praesent
          non turpis elementum, vestibulum augue sit amet, interdum justo.</p>

        <div v-for="(formStep, key) in formSteps" :key="key">
          <div class="pb-3">
            <SubHeader class="pb-1">{{ formStep.name }}</SubHeader>

            <div v-for="(formField, fieldKey) in formData" :key="fieldKey">
              <div v-if="formField.step === formStep" class="d-flex">
                <div class="fw-bold me-2">{{ formField.label }}:</div>
                <p class="mb-0 pb-2">{{ formField.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="d-inline-flex flex-wrap justify-content-center">
          <TextButton display-style="secondary" class="me-4" @click="closeOverview">
            Wijzig analyse
          </TextButton>

          <TextButton type="success" @click="submitForm">
            Voltooi Analyse
          </TextButton>
      </div>
    </div>
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
  background-color: var(--bs-border-color);
  margin: 0 5px;
  display: inline-block;
}

.not-active {
  border: 2px solid var(--bs-border-color);
  background-color: white;
}

.active {
  border: 2px solid var(--bs-primary);
  background-color: var(--bs-primary-bg-subtle);
}

.completed {
  border: 2px solid var(--bs-success);
  background-color: var(--bs-success-bg-subtle);
}

.is-invalid {
  border-color: var(--bs-danger);
}

.invalid-feedback {
  color: var(--bs-danger);
}
</style>