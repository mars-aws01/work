import './user-access-log.scss';
import { Component } from '@angular/core';
import { NegMultiTab, NegBreadcrumb, NegAjax } from '@newkit/core';

@Component({
  selector: 'user-access-log',
  templateUrl: './user-access-log.html'
})

export class UserAccessLogPage {

  searchInfo = {
    UserID: null,
    Page: null,
    Action: null
  }
  pageSize = 30;
  skip: number = 0;

  eventLogs: any;

  constructor(
    private negMultiTab: NegMultiTab,
    private negBreadcrumb: NegBreadcrumb,
    private negAjax: NegAjax) {

  }

  ngOnInit() {
    this.negMultiTab.setCurrentTabName({ 'en-us': 'Query User Access Log' });
    this.negBreadcrumb.setBreadcrumbs([
      { 'en-us': 'Control Panel' },
      { 'en-us': 'System Analytics' },
      { 'en-us': 'Query User Access Log' }]);
    this._getEventLogs();
  }

  submitForm(form: any) {
    this.skip = 0;
    this._getEventLogs();
  }

  pageChange(event: any) {
    this.skip = event.skip;
    this._getEventLogs();
  }

  private _getEventLogs() {
    let dsl = this._buildDsl(this.searchInfo);
    this.negAjax.post(`${NewkitConf.NewkitAPI}/bizlog/EventTracking/search`, dsl)
      .then(res => {
        this.eventLogs = {
          data: res.data.hits.hits.map(x => x._source),
          total: res.data.hits.total
        };
      })
      .catch(err => {
        this.eventLogs = null;
        console.log(err);
      });
  }

  private _buildDsl(data: any) {
    let query: any = [];
    let queryStrings = [];
    if (data.Action) {
      queryStrings.push(`Action:${data.Action}`);
    }
    if (data.UserID) {
      queryStrings.push(`UserId:${data.UserID}`);
    }
    let queryOpt: any = {
      "sort": {
        "EventDate": 'desc'
      },
      "from": this.skip,
      "size": this.pageSize
    }
    if (queryStrings.length > 0) {
      query.push({
        "query_string": {
          "query": queryStrings.join(" AND "),
        }
      })
    }
    if (data.Page) {
      query.push({
        "wildcard": {
          "Url": `*${data.Page}*`
        }
      })
    }
    if (query.length > 0) {
      queryOpt.query = {
        "bool": {
          "must": query
        }
      }
    }
    return queryOpt;
  }
}
