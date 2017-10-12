import {
  DemoContainerComponent,
  HomeComponent,
  LayoutDemoComponent,
  NotfoundComponent
} from './pages';
import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const demoRoutes: Routes = [

  // Layout
  { path: 'row', component: LayoutDemoComponent },
  { path: 'col', component: LayoutDemoComponent }
];

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', component: DemoContainerComponent, children: demoRoutes },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    errorHandler() {
      console.log('路由匹配失败！');
    }
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
