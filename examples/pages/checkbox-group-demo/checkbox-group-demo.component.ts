import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'checkbox-group-demo',
  templateUrl: 'checkbox-group-demo.component.html'
})

export class CheckboxGroupDemoComponent implements OnInit {

  public languageList = ['JavaScript', 'C#', 'Java', 'Go', 'Python'];
  public selectedLanguages: string[] = ['C#'];

  ngOnInit() {
    setTimeout(() => {
      this.selectedLanguages.push('Java');
      this.selectedLanguages = this.selectedLanguages.slice(0);
      console.log('[checkbox group] value pushed');
    }, 2000);
  }
}
