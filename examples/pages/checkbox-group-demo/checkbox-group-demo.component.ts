import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'checkbox-group-demo',
  templateUrl: 'checkbox-group-demo.component.html'
})

export class CheckboxGroupDemoComponent implements OnInit {

  public languageList = ['JavaScript', 'C#', 'Java', 'Go', 'Python'];
  public selectedLanguages: string[] = [];
  
  ngOnInit() { }
}
