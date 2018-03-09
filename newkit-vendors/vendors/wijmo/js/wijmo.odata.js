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
function tryGetModuleWijmoGrid() {
    var m1;
    return (m1 = window['wijmo']) && m1['grid'];
}
function tryGetModuleWijmoGridFilter() {
    var m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['grid']) && m2['filter'];
}
var wjcSelf = require("wijmo/wijmo.odata");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['odata'] = wjcSelf;
'use strict';
var ODataCollectionView = (function (_super) {
    __extends(ODataCollectionView, _super);
    function ODataCollectionView(url, tableName, options) {
        var _this = _super.call(this) || this;
        _this._count = 0;
        _this._sortOnServer = true;
        _this._pageOnServer = true;
        _this._filterOnServer = true;
        _this._showDatesAsGmt = false;
        _this._inferDataTypes = true;
        _this.loading = new wjcCore.Event();
        _this.loaded = new wjcCore.Event();
        _this.error = new wjcCore.Event();
        _this._url = wjcCore.asString(url, false);
        _this._tbl = wjcCore.asString(tableName);
        if (options) {
            wjcCore.copy(_this, options);
        }
        _this.sortDescriptions.collectionChanged.addHandler(function () {
            if (_this.sortOnServer) {
                _this._getData();
            }
        });
        _this._getData();
        return _this;
    }
    Object.defineProperty(ODataCollectionView.prototype, "tableName", {
        get: function () {
            return this._tbl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ODataCollectionView.prototype, "fields", {
        get: function () {
            return this._fields;
        },
        set: function (value) {
            if (this._fields != value) {
                this._fields = wjcCore.asArray(value);
                this._getData();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ODataCollectionView.prototype, "requestHeaders", {
        get: function () {
            return this._requestHeaders;
        },
        set: function (value) {
            this._requestHeaders = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ODataCollectionView.prototype, "keys", {
        get: function () {
            return this._keys;
        },
        set: function (value) {
            this._keys = wjcCore.asArray(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ODataCollectionView.prototype, "dataTypes", {
        get: function () {
            return this._dataTypes;
        },
        set: function (value) {
            this._dataTypes = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ODataCollectionView.prototype, "inferDataTypes", {
        get: function () {
            return this._inferDataTypes;
        },
        set: function (value) {
            if (value != this.inferDataTypes) {
                this._inferDataTypes = wjcCore.asBoolean(value);
                this._getData();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ODataCollectionView.prototype, "showDatesAsGmt", {
        get: function () {
            return this._showDatesAsGmt;
        },
        set: function (value) {
            if (value != this.showDatesAsGmt) {
                this._showDatesAsGmt = wjcCore.asBoolean(value);
                this._getData();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ODataCollectionView.prototype, "sortOnServer", {
        get: function () {
            return this._sortOnServer;
        },
        set: function (value) {
            if (value != this._sortOnServer) {
                this._sortOnServer = wjcCore.asBoolean(value);
                this._getData();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ODataCollectionView.prototype, "pageOnServer", {
        get: function () {
            return this._pageOnServer;
        },
        set: function (value) {
            if (value != this._pageOnServer) {
                this._pageOnServer = wjcCore.asBoolean(value);
                if (this.pageSize) {
                    this._getData();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ODataCollectionView.prototype, "filterOnServer", {
        get: function () {
            return this._filterOnServer;
        },
        set: function (value) {
            if (value != this._filterOnServer) {
                this._filterOnServer = wjcCore.asBoolean(value);
                this._getData();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ODataCollectionView.prototype, "filterDefinition", {
        get: function () {
            return this._filterDef;
        },
        set: function (value) {
            if (value != this._filterDef) {
                this._filterDef = wjcCore.asString(value);
                this._getData();
            }
        },
        enumerable: true,
        configurable: true
    });
    ODataCollectionView.prototype.updateFilterDefinition = function (filterProvider) {
        if (this.filterOnServer && (tryGetModuleWijmoGrid()) && (tryGetModuleWijmoGridFilter()) && filterProvider instanceof (tryGetModuleWijmoGridFilter()).FlexGridFilter) {
            this.filterDefinition = this._asODataFilter(filterProvider);
        }
    };
    Object.defineProperty(ODataCollectionView.prototype, "oDataVersion", {
        get: function () {
            return this._odv;
        },
        set: function (value) {
            this._odv = wjcCore.asNumber(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ODataCollectionView.prototype, "isLoading", {
        get: function () {
            return this._loading;
        },
        enumerable: true,
        configurable: true
    });
    ODataCollectionView.prototype.onLoading = function (e) {
        this.loading.raise(this, e);
    };
    ODataCollectionView.prototype.onLoaded = function (e) {
        this.loaded.raise(this, e);
    };
    ODataCollectionView.prototype.load = function () {
        this._getData();
    };
    ODataCollectionView.prototype.onError = function (e) {
        this.error.raise(this, e);
        return !e.cancel;
    };
    ODataCollectionView.prototype.commitNew = function () {
        var _this = this;
        var requestHeaders = {
            'Accept': 'application/json'
        };
        if (this.requestHeaders) {
            for (var k in this.requestHeaders) {
                requestHeaders[k] = this.requestHeaders[k];
            }
        }
        var item = this.currentAddItem;
        if (item) {
            var url = this._getWriteUrl();
            wjcCore.httpRequest(url, {
                method: 'POST',
                requestHeaders: requestHeaders,
                data: this._convertToDbFormat(item),
                success: function (xhr) {
                    var newItem = JSON.parse(xhr.response);
                    _this.keys.forEach(function (key) {
                        item[key] = newItem[key];
                    });
                    _this.refresh();
                },
                error: this._error.bind(this)
            });
        }
        _super.prototype.commitNew.call(this);
    };
    ODataCollectionView.prototype.commitEdit = function () {
        var item = this.currentEditItem;
        if (item && !this.currentAddItem && !this._sameContent(item, this._edtClone)) {
            if (this.items.indexOf(item) > -1) {
                var url = this._getWriteUrl(this._edtClone);
                wjcCore.httpRequest(url, {
                    method: 'PUT',
                    requestHeaders: this.requestHeaders,
                    data: this._convertToDbFormat(item),
                    error: this._error.bind(this)
                });
            }
        }
        _super.prototype.commitEdit.call(this);
    };
    ODataCollectionView.prototype.remove = function (item) {
        if (item && item != this.currentAddItem) {
            if (this.items.indexOf(item) > -1) {
                var url = this._getWriteUrl(item);
                wjcCore.httpRequest(url, {
                    method: 'DELETE',
                    requestHeaders: this.requestHeaders,
                    error: this._error.bind(this)
                });
            }
        }
        _super.prototype.remove.call(this, item);
    };
    Object.defineProperty(ODataCollectionView.prototype, "totalItemCount", {
        get: function () {
            return this._count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ODataCollectionView.prototype, "pageCount", {
        get: function () {
            return this.pageSize ? Math.ceil(this.totalItemCount / this.pageSize) : 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ODataCollectionView.prototype, "pageSize", {
        get: function () {
            return this._pgSz;
        },
        set: function (value) {
            if (value != this._pgSz) {
                this._pgSz = wjcCore.asInt(value);
                if (this.pageOnServer) {
                    this._pgIdx = wjcCore.clamp(this._pgIdx, 0, this.pageCount - 1);
                    this._getData();
                }
                else {
                    this.refresh();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ODataCollectionView.prototype.onPageChanging = function (e) {
        _super.prototype.onPageChanging.call(this, e);
        if (!e.cancel && this.pageOnServer) {
            this._getData();
        }
        return !e.cancel;
    };
    ODataCollectionView.prototype._getPageView = function () {
        return this.pageOnServer
            ? this._view
            : _super.prototype._getPageView.call(this);
    };
    ODataCollectionView.prototype._performRefresh = function () {
        var canFilter = this._canFilter, canSort = this._canSort;
        this._canFilter = !this._filterOnServer;
        this._canSort = !this._sortOnServer;
        _super.prototype._performRefresh.call(this);
        this._canFilter = canFilter;
        this._canSort = canSort;
    };
    ODataCollectionView.prototype._storeItems = function (items, append) {
        if (!append) {
            this.sourceCollection = items;
        }
        else {
            Array.prototype.push.apply(this.sourceCollection, items);
        }
    };
    ODataCollectionView.prototype._getReadUrl = function (nextLink) {
        var url = this._url;
        if (url[url.length - 1] != '/') {
            url += '/';
        }
        if (nextLink) {
            url = nextLink.indexOf('http') == 0 ? nextLink : url + nextLink;
        }
        else if (this._tbl) {
            url += this._tbl;
        }
        return url;
    };
    ODataCollectionView.prototype._getReadParams = function (nextLink) {
        var settings = {
            $format: 'json'
        };
        if (this._tbl && !nextLink) {
            if (this._odv < 4) {
                settings['$inlinecount'] = 'allpages';
            }
            else {
                settings['$count'] = true;
            }
            if (this.fields) {
                settings['$select'] = this.fields.join(',');
            }
            if (this.sortOnServer && this.sortDescriptions.length) {
                var sort = '';
                for (var i = 0; i < this.sortDescriptions.length; i++) {
                    var sd = this.sortDescriptions[i];
                    if (sort)
                        sort += ',';
                    sort += sd.property;
                    if (!sd.ascending)
                        sort += ' desc';
                }
                settings['$orderby'] = sort;
            }
            if (this.pageOnServer && this.pageSize > 0) {
                settings['$skip'] = this.pageIndex * this.pageSize;
                settings['$top'] = this.pageSize;
            }
            if (this.filterDefinition) {
                settings['$filter'] = this.filterDefinition;
            }
        }
        return settings;
    };
    ODataCollectionView.prototype._getData = function (nextLink) {
        var _this = this;
        if (this._toGetData) {
            clearTimeout(this._toGetData);
        }
        this._toGetData = setTimeout(function () {
            if (_this._odv == null) {
                _this._getSchema();
                return;
            }
            _this._loading = true;
            _this.onLoading();
            var url = _this._getReadUrl(nextLink);
            wjcCore.httpRequest(url, {
                requestHeaders: _this.requestHeaders,
                data: _this._getReadParams(nextLink),
                success: function (xhr) {
                    var response = JSON.parse(xhr.response), arr = response.d ? response.d.results : response.value, count = response.d ? response.d.__count : (response['odata.count'] || response['@odata.count']);
                    if (count != null) {
                        _this._count = parseInt(count);
                    }
                    if (_this.pageIndex > 0 && _this.pageIndex >= _this.pageCount) {
                        var pgIndex = _this.pageIndex;
                        _this.moveToLastPage();
                        if (_this.pageIndex != pgIndex) {
                            return;
                        }
                    }
                    if (!nextLink) {
                        if (_this.inferDataTypes && !_this._dataTypesInferred) {
                            _this._dataTypesInferred = _this._getInferredDataTypes(arr);
                        }
                    }
                    var dataTypes = _this.dataTypes ? _this.dataTypes : _this._dataTypesInferred;
                    if (dataTypes) {
                        for (var i = 0; i < arr.length; i++) {
                            _this._convertItem(dataTypes, arr[i]);
                        }
                    }
                    _this._storeItems(arr, nextLink != null);
                    _this.refresh();
                    nextLink = response.d ? response.d.__next : (response['odata.nextLink'] || response['@odata.nextLink']);
                    if (nextLink) {
                        _this._getData(nextLink);
                    }
                    else {
                        _this._loading = false;
                        _this.onLoaded();
                    }
                },
                error: function (xhr) {
                    _this._loading = false;
                    _this.onLoaded();
                    if (_this.onError(new wjcCore.RequestErrorEventArgs(xhr))) {
                        throw 'HttpRequest Error: ' + xhr.status + ' ' + xhr.statusText;
                    }
                }
            });
        }, 100);
    };
    ODataCollectionView.prototype._convertToDbFormat = function (item) {
        var obj = {};
        for (var key in item) {
            var val = item[key];
            if (wjcCore.isDate(val) && this._showDatesAsGmt) {
                val = new Date(val.getTime() - val.getTimezoneOffset() * 60000);
            }
            else if (wjcCore.isNumber(val) && this._odv < 4) {
                val = val.toString();
            }
            obj[key] = val;
        }
        return obj;
    };
    ODataCollectionView.prototype._convertItem = function (dataTypes, item) {
        for (var k in dataTypes) {
            var type = dataTypes[k], val = item[k];
            if (val != null) {
                val = type == wjcCore.DataType.Date && wjcCore.isString(val) && val.indexOf('/Date(') == 0
                    ? new Date(parseInt(val.substr(6)))
                    : wjcCore.changeType(val, type, null);
                if (wjcCore.isDate(val) && this._showDatesAsGmt) {
                    val = new Date(val.getTime() + val.getTimezoneOffset() * 60000);
                }
                item[k] = val;
            }
        }
    };
    ODataCollectionView.prototype._getInferredDataTypes = function (arr) {
        var types = null;
        if (arr.length > 0) {
            var item = {};
            for (var i = 0; i < arr.length && i < 10; i++) {
                this._extend(item, arr[i]);
            }
            for (var key in item) {
                var val = item[key];
                if (wjcCore.isString(val) && val.match(ODataCollectionView._rxDate)) {
                    if (!types)
                        types = {};
                    types[key] = wjcCore.DataType.Date;
                }
            }
        }
        return types;
    };
    ODataCollectionView.prototype._getServiceUrl = function () {
        var url = this._url;
        if (url[url.length - 1] != '/') {
            url += '/';
        }
        return url;
    };
    ODataCollectionView.prototype._getSchema = function () {
        var _this = this;
        var url = this._getServiceUrl() + '$metadata';
        this._odv = ODataCollectionView._odvCache[url];
        if (this._odv) {
            this._getData();
        }
        else {
            wjcCore.httpRequest(url, {
                requestHeaders: this.requestHeaders,
                success: function (xhr) {
                    var m = xhr.response.match(/<.*Version\s*=\s*"(.*)"\s*>/i), odv = m ? parseFloat(m[1]) : 4;
                    ODataCollectionView._odvCache[url] = _this._odv = odv;
                },
                error: function (xhr) {
                    ODataCollectionView._odvCache[url] = _this._odv = 4;
                },
                complete: function (xhr) {
                    _this._getData();
                }
            });
        }
    };
    ODataCollectionView.prototype._getWriteUrl = function (item) {
        var url = this._getServiceUrl();
        url += this._tbl;
        if (item) {
            wjcCore.assert(this.keys && this.keys.length > 0, 'write operations require keys.');
            var keys_1 = [];
            this.keys.forEach(function (key) {
                wjcCore.assert(item[key] != null, 'key values cannot be null.');
                keys_1.push(key + '=' + item[key]);
            });
            url += '(' + keys_1.join(',') + ')';
        }
        return url;
    };
    ODataCollectionView.prototype._asODataFilter = function (filter) {
        var def = '';
        for (var c = 0; c < filter.grid.columns.length; c++) {
            var col = filter.grid.columns[c], cf = filter.getColumnFilter(col, false);
            if (cf && cf.isActive) {
                if (def) {
                    def += ' and ';
                }
                if (cf.conditionFilter && cf.conditionFilter.isActive) {
                    def += this._asODataConditionFilter(cf.conditionFilter);
                }
                else if (cf.valueFilter && cf.valueFilter.isActive) {
                    def += this._asODataValueFilter(cf.valueFilter);
                }
            }
        }
        return def;
    };
    ODataCollectionView.prototype._asODataValueFilter = function (vf) {
        var col = vf.column, fld = col.binding, map = col.dataMap, allValues = vf._getUniqueValues(col, false), val = '';
        for (var key in vf.showValues) {
            var value = wjcCore.changeType(key, col.dataType, col.format);
            if (map && wjcCore.isString(value)) {
                value = map.getKeyValue(value);
            }
            if (val)
                val += ' or ';
            val += '(' + fld + ' eq ' + this._asODataValue(value, col.dataType) + ')';
        }
        if (val.length) {
            val = '(' + val + ')';
        }
        return val;
    };
    ODataCollectionView.prototype._asODataConditionFilter = function (cf) {
        var val = this._asODataCondition(cf, cf.condition1);
        if (cf.condition2.operator != null) {
            val += (cf.and ? ' and ' : ' or ') + this._asODataCondition(cf, cf.condition2);
        }
        return '(' + val + ')';
    };
    ODataCollectionView.prototype._asODataCondition = function (cf, cond) {
        var fld = cf.column.binding, val = this._asODataValue(cond.value, cf.column.dataType);
        switch (cond.operator) {
            case 0:
                return fld + ' eq ' + val;
            case 1:
                return fld + ' ne ' + val;
            case 2:
                return fld + ' gt ' + val;
            case 3:
                return fld + ' ge ' + val;
            case 4:
                return fld + ' lt ' + val;
            case 5:
                return fld + ' le ' + val;
            case 6:
                return 'startswith(' + fld + ',' + val + ')';
            case 7:
                return 'endswith(' + fld + ',' + val + ')';
            case 8:
                return this._odv >= 4
                    ? 'contains(' + fld + ',' + val + ')'
                    : 'substringof(' + val.toLowerCase() + ', tolower(' + fld + '))';
            case 9:
                return this._odv >= 4
                    ? 'not contains(' + fld + ',' + val + ')'
                    : 'not substringof(' + val.toLowerCase() + ', tolower(' + fld + '))';
        }
    };
    ODataCollectionView.prototype._asODataValue = function (val, dataType) {
        if (wjcCore.isDate(val)) {
            if (this._showDatesAsGmt) {
                val = new Date(val.getTime() - val.getTimezoneOffset() * 60000);
            }
            return val.toJSON();
        }
        else if (wjcCore.isString(val)) {
            return "'" + val.replace(/'/g, "''") + "'";
        }
        else if (val != null) {
            return val.toString();
        }
        return dataType == wjcCore.DataType.String ? "''" : null;
    };
    ODataCollectionView.prototype._error = function (xhr) {
        if (this.onError(new wjcCore.RequestErrorEventArgs(xhr))) {
            this._getData();
            throw 'HttpRequest Error: ' + xhr.status + ' ' + xhr.statusText;
        }
    };
    ODataCollectionView._odvCache = {};
    ODataCollectionView._rxDate = /^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}|\/Date\([\d\-]*?\)/;
    return ODataCollectionView;
}(wjcCore.CollectionView));
exports.ODataCollectionView = ODataCollectionView;
'use strict';
var ODataVirtualCollectionView = (function (_super) {
    __extends(ODataVirtualCollectionView, _super);
    function ODataVirtualCollectionView(url, tableName, options) {
        var _this = this;
        if (options == null) {
            options = {};
        }
        options.pageOnServer = true;
        options.sortOnServer = true;
        options.canGroup = false;
        if (!options.pageSize) {
            options.pageSize = 100;
        }
        _this = _super.call(this, url, tableName, options) || this;
        _this._data = [];
        _this.sourceCollection = _this._data;
        _this._skip = 0;
        _this.setWindow(0, _this.pageSize);
        return _this;
    }
    ODataVirtualCollectionView.prototype.setWindow = function (start, end) {
        var _this = this;
        if (this._toSetWindow) {
            clearTimeout(this._toSetWindow);
        }
        this._toSetWindow = setTimeout(function () {
            _this._toSetWindow = null;
            _this._performSetWindow(start, end);
        }, 50);
    };
    Object.defineProperty(ODataVirtualCollectionView.prototype, "pageOnServer", {
        get: function () {
            return true;
        },
        set: function (value) {
            if (!value) {
                throw 'ODataVirtualCollectionView requires pageOnServer = true.';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ODataVirtualCollectionView.prototype, "sortOnServer", {
        get: function () {
            return true;
        },
        set: function (value) {
            if (!wjcCore.asBoolean(value)) {
                throw 'ODataVirtualCollectionView requires sortOnServer = true.';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ODataVirtualCollectionView.prototype, "filterOnServer", {
        get: function () {
            return true;
        },
        set: function (value) {
            if (!wjcCore.asBoolean(value)) {
                throw 'ODataVirtualCollectionView requires filterOnServer = true.';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ODataVirtualCollectionView.prototype, "canGroup", {
        get: function () {
            return this._canGroup;
        },
        set: function (value) {
            if (wjcCore.asBoolean(value)) {
                throw 'ODataVirtualCollectionView does not support grouping.';
            }
        },
        enumerable: true,
        configurable: true
    });
    ODataVirtualCollectionView.prototype._performRefresh = function () {
        if (!this.isLoading) {
            this._refresh = true;
        }
        _super.prototype._performRefresh.call(this);
    };
    ODataVirtualCollectionView.prototype._getReadParams = function (nextLink) {
        var params = _super.prototype._getReadParams.call(this, nextLink);
        params['$skip'] = this._skip || 0;
        params['$top'] = this.pageSize;
        return params;
    };
    ODataVirtualCollectionView.prototype._storeItems = function (items, append) {
        if (this._refresh || this._data.length != this.totalItemCount) {
            this._data.length = this.totalItemCount;
            for (var i = 0; i < this._data.length; i++) {
                this._data[i] = null;
            }
            this._refresh = false;
        }
        if (!append) {
            this._loadOffset = 0;
        }
        var offset = this._loadOffset + (this._skip || 0);
        for (var i = 0; i < items.length; i++) {
            this._data[i + offset] = items[i];
        }
        this._loadOffset += items.length;
    };
    ODataVirtualCollectionView.prototype._performSetWindow = function (start, end) {
        start = wjcCore.asInt(start);
        end = wjcCore.asInt(end);
        wjcCore.assert(end >= start, 'Start must be smaller than end.');
        var down = wjcCore.isNumber(this._start) && start > this._start;
        this._start = start;
        this._end = end;
        var needData = false;
        for (var i = start; i < end && i < this._data.length && !needData; i++) {
            needData = (this._data[i] == null);
        }
        if (!needData) {
            return;
        }
        var top = Math.max(0, down ? start : end - this.pageSize);
        for (var i = top; i < this._data.length && this._data[i] != null; i++) {
            top++;
        }
        this._skip = top;
        this._getData();
    };
    return ODataVirtualCollectionView;
}(ODataCollectionView));
exports.ODataVirtualCollectionView = ODataVirtualCollectionView;
//# sourceMappingURL=wijmo.odata.js.map