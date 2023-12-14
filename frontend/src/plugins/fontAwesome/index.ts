import type { App } from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeft,
  faArrowsRotate,
  faCalendarDays,
  faCheck,
  faCircleCheck,
  faXmark,
  faInfo,
  faCircleInfo,
  faFile,
  faFilter,
  faUser,
  faRightFromBracket,
  faTriangleExclamation,
  faThumbsUp,
  faXmarkCircle
} from '@fortawesome/free-solid-svg-icons';

// Icons
library.add(
  faArrowLeft,
  faArrowsRotate,
  faCalendarDays,
  faCheck,
  faCircleCheck,
  faXmark,
  faInfo,
  faCircleInfo,
  faFile,
  faFilter,
  faUser,
  faRightFromBracket,
  faTriangleExclamation,
  faThumbsUp,
  faXmarkCircle
);

export default {
  install: (app: App): void => {
    app.component('FontAwesomeIcon', FontAwesomeIcon);
  },
};
