<script setup lang="ts">
  import type { FormData, FormStep } from '@/typings/Form';
  import type { User } from '@/typings/User';
  import type { Company } from '@/typings/Company';
  import type { CompanyAnalysis } from '@/typings/CompanyAnalysis';
  import type { AnalysisSection } from '@/typings/AnalysisSection';
  import type { QuestionSet } from '@/typings/QuestionSet';
  import type { Question } from '@/typings/Question';
  import type { QuestionOption } from '@/typings/QuestionOption';
  import type { Answer } from '@/typings/Answer';

  import { onMounted, ref, type Ref } from 'vue';
  import httpService from '../../plugins/http/httpService';
  import { useTokenStore } from '../../stores/token';
  import { jwtDecode } from 'jwt-decode';
  import { toast } from 'vue3-toastify';

  import {
    TextButton,
    PageTitle,
    SubTitle,
    SecondaryTitle,
    SubHeader
  } from '@/components';

  const tokenStore = useTokenStore();
  const currentUser = ref<User | null>(null);
  const currentCompany = ref<Company | null>(null);
  const currentAnalysis = ref<CompanyAnalysis | null>(null);
  const analysisSections: Ref<AnalysisSection[]> = ref<AnalysisSection[]>([]);
  const categories = ref<string[] | null>(null);
  const companyPhase = ref<string>('');

  let formSteps: Record<string, FormStep> = {};
  let formData: Record<string, FormData> = {};
  const currentStep = ref<FormStep>();
  const currentStepFields = ref<FormData[] | null>(null);
  const showForm = ref(false);
  const showInformation = ref(true);
  const canValidate = ref(false);
  const showOverview = ref(false);

  const fetchUser = async () => {
    try {
      const userToken = tokenStore.getToken;
      currentUser.value = jwtDecode(userToken);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const fetchCurrentCompany = async () => {
    try {
      fetchUser();
      const response = await httpService.getRequest<Company>(
        `/companies/${currentUser.value?.company}`
      );

      if (response && response.data) {
        currentCompany.value = response.data;
        if (currentCompany.value.companyAnalysis) {
          fetchCurrentAnalysis();
        }
      }
    } catch (error) {
      console.error('Error fetching current company:', error);
    }
  };

  const fetchCurrentAnalysis = async () => {
    try {
      const response = await httpService.getRequest<CompanyAnalysis>(
        `/companyAnalyses/${currentCompany.value?.companyAnalysis}`
      );

      if (response && response.data) {
        currentAnalysis.value = response.data;
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const fetchAnalysisSection = async (analysisSectionID: string) => {
    try {
      const response = await httpService.getRequest<AnalysisSection>(`/analysisSections/${analysisSectionID}`, false);

      if (response && response.data) {
        analysisSections.value.push(response.data);
      }

      if (analysisSections.value && analysisSections.value.length > 0) {
        initialiseCategories();
        analysisSections.value.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
      }
    } catch (e) {
      console.error(e);
    }
  }

  const fetchAnalysisSections = async () => {
    try {
      const response = await httpService.getRequest<AnalysisSection[]>('/analysisSections/', false);

      if (response && response.data) {
        await Promise.all(response.data.map(
          (analysisSection) => fetchAnalysisSection(analysisSection.analysisSectionID)
        ));
      }
    } catch (e) {
      console.error(e);
    }
  }

  const initialiseCategories = () => {
    const uniqueCategories = new Set<string>(
      analysisSections.value.flatMap((section) =>
        section.questionSets
          .filter((questionSet) => typeof questionSet.title === 'string')
          .map((questionSet) => questionSet.title)
      )
    );
    categories.value = Array.from(uniqueCategories);
  };

  /**
 * Sets up form data and form steps based on the provided analysis section and question set.
 *
 * @param {AnalysisSection} analysisSection - The analysis section to set up.
 * @param {QuestionSet} questionSet - The question set within the analysis section.
 * @param {number} formStepIndex - The index for the form step.
 * @param {number} formDataIndex - The index for the form data.
 * @returns {void}
 */
  const setupFormData = (
    analysisSection: AnalysisSection,
    questionSet: QuestionSet,
    formStepIndex: number,
    formDataIndex: number
  ) => {
    formSteps[formStepIndex] = {
      number: formStepIndex,
      title: `${analysisSection.title}`,
      subtitle: `${questionSet.title}`,
      description: questionSet.description,
      completed: false,
    };

    questionSet.questions?.forEach((question: Question) => {
      formData[formDataIndex] = {
        label: question.title,
        step: formSteps[formStepIndex],
        value: '',
        inputType: question.inputType,
        options: question.questionOptions,
        isValid: false,
        errorMessage: 'Dit is een verplicht veld.',
      };

      formDataIndex++;
    });
  };

  const setupInitialQuestion = (questionSetTitle: string) => {
    analysisSections.value.forEach((analysisSection: AnalysisSection) => {
      if (analysisSection) {
        analysisSection.questionSets
          .filter((questionSet: QuestionSet) => questionSet.title === questionSetTitle)
          .forEach((questionSet: QuestionSet) => {
            setupFormData(analysisSection, questionSet, 1, 1);
          });
      }
    });
  };

  /**
   * Sets up form steps and form data based on analysis sections and question sets filtered by company phase.
   *
   * @param {string} companyPhase - The current phase of the company.
   * @returns {void}
   */
  const setupForm = (companyPhase: string) => {
    let formStepIndex = 1;
    let formDataIndex = 1;

    analysisSections.value.forEach((analysisSection: AnalysisSection) => {
      if (analysisSection) {
        analysisSection.questionSets.forEach((questionSet: QuestionSet) => {
          if (questionSet.title !== 'Bedrijfsfase') {
            const filteredQuestions = questionSet.questions.filter(
              (question: Question) =>
                question.requiredPhase.includes(companyPhase.toLowerCase())
            );

            if (filteredQuestions.length > 0) {
              setupFormData(analysisSection, questionSet, formStepIndex, formDataIndex);

              formStepIndex++;
              formDataIndex += filteredQuestions.length;
            }
          }
        });
      }
    });
  };

  const startAnalysis = () => {
    setupInitialQuestion('Bedrijfsfase');
    showInformation.value = false;
    showForm.value = true;
    currentStep.value = formSteps[1];
    currentStepFields.value = getCurrentStepFields();
  }

  const resetInitialQuestion = () => {
    formSteps = {};
    formData = {};
    setupInitialQuestion('Bedrijfsfase');
    canValidate.value = true;
    currentStep.value = formSteps[1];
    currentStepFields.value = getCurrentStepFields();
  }

  const generateForm = () => {
    // @ts-ignore
    companyPhase.value = formData[1].value.value
    setupForm(companyPhase.value);
    currentStep.value = formSteps[1];
    currentStepFields.value = getCurrentStepFields();
  }

  /**
 * Move to the next step in the analysis.
 * Validates each value in the current step of the analysis form.
 * @returns {void} Nothing.
 */
  const nextStep = () => {
    currentStepFields.value = getCurrentStepFields();

    const isStepValid = currentStepFields.value.every((field) => {
      canValidate.value = true;
      field.isValid = field.value !== '';

      return field.isValid;
    });

    if (isStepValid) {
      if (currentStep.value?.title === 'Bedrijfsfase') {
        generateForm();
      } else {
        currentStep.value!.completed = true;
        currentStep.value = formSteps[currentStep.value!.number + 1]
        currentStepFields.value = getCurrentStepFields();
        showInformation.value = false;
        showForm.value = true;
        canValidate.value = false;
      }
    } else {
      toast.error('Vul alle verplichte velden in.', {
        position: toast.POSITION.TOP_RIGHT,
      });
      currentStep.value!.completed = false;
    }
  };

  const previousStep = () => {
    canValidate.value = true;
    currentStep.value = formSteps[currentStep.value!.number - 1]
    currentStepFields.value = getCurrentStepFields();
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
    resetInitialQuestion();
    currentAnalysis.value = null;
    showInformation.value = false;
    showForm.value = true;
    currentStep.value = formSteps[1];
    currentStepFields.value = getCurrentStepFields();
    currentStep.value.completed = false;
    toast.warning('U herstart de analyse.', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const goToOverview = () => {
    showInformation.value = true;
    showForm.value = false;
    toast.warning('U gaat terug naar het overzicht.', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const reviewForm = () => {
    currentStepFields.value = getCurrentStepFields();

    const isFormValid = currentStepFields.value.every((field) => {
      canValidate.value = true;

      field.isValid = typeof field.value === 'string' ? field.value.length > 0 : true;

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

  /**
   * Generates answers based on user input values and matched options.
   * @returns {Answer[]} An array of answers.
   */
  const generateAnswers = () => {
    const answers: Answer[] = [];

    for (const key in formData) {
      if (formData[key].value) {
        // @ts-ignore
        const selectedValue = formData[key].value.value;
        const matchingOption = formData[key].options.find(
          (questionOption: QuestionOption) => {
            questionOption.value === selectedValue
          }
        );

        if (matchingOption) {
          const answer: Answer = {
            answerID: '',
            companyAnalysisID: '',
            selectedOption: matchingOption.questionOptionID,
            linkedQuestionID: matchingOption.questionID
          };

          answers.push(answer);
        }
      }
    }

    return answers;
  };

  /**
   * Submits the analysis form.
   * Generates given answers and creates a new company analysis and associates it with the company.
   * @returns {void} Nothing.
   */
  const submitForm = async () => {
    try {
      currentStep.value = formSteps[currentStep.value!.number + 1]
      showOverview.value = false;
      showInformation.value = true;
      showForm.value = false;

      const answers = generateAnswers();

      const formFields = {
        phase: companyPhase.value,
        answers: answers,
      };

      const newCompanyAnalysis = await httpService.postRequest<CompanyAnalysis>('/companyAnalyses', formFields);
      const newCompanyAnalysisData = newCompanyAnalysis.data;

      if (newCompanyAnalysisData && currentCompany.value) {
        const companyData = {
          companyAnalysis: newCompanyAnalysisData.companyAnalysisID,
        };

        await associateAnalysisWithCompany(currentCompany.value.companyID, companyData);
      }

    } catch (error) {
      console.error('Error creating company analysis:', error);
    }
    toast.success('Analyse succesvol opgeslagen.', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const associateAnalysisWithCompany = async (companyID: string, companyData: any) => {
    try {
      await httpService.putRequest<Company>(`/companies/${companyID}`, companyData);
      fetchCurrentCompany();
    } catch (error) {
      console.error('Error associating company analysis:', error);
    }
  };

  const getCurrentStepFields = () => {
    return Object.values(formData).filter((field) => field.step.number === currentStep?.value?.number);
  }

  const toCapital = (String: string) => {
    return String.charAt(0).toUpperCase() + String.slice(1);
  }

  onMounted(() => {
    fetchCurrentCompany();
    fetchAnalysisSections();
  });
</script>

<template>
  <div v-if="!showForm && showInformation">
    <PageTitle>Bedrijfsoverzicht</PageTitle>

    <SecondaryTitle>Algemene gegevens</SecondaryTitle>

    <div v-if="currentCompany">
      <div class="row">
        <div v-for="(value, key) in currentCompany" :key="key">
          <div v-if="key !== 'companyID' && key !== 'roadmap' && key !== 'companyAnalysis'">
            <div class="fw-bold me-2">{{ toCapital(key) }}</div>
            <p class="mb-0 pb-2">{{ value }}</p>
          </div>
        </div>
      </div>
    </div>

    <SecondaryTitle>Behoeften</SecondaryTitle>

    <div v-if="currentAnalysis">
      <div class="row">
        <div class="col-4 mb-4" v-for="(category, index) in categories" :key="index">
          <h3>{{ category }}</h3>
          <div v-if="category === 'Bedrijfsfase'">
            {{ currentAnalysis.phase }}
          </div>
          <div v-else>
            <div v-for="(answer, answerIndex) in currentAnalysis.answers" :key="answerIndex">
              <div v-if="answer?.question?.setTitle === category">
                <strong>{{ answer.question.title }}</strong>
                <div class="mb-2">
                  {{ answer.answer }}
                </div>
              </div>
            </div>
            <div v-if="!currentAnalysis.answers.some(answer => answer.question?.setTitle === category)">
              Niet van toepassing in fase '{{ currentAnalysis.phase }}'
            </div>
          </div>
        </div>
      </div>
    </div>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed eget imperdiet neque, ac ultrices nunc. Praesent non
      turpis elementum, vestibulum augue sit amet, interdum justo.
    </p>

    <div class="row">
      <div v-if="!currentAnalysis || currentAnalysis === null" class="col">
        <SubTitle type="secondary" v-if="!currentStep">
          Analyse nog niet begonnen
        </SubTitle>

        <SubTitle type="warning" v-if="currentStep?.title === 'Bedrijfsfase'" data-test="currentStepButton">
          Bedrijfsfase bepalen
        </SubTitle>

        <SubTitle v-if="currentStep && currentStep?.title !== 'Bedrijfsfase'" type="warning"
          data-test="currentStepButton">
          {{ currentStep && currentStep.completed === true ? currentStep.number : currentStep ? currentStep.number - 1 :
            '' }}
          /
          {{ Object.keys(formSteps).length }} stappen voltooid ({{ companyPhase }})
        </SubTitle>

      </div>

      <div v-else class="col">
        <SubTitle type="success" v-if="currentAnalysis !== null" data-test="finishedAnalysisButton">Analyse voltooid
        </SubTitle>
      </div>
    </div>

    <div>
      <TextButton v-if="!currentStep && !currentAnalysis && !companyPhase" class="me-2" @click="startAnalysis"
        data-test="startAnalysisButton">
        Start de analyse
      </TextButton>

      <TextButton v-if="currentStep && !currentAnalysis" class="me-2" @click="continueAnalysis"
        data-test="continueAnalysisButton">
        Ga verder
      </TextButton>

      <TextButton v-if="currentStep || currentAnalysis" class="me-2" type="danger" display-style="secondary"
        @click="restartAnalysis" data-test="restartAnalysisButton">
        Herstart de analyse
      </TextButton>
    </div>
  </div>

  <div v-if="currentStep && showForm">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <PageTitle>Behoefteanalyse</PageTitle>

      <TextButton type="primary" display-style="secondary" @click="goToOverview" data-test="backToOverviewButton">
        Terug naar overzicht
      </TextButton>
    </div>

    <form @submit.prevent="submitForm" class="rounded py-5 shadow-sm bg-white">
      <div class="row">
        <div class="col-1" />

        <div class="col-7">
          <SubHeader v-if="companyPhase">Stap {{ currentStep.number }}: {{ currentStep.title }}</SubHeader>
          <SubHeader>{{ currentStep.subtitle }}</SubHeader>

          <p>{{ currentStep.description }}</p>

          <div class="col-7">
            <div class="pb-3" v-for="(formField, key) in currentStepFields" :key="key">
              <label :for="formField.label" class="form-label">{{ formField.label }}</label>

              <template v-if="formField.inputType === 'Radio'">
                <div v-for="(option, index) in formField.options" :key="index">
                  <input type="radio" :id="`${formField.label}-${index}`" :value="option" v-model="formField.value">
                  <label class="ms-2" :for="`${formField.label}-${index}`">{{ option.value }}</label>
                </div>
              </template>

              <template v-else>
                <input v-if="formField.label !== 'Aantal werknemers' && formField.label !== 'Budget'" type="text"
                  class="form-control" :id="formField.label" v-model="formField.value"
                  :class="{ 'is-invalid': !formField.isValid && canValidate }" />

                <input v-else type="number" class="form-control" :id="formField.label" v-model="formField.value"
                  :class="{ 'is-invalid': !formField.isValid && canValidate }" />
              </template>

              <small class="invalid-feedback">{{ formField.errorMessage }}</small>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex flex-row align-items-center justify-content-center pt-5" v-if="companyPhase">
        <template v-if="currentStep.number > 0">
          <template v-for="( step, key, index ) in  formSteps " :key="key">
            <div v-if="index === 0" class="progress-circle not-active"
              :class="{ 'active': currentStep.number === 1, 'completed': currentStep.number > 1 }" />

            <div v-else class="progress-line" />

            <div v-if="index > 0" class="progress-circle not-active"
              :class="{ 'active': currentStep.number === index + 1, 'completed': currentStep.number > index + 1 }" />
          </template>
        </template>
      </div>

      <div class="d-flex flex-wrap justify-content-center pt-4">
        <TextButton v-if="currentStep && currentStep.title === 'Bedrijfsfase'" type="secondary" 
          display-style="secondary"
          class="me-4" data-test="previousStepButton">
          Vorige
        </TextButton>

        <TextButton v-else-if="currentStep && currentStep.number === 1 && currentStep.title !== 'Bedrijfsfase'"
          display-style="secondary" class="me-4" @click="resetInitialQuestion" data-test="previousStepButton">
          Vorige
        </TextButton>

        <TextButton v-else display-style="secondary" class="me-4" @click="previousStep" data-test="previousStepButton">
          Vorige
        </TextButton>

        <TextButton v-if="currentStep.number !== Object.keys(formSteps).length || currentStep.number === 1"
          @click="nextStep" data-test="nextStep">
          Volgende
        </TextButton>

        <TextButton v-if="currentStep.number === Object.keys(formSteps).length && currentStep.number !== 1"
          stype="primary" @click="reviewForm" data-test="reviewAnalysisButton">
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

        <div v-for="(  formStep, key  ) in   formSteps  " :key="key">
          <div class="pb-3">
            <SubHeader class="pb-1" data-test="reviewFormStepName">{{ formStep.subtitle }}</SubHeader>

            <div v-for="(  formField, fieldKey  ) in   formData  " :key="fieldKey">
              <div v-if="formField.step === formStep" class="d-flex">
                <div class="fw-bold me-2" data-test="reviewFormFieldLabel">{{ formField.label }}:</div>
                <p class="mb-0 pb-2" data-test="reviewFormFieldValue">{{ formField.value.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="d-inline-flex flex-wrap justify-content-center">
        <TextButton display-style="secondary" class="me-4" @click="closeOverview">
          Wijzig analyse
        </TextButton>

        <TextButton type="success" @click="submitForm" data-test="finishAnalysisButton">
          Voltooi Analyse
        </TextButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
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