import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { ColComponent } from './col/col.component';
import { CollapseBoxComponent } from './collapse-box/collapse-box.component';
import { FormComponent } from './form/form.component';
import { FormItemComponent } from './form/form-item.component';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { RadioGroupComponent } from './radio-group/radio-group.component';
import { RowComponent } from './row/row.component';
import { SelectComponent } from './select/select.component';
import { SelectOptionComponent } from './select/select-option.component';
import { ValidatorComponent } from './validator/validator.component';

export const ALL_COMPONENTS = [
  // 布局组件
  RowComponent,
  ColComponent,

  // UI元素组件
  ButtonComponent,
  CollapseBoxComponent,

  // Form元素
  CheckboxComponent, CheckboxGroupComponent,
  FormComponent, FormItemComponent,
  InputComponent,
  RadioComponent, RadioGroupComponent,
  SelectComponent, SelectOptionComponent,
  ValidatorComponent
];
