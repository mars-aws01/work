import { Component, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NegEventBus } from './../../services';

@Component({
  selector: 'nk-function-panel',
  templateUrl: 'function-panel.component.html',
  animations: [
    trigger('sysFuncPanelState', [
      state('show', style({
        height: '*'
      })),
      state('hide', style({
        height: '40px'
      })),
      transition('show <=> hide', animate('200ms ease'))
    ])
  ]
})

export class FunctionPanelComponent {

  @ViewChild('sysFuncPanel') sysFuncPanel: ElementRef;

  expandFuncPanel: boolean = true;

  constructor(private negEventBus: NegEventBus) {

  }

  ngOnInit() { }

  toggleMenuStatus() {
    this.negEventBus.emit('global.toggleMenuStatus');
  }

  showFeedback() {
    this.negEventBus.emit('global.showFeedback');
  }

  toggleFuncPanel() {
    this.expandFuncPanel = !this.expandFuncPanel;
  }
}