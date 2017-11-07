import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grid-demo',
  templateUrl: 'grid-demo.component.html'
})
export class GridDemoComponent implements OnInit {
  public userList: any[] = [];
  ngOnInit() {
    for (let i = 0; i < 25; i++) {
      this.userList.push({
        Name: Math.random()
          .toString(16)
          .substring(0, 10),
        Age: i,
        Sex: i % 2 === 0 ? '男' : '女'
      });
    }
  }
}
