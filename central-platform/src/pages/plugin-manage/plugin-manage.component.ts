import './plugin-manage.component.styl';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NegAlert, NegUtil, NegGlobalLoading } from '@newkit/core';
import { ActivatedRoute } from '@angular/router';

import { PluginManageService } from './plugin-manage.service';

@Component({
  templateUrl: 'plugin-manage.component.html',
  providers: [PluginManageService]
})

export class PluginManageComponent implements OnInit {

  public pluginList: { data: Array<any>, total: number }; // 存储插件列表
  public pluginVersions: Array<any> = []; // 存储选中的插件版本列表
  public gridState: any = { skip: 0, take: 16, sort: [] };
  public selectedPlugin: any = {};
  public pluginSearch = {
    Name: '',
    PluginTypes: ['module', 'widget']
  };
  public pluginVersionModal = {
    shown: false,
    header: ''
  };

  public pluginEditModal = {
    shown: false,
    header: ''
  };

  public installModal = {
    shown: false,
    uploadFileName: ''
  };

  @ViewChild('f1')
  public fileInput: ElementRef;

  private _subscribers = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private negAlert: NegAlert,
    private negUtil: NegUtil,
    private negGlobalLoading: NegGlobalLoading,
    private pluginManageService: PluginManageService) {
  }

  ngOnInit() {
    let querySub = this.activatedRoute.queryParams.subscribe(data => {
      setTimeout(() => {
        let queryParams = this.negUtil.getRouteQueryParams();
        this.pluginSearch.Name = queryParams.pluginName || '';
        this._loadUsedPluginList();
      });
    })
    this._subscribers.push(querySub);
  }

  ngOnDestroy() {
    this._subscribers.forEach(x => x.unsubscribe());
  }

  public searchPlugin() {
    this.gridState.skip = 0;
    this._loadUsedPluginList();
  }

  public gridStateChange(state) {
    Object.assign(this.gridState, state);
    this._loadUsedPluginList();
  }

  public downloadPackage(plugin) {
    let pluginUrl = plugin.PluginUrl;
    this.negUtil.downloadFile(pluginUrl);
  }

  public showPluginVersionModal(plugin) {
    this.selectedPlugin = _.cloneDeep(plugin);
    this.pluginVersionModal.header = `Show Plugin [${plugin.Name}] Versions`;
    this._loadPluginVersionList(plugin.PluginId);
    setTimeout(() => {
      this.pluginVersionModal.shown = true;
    }, 200)
  }

  public showPluginEditModal(plugin) {
    this.selectedPlugin = _.cloneDeep(plugin);
    this.pluginEditModal.shown = true;
    this.pluginEditModal.header = `Edit Plugin [${plugin.Name}]`;
  }

  public showInstallModal() {
    this.selectedPlugin = {
      PluginType: 'Module'
    };
    this.fileInput && (this.fileInput.nativeElement.value = null);
    this.installModal.uploadFileName = '';
    this.installModal.shown = true;
  }

  public installPlugin() {
    if (!this.selectedPlugin.Name) {
      return this.negAlert.info('Plugin name required.');
    }
    if (!this.selectedPlugin.Tag) {
      return this.negAlert.info('Plugin tag required.');
    }
    if (!this.selectedPlugin.moduleFile) {
      return this.negAlert.info('Must select a plugin tar file.');
    }
    this.negGlobalLoading.show();
    this.pluginManageService.uploadPluginFile(this.selectedPlugin)
      .then(() => {
        this.negAlert.success('Install successfully.');
        this.installModal.shown = false;
        this._loadUsedPluginList();
        this.negGlobalLoading.hide();
      })
      .catch((reason) => {
        this.negAlert.error(reason);
        this.negGlobalLoading.hide();
        return Promise.reject(reason);
      });
  }

  public selectFile(evt) {
    let file = evt.target.files[0];
    this.selectedPlugin.moduleFile = file;
    this.installModal.uploadFileName = (file || {}).name;
  }

  public confirmUninstallPlugin(plugin) {
    this.negAlert.confirm(`Sure to uninstall the plugin?`, async () => {
      await this.pluginManageService.deletePlugin(plugin.Id);
      this._loadUsedPluginList();
    });
  }

  public confirmReductionPlugin(pluginVersion) {
    this.negAlert.confirm(`Sure to reduction the plugin?`, async () => {
      await this.pluginManageService.reductionPlugin(this.selectedPlugin.Id, pluginVersion.Id);
      this.pluginVersionModal.shown = false;
      this.negAlert.success('Reduction plugin successfully.');
      this._loadUsedPluginList();
    });
  }

  public async savePluginInfo(form: any, isOutForm: boolean = false) {
    if (isOutForm) {
      form.submit();
      return;
    }
    if (!form.validateForm()) return;
    let result = await this.pluginManageService.savePluginInfo(this.selectedPlugin);
    if (result) {
      this.negAlert.success('Update successfully.');
      this.pluginEditModal.shown = false;
      this._loadUsedPluginList();
    }
  }

  private get pluginTypes() {
    let result = [];
    let arr = this.pluginSearch.PluginTypes;
    result.push(arr.indexOf('module') >= 0);
    result.push(arr.indexOf('widget') >= 0);
    return result.map(x => Number(x)).join(',');
  }

  private async _loadUsedPluginList() {
    let data = await this.pluginManageService.getPluginList(this.pluginSearch.Name, this.pluginTypes, this.gridState);
    this.pluginList = data;
  }

  private async _loadPluginVersionList(pluginId) {
    let data = await this.pluginManageService.getPluginVersionList(pluginId);
    this.pluginVersions = data;
  }
}
