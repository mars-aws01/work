import { ApplicationRef, ModuleWithProviders } from '@angular/core';
import { AuthGuard, AuthService, ModuleLoaderService } from './services';
import { ConnectionBackend, Http } from '@angular/http';
import {
  GlobalConfigurationComponent,
  HomeComponent,
  LayoutComponent,
  LoginComponent,
  LogoutComponent,
  MenuSettingComponent,
  NewkitJsComponent,
  NoPermissionComponent,
  NotFoundComponent,
  PluginManageComponent,
  UserSettingComponent,
  GlobalSearchSettingPage,
  PageviewDashboardPage,
  UserAccessLogPage
} from './pages';
import { RouterModule, Routes } from '@angular/router';

const loadModule = (moduleName) => {
  return () => {
    return ModuleLoaderService.load(moduleName);
  };
};

let dynamicRoutes = [];

NewkitConf.modules.forEach(item => {
  dynamicRoutes.push({
    path: item.path,
    canActivate: [AuthGuard],
    loadChildren: loadModule(item.module)
  });
});

const appRoutes: Routes = [{
  path: 'login', component: LoginComponent
}, {
  path: 'logout', component: LogoutComponent
}, {
  path: '', component: LayoutComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
  children: [
    { path: '', component: HomeComponent },
    { path: 'system/newkitjs', component: NewkitJsComponent },
    { path: 'system/404', component: NotFoundComponent },
    { path: 'system/401', component: NoPermissionComponent },
    { path: 'system/plugin-manage', component: PluginManageComponent },
    { path: 'system/menu', component: MenuSettingComponent },
    { path: 'system/global-configuration', component: GlobalConfigurationComponent },
    { path: 'system/profile', component: UserSettingComponent },
    { path: 'system/globalsearch-setting', component: GlobalSearchSettingPage },
    { path: 'system/pageview-dashboard', component: PageviewDashboardPage },
    { path: 'system/event-trace', component: UserAccessLogPage },
    ...dynamicRoutes,
    { path: '**', component: NotFoundComponent },
  ]
}];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });
