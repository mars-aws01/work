// All services import
import { NegAjax } from './negAjax';
import { NegAlert } from './negAlert';
import { NegAuth } from './negAuth';
import { NegBizLog } from './negBizLog';
import { NegBreadcrumb } from './negBreadcrumb';
import { NegConfigService } from './negConfigService';
import { NegDfisUploader } from './negDfisUploader';
import { NegEventBus } from './negEventBus';
import { NegGlobalConfig } from './negGlobalConfig';
import { NegGlobalLoading } from './negGlobalLoading';
// import { NegModuleLoader } from './negModuleLoader';
import { NegStorage } from './negStorage';
import { NegTranslate } from './negTranslate';
import { NegUserProfile } from './negUserProfile';
import { NegValidators } from './negValidators';
import { NegUtil } from './negUtil';
import { NegFeedback } from './negFeedback';
import { NegMessageBox } from './negMessageBox';
import { NegMultiTab } from './negMultiTab';

import { TranslateService, TranslateLoader } from '@ngx-translate/core';

// All services export
export {
  TranslateService,
  TranslateLoader,

  NegAjax,
  NegAlert,
  NegAuth,
  NegBizLog,
  NegBreadcrumb,
  NegConfigService,
  NegDfisUploader,
  NegEventBus,
  NegGlobalConfig,
  NegGlobalLoading,
  // NegModuleLoader,
  NegStorage,
  NegTranslate,
  NegUserProfile,
  NegValidators,
  NegUtil,
  NegFeedback,
  NegMessageBox,
  NegMultiTab
};

// Export all services
export const CORE_SERVICES = [
  TranslateService,

  NegAjax,
  NegAlert,
  NegAuth,
  NegBizLog,
  NegBreadcrumb,
  NegConfigService,
  NegDfisUploader,
  NegEventBus,
  NegGlobalConfig,
  NegGlobalLoading,
  // NegModuleLoader,
  NegStorage,
  NegTranslate,
  NegUserProfile,
  NegValidators,
  NegUtil,
  NegFeedback,
  NegMessageBox,
  NegMultiTab
];
