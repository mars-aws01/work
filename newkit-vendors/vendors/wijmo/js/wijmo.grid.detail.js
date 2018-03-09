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
var wjcGrid = require("wijmo/wijmo.grid");
var wjcCore = require("wijmo/wijmo");
var wjcSelf = require("wijmo/wijmo.grid.detail");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['grid'] = window['wijmo']['grid'] || {};
window['wijmo']['grid']['detail'] = wjcSelf;
'use strict';
var DetailVisibilityMode;
(function (DetailVisibilityMode) {
    DetailVisibilityMode[DetailVisibilityMode["Code"] = 0] = "Code";
    DetailVisibilityMode[DetailVisibilityMode["Selection"] = 1] = "Selection";
    DetailVisibilityMode[DetailVisibilityMode["ExpandSingle"] = 2] = "ExpandSingle";
    DetailVisibilityMode[DetailVisibilityMode["ExpandMulti"] = 3] = "ExpandMulti";
})(DetailVisibilityMode = exports.DetailVisibilityMode || (exports.DetailVisibilityMode = {}));
var FlexGridDetailProvider = (function () {
    function FlexGridDetailProvider(grid, options) {
        var _this = this;
        this._mode = DetailVisibilityMode.ExpandSingle;
        this._animated = false;
        this._g = grid;
        grid.mergeManager = new DetailMergeManager(grid);
        grid.rowHeaders.hostElement.addEventListener('click', this._hdrClick.bind(this));
        grid.formatItem.addHandler(this._formatItem, this);
        grid.selectionChanged.addHandler(this._selectionChanged, this);
        grid.resizedRow.addHandler(this._resizedRow, this);
        grid.loadingRows.addHandler(function () {
            _this.hideDetail();
        });
        grid.draggingRow.addHandler(function (s, e) {
            if (e.row < s.rows.length - 1 && s.rows[e.row + 1] instanceof DetailRow) {
                e.cancel = true;
                _this.hideDetail(e.row);
            }
        });
        grid.formatItem.addHandler(function (s, e) {
            if (e.panel == s.cells) {
                var row = s.rows[e.row];
                if (row instanceof DetailRow) {
                    e.cell.style.left = '0';
                }
            }
        });
        if (options) {
            wjcCore.copy(this, options);
        }
    }
    Object.defineProperty(FlexGridDetailProvider.prototype, "grid", {
        get: function () {
            return this._g;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGridDetailProvider.prototype, "detailVisibilityMode", {
        get: function () {
            return this._mode;
        },
        set: function (value) {
            if (value != this._mode) {
                this._mode = wjcCore.asEnum(value, DetailVisibilityMode);
                this.hideDetail();
                this._g.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGridDetailProvider.prototype, "maxHeight", {
        get: function () {
            return this._maxHeight;
        },
        set: function (value) {
            this._maxHeight = wjcCore.asNumber(value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGridDetailProvider.prototype, "isAnimated", {
        get: function () {
            return this._animated;
        },
        set: function (value) {
            if (value != this._animated) {
                this._animated = wjcCore.asBoolean(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGridDetailProvider.prototype, "createDetailCell", {
        get: function () {
            return this._createDetailCellFn;
        },
        set: function (value) {
            this._createDetailCellFn = wjcCore.asFunction(value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGridDetailProvider.prototype, "disposeDetailCell", {
        get: function () {
            return this._disposeDetailCellFn;
        },
        set: function (value) {
            this._disposeDetailCellFn = wjcCore.asFunction(value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGridDetailProvider.prototype, "rowHasDetail", {
        get: function () {
            return this._rowHasDetailFn;
        },
        set: function (value) {
            this._rowHasDetailFn = wjcCore.asFunction(value, true);
        },
        enumerable: true,
        configurable: true
    });
    FlexGridDetailProvider.prototype.getDetailRow = function (row) {
        var rows = this._g.rows;
        row = this._toIndex(row);
        if (rows[row] instanceof DetailRow) {
            return rows[row];
        }
        if (row < rows.length - 1 && rows[row + 1] instanceof DetailRow) {
            return rows[row + 1];
        }
        return null;
    };
    FlexGridDetailProvider.prototype.isDetailVisible = function (row) {
        return this.getDetailRow(row) != null;
    };
    FlexGridDetailProvider.prototype.isDetailAvailable = function (row) {
        var rows = this._g.rows;
        row = this._toIndex(row);
        return this._hasDetail(row);
    };
    FlexGridDetailProvider.prototype.hideDetail = function (row) {
        var rows = this._g.rows;
        if (row == null) {
            for (var r = 0; r < rows.length; r++) {
                if (rows[r] instanceof DetailRow) {
                    this.hideDetail(r);
                }
            }
            return;
        }
        row = this._toIndex(row);
        if (!(rows[row] instanceof DetailRow) &&
            row < rows.length - 1 &&
            rows[row + 1] instanceof DetailRow) {
            row++;
        }
        var detailRow = rows[row];
        if (detailRow instanceof DetailRow) {
            if (this.disposeDetailCell) {
                this.disposeDetailCell(detailRow);
            }
            wjcCore.Control.disposeAll(detailRow.detail);
            rows.removeAt(row);
        }
    };
    FlexGridDetailProvider.prototype.showDetail = function (row, hideOthers) {
        if (hideOthers === void 0) { hideOthers = false; }
        var g = this._g, rows = g.rows;
        row = this._toIndex(row);
        if (row > 0 && rows[row] instanceof DetailRow) {
            row--;
        }
        if (hideOthers) {
            var sel = g.selection, updateSelection = false;
            for (var r = 0; r < rows.length - 1; r++) {
                if (r != row && rows[r + 1] instanceof DetailRow) {
                    this.hideDetail(r);
                    if (r < row) {
                        row--;
                    }
                    if (r < sel.row) {
                        sel.row--;
                        sel.row2--;
                        updateSelection = true;
                    }
                }
            }
            if (updateSelection) {
                g.select(sel, false);
            }
        }
        if (!this.isDetailVisible(row) && this._hasDetail(row)) {
            var detailRow = new DetailRow(rows[row]);
            detailRow.detail = this._createDetailCell(rows[row]);
            if (detailRow.detail) {
                if (!this._animated) {
                    rows.insert(row + 1, detailRow);
                    g.scrollIntoView(row, -1);
                }
                else {
                    var style = detailRow.detail.style;
                    style.transform = 'translateY(-100%)';
                    style.opacity = '0';
                    rows.insert(row + 1, detailRow);
                    wjcCore.animate(function (pct) {
                        if (pct < 1) {
                            style.transform = 'translateY(' + (-(1 - pct) * 100).toFixed(0) + '%)';
                            style.opacity = (pct * pct).toString();
                        }
                        else {
                            style.transform = '';
                            style.opacity = '';
                            wjcCore.Control.invalidateAll(detailRow.detail);
                            g.scrollIntoView(row, -1);
                        }
                    });
                }
            }
        }
    };
    FlexGridDetailProvider.prototype._toIndex = function (row) {
        if (row instanceof wjcGrid.Row) {
            row = row.index;
        }
        return wjcCore.asNumber(row, false, true);
    };
    FlexGridDetailProvider.prototype._hdrClick = function (e) {
        if (!e.defaultPrevented) {
            switch (this._mode) {
                case DetailVisibilityMode.ExpandMulti:
                case DetailVisibilityMode.ExpandSingle:
                    var g = this._g, ht = g.hitTest(e);
                    if (ht.row > -1) {
                        var row = g.rows[ht.row];
                        if (this.isDetailVisible(ht.row)) {
                            this.hideDetail(ht.row);
                        }
                        else {
                            g.select(new wjcGrid.CellRange(ht.row, 0, ht.row, g.columns.length - 1));
                            this.showDetail(ht.row, this._mode == DetailVisibilityMode.ExpandSingle);
                        }
                        e.preventDefault();
                    }
                    break;
            }
        }
    };
    FlexGridDetailProvider.prototype._selectionChanged = function (s, e) {
        var _this = this;
        if (this._mode == DetailVisibilityMode.Selection) {
            if (this._toSel) {
                clearTimeout(this._toSel);
            }
            this._toSel = setTimeout(function () {
                if (s.selection.row > -1) {
                    _this.showDetail(s.selection.row, true);
                }
                else {
                    _this.hideDetail();
                }
            }, 300);
        }
    };
    FlexGridDetailProvider.prototype._formatItem = function (s, e) {
        var g = this._g, row = e.panel.rows[e.row];
        if (e.panel == g.cells && row instanceof DetailRow && row.detail != null) {
            wjcCore.addClass(e.cell, 'wj-detail');
            e.cell.textContent = '';
            e.cell.style.textAlign = '';
            e.cell.appendChild(row.detail);
            if (row.height == null) {
                wjcCore.Control.refreshAll(e.cell);
                var cs = getComputedStyle(e.cell), h = row.detail.scrollHeight + parseInt(cs.paddingTop) + parseInt(cs.paddingBottom);
                if (this._maxHeight > 0 && h > this._maxHeight) {
                    h = this._maxHeight;
                }
                row.height = h;
                if (!row.detail.style.height) {
                    row.detail.style.height = '100%';
                }
                var gridHost = row.detail.querySelector('.wj-flexgrid');
                if (gridHost && !gridHost.style.height) {
                    gridHost.style.height = '100%';
                }
            }
            else {
                setTimeout(function () {
                    wjcCore.Control.refreshAll(row.detail);
                });
            }
        }
        if (this._mode == DetailVisibilityMode.ExpandMulti ||
            this._mode == DetailVisibilityMode.ExpandSingle) {
            if (e.panel == g.rowHeaders && e.col == 0 && this._hasDetail(e.row)) {
                var minus = e.row < g.rows.length - 1 && g.rows[e.row + 1] instanceof DetailRow;
                e.cell.innerHTML = minus
                    ? '<span class="wj-glyph-minus"></span>'
                    : '<span class="wj-glyph-plus"></span>';
            }
        }
    };
    FlexGridDetailProvider.prototype._resizedRow = function (s, e) {
        var row = e.panel.rows[e.row];
        if (row instanceof DetailRow && row.detail) {
            wjcCore.Control.refreshAll(row.detail);
        }
    };
    FlexGridDetailProvider.prototype._hasVisibleDetail = function (row) {
        return row instanceof DetailRow || row instanceof wjcGrid.GroupRow || row instanceof wjcGrid._NewRowTemplate
            ? false
            : true;
    };
    FlexGridDetailProvider.prototype._hasDetail = function (row) {
        return wjcCore.isFunction(this._rowHasDetailFn)
            ? this._rowHasDetailFn(this._g.rows[row])
            : true;
    };
    FlexGridDetailProvider.prototype._createDetailCell = function (row, col) {
        return this.createDetailCell
            ? this.createDetailCell(row, col)
            : null;
    };
    return FlexGridDetailProvider;
}());
exports.FlexGridDetailProvider = FlexGridDetailProvider;
'use strict';
var DetailMergeManager = (function (_super) {
    __extends(DetailMergeManager, _super);
    function DetailMergeManager(grid) {
        return _super.call(this, grid) || this;
    }
    DetailMergeManager.prototype.getMergedRange = function (p, r, c, clip) {
        if (clip === void 0) { clip = true; }
        switch (p.cellType) {
            case wjcGrid.CellType.Cell:
                if (p.rows[r] instanceof DetailRow) {
                    return new wjcGrid.CellRange(r, 0, r, p.columns.length - 1);
                }
                break;
            case wjcGrid.CellType.RowHeader:
                if (p.rows[r] instanceof DetailRow) {
                    return new wjcGrid.CellRange(r - 1, c, r, c);
                }
                else if (r < p.rows.length - 1 && p.rows[r + 1] instanceof DetailRow) {
                    return new wjcGrid.CellRange(r, c, r + 1, c);
                }
                break;
        }
        return _super.prototype.getMergedRange.call(this, p, r, c, clip);
    };
    return DetailMergeManager;
}(wjcGrid.MergeManager));
exports.DetailMergeManager = DetailMergeManager;
'use strict';
var DetailRow = (function (_super) {
    __extends(DetailRow, _super);
    function DetailRow(parentRow) {
        var _this = _super.call(this) || this;
        _this.isReadOnly = true;
        return _this;
    }
    Object.defineProperty(DetailRow.prototype, "detail", {
        get: function () {
            return this._detail;
        },
        set: function (value) {
            this._detail = value;
        },
        enumerable: true,
        configurable: true
    });
    return DetailRow;
}(wjcGrid.Row));
exports.DetailRow = DetailRow;
//# sourceMappingURL=wijmo.grid.detail.js.map