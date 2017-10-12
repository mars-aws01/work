import { KubiUIModule } from './kubi-ui.module';

// export * from './services';

let version = process.env.LIB_VERSION || 'dev';

export {
  KubiUIModule,
  version
};
