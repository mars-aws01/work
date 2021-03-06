import {
  AccordionDemoComponent,
  AlertDemoComponent,
  ButtonDemoComponent,
  CarouselDemoComponent,
  CheckboxDemoComponent,
  CheckboxGroupDemoComponent,
  CollapseBoxDemoComponent,
  DatePickerDemoComponent,
  DateRangePickerDemoComponent,
  TimePickerDemoComponent,
  TimeRangePickerDemoComponent,
  DemoContainerComponent,
  FixbarDemoComponent,
  FormDemoComponent,
  GridDemoComponent,
  HomeComponent,
  ImageZoomDemoComponent,
  InputDemoComponent,
  InputGroupDemoComponent,
  LayoutDemoComponent,
  ModalDemoComponent,
  NotfoundComponent,
  PaginationDemoComponent,
  PopoverDemoComponent,
  ProgressDemoComponent,
  RadioDemoComponent,
  RadioGroupDemoComponent,
  RatingDemoComponent,
  SelectDemoComponent,
  StepsDemoComponent,
  SwitchDemoComponent,
  TabsetDemoComponent,
  TooltipDemoComponent,
  WidgetDemoComponent,
  FunctionPanelDemoComponent,
  CreditCardDemoPage
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
  { path: 'fixbar', component: FixbarDemoComponent },
  { path: 'grid', component: GridDemoComponent },
  { path: 'modal', component: ModalDemoComponent },
  { path: 'image-zoom', component: ImageZoomDemoComponent },
  { path: 'progress', component: ProgressDemoComponent },
  { path: 'steps', component: StepsDemoComponent },
  { path: 'tabset', component: TabsetDemoComponent },
  { path: 'widget', component: WidgetDemoComponent },
  { path: 'function-panel', component: FunctionPanelDemoComponent },
  // Form Elements
  { path: 'checkbox', component: CheckboxDemoComponent },
  { path: 'checkbox-group', component: CheckboxGroupDemoComponent },
  { path: 'date-picker', component: DatePickerDemoComponent },
  { path: 'date-range-picker', component: DateRangePickerDemoComponent },
  { path: 'time-picker', component: TimePickerDemoComponent },
  { path: 'time-range-picker', component: TimeRangePickerDemoComponent },
  { path: 'input', component: InputDemoComponent },
  { path: 'input-group', component: InputGroupDemoComponent },
  { path: 'form', component: FormDemoComponent },
  { path: 'pagination', component: PaginationDemoComponent },
  { path: 'radio', component: RadioDemoComponent },
  { path: 'radio-group', component: RadioGroupDemoComponent },
  { path: 'rating', component: RatingDemoComponent },
  { path: 'select', component: SelectDemoComponent },
  { path: 'switch', component: SwitchDemoComponent },
  { path: 'credit-card', component: CreditCardDemoPage },

  // Directives
  { path: 'popover', component: PopoverDemoComponent },
  { path: 'tooltip', component: TooltipDemoComponent }
];

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', component: DemoContainerComponent, children: demoRoutes },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      errorHandler() {
        console.log('路由匹配失败！');
      }
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
