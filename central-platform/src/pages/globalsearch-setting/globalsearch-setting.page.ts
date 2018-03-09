import { Component } from '@angular/core';
import { GlobalSearchService } from './../../services';
import { NegMessageBox } from '@newkit/core';

@Component({
  selector: 'globalsearch-setting',
  templateUrl: './globalsearch-setting.html'
})

export class GlobalSearchSettingPage {

  globalSearchList: any;
  editModal = {
    shown: false,
    header: '',
    isEdit: false
  }
  selectedItem: any;

  constructor(
    private negMessageBox: NegMessageBox,
    private globalSearchService: GlobalSearchService) { }

  ngOnInit() {
    this._getGlobalSearchItems();
  }

  private _getGlobalSearchItems() {
    this.globalSearchService.getGlobalSearchSettings(true)
      .then(data => {
        this.globalSearchList = data;
      })
      .catch(err => { })
  }

  showEditModal(data) {
    if (data) {
      this.selectedItem = _.cloneDeep(data);
      this.editModal.header = `Edit ${data.SearchName}`;
      this.editModal.isEdit = true;
    } else {
      this.selectedItem = {
        SearchName: '',
        SearchNameCn: '',
        SearchNameTw: '',
        TipInfo: '',
        TipInfoCn: '',
        TipInfoTw: '',
        UrlTemplate: ''
      };
      this.editModal.header = `Add Item`;
      this.editModal.isEdit = false;
    }
    this.editModal.shown = true;
  }

  deleteItem(data) {
    this.negMessageBox.confirm(`Are you sure want to delete ${data.SearchName} ?`, 'Delete Item', () => {
      this.globalSearchService.deleteGlobalSearchSetting(data.Id)
        .then(data => {
          this._getGlobalSearchItems();
          this.negMessageBox.success('Deleted');
        })
        .catch(err => console.log(err));
    });
  }

  public async save(form: any, isOutForm: boolean = false) {
    if (isOutForm) {
      form.submit();
      return;
    }
    if (!form.validateForm()) return;
    let handler;
    if (this.editModal.isEdit) {
      handler = this.globalSearchService.updateGlobalSearchSetting(this.selectedItem.Id, this.selectedItem);
    } else {
      handler = this.globalSearchService.addGlobalSearchSetting(this.selectedItem);
    }
    handler
      .then(data => {
        form.resetForm();
        this._getGlobalSearchItems();
        this.negMessageBox.success(this.editModal.isEdit ? 'Updated' : 'Created');
        this.editModal.shown = false;
      })
      .catch(err => console.log(err))
  }
}
