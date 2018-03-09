import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'ng-for-event',
  template: ''
})
export class NgForEventComponent {

  @Input() isLast: boolean;
  @Output() onLastDone: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
    if (this.isLast) {
      this.onLastDone.emit(true);
    }
  }
}
