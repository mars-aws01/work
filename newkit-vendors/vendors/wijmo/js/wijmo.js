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
var wjcSelf = require("wijmo/wijmo");
var _globalCulture = window['wijmo'] && window['wijmo'].culture;
window['wijmo'] = wjcSelf;
exports.culture = _globalCulture;
'use strict';
var _VERSION = '5.20173.405';
function getVersion() {
    return _VERSION;
}
exports.getVersion = getVersion;
var Key;
(function (Key) {
    Key[Key["Back"] = 8] = "Back";
    Key[Key["Tab"] = 9] = "Tab";
    Key[Key["Enter"] = 13] = "Enter";
    Key[Key["Escape"] = 27] = "Escape";
    Key[Key["Space"] = 32] = "Space";
    Key[Key["PageUp"] = 33] = "PageUp";
    Key[Key["PageDown"] = 34] = "PageDown";
    Key[Key["End"] = 35] = "End";
    Key[Key["Home"] = 36] = "Home";
    Key[Key["Left"] = 37] = "Left";
    Key[Key["Up"] = 38] = "Up";
    Key[Key["Right"] = 39] = "Right";
    Key[Key["Down"] = 40] = "Down";
    Key[Key["Delete"] = 46] = "Delete";
    Key[Key["F1"] = 112] = "F1";
    Key[Key["F2"] = 113] = "F2";
    Key[Key["F3"] = 114] = "F3";
    Key[Key["F4"] = 115] = "F4";
    Key[Key["F5"] = 116] = "F5";
    Key[Key["F6"] = 117] = "F6";
    Key[Key["F7"] = 118] = "F7";
    Key[Key["F8"] = 119] = "F8";
    Key[Key["F9"] = 120] = "F9";
    Key[Key["F10"] = 121] = "F10";
    Key[Key["F11"] = 122] = "F11";
    Key[Key["F12"] = 123] = "F12";
})(Key = exports.Key || (exports.Key = {}));
var DataType;
(function (DataType) {
    DataType[DataType["Object"] = 0] = "Object";
    DataType[DataType["String"] = 1] = "String";
    DataType[DataType["Number"] = 2] = "Number";
    DataType[DataType["Boolean"] = 3] = "Boolean";
    DataType[DataType["Date"] = 4] = "Date";
    DataType[DataType["Array"] = 5] = "Array";
})(DataType = exports.DataType || (exports.DataType = {}));
function tryCast(value, type) {
    if (value == null) {
        return null;
    }
    if (isString(type)) {
        return isFunction(value.implementsInterface) && value.implementsInterface(type) ? value : null;
    }
    return value instanceof type ? value : null;
}
exports.tryCast = tryCast;
function isPrimitive(value) {
    return isString(value) || isNumber(value) || isBoolean(value) || isDate(value);
}
exports.isPrimitive = isPrimitive;
function isString(value) {
    return typeof (value) == 'string';
}
exports.isString = isString;
function isNullOrWhiteSpace(value) {
    return value == null ? true : value.replace(/\s/g, '').length < 1;
}
exports.isNullOrWhiteSpace = isNullOrWhiteSpace;
function isNumber(value) {
    return typeof (value) == 'number';
}
exports.isNumber = isNumber;
function isInt(value) {
    return isNumber(value) && value == Math.round(value);
}
exports.isInt = isInt;
function isBoolean(value) {
    return typeof (value) == 'boolean';
}
exports.isBoolean = isBoolean;
function isFunction(value) {
    return typeof (value) == 'function';
}
exports.isFunction = isFunction;
function isUndefined(value) {
    return typeof value == 'undefined';
}
exports.isUndefined = isUndefined;
function isDate(value) {
    return value instanceof Date && !isNaN(value.getTime());
}
exports.isDate = isDate;
function isArray(value) {
    return value instanceof Array ||
        Array.isArray(value) ||
        Object.prototype.toString.call(value) === '[object Array]';
}
exports.isArray = isArray;
function isObject(value) {
    return value != null && typeof value == 'object' && !isDate(value) && !isArray(value);
}
exports.isObject = isObject;
function isEmpty(obj) {
    for (var k in obj)
        return false;
    return true;
}
exports.isEmpty = isEmpty;
function getUniqueId(baseId) {
    var newId = baseId;
    for (var i = 0; document.getElementById(newId) != null; i++) {
        newId = baseId + i;
    }
    return newId;
}
exports.getUniqueId = getUniqueId;
function mouseToPage(e) {
    if (e instanceof Point) {
        return e;
    }
    if (e.touches && e.touches.length > 0) {
        e = e.touches[0];
    }
    if (isNumber(e.clientX) && isNumber(e.clientY)) {
        return new Point(e.clientX + pageXOffset, e.clientY + pageYOffset);
    }
    throw 'Mouse or touch event expected.';
}
exports.mouseToPage = mouseToPage;
function getType(value) {
    if (isNumber(value))
        return DataType.Number;
    if (isBoolean(value))
        return DataType.Boolean;
    if (isDate(value))
        return DataType.Date;
    if (isString(value))
        return DataType.String;
    if (isArray(value))
        return DataType.Array;
    return DataType.Object;
}
exports.getType = getType;
function changeType(value, type, format) {
    if (value != null) {
        if (isString(value)) {
            switch (type) {
                case DataType.Number:
                    var num = Globalize.parseFloat(value, format);
                    return isNaN(num) ? value : num;
                case DataType.Date:
                    var date = Globalize.parseDate(value, format);
                    if (!date && !format && value) {
                        date = new Date(value);
                    }
                    return date && isFinite(date.getTime()) ? date : value;
                case DataType.Boolean:
                    switch (value.toLowerCase()) {
                        case 'true': return true;
                        case 'false': return false;
                    }
                    return value;
            }
        }
        if (type == DataType.String) {
            return Globalize.format(value, format);
        }
    }
    return value;
}
exports.changeType = changeType;
function toFixed(value, prec, truncate) {
    if (truncate) {
        var str = value.toString(), decPos = str.indexOf('.');
        if (str.indexOf('e') < 0 && decPos > -1) {
            str = str.substr(0, decPos + 1 + prec);
            value = parseFloat(str);
        }
    }
    else {
        var str = value.toFixed(prec);
        value = parseFloat(str);
    }
    return value;
}
exports.toFixed = toFixed;
function format(format, data, formatFunction) {
    format = asString(format);
    if (format.match(/\{.*"count".*:.*"when".*:.*\}/)) {
        try {
            var pluralized = JSON.parse(format);
            if (isString(pluralized.count)) {
                var count = data[pluralized.count], when = pluralized.when;
                if (isNumber(count) && isObject(when)) {
                    var pluralizedFormat = when[count] || when.other;
                    if (isString(pluralizedFormat)) {
                        format = pluralizedFormat;
                    }
                }
            }
        }
        catch (x) { }
    }
    return format.replace(/\{(.*?)(:(.*?))?\}/g, function (match, name, x, fmt) {
        var val = match;
        if (name && name[0] != '{' && data) {
            val = data[name];
            if (fmt) {
                val = Globalize.format(val, fmt);
            }
            if (formatFunction) {
                val = formatFunction(data, name, fmt, val);
            }
        }
        return val == null ? '' : val;
    });
}
exports.format = format;
function clamp(value, min, max) {
    if (value != null) {
        if (max != null && value > max)
            value = max;
        if (min != null && value < min)
            value = min;
    }
    return value;
}
exports.clamp = clamp;
function copy(dst, src) {
    if (src) {
        for (var key in src) {
            if (key[0] != '_') {
                assert(key in dst, 'Unknown property "' + key + '".');
                var value = src[key];
                if (!dst._copy || !dst._copy(key, value)) {
                    if (dst[key] instanceof Event && isFunction(value)) {
                        dst[key].addHandler(value);
                    }
                    else if (isObject(value) && !(value instanceof Element) && dst[key] && key != 'itemsSource') {
                        copy(dst[key], value);
                    }
                    else {
                        dst[key] = value;
                    }
                }
            }
        }
    }
}
exports.copy = copy;
function assert(condition, msg) {
    if (!condition) {
        throw '** Assertion failed in Wijmo: ' + msg;
    }
}
exports.assert = assert;
function _deprecated(oldMember, newMember) {
    console.error('** WARNING: "' + oldMember + '" has been deprecated; please use "' + newMember + '" instead.');
}
exports._deprecated = _deprecated;
function asString(value, nullOK) {
    if (nullOK === void 0) { nullOK = true; }
    assert((nullOK && value == null) || isString(value), 'String expected.');
    return value;
}
exports.asString = asString;
function asNumber(value, nullOK, positive) {
    if (nullOK === void 0) { nullOK = false; }
    if (positive === void 0) { positive = false; }
    assert((nullOK && value == null) || isNumber(value), 'Number expected.');
    if (positive && value && value < 0)
        throw 'Positive number expected.';
    return value;
}
exports.asNumber = asNumber;
function asInt(value, nullOK, positive) {
    if (nullOK === void 0) { nullOK = false; }
    if (positive === void 0) { positive = false; }
    assert((nullOK && value == null) || isInt(value), 'Integer expected.');
    if (positive && value && value < 0)
        throw 'Positive integer expected.';
    return value;
}
exports.asInt = asInt;
function asBoolean(value, nullOK) {
    if (nullOK === void 0) { nullOK = false; }
    assert((nullOK && value == null) || isBoolean(value), 'Boolean expected.');
    return value;
}
exports.asBoolean = asBoolean;
function asDate(value, nullOK) {
    if (nullOK === void 0) { nullOK = false; }
    if (isString(value)) {
        var dt = changeType(value, DataType.Date, 'r');
        if (isDate(dt)) {
            value = dt;
        }
    }
    assert((nullOK && value == null) || isDate(value), 'Date expected.');
    return value;
}
exports.asDate = asDate;
function asFunction(value, nullOK) {
    if (nullOK === void 0) { nullOK = true; }
    assert((nullOK && value == null) || isFunction(value), 'Function expected.');
    return value;
}
exports.asFunction = asFunction;
function asArray(value, nullOK) {
    if (nullOK === void 0) { nullOK = true; }
    assert((nullOK && value == null) || isArray(value), 'Array expected.');
    return value;
}
exports.asArray = asArray;
function asType(value, type, nullOK) {
    if (nullOK === void 0) { nullOK = false; }
    value = tryCast(value, type);
    assert(nullOK || value != null, type + ' expected.');
    return value;
}
exports.asType = asType;
function asEnum(value, enumType, nullOK) {
    if (nullOK === void 0) { nullOK = false; }
    if (value == null && nullOK)
        return null;
    var e = enumType[value];
    assert(e != null, 'Invalid enum value.');
    return isNumber(e) ? e : value;
}
exports.asEnum = asEnum;
function asCollectionView(value, nullOK) {
    if (nullOK === void 0) { nullOK = true; }
    if (value == null && nullOK) {
        return null;
    }
    var cv = tryCast(value, 'ICollectionView');
    if (cv != null) {
        return cv;
    }
    if (!isArray(value)) {
        assert(false, 'Array or ICollectionView expected.');
    }
    return new CollectionView(value);
}
exports.asCollectionView = asCollectionView;
function hasItems(value) {
    return value != null && value.items != null && value.items.length > 0;
}
exports.hasItems = hasItems;
function toHeaderCase(text) {
    return text && text.length
        ? text[0].toUpperCase() + text.substr(1).replace(/([a-z])([A-Z])/g, '$1 $2')
        : '';
}
exports.toHeaderCase = toHeaderCase;
function escapeHtml(text) {
    if (isString(text)) {
        text = text.replace(/[&<>"'\/]/g, function (s) {
            return _ENTITYMAP[s];
        });
    }
    return text;
}
exports.escapeHtml = escapeHtml;
var _ENTITYMAP = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
};
function hasClass(e, className) {
    if (e && e.getAttribute) {
        var rx = new RegExp('(\\s|^)' + className + '(\\s|$)');
        return e && rx.test(e.getAttribute('class'));
    }
    return false;
}
exports.hasClass = hasClass;
function removeClass(e, className) {
    if (e && className && e.setAttribute) {
        var classes = className.split(' ');
        for (var i = 0; i < classes.length; i++) {
            var cls = classes[i];
            if (hasClass(e, cls)) {
                var rx = new RegExp('((\\s|^)' + cls + '(\\s|$))', 'g'), cn = e.getAttribute('class');
                cn = cn.replace(rx, ' ').replace(/ +/g, ' ').trim();
                if (cn) {
                    e.setAttribute('class', cn);
                }
                else {
                    e.removeAttribute('class');
                }
            }
        }
    }
}
exports.removeClass = removeClass;
function addClass(e, className) {
    if (e && className && e.setAttribute) {
        var classes = className.split(' ');
        for (var i = 0; i < classes.length; i++) {
            var cls = classes[i];
            if (!hasClass(e, cls)) {
                var cn = e.getAttribute('class');
                e.setAttribute('class', cn ? cn + ' ' + cls : cls);
            }
        }
    }
}
exports.addClass = addClass;
function toggleClass(e, className, addOrRemove) {
    if (addOrRemove == null) {
        addOrRemove = !hasClass(e, className);
    }
    if (addOrRemove) {
        addClass(e, className);
    }
    else {
        removeClass(e, className);
    }
}
exports.toggleClass = toggleClass;
function setAttribute(e, name, value, keep) {
    if (value != null) {
        if (!keep || !e.getAttribute(name)) {
            e.setAttribute(name, value.toString());
        }
    }
    else {
        e.removeAttribute(name);
    }
}
exports.setAttribute = setAttribute;
function setSelectionRange(e, start, end) {
    if (end === void 0) { end = start; }
    e = asType(e, HTMLInputElement);
    if (contains(document.body, e) && !e.disabled && e.style.display != 'none') {
        try {
            e.setSelectionRange(asNumber(start), asNumber(end), isIE() ? null : 'backward');
            e.focus();
        }
        catch (x) { }
    }
}
exports.setSelectionRange = setSelectionRange;
function removeChild(e) {
    return e && e.parentNode
        ? e.parentNode.removeChild(e)
        : null;
}
exports.removeChild = removeChild;
function getActiveElement() {
    var ae = document.activeElement;
    if (ae) {
        var shadowRoot = ae['shadowRoot'];
        if (shadowRoot && shadowRoot.activeElement) {
            ae = shadowRoot.activeElement;
        }
    }
    return ae;
}
exports.getActiveElement = getActiveElement;
function moveFocus(parent, offset) {
    var focusable = _getFocusableElements(parent);
    var index = 0;
    if (offset) {
        var i = focusable.indexOf(getActiveElement());
        if (i > -1) {
            index = (i + offset + focusable.length) % focusable.length;
        }
    }
    if (index < focusable.length) {
        var el = focusable[index];
        el.focus();
        if (el instanceof HTMLInputElement) {
            el.select();
        }
    }
}
exports.moveFocus = moveFocus;
function _getFocusableElements(parent) {
    var focusable = [], tags = 'input,select,textarea,button,a,div', elements = parent.querySelectorAll(tags);
    for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        if (el.offsetHeight > 0 && el.tabIndex > -1 &&
            !el.disabled && !closest(el, '[disabled],.wj-state-disabled')) {
            if (isIE() && !el.hasAttribute('tabindex')) {
                if (el instanceof HTMLDivElement) {
                    continue;
                }
                var grid = Control.getControl(closest(el, '.wj-flexgrid'));
                if (grid && grid['keyActionTab'] == 0) {
                    continue;
                }
            }
            if (Control.getControl(el) || !_getFocusableElements(el).length) {
                focusable.push(el);
            }
        }
    }
    return focusable;
}
function getElement(selector) {
    if (selector instanceof Element)
        return selector;
    if (isString(selector))
        return document.querySelector(selector);
    if (selector && selector.jquery)
        return selector[0];
    return null;
}
exports.getElement = getElement;
function createElement(html, appendTo) {
    var div = document.createElement('div');
    div.innerHTML = html;
    if (div.children.length == 1) {
        div = div.children[0];
    }
    if (appendTo) {
        appendTo.appendChild(div);
    }
    return div;
}
exports.createElement = createElement;
function setText(e, text) {
    e.textContent = text || '';
}
exports.setText = setText;
function contains(parent, child) {
    for (var e = child; e && parent;) {
        if (e === parent)
            return true;
        e = e.parentNode || e['host'];
    }
    return false;
}
exports.contains = contains;
function closest(e, selector) {
    var matches = e ? (e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector) : null;
    if (matches) {
        for (; e; e = e.parentNode) {
            if (e instanceof Element && matches.call(e, selector)) {
                return e;
            }
        }
    }
    return null;
}
exports.closest = closest;
function closestClass(e, className) {
    return closest(e, '.' + className);
}
exports.closestClass = closestClass;
function enable(e, value) {
    var disabled = !value;
    toggleClass(e, 'wj-state-disabled', disabled);
    setAttribute(e, 'disabled', disabled ? 'true' : null);
    var inputs = e.querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if (value) {
            input.removeAttribute('disabled');
        }
        else {
            input.setAttribute('disabled', 'true');
        }
    }
}
exports.enable = enable;
function getElementRect(e) {
    var rc = e.getBoundingClientRect();
    return new Rect(rc.left + pageXOffset, rc.top + pageYOffset, rc.width, rc.height);
}
exports.getElementRect = getElementRect;
function setCss(e, css) {
    if (e instanceof Array) {
        for (var i = 0; i < e.length; i++) {
            setCss(e[i], css);
        }
        return;
    }
    if (e && e.style) {
        var s = e.style;
        for (var p in css) {
            var val = css[p];
            if (typeof (val) == 'number' &&
                p.match(/width|height|left|top|right|bottom|size|padding|margin'/i)) {
                val = val + 'px';
            }
            if (s[p] != val) {
                s[p] = val.toString();
            }
        }
    }
}
exports.setCss = setCss;
function animate(apply, duration, step) {
    if (duration === void 0) { duration = Control._ANIM_DEF_DURATION; }
    if (step === void 0) { step = Control._ANIM_DEF_STEP; }
    apply = asFunction(apply);
    duration = asNumber(duration, false, true);
    step = asNumber(step, false, true);
    var start = Date.now();
    var timer = setInterval(function () {
        var pct = Math.min(1, (Date.now() - start) / duration);
        pct = Math.sin(pct * Math.PI / 2);
        pct *= pct;
        requestAnimationFrame(function () {
            apply(pct);
        });
        if (pct >= 1) {
            clearInterval(timer);
        }
    }, step);
    return timer;
}
exports.animate = animate;
var Point = (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = asNumber(x);
        this.y = asNumber(y);
    }
    Point.prototype.equals = function (pt) {
        return (pt instanceof Point) && this.x == pt.x && this.y == pt.y;
    };
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    return Point;
}());
exports.Point = Point;
var Size = (function () {
    function Size(width, height) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        this.width = asNumber(width);
        this.height = asNumber(height);
    }
    Size.prototype.equals = function (sz) {
        return (sz instanceof Size) && this.width == sz.width && this.height == sz.height;
    };
    Size.prototype.clone = function () {
        return new Size(this.width, this.height);
    };
    return Size;
}());
exports.Size = Size;
var Rect = (function () {
    function Rect(left, top, width, height) {
        this.left = asNumber(left);
        this.top = asNumber(top);
        this.width = asNumber(width);
        this.height = asNumber(height);
    }
    Object.defineProperty(Rect.prototype, "right", {
        get: function () {
            return this.left + this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "bottom", {
        get: function () {
            return this.top + this.height;
        },
        enumerable: true,
        configurable: true
    });
    Rect.prototype.equals = function (rc) {
        return (rc instanceof Rect) && this.left == rc.left && this.top == rc.top && this.width == rc.width && this.height == rc.height;
    };
    Rect.prototype.clone = function () {
        return new Rect(this.left, this.top, this.width, this.height);
    };
    Rect.fromBoundingRect = function (rc) {
        if (rc.left != null) {
            return new Rect(rc.left, rc.top, rc.width, rc.height);
        }
        else if (rc.x != null) {
            return new Rect(rc.x, rc.y, rc.width, rc.height);
        }
        else {
            assert(false, 'Invalid source rectangle.');
        }
    };
    Rect.union = function (rc1, rc2) {
        var x = Math.min(rc1.left, rc2.left), y = Math.min(rc1.top, rc2.top), right = Math.max(rc1.right, rc2.right), bottom = Math.max(rc1.bottom, rc2.bottom);
        return new Rect(x, y, right - x, bottom - y);
    };
    Rect.intersection = function (rc1, rc2) {
        var x = Math.max(rc1.left, rc2.left), y = Math.max(rc1.top, rc2.top), right = Math.min(rc1.right, rc2.right), bottom = Math.min(rc1.bottom, rc2.bottom);
        return new Rect(x, y, right - x, bottom - y);
    };
    Rect.prototype.contains = function (pt) {
        if (pt instanceof Point) {
            return pt.x >= this.left && pt.x <= this.right &&
                pt.y >= this.top && pt.y <= this.bottom;
        }
        else if (pt instanceof Rect) {
            var rc2 = pt;
            return rc2.left >= this.left && rc2.right <= this.right &&
                rc2.top >= this.top && rc2.bottom <= this.bottom;
        }
        else {
            assert(false, 'Point or Rect expected.');
        }
    };
    Rect.prototype.inflate = function (dx, dy) {
        return new Rect(this.left - dx, this.top - dy, this.width + 2 * dx, this.height + 2 * dy);
    };
    return Rect;
}());
exports.Rect = Rect;
var DateTime = (function () {
    function DateTime() {
    }
    DateTime.addDays = function (value, days) {
        return DateTime.newDate(value.getFullYear(), value.getMonth(), value.getDate() + days);
    };
    DateTime.addMonths = function (value, months) {
        return DateTime.newDate(value.getFullYear(), value.getMonth() + months, value.getDate());
    };
    DateTime.addYears = function (value, years) {
        return DateTime.newDate(value.getFullYear() + years, value.getMonth(), value.getDate());
    };
    DateTime.addHours = function (value, hours) {
        return DateTime.newDate(value.getFullYear(), value.getMonth(), value.getDate(), value.getHours() + hours);
    };
    DateTime.addMinutes = function (value, minutes) {
        return DateTime.newDate(value.getFullYear(), value.getMonth(), value.getDate(), value.getHours(), value.getMinutes() + minutes);
    };
    DateTime.addSeconds = function (value, seconds) {
        return DateTime.newDate(value.getFullYear(), value.getMonth(), value.getDate(), value.getHours(), value.getMinutes(), value.getSeconds() + seconds);
    };
    DateTime.sameDate = function (d1, d2) {
        return isDate(d1) && isDate(d2) &&
            d1.getFullYear() == d2.getFullYear() &&
            d1.getMonth() == d2.getMonth() &&
            d1.getDate() == d2.getDate();
    };
    DateTime.sameTime = function (d1, d2) {
        return isDate(d1) && isDate(d2) &&
            d1.getHours() == d2.getHours() &&
            d1.getMinutes() == d2.getMinutes() &&
            d1.getSeconds() == d2.getSeconds();
    };
    DateTime.equals = function (d1, d2) {
        return isDate(d1) && isDate(d2) && d1.getTime() == d2.getTime();
    };
    DateTime.fromDateTime = function (date, time) {
        if (!date && !time)
            return null;
        if (!date)
            date = time;
        if (!time)
            time = date;
        return DateTime.newDate(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
    };
    DateTime.toFiscal = function (date, govt) {
        var cal = exports.culture.Globalize.calendar;
        return isArray(cal.fiscalYearOffsets)
            ? DateTime.addMonths(date, -cal.fiscalYearOffsets[govt ? 0 : 1])
            : date;
    };
    DateTime.fromFiscal = function (date, govt) {
        var cal = exports.culture.Globalize.calendar;
        return isArray(cal.fiscalYearOffsets)
            ? DateTime.addMonths(date, +cal.fiscalYearOffsets[govt ? 0 : 1])
            : date;
    };
    DateTime.newDate = function (year, month, day, hour, min, sec, ms) {
        if (year == null || month == null || day == null) {
            var today = new Date();
            if (year == null)
                year = today.getFullYear();
            if (month == null)
                month = today.getMonth();
            if (day == null)
                day = today.getDate();
        }
        if (hour == null)
            hour = 0;
        if (min == null)
            min = 0;
        if (sec == null)
            sec = 0;
        if (ms == null)
            ms = 0;
        var dt = new Date(year, month, day, hour, min, sec, ms);
        var dty = dt.getFullYear();
        if (year < 100 && dty >= 1900) {
            dt.setFullYear(dt.getFullYear() - 1900);
        }
        return dt;
    };
    DateTime.clone = function (date) {
        return DateTime.fromDateTime(date, date);
    };
    return DateTime;
}());
exports.DateTime = DateTime;
function httpRequest(url, settings) {
    if (!settings)
        settings = {};
    var method = settings.method ? asString(settings.method).toUpperCase() : 'GET', asynk = settings.async != null ? asBoolean(settings.async) : true, data = settings.data;
    if (data != null && method == 'GET') {
        var s = [];
        for (var k in data) {
            var val = data[k];
            if (isDate(val)) {
                val = val.toJSON();
            }
            s.push(k + '=' + val);
        }
        if (s.length) {
            var sep = url.indexOf('?') < 0 ? '?' : '&';
            url += sep + s.join('&');
        }
        data = null;
    }
    var xhr = new XMLHttpRequest();
    xhr['URL_DEBUG'] = url;
    var isJson = false;
    if (data != null && !isString(data)) {
        isJson = isObject(data);
        data = JSON.stringify(data);
    }
    xhr.onload = function () {
        if (xhr.readyState == 4) {
            if (xhr.status < 300) {
                if (settings.success) {
                    asFunction(settings.success)(xhr);
                }
            }
            else if (settings.error) {
                asFunction(settings.error)(xhr);
            }
            if (settings.complete) {
                asFunction(settings.complete)(xhr);
            }
        }
    };
    xhr.onerror = function () {
        if (isFunction(settings.error)) {
            settings.error(xhr);
        }
        else {
            throw 'HttpRequest Error: ' + xhr.status + ' ' + xhr.statusText;
        }
    };
    xhr.open(method, url, asynk, settings.user, settings.password);
    if (settings.user && settings.password) {
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(settings.user + ':' + settings.password));
    }
    if (isJson) {
        xhr.setRequestHeader('Content-Type', 'application/json');
    }
    if (settings.requestHeaders) {
        for (var key in settings.requestHeaders) {
            xhr.setRequestHeader(key, settings.requestHeaders[key]);
        }
    }
    if (isNumber(settings.timeout)) {
        xhr.timeout = settings.timeout;
    }
    if (isFunction(settings.beforeSend)) {
        settings.beforeSend(xhr);
    }
    xhr.send(data);
    return xhr;
}
exports.httpRequest = httpRequest;
'use strict';
exports.culture = window['wijmo'].culture || {
    Globalize: {
        numberFormat: {
            '.': '.',
            ',': ',',
            percent: { pattern: ['-n %', 'n %'] },
            currency: { decimals: 2, symbol: '$', pattern: ['($n)', '$n'] }
        },
        calendar: {
            '/': '/',
            ':': ':',
            firstDay: 0,
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            daysAbbr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthsAbbr: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            am: ['AM', 'A'],
            pm: ['PM', 'P'],
            eras: ['A.D.', 'B.C.'],
            patterns: {
                d: 'M/d/yyyy', D: 'dddd, MMMM dd, yyyy',
                f: 'dddd, MMMM dd, yyyy h:mm tt', F: 'dddd, MMMM dd, yyyy h:mm:ss tt',
                t: 'h:mm tt', T: 'h:mm:ss tt',
                M: 'MMMM d', m: 'MMMM d',
                Y: 'MMMM, yyyy', y: 'MMMM, yyyy',
                g: 'M/d/yyyy h:mm tt', G: 'M/d/yyyy h:mm:ss tt',
                s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss',
                o: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss"."fffffffK',
                O: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss"."fffffffK',
                U: 'dddd, MMMM dd, yyyy h:mm:ss tt'
            },
            fiscalYearOffsets: [-3, -3]
        }
    }
};
var Globalize = (function () {
    function Globalize() {
    }
    Globalize.format = function (value, format, trim, truncate) {
        if (isString(value)) {
            return value;
        }
        else if (isNumber(value)) {
            format = format || (value == Math.round(value) ? 'n0' : 'n2');
            return Globalize.formatNumber(value, format, trim, truncate);
        }
        else if (isDate(value)) {
            format = format || 'd';
            return Globalize.formatDate(value, format);
        }
        else {
            return value != null ? value.toString() : '';
        }
    };
    Globalize.formatNumber = function (value, format, trim, truncate) {
        value = asNumber(value);
        format = asString(format);
        var nf = exports.culture.Globalize.numberFormat, m = format ? format.match(/([a-z])(\d*)(,*)(.*)/i) : null, f1 = m ? m[1].toLowerCase() : 'n', prec = (m && m[2]) ? parseInt(m[2]) : (f1 == 'c') ? nf.currency.decimals : value == Math.round(value) ? 0 : 2, scale = (m && m[3]) ? 3 * m[3].length : 0, curr = (m && m[4]) ? m[4] : nf.currency.symbol, dp = nf['.'], ts = nf[','], result;
        if (scale) {
            value /= Math.pow(10, scale);
        }
        if (f1 == 'd' || f1 == 'x') {
            result = Math.round(Math.abs(value)).toString(f1 == 'd' ? 10 : 16);
            while (result.length < prec) {
                result = '0' + result;
            }
            if (value < 0) {
                result = '-' + result;
            }
            if (format && format[0] == 'X') {
                result = result.toUpperCase();
            }
            return result;
        }
        if (f1 == 'p') {
            value = Globalize._mul100(value);
            value = toFixed(value, prec, truncate);
        }
        if (truncate && f1 != 'p') {
            value = toFixed(value, prec, true);
        }
        result = Globalize._toFixedStr((f1 == 'c' || f1 == 'p')
            ? Math.abs(value)
            : value, prec);
        if ((trim || f1 == 'g') && result.indexOf('.') > -1) {
            result = result.replace(/(\.[0-9]*?)0+$/g, '$1');
            result = result.replace(/\.$/, '');
        }
        if (dp != '.') {
            result = result.replace('.', dp);
        }
        if (ts && (f1 == 'n' || f1 == 'c' || f1 == 'p')) {
            var idx = result.indexOf(dp), rx = /\B(?=(\d\d\d)+(?!\d))/g;
            result = idx > -1
                ? result.substr(0, idx).replace(rx, ts) + result.substr(idx)
                : result.replace(rx, ts);
        }
        if (f1 == 'c') {
            var pat = nf.currency.pattern[value < 0 ? 0 : 1];
            if (curr == '\u200B') {
                curr = '';
            }
            result = pat.replace('n', result).replace('$', curr);
        }
        if (f1 == 'p') {
            var pat = nf.percent.pattern[value < 0 ? 0 : 1];
            result = pat.replace('n', result);
        }
        return result;
    };
    Globalize.formatDate = function (value, format) {
        value = asDate(value);
        switch (format) {
            case 'r':
            case 'R':
                return value.toUTCString();
            case 'u':
                return value.toISOString().replace(/\.\d{3}/, '');
        }
        format = Globalize._expandFormat(format);
        var parts = Globalize._parseDateFormat(format), str = '';
        for (var i = 0; i < parts.length; i++) {
            str += Globalize._formatDatePart(value, format, parts[i]);
        }
        return str;
    };
    Globalize.parseInt = function (value, format) {
        return Math.round(Globalize.parseFloat(value, format));
    };
    Globalize.parseFloat = function (value, format) {
        var neg = value.indexOf('-') > -1 || (value.indexOf('(') > -1 && value.indexOf(')') > -1) ? -1 : +1, pct = value.indexOf('%') > -1 ? .01 : 1, m = format ? format.match(/,+/) : null, scale = m ? m[0].length * 3 : 0;
        if (format && (format[0] == 'x' || format[0] == 'X')) {
            value = value.replace(/[^0-9a-f]+.*$/gi, '');
            return parseInt(value, 16) * neg * pct * Math.pow(10, scale);
        }
        var dp = exports.culture.Globalize.numberFormat['.'], rx = new RegExp('[^\\d\\' + dp + ']', 'g'), val = value.replace(rx, '').replace(dp, '.');
        return parseFloat(val) * neg * pct * Math.pow(10, scale);
    };
    Globalize.parseDate = function (value, format) {
        value = asString(value);
        if (!value) {
            return null;
        }
        if (format == 'u') {
            return new Date(value);
        }
        var d;
        if (format == 'R' || format == 'r') {
            var rx = /(([0-9]+)\-([0-9]+)\-([0-9]+))?\s?(([0-9]+):([0-9]+)(:([0-9]+))?)?/, match = value.match(rx);
            if (match[1] || match[5]) {
                d = match[1]
                    ? new Date(parseInt(match[2]), parseInt(match[3]) - 1, parseInt(match[4]))
                    : new Date();
                if (match[5]) {
                    d.setHours(parseInt(match[6]));
                    d.setMinutes(parseInt(match[7]));
                    d.setSeconds(match[8] ? parseInt(match[9]) : 0);
                }
            }
            else {
                d = new Date(value);
            }
            return !isNaN(d.getTime()) ? d : null;
        }
        format = Globalize._expandFormat(format ? format : 'd');
        var cal = exports.culture.Globalize.calendar, cjk = Globalize._CJK, rxv = new RegExp('(\\' + cal['/'] + ')|(\\' + cal[':'] + ')|' +
            '(\\d+)|' +
            '([' + cjk + '\\.]{2,})|' +
            '([' + cjk + ']+)', 'gi'), vparts = value.match(rxv), fparts = Globalize._parseDateFormat(format), offset = 0, year = -1, month = 0, day = 1, hour = 0, min = 0, tzm = 0, sec = 0, ms = 0, era = -1, hasDayName, hasDay, hasQuarter, hasMonth, hasFullYear, fiscalFmt;
        if (!vparts || !vparts.length || !fparts || !fparts.length) {
            return null;
        }
        for (var i = 0; i < fparts.length && vparts; i++) {
            var vpi = i - offset, pval = (vpi > -1 && vpi < vparts.length) ? vparts[vpi] : '', plen = fparts[i].length;
            switch (fparts[i]) {
                case 'EEEE':
                case 'EEE':
                case 'EE':
                case 'E':
                case 'eeee':
                case 'eee':
                case 'ee':
                case 'e':
                    fiscalFmt = fparts[i];
                case 'yyyy':
                case 'yyy':
                case 'yy':
                case 'y':
                    if (plen > 1 && pval.length > plen) {
                        vparts[vpi] = pval.substr(plen);
                        pval = pval.substr(0, plen);
                        offset++;
                    }
                    year = parseInt(pval);
                    hasFullYear = pval.length == 4;
                    break;
                case 'MMMM':
                case 'MMM':
                    hasMonth = true;
                    var monthName = pval.toLowerCase();
                    month = -1;
                    for (var j = 0; j < 12; j++) {
                        if (cal.months[j].toLowerCase().indexOf(monthName) == 0) {
                            month = j;
                            break;
                        }
                    }
                    if (month > -1) {
                        break;
                    }
                case 'MM':
                case 'M':
                    hasMonth = true;
                    if (plen > 1 && pval.length > plen) {
                        vparts[vpi] = pval.substr(plen);
                        pval = pval.substr(0, plen);
                        offset++;
                    }
                    month = parseInt(pval) - 1;
                    break;
                case 'dddd':
                case 'ddd':
                    hasDayName = true;
                    break;
                case 'dd':
                case 'd':
                    if (plen > 1 && pval.length > plen) {
                        vparts[vpi] = pval.substr(plen);
                        pval = pval.substr(0, plen);
                        offset++;
                    }
                    day = parseInt(pval);
                    hasDay = true;
                    break;
                case 'hh':
                case 'h':
                    if (plen > 1 && pval.length > plen) {
                        vparts[vpi] = pval.substr(plen);
                        pval = pval.substr(0, plen);
                        offset++;
                    }
                    hour = parseInt(pval);
                    hour = hour == 12 ? 0 : hour;
                    break;
                case 'HH':
                    if (plen > 1 && pval.length > plen) {
                        vparts[vpi] = pval.substr(plen);
                        pval = pval.substr(0, plen);
                        offset++;
                    }
                    hour = parseInt(pval);
                    break;
                case 'H':
                    hour = parseInt(pval);
                    break;
                case 'mm':
                case 'm':
                    if (plen > 1 && pval.length > plen) {
                        vparts[vpi] = pval.substr(plen);
                        pval = pval.substr(0, plen);
                        offset++;
                    }
                    min = parseInt(pval);
                    break;
                case 'ss':
                case 's':
                    if (plen > 1 && pval.length > plen) {
                        vparts[vpi] = pval.substr(plen);
                        pval = pval.substr(0, plen);
                        offset++;
                    }
                    sec = parseInt(pval);
                    break;
                case 'fffffff':
                case 'FFFFFFF':
                case 'ffffff':
                case 'FFFFFF':
                case 'fffff':
                case 'FFFFF':
                case 'ffff':
                case 'FFFF':
                case 'fff':
                case 'FFF':
                case 'ff':
                case 'FF':
                case 'f':
                case 'F':
                    ms = parseInt(pval) / Math.pow(10, plen - 3);
                    break;
                case 'tt':
                case 't':
                    pval = pval.toUpperCase();
                    if (hour < 12 && cal.pm.indexOf(pval) > -1) {
                        hour += 12;
                    }
                    break;
                case 'q':
                case 'Q':
                case 'u':
                case 'U':
                    hasQuarter = true;
                    break;
                case 'ggg':
                case 'gg':
                case 'g':
                    era = cal.eras.length > 1 ? Globalize._getEra(pval, cal) : -1;
                    break;
                case cal['/']:
                case cal[':']:
                    if (pval && pval != fparts[i]) {
                        return null;
                    }
                    break;
                case 'K':
                    break;
                default:
                    if (Globalize._unquote(fparts[i]).trim() != pval.trim()) {
                        offset++;
                    }
                    break;
            }
        }
        if (hasMonth && hasDay) {
            if (isNaN(hour))
                hour = 0;
            if (isNaN(min))
                min = 0;
            if (isNaN(sec))
                sec = 0;
        }
        if (month < 0 || month > 11 || isNaN(month) ||
            day < 0 || day > 31 || isNaN(day) ||
            hour < 0 || hour > 24 || isNaN(hour) ||
            min < 0 || min > 60 || isNaN(min) ||
            sec < 0 || sec > 60 || isNaN(sec)) {
            return null;
        }
        if (fiscalFmt) {
            if (!hasMonth) {
                return null;
            }
            var cal_1 = exports.culture.Globalize.calendar;
            if (isArray(cal_1.fiscalYearOffsets)) {
                var govt = fiscalFmt[0] == 'E', fiscalMonth = month - cal_1.fiscalYearOffsets[govt ? 0 : 1];
                year += (fiscalMonth > 11) ? -1 : (fiscalMonth < 0) ? +1 : 0;
            }
        }
        if (hasDayName && !hasDay) {
            return null;
        }
        if (hasQuarter && !hasMonth) {
            return null;
        }
        if (year < 0) {
            year = new Date().getFullYear();
        }
        if (era > -1) {
            year = year + cal.eras[era].start.getFullYear() - 1;
        }
        else if (year < 100 && !hasFullYear) {
            var max = isNumber(cal.twoDigitYearMax) ? cal.twoDigitYearMax : 2029;
            year += (year + 2000 < max) ? 2000 : 1900;
        }
        d = DateTime.newDate(year, month, day, hour, min + tzm, sec, ms);
        return isNaN(d.getTime()) ? null : d;
    };
    Globalize.getFirstDayOfWeek = function () {
        var fdw = exports.culture.Globalize.calendar.firstDay;
        return fdw ? fdw : 0;
    };
    Globalize.getNumberDecimalSeparator = function () {
        var ndc = exports.culture.Globalize.numberFormat['.'];
        return ndc ? ndc : '.';
    };
    Globalize._toFixedStr = function (num, digits) {
        var str = num.toString(), decPos = str.indexOf('.'), xZeros = digits - (str.length - decPos) + 1;
        return str.indexOf('e') < 0 && decPos > -1 && xZeros >= 0
            ? str + Array(xZeros + 1).join('0')
            : num.toFixed(digits);
    };
    Globalize._unquote = function (s) {
        if (s.length > 1 && s[0] == s[s.length - 1]) {
            if (s[0] == '\'' || s[0] == '\"') {
                return s.substr(1, s.length - 2);
            }
        }
        return s;
    };
    Globalize._parseDateFormat = function (format) {
        if (format in Globalize._dateFormatParts) {
            return Globalize._dateFormatParts[format];
        }
        var parts = [], str = '', start, end;
        if (format) {
            for (start = 0; start > -1 && start < format.length; start++) {
                var c = format[start];
                if (c == '\'' || c == '"') {
                    end = format.indexOf(c, start + 1);
                    if (end > -1) {
                        parts.push(format.substring(start, end + 1));
                        start = end;
                        continue;
                    }
                }
                end = start + 1;
                for (; end < format.length; end++) {
                    if (format[end] != c)
                        break;
                }
                parts.push(format.substring(start, end));
                start = end - 1;
            }
        }
        Globalize._dateFormatParts[format] = parts;
        return parts;
    };
    Globalize._formatDatePart = function (d, format, part) {
        var cal = exports.culture.Globalize.calendar, era = 0, year = 0, ff = 0, fd, plen = part.length;
        switch (part) {
            case 'yyyy':
            case 'yyy':
            case 'yy':
            case 'y':
            case 'EEEE':
            case 'EEE':
            case 'EE':
            case 'E':
            case 'eeee':
            case 'eee':
            case 'ee':
            case 'e':
                fd = part[0] == 'E' ? DateTime.toFiscal(d, true) :
                    part[0] == 'e' ? DateTime.toFiscal(d, false) :
                        d;
                year = fd.getFullYear();
                if (cal.eras.length > 1 && format.indexOf('g') > -1) {
                    era = Globalize._getEra(d, cal);
                    if (era > -1) {
                        year = year - cal.eras[era].start.getFullYear() + 1;
                    }
                }
                var y = part.length < 3 ? year % 100
                    : part.length == 3 ? year % 1000
                        : year;
                return Globalize._zeroPad(y, part.length);
            case 'MMMMM':
                return cal.monthsAbbr[d.getMonth()][0];
            case 'MMMM':
                return cal.months[d.getMonth()];
            case 'MMM':
                return cal.monthsAbbr[d.getMonth()];
            case 'MM':
            case 'M':
                return Globalize._zeroPad(d.getMonth() + 1, plen);
            case 'dddd':
                return cal.days[d.getDay()];
            case 'ddd':
                return cal.daysAbbr[d.getDay()];
            case 'dd':
                return Globalize._zeroPad(d.getDate(), 2);
            case 'd':
                return d.getDate().toString();
            case 'hh':
            case 'h':
                return Globalize._zeroPad(Globalize._h12(d), plen);
            case 'HH':
            case 'H':
                return Globalize._zeroPad(d.getHours(), plen);
            case 'mm':
            case 'm':
                return Globalize._zeroPad(d.getMinutes(), plen);
            case 'ss':
            case 's':
                return Globalize._zeroPad(d.getSeconds(), plen);
            case 'fffffff':
            case 'FFFFFFF':
            case 'ffffff':
            case 'FFFFFF':
            case 'fffff':
            case 'FFFFF':
            case 'ffff':
            case 'FFFF':
            case 'fff':
            case 'FFF':
            case 'ff':
            case 'FF':
            case 'f':
            case 'F':
                ff = d.getMilliseconds() * Math.pow(10, plen - 3);
                return part[0] == 'f' ? Globalize._zeroPad(ff, plen) : ff.toFixed(0);
            case 'tt':
                return d.getHours() < 12 ? cal.am[0] : cal.pm[0];
            case 't':
                return d.getHours() < 12 ? cal.am[1] : cal.pm[1];
            case 'q':
            case 'Q':
                return (Math.floor(d.getMonth() / 3) + 1).toString();
            case 'u':
            case 'U':
                fd = DateTime.toFiscal(d, part == 'U');
                return (Math.floor(fd.getMonth() / 3) + 1).toString();
            case 'ggg':
            case 'gg':
            case 'g':
                if (cal.eras.length > 1) {
                    era = Globalize._getEra(d, cal);
                    if (era > -1) {
                        return part == 'ggg' ? cal.eras[era].name : part == 'gg' ? cal.eras[era].name[0] : cal.eras[era].symbol;
                    }
                }
                return cal.eras[0];
            case ':':
            case '/':
                return cal[part];
            case 'K':
                var tz = d.toString().match(/(\+|\-)(\d{2})(\d{2})/);
                return tz ? tz[1] + tz[2] + tz[3] : '';
            case 'zzz':
            case 'zz':
            case 'z':
                var tzo = -d.getTimezoneOffset(), ret = void 0;
                switch (part) {
                    case 'zzz':
                        ret = Globalize.format(tzo / 60, 'd2', false, true) + cal[':'] +
                            Globalize.format(tzo % 60, 'd2', false, true);
                        break;
                    case 'zz':
                        ret = Globalize.format(tzo / 60, 'd2', false, true);
                        break;
                    case 'z':
                        ret = Globalize.format(tzo / 60, 'd', false, true);
                        break;
                }
                return tzo >= 0 ? '+' + ret : ret;
        }
        if (plen > 1 && part[0] == part[plen - 1]) {
            if (part[0] == '\"' || part[0] == '\'') {
                return part.substr(1, plen - 2);
            }
        }
        return part;
    };
    Globalize._getEra = function (d, cal) {
        if (isDate(d)) {
            for (var i = 0; i < cal.eras.length; i++) {
                if (d >= cal.eras[i].start) {
                    return i;
                }
            }
        }
        else if (isString(d)) {
            for (var i = 0; i < cal.eras.length; i++) {
                if (cal.eras[i].name) {
                    if (cal.eras[i].name.indexOf(d) == 0 || cal.eras[i].symbol.indexOf(d) == 0) {
                        return i;
                    }
                }
            }
        }
        return -1;
    };
    Globalize._expandFormat = function (format) {
        var fmt = exports.culture.Globalize.calendar.patterns[format];
        return fmt ? fmt : format;
    };
    Globalize._zeroPad = function (num, places) {
        var n = num.toFixed(0), zero = places - n.length + 1;
        return zero > 0 ? Array(zero).join('0') + n : n;
    };
    Globalize._h12 = function (d) {
        var cal = exports.culture.Globalize.calendar, h = d.getHours();
        if (cal.am && cal.am[0]) {
            h = h % 12;
            if (h == 0)
                h = 12;
        }
        return h;
    };
    Globalize._mul100 = function (n) {
        var str = n.toString(), pos = str.indexOf('.');
        if (str.indexOf('e') > -1) {
            return n * 100;
        }
        if (pos < 0) {
            str += '00';
        }
        else {
            pos += 2;
            str = str.replace('.', '') + '00';
            str = str.substr(0, pos) + '.' + str.substr(pos);
        }
        return parseFloat(str);
    };
    Globalize._CJK = 'a-z' +
        'u00c0-u017fu3000-u30ffu4e00-u9faf'.replace(/u/g, '\\u') +
        'u1100-u11ffu3130-u318fua960-ua97fuac00-ud7afud7b0-ud7ff'.replace(/u/g, '\\u');
    Globalize._dateFormatParts = {};
    return Globalize;
}());
exports.Globalize = Globalize;
function _updateCulture() {
    exports.culture = window['wijmo'].culture;
}
exports._updateCulture = _updateCulture;
'use strict';
var Binding = (function () {
    function Binding(path) {
        this.path = path;
    }
    Object.defineProperty(Binding.prototype, "path", {
        get: function () {
            return this._path;
        },
        set: function (value) {
            this._path = value;
            this._parts = value ? value.split('.') : [];
            for (var i = 0; i < this._parts.length; i++) {
                var part = this._parts[i], ib = part.indexOf('[');
                if (ib > -1) {
                    this._parts[i] = part.substr(0, ib);
                    this._parts.splice(++i, 0, parseInt(part.substr(ib + 1)));
                }
            }
            this._key = this._parts.length == 1 ? this._parts[0] : null;
        },
        enumerable: true,
        configurable: true
    });
    Binding.prototype.getValue = function (object) {
        if (object) {
            if (this._key) {
                return object[this._key];
            }
            if (this._path && this._path in object) {
                return object[this._path];
            }
            for (var i = 0; i < this._parts.length && object; i++) {
                object = object[this._parts[i]];
            }
        }
        return object;
    };
    Binding.prototype.setValue = function (object, value) {
        if (object) {
            if (this._path in object) {
                object[this._path] = value;
                return;
            }
            for (var i = 0; i < this._parts.length - 1; i++) {
                object = object[this._parts[i]];
                if (object == null) {
                    return;
                }
            }
            object[this._parts[this._parts.length - 1]] = value;
        }
    };
    return Binding;
}());
exports.Binding = Binding;
'use strict';
var EventHandler = (function () {
    function EventHandler(handler, self) {
        this.handler = handler;
        this.self = self;
    }
    return EventHandler;
}());
var Event = (function () {
    function Event() {
        this._handlers = [];
    }
    Event.prototype.addHandler = function (handler, self) {
        handler = asFunction(handler);
        this._handlers.push(new EventHandler(handler, self));
    };
    Event.prototype.removeHandler = function (handler, self) {
        handler = asFunction(handler);
        for (var i = 0; i < this._handlers.length; i++) {
            var l = this._handlers[i];
            if (l.handler == handler || handler == null) {
                if (l.self == self || self == null) {
                    this._handlers.splice(i, 1);
                    if (handler && self) {
                        break;
                    }
                }
            }
        }
    };
    Event.prototype.removeAllHandlers = function () {
        this._handlers.length = 0;
    };
    Event.prototype.raise = function (sender, args) {
        if (args === void 0) { args = EventArgs.empty; }
        for (var i = 0; i < this._handlers.length; i++) {
            var l = this._handlers[i];
            l.handler.call(l.self, sender, args);
        }
    };
    Object.defineProperty(Event.prototype, "hasHandlers", {
        get: function () {
            return this._handlers.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "handlerCount", {
        get: function () {
            return this._handlers.length;
        },
        enumerable: true,
        configurable: true
    });
    return Event;
}());
exports.Event = Event;
var EventArgs = (function () {
    function EventArgs() {
    }
    EventArgs.empty = new EventArgs();
    return EventArgs;
}());
exports.EventArgs = EventArgs;
var CancelEventArgs = (function (_super) {
    __extends(CancelEventArgs, _super);
    function CancelEventArgs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cancel = false;
        return _this;
    }
    return CancelEventArgs;
}(EventArgs));
exports.CancelEventArgs = CancelEventArgs;
var PropertyChangedEventArgs = (function (_super) {
    __extends(PropertyChangedEventArgs, _super);
    function PropertyChangedEventArgs(propertyName, oldValue, newValue) {
        var _this = _super.call(this) || this;
        _this._name = propertyName;
        _this._oldVal = oldValue;
        _this._newVal = newValue;
        return _this;
    }
    Object.defineProperty(PropertyChangedEventArgs.prototype, "propertyName", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyChangedEventArgs.prototype, "oldValue", {
        get: function () {
            return this._oldVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyChangedEventArgs.prototype, "newValue", {
        get: function () {
            return this._newVal;
        },
        enumerable: true,
        configurable: true
    });
    return PropertyChangedEventArgs;
}(EventArgs));
exports.PropertyChangedEventArgs = PropertyChangedEventArgs;
var RequestErrorEventArgs = (function (_super) {
    __extends(RequestErrorEventArgs, _super);
    function RequestErrorEventArgs(xhr, msg) {
        var _this = _super.call(this) || this;
        _this._xhr = xhr;
        _this._msg = msg;
        return _this;
    }
    Object.defineProperty(RequestErrorEventArgs.prototype, "request", {
        get: function () {
            return this._xhr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestErrorEventArgs.prototype, "message", {
        get: function () {
            return this._msg;
        },
        set: function (value) {
            this._msg = value;
        },
        enumerable: true,
        configurable: true
    });
    return RequestErrorEventArgs;
}(CancelEventArgs));
exports.RequestErrorEventArgs = RequestErrorEventArgs;
'use strict';
var Control = (function () {
    function Control(element, options, invalidateOnResize) {
        if (options === void 0) { options = null; }
        if (invalidateOnResize === void 0) { invalidateOnResize = false; }
        var _this = this;
        this._pristine = true;
        this._focus = false;
        this._updating = 0;
        this._fullUpdate = false;
        this.gotFocus = new Event();
        this.lostFocus = new Event();
        this.refreshing = new Event();
        this.refreshed = new Event();
        Control._updateWme();
        assert(Control.getControl(element) == null, 'Element is already hosting a control.');
        var host = getElement(element);
        assert(host != null, 'Cannot find the host element.');
        this._orgOuter = host.outerHTML;
        this._orgTag = host.tagName;
        this._orgAtts = host.attributes;
        if (host.tagName == 'INPUT' || host.tagName == 'SELECT') {
            host = this._replaceWithDiv(host);
        }
        this._e = host;
        host[Control._CTRL_KEY] = this;
        if (invalidateOnResize == true) {
            this._szCtl = new Size(host.offsetWidth, host.offsetHeight);
            var hr = this._handleResize.bind(this);
            this.addEventListener(window, 'resize', hr);
        }
        var toFocus;
        this.addEventListener(host, 'focus', function (e) {
            if (toFocus)
                clearTimeout(toFocus);
            toFocus = setTimeout(function () {
                toFocus = null;
                _this._updateFocusState();
            }, Control._FOCUS_INTERVAL);
        }, true);
        this.addEventListener(host, 'blur', function (e) {
            if (toFocus)
                clearTimeout(toFocus);
            toFocus = setTimeout(function () {
                toFocus = null;
                _this._updateFocusState();
            }, Control._FOCUS_INTERVAL);
        }, true);
        var hd = this._handleDisabled.bind(this);
        this.addEventListener(host, 'mousedown', hd, true);
        this.addEventListener(host, 'mouseup', hd, true);
        this.addEventListener(host, 'click', hd, true);
        this.addEventListener(host, 'dblclick', hd, true);
        this.addEventListener(host, 'keydown', hd, true);
        this.addEventListener(host, 'wheel', hd, getEventOptions(true, true));
        if (Control._touching == null) {
            Control._touching = false;
            if ('ontouchstart' in window || 'onpointerdown' in window) {
                var b = document.body, ts = this._handleTouchStart, te = this._handleTouchEnd, opt = getEventOptions(true, true);
                if ('ontouchstart' in window) {
                    b.addEventListener('touchstart', ts, opt);
                    b.addEventListener('touchend', te, opt);
                    b.addEventListener('touchcancel', te, opt);
                    b.addEventListener('touchleave', te, opt);
                }
                else if ('onpointerdown' in window) {
                    b.addEventListener('pointerdown', ts, opt);
                    b.addEventListener('pointerup', te, opt);
                    b.addEventListener('pointerout', te, opt);
                    b.addEventListener('pointercancel', te, opt);
                    b.addEventListener('pointerleave', te, opt);
                }
            }
        }
    }
    Control.prototype.getTemplate = function () {
        for (var p = Object.getPrototypeOf(this); p; p = Object.getPrototypeOf(p)) {
            var tpl = p.constructor.controlTemplate;
            if (tpl) {
                return tpl;
            }
        }
        return null;
    };
    Control.prototype.applyTemplate = function (classNames, template, parts, namePart) {
        var _this = this;
        var host = this._e;
        if (classNames) {
            addClass(host, classNames);
        }
        var tpl = null;
        if (template) {
            tpl = createElement(template, host);
        }
        var inputs = host.querySelectorAll('input'), input = (inputs.length == 1 ? inputs[0] : null);
        if (input) {
            this._copyAttributes(input, host.attributes, Control._rxInputAtts);
            this._copyAttributes(input, this._orgAtts, Control._rxInputAtts);
        }
        if (input && host.id) {
            var root = host;
            while (root.parentElement) {
                root = root.parentElement;
            }
            var label = root.querySelector('label[for="' + host.id + '"]');
            if (label instanceof HTMLLabelElement) {
                var newId = getUniqueId(host.id + '_input');
                input.id = newId;
                label.htmlFor = newId;
            }
        }
        if (input) {
            var evtChange_1 = document.createEvent('HTMLEvents'), orgVal_1 = input.value;
            evtChange_1.initEvent('change', true, false);
            this.addEventListener(input, 'input', function () {
                _this._pristine = false;
                orgVal_1 = input.value;
            }, true);
            this.gotFocus.addHandler(function () {
                orgVal_1 = input.value;
            });
            this.lostFocus.addHandler(function () {
                if (_this._pristine) {
                    _this._pristine = false;
                    _this._updateState();
                }
                if (orgVal_1 != input.value) {
                    input.dispatchEvent(evtChange_1);
                }
            });
        }
        if (input) {
            host.tabIndex = -1;
        }
        else if (!host.getAttribute('tabindex')) {
            host.tabIndex = 0;
        }
        this._updateState();
        if (parts) {
            for (var part in parts) {
                var wjPart = parts[part];
                this[part] = tpl.querySelector('[wj-part="' + wjPart + '"]');
                if (this[part] == null && tpl.getAttribute('wj-part') == wjPart) {
                    this[part] = tpl;
                }
                if (this[part] == null) {
                    throw 'Missing template part: "' + wjPart + '"';
                }
                if (wjPart == namePart) {
                    var key = 'name', att = host.attributes[key];
                    if (att && att.value) {
                        this[part].setAttribute(key, att.value);
                    }
                    key = 'accesskey';
                    att = host.attributes[key];
                    if (att && att.value) {
                        this[part].setAttribute(key, att.value);
                        host.removeAttribute(key);
                    }
                }
            }
        }
        return tpl;
    };
    Control.prototype.dispose = function () {
        var cc = this._e.querySelectorAll('.wj-control');
        for (var i = 0; i < cc.length; i++) {
            var ctl = Control.getControl(cc[i]);
            if (ctl) {
                ctl.dispose();
            }
        }
        if (this._toInv) {
            clearTimeout(this._toInv);
            this._toInv = null;
        }
        this.removeEventListener();
        for (var prop in this) {
            if (prop.length > 2 && prop.indexOf('on') == 0) {
                var evt = this[prop[2].toLowerCase() + prop.substr(3)];
                if (evt instanceof Event) {
                    evt.removeAllHandlers();
                }
            }
        }
        var cv = this['collectionView'];
        if (cv instanceof CollectionView) {
            for (var prop in cv) {
                var evt = cv[prop];
                if (evt instanceof Event) {
                    evt.removeHandler(null, this);
                }
            }
        }
        if (this._e.parentNode) {
            this._e.outerHTML = this._orgOuter;
        }
        this._e[Control._CTRL_KEY] = null;
        this._e = this._orgOuter = this._orgTag = null;
    };
    Control.getControl = function (element) {
        var e = getElement(element);
        return e ? asType(e[Control._CTRL_KEY], Control, true) : null;
    };
    Object.defineProperty(Control.prototype, "hostElement", {
        get: function () {
            return this._e;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "rightToLeft", {
        get: function () {
            if (this._rtlDir == null) {
                this._rtlDir = this._e
                    ? getComputedStyle(this._e).direction == 'rtl'
                    : false;
            }
            return this._rtlDir;
        },
        enumerable: true,
        configurable: true
    });
    Control.prototype.focus = function () {
        if (this._e) {
            this._e.focus();
        }
    };
    Control.prototype.containsFocus = function () {
        var host = this._e, ae = getActiveElement();
        if (!host) {
            return false;
        }
        for (var e = ae; e;) {
            if (e == host) {
                return true;
            }
            e = e[Control._OWNR_KEY] || e.parentElement;
        }
        return false;
    };
    Control.prototype.invalidate = function (fullUpdate) {
        var _this = this;
        if (fullUpdate === void 0) { fullUpdate = true; }
        this._rtlDir = null;
        this._fullUpdate = this._fullUpdate || fullUpdate;
        if (this._toInv) {
            clearTimeout(this._toInv);
            this._toInv = null;
        }
        if (!this.isUpdating) {
            this._toInv = setTimeout(function () {
                _this.refresh(_this._fullUpdate);
                _this._toInv = null;
            }, Control._REFRESH_INTERVAL);
        }
    };
    Control.prototype.refresh = function (fullUpdate) {
        var _this = this;
        if (fullUpdate === void 0) { fullUpdate = true; }
        if (!this.isUpdating) {
            this.onRefreshing();
            setTimeout(function () {
                _this.onRefreshed();
            });
        }
        if (!this.isUpdating && this._toInv) {
            clearTimeout(this._toInv);
            this._toInv = null;
            this._rtlDir = null;
            this._fullUpdate = false;
            Control._updateWme();
        }
    };
    Control.invalidateAll = function (e) {
        if (!e)
            e = document.body;
        if (e.children) {
            for (var i = 0; i < e.children.length; i++) {
                Control.invalidateAll(e.children[i]);
            }
        }
        var ctl = Control.getControl(e);
        if (ctl) {
            ctl.invalidate();
        }
    };
    Control.refreshAll = function (e) {
        if (!e)
            e = document.body;
        if (e.children) {
            for (var i = 0; i < e.children.length; i++) {
                Control.refreshAll(e.children[i]);
            }
        }
        var ctl = Control.getControl(e);
        if (ctl) {
            ctl.refresh();
        }
    };
    Control.disposeAll = function (e) {
        var ctl = Control.getControl(e);
        if (ctl) {
            ctl.dispose();
        }
        else if (e.children) {
            for (var i = 0; i < e.children.length; i++) {
                Control.disposeAll(e.children[i]);
            }
        }
    };
    Control.prototype.beginUpdate = function () {
        this._updating++;
    };
    Control.prototype.endUpdate = function () {
        this._updating--;
        if (this._updating <= 0) {
            this.invalidate();
        }
    };
    Object.defineProperty(Control.prototype, "isUpdating", {
        get: function () {
            return this._updating > 0;
        },
        enumerable: true,
        configurable: true
    });
    Control.prototype.deferUpdate = function (fn) {
        try {
            this.beginUpdate();
            fn();
        }
        finally {
            this.endUpdate();
        }
    };
    Object.defineProperty(Control.prototype, "isTouching", {
        get: function () {
            return Control._touching;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Control.prototype, "isDisabled", {
        get: function () {
            return this._e && this._e.getAttribute('disabled') != null;
        },
        set: function (value) {
            value = asBoolean(value, true);
            if (value != this.isDisabled) {
                enable(this._e, !value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Control.prototype.initialize = function (options) {
        if (options) {
            copy(this, options);
        }
    };
    Control.prototype.addEventListener = function (target, type, fn, capture) {
        if (capture === void 0) { capture = false; }
        if (target) {
            target.addEventListener(type, fn, capture);
            if (this._listeners == null) {
                this._listeners = [];
            }
            this._listeners.push({ target: target, type: type, fn: fn, capture: capture });
        }
    };
    Control.prototype.removeEventListener = function (target, type, fn, capture) {
        var cnt = 0;
        if (this._listeners) {
            for (var i = 0; i < this._listeners.length; i++) {
                var l = this._listeners[i];
                if (target == null || target == l.target) {
                    if (type == null || type == l.type) {
                        if (fn == null || fn == l.fn) {
                            if (capture == null || capture == l.capture) {
                                l.target.removeEventListener(l.type, l.fn, l.capture);
                                this._listeners.splice(i, 1);
                                i--;
                                cnt++;
                            }
                        }
                    }
                }
            }
        }
        return cnt;
    };
    Control.prototype.onGotFocus = function (e) {
        this.gotFocus.raise(this, e);
    };
    Control.prototype.onLostFocus = function (e) {
        this.lostFocus.raise(this, e);
    };
    Control.prototype.onRefreshing = function (e) {
        this.refreshing.raise(this, e);
    };
    Control.prototype.onRefreshed = function (e) {
        this.refreshed.raise(this, e);
    };
    Control.prototype._hasPendingUpdates = function () {
        return this._toInv != null;
    };
    Control._updateWme = function () {
    };
    Control.prototype._handleResize = function () {
        if (this._e.parentElement) {
            var sz = new Size(this._e.offsetWidth, this._e.offsetHeight);
            if (!sz.equals(this._szCtl)) {
                this._szCtl = sz;
                this.invalidate();
            }
        }
    };
    Control.prototype._updateFocusState = function () {
        setTimeout(function () {
            var e = EventArgs.empty, hasFocus = [];
            var hadFocus = document.body.querySelectorAll('.wj-state-focused');
            for (var i = 0; i < hadFocus.length; i++) {
                var ctl = Control.getControl(hadFocus[i]);
                if (ctl && ctl._focus && !ctl.containsFocus()) {
                    ctl._focus = false;
                    ctl._updateState();
                    ctl.onLostFocus(e);
                }
            }
            var ae = getActiveElement();
            if (ae) {
                for (var host = ae; host;) {
                    var ctl = Control.getControl(host);
                    if (ctl && !ctl._focus && ctl.containsFocus()) {
                        ctl._focus = true;
                        ctl._updateState();
                        ctl.onGotFocus(e);
                    }
                    host = host[Control._OWNR_KEY] || host.parentElement;
                }
            }
        });
    };
    Control.prototype._updateState = function () {
        var host = this.hostElement;
        if (host) {
            toggleClass(host, 'wj-state-focused', this._focus);
            var input = host.querySelector('input');
            if (input instanceof HTMLInputElement) {
                toggleClass(host, 'wj-state-empty', input.value.length == 0);
                toggleClass(host, 'wj-state-readonly', input.readOnly);
                var vm = input.validationMessage;
                toggleClass(host, 'wj-state-invalid', !this._pristine && vm != null && vm.length > 0);
            }
        }
    };
    Control.prototype._handleTouchStart = function (e) {
        if (e.pointerType == null || e.pointerType == 'touch') {
            Control._touching = true;
        }
    };
    Control.prototype._handleTouchEnd = function (e) {
        if (e.pointerType == null || e.pointerType == 'touch') {
            setTimeout(function () {
                Control._touching = false;
            }, 400);
        }
    };
    Control.prototype._handleDisabled = function (e) {
        if (this.isDisabled) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    };
    Control.prototype._replaceWithDiv = function (element) {
        var div = document.createElement('div');
        element.parentElement.replaceChild(div, element);
        div.innerHTML = element.innerHTML;
        this._copyAttributes(div, element.attributes, /id|style|class/i);
        return div;
    };
    Control.prototype._copyAttributes = function (e, atts, names) {
        if (e) {
            for (var i = 0; i < atts.length; i++) {
                var name_1 = atts[i].name;
                if (name_1.match(names)) {
                    e.setAttribute(name_1, atts[i].value);
                }
            }
        }
    };
    Control._REFRESH_INTERVAL = 10;
    Control._FOCUS_INTERVAL = 20;
    Control._ANIM_DEF_DURATION = 400;
    Control._ANIM_DEF_STEP = 35;
    Control._CLICK_DELAY = 800;
    Control._CLICK_REPEAT = 75;
    Control._CLIPBOARD_DELAY = 100;
    Control._CTRL_KEY = '$WJ-CTRL';
    Control._OWNR_KEY = '$WJ-OWNR';
    Control._SCRL_KEY = '$WJ-SCRL';
    Control._rxInputAtts = /name|tabindex|placeholder|autofocus|autocomplete|autocorrect|autocapitalize|spellcheck|readonly|minlength|maxlength|pattern|type/i;
    return Control;
}());
exports.Control = Control;
'use strict';
var Aggregate;
(function (Aggregate) {
    Aggregate[Aggregate["None"] = 0] = "None";
    Aggregate[Aggregate["Sum"] = 1] = "Sum";
    Aggregate[Aggregate["Cnt"] = 2] = "Cnt";
    Aggregate[Aggregate["Avg"] = 3] = "Avg";
    Aggregate[Aggregate["Max"] = 4] = "Max";
    Aggregate[Aggregate["Min"] = 5] = "Min";
    Aggregate[Aggregate["Rng"] = 6] = "Rng";
    Aggregate[Aggregate["Std"] = 7] = "Std";
    Aggregate[Aggregate["Var"] = 8] = "Var";
    Aggregate[Aggregate["StdPop"] = 9] = "StdPop";
    Aggregate[Aggregate["VarPop"] = 10] = "VarPop";
    Aggregate[Aggregate["CntAll"] = 11] = "CntAll";
    Aggregate[Aggregate["First"] = 12] = "First";
    Aggregate[Aggregate["Last"] = 13] = "Last";
})(Aggregate = exports.Aggregate || (exports.Aggregate = {}));
function getAggregate(aggType, items, binding) {
    var cnt = 0, cntn = 0, sum = 0, sum2 = 0, min = null, max = null, last = null, bnd = binding ? new Binding(binding) : null;
    aggType = asEnum(aggType, Aggregate);
    if (aggType == Aggregate.CntAll) {
        return items.length;
    }
    for (var i = 0; i < items.length; i++) {
        var val = items[i];
        if (bnd) {
            val = bnd.getValue(val);
        }
        if (aggType == Aggregate.First) {
            return val;
        }
        if (val != null) {
            cnt++;
            if (min == null || val < min) {
                min = val;
            }
            if (max == null || val > max) {
                max = val;
            }
            last = val;
            if (isNumber(val) && !isNaN(val)) {
                cntn++;
                sum += val;
                sum2 += val * val;
            }
            else if (isBoolean(val)) {
                cntn++;
                if (val == true) {
                    sum++;
                    sum2++;
                }
            }
        }
    }
    var avg = cntn == 0 ? 0 : sum / cntn;
    switch (aggType) {
        case Aggregate.Avg:
            return avg;
        case Aggregate.Cnt:
            return cnt;
        case Aggregate.Max:
            return max;
        case Aggregate.Min:
            return min;
        case Aggregate.Rng:
            return max - min;
        case Aggregate.Sum:
            return sum;
        case Aggregate.VarPop:
            return cntn <= 1 ? 0 : sum2 / cntn - avg * avg;
        case Aggregate.StdPop:
            return cntn <= 1 ? 0 : Math.sqrt(sum2 / cntn - avg * avg);
        case Aggregate.Var:
            return cntn <= 1 ? 0 : (sum2 / cntn - avg * avg) * cntn / (cntn - 1);
        case Aggregate.Std:
            return cntn <= 1 ? 0 : Math.sqrt((sum2 / cntn - avg * avg) * cntn / (cntn - 1));
        case Aggregate.Last:
            return last;
    }
    throw 'Invalid aggregate type.';
}
exports.getAggregate = getAggregate;
'use strict';
var NotifyCollectionChangedAction;
(function (NotifyCollectionChangedAction) {
    NotifyCollectionChangedAction[NotifyCollectionChangedAction["Add"] = 0] = "Add";
    NotifyCollectionChangedAction[NotifyCollectionChangedAction["Remove"] = 1] = "Remove";
    NotifyCollectionChangedAction[NotifyCollectionChangedAction["Change"] = 2] = "Change";
    NotifyCollectionChangedAction[NotifyCollectionChangedAction["Reset"] = 3] = "Reset";
})(NotifyCollectionChangedAction = exports.NotifyCollectionChangedAction || (exports.NotifyCollectionChangedAction = {}));
var NotifyCollectionChangedEventArgs = (function (_super) {
    __extends(NotifyCollectionChangedEventArgs, _super);
    function NotifyCollectionChangedEventArgs(action, item, index) {
        if (action === void 0) { action = NotifyCollectionChangedAction.Reset; }
        if (item === void 0) { item = null; }
        if (index === void 0) { index = -1; }
        var _this = _super.call(this) || this;
        _this.action = action;
        _this.item = item;
        _this.index = index;
        return _this;
    }
    NotifyCollectionChangedEventArgs.reset = new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Reset);
    return NotifyCollectionChangedEventArgs;
}(EventArgs));
exports.NotifyCollectionChangedEventArgs = NotifyCollectionChangedEventArgs;
var SortDescription = (function () {
    function SortDescription(property, ascending) {
        this._bnd = new Binding(property);
        this._asc = ascending;
    }
    Object.defineProperty(SortDescription.prototype, "property", {
        get: function () {
            return this._bnd.path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SortDescription.prototype, "ascending", {
        get: function () {
            return this._asc;
        },
        enumerable: true,
        configurable: true
    });
    return SortDescription;
}());
exports.SortDescription = SortDescription;
var PageChangingEventArgs = (function (_super) {
    __extends(PageChangingEventArgs, _super);
    function PageChangingEventArgs(newIndex) {
        var _this = _super.call(this) || this;
        _this.newPageIndex = newIndex;
        return _this;
    }
    return PageChangingEventArgs;
}(CancelEventArgs));
exports.PageChangingEventArgs = PageChangingEventArgs;
var GroupDescription = (function () {
    function GroupDescription() {
    }
    GroupDescription.prototype.groupNameFromItem = function (item, level) {
        return '';
    };
    GroupDescription.prototype.namesMatch = function (groupName, itemName) {
        return groupName === itemName;
    };
    return GroupDescription;
}());
exports.GroupDescription = GroupDescription;
var PropertyGroupDescription = (function (_super) {
    __extends(PropertyGroupDescription, _super);
    function PropertyGroupDescription(property, converter) {
        var _this = _super.call(this) || this;
        _this._bnd = new Binding(property);
        _this._converter = converter;
        return _this;
    }
    Object.defineProperty(PropertyGroupDescription.prototype, "propertyName", {
        get: function () {
            return this._bnd.path;
        },
        enumerable: true,
        configurable: true
    });
    PropertyGroupDescription.prototype.groupNameFromItem = function (item, level) {
        return this._converter
            ? this._converter(item, this.propertyName)
            : this._bnd.getValue(item);
    };
    PropertyGroupDescription.prototype.namesMatch = function (groupName, itemName) {
        return groupName === itemName;
    };
    return PropertyGroupDescription;
}(GroupDescription));
exports.PropertyGroupDescription = PropertyGroupDescription;
'use strict';
var ArrayBase = (function (_super) {
    __extends(ArrayBase, _super);
    function ArrayBase() {
        var _this = this;
        if (!canChangePrototype) {
            _this = _super.call(this) || this;
        }
        else {
            _this.length = 0;
        }
        return _this;
    }
    return ArrayBase;
}(Array));
exports.ArrayBase = ArrayBase;
var canChangePrototype = true;
try {
    ArrayBase.prototype = Array.prototype;
    canChangePrototype = ArrayBase.prototype === Array.prototype;
}
catch (e) {
    canChangePrototype = false;
}
var symb = window['Symbol'];
if (!canChangePrototype && symb && symb.species) {
    Object.defineProperty(ArrayBase, symb.species, {
        get: function () { return Array; },
        enumerable: false,
        configurable: false
    });
}
var ObservableArray = (function (_super) {
    __extends(ObservableArray, _super);
    function ObservableArray(data) {
        var _this = _super.call(this) || this;
        _this._updating = 0;
        _this.collectionChanged = new Event();
        if (data) {
            data = asArray(data);
            _this._updating++;
            for (var i = 0; i < data.length; i++) {
                _this.push(data[i]);
            }
            _this._updating--;
        }
        return _this;
    }
    ObservableArray.prototype.push = function () {
        var item = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            item[_i] = arguments[_i];
        }
        var length = this.length;
        for (var i = 0; item && i < item.length; i++) {
            length = _super.prototype.push.call(this, item[i]);
            if (!this._updating) {
                this._raiseCollectionChanged(NotifyCollectionChangedAction.Add, item[i], length - 1);
            }
        }
        return length;
    };
    ObservableArray.prototype.pop = function () {
        var item = _super.prototype.pop.call(this);
        this._raiseCollectionChanged(NotifyCollectionChangedAction.Remove, item, this.length);
        return item;
    };
    ObservableArray.prototype.splice = function (index, count, item) {
        var rv;
        if (count && item) {
            rv = _super.prototype.splice.call(this, index, count, item);
            if (count == 1) {
                this._raiseCollectionChanged(NotifyCollectionChangedAction.Change, item, index);
            }
            else {
                this._raiseCollectionChanged();
            }
            return rv;
        }
        else if (item) {
            rv = _super.prototype.splice.call(this, index, 0, item);
            this._raiseCollectionChanged(NotifyCollectionChangedAction.Add, item, index);
            return rv;
        }
        else {
            rv = _super.prototype.splice.call(this, index, count);
            if (count == 1) {
                this._raiseCollectionChanged(NotifyCollectionChangedAction.Remove, rv[0], index);
            }
            else {
                this._raiseCollectionChanged();
            }
            return rv;
        }
    };
    ObservableArray.prototype.slice = function (begin, end) {
        return _super.prototype.slice.call(this, begin, end);
    };
    ObservableArray.prototype.indexOf = function (searchElement, fromIndex) {
        return _super.prototype.indexOf.call(this, searchElement, fromIndex);
    };
    ObservableArray.prototype.sort = function (compareFn) {
        var rv = _super.prototype.sort.call(this, compareFn);
        this._raiseCollectionChanged();
        return rv;
    };
    ObservableArray.prototype.insert = function (index, item) {
        this.splice(index, 0, item);
    };
    ObservableArray.prototype.remove = function (item) {
        var index = this.indexOf(item);
        if (index > -1) {
            this.removeAt(index);
            return true;
        }
        return false;
    };
    ObservableArray.prototype.removeAt = function (index) {
        this.splice(index, 1);
    };
    ObservableArray.prototype.setAt = function (index, item) {
        if (index > this.length) {
            this.length = index;
        }
        this.splice(index, 1, item);
    };
    ObservableArray.prototype.clear = function () {
        if (this.length !== 0) {
            this.splice(0, this.length);
            this._raiseCollectionChanged();
        }
    };
    ObservableArray.prototype.beginUpdate = function () {
        this._updating++;
    };
    ObservableArray.prototype.endUpdate = function () {
        if (this._updating > 0) {
            this._updating--;
            if (this._updating == 0) {
                this._raiseCollectionChanged();
            }
        }
    };
    Object.defineProperty(ObservableArray.prototype, "isUpdating", {
        get: function () {
            return this._updating > 0;
        },
        enumerable: true,
        configurable: true
    });
    ObservableArray.prototype.deferUpdate = function (fn) {
        try {
            this.beginUpdate();
            fn();
        }
        finally {
            this.endUpdate();
        }
    };
    ObservableArray.prototype.implementsInterface = function (interfaceName) {
        return interfaceName == 'INotifyCollectionChanged';
    };
    ObservableArray.prototype.onCollectionChanged = function (e) {
        if (e === void 0) { e = NotifyCollectionChangedEventArgs.reset; }
        if (!this.isUpdating) {
            this.collectionChanged.raise(this, e);
        }
    };
    ObservableArray.prototype._raiseCollectionChanged = function (action, item, index) {
        if (action === void 0) { action = NotifyCollectionChangedAction.Reset; }
        if (!this.isUpdating) {
            var e = new NotifyCollectionChangedEventArgs(action, item, index);
            this.onCollectionChanged(e);
        }
    };
    return ObservableArray;
}(ArrayBase));
exports.ObservableArray = ObservableArray;
'use strict';
var CollectionView = (function () {
    function CollectionView(sourceCollection, options) {
        var _this = this;
        this._idx = -1;
        this._srtDsc = new ObservableArray();
        this._grpDesc = new ObservableArray();
        this._newItem = null;
        this._edtItem = null;
        this._pgSz = 0;
        this._pgIdx = 0;
        this._updating = 0;
        this._stableSort = false;
        this._canFilter = true;
        this._canGroup = true;
        this._canSort = true;
        this._canAddNew = true;
        this._canCancelEdit = true;
        this._canRemove = true;
        this._canChangePage = true;
        this._trackChanges = false;
        this._chgAdded = new ObservableArray();
        this._chgRemoved = new ObservableArray();
        this._chgEdited = new ObservableArray();
        this.collectionChanged = new Event();
        this.sourceCollectionChanging = new Event();
        this.sourceCollectionChanged = new Event();
        this.currentChanged = new Event();
        this.currentChanging = new Event();
        this.pageChanged = new Event();
        this.pageChanging = new Event();
        this._srtDsc.collectionChanged.addHandler(function () {
            var arr = _this._srtDsc;
            for (var i = 0; i < arr.length; i++) {
                assert(arr[i] instanceof SortDescription, 'sortDescriptions array must contain SortDescription objects.');
            }
            if (_this.canSort) {
                _this.refresh();
            }
        });
        this._grpDesc.collectionChanged.addHandler(function () {
            var arr = _this._grpDesc;
            for (var i = 0; i < arr.length; i++) {
                assert(arr[i] instanceof GroupDescription, 'groupDescriptions array must contain GroupDescription objects.');
            }
            if (_this.canGroup) {
                _this.refresh();
            }
        });
        this.sourceCollection = sourceCollection ? sourceCollection : new ObservableArray();
        if (options) {
            this.beginUpdate();
            copy(this, options);
            this.endUpdate();
        }
    }
    CollectionView.prototype._copy = function (key, value) {
        if (key == 'sortDescriptions') {
            this.sortDescriptions.clear();
            var arr = asArray(value);
            for (var i = 0; i < arr.length; i++) {
                var val = arr[i];
                if (isString(val)) {
                    val = new SortDescription(val, true);
                }
                this.sortDescriptions.push(val);
            }
            return true;
        }
        if (key == 'groupDescriptions') {
            this.groupDescriptions.clear();
            var arr = asArray(value);
            for (var i = 0; i < arr.length; i++) {
                var val = arr[i];
                if (isString(val)) {
                    val = new PropertyGroupDescription(val);
                }
                this.groupDescriptions.push(val);
            }
            return true;
        }
        return false;
    };
    Object.defineProperty(CollectionView.prototype, "newItemCreator", {
        get: function () {
            return this._itemCreator;
        },
        set: function (value) {
            this._itemCreator = asFunction(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "sortConverter", {
        get: function () {
            return this._srtCvt;
        },
        set: function (value) {
            if (value != this._srtCvt) {
                this._srtCvt = asFunction(value, true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "sortComparer", {
        get: function () {
            return this._srtCmp;
        },
        set: function (value) {
            if (value != this._srtCmp) {
                this._srtCmp = asFunction(value, true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "useStableSort", {
        get: function () {
            return this._stableSort;
        },
        set: function (value) {
            this._stableSort = asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    CollectionView.prototype.getAggregate = function (aggType, binding, currentPage) {
        var items = currentPage ? this._pgView : this._view;
        return getAggregate(aggType, items, binding);
    };
    Object.defineProperty(CollectionView.prototype, "trackChanges", {
        get: function () {
            return this._trackChanges;
        },
        set: function (value) {
            this._trackChanges = asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "itemsAdded", {
        get: function () {
            return this._chgAdded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "itemsRemoved", {
        get: function () {
            return this._chgRemoved;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "itemsEdited", {
        get: function () {
            return this._chgEdited;
        },
        enumerable: true,
        configurable: true
    });
    CollectionView.prototype.clearChanges = function () {
        this._chgAdded.clear();
        this._chgRemoved.clear();
        this._chgEdited.clear();
    };
    CollectionView.prototype.implementsInterface = function (interfaceName) {
        switch (interfaceName) {
            case 'ICollectionView':
            case 'IEditableCollectionView':
            case 'IPagedCollectionView':
            case 'INotifyCollectionChanged':
                return true;
        }
        return false;
    };
    Object.defineProperty(CollectionView.prototype, "getError", {
        get: function () {
            return this._getError;
        },
        set: function (value) {
            this._getError = asFunction(value);
        },
        enumerable: true,
        configurable: true
    });
    CollectionView.prototype.onCollectionChanged = function (e) {
        if (e === void 0) { e = NotifyCollectionChangedEventArgs.reset; }
        if (e.action == NotifyCollectionChangedAction.Change &&
            !this._committing && !this._canceling &&
            e.item != this.currentEditItem &&
            e.item != this.currentAddItem) {
            this._trackItemChanged(e.item);
        }
        this.collectionChanged.raise(this, e);
    };
    CollectionView.prototype._raiseCollectionChanged = function (action, item, index) {
        if (action === void 0) { action = NotifyCollectionChangedAction.Reset; }
        var e = new NotifyCollectionChangedEventArgs(action, item, index);
        this.onCollectionChanged(e);
    };
    CollectionView.prototype._notifyItemChanged = function (item) {
        var e = new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Change, item, this.items.indexOf(item));
        this.onCollectionChanged(e);
    };
    CollectionView.prototype.onSourceCollectionChanging = function (e) {
        this.sourceCollectionChanging.raise(this, e);
        return !e.cancel;
    };
    CollectionView.prototype.onSourceCollectionChanged = function (e) {
        this.sourceCollectionChanged.raise(this, e);
    };
    Object.defineProperty(CollectionView.prototype, "canFilter", {
        get: function () {
            return this._canFilter;
        },
        set: function (value) {
            this._canFilter = asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "canGroup", {
        get: function () {
            return this._canGroup;
        },
        set: function (value) {
            this._canGroup = asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "canSort", {
        get: function () {
            return this._canSort;
        },
        set: function (value) {
            this._canSort = asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "currentItem", {
        get: function () {
            return this._pgView && this._idx > -1 && this._idx < this._pgView.length
                ? this._pgView[this._idx]
                : null;
        },
        set: function (value) {
            this.moveCurrentTo(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "currentPosition", {
        get: function () {
            return this._idx;
        },
        set: function (value) {
            this.moveCurrentToPosition(asNumber(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "filter", {
        get: function () {
            return this._filter;
        },
        set: function (value) {
            if (this._filter != value) {
                this._filter = asFunction(value);
                if (this.canFilter) {
                    this.refresh();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "groupDescriptions", {
        get: function () {
            return this._grpDesc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "groups", {
        get: function () {
            return this._groups;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "isEmpty", {
        get: function () {
            return !this._pgView || !this._pgView.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "sortDescriptions", {
        get: function () {
            return this._srtDsc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "sourceCollection", {
        get: function () {
            return this._src;
        },
        set: function (sourceCollection) {
            if (sourceCollection != this._src) {
                if (!this.onSourceCollectionChanging(new CancelEventArgs())) {
                    return;
                }
                var index = this.currentPosition;
                this.commitEdit();
                this.commitNew();
                if (this._ncc != null) {
                    this._ncc.collectionChanged.removeHandler(this._sourceChanged);
                }
                this._src = asArray(sourceCollection, false);
                this._ncc = tryCast(this._src, 'INotifyCollectionChanged');
                if (this._ncc) {
                    this._ncc.collectionChanged.addHandler(this._sourceChanged, this);
                }
                this.clearChanges();
                this.refresh();
                this.moveCurrentToFirst();
                this.onSourceCollectionChanged();
                if (this.currentPosition < 0 && index > -1) {
                    this.onCurrentChanged();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    CollectionView.prototype._sourceChanged = function (s, e) {
        if (this._updating <= 0) {
            this.refresh();
        }
    };
    CollectionView.prototype.contains = function (item) {
        return this._pgView.indexOf(item) > -1;
    };
    CollectionView.prototype.moveCurrentTo = function (item) {
        return this.moveCurrentToPosition(this._pgView.indexOf(item));
    };
    CollectionView.prototype.moveCurrentToFirst = function () {
        return this.moveCurrentToPosition(0);
    };
    CollectionView.prototype.moveCurrentToLast = function () {
        return this.moveCurrentToPosition(this._pgView.length - 1);
    };
    CollectionView.prototype.moveCurrentToPrevious = function () {
        return this._idx > 0 ? this.moveCurrentToPosition(this._idx - 1) : false;
    };
    CollectionView.prototype.moveCurrentToNext = function () {
        return this.moveCurrentToPosition(this._idx + 1);
    };
    CollectionView.prototype.moveCurrentToPosition = function (index) {
        if (index >= -1 && index < this._pgView.length && index != this._idx) {
            var e = new CancelEventArgs();
            if (this.onCurrentChanging(e)) {
                var item = this._pgView[index];
                if (this._edtItem && item != this._edtItem) {
                    this.commitEdit();
                }
                if (this._newItem && item != this._newItem) {
                    this.commitNew();
                }
                this._idx = index;
                this.onCurrentChanged();
            }
        }
        return this._idx == index;
    };
    CollectionView.prototype.refresh = function () {
        if (this._updating > 0 || this._newItem || this._edtItem) {
            return;
        }
        this._performRefresh();
        this.onCollectionChanged();
    };
    CollectionView.prototype._performRefresh = function () {
        if (this._updating > 0) {
            return;
        }
        var current = this.currentItem;
        this._view = this._src
            ? this._performFilter(this._src)
            : [];
        if (this.canSort && this._srtDsc.length > 0) {
            if (this._view == this._src) {
                this._view = this._src.slice();
            }
            this._performSort(this._view);
        }
        this._groups = this.canGroup ? this._createGroups(this._view) : null;
        this._fullGroups = this._groups;
        if (this._groups) {
            this._view = this._mergeGroupItems(this._groups);
        }
        this._pgIdx = clamp(this._pgIdx, 0, this.pageCount - 1);
        this._pgView = this._getPageView();
        if (this._groups && this.pageCount > 1) {
            this._groups = this._createGroups(this._pgView);
            this._mergeGroupItems(this._groups);
        }
        var index = this._pgView.indexOf(current);
        if (index < 0) {
            index = Math.min(this._idx, this._pgView.length - 1);
        }
        this._idx = index;
        this._digest = this._getGroupsDigest(this.groups);
        if (this.currentItem !== current) {
            this.onCurrentChanged();
        }
    };
    CollectionView.prototype._performSort = function (items) {
        if (this._stableSort) {
            var arrIndexed = items.map(function (item, index) { return { item: item, index: index }; }), compare_1 = this._compareItems();
            arrIndexed.sort(function (a, b) {
                var r = compare_1(a.item, b.item);
                return r == 0 ? a.index - b.index : r;
            });
            for (var i = 0; i < items.length; i++) {
                items[i] = arrIndexed[i].item;
            }
        }
        else {
            items.sort(this._compareItems());
        }
    };
    CollectionView.prototype._compareItems = function () {
        var srtDsc = this._srtDsc, srtCvt = this._srtCvt, srtCmp = this._srtCmp, init = true, cmp = 0;
        return function (a, b) {
            for (var i = 0; i < srtDsc.length; i++) {
                var sd = srtDsc[i], v1 = sd._bnd.getValue(a), v2 = sd._bnd.getValue(b);
                if (srtCvt) {
                    v1 = srtCvt(sd, a, v1, init);
                    v2 = srtCvt(sd, b, v2, false);
                    init = false;
                }
                if (srtCmp) {
                    cmp = srtCmp(v1, v2);
                    if (cmp != null) {
                        return sd.ascending ? +cmp : -cmp;
                    }
                }
                if (v1 !== v1)
                    v1 = null;
                if (v2 !== v2)
                    v2 = null;
                if (typeof (v1) === 'string' && typeof (v2) === 'string') {
                    var lc1 = v1.toLowerCase(), lc2 = v2.toLowerCase();
                    if (lc1 != lc2) {
                        v1 = lc1;
                        v2 = lc2;
                    }
                }
                if (v1 != null && v2 == null)
                    return -1;
                if (v1 == null && v2 != null)
                    return +1;
                cmp = (v1 < v2) ? -1 : (v1 > v2) ? +1 : 0;
                if (cmp != 0) {
                    return sd.ascending ? +cmp : -cmp;
                }
            }
            return 0;
        };
    };
    CollectionView.prototype._performFilter = function (items) {
        return this.canFilter && this._filter
            ? items.filter(this._filter, this)
            : items;
    };
    CollectionView.prototype.onCurrentChanged = function (e) {
        if (e === void 0) { e = EventArgs.empty; }
        this.currentChanged.raise(this, e);
    };
    CollectionView.prototype.onCurrentChanging = function (e) {
        this.currentChanging.raise(this, e);
        return !e.cancel;
    };
    Object.defineProperty(CollectionView.prototype, "items", {
        get: function () {
            return this._pgView;
        },
        enumerable: true,
        configurable: true
    });
    CollectionView.prototype.beginUpdate = function () {
        this._updating++;
    };
    CollectionView.prototype.endUpdate = function () {
        this._updating--;
        if (this._updating <= 0) {
            this.refresh();
        }
    };
    Object.defineProperty(CollectionView.prototype, "isUpdating", {
        get: function () {
            return this._updating > 0;
        },
        enumerable: true,
        configurable: true
    });
    CollectionView.prototype.deferUpdate = function (fn) {
        try {
            this.beginUpdate();
            fn();
        }
        finally {
            this.endUpdate();
        }
    };
    Object.defineProperty(CollectionView.prototype, "canAddNew", {
        get: function () {
            return this._canAddNew;
        },
        set: function (value) {
            this._canAddNew = asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "canCancelEdit", {
        get: function () {
            return this._canCancelEdit;
        },
        set: function (value) {
            this._canCancelEdit = asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "canRemove", {
        get: function () {
            return this._canRemove;
        },
        set: function (value) {
            this._canRemove = asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "currentAddItem", {
        get: function () {
            return this._newItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "currentEditItem", {
        get: function () {
            return this._edtItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "isAddingNew", {
        get: function () {
            return this._newItem != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "isEditingItem", {
        get: function () {
            return this._edtItem != null;
        },
        enumerable: true,
        configurable: true
    });
    CollectionView.prototype.editItem = function (item) {
        if (item != this._edtItem && this.moveCurrentTo(item)) {
            this.commitEdit();
            this._edtItem = item;
            this._edtClone = {};
            this._extend(this._edtClone, this._edtItem);
        }
    };
    CollectionView.prototype.commitEdit = function () {
        var item = this._edtItem;
        if (item != null) {
            this._committing = true;
            var sameContent = this._sameContent(item, this._edtClone);
            this._edtItem = null;
            this._edtClone = null;
            var index = this._pgView.indexOf(item), digest = this._digest;
            this._performRefresh();
            if (!sameContent) {
                this._trackItemChanged(item);
            }
            if (this._pgView.indexOf(item) == index && digest == this._digest) {
                this._raiseCollectionChanged(NotifyCollectionChangedAction.Change, item, index);
            }
            else {
                this._raiseCollectionChanged();
            }
            this._committing = false;
        }
    };
    CollectionView.prototype.cancelEdit = function () {
        var item = this._edtItem;
        if (item != null) {
            this._edtItem = null;
            if (!this.canCancelEdit) {
                assert(false, 'cannot cancel edits (canCancelEdit == false).');
                return;
            }
            var index = this._src.indexOf(item);
            if (index < 0 || !this._edtClone) {
                return;
            }
            this._extend(this._src[index], this._edtClone);
            this._edtClone = null;
            this._canceling = true;
            this._raiseCollectionChanged(NotifyCollectionChangedAction.Change, item, index);
            this._canceling = false;
        }
    };
    CollectionView.prototype.addNew = function () {
        if (arguments.length > 0) {
            assert(false, 'addNew does not take any parameters, it creates the new items.');
        }
        this.commitEdit();
        this.commitNew();
        if (!this.canAddNew) {
            assert(false, 'cannot add items (canAddNew == false).');
            return null;
        }
        var item = null, src = this.sourceCollection;
        if (this.newItemCreator) {
            item = this.newItemCreator();
        }
        else if (src && src.length) {
            item = new src[0].constructor();
        }
        else {
            item = {};
        }
        if (item != null) {
            this._newItem = item;
            this._updating++;
            this._src.push(item);
            this._updating--;
            if (this._pgView != this._src) {
                this._pgView.push(item);
            }
            if (this.groups && this.groups.length) {
                var g = this.groups[this.groups.length - 1];
                g.items.push(item);
                while (g.groups && g.groups.length) {
                    g = g.groups[g.groups.length - 1];
                    g.items.push(item);
                }
            }
            this._raiseCollectionChanged(NotifyCollectionChangedAction.Add, item, this._pgView.length - 1);
            this.moveCurrentTo(item);
        }
        return this._newItem;
    };
    CollectionView.prototype.commitNew = function () {
        var item = this._newItem;
        if (item != null) {
            this._newItem = null;
            var index = this._pgView.indexOf(item), digest = this._digest;
            this._performRefresh();
            if (this._trackChanges) {
                var idx = this._chgEdited.indexOf(item);
                if (idx > -1) {
                    this._chgEdited.removeAt(idx);
                }
                if (this._chgAdded.indexOf(item) < 0) {
                    this._chgAdded.push(item);
                }
            }
            if (this._pgView.indexOf(item) == index && digest == this._digest) {
                this._raiseCollectionChanged(NotifyCollectionChangedAction.Change, item, index);
            }
            else {
                this._raiseCollectionChanged();
            }
        }
    };
    CollectionView.prototype.cancelNew = function () {
        var item = this._newItem;
        if (item != null) {
            this.remove(item);
        }
    };
    CollectionView.prototype.remove = function (item) {
        var pendingNew = (item == this._newItem);
        if (pendingNew) {
            this._newItem = null;
        }
        if (item == this._edtItem) {
            this.cancelEdit();
        }
        if (!this.canRemove) {
            assert(false, 'cannot remove items (canRemove == false).');
            return;
        }
        var index = this._src.indexOf(item);
        if (index > -1) {
            var current = this.currentItem;
            this._updating++;
            this._src.splice(index, 1);
            this._updating--;
            var digest = this._digest;
            this._performRefresh();
            if (this._trackChanges) {
                var idxAdded = this._chgAdded.indexOf(item);
                if (idxAdded > -1) {
                    this._chgAdded.removeAt(idxAdded);
                }
                var idxEdited = this._chgEdited.indexOf(item);
                if (idxEdited > -1) {
                    this._chgEdited.removeAt(idxEdited);
                }
                var idxRemoved = this._chgRemoved.indexOf(item);
                if (idxRemoved < 0 && !pendingNew && idxAdded < 0) {
                    this._chgRemoved.push(item);
                }
            }
            var sorted = this.sortDescriptions.length > 0, paged = this.pageSize > 0 && this._pgIdx > -1;
            if (sorted || paged || digest != this._getGroupsDigest(this.groups)) {
                this._raiseCollectionChanged();
            }
            else {
                this._raiseCollectionChanged(NotifyCollectionChangedAction.Remove, item, index);
            }
            if (this.currentItem !== current) {
                this.onCurrentChanged();
            }
        }
    };
    CollectionView.prototype.removeAt = function (index) {
        index = asInt(index);
        this.remove(this._pgView[index]);
    };
    CollectionView.prototype._trackItemChanged = function (item) {
        if (this._trackChanges) {
            var items = this.sourceCollection;
            if (items && items.indexOf(item) > -1) {
                var idx = this._chgEdited.indexOf(item), chg = NotifyCollectionChangedAction.Change;
                if (idx < 0 && this._chgAdded.indexOf(item) < 0) {
                    this._chgEdited.push(item);
                }
                else if (idx > -1) {
                    var e = new NotifyCollectionChangedEventArgs(chg, item, idx);
                    this._chgEdited.onCollectionChanged(e);
                }
                else {
                    idx = this._chgAdded.indexOf(item);
                    if (idx > -1) {
                        var e = new NotifyCollectionChangedEventArgs(chg, item, idx);
                        this._chgAdded.onCollectionChanged(e);
                    }
                }
            }
        }
    };
    CollectionView.prototype._extend = function (dst, src) {
        for (var key in src) {
            dst[key] = src[key];
        }
    };
    CollectionView.prototype._sameContent = function (dst, src) {
        for (var key in src) {
            if (!this._sameValue(dst[key], src[key])) {
                return false;
            }
        }
        for (var key in dst) {
            if (!this._sameValue(dst[key], src[key])) {
                return false;
            }
        }
        return true;
    };
    CollectionView.prototype._sameValue = function (v1, v2) {
        return v1 === v2 || DateTime.equals(v1, v2);
    };
    Object.defineProperty(CollectionView.prototype, "canChangePage", {
        get: function () {
            return this._canChangePage;
        },
        set: function (value) {
            this._canChangePage = asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "isPageChanging", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "itemCount", {
        get: function () {
            return this._pgView.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "pageIndex", {
        get: function () {
            return this._pgIdx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "pageSize", {
        get: function () {
            return this._pgSz;
        },
        set: function (value) {
            if (value != this._pgSz) {
                this._pgSz = asInt(value);
                this.refresh();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "totalItemCount", {
        get: function () {
            return this._view.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionView.prototype, "pageCount", {
        get: function () {
            return this.pageSize ? Math.ceil(this.totalItemCount / this.pageSize) : 1;
        },
        enumerable: true,
        configurable: true
    });
    CollectionView.prototype.moveToFirstPage = function () {
        return this.moveToPage(0);
    };
    CollectionView.prototype.moveToLastPage = function () {
        return this.moveToPage(this.pageCount - 1);
    };
    CollectionView.prototype.moveToPreviousPage = function () {
        return this.moveToPage(this.pageIndex - 1);
    };
    CollectionView.prototype.moveToNextPage = function () {
        return this.moveToPage(this.pageIndex + 1);
    };
    CollectionView.prototype.moveToPage = function (index) {
        var newIndex = clamp(index, 0, this.pageCount - 1);
        if (newIndex != this._pgIdx) {
            if (!this.canChangePage) {
                assert(false, 'cannot change pages (canChangePage == false).');
            }
            var e = new PageChangingEventArgs(newIndex);
            if (this.onPageChanging(e)) {
                this._pgIdx = newIndex;
                this._pgView = this._getPageView();
                this._idx = 0;
                if (!this.groupDescriptions || this.groupDescriptions.length == 0) {
                    this.onCollectionChanged();
                }
                else {
                    this.refresh();
                }
                this.onPageChanged();
            }
        }
        return this._pgIdx == index;
    };
    CollectionView.prototype.onPageChanged = function (e) {
        if (e === void 0) { e = EventArgs.empty; }
        this.pageChanged.raise(this, e);
    };
    CollectionView.prototype.onPageChanging = function (e) {
        this.pageChanging.raise(this, e);
        return !e.cancel;
    };
    CollectionView.prototype._getFullGroup = function (g) {
        var fg = this._getGroupByPath(this._fullGroups, g.level, g._path);
        if (fg != null) {
            g = fg;
        }
        return g;
    };
    CollectionView.prototype._getGroupByPath = function (groups, level, path) {
        for (var i = 0; i < groups.length; i++) {
            var g = groups[i];
            if (g.level == level && g._path == path) {
                return g;
            }
            if (g.level < level && path.indexOf(g._path) == 0) {
                g = this._getGroupByPath(g.groups, level, path);
                if (g != null) {
                    return g;
                }
            }
        }
        return null;
    };
    CollectionView.prototype._getPageView = function () {
        if (this.pageSize <= 0 || this._pgIdx < 0) {
            return this._view;
        }
        var start = this._pgSz * this._pgIdx, end = Math.min(start + this._pgSz, this._view.length);
        return this._view.slice(start, end);
    };
    CollectionView.prototype._createGroups = function (items) {
        if (!this._grpDesc || !this._grpDesc.length) {
            return null;
        }
        var root = [], maps = {}, map = null;
        for (var i = 0; i < items.length; i++) {
            var item = items[i], groups = root, levels = this._grpDesc.length;
            var path = '';
            for (var level = 0; level < levels; level++) {
                var gd = this._grpDesc[level], name_2 = gd.groupNameFromItem(item, level), last = level == levels - 1;
                map = maps[path];
                if (!map && isPrimitive(name_2)) {
                    map = {};
                    maps[path] = map;
                }
                var group = this._getGroup(gd, groups, map, name_2, level, last);
                path += '/' + name_2;
                group._path = path;
                if (last) {
                    group.items.push(item);
                }
                groups = group.groups;
            }
        }
        return root;
    };
    CollectionView.prototype._getGroupsDigest = function (groups) {
        var digest = '';
        for (var i = 0; groups != null && i < groups.length; i++) {
            var g = groups[i];
            digest += '{' + g.name + ':' + (g.items ? g.items.length : '*');
            if (g.groups.length > 0) {
                digest += ',';
                digest += this._getGroupsDigest(g.groups);
            }
            digest += '}';
        }
        return digest;
    };
    CollectionView.prototype._mergeGroupItems = function (groups) {
        var items = [];
        for (var i = 0; i < groups.length; i++) {
            var g = groups[i];
            if (!g._isBottomLevel) {
                var groupItems = this._mergeGroupItems(g.groups);
                for (var a = 0, len = groupItems.length; a < len; a++) {
                    g._items.push(groupItems[a]);
                }
            }
            for (var a = 0, len = g._items.length; a < len; a++) {
                items.push(g._items[a]);
            }
        }
        return items;
    };
    CollectionView.prototype._getGroup = function (gd, groups, map, name, level, isBottomLevel) {
        var g;
        if (map && isPrimitive(name)) {
            g = map[name];
            if (g) {
                return g;
            }
        }
        else {
            for (var i = 0; i < groups.length; i++) {
                if (gd.namesMatch(groups[i].name, name)) {
                    return groups[i];
                }
            }
        }
        var group = new CollectionViewGroup(gd, name, level, isBottomLevel);
        groups.push(group);
        if (map) {
            map[name] = group;
        }
        return group;
    };
    return CollectionView;
}());
exports.CollectionView = CollectionView;
var CollectionViewGroup = (function () {
    function CollectionViewGroup(groupDescription, name, level, isBottomLevel) {
        this._gd = groupDescription;
        this._name = name;
        this._level = level;
        this._isBottomLevel = isBottomLevel;
        this._groups = [];
        this._items = [];
    }
    Object.defineProperty(CollectionViewGroup.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionViewGroup.prototype, "level", {
        get: function () {
            return this._level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionViewGroup.prototype, "isBottomLevel", {
        get: function () {
            return this._isBottomLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionViewGroup.prototype, "items", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionViewGroup.prototype, "groups", {
        get: function () {
            return this._groups;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionViewGroup.prototype, "groupDescription", {
        get: function () {
            return this._gd;
        },
        enumerable: true,
        configurable: true
    });
    CollectionViewGroup.prototype.getAggregate = function (aggType, binding, view) {
        var cv = tryCast(view, CollectionView), group = cv ? cv._getFullGroup(this) : this;
        return getAggregate(aggType, group.items, binding);
    };
    return CollectionViewGroup;
}());
exports.CollectionViewGroup = CollectionViewGroup;
'use strict';
var Tooltip = (function () {
    function Tooltip(options) {
        this._showAutoTipBnd = this._showAutoTip.bind(this);
        this._hideAutoTipBnd = this._hideAutoTip.bind(this);
        this._html = true;
        this._gap = 6;
        this._showAtMouse = false;
        this._showDelay = 500;
        this._hideDelay = 0;
        this._tips = [];
        this.popup = new Event();
        copy(this, options);
    }
    Tooltip.prototype.setTooltip = function (element, content) {
        element = getElement(element);
        content = this._getContent(content);
        var i = this._indexOf(element);
        if (i > -1) {
            this._detach(element);
            this._tips.splice(i, 1);
        }
        if (content) {
            this._attach(element);
            this._tips.push({ element: element, content: content });
        }
    };
    Tooltip.prototype.getTooltip = function (element) {
        element = getElement(element);
        var tips = this._tips;
        for (var i = 0; i < tips.length; i++) {
            if (tips[i].element == element) {
                return tips[i].content;
            }
        }
        return null;
    };
    Tooltip.prototype.show = function (element, content, bounds) {
        element = getElement(element);
        content = this._getContent(content);
        if (!bounds) {
            bounds = Rect.fromBoundingRect(element.getBoundingClientRect());
        }
        var tip = Tooltip._eTip;
        if (!tip) {
            tip = Tooltip._eTip = document.createElement('div');
            addClass(tip, 'wj-tooltip');
            tip.style.visibility = 'none';
        }
        this._setContent(content);
        var e = new TooltipEventArgs(content);
        this.onPopup(e);
        if (e.content && !e.cancel) {
            document.body.appendChild(tip);
            this._setContent(e.content);
            tip.style.minWidth = '';
            bounds = new Rect(bounds.left - (tip.offsetWidth - bounds.width) / 2, bounds.top - this.gap, tip.offsetWidth, bounds.height + 2 * this.gap);
            showPopup(tip, bounds, true);
            document.addEventListener('mousedown', this._hideAutoTipBnd);
        }
    };
    Tooltip.prototype.hide = function () {
        var tip = Tooltip._eTip;
        if (tip) {
            removeChild(tip);
            tip.innerHTML = '';
        }
        document.removeEventListener('mousedown', this._hideAutoTipBnd);
    };
    Tooltip.prototype.dispose = function () {
        var _this = this;
        this._tips.forEach(function (item) {
            _this._detach(item.element);
        });
        this._tips.splice(0, this._tips.length);
    };
    Object.defineProperty(Tooltip.prototype, "isVisible", {
        get: function () {
            var tip = Tooltip._eTip;
            return tip != null && tip.parentElement != null && tip.offsetWidth > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "isContentHtml", {
        get: function () {
            return this._html;
        },
        set: function (value) {
            this._html = asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "gap", {
        get: function () {
            return this._gap;
        },
        set: function (value) {
            this._gap = asNumber(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "showAtMouse", {
        get: function () {
            return this._showAtMouse;
        },
        set: function (value) {
            this._showAtMouse = asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "showDelay", {
        get: function () {
            return this._showDelay;
        },
        set: function (value) {
            this._showDelay = asInt(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "hideDelay", {
        get: function () {
            return this._hideDelay;
        },
        set: function (value) {
            this._hideDelay = asInt(value);
        },
        enumerable: true,
        configurable: true
    });
    Tooltip.prototype.onPopup = function (e) {
        if (this.popup) {
            this.popup.raise(this, e);
        }
        return !e.cancel;
    };
    Tooltip.prototype._indexOf = function (e) {
        for (var i = 0; i < this._tips.length; i++) {
            if (this._tips[i].element == e) {
                return i;
            }
        }
        return -1;
    };
    Tooltip.prototype._attach = function (e) {
        e.addEventListener('mouseenter', this._showAutoTipBnd);
        e.addEventListener('mouseleave', this._hideAutoTipBnd);
        e.addEventListener('click', this._showAutoTipBnd);
    };
    Tooltip.prototype._detach = function (e) {
        e.removeEventListener('mouseenter', this._showAutoTipBnd);
        e.removeEventListener('mouseleave', this._hideAutoTipBnd);
        e.removeEventListener('click', this._showAutoTipBnd);
    };
    Tooltip.prototype._showAutoTip = function (e) {
        var _this = this;
        if (e.defaultPrevented) {
            return;
        }
        if (e.type == 'click' && !Control._touching) {
            this._hideAutoTip();
            return;
        }
        var showDelay = e.type == 'mouseenter' ? this._showDelay : 0;
        this._clearTimeouts();
        this._toShow = setTimeout(function () {
            var i = _this._indexOf(e.target);
            if (i > -1) {
                var tip = _this._tips[i], bounds = _this._showAtMouse ? new Rect(e.clientX, e.clientY, 0, 0) : null;
                _this.show(tip.element, tip.content, bounds);
                if (_this._hideDelay > 0) {
                    _this._toHide = setTimeout(function () {
                        _this.hide();
                    }, _this._hideDelay);
                }
            }
        }, showDelay);
    };
    Tooltip.prototype._hideAutoTip = function () {
        this._clearTimeouts();
        this.hide();
    };
    Tooltip.prototype._clearTimeouts = function () {
        if (this._toShow) {
            clearTimeout(this._toShow);
            this._toShow = null;
        }
        if (this._toHide) {
            clearTimeout(this._toHide);
            this._toHide = null;
        }
    };
    Tooltip.prototype._getContent = function (content) {
        content = asString(content);
        if (content && content[0] == '#') {
            var e = getElement(content);
            if (e) {
                content = e.innerHTML;
            }
        }
        return content;
    };
    Tooltip.prototype._setContent = function (content) {
        var tip = Tooltip._eTip;
        if (tip) {
            if (this.isContentHtml) {
                tip.innerHTML = content;
            }
            else {
                tip.textContent = content;
            }
        }
    };
    return Tooltip;
}());
exports.Tooltip = Tooltip;
var ElementContent = (function () {
    function ElementContent() {
    }
    return ElementContent;
}());
var TooltipEventArgs = (function (_super) {
    __extends(TooltipEventArgs, _super);
    function TooltipEventArgs(content) {
        var _this = _super.call(this) || this;
        _this._content = asString(content);
        return _this;
    }
    Object.defineProperty(TooltipEventArgs.prototype, "content", {
        get: function () {
            return this._content;
        },
        set: function (value) {
            this._content = asString(value);
        },
        enumerable: true,
        configurable: true
    });
    return TooltipEventArgs;
}(CancelEventArgs));
exports.TooltipEventArgs = TooltipEventArgs;
'use strict';
var Color = (function () {
    function Color(color) {
        this._r = 0;
        this._g = 0;
        this._b = 0;
        this._a = 1;
        if (color) {
            this._parse(color);
        }
    }
    Object.defineProperty(Color.prototype, "r", {
        get: function () {
            return this._r;
        },
        set: function (value) {
            this._r = clamp(asNumber(value), 0, 255);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "g", {
        get: function () {
            return this._g;
        },
        set: function (value) {
            this._g = clamp(asNumber(value), 0, 255);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "b", {
        get: function () {
            return this._b;
        },
        set: function (value) {
            this._b = clamp(asNumber(value), 0, 255);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "a", {
        get: function () {
            return this._a;
        },
        set: function (value) {
            this._a = clamp(asNumber(value), 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Color.prototype.equals = function (clr) {
        return (clr instanceof Color) &&
            this.r == clr.r && this.g == clr.g && this.b == clr.b &&
            this.a == clr.a;
    };
    Color.prototype.toString = function () {
        var a = Math.round(this.a * 100);
        return a > 99
            ? '#' + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1)
            : 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + (a / 100) + ')';
    };
    Color.fromRgba = function (r, g, b, a) {
        if (a === void 0) { a = 1; }
        var c = new Color(null);
        c.r = Math.round(clamp(asNumber(r), 0, 255));
        c.g = Math.round(clamp(asNumber(g), 0, 255));
        c.b = Math.round(clamp(asNumber(b), 0, 255));
        c.a = clamp(asNumber(a), 0, 1);
        return c;
    };
    Color.fromHsb = function (h, s, b, a) {
        if (a === void 0) { a = 1; }
        var rgb = Color._hsbToRgb(clamp(asNumber(h), 0, 1), clamp(asNumber(s), 0, 1), clamp(asNumber(b), 0, 1));
        return Color.fromRgba(rgb[0], rgb[1], rgb[2], a);
    };
    Color.fromHsl = function (h, s, l, a) {
        if (a === void 0) { a = 1; }
        var rgb = Color._hslToRgb(clamp(asNumber(h), 0, 1), clamp(asNumber(s), 0, 1), clamp(asNumber(l), 0, 1));
        return Color.fromRgba(rgb[0], rgb[1], rgb[2], a);
    };
    Color.fromString = function (value) {
        var c = new Color(null);
        return c._parse(asString(value)) ? c : null;
    };
    Color.prototype.getHsb = function () {
        return Color._rgbToHsb(this.r, this.g, this.b);
    };
    Color.prototype.getHsl = function () {
        return Color._rgbToHsl(this.r, this.g, this.b);
    };
    Color.interpolate = function (c1, c2, pct) {
        pct = clamp(asNumber(pct), 0, 1);
        var h1 = Color._rgbToHsl(c1.r, c1.g, c1.b), h2 = Color._rgbToHsl(c2.r, c2.g, c2.b);
        var qct = 1 - pct, alpha = c1.a * qct + c2.a * pct, h3 = [
            h1[0] * qct + h2[0] * pct,
            h1[1] * qct + h2[1] * pct,
            h1[2] * qct + h2[2] * pct
        ];
        var rgb = Color._hslToRgb(h3[0], h3[1], h3[2]);
        return Color.fromRgba(rgb[0], rgb[1], rgb[2], alpha);
    };
    Color.toOpaque = function (c, bkg) {
        c = isString(c) ? Color.fromString(c) : asType(c, Color);
        if (c.a == 1)
            return c;
        bkg = bkg == null ? Color.fromRgba(255, 255, 255, 1) :
            isString(bkg) ? Color.fromString(bkg) :
                asType(bkg, Color);
        var p = c.a, q = 1 - p;
        return Color.fromRgba(c.r * p + bkg.r * q, c.g * p + bkg.g * q, c.b * p + bkg.b * q);
    };
    Color.prototype._parse = function (c) {
        c = c.toLowerCase();
        if (c == 'transparent') {
            this._r = this._g = this._b = this._a = 0;
            return true;
        }
        if (c && c.indexOf('#') != 0 && c.indexOf('rgb') != 0 && c.indexOf('hsl') != 0) {
            var e = document.createElement('div');
            e.style.color = c;
            var cc = e.style.color;
            if (cc == c) {
                cc = window.getComputedStyle(e).color;
                if (!cc) {
                    document.body.appendChild(e);
                    cc = window.getComputedStyle(e).color;
                    removeChild(e);
                }
            }
            c = cc.toLowerCase();
        }
        if (c.indexOf('#') == 0) {
            if (c.length == 4) {
                this.r = parseInt(c[1] + c[1], 16);
                this.g = parseInt(c[2] + c[2], 16);
                this.b = parseInt(c[3] + c[3], 16);
                this.a = 1;
                return true;
            }
            else if (c.length == 7) {
                this.r = parseInt(c.substr(1, 2), 16);
                this.g = parseInt(c.substr(3, 2), 16);
                this.b = parseInt(c.substr(5, 2), 16);
                this.a = 1;
                return true;
            }
            return false;
        }
        if (c.indexOf('rgb') == 0) {
            var op = c.indexOf('('), ep = c.indexOf(')');
            if (op > -1 && ep > -1) {
                var p = c.substr(op + 1, ep - (op + 1)).split(',');
                if (p.length > 2) {
                    this.r = parseInt(p[0]);
                    this.g = parseInt(p[1]);
                    this.b = parseInt(p[2]);
                    this.a = p.length > 3 ? parseFloat(p[3]) : 1;
                    return true;
                }
            }
        }
        if (c.indexOf('hsl') == 0) {
            var op = c.indexOf('('), ep = c.indexOf(')');
            if (op > -1 && ep > -1) {
                var p = c.substr(op + 1, ep - (op + 1)).split(',');
                if (p.length > 2) {
                    var h = parseInt(p[0]) / 360, s = parseInt(p[1]), l = parseInt(p[2]);
                    if (p[1].indexOf('%') > -1)
                        s /= 100;
                    if (p[2].indexOf('%') > -1)
                        l /= 100;
                    var rgb = Color._hslToRgb(h, s, l);
                    this.r = rgb[0];
                    this.g = rgb[1];
                    this.b = rgb[2];
                    this.a = p.length > 3 ? parseFloat(p[3]) : 1;
                    return true;
                }
            }
        }
        return false;
    };
    Color._hslToRgb = function (h, s, l) {
        assert(h >= 0 && h <= 1 && s >= 0 && s <= 1 && l >= 0 && l <= 1, 'bad HSL values');
        var r, g, b;
        if (s == 0) {
            r = g = b = l;
        }
        else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = Color._hue2rgb(p, q, h + 1 / 3);
            g = Color._hue2rgb(p, q, h);
            b = Color._hue2rgb(p, q, h - 1 / 3);
        }
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    };
    Color._hue2rgb = function (p, q, t) {
        if (t < 0)
            t += 1;
        if (t > 1)
            t -= 1;
        if (t < 1 / 6)
            return p + (q - p) * 6 * t;
        if (t < 1 / 2)
            return q;
        if (t < 2 / 3)
            return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };
    Color._rgbToHsl = function (r, g, b) {
        assert(r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255, 'bad RGB values');
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b), h, s, l = (max + min) / 2;
        if (max == min) {
            h = s = 0;
        }
        else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return [h, s, l];
    };
    Color._rgbToHsb = function (r, g, b) {
        assert(r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255, 'bad RGB values');
        var hsl = Color._rgbToHsl(r, g, b);
        return Color._hslToHsb(hsl[0], hsl[1], hsl[2]);
    };
    Color._hsbToRgb = function (h, s, b) {
        var hsl = Color._hsbToHsl(h, s, b);
        return Color._hslToRgb(hsl[0], hsl[1], hsl[2]);
    };
    Color._hsbToHsl = function (h, s, b) {
        assert(h >= 0 && h <= 1 && s >= 0 && s <= 1 && b >= 0 && b <= 1, 'bad HSB values');
        var ll = clamp(b * (2 - s) / 2, 0, 1), div = 1 - Math.abs(2 * ll - 1), ss = clamp(div > 0 ? b * s / div : s, 0, 1);
        assert(!isNaN(ll) && !isNaN(ss), 'bad conversion to HSL');
        return [h, ss, ll];
    };
    Color._hslToHsb = function (h, s, l) {
        assert(h >= 0 && h <= 1 && s >= 0 && s <= 1 && l >= 0 && l <= 1, 'bad HSL values');
        var bb = clamp(l == 1 ? 1 : (2 * l + s * (1 - Math.abs(2 * l - 1))) / 2, 0, 1), ss = clamp(bb > 0 ? 2 * (bb - l) / bb : s, 0, 1);
        assert(!isNaN(bb) && !isNaN(ss), 'bad conversion to HSB');
        return [h, ss, bb];
    };
    return Color;
}());
exports.Color = Color;
'use strict';
var Clipboard = (function () {
    function Clipboard() {
    }
    Clipboard.copy = function (text) {
        Clipboard._copyPaste(asString(text), null);
    };
    Clipboard.paste = function (callback) {
        Clipboard._copyPaste(null, asFunction(callback));
    };
    Clipboard._copyPaste = function (copyText, pasteCallback) {
        var activeElement = getActiveElement();
        var parent = closest(activeElement, '.wj-control');
        while (parent && Control.getControl(parent)) {
            parent = parent.parentElement;
        }
        parent = parent || document.body;
        if (parent) {
            var html = '<textarea class="wj-clipboard" style="position:fixed;opacity:0"/>', el_1 = createElement(html, parent);
            if (isString(copyText)) {
                el_1.value = copyText;
            }
            el_1.select();
            el_1.onkeydown = function (e) {
                e.preventDefault();
            };
            setTimeout(function () {
                activeElement.focus();
                removeChild(el_1);
                if (isFunction(pasteCallback)) {
                    pasteCallback(el_1.value);
                }
            }, Control._CLIPBOARD_DELAY);
        }
    };
    return Clipboard;
}());
exports.Clipboard = Clipboard;
'use strict';
function showPopup(popup, ref, above, fadeIn, copyStyles) {
    if (ref === void 0) { ref = null; }
    if (above === void 0) { above = false; }
    if (fadeIn === void 0) { fadeIn = false; }
    if (copyStyles === void 0) { copyStyles = true; }
    var parent = document.body;
    if (ref instanceof HTMLElement) {
        if (!contains(document.body, ref)) {
            return;
        }
        for (var e = ref; e; e = e.parentElement) {
            if (e.getAttribute('role') == 'dialog' ||
                getComputedStyle(e).position == 'fixed') {
                parent = e;
                break;
            }
        }
    }
    if (popup.offsetHeight && popup.offsetWidth && contains(parent, popup)) {
    }
    else if (parent.lastChild != popup) {
        parent.appendChild(popup);
    }
    var ptOffset = new Point(pageXOffset, pageYOffset), doc = document.documentElement, pinchZoom = doc.clientWidth / window.innerWidth;
    if (parent != document.body || pinchZoom > 1.005) {
        var elParent = parent == document.body ? document.documentElement : popup.offsetParent, rcParent = elParent.getBoundingClientRect();
        ptOffset = new Point(elParent.scrollLeft - rcParent.left, elParent.scrollTop - rcParent.top);
    }
    if (ref instanceof HTMLElement && copyStyles) {
        var sref = getComputedStyle(ref), bkg = new Color(sref.backgroundColor);
        if (bkg.a) {
            setCss(popup, {
                color: sref.color,
                backgroundColor: sref.backgroundColor,
                fontFamily: sref.fontFamily,
                fontSize: sref.fontSize,
                fontWeight: sref.fontWeight,
                fontStyle: sref.fontStyle
            });
        }
    }
    setCss(popup, {
        position: 'absolute',
        display: ''
    });
    Control.refreshAll(popup);
    var sp = getComputedStyle(popup), my = parseFloat(sp.marginTop) + parseFloat(sp.marginBottom), mx = parseFloat(sp.marginLeft) + parseFloat(sp.marginRight), sz = new Size(popup.offsetWidth + mx, popup.offsetHeight + my);
    var pos = new Point(), rc = null, scrWid = doc.clientWidth, scrHei = doc.clientHeight;
    if (ref && ref.clientX != null && ref.clientY != null && ref.pageX != null && ref.pageY != null) {
        if (ref.clientX <= 0 && ref.clientY <= 0 && ref.target) {
            rc = ref.target.getBoundingClientRect();
        }
        else {
            pos.x = Math.max(0, ref.pageX - pageXOffset);
            pos.y = Math.max(0, ref.pageY - pageYOffset);
        }
    }
    else if (ref instanceof Point) {
        pos = ref;
    }
    else if (ref instanceof HTMLElement) {
        rc = ref.getBoundingClientRect();
    }
    else if (ref && ref.top != null && ref.left != null) {
        rc = ref;
    }
    else if (ref == null) {
        pos.x = Math.max(0, (scrWid - sz.width) / 2);
        pos.y = Math.max(0, Math.round((scrHei - sz.height) / 2 * .7));
    }
    else {
        throw 'Invalid ref parameter.';
    }
    var minWidth = parseFloat(sp.minWidth);
    if (rc) {
        var spcAbove = rc.top, spcBelow = scrHei - rc.bottom, rtl = getComputedStyle(popup).direction == 'rtl';
        if (rtl) {
            pos.x = Math.max(0, rc.right - sz.width);
        }
        else {
            pos.x = Math.max(0, Math.min(rc.left, scrWid - sz.width));
        }
        if (above) {
            pos.y = spcAbove > sz.height || spcAbove > spcBelow
                ? Math.max(0, rc.top - sz.height)
                : rc.bottom;
        }
        else {
            pos.y = spcBelow > sz.height || spcBelow > spcAbove
                ? rc.bottom
                : Math.max(0, rc.top - sz.height);
        }
        minWidth = Math.max(minWidth, rc.width);
        if (isIE()) {
            var sbWidth = popup.offsetWidth - (popup.clientWidth + parseInt(sp.borderLeftWidth) + parseInt(sp.borderRightWidth));
            minWidth -= sbWidth;
        }
    }
    else {
        var extra = 20;
        if (pos.y + sz.height > scrHei - extra) {
            pos.y = Math.max(0, scrHei - extra - sz.height);
        }
        if (pos.x + sz.width > scrWid - extra) {
            pos.x = Math.max(0, scrWid - extra - sz.width);
        }
    }
    var css = {
        left: pos.x + ptOffset.x,
        top: pos.y + ptOffset.y,
        minWidth: minWidth,
        zIndex: 1500
    };
    var anim = null;
    if (fadeIn) {
        popup.style.opacity = '0';
        anim = animate(function (pct) {
            popup.style.opacity = (pct == 1) ? '' : pct.toString();
        });
    }
    if (ref instanceof HTMLElement) {
        popup[Control._OWNR_KEY] = ref;
    }
    setCss(popup, css);
    var anchor = ref instanceof MouseEvent ? ref.target : ref;
    if (anchor instanceof HTMLElement && anchor.parentElement != document.body) {
        var start_1 = Date.now(), bounds_1 = anchor.getBoundingClientRect(), scrlHandler = new Control(document.createElement('div'));
        popup[Control._SCRL_KEY] = scrlHandler;
        scrlHandler.addEventListener(document, 'scroll', function (e) {
            if (Date.now() - start_1 > 100) {
                if (contains(document, anchor) && !contains(popup, e.target)) {
                    if (e.target != document || (ref != null && popup.style.position == 'fixed')) {
                        var newBounds = anchor.getBoundingClientRect(), dx = Math.abs(newBounds.left - bounds_1.left), dy = Math.abs(newBounds.top - bounds_1.top);
                        if (dx > 1 || dy > 1) {
                            _hidePopup(popup, true);
                        }
                    }
                }
            }
        }, true);
    }
    return anim;
}
exports.showPopup = showPopup;
function hidePopup(popup, remove, fadeOut) {
    if (remove === void 0) { remove = true; }
    if (fadeOut === void 0) { fadeOut = false; }
    var anim = null;
    if (fadeOut) {
        anim = animate(function (pct) {
            popup.style.opacity = (1 - pct).toString();
            if (pct == 1) {
                _hidePopup(popup, remove);
                popup.style.opacity = '';
            }
        });
    }
    else {
        _hidePopup(popup, remove);
    }
    return anim;
}
exports.hidePopup = hidePopup;
function _hidePopup(popup, remove) {
    popup.style.display = 'none';
    if (remove && popup.parentElement) {
        setTimeout(function () {
            if (popup.style.display == 'none') {
                removeChild(popup);
                if (isFunction(remove)) {
                    remove();
                }
            }
        }, Control._FOCUS_INTERVAL * 2);
    }
    var scrlHandler = popup[Control._SCRL_KEY];
    if (scrlHandler instanceof Control) {
        scrlHandler.dispose();
    }
    delete popup[Control._SCRL_KEY];
    delete popup[Control._OWNR_KEY];
}
'use strict';
var PrintDocument = (function () {
    function PrintDocument(options) {
        this._copyCss = true;
        if (options != null) {
            copy(this, options);
        }
    }
    Object.defineProperty(PrintDocument.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = asString(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintDocument.prototype, "copyCss", {
        get: function () {
            return this._copyCss;
        },
        set: function (value) {
            this._copyCss = asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    PrintDocument.prototype.addCSS = function (href) {
        if (!this._css) {
            this._css = [];
        }
        this._css.push(href);
    };
    PrintDocument.prototype.append = function (child) {
        var doc = this._getDocument(), body = doc.body, err = false;
        if (body) {
            if (isString(child)) {
                body.appendChild(createElement(child));
            }
            else if (child instanceof Node) {
                var clone = this._cloneNode(child);
                body.appendChild(clone);
            }
            else {
                err = true;
            }
        }
        else {
            if (isString(child)) {
                doc.write(child);
            }
            else if (child instanceof HTMLElement) {
                var clone = this._cloneNode(child);
                doc.write(clone.outerHTML);
            }
            else {
                err = true;
            }
        }
        if (err) {
            assert(false, 'child parameter should be an HTML node or an HTML string.');
        }
    };
    PrintDocument.prototype.print = function () {
        var _this = this;
        if (this._iframe) {
            this._close();
            setTimeout(function () {
                var wnd = _this._iframe.contentWindow, afterprint = 'onafterprint' in wnd && !isFirefox();
                if (afterprint) {
                    wnd.onafterprint = function () {
                        removeChild(_this._iframe);
                        _this._iframe = null;
                    };
                }
                if (document.queryCommandSupported('print')) {
                    wnd.document.execCommand('print', false, null);
                }
                else {
                    wnd.focus();
                    wnd.print();
                }
                if (!afterprint) {
                    removeChild(_this._iframe);
                    _this._iframe = null;
                }
            }, 100);
        }
    };
    PrintDocument.prototype._cloneNode = function (child) {
        var clone = child.cloneNode(true);
        if (child instanceof HTMLElement && clone instanceof HTMLElement) {
            var tags = ['select', 'textarea'];
            tags.forEach(function (tag) {
                var childEl = child.querySelectorAll(tag), cloneEl = clone.querySelectorAll(tag);
                for (var i = 0; i < childEl.length; i++) {
                    cloneEl[i]['value'] = childEl[i]['value'];
                }
            });
        }
        return clone;
    };
    PrintDocument.prototype._getDocument = function () {
        if (!this._iframe) {
            this._iframe = document.createElement('iframe');
            addClass(this._iframe, 'wj-printdocument');
            setCss(this._iframe, {
                position: 'fixed',
                left: 10000,
                top: 10000
            });
            document.body.appendChild(this._iframe);
            var doc = this._iframe.contentDocument;
            doc.write('<body style="position:static"/>');
        }
        return this._iframe.contentDocument;
    };
    PrintDocument.prototype._close = function () {
        var doc = this._getDocument();
        doc.close();
        doc.title = this.title != null
            ? this.title
            : document.title;
        if (!doc.title || !doc.title.trim()) {
            doc.title = '\u00A0';
        }
        if (this._copyCss) {
            var links = document.head.querySelectorAll('link');
            for (var i = 0; i < links.length; i++) {
                var link = links[i];
                if (link.href.match(/\.css$/i) && link.rel.match(/stylesheet/i)) {
                    var xhr = httpRequest(link.href, { async: false });
                    this._addStyle(xhr.responseText);
                }
            }
            var styles = document.head.querySelectorAll('STYLE');
            for (var i = 0; i < styles.length; i++) {
                this._addStyle(styles[i].textContent);
            }
        }
        if (this._css) {
            for (var i = 0; i < this._css.length; i++) {
                var es = doc.createElement('style'), xhr = httpRequest(this._css[i], { async: false });
                es.textContent = xhr.responseText;
                doc.head.appendChild(es);
            }
        }
    };
    PrintDocument.prototype._addStyle = function (style) {
        var doc = this._getDocument(), es = doc.createElement('style');
        es.textContent = style;
        doc.head.appendChild(es);
    };
    return PrintDocument;
}());
exports.PrintDocument = PrintDocument;
'use strict';
var _MaskProvider = (function () {
    function _MaskProvider(input, mask, promptChar) {
        if (mask === void 0) { mask = null; }
        if (promptChar === void 0) { promptChar = '_'; }
        this._promptChar = '_';
        this._mskArr = [];
        this._full = true;
        this._hbInput = this._input.bind(this);
        this._hbKeyDown = this._keydown.bind(this);
        this._hbKeyPress = this._keypress.bind(this);
        this._hbCompositionStart = this._compositionstart.bind(this);
        this._hbCompositionEnd = this._compositionend.bind(this);
        this.mask = mask;
        this.input = input;
        this.promptChar = promptChar;
        this._connect(true);
        this._evtInput = document.createEvent('HTMLEvents');
        this._evtInput.initEvent('input', true, false);
    }
    Object.defineProperty(_MaskProvider.prototype, "input", {
        get: function () {
            return this._tbx;
        },
        set: function (value) {
            this._connect(false);
            this._tbx = value;
            this._connect(true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_MaskProvider.prototype, "mask", {
        get: function () {
            return this._msk;
        },
        set: function (value) {
            if (value != this._msk) {
                this._msk = asString(value, true);
                this._parseMask();
                this._valueChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_MaskProvider.prototype, "promptChar", {
        get: function () {
            return this._promptChar;
        },
        set: function (value) {
            if (value != this._promptChar) {
                this._promptChar = asString(value, false);
                assert(this._promptChar.length == 1, 'promptChar must be a string with length 1.');
                this._valueChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_MaskProvider.prototype, "maskFull", {
        get: function () {
            return this._full;
        },
        enumerable: true,
        configurable: true
    });
    _MaskProvider.prototype.getMaskRange = function () {
        return this._mskArr.length ? [this._firstPos, this._lastPos] : [0, this._tbx.value.length - 1];
    };
    _MaskProvider.prototype.getRawValue = function () {
        var text = this._tbx.value, ret = '';
        if (!this.mask) {
            return text;
        }
        for (var i = 0; i < this._mskArr.length && i < text.length; i++) {
            if (!this._mskArr[i].literal && text[i] != this._promptChar) {
                ret += text[i];
            }
        }
        return ret;
    };
    _MaskProvider.prototype.refresh = function () {
        this._parseMask();
        this._valueChanged();
    };
    _MaskProvider.prototype._input = function (e) {
        var _this = this;
        if (this._composing) {
            e.stopImmediatePropagation();
        }
        else {
            setTimeout(function () {
                _this._valueChanged();
            });
        }
    };
    _MaskProvider.prototype._keydown = function (e) {
        if (e.keyCode == Key.Back) {
            var start = this._tbx.selectionStart, end = this._tbx.selectionEnd;
            if (start <= this._firstPos && end == start) {
                e.preventDefault();
                this._backSpace = false;
                return;
            }
        }
        this._backSpace = (e.keyCode == Key.Back);
    };
    _MaskProvider.prototype._keypress = function (e) {
        if (!e.ctrlKey && !e.metaKey && !e.altKey && !this._composing && this._preventKey(e.charCode)) {
            e.preventDefault();
        }
    };
    _MaskProvider.prototype._compositionstart = function (e) {
        this._composing = true;
    };
    _MaskProvider.prototype._compositionend = function (e) {
        var _this = this;
        if (this._composing) {
            this._composing = false;
            setTimeout(function () {
                if (_this._valueChanged()) {
                    _this._tbx.dispatchEvent(_this._evtInput);
                }
            });
        }
    };
    _MaskProvider.prototype._preventKey = function (charCode) {
        if (charCode && this._mskArr.length) {
            var tbx = this._tbx, start = tbx.selectionStart, key = String.fromCharCode(charCode);
            if (start < this._firstPos) {
                start = this._firstPos;
                setSelectionRange(tbx, start);
            }
            if (start >= this._mskArr.length) {
                return true;
            }
            var m = this._mskArr[start];
            if (m.literal) {
                this._validatePosition(start);
            }
            else if (m.wildCard != key && !this._isCharValid(m.wildCard, key)) {
                return true;
            }
        }
        return false;
    };
    _MaskProvider.prototype._connect = function (connect) {
        var tbx = this._tbx;
        if (tbx) {
            if (connect) {
                this._autoComplete = tbx.autocomplete;
                this._spellCheck = tbx.spellcheck;
                tbx.autocomplete = 'off';
                tbx.spellcheck = false;
                tbx.addEventListener('input', this._hbInput);
                tbx.addEventListener('keydown', this._hbKeyDown, true);
                tbx.addEventListener('keypress', this._hbKeyPress, true);
                tbx.addEventListener('compositionstart', this._hbCompositionStart, true);
                tbx.addEventListener('compositionend', this._hbCompositionEnd, true);
                tbx.addEventListener('blur', this._hbCompositionEnd, true);
                this._valueChanged();
            }
            else {
                tbx.autocomplete = this._autoComplete;
                tbx.spellcheck = this._spellCheck;
                tbx.removeEventListener('input', this._hbInput);
                tbx.removeEventListener('keydown', this._hbKeyDown, true);
                tbx.removeEventListener('keypress', this._hbKeyPress, true);
                tbx.removeEventListener('compositionstart', this._hbCompositionStart, true);
                tbx.removeEventListener('compositionend', this._hbCompositionEnd, true);
                tbx.removeEventListener('blur', this._hbCompositionEnd, true);
            }
        }
    };
    _MaskProvider.prototype._valueChanged = function () {
        if (!this._tbx || !this._msk) {
            return false;
        }
        var tbx = this._tbx, wasEmpty = tbx.value.length < 2, start = tbx.selectionStart, oldChar = (start > 0) ? tbx.value[start - 1] : '', oldValue = tbx.value;
        tbx.value = this._applyMask();
        if (wasEmpty) {
            start = this._firstPos + 1;
        }
        var newChar = (start > 0) ? tbx.value[start - 1] : '';
        if (start > 0 && newChar == this._promptChar && oldChar != this.promptChar) {
            start--;
        }
        if (start == oldValue.length) {
            start = this._matchEnd;
        }
        this._validatePosition(start);
        return oldValue != tbx.value;
    };
    _MaskProvider.prototype._applyMask = function () {
        this._full = true;
        this._matchEnd = 0;
        var text = this._tbx.value;
        if (!this._msk) {
            return text;
        }
        if (!text && !this._tbx.required) {
            return text;
        }
        var ret = '', pos = 0, promptChar = this._promptChar;
        text = this._handleVagueLiterals(text);
        for (var i = 0; i < this._mskArr.length; i++) {
            var m = this._mskArr[i], c = m.literal;
            if (c && c == text[pos]) {
                pos++;
            }
            if (m.wildCard) {
                c = promptChar;
                if (text) {
                    var j = pos;
                    for (; j < text.length; j++) {
                        if (this._isCharValid(m.wildCard, text[j])) {
                            c = text[j];
                            switch (m.charCase) {
                                case '>':
                                    c = c.toUpperCase();
                                    break;
                                case '<':
                                    c = c.toLowerCase();
                                    break;
                            }
                            if (c != promptChar) {
                                this._matchEnd = ret.length + 1;
                            }
                            break;
                        }
                    }
                    pos = j + 1;
                }
                if (c == promptChar) {
                    this._full = false;
                }
            }
            ret += c;
        }
        return ret;
    };
    _MaskProvider.prototype._handleVagueLiterals = function (text) {
        if (text.length > this._mskArr.length + 1) {
            return text;
        }
        var delta = text.length - this._mskArr.length;
        if (delta != 0 && text.length > 1) {
            var badIndex = -1, start = Math.max(0, this._tbx.selectionStart - delta);
            for (var i = start; i < this._mskArr.length; i++) {
                if (this._mskArr[i].vague) {
                    badIndex = i;
                    break;
                }
            }
            if (badIndex > -1) {
                if (delta < 0) {
                    var pad = Array(1 - delta).join(this._promptChar), index = badIndex + delta;
                    if (index > -1) {
                        text = text.substr(0, index) + pad + text.substr(index);
                    }
                }
                else {
                    while (badIndex > 0 && this._mskArr[badIndex - 1].literal) {
                        badIndex--;
                    }
                    text = text.substr(0, badIndex) + text.substr(badIndex + delta);
                }
            }
        }
        return text;
    };
    _MaskProvider.prototype._isCharValid = function (mask, c) {
        var ph = this._promptChar;
        switch (mask) {
            case '0':
                return (c >= '0' && c <= '9') || c == ph;
            case '9':
                return (c >= '0' && c <= '9') || c == ' ' || c == ph;
            case '#':
                return (c >= '0' && c <= '9') || c == ' ' || c == '+' || c == '-' || c == ph;
            case 'L':
                return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c == ph;
            case 'l':
                return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c == ' ' || c == ph;
            case 'A':
                return (c >= '0' && c <= '9') || (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c == ph;
            case 'a':
                return (c >= '0' && c <= '9') || (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c == ' ' || c == ph;
            case '\uff19':
                return (c >= '\uFF10' && c <= '\uff19') || c == ph;
            case '\uff2a':
            case '\uff27':
                if (mask == '\uff27' && _MaskProvider._X_DBCS_BIG_HIRA.indexOf(c) > -1)
                    return false;
                return (c >= '\u3041' && c <= '\u3096') || c == ph;
            case '\uff2b':
            case '\uff2e':
                if (mask == '\uff2e' && _MaskProvider._X_DBCS_BIG_KATA.indexOf(c) > -1)
                    return false;
                return (c >= '\u30a1' && c <= '\u30fa') || c == ph;
            case '\uff3a':
                return (c <= '\u0021' || c >= '\u00ff') || c == ph;
            case 'H':
                return (c >= '\u0021' && c <= '\u00ff') || c == ph;
            case 'K':
            case 'N':
                if (mask == 'N' && _MaskProvider._X_SBCS_BIG_KATA.indexOf(c) > -1)
                    return false;
                return (c >= '\uff66' && c <= '\uff9f') || c == ph;
        }
        return false;
    };
    _MaskProvider.prototype._validatePosition = function (start) {
        var msk = this._mskArr;
        if (this._backSpace) {
            while (start > 0 && start < msk.length && msk[start - 1].literal) {
                start--;
            }
        }
        if (start == 0 || !this._backSpace) {
            while (start < msk.length && msk[start].literal) {
                start++;
            }
        }
        if (getActiveElement() == this._tbx) {
            setSelectionRange(this._tbx, start);
        }
        this._backSpace = false;
    };
    _MaskProvider.prototype._parseMask = function () {
        this._mskArr = [];
        this._firstPos = -1;
        this._lastPos = -1;
        var msk = this._msk, currCase = '|', c;
        for (var i = 0; msk && i < msk.length; i++) {
            switch (msk[i]) {
                case '0':
                case '9':
                case '#':
                case 'A':
                case 'a':
                case 'L':
                case 'l':
                case '\uff19':
                case '\uff2a':
                case '\uff27':
                case '\uff2b':
                case '\uff2e':
                case '\uff3a':
                case 'K':
                case 'N':
                case 'H':
                    if (this._firstPos < 0) {
                        this._firstPos = this._mskArr.length;
                    }
                    this._lastPos = this._mskArr.length;
                    this._mskArr.push(new _MaskElement(msk[i], currCase));
                    break;
                case '.':
                case ',':
                case ':':
                case '/':
                case '$':
                    switch (msk[i]) {
                        case '.':
                        case ',':
                            c = exports.culture.Globalize.numberFormat[msk[i]];
                            break;
                        case ':':
                        case '/':
                            c = exports.culture.Globalize.calendar[msk[i]];
                            break;
                        case '$':
                            c = exports.culture.Globalize.numberFormat.currency.symbol;
                            break;
                    }
                    for (var j = 0; j < c.length; j++) {
                        this._mskArr.push(new _MaskElement(c[j]));
                    }
                    break;
                case '<':
                case '>':
                case '|':
                    currCase = msk[i];
                    break;
                case '\\':
                    if (i < msk.length - 1)
                        i++;
                    this._mskArr.push(new _MaskElement(msk[i]));
                    break;
                default:
                    this._mskArr.push(new _MaskElement(msk[i]));
                    break;
            }
        }
        for (var i = 0; i < this._mskArr.length; i++) {
            var elem = this._mskArr[i];
            if (elem.literal) {
                for (var j = 0; j < i; j++) {
                    var m = this._mskArr[j];
                    if (m.wildCard && this._isCharValid(m.wildCard, elem.literal)) {
                        elem.vague = true;
                        break;
                    }
                }
            }
        }
    };
    _MaskProvider._X_DBCS_BIG_HIRA = '\u3041\u3043\u3045\u3047\u3049\u3063\u3083\u3085\u3087\u308e\u3095\u3096';
    _MaskProvider._X_DBCS_BIG_KATA = '\u30a1\u30a3\u30a5\u30a7\u30a9\u30c3\u30e3\u30e5\u30e7\u30ee\u30f5\u30f6';
    _MaskProvider._X_SBCS_BIG_KATA = '\uff67\uff68\uff69\uff6a\uff6b\uff6c\uff6d\uff6e\uff6f';
    return _MaskProvider;
}());
exports._MaskProvider = _MaskProvider;
var _MaskElement = (function () {
    function _MaskElement(wildcardOrLiteral, charCase) {
        if (charCase) {
            this.wildCard = wildcardOrLiteral;
            this.charCase = charCase;
        }
        else {
            this.literal = wildcardOrLiteral;
        }
    }
    return _MaskElement;
}());
exports._MaskElement = _MaskElement;
'use strict';
var _ClickRepeater = (function () {
    function _ClickRepeater(element) {
        this._isDown = false;
        this._mousedownBnd = this._mousedown.bind(this);
        this._mouseupBnd = this._mouseup.bind(this);
        this._onClickBnd = this._onClick.bind(this);
        this.element = element;
        this._connect(true);
    }
    Object.defineProperty(_ClickRepeater.prototype, "element", {
        get: function () {
            return this._e;
        },
        set: function (value) {
            this._connect(false);
            this._e = asType(value, HTMLElement, true);
            this._connect(true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_ClickRepeater.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    _ClickRepeater.prototype._connect = function (connect) {
        if (this._e) {
            var mousedown = 'mousedown';
            if (connect) {
                this._e.addEventListener(mousedown, this._mousedownBnd);
            }
            else {
                this._e.removeEventListener(mousedown, this._mousedownBnd);
            }
        }
    };
    _ClickRepeater.prototype._clearTimeouts = function () {
        if (this._toRepeat) {
            clearInterval(this._toRepeat);
            this._toRepeat = null;
        }
        if (this._toDelay) {
            clearInterval(this._toDelay);
            this._toDelay = null;
        }
    };
    _ClickRepeater.prototype._mousedown = function (e) {
        var _this = this;
        if (this._isDown) {
            this._mouseup(null);
        }
        if (!this._disabled) {
            this._isDown = true;
            _ClickRepeater._stopEvents.forEach(function (evt) {
                document.addEventListener(evt, _this._mouseupBnd);
            });
            this._clearTimeouts();
            this._toDelay = setTimeout(function () {
                if (_this._isDown) {
                    _this._onClick();
                    _this._toRepeat = setTimeout(_this._onClickBnd, Control._CLICK_REPEAT);
                }
            }, Control._CLICK_DELAY);
        }
    };
    _ClickRepeater.prototype._mouseup = function (e) {
        var _this = this;
        if (this._isDown && e && e.type == 'mouseup') {
            e.preventDefault();
        }
        _ClickRepeater._stopEvents.forEach(function (evt) {
            document.removeEventListener(evt, _this._mouseupBnd);
        });
        this._clearTimeouts();
        this._isDown = false;
    };
    _ClickRepeater.prototype._onClick = function () {
        this._e.click();
        this._clearTimeouts();
        if (this._isDown) {
            this._toRepeat = setTimeout(this._onClickBnd, Control._CLICK_REPEAT);
        }
    };
    _ClickRepeater._stopEvents = ['mouseup', 'mouseout', 'keydown'];
    return _ClickRepeater;
}());
exports._ClickRepeater = _ClickRepeater;
'use strict';
var _isMobile = navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i) != null;
function isMobile() {
    return _isMobile;
}
exports.isMobile = isMobile;
var _isFF = navigator.userAgent.match(/Firefox\//) != null;
function isFirefox() {
    return _isFF;
}
exports.isFirefox = isFirefox;
var _isSafari = navigator.userAgent.match(/^((?!chrome|android).)*safari/i) != null;
function isSafari() {
    return _isSafari;
}
exports.isSafari = isSafari;
var _isIE = navigator.userAgent.match(/MSIE |Trident\/|Edge\//) != null;
function isIE() {
    return _isIE;
}
exports.isIE = isIE;
var _isIE9 = false;
function isIE9() {
    return _isIE9;
}
exports.isIE9 = isIE9;
var _supportsPassive = false;
document.addEventListener('test', function (_) { }, {
    get passive() {
        _supportsPassive = true;
        return true;
    }
});
function getEventOptions(capture, passive) {
    return _supportsPassive
        ? { capture: capture, passive: passive }
        : capture;
}
exports.getEventOptions = getEventOptions;
function _startDrag(dataTransfer, effectAllowed) {
    dataTransfer.effectAllowed = effectAllowed;
    if (isFirefox()) {
        dataTransfer.setData('text', '');
    }
}
exports._startDrag = _startDrag;
if (document.doctype && navigator.appVersion.indexOf('MSIE 9') > -1) {
    _isIE9 = true;
    document.addEventListener('mousemove', function (e) {
        if (e.which == 1) {
            var ctl = closest(e.target, '.wj-control');
            if (ctl && !ctl.style.cursor) {
                for (var el = e.target; el; el = el.parentNode) {
                    if (el.attributes && el.attributes['draggable']) {
                        el.dragDrop();
                        return false;
                    }
                }
            }
        }
    });
}
var raf = 'requestAnimationFrame', caf = 'cancelAnimationFrame';
if (!window[raf]) {
    var expectedTime_1 = 0;
    window[raf] = function (callback) {
        var currentTime = Date.now(), adjustedDelay = 16 - (currentTime - expectedTime_1), delay = adjustedDelay > 0 ? adjustedDelay : 0;
        expectedTime_1 = currentTime + delay;
        return setTimeout(function () {
            callback(expectedTime_1);
        }, delay);
    };
    window[caf] = clearTimeout;
}
//# sourceMappingURL=wijmo.js.map