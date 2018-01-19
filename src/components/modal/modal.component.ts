import './modal.component.styl';

import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

const defaults = {
  backdrop: 'static',
  show: false,
  keyboard: false
};

@Component({
  selector: 'nk-modal',
  templateUrl: 'modal.component.html'
})
export class ModalComponent implements OnInit, AfterViewInit {

  private $modal: any;
  private $el: any;
  private modalDialog: any;
  private isShown: boolean = false;
  public hasCustomHeader: boolean = false;
  public hasCustomFooter: boolean = false;
  private dragInit = false;
  private dragObj = {
    isDragging: false,
    pageX: 0,
    pageY: 0,
    elLeft: 0,
    elTop: 0
  };
  private onHeaderMouseDown = (evt: MouseEvent) => {
    let styleObj = window.getComputedStyle(this.modalDialog);
    document.body.style.userSelect = 'none';
    this.dragObj = {
      isDragging: true,
      pageX: evt.pageX,
      pageY: evt.pageY,
      elLeft: parseInt(styleObj.left, 10),
      elTop: parseInt(styleObj.top, 10)
    }
  };
  private onDocumentMouseMove = (evt: MouseEvent) => {
    if (this.dragObj.isDragging) {
      if (evt.buttons !== 1) {
        this.dragObj.isDragging = false;
        document.body.style.userSelect = 'unset';
        return;
      }
      let nextLeft = this.dragObj.elLeft + evt.pageX - this.dragObj.pageX;
      let nextTop = this.dragObj.elTop + evt.pageY - this.dragObj.pageY;
      nextLeft = Math.max(0, nextLeft);
      nextLeft = Math.min(window.innerWidth - this.modalDialog.clientWidth, nextLeft);
      nextTop = Math.max(0, nextTop);
      nextTop = Math.min(window.innerHeight - this.modalDialog.clientHeight, nextTop);
      this.modalDialog.style.left = `${nextLeft}px`;
      this.modalDialog.style.top = `${nextTop}px`;
    }
  };
  private onDocumentMouseUp = (evt: MouseEvent) => {
    document.body.style.userSelect = 'unset';
    this.dragObj.isDragging = false;
  };
  public get modalSize() {
    return (this.size || '').indexOf('modal') === -1 ? `modal-${this.size}` : this.size;
  }

  @Input() size: string;
  @Input() width: number;
  @Input() header: string;
  @Input() animate: string = 'fade';
  @Input() okText: string = 'Save';
  @Input() cancelText: string = 'Cancel';
  @Input() draggable: boolean = false;
  @Input() disableBackdrop: boolean = false;
  @Input() options: { backdrop?: boolean | string, show?: boolean, keyboard?: boolean };
  @Output() onShown: EventEmitter<any> = new EventEmitter();
  @Output() onHidden: EventEmitter<any> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Output() onOk: EventEmitter<any> = new EventEmitter();
  @Input() set shown(val: boolean) {
    if (!this.$modal || this.isShown === val) {
      return;
    }
    this.isShown = val;
    this.isShown ? this.showModal() : this.hideModal();
  }

  @Output() shownChange = new EventEmitter();
  @ViewChild('modalHeader') modalHeader: any;
  @ViewChild('modalFooter') modalFooter: any;

  constructor(
    private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.$el = this.elementRef.nativeElement;
    this.$modal = window['jQuery'](this.$el.querySelector('.modal'));
    this.modalDialog = this.$el.querySelector('.modal-dialog');
    this.hasCustomHeader = !!this.modalHeader.nativeElement.querySelector('[slot=modal-header]');
    this.hasCustomFooter = !!this.modalFooter.nativeElement.querySelector('[slot=modal-footer]');
  }

  ngOnChanges(changesObj: SimpleChanges) {
    if (changesObj.draggable) {
      this.initDrag();
    }
  }

  ngAfterViewInit() {
    this.configModalOptions();
    this.configModalEvents();
    if (this.isShown) {
      this.showModal();
    }
  }

  ngOnDestroy() {
    let header = this.modalDialog.querySelector('.modal-header');
    header.removeEventListener('mousedown', this.onHeaderMouseDown);
    document.removeEventListener('mousemove', this.onDocumentMouseMove);
    document.removeEventListener('mouseup', this.onDocumentMouseUp);
    if (this.$modal) {
      this.hideModal()
    }
  }

  private configModalOptions() {
    let opt = Object.assign({}, defaults, this.options);
    this.$modal.modal(opt);
  }

  private configModalEvents() {
    this.$modal.on('hidden.bs.modal', (e: Event) => {
      if (e.target === this.$el.querySelector('.modal')) {
        this.shownChange.emit(false);
        this.onHidden.emit(e);
      }
    });
    this.$modal.on('shown.bs.modal', (e: Event) => {
      if (e.target === this.$el.querySelector('.modal')) {
        this.shownChange.emit(true);
        this.onShown.emit(e);
      }
    });
  }

  private initDrag() {
    if (this.dragInit) {
      return;
    }
    let header = this.elementRef.nativeElement.querySelector('.modal-header');
    if (this.draggable) { // 初始化Drag
      header.addEventListener('mousedown', this.onHeaderMouseDown, false);
      document.addEventListener('mousemove', this.onDocumentMouseMove, false);
      document.addEventListener('mouseup', this.onDocumentMouseUp, false);
    }
    this.dragInit = true;
  }

  showModal() {
    if (this.draggable) {
      this.initModalPosition();
    }
    let opt = Object.assign({}, defaults, this.options);
    this.$modal.modal(opt).modal('show');
  }

  hideModal() {
    this.$modal.modal('hide');
  }

  onCancelClick() {
    this.onCancel.emit();
    this.hideModal();
  }

  onOkClick() {
    this.onOk.emit();
  }

  private initModalPosition() {
    this.modalDialog.style.top = '-1000px';
    setTimeout(() => {
      this.modalDialog.style.top = '30px';
      this.modalDialog.style.left = `${(window.innerWidth - this.modalDialog.clientWidth) / 2}px`;
    }, 300);
  }
}
