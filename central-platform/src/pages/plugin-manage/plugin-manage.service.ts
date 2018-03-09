import { NegAjax, NegAlert, NegDfisUploader, NegUtil } from '@newkit/core';

import { Injectable } from '@angular/core';

@Injectable()
export class PluginManageService {

  constructor(
    private ajax: NegAjax,
    private negDfisUploader: NegDfisUploader
  ) {
  }

  private compareValues(v1, v2, type = 'asc') {
    if (v1 === v2) {
      return 0;
    }
    if (type === 'asc') {
      return v1 > v2 ? 1 : -1;
    } else if (type === 'desc') {
      return v1 < v2 ? 1 : -1;
    }
    return 0;
  }

  /**
   * 获取插件列表
   * @param searchKey 搜索条件
   * @param pluginType 插件类型，[true, true, true]
   * @param pageState 分页状态
   */
  public async getPluginList(searchKey, pluginType, pageState) {
    const { data } = await this.ajax.get(`${NewkitConf.NewkitAPI}/plugin/used?name=${searchKey}&type=${pluginType}&_t=${new Date().valueOf()}`);
    let sortObj = pageState.sort[0];
    if (sortObj) {
      let v1, v2;
      data.sort((item1, item2) => this.compareValues(item1[sortObj.field], item2[sortObj.field], sortObj.dir));
    }
    let result = [];
    for (var start = pageState.skip, end = Math.min(start + pageState.take, data.length); start < end; start++) {
      result.push(data[start]);
    }
    return { data: result, total: data.length };
  }

  /**
   * 上传插件
   * @param pluginName 插件名称
   * @param file
   */
  public async uploadPluginFile(plugin) {
    let dfisPath = `/newkit/attachment/${plugin.Name}_${Date.now()}.tar`;
    let uploadUrl = `${NewkitConf.NewkitAPI}/dfis_upload?path=${dfisPath}`;
    let downloadUrl = `${NewkitConf.dfis_downloadUrl}${dfisPath}`;
    await this.negDfisUploader.uploadForLL(uploadUrl, plugin.moduleFile);
    const postData = {
      Name: plugin.Name,
      PluginType: plugin.PluginType,
      Tag: plugin.Tag,
      Description: plugin.Description,
      PluginUrl: downloadUrl
    };
    const { data } = await this.ajax.post(`${NewkitConf.NewkitAPI}/plugin/new`, postData);
    return data;
  }

  /**
   * 删除插件
   * @param pluginId 插件ID
   */
  public async deletePlugin(pluginId) {
    return await this.ajax.delete(`${NewkitConf.NewkitAPI}/plugin/${pluginId}`);
  }

  /**
   * 还原到指定插件版本
   * @param pluginId 插件ID
   * @param versionId 版本ID
   */
  public async reductionPlugin(pluginId, versionId) {
    return await this.ajax.post(`${NewkitConf.NewkitAPI}/plugin/reduction`, {
      UsePluginId: pluginId,
      VersionId: versionId
    });
  }

  /**
   * 更新插件
   * @param plugin 插件对象
   */
  public async savePluginInfo(plugin) {
    return await new Promise((resolve, reject) => {
      this.ajax.put(`${NewkitConf.NewkitAPI}/plugin/${plugin.PluginId}`, plugin)
        .then(res => { resolve(true); })
        .catch(err => { resolve(false); });
    });
  }

  public async getPluginVersionList(pluginId) {
    let { data } = await this.ajax.get(`${NewkitConf.NewkitAPI}/plugin/${pluginId}/versions`)
    return data;
  }
}
