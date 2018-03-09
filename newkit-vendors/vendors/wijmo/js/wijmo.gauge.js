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
var wjcSelf = require("wijmo/wijmo.gauge");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['gauge'] = wjcSelf;
'use strict';
var ShowText;
(function (ShowText) {
    ShowText[ShowText["None"] = 0] = "None";
    ShowText[ShowText["Value"] = 1] = "Value";
    ShowText[ShowText["MinMax"] = 2] = "MinMax";
    ShowText[ShowText["All"] = 3] = "All";
})(ShowText = exports.ShowText || (exports.ShowText = {}));
var Gauge = (function (_super) {
    __extends(Gauge, _super);
    function Gauge(element, options) {
        var _this = _super.call(this, element, null, true) || this;
        _this._ranges = new wjcCore.ObservableArray();
        _this._rngElements = [];
        _this._format = 'n0';
        _this._showRanges = true;
        _this._shadow = true;
        _this._animated = true;
        _this._readOnly = true;
        _this._step = 1;
        _this._showText = ShowText.None;
        _this._showTicks = false;
        _this._thickness = 0.8;
        _this._initialized = false;
        _this.valueChanged = new wjcCore.Event();
        _this._getPercent = function (value) {
            var pct = (this.max > this.min) ? (value - this.min) / (this.max - this.min) : 0;
            return Math.max(0, Math.min(1, pct));
        };
        Gauge._ctr++;
        var host = _this.hostElement;
        wjcCore.setAttribute(host, 'role', 'slider', true);
        var tpl = _this.getTemplate();
        _this.applyTemplate('wj-control wj-gauge', tpl, {
            _dSvg: 'dsvg',
            _svg: 'svg',
            _filter: 'filter',
            _gFace: 'gface',
            _gRanges: 'granges',
            _gPointer: 'gpointer',
            _gCover: 'gcover',
            _pFace: 'pface',
            _pPointer: 'ppointer',
            _cValue: 'cvalue',
            _tValue: 'value',
            _tMin: 'min',
            _tMax: 'max',
            _pTicks: 'pticks'
        });
        _this._filterID = 'wj-gauge-filter-' + Gauge._ctr.toString(36);
        _this._filter.setAttribute('id', _this._filterID);
        _this.face = new Range();
        _this.pointer = new Range();
        _this._ranges.collectionChanged.addHandler(function () {
            var arr = _this._ranges;
            for (var i = 0; i < arr.length; i++) {
                var rng = wjcCore.tryCast(arr[i], Range);
                if (!rng) {
                    throw 'ranges array must contain Range objects.';
                }
            }
            _this._rangesDirty = true;
            _this.invalidate();
        });
        _this.addEventListener(host, 'keydown', _this._keydown.bind(_this));
        _this.addEventListener(host, 'click', function (e) {
            if (e.button == 0) {
                _this.focus();
                _this._applyMouseValue(e);
            }
        });
        _this.addEventListener(host, 'mousedown', function (e) {
            if (e.button == 0) {
                _this.focus();
                _this._dragging = true;
                _this._applyMouseValue(e);
            }
        });
        _this.addEventListener(host, 'mousemove', function (e) {
            if (_this._dragging && _this.containsFocus()) {
                _this._applyMouseValue(e, true);
            }
        });
        _this.addEventListener(host, 'mouseup', function (e) {
            _this._dragging = false;
        });
        _this.addEventListener(host, 'mouseleave', function (e) {
            if (e.target == host) {
                _this._dragging = false;
            }
        });
        if ('ontouchstart' in window) {
            _this.addEventListener(host, 'touchstart', function (e) {
                _this.focus();
                if (!e.defaultPrevented && _this._applyMouseValue(e, true)) {
                    e.preventDefault();
                }
            });
            _this.addEventListener(host, 'touchmove', function (e) {
                if (!e.defaultPrevented && _this._applyMouseValue(e, true)) {
                    e.preventDefault();
                }
            });
        }
        _this.addEventListener(host, 'wheel', function (e) {
            if (!e.defaultPrevented && !_this.isReadOnly && _this.containsFocus() && _this.value != null && _this.hitTest(e)) {
                var step = wjcCore.clamp(-e.deltaY, -1, +1);
                _this.value = wjcCore.clamp(_this.value + (_this.step || 1) * step, _this.min, _this.max);
                e.preventDefault();
            }
        });
        _this.initialize(options);
        _this.invalidate();
        return _this;
    }
    Object.defineProperty(Gauge.prototype, "value", {
        get: function () {
            return this._pointer.max;
        },
        set: function (value) {
            if (value != this.value) {
                this._pointer.max = wjcCore.asNumber(value, true);
                this._updateAria();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gauge.prototype, "min", {
        get: function () {
            return this._face.min;
        },
        set: function (value) {
            if (value != this.min) {
                this._face.min = wjcCore.asNumber(value);
                this._updateAria();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gauge.prototype, "max", {
        get: function () {
            return this._face.max;
        },
        set: function (value) {
            if (value != this.max) {
                this._face.max = wjcCore.asNumber(value);
                this._updateAria();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gauge.prototype, "origin", {
        get: function () {
            return this._origin;
        },
        set: function (value) {
            if (value != this._origin) {
                this._origin = wjcCore.asNumber(value, true);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gauge.prototype, "isReadOnly", {
        get: function () {
            return this._readOnly;
        },
        set: function (value) {
            this._readOnly = wjcCore.asBoolean(value);
            this._setAttribute(this._svg, 'cursor', this._readOnly ? null : 'pointer');
            wjcCore.toggleClass(this.hostElement, 'wj-state-readonly', this.isReadOnly);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gauge.prototype, "step", {
        get: function () {
            return this._step;
        },
        set: function (value) {
            if (value != this._step) {
                this._step = wjcCore.asNumber(value, true);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gauge.prototype, "format", {
        get: function () {
            return this._format;
        },
        set: function (value) {
            if (value != this._format) {
                this._format = wjcCore.asString(value);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gauge.prototype, "getText", {
        get: function () {
            return this._getText;
        },
        set: function (value) {
            if (value != this._getText) {
                this._getText = wjcCore.asFunction(value);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gauge.prototype, "thickness", {
        get: function () {
            return this._thickness;
        },
        set: function (value) {
            if (value != this._thickness) {
                this._thickness = wjcCore.clamp(wjcCore.asNumber(value, false), 0, 1);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gauge.prototype, "face", {
        get: function () {
            return this._face;
        },
        set: function (value) {
            if (value != this._face) {
                if (this._face) {
                    this._face.propertyChanged.removeHandler(this._rangeChanged);
                }
                this._face = wjcCore.asType(value, Range);
                if (this._face) {
                    this._face.propertyChanged.addHandler(this._rangeChanged, this);
                }
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gauge.prototype, "pointer", {
        get: function () {
            return this._pointer;
        },
        set: function (value) {
            if (value != this._pointer) {
                var gaugeValue = null;
                if (this._pointer) {
                    gaugeValue = this.value;
                    this._pointer.propertyChanged.removeHandler(this._rangeChanged);
                }
                this._pointer = wjcCore.asType(value, Range);
                if (this._pointer) {
                    if (gaugeValue) {
                        this.value = gaugeValue;
                    }
                    this._pointer.propertyChanged.addHandler(this._rangeChanged, this);
                }
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gauge.prototype, "showText", {
        get: function () {
            return this._showText;
        },
        set: function (value) {
            if (value != this._showText) {
                this._showText = wjcCore.asEnum(value, ShowText);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gauge.prototype, "showTicks", {
        get: function () {
            return this._showTicks;
        },
        set: function (value) {
            if (value != this._showTicks) {
                this._showTicks = wjcCore.asBoolean(value);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gauge.prototype, "tickSpacing", {
        get: function () {
            return this._tickSpacing;
        },
        set: function (value) {
            if (value != this._tickSpacing) {
                this._tickSpacing = wjcCore.asNumber(value, true);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gauge.prototype, "thumbSize", {
        get: function () {
            return this._thumbSize;
        },
        set: function (value) {
            if (value != this._thumbSize) {
                this._thumbSize = wjcCore.asNumber(value, true, true);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gauge.prototype, "showRanges", {
        get: function () {
            return this._showRanges;
        },
        set: function (value) {
            if (value != this._showRanges) {
                this._showRanges = wjcCore.asBoolean(value);
                this._animColor = null;
                this._rangesDirty = true;
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gauge.prototype, "hasShadow", {
        get: function () {
            return this._shadow;
        },
        set: function (value) {
            if (value != this._shadow) {
                this._shadow = wjcCore.asBoolean(value);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gauge.prototype, "isAnimated", {
        get: function () {
            return this._animated;
        },
        set: function (value) {
            this._animated = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gauge.prototype, "ranges", {
        get: function () {
            return this._ranges;
        },
        enumerable: true,
        configurable: true
    });
    Gauge.prototype.onValueChanged = function (e) {
        this.valueChanged.raise(this, e);
    };
    Gauge.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        _super.prototype.refresh.call(this, fullUpdate);
        if (this._rangesDirty) {
            this._rangesDirty = false;
            var gr = this._gRanges;
            for (var i = 0; i < this._rngElements.length; i++) {
                var e = this._rngElements[i];
                e.rng.propertyChanged.removeHandler(this._rangeChanged);
            }
            while (gr.lastChild) {
                gr.removeChild(gr.lastChild);
            }
            this._rngElements = [];
            if (this._showRanges) {
                for (var i = 0; i < this.ranges.length; i++) {
                    var rng = this.ranges[i];
                    rng.propertyChanged.addHandler(this._rangeChanged, this);
                    this._rngElements.push({
                        rng: rng,
                        el: this._createElement('path', gr)
                    });
                }
            }
        }
        this._showElement(this._tValue, (this.showText & ShowText.Value) != 0);
        this._showElement(this._tMin, (this.showText & ShowText.MinMax) != 0);
        this._showElement(this._tMax, (this.showText & ShowText.MinMax) != 0);
        this._showElement(this._cValue, (this.showText & ShowText.Value) != 0 || this._thumbSize > 0);
        this._updateText();
        var filterUrl = this._getFilterUrl();
        this._setAttribute(this._pFace, 'filter', filterUrl);
        this._setAttribute(this._pPointer, 'filter', filterUrl);
        this._updateRange(this._face);
        this._updateRange(this._pointer);
        this._updateTicks();
        for (var i = 0; i < this.ranges.length; i++) {
            this._updateRange(this.ranges[i]);
        }
        this._initialized = true;
    };
    Gauge.prototype.hitTest = function (pt, y) {
        if (wjcCore.isNumber(pt) && wjcCore.isNumber(y)) {
            pt = new wjcCore.Point(pt, y);
        }
        else if (!(pt instanceof wjcCore.Point)) {
            pt = wjcCore.mouseToPage(pt);
        }
        pt = wjcCore.asType(pt, wjcCore.Point);
        var rc = wjcCore.Rect.fromBoundingRect(this._dSvg.getBoundingClientRect());
        pt.x -= rc.left + pageXOffset;
        pt.y -= rc.top + pageYOffset;
        return this._getValueFromPoint(pt);
    };
    Gauge._getBBox = function (e) {
        try {
            return e.getBBox();
        }
        catch (x) {
            return { x: 0, y: 0, width: 0, height: 0 };
        }
    };
    Gauge.prototype._getFilterUrl = function () {
        return this.hasShadow ? 'url(#' + this._filterID + ')' : null;
    };
    Gauge.prototype._getRangeElement = function (rng) {
        if (rng == this._face) {
            return this._pFace;
        }
        else if (rng == this._pointer) {
            return this._pPointer;
        }
        for (var i = 0; i < this._rngElements.length; i++) {
            var rngEl = this._rngElements[i];
            if (rngEl.rng == rng) {
                return rngEl.el;
            }
        }
        return null;
    };
    Gauge.prototype._rangeChanged = function (rng, e) {
        var _this = this;
        if (rng == this._pointer && e.propertyName == 'max') {
            this.onValueChanged();
            this._updateText();
        }
        if (rng == this._face) {
            this.invalidate();
            return;
        }
        if (rng == this._pointer && e.propertyName == 'max') {
            if (this._animInterval) {
                clearInterval(this._animInterval);
            }
            if (this.isAnimated && !this.isUpdating && this._initialized) {
                var s1 = this._getPointerColor(e.oldValue), s2 = this._getPointerColor(e.newValue), c1_1 = s1 ? new wjcCore.Color(s1) : null, c2_1 = s2 ? new wjcCore.Color(s2) : null;
                this._animInterval = wjcCore.animate(function (pct) {
                    _this._animColor = (c1_1 && c2_1)
                        ? wjcCore.Color.interpolate(c1_1, c2_1, pct).toString()
                        : null;
                    _this._updateRange(rng, e.oldValue + pct * (e.newValue - e.oldValue));
                    if (pct >= 1) {
                        _this._animColor = null;
                        _this._animInterval = null;
                        _this._updateRange(rng);
                        _this._updateText();
                    }
                });
                return;
            }
        }
        this._updateRange(rng);
    };
    Gauge.prototype._createElement = function (tag, parent, cls) {
        var e = document.createElementNS(Gauge._SVGNS, tag);
        if (cls) {
            e.setAttribute('class', cls);
        }
        parent.appendChild(e);
        return e;
    };
    Gauge.prototype._centerText = function (e, value, center) {
        if (e.getAttribute('display') != 'none') {
            var text = wjcCore.Globalize.format(value, this.format);
            if (wjcCore.isFunction(this.getText)) {
                var part = e == this._tValue ? 'value' :
                    e == this._tMin ? 'min' :
                        e == this._tMax ? 'max' :
                            null;
                wjcCore.assert(part != null, 'unknown element');
                text = this.getText(this, part, value, text);
            }
            e.textContent = text;
            var box = wjcCore.Rect.fromBoundingRect(Gauge._getBBox(e)), x = (center.x - box.width / 2), y = (center.y + box.height / 4);
            e.setAttribute('x', this._fix(x));
            e.setAttribute('y', this._fix(y));
        }
    };
    Gauge.prototype._copy = function (key, value) {
        if (key == 'ranges') {
            var arr = wjcCore.asArray(value);
            for (var i = 0; i < arr.length; i++) {
                var r = new Range();
                wjcCore.copy(r, arr[i]);
                this.ranges.push(r);
            }
            return true;
        }
        else if (key == 'pointer') {
            wjcCore.copy(this.pointer, value);
            return true;
        }
        return false;
    };
    Gauge.prototype._showElement = function (e, show) {
        this._setAttribute(e, 'display', show ? '' : 'none');
    };
    Gauge.prototype._setAttribute = function (e, att, value) {
        if (value) {
            e.setAttribute(att, value);
        }
        else {
            e.removeAttribute(att);
        }
    };
    Gauge.prototype._updateRange = function (rng, value) {
        if (value === void 0) { value = rng.max; }
        if (rng == this._pointer) {
            rng.min = this.origin != null
                ? this.origin
                : (this.min < 0 && this.max > 0) ? 0 : this.min;
        }
        var e = this._getRangeElement(rng);
        if (e) {
            this._updateRangeElement(e, rng, value);
            var color = rng.color;
            if (rng == this._pointer) {
                color = this._animColor ? this._animColor : this._getPointerColor(rng.max);
            }
            this._setAttribute(e, 'style', color ? 'fill:' + color : null);
        }
    };
    Gauge.prototype._getPointerColor = function (value) {
        var rng;
        if (!this._showRanges) {
            var rng_1;
            for (var i = 0; i < this._ranges.length; i++) {
                var r = this._ranges[i];
                if (value >= r.min && value <= r.max) {
                    rng_1 = r;
                    break;
                }
            }
            if (rng_1) {
                return rng_1.color;
            }
        }
        return this._pointer.color;
    };
    Gauge.prototype._keydown = function (e) {
        if (!this._readOnly && this._step) {
            var key = this._getKey(e.keyCode), handled = true;
            switch (key) {
                case wjcCore.Key.Left:
                case wjcCore.Key.Down:
                    this.value = wjcCore.clamp(this.value - this.step, this.min, this.max);
                    break;
                case wjcCore.Key.Right:
                case wjcCore.Key.Up:
                    this.value = wjcCore.clamp(this.value + this.step, this.min, this.max);
                    break;
                case wjcCore.Key.Home:
                    this.value = this.min;
                    break;
                case wjcCore.Key.End:
                    this.value = this.max;
                    break;
                default:
                    handled = false;
                    break;
            }
            if (handled) {
                e.preventDefault();
            }
        }
    };
    Gauge.prototype._getKey = function (key) {
        return key;
    };
    Gauge.prototype._applyMouseValue = function (e, instant) {
        if (!this.isReadOnly && this.containsFocus()) {
            var value = this.hitTest(e);
            if (value != null) {
                var a = this._animated;
                if (instant) {
                    this._animated = false;
                }
                if (this._step != null) {
                    value = Math.round(value / this._step) * this._step;
                }
                this.value = wjcCore.clamp(value, this.min, this.max);
                this._animated = a;
                return true;
            }
        }
        return false;
    };
    Gauge.prototype._updateRangeElement = function (e, rng, value) {
        wjcCore.assert(false, 'Gauge is an abstract class.');
    };
    Gauge.prototype._updateText = function () {
        wjcCore.assert(false, 'Gauge is an abstract class.');
    };
    Gauge.prototype._updateTicks = function () {
        wjcCore.assert(false, 'Gauge is an abstract class.');
    };
    Gauge.prototype._getValueFromPoint = function (pt) {
        return null;
    };
    Gauge.prototype._fix = function (n) {
        return wjcCore.isNumber(n)
            ? parseFloat(n.toFixed(4)).toString()
            : this._fix(n.x) + ' ' + this._fix(n.y);
    };
    Gauge.prototype._updateAria = function () {
        var host = this.hostElement;
        if (host) {
            wjcCore.setAttribute(host, 'aria-valuemin', this.min);
            wjcCore.setAttribute(host, 'aria-valuemax', this.max);
            wjcCore.setAttribute(host, 'aria-valuenow', this.value);
        }
    };
    Gauge._SVGNS = 'http://www.w3.org/2000/svg';
    Gauge._ctr = 0;
    Gauge.controlTemplate = '<div wj-part="dsvg" style="width:100%;height:100%">' +
        '<svg wj-part="svg" width="100%" height="100%" style="overflow:visible">' +
        '<defs>' +
        '<filter wj-part="filter">' +
        '<feOffset dx="3" dy="3"></feOffset>' +
        '<feGaussianBlur result="offset-blur" stdDeviation="5"></feGaussianBlur>' +
        '<feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"></feComposite>' +
        '<feFlood flood-color="black" flood-opacity="0.2" result="color"></feFlood>' +
        '<feComposite operator="in" in="color" in2="inverse" result="shadow"></feComposite>' +
        '<feComposite operator="over" in="shadow" in2="SourceGraphic"></feComposite>' +
        '</filter>' +
        '</defs>' +
        '<g wj-part="gface" class="wj-face" style="cursor:inherit">' +
        '<path wj-part="pface"/>' +
        '</g>' +
        '<g wj-part="granges" class="wj-ranges" style="cursor:inherit"/>' +
        '<g wj-part="gpointer" class="wj-pointer" style="cursor:inherit">' +
        '<path wj-part="ppointer"/>' +
        '</g>' +
        '<g wj-part="gcover" class="wj-cover" style="cursor:inherit">' +
        '<path wj-part="pticks" class="wj-ticks"/>' +
        '<circle wj-part="cvalue" class="wj-pointer wj-thumb"/>' +
        '<text wj-part="value" class="wj-value"/>' +
        '<text wj-part="min" class="wj-min" aria-hidden="true"/>' +
        '<text wj-part="max" class="wj-max" aria-hidden="true"/>' +
        '</g>' +
        '</svg>' +
        '</div>';
    return Gauge;
}(wjcCore.Control));
exports.Gauge = Gauge;
'use strict';
var GaugeDirection;
(function (GaugeDirection) {
    GaugeDirection[GaugeDirection["Right"] = 0] = "Right";
    GaugeDirection[GaugeDirection["Left"] = 1] = "Left";
    GaugeDirection[GaugeDirection["Up"] = 2] = "Up";
    GaugeDirection[GaugeDirection["Down"] = 3] = "Down";
})(GaugeDirection = exports.GaugeDirection || (exports.GaugeDirection = {}));
var LinearGauge = (function (_super) {
    __extends(LinearGauge, _super);
    function LinearGauge(element, options) {
        var _this = _super.call(this, element, null) || this;
        _this._direction = GaugeDirection.Right;
        wjcCore.addClass(_this.hostElement, 'wj-lineargauge');
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(LinearGauge.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (value) {
            if (value != this._direction) {
                this._direction = wjcCore.asEnum(value, GaugeDirection);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    LinearGauge.prototype._updateRangeElement = function (e, rng, value) {
        var rc = this._getRangeRect(rng, value);
        this._updateSegment(e, rc);
        var showText = (rng == this._pointer) && (this.showText & ShowText.Value) != 0, showThumb = showText || (rng == this._pointer && this.thumbSize > 0);
        var x = rc.left + rc.width / 2, y = rc.top + rc.height / 2;
        switch (this._getDirection()) {
            case GaugeDirection.Right:
                x = rc.right;
                break;
            case GaugeDirection.Left:
                x = rc.left;
                break;
            case GaugeDirection.Up:
                y = rc.top;
                break;
            case GaugeDirection.Down:
                y = rc.bottom;
                break;
        }
        if (showText) {
            this._centerText(this._tValue, value, new wjcCore.Point(x, y));
        }
        if (showText || showThumb) {
            rc = wjcCore.Rect.fromBoundingRect(Gauge._getBBox(this._tValue));
            var color = this._animColor ? this._animColor : this._getPointerColor(rng.max), radius = this.thumbSize != null ? this.thumbSize / 2 : Math.max(rc.width, rc.height) * .8, ce = this._cValue;
            this._setAttribute(ce, 'cx', this._fix(x));
            this._setAttribute(ce, 'cy', this._fix(y));
            this._setAttribute(ce, 'style', color ? 'fill:' + color : null);
            this._setAttribute(ce, 'r', this._fix(radius));
        }
    };
    LinearGauge.prototype._updateText = function () {
        var rc = this._getRangeRect(this._face);
        switch (this._getDirection()) {
            case GaugeDirection.Right:
                this._setText(this._tMin, this.min, rc, 'left');
                this._setText(this._tMax, this.max, rc, 'right');
                break;
            case GaugeDirection.Left:
                this._setText(this._tMin, this.min, rc, 'right');
                this._setText(this._tMax, this.max, rc, 'left');
                break;
            case GaugeDirection.Up:
                this._setText(this._tMin, this.min, rc, 'bottom');
                this._setText(this._tMax, this.max, rc, 'top');
                break;
            case GaugeDirection.Down:
                this._setText(this._tMin, this.min, rc, 'top');
                this._setText(this._tMax, this.max, rc, 'bottom');
                break;
        }
    };
    LinearGauge.prototype._updateTicks = function () {
        var step = (this.tickSpacing && this.tickSpacing > 0) ? this.tickSpacing : this.step, path = '';
        if (this.showTicks && step > 0) {
            var rc = this._getRangeRect(this._face), pos = void 0;
            for (var t = this.min + step; t < this.max; t += step) {
                switch (this._getDirection()) {
                    case GaugeDirection.Right:
                        pos = this._fix(rc.left + rc.width * this._getPercent(t));
                        path += 'M ' + pos + ' ' + this._fix(rc.top) + ' L ' + pos + ' ' + this._fix(rc.bottom) + ' ';
                        break;
                    case GaugeDirection.Left:
                        pos = this._fix(rc.right - rc.width * this._getPercent(t));
                        path += 'M ' + pos + ' ' + rc.top.toFixed(2) + ' L ' + pos + ' ' + rc.bottom.toFixed(2) + ' ';
                        break;
                    case GaugeDirection.Up:
                        pos = (rc.bottom - rc.height * this._getPercent(t)).toFixed(2);
                        path += 'M ' + this._fix(rc.left) + ' ' + pos + ' L ' + this._fix(rc.right) + ' ' + pos + ' ';
                        break;
                    case GaugeDirection.Down:
                        pos = (rc.top + rc.height * this._getPercent(t)).toFixed(2);
                        path += 'M ' + rc.left.toFixed(2) + ' ' + pos + ' L ' + rc.right.toFixed(2) + ' ' + pos + ' ';
                        break;
                }
            }
        }
        this._pTicks.setAttribute('d', path);
    };
    LinearGauge.prototype._updateSegment = function (path, rc) {
        var data = {
            p1: this._fix(new wjcCore.Point(rc.left, rc.top)),
            p2: this._fix(new wjcCore.Point(rc.right, rc.top)),
            p3: this._fix(new wjcCore.Point(rc.right, rc.bottom)),
            p4: this._fix(new wjcCore.Point(rc.left, rc.bottom))
        };
        var content = wjcCore.format('M {p1} L {p2} L {p3} L {p4} Z', data);
        path.setAttribute('d', content);
    };
    LinearGauge.prototype._setText = function (e, value, rc, pos) {
        if (e.getAttribute('display') != 'none') {
            var text = wjcCore.Globalize.format(value, this.format);
            if (wjcCore.isFunction(this.getText)) {
                var part = e == this._tValue ? 'value' :
                    e == this._tMin ? 'min' :
                        e == this._tMax ? 'max' :
                            null;
                wjcCore.assert(part != null, 'unknown element');
                text = this.getText(this, part, value, text);
            }
            e.textContent = text;
            var box = wjcCore.Rect.fromBoundingRect(Gauge._getBBox(e)), pt = new wjcCore.Point(rc.left + rc.width / 2 - box.width / 2, rc.top + rc.height / 2 + box.height / 2);
            switch (pos) {
                case 'top':
                    pt.y = rc.top - 4;
                    break;
                case 'left':
                    pt.x = rc.left - 4 - box.width;
                    break;
                case 'right':
                    pt.x = rc.right + 4;
                    break;
                case 'bottom':
                    pt.y = rc.bottom + 4 + box.height;
                    break;
            }
            e.setAttribute('x', this._fix(pt.x));
            e.setAttribute('y', this._fix(pt.y));
        }
    };
    LinearGauge.prototype._getRangeRect = function (rng, value) {
        if (value === void 0) { value = rng.max; }
        var rc = new wjcCore.Rect(0, 0, this.hostElement.clientWidth, this.hostElement.clientHeight);
        var padding = this.thumbSize ? Math.ceil(this.thumbSize / 2) : 0;
        if (this.showText != ShowText.None) {
            var fontSize = parseInt(getComputedStyle(this.hostElement).fontSize);
            if (!isNaN(fontSize)) {
                padding = Math.max(padding, 3 * fontSize);
            }
        }
        switch (this._getDirection()) {
            case GaugeDirection.Right:
            case GaugeDirection.Left:
                rc = rc.inflate(-padding, -rc.height * (1 - this.thickness * rng.thickness) / 2);
                break;
            case GaugeDirection.Up:
            case GaugeDirection.Down:
                rc = rc.inflate(-rc.width * (1 - this.thickness * rng.thickness) / 2, -padding);
                break;
        }
        var face = rng == this._face, pctMin = face ? 0 : this._getPercent(rng.min), pctMax = face ? 1 : this._getPercent(value);
        switch (this._getDirection()) {
            case GaugeDirection.Right:
                rc.left += rc.width * pctMin;
                rc.width *= (pctMax - pctMin);
                break;
            case GaugeDirection.Left:
                rc.left = rc.right - rc.width * pctMax;
                rc.width = rc.width * (pctMax - pctMin);
                break;
            case GaugeDirection.Down:
                rc.top += rc.height * pctMin;
                rc.height *= (pctMax - pctMin);
                break;
            case GaugeDirection.Up:
                rc.top = rc.bottom - rc.height * pctMax;
                rc.height = rc.height * (pctMax - pctMin);
                break;
        }
        return rc;
    };
    LinearGauge.prototype._getValueFromPoint = function (pt) {
        var rc = this._getRangeRect(this._face);
        var pct = 0;
        switch (this._getDirection()) {
            case GaugeDirection.Right:
                pct = rc.width > 0 ? (pt.x - rc.left) / rc.width : 0;
                break;
            case GaugeDirection.Left:
                pct = rc.width > 0 ? (rc.right - pt.x) / rc.width : 0;
                break;
            case GaugeDirection.Up:
                pct = rc.height > 0 ? (rc.bottom - pt.y) / rc.height : 0;
                break;
            case GaugeDirection.Down:
                pct = rc.height > 0 ? (pt.y - rc.top) / rc.height : 0;
                break;
        }
        return this.min + pct * (this.max - this.min);
    };
    LinearGauge.prototype._getDirection = function () {
        var dir = this._direction;
        if (this.rightToLeft) {
            switch (dir) {
                case GaugeDirection.Left:
                    dir = GaugeDirection.Right;
                    break;
                case GaugeDirection.Right:
                    dir = GaugeDirection.Left;
                    break;
            }
        }
        return dir;
    };
    LinearGauge.prototype._getKey = function (key) {
        switch (this._getDirection()) {
            case GaugeDirection.Left:
                switch (key) {
                    case wjcCore.Key.Left:
                        key = wjcCore.Key.Right;
                        break;
                    case wjcCore.Key.Right:
                        key = wjcCore.Key.Left;
                        break;
                }
                break;
            case GaugeDirection.Down:
                switch (key) {
                    case wjcCore.Key.Up:
                        key = wjcCore.Key.Down;
                        break;
                    case wjcCore.Key.Down:
                        key = wjcCore.Key.Up;
                        break;
                }
                break;
        }
        return key;
    };
    return LinearGauge;
}(Gauge));
exports.LinearGauge = LinearGauge;
'use strict';
var RadialGauge = (function (_super) {
    __extends(RadialGauge, _super);
    function RadialGauge(element, options) {
        var _this = _super.call(this, element, null) || this;
        _this._startAngle = 0;
        _this._sweepAngle = 180;
        _this._autoScale = true;
        wjcCore.addClass(_this.hostElement, 'wj-radialgauge');
        _this._thickness = .4;
        _this.showText = ShowText.All;
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(RadialGauge.prototype, "startAngle", {
        get: function () {
            return this._startAngle;
        },
        set: function (value) {
            if (value != this._startAngle) {
                this._startAngle = wjcCore.clamp(wjcCore.asNumber(value, false), -360, 360);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadialGauge.prototype, "sweepAngle", {
        get: function () {
            return this._sweepAngle;
        },
        set: function (value) {
            if (value != this._sweepAngle) {
                this._sweepAngle = wjcCore.clamp(wjcCore.asNumber(value, false), -360, 360);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadialGauge.prototype, "autoScale", {
        get: function () {
            return this._autoScale;
        },
        set: function (value) {
            if (value != this._autoScale) {
                this._autoScale = wjcCore.asBoolean(value);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadialGauge.prototype, "clientSize", {
        get: function () {
            var rc = this._rcSvg;
            return rc ? new wjcCore.Size(rc.width, rc.height) : null;
        },
        enumerable: true,
        configurable: true
    });
    RadialGauge.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        this._setAttribute(this._svg, 'viewBox', null);
        this._rcSvg = wjcCore.Rect.fromBoundingRect(this._dSvg.getBoundingClientRect());
        _super.prototype.refresh.call(this, fullUpdate);
        this._ctmInv = null;
        this._ptSvg = null;
        if (this._autoScale) {
            this._setAttribute(this._svg, 'viewBox', '');
            var rc = wjcCore.Rect.fromBoundingRect(Gauge._getBBox(this._pFace));
            if ((this.showText & ShowText.Value) != 0) {
                rc = wjcCore.Rect.union(rc, wjcCore.Rect.fromBoundingRect(Gauge._getBBox(this._tValue)));
            }
            if ((this.showText & ShowText.MinMax) != 0) {
                rc = wjcCore.Rect.union(rc, wjcCore.Rect.fromBoundingRect(Gauge._getBBox(this._tMin)));
                rc = wjcCore.Rect.union(rc, wjcCore.Rect.fromBoundingRect(Gauge._getBBox(this._tMax)));
            }
            var viewBox = [this._fix(rc.left), this._fix(rc.top), this._fix(rc.width), this._fix(rc.height)].join(' ');
            this._setAttribute(this._svg, 'viewBox', viewBox);
            var ctm = this._pFace.getCTM();
            this._ctmInv = ctm ? ctm.inverse() : null;
            this._ptSvg = this._svg.createSVGPoint();
        }
    };
    RadialGauge.prototype._updateRangeElement = function (e, rng, value) {
        if (this._rcSvg) {
            var rc = this._rcSvg, center = new wjcCore.Point(rc.width / 2, rc.height / 2), radius = Math.min(rc.width, rc.height) / 2, fThick = radius * this.thickness, rThick = fThick * rng.thickness, outer = radius - (fThick - rThick) / 2, inner = outer - rThick, start = this.startAngle + 180, sweep = this.sweepAngle, face = rng == this._face, ps = face ? 0 : this._getPercent(rng.min), pe = face ? 1 : this._getPercent(value), rngStart = start + sweep * ps, rngSweep = sweep * (pe - ps);
            this._updateSegment(e, center, outer, inner, rngStart, rngSweep);
            if (rng == this._pointer && this.thumbSize > 0) {
                var color = this._animColor ? this._animColor : this._getPointerColor(rng.max), pt = this._getPoint(center, start + sweep * this._getPercent(value), (outer + inner) / 2), ce = this._cValue;
                this._setAttribute(ce, 'cx', this._fix(pt.x));
                this._setAttribute(ce, 'cy', this._fix(pt.y));
                this._setAttribute(ce, 'style', color ? 'fill:' + color : null);
                this._setAttribute(ce, 'r', this._fix(this.thumbSize / 2));
            }
        }
    };
    RadialGauge.prototype._updateText = function () {
        if (this._rcSvg) {
            var rc = this._rcSvg, center = new wjcCore.Point(rc.width / 2, rc.height / 2), outer = Math.min(rc.width, rc.height) / 2, inner = Math.max(0, outer * (1 - this.thickness)), start = this.startAngle + 180, sweep = this.sweepAngle;
            this._showElement(this._cValue, this.thumbSize > 0);
            var show = (this.showText & ShowText.MinMax) != 0 && Math.abs(sweep) <= 300;
            this._showElement(this._tMin, show);
            this._showElement(this._tMax, show);
            this._centerText(this._tValue, this.value, center);
            var offset = 10 * (this.sweepAngle < 0 ? -1 : +1);
            this._centerText(this._tMin, this.min, this._getPoint(center, start - offset, (outer + inner) / 2));
            this._centerText(this._tMax, this.max, this._getPoint(center, start + sweep + offset, (outer + inner) / 2));
        }
    };
    RadialGauge.prototype._updateTicks = function () {
        var step = (this.tickSpacing && this.tickSpacing > 0) ? this.tickSpacing : this.step, path = '';
        if (this.showTicks && step > 0) {
            var rc = this._rcSvg, ctr = new wjcCore.Point(rc.width / 2, rc.height / 2), radius = Math.min(rc.width, rc.height) / 2, fThick = radius * this.thickness, rThick = fThick * this._face.thickness, outer = radius - (fThick - rThick) / 2, inner = outer - rThick;
            for (var t = this.min + step; t < this.max; t += step) {
                var angle = this.startAngle + 180 + this.sweepAngle * this._getPercent(t), p1 = this._fix(this._getPoint(ctr, angle, inner)), p2 = this._fix(this._getPoint(ctr, angle, outer));
                path += 'M ' + p1 + ' L ' + p2 + ' ';
            }
        }
        this._pTicks.setAttribute('d', path);
    };
    RadialGauge.prototype._updateSegment = function (path, ctr, rOut, rIn, start, sweep) {
        sweep = Math.min(Math.max(sweep, -359.99), 359.99);
        var p1 = this._getPoint(ctr, start, rIn), p2 = this._getPoint(ctr, start, rOut), p3 = this._getPoint(ctr, start + sweep, rOut), p4 = this._getPoint(ctr, start + sweep, rIn);
        var data = {
            large: Math.abs(sweep) > 180 ? 1 : 0,
            cw: sweep > 0 ? 1 : 0,
            ccw: sweep > 0 ? 0 : 1,
            or: this._fix(rOut),
            ir: this._fix(rIn),
            p1: this._fix(p1),
            p2: this._fix(p2),
            p3: this._fix(p3),
            p4: this._fix(p4)
        };
        var content = wjcCore.format('M {p1} ' +
            'L {p2} A {or} {or} 0 {large} {cw} {p3} ' +
            'L {p4} A {ir} {ir} 0 {large} {ccw} {p1} Z', data);
        path.setAttribute('d', content);
    };
    RadialGauge.prototype._getPoint = function (ctr, angle, radius) {
        angle = angle * Math.PI / 180;
        return new wjcCore.Point(ctr.x + radius * Math.cos(angle), ctr.y + radius * Math.sin(angle));
    };
    RadialGauge.prototype._getValueFromPoint = function (pt) {
        if (this.autoScale && this._ctmInv) {
            this._ptSvg.x = pt.x;
            this._ptSvg.y = pt.y;
            this._ptSvg = this._ptSvg.matrixTransform(this._ctmInv);
            pt.x = this._ptSvg.x;
            pt.y = this._ptSvg.y;
        }
        if (!this._rcSvg) {
            return null;
        }
        var rc = this._rcSvg, center = new wjcCore.Point(rc.width / 2, rc.height / 2), outer = Math.min(rc.width, rc.height) / 2, inner = outer * (1 - this.thickness), dx = pt.x - center.x, dy = pt.y - center.y;
        var r2 = dy * dy + dx * dx;
        if (r2 > outer * outer + 16 || r2 < inner * inner - 16) {
            return null;
        }
        var ang = (Math.PI - Math.atan2(-dy, dx)) * 180 / Math.PI, start = this.startAngle, sweep = this.sweepAngle;
        if (sweep > 0) {
            while (ang < start)
                ang += 360;
            while (ang > start + sweep)
                ang -= 360;
        }
        else {
            while (ang < start + sweep)
                ang += 360;
            while (ang > start)
                ang -= 360;
        }
        var pct = Math.abs(ang - start) / Math.abs(sweep);
        return this.min + pct * (this.max - this.min);
    };
    return RadialGauge;
}(Gauge));
exports.RadialGauge = RadialGauge;
'use strict';
var BulletGraph = (function (_super) {
    __extends(BulletGraph, _super);
    function BulletGraph(element, options) {
        var _this = _super.call(this, element, null) || this;
        wjcCore.addClass(_this.hostElement, 'wj-bulletgraph');
        _this._pointer.thickness = .35;
        _this._rngTarget = new Range('target');
        _this._rngTarget.thickness = .8;
        _this._rngTarget.color = 'black';
        _this._rngGood = new Range('good');
        _this._rngGood.color = 'rgba(0,0,0,.15)';
        _this._rngBad = new Range('bad');
        _this._rngBad.color = 'rgba(0,0,0,.3)';
        _this.ranges.push(_this._rngBad);
        _this.ranges.push(_this._rngGood);
        _this.ranges.push(_this._rngTarget);
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(BulletGraph.prototype, "target", {
        get: function () {
            return this._rngTarget.max;
        },
        set: function (value) {
            this._rngTarget.max = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BulletGraph.prototype, "good", {
        get: function () {
            return this._rngGood.max;
        },
        set: function (value) {
            this._rngGood.max = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BulletGraph.prototype, "bad", {
        get: function () {
            return this._rngBad.max;
        },
        set: function (value) {
            this._rngBad.max = value;
        },
        enumerable: true,
        configurable: true
    });
    BulletGraph.prototype._getRangeRect = function (rng, value) {
        if (value === void 0) { value = rng.max; }
        var rc = _super.prototype._getRangeRect.call(this, rng, value);
        if (rng == this._rngTarget) {
            switch (this.direction) {
                case GaugeDirection.Right:
                    rc.left = rc.right - 1;
                    rc.width = 3;
                    break;
                case GaugeDirection.Left:
                    rc.width = 3;
                    break;
                case GaugeDirection.Up:
                    rc.height = 3;
                    break;
                case GaugeDirection.Down:
                    rc.top = rc.bottom - 1;
                    rc.height = 3;
                    break;
            }
        }
        return rc;
    };
    return BulletGraph;
}(LinearGauge));
exports.BulletGraph = BulletGraph;
'use strict';
var Range = (function () {
    function Range(name) {
        this._min = 0;
        this._max = 100;
        this._thickness = 1;
        this.propertyChanged = new wjcCore.Event();
        this._name = name;
    }
    Object.defineProperty(Range.prototype, "min", {
        get: function () {
            return this._min;
        },
        set: function (value) {
            this._setProp('_min', wjcCore.asNumber(value, true));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "max", {
        get: function () {
            return this._max;
        },
        set: function (value) {
            this._setProp('_max', wjcCore.asNumber(value, true));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._setProp('_color', wjcCore.asString(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "thickness", {
        get: function () {
            return this._thickness;
        },
        set: function (value) {
            this._setProp('_thickness', wjcCore.clamp(wjcCore.asNumber(value), 0, 1));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._setProp('_name', wjcCore.asString(value));
        },
        enumerable: true,
        configurable: true
    });
    Range.prototype.onPropertyChanged = function (e) {
        this.propertyChanged.raise(this, e);
    };
    Range.prototype._setProp = function (name, value) {
        var oldValue = this[name];
        if (value != oldValue) {
            this[name] = value;
            var e = new wjcCore.PropertyChangedEventArgs(name.substr(1), oldValue, value);
            this.onPropertyChanged(e);
        }
    };
    Range._ctr = 0;
    return Range;
}());
exports.Range = Range;
//# sourceMappingURL=wijmo.gauge.js.map