import {
  AccordionDemoComponent,
  AlertDemoComponent,
  ButtonDemoComponent,
  CarouselDemoComponent,
  CheckboxDemoComponent,
  CheckboxGroupDemoComponent,
  CollapseBoxDemoComponent,
  DemoContainerComponent,
  FormDemoComponent,
  HomeComponent,
  InputDemoComponent,
  LayoutDemoComponent,
  NotfoundComponent,
  PaginationDemoComponent,
  RadioDemoComponent,
  RadioGroupDemoComponent,
  SelectDemoComponent,
  SwitchDemoComponent,
} from './pages';
import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const demoRoutes: Routes = [
  // Layout
  { path: 'row', component: LayoutDemoComponent },
  { path: 'col', component: LayoutDemoComponent },
  // UI Elements
  { path: 'accordion', component: AccordionDemoComponent },
  { path: 'alert', component: AlertDemoComponent },
  { path: 'button', component: ButtonDemoComponent },
  { path: 'carousel', component: CarouselDemoComponent },
  { path: 'collapse-box', component: CollapseBoxDemoComponent },
  { path: 'pagination', component: PaginationDemoComponent },
  // Form Elements
  { path: 'checkbox', component: CheckboxDemoComponent },
  { path: 'checkbox-group', component: CheckboxGroupDemoComponent },
  { path: 'input', component: InputDemoComponent },
  { path: 'form', component: FormDemoComponent },
  { path: 'radio', component: RadioDemoComponent },
  { path: 'radio-group', component: RadioGroupDemoComponent },
  { path: 'select', component: SelectDemoComponent },
  { path: 'switch', component: SwitchDemoComponent }
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
