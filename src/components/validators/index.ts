import { DateValidator } from './date.validator';
import { EmailGroupValidator } from './email-group.validator';
import { EmailValidator } from './email.validator';
import { EqualToValidator } from './equal-to.validator';
import { EqualValidator } from './equal.validator';
import { IntegerValidator } from './integer.validator';
import { IpValidator } from './ip.validator';
import { MaxValidator } from './max.validator';
import { MinValidator } from './min.validator';
import { NumberValidator } from './number.validator';
import { UrlValidator } from './url.validator';
import { ValidateFnValidator } from './validate-fn.validator';

export * from './NkValidators';

export const ALL_VALIDATORS = [
  DateValidator,
  EmailGroupValidator,
  EmailValidator,
  EqualToValidator,
  EqualValidator,
  IntegerValidator,
  IpValidator,
  MinValidator,
  MaxValidator,
  NumberValidator,
  UrlValidator,
  ValidateFnValidator
];
