import type { App } from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeft,
  faCalendarDays,
  faCheck,
  faCircleCheck,
  faXmark,
  faInfo,
  faCircleInfo,
  faFile,
  faFilter,
  faTriangleExclamation,
  faThumbsUp
} from '@fortawesome/free-solid-svg-icons';

// Icons
library.add(
  faArrowLeft,
  faCalendarDays,
  faCheck,
  faCircleCheck,
  faXmark,
  faInfo,
  faCircleInfo,
  faFile,
  faFilter,
  faTriangleExclamation,
  faThumbsUp
);

export default {
  install: (app: App): void => {
    app.component('FontAwesomeIcon', FontAwesomeIcon);
  },
};
