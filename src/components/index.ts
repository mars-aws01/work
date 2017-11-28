import { ALL_VALIDATORS } from './validators';
import { AccordionComponent } from './accordion/accordion.component';
import { AccordionItemComponent } from './accordion/accordion-item.component';
import { AlertComponent } from './alert/alert.component';
import { ButtonComponent } from './button/button.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemComponent } from './carousel/carousel-item.component';
import { CascaderComponent } from './cascader/cascader.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { ColComponent } from './col/col.component';
import { CollapseBoxComponent } from './collapse-box/collapse-box.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { FormComponent } from './form/form.component';
import { FormItemComponent } from './form/form-item.component';
import { GridCellDirective } from './grid/column-cell.directive';
import { GridColumnDirective } from './grid/grid-column.directive';
import { GridComponent } from './grid/grid.component';
import { ImageZoomComponent } from './image-zoom/image-zoom.component';
import { InputComponent } from './input/input.component';
import { ModalComponent } from './modal/modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PopoverContentComponent } from './popover/popover-content.component';
import { PopoverDirective } from './popover/popover.directive';
import { ProgressComponent } from './progress/progress.component';
import { RadioComponent } from './radio/radio.component';
import { RadioGroupComponent } from './radio-group/radio-group.component';
import { RatingComponent } from './rating/rating.component';
import { RowComponent } from './row/row.component';
import { SelectComponent } from './select/select.component';
import { SelectOptionComponent } from './select/select-option.component';
import { StepComponent } from './steps/step.component';
import { StepsComponent } from './steps/steps.component';
import { SwitchComponent } from './switch/switch.component';
import { TabItemComponent } from './tabset/tab-item.component';
import { TabsetComponent } from './tabset/tabset.component';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { ValidatorComponent } from './validator/validator.component';
import { WidgetComponent } from './widget/widget.component';

export const ENTRY_COMPONENTS = [PopoverContentComponent];

export const ALL_COMPONENTS = [
  // 指令
  PopoverDirective,
  PopoverContentComponent,
  TooltipDirective,

  // 验证器
  ...ALL_VALIDATORS,

  // 布局组件
  RowComponent,
  ColComponent,

  // UI元素组件
  AccordionComponent,
  AccordionItemComponent,
  AlertComponent,
  ButtonComponent,
  CarouselComponent,
  CarouselItemComponent,
  CollapseBoxComponent,
  GridComponent,
  GridColumnDirective,
  GridCellDirective,
  ModalComponent,
  ImageZoomComponent,
  ProgressComponent,
  WidgetComponent,
  StepsComponent, StepComponent,
  TabsetComponent,
  TabItemComponent,

  // Form元素
  CascaderComponent,
  CheckboxComponent,
  CheckboxGroupComponent,
  DatePickerComponent,
  FormComponent,
  FormItemComponent,
  InputComponent,
  PaginationComponent,
  RadioComponent,
  RadioGroupComponent,
  RatingComponent,
  SelectComponent,
  SelectOptionComponent,
  SwitchComponent,
  ValidatorComponent
];
