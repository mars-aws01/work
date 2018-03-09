import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { 
  StatisticComponent
} from './pages';

// 配置路由
const appRoutes: Routes = [
  { path: 'statistic', component:  StatisticComponent},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });
