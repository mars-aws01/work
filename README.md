# kubi-ui
The compact ui component lib for newegg central2.

# Usage

```bash
# Install package
npm i kubi-ui -D

# Use In Typescript
import { KubiUIModule } from 'kubi-ui';

@NgModule({
  imports: [
    KubiUIModule
  ]
})
export class AppModule {

}
```

# Components

## Layout

- [x] Row [Usage](src/components/row/README.md)
- [x] Col [Usage](src/components/col/README.md)

## UI Elements

- [x] Accordion [Usage](src/components/accordion/README.md)
- [x] Alert [Usage](src/components/alert/README.md)
- [x] Button [Usage](src/components/button/README.md)
- [x] Carousel [Usage](src/components/carousel/README.md)
- [x] CollapseBox [Usage](src/components/collapse-box/README.md)
- [x] Modal [Usage](src/components/modal/README.md)
- [x] ImageZoom [Usage](src/components/image-zoom/README.md)
- [x] Pagination [Usage](src/components/pagination/README.md)
- [x] Progress [Usage](src/components/progress/README.md)
- [x] TabSet [Usage](src/components/tabset/README.md)
- [x] Widget [Usage](src/components/widget/README.md)
- [ ] Wizard [Usage](src/components/wizard/README.md)

## Forms Elements

- [x] Form [Usage](src/components/form/README.md)
- [ ] Autocomplete [Usage](src/components/autocomplete/README.md)
- [x] CheckBox [Usage](src/components/checkbox/README.md)
- [x] CheckBoxGroup [Usage](src/components/checkbox-group/README.md)
- [ ] DatePicker [Usage](src/components/date-picker/README.md)
- [x] Input [Usage](src/components/autocomplete/README.md)
- [] InputGroup [Usage](src/components/input-group/README.md)
- [x] Radio [Usage](src/components/radio/README.md)
- [x] RadioGroup [Usage](src/components/radio-group/README.md)
- [x] Rating [Usage](src/components/rating/README.md)
- [x] Switch [Usage](src/components/switch/README.md)
- [ ] Cascader [Usage](src/components/cascader/README.md)
- [x] Select [Usage](src/components/select/README.md)
- [ ] TimePicker [Usage](src/components/time-picker/README.md)

## Date Elements

- [ ] Table [Usage](src/components/table/README.md)
- [ ] Tree [Usage](src/components/tree/README.md)

# Services

- [ ] MessageBox [Usage](src/services/message-box/README.md)
- [ ] Loading [Usage](src/services/loading/README.md)
- [ ] NotifyBox [Usage](src/services/notify-box/README.md)

# How to develop?

```bash
git clone 

# install deps
npm i 

# run dev
npm run dev

# build demo
npm run build

# build aot demo
npm run build:aot

# build publish package
npm run lib
```

# Change logs

[CHANGELOG.md](CHANGELOG.md)

# Thanks

- The Vue [Element UI](https://github.com/ElemeFE/element)
- The [Element Angular Version](https://github.com/eleme/element-angular)

