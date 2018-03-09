import { AuthService } from './auth.service';
import { MenuService } from './menu.service';
import { AuthGuard } from './auth-guard';
import { ModuleLoaderService } from './module-loader.service';
import { GlobalSearchService } from './global-search.service';

export {
  AuthService,
  MenuService,
  AuthGuard,
  ModuleLoaderService,
  GlobalSearchService
};

export const ALL_SERVICES = [
  AuthService,
  MenuService,
  AuthGuard,
  ModuleLoaderService,
  GlobalSearchService
];
