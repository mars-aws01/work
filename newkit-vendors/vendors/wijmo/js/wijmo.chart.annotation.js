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
var wjcSelf = require("wijmo/wijmo.chart.annotation");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['chart'] = window['wijmo']['chart'] || {};
window['wijmo']['chart']['annotation'] = wjcSelf;
'use strict';
var AnnotationAttachment;
(function (AnnotationAttachment) {
    AnnotationAttachment[AnnotationAttachment["DataIndex"] = 0] = "DataIndex";
    AnnotationAttachment[AnnotationAttachment["DataCoordinate"] = 1] = "DataCoordinate";
    AnnotationAttachment[AnnotationAttachment["Relative"] = 2] = "Relative";
    AnnotationAttachment[AnnotationAttachment["Absolute"] = 3] = "Absolute";
})(AnnotationAttachment = exports.AnnotationAttachment || (exports.AnnotationAttachment = {}));
var AnnotationPosition;
(function (AnnotationPosition) {
    AnnotationPosition[AnnotationPosition["Center"] = 0] = "Center";
    AnnotationPosition[AnnotationPosition["Top"] = 1] = "Top";
    AnnotationPosition[AnnotationPosition["Bottom"] = 2] = "Bottom";
    AnnotationPosition[AnnotationPosition["Left"] = 4] = "Left";
    AnnotationPosition[AnnotationPosition["Right"] = 8] = "Right";
})(AnnotationPosition = exports.AnnotationPosition || (exports.AnnotationPosition = {}));
var AnnotationBase = (function () {
    function AnnotationBase(options) {
        this._resetDefaultValue();
        if (options) {
            this._copy(this, options);
        }
    }
    Object.defineProperty(AnnotationBase.prototype, "attachment", {
        get: function () {
            return this._attachment;
        },
        set: function (value) {
            value = wjcCore.asEnum(value, AnnotationAttachment);
            if (value != this._attachment) {
                this._attachment = value;
                this._repaint();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "point", {
        get: function () {
            return this._point;
        },
        set: function (value) {
            if (value.x == null || value.y == null) {
                return;
            }
            if (value.x === this._point.x && value.y === this._point.y) {
                return;
            }
            this._point = value;
            this._repaint();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "seriesIndex", {
        get: function () {
            return this._seriesIndex;
        },
        set: function (value) {
            value = wjcCore.asNumber(value, false, true);
            if (value != this._seriesIndex) {
                this._seriesIndex = value;
                this._repaint();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "pointIndex", {
        get: function () {
            return this._pointIndex;
        },
        set: function (value) {
            if (value === this._pointIndex) {
                return;
            }
            this._pointIndex = wjcCore.asNumber(value, false, true);
            this._repaint();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (value) {
            if (value != this._position) {
                this._position = value;
                this._repaint();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "offset", {
        get: function () {
            return this._offset;
        },
        set: function (value) {
            if (value.x == null || value.y == null) {
                return;
            }
            if (value.x === this._offset.x && value.y === this._offset.y) {
                return;
            }
            this._offset = value;
            this._repaint();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "style", {
        get: function () {
            if (this._style == null) {
                this._style = {};
            }
            return this._style;
        },
        set: function (value) {
            if (value != this._style) {
                this._style = value;
                this._repaint();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "isVisible", {
        get: function () {
            return this._isVisible;
        },
        set: function (value) {
            value = wjcCore.asBoolean(value, false);
            if (value != this._isVisible) {
                this._isVisible = value;
                this._toggleVisibility(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "tooltip", {
        get: function () {
            return this._tooltip;
        },
        set: function (value) {
            this._tooltip = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    AnnotationBase.prototype.render = function (engine) {
        var self = this, series;
        self._element = engine.startGroup(self._getCSSClass());
        engine.fill = '#88bde6';
        engine.strokeWidth = 1;
        engine.stroke = '#000000';
        self._render(engine);
        engine.endGroup();
        self._element[AnnotationBase._DATA_KEY] = this;
        if (!self._isVisible) {
            self._toggleVisibility(false);
        }
        else if (self._attachment === AnnotationAttachment.DataIndex) {
            series = self._layer._chart.series[self._seriesIndex];
            if (series && (series.visibility === wjcChart.SeriesVisibility.Legend || series.visibility === wjcChart.SeriesVisibility.Hidden)) {
                self._toggleVisibility(false);
            }
        }
    };
    AnnotationBase.prototype.destroy = function () {
    };
    AnnotationBase.prototype._copy = function (dst, src) {
        for (var key in src) {
            if (key in dst) {
                this._processOptions(key, dst, src);
            }
        }
    };
    AnnotationBase.prototype._processOptions = function (key, dst, src) {
        dst[key] = src[key];
    };
    AnnotationBase.prototype._resetDefaultValue = function () {
        var self = this;
        self._attachment = AnnotationAttachment.Absolute;
        self._point = new wjcChart.DataPoint(0, 0);
        self._seriesIndex = 0;
        self._pointIndex = 0;
        self._position = AnnotationPosition.Center;
        self._offset = new wjcCore.Point(0, 0);
        self._isVisible = true;
        self._tooltip = '';
    };
    AnnotationBase.prototype._toggleVisibility = function (visible) {
        var str = visible ? 'visible' : 'hidden';
        if (this._element) {
            this._element.setAttribute('visibility', str);
        }
    };
    AnnotationBase.prototype._getCSSClass = function () {
        return AnnotationBase._CSS_ANNOTATION;
    };
    AnnotationBase.prototype._render = function (engine) {
        this._element = null;
    };
    AnnotationBase.prototype._repaint = function () {
        if (this._layer) {
            this._layer._renderAnnotation(this);
        }
    };
    AnnotationBase.prototype._convertPoint = function (pt) {
        var self = this, att = self._attachment, newPt = new wjcCore.Point(), chart, rect, aX, aY, data, series, item, xVal;
        if (self._layer && self._layer._chart) {
            chart = self._layer._chart;
            rect = chart._plotRect;
        }
        switch (att) {
            case AnnotationAttachment.DataIndex:
                if (!chart.series || chart.series.length <= self.seriesIndex) {
                    break;
                }
                series = chart.series[self.seriesIndex];
                item = series._getItem(self.pointIndex);
                if (!item) {
                    break;
                }
                aX = series.axisX || chart.axisX;
                aY = series.axisY || chart.axisY;
                xVal = item[series.bindingX] || item['x'];
                if (typeof xVal === 'string') {
                    xVal = self.pointIndex;
                }
                newPt.x = self._convertDataToLen(rect.width, aX, xVal);
                newPt.y = self._convertDataToLen(rect.height, aY, item[series._getBinding(0)] || aY.actualMin + 0.25, true);
                break;
            case AnnotationAttachment.DataCoordinate:
                aX = chart.axisX;
                aY = chart.axisY;
                newPt.x = self._convertDataToLen(rect.width, aX, pt.x);
                newPt.y = self._convertDataToLen(rect.height, aY, pt.y, true);
                break;
            case AnnotationAttachment.Relative:
                newPt.x = rect.width * pt.x;
                newPt.y = rect.height * pt.y;
                break;
            case AnnotationAttachment.Absolute:
            default:
                newPt.x = pt.x;
                newPt.y = pt.y;
                break;
        }
        return newPt;
    };
    AnnotationBase.prototype._convertDataToLen = function (total, axis, val, converted) {
        if (converted === void 0) { converted = false; }
        var min = axis.min == null ? axis.actualMin : axis.min, max = axis.max == null ? axis.actualMax : axis.max;
        if (converted) {
            return total * (1 - (val - min) / (max - min));
        }
        else {
            return total * (val - min) / (max - min);
        }
    };
    AnnotationBase.prototype._renderCenteredText = function (content, engine, point, className, angle, style) {
        var text, box;
        if (!this._isValidPoint(point)) {
            return;
        }
        if (angle) {
            engine.drawStringRotated(content, point, point, angle, className, style);
        }
        else {
            engine.drawString(content, point, className, style);
        }
        text = this._element.querySelector('text');
        if (text) {
            box = text.getBBox();
            text.setAttribute('x', (point.x - box.width / 2).toFixed(1));
            text.setAttribute('y', (point.y + box.height / 6).toFixed(1));
        }
    };
    AnnotationBase.prototype._adjustOffset = function (pt, offset) {
        pt.x = pt.x + offset.x;
        pt.y = pt.y + offset.y;
    };
    AnnotationBase.prototype._getOffset = function (engine) {
        var posOffset = this._getPositionOffset(engine);
        return new wjcCore.Point(this._offset.x + posOffset.x, this._offset.y + posOffset.y);
    };
    AnnotationBase.prototype._getPositionOffset = function (engine) {
        var posOffset = new wjcCore.Point(0, 0), pos = this.position, size = this._getSize(engine);
        if ((pos & AnnotationPosition.Top) === AnnotationPosition.Top) {
            posOffset.y -= size.height / 2;
        }
        else if ((pos & AnnotationPosition.Bottom) === AnnotationPosition.Bottom) {
            posOffset.y += size.height / 2;
        }
        if ((pos & AnnotationPosition.Left) === AnnotationPosition.Left) {
            posOffset.x -= size.width / 2;
        }
        else if ((pos & AnnotationPosition.Right) === AnnotationPosition.Right) {
            posOffset.x += size.width / 2;
        }
        return posOffset;
    };
    AnnotationBase.prototype._getSize = function (engine) {
        return new wjcCore.Size();
    };
    AnnotationBase.prototype._isValidPoint = function (pt) {
        return isFinite(pt.x) && isFinite(pt.y);
    };
    AnnotationBase.prototype._measureString = function (engine, text, className) {
        var e = engine, size;
        if (e._textGroup && e._textGroup.parentNode == null) {
            e._svg.appendChild(e._textGroup);
            size = e.measureString(text, className, null, this.style);
            e.endRender();
        }
        else {
            size = e.measureString(text, className, null, this.style);
        }
        return size;
    };
    AnnotationBase._DATA_KEY = 'wj-chart-annotation';
    AnnotationBase._CSS_ANNOTATION = 'wjchart-annotation';
    AnnotationBase._CSS_ANNO_TEXT = 'anno-text';
    AnnotationBase._CSS_ANNO_SHAPE = 'anno-shape';
    return AnnotationBase;
}());
exports.AnnotationBase = AnnotationBase;
var Text = (function (_super) {
    __extends(Text, _super);
    function Text(options) {
        return _super.call(this, options) || this;
    }
    Text.prototype._resetDefaultValue = function () {
        _super.prototype._resetDefaultValue.call(this);
        this._text = '';
        this.position = AnnotationPosition.Top;
    };
    Text.prototype._getCSSClass = function () {
        return _super.prototype._getCSSClass.call(this) + ' ' + Text._CSS_TEXT;
    };
    Object.defineProperty(Text.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (value) {
            var self = this;
            if (value === self._text) {
                return;
            }
            self._text = value;
            self._repaint();
        },
        enumerable: true,
        configurable: true
    });
    Text.prototype._render = function (engine) {
        var self = this, pt = self._convertPoint(self.point), offset;
        offset = self._getOffset(engine);
        self._adjustOffset(pt, offset);
        self._renderCenteredText(self._text, engine, pt, AnnotationBase._CSS_ANNO_TEXT, null, self.style);
    };
    Text.prototype._getSize = function (engine) {
        if (engine) {
            return this._measureString(engine, this._text, AnnotationBase._CSS_ANNO_TEXT);
        }
        else {
            return new wjcCore.Size();
        }
    };
    Text._CSS_TEXT = 'wjchart-anno-text';
    return Text;
}(AnnotationBase));
exports.Text = Text;
var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape(options) {
        return _super.call(this, options) || this;
    }
    Shape.prototype._resetDefaultValue = function () {
        _super.prototype._resetDefaultValue.call(this);
        this._content = '';
    };
    Shape.prototype._getCSSClass = function () {
        return _super.prototype._getCSSClass.call(this) + ' ' + Shape._CSS_SHAPE;
    };
    Object.defineProperty(Shape.prototype, "content", {
        get: function () {
            return this._content;
        },
        set: function (value) {
            var self = this;
            if (value === self._content) {
                return;
            }
            self._content = value;
            self._repaint();
        },
        enumerable: true,
        configurable: true
    });
    Shape.prototype._render = function (engine) {
        var self = this;
        self._shapeContainer = engine.startGroup();
        engine.stroke = '#000';
        self._renderShape(engine);
        engine.stroke = null;
        engine.endGroup();
        if (self._content) {
            self._renderText(engine);
        }
    };
    Shape.prototype._getContentCenter = function () {
        return this.point;
    };
    Shape.prototype._renderShape = function (engine) {
    };
    Shape.prototype._renderText = function (engine) {
        var self = this, contentCenter, offset;
        contentCenter = self._convertPoint(self._getContentCenter());
        if (!self._isValidPoint(contentCenter)) {
            return;
        }
        offset = self._getOffset();
        self._adjustOffset(contentCenter, offset);
        self._renderCenteredText(self._content, engine, contentCenter, AnnotationBase._CSS_ANNO_TEXT);
    };
    Shape._CSS_SHAPE = 'wjchart-anno-shape';
    return Shape;
}(AnnotationBase));
exports.Shape = Shape;
var Ellipse = (function (_super) {
    __extends(Ellipse, _super);
    function Ellipse(options) {
        return _super.call(this, options) || this;
    }
    Object.defineProperty(Ellipse.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            if (value === this._width) {
                return;
            }
            this._width = wjcCore.asNumber(value, false, true);
            this._repaint();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ellipse.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            if (value === this._height) {
                return;
            }
            this._height = wjcCore.asNumber(value, false, true);
            this._repaint();
        },
        enumerable: true,
        configurable: true
    });
    Ellipse.prototype._resetDefaultValue = function () {
        _super.prototype._resetDefaultValue.call(this);
        this._width = 100;
        this._height = 80;
    };
    Ellipse.prototype._getCSSClass = function () {
        return _super.prototype._getCSSClass.call(this) + ' ' + Ellipse._CSS_ELLIPSE;
    };
    Ellipse.prototype._renderShape = function (engine) {
        _super.prototype._renderShape.call(this, engine);
        var self = this, pt = self._convertPoint(self.point), w = self._width, h = self._height, offset = self._getOffset();
        self._adjustOffset(pt, offset);
        if (self._isValidPoint(pt)) {
            engine.drawEllipse(pt.x, pt.y, w / 2, h / 2, AnnotationBase._CSS_ANNO_SHAPE, self.style);
        }
    };
    Ellipse.prototype._getSize = function () {
        return new wjcCore.Size(this.width, this.height);
    };
    Ellipse._CSS_ELLIPSE = 'wjchart-anno-ellipse';
    return Ellipse;
}(Shape));
exports.Ellipse = Ellipse;
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(options) {
        return _super.call(this, options) || this;
    }
    Object.defineProperty(Rectangle.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            if (value === this._width) {
                return;
            }
            this._width = wjcCore.asNumber(value, false, true);
            this._repaint();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            if (value === this._height) {
                return;
            }
            this._height = wjcCore.asNumber(value, false, true);
            this._repaint();
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype._resetDefaultValue = function () {
        _super.prototype._resetDefaultValue.call(this);
        this._width = 100;
        this._height = 80;
    };
    Rectangle.prototype._getCSSClass = function () {
        return _super.prototype._getCSSClass.call(this) + ' ' + Rectangle._CSS_RECTANGLE;
    };
    Rectangle.prototype._renderShape = function (engine) {
        _super.prototype._renderShape.call(this, engine);
        var self = this, pt = self._convertPoint(self.point), w = self._width, h = self._height, offset = self._getOffset();
        self._adjustOffset(pt, offset);
        if (self._isValidPoint(pt)) {
            engine.drawRect(pt.x - w / 2, pt.y - h / 2, self._width, self._height, AnnotationBase._CSS_ANNO_SHAPE, self.style);
        }
    };
    Rectangle.prototype._getSize = function () {
        return new wjcCore.Size(this.width, this.height);
    };
    Rectangle._CSS_RECTANGLE = 'wjchart-anno-rectangle';
    return Rectangle;
}(Shape));
exports.Rectangle = Rectangle;
var Line = (function (_super) {
    __extends(Line, _super);
    function Line(options) {
        return _super.call(this, options) || this;
    }
    Object.defineProperty(Line.prototype, "start", {
        get: function () {
            return this._start;
        },
        set: function (value) {
            var self = this;
            if (value.x == null || value.y == null) {
                return;
            }
            if (value.x === self._start.x && value.y === self._start.y) {
                return;
            }
            self._start = value;
            self._repaint();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "end", {
        get: function () {
            return this._end;
        },
        set: function (value) {
            var self = this;
            if (value.x == null || value.y == null) {
                return;
            }
            if (value.x === self._end.x && value.y === self._end.y) {
                return;
            }
            self._end = value;
            self._repaint();
        },
        enumerable: true,
        configurable: true
    });
    Line.prototype._resetDefaultValue = function () {
        _super.prototype._resetDefaultValue.call(this);
        this._start = new wjcChart.DataPoint(0, 0);
        this._end = new wjcChart.DataPoint(0, 0);
        this.position = AnnotationPosition.Top;
    };
    Line.prototype._getCSSClass = function () {
        return _super.prototype._getCSSClass.call(this) + ' ' + Line._CSS_LINE;
    };
    Line.prototype._getContentCenter = function () {
        var start = this.start, end = this.end;
        return new wjcChart.DataPoint((start.x + end.x) / 2, (start.y + end.y) / 2);
    };
    Line.prototype._renderShape = function (engine) {
        _super.prototype._renderShape.call(this, engine);
        var self = this, start = self._convertPoint(self._start), end = self._convertPoint(self._end), offset;
        self._cS = start;
        self._cE = end;
        offset = self._getOffset();
        self._adjustOffset(start, offset);
        self._adjustOffset(end, offset);
        if (self._isValidPoint(start) && self._isValidPoint(end)) {
            engine.drawLine(start.x, start.y, end.x, end.y, AnnotationBase._CSS_ANNO_SHAPE, self.style);
        }
    };
    Line.prototype._getSize = function () {
        var start = this._cS, end = this._cE;
        return new wjcCore.Size(Math.abs(start.x - end.x), Math.abs(start.y - end.y));
    };
    Line.prototype._renderText = function (engine) {
        var self = this, contentCenter, offset, start = self._cS, end = self._cE, angle;
        contentCenter = self._convertPoint(self._getContentCenter());
        offset = self._getOffset();
        self._adjustOffset(contentCenter, offset);
        if (!self._isValidPoint(contentCenter)) {
            return;
        }
        angle = Math.atan2((end.y - start.y), (end.x - start.x)) * 180 / Math.PI;
        angle = angle < -90 ? angle + 180 : (angle > 90 ? angle - 180 : angle);
        self._renderCenteredText(self.content, engine, contentCenter, AnnotationBase._CSS_ANNO_TEXT, angle);
    };
    Line.prototype._renderCenteredText = function (content, engine, point, className, angle, style) {
        if (angle != null) {
            var offsetX, offsetY, len, radian;
            len = this._measureString(engine, content, className).height / 2;
            radian = angle * Math.PI / 180;
            offsetX = len * Math.sin(radian);
            offsetY = len * Math.cos(radian);
            point.x = point.x + offsetX;
            point.y = point.y - offsetY;
        }
        _super.prototype._renderCenteredText.call(this, content, engine, point, className, angle, style);
    };
    Line._CSS_LINE = 'wjchart-anno-line';
    return Line;
}(Shape));
exports.Line = Line;
var Polygon = (function (_super) {
    __extends(Polygon, _super);
    function Polygon(options) {
        return _super.call(this, options) || this;
    }
    Polygon.prototype._processOptions = function (key, dst, src) {
        var _this = this;
        if (key === 'points') {
            var val = src[key];
            if (wjcCore.isArray(val)) {
                val.forEach(function (v) {
                    _this.points.push(v);
                });
            }
        }
        else {
            _super.prototype._processOptions.call(this, key, dst, src);
        }
    };
    Object.defineProperty(Polygon.prototype, "points", {
        get: function () {
            return this._points;
        },
        enumerable: true,
        configurable: true
    });
    Polygon.prototype._resetDefaultValue = function () {
        var self = this;
        _super.prototype._resetDefaultValue.call(this);
        self._points = new wjcCore.ObservableArray();
        self._points.collectionChanged.addHandler(function () {
            if (self._element) {
                self._repaint();
            }
        });
    };
    Polygon.prototype._getCSSClass = function () {
        return _super.prototype._getCSSClass.call(this) + ' ' + Polygon._CSS_POLYGON;
    };
    Polygon.prototype._getContentCenter = function () {
        var pts = this.points, len = pts.length, x = 0, y = 0, i;
        for (i = 0; i < len; i++) {
            x += pts[i].x;
            y += pts[i].y;
        }
        return new wjcChart.DataPoint(x / len, y / len);
    };
    Polygon.prototype._renderShape = function (engine) {
        _super.prototype._renderShape.call(this, engine);
        var self = this, xs = [], ys = [], pts = self._points, len = pts.length, i, pt, offset = self._getOffset();
        for (i = 0; i < len; i++) {
            pt = self._convertPoint(pts[i]);
            if (!self._isValidPoint(pt)) {
                return;
            }
            self._adjustOffset(pt, offset);
            xs.push(pt.x);
            ys.push(pt.y);
        }
        engine.drawPolygon(xs, ys, AnnotationBase._CSS_ANNO_SHAPE, self.style);
    };
    Polygon.prototype._getSize = function () {
        var self = this, xMin, xMax, yMin, yMax, i, pt, len = self._points.length, pts;
        pts = [].map.call(self._points, function (pt) {
            return self._convertPoint(pt);
        });
        for (i = 0; i < len; i++) {
            pt = pts[i];
            if (i === 0) {
                xMin = xMax = pt.x;
                yMin = yMax = pt.y;
                continue;
            }
            if (pt.x < xMin) {
                xMin = pt.x;
            }
            else if (pt.x > xMax) {
                xMax = pt.x;
            }
            if (pt.y < yMin) {
                yMin = pt.y;
            }
            else if (pt.y > yMax) {
                yMax = pt.y;
            }
        }
        return new wjcCore.Size(xMax - xMin, yMax - yMin);
    };
    Polygon._CSS_POLYGON = 'wjchart-anno-polygon';
    return Polygon;
}(Shape));
exports.Polygon = Polygon;
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(options) {
        return _super.call(this, options) || this;
    }
    Object.defineProperty(Circle.prototype, "radius", {
        get: function () {
            return this._radius;
        },
        set: function (value) {
            if (value === this._radius) {
                return;
            }
            this._radius = wjcCore.asNumber(value, false, true);
            this._repaint();
        },
        enumerable: true,
        configurable: true
    });
    Circle.prototype._resetDefaultValue = function () {
        _super.prototype._resetDefaultValue.call(this);
        this._radius = 100;
    };
    Circle.prototype._getCSSClass = function () {
        return _super.prototype._getCSSClass.call(this) + ' ' + Circle._CSS_CIRCLE;
    };
    Circle.prototype._renderShape = function (engine) {
        _super.prototype._renderShape.call(this, engine);
        var self = this, pt = self._convertPoint(self.point), offset = self._getOffset();
        self._adjustOffset(pt, offset);
        if (self._isValidPoint(pt)) {
            engine.drawPieSegment(pt.x, pt.y, self.radius, 0, 360, AnnotationBase._CSS_ANNO_SHAPE, self.style);
        }
    };
    Circle.prototype._getSize = function () {
        var d = this.radius * 2;
        return new wjcCore.Size(d, d);
    };
    Circle._CSS_CIRCLE = 'wjchart-anno-circle';
    return Circle;
}(Shape));
exports.Circle = Circle;
var Square = (function (_super) {
    __extends(Square, _super);
    function Square(options) {
        return _super.call(this, options) || this;
    }
    Object.defineProperty(Square.prototype, "length", {
        get: function () {
            return this._length;
        },
        set: function (value) {
            if (value === this._length) {
                return;
            }
            this._length = wjcCore.asNumber(value, false, true);
            this._repaint();
        },
        enumerable: true,
        configurable: true
    });
    Square.prototype._resetDefaultValue = function () {
        _super.prototype._resetDefaultValue.call(this);
        this._length = 100;
    };
    Square.prototype._getCSSClass = function () {
        return _super.prototype._getCSSClass.call(this) + ' ' + Square._CSS_SQUARE;
    };
    Square.prototype._renderShape = function (engine) {
        _super.prototype._renderShape.call(this, engine);
        var self = this, pt = self._convertPoint(self.point), len = self.length, offset = self._getOffset();
        self._adjustOffset(pt, offset);
        if (self._isValidPoint(pt)) {
            engine.drawRect(pt.x - len / 2, pt.y - len / 2, len, len, AnnotationBase._CSS_ANNO_SHAPE, self.style);
        }
    };
    Square.prototype._getSize = function () {
        return new wjcCore.Size(this.length, this.length);
    };
    Square._CSS_SQUARE = 'wjchart-anno-square';
    return Square;
}(Shape));
exports.Square = Square;
var Image = (function (_super) {
    __extends(Image, _super);
    function Image(options) {
        return _super.call(this, options) || this;
    }
    Object.defineProperty(Image.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            if (value === this._width) {
                return;
            }
            this._width = wjcCore.asNumber(value, false, true);
            this._repaint();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            if (value === this._height) {
                return;
            }
            this._height = wjcCore.asNumber(value, false, true);
            this._repaint();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "href", {
        get: function () {
            return this._href;
        },
        set: function (value) {
            if (value === this._href) {
                return;
            }
            this._href = value;
            this._repaint();
        },
        enumerable: true,
        configurable: true
    });
    Image.prototype._resetDefaultValue = function () {
        _super.prototype._resetDefaultValue.call(this);
        this._width = 100;
        this._height = 100;
        this._href = '';
    };
    Image.prototype._getCSSClass = function () {
        return _super.prototype._getCSSClass.call(this) + ' ' + Image._CSS_IMAGE;
    };
    Image.prototype._renderShape = function (engine) {
        _super.prototype._renderShape.call(this, engine);
        var self = this, pt = self._convertPoint(self.point), href = self._href, w = self.width, h = self.height, offset = self._getOffset();
        if (href.length > 0 && self._isValidPoint(pt)) {
            self._adjustOffset(pt, offset);
            engine.drawImage(href, pt.x - w / 2, pt.y - h / 2, w, h);
        }
        self._applyStyle(self._element, self.style);
    };
    Image.prototype._getSize = function () {
        return new wjcCore.Size(this.width, this.height);
    };
    Image.prototype._applyStyle = function (el, style) {
        if (style) {
            for (var key in style) {
                el.setAttribute(this._deCase(key), style[key]);
            }
        }
    };
    Image.prototype._deCase = function (s) {
        return s.replace(/[A-Z]/g, function (a) { return '-' + a.toLowerCase(); });
    };
    Image._CSS_IMAGE = 'wjchart-anno-image';
    return Image;
}(Shape));
exports.Image = Image;
'use strict';
var AnnotationLayer = (function () {
    function AnnotationLayer(chart, options) {
        var self = this;
        self._init(chart);
        self._renderGroup();
        self._bindTooltip();
        if (options && wjcCore.isArray(options)) {
            options.forEach(function (val) {
                var type = val['type'] || 'Circle', annotation;
                if (wjcSelf[type]) {
                    annotation = new wjcSelf[type](val);
                    self._items.push(annotation);
                }
            });
        }
    }
    AnnotationLayer.prototype._init = function (chart) {
        var self = this;
        self._items = new wjcCore.ObservableArray();
        self._items.collectionChanged.addHandler(self._itemsChanged, self);
        self._chart = chart;
        self._forceTTShowing = false;
        self._annoTTShowing = false;
        self._engine = chart._currentRenderEngine;
        chart.rendered.addHandler(self._renderAnnotations, self);
        chart.lostFocus.addHandler(self._lostFocus, self);
    };
    AnnotationLayer.prototype._lostFocus = function (evt) {
        this._toggleTooltip(this._tooltip, evt, this._chart.hostElement);
    };
    Object.defineProperty(AnnotationLayer.prototype, "items", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    AnnotationLayer.prototype.getItem = function (name) {
        var items = this.getItems(name);
        if (items.length > 0) {
            return items[0];
        }
        else {
            return null;
        }
    };
    AnnotationLayer.prototype.getItems = function (name) {
        var items = [];
        if (this._items.length === 0 || !name || name === '') {
            return items;
        }
        for (var i = 0; i < this._items.length; i++) {
            if (name === this._items[i].name) {
                items.push(this._items[i]);
            }
        }
        return items;
    };
    AnnotationLayer.prototype._bindTooltip = function () {
        var self = this, ele = self._chart.hostElement, tooltip = self._tooltip, ttHide;
        if (!tooltip) {
            tooltip = self._tooltip = new wjcChart.ChartTooltip();
            ttHide = wjcCore.Tooltip.prototype.hide;
            wjcCore.Tooltip.prototype.hide = function () {
                if (self._forceTTShowing) {
                    return;
                }
                ttHide.call(tooltip);
            };
        }
        if (ele) {
            ele.addEventListener('click', function (evt) {
                self._toggleTooltip(tooltip, evt, ele);
            });
            ele.addEventListener('mousemove', function (evt) {
                if (self._showTooltip()) {
                    self._toggleTooltip(tooltip, evt, ele);
                }
            });
        }
    };
    AnnotationLayer.prototype._showTooltip = function () {
        return !this._chart.isTouching;
    };
    AnnotationLayer.prototype._toggleTooltip = function (tooltip, evt, parentNode) {
        var self = this, annotation = self._getAnnotation(evt.target, parentNode);
        if (annotation && annotation.tooltip) {
            self._forceTTShowing = true;
            self._annoTTShowing = true;
            tooltip.show(self._layerEle, annotation.tooltip, new wjcCore.Rect(evt.clientX, evt.clientY, 5, 5));
        }
        else {
            if (!self._annoTTShowing) {
                return;
            }
            self._annoTTShowing = false;
            self._forceTTShowing = false;
            tooltip.hide();
        }
    };
    AnnotationLayer.prototype._getAnnotation = function (ele, parentNode) {
        var node = this._getAnnotationElement(ele, parentNode);
        if (node == null) {
            return null;
        }
        return node[AnnotationBase._DATA_KEY];
    };
    AnnotationLayer.prototype._getAnnotationElement = function (ele, pNode) {
        if (!ele || !pNode) {
            return null;
        }
        var parentNode = ele.parentNode;
        if (wjcCore.hasClass(ele, AnnotationBase._CSS_ANNOTATION)) {
            return ele;
        }
        else if (parentNode == null || parentNode === document.body || parentNode === document || parentNode === pNode) {
            return null;
        }
        else {
            return this._getAnnotationElement(parentNode, pNode);
        }
    };
    AnnotationLayer.prototype._itemsChanged = function (items, e) {
        var action = e.action, item = e.item;
        switch (action) {
            case wjcCore.NotifyCollectionChangedAction.Add:
            case wjcCore.NotifyCollectionChangedAction.Change:
                item._layer = this;
                this._renderAnnotation(item);
                break;
            case wjcCore.NotifyCollectionChangedAction.Remove:
                this._destroyAnnotation(item);
                break;
            default:
                break;
        }
    };
    AnnotationLayer.prototype._renderAnnotations = function () {
        var items = this.items, len = items.length, i;
        this._renderGroup();
        for (i = 0; i < len; i++) {
            this._renderAnnotation(items[i]);
        }
    };
    AnnotationLayer.prototype._renderGroup = function () {
        var self = this, engine = self._engine, rect = self._chart._plotRect, parent;
        if (!rect) {
            return;
        }
        if (!self._layerEle || self._layerEle.parentNode == null) {
            self._plotrectId = 'plotRect' + (1000000 * Math.random()).toFixed();
            engine.addClipRect({
                left: 0,
                top: 0,
                width: rect.width,
                height: rect.height
            }, self._plotrectId);
            self._layerEle = engine.startGroup(AnnotationLayer._CSS_Layer, self._plotrectId);
            self._layerEle.setAttribute('transform', 'translate(' + rect.left + ', ' + rect.top + ')');
            engine.endGroup();
        }
    };
    AnnotationLayer.prototype._renderAnnotation = function (item) {
        if (!this._layerEle || this._layerEle.parentNode == null) {
            return;
        }
        if (item._element && item._element.parentNode == this._layerEle) {
            this._layerEle.removeChild(item._element);
        }
        item.render(this._engine);
        this._layerEle.appendChild(item._element);
    };
    AnnotationLayer.prototype._destroyAnnotations = function () {
        var items = this.items, len = items.length, i;
        for (i = 0; i < len; i++) {
            this._destroyAnnotation(items[i]);
        }
    };
    AnnotationLayer.prototype._destroyAnnotation = function (item) {
        if (this._layerEle) {
            this._layerEle.removeChild(item._element);
        }
        item.destroy();
    };
    AnnotationLayer._CSS_Layer = 'wj-chart-annotationlayer';
    return AnnotationLayer;
}());
exports.AnnotationLayer = AnnotationLayer;
//# sourceMappingURL=wijmo.chart.annotation.js.map