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
var wjcGridFilter = require("wijmo/wijmo.grid.filter");
var wjcInput = require("wijmo/wijmo.input");
var wjcGrid = require("wijmo/wijmo.grid");
var wjcChart = require("wijmo/wijmo.chart");
var wjcSelf = require("wijmo/wijmo.olap");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['olap'] = wjcSelf;
'use strict';
var _Tally = (function () {
    function _Tally() {
        this._cnt = 0;
        this._cntn = 0;
        this._sum = 0;
        this._sum2 = 0;
        this._min = null;
        this._max = null;
        this._first = null;
        this._last = null;
    }
    _Tally.prototype.add = function (value, weight) {
        if (value instanceof _Tally) {
            this._sum += value._sum;
            this._sum2 += value._sum2;
            this._max = this._max && value._max ? Math.max(this._max, value._max) : (this._max || value._max);
            this._min = this._min && value._min ? Math.min(this._min, value._min) : (this._min || value._min);
            this._cnt += value._cnt;
            this._cntn += value._cntn;
        }
        else if (value != null) {
            this._cnt++;
            if (wjcCore.isBoolean(value)) {
                value = value ? 1 : 0;
            }
            if (this._min == null || value < this._min) {
                this._min = value;
            }
            if (this._max == null || value > this._max) {
                this._max = value;
            }
            if (this._first == null) {
                this._first = value;
            }
            this._last = value;
            if (wjcCore.isNumber(value) && !isNaN(value)) {
                if (wjcCore.isNumber(weight)) {
                    value *= weight;
                }
                this._cntn++;
                this._sum += value;
                this._sum2 += value * value;
            }
        }
    };
    _Tally.prototype.getAggregate = function (aggregate) {
        if (this._cnt == 0) {
            return null;
        }
        var avg = this._cntn == 0 ? 0 : this._sum / this._cntn;
        switch (aggregate) {
            case wjcCore.Aggregate.Avg:
                return avg;
            case wjcCore.Aggregate.Cnt:
                return this._cnt;
            case wjcCore.Aggregate.Max:
                return this._max;
            case wjcCore.Aggregate.Min:
                return this._min;
            case wjcCore.Aggregate.Rng:
                return this._max - this._min;
            case wjcCore.Aggregate.Sum:
                return this._sum;
            case wjcCore.Aggregate.VarPop:
                return this._cntn <= 1 ? 0 : this._sum2 / this._cntn - avg * avg;
            case wjcCore.Aggregate.StdPop:
                return this._cntn <= 1 ? 0 : Math.sqrt(this._sum2 / this._cntn - avg * avg);
            case wjcCore.Aggregate.Var:
                return this._cntn <= 1 ? 0 : (this._sum2 / this._cntn - avg * avg) * this._cntn / (this._cntn - 1);
            case wjcCore.Aggregate.Std:
                return this._cntn <= 1 ? 0 : Math.sqrt((this._sum2 / this._cntn - avg * avg) * this._cntn / (this._cntn - 1));
            case wjcCore.Aggregate.First:
                return this._first;
            case wjcCore.Aggregate.Last:
                return this._last;
        }
        throw 'Invalid aggregate type.';
    };
    return _Tally;
}());
exports._Tally = _Tally;
'use strict';
var _PivotKey = (function () {
    function _PivotKey(fields, fieldCount, valueFields, valueFieldIndex, item) {
        this._fields = fields;
        this._fieldCount = fieldCount;
        this._valueFields = valueFields;
        this._valueFieldIndex = valueFieldIndex;
        this._item = item;
    }
    Object.defineProperty(_PivotKey.prototype, "fields", {
        get: function () {
            return this._fields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PivotKey.prototype, "valueFields", {
        get: function () {
            return this._valueFields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PivotKey.prototype, "valueField", {
        get: function () {
            return this._valueFields[this._valueFieldIndex];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PivotKey.prototype, "values", {
        get: function () {
            if (this._vals == null) {
                this._vals = new Array(this._fieldCount);
                for (var i = 0; i < this._fieldCount; i++) {
                    var fld = this._fields[i];
                    this._vals[i] = fld._getValue(this._item, false);
                }
            }
            return this._vals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PivotKey.prototype, "fieldNames", {
        get: function () {
            if (!this._names) {
                this._names = [];
                for (var i = 0; i < this.fields.length; i++) {
                    var pf = this._fields[i];
                    this._names.push(pf._getName());
                }
            }
            return this._names;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PivotKey.prototype, "aggregate", {
        get: function () {
            var vf = this._valueFields, idx = this._valueFieldIndex;
            wjcCore.assert(vf && idx > -1 && idx < vf.length, 'aggregate not available for this key');
            return vf[idx].aggregate;
        },
        enumerable: true,
        configurable: true
    });
    _PivotKey.prototype.getValue = function (index, formatted) {
        if (this.values.length == 0) {
            return wjcCore.culture.olap.PivotEngine.grandTotal;
        }
        if (index > this.values.length - 1) {
            return wjcCore.culture.olap.PivotEngine.subTotal;
        }
        var val = this.values[index];
        if (formatted && !wjcCore.isString(val)) {
            var fld = this.fields[index], fmt = fld ? fld.format : '';
            val = wjcCore.Globalize.format(this.values[index], fmt);
        }
        return val;
    };
    Object.defineProperty(_PivotKey.prototype, "level", {
        get: function () {
            return this._fieldCount == this._fields.length
                ? -1
                : this._fieldCount;
        },
        enumerable: true,
        configurable: true
    });
    _PivotKey.prototype.compareTo = function (key) {
        var cmp = 0;
        if (key != null && key._fields == this._fields) {
            var vals = this.values, kvals = key.values, count = Math.min(vals.length, kvals.length);
            for (var i = 0; i < count; i++) {
                var type = vals[i] != null ? wjcCore.getType(vals[i]) : null, ic1 = vals[i], ic2 = kvals[i];
                var fld = this._fields[i];
                if (fld.sortComparer) {
                    cmp = fld.sortComparer(ic1, ic2);
                    if (wjcCore.isNumber(cmp)) {
                        if (cmp != 0) {
                            return fld.descending ? -cmp : cmp;
                        }
                        continue;
                    }
                }
                if (type == wjcCore.DataType.Date) {
                    var fmt = fld.format;
                    if (fmt && fmt != 'd' && fmt != 'D') {
                        var s1 = fld._getValue(this._item, true), s2 = fld._getValue(key._item, true), d1 = wjcCore.Globalize.parseDate(s1, fmt), d2 = wjcCore.Globalize.parseDate(s2, fmt);
                        if (d1 && d2) {
                            ic1 = d1;
                            ic2 = d2;
                        }
                        else {
                            ic1 = s1;
                            ic2 = s2;
                        }
                    }
                }
                var equal = (ic1 == ic2) || wjcCore.DateTime.equals(ic1, ic2);
                if (!equal) {
                    if (ic1 == null)
                        return +1;
                    if (ic2 == null)
                        return -1;
                    cmp = ic1 < ic2 ? -1 : +1;
                    return fld.descending ? -cmp : cmp;
                }
            }
            if (vals.length == kvals.length) {
                cmp = this._valueFieldIndex - key._valueFieldIndex;
                if (cmp != 0) {
                    return cmp;
                }
            }
            cmp = kvals.length - vals.length;
            if (cmp != 0) {
                return cmp * (this.fields.engine.totalsBeforeData ? -1 : +1);
            }
        }
        return 0;
    };
    _PivotKey.prototype.matchesItem = function (item) {
        for (var i = 0; i < this._vals.length; i++) {
            var s1 = this.getValue(i, true), s2 = this._fields[i]._getValue(item, true);
            if (s1 != s2) {
                return false;
            }
        }
        return true;
    };
    _PivotKey.prototype.toString = function () {
        if (!this._key) {
            var key = '';
            for (var i = 0; i < this._fieldCount; i++) {
                var pf = this._fields[i];
                key += pf._getName() + ':' + pf._getValue(this._item, true) + ';';
            }
            if (this._valueFields) {
                var vf = this._valueFields[this._valueFieldIndex];
                key += vf._getName() + ':0;';
            }
            else {
                key += '{total}';
            }
            this._key = key;
        }
        return this._key;
    };
    _PivotKey._ROW_KEY_NAME = '$rowKey';
    return _PivotKey;
}());
exports._PivotKey = _PivotKey;
'use strict';
var _PivotNode = (function () {
    function _PivotNode(fields, fieldCount, valueFields, valueFieldIndex, item, parent) {
        this._key = new _PivotKey(fields, fieldCount, valueFields, valueFieldIndex, item);
        this._nodes = {};
        this._parent = parent;
    }
    _PivotNode.prototype.getNode = function (fields, fieldCount, valueFields, valueFieldIndex, item) {
        var nd = this;
        for (var i = 0; i < fieldCount; i++) {
            var key = fields[i]._getValue(item, true), child = nd._nodes[key];
            if (!child) {
                child = new _PivotNode(fields, i + 1, valueFields, valueFieldIndex, item, nd);
                nd._nodes[key] = child;
            }
            nd = child;
        }
        if (valueFields && valueFieldIndex > -1) {
            var key = valueFields[valueFieldIndex].header, child = nd._nodes[key];
            if (!child) {
                child = new _PivotNode(fields, fieldCount, valueFields, valueFieldIndex, item, nd);
                nd._nodes[key] = child;
            }
            nd = child;
        }
        return nd;
    };
    Object.defineProperty(_PivotNode.prototype, "key", {
        get: function () {
            return this._key;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PivotNode.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PivotNode.prototype, "tree", {
        get: function () {
            if (!this._tree) {
                this._tree = new _PivotNode(null, 0, null, -1, null);
            }
            return this._tree;
        },
        enumerable: true,
        configurable: true
    });
    return _PivotNode;
}());
exports._PivotNode = _PivotNode;
'use strict';
var PivotCollectionView = (function (_super) {
    __extends(PivotCollectionView, _super);
    function PivotCollectionView(engine) {
        var _this = _super.call(this) || this;
        _this._ng = wjcCore.asType(engine, PivotEngine, false);
        return _this;
    }
    Object.defineProperty(PivotCollectionView.prototype, "engine", {
        get: function () {
            return this._ng;
        },
        enumerable: true,
        configurable: true
    });
    PivotCollectionView.prototype._performSort = function (items) {
        var ng = this._ng;
        if (ng.sortableGroups && ng._getShowRowTotals() == ShowTotals.Subtotals) {
            var start = 0, end = items.length - 1;
            if (this._getItemLevel(items[start]) == 0)
                start++;
            if (this._getItemLevel(items[end]) == 0)
                end--;
            this._sortGroups(items, 1, start, end);
        }
        else {
            this._sortData(items);
        }
    };
    PivotCollectionView.prototype._performFilter = function (items) {
        if (this._ng) {
            if (this._ng.valueFields.length == 0 && this._ng.rowFields.length == 0) {
                return [];
            }
        }
        return this.canFilter && this._filter
            ? items.filter(this._filter, this)
            : items;
    };
    PivotCollectionView.prototype._getGroupRange = function (items, item) {
        var ng = this._ng, start = items.indexOf(item), end = start, level = this._getItemLevel(items[start]);
        if (ng.totalsBeforeData) {
            for (end = start; end < items.length - 1; end++) {
                var lvl = this._getItemLevel(items[end + 1]);
                if (lvl > -1 && lvl <= level) {
                    break;
                }
            }
        }
        else {
            for (start = end; start; start--) {
                var lvl = this._getItemLevel(items[start - 1]);
                if (lvl > -1 && lvl <= level) {
                    break;
                }
            }
        }
        return [start, end];
    };
    PivotCollectionView.prototype._sortGroups = function (items, level, start, end) {
        var groups = [];
        for (var i = start; i <= end; i++) {
            if (this._getItemLevel(items[i]) == level) {
                groups.push(items[i]);
            }
        }
        if (!groups.length) {
            this._sortData(items);
            return;
        }
        _super.prototype._performSort.call(this, groups);
        var arr = [];
        for (var i = 0; i < groups.length; i++) {
            var rng = this._getGroupRange(items, groups[i]), len = arr.length;
            for (var j = rng[0]; j <= rng[1]; j++) {
                arr.push(items[j]);
            }
            if (level < this._ng.rowFields.length - 1) {
                this._sortGroups(arr, level + 1, start + len, arr.length - 1);
            }
            else {
                this._sortSegment(arr, start + len, arr.length - 1);
            }
        }
        for (var i = 0; i < arr.length; i++) {
            items[start + i] = arr[i];
        }
    };
    PivotCollectionView.prototype._sortSegment = function (items, start, end) {
        var arr = items.slice(start, end);
        _super.prototype._performSort.call(this, arr);
        for (var i = 0; i < arr.length; i++) {
            items[start + i] = arr[i];
        }
    };
    PivotCollectionView.prototype._sortData = function (items) {
        for (var start = 0; start < items.length; start++) {
            if (this._getItemLevel(items[start]) > -1) {
                continue;
            }
            var end = start;
            for (; end < items.length - 1; end++) {
                if (this._getItemLevel(items[end + 1]) > -1) {
                    break;
                }
            }
            if (end > start) {
                var arr = items.slice(start, end + 1);
                _super.prototype._performSort.call(this, arr);
                for (var i = 0; i < arr.length; i++) {
                    items[start + i] = arr[i];
                }
            }
            start = end;
        }
    };
    PivotCollectionView.prototype._getItemLevel = function (item) {
        var key = item[_PivotKey._ROW_KEY_NAME];
        return key.level;
    };
    return PivotCollectionView;
}(wjcCore.CollectionView));
exports.PivotCollectionView = PivotCollectionView;
'use strict';
var PivotField = (function () {
    function PivotField(engine, binding, header, options) {
        this.propertyChanged = new wjcCore.Event();
        this._ng = engine;
        this._binding = new wjcCore.Binding(binding);
        this._header = header ? header : wjcCore.toHeaderCase(binding);
        this._aggregate = wjcCore.Aggregate.Sum;
        this._showAs = ShowAs.NoCalculation;
        this._isContentHtml = false;
        this._format = '';
        this._filter = new PivotFilter(this);
        if (options) {
            wjcCore.copy(this, options);
        }
    }
    Object.defineProperty(PivotField.prototype, "binding", {
        get: function () {
            return this._binding ? this._binding.path : null;
        },
        set: function (value) {
            if (value != this.binding) {
                var oldValue = this.binding, path = wjcCore.asString(value);
                this._binding = path ? new wjcCore.Binding(path) : null;
                if (!this._dataType && this._ng && this._binding) {
                    var cv = this._ng.collectionView;
                    if (cv && cv.sourceCollection && cv.sourceCollection.length) {
                        var item = cv.sourceCollection[0];
                        this._dataType = wjcCore.getType(this._binding.getValue(item));
                    }
                }
                var e = new wjcCore.PropertyChangedEventArgs('binding', oldValue, value);
                this.onPropertyChanged(e);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotField.prototype, "header", {
        get: function () {
            return this._header;
        },
        set: function (value) {
            value = wjcCore.asString(value, false);
            var fld = this._ng.fields.getField(value);
            if (!value || (fld && fld != this)) {
                wjcCore.assert(false, 'field headers must be unique and non-empty.');
            }
            else {
                this._setProp('_header', wjcCore.asString(value));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotField.prototype, "filter", {
        get: function () {
            return this._filter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotField.prototype, "aggregate", {
        get: function () {
            return this._aggregate;
        },
        set: function (value) {
            this._setProp('_aggregate', wjcCore.asEnum(value, wjcCore.Aggregate));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotField.prototype, "showAs", {
        get: function () {
            return this._showAs;
        },
        set: function (value) {
            this._setProp('_showAs', wjcCore.asEnum(value, ShowAs));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotField.prototype, "weightField", {
        get: function () {
            return this._weightField;
        },
        set: function (value) {
            this._setProp('_weightField', wjcCore.asType(value, PivotField, true));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotField.prototype, "dataType", {
        get: function () {
            return this._dataType;
        },
        set: function (value) {
            this._setProp('_dataType', wjcCore.asEnum(value, wjcCore.DataType));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotField.prototype, "isMeasure", {
        get: function () {
            return this._dataType == wjcCore.DataType.Number;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotField.prototype, "format", {
        get: function () {
            return this._format;
        },
        set: function (value) {
            this._setProp('_format', wjcCore.asString(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotField.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._setProp('_width', wjcCore.asNumber(value, true, true));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotField.prototype, "wordWrap", {
        get: function () {
            return this._wordWrap;
        },
        set: function (value) {
            this._setProp('_wordWrap', wjcCore.asBoolean(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotField.prototype, "descending", {
        get: function () {
            return this._descending ? true : false;
        },
        set: function (value) {
            this._setProp('_descending', wjcCore.asBoolean(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotField.prototype, "isContentHtml", {
        get: function () {
            return this._isContentHtml;
        },
        set: function (value) {
            this._setProp('_isContentHtml', wjcCore.asBoolean(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotField.prototype, "sortComparer", {
        get: function () {
            return this._srtCmp;
        },
        set: function (value) {
            if (value != this.sortComparer) {
                this._srtCmp = wjcCore.asFunction(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotField.prototype, "engine", {
        get: function () {
            return this._ng;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotField.prototype, "collectionView", {
        get: function () {
            return this.engine ? this.engine.collectionView : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotField.prototype, "isActive", {
        get: function () {
            return this._getIsActive();
        },
        set: function (value) {
            this._setIsActive(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotField.prototype, "parentField", {
        get: function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotField.prototype, "key", {
        get: function () {
            return this.header;
        },
        enumerable: true,
        configurable: true
    });
    PivotField.prototype.onPropertyChanged = function (e) {
        this.propertyChanged.raise(this, e);
        this._ng._fieldPropertyChanged(this, e);
    };
    PivotField.prototype._getIsActive = function () {
        if (this._ng) {
            var lists = this._ng._viewLists;
            for (var i = 0; i < lists.length; i++) {
                var list = lists[i];
                for (var j = 0; j < list.length; j++) {
                    if (list[j].binding == this.binding) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    PivotField.prototype._setIsActive = function (value) {
        if (this._ng) {
            var isActive = this.isActive;
            value = wjcCore.asBoolean(value);
            if (value != isActive) {
                if (value) {
                    if (this.isMeasure) {
                        this._ng.valueFields.push(this);
                    }
                    else {
                        this._ng.rowFields.push(this);
                    }
                }
                else {
                    var lists = this._ng._viewLists;
                    for (var i = 0; i < lists.length; i++) {
                        var list_1 = lists[i];
                        for (var f = 0; f < list_1.length; f++) {
                            var fld = list_1[f];
                            if (fld == this || fld.parentField == this) {
                                list_1.removeAt(f);
                                f--;
                            }
                        }
                    }
                    var list = this._ng.fields;
                    for (var f = list.length - 1; f >= 0; f--) {
                        var fld = list[f];
                        if (fld.parentField == this) {
                            list.removeAt(f);
                            f--;
                        }
                    }
                }
            }
        }
    };
    PivotField.prototype._clone = function () {
        var clone = new PivotField(this._ng, this.binding);
        this._ng._copyProps(clone, this, PivotField._props);
        clone._autoGenerated = true;
        clone._parent = this;
        var hdr = this.header.replace(/\d+$/, '');
        for (var i = 2;; i++) {
            var hdrn = hdr + i.toString();
            if (this._ng.fields.getField(hdrn) == null) {
                clone._header = hdrn;
                break;
            }
        }
        return clone;
    };
    PivotField.prototype._setProp = function (name, value, member) {
        var oldValue = this[name];
        if (value != oldValue) {
            this[name] = value;
            var e = new wjcCore.PropertyChangedEventArgs(name.substr(1), oldValue, value);
            this.onPropertyChanged(e);
        }
    };
    PivotField.prototype._getName = function () {
        return this.header || this.binding;
    };
    PivotField.prototype._getValue = function (item, formatted) {
        var value = this._binding._key
            ? item[this._binding._key]
            : this._binding.getValue(item);
        return !formatted || typeof (value) == 'string'
            ? value
            : wjcCore.Globalize.format(value, this._format);
    };
    PivotField.prototype._getWeight = function (item) {
        var value = this._weightField ? this._weightField._getValue(item, false) : null;
        return wjcCore.isNumber(value) ? value : null;
    };
    PivotField._props = [
        'dataType',
        'format',
        'width',
        'wordWrap',
        'aggregate',
        'showAs',
        'descending',
        'isContentHtml'
    ];
    return PivotField;
}());
exports.PivotField = PivotField;
var CubePivotField = (function (_super) {
    __extends(CubePivotField, _super);
    function CubePivotField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CubePivotField.prototype, "header", {
        get: function () {
            return this._header;
        },
        set: function (value) {
            this._setProp('_header', wjcCore.asString(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CubePivotField.prototype, "dimensionType", {
        get: function () {
            return this._dimensionType;
        },
        set: function (value) {
            this._setProp('_dimensionType', wjcCore.asEnum(value, DimensionType, false));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CubePivotField.prototype, "isMeasure", {
        get: function () {
            switch (this._dimensionType) {
                case 1:
                case 8:
                    return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CubePivotField.prototype, "subFields", {
        get: function () {
            return this._subFields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CubePivotField.prototype, "key", {
        get: function () {
            return this.binding;
        },
        enumerable: true,
        configurable: true
    });
    CubePivotField.prototype._clone = function () {
        throw 'CubePivotField objects cannot be cloned';
    };
    CubePivotField.prototype._copy = function (key, value) {
        var _this = this;
        if (key == 'subFields') {
            if (!this._subFields) {
                this._subFields = [];
            }
            else {
                this._subFields.splice(0, this._subFields.length);
            }
            if (value && value.length) {
                value.forEach(function (subField) {
                    var fld = _this.engine._createField(subField, _this._autoGenerated);
                    _this._subFields.push(fld);
                });
            }
            return true;
        }
        return false;
    };
    CubePivotField.prototype._getIsActive = function () {
        if (this.subFields && this.subFields.length) {
            return false;
        }
        return _super.prototype._getIsActive.call(this);
    };
    CubePivotField.prototype._setIsActive = function (value) {
        if (this.subFields && this.subFields.length) {
            return;
        }
        _super.prototype._setIsActive.call(this, value);
    };
    return CubePivotField;
}(PivotField));
exports.CubePivotField = CubePivotField;
var DimensionType;
(function (DimensionType) {
    DimensionType[DimensionType["Dimension"] = 0] = "Dimension";
    DimensionType[DimensionType["Measure"] = 1] = "Measure";
    DimensionType[DimensionType["Kpi"] = 2] = "Kpi";
    DimensionType[DimensionType["NameSet"] = 3] = "NameSet";
    DimensionType[DimensionType["Attribute"] = 4] = "Attribute";
    DimensionType[DimensionType["Folder"] = 5] = "Folder";
    DimensionType[DimensionType["Hierarchy"] = 6] = "Hierarchy";
    DimensionType[DimensionType["Date"] = 7] = "Date";
    DimensionType[DimensionType["Currency"] = 8] = "Currency";
})(DimensionType = exports.DimensionType || (exports.DimensionType = {}));
'use strict';
var PivotFieldCollection = (function (_super) {
    __extends(PivotFieldCollection, _super);
    function PivotFieldCollection(engine) {
        var _this = _super.call(this) || this;
        _this._ng = engine;
        return _this;
    }
    Object.defineProperty(PivotFieldCollection.prototype, "maxItems", {
        get: function () {
            return this._maxItems;
        },
        set: function (value) {
            this._maxItems = wjcCore.asInt(value, true, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotFieldCollection.prototype, "engine", {
        get: function () {
            return this._ng;
        },
        enumerable: true,
        configurable: true
    });
    PivotFieldCollection.prototype.getField = function (key) {
        return this._getField(this, key);
    };
    PivotFieldCollection.prototype._getField = function (fields, key) {
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            if (field.key == key) {
                return field;
            }
            if (field instanceof CubePivotField && field.subFields) {
                field = this._getField(field.subFields, key);
                if (field) {
                    return field;
                }
            }
        }
        return null;
    };
    PivotFieldCollection.prototype.push = function () {
        var item = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            item[_i] = arguments[_i];
        }
        var ng = this._ng;
        for (var i = 0; item && i < item.length; i++) {
            var fld = item[i];
            if (wjcCore.isString(fld)) {
                fld = this == ng.fields
                    ? new PivotField(ng, fld)
                    : ng.fields.getField(fld);
            }
            wjcCore.assert(fld instanceof PivotField, 'This collection must contain PivotField objects only.');
            if (fld.key && this.getField(fld.key)) {
                wjcCore.assert(false, 'PivotField keys must be unique.');
                return -1;
            }
            if (this._maxItems != null && this.length >= this._maxItems) {
                break;
            }
            _super.prototype.push.call(this, fld);
        }
        return this.length;
    };
    return PivotFieldCollection;
}(wjcCore.ObservableArray));
exports.PivotFieldCollection = PivotFieldCollection;
'use strict';
var PivotFilter = (function () {
    function PivotFilter(field) {
        this._fld = field;
        var col = field;
        this._valueFilter = new wjcGridFilter.ValueFilter(col);
        this._conditionFilter = new wjcGridFilter.ConditionFilter(col);
    }
    Object.defineProperty(PivotFilter.prototype, "filterType", {
        get: function () {
            return this._filterType != null ? this._filterType : this._fld.engine.defaultFilterType;
        },
        set: function (value) {
            if (value != this._filterType) {
                this._filterType = wjcCore.asEnum(value, wjcGridFilter.FilterType, true);
                this.clear();
            }
        },
        enumerable: true,
        configurable: true
    });
    PivotFilter.prototype.apply = function (value) {
        return this._conditionFilter.apply(value) && this._valueFilter.apply(value);
    };
    Object.defineProperty(PivotFilter.prototype, "isActive", {
        get: function () {
            return this._conditionFilter.isActive || this._valueFilter.isActive;
        },
        enumerable: true,
        configurable: true
    });
    PivotFilter.prototype.clear = function () {
        var changed = false;
        if (this._valueFilter.isActive) {
            this._valueFilter.clear();
            changed = true;
        }
        if (this._conditionFilter.isActive) {
            this._valueFilter.clear();
            changed = true;
        }
        if (changed) {
            this._fld.onPropertyChanged(new wjcCore.PropertyChangedEventArgs('filter', null, null));
        }
    };
    Object.defineProperty(PivotFilter.prototype, "valueFilter", {
        get: function () {
            return this._valueFilter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotFilter.prototype, "conditionFilter", {
        get: function () {
            return this._conditionFilter;
        },
        enumerable: true,
        configurable: true
    });
    return PivotFilter;
}());
exports.PivotFilter = PivotFilter;
'use strict';
wjcCore.culture.olap = wjcCore.culture.olap || {};
wjcCore.culture.olap.PivotFieldEditor = window['wijmo'].culture.olap.PivotFieldEditor || {
    dialogHeader: 'Field settings:',
    header: 'Header:',
    summary: 'Summary:',
    showAs: 'Show As:',
    weighBy: 'Weigh by:',
    sort: 'Sort:',
    filter: 'Filter:',
    format: 'Format:',
    sample: 'Sample:',
    edit: 'Edit...',
    clear: 'Clear',
    ok: 'OK',
    cancel: 'Cancel',
    none: '(none)',
    sorts: {
        asc: 'Ascending',
        desc: 'Descending'
    },
    aggs: {
        sum: 'Sum',
        cnt: 'Count',
        avg: 'Average',
        max: 'Max',
        min: 'Min',
        rng: 'Range',
        std: 'StdDev',
        var: 'Var',
        stdp: 'StdDevPop',
        varp: 'VarPop',
        first: 'First',
        last: 'Last'
    },
    calcs: {
        noCalc: 'No calculation',
        dRow: 'Difference from previous row',
        dRowPct: '% Difference from previous row',
        dCol: 'Difference from previous column',
        dColPct: '% Difference from previous column',
        dPctGrand: '% of grand total',
        dPctRow: '% of row total',
        dPctCol: '% of column total',
        dRunTot: 'Running total',
        dRunTotPct: '% running total'
    },
    formats: {
        n0: 'Integer (n0)',
        n2: 'Float (n2)',
        c: 'Currency (c)',
        p0: 'Percentage (p0)',
        p2: 'Percentage (p2)',
        n2c: 'Thousands (n2,)',
        n2cc: 'Millions (n2,,)',
        n2ccc: 'Billions (n2,,,)',
        d: 'Date (d)',
        MMMMddyyyy: 'Month Day Year (MMMM dd, yyyy)',
        dMyy: 'Day Month Year (d/M/yy)',
        ddMyy: 'Day Month Year (dd/M/yy)',
        dMyyyy: 'Day Month Year (dd/M/yyyy)',
        MMMyyyy: 'Month Year (MMM yyyy)',
        MMMMyyyy: 'Month Year (MMMM yyyy)',
        yyyy: 'Year (yyyy)',
        yyyyQq: 'Year Quarter (yyyy "Q"q)',
        FYEEEEQU: 'Fiscal Year Quarter ("FY"EEEE "Q"U)'
    }
};
var PivotFieldEditor = (function (_super) {
    __extends(PivotFieldEditor, _super);
    function PivotFieldEditor(element, options) {
        var _this = _super.call(this, element, null, true) || this;
        var depErr = 'Missing dependency: PivotFieldEditor requires ';
        wjcCore.assert(wjcInput != null, depErr + 'wijmo.input.');
        _this.hostElement.tabIndex = -1;
        var tpl = _this.getTemplate();
        _this.applyTemplate('wj-control wj-content wj-pivotfieldeditor', tpl, {
            _dBnd: 'sp-bnd',
            _dHdr: 'div-hdr',
            _dAgg: 'div-agg',
            _dShw: 'div-shw',
            _dWFl: 'div-wfl',
            _dSrt: 'div-srt',
            _btnFltEdt: 'btn-flt-edt',
            _btnFltClr: 'btn-flt-clr',
            _dFmt: 'div-fmt',
            _dSmp: 'div-smp',
            _btnApply: 'btn-apply',
            _btnCancel: 'btn-cancel',
            _gDlg: 'g-dlg',
            _gHdr: 'g-hdr',
            _gAgg: 'g-agg',
            _gShw: 'g-shw',
            _gWfl: 'g-wfl',
            _gSrt: 'g-srt',
            _gFlt: 'g-flt',
            _gFmt: 'g-fmt',
            _gSmp: 'g-smp'
        });
        _this._pvDate = new Date();
        var g = wjcCore.culture.olap.PivotFieldEditor;
        wjcCore.setText(_this._gDlg, g.dialogHeader);
        wjcCore.setText(_this._gHdr, g.header);
        wjcCore.setText(_this._gAgg, g.summary);
        wjcCore.setText(_this._gShw, g.showAs),
            wjcCore.setText(_this._gWfl, g.weighBy);
        wjcCore.setText(_this._gSrt, g.sort);
        wjcCore.setText(_this._gFlt, g.filter);
        wjcCore.setText(_this._gFmt, g.format);
        wjcCore.setText(_this._gSmp, g.sample);
        wjcCore.setText(_this._btnFltEdt, g.edit);
        wjcCore.setText(_this._btnFltClr, g.clear);
        wjcCore.setText(_this._btnApply, g.ok);
        wjcCore.setText(_this._btnCancel, g.cancel);
        _this._cmbHdr = new wjcInput.ComboBox(_this._dHdr);
        _this._cmbAgg = new wjcInput.ComboBox(_this._dAgg);
        _this._cmbShw = new wjcInput.ComboBox(_this._dShw);
        _this._cmbWFl = new wjcInput.ComboBox(_this._dWFl);
        _this._cmbSrt = new wjcInput.ComboBox(_this._dSrt);
        _this._cmbFmt = new wjcInput.ComboBox(_this._dFmt);
        _this._cmbSmp = new wjcInput.ComboBox(_this._dSmp);
        _this._initAggregateOptions();
        _this._initShowAsOptions();
        _this._initFormatOptions();
        _this._initSortOptions();
        _this._updatePreview();
        _this._cmbShw.textChanged.addHandler(_this._updateFormat, _this);
        _this._cmbFmt.textChanged.addHandler(_this._updatePreview, _this);
        _this.addEventListener(_this._btnFltEdt, 'click', function (e) {
            _this._editFilter();
            e.preventDefault();
        });
        _this.addEventListener(_this._btnFltClr, 'click', function (e) {
            wjcCore.enable(_this._btnFltClr, false);
            _this._createFilterEditor();
            setTimeout(function () {
                _this._eFlt.clearEditor();
            });
            e.preventDefault();
        });
        _this.addEventListener(_this._btnApply, 'click', function (e) {
            _this.updateField();
        });
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(PivotFieldEditor.prototype, "field", {
        get: function () {
            return this._fld;
        },
        set: function (value) {
            if (value != this._fld) {
                this._fld = wjcCore.asType(value, PivotField);
                this.updateEditor();
            }
        },
        enumerable: true,
        configurable: true
    });
    PivotFieldEditor.prototype.updateEditor = function () {
        if (this._fld) {
            this._dBnd.textContent = this._fld.binding;
            this._cmbHdr.text = this._fld.header;
            this._cmbAgg.collectionView.refresh();
            this._cmbAgg.selectedValue = this._fld.aggregate;
            this._cmbSrt.selectedValue = this._fld.descending;
            this._cmbShw.selectedValue = this._fld.showAs;
            this._initWeighByOptions();
            wjcCore.enable(this._btnFltClr, this._fld.filter.isActive);
            this._cmbFmt.collectionView.refresh();
            this._cmbFmt.selectedValue = this._fld.format;
            if (!this._cmbFmt.selectedValue) {
                this._cmbFmt.text = this._fld.format;
            }
            var isCube = this._fld instanceof CubePivotField;
            this._cmbAgg.isDisabled = isCube;
            this._cmbWFl.isDisabled = isCube;
        }
    };
    PivotFieldEditor.prototype.updateField = function () {
        if (this._fld) {
            var hdr = this._cmbHdr.text.trim();
            this._fld.header = hdr ? hdr : wjcCore.toHeaderCase(this._fld.binding);
            this._fld.aggregate = this._cmbAgg.selectedValue;
            this._fld.showAs = this._cmbShw.selectedValue;
            this._fld.weightField = this._cmbWFl.selectedValue;
            this._fld.descending = this._cmbSrt.selectedValue;
            if (this._eFlt) {
                this._eFlt.updateFilter();
            }
            this._fld.format = this._cmbFmt.selectedValue || this._cmbFmt.text;
        }
    };
    PivotFieldEditor.prototype._initAggregateOptions = function () {
        var _this = this;
        var g = wjcCore.culture.olap.PivotFieldEditor.aggs, agg = wjcCore.Aggregate, list = [
            { key: g.sum, val: agg.Sum, all: false },
            { key: g.cnt, val: agg.Cnt, all: true },
            { key: g.avg, val: agg.Avg, all: false },
            { key: g.max, val: agg.Max, all: true },
            { key: g.min, val: agg.Min, all: true },
            { key: g.rng, val: agg.Rng, all: false },
            { key: g.std, val: agg.Std, all: false },
            { key: g.var, val: agg.Var, all: false },
            { key: g.stdp, val: agg.StdPop, all: false },
            { key: g.varp, val: agg.VarPop, all: false },
            { key: g.first, val: agg.First, all: true },
            { key: g.last, val: agg.Last, all: true },
        ];
        this._cmbAgg.itemsSource = list;
        this._cmbAgg.collectionView.filter = function (item) {
            if (item && item.all) {
                return true;
            }
            if (_this._fld) {
                var dt = _this._fld.dataType;
                return dt == wjcCore.DataType.Number || dt == wjcCore.DataType.Boolean;
            }
            return false;
        };
        this._cmbAgg.initialize({
            displayMemberPath: 'key',
            selectedValuePath: 'val'
        });
    };
    PivotFieldEditor.prototype._initShowAsOptions = function () {
        var g = wjcCore.culture.olap.PivotFieldEditor.calcs, list = [
            { key: g.noCalc, val: ShowAs.NoCalculation },
            { key: g.dRow, val: ShowAs.DiffRow },
            { key: g.dRowPct, val: ShowAs.DiffRowPct },
            { key: g.dCol, val: ShowAs.DiffCol },
            { key: g.dColPct, val: ShowAs.DiffColPct },
            { key: g.dPctGrand, val: ShowAs.PctGrand },
            { key: g.dPctRow, val: ShowAs.PctRow },
            { key: g.dPctCol, val: ShowAs.PctCol },
            { key: g.dRunTot, val: ShowAs.RunTot },
            { key: g.dRunTotPct, val: ShowAs.RunTotPct }
        ];
        this._cmbShw.itemsSource = list;
        this._cmbShw.initialize({
            displayMemberPath: 'key',
            selectedValuePath: 'val'
        });
    };
    PivotFieldEditor.prototype._initFormatOptions = function () {
        var _this = this;
        var g = wjcCore.culture.olap.PivotFieldEditor.formats, list = [
            { key: g.n0, val: 'n0', all: true },
            { key: g.n2, val: 'n2', all: true },
            { key: g.c, val: 'c', all: true },
            { key: g.p0, val: 'p0', all: true },
            { key: g.p2, val: 'p2', all: true },
            { key: g.n2c, val: 'n2,', all: true },
            { key: g.n2cc, val: 'n2,,', all: true },
            { key: g.n2ccc, val: 'n2,,,', all: true },
            { key: g.d, val: 'd', all: false },
            { key: g.MMMMddyyyy, val: 'MMMM dd, yyyy', all: false },
            { key: g.dMyy, val: 'd/M/yy', all: false },
            { key: g.ddMyy, val: 'dd/M/yy', all: false },
            { key: g.dMyyyy, val: 'dd/M/yyyy', all: false },
            { key: g.MMMyyyy, val: 'MMM yyyy', all: false },
            { key: g.MMMMyyyy, val: 'MMMM yyyy', all: false },
            { key: g.yyyy, val: 'yyyy', all: false },
            { key: g.yyyyQq, val: 'yyyy "Q"q', all: false },
            { key: g.FYEEEEQU, val: '"FY"EEEE "Q"U', all: false }
        ];
        this._cmbFmt.itemsSource = list;
        this._cmbFmt.isEditable = true;
        this._cmbFmt.isRequired = false;
        this._cmbFmt.collectionView.filter = function (item) {
            if (item && item.all) {
                return true;
            }
            if (_this._fld) {
                return _this._fld.dataType == wjcCore.DataType.Date;
            }
            return false;
        };
        this._cmbFmt.initialize({
            displayMemberPath: 'key',
            selectedValuePath: 'val'
        });
    };
    PivotFieldEditor.prototype._initWeighByOptions = function () {
        var list = [
            { key: wjcCore.culture.olap.PivotFieldEditor.none, val: null }
        ];
        if (this._fld) {
            var ng = this._fld.engine;
            for (var i = 0; i < ng.fields.length; i++) {
                var wbf = ng.fields[i];
                if (wbf != this._fld && wbf.dataType == wjcCore.DataType.Number) {
                    list.push({ key: wbf.header, val: wbf });
                }
            }
        }
        this._cmbWFl.initialize({
            displayMemberPath: 'key',
            selectedValuePath: 'val',
            itemsSource: list,
            selectedValue: this._fld.weightField
        });
    };
    PivotFieldEditor.prototype._initSortOptions = function () {
        var g = wjcCore.culture.olap.PivotFieldEditor.sorts, list = [
            { key: g.asc, val: false },
            { key: g.desc, val: true }
        ];
        this._cmbSrt.itemsSource = list;
        this._cmbSrt.initialize({
            displayMemberPath: 'key',
            selectedValuePath: 'val'
        });
    };
    PivotFieldEditor.prototype._updateFormat = function () {
        switch (this._cmbShw.selectedValue) {
            case ShowAs.DiffRowPct:
            case ShowAs.DiffColPct:
                this._cmbFmt.selectedValue = 'p0';
                break;
            default:
                this._cmbFmt.selectedValue = 'n0';
                break;
        }
    };
    PivotFieldEditor.prototype._updatePreview = function () {
        var fmt = this._cmbFmt.selectedValue || this._cmbFmt.text, fmtFn = wjcCore.Globalize.format, sample = '';
        if (fmt) {
            var ft = fmt[0].toLowerCase(), nf = 'nfgxc';
            if (nf.indexOf(ft) > -1) {
                sample = fmtFn(1234.5678, fmt);
            }
            else if (ft == 'p') {
                sample = fmtFn(0.12345678, fmt);
            }
            else {
                sample = fmtFn(this._pvDate, fmt);
            }
        }
        this._cmbSmp.text = sample;
    };
    PivotFieldEditor.prototype._editFilter = function () {
        this._createFilterEditor();
        wjcCore.showPopup(this._dFlt, this._btnFltEdt, false, false, false);
        wjcCore.moveFocus(this._dFlt, 0);
    };
    PivotFieldEditor.prototype._createFilterEditor = function () {
        var _this = this;
        if (!this._dFlt) {
            this._dFlt = document.createElement('div');
            this._eFlt = new PivotFilterEditor(this._dFlt, this._fld);
            wjcCore.addClass(this._dFlt, 'wj-dropdown-panel');
            this._eFlt.lostFocus.addHandler(function () {
                setTimeout(function () {
                    var ctl = wjcCore.Control.getControl(_this._dFlt);
                    if (ctl && !ctl.containsFocus()) {
                        _this._closeFilter();
                    }
                }, 10);
            });
            this._eFlt.finishEditing.addHandler(function () {
                _this._closeFilter();
                wjcCore.enable(_this._btnFltClr, true);
            });
        }
    };
    PivotFieldEditor.prototype._closeFilter = function () {
        if (this._dFlt) {
            wjcCore.hidePopup(this._dFlt, true);
            this.focus();
        }
    };
    PivotFieldEditor.controlTemplate = '<div>' +
        '<div class="wj-dialog-header" tabindex="-1">' +
        '<span wj-part="g-dlg"></span> <span wj-part="sp-bnd"></span>' +
        '</div>' +
        '<div class="wj-dialog-body">' +
        '<table style="table-layout:fixed">' +
        '<tr>' +
        '<td wj-part="g-hdr"></td>' +
        '<td><div wj-part="div-hdr"></div></td>' +
        '</tr>' +
        '<tr class="wj-separator">' +
        '<td wj-part="g-agg"></td>' +
        '<td><div wj-part="div-agg"></div></td>' +
        '</tr>' +
        '<tr class="wj-separator">' +
        '<td wj-part="g-shw"></td>' +
        '<td><div wj-part="div-shw"></div></td>' +
        '</tr>' +
        '<tr>' +
        '<td wj-part="g-wfl"></td>' +
        '<td><div wj-part="div-wfl"></div></td>' +
        '</tr>' +
        '<tr>' +
        '<td wj-part="g-srt"></td>' +
        '<td><div wj-part="div-srt"></div></td>' +
        '</tr>' +
        '<tr class="wj-separator">' +
        '<td wj-part="g-flt"></td>' +
        '<td>' +
        '<a wj-part="btn-flt-edt" href= "" draggable="false"></a>&nbsp;&nbsp;' +
        '<a wj-part="btn-flt-clr" href= "" draggable="false"></a>' +
        '</td>' +
        '</tr>' +
        '<tr class="wj-separator">' +
        '<td wj-part="g-fmt"></td>' +
        '<td><div wj-part="div-fmt"></div></td>' +
        '</tr>' +
        '<tr>' +
        '<td wj-part="g-smp"></td>' +
        '<td><div wj-part="div-smp" readonly disabled tabindex="-1"></div></td>' +
        '</tr>' +
        '</table>' +
        '</div>' +
        '<div class="wj-dialog-footer">' +
        '<a class="wj-hide" wj-part="btn-apply" href="" draggable="false"></a>&nbsp;&nbsp;' +
        '<a class="wj-hide" wj-part="btn-cancel" href="" draggable="false"></a>' +
        '</div>' +
        '</div>';
    return PivotFieldEditor;
}(wjcCore.Control));
exports.PivotFieldEditor = PivotFieldEditor;
'use strict';
var PivotFilterEditor = (function (_super) {
    __extends(PivotFilterEditor, _super);
    function PivotFilterEditor(element, field, options) {
        var _this = _super.call(this, element) || this;
        _this.finishEditing = new wjcCore.Event();
        var depErr = 'Missing dependency: PivotFilterEditor requires ';
        wjcCore.assert(wjcInput != null, depErr + 'wijmo.input.');
        _this.hostElement.tabIndex = -1;
        var tpl = _this.getTemplate();
        _this.applyTemplate('wj-control wj-pivotfiltereditor wj-content', tpl, {
            _divType: 'div-type',
            _aVal: 'a-val',
            _aCnd: 'a-cnd',
            _divEdtVal: 'div-edt-val',
            _divEdtCnd: 'div-edt-cnd',
            _btnOk: 'btn-ok'
        });
        wjcCore.setText(_this._aVal, wjcCore.culture.FlexGridFilter.values);
        wjcCore.setText(_this._aCnd, wjcCore.culture.FlexGridFilter.conditions);
        wjcCore.setText(_this._btnOk, wjcCore.culture.olap.PivotFieldEditor.ok);
        var bnd = _this._btnClicked.bind(_this);
        _this.addEventListener(_this._btnOk, 'click', bnd);
        _this.addEventListener(_this._aVal, 'click', bnd);
        _this.addEventListener(_this._aCnd, 'click', bnd);
        _this.addEventListener(_this.hostElement, 'keydown', function (e) {
            switch (e.keyCode) {
                case wjcCore.Key.Enter:
                    switch (e.target.tagName) {
                        case 'A':
                        case 'BUTTON':
                            _this._btnClicked(e);
                            break;
                        default:
                            _this.onFinishEditing(new wjcCore.CancelEventArgs());
                            break;
                    }
                    e.preventDefault();
                    break;
                case wjcCore.Key.Escape:
                    _this.onFinishEditing(new wjcCore.CancelEventArgs());
                    e.preventDefault();
                    break;
                case wjcCore.Key.Tab:
                    wjcCore.moveFocus(_this.hostElement, e.shiftKey ? -1 : +1);
                    e.preventDefault();
                    break;
            }
        });
        _this._fld = field;
        _this.initialize(options);
        _this.updateEditor();
        return _this;
    }
    Object.defineProperty(PivotFilterEditor.prototype, "field", {
        get: function () {
            return this._fld;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotFilterEditor.prototype, "filter", {
        get: function () {
            return this._fld ? this._fld.filter : null;
        },
        enumerable: true,
        configurable: true
    });
    PivotFilterEditor.prototype.updateEditor = function () {
        var ft = wjcGridFilter.FilterType.None;
        if (this.filter) {
            ft = (this.filter.conditionFilter.isActive || (this.filter.filterType & wjcGridFilter.FilterType.Value) == 0)
                ? wjcGridFilter.FilterType.Condition
                : wjcGridFilter.FilterType.Value;
            this._showFilter(ft);
        }
        if (this._edtVal) {
            this._edtVal.updateEditor();
        }
        if (this._edtCnd) {
            this._edtCnd.updateEditor();
        }
    };
    PivotFilterEditor.prototype.updateFilter = function () {
        switch (this._getFilterType()) {
            case wjcGridFilter.FilterType.Value:
                this._edtVal.updateFilter();
                this.filter.conditionFilter.clear();
                break;
            case wjcGridFilter.FilterType.Condition:
                this._edtCnd.updateFilter();
                this.filter.valueFilter.clear();
                break;
        }
        this.field.onPropertyChanged(new wjcCore.PropertyChangedEventArgs('filter', null, null));
    };
    PivotFilterEditor.prototype.clearEditor = function () {
        if (this._edtVal) {
            this._edtVal.clearEditor();
        }
        if (this._edtCnd) {
            this._edtCnd.clearEditor();
        }
    };
    PivotFilterEditor.prototype.onFinishEditing = function (e) {
        this.finishEditing.raise(this, e);
        return !e.cancel;
    };
    PivotFilterEditor.prototype._showFilter = function (filterType) {
        if (filterType == wjcGridFilter.FilterType.Value && this._edtVal == null) {
            this._edtVal = new wjcGridFilter.ValueFilterEditor(this._divEdtVal, this.filter.valueFilter);
        }
        if (filterType == wjcGridFilter.FilterType.Condition && this._edtCnd == null) {
            this._edtCnd = new wjcGridFilter.ConditionFilterEditor(this._divEdtCnd, this.filter.conditionFilter);
        }
        if ((filterType & this.filter.filterType) != 0) {
            if (filterType == wjcGridFilter.FilterType.Value) {
                this._divEdtVal.style.display = '';
                this._divEdtCnd.style.display = 'none';
                this._enableLink(this._aVal, false);
                this._enableLink(this._aCnd, true);
            }
            else {
                this._divEdtVal.style.display = 'none';
                this._divEdtCnd.style.display = '';
                this._enableLink(this._aVal, true);
                this._enableLink(this._aCnd, false);
            }
        }
        switch (this.filter.filterType) {
            case wjcGridFilter.FilterType.None:
            case wjcGridFilter.FilterType.Condition:
            case wjcGridFilter.FilterType.Value:
                this._divType.style.display = 'none';
                break;
            default:
                this._divType.style.display = '';
                break;
        }
    };
    PivotFilterEditor.prototype._enableLink = function (a, enable) {
        a.style.textDecoration = enable ? '' : 'none';
        a.style.fontWeight = enable ? '' : 'bold';
        wjcCore.setAttribute(a, 'href', enable ? '' : null);
    };
    PivotFilterEditor.prototype._getFilterType = function () {
        return this._divEdtVal.style.display != 'none'
            ? wjcGridFilter.FilterType.Value
            : wjcGridFilter.FilterType.Condition;
    };
    PivotFilterEditor.prototype._btnClicked = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (wjcCore.hasClass(e.target, 'wj-state-disabled')) {
            return;
        }
        if (e.target == this._aVal) {
            this._showFilter(wjcGridFilter.FilterType.Value);
            wjcCore.moveFocus(this._edtVal.hostElement, 0);
            return;
        }
        if (e.target == this._aCnd) {
            this._showFilter(wjcGridFilter.FilterType.Condition);
            wjcCore.moveFocus(this._edtCnd.hostElement, 0);
            return;
        }
        this.onFinishEditing(new wjcCore.CancelEventArgs());
    };
    PivotFilterEditor.controlTemplate = '<div>' +
        '<div wj-part="div-type" style="text-align:center;margin-bottom:12px;font-size:80%">' +
        '<a wj-part="a-cnd" href="" tabindex="-1" draggable="false"></a>' +
        '&nbsp;|&nbsp;' +
        '<a wj-part="a-val" href="" tabindex="-1" draggable="false"></a>' +
        '</div>' +
        '<div wj-part="div-edt-val"></div>' +
        '<div wj-part="div-edt-cnd"></div>' +
        '<div style="text-align:right;margin-top:10px">' +
        '<a wj-part="btn-ok" href="" draggable="false"></a>' +
        '</div>';
    return PivotFilterEditor;
}(wjcCore.Control));
exports.PivotFilterEditor = PivotFilterEditor;
'use strict';
wjcCore.culture.olap = wjcCore.culture.olap || {};
wjcCore.culture.olap.PivotEngine = window['wijmo'].culture.olap.PivotEngine || {
    grandTotal: 'Grand Total',
    subTotal: 'Subtotal'
};
var ShowTotals;
(function (ShowTotals) {
    ShowTotals[ShowTotals["None"] = 0] = "None";
    ShowTotals[ShowTotals["GrandTotals"] = 1] = "GrandTotals";
    ShowTotals[ShowTotals["Subtotals"] = 2] = "Subtotals";
})(ShowTotals = exports.ShowTotals || (exports.ShowTotals = {}));
var ShowAs;
(function (ShowAs) {
    ShowAs[ShowAs["NoCalculation"] = 0] = "NoCalculation";
    ShowAs[ShowAs["DiffRow"] = 1] = "DiffRow";
    ShowAs[ShowAs["DiffRowPct"] = 2] = "DiffRowPct";
    ShowAs[ShowAs["DiffCol"] = 3] = "DiffCol";
    ShowAs[ShowAs["DiffColPct"] = 4] = "DiffColPct";
    ShowAs[ShowAs["PctGrand"] = 5] = "PctGrand";
    ShowAs[ShowAs["PctRow"] = 6] = "PctRow";
    ShowAs[ShowAs["PctCol"] = 7] = "PctCol";
    ShowAs[ShowAs["RunTot"] = 8] = "RunTot";
    ShowAs[ShowAs["RunTotPct"] = 9] = "RunTotPct";
})(ShowAs = exports.ShowAs || (exports.ShowAs = {}));
var PivotEngine = (function () {
    function PivotEngine(options) {
        this._autoGenFields = true;
        this._allowFieldEditing = true;
        this._showRowTotals = ShowTotals.GrandTotals;
        this._showColTotals = ShowTotals.GrandTotals;
        this._totalsBefore = false;
        this._sortableGroups = true;
        this._showZeros = false;
        this._updating = 0;
        this._dirty = false;
        this._cntTotal = 0;
        this._cntFiltered = 0;
        this._async = true;
        this._serverParms = {
            timeout: _ServerConnection._TIMEOUT,
            pollInterval: _ServerConnection._POLL_INTERVAL,
            maxDetail: _ServerConnection._MAXDETAIL,
        };
        this.itemsSourceChanged = new wjcCore.Event();
        this.viewDefinitionChanged = new wjcCore.Event();
        this.updatingView = new wjcCore.Event();
        this.updatedView = new wjcCore.Event();
        this.error = new wjcCore.Event();
        this._pivotView = new PivotCollectionView(this);
        this._fields = new PivotFieldCollection(this);
        this._rowFields = new PivotFieldCollection(this);
        this._columnFields = new PivotFieldCollection(this);
        this._valueFields = new PivotFieldCollection(this);
        this._filterFields = new PivotFieldCollection(this);
        this._viewLists = [
            this._rowFields, this._columnFields, this._valueFields, this._filterFields
        ];
        var handler = this._fieldListChanged.bind(this);
        this._fields.collectionChanged.addHandler(handler);
        for (var i = 0; i < this._viewLists.length; i++) {
            this._viewLists[i].collectionChanged.addHandler(handler);
        }
        this._defaultFilterType = null;
        if (options) {
            wjcCore.copy(this, options);
        }
    }
    Object.defineProperty(PivotEngine.prototype, "itemsSource", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            var _this = this;
            if (this._items != value) {
                if (this._cv) {
                    this._cv.collectionChanged.removeHandler(this._cvCollectionChanged, this);
                    this._cv = null;
                }
                if (this._server) {
                    this._server.clearPendingRequests();
                    this._server = null;
                }
                this._items = value;
                if (wjcCore.isString(value)) {
                    this._server = new _ServerConnection(this, value);
                }
                else {
                    this._cv = wjcCore.asCollectionView(value);
                }
                if (this._cv != null) {
                    this._cv.collectionChanged.addHandler(this._cvCollectionChanged, this);
                }
                this.deferUpdate(function () {
                    if (_this.autoGenerateFields) {
                        _this._generateFields();
                    }
                });
                this.onItemsSourceChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotEngine.prototype, "collectionView", {
        get: function () {
            return this._cv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotEngine.prototype, "pivotView", {
        get: function () {
            return this._pivotView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotEngine.prototype, "showRowTotals", {
        get: function () {
            return this._showRowTotals;
        },
        set: function (value) {
            if (value != this.showRowTotals) {
                this._showRowTotals = wjcCore.asEnum(value, ShowTotals);
                this.onViewDefinitionChanged();
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotEngine.prototype, "showColumnTotals", {
        get: function () {
            return this._showColTotals;
        },
        set: function (value) {
            if (value != this.showColumnTotals) {
                this._showColTotals = wjcCore.asEnum(value, ShowTotals);
                this.onViewDefinitionChanged();
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotEngine.prototype, "totalsBeforeData", {
        get: function () {
            return this._totalsBefore;
        },
        set: function (value) {
            if (value != this._totalsBefore) {
                this._totalsBefore = wjcCore.asBoolean(value);
                this.onViewDefinitionChanged();
                this._updatePivotView();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotEngine.prototype, "sortableGroups", {
        get: function () {
            return this._sortableGroups;
        },
        set: function (value) {
            if (value != this._sortableGroups) {
                this._sortableGroups = wjcCore.asBoolean(value);
                this.onViewDefinitionChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotEngine.prototype, "showZeros", {
        get: function () {
            return this._showZeros;
        },
        set: function (value) {
            if (value != this._showZeros) {
                this._showZeros = wjcCore.asBoolean(value);
                this.onViewDefinitionChanged();
                this._updatePivotView();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotEngine.prototype, "defaultFilterType", {
        get: function () {
            if (this._defaultFilterType != null) {
                return this._defaultFilterType;
            }
            return this._server
                ? wjcGridFilter.FilterType.Condition
                : wjcGridFilter.FilterType.Both;
        },
        set: function (value) {
            this._defaultFilterType = wjcCore.asEnum(value, wjcGridFilter.FilterType);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotEngine.prototype, "autoGenerateFields", {
        get: function () {
            return this._autoGenFields;
        },
        set: function (value) {
            this._autoGenFields = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotEngine.prototype, "allowFieldEditing", {
        get: function () {
            return this._allowFieldEditing;
        },
        set: function (value) {
            this._allowFieldEditing = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotEngine.prototype, "fields", {
        get: function () {
            return this._fields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotEngine.prototype, "rowFields", {
        get: function () {
            return this._rowFields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotEngine.prototype, "columnFields", {
        get: function () {
            return this._columnFields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotEngine.prototype, "filterFields", {
        get: function () {
            return this._filterFields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotEngine.prototype, "valueFields", {
        get: function () {
            return this._valueFields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotEngine.prototype, "viewDefinition", {
        get: function () {
            var viewDef = {
                showZeros: this.showZeros,
                showColumnTotals: this.showColumnTotals,
                showRowTotals: this.showRowTotals,
                defaultFilterType: this.defaultFilterType,
                totalsBeforeData: this.totalsBeforeData,
                sortableGroups: this.sortableGroups,
                fields: [],
                rowFields: this._getFieldCollectionProxy(this.rowFields),
                columnFields: this._getFieldCollectionProxy(this.columnFields),
                filterFields: this._getFieldCollectionProxy(this.filterFields),
                valueFields: this._getFieldCollectionProxy(this.valueFields)
            };
            for (var i = 0; i < this.fields.length; i++) {
                var fieldDef = this._getFieldDefinition(this.fields[i]);
                viewDef.fields.push(fieldDef);
            }
            return JSON.stringify(viewDef);
        },
        set: function (value) {
            var _this = this;
            var viewDef = JSON.parse(value);
            if (viewDef) {
                this.deferUpdate(function () {
                    _this._copyProps(_this, viewDef, PivotEngine._props);
                    _this.fields.clear();
                    for (var i = 0; i < viewDef.fields.length; i++) {
                        var fldDef = viewDef.fields[i], f = _this._getFieldFromDefinition(fldDef);
                        _this.fields.push(f);
                    }
                    for (var i = 0; i < viewDef.fields.length; i++) {
                        var fldDef = viewDef.fields[i];
                        if (wjcCore.isString(fldDef.weightField)) {
                            _this.fields[i].weightField = _this.fields.getField(fldDef.weightField);
                        }
                    }
                    _this._setFieldCollectionProxy(_this.rowFields, viewDef.rowFields);
                    _this._setFieldCollectionProxy(_this.columnFields, viewDef.columnFields);
                    _this._setFieldCollectionProxy(_this.filterFields, viewDef.filterFields);
                    _this._setFieldCollectionProxy(_this.valueFields, viewDef.valueFields);
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotEngine.prototype, "isViewDefined", {
        get: function () {
            var vf = this._valueFields.length, rf = this._rowFields.length, cf = this._columnFields.length;
            return this._server
                ? vf > 0 && (rf > 0 || cf > 0)
                : vf > 0 || rf > 0 || cf > 0;
        },
        enumerable: true,
        configurable: true
    });
    PivotEngine.prototype.beginUpdate = function () {
        this.cancelPendingUpdates();
        this._updating++;
    };
    PivotEngine.prototype.endUpdate = function () {
        this._updating--;
        if (this._updating <= 0) {
            this.onViewDefinitionChanged();
            this.refresh();
        }
    };
    Object.defineProperty(PivotEngine.prototype, "isUpdating", {
        get: function () {
            return this._updating > 0;
        },
        enumerable: true,
        configurable: true
    });
    PivotEngine.prototype.deferUpdate = function (fn) {
        try {
            this.beginUpdate();
            fn();
        }
        finally {
            this.endUpdate();
        }
    };
    PivotEngine.prototype.refresh = function (force) {
        if (force === void 0) { force = false; }
        if (!this.isUpdating || force) {
            this._updateView();
        }
    };
    PivotEngine.prototype.invalidate = function () {
        var _this = this;
        if (this._toInv) {
            this._toInv = clearTimeout(this._toInv);
        }
        if (!this.isUpdating) {
            this._toInv = setTimeout(function () {
                _this.refresh();
            }, wjcCore.Control._REFRESH_INTERVAL);
        }
    };
    Object.defineProperty(PivotEngine.prototype, "async", {
        get: function () {
            return this._async;
        },
        set: function (value) {
            if (value != this._async) {
                this.cancelPendingUpdates();
                this._async = wjcCore.asBoolean(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotEngine.prototype, "serverTimeout", {
        get: function () {
            return this._serverParms.timeout;
        },
        set: function (value) {
            this._serverParms.timeout = wjcCore.asNumber(value, false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotEngine.prototype, "serverPollInterval", {
        get: function () {
            return this._serverParms.pollInterval;
        },
        set: function (value) {
            this._serverParms.pollInterval = wjcCore.asNumber(value, false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotEngine.prototype, "serverMaxDetail", {
        get: function () {
            return this._serverParms.maxDetail;
        },
        set: function (value) {
            this._serverParms.maxDetail = wjcCore.asNumber(value, false, true);
        },
        enumerable: true,
        configurable: true
    });
    PivotEngine.prototype.cancelPendingUpdates = function () {
        if (this._toUpdateTallies) {
            clearTimeout(this._toUpdateTallies);
            this._toUpdateTallies = null;
        }
    };
    PivotEngine.prototype.getDetail = function (item, binding) {
        var rowKey = item ? item[_PivotKey._ROW_KEY_NAME] : null, colKey = this._getKey(binding);
        if (this._server) {
            return this._server.getDetail(rowKey, colKey);
        }
        var items = this.collectionView.items, arr = [];
        for (var i = 0; i < items.length; i++) {
            var item_1 = items[i];
            if (this._applyFilter(item_1) &&
                (rowKey == null || rowKey.matchesItem(item_1)) &&
                (colKey == null || colKey.matchesItem(item_1))) {
                arr.push(item_1);
            }
        }
        return arr;
    };
    PivotEngine.prototype.getDetailView = function (item, binding) {
        var arr = this.getDetail(item, binding);
        return new wjcCore.CollectionView(arr);
    };
    PivotEngine.prototype.getKeys = function (item, binding) {
        var rowKey = item ? item[_PivotKey._ROW_KEY_NAME] : null, colKey = this._getKey(binding);
        return {
            rowKey: {
                fields: rowKey.fieldNames,
                values: rowKey.values
            },
            colKey: {
                fields: colKey.fieldNames,
                values: colKey.values
            }
        };
    };
    PivotEngine.prototype.editField = function (field) {
        if (this.allowFieldEditing) {
            var edt = new PivotFieldEditor(document.createElement('div'), {
                field: field
            });
            var dlg = new wjcInput.Popup(document.createElement('div'), {
                content: edt.hostElement
            });
            dlg.show(true);
        }
    };
    PivotEngine.prototype.removeField = function (field) {
        for (var i = 0; i < this._viewLists.length; i++) {
            var list = this._viewLists[i], index = list.indexOf(field);
            if (index > -1) {
                list.removeAt(index);
                return;
            }
        }
    };
    PivotEngine.prototype.onItemsSourceChanged = function (e) {
        this.itemsSourceChanged.raise(this, e);
    };
    PivotEngine.prototype.onViewDefinitionChanged = function (e) {
        if (!this._updating) {
            this.viewDefinitionChanged.raise(this, e);
        }
    };
    PivotEngine.prototype.onUpdatingView = function (e) {
        this.updatingView.raise(this, e);
    };
    PivotEngine.prototype.onUpdatedView = function (e) {
        this.updatedView.raise(this, e);
    };
    PivotEngine.prototype.onError = function (e) {
        this.error.raise(this, e);
        return !e.cancel;
    };
    PivotEngine.prototype._copy = function (key, value) {
        var arr;
        switch (key) {
            case 'fields':
                this.fields.clear();
                for (var i = 0; i < this._viewLists.length; i++) {
                    this._viewLists[i].clear();
                }
                arr = wjcCore.asArray(value);
                for (var i = 0; i < arr.length; i++) {
                    var fld = this._createField(arr[i], false);
                    this.fields.push(fld);
                }
                return true;
            case 'rowFields':
            case 'columnFields':
            case 'valueFields':
            case 'filterFields':
                this[key].clear();
                if (!wjcCore.isArray(value)) {
                    this[key].maxItems = value.maxItems;
                    value = value.items;
                }
                arr = wjcCore.asArray(value);
                for (var i = 0; i < arr.length; i++) {
                    var fld = this.fields.getField(arr[i]);
                    this[key].push(fld);
                }
                return true;
        }
        return false;
    };
    PivotEngine.prototype._getKey = function (keyString) {
        return this._keys[keyString];
    };
    PivotEngine.prototype._getRowLevel = function (key) {
        if (wjcCore.isNumber(key)) {
            var item = this._pivotView.items[key];
            key = item ? item[_PivotKey._ROW_KEY_NAME] : null;
        }
        return key ? key.level : -1;
    };
    PivotEngine.prototype._getColLevel = function (key) {
        if (wjcCore.isNumber(key)) {
            key = this._colBindings[key];
        }
        if (wjcCore.isString(key)) {
            key = this._getKey(key);
        }
        wjcCore.assert(key == null || key instanceof _PivotKey, 'invalid parameter in call to _getColLevel');
        return key ? key.level : -1;
    };
    PivotEngine.prototype._applyFilter = function (item) {
        var fields = this._activeFilterFields;
        for (var i = 0; i < fields.length; i++) {
            var f = fields[i].filter;
            if (!f.apply(item)) {
                return false;
            }
        }
        return true;
    };
    PivotEngine.prototype._updateView = function () {
        var _this = this;
        this.cancelPendingUpdates();
        this._cntTotal = this._cntFiltered = 0;
        this._tallies = {};
        this._keys = {};
        this._activeFilterFields = [];
        if (this._server) {
            if (this.isViewDefined) {
                this._server.getOutputView(function (result) {
                    if (_this.isViewDefined) {
                        _this._server.updateTallies(result);
                        _this._updatePivotView();
                    }
                });
                return;
            }
        }
        var lists = this._viewLists;
        for (var i = 0; i < lists.length; i++) {
            var list = lists[i];
            for (var j = 0; j < list.length; j++) {
                var f = list[j];
                if (f.filter.isActive) {
                    this._activeFilterFields.push(f);
                }
            }
        }
        if (this.isViewDefined && wjcCore.hasItems(this._cv)) {
            this._batchStart = Date.now();
            this._updateTallies(this._cv.items, 0);
        }
        else {
            this._updatePivotView();
        }
    };
    PivotEngine.prototype._updateTallies = function (arr, startIndex) {
        var _this = this;
        var arrLen = arr.length, rowNodes = new _PivotNode(this._rowFields, 0, null, -1, null);
        var valFields = this.valueFields;
        if (valFields.length == 0 && this.columnFields.length > 0) {
            valFields = new PivotFieldCollection(this);
            valFields.push(new PivotField(this, ''));
        }
        var st = ShowTotals, rkLen = this._rowFields.length, srTot = this._getShowRowTotals(), rkStart = srTot == st.None ? rkLen : 0, rkStep = srTot == st.GrandTotals ? Math.max(1, rkLen) : 1, ckLen = this._columnFields.length, scTot = this._getShowColTotals(), ckStart = scTot == st.None ? ckLen : 0, ckStep = scTot == st.GrandTotals ? Math.max(1, ckLen) : 1, vfLen = valFields.length;
        var _loop_1 = function (index) {
            if (this_1._async &&
                index - startIndex >= PivotEngine._BATCH_SIZE &&
                Date.now() - this_1._batchStart > PivotEngine._BATCH_DELAY) {
                this_1._toUpdateTallies = setTimeout(function () {
                    _this.onUpdatingView(new ProgressEventArgs(Math.round(index / arr.length * 100)));
                    _this._batchStart = Date.now();
                    _this._updateTallies(arr, index);
                }, PivotEngine._BATCH_TIMEOUT);
                return { value: void 0 };
            }
            this_1._cntTotal++;
            var item = arr[index];
            if (!this_1._activeFilterFields.length || this_1._applyFilter(item)) {
                this_1._cntFiltered++;
                for (var i = rkStart; i <= rkLen; i += rkStep) {
                    var nd = rowNodes.getNode(this_1._rowFields, i, null, -1, item), rowKey = nd.key, rowKeyId = rowKey.toString(), rowTallies = this_1._tallies[rowKeyId];
                    if (!rowTallies) {
                        this_1._keys[rowKeyId] = rowKey;
                        this_1._tallies[rowKeyId] = rowTallies = {};
                    }
                    for (var j = ckStart; j <= ckLen; j += ckStep) {
                        for (var k = 0; k < vfLen; k++) {
                            var colNodes = nd.tree.getNode(this_1._columnFields, j, valFields, k, item), colKey = colNodes.key, colKeyId = colKey.toString(), tally = rowTallies[colKeyId];
                            if (!tally) {
                                this_1._keys[colKeyId] = colKey;
                                tally = rowTallies[colKeyId] = new _Tally();
                            }
                            var vf = valFields[k], value = vf._getValue(item, false), weight = vf._weightField ? vf._getWeight(item) : null;
                            tally.add(value, weight);
                        }
                    }
                }
            }
        };
        var this_1 = this;
        for (var index = startIndex; index < arrLen; index++) {
            var state_1 = _loop_1(index);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        this._toUpdateTallies = null;
        this._updatePivotView();
    };
    PivotEngine.prototype._updatePivotView = function () {
        var _this = this;
        this._pivotView.deferUpdate(function () {
            _this.onUpdatingView(new ProgressEventArgs(100));
            var arr = _this._pivotView.sourceCollection;
            arr.length = 0;
            var rowKeys = {};
            for (var rk in _this._tallies) {
                rowKeys[rk] = true;
            }
            var colKeys = {};
            for (var rk in _this._tallies) {
                var row = _this._tallies[rk];
                for (var ck in row) {
                    colKeys[ck] = true;
                }
            }
            var sortedRowKeys = _this._getSortedKeys(rowKeys), sortedColKeys = _this._getSortedKeys(colKeys);
            for (var r = 0; r < sortedRowKeys.length; r++) {
                var rowKey = sortedRowKeys[r], row = _this._tallies[rowKey], item = {};
                item[_PivotKey._ROW_KEY_NAME] = _this._getKey(rowKey);
                for (var c = 0; c < sortedColKeys.length; c++) {
                    var colKey = sortedColKeys[c], tally = row[colKey], pk = _this._getKey(colKey), value = tally ? tally.getAggregate(pk.aggregate) : null;
                    if (value == 0 && !_this._showZeros) {
                        value = null;
                    }
                    item[colKey] = value;
                }
                arr.push(item);
            }
            _this._colBindings = sortedColKeys;
            _this._updateFieldValues(arr);
            _this._pivotView.sortDescriptions.clear();
            _this.onUpdatedView();
        });
    };
    PivotEngine.prototype._getSortedKeys = function (obj) {
        var _this = this;
        return Object.keys(obj).sort(function (id1, id2) {
            return _this._keys[id1].compareTo(_this._keys[id2]);
        });
    };
    PivotEngine.prototype._updateFieldValues = function (arr) {
        var vfl = this.valueFields.length;
        for (var vf = 0; vf < vfl; vf++) {
            var fld = this.valueFields[vf];
            switch (fld.showAs) {
                case ShowAs.RunTot:
                case ShowAs.RunTotPct:
                    for (var col = vf; col < this._colBindings.length; col += vfl) {
                        for (var row = 0; row < arr.length; row++) {
                            var item = arr[row], binding = this._colBindings[col];
                            item[binding] = this._getRunningTotal(arr, row, col, fld.showAs);
                        }
                        if (fld.showAs == ShowAs.RunTotPct) {
                            for (var row = 0; row < arr.length; row++) {
                                var item = arr[row], binding = this._colBindings[col], val = item[binding];
                                if (wjcCore.isNumber(val)) {
                                    var max = this._getLastValueInRowGroup(arr, row, col);
                                    if (max != 0) {
                                        item[binding] = val / max;
                                    }
                                }
                            }
                        }
                    }
                    break;
                case ShowAs.PctGrand:
                case ShowAs.PctCol:
                    var total = 0;
                    if (fld.showAs == ShowAs.PctGrand) {
                        for (var col = vf; col < this._colBindings.length; col += vfl) {
                            if (this._getColLevel(col) == -1) {
                                total += this._getColTotal(arr, col);
                            }
                        }
                    }
                    for (var col = vf; col < this._colBindings.length; col += vfl) {
                        if (fld.showAs == ShowAs.PctCol) {
                            total = this._getColTotal(arr, col);
                        }
                        var binding = this._colBindings[col];
                        for (var row = 0; row < arr.length; row++) {
                            var item = arr[row], value = item[binding];
                            if (wjcCore.isNumber(value)) {
                                item[binding] = total != 0 ? value / total : null;
                            }
                        }
                    }
                    break;
                case ShowAs.PctRow:
                    for (var row = 0; row < arr.length; row++) {
                        var item = arr[row], total_1 = 0;
                        for (var col = vf; col < this._colBindings.length; col += vfl) {
                            if (this._getColLevel(col) == -1) {
                                var binding = this._colBindings[col], value = item[binding];
                                if (wjcCore.isNumber(value)) {
                                    total_1 += value;
                                }
                            }
                        }
                        for (var col = vf; col < this._colBindings.length; col += vfl) {
                            var binding = this._colBindings[col], value = item[binding];
                            if (wjcCore.isNumber(value)) {
                                item[binding] = total_1 != 0 ? value / total_1 : null;
                            }
                        }
                    }
                    break;
                case ShowAs.DiffRow:
                case ShowAs.DiffRowPct:
                    for (var col = vf; col < this._colBindings.length; col += vfl) {
                        for (var row = arr.length - 1; row >= 0; row--) {
                            var item = arr[row], binding = this._colBindings[col];
                            item[binding] = this._getRowDifference(arr, row, col, fld.showAs);
                        }
                    }
                    break;
                case ShowAs.DiffCol:
                case ShowAs.DiffColPct:
                    for (var row = 0; row < arr.length; row++) {
                        for (var col = this._colBindings.length - vfl + vf; col >= 0; col -= vfl) {
                            var item = arr[row], binding = this._colBindings[col];
                            item[binding] = this._getColDifference(arr, row, col, fld.showAs);
                        }
                    }
                    break;
            }
        }
    };
    PivotEngine.prototype._getColTotal = function (arr, col) {
        var binding = this._colBindings[col], total = 0;
        for (var row = 0; row < arr.length; row++) {
            if (this._getRowLevel(row) == -1) {
                var val = arr[row][binding];
                if (wjcCore.isNumber(val)) {
                    total += val;
                }
            }
        }
        return total;
    };
    PivotEngine.prototype._getRunningTotal = function (arr, row, col, showAs) {
        var level = this._getRowLevel(row);
        if (level == 0) {
            return null;
        }
        var binding = this._colBindings[col], runTot = arr[row][binding], srTot = this._getShowRowTotals();
        var grpFld = this.rowFields.length - 2;
        for (var p = row - 1; p >= 0; p--) {
            var plevel = this._getRowLevel(p);
            if (plevel == level) {
                if (grpFld > -1 && level < 0 && srTot != ShowTotals.Subtotals) {
                    var k = arr[row].$rowKey, kp = arr[p].$rowKey;
                    if (k.values[grpFld] != kp.values[grpFld]) {
                        return null;
                    }
                }
                var pval = arr[p][binding];
                runTot += pval;
                break;
            }
            if (plevel > level)
                break;
        }
        return runTot;
    };
    PivotEngine.prototype._getLastValueInRowGroup = function (arr, row, col) {
        var binding = this._colBindings[col], lastVal = arr[row][binding];
        var level = this._getRowLevel(row), grpFld = this.rowFields.length - 2, srTot = this._getShowRowTotals();
        for (var p = row + 1; p < arr.length; p++) {
            var plevel = this._getRowLevel(p);
            if (plevel == level) {
                if (grpFld > -1 && level < 0 && srTot != ShowTotals.Subtotals) {
                    var k = arr[row].$rowKey, kp = arr[p].$rowKey;
                    if (k.values[grpFld] != kp.values[grpFld]) {
                        return lastVal;
                    }
                }
                lastVal = arr[p][binding];
            }
            if (plevel > level)
                break;
        }
        return lastVal;
    };
    PivotEngine.prototype._getRowDifference = function (arr, row, col, showAs) {
        var level = this._getRowLevel(row);
        if (level == 0) {
            return null;
        }
        var grpFld = this.rowFields.length - 2, srTot = this._getShowRowTotals();
        for (var p = row - 1; p >= 0; p--) {
            var plevel = this._getRowLevel(p);
            if (plevel == level) {
                if (grpFld > -1 && level < 0 && srTot != ShowTotals.Subtotals) {
                    var k = arr[row].$rowKey, kp = arr[p].$rowKey;
                    if (k.values[grpFld] != kp.values[grpFld]) {
                        return null;
                    }
                }
                var binding = this._colBindings[col], val = arr[row][binding], pval = arr[p][binding], diff = val - pval;
                if (showAs == ShowAs.DiffRowPct) {
                    diff /= pval;
                }
                return diff;
            }
            if (plevel > level)
                break;
        }
        return null;
    };
    PivotEngine.prototype._getColDifference = function (arr, row, col, showAs) {
        var level = this._getColLevel(col);
        if (level == 0) {
            return null;
        }
        var vfl = this.valueFields.length, grpFld = this.columnFields.length - 2, scTot = this._getShowColTotals();
        for (var p = col - vfl; p >= 0; p -= vfl) {
            var plevel = this._getColLevel(p);
            if (plevel == level) {
                if (grpFld > -1 && level < 0 && scTot != ShowTotals.Subtotals) {
                    var k = this._getKey(this._colBindings[col]), kp = this._getKey(this._colBindings[p]);
                    if (k.values[grpFld] != kp.values[grpFld]) {
                        return null;
                    }
                }
                var item = arr[row], val = item[this._colBindings[col]], pval = item[this._colBindings[p]], diff = val - pval;
                if (showAs == ShowAs.DiffColPct) {
                    diff /= pval;
                }
                return diff;
            }
            if (plevel > level)
                break;
        }
        return null;
    };
    PivotEngine.prototype._getShowRowTotals = function () {
        return this._valueFields.length
            ? this._showRowTotals
            : ShowTotals.None;
    };
    PivotEngine.prototype._getShowColTotals = function () {
        return this._valueFields.length
            ? this._showColTotals
            : ShowTotals.None;
    };
    PivotEngine.prototype._generateFields = function () {
        var fld;
        for (var i = 0; i < this._viewLists.length; i++) {
            this._viewLists[i].clear();
        }
        for (var i = 0; i < this.fields.length; i++) {
            fld = this.fields[i];
            if (fld._autoGenerated) {
                this.fields.removeAt(i);
                i--;
            }
        }
        if (this._server) {
            var fields = this._server.getFields();
            for (var i = 0; i < fields.length; i++) {
                fld = this._createField(fields[i], true);
                if (!this.fields.getField(fld.header)) {
                    this.fields.push(fld);
                }
            }
            return;
        }
        var item = null, cv = this.collectionView, sc;
        if (wjcCore.hasItems(cv)) {
            sc = cv.sourceCollection;
            item = sc[0];
        }
        if (item && this.autoGenerateFields) {
            for (var key in item) {
                var value = null;
                for (var index = 0; index < sc.length && index < 1000 && value == null; index++) {
                    value = sc[index][key];
                    if (wjcCore.isPrimitive(value)) {
                        fld = this._createField({
                            binding: key,
                            header: wjcCore.toHeaderCase(key),
                            dataType: wjcCore.getType(value)
                        }, true);
                        if (!this.fields.getField(fld.header)) {
                            this.fields.push(fld);
                        }
                    }
                }
            }
        }
        if (item) {
            for (var i = 0; i < this.fields.length; i++) {
                fld = this.fields[i];
                if (fld.dataType == null && fld._binding) {
                    fld.dataType = wjcCore.getType(fld._binding.getValue(item));
                }
            }
        }
    };
    PivotEngine.prototype._createField = function (options, autoGenerated) {
        var fld;
        if (wjcCore.isString(options)) {
            fld = new PivotField(this, options);
        }
        else if (options) {
            if (options.key) {
                delete options.key;
            }
            fld = options.dimensionType != null
                ? new CubePivotField(this, options.binding, options.header)
                : new PivotField(this, options.binding, options.header);
            if (options.dataType != null) {
                fld.dataType = options.dataType;
            }
        }
        fld._autoGenerated = autoGenerated;
        if (autoGenerated || wjcCore.isString(options)) {
            fld.format = fld.dataType == wjcCore.DataType.Date
                ? 'd'
                : 'n0';
            fld.aggregate = fld.dataType == wjcCore.DataType.Number
                ? wjcCore.Aggregate.Sum
                : wjcCore.Aggregate.Cnt;
        }
        if (options && !wjcCore.isString(options)) {
            wjcCore.copy(fld, options);
        }
        return fld;
    };
    PivotEngine.prototype._cvCollectionChanged = function (sender, e) {
        this.invalidate();
    };
    PivotEngine.prototype._fieldListChanged = function (s, e) {
        if (e.action == wjcCore.NotifyCollectionChangedAction.Add) {
            var arr = s;
            for (var i = 0; i < arr.length - 1; i++) {
                if (arr[i].key) {
                    for (var j = i + 1; j < arr.length; j++) {
                        if (arr[i].key == arr[j].key) {
                            arr.removeAt(j);
                            j--;
                        }
                    }
                }
            }
            if (arr != this._fields) {
                if (!this._fields.getField(e.item.key)) {
                    arr.removeAt(e.index);
                }
                else {
                    for (var i = 0; i < this._viewLists.length; i++) {
                        if (this._viewLists[i] != arr) {
                            var list = this._viewLists[i];
                            var index = list.indexOf(e.item);
                            if (index > -1) {
                                list.removeAt(index);
                            }
                        }
                    }
                }
            }
            if (wjcCore.isNumber(arr.maxItems) && arr.maxItems > -1) {
                while (arr.length > arr.maxItems) {
                    var index = arr.length - 1;
                    if (arr[index] == e.item && index > 0) {
                        index--;
                    }
                    arr.removeAt(index);
                }
            }
        }
        this.onViewDefinitionChanged();
        this.invalidate();
    };
    PivotEngine.prototype._fieldPropertyChanged = function (field, e) {
        this.onViewDefinitionChanged();
        if (!field.isActive) {
            return;
        }
        var prop = e.propertyName;
        if (prop == 'width' || prop == 'wordWrap' || prop == 'isContentHtml') {
            this._pivotView.refresh();
            return;
        }
        if (prop == 'format' && this.valueFields.indexOf(field) > -1) {
            this._pivotView.refresh();
            return;
        }
        if (prop == 'showAs') {
            if (this.valueFields.indexOf(field) > -1 && !this.isUpdating) {
                this._updatePivotView();
            }
            return;
        }
        if (prop == 'descending') {
            this._updatePivotView();
            return;
        }
        if (prop == 'aggregate') {
            if (this.valueFields.indexOf(field) > -1 && !this.isUpdating) {
                if (this._server) {
                    this._updateView();
                }
                else {
                    this._updatePivotView();
                }
            }
            return;
        }
        this.invalidate();
    };
    PivotEngine.prototype._copyProps = function (dst, src, props) {
        for (var i = 0; i < props.length; i++) {
            var prop = props[i];
            if (src[prop] != null) {
                dst[prop] = src[prop];
            }
        }
    };
    PivotEngine.prototype._getFieldFromDefinition = function (fldDef) {
        var filterProxy = fldDef.filter;
        if (fldDef.filter) {
            delete fldDef.filter;
        }
        var fld = this._createField(fldDef, true);
        if (filterProxy) {
            this._setFilterProxy(fld, filterProxy);
            fldDef.filter = filterProxy;
        }
        return fld;
    };
    PivotEngine.prototype._getFieldDefinition = function (fld) {
        var fieldDef = {
            binding: fld.binding,
            header: fld.header,
            dataType: fld.dataType,
            aggregate: fld.aggregate,
            showAs: fld.showAs,
            descending: fld.descending,
            format: fld.format,
            width: fld.width,
            isContentHtml: fld.isContentHtml
        };
        if (fld.weightField) {
            fieldDef.weightField = fld.weightField._getName();
        }
        if (fld.key) {
            fieldDef.key = fld.key;
        }
        if (fld.filter.isActive) {
            fieldDef.filter = this._getFilterProxy(fld);
        }
        if (fld instanceof CubePivotField) {
            var cubeField = fld;
            fieldDef.dimensionType = cubeField.dimensionType;
            if (cubeField.subFields && cubeField.subFields.length) {
                fieldDef.subFields = [];
                for (var i = 0; i < cubeField.subFields.length; i++) {
                    fieldDef.subFields.push(this._getFieldDefinition(cubeField.subFields[i]));
                }
            }
        }
        return fieldDef;
    };
    PivotEngine.prototype._getFieldCollectionProxy = function (arr) {
        var proxy = {
            items: []
        };
        if (wjcCore.isNumber(arr.maxItems) && arr.maxItems > -1) {
            proxy.maxItems = arr.maxItems;
        }
        for (var i = 0; i < arr.length; i++) {
            var fld = arr[i];
            proxy.items.push(fld.key);
        }
        return proxy;
    };
    PivotEngine.prototype._setFieldCollectionProxy = function (arr, proxy) {
        arr.clear();
        arr.maxItems = wjcCore.isNumber(proxy.maxItems) ? proxy.maxItems : null;
        for (var i = 0; i < proxy.items.length; i++) {
            arr.push(proxy.items[i]);
        }
    };
    PivotEngine.prototype._getFilterProxy = function (fld) {
        var flt = fld.filter;
        if (flt.conditionFilter.isActive) {
            var cf = flt.conditionFilter, proxy = {
                type: 'condition',
                condition1: { operator: cf.condition1.operator, value: cf.condition1.value },
                and: cf.and,
                condition2: { operator: cf.condition2.operator, value: cf.condition2.value }
            };
            if (!cf.condition1.isActive) {
                delete proxy.condition1;
            }
            if (!cf.condition2.isActive) {
                delete proxy.condition2;
            }
            return proxy;
        }
        if (flt.valueFilter.isActive) {
            var vf = flt.valueFilter;
            return {
                type: 'value',
                filterText: vf.filterText,
                showValues: vf.showValues
            };
        }
        wjcCore.assert(false, 'inactive filters shouldn\'t be persisted.');
        return null;
    };
    PivotEngine.prototype._setFilterProxy = function (fld, proxy) {
        var flt = fld.filter;
        flt.clear();
        switch (proxy.type) {
            case 'condition':
                var cf = flt.conditionFilter;
                if (proxy.condition1) {
                    var val = wjcCore.changeType(proxy.condition1.value, fld.dataType, fld.format);
                    cf.condition1.value = val ? val : proxy.condition1.value;
                    cf.condition1.operator = proxy.condition1.operator;
                }
                if (wjcCore.isBoolean(proxy.and)) {
                    cf.and = proxy.and;
                }
                if (proxy.condition2) {
                    var val = wjcCore.changeType(proxy.condition2.value, fld.dataType, fld.format);
                    cf.condition2.value = val ? val : proxy.condition2.value;
                    cf.condition2.operator = proxy.condition2.operator;
                }
                break;
            case 'value':
                var vf = flt.valueFilter;
                vf.filterText = proxy.filterText;
                vf.showValues = proxy.showValues;
                break;
        }
    };
    PivotEngine._BATCH_SIZE = 10000;
    PivotEngine._BATCH_TIMEOUT = 0;
    PivotEngine._BATCH_DELAY = 100;
    PivotEngine._props = [
        'showZeros',
        'showRowTotals',
        'showColumnTotals',
        'totalsBeforeData',
        'sortableGroups',
        'defaultFilterType'
    ];
    return PivotEngine;
}());
exports.PivotEngine = PivotEngine;
var ProgressEventArgs = (function (_super) {
    __extends(ProgressEventArgs, _super);
    function ProgressEventArgs(progress) {
        var _this = _super.call(this) || this;
        _this._progress = wjcCore.asNumber(progress);
        return _this;
    }
    Object.defineProperty(ProgressEventArgs.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        enumerable: true,
        configurable: true
    });
    return ProgressEventArgs;
}(wjcCore.EventArgs));
exports.ProgressEventArgs = ProgressEventArgs;
'use strict';
var _ServerConnection = (function () {
    function _ServerConnection(engine, url) {
        this._ng = wjcCore.asType(engine, PivotEngine);
        wjcCore.assert(this._isValidUrl(url), 'Invalid service Url: ' + url + ')');
    }
    _ServerConnection.prototype.getFields = function () {
        var _this = this;
        var result = null;
        wjcCore.httpRequest(this._getUrl('Fields'), {
            async: false,
            success: function (xhr) {
                result = JSON.parse(xhr.responseText);
                if (!wjcCore.isArray(result)) {
                    console.error('Failed to get fields from server: ' + xhr.responseText);
                }
            },
            error: function (xhr) {
                _this._handleError('Getting Fields', xhr);
            }
        });
        return result;
    };
    _ServerConnection.prototype.getOutputView = function (callBack) {
        var _this = this;
        this.clearPendingRequests();
        this._sendHttpRequest('Analyses', {
            method: 'POST',
            data: {
                view: this._ng.viewDefinition
            },
            success: function (xhr) {
                var result = JSON.parse(xhr.responseText);
                _this._token = result.token;
                _this._start = Date.now();
                _this._handleResult(result.status, callBack);
            },
            error: function (xhr) {
                _this._handleError('Analyses', xhr);
            }
        });
    };
    _ServerConnection.prototype.getDetail = function (rowKey, colKey) {
        var arr, keys = [], count = this._ng.rowFields.length, valueCount = rowKey ? rowKey.values.length : 0;
        for (var i = 0; i < count; i++) {
            if (i < valueCount) {
                keys.push(_ServerConnection._getRequestedValue(rowKey.values[i]));
            }
            else {
                keys.push(null);
            }
        }
        count = this._ng.columnFields.length;
        valueCount = colKey ? colKey.values.length : 0;
        for (var i = 0; i < count; i++) {
            if (i < valueCount) {
                keys.push(_ServerConnection._getRequestedValue(colKey.values[i]));
            }
            else {
                keys.push(null);
            }
        }
        arr = new wjcCore.ObservableArray();
        this._loadArray('Detail', arr, {
            method: 'POST',
            view: this._ng.viewDefinition,
            keys: keys,
            max: this._ng.serverMaxDetail
        });
        return arr;
    };
    _ServerConnection._getRequestedValue = function (value) {
        if (wjcCore.isDate(value)) {
            var date = value;
            return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
        }
        return value;
    };
    _ServerConnection.prototype.clearPendingRequests = function () {
        this._clearRequest();
        this._clearTimeout();
        this._clearToken();
    };
    _ServerConnection.prototype.updateTallies = function (aggregatedData) {
        var _this = this;
        var ng = this._ng, rfCount = ng.rowFields.length, cfCount = ng.columnFields.length, vfCount = ng.valueFields.length, rowNodes = new _PivotNode(ng.rowFields, 0, null, -1, null);
        aggregatedData.forEach(function (item, index, arr) {
            var count = _this._getAggregatedFieldCount(item, ng.rowFields), nd = rowNodes.getNode(ng.rowFields, rfCount - count, null, -1, item), rowKey = nd.key, rowKeyId = rowKey.toString(), rowTallies = ng._tallies[rowKeyId];
            if (!rowTallies) {
                ng._keys[rowKeyId] = rowKey;
                ng._tallies[rowKeyId] = rowTallies = {};
            }
            count = _this._getAggregatedFieldCount(item, ng.columnFields);
            for (var k = 0; k < vfCount; k++) {
                var colNodes = nd.tree.getNode(ng.columnFields, cfCount - count, ng.valueFields, k, item), colKey = colNodes.key, colKeyId = colKey.toString(), vf = ng.valueFields[k];
                var tally = rowTallies[colKeyId];
                if (!tally) {
                    ng._keys[colKeyId] = colKey;
                    tally = rowTallies[colKeyId] = new _ServerTally();
                    tally.add(_this._getFieldValue(vf, item, false));
                }
                else {
                    wjcCore.assert(false, 'Server tallies have a single value.');
                }
            }
        });
    };
    _ServerConnection.prototype._getFieldValue = function (vf, item, formatted) {
        var value = item[vf.key];
        return !formatted || typeof (value) == 'string'
            ? value
            : wjcCore.Globalize.format(value, vf.format);
    };
    _ServerConnection.prototype._getAggregatedFieldCount = function (item, fields) {
        var fieldCount = fields.length, count = 0;
        for (var i = 0; i < fieldCount; i++) {
            var field = fields[i];
            if (this._getFieldValue(field, item, false) == null) {
                count++;
            }
        }
        return count;
    };
    _ServerConnection.prototype._loadArray = function (command, arr, data) {
        var _this = this;
        if (!data) {
            data = {};
        }
        if (data.skip == null) {
            data.skip = 0;
        }
        if (data.top == null) {
            data.top = 100;
        }
        var max = wjcCore.isNumber(data.max) ? data.max : 1000000;
        this._request = wjcCore.httpRequest(this._getUrl(command), {
            data: data,
            method: data.method || 'GET',
            success: function (xhr) {
                var result = JSON.parse(xhr.responseText);
                arr.deferUpdate(function () {
                    result.value.forEach(function (item) {
                        arr.push(item);
                    });
                });
                if (result.value.length == data.top && arr.length < max) {
                    data.skip += data.top;
                    _this._loadArray(command, arr, data);
                }
            },
            error: function (xhr) {
                _this._handleError(command, xhr);
            }
        });
    };
    _ServerConnection.prototype._getUrl = function (command, token, fieldName) {
        if (token === void 0) { token = this._token; }
        var url = this._ng.itemsSource.toString(), pos = url.lastIndexOf('/'), urlStart = url.substr(0, pos);
        command = command.toLowerCase();
        switch (command) {
            case 'rawdata':
            case 'detail':
                return url;
            case 'fields':
            case 'analyses':
                return url + '/' + command;
            case 'clear':
                return url + '/analyses/' + token + '/';
            case 'result':
            case 'status':
                return url + '/analyses/' + token + '/' + command;
            case 'uniquevalues':
                return url + '/fields/' + fieldName + '/' + command;
        }
        wjcCore.assert(false, 'Unrecognized command');
    };
    _ServerConnection.prototype._isValidUrl = function (url) {
        var a = document.createElement('a');
        a.href = wjcCore.asString(url);
        a.href = a.href;
        return a.protocol && a.hostname && a.pathname &&
            url[url.length - 1] != '/';
    };
    _ServerConnection.prototype._handleResult = function (result, callBack) {
        var _this = this;
        switch (result.executingStatus.toLowerCase()) {
            case 'executing':
            case 'notset':
                if (Date.now() - this._start > this._ng.serverTimeout) {
                    this._handleError('Analyses', {
                        status: 500,
                        statusText: 'Analysis timed out',
                    });
                    return;
                }
                this._progress = result.progress;
                this._ng.onUpdatingView(new ProgressEventArgs(this._progress));
                this._clearTimeout();
                this._toGetStatus = setTimeout(function () {
                    _this._waitUntilComplete(callBack);
                }, this._ng.serverPollInterval);
                break;
            case 'completed':
                this._progress = 100;
                this._ng.onUpdatingView(new ProgressEventArgs(this._progress));
                this._getResults(callBack);
                break;
            case 'exception':
                this._getResults(callBack);
                break;
            default:
                this._handleError('Analyses', {
                    status: 500,
                    statusText: 'Unexpected result...',
                });
                break;
        }
    };
    _ServerConnection.prototype._waitUntilComplete = function (callBack) {
        var _this = this;
        this._sendHttpRequest('Status', {
            success: function (xhr) {
                var result = JSON.parse(xhr.responseText);
                _this._handleResult(result, callBack);
            },
            error: function (xhr) {
                _this._handleError('Status', xhr);
            }
        });
    };
    _ServerConnection.prototype._getResults = function (callBack) {
        var _this = this;
        this._sendHttpRequest('Result', {
            success: function (xhr) {
                _this._clearToken();
                var result = JSON.parse(xhr.responseText);
                wjcCore.assert(wjcCore.isArray(result), 'Result array Expected.');
                var dateFields = [];
                _this._ng._viewLists.forEach(function (item) {
                    dateFields = dateFields.concat(item.filter(function (field) {
                        return field.dataType == wjcCore.DataType.Date;
                    }));
                });
                if (dateFields.length > 0) {
                    result.forEach(function (dataItem) {
                        dateFields.forEach(function (dateField) {
                            var bnd = dateField._binding, value = bnd.getValue(dataItem);
                            if (wjcCore.isString(value)) {
                                bnd.setValue(dataItem, new Date(value));
                            }
                        });
                    });
                }
                wjcCore.asFunction(callBack)(result);
            },
            error: function (xhr) {
                _this._handleError('Result', xhr);
            }
        });
    };
    _ServerConnection.prototype._handleError = function (msg, xhr) {
        this.clearPendingRequests();
        msg = '** HttpRequest error on command "' + msg + '"';
        if (this._ng.onError(new wjcCore.RequestErrorEventArgs(xhr, msg))) {
            this._throwResponseError(msg, xhr);
        }
    };
    _ServerConnection.prototype._throwResponseError = function (msg, xhr) {
        msg = msg + '\r\n' +
            xhr.status + '\r\n';
        var errText = xhr.responseText || '';
        if (xhr.status == 500) {
            if (xhr.responseText) {
                var oRes = JSON.parse(xhr.responseText);
                errText = oRes['ExceptionMessage'];
            }
        }
        msg += errText || xhr.statusText;
        throw msg;
    };
    _ServerConnection.prototype._sendHttpRequest = function (command, settings) {
        var url = this._getUrl(command);
        this._request = wjcCore.httpRequest(url, settings);
    };
    _ServerConnection.prototype._clearToken = function () {
        if (this._token) {
            this._clearRequest();
            this._clearTimeout();
            this._sendHttpRequest('Clear', {
                method: 'DELETE'
            });
            this._token = null;
        }
    };
    _ServerConnection.prototype._clearRequest = function () {
        if (this._request && this._request.readyState != 4) {
            this._request.abort();
            this._request = null;
        }
    };
    _ServerConnection.prototype._clearTimeout = function () {
        if (this._toGetStatus) {
            clearTimeout(this._toGetStatus);
            this._toGetStatus = null;
        }
    };
    _ServerConnection._TIMEOUT = 1000 * 60;
    _ServerConnection._POLL_INTERVAL = 500;
    _ServerConnection._MAXDETAIL = 1000;
    return _ServerConnection;
}());
exports._ServerConnection = _ServerConnection;
var _ServerTally = (function (_super) {
    __extends(_ServerTally, _super);
    function _ServerTally() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _ServerTally.prototype.add = function (value, weight) {
        wjcCore.assert(this._cnt == 0, 'Server tallies have a single value.');
        this._aggregatedValue = value;
    };
    _ServerTally.prototype.getAggregate = function (aggregate) {
        return this._aggregatedValue;
    };
    return _ServerTally;
}(_Tally));
'use strict';
wjcCore.culture.olap = wjcCore.culture.olap || {};
wjcCore.culture.olap._ListContextMenu = window['wijmo'].culture.olap._ListContextMenu || {
    up: 'Move Up',
    down: 'Move Down',
    first: 'Move to Beginning',
    last: 'Move to End',
    filter: 'Move to Report Filter',
    rows: 'Move to Row Labels',
    cols: 'Move to Column Labels',
    vals: 'Move to Values',
    remove: 'Remove Field',
    edit: 'Field Settings...',
    detail: 'Show Detail...'
};
var _ListContextMenu = (function (_super) {
    __extends(_ListContextMenu, _super);
    function _ListContextMenu(full) {
        var _this = _super.call(this, document.createElement('div'), {
            header: 'Field Context Menu',
            displayMemberPath: 'text',
            commandParameterPath: 'parm',
            command: {
                executeCommand: function (parm) {
                    _this._execute(parm);
                },
                canExecuteCommand: function (parm) {
                    return _this._canExecute(parm);
                }
            }
        }) || this;
        _this._full = full;
        _this.itemsSource = _this._getMenuItems(full);
        wjcCore.addClass(_this.dropDown, 'context-menu');
        return _this;
    }
    _ListContextMenu.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        this.itemsSource = this._getMenuItems(this._full);
        _super.prototype.refresh.call(this, fullUpdate);
    };
    _ListContextMenu.prototype.attach = function (grid) {
        var _this = this;
        wjcCore.assert(grid instanceof wjcGrid.FlexGrid, 'Expecting a FlexGrid control...');
        var owner = grid.hostElement;
        owner.addEventListener('contextmenu', function (e) {
            if (_this._selectField(grid, e)) {
                e.preventDefault();
                _this.owner = owner;
                _this.show(e);
            }
        });
    };
    _ListContextMenu.prototype._selectField = function (grid, e) {
        var ht = grid.hitTest(e);
        if (ht.panel != grid.cells || !ht.range.isValid) {
            return false;
        }
        var fld = grid.rows[ht.row].dataItem;
        if (fld instanceof CubePivotField && fld.subFields && fld.subFields.length) {
            return false;
        }
        grid.select(ht.range, true);
        return true;
    };
    _ListContextMenu.prototype._getMenuItems = function (full) {
        var items;
        if (full) {
            items = [
                { text: '<div class="menu-icon"></div>*', parm: 'up' },
                { text: '<div class="menu-icon"></div>*', parm: 'down' },
                { text: '<div class="menu-icon"></div>*', parm: 'first' },
                { text: '<div class="menu-icon"></div>*', parm: 'last' },
                { text: '<div class="wj-separator"></div>' },
                { text: '<div class="menu-icon"><span class="wj-glyph-filter"></span></div>*', parm: 'filter' },
                { text: '<div class="menu-icon">&#8801;</div>*', parm: 'rows' },
                { text: '<div class="menu-icon">&#10996;</div>*', parm: 'cols' },
                { text: '<div class="menu-icon">&#931;</div>*', parm: 'vals' },
                { text: '<div class="wj-separator"></div>' },
                { text: '<div class="menu-icon menu-icon-remove">&#10006;</div>*', parm: 'remove' },
                { text: '<div class="wj-separator"></div>' },
                { text: '<div class="menu-icon">&#9965;</div>*', parm: 'edit' }
            ];
        }
        else {
            items = [
                { text: '<div class="menu-icon"><span class="wj-glyph-filter"></span></div>*', parm: 'filter' },
                { text: '<div class="menu-icon">&#8801;</div>*', parm: 'rows' },
                { text: '<div class="menu-icon">&#10996;</div>*', parm: 'cols' },
                { text: '<div class="menu-icon">&#931;</div>*', parm: 'vals' },
                { text: '<div class="wj-separator"></div>' },
                { text: '<div class="menu-icon">&#9965;</div>*', parm: 'edit' }
            ];
        }
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.parm) {
                var text = wjcCore.culture.olap._ListContextMenu[item.parm];
                wjcCore.assert(text, 'missing localized text for item ' + item.parm);
                item.text = item.text.replace(/([^>]+$)/, text);
            }
        }
        return items;
    };
    _ListContextMenu.prototype._execute = function (parm) {
        var grid = wjcCore.Control.getControl(this.owner), flds = grid.itemsSource, row = grid.selection.row, fld = grid.rows[row].dataItem, ng = fld ? fld.engine : null, target = this._getTargetList(ng, parm);
        switch (parm) {
            case 'up':
            case 'first':
            case 'down':
            case 'last':
                if (ng) {
                    var index_1 = flds.indexOf(fld), newIndex_1 = parm == 'up' ? index_1 - 1 :
                        parm == 'first' ? 0 :
                            parm == 'down' ? index_1 + 1 :
                                parm == 'last' ? flds.length :
                                    -1;
                    ng.deferUpdate(function () {
                        flds.removeAt(index_1);
                        flds.insert(newIndex_1, fld);
                    });
                }
                break;
            case 'filter':
            case 'rows':
            case 'cols':
            case 'vals':
                if (target && fld) {
                    target.push(fld);
                }
                break;
            case 'remove':
                if (fld) {
                    ng.removeField(fld);
                }
                break;
            case 'edit':
                if (fld) {
                    ng.editField(fld);
                }
                break;
        }
    };
    _ListContextMenu.prototype._canExecute = function (parm) {
        var grid = wjcCore.Control.getControl(this.owner);
        if (!grid) {
            return false;
        }
        var row = grid.selection.row, fld = row > -1 ? grid.rows[row].dataItem : null, ng = fld ? fld.engine : null, target = this._getTargetList(ng, parm);
        switch (parm) {
            case 'up':
            case 'first':
                return row > 0;
            case 'down':
            case 'last':
                return row < grid.rows.length - 1;
            case 'filter':
            case 'rows':
            case 'cols':
            case 'vals':
                return target && target.indexOf(fld) < 0;
            case 'edit':
                return ng && ng.allowFieldEditing;
            case 'detail':
                return fld && !(fld instanceof CubePivotField);
        }
        return true;
    };
    _ListContextMenu.prototype._getTargetList = function (engine, parm) {
        if (engine) {
            switch (parm) {
                case 'filter':
                    return engine.filterFields;
                case 'rows':
                    return engine.rowFields;
                case 'cols':
                    return engine.columnFields;
                case 'vals':
                    return engine.valueFields;
            }
        }
        return null;
    };
    return _ListContextMenu;
}(wjcInput.Menu));
exports._ListContextMenu = _ListContextMenu;
'use strict';
wjcCore.culture.olap = wjcCore.culture.olap || {};
wjcCore.culture.olap.PivotPanel = window['wijmo'].culture.olap.PivotPanel || {
    fields: 'Choose fields to add to report:',
    drag: 'Drag fields between areas below:',
    filters: 'Filters',
    cols: 'Columns',
    rows: 'Rows',
    vals: 'Values',
    defer: 'Defer Updates',
    update: 'Update'
};
var PivotPanel = (function (_super) {
    __extends(PivotPanel, _super);
    function PivotPanel(element, options) {
        var _this = _super.call(this, element, null, true) || this;
        _this._showIcons = true;
        _this._restrictDrag = null;
        _this.itemsSourceChanged = new wjcCore.Event();
        _this.viewDefinitionChanged = new wjcCore.Event();
        _this.updatingView = new wjcCore.Event();
        _this.updatedView = new wjcCore.Event();
        var depErr = 'Missing dependency: PivotPanel requires ';
        wjcCore.assert(wjcInput != null, depErr + 'wijmo.input.');
        wjcCore.assert(wjcGrid != null && wjcGridFilter != null, depErr + 'wijmo.grid.filter.');
        var tpl = _this.getTemplate();
        _this.applyTemplate('wj-control wj-content wj-pivotpanel', tpl, {
            _dFields: 'd-fields',
            _dFilters: 'd-filters',
            _dRows: 'd-rows',
            _dCols: 'd-cols',
            _dVals: 'd-vals',
            _dProgress: 'd-prog',
            _btnUpdate: 'btn-update',
            _chkDefer: 'chk-defer',
            _gFlds: 'g-flds',
            _gDrag: 'g-drag',
            _gFlt: 'g-flt',
            _gCols: 'g-cols',
            _gRows: 'g-rows',
            _gVals: 'g-vals',
            _gDefer: 'g-defer'
        });
        _this._globalize();
        var host = _this.hostElement;
        _this.addEventListener(host, 'dragstart', _this._dragstart.bind(_this));
        _this.addEventListener(host, 'dragover', _this._dragover.bind(_this));
        _this.addEventListener(host, 'dragleave', _this._dragover.bind(_this));
        _this.addEventListener(host, 'drop', _this._drop.bind(_this));
        _this.addEventListener(host, 'dragend', _this._dragend.bind(_this));
        _this._lbFields = _this._createFieldGrid(_this._dFields);
        _this._lbFilters = _this._createFieldGrid(_this._dFilters);
        _this._lbRows = _this._createFieldGrid(_this._dRows);
        _this._lbCols = _this._createFieldGrid(_this._dCols);
        _this._lbVals = _this._createFieldGrid(_this._dVals);
        var ctx = _this._ctxMenuShort = new _ListContextMenu(false);
        ctx.attach(_this._lbFields);
        ctx = _this._ctxMenuFull = new _ListContextMenu(true);
        ctx.attach(_this._lbFilters);
        ctx.attach(_this._lbRows);
        ctx.attach(_this._lbCols);
        ctx.attach(_this._lbVals);
        _this._dMarker = wjcCore.createElement('<div class="wj-marker" style="display:none">&nbsp;</div>');
        _this.hostElement.appendChild(_this._dMarker);
        _this.addEventListener(_this._btnUpdate, 'click', function (e) {
            _this._ng.refresh(true);
            e.preventDefault();
        });
        _this.addEventListener(_this._chkDefer, 'click', function (e) {
            wjcCore.enable(_this._btnUpdate, _this._chkDefer.checked);
            if (_this._chkDefer.checked) {
                _this._ng.beginUpdate();
            }
            else {
                _this._ng.endUpdate();
            }
        });
        _this.engine = new PivotEngine();
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(PivotPanel.prototype, "engine", {
        get: function () {
            return this._ng;
        },
        set: function (value) {
            if (this._ng) {
                this._ng.itemsSourceChanged.removeHandler(this._itemsSourceChanged);
                this._ng.viewDefinitionChanged.removeHandler(this._viewDefinitionChanged);
                this._ng.updatingView.removeHandler(this._updatingView);
                this._ng.updatedView.removeHandler(this._updatedView);
                this._ng.error.removeHandler(this._requestError);
            }
            value = wjcCore.asType(value, PivotEngine, false);
            this._ng = value;
            this._ng.itemsSourceChanged.addHandler(this._itemsSourceChanged, this);
            this._ng.viewDefinitionChanged.addHandler(this._viewDefinitionChanged, this);
            this._ng.updatingView.addHandler(this._updatingView, this);
            this._ng.updatedView.addHandler(this._updatedView, this);
            this._ng.error.addHandler(this._requestError, this);
            this._lbFields.itemsSource = value.fields;
            this._lbFilters.itemsSource = value.filterFields;
            this._lbRows.itemsSource = value.rowFields;
            this._lbCols.itemsSource = value.columnFields;
            this._lbVals.itemsSource = value.valueFields;
            this._lbFields.collectionView.filter = function (item) {
                return item.parentField == null;
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotPanel.prototype, "itemsSource", {
        get: function () {
            return this._ng.itemsSource;
        },
        set: function (value) {
            this._ng.itemsSource = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotPanel.prototype, "collectionView", {
        get: function () {
            return this._ng.collectionView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotPanel.prototype, "pivotView", {
        get: function () {
            return this._ng.pivotView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotPanel.prototype, "autoGenerateFields", {
        get: function () {
            return this.engine.autoGenerateFields;
        },
        set: function (value) {
            this._ng.autoGenerateFields = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotPanel.prototype, "fields", {
        get: function () {
            return this._ng.fields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotPanel.prototype, "rowFields", {
        get: function () {
            return this._ng.rowFields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotPanel.prototype, "columnFields", {
        get: function () {
            return this._ng.columnFields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotPanel.prototype, "valueFields", {
        get: function () {
            return this._ng.valueFields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotPanel.prototype, "filterFields", {
        get: function () {
            return this._ng.filterFields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotPanel.prototype, "viewDefinition", {
        get: function () {
            return this._ng.viewDefinition;
        },
        set: function (value) {
            this._ng.viewDefinition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotPanel.prototype, "isViewDefined", {
        get: function () {
            return this._ng.isViewDefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotPanel.prototype, "showFieldIcons", {
        get: function () {
            return this._showIcons;
        },
        set: function (value) {
            if (value != this._showIcons) {
                this._showIcons = wjcCore.asBoolean(value);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotPanel.prototype, "restrictDragging", {
        get: function () {
            return this._restrictDrag;
        },
        set: function (value) {
            this._restrictDrag = wjcCore.asBoolean(value, true);
        },
        enumerable: true,
        configurable: true
    });
    PivotPanel.prototype.onItemsSourceChanged = function (e) {
        this.itemsSourceChanged.raise(this, e);
    };
    PivotPanel.prototype.onViewDefinitionChanged = function (e) {
        this.viewDefinitionChanged.raise(this, e);
    };
    PivotPanel.prototype.onUpdatingView = function (e) {
        this.updatingView.raise(this, e);
    };
    PivotPanel.prototype.onUpdatedView = function (e) {
        this.updatedView.raise(this, e);
    };
    PivotPanel.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        this._lbFields.refresh();
        this._lbFilters.refresh();
        this._lbRows.refresh();
        this._lbCols.refresh();
        this._lbVals.refresh();
        if (fullUpdate) {
            this._globalize();
            this._ctxMenuShort.refresh();
            this._ctxMenuFull.refresh();
        }
        _super.prototype.refresh.call(this, fullUpdate);
    };
    PivotPanel.prototype._copy = function (key, value) {
        switch (key) {
            case 'engine':
                this.engine = value;
                return true;
        }
        return false;
    };
    PivotPanel.prototype._globalize = function () {
        var strings = wjcCore.culture.olap.PivotPanel;
        wjcCore.setText(this._gFlds, strings.fields);
        wjcCore.setText(this._gDrag, strings.drag);
        wjcCore.setText(this._gFlt, strings.filters);
        wjcCore.setText(this._gCols, strings.cols);
        wjcCore.setText(this._gRows, strings.rows);
        wjcCore.setText(this._gVals, strings.vals);
        wjcCore.setText(this._gDefer, strings.defer);
        wjcCore.setText(this._btnUpdate, strings.update);
    };
    PivotPanel.prototype._itemsSourceChanged = function (s, e) {
        this.onItemsSourceChanged(e);
    };
    PivotPanel.prototype._viewDefinitionChanged = function (s, e) {
        if (!s.isUpdating) {
            this.invalidate();
            this.onViewDefinitionChanged(e);
        }
    };
    PivotPanel.prototype._updatingView = function (s, e) {
        var pct = wjcCore.clamp(e.progress, 5, 100) % 100;
        this._dProgress.style.width = pct + '%';
        this.onUpdatingView(e);
    };
    PivotPanel.prototype._updatedView = function (s, e) {
        this.onUpdatedView(e);
    };
    PivotPanel.prototype._requestError = function (s, e) {
        this._dProgress.style.width = '0';
    };
    PivotPanel.prototype._createFieldGrid = function (host) {
        var _this = this;
        var grid = new wjcGrid.FlexGrid(host, {
            autoGenerateColumns: false,
            childItemsPath: 'subFields',
            columns: [
                { binding: 'header', width: '*' }
            ],
            headersVisibility: 'None',
            selectionMode: 'Cell',
            showAlternatingRows: false
        });
        var root = host.querySelector('[wj-part=root]');
        root.style.overflowX = 'hidden';
        grid.formatItem.addHandler(function (s, e) {
            var fld = s.rows[e.row].dataItem;
            wjcCore.assert(fld instanceof PivotField, 'PivotField expected...');
            var isHeader = fld instanceof CubePivotField &&
                fld.subFields != null &&
                fld.subFields.length > 0;
            wjcCore.toggleClass(e.cell, 'wj-header', isHeader);
            e.cell.setAttribute('draggable', (!isHeader).toString());
            var html = e.cell.innerHTML;
            if (fld.filter.isActive) {
                html += '&nbsp;&nbsp;<span class="wj-glyph-filter"></span>';
            }
            if (s == _this._lbVals) {
                html += ' <span class="wj-aggregate">(' + wjcCore.Aggregate[fld.aggregate] + ')</span>';
            }
            if (s == _this._lbFields && !isHeader) {
                if (_this._showIcons) {
                    var fldType = fld.isMeasure ? 'measure' : 'dimension';
                    html = '<span class="wj-glyph-' + fldType + '"></span> ' + html;
                }
                html = '<label><input type="checkbox"' +
                    (fld.isActive ? ' checked' : '') +
                    '> ' + html + '</label>';
            }
            e.cell.innerHTML = html;
        });
        grid.addEventListener(host, 'click', function (e) {
            var check = e.target;
            if (check instanceof HTMLInputElement && check.type == 'checkbox') {
                var sel = grid.selection, fld = sel && sel.row > -1 ? grid.rows[sel.row].dataItem : null;
                if (fld instanceof PivotField) {
                    fld.isActive = check.checked;
                }
            }
        });
        return grid;
    };
    PivotPanel.prototype._dragstart = function (e) {
        var target = this._getFlexGridTarget(e);
        if (target) {
            this._dragField = this._hitTestField(target, e);
            this._dragSource = this._dragField instanceof PivotField
                ? target.hostElement
                : null;
            if (this._dragSource && e.dataTransfer) {
                wjcCore._startDrag(e.dataTransfer, 'copyMove');
                e.stopPropagation();
            }
        }
    };
    PivotPanel.prototype._dragover = function (e) {
        var valid = false;
        var target = this._getFlexGridTarget(e);
        if (target && this._dragField) {
            if (this._dragSource == this._dFields && target != this._lbFields) {
                var list = target.itemsSource;
                if (list.maxItems == null || list.length < list.maxItems) {
                    var fld = this._dragField;
                    if (target.itemsSource.indexOf(fld) < 0) {
                        valid = true;
                    }
                    else if (target == this._lbVals) {
                        valid = fld instanceof CubePivotField ? false : true;
                    }
                }
            }
            if (this._dragSource && this._dragSource != this._dFields) {
                valid = true;
            }
        }
        if (valid && this._getRestrictDrag()) {
            if (this._dragSource != target.hostElement) {
                var isMeasure = this._dragField.isMeasure;
                if (target == this._lbVals) {
                    valid = isMeasure;
                }
                else if (target == this._lbRows || target == this._lbCols) {
                    valid = !isMeasure;
                }
            }
        }
        if (valid) {
            this._updateDropMarker(target, e);
            e.dataTransfer.dropEffect = this._dragSource == this._dFields ? 'copy' : 'move';
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            this._updateDropMarker();
        }
    };
    PivotPanel.prototype._drop = function (e) {
        var _this = this;
        var target = this._getFlexGridTarget(e);
        if (target && this._dragField) {
            var source = wjcCore.Control.getControl(this._dragSource), fld_1 = this._dragField;
            if (source == this._lbFields && target == this._lbVals) {
                if (target.itemsSource.indexOf(fld_1) > -1) {
                    fld_1 = fld_1._clone();
                    this.engine.fields.push(fld_1);
                }
            }
            if (target == this._lbFields) {
                fld_1.isActive = false;
            }
            else {
                this._ng.deferUpdate(function () {
                    var items = target.itemsSource, index = items.indexOf(fld_1);
                    if (index != _this._dropIndex) {
                        if (index > -1) {
                            items.removeAt(index);
                            if (index < _this._dropIndex) {
                                _this._dropIndex--;
                            }
                        }
                        items.insert(_this._dropIndex, fld_1);
                    }
                });
            }
        }
        this._resetMouseState();
    };
    PivotPanel.prototype._dragend = function (e) {
        this._resetMouseState();
    };
    PivotPanel.prototype._hitTestField = function (grid, e) {
        var ht = grid.hitTest(e);
        if (ht.panel == grid.cells && ht.range.isValid) {
            grid.select(ht.range, true);
            return grid.rows[ht.row].dataItem;
        }
        return null;
    };
    PivotPanel.prototype._getRestrictDrag = function () {
        var restrict = this._restrictDrag;
        if (restrict == null && this.fields.length) {
            restrict = this.fields[0] instanceof CubePivotField;
        }
        return restrict;
    };
    PivotPanel.prototype._resetMouseState = function () {
        this._dragSource = null;
        this._updateDropMarker();
    };
    PivotPanel.prototype._getFlexGridTarget = function (e) {
        var grid = wjcCore.Control.getControl(wjcCore.closest(e.target, '.wj-flexgrid'));
        return grid instanceof wjcGrid.FlexGrid ? grid : null;
    };
    PivotPanel.prototype._updateDropMarker = function (grid, e) {
        if (!e) {
            this._dMarker.style.display = 'none';
            return;
        }
        var rc;
        if (!grid.rows.length) {
            rc = wjcCore.Rect.fromBoundingRect(grid.hostElement.getBoundingClientRect());
            rc.top += 4;
            this._dropIndex = 0;
        }
        else {
            var ht = grid.hitTest(e), row = ht.row;
            if (row > -1) {
                rc = grid.getCellBoundingRect(row, 0);
                if (ht.point.y > rc.top + rc.height / 2) {
                    rc.top += rc.height;
                    row++;
                }
                this._dropIndex = row;
            }
            else {
                row = grid.viewRange.bottomRow;
                rc = grid.getCellBoundingRect(row, 0);
                rc.top += rc.height;
                this._dropIndex = row + 1;
            }
        }
        var rcHost = this.hostElement.getBoundingClientRect();
        wjcCore.setCss(this._dMarker, {
            left: Math.round(rc.left - rcHost.left),
            top: Math.round(rc.top - rcHost.top - 2),
            width: Math.round(rc.width),
            height: 4,
            display: ''
        });
    };
    PivotPanel.controlTemplate = '<div>' +
        '<label wj-part="g-flds"></label>' +
        '<div wj-part="d-fields"></div>' +
        '<label wj-part="g-drag"></label>' +
        '<table>' +
        '<tr>' +
        '<td width="50%">' +
        '<label><span class="wj-glyph wj-glyph-filter"></span> <span wj-part="g-flt"></span></label>' +
        '<div wj-part="d-filters"></div>' +
        '</td>' +
        '<td width= "50%" style= "border-left-style:solid">' +
        '<label><span class="wj-glyph">&#10996;</span> <span wj-part="g-cols"></span></label>' +
        '<div wj-part="d-cols"></div>' +
        '</td>' +
        '</tr>' +
        '<tr style= "border-top-style:solid">' +
        '<td width="50%">' +
        '<label><span class="wj-glyph">&#8801;</span> <span wj-part="g-rows"></span></label>' +
        '<div wj-part="d-rows"></div>' +
        '</td>' +
        '<td width= "50%" style= "border-left-style:solid">' +
        '<label><span class="wj-glyph">&#931;</span> <span wj-part="g-vals"></span></label>' +
        '<div wj-part="d-vals"></div>' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '<div wj-part="d-prog" class="wj-state-selected" style="width:0px;height:3px"></div>' +
        '<div style="display:table">' +
        '<label style="display:table-cell;vertical-align:middle">' +
        '<input wj-part="chk-defer" type="checkbox"/> <span wj-part="g-defer"></span>' +
        '</label>' +
        '<a wj-part="btn-update" href="" draggable="false" disabled class="wj-state-disabled"></a>' +
        '</div>' +
        '</div>';
    return PivotPanel;
}(wjcCore.Control));
exports.PivotPanel = PivotPanel;
'use strict';
var _GridContextMenu = (function (_super) {
    __extends(_GridContextMenu, _super);
    function _GridContextMenu() {
        var _this = _super.call(this, document.createElement('div'), {
            header: 'PivotGrid Context Menu',
            displayMemberPath: 'text',
            commandParameterPath: 'parm',
            command: {
                executeCommand: function (parm) {
                    _this._execute(parm);
                },
                canExecuteCommand: function (parm) {
                    return _this._canExecute(parm);
                }
            }
        }) || this;
        _this.itemsSource = _this._getMenuItems();
        wjcCore.addClass(_this.dropDown, 'context-menu');
        return _this;
    }
    _GridContextMenu.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        this.itemsSource = this._getMenuItems();
        _super.prototype.refresh.call(this, fullUpdate);
    };
    _GridContextMenu.prototype.attach = function (grid) {
        var _this = this;
        wjcCore.assert(grid instanceof PivotGrid, 'Expecting a PivotGrid control...');
        var owner = grid.hostElement;
        owner.addEventListener('contextmenu', function (e) {
            if (grid.customContextMenu) {
                e.preventDefault();
                _this.owner = owner;
                if (_this._selectField(e)) {
                    var dropDown = _this.dropDown;
                    _this.selectedIndex = -1;
                    if (_this.onIsDroppedDownChanging(new wjcCore.CancelEventArgs())) {
                        wjcCore.showPopup(dropDown, e);
                        _this.onIsDroppedDownChanged();
                        dropDown.focus();
                    }
                }
            }
        });
    };
    _GridContextMenu.prototype._selectField = function (e) {
        this._targetField = null;
        this._htDown = null;
        var g = wjcCore.Control.getControl(this.owner), ng = g.engine, ht = g.hitTest(e);
        switch (ht.cellType) {
            case wjcGrid.CellType.Cell:
                g.select(ht.range);
                this._targetField = ng.valueFields[ht.col % ng.valueFields.length];
                this._htDown = ht;
                break;
            case wjcGrid.CellType.ColumnHeader:
                this._targetField = ng.columnFields[ht.row];
                break;
            case wjcGrid.CellType.RowHeader:
                this._targetField = ng.rowFields[ht.col];
                break;
            case wjcGrid.CellType.TopLeft:
                if (ht.row == ht.panel.rows.length - 1) {
                    this._targetField = ng.rowFields[ht.col];
                }
                break;
        }
        return this._targetField != null;
    };
    _GridContextMenu.prototype._getMenuItems = function () {
        var items = [
            { text: '<div class="menu-icon menu-icon-remove">&#10006;</div>Remove Field', parm: 'remove' },
            { text: '<div class="menu-icon">&#9965;</div>Field Settings...', parm: 'edit' },
            { text: '<div class="wj-separator"></div>' },
            { text: '<div class="menu-icon">&#8981;</div>Show Detail...', parm: 'detail' }
        ];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.parm) {
                var text = wjcCore.culture.olap._ListContextMenu[item.parm];
                wjcCore.assert(text, 'missing localized text for item ' + item.parm);
                item.text = item.text.replace(/([^>]+$)/, text);
            }
        }
        return items;
    };
    _GridContextMenu.prototype._execute = function (parm) {
        var g = wjcCore.Control.getControl(this.owner), fld = this._targetField, ht = this._htDown;
        switch (parm) {
            case 'remove':
                g.engine.removeField(fld);
                break;
            case 'edit':
                g.engine.editField(fld);
                break;
            case 'detail':
                g.showDetail(ht.row, ht.col);
                break;
        }
    };
    _GridContextMenu.prototype._canExecute = function (parm) {
        var fld = this._targetField, grid = wjcCore.Control.getControl(this.owner), ng = grid ? grid.engine : null;
        switch (parm) {
            case 'remove':
                return fld != null;
            case 'edit':
                return fld != null && ng && ng.allowFieldEditing;
            case 'detail':
                return this._htDown != null &&
                    fld != null && !(fld instanceof CubePivotField);
        }
        return true;
    };
    return _GridContextMenu;
}(wjcInput.Menu));
exports._GridContextMenu = _GridContextMenu;
'use strict';
var _PivotMergeManager = (function (_super) {
    __extends(_PivotMergeManager, _super);
    function _PivotMergeManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _PivotMergeManager.prototype.getMergedRange = function (p, r, c, clip) {
        if (clip === void 0) { clip = true; }
        var view = p.grid.collectionView;
        this._ng = view instanceof PivotCollectionView
            ? view.engine
            : null;
        if (!this._ng) {
            return _super.prototype.getMergedRange.call(this, p, r, c, clip);
        }
        if (r < 0 || r >= p.rows.length || c < 0 || c >= p.columns.length) {
            return null;
        }
        switch (p.cellType) {
            case wjcGrid.CellType.TopLeft:
                return this._getMergedTopLeftRange(p, r, c);
            case wjcGrid.CellType.RowHeader:
                return this._getMergedRowHeaderRange(p, r, c, clip ? p.viewRange : null);
            case wjcGrid.CellType.ColumnHeader:
                return this._getMergedColumnHeaderRange(p, r, c, clip ? p.viewRange : null);
        }
        return null;
    };
    _PivotMergeManager.prototype._getMergedTopLeftRange = function (p, r, c) {
        var rng = new wjcGrid.CellRange(r, c);
        while (rng.col > 0 && !p.getCellData(r, rng.col, true)) {
            rng.col--;
        }
        while (rng.col2 < p.columns.length - 1 && !p.getCellData(r, rng.col2 + 1, true)) {
            rng.col2++;
        }
        return rng;
    };
    _PivotMergeManager.prototype._getMergedRowHeaderRange = function (p, r, c, rng) {
        var rowLevel = this._ng._getRowLevel(r);
        if (rowLevel > -1 && c >= rowLevel) {
            var val = p.getCellData(r, c, false), c1 = void 0, c2 = void 0, cMin = rng ? rng.col : 0, cMax = rng ? rng.col2 : p.columns.length - 1;
            for (c1 = c; c1 > cMin; c1--) {
                if (p.getCellData(r, c1 - 1, false) != val) {
                    break;
                }
            }
            for (c2 = c; c2 < cMax; c2++) {
                if (p.getCellData(r, c2 + 1, false) != val) {
                    break;
                }
            }
            return c1 != c2
                ? new wjcGrid.CellRange(r, c1, r, c2)
                : null;
        }
        var r1, r2, rMin = rng ? rng.row : 0, rMax = rng ? rng.row2 : p.rows.length - 1;
        for (r1 = r; r1 > rMin; r1--) {
            if (!this._sameColumnValues(p, r, r1 - 1, c)) {
                break;
            }
        }
        for (r2 = r; r2 < rMax; r2++) {
            if (!this._sameColumnValues(p, r, r2 + 1, c)) {
                break;
            }
        }
        if (r1 != r2) {
            return new wjcGrid.CellRange(r1, c, r2, c);
        }
        return null;
    };
    _PivotMergeManager.prototype._sameColumnValues = function (p, r1, r2, c) {
        for (; c >= 0; c--) {
            var v1 = p.getCellData(r1, c, false), v2 = p.getCellData(r2, c, false);
            if (v1 != v2) {
                return false;
            }
        }
        return true;
    };
    _PivotMergeManager.prototype._getMergedColumnHeaderRange = function (p, r, c, rng) {
        var key = this._ng._getKey(p.columns[c].binding), val = p.getCellData(r, c, false);
        var colLevel = this._ng._getColLevel(key);
        if (colLevel > -1 && r >= colLevel) {
            var r1 = void 0, r2 = void 0, rMin = rng ? rng.row : 0, rMax = rng ? rng.row2 : p.rows.length - 1;
            for (r1 = r; r1 > rMin; r1--) {
                if (p.getCellData(r1 - 1, c, false) != val) {
                    break;
                }
            }
            for (r2 = r; r2 < rMax; r2++) {
                if (p.getCellData(r2 + 1, c, false) != val) {
                    break;
                }
            }
            if (r1 != r2) {
                return new wjcGrid.CellRange(r1, c, r2, c);
            }
        }
        var c1, c2, cMin = rng ? rng.col : 0, cMax = rng ? rng.col2 : p.columns.length - 1;
        for (c1 = c; c1 > cMin; c1--) {
            if (!this._sameRowValues(p, r, c, c1 - 1)) {
                break;
            }
        }
        for (c2 = c; c2 < cMax; c2++) {
            if (!this._sameRowValues(p, r, c, c2 + 1)) {
                break;
            }
        }
        if (c1 != c2) {
            return new wjcGrid.CellRange(r, c1, r, c2);
        }
        return null;
    };
    _PivotMergeManager.prototype._sameRowValues = function (p, r, c1, c2) {
        for (; r >= 0; r--) {
            var v1 = p.getCellData(r, c1, false), v2 = p.getCellData(r, c2, false);
            if (v1 != v2) {
                return false;
            }
        }
        return true;
    };
    return _PivotMergeManager;
}(wjcGrid.MergeManager));
exports._PivotMergeManager = _PivotMergeManager;
'use strict';
var PivotGrid = (function (_super) {
    __extends(PivotGrid, _super);
    function PivotGrid(element, options) {
        var _this = _super.call(this, element) || this;
        _this._showDetailOnDoubleClick = true;
        _this._collapsibleSubtotals = true;
        _this._customCtxMenu = true;
        _this._showRowFldSort = false;
        _this._showRowFldHdrs = true;
        _this._showColFldHdrs = true;
        _this._centerVert = true;
        _this._collapsedKeys = {};
        wjcCore.addClass(_this.hostElement, 'wj-pivotgrid');
        _this.isReadOnly = true;
        _this.deferResizing = true;
        _this.showAlternatingRows = false;
        _this.autoGenerateColumns = false;
        _this.allowDragging = wjcGrid.AllowDragging.None;
        _this.mergeManager = new _PivotMergeManager(_this);
        _this.customContextMenu = true;
        _this.initialize(options);
        _this.formatItem.addHandler(_this._formatItem, _this);
        _this.addEventListener(_this.hostElement, 'mousedown', _this._mousedown.bind(_this), true);
        _this.addEventListener(_this.hostElement, 'mouseup', _this._mouseup.bind(_this), true);
        _this.addEventListener(_this.hostElement, 'dblclick', _this._dblclick.bind(_this), true);
        _this._ctxMenu = new _GridContextMenu();
        _this._ctxMenu.attach(_this);
        return _this;
    }
    Object.defineProperty(PivotGrid.prototype, "engine", {
        get: function () {
            return this._ng;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotGrid.prototype, "showDetailOnDoubleClick", {
        get: function () {
            return this._showDetailOnDoubleClick;
        },
        set: function (value) {
            this._showDetailOnDoubleClick = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotGrid.prototype, "showRowFieldHeaders", {
        get: function () {
            return this._showRowFldHdrs;
        },
        set: function (value) {
            if (value != this._showRowFldHdrs) {
                this._showRowFldHdrs = wjcCore.asBoolean(value);
                this._updateFixedContent();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotGrid.prototype, "showColumnFieldHeaders", {
        get: function () {
            return this._showColFldHdrs;
        },
        set: function (value) {
            if (value != this._showColFldHdrs) {
                this._showColFldHdrs = wjcCore.asBoolean(value);
                this._updateFixedContent();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotGrid.prototype, "showRowFieldSort", {
        get: function () {
            return this._showRowFldSort;
        },
        set: function (value) {
            if (value != this._showRowFldSort) {
                this._showRowFldSort = wjcCore.asBoolean(value);
                this._updateFixedContent();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotGrid.prototype, "customContextMenu", {
        get: function () {
            return this._customCtxMenu;
        },
        set: function (value) {
            this._customCtxMenu = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotGrid.prototype, "collapsibleSubtotals", {
        get: function () {
            return this._collapsibleSubtotals;
        },
        set: function (value) {
            if (value != this._collapsibleSubtotals) {
                this._collapsibleSubtotals = wjcCore.asBoolean(value);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotGrid.prototype, "centerHeadersVertically", {
        get: function () {
            return this._centerVert;
        },
        set: function (value) {
            if (value != this._centerVert) {
                this._centerVert = wjcCore.asBoolean(value);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    PivotGrid.prototype.getDetail = function (row, col) {
        var item = this.rows[wjcCore.asInt(row)].dataItem, binding = this.columns[wjcCore.asInt(col)].binding;
        return this._ng.getDetail(item, binding);
    };
    PivotGrid.prototype.getKeys = function (row, col) {
        var item = this.rows[wjcCore.asInt(row)].dataItem, binding = this.columns[wjcCore.asInt(col)].binding;
        return this._ng.getKeys(item, binding);
    };
    PivotGrid.prototype.getDetailView = function (row, col) {
        var item = this.rows[wjcCore.asInt(row)].dataItem, binding = this.columns[wjcCore.asInt(col)].binding;
        return this._ng.getDetailView(item, binding);
    };
    PivotGrid.prototype.showDetail = function (row, col) {
        var dd = new DetailDialog(document.createElement('div'));
        dd.showDetail(this, new wjcGrid.CellRange(row, col));
        var dlg = new wjcInput.Popup(document.createElement('div'));
        dlg.content = dd.hostElement;
        dlg.show(true);
    };
    PivotGrid.prototype.collapseRowsToLevel = function (level) {
        this._collapseRowsToLevel(level);
    };
    PivotGrid.prototype.collapseColumnsToLevel = function (level) {
        this._collapseColsToLevel(level);
    };
    PivotGrid.prototype._getQuickAutoSize = function () {
        return wjcCore.isBoolean(this.quickAutoSize)
            ? this.quickAutoSize
            : this.formatItem.handlerCount <= 1 && this.itemFormatter == null;
    };
    PivotGrid.prototype._bindGrid = function (full) {
        var _this = this;
        this.deferUpdate(function () {
            var preserveState = _this.preserveOutlineState, collapsed = _this._collapsedKeys, rows = _this.rows, cols = _this.columns;
            if (!preserveState) {
                collapsed = _this._collapsedKeys = {};
            }
            _super.prototype._bindGrid.call(_this, full);
            if (_this._ng && preserveState && !wjcCore.isEmpty(collapsed)) {
                var tbd = _this._ng.totalsBeforeData, start = tbd ? rows.length - 1 : 0, end = tbd ? -1 : rows.length, step = tbd ? -1 : +1;
                for (var i = start; i != end; i += step) {
                    var item = rows[i].dataItem, key = item ? item[_PivotKey._ROW_KEY_NAME] : null;
                    if (key && key.level > 0 && collapsed[key.toString()]) {
                        _this._setRowCollapsed(new wjcGrid.CellRange(i, key.level - 1), true);
                    }
                }
                start = tbd ? cols.length - 1 : 0;
                end = tbd ? -1 : cols.length;
                step = tbd ? -1 : +1;
                for (var i = start; i != end; i += step) {
                    var binding = cols[i].binding, key = _this._ng._getKey(binding);
                    if (key && key.level > 0 && collapsed[key.toString()]) {
                        _this._setColCollapsed(new wjcGrid.CellRange(key.level - 1, i), true);
                    }
                }
            }
        });
    };
    PivotGrid.prototype._getCollectionView = function (value) {
        if (value instanceof PivotPanel) {
            value = value.engine.pivotView;
        }
        else if (value instanceof PivotEngine) {
            value = value.pivotView;
        }
        return wjcCore.asCollectionView(value);
    };
    PivotGrid.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        this._ctxMenu.refresh();
        _super.prototype.refresh.call(this, fullUpdate);
    };
    PivotGrid.prototype.onItemsSourceChanged = function (e) {
        if (this._ng) {
            this._ng.updatedView.removeHandler(this._updatedView, this);
            this._ng.viewDefinitionChanged.removeHandler(this._viewDefinitionChanged, this);
        }
        this._collapsedKeys = {};
        var view = this.collectionView;
        this._ng = view instanceof PivotCollectionView
            ? view.engine
            : null;
        if (this._ng) {
            this._ng.updatedView.addHandler(this._updatedView, this);
            this._ng.viewDefinitionChanged.addHandler(this._viewDefinitionChanged, this);
        }
        this._updatedView();
        _super.prototype.onItemsSourceChanged.call(this, e);
    };
    PivotGrid.prototype.onResizedColumn = function (e) {
        var ng = this._ng;
        if (ng) {
            if (e.panel == this.topLeftCells && e.col < ng.rowFields.length) {
                var fld = ng.rowFields[e.col];
                fld.width = e.panel.columns[e.col].renderWidth;
            }
            if (e.panel == this.columnHeaders && ng.valueFields.length > 0) {
                var fld = ng.valueFields[e.col % ng.valueFields.length];
                fld.width = e.panel.columns[e.col].renderWidth;
            }
        }
        _super.prototype.onResizedColumn.call(this, e);
    };
    PivotGrid.prototype._updatedView = function () {
        this._updateFixedCounts();
        this.columns.clear();
        this.rows.clear();
    };
    PivotGrid.prototype._viewDefinitionChanged = function () {
        this._collapsedKeys = {};
    };
    PivotGrid.prototype.onLoadedRows = function (e) {
        if (this.columns.length == 0) {
            var view = this.collectionView, arr = view ? view.sourceCollection : null;
            if (arr && arr.length) {
                var item = arr[0];
                for (var key in item) {
                    if (key != _PivotKey._ROW_KEY_NAME) {
                        var col = new wjcGrid.Column({
                            binding: key,
                            dataType: item[key] != null ? wjcCore.getType(item[key]) : wjcCore.DataType.Number
                        });
                        this.columns.push(col);
                    }
                }
            }
        }
        this._updateFixedContent();
        _super.prototype.onLoadedRows.call(this, e);
    };
    PivotGrid.prototype._updateFixedCounts = function () {
        var ng = this._ng, hasView = ng && ng.isViewDefined, cnt;
        cnt = Math.max(1, hasView ? ng.rowFields.length : 1);
        this._setLength(this.topLeftCells.columns, cnt);
        cnt = Math.max(1, hasView ? ng.columnFields.length : 1);
        if (ng && ng.columnFields.length && ng.valueFields.length > 1) {
            cnt++;
        }
        this._setLength(this.topLeftCells.rows, cnt);
    };
    PivotGrid.prototype._setLength = function (arr, cnt) {
        while (arr.length < cnt) {
            arr.push(arr instanceof wjcGrid.ColumnCollection ? new wjcGrid.Column() : new wjcGrid.Row());
        }
        while (arr.length > cnt) {
            arr.removeAt(arr.length - 1);
        }
    };
    PivotGrid.prototype._updateFixedContent = function () {
        var ng = this._ng, hasView = ng && ng.isViewDefined;
        if (!hasView) {
            this.topLeftCells.setCellData(0, 0, null);
            return;
        }
        var p = this.topLeftCells;
        for (var r = 0; r < p.rows.length; r++) {
            for (var c = 0; c < p.columns.length; c++) {
                var value = '';
                if (this.showRowFieldHeaders) {
                    if (c < ng.rowFields.length && r == p.rows.length - 1) {
                        value = ng.rowFields[c].header;
                    }
                }
                if (this.showColumnFieldHeaders) {
                    if (!value && r < ng.columnFields.length && c == 0) {
                        value = ng.columnFields[r].header + ':';
                    }
                }
                p.setCellData(r, c, value, false, false);
            }
        }
        p = this.rowHeaders;
        for (var r = 0; r < p.rows.length; r++) {
            var key = p.rows[r].dataItem[_PivotKey._ROW_KEY_NAME];
            wjcCore.assert(key instanceof _PivotKey, 'missing PivotKey for row...');
            for (var c = 0; c < p.columns.length; c++) {
                var value = key.getValue(c, true);
                p.setCellData(r, c, value, false, false);
            }
        }
        p = this.columnHeaders;
        for (var c = 0; c < p.columns.length; c++) {
            var key = ng._getKey(p.columns[c].binding), valFields = ng.valueFields, showHdr = valFields.length > 1 || valFields.length == 0 || key.level > -1;
            wjcCore.assert(key instanceof _PivotKey, 'missing PivotKey for column...');
            for (var r = 0; r < p.rows.length; r++) {
                var value = showHdr && r == p.rows.length - 1 && valFields.length
                    ? valFields[c % valFields.length].header
                    : key.getValue(r, true);
                p.setCellData(r, c, value, false, false);
            }
        }
        p = this.topLeftCells;
        for (var c = 0; c < p.columns.length; c++) {
            var col = p.columns[c], fld = (c < ng.rowFields.length ? ng.rowFields[c] : null);
            if (col.width == null) {
                col.width = (fld && wjcCore.isNumber(fld.width)) ? fld.width : this.columns.defaultSize;
            }
            col.wordWrap = fld ? fld.wordWrap : null;
            col.align = null;
        }
        p = this.cells;
        for (var c = 0; c < p.columns.length; c++) {
            var col = p.columns[c], fld = (ng.valueFields.length ? ng.valueFields[c % ng.valueFields.length] : null);
            if (col.width == null) {
                col.width = (fld && wjcCore.isNumber(fld.width)) ? fld.width : this.columns.defaultSize;
            }
            col.wordWrap = fld ? fld.wordWrap : null;
            col.format = fld ? fld.format : null;
        }
    };
    PivotGrid.prototype._formatItem = function (s, e) {
        var ng = this._ng;
        if (!ng) {
            return;
        }
        if (e.panel == this.topLeftCells) {
            e.cell.style.textAlign = '';
            var isColHdr = e.row < e.panel.rows.length - 1 || ng.rowFields.length == 0;
            wjcCore.toggleClass(e.cell, 'wj-col-field-hdr', isColHdr);
            wjcCore.toggleClass(e.cell, 'wj-row-field-hdr', !isColHdr);
        }
        if (e.panel == this.columnHeaders) {
            if (ng.valueFields.length < 2 || e.row < e.panel.rows.length - 1) {
                e.cell.style.textAlign = '';
            }
        }
        var rowLevel = ng._getRowLevel(e.row), colLevel = ng._getColLevel(e.panel.columns[e.col].binding);
        wjcCore.toggleClass(e.cell, 'wj-aggregate', rowLevel > -1 || colLevel > -1);
        if (this._collapsibleSubtotals) {
            if (e.panel == this.rowHeaders && ng._getShowRowTotals() == ShowTotals.Subtotals) {
                var rng = this.getMergedRange(e.panel, e.row, e.col, false) || e.range;
                if (e.col < ng.rowFields.length - 1 && rng.rowSpan > 1) {
                    e.cell.innerHTML = this._getCollapsedGlyph(this._getRowCollapsed(rng)) + e.cell.innerHTML;
                }
            }
            if (e.panel == this.columnHeaders && ng._getShowColTotals() == ShowTotals.Subtotals) {
                var rng = this.getMergedRange(e.panel, e.row, e.col, false) || e.range;
                if (e.row < ng.columnFields.length - 1 && rng.columnSpan > 1) {
                    e.cell.innerHTML = this._getCollapsedGlyph(this._getColCollapsed(rng)) + e.cell.innerHTML;
                }
            }
        }
        if (e.panel == this.topLeftCells && this.showRowFieldSort &&
            e.col < ng.rowFields.length && e.row == this._getSortRowIndex()) {
            var fld = ng.rowFields[e.col];
            wjcCore.toggleClass(e.cell, 'wj-sort-asc', !fld.descending);
            wjcCore.toggleClass(e.cell, 'wj-sort-desc', fld.descending);
            e.cell.innerHTML += ' <span class="wj-glyph-' + (fld.descending ? 'down' : 'up') + '"></span>';
        }
        if (this._centerVert && e.cell.hasChildNodes) {
            if (e.panel == this.rowHeaders || e.panel == this.columnHeaders) {
                var div = wjcCore.createElement('<div style="display:table-cell;vertical-align:middle"></div>');
                if (!this._docRange) {
                    this._docRange = document.createRange();
                }
                this._docRange.selectNodeContents(e.cell);
                this._docRange.surroundContents(div);
                wjcCore.setCss(e.cell, {
                    display: 'table',
                    tableLayout: 'fixed',
                    paddingTop: 0,
                    paddingBottom: 0
                });
            }
        }
    };
    PivotGrid.prototype._getCollapsedGlyph = function (collapsed) {
        return '<div style="display:inline-block;cursor:pointer" ' + PivotGrid._WJA_COLLAPSE + '>' +
            '<span class="wj-glyph-' + (collapsed ? 'plus' : 'minus') + '"></span>' +
            '</div>&nbsp';
    };
    PivotGrid.prototype._mousedown = function (e) {
        if (e.defaultPrevented || e.button != 0) {
            this._htDown = null;
            return;
        }
        this._htDown = this.hitTest(e);
        var icon = wjcCore.closest(e.target, '[' + PivotGrid._WJA_COLLAPSE + ']');
        if (icon != null && this._htDown.panel != null) {
            var rng = this._htDown.range, collapsed = void 0;
            switch (this._htDown.panel.cellType) {
                case wjcGrid.CellType.RowHeader:
                    collapsed = this._getRowCollapsed(rng);
                    if (e.shiftKey || e.ctrlKey) {
                        this._collapseRowsToLevel(rng.col + (collapsed ? 2 : 1));
                    }
                    else {
                        this._setRowCollapsed(rng, !collapsed);
                    }
                    break;
                case wjcGrid.CellType.ColumnHeader:
                    collapsed = this._getColCollapsed(rng);
                    if (e.shiftKey || e.ctrlKey) {
                        this._collapseColsToLevel(rng.row + (collapsed ? 2 : 1));
                    }
                    else {
                        this._setColCollapsed(rng, !collapsed);
                    }
                    break;
            }
            this._htDown = null;
            e.preventDefault();
        }
    };
    PivotGrid.prototype._mouseup = function (e) {
        if (!this._htDown || e.defaultPrevented || this.hostElement.style.cursor == 'col-resize') {
            return;
        }
        var ht = this.hitTest(e);
        if (this._htDown.panel != ht.panel || !ht.range.equals(this._htDown.range)) {
            return;
        }
        var ng = this._ng, topLeft = this.topLeftCells;
        if (ht.panel == topLeft && ht.row == topLeft.rows.length - 1 && ht.col > -1) {
            if (this.allowSorting && ht.panel.columns[ht.col].allowSorting) {
                var args = new wjcGrid.CellRangeEventArgs(ht.panel, ht.range);
                if (this.onSortingColumn(args)) {
                    ng.pivotView.sortDescriptions.clear();
                    var fld = ng.rowFields[ht.col];
                    fld.descending = !fld.descending;
                    this.onSortedColumn(args);
                }
            }
            e.preventDefault();
        }
    };
    PivotGrid.prototype._dblclick = function (e) {
        if (this._ng && this._ng.fields.length > 0) {
            if (!(this._ng.fields[0] instanceof CubePivotField)) {
                if (!e.defaultPrevented && this._showDetailOnDoubleClick) {
                    var ht = this._htDown;
                    if (ht && ht.panel == this.cells) {
                        this.showDetail(ht.row, ht.col);
                    }
                }
            }
        }
    };
    PivotGrid.prototype._getRowLevel = function (row) {
        return this._ng._getRowLevel(row);
    };
    PivotGrid.prototype._getGroupedRows = function (rng) {
        var getLevel = this._getRowLevel.bind(this), level = rng.col + 1, start, end;
        if (this._ng.totalsBeforeData) {
            for (end = rng.row; end < this.rows.length - 1; end++) {
                var lvl = getLevel(end + 1);
                if (lvl > -1 && lvl <= level)
                    break;
            }
            for (start = end; start > 0; start--) {
                if (getLevel(start) == level)
                    break;
            }
        }
        else {
            for (start = rng.row; start > 0; start--) {
                var lvl = getLevel(start - 1);
                if (lvl > -1 && lvl <= level)
                    break;
            }
            for (end = start; end < this.rows.length - 1; end++) {
                if (getLevel(end) == level)
                    break;
            }
        }
        if (getLevel(start) == level) {
            start++;
        }
        if (getLevel(end) == level) {
            end--;
        }
        wjcCore.assert(end >= start, 'group end < start?');
        return end >= start
            ? new wjcGrid.CellRange(start, rng.col, end, rng.col2)
            : rng;
    };
    PivotGrid.prototype._toggleRowCollapsed = function (rng) {
        this._setRowCollapsed(rng, !this._getRowCollapsed(rng));
    };
    PivotGrid.prototype._getRowCollapsed = function (rng) {
        rng = this._getGroupedRows(rng);
        var ng = this._ng, r = ng.totalsBeforeData ? rng.row - 1 : rng.row2 + 1, key = r > -1 && r < this.rows.length ? this.rows[r].dataItem[_PivotKey._ROW_KEY_NAME] : null;
        return key ? this._collapsedKeys[key.toString()] : false;
    };
    PivotGrid.prototype._setRowCollapsed = function (rng, collapse) {
        var _this = this;
        rng = this._getGroupedRows(rng);
        var ng = this._ng, r = ng.totalsBeforeData ? rng.row - 1 : rng.row2 + 1, key = r > -1 && r < this.rows.length ? this.rows[r].dataItem[_PivotKey._ROW_KEY_NAME] : null;
        if (key == null) {
            return;
        }
        this._collapsedKeys[key.toString()] = collapse;
        this.deferUpdate(function () {
            _this.rows[ng.totalsBeforeData ? rng.row - 1 : rng.row2 + 1].visible = true;
            for (var r_1 = rng.row; r_1 <= rng.row2; r_1++) {
                _this.rows[r_1].visible = !collapse;
            }
            if (!collapse) {
                var level = _this._getRowLevel(r), childRanges = [];
                for (var r_2 = rng.row; r_2 <= rng.row2; r_2++) {
                    if (_this._getRowLevel(r_2) > -1) {
                        var childRange = _this._getGroupedRows(new wjcGrid.CellRange(r_2, level));
                        wjcCore.assert(childRange.row >= rng.row && childRange.row2 <= rng.row2, 'child range overflow');
                        childRanges.push(childRange);
                        r_2++;
                    }
                }
                childRanges.forEach(function (rng) {
                    var collapsed = _this._getRowCollapsed(rng);
                    _this._setRowCollapsed(rng, collapsed);
                });
            }
        });
    };
    PivotGrid.prototype._collapseRowsToLevel = function (level) {
        var _this = this;
        if (level >= this._ng.rowFields.length) {
            level = -1;
        }
        this.deferUpdate(function () {
            for (var r = 0; r < _this.rows.length; r++) {
                var rowLevel = _this._getRowLevel(r);
                if (rowLevel > 0) {
                    var key = _this.rows[r].dataItem[_PivotKey._ROW_KEY_NAME];
                    _this._collapsedKeys[key.toString()] = level > 0 && rowLevel >= level;
                }
                if (level < 0) {
                    _this.rows[r].visible = true;
                }
                else {
                    var visible = rowLevel > -1 && rowLevel <= level;
                    if (!visible) {
                        if (_this._ng.totalsBeforeData) {
                            if (r == 0) {
                                visible = true;
                            }
                        }
                        else {
                            if (r == _this.rows.length - 1) {
                                visible = true;
                            }
                        }
                    }
                    _this.rows[r].visible = visible;
                }
            }
        });
    };
    PivotGrid.prototype._getColLevel = function (col) {
        return this._ng._getColLevel(this.columns[col].binding);
    };
    PivotGrid.prototype._getGroupedCols = function (rng) {
        var getLevel = this._getColLevel.bind(this), level = rng.row + 1, start = rng.col, end;
        if (this._ng.totalsBeforeData) {
            for (start = rng.col2; start < this.columns.length; start++) {
                var lvl = getLevel(start);
                if (lvl != level)
                    break;
            }
        }
        for (; start > 0; start--) {
            var lvl = getLevel(start - 1);
            if (lvl > -1 && lvl <= level)
                break;
        }
        for (end = start; end < this.columns.length - 1; end++) {
            var lvl = getLevel(end + 1);
            if (lvl > -1 && lvl <= level)
                break;
        }
        if (getLevel(start) == level) {
            start++;
        }
        if (getLevel(end) == level) {
            end--;
        }
        wjcCore.assert(end >= start, 'group end < start?');
        return end >= start
            ? new wjcGrid.CellRange(rng.row, start, rng.row2, end)
            : rng;
    };
    PivotGrid.prototype._toggleColCollapsed = function (rng) {
        this._setColCollapsed(rng, !this._getColCollapsed(rng));
    };
    PivotGrid.prototype._getColCollapsed = function (rng) {
        rng = this._getGroupedCols(rng);
        var ng = this._ng, c = ng.totalsBeforeData ? rng.col - ng.valueFields.length : rng.col2 + 1, key = c > -1 && c < this.columns.length ? ng._getKey(this.columns[c].binding) : null;
        return key ? this._collapsedKeys[key.toString()] : false;
    };
    PivotGrid.prototype._setColCollapsed = function (rng, collapse) {
        var _this = this;
        rng = this._getGroupedCols(rng);
        var ng = this._ng, c = ng.totalsBeforeData ? rng.col - ng.valueFields.length : rng.col2 + 1, key = c > -1 && c < this.columns.length ? ng._getKey(this.columns[c].binding) : null;
        if (key == null) {
            return;
        }
        this._collapsedKeys[key.toString()] = collapse;
        this.deferUpdate(function () {
            for (var v = 1; v <= ng.valueFields.length; v++) {
                _this.columns[ng.totalsBeforeData ? rng.col - v : rng.col2 + v].visible = true;
            }
            for (var c_1 = rng.col; c_1 <= rng.col2; c_1++) {
                _this.columns[c_1].visible = !collapse;
            }
            if (!collapse) {
                var level = _this._getColLevel(c), childRanges = [];
                for (var c_2 = rng.col; c_2 <= rng.col2; c_2++) {
                    if (_this._getColLevel(c_2) > -1) {
                        var childRange = _this._getGroupedCols(new wjcGrid.CellRange(level, c_2));
                        wjcCore.assert(childRange.col >= rng.col && childRange.col2 <= rng.col2, 'child range overflow');
                        childRanges.push(childRange);
                        c_2 += ng.valueFields.length - 1;
                    }
                }
                childRanges.forEach(function (rng) {
                    var collapsed = _this._getColCollapsed(rng);
                    _this._setColCollapsed(rng, collapsed);
                });
            }
        });
    };
    PivotGrid.prototype._collapseColsToLevel = function (level) {
        var _this = this;
        if (level >= this._ng.columnFields.length) {
            level = -1;
        }
        this.deferUpdate(function () {
            for (var c = 0; c < _this.columns.length; c++) {
                var colLevel = _this._getColLevel(c);
                if (colLevel > 0) {
                    var key = _this._ng._getKey(_this.columns[c].binding);
                    _this._collapsedKeys[key.toString()] = level > 0 && colLevel >= level;
                }
                if (level < 0) {
                    _this.columns[c].visible = true;
                }
                else {
                    var visible = colLevel > -1 && colLevel <= level;
                    _this.columns[c].visible = visible;
                }
            }
        });
    };
    PivotGrid._WJA_COLLAPSE = 'wj-pivot-collapse';
    return PivotGrid;
}(wjcGrid.FlexGrid));
exports.PivotGrid = PivotGrid;
'use strict';
wjcCore.culture.olap = wjcCore.culture.olap || {};
wjcCore.culture.olap.DetailDialog = window['wijmo'].culture.olap.DetailDialog || {
    header: 'Detail View:',
    ok: 'OK',
    items: '{cnt:n0} items',
    item: '{cnt} item',
    row: 'Row',
    col: 'Column'
};
var DetailDialog = (function (_super) {
    __extends(DetailDialog, _super);
    function DetailDialog(element, options) {
        var _this = _super.call(this, element, null, true) || this;
        var tpl = _this.getTemplate();
        _this.applyTemplate('wj-control wj-content wj-detaildialog', tpl, {
            _sCnt: 'sp-cnt',
            _dSummary: 'div-summary',
            _dGrid: 'div-grid',
            _btnOK: 'btn-ok',
            _gHdr: 'g-hdr'
        });
        var g = wjcCore.culture.olap.DetailDialog;
        _this._gHdr.textContent = g.header;
        _this._btnOK.textContent = g.ok;
        _this._g = new wjcGrid.FlexGrid(_this._dGrid, {
            isReadOnly: true
        });
        _this.initialize(options);
        return _this;
    }
    DetailDialog.prototype.showDetail = function (ownerGrid, cell) {
        var _this = this;
        var view = ownerGrid.getDetailView(cell.row, cell.col);
        this._g.itemsSource = view;
        var pcv = wjcCore.tryCast(view, 'IPagedCollectionView');
        this._updateDetailCount(pcv ? pcv.totalItemCount : view.items.length);
        view.collectionChanged.addHandler(function () {
            _this._updateDetailCount(view.items.length);
        });
        var ng = ownerGrid.engine, fmt = wjcCore.culture.olap.DetailDialog, summary = '';
        var rowKey = ownerGrid.rows[cell.row].dataItem[_PivotKey._ROW_KEY_NAME], rowHdr = this._getHeader(rowKey);
        if (rowHdr) {
            summary += fmt.row + ': <b>' + wjcCore.escapeHtml(rowHdr) + '</b><br>';
        }
        var colKey = ng._getKey(ownerGrid.columns[cell.col].binding), colHdr = this._getHeader(colKey);
        if (colHdr) {
            summary += fmt.col + ': <b>' + wjcCore.escapeHtml(colHdr) + '</b><br>';
        }
        var valFlds = ng.valueFields, valFld = valFlds[cell.col % valFlds.length], valHdr = valFld.header, val = ownerGrid.getCellData(cell.row, cell.col, true);
        summary += wjcCore.escapeHtml(valHdr) + ': <b>' + wjcCore.escapeHtml(val) + '</b>';
        this._dSummary.innerHTML = summary;
    };
    DetailDialog.prototype._updateDetailCount = function (cnt) {
        var fmt = wjcCore.culture.olap.DetailDialog;
        this._sCnt.textContent = wjcCore.format(cnt == 1 ? fmt.item : fmt.items, { cnt: cnt });
    };
    DetailDialog.prototype._getHeader = function (key) {
        if (key.values.length) {
            var arr = [];
            for (var i = 0; i < key.values.length; i++) {
                arr.push(key.getValue(i, true));
            }
            return arr.join(' - ');
        }
        return null;
    };
    DetailDialog.controlTemplate = '<div>' +
        '<div class="wj-dialog-header">' +
        '<span wj-part="g-hdr">Detail View:</span> <span wj-part="sp-cnt"></span>' +
        '</div>' +
        '<div class="wj-dialog-body">' +
        '<div wj-part="div-summary"></div>' +
        '<div wj-part="div-grid"></div>' +
        '</div>' +
        '<div class="wj-dialog-footer">' +
        '<a class="wj-hide" wj-part="btn-ok" href="" draggable="false">OK</a>&nbsp;&nbsp;' +
        '</div>' +
        '</div>';
    return DetailDialog;
}(wjcCore.Control));
exports.DetailDialog = DetailDialog;
'use strict';
wjcCore.culture.olap = wjcCore.culture.olap || {};
wjcCore.culture.olap.PivotChart = window['wijmo'].culture.olap.PivotChart || {
    by: 'by',
    and: 'and'
};
var PivotChartType;
(function (PivotChartType) {
    PivotChartType[PivotChartType["Column"] = 0] = "Column";
    PivotChartType[PivotChartType["Bar"] = 1] = "Bar";
    PivotChartType[PivotChartType["Scatter"] = 2] = "Scatter";
    PivotChartType[PivotChartType["Line"] = 3] = "Line";
    PivotChartType[PivotChartType["Area"] = 4] = "Area";
    PivotChartType[PivotChartType["Pie"] = 5] = "Pie";
})(PivotChartType = exports.PivotChartType || (exports.PivotChartType = {}));
var LegendVisibility;
(function (LegendVisibility) {
    LegendVisibility[LegendVisibility["Always"] = 0] = "Always";
    LegendVisibility[LegendVisibility["Never"] = 1] = "Never";
    LegendVisibility[LegendVisibility["Auto"] = 2] = "Auto";
})(LegendVisibility = exports.LegendVisibility || (exports.LegendVisibility = {}));
var PivotChart = (function (_super) {
    __extends(PivotChart, _super);
    function PivotChart(element, options) {
        var _this = _super.call(this, element) || this;
        _this._chartType = PivotChartType.Column;
        _this._showHierarchicalAxes = true;
        _this._showTotals = false;
        _this._showTitle = true;
        _this._showLegend = LegendVisibility.Always;
        _this._legendPosition = wjcChart.Position.Right;
        _this._maxSeries = PivotChart.MAX_SERIES;
        _this._maxPoints = PivotChart.MAX_POINTS;
        _this._stacking = wjcChart.Stacking.None;
        _this._colItms = [];
        _this._dataItms = [];
        _this._lblsSrc = [];
        _this._grpLblsSrc = [];
        wjcCore.addClass(_this.hostElement, 'wj-pivotchart');
        if (!_this._isPieChart()) {
            _this._createFlexChart();
        }
        else {
            _this._createFlexPie();
        }
        _super.prototype.initialize.call(_this, options);
        return _this;
    }
    Object.defineProperty(PivotChart.prototype, "engine", {
        get: function () {
            return this._ng;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotChart.prototype, "itemsSource", {
        get: function () {
            return this._itemsSource;
        },
        set: function (value) {
            if (value && this._itemsSource !== value) {
                var oldVal = this._itemsSource;
                if (value instanceof PivotPanel) {
                    value = value.engine.pivotView;
                }
                else if (value instanceof PivotEngine) {
                    value = value.pivotView;
                }
                this._itemsSource = wjcCore.asCollectionView(value);
                this._onItemsSourceChanged(oldVal);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotChart.prototype, "chartType", {
        get: function () {
            return this._chartType;
        },
        set: function (value) {
            if (value != this._chartType) {
                var type = this._chartType;
                this._chartType = wjcCore.asEnum(value, PivotChartType);
                this._changeChartType();
                if (value === PivotChartType.Bar || type === PivotChartType.Bar) {
                    this._updatePivotChart();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotChart.prototype, "showHierarchicalAxes", {
        get: function () {
            return this._showHierarchicalAxes;
        },
        set: function (value) {
            if (value != this._showHierarchicalAxes) {
                this._showHierarchicalAxes = wjcCore.asBoolean(value, true);
                if (!this._isPieChart() && this._flexChart) {
                    this._updateFlexChart(this._dataItms, this._lblsSrc, this._grpLblsSrc);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotChart.prototype, "showTotals", {
        get: function () {
            return this._showTotals;
        },
        set: function (value) {
            if (value != this._showTotals) {
                this._showTotals = wjcCore.asBoolean(value, true);
                this._updatePivotChart();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotChart.prototype, "showTitle", {
        get: function () {
            return this._showTitle;
        },
        set: function (value) {
            if (value != this._showTitle) {
                this._showTitle = wjcCore.asBoolean(value, true);
                this._updatePivotChart();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotChart.prototype, "showLegend", {
        get: function () {
            return this._showLegend;
        },
        set: function (value) {
            if (value != this.showLegend) {
                this._showLegend = wjcCore.asEnum(value, LegendVisibility);
                this._updatePivotChart();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotChart.prototype, "legendPosition", {
        get: function () {
            return this._legendPosition;
        },
        set: function (value) {
            if (value != this.legendPosition) {
                this._legendPosition = wjcCore.asEnum(value, wjcChart.Position);
                this._updatePivotChart();
            }
            return;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotChart.prototype, "stacking", {
        get: function () {
            return this._stacking;
        },
        set: function (value) {
            if (value != this._stacking) {
                this._stacking = wjcCore.asEnum(value, wjcChart.Stacking);
                if (this._flexChart) {
                    this._flexChart.stacking = this._stacking;
                    this._updatePivotChart();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotChart.prototype, "maxSeries", {
        get: function () {
            return this._maxSeries;
        },
        set: function (value) {
            if (value != this._maxSeries) {
                this._maxSeries = wjcCore.asNumber(value);
                this._updatePivotChart();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotChart.prototype, "maxPoints", {
        get: function () {
            return this._maxPoints;
        },
        set: function (value) {
            if (value != this._maxPoints) {
                this._maxPoints = wjcCore.asNumber(value);
                this._updatePivotChart();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotChart.prototype, "flexChart", {
        get: function () {
            return this._flexChart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PivotChart.prototype, "flexPie", {
        get: function () {
            return this._flexPie;
        },
        enumerable: true,
        configurable: true
    });
    PivotChart.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        _super.prototype.refresh.call(this, fullUpdate);
        if (this._isPieChart()) {
            if (this._flexPie) {
                this._flexPie.refresh(fullUpdate);
            }
        }
        else {
            if (this._flexChart) {
                this._flexChart.refresh(fullUpdate);
            }
        }
    };
    PivotChart.prototype._onItemsSourceChanged = function (oldItemsSource) {
        if (this._ng) {
            this._ng.updatedView.removeHandler(this._updatePivotChart, this);
        }
        if (oldItemsSource) {
            oldItemsSource.collectionChanged.removeHandler(this._updatePivotChart, this);
        }
        var cv = this._itemsSource;
        this._ng = cv instanceof PivotCollectionView
            ? cv.engine
            : null;
        if (this._ng) {
            this._ng.updatedView.addHandler(this._updatePivotChart, this);
        }
        if (this._itemsSource) {
            this._itemsSource.collectionChanged.addHandler(this._updatePivotChart, this);
        }
        this._updatePivotChart();
    };
    PivotChart.prototype._createFlexChart = function () {
        var _this = this;
        var hostEle = document.createElement('div');
        this.hostElement.appendChild(hostEle);
        this._flexChart = new wjcChart.FlexChart(hostEle);
        this._flexChart._bindingSeparator = null;
        this._flexChart.legend.position = wjcChart.Position.Right;
        this._flexChart.bindingX = _PivotKey._ROW_KEY_NAME;
        this._flexChart.stacking = this._stacking;
        this._flexChart.tooltip.content = function (ht) {
            var content = ht.name
                ? '<b>' + ht.name + '</b> ' + '<br/>'
                : '';
            content += _this._getLabel(ht.x) + ' ' + _this._getValue(ht);
            return content;
        };
        this._flexChart.hostElement.style.visibility = 'hidden';
    };
    PivotChart.prototype._createFlexPie = function () {
        var _this = this;
        var menuHost = document.createElement('div');
        this.hostElement.appendChild(menuHost);
        this._colMenu = new wjcInput.Menu(menuHost);
        this._colMenu.displayMemberPath = 'text';
        this._colMenu.selectedValuePath = 'prop';
        this._colMenu.hostElement.style.visibility = 'hidden';
        var hostEle = document.createElement('div');
        this.hostElement.appendChild(hostEle);
        this._flexPie = new wjcChart.FlexPie(hostEle);
        this._flexPie.bindingName = _PivotKey._ROW_KEY_NAME;
        this._flexPie.tooltip.content = function (ht) {
            return '<b>' + _this._getLabel(_this._dataItms[ht.pointIndex][_PivotKey._ROW_KEY_NAME]) + '</b> ' + '<br/>' + _this._getValue(ht);
        };
        this._flexPie.rendering.addHandler(this._updatePieInfo, this);
    };
    PivotChart.prototype._updatePivotChart = function () {
        if (!this._ng || !this._ng.pivotView) {
            return;
        }
        var dataItems = [], lblsSrc = [], grpLblsSrc = [], lastLabelIndex = 0, lastRowKey, view = this._ng.pivotView, rowFields = this._ng.rowFields;
        for (var i = 0; i < view.items.length; i++) {
            var item = view.items[i], rowKey = item.$rowKey;
            if (i == 0) {
                this._getColumns(item);
            }
            if (dataItems.length >= this._maxPoints) {
                break;
            }
            if (!this._isTotalRow(item[_PivotKey._ROW_KEY_NAME])) {
                dataItems.push(item);
                lblsSrc.push({ value: dataItems.length - 1, text: this._getLabel(item[_PivotKey._ROW_KEY_NAME]) });
                for (var j = 0; j < rowFields.length; j++) {
                    if (grpLblsSrc.length <= j) {
                        grpLblsSrc.push([]);
                    }
                    var mergeIndex = this._getMergeIndex(rowKey, lastRowKey);
                    if (mergeIndex < j) {
                        lastLabelIndex = grpLblsSrc[j].length - 1;
                        var grpLbl = grpLblsSrc[j][lastLabelIndex];
                        if (lastLabelIndex === 0 && j < rowFields.length - 1) {
                            grpLbl.value = (grpLbl.width - 1) / 2;
                        }
                        if (lastLabelIndex > 0 && j < rowFields.length - 1) {
                            var offsetWidth = this._getOffsetWidth(grpLblsSrc[j]);
                            grpLbl.value = offsetWidth + (grpLbl.width - 1) / 2;
                        }
                        grpLblsSrc[j].push({ value: dataItems.length - 1, text: rowKey.getValue(j, true), width: 1 });
                    }
                    else {
                        lastLabelIndex = grpLblsSrc[j].length - 1;
                        grpLblsSrc[j][lastLabelIndex].width++;
                    }
                }
                lastRowKey = rowKey;
            }
        }
        for (var j = 0; j < rowFields.length; j++) {
            if (j < grpLblsSrc.length) {
                lastLabelIndex = grpLblsSrc[j].length - 1;
                grpLblsSrc[j][lastLabelIndex].value = this._getOffsetWidth(grpLblsSrc[j]) + (grpLblsSrc[j][lastLabelIndex].width - 1) / 2;
            }
        }
        this._dataItms = dataItems;
        this._lblsSrc = lblsSrc;
        this._grpLblsSrc = grpLblsSrc;
        this._updateFlexChartOrPie();
    };
    PivotChart.prototype._updateFlexChartOrPie = function () {
        var isPie = this._isPieChart();
        if (!isPie && this._flexChart) {
            this._updateFlexChart(this._dataItms, this._lblsSrc, this._grpLblsSrc);
        }
        else if (isPie && this._flexPie) {
            this._updateFlexPie(this._dataItms, this._lblsSrc);
        }
    };
    PivotChart.prototype._updateFlexChart = function (dataItms, labelsSource, grpLblsSrc) {
        if (!this._ng || !this._flexChart) {
            return;
        }
        var chart = this._flexChart, host = chart.hostElement, axis;
        chart.beginUpdate();
        chart.itemsSource = dataItms;
        this._createSeries();
        if (chart.series &&
            chart.series.length > 0 &&
            dataItms.length > 0) {
            host.style.visibility = 'visible';
        }
        else {
            host.style.visibility = 'hidden';
        }
        chart.header = this._getChartTitle();
        if (this._isBarChart()) {
            if (this._showHierarchicalAxes && grpLblsSrc.length > 0) {
                chart.axisY.itemsSource = grpLblsSrc[grpLblsSrc.length - 1];
                chart.axisX.labelAngle = undefined;
                if (grpLblsSrc.length >= 2) {
                    for (var i = grpLblsSrc.length - 2; i >= 0; i--) {
                        this._createGroupAxes(grpLblsSrc[i]);
                    }
                }
            }
            else {
                chart.axisY.labelAngle = undefined;
                chart.axisY.itemsSource = labelsSource;
            }
            chart.axisX.itemsSource = undefined;
        }
        else {
            if (this._showHierarchicalAxes && grpLblsSrc.length > 0) {
                chart.axisX.itemsSource = grpLblsSrc[grpLblsSrc.length - 1];
                if (grpLblsSrc.length >= 2) {
                    for (var i = grpLblsSrc.length - 2; i >= 0; i--) {
                        this._createGroupAxes(grpLblsSrc[i]);
                    }
                }
            }
            else {
                chart.axisX.labelAngle = undefined;
                chart.axisX.itemsSource = labelsSource;
            }
            chart.axisY.itemsSource = undefined;
        }
        chart.axisX.labelPadding = 6;
        chart.axisY.labelPadding = 6;
        if (this.chartType === PivotChartType.Bar) {
            axis = chart.axisX;
            chart.axisY.reversed = true;
        }
        else {
            axis = chart.axisY;
            chart.axisY.reversed = false;
        }
        if (chart.stacking !== wjcChart.Stacking.Stacked100pc && this._ng.valueFields.length > 0 && this._ng.valueFields[0].format) {
            axis.format = this._ng.valueFields[0].format;
        }
        else {
            axis.format = '';
        }
        chart.legend.position = this._getLegendPosition();
        chart.endUpdate();
    };
    PivotChart.prototype._updateFlexPie = function (dataItms, labelsSource) {
        if (!this._ng || !this._flexPie) {
            return;
        }
        var pie = this._flexPie, host = pie.hostElement, colMenu = this._colMenu;
        if (this._colItms.length > 0 &&
            dataItms.length > 0) {
            host.style.visibility = 'visible';
        }
        else {
            host.style.visibility = 'hidden';
        }
        pie.beginUpdate();
        pie.itemsSource = dataItms;
        pie.bindingName = _PivotKey._ROW_KEY_NAME;
        if (this._colItms && this._colItms.length > 0) {
            pie.binding = this._colItms[0]['prop'];
        }
        pie.header = this._getChartTitle();
        pie.legend.position = this._getLegendPosition();
        pie.endUpdate();
        var headerPrefix = this._getTitle(this._ng.columnFields);
        if (headerPrefix !== '') {
            headerPrefix = '<b>' + headerPrefix + ': </b>';
        }
        if (this._colItms && this._colItms.length > 1 && dataItms.length > 0) {
            colMenu.hostElement.style.visibility = 'visible';
            colMenu.header = headerPrefix + this._colItms[0]['text'];
            colMenu.itemsSource = this._colItms;
            colMenu.command = {
                executeCommand: function (arg) {
                    var selectedItem = colMenu.selectedItem;
                    colMenu.header = headerPrefix + selectedItem['text'];
                    pie.binding = selectedItem['prop'];
                }
            };
            colMenu.selectedIndex = 0;
            colMenu.invalidate();
            colMenu.listBox.invalidate();
        }
        else {
            colMenu.hostElement.style.visibility = 'hidden';
        }
    };
    PivotChart.prototype._getLegendPosition = function () {
        var pos = this.legendPosition;
        if (this.showLegend == LegendVisibility.Never) {
            pos = wjcChart.Position.None;
        }
        else if (this.showLegend == LegendVisibility.Auto) {
            if (this.flexChart && this.flexChart.series) {
                var cnt_1 = 0;
                this.flexChart.series.forEach(function (series) {
                    var vis = series.visibility;
                    if (series.name &&
                        vis != wjcChart.SeriesVisibility.Hidden &&
                        vis != wjcChart.SeriesVisibility.Plot) {
                        cnt_1++;
                    }
                });
                if (cnt_1 < 2) {
                    pos = wjcChart.Position.None;
                }
            }
        }
        return pos;
    };
    PivotChart.prototype._createSeries = function () {
        if (this._flexChart) {
            this._flexChart.series.length = 0;
        }
        var trimNames = this._ng.valueFields.length == 1;
        for (var i = 0; i < this._colItms.length; i++) {
            var series = new wjcChart.Series(), binding = this._colItms[i]['prop'], name_1 = this._colItms[i]['text'];
            if (trimNames) {
                var pos = name_1.lastIndexOf(';');
                if (pos > -1) {
                    name_1 = name_1.substr(0, pos);
                }
            }
            series.binding = binding;
            series.name = name_1;
            this._flexChart.series.push(series);
        }
    };
    PivotChart.prototype._getColumns = function (itm) {
        var sersCount = 0, colKey, colLbl;
        if (!itm) {
            return;
        }
        this._colItms.length = 0;
        for (var prop in itm) {
            if (itm.hasOwnProperty(prop)) {
                if (prop !== _PivotKey._ROW_KEY_NAME && sersCount < this._maxSeries) {
                    if ((this._showTotals && this._isTotalColumn(prop)) || ((!this._showTotals && !this._isTotalColumn(prop)))) {
                        colKey = this._ng._getKey(prop);
                        colLbl = this._getLabel(colKey);
                        this._colItms.push({ prop: prop, text: this._getLabel(colKey) });
                        sersCount++;
                    }
                }
            }
        }
    };
    PivotChart.prototype._createGroupAxes = function (groups) {
        var _this = this;
        var chart = this._flexChart, rawAxis = this._isBarChart() ? chart.axisY : chart.axisX, ax;
        if (!groups) {
            return;
        }
        ax = new wjcChart.Axis();
        ax.labelAngle = 0;
        ax.labelPadding = 6;
        ax.position = this._isBarChart() ? wjcChart.Position.Left : wjcChart.Position.Bottom;
        ax.majorTickMarks = wjcChart.TickMark.None;
        ax.itemsSource = groups;
        ax.reversed = rawAxis.reversed;
        ax.itemFormatter = function (engine, label) {
            var group = groups.filter(function (obj) {
                return obj.value == label.val;
            })[0];
            var w = 0.5 * group.width;
            if (!_this._isBarChart()) {
                var x1 = ax.convert(label.val - w) + 5, x2 = ax.convert(label.val + w) - 5, y = ax._axrect.top;
                engine.drawLine(x1, y, x2, y, PivotChart.HRHAXISCSS);
                engine.drawLine(x1, y, x1, y - 5, PivotChart.HRHAXISCSS);
                engine.drawLine(x2, y, x2, y - 5, PivotChart.HRHAXISCSS);
                engine.drawLine(label.pos.x, y, label.pos.x, y + 5, PivotChart.HRHAXISCSS);
            }
            else {
                var reversed = ax.reversed ? -1 : +1, y1 = ax.convert(label.val + w) + 5 * reversed, y2 = ax.convert(label.val - w) - 5 * reversed, x = ax._axrect.left + ax._axrect.width - 5;
                engine.drawLine(x, y1, x, y2, PivotChart.HRHAXISCSS);
                engine.drawLine(x, y1, x + 5, y1, PivotChart.HRHAXISCSS);
                engine.drawLine(x, y2, x + 5, y2, PivotChart.HRHAXISCSS);
                engine.drawLine(x, label.pos.y, x - 5, label.pos.y, PivotChart.HRHAXISCSS);
            }
            return label;
        };
        ax.min = rawAxis.actualMin;
        ax.max = rawAxis.actualMax;
        rawAxis.rangeChanged.addHandler(function () {
            if (!(isNaN(ax.min) && isNaN(rawAxis.actualMin)) && ax.min != rawAxis.actualMin) {
                ax.min = rawAxis.actualMin;
            }
            if (!(isNaN(ax.max) && isNaN(rawAxis.actualMax)) && ax.max != rawAxis.actualMax) {
                ax.max = rawAxis.actualMax;
            }
        });
        var series = new wjcChart.Series();
        series.visibility = wjcChart.SeriesVisibility.Hidden;
        if (!this._isBarChart()) {
            series.axisX = ax;
        }
        else {
            series.axisY = ax;
        }
        chart.series.push(series);
    };
    PivotChart.prototype._updateFlexPieBinding = function () {
        this._flexPie.binding = this._colMenu.selectedValue;
        this._flexPie.refresh();
    };
    PivotChart.prototype._updatePieInfo = function () {
        var _this = this;
        if (!this._flexPie) {
            return;
        }
        this._flexPie._labels = this._flexPie._labels.map(function (v, i) {
            return _this._lblsSrc[i].text;
        });
    };
    PivotChart.prototype._changeChartType = function () {
        var ct = null;
        if (this.chartType === PivotChartType.Pie) {
            if (!this._flexPie) {
                this._createFlexPie();
            }
            this._updateFlexPie(this._dataItms, this._lblsSrc);
            this._swapChartAndPie(false);
        }
        else {
            switch (this.chartType) {
                case PivotChartType.Column:
                    ct = wjcChart.ChartType.Column;
                    break;
                case PivotChartType.Bar:
                    ct = wjcChart.ChartType.Bar;
                    break;
                case PivotChartType.Scatter:
                    ct = wjcChart.ChartType.Scatter;
                    break;
                case PivotChartType.Line:
                    ct = wjcChart.ChartType.Line;
                    break;
                case PivotChartType.Area:
                    ct = wjcChart.ChartType.Area;
                    break;
            }
            if (!this._flexChart) {
                this._createFlexChart();
                this._updateFlexChart(this._dataItms, this._lblsSrc, this._grpLblsSrc);
            }
            else {
                if (this._flexChart.hostElement.style.display === 'none' ||
                    ct === PivotChartType.Bar || this._flexChart.chartType === wjcChart.ChartType.Bar) {
                    this._updateFlexChart(this._dataItms, this._lblsSrc, this._grpLblsSrc);
                }
            }
            this._flexChart.chartType = ct;
            this._swapChartAndPie(true);
        }
    };
    PivotChart.prototype._swapChartAndPie = function (chartshow) {
        var _this = this;
        if (this._flexChart) {
            this._flexChart.hostElement.style.display = chartshow ? 'block' : 'none';
        }
        if (this._flexPie) {
            this._flexPie.hostElement.style.display = !chartshow ? 'block' : 'none';
            ;
        }
        if (this._colMenu && this._colMenu.hostElement) {
            this._colMenu.hostElement.style.display = chartshow ? 'none' : 'block';
            this._colMenu.hostElement.style.top = '0';
            setTimeout(function () {
                _this._colMenu.hostElement.style.top = '';
            }, 0);
        }
    };
    PivotChart.prototype._getLabel = function (key) {
        var sb = '';
        if (!key || !key.values) {
            return sb;
        }
        var fld = key.valueFields ? key.valueField : null;
        switch (key.values.length) {
            case 0:
                if (fld) {
                    sb += fld.header;
                }
                break;
            case 1:
                sb += key.getValue(0, true);
                if (fld) {
                    sb += '; ' + fld.header;
                }
                break;
            default:
                for (var i = 0; i < key.values.length; i++) {
                    if (i > 0)
                        sb += "; ";
                    sb += key.getValue(i, true);
                }
                if (fld) {
                    sb += '; ' + fld.header;
                }
                break;
        }
        return sb;
    };
    PivotChart.prototype._getValue = function (ht) {
        var defFmt = this._ng.valueFields[0].format, idx = ht.series ? ht.series.chart.series.indexOf(ht.series) : 0, fmt = (this._ng.valueFields[idx] && this._ng.valueFields[idx].format) || defFmt;
        return fmt ? wjcCore.Globalize.format(ht.y, fmt) : ht._yfmt;
    };
    PivotChart.prototype._getChartTitle = function () {
        if (!this.showTitle || !this._ng.valueFields.length) {
            return null;
        }
        var ng = this._ng, value = this._getTitle(ng.valueFields), rows = this._getTitle(ng.rowFields), cols = this._getTitle(ng.columnFields), title = value, str = wjcCore.culture.olap.PivotChart;
        if (value && this._dataItms.length > 0) {
            if (rows) {
                title += wjcCore.format(' {by} {rows}', {
                    by: str.by,
                    rows: rows
                });
            }
            if (cols) {
                title += wjcCore.format(' {and} {cols}', {
                    and: rows ? str.and : str.by,
                    cols: cols
                });
            }
        }
        return title;
    };
    PivotChart.prototype._getTitle = function (fields) {
        var sb = '';
        for (var i = 0; i < fields.length; i++) {
            if (sb.length > 0)
                sb += '; ';
            sb += fields[i].header;
        }
        return sb;
    };
    PivotChart.prototype._isTotalColumn = function (colKey) {
        var kVals = colKey.split(';');
        if (kVals && (kVals.length - 2 < this._ng.columnFields.length)) {
            return true;
        }
        return false;
    };
    PivotChart.prototype._isTotalRow = function (rowKey) {
        if (rowKey.values.length < this._ng.rowFields.length) {
            return true;
        }
        return false;
    };
    PivotChart.prototype._isPieChart = function () {
        return this._chartType == PivotChartType.Pie;
    };
    PivotChart.prototype._isBarChart = function () {
        return this._chartType == PivotChartType.Bar;
    };
    PivotChart.prototype._getMergeIndex = function (key1, key2) {
        var index = -1;
        if (key1 != null && key2 != null &&
            key1.values.length == key2.values.length &&
            key1.values.length == key1.fields.length &&
            key2.values.length == key2.fields.length) {
            for (var i = 0; i < key1.values.length; i++) {
                var v1 = key1.getValue(i, true);
                var v2 = key2.getValue(i, true);
                if (v1 == v2) {
                    index = i;
                }
                else {
                    return index;
                }
            }
        }
        return index;
    };
    PivotChart.prototype._getOffsetWidth = function (labels) {
        var offsetWidth = 0;
        if (labels.length <= 1) {
            return offsetWidth;
        }
        for (var i = 0; i < labels.length - 1; i++) {
            offsetWidth += labels[i].width;
        }
        return offsetWidth;
    };
    PivotChart.MAX_SERIES = 100;
    PivotChart.MAX_POINTS = 100;
    PivotChart.HRHAXISCSS = 'wj-hierarchicalaxes-line';
    return PivotChart;
}(wjcCore.Control));
exports.PivotChart = PivotChart;
//# sourceMappingURL=wijmo.olap.js.map