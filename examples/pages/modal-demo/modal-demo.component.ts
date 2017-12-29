import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modal-demo',
  templateUrl: 'modal-demo.component.html'
})

export class ModalDemoComponent implements OnInit {

  public modalShown: boolean = false;
  public modal2Shown: boolean = false;
  public modal3Shown: boolean = false;
  public modal4Shown: boolean = false;
  public modal5Shown: boolean = false;

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

  public showModal(key: string) {
    this[key] = true;
  }

  public onOkBtnClick() {
    alert('您点击了OK OR 自定义按钮');
  }
}
