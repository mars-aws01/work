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
function tryGetModuleWijmoChartRadar() {
    var m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['chart']) && m2['radar'];
}
function tryGetModuleWijmoChartFinance() {
    var m1, m2;
    return (m1 = window['wijmo']) && (m2 = m1['chart']) && m2['finance'];
}
var wjcSelf = require("wijmo/wijmo.chart.animation");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['chart'] = window['wijmo']['chart'] || {};
window['wijmo']['chart']['animation'] = wjcSelf;
var Easing;
(function (Easing) {
    Easing[Easing["Linear"] = 0] = "Linear";
    Easing[Easing["Swing"] = 1] = "Swing";
    Easing[Easing["EaseInQuad"] = 2] = "EaseInQuad";
    Easing[Easing["EaseOutQuad"] = 3] = "EaseOutQuad";
    Easing[Easing["EaseInOutQuad"] = 4] = "EaseInOutQuad";
    Easing[Easing["EaseInCubic"] = 5] = "EaseInCubic";
    Easing[Easing["EaseOutCubic"] = 6] = "EaseOutCubic";
    Easing[Easing["EaseInOutCubic"] = 7] = "EaseInOutCubic";
    Easing[Easing["EaseInQuart"] = 8] = "EaseInQuart";
    Easing[Easing["EaseOutQuart"] = 9] = "EaseOutQuart";
    Easing[Easing["EaseInOutQuart"] = 10] = "EaseInOutQuart";
    Easing[Easing["EaseInQuint"] = 11] = "EaseInQuint";
    Easing[Easing["EaseOutQuint"] = 12] = "EaseOutQuint";
    Easing[Easing["EaseInOutQuint"] = 13] = "EaseInOutQuint";
    Easing[Easing["EaseInSine"] = 14] = "EaseInSine";
    Easing[Easing["EaseOutSine"] = 15] = "EaseOutSine";
    Easing[Easing["EaseInOutSine"] = 16] = "EaseInOutSine";
    Easing[Easing["EaseInExpo"] = 17] = "EaseInExpo";
    Easing[Easing["EaseOutExpo"] = 18] = "EaseOutExpo";
    Easing[Easing["EaseInOutExpo"] = 19] = "EaseInOutExpo";
    Easing[Easing["EaseInCirc"] = 20] = "EaseInCirc";
    Easing[Easing["EaseOutCirc"] = 21] = "EaseOutCirc";
    Easing[Easing["EaseInOutCirc"] = 22] = "EaseInOutCirc";
    Easing[Easing["EaseInBack"] = 23] = "EaseInBack";
    Easing[Easing["EaseOutBack"] = 24] = "EaseOutBack";
    Easing[Easing["EaseInOutBack"] = 25] = "EaseInOutBack";
    Easing[Easing["EaseInBounce"] = 26] = "EaseInBounce";
    Easing[Easing["EaseOutBounce"] = 27] = "EaseOutBounce";
    Easing[Easing["EaseInOutBounce"] = 28] = "EaseInOutBounce";
    Easing[Easing["EaseInElastic"] = 29] = "EaseInElastic";
    Easing[Easing["EaseOutElastic"] = 30] = "EaseOutElastic";
    Easing[Easing["EaseInOutElastic"] = 31] = "EaseInOutElastic";
})(Easing = exports.Easing || (exports.Easing = {}));
var AnimationMode;
(function (AnimationMode) {
    AnimationMode[AnimationMode["All"] = 0] = "All";
    AnimationMode[AnimationMode["Point"] = 1] = "Point";
    AnimationMode[AnimationMode["Series"] = 2] = "Series";
})(AnimationMode = exports.AnimationMode || (exports.AnimationMode = {}));
var ChartAnimation = (function () {
    function ChartAnimation(chart, options) {
        this._play = true;
        var self = this, ele = chart.hostElement, sz = new wjcCore.Size(ele.offsetWidth, ele.offsetHeight);
        self._chart = chart;
        self._updateEventArgs = [];
        if (chart instanceof wjcChart.FlexPie) {
            self._animation = new FlexPieAnimation(chart, self._updateEventArgs);
        }
        else {
            if ((tryGetModuleWijmoChartRadar()) && (tryGetModuleWijmoChartRadar()).FlexRadar && chart instanceof (tryGetModuleWijmoChartRadar()).FlexRadar) {
                self._animation = new FlexRadarAnimation(chart, self._updateEventArgs);
            }
            else {
                self._animation = new FlexChartAnimation(chart, self._updateEventArgs);
            }
            self._chartType = chart.chartType;
        }
        if (options) {
            self._initOptions(options);
        }
        chart.beginUpdate();
        window.setTimeout(function () {
            chart.rendered.addHandler(self._playAnimation, self);
            chart.endUpdate();
        }, 0);
        self._setCV(chart.collectionView);
        window.addEventListener('resize', function (evt) {
            var newSize = new wjcCore.Size(ele.offsetWidth, ele.offsetHeight);
            if (!sz.equals(newSize)) {
                self._play = false;
                sz = newSize;
            }
        });
    }
    ChartAnimation.prototype._initOptions = function (options) {
        if (options.duration) {
            this.duration = options.duration;
        }
        if (options.easing) {
            this.easing = options.easing;
        }
        if (options.animationMode) {
            this.animationMode = options.animationMode;
        }
    };
    ChartAnimation.prototype._setCV = function (cv) {
        this._cv = cv;
        this._animation._clearState();
    };
    Object.defineProperty(ChartAnimation.prototype, "animationMode", {
        get: function () {
            return this._animation.animationMode;
        },
        set: function (value) {
            var mode = this._animation.animationMode;
            if (value !== mode) {
                this._animation.animationMode = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartAnimation.prototype, "easing", {
        get: function () {
            return this._animation.easing;
        },
        set: function (value) {
            var ease = this._animation.easing;
            if (value !== ease) {
                this._animation.easing = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartAnimation.prototype, "duration", {
        get: function () {
            return this._animation.duration;
        },
        set: function (value) {
            var dur = this._animation.duration;
            if (value !== dur) {
                this._animation.duration = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartAnimation.prototype, "axisAnimation", {
        get: function () {
            return this._animation.axisAnimation;
        },
        set: function (value) {
            var axisAnimation = this._animation.axisAnimation;
            if (value !== axisAnimation) {
                this._animation.axisAnimation = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    ChartAnimation.prototype._playAnimation = function () {
        var self = this, chart = self._chart, chartType = chart.chartType;
        if (self._cv !== chart.collectionView) {
            self._setCV(chart.collectionView);
        }
        if (self._chartType != null && self._chartType !== chartType) {
            self._chartType = chartType;
            self._animation._clearState();
        }
        if (self._play) {
            self._animation.playAnimation();
        }
        else {
            self._play = true;
        }
    };
    ChartAnimation.prototype.animate = function () {
        var chart = this._chart;
        if (chart) {
            var itemsSource = chart.itemsSource;
            chart.beginUpdate();
            chart.itemsSource = null;
            chart.itemsSource = itemsSource;
            chart.endUpdate();
        }
    };
    return ChartAnimation;
}());
exports.ChartAnimation = ChartAnimation;
var FlexAnimation = (function () {
    function FlexAnimation(chart, updateEventArgs) {
        this._axisAnimation = true;
        this._chart = chart;
        this._timers = [];
    }
    Object.defineProperty(FlexAnimation.prototype, "animationMode", {
        get: function () {
            return this._animationMode || AnimationMode.All;
        },
        set: function (value) {
            if (value !== this._animationMode) {
                this._clearState();
                this._animationMode = wjcCore.asEnum(value, AnimationMode, false);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexAnimation.prototype, "easing", {
        get: function () {
            return this._easing == null ? Easing.Swing : this._easing;
        },
        set: function (value) {
            if (value !== this._easing) {
                this._easing = wjcCore.asEnum(value, Easing, false);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexAnimation.prototype, "duration", {
        get: function () {
            return this._duration || 400;
        },
        set: function (value) {
            if (value !== this._duration) {
                this._duration = wjcCore.asNumber(value, false, true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexAnimation.prototype, "axisAnimation", {
        get: function () {
            return !!this._axisAnimation;
        },
        set: function (value) {
            if (value !== this._axisAnimation) {
                this._axisAnimation = wjcCore.asBoolean(value, false);
            }
        },
        enumerable: true,
        configurable: true
    });
    FlexAnimation.prototype.playAnimation = function () {
    };
    FlexAnimation.prototype._clearState = function () {
        if (this._previousState) {
            this._previousState = null;
        }
        if (this._currentState) {
            this._currentState = null;
        }
    };
    FlexAnimation.prototype._setInitState = function (ele, from, to) {
        var state = AnimationHelper.parseAttrs(from, to);
        AnimationHelper.setElementAttr(ele, state, 0);
    };
    FlexAnimation.prototype._getAnimation = function (animations, index) {
        if (!animations[index]) {
            animations[index] = [];
        }
        return animations[index];
    };
    FlexAnimation.prototype._toggleVisibility = function (ele, visible) {
        if (visible) {
            AnimationHelper.playAnimation(ele, { opacity: 0 }, { opacity: 1 }, null, Easing.Swing, 100);
        }
        else {
            ele.setAttribute('opacity', '0');
        }
    };
    FlexAnimation.prototype._toggleDataLabelVisibility = function (visible) {
        var ele = this._chart.hostElement, dataLabel = ele && ele.querySelector('.wj-data-labels');
        if (dataLabel) {
            this._toggleVisibility(dataLabel, visible);
        }
    };
    FlexAnimation.prototype._playAnimation = function (animations) {
        var _this = this;
        var self = this, duration = self.duration, easing = self.easing, animLen = animations.length, dd;
        self._toggleDataLabelVisibility(false);
        dd = self._getDurationAndDelay(animations.length, duration);
        if (this._timers && this._timers.length) {
            this._timers.forEach(function (t) { return window.clearInterval(t); });
            this._timers.length = 0;
        }
        animations.forEach(function (val, i) {
            var t;
            if (!val) {
                return;
            }
            t = window.setTimeout(function () {
                var timer;
                val.forEach(function (v, idx) {
                    if (!v || !v.ele) {
                        return;
                    }
                    if (i === animLen - 1 && idx === 0) {
                        var done = v.done;
                        v.done = function () {
                            self._toggleDataLabelVisibility(true);
                            if (done) {
                                done();
                            }
                        };
                    }
                    if (wjcCore.isArray(v.ele)) {
                        timer = AnimationHelper.playAnimations(v.ele, v.from, v.to, v.done, easing, dd.duration);
                        _this._timers = _this._timers.concat.apply(timer);
                    }
                    else {
                        timer = AnimationHelper.playAnimation(v.ele, v.from, v.to, v.done, easing, dd.duration);
                        _this._timers.push(timer);
                    }
                });
            }, dd.delay * i);
            _this._timers.push(t);
        });
    };
    FlexAnimation.prototype._getDurationAndDelay = function (aniLen, duration) {
        var dd = {
            duration: duration,
            delay: 0
        };
        if (aniLen > 1) {
            if (this._previousState) {
                dd.duration = duration / aniLen;
                dd.delay = duration / aniLen;
            }
            else {
                dd.duration = duration * 0.5;
                dd.delay = duration * 0.5 / (aniLen - 1);
            }
        }
        return dd;
    };
    return FlexAnimation;
}());
var FlexPieAnimation = (function (_super) {
    __extends(FlexPieAnimation, _super);
    function FlexPieAnimation(chart, updateEventArgs) {
        var _this = _super.call(this, chart, updateEventArgs) || this;
        chart.selectionChanged.addHandler(_this._selectionChanged, _this);
        return _this;
    }
    FlexPieAnimation.prototype._selectionChanged = function () {
        this._isSelectionChanged = true;
    };
    FlexPieAnimation.prototype._clearState = function () {
        _super.prototype._clearState.call(this);
        this._isSelectionChanged = false;
    };
    FlexPieAnimation.prototype._getElementRotate = function (ele) {
        var rotate = ele.getAttribute('transform'), center;
        if (rotate && rotate.indexOf('rotate') > -1) {
            rotate = rotate.replace('rotate(', '').replace(')', '');
            if (rotate.indexOf(',') > -1) {
                rotate = rotate.split(',').map(function (v) { return +v; });
            }
            else {
                rotate = rotate.split(' ').map(function (v) { return +v; });
            }
        }
        else {
            center = this._chart._areas[0].center;
            rotate = [0, center.x, center.y];
        }
        return rotate;
    };
    FlexPieAnimation.prototype._getDurationAndDelay = function (aniLen, duration) {
        var animationMode = this.animationMode, dd = {
            duration: duration,
            delay: 0
        };
        if (animationMode === AnimationMode.Point && aniLen > 1) {
            dd.duration = duration / aniLen;
            dd.delay = duration / aniLen;
        }
        return dd;
    };
    FlexPieAnimation.prototype.playAnimation = function () {
        _super.prototype.playAnimation.call(this);
        var self = this, animations = [];
        self._playPieAnimation(animations);
        if (animations.length) {
            self._playAnimation(animations);
        }
    };
    FlexPieAnimation.prototype._playPieAnimation = function (animations) {
        var self = this, chart = self._chart, isLoad = true;
        self._previousState = self._currentState;
        self._currentState = {
            areas: chart._areas,
            pels: chart._pels,
            rotate: chart._pels.length && self._getElementRotate(chart._pels[0].parentNode)
        };
        if (self._previousState) {
            isLoad = false;
        }
        if (self._isSelectionChanged) {
            if (!chart.isAnimated) {
                self._playSelectPieAnimation(animations);
            }
            self._isSelectionChanged = false;
            return;
        }
        if (isLoad) {
            self._playLoadPieAnimation(animations);
        }
        else {
            self._playUpdatePieAnimation(animations);
        }
    };
    FlexPieAnimation.prototype._playSelectPieAnimation = function (animations) {
        if (this._previousState == null) {
            return;
        }
        var self = this, ele = self._chart._pels[0].parentNode, previousRotation = self._previousState.rotate, currentRotation = self._getElementRotate(ele), animation, from, to, pr0 = previousRotation[0], cr0 = currentRotation[0];
        if (pr0 === cr0) {
            return;
        }
        if (pr0 - cr0 > 180) {
            currentRotation[0] += 360;
        }
        else if (cr0 - pr0 > 180) {
            previousRotation[0] += 360;
        }
        animation = self._getAnimation(animations, 0);
        from = {
            rotate: previousRotation
        };
        to = {
            rotate: currentRotation
        };
        self._setInitState(ele, from, to);
        animation.push({
            ele: ele,
            from: from,
            to: to
        });
    };
    FlexPieAnimation.prototype._playUpdatePieAnimation = function (animations) {
        var self = this, chart = self._chart, previousState = self._previousState, areas = chart._areas, pels = chart._pels, previousCount = previousState.areas.length, count = areas.length, maxCount = Math.max(count, previousCount), animation = self._getAnimation(animations, 0), idx, state, area, previousPel, startAngle = 0;
        if (count === 0 || previousCount === 0) {
            return;
        }
        self._playSelectPieAnimation(animations);
        for (idx = 0; idx < maxCount; idx++) {
            state = {};
            if (pels[idx] && pels[idx].childNodes && pels[idx].childNodes.length > 0) {
                if (idx < count && idx < previousCount) {
                    area = areas[0];
                    if (idx === 0) {
                        startAngle = area.angle;
                    }
                    if (previousCount === 1) {
                        pels[idx].childNodes[0].setAttribute('d', AnimationHelper.getPathDescOfPie(area.center.x, area.center.y, area.radius, startAngle, Math.PI * 2, area.innerRadius || 0));
                    }
                    else {
                        pels[idx].childNodes[0].setAttribute('d', previousState.pels[idx].childNodes[0].getAttribute('d'));
                    }
                }
                if (idx < count) {
                    area = areas[idx];
                    state.to = { pie: [area.center.x, area.center.y, area.radius, area.angle, area.sweep, area.innerRadius || 0] };
                    state.ele = pels[idx].childNodes[0];
                }
                else {
                    area = areas[0];
                    previousPel = previousState.pels[idx];
                    state.to = { pie: [area.center.x, area.center.y, area.radius, startAngle + Math.PI * 2, 0, area.innerRadius || 0] };
                    pels[0].parentNode.appendChild(previousPel);
                    state.done = (function (slice) { return function () { slice.parentNode.removeChild(slice); }; })(previousPel);
                    state.ele = previousPel.childNodes[0];
                }
                if (idx < previousCount) {
                    area = previousState.areas[idx];
                    state.from = { pie: [area.center.x, area.center.y, area.radius, area.angle, area.sweep, area.innerRadius || 0] };
                }
                else {
                    pels[idx].childNodes[0].setAttribute('d', AnimationHelper.getPathDescOfPie(area.center.x, area.center.y, area.radius, Math.PI * 2 + startAngle, 0, area.innerRadius || 0));
                    area = previousState.areas[0];
                    state.from = { pie: [area.center.x, area.center.y, area.radius, Math.PI * 2 + startAngle, 0, area.innerRadius || 0] };
                }
                animation.push(state);
            }
        }
    };
    FlexPieAnimation.prototype._playLoadPieAnimation = function (animations) {
        var self = this, chart = self._chart, animationMode = self.animationMode, areas = chart._areas, pels = chart._pels;
        pels.forEach(function (v, i) {
            var slice = v.childNodes[0], animation, d, from = {}, to = {};
            if (!slice) {
                return;
            }
            if (animationMode === AnimationMode.Point) {
                self._parsePathByAngle(areas[i], from, to);
                animation = self._getAnimation(animations, i);
            }
            else {
                self._parsePathByRadius(areas[i], from, to);
                animation = self._getAnimation(animations, 0);
            }
            self._setInitState(slice, from, to);
            animation.push({
                ele: slice,
                from: from,
                to: to
            });
        });
    };
    FlexPieAnimation.prototype._parsePathByRadius = function (segment, from, to) {
        var f, t, cx = segment.center.x, cy = segment.center.y, radius = segment.radius, startAngle = segment.angle, sweep = segment.sweep, innerRadius = segment.innerRadius;
        f = [cx, cy, 0, startAngle, sweep, 0];
        t = [cx, cy, radius, startAngle, sweep, innerRadius || 0];
        from['pie'] = f;
        to['pie'] = t;
    };
    FlexPieAnimation.prototype._parsePathByAngle = function (segment, from, to) {
        var f, t, cx = segment.center.x, cy = segment.center.y, radius = segment.radius, startAngle = segment.angle, sweep = segment.sweep, innerRadius = segment.innerRadius;
        f = [cx, cy, radius, startAngle, 0, innerRadius || 0];
        t = [cx, cy, radius, startAngle, sweep, innerRadius || 0];
        from['pie'] = f;
        from['stroke-width'] = 0;
        to['pie'] = t;
        to['stroke-width'] = 1;
    };
    return FlexPieAnimation;
}(FlexAnimation));
var FlexChartAnimation = (function (_super) {
    __extends(FlexChartAnimation, _super);
    function FlexChartAnimation(chart, updateEventArgs) {
        return _super.call(this, chart, updateEventArgs) || this;
    }
    FlexChartAnimation.prototype._clearState = function () {
        _super.prototype._clearState.call(this);
        var self = this;
        if (self._prevAxesStates) {
            self._prevAxesStates = null;
        }
        if (self._currAxesStates) {
            self._currAxesStates = null;
        }
    };
    FlexChartAnimation.prototype.playAnimation = function () {
        _super.prototype.playAnimation.call(this);
        var self = this, isLoad = true, chart = self._chart, isFinancial = (tryGetModuleWijmoChartFinance()) && (tryGetModuleWijmoChartFinance()).FinancialChart &&
            chart instanceof (tryGetModuleWijmoChartFinance()).FinancialChart, series = chart.series, len = series.length, i, s, chartType, seriesType, prevLen, prevState, prevXVal, currXVal, prev, animations = [];
        self._previousState = self._currentState;
        self._previousXVal = self._currentXVal;
        self._currentState = [];
        self._addStart = 0;
        self._removeStart = 0;
        self._currentXVal = chart._xlabels.slice();
        if (self._previousState && self._previousState.length) {
            isLoad = false;
            prevState = self._previousState;
            prevLen = prevState.length;
            prevXVal = self._previousXVal;
            currXVal = self._currentXVal;
            if (prevXVal.length > 2 && currXVal.length > 2) {
                i = currXVal.indexOf(prevXVal[0]);
                if (i > 0 && i < currXVal.length - 2) {
                    if (currXVal[i + 1] === prevXVal[1] && currXVal[i + 2] === prevXVal[2]) {
                        self._addStart = i;
                    }
                }
                else {
                    i = prevXVal.indexOf(currXVal[0]);
                    if (i > 0 && i < prevXVal.length - 2) {
                        if (prevXVal[i + 1] === currXVal[1] && prevXVal[i + 2] === currXVal[2]) {
                            self._removeStart = i;
                        }
                    }
                }
            }
        }
        for (i = 0; i < len; i++) {
            s = series[i];
            seriesType = s._getChartType() != null ? s._getChartType() : chart._getChartType();
            chartType = self._getChartType(seriesType);
            self._currentState.push({
                seriesType: seriesType,
                ele: s.hostElement
            });
            if (isFinancial) {
                self._playDefaultAnimation(animations, i);
            }
            else {
                prev = prevState && prevState[i];
                if (chartType === 'Default') {
                    self._playDefaultAnimation(animations, i);
                    continue;
                }
                if (isLoad || (prev && prev.seriesType !== seriesType)) {
                    self._playLoadAnimation(animations, i, chartType);
                }
                else {
                    self._playUpdateAnimation(animations, i, chartType, s, (prev && prev.ele) || null);
                    if (i === len - 1 && i < prevLen - 1) {
                        for (i++; i <= prevLen - 1; i++) {
                            self._playUpdateAnimation(animations, i, chartType, null, prev.ele);
                        }
                    }
                }
            }
        }
        self._adjustAnimations(chartType, animations);
        if (animations.length) {
            self._playAnimation(animations);
        }
        if (self.axisAnimation) {
            self._playAxesAnimation();
        }
    };
    FlexChartAnimation.prototype._playAxesAnimation = function () {
        var self = this, axes = self._chart.axes, len = axes.length, axis, i, maxLen;
        self._prevAxesStates = self._currAxesStates;
        self._currAxesStates = [];
        for (i = 0; i < len; i++) {
            axis = axes[i];
            if (axis.hostElement) {
                self._currAxesStates.push({
                    ele: axis.hostElement,
                    vals: axis._vals,
                    axis: axis,
                    maxValue: wjcCore.isDate(axis.actualMax) ? axis.actualMax.getTime() : axis.actualMax,
                    minValue: wjcCore.isDate(axis.actualMin) ? axis.actualMin.getTime() : axis.actualMin
                });
            }
        }
        if (!self._prevAxesStates) {
            return;
        }
        maxLen = Math.max(self._prevAxesStates.length, self._currAxesStates.length);
        for (i = 0; i < maxLen; i++) {
            self._playAxisAnimation(self._prevAxesStates[i], self._currAxesStates[i]);
        }
    };
    FlexChartAnimation.prototype._playAxisAnimation = function (prevAxisStates, currAxisStates) {
        var self = this, state, currAnimations = [], prevAnimations = [];
        if (currAxisStates && (currAxisStates.maxValue - currAxisStates.minValue)) {
            state = self._parseAxisState(currAxisStates);
            self._convertAxisAnimation(currAnimations, state.major, currAxisStates.axis, prevAxisStates.maxValue, prevAxisStates.minValue);
            self._convertAxisAnimation(currAnimations, state.minor, currAxisStates.axis, prevAxisStates.maxValue, prevAxisStates.minValue);
        }
        if (prevAxisStates && (prevAxisStates.maxValue - prevAxisStates.minValue)) {
            state = self._parseAxisState(prevAxisStates);
            self._convertAxisAnimation(prevAnimations, state.major, prevAxisStates.axis);
            self._convertAxisAnimation(prevAnimations, state.minor, prevAxisStates.axis);
        }
        if (currAnimations && prevAnimations) {
            self._combineAxisAnimations(currAnimations, prevAnimations);
        }
        self._playCurrAxisAnimation(currAnimations);
        self._playPrevAxisAnimation(prevAnimations);
    };
    FlexChartAnimation.prototype._combineAxisAnimations = function (curr, prev) {
        var _this = this;
        var len = prev.length, i, anim;
        for (i = len - 1; i >= 0; i--) {
            anim = prev[i];
            if (!anim.text) {
                continue;
            }
            curr.some(function (v) {
                if (v.text && v.text === anim.text) {
                    _this._combineAxisAnimation(v, anim);
                    prev.splice(i, 1);
                    return true;
                }
            });
        }
    };
    FlexChartAnimation.prototype._combineAxisAnimation = function (curr, prev) {
        var _this = this;
        ['label', 'majorGrid', 'tick'].forEach(function (v) {
            if (curr[v] && prev[v]) {
                _this._resetExistAxisAttrs(curr[v], prev[v]);
            }
        });
    };
    FlexChartAnimation.prototype._resetExistAxisAttrs = function (curr, prev) {
        var currEle = curr.ele, prevEle = prev.ele, calcPos = {}, elePos = {};
        ['x', 'y', 'x1', 'x2', 'y1', 'y2'].forEach(function (v) {
            var currAttr = currEle.getAttribute(v), prevAttr = prevEle.getAttribute(v);
            if (currAttr !== prevAttr) {
                calcPos[v] = prevAttr;
                elePos[v] = currAttr;
            }
        });
        curr.calcPos = calcPos;
        curr.elePos = elePos;
    };
    FlexChartAnimation.prototype._convertAxisAnimation = function (animations, state, axis, maxValue, minValue) {
        var _this = this;
        var host = axis.hostElement, animation, isVert = axis.axisType == wjcChart.AxisType.Y;
        state.forEach(function (v, i) {
            var tarPos = axis.convert(v.val, maxValue, minValue);
            if (isNaN(tarPos)) {
                return;
            }
            animation = {};
            if (v.majorGrid) {
                animation.majorGrid = _this._getAxisAnimationAttrs(v.majorGrid, host, tarPos, isVert);
            }
            if (v.label) {
                animation.label = _this._getAxisAnimationAttrs(v.label, host, tarPos, isVert);
                animation.text = v.label.innerHTML || v.label.textContent;
            }
            if (v.tick) {
                animation.tick = _this._getAxisAnimationAttrs(v.tick, host, tarPos, isVert);
            }
            animations.push(animation);
        });
    };
    FlexChartAnimation.prototype._getAxisAnimationAttrs = function (ele, parent, tarPos, isVert) {
        var state, attr, elePos;
        state = {
            ele: ele,
            parent: parent,
            elePos: {},
            calcPos: {}
        };
        if (ele.nodeName === 'text') {
            attr = isVert ? 'y' : 'x';
            elePos = Number(ele.getAttribute(attr));
            state.elePos[attr] = elePos;
            state.calcPos[attr] = tarPos;
        }
        else {
            attr = isVert ? 'y1' : 'x1';
            elePos = Number(ele.getAttribute(attr));
            if (isVert) {
                state.elePos = {
                    y1: elePos,
                    y2: elePos
                };
                state.calcPos = {
                    y1: tarPos,
                    y2: tarPos
                };
            }
            else {
                state.elePos = {
                    x1: elePos,
                    x2: elePos
                };
                state.calcPos = {
                    x1: tarPos,
                    x2: tarPos
                };
            }
        }
        state.elePos.opacity = 1;
        state.calcPos.opacity = 0;
        return state;
    };
    FlexChartAnimation.prototype._playCurrAxisAnimation = function (animations) {
        var duration = this.duration;
        if (!animations || animations.length === 0) {
            return;
        }
        animations.forEach(function (val) {
            ['majorGrid', 'label', 'tick'].forEach(function (p) {
                var v = val[p];
                if (!v) {
                    return;
                }
                var par = v.parent, ele = v.ele, elePos = v.elePos, calcPos = v.calcPos;
                AnimationHelper.playAnimation(ele, calcPos, elePos, null, Easing.Swing, duration);
            });
        });
    };
    FlexChartAnimation.prototype._playPrevAxisAnimation = function (animations) {
        var duration = this.duration;
        if (!animations || animations.length === 0) {
            return;
        }
        animations.forEach(function (val) {
            ['majorGrid', 'label', 'tick'].forEach(function (p) {
                var v = val[p];
                if (!v) {
                    return;
                }
                var par = v.parent, ele = v.ele, elePos = v.elePos, calcPos = v.calcPos;
                par.appendChild(ele);
                AnimationHelper.playAnimation(ele, elePos, calcPos, function () {
                    if (ele.parentNode === par) {
                        par.removeChild(ele);
                    }
                }, Easing.Swing, duration);
            });
        });
    };
    FlexChartAnimation.prototype._parseAxisState = function (axisState) {
        if (axisState == null) {
            return null;
        }
        var vals = axisState.vals, axis = axisState.axis, isVert = axis.axisType == wjcChart.AxisType.Y, ele = axisState.ele, eles = ele.childNodes, eleIdx = 0, majors = vals.major, minors = vals.minor, lbls = vals.hasLbls, majorStates = [], minorStates = [];
        majors && majors.forEach(function (v, i) {
            var val = {}, el, lbl = !!lbls[i];
            majorStates.push(val);
            val.val = v;
            el = eles[eleIdx];
            if (axis.majorGrid && wjcCore.hasClass(el, wjcChart.FlexChart._CSS_GRIDLINE)) {
                val.majorGrid = el;
                eleIdx++;
                el = eles[eleIdx];
            }
            if (isVert) {
                if (lbl && el && axis.majorTickMarks !== wjcChart.TickMark.None && wjcCore.hasClass(el, wjcChart.FlexChart._CSS_TICK)) {
                    val.tick = el;
                    eleIdx++;
                    el = eles[eleIdx];
                }
                if (lbl && el && (wjcCore.hasClass(el, wjcChart.FlexChart._CSS_LABEL) || el.querySelector('.' + wjcChart.FlexChart._CSS_LABEL))) {
                    val.label = el;
                    eleIdx++;
                }
            }
            else {
                if (lbl && el && (wjcCore.hasClass(el, wjcChart.FlexChart._CSS_LABEL) || el.querySelector('.' + wjcChart.FlexChart._CSS_LABEL))) {
                    val.label = el;
                    eleIdx++;
                    el = eles[eleIdx];
                }
                if (lbl && el && axis.majorTickMarks !== wjcChart.TickMark.None && wjcCore.hasClass(el, wjcChart.FlexChart._CSS_TICK)) {
                    val.tick = el;
                    eleIdx++;
                }
            }
        });
        minors && minors.forEach(function (v, i) {
            var val = {}, el;
            minorStates.push(val);
            val.val = v;
            el = eles[eleIdx];
            if (axis.minorTickMarks !== wjcChart.TickMark.None && wjcCore.hasClass(el, wjcChart.FlexChart._CSS_TICK_MINOR)) {
                val.tick = el;
                eleIdx++;
                el = eles[eleIdx];
            }
            if (axis.minorGrid && wjcCore.hasClass(el, wjcChart.FlexChart._CSS_GRIDLINE_MINOR)) {
                val.majorGrid = el;
                eleIdx++;
            }
        });
        return {
            major: majorStates,
            minor: minorStates
        };
    };
    FlexChartAnimation.prototype._playLoadAnimation = function (animations, i, chartType) {
        this['_playLoad' + chartType + 'Animation'](animations, i);
    };
    FlexChartAnimation.prototype._playUpdateAnimation = function (animations, i, chartType, series, prevState) {
        if (series == null || prevState == null) {
            if (series == null) {
                this['_play' + chartType + 'RemoveAnimation'](animations, prevState);
            }
            else {
                this['_play' + chartType + 'AddAnimation'](animations, series);
            }
        }
        else {
            this['_play' + chartType + 'MoveAnimation'](animations, series, prevState);
        }
    };
    FlexChartAnimation.prototype._adjustAnimations = function (chartType, animations) {
        var len = animations.length, idx;
        if (chartType === 'Column' || chartType === 'Bar') {
            for (idx = len - 1; idx >= 0; idx--) {
                if (animations[idx] == null) {
                    animations.splice(idx, 1);
                }
            }
        }
    };
    FlexChartAnimation.prototype._getChartType = function (chartType) {
        var cType = 'Default', isRotated = this._chart._isRotated();
        switch (chartType) {
            case wjcChart.ChartType.Scatter:
            case wjcChart.ChartType.Bubble:
            case wjcChart.ChartType.Candlestick:
            case wjcChart.ChartType.HighLowOpenClose:
                cType = 'Scatter';
                break;
            case wjcChart.ChartType.Column:
            case wjcChart.ChartType.Bar:
                if (isRotated) {
                    cType = 'Bar';
                }
                else {
                    cType = 'Column';
                }
                break;
            case wjcChart.ChartType.Line:
            case wjcChart.ChartType.LineSymbols:
            case wjcChart.ChartType.Area:
            case wjcChart.ChartType.Spline:
            case wjcChart.ChartType.SplineSymbols:
            case wjcChart.ChartType.SplineArea:
                cType = 'Line';
                break;
            default:
                cType = 'Default';
                break;
        }
        return cType;
    };
    FlexChartAnimation.prototype._playLoadLineAnimation = function (animations, index) {
        var self = this, series = self._chart.series[index], animationMode = self.animationMode, ele = series.hostElement, froms = [], tos = [], eles = [], animation;
        if (animationMode === AnimationMode.Point) {
            self._playDefaultAnimation(animations, index);
        }
        else {
            if (animationMode === AnimationMode.All) {
                animation = self._getAnimation(animations, 0);
            }
            else {
                animation = self._getAnimation(animations, index);
            }
            [].slice.call(ele.childNodes).forEach(function (v) {
                self._setLineRiseDiveAnimation(animation, v, true);
            });
        }
    };
    FlexChartAnimation.prototype._setLineRiseDiveAnimation = function (animation, ele, isRise) {
        var _this = this;
        var self = this, chart = self._chart, nodeName = ele.nodeName, fromPoints = [], toPoints = [], bounds = self._chart._plotRect, top = bounds['top'] + bounds['height'], left = bounds['left'], f, t, from = {}, to = {}, len, idx, item, points, done;
        if (nodeName === 'g' && ele.childNodes) {
            [].slice.call(ele.childNodes).forEach(function (v) {
                _this._setLineRiseDiveAnimation(animation, v, isRise);
            });
            return;
        }
        else if (nodeName === 'polyline' || nodeName === 'polygon') {
            points = ele.points;
            len = points.length || points.numberOfItems;
            for (idx = 0; idx < len; idx++) {
                item = points[idx] || points.getItem(idx);
                if (chart.rotated) {
                    fromPoints.push({ x: left, y: item.y });
                }
                else {
                    fromPoints.push({ x: item.x, y: top });
                }
                toPoints.push({ x: item.x, y: item.y });
            }
            from[nodeName] = fromPoints;
            to[nodeName] = toPoints;
        }
        else if (nodeName === 'ellipse') {
            self._toggleVisibility(ele, false);
            if (isRise) {
                done = function () {
                    self._toggleVisibility(ele, true);
                };
            }
        }
        f = isRise ? from : to;
        t = isRise ? to : from;
        self._setInitState(ele, f, t);
        animation.push({
            ele: ele,
            from: f,
            to: t,
            done: done
        });
    };
    FlexChartAnimation.prototype._setLineMoveAnimation = function (animation, ori, tar, ele, done) {
        if (ori == null || tar == null) {
            return;
        }
        var self = this, nodeName = ori.nodeName, fromPoints = [], toPoints = [], from = {}, to = {}, oriLen, oriItem, oriPoints, tarLen, tarItem, tarPoints, idx, len, isPolyGon, added = 0;
        isPolyGon = nodeName === 'polygon';
        oriPoints = ori.points;
        tarPoints = tar.points;
        oriLen = oriPoints.length || oriPoints.numberOfItems;
        tarLen = tarPoints.length || tarPoints.numberOfItems;
        len = Math.max(oriLen, tarLen);
        for (idx = 0; idx < len; idx++) {
            if (idx < oriLen) {
                oriItem = oriPoints[idx] || oriPoints.getItem(idx);
                fromPoints.push({ x: oriItem.x, y: oriItem.y });
            }
            if (idx < tarLen) {
                tarItem = tarPoints[idx] || tarPoints.getItem(idx);
                toPoints.push({ x: tarItem.x, y: tarItem.y });
            }
        }
        if (self._addStart) {
            self._adjustStartLinePoints(self._addStart, fromPoints, oriPoints);
            oriLen += self._addStart;
        }
        else if (self._removeStart) {
            self._adjustStartLinePoints(self._removeStart, toPoints, tarPoints);
            tarLen += self._removeStart;
        }
        if (tarLen > oriLen) {
            self._adjustEndLinePoints(tarLen, oriLen, fromPoints, oriPoints, isPolyGon);
        }
        else if (tarLen < oriLen) {
            self._adjustEndLinePoints(oriLen, tarLen, toPoints, tarPoints, isPolyGon);
        }
        from[nodeName] = fromPoints;
        to[nodeName] = toPoints;
        self._setInitState(ele, from, to);
        animation.push({
            ele: ele,
            from: from,
            to: to,
            done: done
        });
    };
    FlexChartAnimation.prototype._adjustStartLinePoints = function (len, points, oriPoints) {
        var item = oriPoints[0] || oriPoints.getItem(0);
        while (len) {
            points.splice(0, 0, { x: item.x, y: item.y });
            len--;
        }
    };
    FlexChartAnimation.prototype._adjustEndLinePoints = function (oriLen, tarLen, points, oriPoints, isPolygon) {
        var rightBottom, leftBottom, item;
        if (isPolygon && (oriPoints.length >= 3 || oriPoints.numberOfItems >= 3)) {
            leftBottom = points.pop();
            rightBottom = points.pop();
            item = oriPoints[oriPoints.length - 3] || oriPoints.getItem(oriPoints.numberOfItems - 3);
        }
        else if (oriPoints.length > 0 || oriPoints.numberOfItems > 0) {
            item = oriPoints[oriPoints.length - 1] || oriPoints.getItem(oriPoints.numberOfItems - 1);
        }
        while (oriLen > tarLen && item) {
            points.push({ x: item.x, y: item.y });
            tarLen++;
        }
        if (isPolygon && leftBottom && rightBottom) {
            points.push(rightBottom);
            points.push(leftBottom);
        }
    };
    FlexChartAnimation.prototype._playLineRemoveAnimation = function (animations, prevState) {
        var self = this, chart = self._chart, parNode = chart.series[0].hostElement.parentNode, animation = self._getAnimation(animations, 0), done;
        parNode.appendChild(prevState);
        [].slice.call(prevState.childNodes).forEach(function (v) {
            self._setLineRiseDiveAnimation(animation, v, false);
        });
        if (animation.length) {
            done = animation[0].done;
            animation[0].done = function () {
                if (prevState && prevState.parentNode === parNode) {
                    parNode.removeChild(prevState);
                }
                if (done) {
                    done();
                }
            };
        }
    };
    FlexChartAnimation.prototype._playLineAddAnimation = function (animations, series) {
        var _this = this;
        var ele = series.hostElement, animation = this._getAnimation(animations, 0), eles = [], froms = [], tos = [];
        [].slice.call(ele.childNodes).forEach(function (v) {
            _this._setLineRiseDiveAnimation(animation, v, true);
        });
    };
    FlexChartAnimation.prototype._playLineMoveAnimation = function (animations, series, prevState) {
        var self = this, chart = self._chart, animation = self._getAnimation(animations, 0), symbols = [], ele, eles, prevEles, prevEle, nodeName;
        ele = series.hostElement;
        prevEles = [].slice.call(prevState.childNodes);
        eles = [].slice.call(ele.childNodes);
        eles.forEach(function (v, i) {
            nodeName = v.nodeName;
            prevEle = prevEles[i];
            if (nodeName === 'g' && v.nodeChilds) {
                [].slice.call(v.nodeChilds).forEach(function (cv, j) {
                    if (prevEle) {
                        symbols.push(cv);
                        self._toggleVisibility(cv, false);
                    }
                });
            }
            else if (nodeName === 'polygon' || nodeName === 'polyline') {
                self._setLineMoveAnimation(animation, prevEle, v, v, i === 0 ? function () {
                    symbols.forEach(function (s) {
                        self._toggleVisibility(s, true);
                    });
                    symbols = null;
                } : null);
            }
            else if (prevEle) {
                symbols.push(v);
                self._toggleVisibility(v, false);
            }
        });
    };
    FlexChartAnimation.prototype._playLoadColumnAnimation = function (animations, index) {
        this._playLoadBarAnimation(animations, index, true);
    };
    FlexChartAnimation.prototype._playLoadBarAnimation = function (animations, index, vertical) {
        if (vertical === void 0) { vertical = false; }
        var self = this, series = self._chart.series[index], animationMode = self.animationMode, ele = series.hostElement, eles;
        eles = [].slice.call(ele.childNodes);
        eles.forEach(function (v, i) {
            var animation, nodeName = v.nodeName;
            ;
            if (animationMode === AnimationMode.Point) {
                animation = self._getAnimation(animations, i);
            }
            else if (animationMode === AnimationMode.Series) {
                animation = self._getAnimation(animations, index);
            }
            else {
                animation = self._getAnimation(animations, 0);
            }
            if (nodeName === 'g') {
                if (v.childNodes) {
                    [].slice.call(v.childNodes).forEach(function (cv, j) {
                        self._setLoadBarAnimation(animation, cv, vertical);
                    });
                }
            }
            else {
                self._setLoadBarAnimation(animation, v, vertical);
            }
        });
    };
    FlexChartAnimation.prototype._setBarAnimation = function (animation, ele, from, to, done) {
        this._setInitState(ele, from, to);
        animation.push({
            ele: ele,
            from: from,
            to: to,
            done: done
        });
    };
    FlexChartAnimation.prototype._setLoadBarAnimation = function (animation, ele, vertical, reverse, done) {
        if (reverse === void 0) { reverse = false; }
        var self = this, attr = vertical ? 'height' : 'width', xy = vertical ? 'y' : 'x', attrVal = ele.getAttribute(attr), xyVal = ele.getAttribute(xy), topLeft = vertical ? 'top' : 'left', bounds = self._chart._plotRect, f, t, from = {}, to = {};
        from[attr] = 0;
        to[attr] = Number(attrVal);
        if (vertical) {
            from[xy] = bounds[attr] + bounds[topLeft];
            to[xy] = Number(xyVal);
        }
        f = reverse ? to : from;
        t = reverse ? from : to;
        if (ele.nodeName === 'g') {
            if (ele.childNodes) {
                [].slice.call(ele.childNodes).forEach(function (v) {
                    self._setBarAnimation(animation, v, f, t, done);
                });
            }
        }
        else {
            self._setBarAnimation(animation, ele, f, t, done);
        }
    };
    FlexChartAnimation.prototype._setMoveBarAnimation = function (animation, ori, tar) {
        var from = {}, to = {};
        if (ori == null || tar == null) {
            return;
        }
        ['width', 'height', 'x', 'y', 'top', 'left'].forEach(function (attr) {
            var oriAttr = ori.getAttribute(attr), tarAttr = tar.getAttribute(attr);
            if (oriAttr !== tarAttr) {
                from[attr] = Number(oriAttr);
                to[attr] = Number(tarAttr);
            }
        });
        this._setInitState(tar, from, to);
        animation.push({
            ele: tar,
            from: from,
            to: to
        });
    };
    FlexChartAnimation.prototype._playColumnRemoveAnimation = function (animations, prevState) {
        this._playBarRemoveAnimation(animations, prevState, true);
    };
    FlexChartAnimation.prototype._playColumnAddAnimation = function (animations, series) {
        this._playBarAddAnimation(animations, series, true);
    };
    FlexChartAnimation.prototype._playColumnMoveAnimation = function (animations, series, prevState) {
        this._playBarMoveAnimation(animations, series, prevState, true);
    };
    FlexChartAnimation.prototype._playBarRemoveAnimation = function (animations, prevState, vertical) {
        if (vertical === void 0) { vertical = false; }
        var self = this, chart = self._chart, parNode = chart.series[0].hostElement.parentNode, animation = self._getAnimation(animations, 0), eles;
        parNode.appendChild(prevState);
        eles = [].slice.call(prevState.childNodes);
        eles.forEach(function (v) {
            self._setLoadBarAnimation(animation, v, vertical, true);
        });
        if (animation.length) {
            animation[0].done = function () {
                if (prevState && prevState.parentNode === parNode) {
                    parNode.removeChild(prevState);
                }
            };
        }
    };
    FlexChartAnimation.prototype._playBarAddAnimation = function (animations, series, vertical) {
        var _this = this;
        if (vertical === void 0) { vertical = false; }
        var ele = series.hostElement, animation = this._getAnimation(animations, 2), eles;
        eles = [].slice.call(ele.childNodes);
        eles.forEach(function (v) {
            _this._setLoadBarAnimation(animation, v, vertical, false);
        });
    };
    FlexChartAnimation.prototype._playBarMoveAnimation = function (animations, series, prevState, vertical) {
        if (vertical === void 0) { vertical = false; }
        var self = this, chart = self._chart, ele, eles, parNode, prevEles, prevEle, prevLen, len, idx;
        ele = series.hostElement;
        prevEles = [].slice.call(prevState.childNodes);
        if (self._addStart) {
            idx = 0;
            prevEle = prevEles[0];
            while (idx < self._addStart) {
                prevEles.splice(0, 0, prevEle);
                idx++;
            }
        }
        if (self._removeStart) {
            idx = 0;
            prevEle = prevEles[prevEles.length - 1];
            while (idx < self._removeStart) {
                var e = prevEles.shift();
                prevEles.push(e);
                idx++;
            }
        }
        prevLen = prevEles.length;
        eles = [].slice.call(ele.childNodes);
        len = eles.length;
        eles.forEach(function (v, i) {
            var animation;
            if (i < prevLen) {
                prevEle = prevEles[i];
                if (i < self._addStart) {
                    animation = self._getAnimation(animations, 2);
                    self._setLoadBarAnimation(animation, v, vertical, false);
                }
                else if (i >= prevLen - self._removeStart) {
                    animation = self._getAnimation(animations, 2);
                    self._setLoadBarAnimation(animation, v, vertical, false);
                    animation = self._getAnimation(animations, 0);
                    self._removeBarAnimation(animation, v, prevEle, vertical);
                }
                else {
                    animation = self._getAnimation(animations, 1);
                    self._setMoveBarAnimation(animation, prevEle, v);
                }
                if (i === len - 1 && i < prevLen - 1) {
                    animation = self._getAnimation(animations, 0);
                    for (i++; i < prevLen; i++) {
                        prevEle = prevEles[i];
                        self._removeBarAnimation(animation, v, prevEle, vertical);
                    }
                }
            }
            else {
                animation = self._getAnimation(animations, 2);
                self._setLoadBarAnimation(animation, v, vertical, false);
            }
        });
    };
    FlexChartAnimation.prototype._removeBarAnimation = function (animation, ele, prevEle, vertical) {
        var parNode = ele.parentNode;
        parNode.appendChild(prevEle);
        this._setLoadBarAnimation(animation, prevEle, vertical, true, (function (ele) {
            return function () {
                if (ele.parentNode && ele.parentNode === parNode) {
                    parNode.removeChild(ele);
                }
            };
        })(prevEle));
    };
    FlexChartAnimation.prototype._playLoadScatterAnimation = function (animations, index) {
        var self = this, chart = self._chart, series = chart.series[index], animationMode = self.animationMode, ele = series.hostElement, xValues = series._xValues || chart._xvals, eles;
        if (xValues.length === 0) {
            xValues = series._pointIndexes;
        }
        eles = [].slice.call(ele.childNodes);
        eles.forEach(function (v, i) {
            var animation;
            if (animationMode === AnimationMode.Point) {
                animation = self._getScatterAnimation(animations, xValues[i]);
            }
            else if (animationMode === AnimationMode.Series) {
                animation = self._getAnimation(animations, index);
            }
            else {
                animation = self._getAnimation(animations, 0);
            }
            self._setLoadScatterAnimation(animation, v, false);
        });
    };
    FlexChartAnimation.prototype._setLoadScatterAnimation = function (animation, ele, reverse, done) {
        var _this = this;
        if (reverse === void 0) { reverse = false; }
        var f, t, from = {}, to = {};
        if (ele.nodeName === 'g' && ele.childNodes) {
            [].slice.call(ele.childNodes).forEach(function (v) {
                _this._setLoadScatterAnimation(animation, v, reverse, done);
            });
            return;
        }
        ['rx', 'ry', 'stroke-width'].forEach(function (attr) {
            var val = ele.getAttribute(attr);
            from[attr] = 0;
            to[attr] = Number(val);
        });
        f = reverse ? to : from;
        t = reverse ? from : to;
        this._setInitState(ele, f, t);
        animation.push({
            ele: ele,
            from: f,
            to: t,
            done: done
        });
    };
    FlexChartAnimation.prototype._setUpdateScatterAnimation = function (animation, srcEle, tarEle, done) {
        var from = {}, to = {};
        ['cx', 'cy'].forEach(function (attr) {
            var src = srcEle.getAttribute(attr), tar = tarEle.getAttribute(attr);
            if (src !== tar) {
                from[attr] = Number(src);
                to[attr] = Number(tar);
            }
        });
        this._setInitState(tarEle, from, to);
        animation.push({
            ele: tarEle,
            from: from,
            to: to,
            done: done
        });
    };
    FlexChartAnimation.prototype._getScatterAnimation = function (animations, x) {
        var idx = this._getScatterAnimationIndex(animations, x);
        if (!animations[idx]) {
            animations[idx] = [];
        }
        return animations[idx];
    };
    FlexChartAnimation.prototype._getScatterAnimationIndex = function (animations, x) {
        var chart = this._chart, axis = chart.axisX, min = axis.min == null ? axis.actualMin : axis.min, max = axis.max == null ? axis.actualMax : axis.max, idx;
        idx = Math.ceil((x - min) / ((max - min) / 20));
        return idx;
    };
    FlexChartAnimation.prototype._playScatterRemoveAnimation = function (animations, prevState) {
        var self = this, chart = self._chart, parNode = chart.series[0].hostElement.parentNode, animation = self._getAnimation(animations, 0), eles;
        parNode.appendChild(prevState);
        eles = [].slice.call(prevState.childNodes);
        eles.forEach(function (v) {
            self._setLoadScatterAnimation(animation, v, true);
        });
        if (animation.length) {
            animation[0].done = function () {
                if (prevState && prevState.parentNode === parNode) {
                    parNode.removeChild(prevState);
                }
            };
        }
    };
    FlexChartAnimation.prototype._playScatterAddAnimation = function (animations, series) {
        var _this = this;
        var ele = series.hostElement, animation = this._getAnimation(animations, 0), eles;
        eles = [].slice.call(ele.childNodes);
        eles.forEach(function (v) {
            _this._setLoadScatterAnimation(animation, v, false);
        });
    };
    FlexChartAnimation.prototype._playScatterMoveAnimation = function (animations, series, prevState) {
        var self = this, chart = self._chart, animation = self._getAnimation(animations, 0), ele, eles, parNode, prevEles, prevEle, prevLen, len, idx;
        ele = series.hostElement;
        prevEles = [].slice.call(prevState.childNodes);
        if (self._addStart) {
            idx = 0;
            prevEle = prevEles[0];
            while (idx < self._addStart) {
                prevEles.splice(0, 0, prevEle);
                idx++;
            }
        }
        if (self._removeStart) {
            idx = 0;
            prevEle = prevEles[prevEles.length - 1];
            while (idx < self._removeStart) {
                var e = prevEles.shift();
                prevEles.push(e);
                idx++;
            }
        }
        prevLen = prevEles.length;
        eles = [].slice.call(ele.childNodes);
        len = eles.length;
        eles.forEach(function (v, i) {
            if (i < prevLen) {
                if (i < self._addStart) {
                    self._setLoadScatterAnimation(animation, v, false);
                }
                else if (i >= prevLen - self._removeStart) {
                    self._setLoadScatterAnimation(animation, v, false);
                    prevEle = prevEles[i];
                    self._removeScatterAnimation(animation, v, prevEle);
                }
                else {
                    prevEle = prevEles[i];
                    self._setUpdateScatterAnimation(animation, prevEle, v);
                }
                if (i === len - 1 && i < prevLen - 1) {
                    for (i++; i < prevLen; i++) {
                        prevEle = prevEles[i];
                        self._removeScatterAnimation(animation, v, prevEle);
                    }
                }
            }
            else {
                self._setLoadScatterAnimation(animation, v, false);
            }
        });
    };
    FlexChartAnimation.prototype._removeScatterAnimation = function (animation, ele, prevEle) {
        var parNode = ele.parentNode;
        parNode.appendChild(prevEle);
        this._setLoadScatterAnimation(animation, prevEle, true, (function (ele) {
            return function () {
                if (ele.parentNode && ele.parentNode === parNode) {
                    parNode.removeChild(ele);
                }
            };
        })(prevEle));
    };
    FlexChartAnimation.prototype._playDefaultAnimation = function (animations, index) {
        var chart = this._chart, series = chart.series[index], ele = series.hostElement, bounds = chart._plotRect, engine = chart._currentRenderEngine, oriClipPath = ele.getAttribute('clip-path'), clipPathID = 'clipPath' + (1000000 * Math.random()).toFixed(), clipPath, animation;
        engine.addClipRect(new wjcCore.Rect(bounds.left, bounds.top, 0, bounds.height), clipPathID);
        ele.setAttribute('clip-path', 'url(#' + clipPathID + ')');
        clipPath = chart.hostElement.querySelector('#' + clipPathID);
        animation = this._getAnimation(animations, 0);
        animation.push({
            ele: clipPath.querySelector('rect'),
            from: { width: 0 },
            to: { width: bounds.width },
            done: function () {
                if (!ele) {
                    return;
                }
                if (oriClipPath) {
                    ele.setAttribute('clip-path', oriClipPath);
                }
                else {
                    ele.removeAttribute('clip-path');
                }
                if (clipPath && clipPath.parentNode) {
                    clipPath.parentNode.removeChild(clipPath);
                }
            }
        });
    };
    return FlexChartAnimation;
}(FlexAnimation));
var FlexRadarAnimation = (function (_super) {
    __extends(FlexRadarAnimation, _super);
    function FlexRadarAnimation(chart, updateEventArgs) {
        return _super.call(this, chart, updateEventArgs) || this;
    }
    FlexRadarAnimation.prototype._getDurationAndDelay = function (aniLen, duration) {
        var dd = _super.prototype._getDurationAndDelay.call(this, aniLen, duration);
        if (this.animationMode === AnimationMode.Point) {
            dd.duration = duration / aniLen;
            dd.delay = duration / aniLen;
        }
        return dd;
    };
    FlexRadarAnimation.prototype._playAxesAnimation = function () { };
    FlexRadarAnimation.prototype._getChartType = function (chartType) {
        var cType = _super.prototype._getChartType.call(this, chartType);
        if (cType === 'Bar') {
            cType = 'Column';
        }
        return cType;
    };
    FlexRadarAnimation.prototype._playLoadLineAnimation = function (animations, index) {
        var self = this, chart = self._chart, series = self._chart.series[index], xValues = series._xValues || chart._xvals, animationMode = self.animationMode, ele = series.hostElement, animation, offset, eles;
        if (animationMode === AnimationMode.Point) {
            if (xValues.length === 0) {
                xValues = series._pointIndexes;
            }
            eles = [].slice.call(ele.childNodes);
            offset = eles.length - ele.querySelectorAll('ellipse').length;
            eles.forEach(function (v, i) {
                self._setRadarLinePointAnimation(animations, v, i, xValues, offset);
            });
        }
        else {
            if (animationMode === AnimationMode.All) {
                animation = self._getAnimation(animations, 0);
            }
            else {
                animation = self._getAnimation(animations, index);
            }
            [].slice.call(ele.childNodes).forEach(function (v) {
                self._setLineRiseDiveAnimation(animation, v, true);
            });
        }
    };
    FlexRadarAnimation.prototype._setRadarLinePointAnimation = function (animations, ele, index, xValues, offset) {
        var self = this, chart = self._chart, nodeName = ele.nodeName, fromPoints = [], toPoints = [], fPoints = [], tPoints = [], center = chart._center, indices = [], setInit = false, from = {}, to = {}, len, idx, item, points, done, animation, aniIdx, itemIndex = 0;
        if (nodeName === 'polyline' || nodeName === 'polygon') {
            points = ele.points;
            len = points.length || points.numberOfItems;
            for (idx = 0; idx < len; idx++) {
                aniIdx = self._getScatterAnimationIndex(animations, xValues[idx]);
                if (!indices[aniIdx]) {
                    indices[aniIdx] = [];
                }
                indices[aniIdx].push(idx);
                item = points[idx] || points.getItem(idx);
                fromPoints.push({ x: center.x, y: center.y });
                toPoints.push({ x: item.x, y: item.y });
            }
            for (idx = 0, len = indices.length; idx < len; idx++) {
                if (indices[idx]) {
                    animation = self._getAnimation(animations, itemIndex);
                    fPoints = tPoints.length ? tPoints.slice() : fromPoints.slice();
                    tPoints = fPoints.slice();
                    indices[idx].forEach(function (v) {
                        var pt = toPoints[v];
                        tPoints[v] = { x: pt.x, y: pt.y };
                    });
                    from = {};
                    to = {};
                    from[nodeName] = fPoints;
                    to[nodeName] = tPoints;
                    if (!setInit) {
                        self._setInitState(ele, from, to);
                        setInit = true;
                    }
                    animation.push({
                        ele: ele,
                        from: from,
                        to: to,
                        done: done
                    });
                    itemIndex++;
                }
            }
        }
        else if (nodeName === 'ellipse') {
            idx = index - (offset || 0);
            if (idx < 0) {
                return;
            }
            if (chart._isPolar) {
                animation = self._getScatterAnimation(animations, xValues[idx]);
            }
            else {
                animation = self._getScatterAnimation(animations, idx);
            }
            self._toggleVisibility(ele, false);
            done = function () {
                self._toggleVisibility(ele, true);
            };
            animation.push({
                ele: ele,
                from: from,
                to: to,
                done: done
            });
        }
    };
    FlexRadarAnimation.prototype._setLineRiseDiveAnimation = function (animation, ele, isRise) {
        var self = this, chart = self._chart, nodeName = ele.nodeName, fromPoints = [], toPoints = [], center = chart._center, f, t, from = {}, to = {}, len, idx, item, points, done;
        if (nodeName === 'polyline' || nodeName === 'polygon') {
            points = ele.points;
            len = points.length || points.numberOfItems;
            for (idx = 0; idx < len; idx++) {
                item = points[idx] || points.getItem(idx);
                fromPoints.push({ x: center.x, y: center.y });
                toPoints.push({ x: item.x, y: item.y });
            }
            from[nodeName] = fromPoints;
            to[nodeName] = toPoints;
        }
        else if (nodeName === 'ellipse') {
            self._toggleVisibility(ele, false);
            if (isRise) {
                done = function () {
                    self._toggleVisibility(ele, true);
                };
            }
        }
        f = isRise ? from : to;
        t = isRise ? to : from;
        self._setInitState(ele, f, t);
        animation.push({
            ele: ele,
            from: f,
            to: t,
            done: done
        });
    };
    FlexRadarAnimation.prototype._parsePathByRadius = function (segment, from, to) {
        var f, t, cx = segment.center.x, cy = segment.center.y, radius = segment.radius, startAngle = segment.angle, sweep = segment.sweep, innerRadius = segment.innerRadius;
        f = [cx, cy, 0, startAngle, sweep, 0];
        t = [cx, cy, radius, startAngle, sweep, innerRadius || 0];
        from['pie'] = f;
        to['pie'] = t;
    };
    FlexRadarAnimation.prototype._playUpdateAnimation = function (animations, i, chartType, series, prevState) {
        if (chartType === 'Bar' || chartType === 'Column') {
            if (series == null) {
                return;
            }
            this._playLoadBarAnimation(animations, i, false);
        }
        else {
            _super.prototype._playUpdateAnimation.call(this, animations, i, chartType, series, prevState);
        }
    };
    FlexRadarAnimation.prototype._playLoadBarAnimation = function (animations, index, vertical) {
        if (vertical === void 0) { vertical = false; }
        var self = this, chart = self._chart, series = chart.series[index], areas = chart._areas[index], animationMode = self.animationMode, ele = series.hostElement, eles;
        eles = [].slice.call(ele.childNodes);
        eles.forEach(function (v, i) {
            var animation, from = {}, to = {}, area;
            if (animationMode === AnimationMode.Point) {
                animation = self._getAnimation(animations, i);
            }
            else if (animationMode === AnimationMode.Series) {
                animation = self._getAnimation(animations, index);
            }
            else {
                animation = self._getAnimation(animations, 0);
            }
            area = areas[i];
            self._parsePathByRadius(area, from, to);
            self._setInitState(v, from, to);
            animation.push({
                ele: v,
                from: from,
                to: to
            });
        });
    };
    return FlexRadarAnimation;
}(FlexChartAnimation));
var AnimationHelper = (function () {
    function AnimationHelper() {
    }
    AnimationHelper.playAnimations = function (els, from, to, done, easing, duration, step) {
        if (easing === void 0) { easing = Easing.Swing; }
        var len = els.length, count = 0, timers = [];
        els.forEach(function (v, i) {
            var timer = AnimationHelper.playAnimation(v, from[i], to[i], function () {
                if (count === len - 1 && done) {
                    done();
                }
                count++;
            }, easing, duration, step);
            timers.push(timer);
        });
        return timers;
    };
    AnimationHelper.playAnimation = function (el, from, to, done, easing, duration, step) {
        if (easing === void 0) { easing = Easing.Swing; }
        var state = AnimationHelper.parseAttrs(from, to);
        return AnimationHelper.animate(function (p) {
            AnimationHelper.setElementAttr(el, state, p);
        }, done, easing, duration, step);
    };
    AnimationHelper.setElementAttr = function (ele, state, p) {
        var st, attr;
        for (attr in state) {
            st = state[attr];
            AnimationHelper.calcValue(st, p);
            ele.setAttribute(attr, st.getValue(st.value, p));
        }
    };
    AnimationHelper.getPathDescOfPie = function (cx, cy, radius, startAngle, sweepAngle, innerRadius) {
        if (innerRadius === void 0) { innerRadius = 0; }
        var isFull = false;
        if (sweepAngle >= Math.PI * 2) {
            isFull = true;
            sweepAngle = Math.PI * 2 - 0.001;
        }
        var p1 = new wjcCore.Point(cx, cy);
        p1.x += radius * Math.cos(startAngle);
        p1.y += radius * Math.sin(startAngle);
        var a2 = startAngle + sweepAngle;
        var p2 = new wjcCore.Point(cx, cy);
        p2.x += radius * Math.cos(a2);
        p2.y += radius * Math.sin(a2);
        if (innerRadius) {
            var p3 = new wjcCore.Point(cx, cy);
            p3.x += innerRadius * Math.cos(a2);
            p3.y += innerRadius * Math.sin(a2);
            var p4 = new wjcCore.Point(cx, cy);
            p4.x += innerRadius * Math.cos(startAngle);
            p4.y += innerRadius * Math.sin(startAngle);
        }
        var opt1 = ' 0 0,1 ', opt2 = ' 0 0,0 ';
        if (Math.abs(sweepAngle) > Math.PI) {
            opt1 = ' 0 1,1 ';
            opt2 = ' 0 1,0 ';
        }
        var d = 'M ' + p1.x.toFixed(3) + ',' + p1.y.toFixed(3);
        d += ' A ' + radius.toFixed(3) + ',' + radius.toFixed(3) + opt1;
        d += p2.x.toFixed(3) + ',' + p2.y.toFixed(3);
        if (innerRadius) {
            if (isFull) {
                d += ' M ' + p3.x.toFixed(3) + ',' + p3.y.toFixed(3);
            }
            else {
                d += ' L ' + p3.x.toFixed(3) + ',' + p3.y.toFixed(3);
            }
            d += ' A ' + innerRadius.toFixed(3) + ',' + innerRadius.toFixed(3) + opt2;
            d += p4.x.toFixed(3) + ',' + p4.y.toFixed(3);
        }
        else {
            d += ' L ' + cx.toFixed(3) + ',' + cy.toFixed(3);
        }
        if (!isFull) {
            d += ' z';
        }
        return d;
    };
    AnimationHelper.parseAttrs = function (from, to) {
        var state = {}, value;
        for (var key in from) {
            if (to[key] == null) {
                continue;
            }
            switch (key) {
                case 'polyline':
                    state['points'] = AnimationHelper.parseAttr(from[key], to[key], function (v, p) {
                        if (p === 1) {
                            var len, idx, prev, cur;
                            while (v.length > 1) {
                                prev = v[0];
                                cur = v[1];
                                if (prev.x === cur.x && prev.y === cur.y) {
                                    v.splice(1, 1);
                                }
                                else {
                                    prev = null;
                                    cur = null;
                                    break;
                                }
                            }
                            len = v.length;
                            for (idx = len - 1; idx > 0; idx--) {
                                prev = cur;
                                cur = v[idx];
                                if (prev) {
                                    if (prev.x === cur.x && prev.y === cur.y) {
                                        v.pop();
                                    }
                                    else {
                                        break;
                                    }
                                }
                            }
                        }
                        return v.map(function (a) { return a.x + ',' + a.y; }).join(' ');
                    });
                    break;
                case 'polygon':
                    state['points'] = AnimationHelper.parseAttr(from[key], to[key], function (v, p) {
                        if (p === 1) {
                            var len, idx, prev, cur, v0, v1;
                            v0 = v.pop();
                            v1 = v.pop();
                            while (v.length > 1) {
                                prev = v[0];
                                cur = v[1];
                                if (prev.x === cur.x && prev.y === cur.y) {
                                    v.splice(1, 1);
                                }
                                else {
                                    prev = null;
                                    cur = null;
                                    break;
                                }
                            }
                            len = v.length;
                            for (idx = len - 1; idx >= 0; idx--) {
                                prev = cur;
                                cur = v[idx];
                                if (prev) {
                                    if (prev.x === cur.x && prev.y === prev.y) {
                                        v.splice(idx, 1);
                                    }
                                    else {
                                        break;
                                    }
                                }
                            }
                            v.push(v1);
                            v.push(v0);
                        }
                        return v.map(function (a) { return a.x + ',' + a.y; }).join(' ');
                    });
                    break;
                case 'd':
                    state[key] = AnimationHelper.parseAttr(from[key], to[key], function (v) {
                        return v.map(function (a) {
                            if (typeof a === 'string') {
                                return a;
                            }
                            return a['0'] + ',' + a['1'];
                        }).join(' ');
                    });
                    break;
                case 'pie':
                    state['d'] = AnimationHelper.parseAttr(from[key], to[key], function (v) {
                        return AnimationHelper.getPathDescOfPie.apply(AnimationHelper, v);
                    });
                    break;
                case 'rotate':
                    state['transform'] = AnimationHelper.parseAttr(from[key], to[key], function (v) {
                        return 'rotate(' + v.join(' ') + ')';
                    });
                    break;
                case 'width':
                case 'height':
                case 'rx':
                case 'ry':
                case 'stroke-width':
                    state[key] = AnimationHelper.parseAttr(from[key], to[key], function (v) {
                        return Math.abs(v);
                    });
                    break;
                default:
                    state[key] = AnimationHelper.parseAttr(from[key], to[key]);
                    break;
            }
        }
        return state;
    };
    AnimationHelper.animate = function (apply, done, easing, duration, step) {
        if (easing === void 0) { easing = Easing.Swing; }
        if (duration === void 0) { duration = 400; }
        if (step === void 0) { step = 16; }
        wjcCore.asFunction(apply);
        wjcCore.asNumber(duration, false, true);
        wjcCore.asNumber(step, false, true);
        var t = 0;
        var timer = setInterval(function () {
            var b = Date.now();
            var pct = t / duration;
            pct = EasingHelper[Easing[easing]](pct);
            apply(pct);
            t += step;
            if (t >= duration) {
                clearInterval(timer);
                if (pct < 1 || pct > 1) {
                    apply(1);
                }
                if (done) {
                    done();
                }
            }
        }, step);
        return timer;
    };
    AnimationHelper.calcValue = function (state, percent) {
        var from = state.from, diff = state.diff, value = state.value;
        if (wjcCore.isNumber(from)) {
            state.value = diff === 0 ? from : from + diff * percent;
        }
        else if (wjcCore.isArray(from)) {
            AnimationHelper.parseArrayAttr(value, from, diff, function (f, t) {
                return typeof f === 'number' ? f + t * percent : f;
            });
        }
    };
    AnimationHelper.parseAttr = function (from, to, getValue) {
        var f, t, diff, val;
        if (wjcCore.isArray(from) && wjcCore.isArray(to)) {
            f = from;
            t = to;
            diff = [];
            val = f.slice();
            AnimationHelper.parseArrayAttr(diff, f, t, function (from, to) {
                if (from === to) {
                    return 0;
                }
                return to - from;
            });
        }
        else {
            f = Number(from);
            t = Number(to);
            val = f;
            diff = t - f;
        }
        return {
            from: f,
            to: t,
            value: val,
            diff: diff,
            getValue: getValue || function (v, p) {
                return v;
            }
        };
    };
    AnimationHelper.parseArrayAttr = function (val, from, to, fn) {
        from.forEach(function (v, i) {
            var objs, obj = {}, arr = [], t = to[i];
            if (wjcCore.isNumber(v) || typeof v === 'string') {
                val[i] = fn(v, t);
            }
            else if (wjcCore.isArray(v)) {
                v.forEach(function (a, b) {
                    arr[b] = fn(v[b], t[b]);
                });
                val[i] = arr;
            }
            else {
                objs = Object.getOwnPropertyNames(v);
                objs.forEach(function (key) {
                    obj[key] = fn(v[key], t[key]);
                });
                val[i] = obj;
            }
        });
    };
    return AnimationHelper;
}());
var EasingHelper = (function () {
    function EasingHelper() {
    }
    EasingHelper.Linear = function (t) {
        return t;
    };
    EasingHelper.Swing = function (t) {
        var s = 1.70158;
        return ((t /= 0.5) < 1) ? 0.5 * (t * t * (((s *= (1.525)) + 1) * t - s)) :
            0.5 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
    };
    EasingHelper.EaseInQuad = function (t) {
        return t * t;
    };
    EasingHelper.EaseOutQuad = function (t) {
        return t * (2 - t);
    };
    EasingHelper.EaseInOutQuad = function (t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };
    EasingHelper.EaseInCubic = function (t) {
        return t * t * t;
    };
    EasingHelper.EaseOutCubic = function (t) {
        return (--t) * t * t + 1;
    };
    EasingHelper.EaseInOutCubic = function (t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };
    EasingHelper.EaseInQuart = function (t) {
        return t * t * t * t;
    };
    EasingHelper.EaseOutQuart = function (t) {
        return 1 - (--t) * t * t * t;
    };
    EasingHelper.EaseInOutQuart = function (t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    };
    EasingHelper.EaseInQuint = function (t) {
        return t * t * t * t * t;
    };
    EasingHelper.EaseOutQuint = function (t) {
        return 1 + (--t) * t * t * t * t;
    };
    EasingHelper.EaseInOutQuint = function (t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    };
    EasingHelper.EaseInSine = function (t) {
        return -Math.cos(t * (Math.PI / 2)) + 1;
    };
    EasingHelper.EaseOutSine = function (t) {
        return Math.sin(t * (Math.PI / 2));
    };
    EasingHelper.EaseInOutSine = function (t) {
        return (-0.5 * (Math.cos(Math.PI * t) - 1));
    };
    EasingHelper.EaseInExpo = function (t) {
        return (t == 0) ? 0 : Math.pow(2, 10 * (t - 1));
    };
    EasingHelper.EaseOutExpo = function (t) {
        return (t == 1) ? 1 : -Math.pow(2, -10 * t) + 1;
    };
    EasingHelper.EaseInOutExpo = function (t) {
        if (t == !!t) {
            return t;
        }
        if ((t /= 0.5) < 1) {
            return 0.5 * Math.pow(2, 10 * (t - 1));
        }
        return 0.5 * (-Math.pow(2, -10 * --t) + 2);
    };
    EasingHelper.EaseInCirc = function (t) {
        return -(Math.sqrt(1 - (t * t)) - 1);
    };
    EasingHelper.EaseOutCirc = function (t) {
        return Math.sqrt(1 - Math.pow((t - 1), 2));
    };
    EasingHelper.EaseInOutCirc = function (t) {
        if ((t /= 0.5) < 1) {
            return -0.5 * (Math.sqrt(1 - t * t) - 1);
        }
        return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    };
    EasingHelper.EaseInBack = function (t) {
        var s = 1.70158;
        return t * t * ((s + 1) * t - s);
    };
    EasingHelper.EaseOutBack = function (t) {
        var s = 1.70158;
        t = t - 1;
        return t * t * ((s + 1) * t + s) + 1;
    };
    EasingHelper.EaseInOutBack = function (t) {
        var s = 1.70158;
        if ((t /= 0.5) < 1) {
            return 0.5 * (t * t * (((s *= (1.525)) + 1) * t - s));
        }
        return 0.5 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
    };
    EasingHelper.EaseInBounce = function (t) {
        return 1 - EasingHelper.EaseOutBounce(1 - t);
    };
    EasingHelper.EaseOutBounce = function (t) {
        var s = 7.5625;
        if (t < (1 / 2.75)) {
            return s * t * t;
        }
        else if (t < (2 / 2.75)) {
            return s * (t -= (1.5 / 2.75)) * t + 0.75;
        }
        else if (t < (2.5 / 2.75)) {
            return s * (t -= (2.25 / 2.75)) * t + 0.9375;
        }
        else {
            return s * (t -= (2.625 / 2.75)) * t + 0.984375;
        }
    };
    EasingHelper.EaseInOutBounce = function (t) {
        if (t < 0.5) {
            return EasingHelper.EaseInBounce(t * 2) * 0.5;
        }
        return EasingHelper.EaseOutBounce(t * 2 - 1) * 0.5 + 0.5;
    };
    EasingHelper.EaseInElastic = function (t) {
        if (t == !!t) {
            return t;
        }
        return -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3));
    };
    EasingHelper.EaseOutElastic = function (t) {
        if (t == !!t) {
            return t;
        }
        return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
    };
    EasingHelper.EaseInOutElastic = function (t) {
        if (t == !!t) {
            return t;
        }
        t = t * 2;
        if (t < 1) {
            return -0.5 * (Math.pow(2, 10 * (t -= 1)) * Math.sin((t - 0.1125) * (2 * Math.PI) / 0.45));
        }
        return Math.pow(2, -10 * (t -= 1)) * Math.sin((t - 0.1125) * (2 * Math.PI) / 0.45) * 0.5 + 1;
    };
    return EasingHelper;
}());
//# sourceMappingURL=wijmo.chart.animation.js.map