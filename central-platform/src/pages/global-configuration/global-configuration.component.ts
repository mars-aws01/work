import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NegAjax, NegAlert, NegAuth } from '@newkit/core';

@Component({
  templateUrl: './global-configuration.html'
})
export class GlobalConfigurationComponent implements OnInit {

  private gridColumns: Array<any> = []; // All Original Data List
  private configEntity: any = {};
  private pageOpt: any = {
    pageSize: 20000,
    skip: 0
  };
  private gridView: any; // Data List For Grid
  private ajaxOpt = {};

  @ViewChild('grid1') grid1: any;
  @ViewChild('f1') editForm: any;

  public get disabledSave() {
    return this.editForm.form.invalid;
  }

  constructor(
    private negAjax: NegAjax,
    private negAuth: NegAuth,
    private negAlert: NegAlert
  ) {
  }

  ngOnInit() {
    this.ajaxOpt = { headers: { 'x-newkit-token': this.negAuth.authData.newkitToken } };
    this.loadProducts();
  }

  public exportExcel(grid) {
    let exportOpt = {
      includeColumnHeaders: true, includeCellStyles: false
    };
    wijmo.grid.xlsx.FlexGridXlsxConverter.saveAsync(grid, exportOpt, 'GlobalConfiguration.xlsx');
  }

  public selectionChange(evt): void {
    this.configEntity = _.cloneDeep(evt.panel.rows[evt.row].dataItem);
  }

  public newConfiguration() {
    this.configEntity = {};
  }

  public saveConfiguration() {
    if (this.configEntity.ApplicationId) { // Update
      this.configEntity.EditUser = this.negAuth.userId;
      this.negAjax.put(`${NewkitConf.APIGatewayAddress}/framework/v1/global-configuration`, this.configEntity)
        .then(() => {
          this.negAlert.success('Edit item successful.');
          this.loadProducts();
        });
    } else {
      this.configEntity.InUser = this.negAuth.userId;
      this.negAjax.post(`${NewkitConf.APIGatewayAddress}/framework/v1/global-configuration`, this.configEntity)
        .then(({ data }) => {
          this.negAlert.success('Create item successful.');
          this.configEntity = data;
          this.loadProducts();
        });
    }
  }

  public remove() {
    if (!this.configEntity.Domain || !this.configEntity.Key) {
      this.negAlert.error('Before delete you should select a record.');
    } else {
      this.negAlert.confirm('Sure to delete the key?', () => {
        this.negAjax.delete(`${NewkitConf.APIGatewayAddress}/framework/v1/global-configuration?Domain=${this.configEntity.Domain}&Key=${this.configEntity.Key}`, this.ajaxOpt)
          .then(data => {
            this.loadProducts();
            this.negAlert.info('Delete key successfully.');
          });
      }, null);
    }
  }

  private formatData() {
    let configurationList = this.gridColumns.slice(this.pageOpt.skip, this.pageOpt.skip + this.pageOpt.pageSize);
    configurationList.map(item => {
      if (item.InDate) {
        item.InDate = item.InDate.slice(0, 10);
      }
      if (item.EditDate) {
        item.EditDate = item.EditDate.slice(0, 10);
      }
    });
    return configurationList;
  }

  private loadProducts(): void {
    this.negAjax.get(`${NewkitConf.APIGatewayAddress}/framework/v1/global-configuration`, this.ajaxOpt)
      .then(({ data }) => {
        let result = [];
        this.gridColumns = data;
        this.gridView = new wijmo.CollectionView(this.formatData());
      });
  }


}
