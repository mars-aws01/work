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
var wjcChart = require("wijmo/wijmo.chart");
var wjcCore = require("wijmo/wijmo");
var wjcSelf = require("wijmo/wijmo.chart.radar");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['chart'] = window['wijmo']['chart'] || {};
window['wijmo']['chart']['radar'] = wjcSelf;
'use strict';
var RadarChartType;
(function (RadarChartType) {
    RadarChartType[RadarChartType["Column"] = 0] = "Column";
    RadarChartType[RadarChartType["Scatter"] = 1] = "Scatter";
    RadarChartType[RadarChartType["Line"] = 2] = "Line";
    RadarChartType[RadarChartType["LineSymbols"] = 3] = "LineSymbols";
    RadarChartType[RadarChartType["Area"] = 4] = "Area";
})(RadarChartType = exports.RadarChartType || (exports.RadarChartType = {}));
var FlexRadar = (function (_super) {
    __extends(FlexRadar, _super);
    function FlexRadar(element, options) {
        var _this = _super.call(this, element, options) || this;
        _this._chartType = RadarChartType.Line;
        _this._startAngle = 0;
        _this._totalAngle = 360;
        _this._reversed = false;
        _this._areas = [];
        return _this;
    }
    Object.defineProperty(FlexRadar.prototype, "_radarLinePlotter", {
        get: function () {
            if (this.__radarLinePlotter == null) {
                this.__radarLinePlotter = new _RadarLinePlotter();
                this._initPlotter(this.__radarLinePlotter);
            }
            return this.__radarLinePlotter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexRadar.prototype, "_radarColumnPlotter", {
        get: function () {
            if (this.__radarColumnPlotter == null) {
                this.__radarColumnPlotter = new _RadarBarPlotter();
                this._initPlotter(this.__radarColumnPlotter);
            }
            return this.__radarColumnPlotter;
        },
        enumerable: true,
        configurable: true
    });
    FlexRadar.prototype._initAxes = function () {
        _super.prototype._initAxes.call(this);
        this.axes.pop();
        this.axes.pop();
        this.axisX = new FlexRadarAxis(wjcChart.Position.Bottom);
        this.axisX.majorGrid = true;
        this.axisY = new FlexRadarAxis(wjcChart.Position.Left);
        this.axisY.majorTickMarks = wjcChart.TickMark.Outside;
        this.axes.push(this.axisX);
        this.axes.push(this.axisY);
    };
    FlexRadar.prototype._layout = function (rect, size, engine) {
        _super.prototype._layout.call(this, rect, size, engine);
        var height = this.axisX._height;
        this._plotRect.top += height / 2;
        var pr = this._plotRect;
        this._radius = Math.min(pr.width, pr.height) / 2;
        this._center = new wjcCore.Point(pr.left + pr.width / 2, pr.top + pr.height / 2);
    };
    Object.defineProperty(FlexRadar.prototype, "chartType", {
        get: function () {
            return this._chartType;
        },
        set: function (value) {
            if (value != this._chartType) {
                this._chartType = wjcCore.asEnum(value, RadarChartType);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexRadar.prototype, "startAngle", {
        get: function () {
            return this._startAngle;
        },
        set: function (value) {
            if (value != this._startAngle) {
                this._startAngle = wjcCore.asNumber(value, true);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexRadar.prototype, "totalAngle", {
        get: function () {
            return this._totalAngle;
        },
        set: function (value) {
            if (value != this._totalAngle && value >= 0) {
                this._totalAngle = wjcCore.asNumber(value, true);
                if (this._totalAngle <= 0) {
                    wjcCore.assert(false, "totalAngle must be greater than 0.");
                    this._totalAngle = 0;
                }
                if (this._totalAngle > 360) {
                    wjcCore.assert(false, "totalAngle must be less than or equal to 360.");
                    this._totalAngle = 360;
                }
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexRadar.prototype, "reversed", {
        get: function () {
            return this._reversed;
        },
        set: function (value) {
            if (value != this._reversed) {
                this._reversed = wjcCore.asBoolean(value, true);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexRadar.prototype, "stacking", {
        get: function () {
            return this._stacking;
        },
        set: function (value) {
            if (value != this._stacking) {
                this._stacking = wjcCore.asEnum(value, wjcChart.Stacking);
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    FlexRadar.prototype._getChartType = function () {
        var ct = wjcChart.ChartType.Line;
        switch (this.chartType) {
            case RadarChartType.Area:
                ct = wjcChart.ChartType.Area;
                break;
            case RadarChartType.Line:
                ct = wjcChart.ChartType.Line;
                break;
            case RadarChartType.Column:
                ct = wjcChart.ChartType.Column;
                break;
            case RadarChartType.LineSymbols:
                ct = wjcChart.ChartType.LineSymbols;
                break;
            case RadarChartType.Scatter:
                ct = wjcChart.ChartType.Scatter;
                break;
        }
        return ct;
    };
    FlexRadar.prototype._getPlotter = function (series) {
        var chartType = this.chartType, plotter = null, isSeries = false;
        if (series) {
            var stype = series.chartType;
            if (stype != null && stype != chartType) {
                chartType = stype;
                isSeries = true;
            }
        }
        switch (chartType) {
            case RadarChartType.Line:
                this._radarLinePlotter.hasSymbols = false;
                this._radarLinePlotter.hasLines = true;
                this._radarLinePlotter.isArea = false;
                plotter = this._radarLinePlotter;
                break;
            case RadarChartType.LineSymbols:
                this._radarLinePlotter.hasSymbols = true;
                this._radarLinePlotter.hasLines = true;
                this._radarLinePlotter.isArea = false;
                plotter = this._radarLinePlotter;
                break;
            case RadarChartType.Area:
                this._radarLinePlotter.hasSymbols = false;
                this._radarLinePlotter.hasLines = true;
                this._radarLinePlotter.isArea = true;
                plotter = this._radarLinePlotter;
                break;
            case RadarChartType.Scatter:
                this._radarLinePlotter.hasSymbols = true;
                this._radarLinePlotter.hasLines = false;
                this._radarLinePlotter.isArea = false;
                plotter = this._radarLinePlotter;
                break;
            case RadarChartType.Column:
                this._radarColumnPlotter.isVolume = false;
                this._radarColumnPlotter.width = 0.8;
                plotter = this._radarColumnPlotter;
                break;
            default:
                plotter = _super.prototype._getPlotter.call(this, series);
                break;
        }
        return plotter;
    };
    FlexRadar.prototype._convertPoint = function (radius, angle) {
        var pt = new wjcCore.Point(), center = this._center;
        pt.x = center.x + radius * Math.sin(angle);
        pt.y = center.y - radius * Math.cos(angle);
        return pt;
    };
    FlexRadar.prototype._createSeries = function () {
        return new FlexRadarSeries();
    };
    FlexRadar.prototype._clearCachedValues = function () {
        _super.prototype._clearCachedValues.call(this);
        this._isPolar = false;
        this._areas = [];
    };
    FlexRadar.prototype._performBind = function () {
        _super.prototype._performBind.call(this);
        if (this._xDataType === wjcCore.DataType.Number) {
            this._isPolar = true;
        }
    };
    FlexRadar.prototype._prepareRender = function () {
        _super.prototype._prepareRender.call(this);
        this._areas = [];
    };
    return FlexRadar;
}(wjcChart.FlexChartCore));
exports.FlexRadar = FlexRadar;
'use strict';
var FlexRadarSeries = (function (_super) {
    __extends(FlexRadarSeries, _super);
    function FlexRadarSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FlexRadarSeries.prototype, "chartType", {
        get: function () {
            return this._finChartType;
        },
        set: function (value) {
            if (value != this._finChartType) {
                this._finChartType = wjcCore.asEnum(value, RadarChartType, true);
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    FlexRadarSeries.prototype._getChartType = function () {
        var ct;
        switch (this.chartType) {
            case RadarChartType.Area:
                ct = wjcChart.ChartType.Area;
                break;
            case RadarChartType.Line:
                ct = wjcChart.ChartType.Line;
                break;
            case RadarChartType.Column:
                ct = wjcChart.ChartType.Column;
                break;
            case RadarChartType.LineSymbols:
                ct = wjcChart.ChartType.LineSymbols;
                break;
            case RadarChartType.Scatter:
                ct = wjcChart.ChartType.Scatter;
                break;
        }
        return ct;
    };
    return FlexRadarSeries;
}(wjcChart.SeriesBase));
exports.FlexRadarSeries = FlexRadarSeries;
'use strict';
var FlexRadarAxis = (function (_super) {
    __extends(FlexRadarAxis, _super);
    function FlexRadarAxis() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._points = [];
        _this._axisLabels = [];
        return _this;
    }
    FlexRadarAxis.prototype._render = function (engine) {
        var _this = this;
        if (!this._hasVisibileSeries()) {
            return;
        }
        _super.prototype._render.call(this, engine);
        var labels = this._axisLabels;
        if (labels.length) {
            var renderLabels = function () {
                var cls = _this.axisType == wjcChart.AxisType.X ? 'wj-axis-x-labels ' + wjcChart.FlexChart._CSS_AXIS_X : 'wj-axis-y-labels ' + wjcChart.FlexChart._CSS_AXIS_Y;
                engine.startGroup(cls);
                labels.forEach(function (lbl) {
                    var labelAngle = lbl.labelAngle;
                    if (labelAngle > 0) {
                        if (labelAngle == 90) {
                            wjcChart.FlexChart._renderRotatedText(engine, lbl.text, lbl.pos, lbl.align, lbl.vAlign, lbl.pos, labelAngle, lbl.class);
                        }
                        else {
                            wjcChart.FlexChart._renderRotatedText(engine, lbl.text, lbl.pos, lbl.align, lbl.vAlign, lbl.pos, labelAngle, lbl.class);
                        }
                    }
                    else if (labelAngle < 0) {
                        if (labelAngle == -90) {
                            wjcChart.FlexChart._renderRotatedText(engine, lbl.text, lbl.pos, lbl.align, lbl.vAlign, lbl.pos, labelAngle, lbl.class);
                        }
                        else {
                            wjcChart.FlexChart._renderRotatedText(engine, lbl.text, lbl.pos, lbl.align, lbl.vAlign, lbl.pos, labelAngle, lbl.class);
                        }
                    }
                    else {
                        _this._renderLabel(engine, lbl.val, lbl.text, lbl.pos, lbl.align, lbl.vAlign, lbl.class);
                    }
                });
                engine.endGroup();
                _this._axisLabels = [];
                _this._chart.rendered.removeHandler(renderLabels);
            };
            this._chart.rendered.addHandler(renderLabels, this);
        }
    };
    FlexRadarAxis.prototype._getHeight = function (engine, maxw) {
        var height = _super.prototype._getHeight.call(this, engine, maxw);
        if (this._axisType == wjcChart.AxisType.Y) {
            height = 4;
        }
        this._height = height * 2;
        return height * 2;
    };
    FlexRadarAxis.prototype._updateActualLimits = function (dataType, dataMin, dataMax, labels, values) {
        var _this = this;
        if (labels === void 0) { labels = null; }
        if (values === void 0) { values = null; }
        _super.prototype._updateActualLimits.call(this, dataType, dataMin, dataMax, labels, values);
        var chart = this._chart, lbls = this._lbls, min = this.actualMin.valueOf ? this.actualMin.valueOf() : this.actualMin, max = this.actualMax.valueOf ? this.actualMax.valueOf() : this.actualMax, len;
        if (this._lbls && this === chart.axisX) {
            chart._angles = [];
            if (this._isTimeAxis && this._lbls.length === 0) {
                this._values.forEach(function (v) {
                    lbls.push(_this._formatValue(v));
                });
            }
            len = lbls.length;
            if (chart.totalAngle < 360) {
                len -= 1;
            }
            lbls.forEach(function (v, i) {
                var val = min + (i / len) * (max - min), angle = chart.startAngle + (i / len) * chart.totalAngle;
                if (!isNaN(angle) && !isNaN(val)) {
                    chart._angles.push({
                        value: _this.convert(val),
                        angle: angle
                    });
                }
            });
        }
    };
    FlexRadarAxis.prototype._updateActualLimitsByChartType = function (labels, min, max) {
        var chart = this._chart, ctype = chart._getChartType();
        if (ctype != wjcChart.ChartType.Column && chart.totalAngle === 360) {
            if (this.axisType === wjcChart.AxisType.X) {
                if (this._isTimeAxis) {
                    var len = (chart._xlabels.length || chart._xvals.length) - 1;
                    len = len < 1 ? 1 : len;
                    max += (max - min) / len;
                }
                else if (!chart._isPolar) {
                    max += 1;
                }
            }
        }
        return { min: min, max: max };
    };
    FlexRadarAxis.prototype.convert = function (val, maxValue, minValue) {
        var max = maxValue == null ? this.actualMax : maxValue, min = minValue == null ? this.actualMin : minValue, chart = this._chart;
        if (!chart) {
            return NaN;
        }
        if (max == min) {
            return 0;
        }
        if (this.axisType === wjcChart.AxisType.X) {
            if (chart.reversed) {
                return (chart.startAngle - (val - min) / (max - min) * chart.totalAngle) * Math.PI / 180;
            }
            else {
                return (chart.startAngle + (val - min) / (max - min) * chart.totalAngle) * Math.PI / 180;
            }
        }
        else {
            var base = this.logBase;
            if (!base) {
                return (val - min) / (max - min) * chart._radius;
            }
            else {
                if (val <= 0) {
                    return NaN;
                }
                var maxl = Math.log(max / min);
                return Math.log(val / min) / maxl * chart._radius;
            }
        }
    };
    FlexRadarAxis.prototype._renderLineAndTitle = function (engine) {
        var chart = this._chart, lineClass = wjcChart.FlexChart._CSS_LINE, startAngle = (chart.startAngle - 90) * Math.PI / 180, totalAngle = chart.totalAngle * Math.PI / 180, radius = chart._radius;
        if (this.axisType === wjcChart.AxisType.X && this.axisLine) {
            engine.stroke = wjcChart.FlexChart._FG;
            if (chart._isPolar) {
                startAngle = chart.reversed ? startAngle - totalAngle : startAngle;
                engine.drawPieSegment(chart._center.x, chart._center.y, radius, startAngle, totalAngle, lineClass);
            }
            else {
                this._renderPolygon(engine, radius, lineClass);
            }
        }
    };
    FlexRadarAxis.prototype._renderPolygon = function (engine, r, cls) {
        var chart = this._chart, cAngles = chart._angles, angleLen = cAngles.length, showXMinor = chart.axisX.minorGrid, gXPoints = [], gYPoints = [];
        cAngles.forEach(function (a, i) {
            if (showXMinor && i > 0) {
                var newP = chart._convertPoint(r, a.value - (a.value - cAngles[i - 1].value) / 2);
                gXPoints.push(newP.x);
                gYPoints.push(newP.y);
            }
            var p = chart._convertPoint(r, a.value);
            gXPoints.push(p.x);
            gYPoints.push(p.y);
        });
        if (chart.totalAngle < 360) {
            gXPoints.push(chart._center.x);
            gYPoints.push(chart._center.y);
        }
        else if (showXMinor && angleLen >= 2) {
            var newP = chart._convertPoint(r, cAngles[angleLen - 1].value - (cAngles[angleLen - 2].value - cAngles[angleLen - 1].value) / 2);
            gXPoints.push(newP.x);
            gYPoints.push(newP.y);
        }
        engine.drawPolygon(gXPoints, gYPoints, cls);
    };
    FlexRadarAxis.prototype._renderMinors = function (engine, ticks, isVert, isNear) {
        var _this = this;
        var chart = this._chart, glineClass = wjcChart.FlexChart._CSS_GRIDLINE_MINOR, grid = this.minorGrid, cAngles = chart._angles, angleLen = cAngles.length, showXMinor = chart.axisX.minorGrid, gstroke = wjcChart.FlexChart._FG, gth = this._GRIDLINE_WIDTH, startAngle = chart.startAngle * Math.PI / 180, totalAngle = chart.totalAngle * Math.PI / 180, tover = this._TICK_OVERLAP, tickMarks = this.minorTickMarks, hasTicks = true, angle;
        this._vals.minor = ticks;
        if (tickMarks == wjcChart.TickMark.Outside) {
            tover = 1;
        }
        else if (tickMarks == wjcChart.TickMark.Inside) {
            tover = -1;
        }
        else if (tickMarks == wjcChart.TickMark.Cross) {
            tover = 0;
        }
        else {
            hasTicks = false;
        }
        if (this.axisType == wjcChart.AxisType.Y) {
            engine.stroke = gstroke;
            engine.strokeWidth = gth;
            ticks.forEach(function (val) {
                var y = _this.convert(val), t;
                if (grid) {
                    _this._renderYGridLine(engine, chart, y, glineClass);
                }
                ;
                if (hasTicks) {
                    cAngles.forEach(function (a, i) {
                        if (showXMinor && i > 0) {
                            angle = a.value - (a.value - cAngles[i - 1].value) / 2;
                            var newP = chart._convertPoint(y, angle);
                            _this._drawMinorTickLength(engine, tover, angle, newP);
                        }
                        angle = a.value;
                        var p = chart._convertPoint(y, angle);
                        _this._drawMinorTickLength(engine, tover, angle, p);
                    });
                    if (showXMinor && angleLen >= 2) {
                        angle = cAngles[angleLen - 1].value - (cAngles[angleLen - 2].value - cAngles[angleLen - 1].value) / 2;
                        var newP = chart._convertPoint(y, angle);
                        _this._drawMinorTickLength(engine, tover, angle, newP);
                    }
                }
            });
        }
        else {
            engine.stroke = gstroke;
            engine.strokeWidth = gth;
            ticks.forEach(function (val) {
                var x = _this.convert(val);
                if (grid) {
                    _this._renderXGridLine(engine, chart, x, glineClass);
                }
                if (hasTicks) {
                }
            });
        }
    };
    FlexRadarAxis.prototype._drawMinorTickLength = function (engine, tover, angle, pt) {
        var th = this._TICK_HEIGHT, tickClass = wjcChart.FlexChart._CSS_TICK_MINOR;
        var x1 = 0.5 * (tover - 1) * th * Math.cos(angle);
        var x2 = 0.5 * (1 + tover) * th * Math.cos(angle);
        var y1 = 0.5 * (tover - 1) * th * Math.sin(angle);
        var y2 = 0.5 * (1 + tover) * th * Math.sin(angle);
        engine.drawLine(pt.x + x1, pt.y + y1, pt.x + x2, pt.y + y2, tickClass);
    };
    FlexRadarAxis.prototype._renderLabelsAndTicks = function (engine, index, val, sval, labelAngle, tickMarks, showLabel, t1, t2) {
        this._points = [];
        labelAngle = this.labelAngle || 0;
        var hasLbl = true, chart = this._chart, labelPadding = this.labelPadding || 2, lblClass = wjcChart.FlexChart._CSS_LABEL, glineClass = wjcChart.FlexChart._CSS_GRIDLINE, tickClass = wjcChart.FlexChart._CSS_TICK, tstroke = wjcChart.FlexChart._FG, tth = this._TICK_WIDTH, has_gline = this.majorGrid, gstroke = wjcChart.FlexChart._FG, gth = this._GRIDLINE_WIDTH, startAngle = chart.startAngle * Math.PI / 180, totalAngle = chart.totalAngle * Math.PI / 180, gXPoints = [], gYPoints = [], vAlign = 1, sAngle;
        if (this.axisType == wjcChart.AxisType.Y) {
            has_gline = val != this.actualMin && has_gline && val != this.actualMax;
            var y = this.convert(val), point = chart._convertPoint(y, startAngle);
            if (has_gline) {
                engine.stroke = gstroke;
                engine.strokeWidth = gth;
                this._renderYGridLine(engine, chart, y, glineClass);
            }
            engine.stroke = tstroke;
            engine.strokeWidth = tth;
            if (showLabel) {
                sAngle = (chart.startAngle % 360 + 360) % 360;
                if ((sAngle <= 90 && sAngle >= 75) || (sAngle >= 270 && sAngle <= 285)) {
                    vAlign = 2;
                }
                else if ((sAngle > 90 && sAngle <= 105) || (sAngle < 270 && sAngle >= 255)) {
                    vAlign = 0;
                }
                var lpt = new wjcCore.Point(point.x - labelPadding - Math.abs(t1 - t2), point.y);
                this._axisLabels.push({
                    val: val,
                    text: sval,
                    pos: lpt,
                    align: 2,
                    vAlign: vAlign,
                    labelAngle: labelAngle,
                    class: lblClass
                });
            }
            if (tickMarks != wjcChart.TickMark.None) {
                if (hasLbl) {
                    engine.drawLine(point.x - t2 * Math.cos(startAngle), point.y - t2 * Math.sin(startAngle), point.x - t1 * Math.cos(startAngle), point.y - t1 * Math.sin(startAngle), tickClass);
                }
            }
        }
        else {
            var x = this.convert(val);
            if (has_gline) {
                engine.stroke = gstroke;
                engine.strokeWidth = gth;
                this._renderXGridLine(engine, chart, x, glineClass);
            }
            engine.stroke = tstroke;
            engine.strokeWidth = tth;
            if (showLabel) {
                var lpt = chart._convertPoint(chart._radius + labelPadding, x), angle, valign, align;
                if (chart._angles && chart._angles.length) {
                    angle = chart._angles[index].angle;
                }
                else {
                    angle = chart.startAngle + (val - this.actualMin) * chart.totalAngle / (this.actualMax - this.actualMin);
                }
                angle = angle % 360;
                angle = angle >= 0 ? angle : angle + 360;
                valign = this._getXLabelVAlign(angle);
                align = this._getXLabelAlign(angle);
                if (chart._isPolar) {
                    sval = this._formatValue(angle);
                }
                if (labelAngle > 0) {
                    if (labelAngle == 90) {
                        wjcChart.FlexChart._renderRotatedText(engine, sval, lpt, align, valign, lpt, labelAngle, lblClass);
                    }
                    else {
                        wjcChart.FlexChart._renderRotatedText(engine, sval, lpt, align, valign, lpt, labelAngle, lblClass);
                    }
                }
                else if (labelAngle < 0) {
                    if (labelAngle == -90) {
                        wjcChart.FlexChart._renderRotatedText(engine, sval, lpt, align, valign, lpt, labelAngle, lblClass);
                    }
                    else {
                        wjcChart.FlexChart._renderRotatedText(engine, sval, lpt, align, valign, lpt, labelAngle, lblClass);
                    }
                }
                else {
                    this._renderLabel(engine, val, sval, lpt, align, valign, lblClass);
                }
            }
        }
        return hasLbl;
    };
    FlexRadarAxis.prototype._renderXGridLine = function (engine, chart, x, cls) {
        var center = chart._center, point = chart._convertPoint(chart._radius, x);
        engine.drawLine(center.x, center.y, point.x, point.y, cls);
    };
    FlexRadarAxis.prototype._renderYGridLine = function (engine, chart, y, cls) {
        var cAngles = chart._angles, center = chart._center, startAngle = chart.startAngle * Math.PI / 180, totalAngle = chart.totalAngle * Math.PI / 180;
        if (chart._isPolar) {
            startAngle = (chart.startAngle - 90) * Math.PI / 180;
            startAngle = chart.reversed ? startAngle - totalAngle : startAngle;
            engine.drawPieSegment(center.x, center.y, y, startAngle, totalAngle, cls);
        }
        else {
            this._renderPolygon(engine, y, cls);
        }
    };
    FlexRadarAxis.prototype._getXLabelVAlign = function (angle) {
        var vAlign = 1, chart = this._chart, startAngle = chart.startAngle, reversed = chart.reversed;
        if (reversed) {
            angle = (360 + startAngle + (startAngle % 360 - angle % 360)) % 360;
        }
        if (angle === 0) {
            vAlign = 2;
        }
        else if (angle === 180) {
            vAlign = 0;
        }
        return vAlign;
    };
    FlexRadarAxis.prototype._getXLabelAlign = function (angle) {
        var align = 0, chart = this._chart, startAngle = chart.startAngle, reversed = chart.reversed;
        if (reversed) {
            angle = (360 + startAngle + (startAngle % 360 - angle % 360)) % 360;
        }
        if (angle > 0 && angle < 180) {
            align = -1;
        }
        else if (angle > 180 && angle < 360) {
            align = 1;
        }
        return align + 1;
    };
    FlexRadarAxis.prototype._createTimeLabels = function (start, len, vals, lbls) {
        var _this = this;
        if (this._axisType == wjcChart.AxisType.Y) {
            _super.prototype._createTimeLabels.call(this, start, len, vals, lbls);
        }
        else {
            var values = this._values, fmt = this.format;
            if (!values || values.length === 0) {
                return;
            }
            values.forEach(function (v) {
                vals.push(v);
                lbls.push(_this._formatValue(v));
            });
        }
    };
    return FlexRadarAxis;
}(wjcChart.Axis));
exports.FlexRadarAxis = FlexRadarAxis;
'use strict';
var _RadarLinePlotter = (function (_super) {
    __extends(_RadarLinePlotter, _super);
    function _RadarLinePlotter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isArea = false;
        return _this;
    }
    _RadarLinePlotter.prototype._getLabelPoint = function (series, dataPoint) {
        var ax = series._getAxisX(), ay = series._getAxisY(), angle = ax.convert(dataPoint.dataX), radius = ay.convert(dataPoint.dataY);
        return this.chart._convertPoint(radius, angle);
    };
    _RadarLinePlotter.prototype.plotSeries = function (engine, ax, ay, series, palette, iser, nser) {
        var ser = wjcCore.asType(series, wjcChart.SeriesBase), chart = this.chart, chartType = ser._getChartType() || chart._getChartType(), si = chart.series.indexOf(series);
        var ys = series.getValues(0);
        var xs = series.getValues(1);
        if (!ys) {
            return;
        }
        if (!xs) {
            xs = this.dataInfo.getXVals();
        }
        var style = wjcChart._BasePlotter.cloneStyle(series.style, ['fill']);
        var len = ys.length;
        var hasXs = true;
        if (!xs) {
            hasXs = false;
            xs = new Array(len);
        }
        else {
            len = Math.min(len, xs.length);
        }
        var swidth = this._DEFAULT_WIDTH, fill = ser._getSymbolFill(si), altFill = ser._getAltSymbolFill(si) || fill, stroke = ser._getSymbolStroke(si), altStroke = ser._getAltSymbolStroke(si) || stroke, symSize = ser._getSymbolSize();
        engine.stroke = stroke;
        engine.strokeWidth = swidth;
        engine.fill = fill;
        var xvals = new Array();
        var yvals = new Array();
        var stacked = this.stacking != wjcChart.Stacking.None && !ser._isCustomAxisY();
        var stacked100 = this.stacking == wjcChart.Stacking.Stacked100pc && !ser._isCustomAxisY();
        if (ser._getChartType() !== undefined) {
            stacked = stacked100 = false;
        }
        var interpolateNulls = this.chart.interpolateNulls;
        var hasNulls = false;
        for (var i = 0; i < len; i++) {
            var datax = hasXs ? xs[i] : i;
            var datay = ys[i];
            if (wjcChart._DataInfo.isValid(datax) && wjcChart._DataInfo.isValid(datay)) {
                if (stacked) {
                    if (stacked100) {
                        var sumabs = this.dataInfo.getStackedAbsSum(datax);
                        datay = datay / sumabs;
                    }
                    if (datay >= 0) {
                        var sum = isNaN(this.stackPos[datax]) ? 0 : this.stackPos[datax];
                        datay = this.stackPos[datax] = sum + datay;
                    }
                    else {
                        var sum = isNaN(this.stackNeg[datax]) ? 0 : this.stackNeg[datax];
                        datay = this.stackNeg[datax] = sum + datay;
                    }
                }
                var dpt;
                dpt = new wjcChart._DataPoint(si, i, datax, datay);
                var angle = ax.convert(datax), radius = ay.convert(datay), point = this.chart._convertPoint(radius, angle);
                datax = point.x;
                datay = point.y;
                if (!isNaN(datax) && !isNaN(datay)) {
                    xvals.push(datax);
                    yvals.push(datay);
                    var area = new wjcChart._CircleArea(new wjcCore.Point(datax, datay), 0.5 * symSize);
                    area.tag = dpt;
                    this.hitTester.add(area, si);
                }
                else {
                    hasNulls = true;
                    if (interpolateNulls !== true) {
                        xvals.push(undefined);
                        yvals.push(undefined);
                    }
                }
            }
            else {
                hasNulls = true;
                if (interpolateNulls !== true) {
                    xvals.push(undefined);
                    yvals.push(undefined);
                }
            }
        }
        var itemIndex = 0;
        if (this.hasLines) {
            if (this.isArea) {
                engine.fill = fill || palette._getColorLight(si);
            }
            else {
                engine.fill = 'none';
            }
            if (hasNulls && interpolateNulls !== true) {
                var dx = [];
                var dy = [];
                for (var i = 0; i < len; i++) {
                    if (xvals[i] === undefined) {
                        dx.push(undefined);
                        dy.push(0);
                    }
                    else {
                        dx.push(xvals[i]);
                        dy.push(yvals[i]);
                    }
                }
                if (dx.length > 1) {
                    if (chart._isPolar && chartType !== wjcChart.ChartType.Area) {
                        this._drawLines(engine, dx, dy, null, style, this.chart._plotrectId);
                    }
                    else {
                        if (chart.totalAngle < 360) {
                            dx.push(chart._center.x);
                            dy.push(chart._center.y);
                        }
                        engine.drawPolygon(dx, dy, null, style, this.chart._plotrectId);
                    }
                    this.hitTester.add(new wjcChart._LinesArea(dx, dy), si);
                    itemIndex++;
                }
            }
            else {
                if (chart._isPolar && chartType !== wjcChart.ChartType.Area) {
                    this._drawLines(engine, xvals, yvals, null, style, this.chart._plotrectId);
                }
                else {
                    if (chart.totalAngle < 360) {
                        xvals.push(chart._center.x);
                        yvals.push(chart._center.y);
                    }
                    engine.drawPolygon(xvals, yvals, null, style, this.chart._plotrectId);
                }
                this.hitTester.add(new wjcChart._LinesArea(xvals, yvals), si);
                itemIndex++;
            }
        }
        engine.fill = fill;
        for (var i = 0; i < len; i++) {
            var datax = xvals[i];
            var datay = yvals[i];
            if (this.hasLines === false) {
                engine.fill = ys[i] > 0 ? fill : altFill;
                engine.stroke = ys[i] > 0 ? stroke : altStroke;
            }
            if (this.isValid(datax, datay, ax, ay)) {
                if ((this.hasSymbols || this.chart.itemFormatter) && symSize > 0) {
                    this._drawSymbol(engine, datax, datay, symSize, ser, i);
                }
                series._setPointIndex(i, itemIndex);
                itemIndex++;
            }
        }
    };
    return _RadarLinePlotter;
}(wjcChart._LinePlotter));
exports._RadarLinePlotter = _RadarLinePlotter;
'use strict';
var _RadarBarPlotter = (function (_super) {
    __extends(_RadarBarPlotter, _super);
    function _RadarBarPlotter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _RadarBarPlotter.prototype.adjustLimits = function (dataInfo, plotRect) {
        this.dataInfo = dataInfo;
        var xmin = dataInfo.getMinX();
        var ymin = dataInfo.getMinY();
        var xmax = dataInfo.getMaxX();
        var ymax = dataInfo.getMaxY();
        var dx = dataInfo.getDeltaX();
        if (dx <= 0) {
            dx = 1;
        }
        if (this.chart.totalAngle < 360) {
            dx = 0;
        }
        this.unload();
        if (!this.chart.axisY.logBase) {
            if (this.origin > ymax) {
                ymax = this.origin;
            }
            else if (this.origin < ymin) {
                ymin = this.origin;
            }
        }
        return new wjcCore.Rect(xmin, ymin, xmax - xmin + dx, ymax - ymin);
    };
    _RadarBarPlotter.prototype._getLabelPoint = function (series, dataPoint) {
        var ax = series._getAxisX(), ay = series._getAxisY(), angle = ax.convert(dataPoint.dataX), radius = ay.convert(dataPoint.dataY);
        return this.chart._convertPoint(radius, angle);
    };
    _RadarBarPlotter.prototype.plotSeries = function (engine, ax, ay, series, palette, iser, nser) {
        var si = this.chart.series.indexOf(series);
        var ser = wjcCore.asType(series, wjcChart.SeriesBase);
        var options = this.chart.options;
        var cw = this.width;
        var wpx = 0;
        var chart = this.chart;
        var startAngle = -90 * Math.PI / 180;
        iser = iser || 0;
        var axid = ser._getAxisY()._uniqueId;
        var area;
        var stackNeg = this.stackNegMap[axid];
        var stackPos = this.stackPosMap[axid];
        var stacked = this.stacking != wjcChart.Stacking.None;
        var stacked100 = this.stacking == wjcChart.Stacking.Stacked100pc;
        var yvals = series.getValues(0);
        var xvals = series.getValues(1);
        if (!yvals) {
            return;
        }
        if (!xvals) {
            xvals = this.dataInfo.getXVals();
        }
        var delta;
        if (xvals) {
            delta = chart.totalAngle / xvals.length;
        }
        else {
            delta = chart.totalAngle / (ax.actualMax - ax.actualMin);
        }
        if (delta > 0) {
            if (stacked) {
                cw = delta * cw * Math.PI / 180;
            }
            else {
                cw = delta * Math.pow(cw, iser + 1) * Math.PI / 180;
            }
        }
        var fill = ser._getSymbolFill(si), altFill = ser._getAltSymbolFill(si) || fill, stroke = ser._getSymbolStroke(si), altStroke = ser._getAltSymbolStroke(si) || stroke;
        var len = yvals.length;
        if (xvals != null) {
            len = Math.min(len, xvals.length);
        }
        var origin = this.origin;
        var itemIndex = 0, currentFill, currentStroke;
        if (ser._getChartType() !== undefined) {
            stacked = stacked100 = false;
        }
        if (origin < ay.actualMin) {
            origin = ay.actualMin;
        }
        else if (origin > ay.actualMax) {
            origin = ay.actualMax;
        }
        var originScreen = ay.convert(origin), xmin = ax.actualMin, xmax = ax.actualMax;
        if (ser._isCustomAxisY()) {
            stacked = stacked100 = false;
        }
        if (!chart._areas[si]) {
            chart._areas[si] = [];
        }
        for (var i = 0; i < len; i++) {
            var datax = xvals ? xvals[i] : i;
            var datay = yvals[i];
            if (this._getSymbolOrigin) {
                originScreen = ay.convert(this._getSymbolOrigin(origin, i, len));
            }
            if (this._getSymbolStyles) {
                var style = this._getSymbolStyles(i, len);
                fill = style && style.fill ? style.fill : fill;
                altFill = style && style.fill ? style.fill : altFill;
                stroke = style && style.stroke ? style.stroke : stroke;
                altStroke = style && style.stroke ? style.stroke : altStroke;
            }
            currentFill = datay > 0 ? fill : altFill;
            currentStroke = datay > 0 ? stroke : altStroke;
            engine.fill = currentFill;
            engine.stroke = currentStroke;
            if (wjcChart._DataInfo.isValid(datax) && wjcChart._DataInfo.isValid(datay)) {
                if (stacked) {
                    var x0 = datax - 0.5 * cw, x1 = datax + 0.5 * cw;
                    if ((x0 < xmin && x1 < xmin) || (x0 > xmax && x1 > xmax)) {
                        continue;
                    }
                    x0 = ax.convert(x0);
                    x1 = ax.convert(x1);
                    if (!wjcChart._DataInfo.isValid(x0) || !wjcChart._DataInfo.isValid(x1)) {
                        continue;
                    }
                    var y0, y1;
                    if (stacked100) {
                        var sumabs = this.dataInfo.getStackedAbsSum(datax);
                        datay = datay / sumabs;
                    }
                    var sum = isNaN(stackPos[datax]) ? 0 : stackPos[datax];
                    y0 = sum;
                    y1 = sum + datay;
                    stackPos[datax] = sum + datay;
                    var angle = ax.convert(datax), radius0 = ay.convert(y0), radius1 = ay.convert(y1);
                    angle = angle - cw / 2;
                    engine.drawDonutSegment(chart._center.x, chart._center.y, radius1, radius0, angle + startAngle, cw, null, ser.symbolStyle);
                    area = new wjcChart._DonutSegment(new wjcCore.Point(chart._center.x, chart._center.y), radius1, radius0, angle + startAngle, cw, chart.startAngle || 0);
                    area.tag = new wjcChart._DataPoint(si, i, datax, sum + datay);
                    this.hitTester.add(area, si);
                }
                else {
                    var angle = ax.convert(datax), radius = ay.convert(datay), p = chart._convertPoint(radius, angle);
                    angle = angle - cw / 2;
                    engine.drawPieSegment(chart._center.x, chart._center.y, radius, angle + startAngle, cw, null, ser.symbolStyle);
                    area = new wjcChart._PieSegment(new wjcCore.Point(chart._center.x, chart._center.y), radius, angle + startAngle, cw, chart.startAngle);
                    area.tag = new wjcChart._DataPoint(si, i, datax, datay);
                    this.hitTester.add(area, si);
                }
                chart._areas[si].push(area);
                series._setPointIndex(i, itemIndex);
                itemIndex++;
            }
        }
    };
    return _RadarBarPlotter;
}(wjcChart._BarPlotter));
exports._RadarBarPlotter = _RadarBarPlotter;
//# sourceMappingURL=wijmo.chart.radar.js.map