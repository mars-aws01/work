import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { NegAjax, NegAlert, NegAuth, NegUserProfile, NegUtil, NegBizLog } from '@newkit/core';

require('./home.component.styl');

interface WidgetBox {
  header: string,
  widgetName: string,
  size: string,
  headerColor: string
}

@Component({
  selector: 'home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit, AfterViewInit {

  public widgetModal = {
    shown: false,
    header: ''
  };
  public selectedWidget = {
    isNew: false,
    index: -1,
    header: '',
    headerColor: 'default',
    size: 'col-md-3',
    widgetName: ''
  };
  public headerColors = [
    'default', 'green', 'greenDark', 'greenLight', 'purple', 'magenta', 'pink', 'pinkDark', 'blueLight',
    'teal', 'blue', 'blueDark', 'darken', 'yellow', 'orange', 'orangeDark', 'red', 'redLight', 'white'
  ];
  public widgetGridDataSource = [];

  private dragObj = {
    draging: false,
    startPosition: {
      pageX: 0,
      pageY: 0
    },
    moveObj: null
  };

  public widgetList: Array<WidgetBox> = [];

  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private negAuth: NegAuth,
    private negAlert: NegAlert,
    private negUtil: NegUtil,
    private negAjax: NegAjax,
    private negUserProfile: NegUserProfile,
    private negBizLog: NegBizLog) {
    this._doMouseMove = this._doMouseMove.bind(this);
    this._doMouseUp = this._doMouseUp.bind(this);
    this._doMouseDown = this._doMouseDown.bind(this);
  }

  ngOnInit() {
    this._loadWidgetGridData();
    this._loadWidgetList();
  }

  ngAfterViewInit() {
    this._initDragEvent();
  }

  ngOnDestroy() {
    jQuery('.widget-container').off('mousedown', '.nk-widget header h2', this._doMouseDown);
    jQuery(document).off('mousemove', this._doMouseMove);
    jQuery(document).off('mouseup', this._doMouseUp);
  }

  public showWidgetSettingModal(widget, idx) {
    this.negUtil.resetObject(this.selectedWidget);
    this.selectedWidget.isNew = !widget;
    this.selectedWidget.index = idx;
    if (widget) { // Edit
      Object.assign(this.selectedWidget, widget);
      this.widgetModal.header = 'Widget Setting';
    } else { // New
      Object.assign(this.selectedWidget, {
        headerColor: 'default',
        size: 'col-md-3'
      });
      this.widgetModal.header = 'Add New Widget';
    }
    this.widgetModal.shown = true;
    this.negBizLog.log('click', null, null, 'Add Widget');
  }

  public confirmDeleteWidget(widget) {
    this.negAlert.confirm('Sure to delete the widget box', () => {
      this.negUtil.remove(this.widgetList, widget);
      this._updateUserProfile();
    });
  }

  public saveWidgetBox() {
    if (!this.selectedWidget.header) {
      return this.negAlert.info('Please set the widget box header.');
    }
    if (!this.selectedWidget.widgetName) {
      return this.negAlert.info('Please select a widget.');
    }
    let newWidget = {
      widgetName: this.selectedWidget.widgetName,
      size: this.selectedWidget.size,
      header: this.selectedWidget.header,
      headerColor: this.selectedWidget.headerColor
    };
    if (this.selectedWidget.isNew) {
      this.widgetList.unshift(newWidget);
    } else { // Edit
      let w = this.widgetList[this.selectedWidget.index];
      Object.assign(w, newWidget);
    }
    this.widgetModal.shown = false;
    this._updateUserProfile();
  }

  public onGridSelectionChange(rowEvt) {
    let widgetName = '';
    if (rowEvt.selected) {
      widgetName = this.widgetGridDataSource[rowEvt.index].Name;
    }
    this.selectedWidget.widgetName = widgetName;
  }

  public isRowSelected(row) {
    return true;
  }

  private _loadWidgetGridData() {
    this.negAjax.get(`${NewkitConf.NewkitAPI}/plugin/widget`)
      .then(({ data }) => {
        this.widgetGridDataSource = data;
      });
  }

  private _updateUserProfile() {
    this.negUserProfile.set('widgetList', this.widgetList);
  }

  private _loadWidgetList() {
    this.negUserProfile.get('widgetList').then(value => {
      this.widgetList = value || [];
    });
  }

  //#region Mouse Event
  private _doMouseMove(evt: MouseEvent) {
    if (!this.dragObj.draging) { return; }
    if (evt.buttons === 0) {
      this._doMouseUp(evt);
      return;
    }
    let startPosition = this.dragObj.startPosition;
    let moveX = evt.pageX - startPosition.pageX;
    let moveY = evt.pageY - startPosition.pageY;
    this.dragObj.moveObj.css({
      left: moveX,
      top: moveY
    });
  }

  private _doMouseUp(evt) {
    this.dragObj.draging = false;
    $('body').css('user-select', 'auto');
    if (this.dragObj.moveObj) {
      // 计算顶点坐标
      let offset = this.dragObj.moveObj.offset();
      this.dragObj.moveObj.css({
        width: 'auto',
        height: 'auto',
        left: 'auto',
        top: 'auto',
        position: 'relative',
        'z-index': 'auto'
      });
      console.log(offset);
      let moveWidgetId = this.dragObj.moveObj.parents('.widget-container').attr('id');
      let widgets = $('.widget-container .nk-widget');
      for (var i = 0; i < widgets.length; i++) {
        let $w = $(widgets.get(i));
        let wOffset = $w.offset();
        let width = $w.width();
        let height = $w.height();
        let inArea = this._pointInArea(offset, wOffset, width, height);
        if (inArea) {
          let targetWidgetId = $w.parents('.widget-container').attr('id');
          if (targetWidgetId !== moveWidgetId) {
            this._moveWidget(moveWidgetId, targetWidgetId);
          }
          break;
        }
      }
    }
    this.dragObj.moveObj = null;
  }

  private _moveWidget(from, to) {
    from = Number(from.replace('widget', ''));
    to = Number(to.replace('widget', ''));
    var tempList = [];
    this.widgetList.forEach((w, i) => {
      if (i === from) {
        // 遇到from，跳过，不能删除
        return;
      }
      if (i === to) {
        tempList.push(this.widgetList[from]);
      }
      tempList.push(w);
    });
    this.widgetList = tempList;
    this._updateUserProfile();
  }

  private _pointInArea(pointOffset, areaOffset, width, height) {
    let x = pointOffset.left;
    let y = pointOffset.top;
    if (x > areaOffset.left && x < areaOffset.left + width &&
      y > areaOffset.top && y < areaOffset.top + height) {
      return true;
    }
    return false;
  }

  private _doMouseDown(evt) {
    let moveObj = this.dragObj.moveObj = $(evt.target).parent().parent();
    this.dragObj.draging = true;
    $('body').css('user-select', 'none');
    this.dragObj.startPosition = { pageX: evt.pageX, pageY: evt.pageY };
    moveObj.css({
      position: 'absolute',
      width: moveObj.width(),
      height: moveObj.height(),
      left: 0,
      top: 0,
      'z-index': 9999
    });
  }

  private _initDragEvent() {
    // 开始拖拽
    jQuery('.widget-container').on('mousedown', '.nk-widget header h2', this._doMouseDown);
    // 处理移动
    jQuery(document).on('mousemove', this._doMouseMove);
    // 处理释放
    jQuery(document).on('mouseup', this._doMouseUp);
  }
  //#endregion
}
