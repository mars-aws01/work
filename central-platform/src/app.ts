import './styl/all.styl';

import { AppModule } from './app.module';
import { ModuleLoaderService } from './services';

window['defineModule'] = ModuleLoaderService.defineModule;

export { AppModule };
