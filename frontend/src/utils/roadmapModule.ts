import type { Module } from '@/typings/Module';

import { StepStatuses } from '@/enums/StepStatuses';

export const determineModuleProgress = (module: Module): string => {
  if (module.steps!.filter((step) => step.status === StepStatuses.toStart).length === module.steps?.length) {
    return StepStatuses.toStart;
  } else if (module.steps!.filter((step) => step.status === StepStatuses.finished).length === module.steps?.length) {
    return StepStatuses.finished;
  } else {
    return StepStatuses.inProgress;
  }
}