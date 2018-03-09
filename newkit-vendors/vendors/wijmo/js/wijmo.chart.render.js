"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wjcChart = require("wijmo/wijmo.chart");
var wjcCore = require("wijmo/wijmo");
var wjcSelf = require("wijmo/wijmo.chart.render");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['chart'] = window['wijmo']['chart'] || {};
window['wijmo']['chart']['render'] = wjcSelf;
'use strict';
var _CanvasRenderEngine = (function () {
    function _CanvasRenderEngine(element, applyCSSStyles) {
        if (applyCSSStyles === void 0) { applyCSSStyles = false; }
        this._strokeWidth = 1;
        this._fontSize = null;
        this._fontFamily = null;
        this._applyCanvasClip = function (ctx, clipID) {
            var clipRect = this._canvasRect[clipID];
            if (!clipRect) {
                return;
            }
            ctx.beginPath();
            ctx.rect(clipRect.left, clipRect.top, clipRect.width, clipRect.height);
            ctx.clip();
            ctx.closePath();
        };
        this._applyCanvasStyles = function (ele, style, className, enableFill, enableFont) {
            var self = this, ctx = self._canvas.getContext('2d'), font, eleStyles, box, stroke = self.stroke, fill = self.fill, strokeWidth = self.strokeWidth;
            if (style && style.stroke !== undefined) {
                stroke = style.stroke;
            }
            if (style && style.fill !== undefined) {
                fill = self._getOpacityColor(style.fill, style['fill-opacity']);
            }
            if (ele) {
                eleStyles = window.getComputedStyle(ele);
                box = ele.getBBox();
            }
            if (enableFont) {
                if (eleStyles) {
                    ctx.fillStyle = eleStyles.fill;
                    font = eleStyles.fontStyle + ' ' + eleStyles.fontSize + ' ' + eleStyles.fontFamily;
                    ctx.font = font;
                    if (ctx.font.replace(/\"/g, "'") !== font.replace(/\"/g, "'")) {
                        font = eleStyles.fontStyle + ' ' + eleStyles.fontSize + ' ' + (ctx.font.split(' ')[1] || 'sans-serif');
                        ctx.font = font;
                    }
                }
                else if (self.fontSize) {
                    ctx.fillStyle = self.textFill;
                    ctx.font = self.fontSize + ' ' + (self.fontFamily || 'sans-serif');
                }
                else if (self._canvasDefaultFont) {
                    ctx.fillStyle = self._canvasDefaultFont.textFill;
                    font = self._canvasDefaultFont.fontSize + ' ' + self._canvasDefaultFont.fontFamily;
                    ctx.font = font;
                    if (ctx.font.replace(/\"/g, "'") !== font.replace(/\"/g, "'")) {
                        font = self._canvasDefaultFont.fontSize + ' ' + (ctx.font.split(' ')[1] || 'sans-serif');
                        ctx.font = font;
                    }
                }
            }
            else {
                if (eleStyles) {
                    stroke = (eleStyles.stroke && eleStyles.stroke !== 'none') ? eleStyles.stroke : stroke;
                    fill = (eleStyles.fill && eleStyles.fill !== 'none') ? self._getOpacityColor(eleStyles.fill, eleStyles['fill-opacity']) : fill;
                    strokeWidth = eleStyles.strokeWidth ? eleStyles.strokeWidth : strokeWidth;
                }
                if (stroke !== 'none' && stroke != null) {
                    this._applyColor('strokeStyle', stroke, box);
                    ctx.lineWidth = +strokeWidth.replace(/px/g, '');
                    ctx.stroke();
                }
                if (enableFill && fill != null && fill !== 'transparent' && fill !== 'none') {
                    this._applyColor('fillStyle', fill, box);
                    ctx.fill();
                }
            }
        };
        var self = this;
        self._element = element;
        self._canvas = document.createElement('canvas');
        self._svgEngine = new wjcChart._SvgRenderEngine(element);
        self._element.appendChild(self._canvas);
        self._applyCSSStyles = applyCSSStyles;
    }
    _CanvasRenderEngine.prototype.beginRender = function () {
        var self = this, svg = self._svgEngine.element, ele = self._element, style;
        if (self._applyCSSStyles) {
            self._svgEngine.beginRender();
            ele = svg;
        }
        self._element.appendChild(svg);
        self._canvasRect = {};
        style = window.getComputedStyle(ele);
        self._canvasDefaultFont = {
            fontSize: style.fontSize,
            fontFamily: style.fontFamily,
            textFill: style.color
        };
    };
    _CanvasRenderEngine.prototype.endRender = function () {
        if (this._applyCSSStyles) {
            this._svgEngine.endRender();
        }
        this._svgEngine.element.parentNode.removeChild(this._svgEngine.element);
    };
    _CanvasRenderEngine.prototype.setViewportSize = function (w, h) {
        var self = this, canvas = self._canvas, ctx = canvas.getContext('2d'), f = self.fill, color, stroke;
        if (self._applyCSSStyles) {
            self._svgEngine.setViewportSize(w, h);
        }
        canvas.width = w;
        canvas.height = h;
        color = window.getComputedStyle(self._element).backgroundColor;
        stroke = self.stroke;
        if (color) {
            self.stroke = null;
            self.fill = color;
            self.drawRect(0, 0, w, h);
            self.fill = f;
            self.stroke = stroke;
        }
    };
    Object.defineProperty(_CanvasRenderEngine.prototype, "element", {
        get: function () {
            return this._canvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_CanvasRenderEngine.prototype, "fill", {
        get: function () {
            return this._fill;
        },
        set: function (value) {
            this._svgEngine.fill = value;
            this._fill = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_CanvasRenderEngine.prototype, "fontSize", {
        get: function () {
            return this._fontSize;
        },
        set: function (value) {
            this._svgEngine.fontSize = value;
            var val = (value == null || isNaN(value)) ? value : value + 'px';
            this._fontSize = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_CanvasRenderEngine.prototype, "fontFamily", {
        get: function () {
            return this._fontFamily;
        },
        set: function (value) {
            this._svgEngine.fontFamily = value;
            this._fontFamily = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_CanvasRenderEngine.prototype, "stroke", {
        get: function () {
            return this._stroke;
        },
        set: function (value) {
            this._svgEngine.stroke = value;
            this._stroke = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_CanvasRenderEngine.prototype, "strokeWidth", {
        get: function () {
            return this._strokeWidth;
        },
        set: function (value) {
            this._svgEngine.strokeWidth = value;
            this._strokeWidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_CanvasRenderEngine.prototype, "textFill", {
        get: function () {
            return this._textFill;
        },
        set: function (value) {
            this._svgEngine.textFill = value;
            this._textFill = value;
        },
        enumerable: true,
        configurable: true
    });
    _CanvasRenderEngine.prototype.addClipRect = function (clipRect, id) {
        if (clipRect && id) {
            if (this._applyCSSStyles) {
                this._svgEngine.addClipRect(clipRect, id);
            }
            this._canvasRect[id] = clipRect.clone();
        }
    };
    _CanvasRenderEngine.prototype.drawEllipse = function (cx, cy, rx, ry, className, style) {
        var el, ctx = this._canvas.getContext('2d');
        if (this._applyCSSStyles) {
            el = this._svgEngine.drawEllipse(cx, cy, rx, ry, className, style);
        }
        ctx.save();
        ctx.beginPath();
        if (ctx.ellipse) {
            ctx.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI);
        }
        else {
            ctx.translate(cx, cy);
            ctx.scale(1, ry / rx);
            ctx.translate(-cx, -cy);
            ctx.arc(cx, cy, rx, 0, 2 * Math.PI);
            ctx.scale(1, 1);
        }
        this._applyCanvasStyles(el, style, className, true);
        ctx.restore();
        return el;
    };
    _CanvasRenderEngine.prototype.drawRect = function (x, y, w, h, className, style, clipPath) {
        var el, ctx = this._canvas.getContext('2d');
        if (this._applyCSSStyles) {
            el = this._svgEngine.drawRect(x, y, w, h, className, style, clipPath);
        }
        ctx.save();
        this._applyCanvasClip(ctx, clipPath);
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        this._applyCanvasStyles(el, style, className, true);
        ctx.restore();
        return el;
    };
    _CanvasRenderEngine.prototype.drawLine = function (x1, y1, x2, y2, className, style) {
        var el, ctx = this._canvas.getContext('2d');
        if (this._applyCSSStyles) {
            el = this._svgEngine.drawLine(x1, y1, x2, y2, className, style);
        }
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        this._applyCanvasStyles(el, style, className);
        ctx.restore();
        return el;
    };
    _CanvasRenderEngine.prototype.drawLines = function (xs, ys, className, style, clipPath) {
        if (!xs || !ys || xs.length === 0 || ys.length === 0) {
            return;
        }
        var ctx = this._canvas.getContext('2d'), len = Math.min(xs.length, ys.length), el, i;
        if (this._applyCSSStyles) {
            el = this._svgEngine.drawLines([0, 1], [1, 0], className, style, clipPath);
        }
        ctx.save();
        this._applyCanvasClip(ctx, clipPath);
        ctx.beginPath();
        ctx.moveTo(xs[0], ys[0]);
        for (i = 1; i < len; i++) {
            ctx.lineTo(xs[i], ys[i]);
        }
        this._applyCanvasStyles(el, style, className);
        ctx.restore();
        return el;
    };
    _CanvasRenderEngine.prototype.drawSplines = function (xs, ys, className, style, clipPath) {
        if (!xs || !ys || xs.length === 0 || ys.length === 0) {
            return;
        }
        var ctx = this._canvas.getContext('2d'), spline = new wjcChart._Spline(xs, ys), s = spline.calculate(), sx = s.xs, sy = s.ys, len = Math.min(sx.length, sy.length), el, i;
        if (this._applyCSSStyles) {
            el = this._svgEngine.drawSplines([0, 1], [1, 0], className, style, clipPath);
        }
        ctx.save();
        this._applyCanvasClip(ctx, clipPath);
        ctx.beginPath();
        ctx.moveTo(sx[0], sy[0]);
        for (i = 1; i < len; i++) {
            ctx.lineTo(sx[i], sy[i]);
        }
        this._applyCanvasStyles(el, style, className);
        ctx.restore();
        return el;
    };
    _CanvasRenderEngine.prototype.drawPolygon = function (xs, ys, className, style, clipPath) {
        if (!xs || !ys || xs.length === 0 || ys.length === 0) {
            return;
        }
        var ctx = this._canvas.getContext('2d'), len = Math.min(xs.length, ys.length), el, i;
        if (this._applyCSSStyles) {
            el = this._svgEngine.drawPolygon(xs, ys, className, style, clipPath);
        }
        ctx.save();
        this._applyCanvasClip(ctx, clipPath);
        ctx.beginPath();
        ctx.moveTo(xs[0], ys[0]);
        for (i = 1; i < len; i++) {
            ctx.lineTo(xs[i], ys[i]);
        }
        ctx.closePath();
        this._applyCanvasStyles(el, style, className, true);
        ctx.restore();
        return el;
    };
    _CanvasRenderEngine.prototype.drawPieSegment = function (cx, cy, r, startAngle, sweepAngle, className, style, clipPath) {
        var el, ctx = this._canvas.getContext('2d'), sta = startAngle, swa = startAngle + sweepAngle;
        if (this._applyCSSStyles) {
            el = this._svgEngine.drawPieSegment(cx, cy, r, startAngle, sweepAngle, className, style, clipPath);
        }
        ctx.save();
        this._applyCanvasClip(ctx, clipPath);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, sta, swa, false);
        ctx.lineTo(cx, cy);
        this._applyCanvasStyles(el, style, className, true);
        ctx.restore();
        return el;
    };
    _CanvasRenderEngine.prototype.drawDonutSegment = function (cx, cy, radius, innerRadius, startAngle, sweepAngle, className, style, clipPath) {
        var ctx = this._canvas.getContext('2d'), sta = startAngle, swa = startAngle + sweepAngle, el, p1, p2;
        if (this._applyCSSStyles) {
            el = this._svgEngine.drawDonutSegment(cx, cy, radius, innerRadius, startAngle, sweepAngle, className, style, clipPath);
        }
        p1 = new wjcCore.Point(cx, cy);
        p1.x += innerRadius * Math.cos(sta);
        p1.y += innerRadius * Math.sin(sta);
        p2 = new wjcCore.Point(cx, cy);
        p2.x += innerRadius * Math.cos(swa);
        p2.y += innerRadius * Math.sin(swa);
        ctx.save();
        this._applyCanvasClip(ctx, clipPath);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.arc(cx, cy, radius, sta, swa, false);
        ctx.lineTo(p2.x, p2.y);
        ctx.arc(cx, cy, innerRadius, swa, sta, true);
        this._applyCanvasStyles(el, style, className, true);
        ctx.restore();
        return el;
    };
    _CanvasRenderEngine.prototype.drawString = function (s, pt, className, style) {
        var el, ctx = this._canvas.getContext('2d');
        if (this._applyCSSStyles) {
            el = this._svgEngine.drawString(s, pt, className, style);
        }
        ctx.save();
        ctx.textBaseline = 'bottom';
        this._applyCanvasStyles(el, style, className, true, true);
        ctx.fillText(s, pt.x, pt.y);
        ctx.restore();
        return el;
    };
    _CanvasRenderEngine.prototype.drawStringRotated = function (s, pt, center, angle, className, style) {
        var el, ctx = this._canvas.getContext('2d'), metric = ctx.measureText(s);
        if (this._applyCSSStyles) {
            el = this._svgEngine.drawStringRotated(s, pt, center, angle, className, style);
        }
        ctx.save();
        ctx.textBaseline = 'bottom';
        ctx.translate(center.x, center.y);
        ctx.rotate(Math.PI / 180 * angle);
        ctx.translate(-center.x, -center.y);
        this._applyCanvasStyles(el, style, className, true, true);
        ctx.fillText(s, pt.x, pt.y);
        ctx.restore();
        return el;
    };
    _CanvasRenderEngine.prototype.measureString = function (s, className, groupName, style) {
        var ctx = ctx = this._canvas.getContext('2d'), width;
        if (this._applyCSSStyles) {
            return this._svgEngine.measureString(s, className, groupName, style);
        }
        this._applyCanvasStyles(null, null, className, true, true);
        width = ctx.measureText(s).width;
        return new wjcCore.Size(width, parseInt(ctx.font) * 1.5);
    };
    _CanvasRenderEngine.prototype.startGroup = function (className, clipPath, createTransform) {
        if (createTransform === void 0) { createTransform = false; }
        var el, ctx = this._canvas.getContext('2d');
        if (this._applyCSSStyles) {
            el = this._svgEngine.startGroup(className, clipPath, createTransform);
        }
        ctx.save();
        this._applyCanvasClip(ctx, clipPath);
        return el;
    };
    _CanvasRenderEngine.prototype.endGroup = function () {
        if (this._applyCSSStyles) {
            this._svgEngine.endGroup();
        }
        this._canvas.getContext('2d').restore();
    };
    _CanvasRenderEngine.prototype.drawImage = function (imageHref, x, y, w, h) {
        var el, ctx = this._canvas.getContext('2d'), img = new Image;
        if (this._applyCSSStyles) {
            el = this._svgEngine.drawImage(imageHref, x, y, w, h);
        }
        img.onload = function () {
            ctx.drawImage(img, x, y, w, h);
        };
        img.src = imageHref;
        return el;
    };
    _CanvasRenderEngine.prototype._getOpacityColor = function (color, opacity) {
        var wjColor = new wjcCore.Color(color);
        if (color.indexOf('url') > -1) {
            return this.fill;
        }
        else if (color.indexOf('-') > -1) {
            this.fill = color;
            return color;
        }
        if (opacity != null && wjColor.a === 1) {
            wjColor.a = isNaN(opacity) ? 1 : Number(opacity);
        }
        return wjColor.toString();
    };
    _CanvasRenderEngine.prototype._applyColor = function (key, val, rect) {
        var color = _GradientColorUtil.tryParse(val), ctx = this._canvas.getContext('2d');
        if (color == null) {
            return;
        }
        if (wjcCore.isString(color) || rect == null) {
            ctx[key] = color;
        }
        else {
            var gradient_1, width = void 0, height = void 0;
            if (color.x1 != null) {
                if (color.relative) {
                    gradient_1 = ctx.createLinearGradient(rect.x + color.x1 * rect.width, rect.y + color.y1 * rect.height, rect.x + color.x2 * rect.width, rect.y + color.y2 * rect.height);
                }
                else {
                    gradient_1 = ctx.createLinearGradient(color.x1, color.y1, color.x2, color.y2);
                }
            }
            else if (color.r != null) {
                if (color.relative) {
                    var cx = rect.x + color.cx * rect.width, cy = rect.y + color.cy * rect.height, w = color.r * rect.width, h = color.r * rect.height, ratio = h / w, fx = rect.x + (color.fx == null ? color.cx : color.fx) * rect.width, fy = rect.y + (color.fy == null ? color.cy : color.fy) * rect.height, fw = (color.fr == null ? 0 : color.fr) * rect.width, fh = (color.fr == null ? 0 : color.fr) * rect.height, fmin = Math.min(fw, fh);
                    gradient_1 = ctx.createRadialGradient(fx, fy / ratio, fmin, cx, cy / ratio, w);
                    ctx.setTransform(1, 0, 0, ratio, 0, 0);
                }
                else {
                    gradient_1 = ctx.createRadialGradient(color.fx == null ? color.cx : color.fx, color.fy == null ? color.cy : color.fy, color.fr || 0, color.cx, color.cy, color.r);
                }
            }
            if (color.colors && color.colors.length > 0 && gradient_1 != null) {
                color.colors.forEach(function (c) {
                    var color = new wjcCore.Color('#000000');
                    if (c.color != null) {
                        color = c.color;
                    }
                    if (c.opacity != null) {
                        color.a = c.opacity;
                    }
                    gradient_1.addColorStop(c.offset, color.toString());
                });
            }
            ctx[key] = gradient_1;
        }
    };
    return _CanvasRenderEngine;
}());
exports._CanvasRenderEngine = _CanvasRenderEngine;
var _GradientColorUtil = (function () {
    function _GradientColorUtil() {
    }
    _GradientColorUtil.tryParse = function (color) {
        if (_GradientColorUtil.parsedColor[color]) {
            return _GradientColorUtil.parsedColor[color];
        }
        if (color == null || color.indexOf('-') === -1) {
            return color;
        }
        var arr = color.replace(/\s+/g, '').split(/\-/g);
        var type = arr[0][0];
        var relative = false;
        var gc;
        var coords = arr[0].match(/\(\S+\)/)[0].replace(/[\(\\)]/g, '').split(/\,/g);
        if (type === 'l' || type === 'L') {
            gc = {
                x1: '0',
                y1: '0',
                x2: '0',
                y2: '0',
                colors: []
            };
            if (type === 'l') {
                relative = true;
            }
            ['x1', 'y1', 'x2', 'y2'].forEach(function (v, i) {
                if (coords[i] != null) {
                    gc[v] = +coords[i];
                }
            });
        }
        else if (type === 'r' || type === 'R') {
            gc = {
                cx: '0',
                cy: '0',
                r: '0',
                colors: []
            };
            if (type === 'r') {
                relative = true;
            }
            ['cx', 'cy', 'r', 'fx', 'fy', 'fr'].forEach(function (v, i) {
                if (coords[i] != null && coords[i] !== '') {
                    gc[v] = +coords[i];
                }
            });
        }
        gc.relative = relative;
        _GradientColorUtil.parsedColor[color] = gc;
        var len = arr.length - 1;
        arr.forEach(function (v, i) {
            if (v.indexOf(')') > -1) {
                v = v.match(/\)\S+/)[0].replace(')', '');
            }
            var c = v.split(':');
            var col = {
                color: new wjcCore.Color('#000000')
            };
            if (c[0] != null) {
                col.color = wjcCore.Color.fromString(c[0]);
            }
            if (c[1] != null) {
                col.offset = +c[1];
            }
            else {
                col.offset = i / len;
            }
            if (c[2] != null) {
                col.opacity = +c[2];
            }
            gc.colors.push(col);
        });
        return gc;
    };
    _GradientColorUtil.parsedColor = {};
    return _GradientColorUtil;
}());
if (wjcChart.FlexChartBase && wjcChart.FlexChartBase.prototype && wjcChart.FlexChartBase.prototype._exportToImage) {
    var _exportFn = wjcChart.FlexChartBase.prototype._exportToImage;
    wjcChart.FlexChartBase.prototype._exportToImage = function (extension, processDataURI) {
        if (extension === 'svg') {
            _exportFn.call(this, extension, processDataURI);
            return;
        }
        var canvasEngine = new _CanvasRenderEngine(this.hostElement, true), r = this.rendered, dataUrl, canvas;
        this.rendered = new wjcCore.Event();
        this._render(canvasEngine, false);
        canvas = canvasEngine.element;
        canvas.parentNode.removeChild(canvas);
        dataUrl = canvas.toDataURL('image/' + extension);
        processDataURI.call(null, dataUrl);
        canvas = null;
        canvasEngine = null;
        this.rendered = r;
    };
}
//# sourceMappingURL=wijmo.chart.render.js.map