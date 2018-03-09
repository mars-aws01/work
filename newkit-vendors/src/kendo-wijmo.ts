import { NgModule } from '@angular/core';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import 'wijmo-css/wijmo.css';

// Kendo components
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { PopupModule } from '@progress/kendo-angular-popup';
import { SortableModule } from '@progress/kendo-angular-sortable';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { UploadModule } from '@progress/kendo-angular-upload';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { TreeViewModule } from '@progress/kendo-angular-treeview';

// Wijmo components
import { WjCoreModule } from 'wijmo/wijmo.angular2.core';
import { WjDirectiveBaseModule } from 'wijmo/wijmo.angular2.directiveBase';
import { WjGaugeModule } from 'wijmo/wijmo.angular2.gauge';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { WjChartAnalyticsModule } from 'wijmo/wijmo.angular2.chart.analytics';
import { WjChartAnimationModule } from 'wijmo/wijmo.angular2.chart.animation';
import { WjChartAnnotationModule } from 'wijmo/wijmo.angular2.chart.annotation';
import { WjChartFinanceModule } from 'wijmo/wijmo.angular2.chart.finance';
import { WjChartFinanceAnalyticsModule } from 'wijmo/wijmo.angular2.chart.finance.analytics';
import { WjChartHierarchicalModule } from 'wijmo/wijmo.angular2.chart.hierarchical';
import { WjChartInteractionModule } from 'wijmo/wijmo.angular2.chart.interaction';
import { WjChartRadarModule } from 'wijmo/wijmo.angular2.chart.radar';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjGridDetailModule } from 'wijmo/wijmo.angular2.grid.detail';
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { WjGridGrouppanelModule } from 'wijmo/wijmo.angular2.grid.grouppanel';
import { WjGridMultirowModule } from 'wijmo/wijmo.angular2.grid.multirow';
import { WjGridSheetModule } from 'wijmo/wijmo.angular2.grid.sheet';
import { WjOlapModule } from 'wijmo/wijmo.angular2.olap';
import { WjViewerModule } from 'wijmo/wijmo.angular2.viewer';
import { WjNavModule } from 'wijmo/wijmo.angular2.nav';
import 'wijmo/wijmo.grid.pdf';

// Wijmo modules
const WijmoModules = [
  WjCoreModule,
  WjDirectiveBaseModule,
  WjGaugeModule,
  WjInputModule,
  WjChartModule, WjChartAnalyticsModule, WjChartAnimationModule, WjChartAnnotationModule,
  WjChartFinanceModule, WjChartFinanceAnalyticsModule, WjChartHierarchicalModule,
  WjChartInteractionModule, WjChartRadarModule,
  WjGridModule,
  WjGridDetailModule,
  WjGridFilterModule,
  WjGridGrouppanelModule,
  WjGridMultirowModule,
  WjGridSheetModule,
  WjOlapModule,
  WjViewerModule,
  WjNavModule
];

@NgModule({
  exports: [
    ...WijmoModules
  ]
})
class WijmoForCentralModule {
}


// Kendo modules
const KendoModules = [
  ButtonsModule,
  ChartsModule,
  DateInputsModule,
  DialogModule,
  DropDownsModule,
  GridModule,
  InputsModule,
  LabelModule,
  LayoutModule,
  PopupModule,
  SortableModule,
  ScrollViewModule,
  UploadModule,
  ExcelModule,
  ExcelExportModule,
  TreeViewModule
];

@NgModule({
  exports: [
    ...KendoModules
  ]
})
class KendoForCentralModule {

}

@NgModule({
  imports: [
    WijmoForCentralModule,
    KendoForCentralModule
  ],
  exports: [
    WijmoForCentralModule,
    KendoForCentralModule
  ]
})
export class KendoWijmoModule {

}
