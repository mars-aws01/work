import { ToArrayPipe } from './to-array.pipe';
import { MenuTranslatePipe } from './menu-translate.pipe';
import { PrefixTranslatePipe } from './prefix-translate.pipe';

export {
  ToArrayPipe,
  MenuTranslatePipe,
  PrefixTranslatePipe
};

export const CORE_PIPES = [
  ToArrayPipe,
  MenuTranslatePipe,
  PrefixTranslatePipe
];
