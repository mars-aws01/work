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
var wjcXlsx = require("wijmo/wijmo.xlsx");
var wjcCore = require("wijmo/wijmo");
function tryGetModuleWijmoGridDetail() {
    var m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['grid']) && m2['detail'];
}
function tryGetModuleWijmoGridMultirow() {
    var m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['grid']) && m2['multirow'];
}
var wjcSelf = require("wijmo/wijmo.grid.xlsx");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['grid'] = window['wijmo']['grid'] || {};
window['wijmo']['grid']['xlsx'] = wjcSelf;
'use strict';
var FlexGridXlsxConverter = (function () {
    function FlexGridXlsxConverter() {
    }
    FlexGridXlsxConverter.save = function (grid, options, fileName) {
        var workbook = this._saveFlexGridToWorkbook(grid, options);
        if (fileName) {
            workbook.save(fileName);
        }
        return workbook;
    };
    FlexGridXlsxConverter.saveAsync = function (grid, options, fileName, onSaved, onError) {
        var workbook = this._saveFlexGridToWorkbook(grid, options);
        workbook.saveAsync(fileName, onSaved, onError);
        return workbook;
    };
    FlexGridXlsxConverter.load = function (grid, workbook, options) {
        var _this = this;
        if (workbook instanceof Blob) {
            var reader = new FileReader();
            reader.onload = function () {
                var fileContent = wjcXlsx.Workbook._base64EncArr(new Uint8Array(reader.result));
                var wb = new wjcXlsx.Workbook();
                wb.load(fileContent);
                fileContent = null;
                grid.deferUpdate(function () {
                    _this._loadToFlexGrid(grid, wb, options);
                    wb = null;
                });
            };
            reader.readAsArrayBuffer(workbook);
        }
        else if (workbook instanceof wjcXlsx.Workbook) {
            grid.deferUpdate(function () {
                _this._loadToFlexGrid(grid, workbook, options);
                workbook = null;
            });
        }
        else {
            if (workbook instanceof ArrayBuffer) {
                workbook = wjcXlsx.Workbook._base64EncArr(new Uint8Array(workbook));
            }
            else if (!wjcCore.isString(workbook)) {
                throw 'Invalid workbook.';
            }
            var wb = new wjcXlsx.Workbook();
            wb.load(workbook);
            workbook = null;
            grid.deferUpdate(function () {
                _this._loadToFlexGrid(grid, wb, options);
                wb = null;
            });
        }
    };
    FlexGridXlsxConverter.loadAsync = function (grid, workbook, options, onLoaded, onError) {
        var _this = this;
        if (workbook instanceof Blob) {
            var reader = new FileReader();
            reader.onload = function () {
                var fileContent = wjcXlsx.Workbook._base64EncArr(new Uint8Array(reader.result));
                var wb = new wjcXlsx.Workbook();
                wb.loadAsync(fileContent, function (loadedWorkbook) {
                    fileContent = null;
                    wb = null;
                    grid.deferUpdate(function () {
                        _this._loadToFlexGrid(grid, loadedWorkbook, options);
                        if (onLoaded) {
                            onLoaded(loadedWorkbook);
                        }
                        loadedWorkbook = null;
                    });
                }, onError);
            };
            reader.readAsArrayBuffer(workbook);
        }
        else if (workbook instanceof wjcXlsx.Workbook) {
            grid.deferUpdate(function () {
                _this._loadToFlexGrid(grid, workbook, options);
                if (onLoaded) {
                    onLoaded(workbook);
                }
                workbook = null;
            });
        }
        else {
            if (workbook instanceof ArrayBuffer) {
                workbook = wjcXlsx.Workbook._base64EncArr(new Uint8Array(workbook));
            }
            else if (!wjcCore.isString(workbook)) {
                throw 'Invalid workbook.';
            }
            var wb = new wjcXlsx.Workbook();
            wb.loadAsync(workbook, function (loadedWorkbook) {
                workbook = null;
                grid.deferUpdate(function () {
                    _this._loadToFlexGrid(grid, loadedWorkbook, options);
                    if (onLoaded) {
                        onLoaded(loadedWorkbook);
                    }
                    loadedWorkbook = null;
                });
            }, onError);
        }
    };
    FlexGridXlsxConverter._saveFlexGridToWorkbook = function (grid, options) {
        var workbook = new wjcXlsx.Workbook(), workSheet = new wjcXlsx.WorkSheet(), sheetStyle = new wjcXlsx.WorkbookStyle(), workbookFrozenPane = new wjcXlsx.WorkbookFrozenPane(), includeColumnHeaders = options && options.includeColumnHeaders != null ? options.includeColumnHeaders : true, includeRowHeaders = options && options.includeRowHeaders != null ? options.includeRowHeaders : false, includeCellStyles = options && options.includeCellStyles != null ? options.includeCellStyles : true, activeWorksheet = options ? options.activeWorksheet : null, includeColumns = options ? options.includeColumns : null, formatItem = options ? options.formatItem : null, workbookRowOM, workbookRow, column, workbookColumnOM, workbookColumn, columnSettings, sheetStyleOM, ri, headerRi, ci, sheetInfo, fakeCell, row, groupRow, isGroupRow, groupLevel = 0, columnHeaderRowCnt = 0, cellsRowCnt = 0, rowHeaderColumnCnt = 0, cellsCache = [];
        if (this.hasCssText == null) {
            this.hasCssText = 'cssText' in document.body.style;
        }
        sheetInfo = grid['wj_sheetInfo'];
        workSheet.name = options ? options.sheetName : '';
        workSheet.visible = options ? (options.sheetVisible !== false) : true;
        if (sheetInfo && sheetInfo.tableNames && sheetInfo.tableNames.length > 0) {
            for (var i = 0; i < sheetInfo.tableNames.length; i++) {
                workSheet.tableNames.push(sheetInfo.tableNames[i]);
            }
        }
        columnSettings = [];
        if (!sheetInfo && (includeCellStyles || formatItem)) {
            fakeCell = document.createElement('div');
            fakeCell.style.visibility = 'hidden';
            fakeCell.setAttribute(wjcGrid.FlexGrid._WJS_MEASURE, 'true');
            grid.hostElement.appendChild(fakeCell);
        }
        if (includeRowHeaders) {
            headerRi = 0;
            for (ri = 0; ri < grid.rowHeaders.rows.length; ri++) {
                if (grid.rowHeaders.rows[ri].renderSize <= 0) {
                    continue;
                }
                columnSettings[headerRi] = [];
                for (ci = 0; ci < grid.rowHeaders.columns.length; ci++) {
                    column = grid._getBindingColumn(grid.rowHeaders, ri, grid.rowHeaders.columns[ci]);
                    workbookColumnOM = this._getColumnSetting(column, grid.columnHeaders.columns.defaultSize);
                    columnSettings[headerRi][ci] = workbookColumnOM;
                    if (headerRi === 0) {
                        workbookColumn = new wjcXlsx.WorkbookColumn();
                        workbookColumn._deserialize(workbookColumnOM);
                        workSheet._addWorkbookColumn(workbookColumn, ci);
                    }
                }
                headerRi++;
            }
            rowHeaderColumnCnt = ci;
        }
        if (includeColumnHeaders && grid.columnHeaders.rows.length > 0) {
            headerRi = 0;
            for (ri = 0; ri < grid.columnHeaders.rows.length; ri++) {
                if (grid.columnHeaders.rows[ri].renderSize <= 0) {
                    continue;
                }
                if (!columnSettings[headerRi]) {
                    columnSettings[headerRi] = [];
                }
                for (ci = 0; ci < grid.columnHeaders.columns.length; ci++) {
                    column = grid._getBindingColumn(grid.columnHeaders, ri, grid.columnHeaders.columns[ci]);
                    workbookColumnOM = this._getColumnSetting(column, grid.columnHeaders.columns.defaultSize);
                    columnSettings[headerRi][rowHeaderColumnCnt + ci] = workbookColumnOM;
                    if (headerRi === 0) {
                        if (!includeColumns || includeColumns(column)) {
                            workbookColumn = new wjcXlsx.WorkbookColumn();
                            workbookColumn._deserialize(workbookColumnOM);
                            workSheet._addWorkbookColumn(workbookColumn);
                        }
                    }
                }
                rowHeaderColumnCnt = 0;
                workbookRowOM = {};
                workbookRow = new wjcXlsx.WorkbookRow();
                if (includeRowHeaders) {
                    rowHeaderColumnCnt = this._parseFlexGridRowToSheetRow(grid.topLeftCells, workbookRowOM, ri, 0, columnSettings, includeCellStyles, fakeCell, cellsCache, false, 0, includeColumns, formatItem);
                }
                this._parseFlexGridRowToSheetRow(grid.columnHeaders, workbookRowOM, ri, rowHeaderColumnCnt, columnSettings, includeCellStyles, fakeCell, cellsCache, false, 0, includeColumns, formatItem);
                if (workbookRowOM.cells.length > 0) {
                    workbookRow._deserialize(workbookRowOM);
                    workSheet._addWorkbookRow(workbookRow, headerRi);
                }
                headerRi++;
            }
            columnHeaderRowCnt = headerRi;
        }
        else {
            if (!columnSettings[0]) {
                columnSettings[0] = [];
            }
            for (ci = 0; ci < grid.columnHeaders.columns.length; ci++) {
                column = grid._getBindingColumn(grid.columnHeaders, 0, grid.columnHeaders.columns[ci]);
                workbookColumnOM = this._getColumnSetting(column, grid.columnHeaders.columns.defaultSize);
                columnSettings[0][rowHeaderColumnCnt + ci] = workbookColumnOM;
                if (!includeColumns || includeColumns(column)) {
                    workbookColumn = new wjcXlsx.WorkbookColumn();
                    workbookColumn._deserialize(workbookColumnOM);
                    workSheet._addWorkbookColumn(workbookColumn);
                }
            }
        }
        for (ri = 0; ri < grid.cells.rows.length; ri++) {
            rowHeaderColumnCnt = 0;
            workbookRowOM = {};
            workbookRow = new wjcXlsx.WorkbookRow();
            row = grid.rows[ri];
            if (row instanceof wjcGrid._NewRowTemplate) {
                continue;
            }
            isGroupRow = row instanceof wjcGrid.GroupRow;
            if (isGroupRow) {
                groupRow = wjcCore.tryCast(row, wjcGrid.GroupRow);
                groupLevel = groupRow.level;
            }
            else {
                if (grid.rows.maxGroupLevel > -1) {
                    groupLevel = grid.rows.maxGroupLevel + 1;
                }
            }
            if (includeRowHeaders) {
                rowHeaderColumnCnt = this._parseFlexGridRowToSheetRow(grid.rowHeaders, workbookRowOM, ri, 0, columnSettings, includeCellStyles, fakeCell, cellsCache, isGroupRow, groupLevel, includeColumns, formatItem);
            }
            this._parseFlexGridRowToSheetRow(grid.cells, workbookRowOM, ri, rowHeaderColumnCnt, columnSettings, includeCellStyles, fakeCell, cellsCache, isGroupRow, groupLevel, includeColumns, formatItem);
            if (workbookRowOM.cells.length > 0) {
                workbookRow._deserialize(workbookRowOM);
                workSheet._addWorkbookRow(workbookRow, columnHeaderRowCnt + ri);
            }
        }
        cellsRowCnt = grid.cells.rows.length;
        for (ri = 0; ri < grid.columnFooters.rows.length; ri++) {
            rowHeaderColumnCnt = 0;
            workbookRowOM = {};
            workbookRow = new wjcXlsx.WorkbookRow();
            row = grid.columnFooters.rows[ri];
            isGroupRow = row instanceof wjcGrid.GroupRow;
            if (includeRowHeaders) {
                rowHeaderColumnCnt = this._parseFlexGridRowToSheetRow(grid.rowHeaders, workbookRowOM, ri, 0, columnSettings, includeCellStyles, fakeCell, cellsCache, isGroupRow, 0, includeColumns, formatItem);
            }
            this._parseFlexGridRowToSheetRow(grid.columnFooters, workbookRowOM, ri, rowHeaderColumnCnt, columnSettings, includeCellStyles, fakeCell, cellsCache, isGroupRow, 0, includeColumns, formatItem);
            if (workbookRowOM.cells.length > 0) {
                workbookRow._deserialize(workbookRowOM);
                workSheet._addWorkbookRow(workbookRow, columnHeaderRowCnt + cellsRowCnt + ri);
            }
        }
        workbookFrozenPane.rows = includeColumnHeaders ? (grid.frozenRows + columnHeaderRowCnt) : grid.frozenRows;
        workbookFrozenPane.columns = includeRowHeaders ? (grid.frozenColumns + rowHeaderColumnCnt) : grid.frozenColumns;
        workSheet.frozenPane = workbookFrozenPane;
        workbook._addWorkSheet(workSheet);
        if (!sheetInfo && (includeCellStyles || formatItem)) {
            grid.hostElement.removeChild(fakeCell);
            cellsCache.forEach(function (p) { return p.forEach(function (el) {
                if (el && el.parentElement) {
                    el.parentElement.removeChild(el);
                }
            }); });
        }
        workbook.activeWorksheet = activeWorksheet;
        return workbook;
    };
    FlexGridXlsxConverter._loadToFlexGrid = function (grid, workbook, options) {
        var includeColumnHeaders = options && options.includeColumnHeaders != null ? options.includeColumnHeaders : true, currentIncludeRowHeaders = options && options.includeColumnHeaders != null ? options.includeColumnHeaders : true, sheetIndex = options && options.sheetIndex != null && !isNaN(options.sheetIndex) ? options.sheetIndex : 0, sheetName = options ? options.sheetName : null, sheetVisible = options ? options.sheetVisible : true, isFlexSheet = grid['wj_sheetInfo'] != null, c = 0, r = 0, i, j, columnSettings, columns, columnSetting, column, columnHeader, sheetHeaders, sheetHeader, headerForamt, row, currentSheet, rowCount, columnCount, isGroupHeader, item, nextRowIdx, nextRow, summaryBelow, commonRow, groupRow, frozenColumns, frozenRows, formula, flexHostElement, cellIndex, cellStyle, styledCells, mergedRanges, fonts, cellFormat, valType, textAlign, groupCollapsed = false, groupCollapsedSettings = {}, rowWordWrap;
        grid.itemsSource = null;
        grid.columns.clear();
        grid.rows.clear();
        grid.frozenColumns = 0;
        grid.frozenRows = 0;
        styledCells = {};
        mergedRanges = {};
        r = 0;
        columns = [];
        fonts = [];
        if (sheetIndex < 0 || sheetIndex >= workbook.sheets.length) {
            throw 'The sheet index option is out of the sheet range of current workbook.';
        }
        if (sheetName != null) {
            for (i = 0; i < workbook.sheets.length; i++) {
                if (sheetName === workbook.sheets[i].name) {
                    currentSheet = workbook.sheets[i];
                    break;
                }
            }
        }
        currentSheet = currentSheet || workbook.sheets[sheetIndex];
        if (currentSheet.rows == null) {
            return;
        }
        if (includeColumnHeaders) {
            r = 1;
            if (currentSheet.rows.length <= 1) {
                currentIncludeRowHeaders = false;
                r = 0;
            }
            sheetHeaders = currentSheet.rows[0];
        }
        columnCount = this._getColumnCount(currentSheet.rows);
        rowCount = this._getRowCount(currentSheet.rows, columnCount);
        summaryBelow = currentSheet.summaryBelow;
        columnSettings = currentSheet.columns;
        for (c = 0; c < columnCount; c++) {
            grid.columns.push(new wjcGrid.Column());
            if (!!columnSettings[c]) {
                if (!isNaN(+columnSettings[c].width)) {
                    grid.columns[c].width = +columnSettings[c].width;
                }
                if (!columnSettings[c].visible && columnSettings[c].visible != null) {
                    grid.columns[c].visible = !!columnSettings[c].visible;
                }
                if (columnSettings[c].style && !!columnSettings[c].style.wordWrap) {
                    grid.columns[c].wordWrap = columnSettings[c].style.wordWrap;
                }
            }
        }
        for (; r < rowCount; r++) {
            isGroupHeader = false;
            rowWordWrap = null;
            row = currentSheet.rows[r];
            if (row) {
                nextRowIdx = r + 1;
                while (nextRowIdx < currentSheet.rows.length) {
                    nextRow = currentSheet.rows[nextRowIdx];
                    if (nextRow) {
                        if ((isNaN(row.groupLevel) && !isNaN(nextRow.groupLevel))
                            || (!isNaN(row.groupLevel) && row.groupLevel < nextRow.groupLevel)) {
                            isGroupHeader = true;
                        }
                        break;
                    }
                    else {
                        nextRowIdx++;
                    }
                }
            }
            if (isGroupHeader && !summaryBelow) {
                if (groupRow) {
                    groupRow.isCollapsed = groupCollapsed;
                }
                groupRow = new wjcGrid.GroupRow();
                groupRow.isReadOnly = false;
                groupCollapsed = row.collapsed == null ? false : row.collapsed;
                groupRow.level = isNaN(row.groupLevel) ? 0 : row.groupLevel;
                groupCollapsedSettings[groupRow.level] = groupCollapsed;
                if (this._checkParentCollapsed(groupCollapsedSettings, groupRow.level)) {
                    groupRow._setFlag(wjcGrid.RowColFlags.ParentCollapsed, true);
                }
                grid.rows.push(groupRow);
            }
            else {
                commonRow = new wjcGrid.Row();
                if (row && this._checkParentCollapsed(groupCollapsedSettings, row.groupLevel)) {
                    commonRow._setFlag(wjcGrid.RowColFlags.ParentCollapsed, true);
                }
                grid.rows.push(commonRow);
            }
            if (row && !!row.height && !isNaN(row.height)) {
                grid.rows[currentIncludeRowHeaders ? r - 1 : r].height = row.height + 7;
            }
            for (c = 0; c < columnCount; c++) {
                if (!row) {
                    grid.setCellData(currentIncludeRowHeaders ? r - 1 : r, c, '');
                    this._setColumn(columns, c, null);
                }
                else {
                    item = row.cells[c];
                    formula = item ? item.formula : null;
                    if (formula && formula[0] !== '=') {
                        formula = '=' + formula;
                    }
                    if (item && item.textRuns && item.textRuns.length > 0) {
                        grid.rows[currentIncludeRowHeaders ? r - 1 : r].isContentHtml = true;
                        grid.setCellData(currentIncludeRowHeaders ? r - 1 : r, c, this._parseTextRunsToHTML(item.textRuns));
                    }
                    else {
                        grid.setCellData(currentIncludeRowHeaders ? r - 1 : r, c, formula && isFlexSheet ? formula : this._getItemValue(item));
                    }
                    if (!isGroupHeader) {
                        this._setColumn(columns, c, item);
                    }
                    cellIndex = r * columnCount + c;
                    cellStyle = item ? item.style : null;
                    cellFormat = wjcXlsx.Workbook._parseExcelFormat(item);
                    if (cellStyle) {
                        if (rowWordWrap == null) {
                            rowWordWrap = !!cellStyle.wordWrap;
                        }
                        else {
                            rowWordWrap = rowWordWrap && !!cellStyle.wordWrap;
                        }
                        valType = this._getItemType(item);
                        if (cellStyle.hAlign) {
                            textAlign = wjcXlsx.Workbook._parseHAlignToString(wjcCore.asEnum(cellStyle.hAlign, wjcXlsx.HAlign));
                        }
                        else {
                            switch (valType) {
                                case wjcCore.DataType.Number:
                                    textAlign = 'right';
                                    break;
                                case wjcCore.DataType.Boolean:
                                    textAlign = 'center';
                                    break;
                                default:
                                    if (cellFormat && cellFormat.search(/[n,c,p]/i) === 0) {
                                        textAlign = 'right';
                                    }
                                    else {
                                        textAlign = 'left';
                                    }
                                    break;
                            }
                        }
                        styledCells[cellIndex] = {
                            fontWeight: cellStyle.font && cellStyle.font.bold ? 'bold' : 'none',
                            fontStyle: cellStyle.font && cellStyle.font.italic ? 'italic' : 'none',
                            textDecoration: cellStyle.font && cellStyle.font.underline ? 'underline' : 'none',
                            textAlign: textAlign,
                            fontFamily: cellStyle.font && cellStyle.font.family ? cellStyle.font.family : '',
                            fontSize: cellStyle.font && cellStyle.font.size ? cellStyle.font.size + 'px' : '',
                            color: cellStyle.font && cellStyle.font.color ? cellStyle.font.color : '',
                            backgroundColor: cellStyle.fill && cellStyle.fill.color ? cellStyle.fill.color : '',
                            whiteSpace: cellStyle.wordWrap ? 'pre-wrap' : 'normal',
                            format: cellFormat
                        };
                        if (cellStyle.borders) {
                            if (cellStyle.borders.left) {
                                this._parseBorderStyle(cellStyle.borders.left.style, 'Left', styledCells[cellIndex]);
                                styledCells[cellIndex].borderLeftColor = cellStyle.borders.left.color;
                            }
                            if (cellStyle.borders.right) {
                                this._parseBorderStyle(cellStyle.borders.right.style, 'Right', styledCells[cellIndex]);
                                styledCells[cellIndex].borderRightColor = cellStyle.borders.right.color;
                            }
                            if (cellStyle.borders.top) {
                                this._parseBorderStyle(cellStyle.borders.top.style, 'Top', styledCells[cellIndex]);
                                styledCells[cellIndex].borderTopColor = cellStyle.borders.top.color;
                            }
                            if (cellStyle.borders.bottom) {
                                this._parseBorderStyle(cellStyle.borders.bottom.style, 'Bottom', styledCells[cellIndex]);
                                styledCells[cellIndex].borderBottomColor = cellStyle.borders.bottom.color;
                            }
                        }
                        if (cellStyle.font && fonts.indexOf(cellStyle.font.family) === -1) {
                            fonts.push(cellStyle.font.family);
                        }
                    }
                    if (item && (wjcCore.isNumber(item.rowSpan) && item.rowSpan > 0)
                        && (wjcCore.isNumber(item.colSpan) && item.colSpan > 0)
                        && (item.rowSpan > 1 || item.colSpan > 1)) {
                        for (i = r; i < r + item.rowSpan; i++) {
                            for (j = c; j < c + item.colSpan; j++) {
                                cellIndex = i * columnCount + j;
                                mergedRanges[cellIndex] = new wjcGrid.CellRange(r, c, r + item.rowSpan - 1, c + item.colSpan - 1);
                            }
                        }
                    }
                }
            }
            if (row) {
                if (!this._checkParentCollapsed(groupCollapsedSettings, row.groupLevel) && !row.visible && row.visible != null) {
                    grid.rows[currentIncludeRowHeaders ? r - 1 : r].visible = row.visible;
                }
                grid.rows[currentIncludeRowHeaders ? r - 1 : r].wordWrap = (!!row.style && !!row.style.wordWrap) || !!rowWordWrap;
            }
        }
        if (groupRow) {
            groupRow.isCollapsed = groupCollapsed;
        }
        if (currentSheet.frozenPane) {
            frozenColumns = currentSheet.frozenPane.columns;
            if (wjcCore.isNumber(frozenColumns) && !isNaN(frozenColumns)) {
                grid.frozenColumns = frozenColumns;
            }
            frozenRows = currentSheet.frozenPane.rows;
            if (wjcCore.isNumber(frozenRows) && !isNaN(frozenRows)) {
                grid.frozenRows = currentIncludeRowHeaders && frozenRows > 0 ? frozenRows - 1 : frozenRows;
            }
        }
        for (c = 0; c < grid.columnHeaders.columns.length; c++) {
            columnSetting = columns[c];
            column = grid.columns[c];
            column.isRequired = false;
            if (currentIncludeRowHeaders) {
                sheetHeader = sheetHeaders ? sheetHeaders.cells[c] : null;
                if (sheetHeader && sheetHeader.value) {
                    headerForamt = wjcXlsx.Workbook._parseExcelFormat(sheetHeader);
                    columnHeader = wjcCore.Globalize.format(sheetHeader.value, headerForamt);
                }
                else {
                    columnHeader = this._numAlpha(c);
                }
            }
            else {
                columnHeader = this._numAlpha(c);
            }
            column.header = columnHeader;
            if (columnSetting) {
                if (columnSetting.dataType === wjcCore.DataType.Boolean) {
                    column.dataType = columnSetting.dataType;
                }
                column.format = columnSetting.format;
                column.align = columnSetting.hAlign;
                column.wordWrap = column.wordWrap || !!columnSetting.wordWrap;
            }
        }
        if (isFlexSheet) {
            grid['wj_sheetInfo'].name = currentSheet.name;
            grid['wj_sheetInfo'].visible = sheetVisible === true ? true : currentSheet.visible !== false;
            grid['wj_sheetInfo'].styledCells = styledCells;
            grid['wj_sheetInfo'].mergedRanges = mergedRanges;
            grid['wj_sheetInfo'].fonts = fonts;
            grid['wj_sheetInfo'].tableNames = currentSheet.tableNames;
        }
    };
    FlexGridXlsxConverter._parseFlexGridRowToSheetRow = function (panel, workbookRow, rowIndex, startColIndex, columnSettings, includeCellStyles, fakeCell, cellsCache, isGroupRow, groupLevel, includeColumns, formatItem) {
        var flex, row, columnSetting, ci, orgFormat, format, val, textRuns, unformattedVal, groupHeader, isFormula, formula, cellIndex, cellStyle, mergedCells, rowSpan, colSpan, sheetInfo, valIsDate, isCommonRow = false, bcol, isStartMergedCell, recordIndex, xlsxCell, getFormattedCell, xlsxFormatItemArgs, cloneFakeCell, parsedCellStyle, hAlign, indent;
        flex = panel.grid;
        sheetInfo = flex['wj_sheetInfo'];
        row = panel.rows[rowIndex];
        recordIndex = row['recordIndex'] != null ? row['recordIndex'] : 0;
        if (!workbookRow.cells) {
            workbookRow.cells = [];
        }
        workbookRow.visible = row.isVisible;
        workbookRow.height = row.renderHeight || panel.rows.defaultSize;
        workbookRow.groupLevel = groupLevel;
        if (isGroupRow) {
            workbookRow.collapsed = row.isCollapsed;
        }
        if (row.wordWrap) {
            workbookRow.style = {
                wordWrap: row.wordWrap
            };
        }
        if (row.constructor === wjcGrid.Row
            || row.constructor === wjcGrid._NewRowTemplate
            || ((tryGetModuleWijmoGridDetail()) && row.constructor === (tryGetModuleWijmoGridDetail()).DetailRow)
            || ((tryGetModuleWijmoGridMultirow()) && row.constructor === (tryGetModuleWijmoGridMultirow())._MultiRow)) {
            isCommonRow = true;
        }
        for (ci = 0; ci < panel.columns.length; ci++) {
            orgFormat = null;
            colSpan = 1;
            rowSpan = 1;
            indent = 0;
            isStartMergedCell = false;
            cellStyle = null;
            parsedCellStyle = null;
            cloneFakeCell = null;
            textRuns = null;
            bcol = flex._getBindingColumn(panel, rowIndex, panel.columns[ci]);
            mergedCells = null;
            if (sheetInfo && panel === flex.cells) {
                cellIndex = rowIndex * panel.columns.length + ci;
                if (sheetInfo.mergedRanges) {
                    mergedCells = sheetInfo.mergedRanges[cellIndex];
                }
                if (sheetInfo.styledCells) {
                    cellStyle = sheetInfo.styledCells[cellIndex];
                }
            }
            else if (includeCellStyles) {
                cloneFakeCell = this._getMeasureCell(panel, ci, fakeCell, cellsCache);
                mergedCells = flex.getMergedRange(panel, rowIndex, ci, false);
                if (mergedCells) {
                    cellStyle = this._getCellStyle(panel, cloneFakeCell, mergedCells.bottomRow, mergedCells.rightCol) || {};
                }
                else {
                    cellStyle = this._getCellStyle(panel, cloneFakeCell, rowIndex, ci) || {};
                }
            }
            if (!mergedCells) {
                mergedCells = flex.getMergedRange(panel, rowIndex, ci, false);
            }
            if (mergedCells) {
                if (rowIndex === mergedCells.topRow && ci === mergedCells.leftCol) {
                    rowSpan = mergedCells.bottomRow - mergedCells.topRow + 1;
                    colSpan = this._getColSpan(panel, mergedCells, includeColumns);
                    isStartMergedCell = true;
                }
            }
            else {
                isStartMergedCell = true;
            }
            if (!!includeColumns && !includeColumns(bcol)) {
                continue;
            }
            columnSetting = columnSettings[recordIndex][ci + startColIndex];
            if (isCommonRow || isGroupRow) {
                val = isStartMergedCell ? panel.getCellData(rowIndex, ci, true) : null;
                unformattedVal = isStartMergedCell ? panel.getCellData(rowIndex, ci, false) : null;
                isFormula = false;
                if (val && wjcCore.isString(val) && val.length > 1 && val[0] === '=') {
                    isFormula = true;
                }
                valIsDate = wjcCore.isDate(unformattedVal);
                if (cellStyle && cellStyle.format) {
                    orgFormat = cellStyle.format;
                    format = wjcXlsx.Workbook._parseCellFormat(cellStyle.format, valIsDate);
                }
                else if (columnSetting && columnSetting.style && columnSetting.style.format) {
                    orgFormat = bcol.format;
                    format = columnSetting.style.format;
                }
                else {
                    format = null;
                }
                if (!format) {
                    if (valIsDate) {
                        format = 'm/d/yyyy';
                    }
                    else if (wjcCore.isNumber(unformattedVal) && !bcol.dataMap) {
                        format = wjcCore.isInt(unformattedVal) ? '#,##0' : '#,##0.00';
                    }
                    else if (isFormula) {
                        formula = val.toLowerCase();
                        if (formula.indexOf('now()') > -1) {
                            format = 'm/d/yyyy h:mm';
                            valIsDate = true;
                        }
                        else if (formula.indexOf('today()') > -1 || formula.indexOf('date(') > -1) {
                            format = 'm/d/yyyy';
                            valIsDate = true;
                        }
                        else if (formula.indexOf('time(') > -1) {
                            format = 'h:mm AM/PM';
                            valIsDate = true;
                        }
                    }
                    else {
                        format = 'General';
                    }
                }
            }
            else {
                val = isStartMergedCell ? flex.columnHeaders.getCellData(0, ci, true) : null;
                format = 'General';
            }
            if (wjcCore.isString(val) && val.indexOf('<span') !== -1) {
                textRuns = this._parseToTextRuns(val);
                val = null;
            }
            parsedCellStyle = this._parseCellStyle(cellStyle) || {};
            if (panel === flex.cells && isGroupRow && row['hasChildren'] && ci === flex.columns.firstVisibleIndex) {
                if (val) {
                    groupHeader = val;
                }
                else if (isStartMergedCell) {
                    groupHeader = row.getGroupHeader().replace(/<\/?\w+>/g, '');
                }
                if (groupHeader == null && !cellStyle) {
                    continue;
                }
                valIsDate = wjcCore.isDate(groupHeader);
                if (!valIsDate && orgFormat && orgFormat.toLowerCase() === 'd' && wjcCore.isInt(groupHeader)) {
                    format = '0';
                }
                groupHeader = typeof groupHeader === 'string' ? wjcXlsx.Workbook._unescapeXML(groupHeader) : groupHeader;
                if (ci === flex.columns.firstVisibleIndex && flex.treeIndent) {
                    indent = groupLevel;
                }
                xlsxCell = {
                    value: groupHeader,
                    isDate: valIsDate,
                    formula: isFormula ? this._parseToExcelFormula(val, valIsDate) : null,
                    colSpan: colSpan,
                    rowSpan: rowSpan,
                    style: this._extend(parsedCellStyle, {
                        format: format,
                        font: {
                            bold: true
                        },
                        hAlign: wjcXlsx.HAlign.Left,
                        indent: indent
                    }),
                    textRuns: textRuns
                };
            }
            else {
                val = wjcCore.isString(val) ? wjcXlsx.Workbook._unescapeXML(val) : val;
                unformattedVal = wjcCore.isString(unformattedVal) ? wjcXlsx.Workbook._unescapeXML(unformattedVal) : unformattedVal;
                if (!valIsDate && orgFormat && orgFormat.toLowerCase() === 'd' && wjcCore.isInt(unformattedVal)) {
                    format = '0';
                }
                if (parsedCellStyle && parsedCellStyle.hAlign) {
                    hAlign = parsedCellStyle.hAlign;
                }
                else if (columnSetting && columnSetting.style && columnSetting.style.hAlign != null) {
                    hAlign = wjcCore.asEnum(columnSetting.style.hAlign, wjcXlsx.HAlign, true);
                }
                else {
                    if (wjcCore.isDate(unformattedVal)) {
                        hAlign = wjcXlsx.HAlign.Left;
                    }
                    else {
                        hAlign = wjcXlsx.HAlign.General;
                    }
                }
                if (ci === flex.columns.firstVisibleIndex && flex.treeIndent && (hAlign === wjcXlsx.HAlign.Left || hAlign === wjcXlsx.HAlign.General)) {
                    indent = groupLevel;
                }
                xlsxCell = {
                    value: isFormula ? null : format === 'General' ? val : unformattedVal,
                    isDate: valIsDate,
                    formula: isFormula ? this._parseToExcelFormula(val, valIsDate) : null,
                    colSpan: ci < flex.columns.firstVisibleIndex ? 1 : colSpan,
                    rowSpan: rowSpan,
                    style: this._extend(parsedCellStyle, {
                        format: format,
                        hAlign: hAlign,
                        vAlign: rowSpan > 1 ? (panel === flex.cells || flex['centerHeadersVertically'] === false ? wjcXlsx.VAlign.Top : wjcXlsx.VAlign.Center) : null,
                        indent: indent
                    }),
                    textRuns: textRuns
                };
            }
            if (formatItem) {
                xlsxFormatItemArgs = new XlsxFormatItemEventArgs(panel, new wjcGrid.CellRange(rowIndex, ci), cloneFakeCell, fakeCell, cellsCache, xlsxCell);
                formatItem(xlsxFormatItemArgs);
            }
            workbookRow.cells.push(xlsxCell);
        }
        return startColIndex + ci;
    };
    FlexGridXlsxConverter._parseCellStyle = function (cellStyle, isTableStyle) {
        if (isTableStyle === void 0) { isTableStyle = false; }
        if (cellStyle == null) {
            return null;
        }
        var fontSize = cellStyle.fontSize;
        fontSize = fontSize ? +fontSize.substring(0, fontSize.indexOf('px')) : null;
        if (isNaN(fontSize)) {
            fontSize = null;
        }
        var fontWeight = cellStyle.fontWeight;
        fontWeight = fontWeight === 'bold' || +fontWeight >= 700;
        var fontStyle = cellStyle.fontStyle === 'italic';
        var textDecoration = cellStyle.textDecorationStyle;
        if (textDecoration == null) {
            textDecoration = cellStyle.textDecoration;
        }
        textDecoration = textDecoration === 'underline';
        var wordWrap = cellStyle.whiteSpace;
        wordWrap = wordWrap ? (wordWrap.indexOf('pre') > -1 ? true : false) : false;
        return {
            font: {
                bold: fontWeight,
                italic: fontStyle,
                underline: textDecoration,
                family: this._parseToExcelFontFamily(cellStyle.fontFamily),
                size: fontSize,
                color: cellStyle.color,
            },
            fill: {
                color: cellStyle.backgroundColor
            },
            borders: this._parseBorder(cellStyle, isTableStyle),
            hAlign: wjcXlsx.Workbook._parseStringToHAlign(cellStyle.textAlign),
            wordWrap: wordWrap
        };
    };
    FlexGridXlsxConverter._parseBorder = function (cellStyle, isTableBorder) {
        var border = {};
        border['left'] = this._parseEgdeBorder(cellStyle, 'Left');
        border['right'] = this._parseEgdeBorder(cellStyle, 'Right');
        border['top'] = this._parseEgdeBorder(cellStyle, 'Top');
        border['bottom'] = this._parseEgdeBorder(cellStyle, 'Bottom');
        if (isTableBorder) {
            border['vertical'] = this._parseEgdeBorder(cellStyle, 'Vertical');
            border['horizontal'] = this._parseEgdeBorder(cellStyle, 'Horizontal');
        }
        return border;
    };
    FlexGridXlsxConverter._parseEgdeBorder = function (cellStyle, edge) {
        var edgeBorder, style = cellStyle['border' + edge + 'Style'], width = cellStyle['border' + edge + 'Width'];
        if (width && width.length > 2) {
            width = +width.substring(0, width.length - 2);
        }
        if (style && style !== 'none' && style !== 'hidden') {
            edgeBorder = {};
            style = style.toLowerCase();
            switch (style) {
                case 'dotted':
                    if (width > 1) {
                        edgeBorder.style = wjcXlsx.BorderStyle.MediumDashDotted;
                    }
                    else {
                        edgeBorder.style = wjcXlsx.BorderStyle.Dotted;
                    }
                    break;
                case 'dashed':
                    if (width > 1) {
                        edgeBorder.style = wjcXlsx.BorderStyle.MediumDashed;
                    }
                    else {
                        edgeBorder.style = wjcXlsx.BorderStyle.Dashed;
                    }
                    break;
                case 'double':
                    edgeBorder.style = wjcXlsx.BorderStyle.Double;
                    break;
                default:
                    if (width > 2) {
                        edgeBorder.style = wjcXlsx.BorderStyle.Thick;
                    }
                    else if (width > 1) {
                        edgeBorder.style = wjcXlsx.BorderStyle.Medium;
                    }
                    else {
                        edgeBorder.style = wjcXlsx.BorderStyle.Thin;
                    }
                    break;
            }
            edgeBorder.color = cellStyle['border' + edge + 'Color'];
        }
        return edgeBorder;
    };
    FlexGridXlsxConverter._parseBorderStyle = function (borderStyle, edge, cellStyle) {
        var edgeStyle = 'border' + edge + 'Style', edgeWidth = 'border' + edge + 'Width';
        switch (borderStyle) {
            case wjcXlsx.BorderStyle.Dotted:
            case wjcXlsx.BorderStyle.Hair:
                cellStyle[edgeStyle] = 'dotted';
                cellStyle[edgeWidth] = '1px';
                break;
            case wjcXlsx.BorderStyle.Dashed:
            case wjcXlsx.BorderStyle.ThinDashDotDotted:
            case wjcXlsx.BorderStyle.ThinDashDotted:
                cellStyle[edgeStyle] = 'dashed';
                cellStyle[edgeWidth] = '1px';
                break;
            case wjcXlsx.BorderStyle.MediumDashed:
            case wjcXlsx.BorderStyle.MediumDashDotDotted:
            case wjcXlsx.BorderStyle.MediumDashDotted:
            case wjcXlsx.BorderStyle.SlantedMediumDashDotted:
                cellStyle[edgeStyle] = 'dashed';
                cellStyle[edgeWidth] = '2px';
                break;
            case wjcXlsx.BorderStyle.Double:
                cellStyle[edgeStyle] = 'double';
                cellStyle[edgeWidth] = '3px';
                break;
            case wjcXlsx.BorderStyle.Medium:
                cellStyle[edgeStyle] = 'solid';
                cellStyle[edgeWidth] = '2px';
                break;
            default:
                cellStyle[edgeStyle] = 'solid';
                cellStyle[edgeWidth] = '1px';
                break;
        }
    };
    FlexGridXlsxConverter._parseToExcelFontFamily = function (fontFamily) {
        var fonts;
        if (fontFamily) {
            fonts = fontFamily.split(',');
            if (fonts && fonts.length > 0) {
                fontFamily = fonts[0].replace(/\"|\'/g, '');
            }
        }
        return fontFamily;
    };
    FlexGridXlsxConverter._parseToExcelFormula = function (formula, isDate) {
        var floorCeilReg = /(floor|ceiling)\([+-]?\d+\.?\d*\)/gi, textReg = /text\(\"?\w+\"?\s*\,\s*\"\w+\"\)/gi, textFormatReg = /\"?\w+\"?\s*\,\s*\"(\w+)\"/i, matches, formatMatches, format, updatedFormat, index, matchFormula, updatedFormula;
        matches = formula.match(floorCeilReg);
        if (matches) {
            for (index = 0; index < matches.length; index++) {
                matchFormula = matches[index];
                updatedFormula = matchFormula.substring(0, matchFormula.lastIndexOf(')')) + ', 1)';
                formula = formula.replace(matchFormula, updatedFormula);
            }
        }
        matches = null;
        matches = formula.match(textReg);
        if (matches) {
            for (index = 0; index < matches.length; index++) {
                matchFormula = matches[index];
                formatMatches = matchFormula.match(textFormatReg);
                if (formatMatches && formatMatches.length === 2) {
                    format = formatMatches[1];
                    if (!/^d{1,4}?$/.test(format)) {
                        updatedFormat = wjcXlsx.Workbook._parseCellFormat(format, isDate);
                        updatedFormula = matchFormula.replace(format, updatedFormat);
                        formula = formula.replace(matchFormula, updatedFormula);
                    }
                }
            }
        }
        return formula;
    };
    FlexGridXlsxConverter._parseToTextRuns = function (value) {
        var spans = value.split('<span '), index, item, text, styles, styleIndex, styleItem, textFont, textRun, textRuns = [];
        for (index = 0; index < spans.length; index++) {
            item = spans[index];
            if (item.indexOf('</span>') !== -1) {
                text = item.substring(item.indexOf('>') + 1, item.indexOf('</span>'));
                textFont = this._parseToTextRunFont(item.substring(item.indexOf('style="') + 7, item.indexOf(';"')));
                textRun = {
                    text: text,
                    font: textFont
                };
            }
            else {
                textRun = {
                    text: item
                };
            }
            textRuns.push(textRun);
        }
        return textRuns;
    };
    FlexGridXlsxConverter._parseToTextRunFont = function (style) {
        var styles = style.split(';'), styleIndex, styleItem, bold, italic, underline, fontSize, family, color, textFont;
        if (styles.length > 0) {
            for (styleIndex = 0; styleIndex < styles.length; styleIndex++) {
                styleItem = styles[styleIndex].split(':');
                if (styleItem.length !== 2) {
                    continue;
                }
                styleItem[1] = styleItem[1].trim();
                switch (styleItem[0]) {
                    case 'font-size':
                        fontSize = +styleItem[1].substring(0, styleItem[1].indexOf('px'));
                        if (isNaN(fontSize)) {
                            fontSize = null;
                        }
                        break;
                    case 'font-weight':
                        bold = styleItem[1] === 'bold' || +styleItem[1] >= 700;
                        break;
                    case 'font-style':
                        italic = styleItem[1] === 'italic';
                        break;
                    case 'text-decoration-style':
                    case 'text-decoration':
                        underline = styleItem[1] === 'underline';
                        break;
                    case 'font-family':
                        family = this._parseToExcelFontFamily(styleItem[1]);
                        break;
                    case 'color':
                        color = styleItem[1];
                        break;
                }
            }
            textFont = {
                bold: bold,
                italic: italic,
                underline: underline,
                family: family,
                size: fontSize,
                color: color
            };
        }
        return textFont;
    };
    FlexGridXlsxConverter._getMeasureCell = function (panel, colIndex, patternCell, cellsCache) {
        var panelCache = cellsCache[panel.cellType], cachedCell = panelCache && panelCache[colIndex], newCell = cachedCell == null;
        if (!cachedCell) {
            if (!panelCache) {
                cellsCache[panel.cellType] = panelCache = [];
            }
            panelCache[colIndex] = cachedCell = patternCell.cloneNode();
        }
        else {
            if (this.hasCssText) {
                var style = cachedCell.style;
                cachedCell.style.cssText = '';
                cachedCell.style.visibility = 'hidden';
            }
        }
        if (newCell || !cachedCell.parentElement) {
            if (panel.hostElement.children.length > 0) {
                panel.hostElement.children[0].appendChild(cachedCell);
            }
            else {
                panel.hostElement.appendChild(cachedCell);
            }
        }
        return cachedCell;
    };
    FlexGridXlsxConverter._getColumnSetting = function (column, defaultWidth) {
        var width = column.renderWidth;
        width = width || defaultWidth;
        return {
            autoWidth: true,
            width: width,
            visible: column.visible,
            style: {
                format: column.format ? wjcXlsx.Workbook._parseCellFormat(column.format, column.dataType === wjcCore.DataType.Date) : '',
                hAlign: wjcXlsx.Workbook._parseStringToHAlign(this._toExcelHAlign(column.getAlignment())),
                wordWrap: column.wordWrap
            }
        };
    };
    FlexGridXlsxConverter._toExcelHAlign = function (value) {
        value = value ? value.trim().toLowerCase() : value;
        if (!value)
            return value;
        if (value.indexOf('center') > -1) {
            return 'center';
        }
        if (value.indexOf('right') > -1 || value.indexOf('end') > -1) {
            return 'right';
        }
        if (value.indexOf('justify') > -1) {
            return 'justify';
        }
        return 'left';
    };
    FlexGridXlsxConverter._getColumnCount = function (sheetData) {
        var columnCount = 0, currentColCnt = 0, data;
        for (var i = 0; i < sheetData.length; i++) {
            data = sheetData[i] && sheetData[i].cells ? sheetData[i].cells : [];
            if (data && data.length > 0) {
                currentColCnt = data.length;
                if (wjcCore.isInt(data[currentColCnt - 1].colSpan) && data[currentColCnt - 1].colSpan > 1) {
                    currentColCnt = currentColCnt + data[currentColCnt - 1].colSpan - 1;
                }
                if (currentColCnt > columnCount) {
                    columnCount = currentColCnt;
                }
            }
        }
        return columnCount;
    };
    FlexGridXlsxConverter._getRowCount = function (sheetData, columnCnt) {
        var rowCount = sheetData.length, rowIndex = rowCount - 1, colIndex = 0, lastRow, data, cell;
        for (; colIndex < columnCnt; colIndex++) {
            rowLoop: for (; rowIndex >= 0; rowIndex--) {
                lastRow = sheetData[rowIndex];
                data = lastRow && lastRow.cells ? lastRow.cells : [];
                cell = data[colIndex];
                if (cell && ((cell.value != null && cell.value !== '') || (wjcCore.isInt(cell.rowSpan) && cell.rowSpan > 1))) {
                    if (wjcCore.isInt(cell.rowSpan) && cell.rowSpan > 1 && (rowIndex + cell.rowSpan > rowCount)) {
                        rowCount = rowIndex + cell.rowSpan;
                    }
                    break rowLoop;
                }
            }
        }
        return rowCount;
    };
    FlexGridXlsxConverter._numAlpha = function (i) {
        var t = Math.floor(i / 26) - 1;
        return (t > -1 ? this._numAlpha(t) : '') + String.fromCharCode(65 + i % 26);
    };
    FlexGridXlsxConverter._getItemType = function (item) {
        if (item == null || item.value == null
            || isNaN(item.value)) {
            return null;
        }
        return wjcCore.getType(item.value);
    };
    FlexGridXlsxConverter._setColumn = function (columns, columnIndex, item) {
        var dataType, format, hAlign, columnSetting = columns[columnIndex];
        if (!columnSetting) {
            columns[columnIndex] = {
                dataType: this._getItemType(item),
                format: wjcXlsx.Workbook._parseExcelFormat(item),
                hAlign: '',
                wordWrap: null
            };
        }
        else {
            dataType = this._getItemType(item);
            if (columnSetting.dataType !== dataType &&
                columnSetting.dataType === wjcCore.DataType.Boolean && dataType !== wjcCore.DataType.Boolean) {
                columnSetting.dataType = dataType;
            }
            if (item && item.value != null && item.value !== '') {
                format = wjcXlsx.Workbook._parseExcelFormat(item);
                if (format && columnSetting.format !== format && format !== 'General') {
                    columnSetting.format = format;
                }
            }
            if (item && item.style) {
                if (item.style.hAlign) {
                    hAlign = wjcXlsx.Workbook._parseHAlignToString(wjcCore.asEnum(item.style.hAlign, wjcXlsx.HAlign));
                }
                if (columnSetting.wordWrap == null) {
                    columnSetting.wordWrap = !!item.style.wordWrap;
                }
                else {
                    columnSetting.wordWrap = columnSetting.wordWrap && !!item.style.wordWrap;
                }
            }
            if (!hAlign && dataType === wjcCore.DataType.Number) {
                hAlign = 'right';
            }
            columnSetting.hAlign = hAlign;
        }
    };
    FlexGridXlsxConverter._getItemValue = function (item) {
        if (item == null || item.value == null) {
            return null;
        }
        var val = item.value;
        if (wjcCore.isNumber(val) && isNaN(val)) {
            return '';
        }
        else if (val instanceof Date && isNaN(val.getTime())) {
            return '';
        }
        else {
            return val;
        }
    };
    FlexGridXlsxConverter._getCellStyle = function (panel, fakeCell, r, c) {
        var theStyle;
        try {
            panel.grid.cellFactory.updateCell(panel, r, c, fakeCell);
            fakeCell.className = fakeCell.className.replace('wj-state-selected', '');
            fakeCell.className = fakeCell.className.replace('wj-state-multi-selected', '');
        }
        catch (ex) {
            return null;
        }
        theStyle = window.getComputedStyle(fakeCell);
        return theStyle;
    };
    FlexGridXlsxConverter._parseTextRunsToHTML = function (textRuns) {
        var textRun, font, html, index;
        html = '';
        for (index = 0; index < textRuns.length; index++) {
            textRun = textRuns[index];
            font = textRun.font;
            if (font) {
                html += '<span style="' + (font.bold ? 'font-weight: bold;' : '') + (font.italic ? 'font-style: italic;' : '')
                    + (font.underline ? 'text-decoration: underline;' : '') + (font.family ? 'font-family: ' + font.family + ';' : '')
                    + (font.size != null ? 'font-size: ' + font.size + 'px;' : '') + (font.color ? 'color: ' + font.color + ';' : '')
                    + '">' + textRun.text + '</span>';
            }
            else {
                html += textRun.text;
            }
        }
        return html;
    };
    FlexGridXlsxConverter._extend = function (dst, src) {
        for (var key in src) {
            var value = src[key];
            if (wjcCore.isObject(value) && dst[key]) {
                wjcCore.copy(dst[key], value);
            }
            else {
                dst[key] = value;
            }
        }
        return dst;
    };
    FlexGridXlsxConverter._checkParentCollapsed = function (groupCollapsedSettings, groupLevel) {
        var parentCollapsed = false;
        Object.keys(groupCollapsedSettings).forEach(function (key) {
            if (groupCollapsedSettings[key] === true && parentCollapsed === false && !isNaN(groupLevel) && +key < groupLevel) {
                parentCollapsed = true;
            }
        });
        return parentCollapsed;
    };
    FlexGridXlsxConverter._getColSpan = function (p, mergedRange, includeColumns) {
        var colSpan = 0;
        for (var i = mergedRange.leftCol; i <= mergedRange.rightCol; i++) {
            if (!includeColumns || includeColumns(p.columns[i])) {
                colSpan++;
            }
        }
        return colSpan;
    };
    return FlexGridXlsxConverter;
}());
exports.FlexGridXlsxConverter = FlexGridXlsxConverter;
var XlsxFormatItemEventArgs = (function (_super) {
    __extends(XlsxFormatItemEventArgs, _super);
    function XlsxFormatItemEventArgs(panel, rng, cell, patternCell, cellsCache, xlsxCell) {
        var _this = _super.call(this, panel, rng) || this;
        _this._cell = cell;
        _this._patternCell = patternCell;
        _this._xlsxCell = xlsxCell;
        _this._cellsCache = cellsCache;
        return _this;
    }
    Object.defineProperty(XlsxFormatItemEventArgs.prototype, "cell", {
        get: function () {
            return this._cell;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XlsxFormatItemEventArgs.prototype, "xlsxCell", {
        get: function () {
            return this._xlsxCell;
        },
        set: function (value) {
            this._xlsxCell = value;
        },
        enumerable: true,
        configurable: true
    });
    XlsxFormatItemEventArgs.prototype.getFormattedCell = function () {
        if (!this._cell) {
            this._cell = FlexGridXlsxConverter._getMeasureCell(this.panel, this.col, this._patternCell, this._cellsCache);
            FlexGridXlsxConverter._getCellStyle(this.panel, this._cell, this.row, this.col);
        }
        return this._cell;
    };
    return XlsxFormatItemEventArgs;
}(wjcGrid.CellRangeEventArgs));
exports.XlsxFormatItemEventArgs = XlsxFormatItemEventArgs;
//# sourceMappingURL=wijmo.grid.xlsx.js.map