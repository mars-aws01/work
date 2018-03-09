import { KubiUIModule } from './kubi-ui.module';
import { NkValidators } from './components/validators';

// export * from './services';

let version = process.env.LIB_VERSION || 'dev';

export { KubiUIModule, NkValidators, version };
