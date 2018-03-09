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
var wjcInput = require("wijmo/wijmo.input");
var wjcSelf = require("wijmo/wijmo.grid.filter");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['grid'] = window['wijmo']['grid'] || {};
window['wijmo']['grid']['filter'] = wjcSelf;
'use strict';
'use strict';
var ValueFilter = (function () {
    function ValueFilter(column) {
        this._maxValues = 250;
        this._sortValues = true;
        this._col = column;
        this._bnd = column.binding ? new wjcCore.Binding(column.binding) : null;
    }
    Object.defineProperty(ValueFilter.prototype, "showValues", {
        get: function () {
            return this._values;
        },
        set: function (value) {
            this._values = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueFilter.prototype, "filterText", {
        get: function () {
            return this._filterText;
        },
        set: function (value) {
            this._filterText = wjcCore.asString(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueFilter.prototype, "maxValues", {
        get: function () {
            return this._maxValues;
        },
        set: function (value) {
            this._maxValues = wjcCore.asNumber(value, false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueFilter.prototype, "uniqueValues", {
        get: function () {
            return this._uniqueValues;
        },
        set: function (value) {
            this._uniqueValues = wjcCore.asArray(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueFilter.prototype, "sortValues", {
        get: function () {
            return this._sortValues;
        },
        set: function (value) {
            this._sortValues = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueFilter.prototype, "dataMap", {
        get: function () {
            return this._map;
        },
        set: function (value) {
            this._map = wjcCore.asType(value, wjcGrid.DataMap, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueFilter.prototype, "column", {
        get: function () {
            return this._col;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueFilter.prototype, "isActive", {
        get: function () {
            return this._values != null && Object.keys(this._values).length > 0;
        },
        enumerable: true,
        configurable: true
    });
    ValueFilter.prototype.apply = function (value) {
        var col = this.column;
        if (!this._bnd || !this._values || !Object.keys(this._values).length) {
            return true;
        }
        value = this._bnd.getValue(value);
        value =
            this.dataMap ? this.dataMap.getDisplayValue(value) :
                col.dataMap ? col.dataMap.getDisplayValue(value) :
                    wjcCore.Globalize.format(value, col.format);
        return this._values[value] != undefined;
    };
    ValueFilter.prototype.clear = function () {
        this.showValues = null;
        this.filterText = null;
    };
    ValueFilter.prototype.implementsInterface = function (interfaceName) {
        return interfaceName == 'IColumnFilter';
    };
    ValueFilter.prototype._getUniqueValues = function (col, filtered) {
        var values = [];
        if (this.uniqueValues) {
            var uvalues = this.uniqueValues;
            for (var i = 0; i < uvalues.length; i++) {
                var value = uvalues[i];
                values.push({ value: value, text: value.toString() });
            }
            return values;
        }
        var keys = {}, view = col.collectionView, src = view ? view.sourceCollection : [];
        if (filtered && view && view.sourceCollection && view.filter) {
            var sv = this.showValues;
            this.showValues = null;
            var nsrc = [];
            for (var i = 0; i < src.length; i++) {
                if (view.filter(src[i])) {
                    nsrc.push(src[i]);
                }
            }
            src = nsrc;
            this.showValues = sv;
        }
        for (var i = 0; i < src.length; i++) {
            var value = col._binding.getValue(src[i]), text = this.dataMap ? this.dataMap.getDisplayValue(value) :
                col.dataMap ? col.dataMap.getDisplayValue(value) :
                    wjcCore.Globalize.format(value, col.format);
            if (!keys[text]) {
                keys[text] = true;
                values.push({ value: value, text: text });
            }
        }
        return values;
    };
    return ValueFilter;
}());
exports.ValueFilter = ValueFilter;
'use strict';
var ValueFilterEditor = (function (_super) {
    __extends(ValueFilterEditor, _super);
    function ValueFilterEditor(element, filter) {
        var _this = _super.call(this, element) || this;
        _this._filter = wjcCore.asType(filter, ValueFilter, false);
        var tpl = _this.getTemplate();
        _this.applyTemplate('wj-control', tpl, {
            _divFilter: 'div-filter',
            _cbSelectAll: 'cb-select-all',
            _spSelectAll: 'sp-select-all',
            _divValues: 'div-values'
        });
        wjcCore.setText(_this._spSelectAll, wjcCore.culture.FlexGridFilter.selectAll);
        _this._view = new wjcCore.CollectionView();
        if (filter.sortValues) {
            var sortBinding = filter.column.dataMap || filter.dataMap ? 'text' : 'value', asc = filter.column.dataType != wjcCore.DataType.Boolean;
            _this._view.sortDescriptions.push(new wjcCore.SortDescription(sortBinding, asc));
        }
        _this._view.filter = _this._filterValues.bind(_this);
        _this._view.collectionChanged.addHandler(_this._updateSelectAllCheck, _this);
        _this._filterText = '';
        _this._cmbFilter = new wjcInput.ComboBox(_this._divFilter, {
            placeholder: wjcCore.culture.FlexGridFilter.search
        });
        _this._lbValues = new wjcInput.ListBox(_this._divValues, {
            displayMemberPath: 'text',
            checkedMemberPath: 'show',
            itemsSource: _this._view,
            itemFormatter: function (index, item) {
                return item ? item : wjcCore.culture.FlexGridFilter.null;
            }
        });
        _this._cmbFilter.textChanged.addHandler(_this._filterTextChanged, _this);
        _this._cbSelectAll.addEventListener('click', _this._cbSelectAllClicked.bind(_this));
        _this.updateEditor();
        return _this;
    }
    Object.defineProperty(ValueFilterEditor.prototype, "filter", {
        get: function () {
            return this._filter;
        },
        enumerable: true,
        configurable: true
    });
    ValueFilterEditor.prototype.updateEditor = function () {
        var _this = this;
        setTimeout(function () {
            _this._updateEditor();
        });
    };
    ValueFilterEditor.prototype._updateEditor = function () {
        var _this = this;
        var col = this._filter.column, values = this._filter._getUniqueValues(col, true);
        this._lbValues.isContentHtml = col.isContentHtml;
        var showValues = this._filter.showValues;
        if (!showValues || Object.keys(showValues).length == 0) {
            for (var i = 0; i < values.length; i++) {
                values[i].show = true;
            }
        }
        else {
            for (var key in showValues) {
                for (var i = 0; i < values.length; i++) {
                    if (values[i].text == key) {
                        values[i].show = true;
                        break;
                    }
                }
            }
        }
        this._view.pageSize = 20;
        this._view.sourceCollection = values;
        this._view.moveCurrentTo(null);
        setTimeout(function () {
            _this._view.pageSize = _this._filter.maxValues;
            _this._cmbFilter.text = _this._filter.filterText;
            _this._filterText = _this._cmbFilter.text.toLowerCase();
        });
    };
    ValueFilterEditor.prototype.clearEditor = function () {
        this._cmbFilter.text = '';
        this._filterText = '';
        this._view.pageSize = 0;
        this._view.refresh();
        var values = this._view.items;
        for (var i = 0; i < values.length; i++) {
            values[i].show = false;
        }
        this._view.pageSize = this._filter.maxValues;
    };
    ValueFilterEditor.prototype.updateFilter = function () {
        var showValues = null, items = this._view.items;
        if (this._filterText || this._cbSelectAll.indeterminate) {
            showValues = {};
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.show) {
                    showValues[item.text] = true;
                }
            }
        }
        this._filter.showValues = showValues;
        this._filter.filterText = this._filterText;
    };
    ValueFilterEditor.prototype._filterTextChanged = function () {
        var _this = this;
        if (this._toText) {
            clearTimeout(this._toText);
        }
        this._toText = setTimeout(function () {
            var filter = _this._cmbFilter.text.toLowerCase();
            if (filter != _this._filterText) {
                _this._filterText = filter;
                _this._view.refresh();
                _this._cbSelectAll.checked = true;
                _this._cbSelectAllClicked();
            }
        }, 500);
    };
    ValueFilterEditor.prototype._filterValues = function (value) {
        if (this._filterText) {
            return value && value.text
                ? value.text.toLowerCase().indexOf(this._filterText) > -1
                : false;
        }
        return true;
    };
    ValueFilterEditor.prototype._cbSelectAllClicked = function () {
        var checked = this._cbSelectAll.checked, values = this._view.items;
        for (var i = 0; i < values.length; i++) {
            values[i].show = checked;
        }
        this._view.refresh();
    };
    ValueFilterEditor.prototype._updateSelectAllCheck = function () {
        var checked = 0, values = this._view.items;
        for (var i = 0; i < values.length; i++) {
            if (values[i].show)
                checked++;
        }
        if (checked == 0) {
            this._cbSelectAll.checked = false;
            this._cbSelectAll.indeterminate = false;
        }
        else if (checked == values.length) {
            this._cbSelectAll.checked = true;
            this._cbSelectAll.indeterminate = false;
        }
        else {
            this._cbSelectAll.indeterminate = true;
        }
    };
    ValueFilterEditor.controlTemplate = '<div>' +
        '<div wj-part="div-filter"></div>' +
        '<div class="wj-listbox-item">' +
        '<label>' +
        '<input wj-part="cb-select-all" type="checkbox"> ' +
        '<span wj-part="sp-select-all"></span>' +
        '</label>' +
        '</div>' +
        '<div wj-part="div-values" style="height:150px"></div>' +
        '</div>';
    return ValueFilterEditor;
}(wjcCore.Control));
exports.ValueFilterEditor = ValueFilterEditor;
'use strict';
var ConditionFilter = (function () {
    function ConditionFilter(column) {
        this._c1 = new FilterCondition();
        this._c2 = new FilterCondition();
        this._and = true;
        this._col = column;
        this._bnd = column.binding ? new wjcCore.Binding(column.binding) : null;
    }
    Object.defineProperty(ConditionFilter.prototype, "condition1", {
        get: function () {
            return this._c1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConditionFilter.prototype, "condition2", {
        get: function () {
            return this._c2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConditionFilter.prototype, "and", {
        get: function () {
            return this._and;
        },
        set: function (value) {
            this._and = wjcCore.asBoolean(value);
            this._bnd = this._col && this._col.binding
                ? new wjcCore.Binding(this._col.binding)
                : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConditionFilter.prototype, "dataMap", {
        get: function () {
            return this._map;
        },
        set: function (value) {
            this._map = wjcCore.asType(value, wjcGrid.DataMap, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConditionFilter.prototype, "column", {
        get: function () {
            return this._col;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConditionFilter.prototype, "isActive", {
        get: function () {
            return this._c1.isActive || this._c2.isActive;
        },
        enumerable: true,
        configurable: true
    });
    ConditionFilter.prototype.apply = function (value) {
        var col = this._col, c1 = this._c1, c2 = this._c2;
        if (!this._bnd || !this.isActive) {
            return true;
        }
        value = this._bnd.getValue(value);
        if (col.dataMap) {
            value = col.dataMap.getDisplayValue(value);
        }
        else if (wjcCore.isDate(value)) {
            if (wjcCore.isString(c1.value) || wjcCore.isString(c2.value)) {
                value = wjcCore.Globalize.format(value, col.format);
            }
        }
        else if (wjcCore.isNumber(value)) {
            value = wjcCore.Globalize.parseFloat(wjcCore.Globalize.format(value, col.format));
        }
        var rv1 = c1.apply(value), rv2 = c2.apply(value);
        if (c1.isActive && c2.isActive) {
            return this._and ? rv1 && rv2 : rv1 || rv2;
        }
        else {
            return c1.isActive ? rv1 : c2.isActive ? rv2 : true;
        }
    };
    ConditionFilter.prototype.clear = function () {
        this._c1.clear();
        this._c2.clear();
        this.and = true;
    };
    ConditionFilter.prototype.implementsInterface = function (interfaceName) {
        return interfaceName == 'IColumnFilter';
    };
    return ConditionFilter;
}());
exports.ConditionFilter = ConditionFilter;
'use strict';
var ConditionFilterEditor = (function (_super) {
    __extends(ConditionFilterEditor, _super);
    function ConditionFilterEditor(element, filter) {
        var _this = _super.call(this, element) || this;
        _this._filter = wjcCore.asType(filter, ConditionFilter, false);
        var tpl = _this.getTemplate();
        _this.applyTemplate('wj-control', tpl, {
            _divHdr: 'div-hdr',
            _divCmb1: 'div-cmb1',
            _divVal1: 'div-val1',
            _btnAnd: 'btn-and',
            _btnOr: 'btn-or',
            _spAnd: 'sp-and',
            _spOr: 'sp-or',
            _divCmb2: 'div-cmb2',
            _divVal2: 'div-val2',
        });
        var strings = wjcCore.culture.FlexGridFilter;
        wjcCore.setText(_this._divHdr, strings.header);
        wjcCore.setText(_this._spAnd, strings.and);
        wjcCore.setText(_this._spOr, strings.or);
        _this._cmb1 = _this._createOperatorCombo(_this._divCmb1);
        _this._cmb2 = _this._createOperatorCombo(_this._divCmb2);
        _this._val1 = _this._createValueInput(_this._divVal1);
        _this._val2 = _this._createValueInput(_this._divVal2);
        var andOr = _this._btnAndOrChanged.bind(_this);
        _this._btnAnd.addEventListener('change', andOr);
        _this._btnOr.addEventListener('change', andOr);
        _this.updateEditor();
        return _this;
    }
    Object.defineProperty(ConditionFilterEditor.prototype, "filter", {
        get: function () {
            return this._filter;
        },
        enumerable: true,
        configurable: true
    });
    ConditionFilterEditor.prototype.updateEditor = function () {
        var c1 = this._filter.condition1, c2 = this._filter.condition2;
        this._cmb1.selectedValue = c1.operator;
        this._cmb2.selectedValue = c2.operator;
        if (this._val1 instanceof wjcInput.ComboBox) {
            this._val1.text = wjcCore.changeType(c1.value, wjcCore.DataType.String, null);
            this._val2.text = wjcCore.changeType(c2.value, wjcCore.DataType.String, null);
        }
        else {
            this._val1.value = c1.value;
            this._val2.value = c2.value;
        }
        this._btnAnd.checked = this._filter.and;
        this._btnOr.checked = !this._filter.and;
    };
    ConditionFilterEditor.prototype.clearEditor = function () {
        this._cmb1.selectedValue = this._cmb2.selectedValue = null;
        this._val1.text = this._val2.text = null;
        this._btnAnd.checked = true;
        this._btnOr.checked = false;
    };
    ConditionFilterEditor.prototype.updateFilter = function () {
        var col = this._filter.column, c1 = this._filter.condition1, c2 = this._filter.condition2;
        c1.operator = this._cmb1.selectedValue;
        c2.operator = this._cmb2.selectedValue;
        if (this._val1 instanceof wjcInput.ComboBox) {
            var dt = col.dataType == wjcCore.DataType.Date ? wjcCore.DataType.String : col.dataType;
            c1.value = wjcCore.changeType(this._val1.text, dt, col.format);
            c2.value = wjcCore.changeType(this._val2.text, dt, col.format);
        }
        else {
            c1.value = this._val1.value;
            c2.value = this._val2.value;
        }
        this._filter.and = this._btnAnd.checked;
    };
    ConditionFilterEditor.prototype._createOperatorCombo = function (element) {
        var col = this._filter.column, list = wjcCore.culture.FlexGridFilter.stringOperators;
        if (col.dataType == wjcCore.DataType.Date && !this._isTimeFormat(col.format)) {
            list = wjcCore.culture.FlexGridFilter.dateOperators;
        }
        else if (col.dataType == wjcCore.DataType.Number && !col.dataMap) {
            list = wjcCore.culture.FlexGridFilter.numberOperators;
        }
        else if (col.dataType == wjcCore.DataType.Boolean && !col.dataMap) {
            list = wjcCore.culture.FlexGridFilter.booleanOperators;
        }
        var cmb = new wjcInput.ComboBox(element);
        cmb.itemsSource = list;
        cmb.displayMemberPath = 'name';
        cmb.selectedValuePath = 'op';
        return cmb;
    };
    ConditionFilterEditor.prototype._createValueInput = function (e) {
        var col = this._filter.column, ctl = null;
        if (col.dataType == wjcCore.DataType.Date && !this._isTimeFormat(col.format)) {
            ctl = new wjcInput.InputDate(e);
            ctl.format = col.format;
        }
        else if (col.dataType == wjcCore.DataType.Number && !col.dataMap) {
            ctl = new wjcInput.InputNumber(e);
            ctl.format = col.format;
        }
        else {
            ctl = new wjcInput.ComboBox(e);
            ctl.itemsSource =
                this._filter.dataMap ? this._filter.dataMap.getDisplayValues() :
                    col.dataMap ? col.dataMap.getDisplayValues() :
                        col.dataType == wjcCore.DataType.Boolean ? [true, false] :
                            null;
        }
        ctl.isRequired = false;
        return ctl;
    };
    ConditionFilterEditor.prototype._isTimeFormat = function (fmt) {
        if (!fmt)
            return false;
        fmt = wjcCore.culture.Globalize.calendar.patterns[fmt] || fmt;
        return /[Hmst]+/.test(fmt);
    };
    ConditionFilterEditor.prototype._btnAndOrChanged = function (e) {
        this._btnAnd.checked = e.target == this._btnAnd;
        this._btnOr.checked = e.target == this._btnOr;
    };
    ConditionFilterEditor.controlTemplate = '<div>' +
        '<div wj-part="div-hdr"></div>' +
        '<div wj-part="div-cmb1"></div><br/>' +
        '<div wj-part="div-val1"></div><br/>' +
        '<div style="text-align:center">' +
        '<label><input wj-part="btn-and" type="radio"> <span wj-part="sp-and"></span> </label>&nbsp;&nbsp;&nbsp;' +
        '<label><input wj-part="btn-or" type="radio"> <span wj-part="sp-or"></span> </label>' +
        '</div>' +
        '<div wj-part="div-cmb2"></div><br/>' +
        '<div wj-part="div-val2"></div><br/>' +
        '</div>';
    return ConditionFilterEditor;
}(wjcCore.Control));
exports.ConditionFilterEditor = ConditionFilterEditor;
'use strict';
var FilterCondition = (function () {
    function FilterCondition() {
        this._op = null;
    }
    Object.defineProperty(FilterCondition.prototype, "operator", {
        get: function () {
            return this._op;
        },
        set: function (value) {
            this._op = wjcCore.asEnum(value, Operator, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterCondition.prototype, "value", {
        get: function () {
            return this._val;
        },
        set: function (value) {
            this._val = value;
            this._strVal = wjcCore.isString(value) ? value.toString().toLowerCase() : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterCondition.prototype, "isActive", {
        get: function () {
            switch (this._op) {
                case null:
                    return false;
                case Operator.EQ:
                case Operator.NE:
                    return true;
                default:
                    return this._val != null || this._strVal != null;
            }
        },
        enumerable: true,
        configurable: true
    });
    FilterCondition.prototype.clear = function () {
        this.operator = null;
        this.value = null;
    };
    FilterCondition.prototype.apply = function (value) {
        var val = this._strVal || this._val;
        if (wjcCore.isString(value)) {
            value = value.toLowerCase();
        }
        if (wjcCore.isString(val) && value == null) {
            value = '';
        }
        switch (this._op) {
            case null:
                return true;
            case Operator.EQ:
                return wjcCore.isDate(value) && wjcCore.isDate(val)
                    ? wjcCore.DateTime.sameDate(value, val)
                    : value == val;
            case Operator.NE:
                return value != val;
            case Operator.GT:
                return value > val;
            case Operator.GE:
                return value >= val;
            case Operator.LT:
                return value < val;
            case Operator.LE:
                return value <= val;
            case Operator.BW:
                return this._strVal && wjcCore.isString(value)
                    ? value.indexOf(this._strVal) == 0
                    : false;
            case Operator.EW:
                return this._strVal && wjcCore.isString(value) && value.length >= this._strVal.length
                    ? value.substr(value.length - this._strVal.length) == val
                    : false;
            case Operator.CT:
                return this._strVal && wjcCore.isString(value)
                    ? value.indexOf(this._strVal) > -1
                    : false;
            case Operator.NC:
                return this._strVal && wjcCore.isString(value)
                    ? value.indexOf(this._strVal) < 0
                    : false;
        }
        throw 'Unknown operator';
    };
    return FilterCondition;
}());
exports.FilterCondition = FilterCondition;
var Operator;
(function (Operator) {
    Operator[Operator["EQ"] = 0] = "EQ";
    Operator[Operator["NE"] = 1] = "NE";
    Operator[Operator["GT"] = 2] = "GT";
    Operator[Operator["GE"] = 3] = "GE";
    Operator[Operator["LT"] = 4] = "LT";
    Operator[Operator["LE"] = 5] = "LE";
    Operator[Operator["BW"] = 6] = "BW";
    Operator[Operator["EW"] = 7] = "EW";
    Operator[Operator["CT"] = 8] = "CT";
    Operator[Operator["NC"] = 9] = "NC";
})(Operator = exports.Operator || (exports.Operator = {}));
'use strict';
var ColumnFilter = (function () {
    function ColumnFilter(owner, column) {
        this._owner = owner;
        this._col = column;
        this._valueFilter = new ValueFilter(column);
        this._conditionFilter = new ConditionFilter(column);
    }
    Object.defineProperty(ColumnFilter.prototype, "filterType", {
        get: function () {
            return this._filterType != null ? this._filterType : this._owner.defaultFilterType;
        },
        set: function (value) {
            if (value != this._filterType) {
                var wasActive = this.isActive;
                this.clear();
                this._filterType = wjcCore.asEnum(value, FilterType, true);
                if (wasActive) {
                    this._owner.apply();
                }
                else if (this._col.grid) {
                    this._col.grid.invalidate();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnFilter.prototype, "dataMap", {
        get: function () {
            return this.conditionFilter.dataMap || this.valueFilter.dataMap;
        },
        set: function (value) {
            this.conditionFilter.dataMap = value;
            this.valueFilter.dataMap = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnFilter.prototype, "valueFilter", {
        get: function () {
            return this._valueFilter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnFilter.prototype, "conditionFilter", {
        get: function () {
            return this._conditionFilter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnFilter.prototype, "column", {
        get: function () {
            return this._col;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnFilter.prototype, "isActive", {
        get: function () {
            return this._conditionFilter.isActive || this._valueFilter.isActive;
        },
        enumerable: true,
        configurable: true
    });
    ColumnFilter.prototype.apply = function (value) {
        return this._conditionFilter.apply(value) && this._valueFilter.apply(value);
    };
    ColumnFilter.prototype.clear = function () {
        this._valueFilter.clear();
        this._conditionFilter.clear();
    };
    ColumnFilter.prototype.implementsInterface = function (interfaceName) {
        return interfaceName == 'IColumnFilter';
    };
    return ColumnFilter;
}());
exports.ColumnFilter = ColumnFilter;
'use strict';
wjcCore.culture.FlexGridFilter = window['wijmo'].culture.FlexGridFilter || {
    ascending: '\u2191 Ascending',
    descending: '\u2193 Descending',
    apply: 'Apply',
    cancel: 'Cancel',
    clear: 'Clear',
    conditions: 'Filter by Condition',
    values: 'Filter by Value',
    search: 'Search',
    selectAll: 'Select All',
    null: '(nothing)',
    header: 'Show items where the value',
    and: 'And',
    or: 'Or',
    stringOperators: [
        { name: '(not set)', op: null },
        { name: 'Equals', op: Operator.EQ },
        { name: 'Does not equal', op: Operator.NE },
        { name: 'Begins with', op: Operator.BW },
        { name: 'Ends with', op: Operator.EW },
        { name: 'Contains', op: Operator.CT },
        { name: 'Does not contain', op: Operator.NC }
    ],
    numberOperators: [
        { name: '(not set)', op: null },
        { name: 'Equals', op: Operator.EQ },
        { name: 'Does not equal', op: Operator.NE },
        { name: 'Is Greater than', op: Operator.GT },
        { name: 'Is Greater than or equal to', op: Operator.GE },
        { name: 'Is Less than', op: Operator.LT },
        { name: 'Is Less than or equal to', op: Operator.LE }
    ],
    dateOperators: [
        { name: '(not set)', op: null },
        { name: 'Equals', op: Operator.EQ },
        { name: 'Is Before', op: Operator.LT },
        { name: 'Is After', op: Operator.GT }
    ],
    booleanOperators: [
        { name: '(not set)', op: null },
        { name: 'Equals', op: Operator.EQ },
        { name: 'Does not equal', op: Operator.NE }
    ]
};
var ColumnFilterEditor = (function (_super) {
    __extends(ColumnFilterEditor, _super);
    function ColumnFilterEditor(element, filter, sortButtons) {
        if (sortButtons === void 0) { sortButtons = true; }
        var _this = _super.call(this, element, null, true) || this;
        _this.filterChanged = new wjcCore.Event();
        _this.buttonClicked = new wjcCore.Event();
        _this._filter = wjcCore.asType(filter, ColumnFilter);
        var tpl = _this.getTemplate();
        _this.applyTemplate('wj-control wj-columnfiltereditor wj-content', tpl, {
            _divSort: 'div-sort',
            _btnAsc: 'btn-asc',
            _btnDsc: 'btn-dsc',
            _divType: 'div-type',
            _aVal: 'a-val',
            _aCnd: 'a-cnd',
            _divEdtVal: 'div-edt-val',
            _divEdtCnd: 'div-edt-cnd',
            _btnApply: 'btn-apply',
            _btnCancel: 'btn-cancel',
            _btnClear: 'btn-clear'
        });
        var strings = wjcCore.culture.FlexGridFilter;
        wjcCore.setText(_this._btnAsc, strings.ascending);
        wjcCore.setText(_this._btnDsc, strings.descending);
        wjcCore.setText(_this._aVal, strings.values);
        wjcCore.setText(_this._aCnd, strings.conditions);
        wjcCore.setText(_this._btnApply, strings.apply);
        wjcCore.setText(_this._btnCancel, strings.cancel);
        wjcCore.setText(_this._btnClear, strings.clear);
        var ft = (_this.filter.conditionFilter.isActive || (filter.filterType & FilterType.Value) == 0)
            ? FilterType.Condition
            : FilterType.Value;
        _this._showFilter(ft);
        var col = _this.filter.column, view = col.grid.collectionView;
        if (!sortButtons || !view || !view.canSort) {
            _this._divSort.style.display = 'none';
        }
        var bnd = _this._btnClicked.bind(_this);
        _this._btnApply.addEventListener('click', bnd);
        _this._btnCancel.addEventListener('click', bnd);
        _this._btnClear.addEventListener('click', bnd);
        _this._btnAsc.addEventListener('click', bnd);
        _this._btnDsc.addEventListener('click', bnd);
        _this._aVal.addEventListener('click', bnd);
        _this._aCnd.addEventListener('click', bnd);
        _this.hostElement.addEventListener('keydown', function (e) {
            if (!e.defaultPrevented) {
                switch (e.keyCode) {
                    case wjcCore.Key.Enter:
                        switch (e.target.tagName) {
                            case 'A':
                            case 'BUTTON':
                                _this._btnClicked(e);
                                break;
                            default:
                                _this.updateFilter();
                                _this.onFilterChanged();
                                _this.onButtonClicked();
                                break;
                        }
                        e.preventDefault();
                        break;
                    case wjcCore.Key.Escape:
                        _this.onButtonClicked();
                        e.preventDefault();
                        break;
                }
            }
        });
        return _this;
    }
    Object.defineProperty(ColumnFilterEditor.prototype, "filter", {
        get: function () {
            return this._filter;
        },
        enumerable: true,
        configurable: true
    });
    ColumnFilterEditor.prototype.updateEditor = function () {
        if (this._edtVal) {
            this._edtVal.updateEditor();
        }
        if (this._edtCnd) {
            this._edtCnd.updateEditor();
        }
    };
    ColumnFilterEditor.prototype.updateFilter = function () {
        switch (this._getFilterType()) {
            case FilterType.Value:
                this._edtVal.updateFilter();
                this.filter.conditionFilter.clear();
                break;
            case FilterType.Condition:
                this._edtCnd.updateFilter();
                this.filter.valueFilter.clear();
                break;
        }
    };
    ColumnFilterEditor.prototype.onFilterChanged = function (e) {
        this.filterChanged.raise(this, e);
    };
    ColumnFilterEditor.prototype.onButtonClicked = function (e) {
        this.buttonClicked.raise(this, e);
    };
    ColumnFilterEditor.prototype._handleResize = function () {
        if (!this.isTouching && !this._wasTouching) {
            this.onButtonClicked();
        }
    };
    ColumnFilterEditor.prototype._showFilter = function (filterType) {
        this._wasTouching = this.isTouching;
        if (filterType == FilterType.Value && this._edtVal == null) {
            this._edtVal = new ValueFilterEditor(this._divEdtVal, this.filter.valueFilter);
        }
        if (filterType == FilterType.Condition && this._edtCnd == null) {
            this._edtCnd = new ConditionFilterEditor(this._divEdtCnd, this.filter.conditionFilter);
        }
        if ((filterType & this.filter.filterType) != 0) {
            if (filterType == FilterType.Value) {
                this._divEdtVal.style.display = '';
                this._divEdtCnd.style.display = 'none';
                this._enableLink(this._aVal, false);
                this._enableLink(this._aCnd, true);
                this._edtVal.focus();
            }
            else {
                this._divEdtVal.style.display = 'none';
                this._divEdtCnd.style.display = '';
                this._enableLink(this._aVal, true);
                this._enableLink(this._aCnd, false);
                this._edtCnd.focus();
            }
        }
        switch (this.filter.filterType) {
            case FilterType.None:
            case FilterType.Condition:
            case FilterType.Value:
                this._divType.style.display = 'none';
                break;
            default:
                this._divType.style.display = '';
                break;
        }
    };
    ColumnFilterEditor.prototype._enableLink = function (a, enable) {
        a.style.textDecoration = enable ? '' : 'none';
        a.style.fontWeight = enable ? '' : 'bold';
        wjcCore.setAttribute(a, 'href', enable ? '' : null);
    };
    ColumnFilterEditor.prototype._getFilterType = function () {
        return this._divEdtVal.style.display != 'none'
            ? FilterType.Value
            : FilterType.Condition;
    };
    ColumnFilterEditor.prototype._btnClicked = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (wjcCore.hasClass(e.target, 'wj-state-disabled')) {
            return;
        }
        if (e.target == this._aVal) {
            this._showFilter(FilterType.Value);
            return;
        }
        if (e.target == this._aCnd) {
            this._showFilter(FilterType.Condition);
            return;
        }
        if (e.target == this._btnAsc || e.target == this._btnDsc) {
            var col = this.filter.column, binding = col.sortMemberPath ? col.sortMemberPath : col.binding, view_1 = col.grid.collectionView, sortDesc_1 = new wjcCore.SortDescription(binding, e.target == this._btnAsc);
            view_1.sortDescriptions.deferUpdate(function () {
                view_1.sortDescriptions.clear();
                view_1.sortDescriptions.push(sortDesc_1);
            });
        }
        if (e.target == this._btnApply) {
            this.updateFilter();
            this.onFilterChanged();
        }
        else if (e.target == this._btnClear) {
            if (this.filter.isActive) {
                this.filter.clear();
                this.onFilterChanged();
            }
        }
        else {
            this.updateEditor();
        }
        this.onButtonClicked();
    };
    ColumnFilterEditor.controlTemplate = '<div>' +
        '<div wj-part="div-sort">' +
        '<a wj-part="btn-asc" href="" style="min-width:95px" draggable="false"></a>&nbsp;&nbsp;&nbsp;' +
        '<a wj-part="btn-dsc" href="" style="min-width:95px" draggable="false"></a>' +
        '</div>' +
        '<div style="text-align:right;margin:10px 0px;font-size:80%">' +
        '<div wj-part="div-type">' +
        '<a wj-part="a-cnd" href="" draggable="false"></a>' +
        '&nbsp;|&nbsp;' +
        '<a wj-part="a-val" href="" draggable="false"></a>' +
        '</div>' +
        '</div>' +
        '<div wj-part="div-edt-val"></div>' +
        '<div wj-part="div-edt-cnd"></div>' +
        '<div style="text-align:right;margin-top:10px">' +
        '<a wj-part="btn-apply" href="" draggable="false"></a>&nbsp;&nbsp;' +
        '<a wj-part="btn-cancel" href="" draggable="false"></a>&nbsp;&nbsp;' +
        '<a wj-part="btn-clear" href="" draggable="false"></a>' +
        '</div>';
    return ColumnFilterEditor;
}(wjcCore.Control));
exports.ColumnFilterEditor = ColumnFilterEditor;
'use strict';
var FilterType;
(function (FilterType) {
    FilterType[FilterType["None"] = 0] = "None";
    FilterType[FilterType["Condition"] = 1] = "Condition";
    FilterType[FilterType["Value"] = 2] = "Value";
    FilterType[FilterType["Both"] = 3] = "Both";
})(FilterType = exports.FilterType || (exports.FilterType = {}));
var FlexGridFilter = (function () {
    function FlexGridFilter(grid, options) {
        this._showIcons = true;
        this._showSort = true;
        this._defFilterType = FilterType.Both;
        this.filterApplied = new wjcCore.Event();
        this.filterChanging = new wjcCore.Event();
        this.filterChanged = new wjcCore.Event();
        var depErr = 'Missing dependency: FlexGridFilter requires ';
        wjcCore.assert(wjcGrid != null, depErr + 'wijmo.grid.');
        wjcCore.assert(wjcInput != null, depErr + 'wijmo.input.');
        this._filters = [];
        this._g = wjcCore.asType(grid, wjcGrid.FlexGrid, false);
        this._g.formatItem.addHandler(this._formatItem.bind(this));
        this._g.itemsSourceChanged.addHandler(this.clear.bind(this));
        var host = this._g.hostElement;
        grid.addEventListener(host, 'mousedown', this._mousedown.bind(this), true);
        grid.addEventListener(host, 'click', this._click.bind(this), true);
        grid.addEventListener(host, 'keydown', this._keydown.bind(this), true);
        this._g.invalidate();
        if (options) {
            wjcCore.copy(this, options);
        }
    }
    Object.defineProperty(FlexGridFilter.prototype, "grid", {
        get: function () {
            return this._g;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGridFilter.prototype, "filterColumns", {
        get: function () {
            return this._filterColumns;
        },
        set: function (value) {
            this._filterColumns = wjcCore.asArray(value);
            this.clear();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGridFilter.prototype, "showFilterIcons", {
        get: function () {
            return this._showIcons;
        },
        set: function (value) {
            if (value != this.showFilterIcons) {
                this._showIcons = wjcCore.asBoolean(value);
                if (this._g) {
                    this._g.invalidate();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGridFilter.prototype, "showSortButtons", {
        get: function () {
            return this._showSort;
        },
        set: function (value) {
            this._showSort = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    FlexGridFilter.prototype.getColumnFilter = function (col, create) {
        if (create === void 0) { create = true; }
        col = this._asColumn(col);
        for (var i = 0; i < this._filters.length; i++) {
            if (this._filters[i].column == col) {
                return this._filters[i];
            }
        }
        if (create && col.binding) {
            var cf = new ColumnFilter(this, col);
            this._filters.push(cf);
            return cf;
        }
        return null;
    };
    Object.defineProperty(FlexGridFilter.prototype, "defaultFilterType", {
        get: function () {
            return this._defFilterType;
        },
        set: function (value) {
            if (value != this.defaultFilterType) {
                this._defFilterType = wjcCore.asEnum(value, FilterType, false);
                this._g.invalidate();
                this.clear();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexGridFilter.prototype, "filterDefinition", {
        get: function () {
            var def = {
                defaultFilterType: this.defaultFilterType,
                filters: []
            };
            for (var i = 0; i < this._filters.length; i++) {
                var cf = this._filters[i];
                if (cf && cf.column && cf.column.binding) {
                    if (cf.conditionFilter.isActive) {
                        var cfc = cf.conditionFilter;
                        def.filters.push({
                            binding: cf.column.binding,
                            type: 'condition',
                            condition1: { operator: cfc.condition1.operator, value: cfc.condition1.value },
                            and: cfc.and,
                            condition2: { operator: cfc.condition2.operator, value: cfc.condition2.value }
                        });
                    }
                    else if (cf.valueFilter.isActive) {
                        var cfv = cf.valueFilter;
                        def.filters.push({
                            binding: cf.column.binding,
                            type: 'value',
                            filterText: cfv.filterText,
                            showValues: cfv.showValues
                        });
                    }
                }
            }
            return JSON.stringify(def);
        },
        set: function (value) {
            value = wjcCore.asString(value);
            this.clear();
            if (value) {
                var def = JSON.parse(value);
                this.defaultFilterType = def.defaultFilterType;
                for (var i = 0; i < def.filters.length; i++) {
                    var cfs = def.filters[i], col = this._g.getColumn(cfs.binding), cf = this.getColumnFilter(col, true);
                    if (cf) {
                        switch (cfs.type) {
                            case 'condition':
                                var cfc = cf.conditionFilter;
                                cfc.condition1.value = col.dataType == wjcCore.DataType.Date
                                    ? wjcCore.changeType(cfs.condition1.value, col.dataType, null)
                                    : cfs.condition1.value;
                                cfc.condition1.operator = cfs.condition1.operator;
                                cfc.and = cfs.and;
                                cfc.condition2.value = col.dataType == wjcCore.DataType.Date
                                    ? wjcCore.changeType(cfs.condition2.value, col.dataType, null)
                                    : cfs.condition2.value;
                                cfc.condition2.operator = cfs.condition2.operator;
                                break;
                            case 'value':
                                var cfv = cf.valueFilter;
                                cfv.filterText = cfs.filterText;
                                cfv.showValues = cfs.showValues;
                                break;
                        }
                    }
                }
            }
            this.apply();
        },
        enumerable: true,
        configurable: true
    });
    FlexGridFilter.prototype.editColumnFilter = function (col, ht) {
        var _this = this;
        this.closeEditor();
        col = this._asColumn(col);
        var e = new wjcGrid.CellRangeEventArgs(this._g.cells, new wjcGrid.CellRange(-1, col.index));
        if (!this.onFilterChanging(e)) {
            return;
        }
        e.cancel = true;
        var div = document.createElement('div'), flt = this.getColumnFilter(col), edt = new ColumnFilterEditor(div, flt, this.showSortButtons);
        wjcCore.addClass(div, 'wj-dropdown-panel');
        if (this._g.rightToLeft) {
            div.dir = 'rtl';
        }
        edt.filterChanged.addHandler(function () {
            e.cancel = false;
            setTimeout(function () {
                if (!e.cancel) {
                    _this.apply();
                }
            });
        });
        edt.buttonClicked.addHandler(function () {
            _this.closeEditor();
            _this._g.focus();
            _this.onFilterChanged(e);
        });
        edt.lostFocus.addHandler(function () {
            setTimeout(function () {
                var ctl = wjcCore.Control.getControl(_this._divEdt);
                if (ctl && !ctl.containsFocus()) {
                    _this.closeEditor();
                }
            }, 10);
        });
        this._g.scrollIntoView(-1, col.index, true);
        var ch = this._g.columnHeaders, r = ht ? ht.row : ch.rows.length - 1, c = ht ? ht.col : col.index, rc = ch.getCellBoundingRect(r, c), hdrCell = ch.getCellElement(r, c);
        if (hdrCell) {
            wjcCore.showPopup(div, hdrCell, false, false, false);
        }
        else {
            wjcCore.showPopup(div, rc);
        }
        edt.focus();
        this._divEdt = div;
        this._edtCol = col;
    };
    FlexGridFilter.prototype.closeEditor = function () {
        if (this._divEdt) {
            var edt_1 = wjcCore.Control.getControl(this._divEdt);
            if (edt_1) {
                wjcCore.hidePopup(edt_1.hostElement, function () {
                    edt_1.dispose();
                });
            }
            this._divEdt = null;
            this._edtCol = null;
        }
    };
    FlexGridFilter.prototype.apply = function () {
        var view = this._g.collectionView;
        if (view) {
            var ecv = this._g.editableCollectionView;
            if (ecv) {
                ecv.commitEdit();
                ecv.commitNew();
            }
            if (view.filter) {
                view.refresh();
            }
            else {
                view.filter = this._filter.bind(this);
            }
        }
        var updateFilterDefinition = view ? view['updateFilterDefinition'] : null;
        if (wjcCore.isFunction(updateFilterDefinition)) {
            updateFilterDefinition.call(view, this);
        }
        this.onFilterApplied();
    };
    FlexGridFilter.prototype.clear = function () {
        if (this._filters.length) {
            this._filters = [];
            this.apply();
        }
    };
    FlexGridFilter.prototype.onFilterApplied = function (e) {
        this.filterApplied.raise(this, e);
    };
    FlexGridFilter.prototype.onFilterChanging = function (e) {
        this.filterChanging.raise(this, e);
        return !e.cancel;
    };
    FlexGridFilter.prototype.onFilterChanged = function (e) {
        this.filterChanged.raise(this, e);
    };
    FlexGridFilter.prototype._asColumn = function (col) {
        return wjcCore.isString(col) ? this._g.getColumn(col) :
            wjcCore.isNumber(col) ? this._g.columns[col] :
                wjcCore.asType(col, wjcGrid.Column, false);
    };
    FlexGridFilter.prototype._filter = function (item) {
        for (var i = 0; i < this._filters.length; i++) {
            if (!this._filters[i].apply(item)) {
                return false;
            }
        }
        return true;
    };
    FlexGridFilter.prototype._formatItem = function (sender, e) {
        if (e.panel.cellType == wjcGrid.CellType.ColumnHeader) {
            var g = this._g, rng = g.getMergedRange(e.panel, e.row, e.col) || new wjcGrid.CellRange(e.row, e.col), col = g.columns[rng.col], bcol = g._getBindingColumn(e.panel, e.row, col);
            if (rng.row2 == e.panel.rows.length - 1 || col != bcol) {
                var cf = this.getColumnFilter(bcol, this.defaultFilterType != FilterType.None);
                if (this._filterColumns && this._filterColumns.indexOf(bcol.binding) < 0) {
                    cf = null;
                }
                if (cf && cf.filterType != FilterType.None) {
                    if (this._showIcons) {
                        if (!FlexGridFilter._filterGlyph) {
                            FlexGridFilter._filterGlyph = wjcCore.createElement('<div role="button" class="' + FlexGridFilter._WJC_FILTER + '">' +
                                '<span class="wj-glyph-filter"></span>' +
                                '</div> ');
                        }
                        var cell = (e.cell.querySelector('div') || e.cell), existingGlyph = cell.querySelector('.wj-glyph-filter');
                        if (!existingGlyph) {
                            cell.insertBefore(FlexGridFilter._filterGlyph.cloneNode(true), cell.firstChild);
                        }
                    }
                    wjcCore.toggleClass(e.cell, 'wj-filter-on', cf.isActive);
                    wjcCore.toggleClass(e.cell, 'wj-filter-off', !cf.isActive);
                }
                else {
                    wjcCore.removeClass(e.cell, 'wj-filter-on');
                    wjcCore.removeClass(e.cell, 'wj-filter-off');
                }
            }
        }
    };
    FlexGridFilter.prototype._mousedown = function (e) {
        if (this._toggleEditor(e)) {
            this._tmd = true;
            e.stopPropagation();
            e.preventDefault();
        }
    };
    FlexGridFilter.prototype._click = function (e) {
        if (this._tmd || this._toggleEditor(e)) {
            e.stopPropagation();
            e.preventDefault();
        }
        this._tmd = false;
    };
    FlexGridFilter.prototype._toggleEditor = function (e) {
        var _this = this;
        this._tmd = false;
        if (!e.defaultPrevented && e.button == 0) {
            if (wjcCore.closestClass(e.target, FlexGridFilter._WJC_FILTER)) {
                var g = this._g, ht_1 = new wjcGrid.HitTestInfo(e.target, null);
                if (!ht_1.panel) {
                    ht_1 = g.hitTest(e, true);
                }
                if (ht_1.panel == g.columnHeaders) {
                    var col = g.columns[ht_1.col], bcol_1 = g._getBindingColumn(ht_1.panel, ht_1.row, col);
                    if (this._divEdt && this._edtCol == bcol_1) {
                        this.closeEditor();
                        g.focus();
                    }
                    else {
                        setTimeout(function () {
                            _this.editColumnFilter(bcol_1, ht_1);
                        }, this._divEdt ? 100 : 0);
                    }
                    return true;
                }
            }
            else {
                this.closeEditor();
            }
        }
        return false;
    };
    FlexGridFilter.prototype._keydown = function (e) {
        if (!e.defaultPrevented && !e.ctrlKey && e.altKey) {
            if (e.keyCode == wjcCore.Key.Down || e.keyCode == wjcCore.Key.Up) {
                var sel = this.grid.selection, col = sel.col > -1 ? this.grid.columns[sel.col] : null;
                if (col && !col.dataMap && this.getColumnFilter(col, true)) {
                    this.editColumnFilter(col);
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        }
    };
    FlexGridFilter._WJC_FILTER = 'wj-elem-filter';
    return FlexGridFilter;
}());
exports.FlexGridFilter = FlexGridFilter;
//# sourceMappingURL=wijmo.grid.filter.js.map