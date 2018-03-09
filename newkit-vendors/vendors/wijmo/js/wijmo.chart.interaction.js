"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wjcCore = require("wijmo/wijmo");
var wjcChart = require("wijmo/wijmo.chart");
var wjcSelf = require("wijmo/wijmo.chart.interaction");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['chart'] = window['wijmo']['chart'] || {};
window['wijmo']['chart']['interaction'] = wjcSelf;
'use strict';
var _RangeSlider = (function () {
    function _RangeSlider(container, needSpaceClick, hasButtons, options) {
        this._isVisible = true;
        this._buttonsVisible = true;
        this._minScale = 0;
        this._maxScale = 1;
        this._seamless = false;
        this._rsContainer = null;
        this._rsEle = null;
        this._decBtn = null;
        this._incBtn = null;
        this._rsContent = null;
        this._minHandler = null;
        this._rangeHandler = null;
        this._maxHandler = null;
        this._wrapperSliderMousedown = null;
        this._wrapperDocMouseMove = null;
        this._wrapperDocMouseup = null;
        this._wrapperBtnMousedown = null;
        this._wrapperRangeSpaceMousedown = null;
        this._wrapperRangeMouseleave = null;
        this._isTouch = false;
        this._slidingInterval = null;
        this._rangeSliderRect = null;
        this._isHorizontal = true;
        this._isBtnMousedown = false;
        this._needSpaceClick = false;
        this._hasButtons = true;
        this._movingEle = null;
        this._movingOffset = null;
        this._range = null;
        this._startPt = null;
        this._minPos = 0;
        this._maxPos = 1;
        this.rangeChanged = new wjcCore.Event();
        this.rangeChanging = new wjcCore.Event();
        if (!container) {
            wjcCore.assert(false, 'The container cannot be null.');
        }
        this._isTouch = 'ontouchstart' in window;
        this._needSpaceClick = needSpaceClick;
        this._hasButtons = hasButtons;
        wjcCore.copy(this, options);
        this._createSlider(container);
    }
    Object.defineProperty(_RangeSlider.prototype, "buttonsVisible", {
        get: function () {
            return this._buttonsVisible;
        },
        set: function (value) {
            if (value != this._buttonsVisible) {
                this._buttonsVisible = wjcCore.asBoolean(value);
                if (!this._rsContainer || !this._hasButtons) {
                    return;
                }
                this._refresh();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_RangeSlider.prototype, "isHorizontal", {
        get: function () {
            return this._isHorizontal;
        },
        set: function (value) {
            if (value != this._isHorizontal) {
                this._isHorizontal = wjcCore.asBoolean(value);
                if (!this._rsContainer) {
                    return;
                }
                this._invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_RangeSlider.prototype, "isVisible", {
        get: function () {
            return this._isVisible;
        },
        set: function (value) {
            if (value != this._isVisible) {
                this._isVisible = wjcCore.asBoolean(value);
                if (!this._rsContainer) {
                    return;
                }
                this._rsContainer.style.visibility = this._isVisible ? 'visible' : 'hidden';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_RangeSlider.prototype, "minScale", {
        get: function () {
            return this._minScale;
        },
        set: function (value) {
            if (value >= 0 && value != this._minScale) {
                this._minScale = wjcCore.asNumber(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_RangeSlider.prototype, "maxScale", {
        get: function () {
            return this._maxScale;
        },
        set: function (value) {
            if (value >= 0 && value != this._maxScale) {
                this._maxScale = wjcCore.asNumber(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_RangeSlider.prototype, "seamless", {
        get: function () {
            return this._seamless;
        },
        set: function (value) {
            if (value != this._seamless) {
                this._seamless = wjcCore.asBoolean(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    _RangeSlider.prototype.onRangeChanged = function (e) {
        this.rangeChanged.raise(this, e);
    };
    _RangeSlider.prototype.onRangeChanging = function (e) {
        this.rangeChanging.raise(this, e);
    };
    Object.defineProperty(_RangeSlider.prototype, "_isSliding", {
        get: function () {
            return this._startPt !== null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_RangeSlider.prototype, "_handleWidth", {
        get: function () {
            return this._minHandler.offsetWidth;
        },
        enumerable: true,
        configurable: true
    });
    _RangeSlider.prototype._createSlider = function (container) {
        var sCss = this._isHorizontal ? _RangeSlider._HRANGESLIDER : _RangeSlider._VRANGESLIDER, decBtnCss = this._isHorizontal ? 'wj-glyph-left' : 'wj-glyph-down', incBtnCss = this._isHorizontal ? 'wj-glyph-right' : 'wj-glyph-up', off, box;
        this._rsContainer = container;
        this._rsContainer.style.visibility = this._isVisible ? 'visible' : 'hidden';
        this._rsEle = wjcCore.createElement('<div class="wj-chart-rangeslider ' + sCss + '"></div>');
        this._rsContainer.appendChild(this._rsEle);
        if (this._hasButtons) {
            this._decBtn = wjcCore.createElement('<button class="wj-rangeslider-decbtn wj-btn wj-btn-default" type="button" tabindex="-1">' +
                '<span class="' + decBtnCss + ' ' + _RangeSlider._RANGESLIDER_DECBTN + '"></span>' +
                '</button>');
            this._rsEle.appendChild(this._decBtn);
            this._incBtn = wjcCore.createElement('<button class="wj-rangeslider-incbtn wj-btn wj-btn-default" type="button" tabindex="-1">' +
                '<span class="' + incBtnCss + ' ' + _RangeSlider._RANGESLIDER_INCBTN + '"></span>' +
                '</button>');
            this._rsEle.appendChild(this._incBtn);
        }
        this._rsContent = wjcCore.createElement('<div class="wj-rangeslider-content">' +
            '<div class="wj-rangeslider-rangehandle"></div>' +
            '<div class="wj-rangeslider-minhandle"></div>' +
            '<div class="wj-rangeslider-maxhandle"></div>');
        this._rsEle.appendChild(this._rsContent);
        this._minHandler = this._rsContent.querySelector('.' + _RangeSlider._RANGESLIDER_MINHANDLE);
        this._rangeHandler = this._rsContent.querySelector('.' + _RangeSlider._RANGESLIDER_RANGEHANDLE);
        this._maxHandler = this._rsContent.querySelector('.' + _RangeSlider._RANGESLIDER_MAXHANDLE);
        this._wrapperSliderMousedown = this._onSliderMousedown.bind(this);
        this._wrapperDocMouseMove = this._onDocMouseMove.bind(this);
        this._wrapperDocMouseup = this._onDocMouseup.bind(this);
        this._wrapperRangeSpaceMousedown = this._onRangeSpaceMousedown.bind(this);
        this._wrapperRangeMouseleave = this._onRangeMouseleave.bind(this);
        this._wrapperBtnMousedown = this._onBtnMousedown.bind(this);
        this._switchEvent(true);
    };
    _RangeSlider.prototype._switchEvent = function (isOn) {
        var eventListener = isOn ? 'addEventListener' : 'removeEventListener', eventHandler = isOn ? 'addHandler' : 'removeHandler';
        if (this._rsContainer) {
            if (this._needSpaceClick) {
                this._rsEle[eventListener]('mousedown', this._wrapperRangeSpaceMousedown);
            }
            this._rsEle[eventListener]('mouseleave', this._wrapperRangeMouseleave);
            this._rsContent[eventListener]('mousedown', this._wrapperSliderMousedown);
            if (this._hasButtons) {
                this._decBtn[eventListener]('mousedown', this._wrapperBtnMousedown);
                this._incBtn[eventListener]('mousedown', this._wrapperBtnMousedown);
            }
            document[eventListener]('mousemove', this._wrapperDocMouseMove);
            document[eventListener]('mouseup', this._wrapperDocMouseup);
            if ('ontouchstart' in window) {
                if (this._needSpaceClick) {
                    this._rsEle[eventListener]('touchstart', this._wrapperRangeSpaceMousedown);
                }
                this._rsContent[eventListener]('touchstart', this._wrapperSliderMousedown);
                if (this._hasButtons) {
                    this._decBtn[eventListener]('touchstart', this._wrapperBtnMousedown);
                    this._incBtn[eventListener]('touchstart', this._wrapperBtnMousedown);
                }
                document[eventListener]('touchmove', this._wrapperDocMouseMove);
                document[eventListener]('touchend', this._wrapperDocMouseup);
            }
        }
    };
    _RangeSlider.prototype._onSliderMousedown = function (e) {
        if (!this._isVisible) {
            return;
        }
        this._movingEle = e.srcElement || e.target;
        this._startPt = e instanceof MouseEvent ?
            new wjcCore.Point(e.pageX, e.pageY) :
            new wjcCore.Point(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
        wjcCore.removeClass(this._minHandler, _RangeSlider._RANGESLIDER_HANDLE_ACTIVE);
        wjcCore.removeClass(this._maxHandler, _RangeSlider._RANGESLIDER_HANDLE_ACTIVE);
        this._movingOffset = wjcCore.getElementRect(this._movingEle);
        if (this._movingEle != this._rangeHandler) {
            if (this._isHorizontal) {
                this._movingOffset.left += 0.5 * this._movingEle.offsetWidth;
            }
            else {
                this._movingOffset.top += 0.5 * this._movingEle.offsetHeight;
            }
            wjcCore.addClass(this._movingEle, _RangeSlider._RANGESLIDER_HANDLE_ACTIVE);
        }
        else {
            this._range = this._maxPos - this._minPos;
        }
        e.preventDefault();
    };
    _RangeSlider.prototype._onDocMouseMove = function (e) {
        if (!this._isVisible || !this._startPt) {
            return;
        }
        var movingPt = e instanceof MouseEvent ?
            new wjcCore.Point(e.pageX, e.pageY) :
            new wjcCore.Point(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
        this._onMove(movingPt);
    };
    _RangeSlider.prototype._onMove = function (mvPt) {
        var self = this, strPt = this._startPt, movingOffset = this._movingOffset, plotBox = this._plotBox, range = this._range, moving = this._movingEle, left = this._minHandler, middle = this._rangeHandler, right = this._maxHandler, x, y, pos;
        if (strPt && movingOffset) {
            if (this._isHorizontal) {
                x = movingOffset.left + mvPt.x - strPt.x;
                pos = (x - plotBox.x) / plotBox.width;
            }
            else {
                y = movingOffset.top + mvPt.y - strPt.y;
                pos = 1 - (y - plotBox.y) / plotBox.height;
            }
            if (pos < 0) {
                pos = 0;
            }
            else if (pos > 1) {
                pos = 1;
            }
            if (moving === left) {
                if (this._seamless && this._minScale === 0 && pos >= this._maxPos) {
                    self._minPos = self._maxPos;
                    self._movingEle = right;
                    wjcCore.removeClass(this._minHandler, _RangeSlider._RANGESLIDER_HANDLE_ACTIVE);
                    wjcCore.addClass(this._maxHandler, _RangeSlider._RANGESLIDER_HANDLE_ACTIVE);
                }
                else {
                    if (pos > this._maxPos - this._minScale) {
                        pos = this._maxPos - this._minScale;
                    }
                    if (pos < this._maxPos - this._maxScale) {
                        pos = this._maxPos - this._maxScale;
                    }
                    this._minPos = pos;
                }
            }
            else if (moving === right) {
                if (this._seamless && this._minScale === 0 && pos <= this._minPos) {
                    self._maxPos = self._minPos;
                    self._movingEle = left;
                    wjcCore.removeClass(this._maxHandler, _RangeSlider._RANGESLIDER_HANDLE_ACTIVE);
                    wjcCore.addClass(this._minHandler, _RangeSlider._RANGESLIDER_HANDLE_ACTIVE);
                }
                else {
                    if (pos < this._minPos + this._minScale) {
                        pos = this._minPos + this._minScale;
                    }
                    if (pos > this._minPos + this._maxScale) {
                        pos = this._minPos + this._maxScale;
                    }
                    this._maxPos = pos;
                }
            }
            else if (moving === middle) {
                if (this._isHorizontal) {
                    this._minPos = pos;
                    this._maxPos = this._minPos + range;
                    if (this._maxPos >= 1) {
                        this._maxPos = 1;
                        this._minPos = this._maxPos - range;
                    }
                }
                else {
                    this._maxPos = pos;
                    this._minPos = this._maxPos - range;
                    if (this._minPos <= 0) {
                        this._minPos = 0;
                        this._maxPos = this._minPos + range;
                    }
                }
            }
            this._updateElesPosition();
            this.onRangeChanging();
        }
    };
    _RangeSlider.prototype._onDocMouseup = function (e) {
        var chart, axis, actualMin, actualMax, range;
        if (!this._isVisible) {
            return;
        }
        this._clearInterval();
        this._isBtnMousedown = false;
        if (this._startPt) {
            this.onRangeChanged();
            this._startPt = null;
            this._movingOffset = null;
        }
        wjcCore.removeClass(this._minHandler, _RangeSlider._RANGESLIDER_HANDLE_ACTIVE);
        wjcCore.removeClass(this._maxHandler, _RangeSlider._RANGESLIDER_HANDLE_ACTIVE);
    };
    _RangeSlider.prototype._onRangeSpaceMousedown = function (e) {
        var pt = e instanceof MouseEvent ?
            new wjcCore.Point(e.pageX, e.pageY) :
            new wjcCore.Point(e.changedTouches[0].pageX, e.changedTouches[0].pageY), sOffset = wjcCore.getElementRect(this._rsContent), rOffset = wjcCore.getElementRect(this._rangeHandler), clickEle = e.srcElement || e.target, offset = 0;
        e.stopPropagation();
        e.preventDefault();
        if (clickEle !== this._rsContent && clickEle !== this._rsEle) {
            return;
        }
        if (this._isHorizontal) {
            offset = rOffset.width / sOffset.width;
            if (pt.x < rOffset.left) {
                offset = -1 * offset;
            }
            else if (pt.x > rOffset.left + rOffset.width) {
                offset = 1 * offset;
            }
        }
        else {
            offset = rOffset.height / sOffset.height;
            if (pt.y < rOffset.top) {
                offset = 1 * offset;
            }
            else if (pt.y > rOffset.top + rOffset.height) {
                offset = -1 * offset;
            }
        }
        if (offset !== 0) {
            this._doSliding(offset, pt);
        }
    };
    _RangeSlider.prototype._onRangeMouseleave = function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (!this._isBtnMousedown) {
            return;
        }
        this._clearInterval();
        this.onRangeChanged();
    };
    _RangeSlider.prototype._onBtnMousedown = function (e) {
        var targetEle = e.srcElement || e.target, offset = 0;
        e.stopPropagation();
        e.preventDefault();
        if (wjcCore.hasClass(targetEle, _RangeSlider._RANGESLIDER_DECBTN)) {
            if (this._minPos === 0) {
                return;
            }
            offset = -0.05;
        }
        else if (wjcCore.hasClass(targetEle, _RangeSlider._RANGESLIDER_INCBTN)) {
            if (this._maxPos === 1) {
                return;
            }
            offset = 0.05;
        }
        this._isBtnMousedown = true;
        if (offset !== 0) {
            this._doSliding(offset);
        }
    };
    _RangeSlider.prototype._refresh = function (rsRect) {
        var sliderOffset = 0, containerOffset = 0, slbarCss, rangeSliderEleCss, rOffset = wjcCore.getElementRect(this._rsContainer);
        if (rsRect) {
            this._rangeSliderRect = rsRect;
        }
        if (!this._rangeSliderRect) {
            return;
        }
        if (this._hasButtons && this._buttonsVisible) {
            this._decBtn.style.display = 'block';
            this._incBtn.style.display = 'block';
            sliderOffset = this._isHorizontal ? this._decBtn.offsetWidth + this._minHandler.offsetWidth / 2 :
                this._decBtn.offsetHeight + this._minHandler.offsetHeight / 2;
        }
        else {
            if (this._hasButtons) {
                this._decBtn.style.display = 'none';
                this._incBtn.style.display = 'none';
            }
            sliderOffset = this._isHorizontal ? this._minHandler.offsetWidth / 2 : this._minHandler.offsetHeight / 2;
        }
        slbarCss = this._getRsRect();
        if (this._isHorizontal) {
            slbarCss.left -= this._minHandler.offsetWidth / 2;
            slbarCss.width += this._minHandler.offsetWidth;
            rangeSliderEleCss = { left: sliderOffset, width: slbarCss.width - sliderOffset * 2 };
        }
        else {
            slbarCss.top -= this._minHandler.offsetHeight / 2;
            slbarCss.height += this._minHandler.offsetHeight;
            rangeSliderEleCss = { top: sliderOffset, height: slbarCss.height - sliderOffset * 2 };
        }
        wjcCore.setCss(this._rsEle, slbarCss);
        wjcCore.setCss(this._rsContent, rangeSliderEleCss);
        rOffset = wjcCore.getElementRect(this._rsContent);
        this._plotBox = { x: rOffset.left, y: rOffset.top, width: rOffset.width, height: rOffset.height };
        this._updateElesPosition();
    };
    _RangeSlider.prototype._updateElesPosition = function () {
        var minHandle = this._minHandler, rangeHandle = this._rangeHandler, maxHandle = this._maxHandler, box = this._plotBox, rangeCss, minCss, rangeCss, maxCss, isHorizontal = this._isHorizontal;
        if (box) {
            minCss = isHorizontal ?
                { left: this._minPos * box.width - 0.5 * minHandle.offsetWidth } :
                { top: (1 - this._minPos) * box.height - 0.5 * maxHandle.offsetHeight };
            rangeCss = isHorizontal ?
                { left: this._minPos * box.width, width: (this._maxPos - this._minPos) * box.width } :
                { top: (1 - this._maxPos) * box.height, height: (this._maxPos - this._minPos) * box.height };
            maxCss = isHorizontal ?
                { left: this._maxPos * (box.width) - 0.5 * maxHandle.offsetWidth } :
                { top: (1 - this._maxPos) * box.height - 0.5 * minHandle.offsetHeight };
            this._refreshSlider(minCss, rangeCss, maxCss);
        }
    };
    _RangeSlider.prototype._refreshSlider = function (minCss, rangeCss, maxCss) {
        wjcCore.setCss(this._minHandler, minCss);
        wjcCore.setCss(this._rangeHandler, rangeCss);
        wjcCore.setCss(this._maxHandler, maxCss);
    };
    _RangeSlider.prototype._invalidate = function () {
        var addClass, rmvClass;
        if (!this._rsContainer) {
            return;
        }
        addClass = this._isHorizontal ?
            _RangeSlider._HRANGESLIDER : _RangeSlider._VRANGESLIDER;
        rmvClass = this._isHorizontal ?
            _RangeSlider._VRANGESLIDER : _RangeSlider._HRANGESLIDER;
        wjcCore.removeClass(this._rsEle, rmvClass);
        wjcCore.addClass(this._rsEle, addClass);
        [this._rsEle, this._rsContent, this._minHandler,
            this._maxHandler, this._rangeHandler].forEach(function (ele) {
            ele.removeAttribute("style");
        });
        this._refresh();
    };
    _RangeSlider.prototype._changeRange = function (offset) {
        var range = this._maxPos - this._minPos;
        if ((offset < 0 && this._minPos === 0) || ((offset > 0 && this._maxPos === 1))) {
            return;
        }
        if (offset < 0) {
            this._minPos += offset;
            this._minPos = this._minPos < 0 ? 0 : this._minPos;
            this._maxPos = this._minPos + range;
        }
        else {
            this._maxPos += offset;
            this._maxPos = this._maxPos > 1 ? 1 : this._maxPos;
            this._minPos = this._maxPos - range;
        }
        this._updateElesPosition();
    };
    _RangeSlider.prototype._doSliding = function (offset, pt) {
        var sOffset = wjcCore.getElementRect(this._rsContent), rOffset = wjcCore.getElementRect(this._rangeHandler);
        this._clearInterval();
        this._startPt = new wjcCore.Point();
        this._changeRange(offset);
        this.onRangeChanged();
        this._setSlidingInterval(offset, pt);
    };
    _RangeSlider.prototype._setSlidingInterval = function (offset, pt) {
        var self = this, sOffset, rOffset;
        this._slidingInterval = window.setInterval(function () {
            if (pt) {
                sOffset = wjcCore.getElementRect(self._rsContent);
                rOffset = wjcCore.getElementRect(self._rangeHandler);
                if (self._isHorizontal) {
                    if (pt.x >= rOffset.left && pt.x <= rOffset.left + rOffset.width) {
                        self._clearInterval();
                        return;
                    }
                }
                else {
                    if (pt.y >= rOffset.top && pt.y <= rOffset.top + rOffset.height) {
                        self._clearInterval();
                        return;
                    }
                }
            }
            self._changeRange(offset);
            self.onRangeChanged();
        }, 200);
    };
    _RangeSlider.prototype._clearInterval = function () {
        if (this._slidingInterval) {
            window.clearInterval(this._slidingInterval);
        }
    };
    _RangeSlider.prototype._getRsRect = function () {
        var rsRect = this._rangeSliderRect, rect = {};
        if (!rsRect) {
            return;
        }
        ['left', 'top', 'width', 'height'].forEach(function (key) {
            if (rsRect[key]) {
                rect[key] = rsRect[key];
            }
        });
        return rect;
    };
    _RangeSlider._HRANGESLIDER = 'wj-chart-hrangeslider';
    _RangeSlider._VRANGESLIDER = 'wj-chart-vrangeslider';
    _RangeSlider._RANGESLIDER_DECBTN = 'wj-rangeslider-decbtn';
    _RangeSlider._RANGESLIDER_INCBTN = 'wj-rangeslider-incbtn';
    _RangeSlider._RANGESLIDER_RANGEHANDLE = 'wj-rangeslider-rangehandle';
    _RangeSlider._RANGESLIDER_MINHANDLE = 'wj-rangeslider-minhandle';
    _RangeSlider._RANGESLIDER_MAXHANDLE = 'wj-rangeslider-maxhandle';
    _RangeSlider._RANGESLIDER_HANDLE_ACTIVE = 'wj-rangeslider-handle-active';
    return _RangeSlider;
}());
exports._RangeSlider = _RangeSlider;
'use strict';
var Orientation;
(function (Orientation) {
    Orientation[Orientation["X"] = 0] = "X";
    Orientation[Orientation["Y"] = 1] = "Y";
})(Orientation = exports.Orientation || (exports.Orientation = {}));
var RangeSelector = (function () {
    function RangeSelector(chart, options) {
        this._isVisible = true;
        this._orientation = Orientation.X;
        this._seamless = false;
        this._minScale = 0;
        this._maxScale = 1;
        this.rangeChanged = new wjcCore.Event();
        this._chart = wjcCore.asType(chart, wjcChart.FlexChartCore, false);
        this._createRangeSelector();
        wjcCore.copy(this, options);
    }
    Object.defineProperty(RangeSelector.prototype, "isVisible", {
        get: function () {
            return this._isVisible;
        },
        set: function (value) {
            if (value != this._isVisible) {
                this._isVisible = wjcCore.asBoolean(value);
                if (this._rangeSlider) {
                    this._rangeSlider.isVisible = value;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeSelector.prototype, "min", {
        get: function () {
            return this._min;
        },
        set: function (value) {
            value = wjcCore.asNumber(value, true, false);
            if (value != this._min) {
                var changed = false;
                if (value != null && value !== undefined && !isNaN(value) && this._max != null) {
                    if (value <= this._max) {
                        this._min = value;
                        changed = true;
                    }
                }
                else {
                    this._min = value;
                    changed = true;
                }
                if (this._rangeSlider && changed) {
                    this._changeRange();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeSelector.prototype, "max", {
        get: function () {
            return this._max;
        },
        set: function (value) {
            value = wjcCore.asNumber(value, true, false);
            if (value != this._max) {
                var changed = false;
                if (value != null && !isNaN(value)) {
                    if (value >= this._min) {
                        this._max = value;
                        changed = true;
                    }
                }
                else {
                    this._max = value;
                    changed = true;
                }
                if (this._rangeSlider && changed) {
                    this._changeRange();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeSelector.prototype, "orientation", {
        get: function () {
            return this._orientation;
        },
        set: function (value) {
            value = wjcCore.asEnum(value, Orientation);
            if (value !== this._orientation) {
                this._orientation = value;
                if (!this._rangeSlider) {
                    return;
                }
                this._rangeSlider.isHorizontal = (value == Orientation.X);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeSelector.prototype, "seamless", {
        get: function () {
            return this._seamless;
        },
        set: function (value) {
            value = wjcCore.asBoolean(value, true);
            if (value != this._seamless) {
                this._seamless = value;
                if (this._rangeSlider) {
                    this._rangeSlider.seamless = value;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeSelector.prototype, "minScale", {
        get: function () {
            return this._minScale;
        },
        set: function (value) {
            value = wjcCore.asNumber(value);
            if (value <= 1 && value >= 0 && value != this._minScale && value < this._maxScale) {
                this._minScale = value;
                if (this._rangeSlider) {
                    this._rangeSlider.minScale = wjcCore.asNumber(value);
                    this._updateMinAndMaxWithScale(true);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeSelector.prototype, "maxScale", {
        get: function () {
            return this._maxScale;
        },
        set: function (value) {
            value = wjcCore.asNumber(value);
            if (value <= 1 && value >= 0 && value != this._maxScale && value > this._minScale) {
                this._maxScale = value;
                if (this._rangeSlider) {
                    this._rangeSlider.maxScale = wjcCore.asNumber(value);
                    this._updateMinAndMaxWithScale(true);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    RangeSelector.prototype.remove = function () {
        if (this._rangeSelectorEle) {
            this._chart.hostElement.removeChild(this._rangeSelectorEle);
            this._switchEvent(false);
            this._rangeSelectorEle = null;
            this._rangeSlider = null;
        }
    };
    RangeSelector.prototype.onRangeChanged = function (e) {
        this.rangeChanged.raise(this, e);
    };
    RangeSelector.prototype._createRangeSelector = function () {
        var chart = this._chart, chartHostEle = chart.hostElement, isHorizontal = this._orientation === Orientation.X;
        this._rangeSelectorEle = wjcCore.createElement('<div class="wj-chart-rangeselector-container"></div>');
        this._rangeSlider = new _RangeSlider(this._rangeSelectorEle, false, false, {
            isHorizontal: isHorizontal,
            isVisible: this._isVisible,
            seamless: this._seamless
        });
        chartHostEle.appendChild(this._rangeSelectorEle);
        this._switchEvent(true);
    };
    RangeSelector.prototype._switchEvent = function (isOn) {
        var eventHandler = isOn ? 'addHandler' : 'removeHandler';
        if (this._chart.hostElement) {
            this._rangeSlider.rangeChanged[eventHandler](this._updateRange, this);
            this._chart.rendered[eventHandler](this._refresh, this);
        }
    };
    RangeSelector.prototype._refresh = function () {
        var chartHostEle = this._chart.hostElement, pa, pOffset, plotBox, rOffset = wjcCore.getElementRect(this._rangeSelectorEle);
        pa = chartHostEle.querySelector('.' + wjcChart.FlexChart._CSS_PLOT_AREA);
        pOffset = wjcCore.getElementRect(pa);
        plotBox = pa.getBBox();
        if (plotBox && plotBox.width && plotBox.height) {
            this._adjustMinAndMax();
            this._rangeSlider._refresh({
                left: plotBox.x,
                top: pOffset.top - rOffset.top,
                width: plotBox.width,
                height: plotBox.height
            });
        }
    };
    RangeSelector.prototype._adjustMinAndMax = function () {
        var self = this, chart = self._chart, rangeSlider = self._rangeSlider, min = self._min, max = self._max, axis = self._orientation === Orientation.X ? chart.axisX : chart.axisY, actualMin = wjcCore.isDate(axis.actualMin) ? axis.actualMin.valueOf() : axis.actualMin, actualMax = wjcCore.isDate(axis.actualMax) ? axis.actualMax.valueOf() : axis.actualMax, range = actualMax - actualMin;
        self._min = (min === null || isNaN(min) || min === undefined || min < actualMin || min > actualMax) ? actualMin : min;
        self._max = (max === null || isNaN(max) || max === undefined || max < actualMin || max > actualMax) ? actualMax : max;
        var plotRect = this._chart._plotRect;
        if (plotRect) {
            if (this._orientation === Orientation.X) {
                var minPos = (axis.convert(self._min) - plotRect.left) / plotRect.width;
                var maxPos = (axis.convert(self._max) - plotRect.left) / plotRect.width;
                rangeSlider._minPos = minPos;
                rangeSlider._maxPos = maxPos;
            }
            else {
                var minPos = (plotRect.top - axis.convert(self._min)) / plotRect.height + 1;
                var maxPos = (plotRect.top - axis.convert(self._max)) / plotRect.height + 1;
                rangeSlider._minPos = minPos;
                rangeSlider._maxPos = maxPos;
            }
            this._updateMinAndMaxWithScale(false);
        }
    };
    RangeSelector.prototype._updateMinAndMaxWithScale = function (fireEvent) {
        var rangeSlider = this._rangeSlider, max, updated = false;
        if (this._minScale !== 0 &&
            rangeSlider._minPos + this._minScale > rangeSlider._maxPos) {
            max = rangeSlider._minPos + this._minScale;
            if (max > 1) {
                rangeSlider._maxPos = 1;
                rangeSlider._minPos = 1 - this._minScale;
            }
            else {
                rangeSlider._maxPos = max;
            }
            updated = true;
        }
        if (this._maxScale !== 1 &&
            rangeSlider._minPos + this._maxScale < rangeSlider._maxPos) {
            max = rangeSlider._minPos + this._maxScale;
            if (max > 1) {
                rangeSlider._maxPos = 1;
                rangeSlider._minPos = 1 - this._maxScale;
            }
            else {
                rangeSlider._maxPos = max;
            }
            updated = true;
        }
        if (updated) {
            var minMax = this._getMinAndMax();
            this._min = minMax.min;
            this._max = minMax.max;
            if (fireEvent) {
                if (this._rangeSelectorEle) {
                    this._rangeSlider._refresh();
                    this.onRangeChanged();
                }
            }
        }
    };
    RangeSelector.prototype._changeRange = function () {
        this._adjustMinAndMax();
        if (this._rangeSelectorEle) {
            this._rangeSlider._refresh();
            this.onRangeChanged();
        }
    };
    RangeSelector.prototype._updateRange = function () {
        var rangeSlider = this._rangeSlider, chart, axis, actualMin, actualMax, range;
        chart = this._chart;
        axis = this._orientation === Orientation.X ? chart.axisX : chart.axisY;
        var minMax = this._getMinAndMax();
        this._min = minMax.min;
        this._max = minMax.max;
        this.onRangeChanged();
    };
    RangeSelector.prototype._getMinAndMax = function () {
        var slider = this._rangeSlider, chart = this._chart, rc = chart._plotRect, min = null, max = null;
        if (rc) {
            if (this._orientation === Orientation.X) {
                min = chart.axisX.convertBack(rc.left + slider._minPos * rc.width);
                max = chart.axisX.convertBack(rc.left + slider._maxPos * rc.width);
            }
            else {
                min = chart.axisY.convertBack(rc.top + (1 - slider._minPos) * rc.height);
                max = chart.axisY.convertBack(rc.top + (1 - slider._maxPos) * rc.height);
            }
        }
        return {
            min: min,
            max: max
        };
    };
    return RangeSelector;
}());
exports.RangeSelector = RangeSelector;
var MouseAction;
(function (MouseAction) {
    MouseAction[MouseAction["Zoom"] = 0] = "Zoom";
    MouseAction[MouseAction["Pan"] = 1] = "Pan";
})(MouseAction = exports.MouseAction || (exports.MouseAction = {}));
var InteractiveAxes;
(function (InteractiveAxes) {
    InteractiveAxes[InteractiveAxes["X"] = 0] = "X";
    InteractiveAxes[InteractiveAxes["Y"] = 1] = "Y";
    InteractiveAxes[InteractiveAxes["XY"] = 2] = "XY";
})(InteractiveAxes = exports.InteractiveAxes || (exports.InteractiveAxes = {}));
var ChartGestures = (function () {
    function ChartGestures(chart, options) {
        this._chart = null;
        this._zoomEle = null;
        this._overlayEle = null;
        this._wrapperMousedown = null;
        this._wrapperMouseMove = null;
        this._wrapperMouseup = null;
        this._wrapperPointerdown = null;
        this._wrapperPointerMove = null;
        this._wrapperPointerup = null;
        this._wrapperTouchStart = null;
        this._wrapperTouchMove = null;
        this._wrapperTouchEnd = null;
        this._wrapperMouseWheel = null;
        this._startFirstPt = null;
        this._minX = null;
        this._maxX = null;
        this._minY = null;
        this._maxY = null;
        this._threadHold = 20;
        this._clip = {};
        this._selection = {};
        this._startPointers = [];
        this._mvPointers = [];
        this._pinchStartEvents = [];
        this._minXRange = null;
        this._minYRange = null;
        this._innerUpdating = false;
        this._lastMinX = null;
        this._lastMaxX = null;
        this._lastMinY = null;
        this._lastMaxY = null;
        this._mouseAction = MouseAction.Zoom;
        this._interactiveAxes = InteractiveAxes.X;
        this._enable = true;
        this._scaleX = 1;
        this._scaleY = 1;
        this._posX = 0;
        this._posY = 0;
        if (!chart) {
            wjcCore.assert(false, 'The FlexChart cannot be null.');
        }
        this._chart = chart;
        wjcCore.copy(this, options);
        this._initialize();
    }
    Object.defineProperty(ChartGestures.prototype, "mouseAction", {
        get: function () {
            return this._mouseAction;
        },
        set: function (value) {
            if (value !== this._mouseAction) {
                this._mouseAction = wjcCore.asEnum(value, MouseAction);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartGestures.prototype, "interactiveAxes", {
        get: function () {
            return this._interactiveAxes;
        },
        set: function (value) {
            if (value !== this._interactiveAxes) {
                this._interactiveAxes = wjcCore.asEnum(value, InteractiveAxes);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartGestures.prototype, "enable", {
        get: function () {
            return this._enable;
        },
        set: function (value) {
            if (value !== this._enable) {
                this._enable = wjcCore.asBoolean(value, true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartGestures.prototype, "scaleX", {
        get: function () {
            return this._scaleX;
        },
        set: function (value) {
            if (value !== this._scaleX) {
                if (value < 0) {
                    this._scaleX = 0;
                }
                else if (value > 1) {
                    this._scaleX = 1;
                }
                else {
                    this._scaleX = wjcCore.asNumber(value);
                }
                if (this._seriesGroup) {
                    this._initAxisRangeWithPosAndScale(true);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartGestures.prototype, "scaleY", {
        get: function () {
            return this._scaleY;
        },
        set: function (value) {
            if (value !== this._scaleY) {
                if (value < 0) {
                    this._scaleY = 0;
                }
                else if (value > 1) {
                    this._scaleY = 1;
                }
                else {
                    this._scaleY = wjcCore.asNumber(value);
                }
                if (this._seriesGroup) {
                    this._initAxisRangeWithPosAndScale(false);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartGestures.prototype, "posX", {
        get: function () {
            return this._posX;
        },
        set: function (value) {
            if (value !== this._posX) {
                if (value < 0) {
                    this._posX = 0;
                }
                else if (value > 1) {
                    this._posX = 1;
                }
                else {
                    this._posX = wjcCore.asNumber(value);
                }
                if (this._seriesGroup) {
                    this._initAxisRangeWithPosAndScale(true);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartGestures.prototype, "posY", {
        get: function () {
            return this._posY;
        },
        set: function (value) {
            if (value !== this._posY) {
                if (value < 0) {
                    this._posY = 0;
                }
                else if (value > 1) {
                    this._posY = 1;
                }
                else {
                    this._posY = wjcCore.asNumber(value);
                }
                if (this._seriesGroup) {
                    this._initAxisRangeWithPosAndScale(false);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ChartGestures.prototype.remove = function () {
        if (this._zoomEle) {
            this._chart.hostElement.removeChild(this._zoomEle);
            this._zoomEle = null;
        }
        wjcCore.removeClass(this._chart.hostElement, ChartGestures._CSS_TOUCH_DISABLED);
        this._switchEvent(false);
        this._wrapperMousedown = null;
        this._wrapperMouseMove = null;
        this._wrapperMouseup = null;
        this._wrapperPointerdown = null;
        this._wrapperPointerMove = null;
        this._wrapperPointerup = null;
        this._wrapperTouchStart = null;
        this._wrapperTouchMove = null;
        this._wrapperTouchEnd = null;
        this._wrapperMouseWheel = null;
    };
    ChartGestures.prototype.reset = function () {
        var chart = this._chart, axisX = chart.axisX, axisY = chart.axisY;
        if (this._maxX) {
            axisX.max = this._maxX;
        }
        if (this._minX) {
            axisX.min = this._minX;
        }
        if (this._maxY) {
            axisY.max = this._maxY;
        }
        if (this._minY) {
            axisY.min = this._minY;
        }
        this._initAxisRangeWithPosAndScale(true);
        this._initAxisRangeWithPosAndScale(false);
    };
    ChartGestures.prototype._refreshChart = function () {
        var chart = this._chart, axisX = chart.axisX, axisY = chart.axisY;
        this._minX = this._getAxisMin(axisX);
        this._maxX = this._getAxisMax(axisX);
        this._minY = this._getAxisMin(axisY);
        this._maxY = this._getAxisMax(axisY);
        this._minXRange = (this._maxX - this._minX) * 0.005;
        this._minYRange = (this._maxY - this._minY) * 0.005;
        this._initAxisRangeWithPosAndScale(true);
        this._initAxisRangeWithPosAndScale(false);
    };
    ChartGestures.prototype._initialize = function () {
        var chart = this._chart, chartHostEle = chart.hostElement;
        this._zoomEle = wjcCore.createElement('<div class="' + ChartGestures._CSS_ZOOM + '">' +
            '<div class="' + ChartGestures._CSS_ZOOM_OVERLAY + '"></div>');
        this._zoomEle.style.visibility = 'visible';
        chartHostEle.appendChild(this._zoomEle);
        wjcCore.addClass(chartHostEle, ChartGestures._CSS_TOUCH_DISABLED);
        this._overlayEle = this._zoomEle.querySelector('.' + ChartGestures._CSS_ZOOM_OVERLAY);
        this._wrapperMousedown = this._onMousedown.bind(this);
        this._wrapperMouseMove = this._onMouseMove.bind(this);
        this._wrapperMouseup = this._onMouseup.bind(this);
        this._wrapperPointerdown = this._onPointerdown.bind(this);
        this._wrapperPointerMove = this._onPointerMove.bind(this);
        this._wrapperPointerup = this._onPointerup.bind(this);
        this._wrapperMouseWheel = this._onMouseWheel.bind(this);
        this._wrapperTouchStart = this._onTouchStart.bind(this);
        this._wrapperTouchMove = this._onTouchMove.bind(this);
        this._wrapperTouchEnd = this._onTouchEnd.bind(this);
        this._switchEvent(true);
    };
    ChartGestures.prototype._switchEvent = function (isOn) {
        var chartHostEle = this._chart.hostElement, eventListener = isOn ? 'addEventListener' : 'removeEventListener', eventHandler = isOn ? 'addHandler' : 'removeHandler';
        if (chartHostEle) {
            chartHostEle[eventListener]('mousedown', this._wrapperMousedown);
            chartHostEle[eventListener]('mousemove', this._wrapperMouseMove);
            document[eventListener]('mouseup', this._wrapperMouseup);
            if ('onpointerdown' in window) {
                chartHostEle[eventListener]('pointerdown', this._wrapperPointerdown);
                chartHostEle[eventListener]('pointermove', this._wrapperPointerMove);
                document[eventListener]('pointerup', this._wrapperPointerup);
            }
            chartHostEle[eventListener]('wheel', this._wrapperMouseWheel);
            if ('ontouchstart' in window) {
                chartHostEle[eventListener]('touchstart', this._wrapperTouchStart);
                chartHostEle[eventListener]('touchmove', this._wrapperTouchMove);
                document[eventListener]('touchend', this._wrapperTouchEnd);
            }
            this._chart.rendered[eventHandler](this._refresh, this);
        }
    };
    ChartGestures.prototype._refresh = function () {
        var chart = this._chart, axisX = chart.axisX, axisY = chart.axisY, chartHostEle = chart.hostElement, pa, rangeXChged, rangeYChged;
        this._seriesGroup = chartHostEle.querySelector('.wj-series-group');
        pa = chartHostEle.querySelector('.' + wjcChart.FlexChart._CSS_PLOT_AREA);
        this._plotOffset = wjcCore.getElementRect(pa);
        this._plotBox = pa.getBBox();
        this._zoomEleOffset = wjcCore.getElementRect(this._zoomEle);
        if (this._overlayEle) {
            this._overlayEle.removeAttribute('style');
        }
        if (this._innerUpdating) {
            this._innerUpdating = false;
            return;
        }
        rangeXChged = false;
        rangeYChged = false;
        if (this._minX === null || isNaN(this._minX) || this._minX === 0
            || this._minX === -1 || this._lastMinX !== this._getAxisMin(axisX)) {
            this._minX = this._getAxisMin(axisX);
            if (this._minX !== null && !isNaN(this._minX) && this._minX !== 0 && this._minX !== -1) {
                rangeXChged = true;
            }
        }
        if (this._maxX === null || isNaN(this._maxX) || this._maxX === 0
            || this._maxX === -1 || this._lastMaxX !== this._getAxisMax(axisX)) {
            this._maxX = this._getAxisMax(axisX);
            if (this._maxX !== null && !isNaN(this._maxX) && this._maxX !== 0 && this._maxX !== -1) {
                rangeXChged = true;
            }
        }
        if (this._minY === null || isNaN(this._minY) || this._lastMinY !== this._getAxisMin(axisY)) {
            this._minY = this._getAxisMin(axisY);
            if (!isNaN(this._minY)) {
                rangeYChged = true;
            }
        }
        if (this._maxY === null || isNaN(this._maxY) || this._lastMaxY !== this._getAxisMax(axisY)) {
            this._maxY = this._getAxisMax(axisY);
            if (!isNaN(this._maxY)) {
                rangeYChged = true;
            }
        }
        this._minXRange = (this._maxX - this._minX) * 0.005;
        this._minYRange = (this._maxY - this._minY) * 0.005;
        if (rangeXChged && this._scaleX !== null && this._scaleX !== undefined && this._scaleX !== 1 &&
            this._posX !== null && this._posX !== undefined && this._posX !== 0) {
            this._initAxisRangeWithPosAndScale(true);
        }
        if (rangeYChged && this._scaleY !== null && this._scaleY !== undefined && this._scaleY !== 1 &&
            this._posY !== null && this._posY !== undefined && this._posY !== 0) {
            this._initAxisRangeWithPosAndScale(false);
        }
    };
    ChartGestures.prototype._onMousedown = function (e) {
        if (!this._enable) {
            return;
        }
        this._disabledOthersInteraction(true);
        this._mouseDown(e);
        e.preventDefault();
    };
    ChartGestures.prototype._onMouseMove = function (e) {
        if (!this._enable) {
            return;
        }
        this._mouseMove(e);
        e.preventDefault();
    };
    ChartGestures.prototype._onMouseup = function (e) {
        if (!this._enable) {
            return;
        }
        this._mouseup(e);
        this._disabledOthersInteraction(false);
    };
    ChartGestures.prototype._onMouseWheel = function (e) {
        var delta = -e.deltaY, chg = delta > 0 ? 0.05 : -0.05;
        if (!this._enable) {
            return;
        }
        this._scaling = true;
        if (this._interactiveAxes === InteractiveAxes.X ||
            this._interactiveAxes === InteractiveAxes.XY) {
            this._updateAxisByChg(true, chg, -chg);
        }
        if (this._interactiveAxes === InteractiveAxes.Y ||
            this._interactiveAxes === InteractiveAxes.XY) {
            this._updateAxisByChg(false, chg, -chg);
        }
        this._scaling = false;
        e.preventDefault();
    };
    ChartGestures.prototype._mouseDown = function (e) {
        this._startFirstPt = this._getPoint(e);
        this._updatePoint(this._startFirstPt);
        if (this._mouseAction === MouseAction.Zoom) {
            this._initOverlay();
        }
        else {
            this._seriesGroup.setAttribute('clip-path', 'url(#' + this._chart._plotrectId + ')');
            wjcCore.toggleClass(this._chart.hostElement, ChartGestures._CSS_PANABLE, this._mouseAction === MouseAction.Pan);
        }
    };
    ChartGestures.prototype._mouseMove = function (e) {
        var mvPt;
        if (!this._startFirstPt) {
            return;
        }
        mvPt = this._getPoint(e);
        this._updatePoint(mvPt);
        this._endPoint = new wjcCore.Point(mvPt.x, mvPt.y);
        if (this._mouseAction === MouseAction.Zoom) {
            this._updateOverLay(mvPt);
        }
        else {
            this._panning = true;
            this._panningChart(mvPt.x - this._startFirstPt.x, mvPt.y - this._startFirstPt.y);
        }
    };
    ChartGestures.prototype._mouseup = function (e) {
        var endPt = this._endPoint, axisX = this._chart.axisX;
        if (!this._startFirstPt || !endPt) {
            wjcCore.removeClass(this._chart.hostElement, ChartGestures._CSS_PANABLE);
            this._reset();
            return;
        }
        if (this._mouseAction === MouseAction.Zoom) {
            this._zoomedChart(endPt);
            this._reset();
        }
        else {
            this._pannedChart(endPt.x - this._startFirstPt.x, endPt.y - this._startFirstPt.y);
            this._reset();
        }
        wjcCore.removeClass(this._chart.hostElement, ChartGestures._CSS_PANABLE);
    };
    ChartGestures.prototype._onPointerdown = function (e) {
        if (!this._enable) {
            return;
        }
        this._disabledOthersInteraction(true);
        switch (e.pointerType) {
            case "touch":
                this._pointerDown(e);
                break;
            case "mouse":
                this._mouseDown(e);
                break;
        }
        e.preventDefault();
    };
    ChartGestures.prototype._onPointerMove = function (e) {
        if (!this._enable) {
            return;
        }
        switch (e.pointerType) {
            case "touch":
                this._pointerMove(e);
                break;
            case "mouse":
                this._mouseMove(e);
                break;
        }
        e.preventDefault();
    };
    ChartGestures.prototype._onPointerup = function (e) {
        if (!this._enable) {
            return;
        }
        switch (e.pointerType) {
            case "touch":
                this._pointerUp(e);
                break;
            case "mouse":
                this._mouseup(e);
                break;
        }
        this._disabledOthersInteraction(false);
        e.preventDefault();
    };
    ChartGestures.prototype._pointerDown = function (e) {
        if (e.preventManipulation)
            e.preventManipulation();
        this._seriesGroup.setAttribute('clip-path', 'url(#' + this._chart._plotrectId + ')');
        this._startPointers.push({ id: e.pointerId, x: e.pageX, y: e.pageY });
        if (this._startPointers.length === 1) {
            this._scaling = false;
            this._panning = true;
        }
        else if (this._startPointers.length === 2) {
            this._panning = false;
            this._scaling = true;
            this._startDistance = {
                x: this._startPointers[0].x - this._startPointers[1].x,
                y: this._startPointers[0].y - this._startPointers[1].y,
            };
        }
    };
    ChartGestures.prototype._pointerMove = function (e) {
        var pt1, pt2, mvPt = new wjcCore.Point(e.pageX, e.pageY), rNowCordinate, rStartCordinate, offset = {}, scale = {};
        if (e.preventManipulation)
            e.preventManipulation();
        if (this._panning) {
            if (!this._pointInPlotArea(mvPt)) {
                return;
            }
            this._endPoint = new wjcCore.Point(e.pageX, e.pageY);
            this._panningChart(this._endPoint.x - this._startPointers[0].x, this._endPoint.y - this._startPointers[0].y);
        }
        else if (this._scaling) {
            pt1 = this._startPointers[0].id + '';
            pt2 = this._startPointers[1].id + '';
            this._mvPointers[e.pointerId + ''] = { x: e.pageX, y: e.pageY };
            if (this._mvPointers[pt1] && this._mvPointers[pt2]) {
                if (Math.abs(this._startDistance.x) > this._threadHold &&
                    this._interactiveAxes !== InteractiveAxes.Y) {
                    rNowCordinate = this._mvPointers[pt1].x - this._plotOffset.left;
                    rStartCordinate = this._startPointers[0].x - this._plotOffset.left;
                    scale['x'] = Math.abs((this._mvPointers[pt1].x - this._mvPointers[pt2].x) / this._startDistance.x);
                    offset['x'] = rNowCordinate - scale['x'] * rStartCordinate;
                    this._clip['x'] = (this._plotBox.x - rNowCordinate) / scale['x'] + rStartCordinate;
                    this._selection['w'] = this._plotBox.width / scale['x'];
                }
                if (Math.abs(this._startDistance.y) > this._threadHold &&
                    this._interactiveAxes !== InteractiveAxes.X) {
                    rNowCordinate = this._mvPointers[pt1].y - this._plotOffset.top;
                    rStartCordinate = this._startPointers[0].y - this._plotOffset.top;
                    scale['y'] = Math.abs((this._mvPointers[pt1].y - this._mvPointers[pt2].y) / this._startDistance.y);
                    offset['y'] = rNowCordinate - scale['y'] * rStartCordinate;
                    this._clip['y'] = (this._plotBox.y - rNowCordinate) / scale['y'] + rStartCordinate;
                    this._selection['h'] = this._plotBox.height / scale['y'];
                }
                this._scalingChart(scale, offset);
            }
        }
    };
    ChartGestures.prototype._pointerUp = function (e) {
        if (e.preventManipulation)
            e.preventManipulation();
        if (this._panning) {
            if (this._endPoint) {
                this._pannedChart(this._endPoint.x - this._startPointers[0].x, this._endPoint.y - this._startPointers[0].y);
            }
            this._reset();
        }
        else if (this._scaling) {
            this._scaledChart(e);
            this._reset();
        }
    };
    ChartGestures.prototype._onTouchStart = function (e) {
        if (!this._enable) {
            return;
        }
        this._disabledOthersInteraction(true);
        if (e.touches.length == 1) {
            this._scaling = false;
            this._panning = true;
            this._startFirstPt = this._getPoint(e);
        }
        else if (e.touches.length == 2) {
            this._pinchStartEvents = this._getTouchPair(e);
            this._startDistance = this._touchDistance(e);
            this._panning = false;
            this._scaling = true;
        }
        if (this._seriesGroup) {
            this._seriesGroup.setAttribute('clip-path', 'url(#' + this._chart._plotrectId + ')');
        }
        this._chart._hideToolTip();
        return true;
    };
    ChartGestures.prototype._onTouchMove = function (e) {
        if (!this._enable) {
            return;
        }
        var scale = {}, offset = {}, touchs = e.touches[0], mvPt = new wjcCore.Point(touchs.pageX, touchs.pageY), rNowCordinate, rStartCordinate, nowDist, nowPos, startPos;
        e.preventDefault();
        if (this._panning) {
            if (this._startFirstPt) {
                if (!this._pointInPlotArea(mvPt)) {
                    return;
                }
                this._endPoint = new wjcCore.Point(touchs.pageX, touchs.pageY);
                this._panningChart(this._endPoint.x - this._startFirstPt.x, this._endPoint.y - this._startFirstPt.y);
            }
        }
        else if (this._scaling) {
            nowDist = this._touchDistance(e);
            nowPos = this._getTouchPair(e)[0];
            startPos = this._pinchStartEvents[0];
            if (Math.abs(this._startDistance.x) > this._threadHold &&
                this._interactiveAxes !== InteractiveAxes.Y) {
                rNowCordinate = nowPos.pageX - this._plotOffset.left;
                rStartCordinate = startPos.pageX - this._plotOffset.left;
                scale['x'] = Math.abs(nowDist.x / this._startDistance.x);
                offset['x'] = rNowCordinate - (scale['x'] * rStartCordinate);
                this._clip['x'] = (this._plotBox.x - rNowCordinate) / scale['x'] + rStartCordinate;
                this._selection['w'] = this._plotBox.width / scale['x'];
            }
            if (Math.abs(this._startDistance.y) > this._threadHold &&
                this._interactiveAxes !== InteractiveAxes.X) {
                rNowCordinate = nowPos.pageY - this._plotOffset.top;
                rStartCordinate = startPos.pageY - this._plotOffset.top;
                scale['y'] = Math.abs(nowDist.y / this._startDistance.y);
                offset['y'] = rNowCordinate - (scale['y'] * rStartCordinate);
                this._clip['y'] = (this._plotBox.y - rNowCordinate) / scale['y'] + rStartCordinate;
                this._selection['h'] = this._plotBox.height / scale['y'];
            }
            this._scalingChart(scale, offset);
        }
        return true;
    };
    ChartGestures.prototype._onTouchEnd = function (e) {
        if (!this._enable) {
            return;
        }
        var endPt = this._endPoint;
        if (this._panning) {
            if (!this._startFirstPt || !endPt) {
                this._reset();
                return;
            }
            this._pannedChart(endPt.x - this._startFirstPt.x, endPt.y - this._startFirstPt.y);
        }
        else if (this._scaling) {
            this._scaledChart(e);
        }
        this._reset();
        this._disabledOthersInteraction(false);
        return true;
    };
    ChartGestures.prototype._initOverlay = function () {
        this._zoomEle.style.visibility = 'visible';
        switch (this._interactiveAxes) {
            case InteractiveAxes.X:
                this._overlayEle.style.left = (this._startFirstPt.x - this._zoomEleOffset.left) + 'px';
                this._overlayEle.style.top = (this._plotOffset.top - this._zoomEleOffset.top) + 'px';
                break;
            case InteractiveAxes.Y:
                this._overlayEle.style.left = (this._plotBox.x) + 'px';
                this._overlayEle.style.top = (this._startFirstPt.y - this._zoomEleOffset.top) + 'px';
                break;
            case InteractiveAxes.XY:
                this._overlayEle.style.left = (this._startFirstPt.x - this._zoomEleOffset.left) + 'px';
                this._overlayEle.style.top = (this._startFirstPt.y - this._zoomEleOffset.top) + 'px';
                break;
        }
    };
    ChartGestures.prototype._updateOverLay = function (mvPt) {
        var distanceX = this._startFirstPt.x - mvPt.x, distanceY = this._startFirstPt.y - mvPt.y, style = {};
        switch (this._interactiveAxes) {
            case InteractiveAxes.X:
                if ((Math.abs(distanceX)) < this._threadHold) {
                    return;
                }
                style = distanceX <= 0 ?
                    { width: Math.abs(distanceX) + 'px', height: this._plotBox.height + 'px' } :
                    { left: (mvPt.x - this._zoomEleOffset.left) + 'px', width: distanceX + 'px', height: this._plotBox.height + 'px' };
                break;
            case InteractiveAxes.Y:
                if ((Math.abs(distanceY)) < this._threadHold) {
                    return;
                }
                style = distanceY <= 0 ?
                    { height: Math.abs(distanceY) + 'px', width: this._plotBox.width + 'px' } :
                    { top: (mvPt.y - this._zoomEleOffset.top) + 'px', height: distanceY + 'px', width: this._plotBox.width + 'px' };
                break;
            case InteractiveAxes.XY:
                if ((Math.abs(distanceX)) >= this._threadHold) {
                    style['width'] = Math.abs(distanceX) + 'px';
                    if (distanceX > 0) {
                        style['left'] = (mvPt.x - this._zoomEleOffset.left) + 'px';
                    }
                }
                if ((Math.abs(distanceY)) >= this._threadHold) {
                    style['height'] = Math.abs(distanceY) + 'px';
                    if (distanceY > 0) {
                        style['top'] = (mvPt.y - this._zoomEleOffset.top) + 'px';
                    }
                }
                break;
        }
        wjcCore.setCss(this._overlayEle, style);
    };
    ChartGestures.prototype._updatePoint = function (mvPt) {
        var plotRect = this._plotOffset;
        if (mvPt.x < plotRect.left) {
            mvPt.x = plotRect.left;
        }
        if (mvPt.x > plotRect.left + plotRect.width) {
            mvPt.x = plotRect.left + plotRect.width;
        }
        if (mvPt.y < plotRect.top) {
            mvPt.y = plotRect.top;
        }
        if (mvPt.y > plotRect.top + plotRect.height) {
            mvPt.y = plotRect.top + plotRect.height;
        }
    };
    ChartGestures.prototype._pointInPlotArea = function (mvPt) {
        var plotRect = this._plotOffset;
        if (mvPt.x >= plotRect.left && mvPt.x <= plotRect.left + plotRect.width &&
            mvPt.y >= plotRect.top && mvPt.y <= plotRect.top + plotRect.height) {
            return true;
        }
        return false;
    };
    ChartGestures.prototype._zoomedChart = function (endPt) {
        if (!endPt) {
            return;
        }
        if (this._interactiveAxes === InteractiveAxes.X ||
            this._interactiveAxes === InteractiveAxes.XY) {
            this._zoomedAxis(endPt, true);
        }
        if (this._interactiveAxes === InteractiveAxes.Y ||
            this._interactiveAxes === InteractiveAxes.XY) {
            this._zoomedAxis(endPt, false);
        }
        this._startFirstPt = null;
    };
    ChartGestures.prototype._zoomedAxis = function (endPt, isX) {
        var htStart, htEnd, min, max, axis = isX ? this._chart.axisX : this._chart.axisY, xy = isX ? 'x' : 'y', lt = isX ? 'left' : 'top';
        if (!endPt) {
            return;
        }
        if (Math.abs(this._startFirstPt[xy] - endPt[xy]) > this._threadHold) {
            min = axis.convertBack(this._startFirstPt[xy] - this._plotOffset[lt] + this._plotBox[xy]);
            max = axis.convertBack(endPt[xy] - this._plotOffset[lt] + this._plotBox[xy]);
            if (max - min !== 0) {
                this._updateAxisRange(axis, Math.min(min, max), Math.max(min, max));
            }
        }
    };
    ChartGestures.prototype._panningChart = function (distanceX, distanceY) {
        var axisX = this._chart.axisX, axisY = this._chart.axisY, sgs = this._getTransFormGroups();
        distanceX = (Math.abs(distanceX)) < this._threadHold ? 0 : distanceX;
        distanceY = (Math.abs(distanceY)) < this._threadHold ? 0 : distanceY;
        if (this._interactiveAxes === InteractiveAxes.X) {
            distanceY = 0;
        }
        if (this._interactiveAxes === InteractiveAxes.Y) {
            distanceX = 0;
        }
        if (distanceX > 0 && axisX.actualMin.valueOf() === this._minX) {
            distanceX = 0;
        }
        if (distanceX < 0 && axisX.actualMax.valueOf() === this._maxX) {
            distanceX = 0;
        }
        if (distanceY > 0 && axisY.actualMax.valueOf() === this._maxY) {
            distanceY = 0;
        }
        if (distanceY < 0 && axisY.actualMin.valueOf() === this._minY) {
            distanceY = 0;
        }
        for (var i = 0; i < sgs.length; i++) {
            sgs[i].setAttribute('transform', 'translate(' + distanceX + ',' + distanceY + ')');
        }
    };
    ChartGestures.prototype._pannedChart = function (distanceX, distanceY) {
        if (this._interactiveAxes === InteractiveAxes.X ||
            this._interactiveAxes === InteractiveAxes.XY) {
            this._updateAxisByDistance(true, distanceX);
        }
        if (this._interactiveAxes === InteractiveAxes.Y ||
            this._interactiveAxes === InteractiveAxes.XY) {
            this._updateAxisByDistance(false, -distanceY);
        }
    };
    ChartGestures.prototype._scalingChart = function (scale, offset) {
        var axisX = this._chart.axisX, axisY = this._chart.axisY, seriesGroups, offsetX = offset.x !== undefined ? offset.x : 0, offsetY = offset.y !== undefined ? offset.y : 0, scaleX, scaleY;
        if (!scale) {
            return;
        }
        seriesGroups = this._getTransFormGroups();
        if (scale.x !== undefined) {
            if (scale.x < 1) {
                if (axisX.actualMin.valueOf() === this._minX &&
                    axisX.actualMax.valueOf() === this._maxX) {
                    scale.x = 1;
                    offsetX = 0;
                }
            }
        }
        if (scale.y !== undefined) {
            if (scale.y < 1) {
                if (axisY.actualMin.valueOf() === this._minY &&
                    axisY.actualMax.valueOf() === this._maxY) {
                    scale.y = 1;
                    offsetY = 0;
                }
            }
        }
        scaleX = scale.x !== undefined ? scale.x : 1;
        scaleY = scale.y !== undefined ? scale.y : 1;
        for (var i = 0; i < seriesGroups.length; i++) {
            seriesGroups[i].setAttribute('transform', 'translate(' + offsetX + ', ' + offsetY + ') ' +
                'scale(' + scaleX + ', ' + scaleY + ')');
        }
    };
    ChartGestures.prototype._scaledChart = function (e) {
        var min, max, chart = this._chart, axisX = chart.axisX, axisY = chart.axisY;
        if (!this._clip) {
            return;
        }
        if (this._interactiveAxes !== InteractiveAxes.Y) {
            if (this._clip['x'] !== undefined) {
                min = Math.max(this._minX, axisX.convertBack(this._clip['x']));
                max = Math.min(this._maxX, axisX.convertBack(this._clip['x'] + this._selection['w']));
                if (min - max !== 0) {
                    this._updateAxisRange(axisX, min, max);
                }
            }
        }
        if (this._interactiveAxes !== InteractiveAxes.X) {
            if (this._clip['y'] !== undefined) {
                max = Math.min(this._maxY, axisY.convertBack(this._clip['y']));
                min = Math.max(this._minY, axisY.convertBack(this._clip['y'] + this._selection['h']));
                if (min - max !== 0) {
                    this._updateAxisRange(axisY, min, max);
                }
            }
        }
    };
    ChartGestures.prototype._updateAxisByDistance = function (isX, distance) {
        var axis = isX ? this._chart.axisX : this._chart.axisY, oriMin = isX ? this._minX : this._minY, oriMax = isX ? this._maxX : this._maxY, min = axis.actualMin.valueOf(), max = axis.actualMax.valueOf(), change;
        if (distance === 0) {
            return;
        }
        if ((distance > 0 && oriMin === min) || (distance < 0 && oriMax === max)) {
            this._innerUpdating = true;
            this._chart.invalidate();
            return;
        }
        change = distance / (isX ? this._plotBox.width : this._plotBox.height);
        this._updateAxisByChg(isX, -change, -change);
    };
    ChartGestures.prototype._updateAxisByChg = function (isX, chgMin, chgMax) {
        var axis = isX ? this._chart.axisX : this._chart.axisY, oriMin = isX ? this._minX : this._minY, oriMax = isX ? this._maxX : this._maxY, min = axis.actualMin.valueOf(), max = axis.actualMax.valueOf(), range = max - min, plotRect = this._chart._plotRect, lt = isX ? plotRect.left : plotRect.top, wh = isX ? plotRect.width : plotRect.height, minRange = isX ? this._minXRange : this._minYRange, tMin, tMax;
        if (isNaN(chgMin) || isNaN(chgMax)) {
            return;
        }
        if (this._panning) {
            if (chgMin < 0) {
                tMin = isX ? axis.convertBack(lt + chgMin * wh) : axis.convertBack(lt + wh - chgMin * wh);
                if (tMin < oriMin) {
                    tMin = oriMin;
                    tMax = isX ? axis.convertBack(axis.convert(tMin) + wh) : axis.convertBack(axis.convert(tMin) - wh);
                }
                else {
                    tMax = isX ? axis.convertBack(lt + wh + chgMax * wh) : axis.convertBack(lt - chgMax * wh);
                }
            }
            else {
                tMax = isX ? axis.convertBack(lt + wh + chgMax * wh) : axis.convertBack(lt - chgMax * wh);
                if (tMax > oriMax) {
                    tMax = oriMax;
                    tMin = isX ? axis.convertBack(axis.convert(tMax) - wh) : axis.convertBack(axis.convert(tMax) + wh);
                }
                else {
                    tMin = isX ? axis.convertBack(lt + chgMin * wh) : axis.convertBack(lt + wh - chgMin * wh);
                }
            }
        }
        else if (this._scaling) {
            tMin = isX ? axis.convertBack(lt + chgMin * wh) : axis.convertBack(lt + wh - chgMin * wh);
            tMax = isX ? axis.convertBack(lt + wh + chgMax * wh) : axis.convertBack(lt - chgMax * wh);
            if (tMin < oriMin) {
                tMin = oriMin;
            }
            if (tMax > oriMax) {
                tMax = oriMax;
            }
            if ((tMax - tMin) < minRange) {
                tMin = tMax - minRange;
            }
        }
        this._updateAxisRange(axis, tMin, tMax);
    };
    ChartGestures.prototype._initAxisRangeWithPosAndScale = function (isX) {
        var range, initRange, initMin, initMax;
        if (isX) {
            range = this._maxX - this._minX;
            initRange = range * this._scaleX;
            initMin = this._minX + this._posX * (range - initRange);
            initMax = initMin + initRange;
            this._innerUpdating = true;
            this._chart.axisX.min = initMin;
            this._chart.axisX.max = initMax;
            this._lastMinX = initMin;
            this._lastMaxX = initMax;
        }
        else {
            range = this._maxY - this._minY;
            initRange = range * this._scaleY;
            initMin = this._minY + this._posY * (range - initRange);
            initMax = initMin + initRange;
            this._innerUpdating = true;
            this._chart.axisY.min = initMin;
            this._chart.axisY.max = initMax;
            this._lastMinY = initMin;
            this._lastMaxY = initMax;
        }
    };
    ChartGestures.prototype._updateAxisRange = function (axis, tMin, tMax) {
        this._chart.beginUpdate();
        axis.min = tMin;
        axis.max = tMax;
        if (axis === this._chart.axisX) {
            this._lastMinX = tMin;
            this._lastMaxX = tMax;
        }
        else {
            this._lastMinY = tMin;
            this._lastMaxY = tMax;
        }
        this._innerUpdating = true;
        this._chart.endUpdate();
    };
    ChartGestures.prototype._reset = function () {
        this._scaling = false;
        this._panning = false;
        this._startDistance = 0;
        this._startFirstPt = null;
        this._pinchStartEvents = [];
        this._startPointers = [];
        this._mvPointers = [];
        this._endPoint = null;
        this._clip = {};
        this._selection = {};
    };
    ChartGestures.prototype._getAxisMin = function (axis) {
        return wjcCore.isDate(axis.actualMin) ? axis.actualMin.valueOf() : axis.actualMin;
    };
    ChartGestures.prototype._getAxisMax = function (axis) {
        return wjcCore.isDate(axis.actualMax) ? axis.actualMax.valueOf() : axis.actualMax;
    };
    ChartGestures.prototype._getTransFormGroups = function () {
        var seriesGroups = this._seriesGroup.querySelectorAll('g[clip-path]');
        if (seriesGroups.length === 0) {
            seriesGroups = this._seriesGroup.querySelectorAll('g');
        }
        return seriesGroups;
    };
    ChartGestures.prototype._disabledOthersInteraction = function (disabled) {
        var hostEle = this._chart.hostElement;
        if (hostEle === null || hostEle === undefined) {
            return;
        }
        var lineMarks = hostEle.querySelectorAll('.wj-chart-linemarker-container');
        for (var i = 0; i < lineMarks.length; i++) {
            if (disabled) {
                wjcCore.addClass(lineMarks[i], ChartGestures._CSS_BLOCK_INTERACTION);
            }
            else {
                wjcCore.removeClass(lineMarks[i], ChartGestures._CSS_BLOCK_INTERACTION);
            }
        }
    };
    ChartGestures.prototype._getPoint = function (e) {
        return e instanceof MouseEvent ?
            new wjcCore.Point(e.pageX, e.pageY) :
            new wjcCore.Point(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    };
    ChartGestures.prototype._getTouchPair = function (event) {
        var touches = [];
        if (wjcCore.isArray(event)) {
            touches[0] = event[0];
            touches[1] = event[1];
        }
        else {
            if (event.type === 'touchend') {
                if (event.touches.length === 1) {
                    touches[0] = event.touches[0];
                    touches[1] = event.changedTouches[0];
                }
                else if (event.touches.length === 0) {
                    touches[0] = event.changedTouches[0];
                    touches[1] = event.changedTouches[1];
                }
            }
            else {
                touches[0] = event.touches[0];
                touches[1] = event.touches[1];
            }
        }
        return touches;
    };
    ChartGestures.prototype._touchDistance = function (event) {
        var touches = this._getTouchPair(event), dx = 0, dy = 0;
        if (touches[0] && touches[0]['pageX'] !== undefined
            && touches[1] && touches[1]['pageX'] !== undefined) {
            dx = touches[0]['pageX'] - touches[1]['pageX'];
        }
        if (touches[0] && touches[0]['pageY'] !== undefined
            && touches[1] && touches[1]['pageY'] !== undefined) {
            dy = touches[0]['pageY'] - touches[1]['pageY'];
        }
        return { x: dx, y: dy };
    };
    ChartGestures._CSS_ZOOM = 'wj-zoom';
    ChartGestures._CSS_ZOOM_OVERLAY = 'wj-zoom-overlay';
    ChartGestures._CSS_PANABLE = 'wj-panable';
    ChartGestures._CSS_TOUCH_DISABLED = 'wj-flexchart-touch-disabled';
    ChartGestures._CSS_BLOCK_INTERACTION = 'wj-block-other-interaction';
    return ChartGestures;
}());
exports.ChartGestures = ChartGestures;
//# sourceMappingURL=wijmo.chart.interaction.js.map