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
var wjcChart = require("wijmo/wijmo.chart");
var wjcChartFinance = require("wijmo/wijmo.chart.finance");
var wjcSelf = require("wijmo/wijmo.chart.finance.analytics");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['chart'] = window['wijmo']['chart'] || {};
window['wijmo']['chart']['finance'] = window['wijmo']['chart']['finance'] || {};
window['wijmo']['chart']['finance']['analytics'] = wjcSelf;
'use strict';
function isValid(value) {
    return isFinite(value) && !isNaN(value) && wjcCore.isNumber(value);
}
var Fibonacci = (function (_super) {
    __extends(Fibonacci, _super);
    function Fibonacci(options) {
        var _this = _super.call(this) || this;
        _this._levels = [0, 23.6, 38.2, 50, 61.8, 100];
        _this._uptrend = true;
        _this._labelPosition = wjcChart.LabelPosition.Left;
        _this.rendering.addHandler(_this._render);
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(Fibonacci.prototype, "low", {
        get: function () {
            return this._low;
        },
        set: function (value) {
            if (value != this._low) {
                this._low = wjcCore.asNumber(value, true);
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Fibonacci.prototype, "high", {
        get: function () {
            return this._high;
        },
        set: function (value) {
            if (value != this._high) {
                this._high = wjcCore.asNumber(value, true);
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Fibonacci.prototype, "labelPosition", {
        get: function () {
            return this._labelPosition;
        },
        set: function (value) {
            if (value != this._labelPosition) {
                this._labelPosition = wjcCore.asEnum(value, wjcChart.LabelPosition, true);
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Fibonacci.prototype, "uptrend", {
        get: function () {
            return this._uptrend;
        },
        set: function (value) {
            if (value != this._uptrend) {
                this._uptrend = wjcCore.asBoolean(value, true);
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Fibonacci.prototype, "levels", {
        get: function () {
            return this._levels;
        },
        set: function (value) {
            if (value != this._levels) {
                this._levels = wjcCore.asArray(value, true);
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Fibonacci.prototype, "minX", {
        get: function () {
            return this._minX;
        },
        set: function (value) {
            if (value != this._minX) {
                this._minX = value;
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Fibonacci.prototype, "maxX", {
        get: function () {
            return this._maxX;
        },
        set: function (value) {
            if (value != this._maxX) {
                this._maxX = value;
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Fibonacci.prototype._getMinX = function () {
        if (wjcCore.isNumber(this._minX)) {
            return this._minX;
        }
        else if (wjcCore.isDate(this._minX)) {
            return wjcCore.asDate(this._minX).valueOf();
        }
        else {
            return this._getAxisX().actualMin;
        }
    };
    Fibonacci.prototype._getMaxX = function () {
        if (wjcCore.isNumber(this._maxX)) {
            return this._maxX;
        }
        else if (wjcCore.isDate(this._maxX)) {
            return wjcCore.asDate(this._maxX).valueOf();
        }
        else {
            return this._getAxisX().actualMax;
        }
    };
    Fibonacci.prototype._updateLevels = function () {
        var min = undefined, max = undefined;
        if (this._low === undefined || this._high === undefined) {
            var vals = _super.prototype.getValues.call(this, 0);
            var xvals = _super.prototype.getValues.call(this, 1);
            if (vals) {
                var len = vals.length;
                var xmin = this._getMinX(), xmax = this._getMaxX();
                for (var i = 0; i < len; i++) {
                    var val = vals[i];
                    var xval = xvals ? xvals[i] : i;
                    if (xval < xmin || xval > xmax) {
                        continue;
                    }
                    if (!isNaN(val)) {
                        if (min === undefined || min > val) {
                            min = val;
                        }
                        if (max === undefined || max < val) {
                            max = val;
                        }
                    }
                }
            }
        }
        if (this._low === undefined && min !== undefined) {
            this._actualLow = min;
        }
        else {
            this._actualLow = this._low;
        }
        if (this._high === undefined && max !== undefined) {
            this._actualHigh = max;
        }
        else {
            this._actualHigh = this._high;
        }
    };
    Fibonacci.prototype._render = function (sender, args) {
        args.cancel = true;
        var ser = sender;
        ser._updateLevels();
        var ax = ser._getAxisX();
        var ay = ser._getAxisY();
        var eng = args.engine;
        var swidth = 2, stroke = ser._getSymbolStroke(ser._chart.series.indexOf(ser));
        var lstyle = wjcChart._BasePlotter.cloneStyle(ser.style, ['fill']);
        var tstyle = wjcChart._BasePlotter.cloneStyle(ser.style, ['stroke']);
        var clipPath = ser.chart._plotrectId;
        eng.stroke = stroke;
        eng.strokeWidth = swidth;
        eng.textFill = stroke;
        var xmin = ser._getMinX(), xmax = ser._getMaxX();
        if (xmin < ax.actualMin) {
            xmin = ax.actualMin;
        }
        if (xmax > ax.actualMax) {
            xmax = ax.actualMax;
        }
        eng.startGroup(null, clipPath);
        var llen = ser._levels ? ser._levels.length : 0;
        for (var i = 0; i < llen; i++) {
            var lvl = ser._levels[i];
            var x1 = ax.convert(xmin), x2 = ax.convert(xmax);
            var y = ser.uptrend ?
                ay.convert(ser._actualLow + 0.01 * lvl * (ser._actualHigh - ser._actualLow)) :
                ay.convert(ser._actualHigh - 0.01 * lvl * (ser._actualHigh - ser._actualLow));
            if (wjcChart._DataInfo.isValid(x1) && wjcChart._DataInfo.isValid(x2) && wjcChart._DataInfo.isValid(y)) {
                eng.drawLine(x1, y, x2, y, null, lstyle);
                if (ser.labelPosition != wjcChart.LabelPosition.None) {
                    var s = lvl.toFixed(1) + '%';
                    var va = 0;
                    if ((ser.uptrend && i == 0) || (!ser.uptrend && i == llen - 1)) {
                        va = 2;
                    }
                    switch (ser.labelPosition) {
                        case wjcChart.LabelPosition.Left:
                            wjcChart.FlexChartCore._renderText(eng, s, new wjcCore.Point(x1, y), 0, va, null, null, tstyle);
                            break;
                        case wjcChart.LabelPosition.Center:
                            wjcChart.FlexChartCore._renderText(eng, s, new wjcCore.Point(0.5 * (x1 + x2), y), 1, va, null, null, tstyle);
                            break;
                        case wjcChart.LabelPosition.Right:
                            wjcChart.FlexChartCore._renderText(eng, s, new wjcCore.Point(x2, y), 2, va, null, null, tstyle);
                            break;
                    }
                }
            }
        }
        eng.stroke = null;
        eng.strokeWidth = null;
        eng.textFill = null;
        eng.endGroup();
    };
    Fibonacci.prototype._getChartType = function () {
        return wjcChart.ChartType.Line;
    };
    return Fibonacci;
}(wjcChart.SeriesBase));
exports.Fibonacci = Fibonacci;
var FibonacciArcs = (function (_super) {
    __extends(FibonacciArcs, _super);
    function FibonacciArcs(options) {
        var _this = _super.call(this) || this;
        _this._levels = [38.2, 50, 61.8];
        _this._labelPosition = wjcChart.LabelPosition.Top;
        _this.rendering.addHandler(_this._render, _this);
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(FibonacciArcs.prototype, "start", {
        get: function () {
            return this._start;
        },
        set: function (value) {
            if (value !== this.start) {
                this._start = wjcCore.asType(value, wjcChart.DataPoint);
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FibonacciArcs.prototype, "end", {
        get: function () {
            return this._end;
        },
        set: function (value) {
            if (value !== this.end) {
                this._end = wjcCore.asType(value, wjcChart.DataPoint);
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FibonacciArcs.prototype, "levels", {
        get: function () {
            return this._levels;
        },
        set: function (value) {
            if (value !== this._levels) {
                this._levels = wjcCore.asArray(value, false);
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FibonacciArcs.prototype, "labelPosition", {
        get: function () {
            return this._labelPosition;
        },
        set: function (value) {
            if (value !== this.labelPosition) {
                this._labelPosition = wjcCore.asEnum(value, wjcChart.LabelPosition);
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    FibonacciArcs.prototype._render = function (sender, args) {
        args.cancel = true;
        var startX = this._getX(0), startY = this._getY(0), endX = this._getX(1), endY = this._getY(1);
        if (_super.prototype._getLength.call(this) <= 1 || !isValid(startX) || !isValid(startY) || !isValid(endX) || !isValid(endY)) {
            return;
        }
        var ax = this._getAxisX(), ay = this._getAxisY(), engine = args.engine, swidth = 2, group, si = this.chart.series.indexOf(this), stroke = this._getSymbolStroke(si), lstyle = wjcChart._BasePlotter.cloneStyle(this.style, ["fill"]), tstyle = wjcChart._BasePlotter.cloneStyle(this.style, ["stroke"]);
        engine.stroke = stroke;
        engine.strokeWidth = swidth;
        engine.textFill = stroke;
        var clipPath = this.chart._plotrectId, yDiff = endY - startY, cx, cy, acy, baseLen, radius, center, lvl, size, lbl;
        group = engine.startGroup(null, clipPath);
        wjcCore.addClass(group, 'fibonacci-arcs');
        if (isValid(startX) && isValid(startY) && isValid(endX) && isValid(endY)) {
            engine.drawLines([ax.convert(startX), ax.convert(endX)], [ay.convert(startY), ay.convert(endY)], null, lstyle);
        }
        baseLen = Math.sqrt(Math.pow(ax.convert(endX) - ax.convert(startX), 2) + Math.pow(ay.convert(endY) - ay.convert(startY), 2));
        center = new wjcCore.Point(endX, endY);
        for (var i = 0; i < this.levels.length; i++) {
            lvl = this.levels[i] * 0.01;
            radius = Math.abs(baseLen * lvl);
            if (isValid(center.x) && isValid(center.y) && isValid(radius)) {
                cx = ax.convert(center.x);
                cy = ay.convert(center.y);
                engine.drawDonutSegment(cx, cy, radius, radius, yDiff > 0 ? 0 : Math.PI, Math.PI, null, lstyle);
                if (this.labelPosition !== wjcChart.LabelPosition.None && lvl !== 0) {
                    lbl = wjcCore.Globalize.format(lvl, "p1");
                    size = engine.measureString(lbl, null, null, tstyle);
                    acy = yDiff <= 0 ? cy - radius : cy + radius;
                    switch (this.labelPosition) {
                        case wjcChart.LabelPosition.Center:
                            acy += (size.height * 0.5);
                            break;
                        case wjcChart.LabelPosition.Bottom:
                            acy += yDiff <= 0 ? size.height : 0;
                            break;
                        default:
                            acy += yDiff <= 0 ? 0 : size.height;
                            break;
                    }
                    engine.drawString(lbl, new wjcCore.Point(cx - size.width * .5, acy), null, tstyle);
                }
            }
        }
        engine.stroke = null;
        engine.strokeWidth = null;
        engine.textFill = null;
        engine.endGroup();
    };
    FibonacciArcs.prototype._getX = function (dim) {
        var retval = null;
        if (dim === 0 && this.start) {
            retval = this.start.x;
        }
        else if (dim === 1 && this.end) {
            retval = this.end.x;
        }
        if (wjcCore.isDate(retval)) {
            retval = wjcCore.asDate(retval).valueOf();
        }
        return retval;
    };
    FibonacciArcs.prototype._getY = function (dim) {
        var retval = null;
        if (dim === 0 && this.start) {
            retval = this.start.y;
        }
        else if (dim === 1 && this.end) {
            retval = this.end.y;
        }
        return retval;
    };
    FibonacciArcs.prototype._getChartType = function () {
        return wjcChart.ChartType.Line;
    };
    return FibonacciArcs;
}(wjcChart.SeriesBase));
exports.FibonacciArcs = FibonacciArcs;
var FibonacciFans = (function (_super) {
    __extends(FibonacciFans, _super);
    function FibonacciFans(options) {
        var _this = _super.call(this) || this;
        _this._levels = [0, 23.6, 38.2, 50, 61.8, 100];
        _this._labelPosition = wjcChart.LabelPosition.Top;
        _this.rendering.addHandler(_this._render, _this);
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(FibonacciFans.prototype, "start", {
        get: function () {
            return this._start;
        },
        set: function (value) {
            if (value !== this.start) {
                this._start = wjcCore.asType(value, wjcChart.DataPoint);
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FibonacciFans.prototype, "end", {
        get: function () {
            return this._end;
        },
        set: function (value) {
            if (value !== this.end) {
                this._end = wjcCore.asType(value, wjcChart.DataPoint);
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FibonacciFans.prototype, "levels", {
        get: function () {
            return this._levels;
        },
        set: function (value) {
            if (value !== this._levels) {
                this._levels = wjcCore.asArray(value, false);
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FibonacciFans.prototype, "labelPosition", {
        get: function () {
            return this._labelPosition;
        },
        set: function (value) {
            if (value !== this.labelPosition) {
                this._labelPosition = wjcCore.asEnum(value, wjcChart.LabelPosition);
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    FibonacciFans.prototype._updateLevels = function () {
        if (!this.start || !this.end) {
            var plotter = this.chart._getPlotter(this), ax = this._getAxisX(), yvals = _super.prototype.getValues.call(this, 0), xvals = _super.prototype.getValues.call(this, 1) || plotter.dataInfo.getXVals(), xmin, xmax, ymin, ymax;
            if (yvals && yvals.length > 0) {
                ymin = wjcChartFinance._minimum(yvals);
                ymax = wjcChartFinance._maximum(yvals);
            }
            if (xvals && xvals.length > 0) {
                xmin = wjcChartFinance._minimum(xvals);
                xmax = wjcChartFinance._maximum(xvals);
            }
            else {
                xmin = ax.actualMin;
                xmax = ax.actualMax;
            }
            if (isValid(xmin) && isValid(ymin) && isValid(xmax) && isValid(ymax)) {
                this.start = new wjcChart.DataPoint(xmin, ymin);
                this.end = new wjcChart.DataPoint(xmax, ymax);
            }
        }
    };
    FibonacciFans.prototype._render = function (sender, args) {
        args.cancel = true;
        this._updateLevels();
        var startX = this._getX(0), startY = this._getY(0), endX = this._getX(1), endY = this._getY(1);
        if (_super.prototype._getLength.call(this) <= 1 || !isValid(startX) || !isValid(startY) || !isValid(endX) || !isValid(endY)) {
            return;
        }
        var ax = this._getAxisX(), ay = this._getAxisY(), si = this.chart.series.indexOf(this), engine = args.engine, swidth = 2, stroke = this._getSymbolStroke(si), lstyle = wjcChart._BasePlotter.cloneStyle(this.style, ["fill"]), tstyle = wjcChart._BasePlotter.cloneStyle(this.style, ["stroke"]);
        engine.stroke = stroke;
        engine.strokeWidth = swidth;
        engine.textFill = stroke;
        var yDiff = endY - startY, xDiff = endX - startX, clipPath = this.chart._plotrectId, x1, x2, y1, y2, pt1, pt2, cp, m, b, lvl, lbl, size, angle;
        x1 = startX;
        y1 = startY;
        x2 = endX;
        y2 = endY;
        var x = x2;
        engine.startGroup(null, clipPath);
        for (var i = 0; i < this.levels.length; i++) {
            x2 = xDiff < 0 ? ax.actualMin : ax.actualMax;
            lvl = this.levels[i] * 0.01;
            y2 = y1 + lvl * yDiff;
            m = (y2 - y1) / (x - x1);
            b = y2 - (m * x);
            y2 = m * x2 + b;
            if (yDiff > 0 && y2 > ay.actualMax) {
                y2 = ay.actualMax;
                x2 = (y2 - b) / m;
            }
            else if (yDiff < 0 && y2 < ay.actualMin) {
                y2 = ay.actualMin;
                x2 = (y2 - b) / m;
            }
            if (isValid(x1) && isValid(y1) && isValid(x2) && isValid(y2)) {
                pt1 = new wjcCore.Point(ax.convert(x1), ay.convert(y1));
                pt2 = new wjcCore.Point(ax.convert(x2), ay.convert(y2));
                engine.drawLines([pt1.x, pt2.x], [pt1.y, pt2.y], null, lstyle);
                if (this.labelPosition != wjcChart.LabelPosition.None) {
                    lbl = wjcCore.Globalize.format(lvl, "p1");
                    size = engine.measureString(lbl, null, null, tstyle);
                    angle = Math.atan((pt2.y - pt1.y) / (pt2.x - pt1.x)) * 180 / Math.PI;
                    cp = pt2.clone();
                    pt2.x = xDiff > 0 ? pt2.x - size.width : pt2.x;
                    var a = angle * Math.PI / 180, tl = new wjcCore.Point(), bl = new wjcCore.Point(), tr = new wjcCore.Point(), br = new wjcCore.Point(), ymin = ay.convert(ay.actualMin), ymax = ay.convert(ay.actualMax), xmin = ax.convert(ax.actualMin), xmax = ax.convert(ax.actualMax), limit, acp = cp.clone();
                    switch (this.labelPosition) {
                        case wjcChart.LabelPosition.Center:
                            pt2.y += size.height * 0.5;
                            acp.y += size.height * 0.5;
                            break;
                        case wjcChart.LabelPosition.Bottom:
                            pt2.y += size.height;
                            break;
                    }
                    if (xDiff > 0) {
                        if (this.labelPosition === wjcChart.LabelPosition.Top || this.labelPosition === wjcChart.LabelPosition.Center) {
                            br = acp.clone();
                            tr.x = br.x + size.height * Math.sin(a);
                            tr.y = br.y - size.height * Math.cos(a);
                            tl.x = br.x - size.width * Math.cos(a) + size.height * Math.sin(a);
                            tl.y = br.y - size.width * Math.sin(a) - size.height * Math.cos(a);
                            bl.x = br.x - size.width * Math.cos(a);
                            bl.y = br.y - size.width * Math.sin(a);
                        }
                        else if (this.labelPosition === wjcChart.LabelPosition.Bottom) {
                            tr = acp.clone();
                            tl.x = tr.x - size.width * Math.cos(a);
                            tl.y = tr.y - size.width * Math.sin(a);
                            bl.x = tl.x - size.height * Math.sin(a);
                            bl.y = tl.y + size.height * Math.cos(a);
                            br.x = tl.x + size.width * Math.cos(a) - size.height * Math.sin(a);
                            br.y = tl.y + size.width * Math.sin(a) + size.height * Math.cos(a);
                        }
                        if (yDiff > 0) {
                            if (tr.y < ymax) {
                                m = (ay.convertBack(tr.y) - ay.convertBack(tl.y)) / (ax.convertBack(tr.x) - ax.convertBack(tl.x));
                                b = ay.convertBack(tr.y) - (m * ax.convertBack(tr.x));
                                limit = ax.convert((ay.actualMax - b) / m);
                                pt2.x -= Math.abs(tr.x - limit);
                            }
                            if (br.x > xmax) {
                                pt2.x -= Math.abs(xmax - br.x);
                            }
                        }
                        else if (yDiff < 0) {
                            if (br.y > ymin) {
                                m = (ay.convertBack(bl.y) - ay.convertBack(br.y)) / (ax.convertBack(bl.x) - ax.convertBack(br.x));
                                b = ay.convertBack(br.y) - (m * ax.convertBack(br.x));
                                limit = ax.convert((ay.actualMin - b) / m);
                                pt2.x -= Math.max(Math.abs(limit - br.x), Math.abs(ymin - br.y));
                            }
                            if (tr.x > xmax) {
                                pt2.x -= Math.abs(xmax - tr.x);
                            }
                        }
                    }
                    else if (xDiff < 0) {
                        if (this.labelPosition === wjcChart.LabelPosition.Top || this.labelPosition === wjcChart.LabelPosition.Center) {
                            bl = acp.clone();
                            tl.x = bl.x + size.height * Math.sin(a);
                            tl.y = bl.y - size.height * Math.cos(a);
                            br.x = bl.x + size.width * Math.cos(a);
                            br.y = bl.y + size.width * Math.sin(a);
                            tr.x = tl.x + size.width * Math.cos(a);
                            tr.y = tl.y + size.width * Math.sin(a);
                        }
                        else if (this.labelPosition === wjcChart.LabelPosition.Bottom) {
                            tl = acp.clone();
                            tr.x = tl.x + size.width * Math.cos(a);
                            tr.y = tl.y + size.width * Math.sin(a);
                            bl.x = tl.x - size.height * Math.sin(a);
                            bl.y = tl.y + size.height * Math.cos(a);
                            br.x = tl.x + size.width * Math.cos(a) - size.height * Math.sin(a);
                            br.y = tl.y + size.width * Math.sin(a) + size.height * Math.cos(a);
                        }
                        if (yDiff > 0) {
                            if (tl.y < ymax) {
                                m = (ay.convertBack(tl.y) - ay.convertBack(tr.y)) / (ax.convertBack(tl.x) - ax.convertBack(tr.x));
                                b = ay.convertBack(tl.y) - (m * ax.convertBack(tl.x));
                                limit = ax.convert((ay.actualMax - b) / m);
                                pt2.x += Math.abs(tl.x - limit);
                            }
                            if (bl.x < xmin) {
                                pt2.x += Math.abs(xmin - bl.x);
                            }
                        }
                        else if (yDiff < 0) {
                            if (bl.y > ymin) {
                                m = (ay.convertBack(br.y) - ay.convertBack(bl.y)) / (ax.convertBack(br.x) - ax.convertBack(bl.x));
                                b = ay.convertBack(bl.y) - (m * ax.convertBack(bl.x));
                                limit = ax.convert((ay.actualMin - b) / m);
                                pt2.x += Math.max(Math.abs(limit - bl.x), Math.abs(ymin - bl.y));
                            }
                            if (tl.x < xmin) {
                                pt2.x += Math.abs(xmin - tl.x);
                            }
                        }
                    }
                    if (angle === 0) {
                        engine.drawString(lbl, pt2, null, tstyle);
                    }
                    else {
                        engine.drawStringRotated(lbl, pt2, cp, angle, null, tstyle);
                    }
                }
            }
        }
        engine.stroke = null;
        engine.strokeWidth = null;
        engine.textFill = null;
        engine.endGroup();
    };
    FibonacciFans.prototype._getX = function (dim) {
        var retval = null;
        if (dim === 0 && this.start) {
            retval = this.start.x;
        }
        else if (dim === 1 && this.end) {
            retval = this.end.x;
        }
        if (wjcCore.isDate(retval)) {
            retval = wjcCore.asDate(retval).valueOf();
        }
        return retval;
    };
    FibonacciFans.prototype._getY = function (dim) {
        var retval = null;
        if (dim === 0 && this.start) {
            retval = this.start.y;
        }
        else if (dim === 1 && this.end) {
            retval = this.end.y;
        }
        return retval;
    };
    FibonacciFans.prototype._getChartType = function () {
        return wjcChart.ChartType.Line;
    };
    return FibonacciFans;
}(wjcChart.SeriesBase));
exports.FibonacciFans = FibonacciFans;
var FibonacciTimeZones = (function (_super) {
    __extends(FibonacciTimeZones, _super);
    function FibonacciTimeZones(options) {
        var _this = _super.call(this) || this;
        _this._levels = [0, 1, 2, 3, 5, 8, 13, 21, 34];
        _this._labelPosition = wjcChart.LabelPosition.Right;
        _this.rendering.addHandler(_this._render, _this);
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(FibonacciTimeZones.prototype, "startX", {
        get: function () {
            return this._startX;
        },
        set: function (value) {
            if (value !== this.startX) {
                if (wjcCore.isDate(value)) {
                    this._startX = wjcCore.asDate(value);
                }
                else {
                    this._startX = wjcCore.asNumber(value);
                }
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FibonacciTimeZones.prototype, "endX", {
        get: function () {
            return this._endX;
        },
        set: function (value) {
            if (value !== this.endX) {
                if (wjcCore.isDate(value)) {
                    this._endX = wjcCore.asDate(value);
                }
                else {
                    this._endX = wjcCore.asNumber(value);
                }
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FibonacciTimeZones.prototype, "levels", {
        get: function () {
            return this._levels;
        },
        set: function (value) {
            if (value !== this._levels) {
                this._levels = wjcCore.asArray(value, false);
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FibonacciTimeZones.prototype, "labelPosition", {
        get: function () {
            return this._labelPosition;
        },
        set: function (value) {
            if (value !== this.labelPosition) {
                this._labelPosition = wjcCore.asEnum(value, wjcChart.LabelPosition);
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    FibonacciTimeZones.prototype._render = function (sender, args) {
        args.cancel = true;
        this._updateLevels();
        var start = this._getX(0), end = this._getX(1);
        if (_super.prototype._getLength.call(this) <= 1 || !isValid(start) || !isValid(end)) {
            return;
        }
        var diff = end - start, ax = this._getAxisX(), ay = this._getAxisY(), si = this._chart.series.indexOf(this), engine = args.engine, swidth = 2, stroke = this._getSymbolStroke(si), lstyle = wjcChart._BasePlotter.cloneStyle(this.style, ["fill"]), tstyle = wjcChart._BasePlotter.cloneStyle(this.style, ["stroke"]), ymin = ay.convert(ay.actualMin), ymax = ay.convert(ay.actualMax), lvl, x, size, lbl, clipPath = this.chart._plotrectId;
        engine.stroke = stroke;
        engine.strokeWidth = swidth;
        engine.textFill = stroke;
        if (diff === 0) {
            return;
        }
        engine.startGroup(null, clipPath);
        for (var i = 0; i < this.levels.length; i++) {
            lvl = this.levels[i];
            x = diff * lvl + start;
            if (x < ax.actualMin || ax.actualMax < x || !isValid(x)) {
                continue;
            }
            x = ax.convert(x);
            engine.drawLine(x, ymin, x, ymax, null, lstyle);
            if (this.labelPosition !== wjcChart.LabelPosition.None) {
                lbl = wjcCore.Globalize.format(lvl, "n0");
                size = engine.measureString(lbl, null, null, tstyle);
                switch (this.labelPosition) {
                    case wjcChart.LabelPosition.Left:
                        x -= size.width + swidth;
                        break;
                    case wjcChart.LabelPosition.Center:
                        x -= size.width / 2;
                        break;
                    case wjcChart.LabelPosition.Right:
                        x += swidth;
                        break;
                    default:
                        x = diff < 0 ? x - size.width - swidth : x + swidth;
                        break;
                }
                engine.drawString(lbl, new wjcCore.Point(x, ymin), null, tstyle);
            }
        }
        engine.stroke = null;
        engine.strokeWidth = null;
        engine.textFill = null;
        engine.endGroup();
    };
    FibonacciTimeZones.prototype._updateLevels = function () {
        var plotter = this.chart._getPlotter(this), xvals = _super.prototype.getValues.call(this, 1) || plotter.dataInfo.getXVals();
        if (_super.prototype._getLength.call(this) <= 1) {
            return;
        }
        var start = this._getX(0), end = this._getX(1), defined = wjcCore.isNumber(start) && wjcCore.isNumber(end);
        if (!defined && !xvals) {
            this._startX = 0;
            this._endX = 1;
        }
        else if (!defined && xvals) {
            this._startX = xvals[0];
            this._endX = xvals[1];
        }
    };
    FibonacciTimeZones.prototype._getX = function (dim) {
        var retval = null;
        if (dim === 0) {
            retval = this.startX;
        }
        else if (dim === 1) {
            retval = this.endX;
        }
        if (wjcCore.isDate(retval)) {
            retval = wjcCore.asDate(retval).valueOf();
        }
        return retval;
    };
    FibonacciTimeZones.prototype._getChartType = function () {
        return wjcChart.ChartType.Line;
    };
    return FibonacciTimeZones;
}(wjcChart.SeriesBase));
exports.FibonacciTimeZones = FibonacciTimeZones;
"use strict";
var OverlayIndicatorBase = (function (_super) {
    __extends(OverlayIndicatorBase, _super);
    function OverlayIndicatorBase(options) {
        var _this = _super.call(this, options) || this;
        _this._seriesCount = 1;
        return _this;
    }
    Object.defineProperty(OverlayIndicatorBase.prototype, "_hitTester", {
        get: function () {
            if (this._plotter && !this.__hitTester) {
                this.__hitTester = this._plotter.hitTester;
            }
            return this.__hitTester;
        },
        enumerable: true,
        configurable: true
    });
    OverlayIndicatorBase.prototype._getChartType = function () {
        return wjcChart.ChartType.Line;
    };
    OverlayIndicatorBase.prototype._getXValues = function () {
        return (_super.prototype.getValues.call(this, 1) || this._plotter.dataInfo.getXVals());
    };
    OverlayIndicatorBase.prototype._getDataPoint = function (dataX, dataY, seriesIndex, pointIndex, ax, ay) {
        var dpt = new wjcChart._DataPoint(seriesIndex, pointIndex, dataX, dataY);
        dpt["y"] = dataY;
        dpt["yfmt"] = ay._formatValue(dataY);
        dpt["x"] = dataX;
        dpt["xfmt"] = ax._formatValue(dataX);
        return dpt;
    };
    OverlayIndicatorBase.prototype._shouldCalculate = function () { return true; };
    OverlayIndicatorBase.prototype._init = function () { };
    OverlayIndicatorBase.prototype._calculate = function () { };
    OverlayIndicatorBase.prototype._clearValues = function () {
        _super.prototype._clearValues.call(this);
        this.__hitTester = null;
    };
    OverlayIndicatorBase.prototype._getName = function (dim) {
        var retval = undefined;
        if (this.name) {
            if (this.name.indexOf(",")) {
                var names = this.name.split(",");
                if (names && names.length - 1 >= dim) {
                    retval = names[dim].trim();
                }
            }
            else {
                retval = this.name;
            }
        }
        return retval;
    };
    OverlayIndicatorBase.prototype._getStyles = function (dim) {
        var retval = null;
        if (dim < 0 || this._styles === null) {
            return retval;
        }
        var i = 0;
        for (var key in this._styles) {
            if (i === dim && this._styles.hasOwnProperty(key)) {
                retval = this._styles[key];
                break;
            }
            i++;
        }
        return retval;
    };
    OverlayIndicatorBase.prototype.legendItemLength = function () {
        return this._seriesCount;
    };
    OverlayIndicatorBase.prototype.measureLegendItem = function (engine, index) {
        var name = this._getName(index), retval = new wjcCore.Size(0, 0);
        if (name) {
            retval = this._measureLegendItem(engine, this._getName(index));
        }
        return retval;
    };
    OverlayIndicatorBase.prototype.drawLegendItem = function (engine, rect, index) {
        var style = this._getStyles(index) || this.style, name = this._getName(index);
        if (name) {
            this._drawLegendItem(engine, rect, this._getChartType(), this._getName(index), style, this.symbolStyle);
        }
    };
    return OverlayIndicatorBase;
}(wjcChart.SeriesBase));
exports.OverlayIndicatorBase = OverlayIndicatorBase;
var SingleOverlayIndicatorBase = (function (_super) {
    __extends(SingleOverlayIndicatorBase, _super);
    function SingleOverlayIndicatorBase(options) {
        var _this = _super.call(this, options) || this;
        _this._period = 14;
        return _this;
    }
    Object.defineProperty(SingleOverlayIndicatorBase.prototype, "period", {
        get: function () {
            return this._period;
        },
        set: function (value) {
            if (value !== this._period) {
                this._period = wjcCore.asInt(value, false, true);
                this._clearValues();
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    SingleOverlayIndicatorBase.prototype.getValues = function (dim) {
        var retval = null;
        if (_super.prototype._getLength.call(this) <= 0) {
            return retval;
        }
        else if (this._shouldCalculate()) {
            this._init();
            this._calculate();
        }
        if (dim === 0) {
            retval = this._yvals;
        }
        else if (dim === 1) {
            retval = this._xvals;
        }
        return retval;
    };
    SingleOverlayIndicatorBase.prototype.getDataRect = function (currentRect, calculatedRect) {
        if (calculatedRect) {
            return calculatedRect;
        }
        var rect = null;
        if (_super.prototype._getLength.call(this) <= 0) {
            return rect;
        }
        else if (this._shouldCalculate()) {
            this._init();
            this._calculate();
        }
        var xmin = wjcChartFinance._minimum(this._xvals), xmax = wjcChartFinance._maximum(this._xvals), ymin = wjcChartFinance._minimum(this._yvals), ymax = wjcChartFinance._maximum(this._yvals);
        if (wjcChart._DataInfo.isValid(xmin) && wjcChart._DataInfo.isValid(xmax) && wjcChart._DataInfo.isValid(ymin) && wjcChart._DataInfo.isValid(ymax)) {
            rect = new wjcCore.Rect(xmin, ymin, xmax - xmin, ymax - ymin);
        }
        return rect;
    };
    SingleOverlayIndicatorBase.prototype._clearValues = function () {
        _super.prototype._clearValues.call(this);
        this._xvals = null;
        this._yvals = null;
    };
    SingleOverlayIndicatorBase.prototype._shouldCalculate = function () {
        return !this._yvals || !this._xvals;
    };
    SingleOverlayIndicatorBase.prototype._init = function () {
        _super.prototype._init.call(this);
        this._yvals = [];
        this._xvals = [];
    };
    SingleOverlayIndicatorBase.prototype._getItem = function (pointIndex) {
        if (_super.prototype._getLength.call(this) <= 0) {
            return _super.prototype._getItem.call(this, pointIndex);
        }
        else if (this._shouldCalculate()) {
            this._init();
            this._calculate();
        }
        var originalLen = _super.prototype._getLength.call(this), len = wjcChartFinance._minimum(this._yvals.length, this._xvals.length);
        pointIndex = originalLen - len + pointIndex;
        return _super.prototype._getItem.call(this, pointIndex);
    };
    return SingleOverlayIndicatorBase;
}(OverlayIndicatorBase));
exports.SingleOverlayIndicatorBase = SingleOverlayIndicatorBase;
"use strict";
var ATR = (function (_super) {
    __extends(ATR, _super);
    function ATR(options) {
        var _this = _super.call(this) || this;
        _this.period = 14;
        _this.initialize(options);
        return _this;
    }
    ATR.prototype._calculate = function () {
        if (_super.prototype._getLength.call(this) <= 0) {
            return;
        }
        var highs = _super.prototype._getBindingValues.call(this, 0), lows = _super.prototype._getBindingValues.call(this, 1), closes = _super.prototype._getBindingValues.call(this, 3), xs = this._getXValues();
        this._yvals = wjcChartFinance._avgTrueRng(highs, lows, closes, this.period);
        this._xvals = xs ? xs.slice(this.period - 1) : wjcChartFinance._range(this.period - 1, highs.length);
    };
    return ATR;
}(SingleOverlayIndicatorBase));
exports.ATR = ATR;
"use strict";
var CCI = (function (_super) {
    __extends(CCI, _super);
    function CCI(options) {
        var _this = _super.call(this) || this;
        _this._constant = 0.015;
        _this.period = 20;
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(CCI.prototype, "constant", {
        get: function () {
            return this._constant;
        },
        set: function (value) {
            if (value !== this._constant) {
                this._constant = wjcCore.asNumber(value, false);
                this._clearValues();
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    CCI.prototype._calculate = function () {
        var originalLen = _super.prototype._getLength.call(this);
        if (originalLen <= 0) {
            return;
        }
        var highs = _super.prototype._getBindingValues.call(this, 0), lows = _super.prototype._getBindingValues.call(this, 1), closes = _super.prototype._getBindingValues.call(this, 3), xs = this._getXValues();
        this._yvals = _cci(highs, lows, closes, this.period, this.constant);
        this._xvals = xs ? xs.slice(this.period - 1) : wjcChartFinance._range(this.period - 1, originalLen - 1);
    };
    return CCI;
}(SingleOverlayIndicatorBase));
exports.CCI = CCI;
function _cci(highs, lows, closes, period, constant) {
    wjcCore.asArray(highs, false);
    wjcCore.asArray(lows, false);
    wjcCore.asArray(closes, false);
    wjcCore.asInt(period, false, true);
    wjcCore.asNumber(constant, false, true);
    var len = wjcChartFinance._minimum(highs.length, lows.length, closes.length), typicalPrices = [], meanDeviations = [], smas, i, ccis = [];
    wjcCore.assert(len > period && period > 1, "CCI period must be an integer less than the length of the data and greater than one.");
    for (i = 0; i < len; i++) {
        typicalPrices.push(wjcChartFinance._average(highs[i], lows[i], closes[i]));
    }
    smas = wjcChartFinance._sma(typicalPrices, period);
    var temp;
    for (i = 0; i < smas.length; i++) {
        temp = typicalPrices.slice(i, period + i)
            .reduce(function (prev, curr) { return prev + Math.abs(smas[i] - curr); }, 0);
        meanDeviations.push(temp / period);
    }
    typicalPrices.splice(0, period - 1);
    for (i = 0; i < smas.length; i++) {
        ccis.push((typicalPrices[i] - smas[i]) / (constant * meanDeviations[i]));
    }
    return ccis;
}
exports._cci = _cci;
"use strict";
var WilliamsR = (function (_super) {
    __extends(WilliamsR, _super);
    function WilliamsR(options) {
        var _this = _super.call(this) || this;
        _this.period = 14;
        _this.initialize(options);
        return _this;
    }
    WilliamsR.prototype._calculate = function () {
        var originalLen = _super.prototype._getLength.call(this);
        if (originalLen <= 0) {
            return;
        }
        var highs = _super.prototype._getBindingValues.call(this, 0), lows = _super.prototype._getBindingValues.call(this, 1), closes = _super.prototype._getBindingValues.call(this, 3), xs = this._getXValues();
        this._yvals = _williamsR(highs, lows, closes, this.period);
        this._xvals = xs ? xs.slice(this.period - 1) : wjcChartFinance._range(this.period - 1, originalLen - 1);
    };
    return WilliamsR;
}(SingleOverlayIndicatorBase));
exports.WilliamsR = WilliamsR;
function _williamsR(highs, lows, closes, period) {
    wjcCore.asArray(highs, false);
    wjcCore.asArray(lows, false);
    wjcCore.asArray(closes, false);
    wjcCore.asInt(period, false, true);
    var len = wjcChartFinance._minimum(highs.length, lows.length, closes.length), extremeHighs = [], extremeLows = [], williamsRs = [], i;
    wjcCore.assert(len > period && period > 1, "Williams %R period must be an integer less than the length of the data and greater than one.");
    for (i = period; i <= highs.length; i++) {
        extremeHighs.push(wjcChartFinance._maximum(highs.slice(i - period, i)));
        extremeLows.push(wjcChartFinance._minimum(lows.slice(i - period, i)));
    }
    closes.splice(0, period - 1);
    for (i = 0; i < extremeHighs.length; i++) {
        williamsRs.push((extremeHighs[i] - closes[i]) / (extremeHighs[i] - extremeLows[i]) * -100);
    }
    return williamsRs;
}
exports._williamsR = _williamsR;
"use strict";
var MovingAverageType;
(function (MovingAverageType) {
    MovingAverageType[MovingAverageType["Simple"] = 0] = "Simple";
    MovingAverageType[MovingAverageType["Exponential"] = 1] = "Exponential";
})(MovingAverageType = exports.MovingAverageType || (exports.MovingAverageType = {}));
var Envelopes = (function (_super) {
    __extends(Envelopes, _super);
    function Envelopes(options) {
        var _this = _super.call(this) || this;
        _this._period = 20;
        _this._type = MovingAverageType.Simple;
        _this._size = 0.025;
        _this.rendering.addHandler(_this._rendering, _this);
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(Envelopes.prototype, "period", {
        get: function () {
            return this._period;
        },
        set: function (value) {
            if (value !== this._period) {
                this._period = wjcCore.asInt(value, false, true);
                this._clearValues();
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Envelopes.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            if (value !== this._type) {
                this._type = wjcCore.asEnum(value, MovingAverageType, false);
                this._clearValues();
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Envelopes.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (value) {
            if (value !== this._size) {
                this._size = wjcCore.asNumber(value, false, true);
                this._clearValues();
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Envelopes.prototype.getDataRect = function (currentRect, calculatedRect) {
        if (calculatedRect) {
            return calculatedRect;
        }
        var rect = null;
        if (_super.prototype._getLength.call(this) <= 0) {
            return rect;
        }
        else if (this._shouldCalculate()) {
            this._init();
            this._calculate();
        }
        var ys = this._upperYVals.concat(this._lowerYVals), xmin = wjcChartFinance._minimum(this._xVals), xmax = wjcChartFinance._maximum(this._xVals), ymin = wjcChartFinance._minimum(ys), ymax = wjcChartFinance._maximum(ys);
        if (wjcChart._DataInfo.isValid(xmin) && wjcChart._DataInfo.isValid(xmax) && wjcChart._DataInfo.isValid(ymin) && wjcChart._DataInfo.isValid(ymax)) {
            rect = new wjcCore.Rect(xmin, ymin, xmax - xmin, ymax - ymin);
        }
        return rect;
    };
    Envelopes.prototype._clearValues = function () {
        _super.prototype._clearValues.call(this);
        this._upperYVals = null;
        this._lowerYVals = null;
        this._xVals = null;
    };
    Envelopes.prototype._init = function () {
        _super.prototype._init.call(this);
        this._upperYVals = [];
        this._lowerYVals = [];
        this._xVals = [];
    };
    Envelopes.prototype._shouldCalculate = function () {
        return !this._upperYVals || !this._lowerYVals || !this._xVals;
    };
    Envelopes.prototype._calculate = function () {
        var _this = this;
        if (_super.prototype._getLength.call(this) <= 0) {
            return;
        }
        var ys = _super.prototype.getValues.call(this, 0), xs = this._getXValues(), avgs;
        switch (this.type) {
            case MovingAverageType.Exponential:
                avgs = wjcChartFinance._ema(ys, this.period);
                break;
            case MovingAverageType.Simple:
            default:
                avgs = wjcChartFinance._sma(ys, this.period);
                break;
        }
        this._xVals = xs ? xs.slice(this.period - 1) : wjcChartFinance._range(this.period - 1, _super.prototype._getLength.call(this) - 1);
        this._upperYVals = avgs.map(function (value) { return value + (value * _this.size); });
        this._lowerYVals = avgs.map(function (value) { return value - (value * _this.size); });
    };
    Envelopes.prototype._rendering = function (sender, args) {
        args.cancel = true;
        if (_super.prototype._getLength.call(this) <= 0) {
            return;
        }
        else if (this._shouldCalculate()) {
            this._init();
            this._calculate();
        }
        var si = this.chart.series.indexOf(this), engine = args.engine, ax = this._getAxisX(), ay = this._getAxisY(), len = wjcChartFinance._minimum(this._upperYVals.length, this._lowerYVals.length, this._xVals.length), style = wjcChart._BasePlotter.cloneStyle(this.style, ["fill"]), stroke = this._getSymbolStroke(si), clipPath = this.chart._plotrectId, swidth = 2;
        if (!len || len <= 0) {
            return;
        }
        engine.stroke = stroke;
        engine.strokeWidth = swidth;
        var xs = [], uys = [], lys = [], originalLen = this._getLength(), dpt, area, di;
        for (var i = 0; i < len; i++) {
            di = originalLen - len + i;
            xs.push(ax.convert(this._xVals[i]));
            uys.push(ay.convert(this._upperYVals[i]));
            dpt = this._getDataPoint(this._xVals[i], this._upperYVals[i], si, di, ax, ay);
            area = new wjcChart._CircleArea(new wjcCore.Point(xs[i], uys[i]), 0.5 * engine.strokeWidth);
            area.tag = dpt;
            this._hitTester.add(area, si);
            lys.push(ay.convert(this._lowerYVals[i]));
            dpt = this._getDataPoint(this._xVals[i], this._lowerYVals[i], si, di, ax, ay);
            area = new wjcChart._CircleArea(new wjcCore.Point(xs[i], lys[i]), 0.5 * engine.strokeWidth);
            area.tag = dpt;
            this._hitTester.add(area, si);
        }
        this._hitTester.add(new wjcChart._LinesArea(xs, uys), si);
        this._hitTester.add(new wjcChart._LinesArea(xs, lys), si);
        engine.drawLines(xs, uys, null, style, clipPath);
        engine.drawLines(xs, lys, null, style, clipPath);
    };
    Envelopes.prototype.getCalculatedValues = function (key) {
        key = wjcCore.asString(key, false);
        var retval = [], i = 0;
        if (_super.prototype._getLength.call(this) <= 0) {
            return retval;
        }
        else if (this._shouldCalculate()) {
            this._init();
            this._calculate();
        }
        switch (key) {
            case "upperEnvelope":
                for (; i < this._upperYVals.length; i++) {
                    retval.push({
                        x: this._xVals[i],
                        y: this._upperYVals[i]
                    });
                }
                break;
            case "lowerEnvelope":
                for (; i < this._lowerYVals.length; i++) {
                    retval.push({
                        x: this._xVals[i],
                        y: this._lowerYVals[i]
                    });
                }
                break;
        }
        return retval;
    };
    return Envelopes;
}(OverlayIndicatorBase));
exports.Envelopes = Envelopes;
"use strict";
var BollingerBands = (function (_super) {
    __extends(BollingerBands, _super);
    function BollingerBands(options) {
        var _this = _super.call(this) || this;
        _this._period = 20;
        _this._multiplier = 2;
        _this.rendering.addHandler(_this._rendering, _this);
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(BollingerBands.prototype, "period", {
        get: function () {
            return this._period;
        },
        set: function (value) {
            if (value !== this._period) {
                this._period = wjcCore.asInt(value, false, true);
                this._clearValues();
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BollingerBands.prototype, "multiplier", {
        get: function () {
            return this._multiplier;
        },
        set: function (value) {
            if (value !== this._multiplier) {
                this._multiplier = wjcCore.asNumber(value, false, true);
                this._clearValues();
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    BollingerBands.prototype.getDataRect = function (currentRect, calculatedRect) {
        if (calculatedRect) {
            return calculatedRect;
        }
        if (_super.prototype._getLength.call(this) <= 0) {
            return null;
        }
        else if (this._shouldCalculate()) {
            this._init();
            this._calculate();
        }
        var ys = this._upperYVals.concat(this._lowerYVals), xmin = wjcChartFinance._minimum(this._xVals), xmax = wjcChartFinance._maximum(this._xVals), ymin = wjcChartFinance._minimum(ys), ymax = wjcChartFinance._maximum(ys);
        if (wjcChart._DataInfo.isValid(xmin) && wjcChart._DataInfo.isValid(xmax) && wjcChart._DataInfo.isValid(ymin) && wjcChart._DataInfo.isValid(ymax)) {
            return new wjcCore.Rect(xmin, ymin, xmax - xmin, ymax - ymin);
        }
        else {
            return null;
        }
    };
    BollingerBands.prototype._clearValues = function () {
        _super.prototype._clearValues.call(this);
        this._upperYVals = null;
        this._middleYVals = null;
        this._lowerYVals = null;
        this._xVals = null;
    };
    BollingerBands.prototype._shouldCalculate = function () {
        return !this._upperYVals || !this._middleYVals || !this._lowerYVals || !this._xVals;
    };
    BollingerBands.prototype._init = function () {
        _super.prototype._init.call(this);
        this._upperYVals = [];
        this._middleYVals = [];
        this._lowerYVals = [];
        this._xVals = [];
    };
    BollingerBands.prototype._calculate = function () {
        var originalLen = _super.prototype._getLength.call(this);
        if (originalLen <= 0) {
            return;
        }
        var ys = _super.prototype.getValues.call(this, 0), xs = this._getXValues();
        var values = _bollingerBands(ys, this.period, this.multiplier);
        this._upperYVals = values.uppers;
        this._middleYVals = values.middles;
        this._lowerYVals = values.lowers;
        this._xVals = xs ? xs.slice(this.period - 1) : wjcChartFinance._range(this.period - 1, originalLen - 1);
    };
    BollingerBands.prototype._rendering = function (sender, args) {
        args.cancel = true;
        if (_super.prototype._getLength.call(this) <= 0) {
            return;
        }
        else if (this._shouldCalculate()) {
            this._init();
            this._calculate();
        }
        var si = this.chart.series.indexOf(this), engine = args.engine, ax = this._getAxisX(), ay = this._getAxisY(), len = wjcChartFinance._minimum(this._upperYVals.length, this._middleYVals.length, this._lowerYVals.length, this._xVals.length), style = wjcChart._BasePlotter.cloneStyle(this.style, ["fill"]), stroke = this._getSymbolStroke(si), clipPath = this.chart._plotrectId, swidth = 2;
        if (!len || len <= 0) {
            return;
        }
        engine.stroke = stroke;
        engine.strokeWidth = swidth;
        var xs = [], uys = [], mys = [], lys = [], originalLen = this._getLength(), dpt, area, di;
        for (var i = 0; i < len; i++) {
            di = originalLen - len + i;
            xs.push(ax.convert(this._xVals[i]));
            uys.push(ay.convert(this._upperYVals[i]));
            dpt = this._getDataPoint(this._xVals[i], this._upperYVals[i], si, di, ax, ay);
            area = new wjcChart._CircleArea(new wjcCore.Point(xs[i], uys[i]), 0.5 * engine.strokeWidth);
            area.tag = dpt;
            this._hitTester.add(area, si);
            mys.push(ay.convert(this._middleYVals[i]));
            dpt = this._getDataPoint(this._xVals[i], this._middleYVals[i], si, di, ax, ay);
            area = new wjcChart._CircleArea(new wjcCore.Point(xs[i], mys[i]), 0.5 * engine.strokeWidth);
            area.tag = dpt;
            this._hitTester.add(area, si);
            lys.push(ay.convert(this._lowerYVals[i]));
            dpt = this._getDataPoint(this._xVals[i], this._lowerYVals[i], si, di, ax, ay);
            area = new wjcChart._CircleArea(new wjcCore.Point(xs[i], lys[i]), 0.5 * engine.strokeWidth);
            area.tag = dpt;
            this._hitTester.add(area, si);
        }
        this._hitTester.add(new wjcChart._LinesArea(xs, uys), si);
        this._hitTester.add(new wjcChart._LinesArea(xs, mys), si);
        this._hitTester.add(new wjcChart._LinesArea(xs, lys), si);
        engine.drawLines(xs, uys, null, style, clipPath);
        engine.drawLines(xs, mys, null, style, clipPath);
        engine.drawLines(xs, lys, null, style, clipPath);
    };
    BollingerBands.prototype.getCalculatedValues = function (key) {
        key = wjcCore.asString(key, false);
        var retval = [], i = 0;
        if (_super.prototype._getLength.call(this) <= 0) {
            return retval;
        }
        else if (this._shouldCalculate()) {
            this._init();
            this._calculate();
        }
        switch (key) {
            case "upperBand":
                for (; i < this._upperYVals.length; i++) {
                    retval.push({
                        x: this._xVals[i],
                        y: this._upperYVals[i]
                    });
                }
                break;
            case "middleBand":
                for (; i < this._middleYVals.length; i++) {
                    retval.push({
                        x: this._xVals[i],
                        y: this._middleYVals[i]
                    });
                }
                break;
            case "lowerBand":
                for (; i < this._lowerYVals.length; i++) {
                    retval.push({
                        x: this._xVals[i],
                        y: this._lowerYVals[i]
                    });
                }
                break;
        }
        return retval;
    };
    return BollingerBands;
}(OverlayIndicatorBase));
exports.BollingerBands = BollingerBands;
function _bollingerBands(ys, period, multiplier) {
    wjcCore.asArray(ys, false);
    wjcCore.asInt(period, false, true);
    wjcCore.asNumber(multiplier, false, true);
    wjcCore.assert(ys.length > period && period > 1, "Bollinger Bands period must be an integer less than the length of the data and greater than one.");
    var avgs = wjcChartFinance._sma(ys, period), devs = [], i;
    for (i = period; i <= ys.length; i++) {
        devs.push(wjcChartFinance._stdDeviation(ys.slice(i - period, i)));
    }
    var middles = avgs, uppers = avgs.map(function (value, index) { return value + (devs[index] * multiplier); }), lowers = avgs.map(function (value, index) { return value - (devs[index] * multiplier); });
    return {
        lowers: lowers,
        middles: middles,
        uppers: uppers
    };
}
exports._bollingerBands = _bollingerBands;
"use strict";
var RSI = (function (_super) {
    __extends(RSI, _super);
    function RSI(options) {
        var _this = _super.call(this) || this;
        _this.period = 14;
        _this.initialize(options);
        return _this;
    }
    RSI.prototype._calculate = function () {
        var originalLen = _super.prototype._getLength.call(this);
        if (originalLen <= 0) {
            return;
        }
        var ys = _super.prototype._getBindingValues.call(this, 0), xs = this._getXValues();
        this._yvals = _rsi(ys, this.period);
        this._xvals = xs ? xs.slice(this.period) : wjcChartFinance._range(this.period, originalLen);
    };
    return RSI;
}(SingleOverlayIndicatorBase));
exports.RSI = RSI;
function _rsi(ys, period) {
    wjcCore.asArray(ys, false);
    wjcCore.asInt(period, true, false);
    wjcCore.assert(ys.length > period && period > 1, "RSI period must be an integer less than the length of the data and greater than one.");
    var changes = [], avgGains = [], avgLosses = [], gains, losses, rsis = [], rs, i;
    for (i = 1; i < ys.length; i++) {
        changes.push(ys[i] - ys[i - 1]);
    }
    gains = changes.map(function (value) { return value > 0 ? value : 0; });
    losses = changes.map(function (value) { return value < 0 ? Math.abs(value) : 0; });
    for (i = period; i <= changes.length; i++) {
        if (i === period) {
            avgGains.push(wjcChartFinance._sum(gains.slice(i - period, i)) / period);
            avgLosses.push(wjcChartFinance._sum(losses.slice(i - period, i)) / period);
        }
        else {
            avgGains.push((gains[i - 1] + (avgGains[i - period - 1] * (period - 1))) / period);
            avgLosses.push((losses[i - 1] + (avgLosses[i - period - 1] * (period - 1))) / period);
        }
        rs = avgGains[i - period] / avgLosses[i - period];
        rs = isFinite(rs) ? rs : 0;
        rsis.push(100 - (100 / (1 + rs)));
    }
    return rsis;
}
exports._rsi = _rsi;
"use strict";
var MacdBase = (function (_super) {
    __extends(MacdBase, _super);
    function MacdBase(options) {
        var _this = _super.call(this, options) || this;
        _this._fastPeriod = 12;
        _this._slowPeriod = 26;
        _this._smoothingPeriod = 9;
        return _this;
    }
    Object.defineProperty(MacdBase.prototype, "fastPeriod", {
        get: function () {
            return this._fastPeriod;
        },
        set: function (value) {
            if (value !== this._fastPeriod) {
                this._fastPeriod = wjcCore.asInt(value, false, true);
                this._clearValues();
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MacdBase.prototype, "slowPeriod", {
        get: function () {
            return this._slowPeriod;
        },
        set: function (value) {
            if (value !== this._slowPeriod) {
                this._slowPeriod = wjcCore.asInt(value, false, true);
                this._clearValues();
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MacdBase.prototype, "smoothingPeriod", {
        get: function () {
            return this._smoothingPeriod;
        },
        set: function (value) {
            if (value !== this._smoothingPeriod) {
                this._smoothingPeriod = wjcCore.asInt(value, false, true);
                this._clearValues();
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    MacdBase.prototype._clearValues = function () {
        _super.prototype._clearValues.call(this);
        this._macdVals = null;
        this._macdXVals = null;
        this._signalVals = null;
        this._signalXVals = null;
        this._histogramVals = null;
        this._histogramXVals = null;
    };
    MacdBase.prototype._shouldCalculate = function () {
        return !this._macdVals || !this._macdXVals ||
            !this._signalVals || !this._signalXVals ||
            !this._histogramVals || !this._histogramXVals;
    };
    MacdBase.prototype._init = function () {
        _super.prototype._init.call(this);
        this._macdVals = [];
        this._macdXVals = [];
        this._signalVals = [];
        this._signalXVals = [];
        this._histogramVals = [];
        this._histogramXVals = [];
    };
    MacdBase.prototype._calculate = function () {
        var originalLen = _super.prototype._getLength.call(this);
        if (originalLen <= 0) {
            return;
        }
        var ys = _super.prototype.getValues.call(this, 0), xs = this._getXValues();
        var values = _macd(ys, this.fastPeriod, this.slowPeriod, this.smoothingPeriod);
        this._macdVals = values.macds;
        this._signalVals = values.signals;
        this._histogramVals = values.histograms;
        this._macdXVals = xs ? xs.slice(originalLen - this._macdVals.length, originalLen) : wjcChartFinance._range(originalLen - this._macdVals.length, originalLen - 1);
        this._signalXVals = xs ? xs.slice(originalLen - this._signalVals.length, originalLen) : wjcChartFinance._range(originalLen - this._signalVals.length, originalLen - 1);
        this._histogramXVals = xs ? xs.slice(originalLen - this._histogramVals.length, originalLen) : wjcChartFinance._range(originalLen - this._histogramVals.length, originalLen - 1);
    };
    return MacdBase;
}(OverlayIndicatorBase));
exports.MacdBase = MacdBase;
var Macd = (function (_super) {
    __extends(Macd, _super);
    function Macd(options) {
        var _this = _super.call(this) || this;
        _this._seriesCount = 2;
        _this.rendering.addHandler(_this._rendering, _this);
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(Macd.prototype, "styles", {
        get: function () {
            return this._styles;
        },
        set: function (value) {
            if (value !== this._styles) {
                this._styles = value;
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Macd.prototype.getDataRect = function (currentRect, calculatedRect) {
        if (calculatedRect) {
            return calculatedRect;
        }
        var rect = null;
        if (_super.prototype._getLength.call(this) <= 0) {
            return rect;
        }
        else if (this._shouldCalculate()) {
            this._init();
            this._calculate();
        }
        var ys = [], xs = [];
        xs.push.apply(xs, this._macdXVals);
        xs.push.apply(xs, this._signalXVals);
        ys.push.apply(ys, this._macdVals);
        ys.push.apply(ys, this._signalVals);
        var xmin = wjcChartFinance._minimum(xs), xmax = wjcChartFinance._maximum(xs), ymin = wjcChartFinance._minimum(ys), ymax = wjcChartFinance._maximum(ys);
        if (wjcChart._DataInfo.isValid(xmin) && wjcChart._DataInfo.isValid(xmax) && wjcChart._DataInfo.isValid(ymin) && wjcChart._DataInfo.isValid(ymax)) {
            rect = new wjcCore.Rect(xmin, ymin, xmax - xmin, ymax - ymin);
        }
        return rect;
    };
    Macd.prototype._rendering = function (sender, args) {
        args.cancel = true;
        if (_super.prototype._getLength.call(this) <= 0) {
            return;
        }
        else if (this._shouldCalculate()) {
            this._init();
            this._calculate();
        }
        var si = this.chart.series.indexOf(this), engine = args.engine, ax = this._getAxisX(), ay = this._getAxisY(), style = wjcChart._BasePlotter.cloneStyle(this.style, ["fill"]), stroke = this._getSymbolStroke(si), clipPath = this.chart._plotrectId, swidth = 2, macdStyle = null, macdStroke = stroke, macdStrokeWidth = swidth, signalStyle = null, signalStroke = stroke, signalStrokeWidth = swidth;
        if (this.styles && wjcCore.isObject(this.styles)) {
            if (this.styles.macdLine && wjcCore.isObject(this.styles.macdLine)) {
                macdStyle = wjcChart._BasePlotter.cloneStyle(this.styles.macdLine, ["fill"]);
                macdStroke = macdStyle.stroke ? macdStyle.stroke : stroke;
                macdStrokeWidth = macdStyle.strokeWidth ? macdStyle.strokeWidth : swidth;
            }
            if (this.styles.signalLine && wjcCore.isObject(this.styles.signalLine)) {
                signalStyle = wjcChart._BasePlotter.cloneStyle(this.styles.signalLine, ["fill"]);
                signalStroke = signalStyle.stroke ? signalStyle.stroke : stroke;
                signalStrokeWidth = signalStyle.strokeWidth ? signalStyle.strokeWidth : swidth;
            }
        }
        var macdVals = [], macdXVals = [], signalVals = [], signalXVals = [], dpt, area, originalLen = this._getLength(), i, di;
        for (i = 0; i < this._macdVals.length; i++) {
            di = originalLen - this._macdVals.length + i;
            macdXVals.push(ax.convert(this._macdXVals[i]));
            macdVals.push(ay.convert(this._macdVals[i]));
            dpt = this._getDataPoint(this._macdXVals[i], this._macdVals[i], si, di, ax, ay);
            dpt["name"] = this._getName(0);
            area = new wjcChart._CircleArea(new wjcCore.Point(macdXVals[i], macdVals[i]), 0.5 * engine.strokeWidth);
            area.tag = dpt;
            this._hitTester.add(area, si);
        }
        this._hitTester.add(new wjcChart._LinesArea(macdXVals, macdVals), si);
        engine.stroke = macdStroke;
        engine.strokeWidth = macdStrokeWidth;
        engine.drawLines(macdXVals, macdVals, null, style, clipPath);
        for (i = 0; i < this._signalVals.length; i++) {
            di = originalLen - this._signalVals.length + i;
            signalXVals.push(ax.convert(this._signalXVals[i]));
            signalVals.push(ay.convert(this._signalVals[i]));
            dpt = this._getDataPoint(this._signalXVals[i], this._signalVals[i], si, di, ax, ay);
            dpt["name"] = this._getName(1);
            area = new wjcChart._CircleArea(new wjcCore.Point(signalXVals[i], signalVals[i]), 0.5 * engine.strokeWidth);
            area.tag = dpt;
            this._hitTester.add(area, si);
        }
        this._hitTester.add(new wjcChart._LinesArea(signalXVals, signalVals), si);
        engine.stroke = signalStroke;
        engine.strokeWidth = signalStrokeWidth;
        engine.drawLines(signalXVals, signalVals, null, style, clipPath);
    };
    Macd.prototype.getCalculatedValues = function (key) {
        key = wjcCore.asString(key, false);
        var retval = [], i = 0;
        if (_super.prototype._getLength.call(this) <= 0) {
            return retval;
        }
        else if (this._shouldCalculate()) {
            this._init();
            this._calculate();
        }
        switch (key) {
            case "macdLine":
                for (; i < this._macdVals.length; i++) {
                    retval.push({
                        x: this._macdXVals[i],
                        y: this._macdVals[i]
                    });
                }
                break;
            case "signalLine":
                for (; i < this._signalVals.length; i++) {
                    retval.push({
                        x: this._signalXVals[i],
                        y: this._signalVals[i]
                    });
                }
                break;
        }
        return retval;
    };
    return Macd;
}(MacdBase));
exports.Macd = Macd;
var MacdHistogram = (function (_super) {
    __extends(MacdHistogram, _super);
    function MacdHistogram(options) {
        return _super.call(this, options) || this;
    }
    MacdHistogram.prototype.getValues = function (dim) {
        var retval = null;
        if (_super.prototype._getLength.call(this) <= 0) {
            return retval;
        }
        else if (this._shouldCalculate()) {
            this._init();
            this._calculate();
        }
        if (dim === 0) {
            retval = this._histogramVals;
        }
        else if (dim === 1) {
            retval = this._histogramXVals;
        }
        return retval;
    };
    MacdHistogram.prototype.getDataRect = function (currentRect, calculatedRect) {
        if (calculatedRect) {
            return calculatedRect;
        }
        var rect = null;
        if (_super.prototype._getLength.call(this) <= 0) {
            return rect;
        }
        else if (this._shouldCalculate()) {
            this._init();
            this._calculate();
        }
        var xmin = wjcChartFinance._minimum(this._histogramXVals), xmax = wjcChartFinance._maximum(this._histogramXVals), ymin = wjcChartFinance._minimum(this._histogramVals), ymax = wjcChartFinance._maximum(this._histogramVals);
        if (wjcChart._DataInfo.isValid(xmin) && wjcChart._DataInfo.isValid(xmax) && wjcChart._DataInfo.isValid(ymin) && wjcChart._DataInfo.isValid(ymax)) {
            rect = new wjcCore.Rect(xmin, ymin, xmax - xmin, ymax - ymin);
        }
        return rect;
    };
    MacdHistogram.prototype._getChartType = function () {
        return wjcChart.ChartType.Column;
    };
    MacdHistogram.prototype._getItem = function (pointIndex) {
        var originalLen = _super.prototype._getLength.call(this), len = wjcChartFinance._minimum(this._histogramVals.length, this._histogramXVals.length);
        pointIndex = originalLen - len + pointIndex;
        return _super.prototype._getItem.call(this, pointIndex);
    };
    return MacdHistogram;
}(MacdBase));
exports.MacdHistogram = MacdHistogram;
function _macd(ys, fastPeriod, slowPeriod, smoothingPeriod) {
    wjcCore.asArray(ys, false);
    wjcCore.asInt(fastPeriod, false, true);
    wjcCore.asInt(slowPeriod, false, true);
    wjcCore.asInt(smoothingPeriod, false, true);
    var opposite = fastPeriod > slowPeriod, temp;
    if (opposite) {
        temp = slowPeriod;
        slowPeriod = fastPeriod;
        fastPeriod = temp;
    }
    var fastEmas = wjcChartFinance._ema(ys, fastPeriod), slowEmas = wjcChartFinance._ema(ys, slowPeriod), macds = [], histograms = [], signals, i;
    fastEmas.splice(0, slowPeriod - fastPeriod);
    for (i = 0; i < fastEmas.length; i++) {
        temp = fastEmas[i] - slowEmas[i];
        if (opposite)
            temp *= -1;
        macds.push(temp);
    }
    signals = wjcChartFinance._ema(macds, smoothingPeriod);
    var macdTemp = macds.slice(macds.length - signals.length, macds.length);
    for (i = 0; i < macdTemp.length; i++) {
        histograms.push(macdTemp[i] - signals[i]);
    }
    return {
        macds: macds,
        signals: signals,
        histograms: histograms
    };
}
exports._macd = _macd;
"use strict";
var Stochastic = (function (_super) {
    __extends(Stochastic, _super);
    function Stochastic(options) {
        var _this = _super.call(this) || this;
        _this._kPeriod = 14;
        _this._dPeriod = 3;
        _this._smoothingPeriod = 1;
        _this._seriesCount = 2;
        _this.rendering.addHandler(_this._rendering, _this);
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(Stochastic.prototype, "kPeriod", {
        get: function () {
            return this._kPeriod;
        },
        set: function (value) {
            if (value !== this._kPeriod) {
                this._kPeriod = wjcCore.asInt(value, false, true);
                this._clearValues();
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stochastic.prototype, "dPeriod", {
        get: function () {
            return this._dPeriod;
        },
        set: function (value) {
            if (value !== this._dPeriod) {
                this._dPeriod = wjcCore.asInt(value, false, true);
                this._clearValues();
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stochastic.prototype, "smoothingPeriod", {
        get: function () {
            return this._smoothingPeriod;
        },
        set: function (value) {
            if (value !== this._smoothingPeriod) {
                this._smoothingPeriod = wjcCore.asInt(value, false, true);
                this._clearValues();
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stochastic.prototype, "styles", {
        get: function () {
            return this._styles;
        },
        set: function (value) {
            if (value !== this._styles) {
                this._styles = value;
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Stochastic.prototype.getDataRect = function (currentRect, calculatedRect) {
        if (calculatedRect) {
            return calculatedRect;
        }
        var rect = null;
        if (_super.prototype._getLength.call(this) <= 0) {
            return rect;
        }
        else if (this._shouldCalculate()) {
            this._init();
            this._calculate();
        }
        var ys = this._kVals.concat(this._dVals), xs = this._kXVals.concat(this._dXVals), xmin = wjcChartFinance._minimum(xs), xmax = wjcChartFinance._maximum(xs), ymin = wjcChartFinance._minimum(ys), ymax = wjcChartFinance._maximum(ys);
        if (wjcChart._DataInfo.isValid(xmin) && wjcChart._DataInfo.isValid(xmax) && wjcChart._DataInfo.isValid(ymin) && wjcChart._DataInfo.isValid(ymax)) {
            rect = new wjcCore.Rect(xmin, ymin, xmax - xmin, ymax - ymin);
        }
        return rect;
    };
    Stochastic.prototype._clearValues = function () {
        _super.prototype._clearValues.call(this);
        this._kVals = null;
        this._kXVals = null;
        this._dVals = null;
        this._dXVals = null;
    };
    Stochastic.prototype._shouldCalculate = function () {
        return !this._kVals || !this._kXVals ||
            !this._dVals || !this._dXVals;
    };
    Stochastic.prototype._init = function () {
        _super.prototype._init.call(this);
        this._kVals = [];
        this._kXVals = [];
        this._dVals = [];
        this._dXVals = [];
    };
    Stochastic.prototype._calculate = function () {
        var originalLen = _super.prototype._getLength.call(this);
        if (_super.prototype._getLength.call(this) <= 0) {
            return;
        }
        var highs = _super.prototype._getBindingValues.call(this, 0), lows = _super.prototype._getBindingValues.call(this, 1), closes = _super.prototype._getBindingValues.call(this, 3), xs = this._getXValues();
        var values = _stochastic(highs, lows, closes, this.kPeriod, this.dPeriod, this.smoothingPeriod);
        this._kVals = values.ks;
        this._dVals = values.ds;
        this._kXVals = xs ? xs.slice(this.kPeriod - 1) : wjcChartFinance._range(this.kPeriod - 1, originalLen - 1);
        if (this.smoothingPeriod && this.smoothingPeriod > 1) {
            this._kXVals = this._kXVals.slice(this._kXVals.length - this._kVals.length, this._kXVals.length);
        }
        this._dXVals = this._kXVals.slice(this._kXVals.length - this._dVals.length, this._kXVals.length);
    };
    Stochastic.prototype._rendering = function (sender, args) {
        args.cancel = true;
        if (_super.prototype._getLength.call(this) <= 0) {
            return;
        }
        else if (this._shouldCalculate()) {
            this._init();
            this._calculate();
        }
        var si = this.chart.series.indexOf(this), engine = args.engine, ax = this._getAxisX(), ay = this._getAxisY(), style = wjcChart._BasePlotter.cloneStyle(this.style, ["fill"]), stroke = this._getSymbolStroke(si), clipPath = this.chart._plotrectId, swidth = 2, kStyle = null, kStroke = stroke, kStrokeWidth = swidth, dStyle = null, dStroke = stroke, dStrokeWidth = swidth;
        if (this.styles && wjcCore.isObject(this.styles)) {
            if (this.styles.kLine && wjcCore.isObject(this.styles.kLine)) {
                kStyle = wjcChart._BasePlotter.cloneStyle(this.styles.kLine, ["fill"]);
                kStroke = kStyle.stroke ? kStyle.stroke : stroke;
                kStrokeWidth = kStyle.strokeWidth ? kStyle.strokeWidth : swidth;
            }
            if (this.styles.dLine && wjcCore.isObject(this.styles.dLine)) {
                dStyle = wjcChart._BasePlotter.cloneStyle(this.styles.dLine, ["fill"]);
                dStroke = dStyle.stroke ? dStyle.stroke : stroke;
                dStrokeWidth = dStyle.strokeWidth ? dStyle.strokeWidth : swidth;
            }
        }
        var kVals = [], kXVals = [], dVals = [], dXVals = [], originalLen = this._getLength(), dpt, area, i, di;
        for (i = 0; i < this._kVals.length; i++) {
            di = originalLen - this._kVals.length + i;
            kXVals.push(ax.convert(this._kXVals[i]));
            kVals.push(ay.convert(this._kVals[i]));
            dpt = this._getDataPoint(this._kXVals[i], this._kVals[i], si, di, ax, ay);
            dpt["name"] = this._getName(0);
            area = new wjcChart._CircleArea(new wjcCore.Point(kXVals[i], kVals[i]), 0.5 * engine.strokeWidth);
            area.tag = dpt;
            this._hitTester.add(area, si);
        }
        this._hitTester.add(new wjcChart._LinesArea(kXVals, kVals), si);
        engine.stroke = kStroke;
        engine.strokeWidth = kStrokeWidth;
        engine.drawLines(kXVals, kVals, null, style, clipPath);
        for (i = 0; i < this._dVals.length; i++) {
            di = originalLen - this._dVals.length + i;
            dXVals.push(ax.convert(this._dXVals[i]));
            dVals.push(ay.convert(this._dVals[i]));
            dpt = this._getDataPoint(this._dXVals[i], this._dVals[i], si, di, ax, ay);
            dpt["name"] = this._getName(1);
            area = new wjcChart._CircleArea(new wjcCore.Point(dXVals[i], dVals[i]), 0.5 * engine.strokeWidth);
            area.tag = dpt;
            this._hitTester.add(area, si);
        }
        this._hitTester.add(new wjcChart._LinesArea(dXVals, dVals), si);
        engine.stroke = dStroke;
        engine.strokeWidth = dStrokeWidth;
        engine.drawLines(dXVals, dVals, null, style, clipPath);
    };
    Stochastic.prototype.getCalculatedValues = function (key) {
        key = wjcCore.asString(key, false);
        var retval = [], i = 0;
        if (_super.prototype._getLength.call(this) <= 0) {
            return retval;
        }
        else if (this._shouldCalculate()) {
            this._init();
            this._calculate();
        }
        switch (key) {
            case "kLine":
                for (; i < this._kVals.length; i++) {
                    retval.push({
                        x: this._kXVals[i],
                        y: this._kVals[i]
                    });
                }
                break;
            case "dLine":
                for (; i < this._dVals.length; i++) {
                    retval.push({
                        x: this._dXVals[i],
                        y: this._dVals[i]
                    });
                }
                break;
        }
        return retval;
    };
    return Stochastic;
}(OverlayIndicatorBase));
exports.Stochastic = Stochastic;
function _stochastic(highs, lows, closes, kPeriod, dPeriod, smoothingPeriod) {
    wjcCore.asArray(highs, false);
    wjcCore.asArray(lows, false);
    wjcCore.asArray(closes, false);
    wjcCore.asInt(kPeriod, false, true);
    wjcCore.asInt(dPeriod, false, true);
    wjcCore.asInt(smoothingPeriod, true, true);
    var extremeHighs = [], extremeLows = [], kvals = [], dvals, i;
    for (i = kPeriod; i <= highs.length; i++) {
        extremeHighs.push(wjcChartFinance._maximum(highs.slice(i - kPeriod, i)));
        extremeLows.push(wjcChartFinance._minimum(lows.slice(i - kPeriod, i)));
    }
    closes = closes.slice(kPeriod - 1);
    for (i = 0; i < closes.length; i++) {
        kvals.push((closes[i] - extremeLows[i]) / (extremeHighs[i] - extremeLows[i]) * 100);
    }
    if (smoothingPeriod && smoothingPeriod > 1) {
        kvals = wjcChartFinance._sma(kvals, smoothingPeriod);
    }
    dvals = wjcChartFinance._sma(kvals, dPeriod);
    return {
        ks: kvals,
        ds: dvals
    };
}
exports._stochastic = _stochastic;
//# sourceMappingURL=wijmo.chart.finance.analytics.js.map