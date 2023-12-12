import type { App } from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeft,
  faCheck,
  faCircleCheck,
  faXmark,
  faInfo,
  faTriangleExclamation,
  faCircleInfo,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons';

// Icons
library.add(
  faArrowLeft,
  faCheck,
  faCircleCheck,
  faXmark,
  faInfo,
  faTriangleExclamation,
  faCircleInfo,
  faCircleXmark
);

export default {
  install: (app: App): void => {
    app.component('FontAwesomeIcon', FontAwesomeIcon);
  },
};
