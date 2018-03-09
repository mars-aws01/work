import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'widget-demo',
  templateUrl: 'widget-demo.component.html'
})

export class WidgetDemoComponent implements OnInit {

  formInfo = {
    Company: 'Newegg Group',
    Name: 'Elizabeth Seraphinia',
    Phone: '(353) 945 1190 x 2923',
    Address: '2721 Calle Colima West Convina, Los Angeles',
    Country: 'United States',
    City: 'West Convina',
    State: 'California, CA',
    ZipCode: '91792',
    Fax: '91792',
    SameAsBiling: false,
    ByPass: false
  }

  ngOnInit() { }
}
