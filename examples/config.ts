export const menuData: Array<MenuItem> = [
  {
    text: 'Home',
    icon: 'fa-home',
    url: '/'
  },
  {
    text: 'Layout',
    icon: 'fa-list',
    subMenu: [{ text: 'Row', url: '/row' }, { text: 'Col', url: '/col' }]
  },
  {
    text: 'Forms',
    icon: 'fa-pencil-square-o',
    subMenu: [
      // { text: 'Autocomplete', url: '/autocomplete' },
      { text: 'Check Box', url: '/checkbox' },
      { text: 'Check Box Group', url: '/checkbox-group' },
      { text: 'Date Picker', url: '/date-picker' },
      { text: 'Form', url: '/form' },
      { text: 'Input', url: '/input' },
      // { text: 'Input Group', url: '/input-group' },
      { text: 'Radio', url: '/radio' },
      { text: 'Radio Group', url: '/radio-group' },
      { text: 'Rating', url: '/rating' },
      { text: 'Select', url: '/select' },
      { text: 'Switch', url: '/switch' }
      // { text: 'Time Picker', url: '/time-picker' }
    ]
  },
  {
    text: 'UI Elements',
    icon: 'fa-desktop',
    subMenu: [
      // { text: 'Accordion', url: '/accordion' },
      { text: 'Alert', url: '/alert' },
      { text: 'Button', url: '/button' },
      { text: 'Carousel', url: '/carousel' },
      { text: 'Collapse Box', url: '/collapse-box' },
      { text: 'FixBar', url: '/fixbar' },
      { text: 'Grid/Table', url: '/grid' },
      { text: 'Modal', url: '/modal' },
      { text: 'Image Zoom', url: '/image-zoom' },
      { text: 'Pagination', url: '/pagination' },
      { text: 'Progress', url: '/progress' },
      { text: 'Steps', url: '/steps' },
      { text: 'TabSet', url: '/tabset' },
      { text: 'Widget', url: '/widget' }
      // { text: 'Wizard', url: '/wizard' }
    ]
  },
  {
    text: 'Directives',
    icon: 'fa-fire',
    subMenu: [
      { text: 'Popover', url: '/popover' },
      { text: 'Tooltip', url: '/tooltip' }
    ]
  },
  // {
  //   text: 'Services',
  //   icon: 'fa-star',
  //   subMenu: [{ text: 'MessageBox', url: '/message-box' }]
  // }
];

window['AppConf'] = {
  menuData,
  rootHost: process.env.NODE_ENV === 'production' ? '' : ''
};
