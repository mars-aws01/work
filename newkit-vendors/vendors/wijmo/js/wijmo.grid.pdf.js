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
var wjcPdf = require("wijmo/wijmo.pdf");
var wjcGrid = require("wijmo/wijmo.grid");
var wjcCore = require("wijmo/wijmo");
function tryGetModuleWijmoGridMultirow() {
    var m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['grid']) && m2['multirow'];
}
function tryGetModuleWijmoGridSheet() {
    var m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['grid']) && m2['sheet'];
}
function tryGetModuleWijmoOlap() {
    var m1;
    return (m1 = window['wijmo']) && m1['olap'];
}
var wjcSelf = require("wijmo/wijmo.grid.pdf");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['grid'] = window['wijmo']['grid'] || {};
window['wijmo']['grid']['pdf'] = wjcSelf;
'use strict';
var ScaleMode;
(function (ScaleMode) {
    ScaleMode[ScaleMode["ActualSize"] = 0] = "ActualSize";
    ScaleMode[ScaleMode["PageWidth"] = 1] = "PageWidth";
    ScaleMode[ScaleMode["SinglePage"] = 2] = "SinglePage";
})(ScaleMode = exports.ScaleMode || (exports.ScaleMode = {}));
var ExportMode;
(function (ExportMode) {
    ExportMode[ExportMode["All"] = 0] = "All";
    ExportMode[ExportMode["Selection"] = 1] = "Selection";
})(ExportMode = exports.ExportMode || (exports.ExportMode = {}));
var PdfFormatItemEventArgs = (function (_super) {
    __extends(PdfFormatItemEventArgs, _super);
    function PdfFormatItemEventArgs(p, rng, cell, canvas, clientRect, contentRect, textTop, style, getFormattedCell) {
        var _this = _super.call(this, p, rng) || this;
        _this.cancelBorders = false;
        _this._cell = wjcCore.asType(cell, HTMLElement, true);
        _this._canvas = canvas;
        _this._clientRect = clientRect;
        _this._contentRect = contentRect;
        _this._textTop = textTop;
        _this._style = style;
        _this._getFormattedCell = getFormattedCell;
        return _this;
    }
    Object.defineProperty(PdfFormatItemEventArgs.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfFormatItemEventArgs.prototype, "cell", {
        get: function () {
            return this._cell;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfFormatItemEventArgs.prototype, "clientRect", {
        get: function () {
            return this._clientRect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfFormatItemEventArgs.prototype, "contentRect", {
        get: function () {
            return this._contentRect;
        },
        enumerable: true,
        configurable: true
    });
    PdfFormatItemEventArgs.prototype.getFormattedCell = function () {
        return wjcCore.asFunction(this._getFormattedCell)();
    };
    Object.defineProperty(PdfFormatItemEventArgs.prototype, "style", {
        get: function () {
            return this._style;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfFormatItemEventArgs.prototype, "textTop", {
        get: function () {
            return this._textTop;
        },
        enumerable: true,
        configurable: true
    });
    return PdfFormatItemEventArgs;
}(wjcGrid.CellRangeEventArgs));
exports.PdfFormatItemEventArgs = PdfFormatItemEventArgs;
function _merge(dst, src, overwrite) {
    if (overwrite === void 0) { overwrite = false; }
    if (src && dst) {
        for (var key in src) {
            var srcProp = src[key], dstProp = dst[key];
            if (!wjcCore.isObject(srcProp)) {
                if (dstProp === undefined || (overwrite && srcProp !== undefined)) {
                    dst[key] = srcProp;
                }
            }
            else {
                if (dstProp === undefined || !wjcCore.isObject(dstProp) && overwrite) {
                    if (wjcCore.isFunction(srcProp.clone)) {
                        dst[key] = dstProp = srcProp.clone();
                        continue;
                    }
                    else {
                        dst[key] = dstProp = {};
                    }
                }
                if (wjcCore.isObject(dstProp)) {
                    _merge(dst[key], srcProp, overwrite);
                }
            }
        }
    }
    return dst;
}
var globCell;
var FlexGridPdfConverter = (function () {
    function FlexGridPdfConverter() {
    }
    FlexGridPdfConverter.draw = function (flex, doc, width, height, settings) {
        wjcCore.assert(!!flex, 'The flex argument cannot be null.');
        wjcCore.assert(!!doc, 'The doc argument cannot be null.');
        var options = _merge({}, settings);
        _merge(options, this.DefaultDrawSettings);
        if (width == null) {
            options.scaleMode = ScaleMode.ActualSize;
        }
        else {
            options.scaleMode = height == null ? ScaleMode.PageWidth : ScaleMode.SinglePage;
        }
        try {
            if (options.recalculateStarWidths) {
                flex.columns._updateStarSizes(wjcPdf.ptToPx(doc.width));
            }
            this._draw(flex, doc, null, width, height, options);
        }
        finally {
            if (options.recalculateStarWidths) {
                flex.invalidate(true);
            }
        }
    };
    FlexGridPdfConverter.drawToPosition = function (flex, doc, point, width, height, settings) {
        wjcCore.assert(!!flex, 'The flex argument cannot be null.');
        wjcCore.assert(!!doc, 'The doc argument cannot be null.');
        wjcCore.assert(!!point, 'The point argument cannot be null.');
        var options = _merge({}, settings);
        _merge(options, this.DefaultDrawSettings);
        if (width == null) {
            options.scaleMode = ScaleMode.ActualSize;
        }
        else {
            options.scaleMode = height == null ? ScaleMode.PageWidth : ScaleMode.SinglePage;
        }
        try {
            if (options.recalculateStarWidths) {
                flex.columns._updateStarSizes(wjcPdf.ptToPx(doc.width));
            }
            this._draw(flex, doc, point, width, height, options);
        }
        finally {
            if (options.recalculateStarWidths) {
                flex.invalidate(true);
            }
        }
    };
    FlexGridPdfConverter.export = function (flex, fileName, settings) {
        wjcCore.assert(!!flex, 'The flex argument cannot be null.');
        wjcCore.assert(!!fileName, 'The fileName argument cannot be empty.');
        settings = _merge({}, settings);
        _merge(settings, this.DefaultExportSettings);
        var originalEnded = settings.documentOptions.ended;
        settings.documentOptions.ended = function (sender, args) {
            if (!originalEnded || (originalEnded.apply(doc, [sender, args]) !== false)) {
                wjcPdf.saveBlob(args.blob, fileName);
            }
        };
        var doc = new wjcPdf.PdfDocument(settings.documentOptions);
        try {
            if (settings.recalculateStarWidths) {
                flex.columns._updateStarSizes(wjcPdf.ptToPx(doc.width));
            }
            this._draw(flex, doc, null, null, null, settings);
            doc.end();
        }
        finally {
            if (settings.recalculateStarWidths) {
                flex.invalidate(true);
            }
        }
    };
    FlexGridPdfConverter._draw = function (flex, doc, point, width, height, settings) {
        var isPositionedMode = point != null, clSize = new wjcCore.Size(doc.width, doc.height);
        if (!point) {
            point = new wjcCore.Point(0, doc.y);
        }
        if (wjcCore.isArray(settings.embeddedFonts)) {
            settings.embeddedFonts.forEach(function (font) {
                doc.registerFont(font);
            });
        }
        var range = RowRange.getSelection(flex, settings.exportMode), gr = this._getGridRenderer(flex, settings, range, this.BorderWidth, true), rect = new wjcCore.Rect(point.x || 0, point.y || 0, width || clSize.width, height || clSize.height), scaleFactor = this._getScaleFactor(gr, settings.scaleMode, rect), pages = this._getPages(gr, range, rect, settings, isPositionedMode, scaleFactor);
        globCell = document.createElement('div');
        globCell.setAttribute(wjcGrid.FlexGrid._WJS_MEASURE, 'true');
        globCell.style.visibility = 'hidden';
        flex.hostElement.appendChild(globCell);
        try {
            for (var i = 0; i < pages.length; i++) {
                if (i > 0) {
                    doc.addPage();
                }
                var page = pages[i], x = page.pageCol === 0 ? rect.left : 0, y = page.pageRow === 0 ? rect.top : 0;
                doc.saveState();
                doc.paths.rect(0, 0, clSize.width, clSize.height).clip();
                doc.scale(scaleFactor, scaleFactor, new wjcCore.Point(x, y));
                doc.translate(x, y);
                var gridPage = this._getGridRenderer(flex, settings, page.range, this.BorderWidth, i === pages.length - 1);
                gridPage.render(doc);
                doc.restoreState();
                doc.x = x;
                doc.y = y + gridPage.renderSize.height * scaleFactor;
            }
        }
        finally {
            if (globCell) {
                wjcCore.removeChild(globCell);
                globCell = null;
            }
        }
    };
    FlexGridPdfConverter._getScaleFactor = function (gr, scaleMode, rect) {
        var factor = 1;
        if (scaleMode === ScaleMode.ActualSize) {
            return factor;
        }
        var size = gr.renderSize;
        if (scaleMode === ScaleMode.SinglePage) {
            var f = Math.min(rect.width / size.width, rect.height / size.height);
            if (f < 1) {
                factor = f;
            }
        }
        else {
            var f = rect.width / size.width;
            if (f < 1) {
                factor = f;
            }
        }
        return factor;
    };
    FlexGridPdfConverter._getPages = function (gr, ranges, rect, settings, isPositionedMode, scaleFactor) {
        var _this = this;
        var rowBreaks = [], colBreaks = [], p2u = wjcPdf.pxToPt, flex = gr.flex, showColumnHeader = gr.showColumnHeader, showRowHeader = gr.showRowHeader, colHeaderHeight = showColumnHeader ? p2u(flex.columnHeaders.height) : 0, rowHeaderWidth = showRowHeader ? p2u(flex.rowHeaders.width) : 0, breakRows = settings.scaleMode === ScaleMode.ActualSize || settings.scaleMode === ScaleMode.PageWidth, breakColumns = settings.scaleMode === ScaleMode.ActualSize, zeroColWidth = (rect.width - rect.left) * (1 / scaleFactor), zeroRowHeight = (rect.height - rect.top) * (1 / scaleFactor), rectWidth = rect.width * (1 / scaleFactor), rectHeight = rect.height * (1 / scaleFactor), totalHeight = colHeaderHeight, totalWidth = rowHeaderWidth, dontBreakBeforePartiallyVisibleElements = isPositionedMode && (settings.scaleMode == ScaleMode.ActualSize);
        if (breakRows) {
            var visibleRowsCnt = 0;
            ranges.forEach(flex.cells, function (row, rng, rIdx, sIdx) {
                var renderAreaHeight = rowBreaks.length ? rectHeight : zeroRowHeight;
                if (PanelSection.isRenderableRow(row)) {
                    var rowHeight = p2u(row.renderHeight);
                    visibleRowsCnt++;
                    totalHeight += rowHeight;
                    if (showColumnHeader || visibleRowsCnt > 1) {
                        totalHeight -= _this.BorderWidth;
                    }
                    if (totalHeight > renderAreaHeight) {
                        if (colHeaderHeight + rowHeight > renderAreaHeight || dontBreakBeforePartiallyVisibleElements) {
                            rowBreaks.push(sIdx);
                            totalHeight = colHeaderHeight;
                        }
                        else {
                            rowBreaks.push(sIdx - 1);
                            totalHeight = colHeaderHeight + rowHeight;
                        }
                        if (showColumnHeader) {
                            totalHeight -= _this.BorderWidth;
                        }
                    }
                }
            });
        }
        var len = ranges.length() - 1;
        if (len < 0) {
            len = 0;
        }
        if (!rowBreaks.length || (rowBreaks[rowBreaks.length - 1] !== len)) {
            rowBreaks.push(len);
        }
        if (breakColumns) {
            var visibleColumnsCnt = 0;
            for (var i = ranges.leftCol; i <= ranges.rightCol; i++) {
                var col = flex.columns[i];
                if (col.isVisible) {
                    var colWidth = p2u(col.renderWidth), renderAreaWidth = colBreaks.length ? rectWidth : zeroColWidth;
                    visibleColumnsCnt++;
                    totalWidth += colWidth;
                    if (showRowHeader || visibleColumnsCnt > 1) {
                        totalWidth -= this.BorderWidth;
                    }
                    if (totalWidth > renderAreaWidth) {
                        if (rowHeaderWidth + colWidth > renderAreaWidth || dontBreakBeforePartiallyVisibleElements) {
                            colBreaks.push(i);
                            totalWidth = rowHeaderWidth;
                        }
                        else {
                            colBreaks.push(i - 1);
                            totalWidth = rowHeaderWidth + colWidth;
                        }
                        if (showRowHeader) {
                            totalWidth -= this.BorderWidth;
                        }
                    }
                }
            }
        }
        if (!colBreaks.length || (colBreaks[colBreaks.length - 1] !== ranges.rightCol)) {
            colBreaks.push(ranges.rightCol);
        }
        var pages = [], flag = false, pageCount = 1, maxPages = isPositionedMode && (settings.maxPages > 0) ? 1 : settings.maxPages;
        for (var i = 0; i < rowBreaks.length && !flag; i++) {
            for (var j = 0; j < colBreaks.length && !flag; j++, pageCount++) {
                if (!(flag = pageCount > maxPages)) {
                    var r = i == 0 ? 0 : rowBreaks[i - 1] + 1, c = j == 0 ? ranges.leftCol : colBreaks[j - 1] + 1;
                    pages.push(new PdfPageRowRange(ranges.subrange(r, rowBreaks[i] - r + 1, c, colBreaks[j]), j, i));
                }
            }
        }
        return pages;
    };
    FlexGridPdfConverter._getGridRenderer = function (flex, settings, range, borderWidth, lastPage) {
        var t = (((tryGetModuleWijmoGridMultirow()) && (flex instanceof (tryGetModuleWijmoGridMultirow()).MultiRow) && MultiRowRenderer) ||
            ((tryGetModuleWijmoGridSheet()) && (flex instanceof (tryGetModuleWijmoGridSheet()).FlexSheet) && FlexSheetRenderer) ||
            ((tryGetModuleWijmoOlap()) && (flex instanceof (tryGetModuleWijmoOlap()).PivotGrid) && PivotGridRenderer) ||
            FlexGridRenderer);
        return new t(flex, settings, range, borderWidth, lastPage);
    };
    FlexGridPdfConverter.BorderWidth = 1;
    FlexGridPdfConverter.DefaultDrawSettings = {
        maxPages: Number.MAX_VALUE,
        exportMode: ExportMode.All,
        repeatMergedValuesAcrossPages: true,
        recalculateStarWidths: true,
        styles: {
            cellStyle: {
                font: new wjcPdf.PdfFont(),
                padding: 1.5,
                verticalAlign: 'middle'
            },
            headerCellStyle: {
                font: { weight: 'bold' }
            }
        }
    };
    FlexGridPdfConverter.DefaultExportSettings = _merge({
        scaleMode: ScaleMode.PageWidth,
        documentOptions: {
            compress: false,
            pageSettings: {
                margins: {
                    left: 36,
                    right: 36,
                    top: 18,
                    bottom: 18
                }
            }
        }
    }, FlexGridPdfConverter.DefaultDrawSettings);
    return FlexGridPdfConverter;
}());
exports.FlexGridPdfConverter = FlexGridPdfConverter;
var FlexGridRenderer = (function () {
    function FlexGridRenderer(flex, settings, range, borderWidth, lastPage) {
        this._flex = flex;
        this._borderWidth = borderWidth;
        this._lastPage = lastPage;
        this._settings = settings || {};
        this._topLeft = new PanelSectionRenderer(this, flex.topLeftCells, this.showRowHeader && this.showColumnHeader
            ? new RowRange(flex, [new wjcGrid.CellRange(0, 0, flex.topLeftCells.rows.length - 1, flex.topLeftCells.columns.length - 1)])
            : new RowRange(flex, []), borderWidth);
        this._rowHeader = new PanelSectionRenderer(this, flex.rowHeaders, this.showRowHeader
            ? range.clone(0, flex.rowHeaders.columns.length - 1)
            : new RowRange(flex, []), borderWidth);
        this._columnHeader = new PanelSectionRenderer(this, flex.columnHeaders, this.showColumnHeader
            ? new RowRange(flex, [new wjcGrid.CellRange(0, range.leftCol, flex.columnHeaders.rows.length - 1, range.rightCol)])
            : new RowRange(flex, []), borderWidth);
        this._cells = new PanelSectionRenderer(this, flex.cells, range, borderWidth);
        this._bottomLeft = new PanelSectionRenderer(this, flex.bottomLeftCells, this.showRowHeader && this.showColumnFooter
            ? new RowRange(flex, [new wjcGrid.CellRange(0, 0, flex.bottomLeftCells.rows.length - 1, flex.bottomLeftCells.columns.length - 1)])
            : new RowRange(flex, []), borderWidth);
        this._columnFooter = new PanelSectionRenderer(this, flex.columnFooters, this.showColumnFooter
            ? new RowRange(flex, [new wjcGrid.CellRange(0, range.leftCol, flex.columnFooters.rows.length - 1, range.rightCol)])
            : new RowRange(flex, []), borderWidth);
    }
    Object.defineProperty(FlexGridRenderer.prototype, "settings", {
        get: function () {
            return this._settings;
        },
        enumerable: true,
        configurable: true
    });
    FlexGridRenderer.prototype.render = function (doc) {
        var offsetX = Math.max(0, Math.max(this._topLeft.renderSize.width, this._rowHeader.renderSize.width) - this._borderWidth), offsetY = Math.max(0, Math.max(this._topLeft.renderSize.height, this._columnHeader.renderSize.height) - this._borderWidth);
        this._topLeft.render(doc, 0, 0);
        this._rowHeader.render(doc, 0, offsetY);
        this._columnHeader.render(doc, offsetX, 0);
        this._cells.render(doc, offsetX, offsetY);
        offsetY = Math.max(0, offsetY + this._cells.renderSize.height - this._borderWidth);
        this._bottomLeft.render(doc, 0, offsetY);
        this._columnFooter.render(doc, offsetX, offsetY);
    };
    Object.defineProperty(FlexGridRenderer.prototype, "flex", {
        get: function () {
            return this._flex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGridRenderer.prototype, "renderSize", {
        get: function () {
            var height = Math.max(this._topLeft.renderSize.height, this._columnHeader.renderSize.height)
                + Math.max(this._rowHeader.renderSize.height, this._cells.renderSize.height)
                + Math.max(this._bottomLeft.renderSize.height, this._columnFooter.renderSize.height), width = Math.max(this._topLeft.renderSize.width, this._rowHeader.renderSize.width)
                + Math.max(this._columnHeader.renderSize.width, this._cells.renderSize.width);
            if (this._columnHeader.visibleRows > 0) {
                height -= this._borderWidth;
            }
            if (this._columnFooter.visibleRows > 0) {
                height -= this._borderWidth;
            }
            if (this._rowHeader.visibleColumns > 0) {
                width -= this._borderWidth;
            }
            return new wjcCore.Size(width, height);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGridRenderer.prototype, "showColumnHeader", {
        get: function () {
            return !!(this._flex.headersVisibility & wjcGrid.HeadersVisibility.Column);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGridRenderer.prototype, "showRowHeader", {
        get: function () {
            return !!(this._flex.headersVisibility & wjcGrid.HeadersVisibility.Row);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGridRenderer.prototype, "showColumnFooter", {
        get: function () {
            return this._lastPage && this._flex.columnFooters.rows.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    FlexGridRenderer.prototype.alignMergedTextToTheTopRow = function (panel) {
        return false;
    };
    FlexGridRenderer.prototype.getCellValue = function (panel, col, row) {
        return panel.getCellData(row, col, true);
    };
    FlexGridRenderer.prototype.getColumn = function (panel, col, row) {
        return panel.columns[col];
    };
    FlexGridRenderer.prototype.isAlternatingRow = function (row) {
        return row.index % 2 != 0;
    };
    FlexGridRenderer.prototype.isGroupRow = function (row) {
        return row instanceof wjcGrid.GroupRow && row.hasChildren;
    };
    FlexGridRenderer.prototype.isMergeableCell = function (col, row) {
        return true;
    };
    FlexGridRenderer.prototype.getCellStyle = function (panel, row, column) {
        var styles = this.settings.styles, result = _merge({}, styles.cellStyle), grid = this._flex;
        switch (panel.cellType) {
            case wjcGrid.CellType.Cell:
                if (this.isGroupRow(row)) {
                    _merge(result, styles.groupCellStyle, true);
                }
                else {
                    if (this.isAlternatingRow(row)) {
                        _merge(result, styles.altCellStyle, true);
                    }
                }
                break;
            case wjcGrid.CellType.ColumnHeader:
            case wjcGrid.CellType.RowHeader:
            case wjcGrid.CellType.TopLeft:
            case wjcGrid.CellType.BottomLeft:
                _merge(result, styles.headerCellStyle, true);
                break;
            case wjcGrid.CellType.ColumnFooter:
                _merge(result, styles.headerCellStyle, true);
                _merge(result, styles.footerCellStyle, true);
                break;
        }
        if (!this.settings.customCellContent && grid._getShowErrors() && grid._getError(panel, row.index, column.index)) {
            _merge(result, styles.errorCellStyle, true);
        }
        return result;
    };
    return FlexGridRenderer;
}());
var FlexSheetRenderer = (function (_super) {
    __extends(FlexSheetRenderer, _super);
    function FlexSheetRenderer(flex, settings, range, borderWidth, lastPage) {
        return _super.call(this, flex, settings, range, borderWidth, lastPage) || this;
    }
    FlexSheetRenderer.prototype.getCellValue = function (panel, col, row) {
        if (panel.cellType === wjcGrid.CellType.Cell) {
            if (panel.rows[row] instanceof (tryGetModuleWijmoGridSheet()).HeaderRow) {
                return this.flex.columnHeaders.getCellData(row, col, true);
            }
            return this.flex.getCellValue(row, col, true);
        }
        return _super.prototype.getCellValue.call(this, panel, col, row);
    };
    FlexSheetRenderer.prototype.getCellStyle = function (panel, row, column) {
        var result = _super.prototype.getCellStyle.call(this, panel, row, column), table = this.flex.selectedSheet.findTable(row.index, column.index);
        if (table) {
            var ri = row.index - table.range.topRow, ci = column.index - table.range.leftCol, style = table._getTableCellAppliedStyles(ri, ci);
            if (style) {
                Object.keys(style).forEach(function (k) {
                    if (k.toLowerCase().indexOf('color') >= 0) {
                        style[k] = table._getStrColor(style[k]);
                    }
                });
                style.font = new wjcPdf.PdfFont(style.fontFamily, wjcPdf._asPt(style.fontSize, true, undefined), style.fontStyle, style.fontWeight);
            }
            _merge(result, style, true);
        }
        return result;
    };
    Object.defineProperty(FlexSheetRenderer.prototype, "showColumnHeader", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexSheetRenderer.prototype, "showRowHeader", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexSheetRenderer.prototype, "showColumnFooter", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return FlexSheetRenderer;
}(FlexGridRenderer));
var MultiRowRenderer = (function (_super) {
    __extends(MultiRowRenderer, _super);
    function MultiRowRenderer(multirow, settings, range, borderWidth, lastPage) {
        return _super.call(this, multirow, settings, range, borderWidth, lastPage) || this;
    }
    MultiRowRenderer.prototype.getColumn = function (panel, col, row) {
        return this.flex.getBindingColumn(panel, row, col);
    };
    MultiRowRenderer.prototype.isAlternatingRow = function (row) {
        if (row instanceof (tryGetModuleWijmoGridMultirow())._MultiRow) {
            return row.dataIndex % 2 != 0;
        }
        return _super.prototype.isAlternatingRow.call(this, row);
    };
    MultiRowRenderer.prototype.isMergeableCell = function (col, row) {
        return true;
    };
    return MultiRowRenderer;
}(FlexGridRenderer));
var PivotGridRenderer = (function (_super) {
    __extends(PivotGridRenderer, _super);
    function PivotGridRenderer(pivot, settings, range, borderWidth, lastPage) {
        return _super.call(this, pivot, settings, range, borderWidth, lastPage) || this;
    }
    PivotGridRenderer.prototype.alignMergedTextToTheTopRow = function (panel) {
        return !this.flex.centerHeadersVertically && (panel.cellType === wjcGrid.CellType.ColumnHeader || panel.cellType === wjcGrid.CellType.RowHeader);
    };
    return PivotGridRenderer;
}(FlexGridRenderer));
var PanelSection = (function () {
    function PanelSection(panel, range) {
        this._panel = panel;
        this._range = range.clone();
    }
    PanelSection.isRenderableRow = function (row) {
        return row.isVisible && !(row instanceof wjcGrid._NewRowTemplate);
    };
    Object.defineProperty(PanelSection.prototype, "visibleRows", {
        get: function () {
            var _this = this;
            if (this._visibleRows == null) {
                this._visibleRows = 0;
                this._range.forEach(this._panel, function (row) {
                    if (_this.isRenderableRow(row)) {
                        _this._visibleRows++;
                    }
                });
            }
            return this._visibleRows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelSection.prototype, "visibleColumns", {
        get: function () {
            if (this._visibleColumns == null) {
                this._visibleColumns = 0;
                if (this._range.isValid) {
                    for (var i = this._range.leftCol; i <= this._range.rightCol; i++) {
                        if (this._panel.columns[i].isVisible) {
                            this._visibleColumns++;
                        }
                    }
                }
            }
            return this._visibleColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelSection.prototype, "size", {
        get: function () {
            if (this._size == null) {
                var sz = this._range.getRenderSize(this._panel);
                this._size = new wjcCore.Size(wjcPdf.pxToPt(sz.width), wjcPdf.pxToPt(sz.height));
            }
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelSection.prototype, "range", {
        get: function () {
            return this._range;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelSection.prototype, "panel", {
        get: function () {
            return this._panel;
        },
        enumerable: true,
        configurable: true
    });
    PanelSection.prototype.isRenderableRow = function (row) {
        return PanelSection.isRenderableRow(row);
    };
    return PanelSection;
}());
var PanelSectionRenderer = (function (_super) {
    __extends(PanelSectionRenderer, _super);
    function PanelSectionRenderer(gr, panel, range, borderWidth) {
        var _this = _super.call(this, panel, range) || this;
        _this._gr = gr;
        _this._borderWidth = borderWidth;
        return _this;
    }
    Object.defineProperty(PanelSectionRenderer.prototype, "gr", {
        get: function () {
            return this._gr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelSectionRenderer.prototype, "renderSize", {
        get: function () {
            if (this._renderSize == null) {
                this._renderSize = this.size.clone();
                if (this.visibleColumns > 1) {
                    this._renderSize.width -= this._borderWidth * (this.visibleColumns - 1);
                }
                if (this.visibleRows > 1) {
                    this._renderSize.height -= this._borderWidth * (this.visibleRows - 1);
                }
            }
            return this._renderSize;
        },
        enumerable: true,
        configurable: true
    });
    PanelSectionRenderer.prototype.getRangeWidth = function (leftCol, rightCol) {
        var width = 0, visibleColumns = 0, pnl = this.panel;
        for (var i = leftCol; i <= rightCol; i++) {
            var col = pnl.columns[i];
            if (col.isVisible) {
                visibleColumns++;
                width += col.renderWidth;
            }
        }
        width = wjcPdf.pxToPt(width);
        if (visibleColumns > 1) {
            width -= this._borderWidth * (visibleColumns - 1);
        }
        return width;
    };
    PanelSectionRenderer.prototype.getRangeHeight = function (topRow, bottomRow) {
        var height = 0, visibleRows = 0, pnl = this.panel;
        for (var i = topRow; i <= bottomRow; i++) {
            var row = pnl.rows[i];
            if (this.isRenderableRow(row)) {
                visibleRows++;
                height += row.renderHeight;
            }
        }
        height = wjcPdf.pxToPt(height);
        if (visibleRows > 1) {
            height = height - this._borderWidth * (visibleRows - 1);
        }
        return height;
    };
    PanelSectionRenderer.prototype.render = function (doc, x, y) {
        var _this = this;
        var ranges = this.range, pnl = this.panel, mngr = new GetMergedRangeProxy(this._gr.flex), curCellRange = new CellRangeExt(pnl, 0, 0, 0, 0), cellRenderer = new CellRenderer(this, doc, this._borderWidth);
        if (!ranges.isValid) {
            return;
        }
        var pY = {};
        for (var c = ranges.leftCol; c <= ranges.rightCol; c++) {
            pY[c] = y;
        }
        ranges.forEach(pnl, function (row, rng, r) {
            if (!_this.isRenderableRow(row)) {
                return;
            }
            var pX = x;
            for (var c = ranges.leftCol; c <= ranges.rightCol; c++) {
                var col = _this.gr.getColumn(pnl, c, r), height = undefined, width = undefined, value, needRender = false, skipC = undefined;
                if (!col.isVisible) {
                    continue;
                }
                var cellValue = _this._getCellValue(c, r), mergedRng = null;
                if (_this.gr.isMergeableCell(col, row) && (mergedRng = mngr.getMergedRange(pnl, r, c))) {
                    curCellRange.copyFrom(mergedRng);
                    if (mergedRng.topRow !== mergedRng.bottomRow) {
                        if (mergedRng.firstVisibleRow === r || r === rng.topRow) {
                            needRender = true;
                            value = _this.gr.settings.repeatMergedValuesAcrossPages
                                ? cellValue
                                : (mergedRng.firstVisibleRow === r ? cellValue : '');
                            height = _this.getRangeHeight(r, Math.min(mergedRng.bottomRow, rng.bottomRow));
                            width = _this.getRangeWidth(c, c);
                        }
                        else {
                            width = _this.getRangeWidth(c, c);
                        }
                    }
                    else {
                        needRender = true;
                        value = _this.gr.settings.repeatMergedValuesAcrossPages
                            ? cellValue
                            : (c === mergedRng.leftCol ? cellValue : '');
                        height = _this.getRangeHeight(r, r);
                        width = _this.getRangeWidth(Math.max(ranges.leftCol, mergedRng.leftCol), Math.min(ranges.rightCol, mergedRng.rightCol));
                        skipC = Math.min(ranges.rightCol, mergedRng.rightCol);
                        for (var t = c + 1; t <= skipC; t++) {
                            pY[t] += height - _this._borderWidth;
                        }
                    }
                }
                else {
                    curCellRange.setRange(r, c, r, c);
                    needRender = true;
                    value = cellValue;
                    height = _this.getRangeHeight(r, r);
                    width = _this.getRangeWidth(c, c);
                }
                if (needRender) {
                    cellRenderer.renderCell(value, row, col, curCellRange, new wjcCore.Rect(pX, pY[c], width, height));
                }
                if (height) {
                    pY[c] += height - _this._borderWidth;
                }
                if (width) {
                    pX += width - _this._borderWidth;
                }
                if (skipC) {
                    c = skipC;
                }
            }
        });
    };
    PanelSectionRenderer.prototype._getCellValue = function (col, row) {
        var pnl = this.panel, value = this.gr.getCellValue(pnl, col, row);
        if (!value && pnl.cellType === wjcGrid.CellType.Cell) {
            var flexRow = pnl.rows[row];
            if (flexRow instanceof wjcGrid.GroupRow && flexRow.dataItem && flexRow.dataItem.groupDescription && (col === pnl.columns.firstVisibleIndex)) {
                var propName = flexRow.dataItem.groupDescription.propertyName, column = pnl.columns.getColumn(propName);
                if (column && column.header) {
                    propName = column.header;
                }
                value = propName + ': ' + flexRow.dataItem.name + ' (' + flexRow.dataItem.items.length + ' items)';
            }
        }
        return value;
    };
    return PanelSectionRenderer;
}(PanelSection));
var CellRenderer = (function () {
    function CellRenderer(panelRenderer, area, borderWidth) {
        this._pr = panelRenderer;
        this._area = area;
        this._borderWidth = borderWidth;
    }
    CellRenderer.prototype.renderCell = function (value, row, column, rng, r) {
        var formatEventArgs, grid = row.grid, panel = this._pr.panel, getGridCell = function () {
            var ri = rng.topRow, ci = rng.leftCol, cell = panel.getCellElement(ri, ci);
            if (!cell) {
                globCell.innerHTML = globCell.className = globCell.style.cssText = '';
                grid.cellFactory.updateCell(panel, ri, ci, globCell);
            }
            return cell || globCell;
        }, getComputedCellStyle = function (cell) {
            cell.className = cell.className.replace('wj-state-selected', '');
            cell.className = cell.className.replace('wj-state-multi-selected', '');
            return window.getComputedStyle(cell);
        }, customContent = !!this._pr.gr.settings.customCellContent, gridCell = null, style = this._pr.gr.getCellStyle(panel, row, column);
        if (customContent) {
            gridCell = getGridCell();
        }
        if (customContent) {
            value = gridCell.textContent.trim();
            if (!value && this._isBooleanCell(column, row, panel)) {
                value = this._extractCheckboxValue(gridCell) + '';
            }
        }
        if (customContent) {
            var css = getComputedCellStyle(gridCell);
            style.color = css.color;
            style.backgroundColor = css.backgroundColor;
            style.borderColor = css.borderColor || css.borderRightColor || css.borderBottomColor || css.borderLeftColor || css.borderTopColor;
            style.font = new wjcPdf.PdfFont(css.fontFamily, wjcPdf._asPt(css.fontSize, true, undefined), css.fontStyle, css.fontWeight);
            style.textAlign = css.textAlign;
        }
        style.boxSizing = 'border-box';
        style.borderWidth = this._borderWidth;
        style.borderStyle = 'solid';
        if (!style.textAlign && !(row instanceof wjcGrid.GroupRow && !column.aggregate)) {
            style.textAlign = column.getAlignment();
        }
        if (panel.cellType === wjcGrid.CellType.Cell && grid.rows.maxGroupLevel >= 0 && rng.leftCol === grid.columns.firstVisibleIndex) {
            var level = (row instanceof wjcGrid.GroupRow)
                ? Math.max(row.level, 0)
                : grid.rows.maxGroupLevel + 1;
            var basePadding = wjcPdf._asPt(style.paddingLeft || style.padding), levelPadding = wjcPdf.pxToPt(level * grid.treeIndent);
            style.paddingLeft = basePadding + levelPadding;
        }
        var m = this._measureCell(value, column, row, panel, style, r), alignToTopRow = (rng.rowSpan > 1) && (rng.visibleRowsCount > 1) && this._pr.gr.alignMergedTextToTheTopRow(panel), topRowContentRect;
        if (alignToTopRow) {
            topRowContentRect = new wjcCore.Rect(m.contentRect.left, m.contentRect.top, m.contentRect.width, m.contentRect.height / (rng.visibleRowsCount || 1));
            m.textRect = this._calculateTextRect(value, column, row, panel, topRowContentRect, style);
        }
        if (wjcCore.isFunction(this._pr.gr.settings.formatItem)) {
            formatEventArgs = new PdfFormatItemEventArgs(panel, rng, gridCell, this._area, m.rect, m.contentRect, m.textRect.top, style, function () { return gridCell || getGridCell(); });
            formatEventArgs.data = value;
            this._pr.gr.settings.formatItem(formatEventArgs);
            if (formatEventArgs.data !== value) {
                value = wjcCore.asString(formatEventArgs.data);
                m.textRect = this._calculateTextRect(value, column, row, panel, alignToTopRow ? topRowContentRect : m.contentRect, style);
            }
        }
        this._renderCell(value, row, column, rng, m, style, formatEventArgs ? !formatEventArgs.cancel : true, formatEventArgs ? !formatEventArgs.cancelBorders : true);
    };
    CellRenderer.prototype._renderCell = function (value, row, column, rng, m, style, renderContent, renderBorders) {
        if (!renderContent && !renderBorders) {
            return;
        }
        if (this._isBooleanCellAndValue(value, column, row, this._pr.panel)) {
            this._renderBooleanCell(value, m, style, renderContent, renderBorders);
        }
        else {
            this._renderTextCell(value, m, style, renderContent, renderBorders);
        }
    };
    CellRenderer.prototype._isBooleanCellAndValue = function (value, column, row, panel) {
        return this._isBooleanCell(column, row, panel) && this._isBoolean(value);
    };
    CellRenderer.prototype._isBooleanCell = function (column, row, panel) {
        return column.dataType === wjcCore.DataType.Boolean && panel.cellType === wjcGrid.CellType.Cell && !this._pr.gr.isGroupRow(row);
    };
    CellRenderer.prototype._isBoolean = function (value) {
        var lowerCase = wjcCore.isString(value) && value.toLowerCase();
        return lowerCase === 'true' || lowerCase === 'false' || value === true || value === false;
    };
    CellRenderer.prototype._measureCell = function (value, column, row, panel, style, rect) {
        this._decompositeStyle(style);
        var x = rect.left, y = rect.top, height = rect.height, width = rect.width, brd = this._parseBorder(style), blw = brd.left.width, btw = brd.top.width, bbw = brd.bottom.width, brw = brd.right.width, pad = this._parsePadding(style), clientHeight = 0, clientWidth = 0, contentHeight = 0, contentWidth = 0;
        if (style.boxSizing === 'content-box' || style.boxSizing === undefined) {
            clientHeight = pad.top + height + pad.bottom;
            clientWidth = pad.left + width + pad.right;
            contentHeight = height;
            contentWidth = width;
        }
        else {
            if (style.boxSizing === 'border-box') {
                if (wjcPdf._IE && (style instanceof CSSStyleDeclaration)) {
                    clientHeight = pad.top + pad.bottom + height;
                    clientWidth = pad.left + pad.right + width;
                }
                else {
                    clientHeight = height - btw - bbw;
                    clientWidth = width - blw - brw;
                }
            }
            else {
                throw 'Invalid value: ' + style.boxSizing;
            }
            contentHeight = clientHeight - pad.top - pad.bottom;
            contentWidth = clientWidth - pad.left - pad.right;
        }
        var rect = new wjcCore.Rect(x, y, width, height), clientRect = new wjcCore.Rect(x + blw, y + btw, clientWidth, clientHeight), contentRect = new wjcCore.Rect(x + blw + pad.left, y + btw + pad.top, contentWidth, contentHeight), textRect = this._calculateTextRect(value, column, row, panel, contentRect, style);
        return {
            rect: rect,
            clientRect: clientRect,
            contentRect: contentRect,
            textRect: textRect
        };
    };
    CellRenderer.prototype._decompositeStyle = function (style) {
        if (style) {
            var val;
            if (val = style.borderColor) {
                if (!style.borderLeftColor) {
                    style.borderLeftColor = val;
                }
                if (!style.borderRightColor) {
                    style.borderRightColor = val;
                }
                if (!style.borderTopColor) {
                    style.borderTopColor = val;
                }
                if (!style.borderBottomColor) {
                    style.borderBottomColor = val;
                }
            }
            if (val = style.borderWidth) {
                if (!style.borderLeftWidth) {
                    style.borderLeftWidth = val;
                }
                if (!style.borderRightWidth) {
                    style.borderRightWidth = val;
                }
                if (!style.borderTopWidth) {
                    style.borderTopWidth = val;
                }
                if (!style.borderBottomWidth) {
                    style.borderBottomWidth = val;
                }
            }
            if (val = style.borderStyle) {
                if (!style.borderLeftStyle) {
                    style.borderLeftStyle = val;
                }
                if (!style.borderRightStyle) {
                    style.borderRightStyle = val;
                }
                if (!style.borderTopStyle) {
                    style.borderTopStyle = val;
                }
                if (!style.borderBottomStyle) {
                    style.borderBottomStyle = val;
                }
            }
            if (val = style.padding) {
                if (!style.paddingLeft) {
                    style.paddingLeft = val;
                }
                if (!style.paddingRight) {
                    style.paddingRight = val;
                }
                if (!style.paddingTop) {
                    style.paddingTop = val;
                }
                if (!style.paddingBottom) {
                    style.paddingBottom = val;
                }
            }
        }
    };
    CellRenderer.prototype._parseBorder = function (style) {
        var borders = {
            left: { width: 0 },
            top: { width: 0 },
            bottom: { width: 0 },
            right: { width: 0 }
        };
        if (style.borderLeftStyle !== 'none') {
            borders.left = {
                width: wjcPdf._asPt(style.borderLeftWidth),
                style: style.borderLeftStyle,
                color: style.borderLeftColor
            };
        }
        if (style.borderTopStyle !== 'none') {
            borders.top = {
                width: wjcPdf._asPt(style.borderTopWidth),
                style: style.borderTopStyle,
                color: style.borderTopColor
            };
        }
        if (style.borderBottomStyle !== 'none') {
            borders.bottom = {
                width: wjcPdf._asPt(style.borderBottomWidth),
                style: style.borderBottomStyle,
                color: style.borderBottomColor
            };
        }
        if (style.borderRightStyle !== 'none') {
            borders.right = {
                width: wjcPdf._asPt(style.borderRightWidth),
                style: style.borderRightStyle,
                color: style.borderRightColor
            };
        }
        return borders;
    };
    CellRenderer.prototype._parsePadding = function (style) {
        return {
            left: wjcPdf._asPt(style.paddingLeft),
            top: wjcPdf._asPt(style.paddingTop),
            bottom: wjcPdf._asPt(style.paddingBottom),
            right: wjcPdf._asPt(style.paddingRight)
        };
    };
    CellRenderer.prototype._renderEmptyCell = function (m, style, renderContent, renderBorders) {
        var x = m.rect.left, y = m.rect.top, clientWidth = m.clientRect.width, clientHeight = m.clientRect.height, blw = m.clientRect.left - m.rect.left, btw = m.clientRect.top - m.rect.top, bbw = (m.rect.top + m.rect.height) - (m.clientRect.top + m.clientRect.height), brw = (m.rect.left + m.rect.width) - (m.clientRect.left + m.clientRect.width);
        if (renderBorders && (blw || brw || bbw || btw)) {
            var blc = style.borderLeftColor || style.borderColor, brc = style.borderRightColor || style.borderColor, btc = style.borderTopColor || style.borderColor, bbc = style.borderBottomColor || style.borderColor;
            if ((blw && btw && bbw && brw) && (blw === brw && blw === bbw && blw === btw) && (blc === brc && blc === bbc && blc === btc)) {
                var border = blw, half = border / 2;
                this._area.paths
                    .rect(x + half, y + half, clientWidth + border, clientHeight + border)
                    .stroke(new wjcPdf.PdfPen(blc, border));
            }
            else {
                if (blw) {
                    this._area.paths
                        .polygon([[x, y], [x + blw, y + btw], [x + blw, y + btw + clientHeight], [x, y + btw + clientHeight + bbw]])
                        .fill(blc);
                }
                if (btw) {
                    this._area.paths
                        .polygon([[x, y], [x + blw, y + btw], [x + blw + clientWidth, y + btw], [x + blw + clientWidth + brw, y]])
                        .fill(btc);
                }
                if (brw) {
                    this._area.paths
                        .polygon([[x + blw + clientWidth + brw, y], [x + blw + clientWidth, y + btw], [x + blw + clientWidth, y + btw + clientHeight], [x + blw + clientWidth + brw, y + btw + clientHeight + bbw]])
                        .fill(brc);
                }
                if (bbw) {
                    this._area.paths
                        .polygon([[x, y + btw + clientHeight + bbw], [x + blw, y + btw + clientHeight], [x + blw + clientWidth, y + btw + clientHeight], [x + blw + clientWidth + brw, y + btw + clientHeight + bbw]])
                        .fill(bbc);
                }
            }
        }
        if (renderContent && style.backgroundColor && clientWidth > 0 && clientHeight > 0) {
            this._area.paths
                .rect(x + blw, y + btw, clientWidth, clientHeight)
                .fill(style.backgroundColor);
        }
    };
    CellRenderer.prototype._renderBooleanCell = function (value, m, style, renderContent, renderBorders) {
        this._renderEmptyCell(m, style, renderContent, renderBorders);
        if (!renderContent) {
            return;
        }
        var border = 0.5, x = m.textRect.left, y = m.textRect.top, sz = m.textRect.height;
        this._area.paths
            .rect(x, y, sz, sz)
            .fillAndStroke(wjcCore.Color.fromRgba(255, 255, 255), new wjcPdf.PdfPen(undefined, border));
        if (wjcCore.changeType(value, wjcCore.DataType.Boolean, '') === true) {
            var space = sz / 20, cmRectSize = sz - border - space * 2, cmLineWidth = sz / 8;
            this._area._pdfdoc.saveState();
            this._area.translate(x + border / 2 + space, y + border / 2 + space)
                .paths
                .moveTo(cmLineWidth / 2, cmRectSize * 0.6)
                .lineTo(cmRectSize - cmRectSize * 0.6, cmRectSize - cmLineWidth)
                .lineTo(cmRectSize - cmLineWidth / 2, cmLineWidth / 2)
                .stroke(new wjcPdf.PdfPen(undefined, cmLineWidth));
            this._area._pdfdoc.restoreState();
        }
    };
    CellRenderer.prototype._renderTextCell = function (text, m, style, renderContent, renderBorders) {
        this._renderEmptyCell(m, style, renderContent, renderBorders);
        if (!renderContent) {
            return;
        }
        if (text) {
            this._area.drawText(text, m.textRect.left, m.textRect.top, {
                brush: style.color,
                font: style.font,
                height: m.textRect.height,
                width: m.textRect.width,
                align: style.textAlign === 'center'
                    ? wjcPdf.PdfTextHorizontalAlign.Center
                    : (style.textAlign === 'right'
                        ? wjcPdf.PdfTextHorizontalAlign.Right
                        : (style.textAlign === 'justify'
                            ? wjcPdf.PdfTextHorizontalAlign.Justify
                            : wjcPdf.PdfTextHorizontalAlign.Left))
            });
        }
    };
    CellRenderer.prototype._calculateTextRect = function (value, column, row, panel, content, style) {
        var res = content.clone();
        if (this._isBooleanCellAndValue(value, column, row, panel)) {
            var szh = this._getTextLineHeight(style.font);
            switch (style.verticalAlign) {
                case 'middle':
                    res.top = content.top + content.height / 2 - szh / 2;
                    break;
                case 'bottom':
                    res.top = content.top + content.height - szh;
                    break;
            }
            switch (style.textAlign) {
                case 'justify':
                case 'center':
                    res.left = content.left + content.width / 2 - szh / 2;
                    break;
                case 'right':
                    res.left = content.left + content.width - szh;
                    break;
            }
            res.height = res.width = szh;
        }
        else {
            if (res.height > 0 && res.width > 0) {
                switch (style.verticalAlign) {
                    case 'bottom':
                        var sz = this._area.measureText(value, style.font, { height: res.height, width: res.width });
                        if (sz.size.height < res.height) {
                            res.top += res.height - sz.size.height;
                            res.height = sz.size.height;
                        }
                        break;
                    case 'middle':
                        var sz = this._area.measureText(value, style.font, { height: res.height, width: res.width });
                        if (sz.size.height < res.height) {
                            res.top += res.height / 2 - sz.size.height / 2;
                            res.height = sz.size.height;
                        }
                        break;
                    default:
                        break;
                }
                if (!column.wordWrap) {
                    res.height = this._getTextLineHeight(style.font);
                }
            }
        }
        return res;
    };
    CellRenderer.prototype._extractCheckboxValue = function (cell) {
        var cb = cell.querySelector('input.wj-cell-check[type=checkbox]');
        if (cb) {
            var style = window.getComputedStyle(cb);
            if (style.display !== 'none' && style.visibility !== 'hidden') {
                return cb.checked;
            }
        }
        return undefined;
    };
    CellRenderer.prototype._getTextLineHeight = function (font) {
        return this._area.lineHeight(font);
    };
    return CellRenderer;
}());
var GetMergedRangeProxy = (function () {
    function GetMergedRangeProxy(flex) {
        this._columns = {};
        this._flex = flex;
    }
    GetMergedRangeProxy.prototype.getMergedRange = function (panel, r, c) {
        var rng = this._columns[c];
        if (rng && r >= rng.topRow && r <= rng.bottomRow) {
            return rng;
        }
        else {
            var mergedRange = this._flex.getMergedRange(panel, r, c, false);
            return this._columns[c] = mergedRange ? new CellRangeExt(panel, mergedRange) : null;
        }
    };
    return GetMergedRangeProxy;
}());
var CellRangeExt = (function (_super) {
    __extends(CellRangeExt, _super);
    function CellRangeExt(panel, cr, col, row2, col2) {
        var _this = this;
        if (cr instanceof wjcGrid.CellRange) {
            _this = _super.call(this, cr.row, cr.col, cr.row2, cr.col2) || this;
        }
        else {
            _this = _super.call(this, cr, col, row2, col2) || this;
        }
        _this.firstVisibleRow = -1;
        _this.visibleRowsCount = 0;
        var tr = _this.topRow, br = _this.bottomRow, len = panel.rows.length;
        if (len > 0) {
            for (var i = tr; i <= br && i < len; i++) {
                if (panel.rows[i].isVisible) {
                    if (_this.firstVisibleRow < 0) {
                        _this.firstVisibleRow = i;
                    }
                    _this.visibleRowsCount++;
                }
            }
        }
        return _this;
    }
    CellRangeExt.prototype.copyFrom = function (cr) {
        this.setRange(cr.row, cr.col, cr.row2, cr.col2);
        this.firstVisibleRow = cr.firstVisibleRow;
        this.visibleRowsCount = cr.visibleRowsCount;
    };
    return CellRangeExt;
}(wjcGrid.CellRange));
var RowRange = (function () {
    function RowRange(flex, ranges) {
        this._flex = flex;
        this._ranges = ranges || [];
    }
    RowRange.getSelection = function (flex, exportMode) {
        var ranges = [];
        if (exportMode === ExportMode.All) {
            ranges.push(new wjcGrid.CellRange(0, 0, flex.rows.length - 1, flex.columns.length - 1));
        }
        else {
            var selection = flex.selection;
            switch (flex.selectionMode) {
                case wjcGrid.SelectionMode.None:
                    break;
                case wjcGrid.SelectionMode.Cell:
                case wjcGrid.SelectionMode.CellRange:
                    ranges.push(selection);
                    break;
                case wjcGrid.SelectionMode.Row:
                    ranges.push(new wjcGrid.CellRange(selection.topRow, 0, selection.topRow, flex.cells.columns.length - 1));
                    break;
                case wjcGrid.SelectionMode.RowRange:
                    ranges.push(new wjcGrid.CellRange(selection.topRow, 0, selection.bottomRow, flex.cells.columns.length - 1));
                    break;
                case wjcGrid.SelectionMode.ListBox:
                    var top = -1;
                    for (var r = 0; r < flex.rows.length; r++) {
                        var row = flex.rows[r];
                        if (row.isSelected) {
                            if (top < 0) {
                                top = r;
                            }
                            if (r === flex.rows.length - 1) {
                                ranges.push(new wjcGrid.CellRange(top, 0, r, flex.cells.columns.length - 1));
                            }
                        }
                        else {
                            if (top >= 0) {
                                ranges.push(new wjcGrid.CellRange(top, 0, r - 1, flex.cells.columns.length - 1));
                            }
                            top = -1;
                        }
                    }
                    break;
            }
        }
        return new RowRange(flex, ranges);
    };
    RowRange.prototype.length = function () {
        var res = 0;
        for (var i = 0; i < this._ranges.length; i++) {
            var r = this._ranges[i];
            if (r.isValid) {
                res += r.bottomRow - r.topRow + 1;
            }
        }
        return res;
    };
    Object.defineProperty(RowRange.prototype, "isValid", {
        get: function () {
            return this._ranges.length && this._ranges[0].isValid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowRange.prototype, "leftCol", {
        get: function () {
            if (this._ranges.length) {
                return this._ranges[0].leftCol;
            }
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RowRange.prototype, "rightCol", {
        get: function () {
            if (this._ranges.length) {
                return this._ranges[0].rightCol;
            }
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    RowRange.prototype.clone = function (leftCol, rightCol) {
        var ranges = [];
        for (var i = 0; i < this._ranges.length; i++) {
            var range = this._ranges[i].clone();
            if (arguments.length > 0) {
                range.col = leftCol;
            }
            if (arguments.length > 1) {
                range.col2 = rightCol;
            }
            ranges.push(range);
        }
        return new RowRange(this._flex, ranges);
    };
    RowRange.prototype.getRenderSize = function (panel) {
        var res = new wjcCore.Size(0, 0);
        for (var i = 0; i < this._ranges.length; i++) {
            var size = this._ranges[i].getRenderSize(panel);
            res.width = Math.max(res.width, size.width);
            res.height += size.height;
        }
        return res;
    };
    RowRange.prototype.forEach = function (panel, fn) {
        var idx = 0;
        for (var i = 0; i < this._ranges.length; i++) {
            var range = this._ranges[i];
            if (range.isValid) {
                for (var j = range.topRow; j <= range.bottomRow; j++) {
                    fn(panel.rows[j], range, j, idx++);
                }
            }
        }
    };
    RowRange.prototype.subrange = function (from, count, leftCol, rightCol) {
        var ranges = [];
        if (from >= 0 && count > 0) {
            var start = 0, end = 0;
            for (var i = 0; i < this._ranges.length && count > 0; i++, start = end + 1) {
                var r = this._ranges[i];
                end = start + (r.bottomRow - r.topRow);
                if (from > end) {
                    continue;
                }
                var r1 = (from > start) ? r.topRow + (from - start) : r.topRow, r2 = Math.min(r.bottomRow, r1 + count - 1), lCol = arguments.length > 2 ? leftCol : r.leftCol, rCol = arguments.length > 2 ? rightCol : r.rightCol;
                ranges.push(new wjcGrid.CellRange(r1, lCol, r2, rCol));
                count -= r2 - r1 + 1;
            }
        }
        return new RowRange(this._flex, ranges);
    };
    return RowRange;
}());
var PdfPageRowRange = (function () {
    function PdfPageRowRange(range, col, row) {
        this._col = col;
        this._row = row;
        this._range = range;
    }
    Object.defineProperty(PdfPageRowRange.prototype, "range", {
        get: function () {
            return this._range;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfPageRowRange.prototype, "pageCol", {
        get: function () {
            return this._col;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfPageRowRange.prototype, "pageRow", {
        get: function () {
            return this._row;
        },
        enumerable: true,
        configurable: true
    });
    return PdfPageRowRange;
}());
//# sourceMappingURL=wijmo.grid.pdf.js.map