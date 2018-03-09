import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'pagination-demo',
  templateUrl: 'pagination-demo.component.html'
})

export class PaginationDemoComponent implements OnInit {

  @ViewChild('eventLogDiv') eventLogDiv: any;

  eventLog: Array<any> = [];
  showTotalCount = true;
  allowPageSize = false;

  public pageObj = {
    totalCount: 1024,
    pageSize: 20
  };
  public pageIndex = 1;

  ngOnInit() { }

  public onPageChanged(pageIndex: number) {
    this.setEventLogPos('onPageChange', `Pageindex changed to ${pageIndex}`);
  }

  onPageSizeChange(pageSize: number) {
    this.setEventLogPos('onPageSizeChange', `Pagesize changed to ${pageSize}`);
  }

  setEventLogPos(event: any, log: any) {
    this.eventLog.push({
      date: new Date(),
      event: event,
      log: log
    });
    if (!this.eventLogDiv) return;
    setTimeout(() => {
      this.eventLogDiv.nativeElement.scrollTop = this.eventLogDiv.nativeElement.scrollHeight;
    });
  }
}
