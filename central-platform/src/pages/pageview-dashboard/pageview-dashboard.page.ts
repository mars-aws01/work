import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { NegMultiTab, NegBreadcrumb, NegAjax } from '@newkit/core';

@Component({
  selector: 'pageview-dashboard',
  templateUrl: './pageview-dashboard.html'
})

export class PageviewDashboardPage {

  @ViewChild('visitsStatisticsChart')
  visitsStatisticsChartDiv: ElementRef;
  private visitsStatisticsChart: any;
  private visitsStatisticsChartOpt = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '30px',
      top: '30px',
      containLabel: true
    },
    legend: {
      show: true,
      type: 'scroll',
      bottom: 0,
      data: ['Visits', 'Unique Visits']
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: 'Visits',
      data: [],
      type: 'line',
      smooth: true
    },
    {
      name: 'Unique Visits',
      data: [],
      type: 'line',
      smooth: true
    }]
  }

  @HostListener('window:resize')
  onWindowResize() {
    setTimeout(() => {
      this.visitsStatisticsChart && this.visitsStatisticsChart.resize();
    });
  }

  constructor(
    private negMultiTab: NegMultiTab,
    private negBreadcrumb: NegBreadcrumb,
    private negAjax: NegAjax) {

  }

  ngOnInit() {
    this.negMultiTab.setCurrentTabName({ 'en-us': 'PageView Dashboard' });
    this.negBreadcrumb.setBreadcrumbs([
      { 'en-us': 'Control Panel' },
      { 'en-us': 'System Analytics' },
      { 'en-us': 'PageView Dashboard' }]);
  }

  ngAfterViewInit() {
    this.visitsStatisticsChart = echarts.init(this.visitsStatisticsChartDiv.nativeElement);
    this.getVisitsData();
  }

  ngOnDestroy() {
    this.visitsStatisticsChart && this.visitsStatisticsChart.dispose();
  }

  private getVisitsData() {
    let queryOpt = {
      "size": 0,
      "query": {
        "term": { "Action": "visit" }
      },
      "aggs": {
        "visits": {
          "date_histogram": {
            "field": "EventDate",
            "interval": "day",
            "format": "yyyy-MM-dd",
            "min_doc_count": 0
          },
          "aggs": {
            "uniq_user": {
              "cardinality": {
                "field": "UserId"
              }
            }
          }
        }
      }
    };
    this.negAjax.post(`${NewkitConf.NewkitAPI}/bizlog/EventTracking/search`, queryOpt)
      .then(res => {
        let xAxisData = [];
        let visitsData = [];
        let uniqVisitsData = [];
        for (let buck of res.data.aggregations.visits.buckets) {
          xAxisData.push(buck.key_as_string);
          visitsData.push(buck.doc_count);
          uniqVisitsData.push(buck.uniq_user.value);
        }
        this.visitsStatisticsChartOpt.xAxis.data = xAxisData;
        this.visitsStatisticsChartOpt.series[0].data = visitsData;
        this.visitsStatisticsChartOpt.series[1].data = uniqVisitsData;
        this.visitsStatisticsChart.setOption(this.visitsStatisticsChartOpt);
      })
      .catch(err => console.log(err));
  }
}
