import {
  describe,
  it,
  vi,
  expect
} from 'vitest';
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
// @ts-ignore
import CompanyIndex from '../../src/views/company/Index.vue'
import { PageTitle, SecondaryTitle, SubHeader } from '../../src/components'

const pinia = createPinia();
const app = createApp({});
app.use(pinia);

describe('CompanyIndex', () => {
  it('renders properly', () => {
    const wrapper = mount(CompanyIndex);

    const pageTitleComponent = wrapper.findComponent(PageTitle);
    expect(pageTitleComponent.exists()).toBe(true);
    expect(pageTitleComponent.text()).toEqual('Bedrijfsoverzicht');

    const secondaryTitleComponent = wrapper.findComponent(SecondaryTitle);
    expect(secondaryTitleComponent.exists()).toBe(true);
    expect(secondaryTitleComponent.text()).toEqual('Algemene gegevens');
  })

  it('starts the analysis when the "Start de analyse" button is clicked', async () => {
    const wrapper = mount(CompanyIndex);

    await wrapper.find('[data-test="startAnalysisButton"]').trigger('click');

    const subHeaderComponent = wrapper.findComponent(SubHeader);
    expect(subHeaderComponent.exists()).toBe(true);
    expect(subHeaderComponent.text()).toEqual('Stap 1: Bedrijfsgegevens');

    expect(wrapper.vm.showInformation).toBe(false);
    expect(wrapper.vm.showForm).toBe(true);
    expect(wrapper.vm.currentStep).toEqual(wrapper.vm.formSteps[1]);
  })

  it('validates form fields and shows error messages', async () => {
    const wrapper = mount(CompanyIndex);

    await wrapper.find('[data-test="startAnalysisButton"]').trigger('click');

    await wrapper.find('[data-test="nextStep"]').trigger('click');
    expect(wrapper.find('.is-invalid').exists()).toBe(true);
    expect(wrapper.find('.invalid-feedback').exists()).toBe(true);
  });

  it('fills in first step form and proceeds to the next step', async () => {
    const wrapper = mount(CompanyIndex);

    await wrapper.find('[data-test="startAnalysisButton"]').trigger('click');

    wrapper.vm.formData.industry.value = 'Sample industry';
    wrapper.vm.formData.nrOfEmployees.value = 10;
    wrapper.vm.formData.stage.value = 'Sample phase';

    await wrapper.find('[data-test="nextStep"]').trigger('click');

    expect(wrapper.vm.currentStep).toEqual(wrapper.vm.formSteps[2]);

    const subHeaderComponent = wrapper.findComponent(SubHeader);
    expect(subHeaderComponent.exists()).toBe(true);
    expect(subHeaderComponent.text()).toEqual('Stap 2: Doelen');
  });

  it('goes back to the previous step in the multi-step form', async () => {
    const wrapper = mount(CompanyIndex);

    await wrapper.find('[data-test="startAnalysisButton"]').trigger('click');

    wrapper.vm.formData.industry.value = 'Sample industry';
    wrapper.vm.formData.nrOfEmployees.value = 10;
    wrapper.vm.formData.stage.value = 'Sample phase';

    await wrapper.find('[data-test="nextStep"]').trigger('click');
    expect(wrapper.vm.currentStep).toEqual(wrapper.vm.formSteps[2]);

    await wrapper.find('[data-test="previousStepButton"]').trigger('click');
    expect(wrapper.vm.currentStep).toEqual(wrapper.vm.formSteps[1]);

    const subHeaderComponent = wrapper.findComponent(SubHeader);
    expect(subHeaderComponent.exists()).toBe(true);
    expect(subHeaderComponent.text()).toEqual('Stap 1: Bedrijfsgegevens');
  });

  it('goes back to overiew and shows current analysis status with options to continue or restart', async () => {
    const wrapper = mount(CompanyIndex);

    await wrapper.find('[data-test="startAnalysisButton"]').trigger('click');

    wrapper.vm.formData.industry.value = 'Sample industry';
    wrapper.vm.formData.nrOfEmployees.value = 10;
    wrapper.vm.formData.stage.value = 'Sample phase';

    await wrapper.find('[data-test="nextStep"]').trigger('click');

    await wrapper.find('[data-test="backToOverviewButton"]').trigger('click');
    expect(wrapper.vm.showInformation).toBe(true);
    expect(wrapper.vm.showForm).toBe(false);
    const currentStepButton = wrapper.find('[data-test="currentStepButton"]');
    expect(currentStepButton.text()).toEqual('1 / 3 stappen voltooid');
    wrapper.find('[data-test="continueAnalysisButton"]').exists();
    wrapper.find('[data-test="restartAnalysisButton"]').exists();
  });

  it('goes back to overiew and continues current analysis with the right step', async () => {
    const wrapper = mount(CompanyIndex);

    await wrapper.find('[data-test="startAnalysisButton"]').trigger('click');

    wrapper.vm.formData.industry.value = 'Sample industry';
    wrapper.vm.formData.nrOfEmployees.value = 10;
    wrapper.vm.formData.stage.value = 'Sample phase';

    await wrapper.find('[data-test="nextStep"]').trigger('click');
    await wrapper.find('[data-test="backToOverviewButton"]').trigger('click');

    await wrapper.find('[data-test="continueAnalysisButton"]').trigger('click');
    expect(wrapper.vm.showInformation).toBe(false);
    expect(wrapper.vm.showForm).toBe(true);

    const subHeaderComponent = wrapper.findComponent(SubHeader);
    expect(subHeaderComponent.exists()).toBe(true);
    expect(subHeaderComponent.text()).toEqual('Stap 2: Doelen');
  });

  it('restarts the analysis', async () => {
    const wrapper = mount(CompanyIndex);

    await wrapper.find('[data-test="startAnalysisButton"]').trigger('click');

    wrapper.vm.formData.industry.value = 'Sample industry';
    wrapper.vm.formData.nrOfEmployees.value = 10;
    wrapper.vm.formData.stage.value = 'Sample stage';

    await wrapper.find('[data-test="backToOverviewButton"]').trigger('click');
    const currentStepButton = wrapper.find('[data-test="currentStepButton"]');
    expect(currentStepButton.text()).toEqual('0 / 3 stappen voltooid');

    await wrapper.find('[data-test="restartAnalysisButton"]').trigger('click');
    expect(wrapper.vm.showInformation).toBe(false);
    expect(wrapper.vm.showForm).toBe(true);

    const subHeaderComponent = wrapper.findComponent(SubHeader);
    expect(subHeaderComponent.exists()).toBe(true);
    expect(subHeaderComponent.text()).toEqual('Stap 1: Bedrijfsgegevens');
  });

  it('finish form, review and submit', async () => {
    const wrapper = mount(CompanyIndex);

    await wrapper.find('[data-test="startAnalysisButton"]').trigger('click');

    const submitFormMock = vi.fn();
    wrapper.vm.submitForm = submitFormMock;

    wrapper.vm.formData.industry.value = 'Sample industry';
    wrapper.vm.formData.nrOfEmployees.value = 10;
    wrapper.vm.formData.stage.value = 'Sample stage';
    await wrapper.find('[data-test="nextStep"]').trigger('click');

    wrapper.vm.formData.serviceInformation.value = 'Sample service information';
    wrapper.vm.formData.businessGoals.value = [
      'Sample business goal 1', 'Sample business Goal 2'
    ];
    wrapper.vm.formData.painPoints.value = [
      'Sample pain point 1', 'Sample pain point 2'
    ];
    await wrapper.find('[data-test="nextStep"]').trigger('click');

    wrapper.vm.formData.targetAudience.value = 'Sample target audience';
    wrapper.vm.formData.competitors.value = [
      'Sample competitor 1', 'Sample competitor 2'
    ];
    wrapper.vm.formData.budget.value = 10000;

    await wrapper.find('[data-test="reviewAnalysisButton"]').trigger('click');
    expect(wrapper.vm.currentStep).toEqual(wrapper.vm.formSteps[3]);

    const subHeaderComponent = wrapper.findComponent(SubHeader);
    expect(subHeaderComponent.exists()).toBe(true);
    expect(subHeaderComponent.text()).toEqual('Controleer uw gegevens');

    const reviewFormStepName = wrapper.find('[data-test="reviewFormStepName"]');
    expect(reviewFormStepName.exists()).toBe(true);
    const expectedStepNames = ['Bedrijfsgegevens', 'Doelen', 'Doelgroep'];
    expect(expectedStepNames.some(stepName => reviewFormStepName.text().includes(stepName))).toBe(true);

    await wrapper.find('[data-test="finishAnalysisButton"]').trigger('click');

    expect(submitFormMock).toHaveBeenCalledTimes(1);

    expect(wrapper.vm.currentAnalysis).toBe(null);
  })
})