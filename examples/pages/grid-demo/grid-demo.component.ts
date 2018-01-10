import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'grid-demo',
  templateUrl: 'grid-demo.component.html'
})
export class GridDemoComponent implements OnInit {

  @ViewChild('eventLogDiv') eventLogDiv: ElementRef;

  itemList: Array<any> = [];
  eventLog: Array<any> = [];
  pageIndex = 1;
  pageSizeList = [5, 10, 20];

  public userList: any[] = [];
  ngOnInit() {

    for (let i = 0; i < 15; i++) {
      this.itemList.push({
        ItemNo: `80-102-31${i}`,
        Description: `Description Test ${i}`,
        Qty: Math.floor(Math.random() * 10),
        UnitPrice: (Math.random() * 10).toFixed(2),
        ExtPrice: '0.00',
        Charge: (Math.random() * 10).toFixed(2),
        WH: Math.random() > 0.5 ? '02' : '01',
        Margin: Math.floor(Math.random() * 1000),
        Margin_: '100%',
        Weight: Math.floor(Math.random() * 25)
      });
      this.itemList = window['_'].orderBy(this.itemList, ['UnitPrice']);
    }
  }

  onSorting(sortInfo: any) {
    this.itemList = window['_'].orderBy(this.itemList, [sortInfo.field], [sortInfo.sort]);
    this.eventLog.push({
      date: new Date(),
      event: 'onSorting',
      log: `Sortinfo changed to ${JSON.stringify(sortInfo)}`
    });
    this.setEventLogPos();
  }

  onPaging(val: any) {
    this.eventLog.push({
      date: new Date(),
      event: 'onPaging',
      log: `Page index changed to ${JSON.stringify(val)}`
    });
    this.setEventLogPos();
  }

  onPageSizeChanged(val: any) {
    this.eventLog.push({
      date: new Date(),
      event: 'onPageSizeChanged',
      log: `Pagesize changed to ${JSON.stringify(val)}`
    });
    this.pageIndex = 1;
    this.setEventLogPos();
  }

  onRowClick(data: any) {
    this.eventLog.push({
      date: new Date(),
      event: 'onRowClick',
      log: `Data: ${JSON.stringify(data)}`
    });
    this.setEventLogPos();
    
    console.log(data);
  }

  setEventLogPos() {
    if (!this.eventLogDiv) return;
    setTimeout(() => {
      this.eventLogDiv.nativeElement.scrollTop = this.eventLogDiv.nativeElement.scrollHeight;
    });
  }
}
