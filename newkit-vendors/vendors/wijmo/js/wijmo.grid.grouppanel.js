"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wjcCore = require("wijmo/wijmo");
var wjcGrid = require("wijmo/wijmo.grid");
var wjcSelf = require("wijmo/wijmo.grid.grouppanel");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['grid'] = window['wijmo']['grid'] || {};
window['wijmo']['grid']['grouppanel'] = wjcSelf;
'use strict';
var GroupPanel = (function (_super) {
    __extends(GroupPanel, _super);
    function GroupPanel(element, options) {
        var _this = _super.call(this, element) || this;
        _this._hideGroupedCols = true;
        _this._maxGroups = 6;
        _this._hiddenCols = [];
        var depErr = 'Missing dependency: GroupPanel requires ';
        wjcCore.assert(wjcGrid != null, depErr + 'wijmo.grid.');
        var tpl = _this.getTemplate();
        _this.applyTemplate('wj-grouppanel wj-control', tpl, {
            _divMarkers: 'div-markers',
            _divPH: 'div-ph'
        });
        var e = _this.hostElement;
        _this.addEventListener(e, 'dragstart', _this._dragStart.bind(_this));
        _this.addEventListener(e, 'dragover', _this._dragOver.bind(_this));
        _this.addEventListener(e, 'drop', _this._drop.bind(_this));
        _this.addEventListener(e, 'dragend', _this._dragEnd.bind(_this));
        _this.addEventListener(e, 'click', _this._click.bind(_this));
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(GroupPanel.prototype, "hideGroupedColumns", {
        get: function () {
            return this._hideGroupedCols;
        },
        set: function (value) {
            if (value != this._hideGroupedCols) {
                this._hideGroupedCols = wjcCore.asBoolean(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupPanel.prototype, "maxGroups", {
        get: function () {
            return this._maxGroups;
        },
        set: function (value) {
            if (value != this._maxGroups) {
                this._maxGroups = wjcCore.asNumber(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupPanel.prototype, "placeholder", {
        get: function () {
            return this._divPH.textContent;
        },
        set: function (value) {
            this._divPH.textContent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupPanel.prototype, "grid", {
        get: function () {
            return this._g;
        },
        set: function (value) {
            value = wjcCore.asType(value, wjcGrid.FlexGrid, true);
            if (value != this._g) {
                if (this._g) {
                    this._g.draggingColumn.removeHandler(this._draggingColumn);
                    this._g.sortedColumn.removeHandler(this.invalidate);
                    this._g.itemsSourceChanging.removeHandler(this._itemsSourceChanging);
                    this._g.itemsSourceChanged.removeHandler(this._itemsSourceChanged);
                    this._g.columns.collectionChanged.removeHandler(this._itemsSourceChanged);
                }
                this._g = value;
                this._hiddenCols = [];
                if (this._g) {
                    this._g.draggingColumn.addHandler(this._draggingColumn, this);
                    this._g.sortedColumn.addHandler(this.invalidate, this);
                    this._g.itemsSourceChanging.addHandler(this._itemsSourceChanging, this);
                    this._g.itemsSourceChanged.addHandler(this._itemsSourceChanged, this);
                    this._g.columns.collectionChanged.addHandler(this._itemsSourceChanged, this);
                }
                this._itemsSourceChanged(this._g, null);
            }
        },
        enumerable: true,
        configurable: true
    });
    GroupPanel.prototype.refresh = function () {
        _super.prototype.refresh.call(this);
        this._divMarkers.innerHTML = '';
        this._dragMarker = this._dragCol = null;
        if (this._gds) {
            for (var i = 0; i < this._gds.length; i++) {
                var gd = this._gds[i], panel = this._g.columnHeaders, row = -1, col = -1;
                for (var rowIndex = panel.rows.length - 1; rowIndex >= 0 && col < 0; rowIndex--) {
                    for (var colIndex = 0; colIndex < panel.columns.length && col < 0; colIndex++) {
                        var bcol = this._g._getBindingColumn(panel, rowIndex, panel.columns[colIndex]);
                        if (bcol && bcol.binding == gd.propertyName) {
                            col = colIndex;
                            row = rowIndex;
                            break;
                        }
                    }
                }
                if (col > -1 && row > -1) {
                    var mk = document.createElement('div');
                    this._g.cellFactory.updateCell(this._g.columnHeaders, row, col, mk);
                    mk.setAttribute('class', 'wj-cell wj-header wj-groupmarker');
                    wjcCore.setCss(mk, {
                        position: 'static',
                        display: 'inline-block',
                        verticalAlign: 'top',
                        left: '',
                        top: '',
                        right: '',
                        height: 'auto',
                        width: 'auto'
                    });
                    var filter = mk.querySelector('.wj-elem-filter');
                    if (filter) {
                        wjcCore.removeChild(filter);
                    }
                    var remove = wjcCore.createElement('<span wj-remove="" style="font-weight:normal;cursor:pointer;pointer;padding:12px;padding-right:3px">&times;</span>', mk);
                    this._divMarkers.appendChild(mk);
                }
            }
            if (this._divMarkers.children.length > 0) {
                this._divPH.style.display = 'none';
                this._divMarkers.style.display = '';
            }
            else {
                this._divPH.style.display = '';
                this._divMarkers.style.display = 'none';
            }
        }
    };
    GroupPanel.prototype._addGroup = function (col, e) {
        var index = this._getIndex(e), gds = this._gds;
        for (var i = 0; i < gds.length; i++) {
            if (gds[i].propertyName == col.binding) {
                gds.removeAt(i);
                if (i < index) {
                    index--;
                }
                break;
            }
        }
        for (var i = this.maxGroups - 1; i < gds.length; i++) {
            this._removeGroup(i, gds);
            if (i < index) {
                index--;
            }
        }
        gds.deferUpdate(function () {
            var gd = new wjcCore.PropertyGroupDescription(col.binding);
            gds.insert(index, gd);
        });
        if (col && this.hideGroupedColumns) {
            col.visible = false;
            this._hiddenCols.push(col);
        }
        this.invalidate();
    };
    GroupPanel.prototype._moveGroup = function (marker, e) {
        var gds = this._gds, oldIndex = this._getElementIndex(this._dragMarker), newIndex = this._getIndex(e);
        if (newIndex > oldIndex) {
            newIndex--;
        }
        if (newIndex >= this._gds.length) {
            newIndex = this._gds.length;
        }
        if (oldIndex != newIndex) {
            gds.deferUpdate(function () {
                var gd = gds[oldIndex];
                gds.removeAt(oldIndex);
                gds.insert(newIndex, gd);
            });
        }
    };
    GroupPanel.prototype._removeGroup = function (index, groups) {
        if (groups === void 0) { groups = this._gds; }
        var binding = groups[index].propertyName, col = this._g.columns.getColumn(binding), idx = this._hiddenCols.indexOf(col);
        groups.removeAt(index);
        if (col) {
            col.visible = true;
            if (idx > -1) {
                this._hiddenCols.splice(idx, 1);
            }
        }
    };
    GroupPanel.prototype._getIndex = function (e) {
        var arr = this._divMarkers.children;
        for (var i = 0; i < arr.length; i++) {
            var rc = arr[i].getBoundingClientRect();
            if (e.clientX < rc.left + rc.width / 2) {
                return i;
            }
        }
        return arr.length;
    };
    GroupPanel.prototype._getElementIndex = function (e) {
        if (e && e.parentElement) {
            var arr = e.parentElement.children;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == e) {
                    return i;
                }
            }
        }
        return -1;
    };
    GroupPanel.prototype._draggingColumn = function (s, e) {
        var g = this._g, col = g._getBindingColumn(e.panel, e.row, g.columns[e.col]);
        this._dragCol = col.binding ? col : null;
    };
    GroupPanel.prototype._itemsSourceChanging = function (s, e) {
        this._hiddenCols.forEach(function (col) {
            col.visible = true;
        });
        this._hiddenCols = [];
    };
    GroupPanel.prototype._itemsSourceChanged = function (s, e) {
        if (this._gds) {
            this._gds.collectionChanged.removeHandler(this._groupsChanged);
        }
        this._gds = null;
        if (this._g.collectionView) {
            this._gds = this._g.collectionView.groupDescriptions;
            this._gds.collectionChanged.addHandler(this._groupsChanged, this);
        }
        this.invalidate();
    };
    GroupPanel.prototype._groupsChanged = function (s, e) {
        this.invalidate();
    };
    GroupPanel.prototype._dragStart = function (e) {
        wjcCore._startDrag(e.dataTransfer, 'move');
        this._dragMarker = e.target;
        this._dragCol = null;
    };
    GroupPanel.prototype._dragOver = function (e) {
        var valid = this._dragCol || this._dragMarker;
        if (valid) {
            e.dataTransfer.dropEffect = 'move';
            e.preventDefault();
            e.stopPropagation();
        }
    };
    GroupPanel.prototype._drop = function (e) {
        if (this._dragMarker) {
            this._moveGroup(this._dragMarker, e);
        }
        else if (this._dragCol) {
            this._addGroup(this._dragCol, e);
        }
    };
    GroupPanel.prototype._dragEnd = function (e) {
        this._dragMarker = this._dragCol = null;
    };
    GroupPanel.prototype._click = function (e) {
        var element = document.elementFromPoint(e.clientX, e.clientY);
        var remove = element.getAttribute('wj-remove') != null;
        var marker = element;
        while (marker.parentElement && !wjcCore.hasClass(marker, 'wj-cell')) {
            marker = marker.parentElement;
        }
        if (wjcCore.hasClass(marker, 'wj-cell')) {
            var index = this._getElementIndex(marker), cv = this._g.collectionView, sds = cv.sortDescriptions;
            if (remove) {
                this._removeGroup(index);
            }
            else if (e.ctrlKey) {
                sds.clear();
                this.invalidate();
            }
            else {
                var gd = this._gds[index], asc = true;
                for (var i = 0; i < sds.length; i++) {
                    if (sds[i].property == gd.propertyName) {
                        asc = !sds[i].ascending;
                        break;
                    }
                }
                var sd = new wjcCore.SortDescription(gd.propertyName, asc);
                sds.splice(0, sds.length, sd);
                this.invalidate();
            }
        }
    };
    GroupPanel.controlTemplate = '<div style="cursor:default;overflow:hidden;height:100%;width:100%;min-height:1em">' +
        '<div wj-part="div-ph"></div>' +
        '<div wj-part="div-markers"></div>' +
        '</div>';
    return GroupPanel;
}(wjcCore.Control));
exports.GroupPanel = GroupPanel;
//# sourceMappingURL=wijmo.grid.grouppanel.js.map