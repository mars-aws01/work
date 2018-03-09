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
var wjcInput = require("wijmo/wijmo.input");
var wjcGrid = require("wijmo/wijmo.grid");
var wjcSelf = require("wijmo/wijmo.viewer");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['viewer'] = wjcSelf;
'use strict';
var _isIOS = navigator.userAgent.match(/iPhone|iPad|iPod/i) != null;
function isIOS() {
    return _isIOS;
}
exports.isIOS = isIOS;
var _svgStart = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" xml:space="preserve">', _svgEnd = '</svg>';
exports.icons = {
    paginated: '<rect x="16" y= "1" width="1" height="1" />' +
        '<rect x="17" y= "2" width="1" height="1" />' +
        '<rect x="18" y= "3" width="1" height="1" />' +
        '<path d= "M20,5V4h-1v1h-0.6H18h-3V2V1.3V1h1V0h-1h0H5H4H3v24h2v0h13h1.1H20L20,5L20,5z M5,22.1V2h8v5h1h1h3v15.1H5z" />' +
        '<rect x="6" y= "8" width="10" height="1" />' +
        '<rect x="6" y= "5" width="5" height="1" />' +
        '<rect x="6" y= "11" width="10" height="1" />' +
        '<rect x="6" y= "14" width="10" height="1" />' +
        '<rect x="6" y= "17" width="10" height="1" />' +
        '<rect x="6" y= "20" width="10" height="1" />',
    print: '<rect x="5" y= "1" width="14" height="4" />' +
        '<polygon points= "22,8 22,7 19,7 19,6 5,6 5,7 2,7 2,8 1,8 1,11 1,20 2,20 2,21 5,21 5,11 19,11 19,21 22,21 22,20 23,20 23, 11 23, 8 "/>' +
        '<path d="M6,12v11h12V12H6z M16,21H8v-1h8V21z M16,18H8v-1h8V18z M16,15H8v-1h8V15z" />',
    exports: '<path d="M19.6,23"/>' +
        '<polyline points="5,19 5,2 13,2 13,7 14.3,7 15,7 18,7 18,9 20,9 20,7 20,6.4 20,5 20,4 19,4 19,5 15,5 15,2 15,1 16,1 16,0 15,0 5,0 3,0 3,2 3,19 3,21 5,21 "/>' +
        '<rect x="18" y="3" width="1" height="1"/>' +
        '<rect x="17" y="2" width="1" height="1"/>' +
        '<rect x="16" y="1" width="1" height="1"/>' +
        '<polygon points="17,16.6 20,14.1 17,11.6 17,13.6 13,13.6 13,14.6 17,14.6 "/>' +
        '<rect x="3" y="20.9" width="2" height="3.1"/>' +
        '<rect x="4.5" y="22" width="15.6" height="2"/>' +
        '<rect x="18" y="8.4" width="2" height="1.6"/>' +
        '<rect x="18" y="18" width="2.1" height="6"/>',
    portrait: '<path d="M19,0L19,0L5,0v0H3v24h0.1H5h14h1.7H21V0H19z M12.5,23h-1v-1h1V23z M19,21H5V2h14V21z"/>',
    landscape: '<path d="M24,19L24,19l0-14h0V3H0v0.1V5v14v1.7V21h24V19z M1,12.5v-1h1v1H1z M3,19V5h19v14H3z"/>',
    pageSetup: '<rect x="18" y="1" width="1" height="1"/>' +
        '<rect x="19" y="2" width="1" height="1"/>' +
        '<rect x="20" y="3" width="1" height="1"/>' +
        '<polygon points="22,5 22,4 21,4 21,5 20.4,5 20,5 17,5 17,2 17,1.3 17,1 18,1 18,0 17,0 17,0 7,0 6,0 5,0 5,5 7,5 7,2 15,2 15,7 16,7 17,7 20,7 20,22.1 7,22.1 7,19 5,19 5,24 5.9,24 7,24 20,24 21.1,24 22,24 22,5 "/>' +
        '<rect x="5" y="7" width="2" height="2"/>' +
        '<rect x="5" y="11" width="2" height="2"/>' +
        '<rect x="5" y="15" width="2" height="2"/>' +
        '<rect x="9" y="11" width="2" height="2"/>' +
        '<rect x="1" y="11" width="2" height="2"/>' +
        '<polygon points="9,8 9,8 8,8 8,9 9,9 9,10 10,10 10,8 "/>' +
        '<polygon points="2,9 2,9 2,10 3,10 3,9 4,9 4,8 2,8 "/>' +
        '<polygon points="3,16 3,16 4,16 4,15 3,15 3,14 2,14 2,16 "/>' +
        '<polygon points="10,15 10,15 10,14 9,14 9,15 8,15 8,16 10,16 "/>',
    previousPage: '<circle opacity=".25" cx="12" cy="12" r="12"/><polygon points="5.6,10.7 12,4.4 18.4,10.7 18.4,15 13.5,10.1 13.5,19.6 10.4,19.6 10.4,10.1 5.6,15 " />',
    nextPage: '<circle opacity=".25" cx="12" cy="12" r="12"/><polygon points="18.4,13.3 12,19.6 5.6,13.3 5.6,9 10.5,13.9 10.5,4.4 13.6,4.4 13.6,13.9 18.4,9 " />',
    firstPage: '<circle opacity=".25" cx="12" cy="12" r="12"/>' +
        '<polygon points="6.5,13.1 12,7.8 17.5,13.1 17.5,17.5 13.5,13.5 13.5,19.6 10.4,19.6 10.4,13.5 6.5,17.5 " />' +
        '<rect x="6.5" y= "4.4" width="10.9" height="2.2" />',
    lastPage: '<circle opacity=".25" cx="12" cy="12" r="12"/>' +
        '<polygon points="17.5,10.9 12,16.2 6.5,10.9 6.5,6.5 10.5,10.5 10.5,4.4 13.6,4.4 13.6,10.5 17.5,6.5 " />' +
        '<rect x="6.5" y= "17.5" transform="matrix(-1 -8.987357e-011 8.987357e-011 -1 24 37.0909)" width="10.9" height="2.2" />',
    backwardHistory: '<circle opacity=".25" cx="12" cy="12" r="12"/>' +
        '<polygon points="10.7,18.4 4.4,12 10.7,5.6 15,5.6 10.1,10.5 19.6,10.5 19.6,13.6 10.1,13.6 15,18.4 " />',
    forwardHistory: '<circle opacity=".25" cx="12" cy="12" r="12"/>' +
        '<polygon points="13.3,5.6 19.6,12 13.3,18.4 9,18.4 13.9,13.5 4.4,13.5 4.4,10.4 13.9,10.4 9,5.6 " />',
    selectTool: '<polygon points="19.9,13.4 5.6,1.1 5.3,19.9 10.5,14.7 14.3,23.3 16.4,22.4 12.6,13.8 "/>',
    moveTool: '<polygon points="12.5,3 14.5,3 12,0 9.5,3 11.5,3 11.5,21 11.5,21 9.6,21 12,24 14.5,21 12.5,21 "/>' +
        '<polygon points="21,12.5 21,14.5 24,12 21,9.5 21,11.5 3,11.5 3,11.5 3,9.6 0,12 3,14.5 3,12.5 "/>',
    continuousView: '<polygon points="22,0 22,5 9,5 9,0 7,0 7,5 7,7 7,7 24,7 24,7 24,5 24,0 "/>' +
        '<polygon points="23,15 19,15 19,11 20,11 20,10 19,10 18,10 17,10 9,10 7.4,10 7,10 7,24 9,24 9,12 17,12 17,15 17,16.6 17,17 22,17 22,24 24,24 24,17 24,15.1 24,15 24,15 24,14 23,14 "/>' +
        '<rect x="22" y="13" width="1" height="1"/>' +
        '<polygon points="20.9,12 20.9,13 22,13 22,12 21,12 21,11 20,11 20,12 "/>' +
        '<polygon points="4.9,5.2 2.5,2.2 0,5.2 2,5.2 2,9.2 3,9.2 3,5.2 "/>' +
        '<polygon points="2.9,19.2 2.9,15.2 1.9,15.2 1.9,19.2 0,19.2 2.5,22.1 4.9,19.2 "/>',
    singleView: '<rect x="16" y="1" width="1" height="1"/>' +
        '<rect x="17" y="2" width="1" height="1"/>' +
        '<rect x="18" y="3" width="1" height="1"/>' +
        '<path d="M20,5V4h-1v1h-0.6H18h-3V2V1.3V1h1V0h-1h0H5H4H3v24h2v0h13h1.1H20L20,5L20,5z M5,22.1V2h8v5h1h1h3v15.1H5z"/>',
    fitWholePage: '<rect x="16" y="1" width="1" height="1"/>' +
        '<rect x="17" y="2" width="1" height="1"/>' +
        '<rect x="18" y="3" width="1" height="1"/>' +
        '<path d="M20,5V4h-1v1h-0.6H18h-3V2V1.3V1h1V0h-1h0H5H4H3v24h2v0h13h1.1H20L20,5L20,5z M18,22.1H5V2h8v5h1h1h3V22.1z"/>' +
        '<polygon points="17,13.5 15,11 15,13 13,13 13,14 15,14 15,16 "/>' +
        '<polygon points="6,13.5 8,16 8,14 10,14 10,13 8,13 8,11 "/>' +
        '<polygon points="11.5,7 9,9 11,9 11,11 12,11 12,9 14,9 "/>' +
        '<polygon points="11.5,20 14,18 12,18 12,16 11,16 11,18 9,18 "/>',
    fitPageWidth: '<rect x="16" y="1" width="1" height="1"/>' +
        '<rect x="17" y="2" width="1" height="1"/>' +
        '<rect x="18" y="3" width="1" height="1"/>' +
        '<path d="M20,5V4h-1v1h-0.6H18h-3V2V1.3V1h1V0h-1h0H5H4H3v24h2v0h13h1.1H20L20,5L20,5z M5,22.1V2h8v5h1h1h3v15.1H5z"/>' +
        '<polygon points="14,15.5 17,13 14,10.6 14,12.6 13,12.6 13,13.6 14,13.6 "/>' +
        '<polyline points="6,13.1 9,15.6 9,13.6 10,13.6 10,12.6 9,12.6 9,10.6 6,13.1 "/>',
    zoomOut: '<circle opacity=".25" cx="12" cy="12" r="12"/><rect opacity=".75" x="5" y="10" width="14" height="3"/>',
    zoomIn: '<circle opacity=".25" cx="12" cy="12" r="12"/><polygon opacity=".75" points="19,10 13.5,10 13.5,4.5 10.5,4.5 10.5,10 5,10 5,13 10.5,13 10.5,18.5 13.5,18.5 13.5,13 19,13 " />',
    fullScreen: '<path d="M22,0H0v2.8V4v20h1.5H2h20h0.7H24V4V0H22z M7,1h1v1H7V1z M5,1h1v1H5V1z M3,1h1v1H3V1z M22,22H2L2,4h20L22,22z" />' +
        '<polygon points="19.6,9.9 20,6 16.1,6.4 17.6,7.8 14.7,10.6 15.4,11.3 18.3,8.5"/>' +
        '<polygon points="4.4,16.2 4,20 7.9,19.7 6.5,18.3 9.3,15.5 8.6,14.8 5.8,17.6"/>',
    exitFullScreen: '<path d="M22,0H0v2.8V4v20h1.5H2h20h0.7H24V4V0H22z M7,1h1v1H7V1z M5,1h1v1H5V1z M3,1h1v1H3V1z M22,22H2L2,4h20L22,22z" />' +
        '<polygon points="9.2,18.6 9.6,14.7 5.7,15.1 7.2,16.5 4.3,19.3 5,20 7.9,17.2"/>' +
        '<polygon points="14.8,7.5 14.4,11.3 18.3,11 16.9,9.6 19.7,6.8 19,6.1 16.2,8.9"/>',
    thumbnails: '<path d="M20,2h-5h-2v2v5v2v0h2v0h5v0h2v0V9V4V2H20z M20,9h-5V4h5V9z"/>' +
        '<path d="M20,13h-5h-2v2v5v2v0h2v0h5v0h2v0v-2v-5v-2H20z M20,20h-5v-5h5V20z"/>' +
        '<path d="M9,13H4H2v2v5v2v0h2v0h5v0h2v0v-2v-5v-2H9z M9,20H4v-5h5V20z"/>' +
        '<rect x="2" y="2" width="9" height="9"/>',
    outlines: '<path d="M22,0H2H0v2v20v2h2h20h2v-2V2V0H22z M2,2h12v20H2V2z M22,22h-6V2h6V22z"/>' +
        '<rect x="17.5" y="5" width="3" height="1" />' +
        '<rect x="17.5" y="8" width="3" height="1"/>' +
        '<rect x="17.5" y="11" width="3" height="1"/>',
    search: '<circle stroke-width="2" fill="none" cx="9.5" cy="9.5" r="8.5"/>' +
        '<rect x="16.9" y="13.7" transform="matrix(-0.7193 0.6947 -0.6947 -0.7193 44.3315 18.4942)" width="3" height="9"/>',
    searchNext: '<polygon points="12,12.6 4,4.5 4,11.4 12,19.5 20,11.4 20,4.5 "/>',
    searchPrevious: '<polygon points="12,11.4 20,19.5 20,12.6 12,4.5 4,12.6 4,19.5 "/>',
    hamburgerMenu: '<rect x="2" y="4.875" width="20" height="1.5"/>' +
        '<rect x="2" y="11.25" width="20" height="1.5"/>' +
        '<rect x="2" y="17.625" width="20" height="1.5"/>',
    viewMenu: '<path transform="scale(1.5)" d="M8,2.9c-4.4,0-8,2.2-8,5s3.6,5,8,5s8-2.2,8-5S12.4,2.9,8,2.9z M8,11.8c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4s4, 1.8,4,4C12, 10,10.2,11.8,8,11.8z"/>' +
        '<circle class="st0" cx="12" cy="11.85" r="3.45"/>',
    searchOptions: '<polygon points="12,12.6 4,4.5 4,11.4 12,19.5 20,11.4 20,4.5 "/>',
    searchLeft: '<polygon points="11.4,12 19.5,20 12.6,20 4.5,12 12.6,4 19.5,4 "/>',
    searchRight: '<polygon points="12.6,12 4.5,4 11.4,4 19.5,12 11.4,20 4.5,20 "/>',
    showZoomBar: '<path d="M22.8,20.7l-4.4-4.4c1.1-1.6,1.8-3.5,1.8-5.6c0-5.2-4.3-9.5-9.5-9.5s-9.5,4.3-9.5,9.5s4.3,9.5,9.5,9.5 ' +
        'c2.1,0,4-0.7,5.6-1.8l4.4,4.4L22.8,20.7z M4.2,10.7c0-3.6,2.9-6.5,6.5-6.5s6.5,2.9,6.5,6.5s-2.9,6.5-6.5,6.5S4.2,14.3,4.2,10.7z"/>' +
        '<polygon points="7.2,9.2 7.2,7.2 9.2,7.2 9.2,6.2 6.2,6.2 6.2,9.2 "/>' +
        '<polygon points="12.2,7.2 14.2,7.2 14.2,9.2 15.2,9.2 15.2,6.2 12.2,6.2 "/>' +
        '<polygon points="9.2,14.2 7.2,14.2 7.2,12.2 6.2,12.2 6.2,15.2 9.2,15.2 "/>' +
        '<polygon points="14.2,12.2 14.2,14.2 12.2,14.2 12.2,15.2 15.2,15.2 15.2,12.2 "/>',
    rubberbandTool: "\n        <g>\n\t        <polygon points=\"11.5,2 4,2 2,2 2,4 2,11.5 4,11.5 4,4 11.5,4 \t\"/>\n\t        <path d=\"M16,10V8h-2h-4H8v2v4v2h2h4h2v-2V10z M14,14h-4v-4h4V14z\"/>\n\t        <polygon points=\"20,12 20,19 19,19 19,20 12,20 12,22 20,22 22,22 22,20 22,12 \t\"/>\n\t        <rect x=\"16\" y=\"16\" class=\"st0\" width=\"1\" height=\"1\"/>\n\t        <rect x=\"17\" y=\"17\" class=\"st0\" width=\"1\" height=\"1\"/>\n\t        <rect x=\"18\" y=\"18\" class=\"st0\" width=\"1\" height=\"1\"/>\n        </g>",
    magnifierTool: "\n        <circle fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\" cx=\"9.5\" cy=\"9.5\" r=\"7.5\"/>\n        <rect x=\"17\" y=\"13.7\" transform=\"matrix(0.7193 -0.6947 0.6947 0.7193 -7.4537 17.9238)\" class=\"st1\" width=\"3\" height=\"9\"/>\n        <polygon points=\"14,8.5 10.5,8.5 10.5,5 8.5,5 8.5,8.5 5,8.5 5,10.5 8.5,10.5 8.5,14 10.5,14 10.5,10.5 14,10.5 \"/>\n        ",
    rotateDocument: "\n        <g>\n\t        <path d=\"M18,0H5H3v4v18v2h2h13h2v-2V4V0H18z M18,22H5V4h13V22z\"/>\n\t        <polygon points=\"9,12 13,12 13,14 15,11.5 13,9 13,11 9,11 8,11 8,12 8,17 9,17 \t\"/>\n        </g>",
    rotatePage: "\n        <g>\n\t        <rect x=\"16\" y=\"1\" width=\"1\" height=\"1\"/>\n\t        <rect x=\"17\" y=\"2\" width=\"1\" height=\"1\"/>\n\t        <rect x=\"18\" y=\"3\" width=\"1\" height=\"1\"/>\n\t        <path class=\"st0\" d=\"M19,4v1h-0.6H18h-3V2V1.3V1h1V0h-1H5H4H3v24h2h13h1.1H20V5V4H19z M18,22.1H5V2h8v5h1h1h3V22.1z\"/>\n\t        <polygon points=\"13,11 9,11 8,11 8,12 8,17 9,17 9,12 13,12 13,14 15,11.5 13,9 \t\"/>\n        </g>"
}, exports._hiddenCss = 'hidden', exports._commandTagAttr = 'command-tag';
function _pointMove(positive, pos, detalPosOrX, y) {
    var x, factor = positive ? 1 : -1;
    if (detalPosOrX instanceof wjcCore.Point) {
        x = detalPosOrX.x;
        y = detalPosOrX.y;
    }
    else {
        x = detalPosOrX;
        y = y || 0;
    }
    return new wjcCore.Point(pos.x + factor * x, pos.y + factor * y);
}
exports._pointMove = _pointMove;
var _ActionQueue = (function () {
    function _ActionQueue() {
        this._actions = [];
        this._isStarted = false;
    }
    _ActionQueue.prototype._any = function () {
        return this._actions.length > 0;
    };
    _ActionQueue.prototype.queue = function (action) {
        var _this = this;
        var any = this._any();
        this._actions.push(function () {
            action();
            _this._continue();
        });
        if (!this.isStarted || any)
            return;
        this._continue();
    };
    _ActionQueue.prototype._continue = function () {
        var first = this._actions.shift();
        if (first)
            first();
    };
    _ActionQueue.prototype.start = function () {
        if (this._isStarted)
            return;
        this._isStarted = true;
        this._continue();
    };
    Object.defineProperty(_ActionQueue.prototype, "isStarted", {
        get: function () {
            return this._isStarted;
        },
        enumerable: true,
        configurable: true
    });
    return _ActionQueue;
}());
exports._ActionQueue = _ActionQueue;
function _createSvgBtn(svgContent) {
    var svg = _toDOM(_svgStart + svgContent + _svgEnd);
    wjcCore.addClass(svg, 'wj-svg-btn');
    var btn = document.createElement('a');
    btn.appendChild(svg);
    wjcCore.addClass(btn, 'wj-btn');
    btn.tabIndex = 0;
    return btn;
}
exports._createSvgBtn = _createSvgBtn;
function _setLandscape(pageSettings, landscape) {
    if (pageSettings.landscape === landscape) {
        return;
    }
    pageSettings.landscape = landscape;
    var width = pageSettings.width;
    pageSettings.width = pageSettings.height;
    pageSettings.height = width;
    var left = pageSettings.leftMargin;
    if (landscape) {
        pageSettings.leftMargin = pageSettings.bottomMargin;
        pageSettings.bottomMargin = pageSettings.rightMargin;
        pageSettings.rightMargin = pageSettings.topMargin;
        pageSettings.topMargin = left;
    }
    else {
        pageSettings.leftMargin = pageSettings.topMargin;
        pageSettings.topMargin = pageSettings.rightMargin;
        pageSettings.rightMargin = pageSettings.bottomMargin;
        pageSettings.bottomMargin = left;
    }
}
exports._setLandscape = _setLandscape;
function _clonePageSettings(src) {
    if (!src) {
        return null;
    }
    var result = {};
    result.height = src.height ? new _Unit(src.height) : null;
    result.width = src.width ? new _Unit(src.width) : null;
    result.bottomMargin = src.bottomMargin ? new _Unit(src.bottomMargin) : null;
    result.leftMargin = src.leftMargin ? new _Unit(src.leftMargin) : null;
    result.rightMargin = src.rightMargin ? new _Unit(src.rightMargin) : null;
    result.topMargin = src.topMargin ? new _Unit(src.topMargin) : null;
    result.landscape = src.landscape;
    result.paperSize = src.paperSize;
    return result;
}
exports._clonePageSettings = _clonePageSettings;
function _enumToArray(enumType) {
    var items = [];
    for (var i in enumType) {
        if (!i || !i.length || i[0] == "_" || isNaN(parseInt(i)))
            continue;
        items.push({ text: enumType[i], value: i });
    }
    return items;
}
exports._enumToArray = _enumToArray;
function _removeChildren(node, condition) {
    if (!node || !node.children) {
        return;
    }
    for (var ch = node.children, i = ch.length - 1; i > -1; i--) {
        var child = ch[i];
        if (condition == null || condition(child)) {
            var cc = child.querySelector('.wj-control');
            if (cc && (cc = wjcCore.Control.getControl(cc))) {
                cc.dispose();
            }
            node.removeChild(child);
        }
    }
}
exports._removeChildren = _removeChildren;
function _toDOMs(html) {
    var node, container = document.createElement("div"), f = document.createDocumentFragment();
    container.innerHTML = html;
    while (node = container.firstChild)
        f.appendChild(node);
    return f;
}
exports._toDOMs = _toDOMs;
function _toDOM(html) {
    return _toDOMs(html).firstChild;
}
exports._toDOM = _toDOM;
function _addEvent(elm, evType, fn, useCapture) {
    var types = evType.split(","), type;
    for (var i = 0; i < types.length; i++) {
        type = types[i].trim();
        if (elm.addEventListener) {
            elm.addEventListener(type, fn, useCapture);
        }
        else if (elm.attachEvent) {
            elm.attachEvent('on' + type, fn);
        }
        else {
            elm['on' + type] = fn;
        }
    }
}
exports._addEvent = _addEvent;
function _removeEvent(elm, evType, fn) {
    var types = evType.split(","), type;
    for (var i = 0; i < types.length; i++) {
        type = types[i].trim();
        if (elm.removeEventListener) {
            elm.removeEventListener(type, fn);
        }
        else if (elm.detachEvent) {
            elm.detachEvent('on' + type, fn);
        }
        else {
            elm['on' + type] = null;
        }
    }
}
exports._removeEvent = _removeEvent;
var _checkedCss = 'wj-state-active', _disabledCss = 'wj-state-disabled';
function _checkImageButton(button, checked) {
    if (checked) {
        wjcCore.addClass(button, _checkedCss);
        return;
    }
    wjcCore.removeClass(button, _checkedCss);
}
exports._checkImageButton = _checkImageButton;
function _disableImageButton(button, disabled) {
    if (disabled) {
        wjcCore.addClass(button, _disabledCss);
        return;
    }
    wjcCore.removeClass(button, _disabledCss);
}
exports._disableImageButton = _disableImageButton;
function _showImageButton(button, visible) {
    if (visible) {
        wjcCore.removeClass(button, exports._hiddenCss);
        return;
    }
    wjcCore.addClass(button, exports._hiddenCss);
}
exports._showImageButton = _showImageButton;
function _isDisabledImageButton(button) {
    return wjcCore.hasClass(button, _disabledCss);
}
exports._isDisabledImageButton = _isDisabledImageButton;
function _isCheckedImageButton(button) {
    return wjcCore.hasClass(button, _checkedCss);
}
exports._isCheckedImageButton = _isCheckedImageButton;
var wjEventsName = '__wjEvents';
function _addWjHandler(key, event, func, self) {
    if (key) {
        var handlersDic = event[wjEventsName];
        if (!handlersDic) {
            handlersDic = event[wjEventsName] = {};
        }
        var handlers = handlersDic[key];
        if (!handlers) {
            handlers = handlersDic[key] = [];
        }
        handlers.push(func);
    }
    event.addHandler(func, self);
}
exports._addWjHandler = _addWjHandler;
function _removeAllWjHandlers(key, event) {
    if (!key) {
        return;
    }
    var handlersDic = event[wjEventsName];
    if (!handlersDic) {
        return;
    }
    var handlers = handlersDic[key];
    if (!handlers) {
        return;
    }
    handlers.forEach(function (h) { return event.removeHandler(h); });
}
exports._removeAllWjHandlers = _removeAllWjHandlers;
function _getErrorMessage(reason) {
    var errorText = reason || wjcCore.culture.Viewer.errorOccured;
    if (reason.Message) {
        errorText = reason.Message;
        if (reason.ExceptionMessage) {
            errorText += '<br/>' + reason.ExceptionMessage;
        }
    }
    return errorText;
}
exports._getErrorMessage = _getErrorMessage;
function _checkSeparatorShown(container) {
    var groupEnd, hideSeparator = true, currentEle, currentEleHidden, lastShowSeparator;
    for (var i = 0; i < container.children.length; i++) {
        currentEle = container.children[i];
        groupEnd = wjcCore.hasClass(currentEle, 'wj-separator');
        currentEleHidden = wjcCore.hasClass(currentEle, exports._hiddenCss);
        if (!groupEnd && !currentEleHidden) {
            hideSeparator = false;
            continue;
        }
        if (groupEnd) {
            if (hideSeparator) {
                if (!currentEleHidden) {
                    wjcCore.addClass(currentEle, exports._hiddenCss);
                }
            }
            else {
                if (currentEleHidden) {
                    wjcCore.removeClass(currentEle, exports._hiddenCss);
                }
                lastShowSeparator = currentEle;
            }
            hideSeparator = true;
        }
    }
    if (hideSeparator && lastShowSeparator) {
        wjcCore.addClass(lastShowSeparator, 'hidden');
    }
}
exports._checkSeparatorShown = _checkSeparatorShown;
function _twipToPixel(value) {
    return _Unit.convertValue(value, _UnitType.Twip, _UnitType.Dip);
}
exports._twipToPixel = _twipToPixel;
function _pixelToTwip(value) {
    return _Unit.convertValue(value, _UnitType.Dip, _UnitType.Twip);
}
exports._pixelToTwip = _pixelToTwip;
function _hasScrollbar(element, isHorizontal) {
    if (isHorizontal) {
        return element.scrollWidth > element.clientWidth;
    }
    else {
        return element.scrollHeight > element.clientHeight;
    }
}
exports._hasScrollbar = _hasScrollbar;
function _transformSvg(svg, width, height, zoomFactor, rotateAngle) {
    zoomFactor = zoomFactor == null ? 1.0 : zoomFactor;
    var g = svg.querySelector('g');
    if (g) {
        var transformAttr = 'scale(' + zoomFactor + ')';
        if (rotateAngle != null) {
            switch (rotateAngle) {
                case _RotateAngle.Rotation90:
                    transformAttr += ' rotate(90)';
                    transformAttr += ' translate(0 ' + -height + ')';
                    break;
                case _RotateAngle.Rotation180:
                    transformAttr += ' rotate(180)';
                    transformAttr += ' translate(' + -width + ' ' + -height + ')';
                    break;
                case _RotateAngle.Rotation270:
                    transformAttr += ' rotate(270)';
                    transformAttr += ' translate(' + -width + ' 0)';
                    break;
            }
        }
        g.setAttribute('transform', transformAttr);
        if (wjcCore.isIE) {
            svg = g.parentNode;
            svg.removeChild(g);
            svg.appendChild(g);
        }
    }
    return svg;
}
exports._transformSvg = _transformSvg;
function _getTransformedPosition(bound, size, rotateAngle, zoomFactor) {
    var boundsPx = {
        x: _twipToPixel(bound.x),
        y: _twipToPixel(bound.y),
        width: _twipToPixel(bound.width),
        height: _twipToPixel(bound.height)
    }, heightOffset, widthOffset;
    switch (rotateAngle) {
        case _RotateAngle.NoRotate:
            heightOffset = boundsPx.y;
            widthOffset = boundsPx.x;
            break;
        case _RotateAngle.Rotation90:
            heightOffset = boundsPx.x;
            widthOffset = size.height.valueInPixel - boundsPx.y - boundsPx.height;
            break;
        case _RotateAngle.Rotation180:
            heightOffset = size.height.valueInPixel - boundsPx.y - boundsPx.height;
            widthOffset = size.width.valueInPixel - boundsPx.x - boundsPx.width;
            break;
        case _RotateAngle.Rotation270:
            heightOffset = size.width.valueInPixel - boundsPx.x - boundsPx.width;
            widthOffset = boundsPx.y;
            break;
    }
    return new wjcCore.Point(widthOffset * zoomFactor, heightOffset * zoomFactor);
}
exports._getTransformedPosition = _getTransformedPosition;
function _getRotatedSize(size, rotateAngle) {
    if (rotateAngle === _RotateAngle.NoRotate || rotateAngle === _RotateAngle.Rotation180) {
        return size;
    }
    return {
        width: size.height,
        height: size.width
    };
}
exports._getRotatedSize = _getRotatedSize;
function _getPositionByHitTestInfo(hitTestInfo) {
    if (hitTestInfo) {
        return {
            pageIndex: hitTestInfo.pageIndex, pageBounds: { x: hitTestInfo.x, y: hitTestInfo.y, width: 0, height: 0 }
        };
    }
    return {
        pageIndex: 0, pageBounds: { x: 0, y: 0, width: 0, height: 0 }
    };
}
exports._getPositionByHitTestInfo = _getPositionByHitTestInfo;
'use strict';
var _DocumentSource = (function () {
    function _DocumentSource(options) {
        this._hasOutlines = false;
        this._pageCount = 0;
        this._supportedExportDescriptions = [];
        this._isLoadCompleted = false;
        this._isDisposed = false;
        this._errors = [];
        this.pageCountChanged = new wjcCore.Event();
        this.disposed = new wjcCore.Event();
        this.pageSettingsChanged = new wjcCore.Event();
        this.loading = new wjcCore.Event();
        this.loadCompleted = new wjcCore.Event();
        this.queryLoadingData = new wjcCore.Event();
        this._service = this._createDocumentService(options);
        this._paginated = options.paginated;
    }
    _DocumentSource.prototype.onQueryLoadingData = function (e) {
        this.queryLoadingData.raise(this, e);
    };
    _DocumentSource.prototype._updateIsLoadCompleted = function (value) {
        if (this._isLoadCompleted === value) {
            return;
        }
        this._isLoadCompleted = value;
        if (value) {
            this.onLoadCompleted();
        }
    };
    _DocumentSource.prototype._updateIsDisposed = function (value) {
        if (this._isDisposed === value) {
            return;
        }
        this._isDisposed = value;
        this.onDisposed();
    };
    _DocumentSource.prototype._getIsDisposed = function () {
        return this._isDisposed;
    };
    _DocumentSource.prototype._checkHasOutlines = function (data) {
        return data.hasOutlines;
    };
    _DocumentSource.prototype._checkIsLoadCompleted = function (data) {
        return data.status === _ExecutionStatus.completed
            || data.status === _ExecutionStatus.stopped
            || data.status === _ExecutionStatus.loaded;
    };
    Object.defineProperty(_DocumentSource.prototype, "executionDateTime", {
        get: function () {
            return this._executionDateTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_DocumentSource.prototype, "expiredDateTime", {
        get: function () {
            return this._expiredDateTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_DocumentSource.prototype, "errors", {
        get: function () {
            return this._errors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_DocumentSource.prototype, "isLoadCompleted", {
        get: function () {
            return this._isLoadCompleted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_DocumentSource.prototype, "isDisposed", {
        get: function () {
            return this._getIsDisposed();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_DocumentSource.prototype, "features", {
        get: function () {
            return this._features;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_DocumentSource.prototype, "pageSettings", {
        get: function () {
            return this._pageSettings;
        },
        enumerable: true,
        configurable: true
    });
    _DocumentSource.prototype.onPageSettingsChanged = function (e) {
        this.pageSettingsChanged.raise(this, e || new wjcCore.EventArgs());
    };
    _DocumentSource.prototype.onLoadCompleted = function (e) {
        this.loadCompleted.raise(this, e || new wjcCore.EventArgs());
    };
    _DocumentSource.prototype.onLoading = function (e) {
        this.loading.raise(this, e || new wjcCore.EventArgs());
    };
    _DocumentSource.prototype.onDisposed = function (e) {
        this.disposed.raise(this, e || new wjcCore.EventArgs());
    };
    _DocumentSource.prototype.setPageSettings = function (pageSettings) {
        var _this = this;
        return this._innerService.setPageSettings(pageSettings).then(function (data) { return _this._updatePageSettings(data); });
    };
    _DocumentSource.prototype._updatePageSettings = function (newValue) {
        this._pageSettings = newValue;
        this.onPageSettingsChanged();
    };
    Object.defineProperty(_DocumentSource.prototype, "_innerService", {
        get: function () {
            return this._service;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_DocumentSource.prototype, "paginated", {
        get: function () {
            return this.pageSettings ? this.pageSettings.paginated : this._paginated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_DocumentSource.prototype, "hasOutlines", {
        get: function () {
            return this._hasOutlines;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_DocumentSource.prototype, "pageCount", {
        get: function () {
            return this._pageCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_DocumentSource.prototype, "initialPosition", {
        get: function () {
            return this._initialPosition;
        },
        set: function (value) {
            this._initialPosition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_DocumentSource.prototype, "service", {
        get: function () {
            return this._service;
        },
        enumerable: true,
        configurable: true
    });
    _DocumentSource.prototype.getSupportedExportDescriptions = function () {
        return this._innerService.getSupportedExportDescriptions();
    };
    _DocumentSource.prototype.getBookmark = function (name) {
        return this._innerService.getBookmark(name);
    };
    _DocumentSource.prototype.executeCustomAction = function (actionString) {
        return this._innerService.executeCustomAction(actionString);
    };
    _DocumentSource.prototype.getOutlines = function () {
        return this._innerService.getOutlines();
    };
    _DocumentSource.prototype.getFeatures = function () {
        var _this = this;
        return this._innerService.getFeatures().then(function (v) { _this._features = v; });
    };
    _DocumentSource.prototype.dispose = function () {
        var _this = this;
        return this._innerService.dispose().then(function () { return _this._updateIsDisposed(true); });
    };
    _DocumentSource.prototype.load = function () {
        var _this = this;
        this.onLoading();
        var data = {};
        if (this._paginated != null) {
            data["pageSettings.paginated"] = this.paginated;
        }
        var e = new QueryLoadingDataEventArgs(data);
        this.onQueryLoadingData(e);
        return this._innerService.load(e.data).then(function (v) {
            _this._updateExecutionInfo(v);
            _this._updateIsLoadCompleted(true);
        });
    };
    _DocumentSource.prototype._updateExecutionInfo = function (data) {
        if (data == null) {
            return;
        }
        this._executionDateTime = this._getExecutionDateTime(data);
        this._expiredDateTime = this._getExpiredDateTime(data);
        this._updatePageSettings(data.pageSettings);
        this._features = data.features;
        this._updateDocumentStatus(data.status);
    };
    _DocumentSource.prototype._updateDocumentStatus = function (data) {
        if (!data) {
            return;
        }
        this._errors = data.errorList;
        this._initialPosition = data.initialPosition;
        this._updatePageCount(this._getPageCount(data));
        this._expiredDateTime = this._getExpiredDateTime(data);
        this._hasOutlines = this._checkHasOutlines(data);
        this._updateIsLoadCompleted(this._checkIsLoadCompleted(data));
    };
    _DocumentSource.prototype._getExecutionDateTime = function (data) {
        return data.loadedDateTime;
    };
    _DocumentSource.prototype._getExpiredDateTime = function (data) {
        return data.expiredDateTime;
    };
    _DocumentSource.prototype._getPageCount = function (data) {
        return data.pageCount;
    };
    _DocumentSource.prototype._updatePageCount = function (value) {
        if (this._pageCount === value) {
            return;
        }
        this._pageCount = value;
        this.onPageCountChanged();
    };
    _DocumentSource.prototype.getStatus = function () {
        var _this = this;
        return this._innerService.getStatus().then(function (v) { _this._updateDocumentStatus(v); });
    };
    _DocumentSource.prototype._createDocumentService = function (options) {
        throw _DocumentSource._abstractMethodException;
    };
    _DocumentSource.prototype.onPageCountChanged = function (e) {
        this.pageCountChanged.raise(this, e || new wjcCore.EventArgs());
    };
    _DocumentSource.prototype.print = function (rotations) {
        var _this = this;
        if (wjcCore.isMobile()) {
            var url = this.getRenderToFilterUrl({ format: 'pdf' });
            window.open(url);
            return;
        }
        var doc = new wjcCore.PrintDocument({
            title: 'Document'
        });
        this.renderToFilter({ format: 'html' }).then(function (xhr) {
            doc.append(xhr.responseText);
            var udoc = doc._getDocument();
            udoc.close();
            window.setTimeout(function () {
                _this._removeScript(doc);
                _this._rotate(doc, rotations);
                doc.print();
            }, 100);
        });
    };
    _DocumentSource.prototype._removeScript = function (doc) {
        var scripts = doc._getDocument().querySelectorAll('script');
        for (var i = 0; i < scripts.length; i++) {
            var item = scripts.item(i);
            item.parentElement.removeChild(item);
        }
    };
    _DocumentSource.prototype._rotate = function (doc, rotations) {
        if (!rotations || !rotations.length) {
            return;
        }
        var svgs = doc._getDocument().querySelectorAll('svg');
        for (var i = 0; i < svgs.length; i++) {
            var r = rotations[i];
            if (!r) {
                continue;
            }
            var svg = svgs[i], g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            while (svg.hasChildNodes()) {
                g.appendChild(svg.firstChild);
            }
            svg.appendChild(g);
            var sz = { width: new _Unit(svg.width.baseVal.value), height: new _Unit(svg.height.baseVal.value) }, szr = _getRotatedSize(sz, r), section = svg.parentNode;
            section.style.width = szr.width.valueInPixel + 'px';
            section.style.height = szr.height.valueInPixel + 'px';
            svg.setAttribute('width', szr.width.valueInPixel.toString() + 'px');
            svg.setAttribute('height', szr.height.valueInPixel.toString() + 'px');
            _transformSvg(svgs[i], sz.width.valueInPixel, sz.height.valueInPixel, 1, r);
        }
    };
    _DocumentSource.prototype.renderToFilter = function (options) {
        return this._innerService.renderToFilter(options);
    };
    _DocumentSource.prototype.getRenderToFilterUrl = function (options) {
        return this._innerService.getRenderToFilterUrl(options);
    };
    _DocumentSource.prototype.search = function (searchOptions) {
        return this._innerService.search(searchOptions);
    };
    _DocumentSource._abstractMethodException = 'It is an abstract method, please implement it.';
    return _DocumentSource;
}());
exports._DocumentSource = _DocumentSource;
function _statusJsonReviver(k, v) {
    if (wjcCore.isString(v)) {
        if (_strEndsWith(k, 'DateTime')) {
            return new Date(v);
        }
        if (k === 'width' || k === 'height' || _strEndsWith(k, 'Margin')) {
            return new _Unit(v);
        }
    }
    return v;
}
exports._statusJsonReviver = _statusJsonReviver;
var _DocumentService = (function () {
    function _DocumentService(options) {
        this._url = '';
        this._url = options.serviceUrl || '';
        this._documentPath = options.filePath;
    }
    Object.defineProperty(_DocumentService.prototype, "serviceUrl", {
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_DocumentService.prototype, "filePath", {
        get: function () {
            return this._documentPath;
        },
        enumerable: true,
        configurable: true
    });
    _DocumentService.prototype.getStatus = function () {
        throw _DocumentSource._abstractMethodException;
    };
    _DocumentService.prototype.setPageSettings = function (pageSettings) {
        throw _DocumentSource._abstractMethodException;
    };
    _DocumentService.prototype.getBookmark = function (name) {
        throw _DocumentSource._abstractMethodException;
    };
    _DocumentService.prototype.executeCustomAction = function (actionString) {
        throw _DocumentSource._abstractMethodException;
    };
    _DocumentService.prototype.load = function (data) {
        throw _DocumentSource._abstractMethodException;
    };
    _DocumentService.prototype.dispose = function () {
        throw _DocumentSource._abstractMethodException;
    };
    _DocumentService.prototype.getOutlines = function () {
        throw _DocumentSource._abstractMethodException;
    };
    _DocumentService.prototype.renderToFilter = function (options) {
        throw _DocumentSource._abstractMethodException;
    };
    _DocumentService.prototype.search = function (searchOptions) {
        throw _DocumentSource._abstractMethodException;
    };
    _DocumentService.prototype.getRenderToFilterUrl = function (options) {
        throw _DocumentSource._abstractMethodException;
    };
    _DocumentService.prototype.getSupportedExportDescriptions = function () {
        throw _DocumentSource._abstractMethodException;
    };
    _DocumentService.prototype.getFeatures = function () {
        throw _DocumentSource._abstractMethodException;
    };
    return _DocumentService;
}());
exports._DocumentService = _DocumentService;
function _pageSettingsJsonReviver(k, v) {
    if (wjcCore.isString(v)) {
        if (k === 'width' || k === 'height' || _strEndsWith(k, 'Margin')) {
            return new _Unit(v);
        }
    }
    return v;
}
exports._pageSettingsJsonReviver = _pageSettingsJsonReviver;
function _strEndsWith(text, suffix) {
    return text.slice(-suffix.length) === suffix;
}
exports._strEndsWith = _strEndsWith;
function _appendQueryString(url, queries) {
    queries = queries || {};
    var queryList = [];
    for (var k in queries) {
        queryList.push(k + '=' + queries[k]);
    }
    if (queryList.length) {
        var sep = url.indexOf('?') < 0 ? '?' : '&';
        url += sep + queryList.join('&');
    }
    return url;
}
exports._appendQueryString = _appendQueryString;
function _joinUrl() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
    }
    var urlParts = [];
    for (var i = 0, l = data.length; i < l; i++) {
        var item = data[i];
        if (item) {
            if (typeof item !== 'string') {
                urlParts = urlParts.concat(_joinStringUrl(item));
            }
            else {
                urlParts.push(_prepareStringUrl(item).join('/'));
            }
        }
    }
    return urlParts.join('/');
}
exports._joinUrl = _joinUrl;
function _joinStringUrl(data) {
    if (data == null) {
        return null;
    }
    var urlParts = [];
    for (var i = 0, l = data.length; i < l; i++) {
        urlParts = urlParts.concat(_prepareStringUrl(data[i]));
    }
    return urlParts;
}
exports._joinStringUrl = _joinStringUrl;
function _prepareStringUrl(data) {
    var paramParts = data.split('/');
    if (paramParts.length > 0 && !paramParts[paramParts.length - 1].length) {
        paramParts.splice(paramParts.length - 1);
    }
    return paramParts;
}
exports._prepareStringUrl = _prepareStringUrl;
function _httpRequest(url, settings) {
    if (!settings || !settings.cache) {
        url = _disableCache(url);
    }
    if (settings) {
        var method = (settings.method || 'GET').toUpperCase();
        if (method !== 'GET') {
            if (settings.data) {
                var dataStr = _objToParams(settings.data);
                if (dataStr != null) {
                    settings.data = dataStr;
                }
            }
            if (!settings.requestHeaders) {
                settings.requestHeaders = { 'Content-Type': 'application/x-www-form-urlencoded' };
            }
            else if (!settings.requestHeaders['Content-Type']) {
                settings.requestHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
            }
        }
    }
    return wjcCore.httpRequest(url, settings);
}
exports._httpRequest = _httpRequest;
function _objToParams(obj) {
    var paramList = [];
    obj = obj || {};
    for (var key in obj) {
        if (obj[key] !== null && obj[key] !== undefined) {
            if (wjcCore.isArray(obj[key])) {
                if (obj[key].length > 0) {
                    for (var i = 0; i < obj[key].length; i++) {
                        paramList.push(key + '=' + encodeURIComponent(obj[key][i]));
                    }
                }
                else {
                    paramList.push(key + '=');
                }
            }
            else {
                paramList.push(key + '=' + encodeURIComponent(obj[key]));
            }
        }
    }
    return paramList.join('&');
}
exports._objToParams = _objToParams;
function _disableCache(url) {
    return url + (url.indexOf('?') == -1 ? '?' : '&') + '_=' + new Date().getTime();
}
exports._disableCache = _disableCache;
var _UnitType;
(function (_UnitType) {
    _UnitType[_UnitType["Document"] = 0] = "Document";
    _UnitType[_UnitType["Inch"] = 1] = "Inch";
    _UnitType[_UnitType["Mm"] = 2] = "Mm";
    _UnitType[_UnitType["Pica"] = 3] = "Pica";
    _UnitType[_UnitType["Point"] = 4] = "Point";
    _UnitType[_UnitType["Twip"] = 5] = "Twip";
    _UnitType[_UnitType["InHs"] = 6] = "InHs";
    _UnitType[_UnitType["Display"] = 7] = "Display";
    _UnitType[_UnitType["Cm"] = 8] = "Cm";
    _UnitType[_UnitType["Dip"] = 9] = "Dip";
})(_UnitType = exports._UnitType || (exports._UnitType = {}));
var _Unit = (function () {
    function _Unit(value, units) {
        if (units === void 0) { units = _UnitType.Dip; }
        _Unit._initUnitTypeDic();
        if (wjcCore.isObject(value)) {
            var obj = value;
            value = obj.value;
            units = obj.units;
        }
        else if (wjcCore.isString(value)) {
            var numValue = parseFloat(value);
            if (!isNaN(numValue)) {
                units = _Unit._unitTypeDic[value.substr(numValue.toString().length)];
                value = numValue;
            }
        }
        this._value = value;
        this._units = units;
        this._valueInPixel = _Unit.convertValue(value, units, _UnitType.Dip);
    }
    _Unit._initUnitTypeDic = function () {
        if (_Unit._unitTypeDic) {
            return;
        }
        _Unit._unitTypeDic = {};
        for (var k in _Unit._unitTypes) {
            _Unit._unitTypeDic[_Unit._unitTypeDic[k] = _Unit._unitTypes[k]] = k;
        }
    };
    Object.defineProperty(_Unit.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_Unit.prototype, "units", {
        get: function () {
            return this._units;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_Unit.prototype, "valueInPixel", {
        get: function () {
            return this._valueInPixel;
        },
        enumerable: true,
        configurable: true
    });
    _Unit.prototype.toString = function () {
        return _Unit.toString(this);
    };
    _Unit.toString = function (unit) {
        if (unit.value == null) {
            return '';
        }
        return unit.value + _Unit._unitTypeDic[unit.units];
    };
    _Unit.convertValue = function (value, from, to) {
        if (from === to) {
            return value;
        }
        var valueInInch;
        switch (from) {
            case _UnitType.Document:
                valueInInch = value / _Unit._DocumentUnitsPerInch;
                break;
            case _UnitType.Inch:
                valueInInch = value;
                break;
            case _UnitType.Mm:
                valueInInch = value / _Unit._MmPerInch;
                break;
            case _UnitType.Pica:
                valueInInch = value / _Unit._PicaPerInch;
                break;
            case _UnitType.Point:
                valueInInch = value / _Unit._PointsPerInch;
                break;
            case _UnitType.Twip:
                valueInInch = value / _Unit._TwipsPerInch;
                break;
            case _UnitType.InHs:
                valueInInch = value / 100;
                break;
            case _UnitType.Display:
                valueInInch = value / _Unit._DisplayPerInch;
                break;
            case _UnitType.Cm:
                valueInInch = value / _Unit._CmPerInch;
                break;
            case _UnitType.Dip:
                valueInInch = value / _Unit._DipPerInch;
                break;
            default:
                throw 'Invalid from _UnitType: ' + from;
        }
        switch (to) {
            case _UnitType.Document:
                return valueInInch * _Unit._DocumentUnitsPerInch;
            case _UnitType.Inch:
                return valueInInch;
            case _UnitType.Mm:
                return valueInInch * _Unit._MmPerInch;
            case _UnitType.Pica:
                return valueInInch * _Unit._PicaPerInch;
            case _UnitType.Point:
                return valueInInch * _Unit._PointsPerInch;
            case _UnitType.Twip:
                return valueInInch * _Unit._TwipsPerInch;
            case _UnitType.InHs:
                return valueInInch * 100;
            case _UnitType.Display:
                return valueInInch * _Unit._DisplayPerInch;
            case _UnitType.Cm:
                return valueInInch * _Unit._CmPerInch;
            case _UnitType.Dip:
                return valueInInch * _Unit._DipPerInch;
            default:
                throw 'Invalid to _UnitType: ' + to;
        }
    };
    _Unit._MmPerInch = 25.4;
    _Unit._DocumentUnitsPerInch = 300;
    _Unit._PointsPerInch = 72;
    _Unit._TwipsPerInch = 1440;
    _Unit._PicaPerInch = 6;
    _Unit._CmPerInch = _Unit._MmPerInch / 10;
    _Unit._DisplayPerInch = 75;
    _Unit._DipPerInch = 96;
    _Unit._unitTypes = {
        doc: _UnitType.Document,
        in: _UnitType.Inch,
        mm: _UnitType.Mm,
        pc: _UnitType.Pica,
        pt: _UnitType.Point,
        tw: _UnitType.Twip,
        inhs: _UnitType.InHs,
        dsp: _UnitType.Display,
        cm: _UnitType.Cm,
        dip: _UnitType.Dip,
        px: _UnitType.Dip
    };
    return _Unit;
}());
exports._Unit = _Unit;
var _Promise = (function () {
    function _Promise() {
        this._callbacks = [];
    }
    _Promise.prototype.then = function (onFulfilled, onRejected) {
        this._callbacks.push({ onFulfilled: onFulfilled, onRejected: onRejected });
        return this;
    };
    _Promise.prototype.catch = function (onRejected) {
        return this.then(null, onRejected);
    };
    _Promise.prototype.resolve = function (value) {
        var _this = this;
        setTimeout(function () {
            try {
                _this.onFulfilled(value);
            }
            catch (e) {
                _this.onRejected(e);
            }
        }, 0);
    };
    _Promise.prototype.reject = function (reason) {
        var _this = this;
        setTimeout(function () {
            _this.onRejected(reason);
        }, 0);
    };
    _Promise.prototype.onFulfilled = function (value) {
        var callback;
        while (callback = this._callbacks.shift()) {
            if (callback.onFulfilled) {
                var newValue = callback.onFulfilled(value);
                if (newValue !== undefined) {
                    value = newValue;
                }
            }
        }
    };
    _Promise.prototype.onRejected = function (reason) {
        var callback;
        while (callback = this._callbacks.shift()) {
            if (callback.onRejected) {
                var value = callback.onRejected(reason);
                this.onFulfilled(value);
                return;
            }
        }
        throw reason;
    };
    return _Promise;
}());
exports._Promise = _Promise;
var _CompositedPromise = (function (_super) {
    __extends(_CompositedPromise, _super);
    function _CompositedPromise(promises) {
        var _this = _super.call(this) || this;
        _this._promises = promises;
        _this._init();
        return _this;
    }
    _CompositedPromise.prototype._init = function () {
        var _this = this;
        if (!this._promises || !this._promises.length) {
            this.reject('No promises in current composited promise.');
            return;
        }
        var length = this._promises.length, i = 0, values = [], isRejected = false;
        this._promises.some(function (p) {
            p.then(function (v) {
                if (isRejected) {
                    return;
                }
                values.push(v);
                if (++i >= length) {
                    _this.resolve(values);
                }
            }).catch(function (r) {
                isRejected = true;
                _this.reject(r);
            });
            return isRejected;
        });
    };
    return _CompositedPromise;
}(_Promise));
exports._CompositedPromise = _CompositedPromise;
var _PaperKind;
(function (_PaperKind) {
    _PaperKind[_PaperKind["Custom"] = 0] = "Custom";
    _PaperKind[_PaperKind["Letter"] = 1] = "Letter";
    _PaperKind[_PaperKind["LetterSmall"] = 2] = "LetterSmall";
    _PaperKind[_PaperKind["Tabloid"] = 3] = "Tabloid";
    _PaperKind[_PaperKind["Ledger"] = 4] = "Ledger";
    _PaperKind[_PaperKind["Legal"] = 5] = "Legal";
    _PaperKind[_PaperKind["Statement"] = 6] = "Statement";
    _PaperKind[_PaperKind["Executive"] = 7] = "Executive";
    _PaperKind[_PaperKind["A3"] = 8] = "A3";
    _PaperKind[_PaperKind["A4"] = 9] = "A4";
    _PaperKind[_PaperKind["A4Small"] = 10] = "A4Small";
    _PaperKind[_PaperKind["A5"] = 11] = "A5";
    _PaperKind[_PaperKind["B4"] = 12] = "B4";
    _PaperKind[_PaperKind["B5"] = 13] = "B5";
    _PaperKind[_PaperKind["Folio"] = 14] = "Folio";
    _PaperKind[_PaperKind["Quarto"] = 15] = "Quarto";
    _PaperKind[_PaperKind["Standard10x14"] = 16] = "Standard10x14";
    _PaperKind[_PaperKind["Standard11x17"] = 17] = "Standard11x17";
    _PaperKind[_PaperKind["Note"] = 18] = "Note";
    _PaperKind[_PaperKind["Number9Envelope"] = 19] = "Number9Envelope";
    _PaperKind[_PaperKind["Number10Envelope"] = 20] = "Number10Envelope";
    _PaperKind[_PaperKind["Number11Envelope"] = 21] = "Number11Envelope";
    _PaperKind[_PaperKind["Number12Envelope"] = 22] = "Number12Envelope";
    _PaperKind[_PaperKind["Number14Envelope"] = 23] = "Number14Envelope";
    _PaperKind[_PaperKind["CSheet"] = 24] = "CSheet";
    _PaperKind[_PaperKind["DSheet"] = 25] = "DSheet";
    _PaperKind[_PaperKind["ESheet"] = 26] = "ESheet";
    _PaperKind[_PaperKind["DLEnvelope"] = 27] = "DLEnvelope";
    _PaperKind[_PaperKind["C5Envelope"] = 28] = "C5Envelope";
    _PaperKind[_PaperKind["C3Envelope"] = 29] = "C3Envelope";
    _PaperKind[_PaperKind["C4Envelope"] = 30] = "C4Envelope";
    _PaperKind[_PaperKind["C6Envelope"] = 31] = "C6Envelope";
    _PaperKind[_PaperKind["C65Envelope"] = 32] = "C65Envelope";
    _PaperKind[_PaperKind["B4Envelope"] = 33] = "B4Envelope";
    _PaperKind[_PaperKind["B5Envelope"] = 34] = "B5Envelope";
    _PaperKind[_PaperKind["B6Envelope"] = 35] = "B6Envelope";
    _PaperKind[_PaperKind["ItalyEnvelope"] = 36] = "ItalyEnvelope";
    _PaperKind[_PaperKind["MonarchEnvelope"] = 37] = "MonarchEnvelope";
    _PaperKind[_PaperKind["PersonalEnvelope"] = 38] = "PersonalEnvelope";
    _PaperKind[_PaperKind["USStandardFanfold"] = 39] = "USStandardFanfold";
    _PaperKind[_PaperKind["GermanStandardFanfold"] = 40] = "GermanStandardFanfold";
    _PaperKind[_PaperKind["GermanLegalFanfold"] = 41] = "GermanLegalFanfold";
    _PaperKind[_PaperKind["IsoB4"] = 42] = "IsoB4";
    _PaperKind[_PaperKind["JapanesePostcard"] = 43] = "JapanesePostcard";
    _PaperKind[_PaperKind["Standard9x11"] = 44] = "Standard9x11";
    _PaperKind[_PaperKind["Standard10x11"] = 45] = "Standard10x11";
    _PaperKind[_PaperKind["Standard15x11"] = 46] = "Standard15x11";
    _PaperKind[_PaperKind["InviteEnvelope"] = 47] = "InviteEnvelope";
    _PaperKind[_PaperKind["LetterExtra"] = 50] = "LetterExtra";
    _PaperKind[_PaperKind["LegalExtra"] = 51] = "LegalExtra";
    _PaperKind[_PaperKind["TabloidExtra"] = 52] = "TabloidExtra";
    _PaperKind[_PaperKind["A4Extra"] = 53] = "A4Extra";
    _PaperKind[_PaperKind["LetterTransverse"] = 54] = "LetterTransverse";
    _PaperKind[_PaperKind["A4Transverse"] = 55] = "A4Transverse";
    _PaperKind[_PaperKind["LetterExtraTransverse"] = 56] = "LetterExtraTransverse";
    _PaperKind[_PaperKind["APlus"] = 57] = "APlus";
    _PaperKind[_PaperKind["BPlus"] = 58] = "BPlus";
    _PaperKind[_PaperKind["LetterPlus"] = 59] = "LetterPlus";
    _PaperKind[_PaperKind["A4Plus"] = 60] = "A4Plus";
    _PaperKind[_PaperKind["A5Transverse"] = 61] = "A5Transverse";
    _PaperKind[_PaperKind["B5Transverse"] = 62] = "B5Transverse";
    _PaperKind[_PaperKind["A3Extra"] = 63] = "A3Extra";
    _PaperKind[_PaperKind["A5Extra"] = 64] = "A5Extra";
    _PaperKind[_PaperKind["B5Extra"] = 65] = "B5Extra";
    _PaperKind[_PaperKind["A2"] = 66] = "A2";
    _PaperKind[_PaperKind["A3Transverse"] = 67] = "A3Transverse";
    _PaperKind[_PaperKind["A3ExtraTransverse"] = 68] = "A3ExtraTransverse";
    _PaperKind[_PaperKind["JapaneseDoublePostcard"] = 69] = "JapaneseDoublePostcard";
    _PaperKind[_PaperKind["A6"] = 70] = "A6";
    _PaperKind[_PaperKind["JapaneseEnvelopeKakuNumber2"] = 71] = "JapaneseEnvelopeKakuNumber2";
    _PaperKind[_PaperKind["JapaneseEnvelopeKakuNumber3"] = 72] = "JapaneseEnvelopeKakuNumber3";
    _PaperKind[_PaperKind["JapaneseEnvelopeChouNumber3"] = 73] = "JapaneseEnvelopeChouNumber3";
    _PaperKind[_PaperKind["JapaneseEnvelopeChouNumber4"] = 74] = "JapaneseEnvelopeChouNumber4";
    _PaperKind[_PaperKind["LetterRotated"] = 75] = "LetterRotated";
    _PaperKind[_PaperKind["A3Rotated"] = 76] = "A3Rotated";
    _PaperKind[_PaperKind["A4Rotated"] = 77] = "A4Rotated";
    _PaperKind[_PaperKind["A5Rotated"] = 78] = "A5Rotated";
    _PaperKind[_PaperKind["B4JisRotated"] = 79] = "B4JisRotated";
    _PaperKind[_PaperKind["B5JisRotated"] = 80] = "B5JisRotated";
    _PaperKind[_PaperKind["JapanesePostcardRotated"] = 81] = "JapanesePostcardRotated";
    _PaperKind[_PaperKind["JapaneseDoublePostcardRotated"] = 82] = "JapaneseDoublePostcardRotated";
    _PaperKind[_PaperKind["A6Rotated"] = 83] = "A6Rotated";
    _PaperKind[_PaperKind["JapaneseEnvelopeKakuNumber2Rotated"] = 84] = "JapaneseEnvelopeKakuNumber2Rotated";
    _PaperKind[_PaperKind["JapaneseEnvelopeKakuNumber3Rotated"] = 85] = "JapaneseEnvelopeKakuNumber3Rotated";
    _PaperKind[_PaperKind["JapaneseEnvelopeChouNumber3Rotated"] = 86] = "JapaneseEnvelopeChouNumber3Rotated";
    _PaperKind[_PaperKind["JapaneseEnvelopeChouNumber4Rotated"] = 87] = "JapaneseEnvelopeChouNumber4Rotated";
    _PaperKind[_PaperKind["B6Jis"] = 88] = "B6Jis";
    _PaperKind[_PaperKind["B6JisRotated"] = 89] = "B6JisRotated";
    _PaperKind[_PaperKind["Standard12x11"] = 90] = "Standard12x11";
    _PaperKind[_PaperKind["JapaneseEnvelopeYouNumber4"] = 91] = "JapaneseEnvelopeYouNumber4";
    _PaperKind[_PaperKind["JapaneseEnvelopeYouNumber4Rotated"] = 92] = "JapaneseEnvelopeYouNumber4Rotated";
    _PaperKind[_PaperKind["Prc16K"] = 93] = "Prc16K";
    _PaperKind[_PaperKind["Prc32K"] = 94] = "Prc32K";
    _PaperKind[_PaperKind["Prc32KBig"] = 95] = "Prc32KBig";
    _PaperKind[_PaperKind["PrcEnvelopeNumber1"] = 96] = "PrcEnvelopeNumber1";
    _PaperKind[_PaperKind["PrcEnvelopeNumber2"] = 97] = "PrcEnvelopeNumber2";
    _PaperKind[_PaperKind["PrcEnvelopeNumber3"] = 98] = "PrcEnvelopeNumber3";
    _PaperKind[_PaperKind["PrcEnvelopeNumber4"] = 99] = "PrcEnvelopeNumber4";
    _PaperKind[_PaperKind["PrcEnvelopeNumber5"] = 100] = "PrcEnvelopeNumber5";
    _PaperKind[_PaperKind["PrcEnvelopeNumber6"] = 101] = "PrcEnvelopeNumber6";
    _PaperKind[_PaperKind["PrcEnvelopeNumber7"] = 102] = "PrcEnvelopeNumber7";
    _PaperKind[_PaperKind["PrcEnvelopeNumber8"] = 103] = "PrcEnvelopeNumber8";
    _PaperKind[_PaperKind["PrcEnvelopeNumber9"] = 104] = "PrcEnvelopeNumber9";
    _PaperKind[_PaperKind["PrcEnvelopeNumber10"] = 105] = "PrcEnvelopeNumber10";
    _PaperKind[_PaperKind["Prc16KRotated"] = 106] = "Prc16KRotated";
    _PaperKind[_PaperKind["Prc32KRotated"] = 107] = "Prc32KRotated";
    _PaperKind[_PaperKind["Prc32KBigRotated"] = 108] = "Prc32KBigRotated";
    _PaperKind[_PaperKind["PrcEnvelopeNumber1Rotated"] = 109] = "PrcEnvelopeNumber1Rotated";
    _PaperKind[_PaperKind["PrcEnvelopeNumber2Rotated"] = 110] = "PrcEnvelopeNumber2Rotated";
    _PaperKind[_PaperKind["PrcEnvelopeNumber3Rotated"] = 111] = "PrcEnvelopeNumber3Rotated";
    _PaperKind[_PaperKind["PrcEnvelopeNumber4Rotated"] = 112] = "PrcEnvelopeNumber4Rotated";
    _PaperKind[_PaperKind["PrcEnvelopeNumber5Rotated"] = 113] = "PrcEnvelopeNumber5Rotated";
    _PaperKind[_PaperKind["PrcEnvelopeNumber6Rotated"] = 114] = "PrcEnvelopeNumber6Rotated";
    _PaperKind[_PaperKind["PrcEnvelopeNumber7Rotated"] = 115] = "PrcEnvelopeNumber7Rotated";
    _PaperKind[_PaperKind["PrcEnvelopeNumber8Rotated"] = 116] = "PrcEnvelopeNumber8Rotated";
    _PaperKind[_PaperKind["PrcEnvelopeNumber9Rotated"] = 117] = "PrcEnvelopeNumber9Rotated";
    _PaperKind[_PaperKind["PrcEnvelopeNumber10Rotated"] = 118] = "PrcEnvelopeNumber10Rotated";
})(_PaperKind = exports._PaperKind || (exports._PaperKind = {}));
var QueryLoadingDataEventArgs = (function (_super) {
    __extends(QueryLoadingDataEventArgs, _super);
    function QueryLoadingDataEventArgs(data) {
        var _this = _super.call(this) || this;
        _this._data = data || {};
        return _this;
    }
    Object.defineProperty(QueryLoadingDataEventArgs.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    return QueryLoadingDataEventArgs;
}(wjcCore.EventArgs));
exports.QueryLoadingDataEventArgs = QueryLoadingDataEventArgs;
'use strict';
var _Report = (function (_super) {
    __extends(_Report, _super);
    function _Report(options) {
        var _this = _super.call(this, options) || this;
        _this._hasParameters = false;
        _this._status = _ExecutionStatus.notFound;
        _this.statusChanged = new wjcCore.Event();
        return _this;
    }
    _Report.getReportNames = function (serviceUrl, reportFilePath) {
        return _ReportService.getReportNames(serviceUrl, reportFilePath);
    };
    _Report.getReports = function (serviceUrl, path, data) {
        if (wjcCore.isBoolean(data)) {
            data = { recursive: data };
        }
        return _ReportService.getReports(serviceUrl, path, data);
    };
    Object.defineProperty(_Report.prototype, "reportName", {
        get: function () {
            return this._innerService ? this._innerService.reportName : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_Report.prototype, "hasParameters", {
        get: function () {
            return this._hasParameters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_Report.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });
    _Report.prototype.load = function () {
        return _super.prototype.load.call(this);
    };
    _Report.prototype._updateStatus = function (newValue) {
        if (this._status === newValue) {
            return;
        }
        this._status = newValue;
        this.onStatusChanged();
    };
    _Report.prototype.cancel = function () {
        var _this = this;
        return this._innerService.cancel().then(function (v) { return _this._updateDocumentStatus(v); });
    };
    _Report.prototype.onStatusChanged = function (e) {
        this.statusChanged.raise(this, e || new wjcCore.EventArgs());
    };
    _Report.prototype.dispose = function () {
        return _super.prototype.dispose.call(this);
    };
    _Report.prototype.setParameters = function (parameters) {
        var _this = this;
        return this._innerService.setParameters(parameters).then(function (v) { return void (_this._parameters = v); });
    };
    _Report.prototype.getParameters = function () {
        var _this = this;
        if (this._parameters && this._parameters.length) {
            var promise = new _Promise();
            promise.resolve(this._parameters);
            return promise;
        }
        return this._innerService.getParameters().then(function (v) { return void (_this._parameters = v); });
    };
    _Report.prototype._getIsDisposed = function () {
        return _super.prototype._getIsDisposed.call(this) || this._innerService.isCleared;
    };
    _Report.prototype._updateExecutionInfo = function (data) {
        if (data == null || this.isDisposed) {
            return;
        }
        this._hasParameters = !!data.hasParameters;
        _super.prototype._updateExecutionInfo.call(this, data);
    };
    _Report.prototype._updateDocumentStatus = function (data) {
        this._updateStatus(data.status);
        _super.prototype._updateDocumentStatus.call(this, data);
    };
    _Report.prototype._checkIsLoadCompleted = function (data) {
        return data.status === _ExecutionStatus.completed
            || data.status === _ExecutionStatus.stopped;
    };
    _Report.prototype._createDocumentService = function (options) {
        return new _ReportService(options);
    };
    Object.defineProperty(_Report.prototype, "_innerService", {
        get: function () {
            return this.service;
        },
        enumerable: true,
        configurable: true
    });
    _Report.prototype.render = function () {
        var _this = this;
        return this._innerService.render().then(function (v) { return _this._updateDocumentStatus(v); });
    };
    _Report.prototype.executeCustomAction = function (actionString) {
        var _this = this;
        return this._innerService.executeCustomAction(actionString).then(function (v) { return _this._updateDocumentStatus(v); });
    };
    return _Report;
}(_DocumentSource));
exports._Report = _Report;
var _ReportService = (function (_super) {
    __extends(_ReportService, _super);
    function _ReportService(options) {
        var _this = _super.call(this, options) || this;
        _this._reportName = options.reportName;
        return _this;
    }
    Object.defineProperty(_ReportService.prototype, "isCleared", {
        get: function () {
            return !this._instanceId && this._status == _ExecutionStatus.cleared;
        },
        enumerable: true,
        configurable: true
    });
    _ReportService.getReportNames = function (serviceUrl, reportFilePath) {
        return _ReportService.getReports(serviceUrl, reportFilePath).then(function (item) {
            if (!item)
                return null;
            var names = [];
            item.items.forEach(function (item) {
                if (item.type === CatalogItemType.Report) {
                    names.push(item.name);
                }
            });
            return names;
        });
    };
    _ReportService.getReports = function (serviceUrl, path, data) {
        var promise = new _Promise(), url = _joinUrl(serviceUrl, path);
        _httpRequest(url, {
            data: data,
            success: function (xhr) {
                promise.resolve(JSON.parse(xhr.responseText));
            },
            error: function (xhr) { return promise.reject(xhr); }
        });
        return promise;
    };
    Object.defineProperty(_ReportService.prototype, "reportName", {
        get: function () {
            return this._reportName;
        },
        enumerable: true,
        configurable: true
    });
    _ReportService.prototype.getBookmark = function (name) {
        var promise = new _Promise();
        if (!this._checkReportInstanceController(promise)) {
            return promise;
        }
        _httpRequest(this._getReportInstancesUrl(_ReportService._bookmarkAction, name), {
            success: function (xhr) {
                promise.resolve(JSON.parse(xhr.responseText));
            }
        });
        return promise;
    };
    _ReportService.prototype.executeCustomAction = function (actionString) {
        var data = {};
        data[_ReportService._customActionParam] = actionString;
        return this.render(data);
    };
    _ReportService.prototype.getStatus = function () {
        var promise = new _Promise();
        _httpRequest(this._statusLocation, {
            success: function (xhr) {
                promise.resolve(JSON.parse(xhr.responseText, _statusJsonReviver));
            }
        });
        return promise;
    };
    _ReportService.prototype.getDocumentStatus = function () {
        return this._getReportCache();
    };
    _ReportService.prototype._getReportCache = function () {
        var promise = new _Promise();
        if (!this._checkReportInstanceController(promise)) {
            return promise;
        }
        _httpRequest(this._getReportInstancesUrl(), {
            success: function (xhr) {
                promise.resolve(_parseReportExecutionInfo(xhr.responseText));
            }
        });
        return promise;
    };
    _ReportService.prototype.getParameters = function () {
        var promise = new _Promise();
        if (!this._checkReportInstanceController(promise)) {
            return promise;
        }
        _httpRequest(this._getReportInstancesUrl(_ReportService._parametersAction), {
            success: function (xhr) {
                promise.resolve(JSON.parse(xhr.responseText));
            }
        });
        return promise;
    };
    _ReportService.prototype._getUrlMainPart = function () {
        return _joinUrl(this.serviceUrl, this.filePath, this.reportName);
    };
    _ReportService.prototype._getReportUrl = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _joinUrl(this._getUrlMainPart(), _ReportService._reportCommand, params);
    };
    _ReportService.prototype._getReportInstancesUrl = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _joinUrl(this._getUrlMainPart(), _ReportService._instancesCommand, this._instanceId, params);
    };
    _ReportService.prototype._checkReportController = function (promise) {
        if (this.serviceUrl != null && this.filePath) {
            var isFlexReport = this.filePath.slice(-5).toLowerCase() === '.flxr'
                || this.filePath.slice(-4).toLowerCase() === '.xml';
            if (!isFlexReport || this.reportName) {
                return true;
            }
        }
        if (promise) {
            promise.reject(_ReportService._invalidReportControllerError);
        }
        return false;
    };
    _ReportService.prototype._checkReportInstanceController = function (promise) {
        if (this._checkReportController(promise) && this._instanceId) {
            return true;
        }
        if (promise) {
            promise.reject(_ReportService._invalidReportCacheControllerError);
        }
        return false;
    };
    _ReportService.prototype._getError = function (xhr) {
        var reason = xhr.responseText;
        try {
            if (reason) {
                reason = JSON.parse(reason);
            }
        }
        finally {
            return reason;
        }
    };
    _ReportService.prototype.render = function (data) {
        var _this = this;
        var promise = new _Promise();
        if (!this._checkReportInstanceController(promise)) {
            return promise;
        }
        _httpRequest(this._getReportInstancesUrl(_ReportService._renderAction), {
            method: 'POST',
            data: data,
            success: function (xhr) {
                if (xhr.status === 202) {
                    promise.resolve({ status: _ExecutionStatus.rendering });
                }
                else {
                    promise.resolve(_parseReportExecutionInfo(xhr.responseText));
                }
            },
            error: function (xhr) {
                promise.reject(_this._getError(xhr));
            }
        });
        return promise.then(function (v) {
            _this._status = v.status;
        });
    };
    _ReportService.prototype.load = function (data) {
        var _this = this;
        var promise = new _Promise();
        if (!this._checkReportController(promise)) {
            return promise;
        }
        _httpRequest(this._getReportInstancesUrl(), {
            method: 'POST',
            data: data,
            success: function (xhr) {
                promise.resolve(_parseReportExecutionInfo(xhr.responseText));
            },
            error: function (xhr) {
                promise.reject(_this._getError(xhr));
            }
        });
        return promise.then(function (v) {
            _this._instanceId = v.id;
            _this._status = _ExecutionStatus.loaded;
            _this._outlinesLocation = v.outlinesLocation;
            _this._statusLocation = v.statusLocation;
            _this._pageSettingsLocation = v.pageSettingsLocation;
            _this._featuresLocation = v.featuresLocation;
            _this._parametersLocation = v.parametersLocation;
        });
    };
    _ReportService.prototype.cancel = function () {
        var _this = this;
        var promise = new _Promise();
        if (!this._checkReportInstanceController(promise)) {
            return promise;
        }
        if (this._status !== _ExecutionStatus.rendering) {
            promise.reject('Cannot execute cancel when the report is not rendering.');
            return promise;
        }
        _httpRequest(this._getReportInstancesUrl(_ReportService._cancelAction), {
            method: 'POST',
            success: function (xhr) {
                promise.resolve(_parseReportExecutionInfo(xhr.responseText));
            }
        });
        promise.then(function (v) { return void (_this._status = v.status); });
        return promise;
    };
    _ReportService.prototype.dispose = function () {
        var _this = this;
        var promise = new _Promise();
        if (!this._checkReportInstanceController()) {
            return promise;
        }
        _httpRequest(this._getReportInstancesUrl(), {
            method: 'DELETE',
            success: function (xhr) {
                _this._status = _ExecutionStatus.cleared;
                _this._instanceId = '';
                promise.resolve();
            }
        });
        return promise;
    };
    _ReportService.prototype.getOutlines = function () {
        var promise = new _Promise();
        if (!this._checkReportInstanceController(promise)) {
            return promise;
        }
        _httpRequest(this._getReportInstancesUrl(_ReportService._outlinesAction), {
            success: function (xhr) {
                promise.resolve(JSON.parse(xhr.responseText));
            }
        });
        return promise;
    };
    _ReportService.prototype.renderToFilter = function (options) {
        var _this = this;
        var promise = new _Promise();
        if (!this._checkReportInstanceController(promise)) {
            return promise;
        }
        _httpRequest(this.getRenderToFilterUrl(options), {
            cache: true,
            success: function (xhr) {
                promise.resolve(xhr);
            },
            error: function (xhr) {
                promise.reject(_this._getError(xhr));
            }
        });
        return promise;
    };
    _ReportService.prototype.getRenderToFilterUrl = function (options) {
        if (!this._checkReportInstanceController()) {
            return null;
        }
        var url = this._getReportInstancesUrl(_ReportService._exportAction);
        url = _disableCache(url);
        return _appendQueryString(url, options);
    };
    _ReportService.prototype.search = function (searchOptions) {
        var promise = new _Promise();
        if (!this._checkReportInstanceController(promise)) {
            return promise;
        }
        _httpRequest(this._getReportInstancesUrl(_ReportService._searchAction), {
            success: function (xhr) {
                promise.resolve(JSON.parse(xhr.responseText));
            },
            data: searchOptions
        });
        return promise;
    };
    _ReportService.prototype.setPageSettings = function (pageSettings) {
        var _this = this;
        var promise = new _Promise();
        if (!this._checkReportInstanceController(promise)) {
            return promise;
        }
        ;
        var url = this._getReportInstancesUrl(_ReportService._pageSettingsAction);
        _httpRequest(url, {
            method: 'PUT',
            data: pageSettings,
            success: function (xhr) {
                promise.resolve(JSON.parse(xhr.responseText, _pageSettingsJsonReviver));
            },
            error: function (xhr) {
                promise.reject(_this._getError(xhr));
            }
        });
        return promise;
    };
    _ReportService.prototype.setParameters = function (parameters) {
        var _this = this;
        var promise = new _Promise();
        if (!this._checkReportInstanceController(promise)) {
            return promise;
        }
        ;
        Object.keys(parameters).forEach(function (key) {
            if (parameters[key] === null) {
                parameters[key] = "";
            }
        });
        var url = this._getReportInstancesUrl(_ReportService._parametersAction);
        _httpRequest(url, {
            method: 'PATCH',
            data: parameters,
            success: function (xhr) {
                promise.resolve(JSON.parse(xhr.responseText));
            },
            error: function (xhr) {
                promise.reject(_this._getError(xhr));
            }
        });
        return promise;
    };
    _ReportService.prototype.getSupportedExportDescriptions = function () {
        var promise = new _Promise();
        if (!this._checkReportInstanceController(promise)) {
            return promise;
        }
        _httpRequest(this._getReportInstancesUrl(_ReportService._supportedFormatsAction), {
            success: function (xhr) {
                promise.resolve(JSON.parse(xhr.responseText));
            }
        });
        return promise;
    };
    _ReportService.prototype.getFeatures = function () {
        var promise = new _Promise();
        if (!this._checkReportInstanceController(promise)) {
            return promise;
        }
        _httpRequest(this._featuresLocation, {
            success: function (xhr) {
                promise.resolve(JSON.parse(xhr.responseText));
            }
        });
        return promise;
    };
    _ReportService._reportCommand = '$report';
    _ReportService._instancesCommand = '$instances';
    _ReportService._customActionParam = 'actionString';
    _ReportService._renderAction = 'render';
    _ReportService._searchAction = 'search';
    _ReportService._cancelAction = 'stop';
    _ReportService._outlinesAction = 'outlines';
    _ReportService._exportAction = 'export';
    _ReportService._parametersAction = 'parameters';
    _ReportService._bookmarkAction = 'bookmarks';
    _ReportService._pageSettingsAction = 'pagesettings';
    _ReportService._supportedFormatsAction = 'supportedformats';
    _ReportService._invalidReportControllerError = 'Cannot call the service without service url, document path or report name.';
    _ReportService._invalidReportCacheControllerError = 'Cannot call the service when service url is not set or the report is not loaded.';
    return _ReportService;
}(_DocumentService));
exports._ReportService = _ReportService;
function _parseReportExecutionInfo(json) {
    return JSON.parse(json, _statusJsonReviver);
}
exports._parseReportExecutionInfo = _parseReportExecutionInfo;
var _ExecutionStatus = (function () {
    function _ExecutionStatus() {
    }
    _ExecutionStatus.loaded = 'Loaded';
    _ExecutionStatus.rendering = 'Rendering';
    _ExecutionStatus.completed = 'Completed';
    _ExecutionStatus.stopped = 'Stopped';
    _ExecutionStatus.cleared = 'Cleared';
    _ExecutionStatus.notFound = 'NotFound';
    return _ExecutionStatus;
}());
exports._ExecutionStatus = _ExecutionStatus;
var _ParameterType;
(function (_ParameterType) {
    _ParameterType[_ParameterType["Boolean"] = 0] = "Boolean";
    _ParameterType[_ParameterType["DateTime"] = 1] = "DateTime";
    _ParameterType[_ParameterType["Time"] = 2] = "Time";
    _ParameterType[_ParameterType["Date"] = 3] = "Date";
    _ParameterType[_ParameterType["Integer"] = 4] = "Integer";
    _ParameterType[_ParameterType["Float"] = 5] = "Float";
    _ParameterType[_ParameterType["String"] = 6] = "String";
})(_ParameterType = exports._ParameterType || (exports._ParameterType = {}));
var CatalogItemType;
(function (CatalogItemType) {
    CatalogItemType[CatalogItemType["Folder"] = 0] = "Folder";
    CatalogItemType[CatalogItemType["File"] = 1] = "File";
    CatalogItemType[CatalogItemType["Report"] = 2] = "Report";
})(CatalogItemType = exports.CatalogItemType || (exports.CatalogItemType = {}));
'use strict';
var _PdfDocumentSource = (function (_super) {
    __extends(_PdfDocumentSource, _super);
    function _PdfDocumentSource(options) {
        var _this = _super.call(this, options) || this;
        _this._status = _ExecutionStatus.notFound;
        return _this;
    }
    Object.defineProperty(_PdfDocumentSource.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PdfDocumentSource.prototype, "_innerService", {
        get: function () {
            return this.service;
        },
        enumerable: true,
        configurable: true
    });
    _PdfDocumentSource.prototype._createDocumentService = function (options) {
        return new _PdfDocumentService(options);
    };
    _PdfDocumentSource.prototype.load = function () {
        return _super.prototype.load.call(this);
    };
    _PdfDocumentSource.prototype._updateStatus = function (newValue) {
        if (this._status === newValue) {
            return;
        }
        this._status = newValue;
    };
    _PdfDocumentSource.prototype.getStatus = function () {
        var _this = this;
        var e = new QueryLoadingDataEventArgs();
        this.onQueryLoadingData(e);
        return this._innerService.getStatus(e.data).then(function (v) { return _this._updateDocumentStatus(v); });
    };
    _PdfDocumentSource.prototype.renderToFilter = function (options) {
        var e = new QueryLoadingDataEventArgs();
        this.onQueryLoadingData(e);
        return this._innerService.renderToFilter(options, e.data);
    };
    _PdfDocumentSource.prototype._updateDocumentStatus = function (data) {
        if (data == null) {
            return;
        }
        this._updateStatus(data.status);
        _super.prototype._updateDocumentStatus.call(this, data);
    };
    return _PdfDocumentSource;
}(_DocumentSource));
exports._PdfDocumentSource = _PdfDocumentSource;
var _PdfDocumentService = (function (_super) {
    __extends(_PdfDocumentService, _super);
    function _PdfDocumentService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _PdfDocumentService.prototype._getPdfUrl = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _joinUrl(this.serviceUrl, this.filePath, _PdfDocumentService._pdfCommand, params);
    };
    _PdfDocumentService.prototype._getPdfStatus = function (data) {
        var _this = this;
        var promise = new _Promise();
        if (!this._checkPdfController(promise)) {
            return promise;
        }
        _httpRequest(this._getPdfUrl(), {
            data: data,
            success: function (xhr) {
                promise.resolve(_parseExecutionInfo(xhr.responseText));
            }
        });
        return promise.then(function (v) {
            _this._status = _ExecutionStatus.loaded;
            _this._statusLocation = v.statusLocation;
            _this._featuresLocation = v.featuresLocation;
        });
    };
    _PdfDocumentService.prototype._checkPdfController = function (promise) {
        if (this.serviceUrl != null && this.filePath) {
            return true;
        }
        if (promise) {
            promise.reject(_PdfDocumentService._invalidPdfControllerError);
        }
        return false;
    };
    _PdfDocumentService.prototype.dispose = function () {
        var promise = new _Promise();
        promise.resolve();
        return promise;
    };
    _PdfDocumentService.prototype.load = function (data) {
        return this._getPdfStatus(data);
    };
    _PdfDocumentService.prototype.getStatus = function (data) {
        var promise = new _Promise();
        _httpRequest(this._statusLocation, {
            data: data,
            success: function (xhr) {
                promise.resolve(JSON.parse(xhr.responseText));
            }
        });
        return promise;
    };
    _PdfDocumentService.prototype.renderToFilter = function (options, data) {
        var promise = new _Promise();
        if (!this._checkPdfController(promise)) {
            return promise;
        }
        _httpRequest(this.getRenderToFilterUrl(options), {
            data: data,
            cache: true,
            success: function (xhr) {
                promise.resolve(xhr);
            }
        });
        return promise;
    };
    _PdfDocumentService.prototype.getRenderToFilterUrl = function (options) {
        if (!this._checkPdfController()) {
            return null;
        }
        var url = this._getPdfUrl(_PdfDocumentService._exportAction);
        url = _disableCache(url);
        return _appendQueryString(url, options);
    };
    _PdfDocumentService.prototype.getSupportedExportDescriptions = function () {
        var promise = new _Promise();
        if (!this._checkPdfController(promise)) {
            return promise;
        }
        _httpRequest(this._getPdfUrl(_PdfDocumentService._supportedFormatsAction), {
            success: function (xhr) {
                promise.resolve(JSON.parse(xhr.responseText));
            }
        });
        return promise;
    };
    _PdfDocumentService.prototype.getFeatures = function () {
        var promise = new _Promise();
        if (!this._checkPdfController(promise)) {
            return promise;
        }
        _httpRequest(this._featuresLocation, {
            success: function (xhr) {
                promise.resolve(JSON.parse(xhr.responseText));
            }
        });
        return promise;
    };
    _PdfDocumentService.prototype.search = function (searchOptions) {
        var promise = new _Promise();
        if (!this._checkPdfController(promise)) {
            return promise;
        }
        _httpRequest(this._getPdfUrl(_PdfDocumentService._searchAction), {
            success: function (xhr) {
                promise.resolve(JSON.parse(xhr.responseText));
            },
            data: searchOptions
        });
        return promise;
    };
    _PdfDocumentService._pdfCommand = '$pdf';
    _PdfDocumentService._exportAction = 'export';
    _PdfDocumentService._supportedFormatsAction = 'supportedformats';
    _PdfDocumentService._searchAction = 'search';
    _PdfDocumentService._invalidPdfControllerError = 'Cannot call the service when service url is not set or the pdf is not loaded.';
    return _PdfDocumentService;
}(_DocumentService));
exports._PdfDocumentService = _PdfDocumentService;
function _parseExecutionInfo(json) {
    return JSON.parse(json, _statusJsonReviver);
}
exports._parseExecutionInfo = _parseExecutionInfo;
wjcCore.culture.Viewer = window['wijmo'].culture.Viewer || {
    cancel: 'Cancel',
    ok: 'OK',
    bottom: 'Bottom:',
    top: 'Top:',
    right: 'Right:',
    left: 'Left:',
    margins: 'Margins(inches)',
    orientation: 'Orientation:',
    paperKind: 'Paper Kind:',
    pageSetup: 'Page Setup',
    landscape: 'Landscape',
    portrait: 'Portrait',
    pageNumber: 'Page Number',
    zoomFactor: 'Zoom Factor',
    paginated: 'Print Layout',
    print: 'Print',
    search: 'Search',
    matchCase: 'Match case',
    wholeWord: 'Match whole word only',
    searchResults: 'Search Results',
    previousPage: 'Previous Page',
    nextPage: 'Next Page',
    firstPage: 'First Page',
    lastPage: 'Last Page',
    backwardHistory: 'Backward',
    forwardHistory: 'Forward',
    pageCount: 'Page Count',
    selectTool: 'Select Tool',
    moveTool: 'Move Tool',
    continuousMode: 'Continuous Page View',
    singleMode: 'Single Page View',
    wholePage: 'Fit Whole Page',
    pageWidth: 'Fit Page Width',
    zoomOut: 'Zoom Out',
    zoomIn: 'Zoom In',
    rubberbandTool: 'Zoom by Selection',
    magnifierTool: 'Magnifier',
    rotatePage: 'Rotate Page',
    rotateDocument: 'Rotate Document',
    exports: 'Export',
    fullScreen: 'Full Screen',
    exitFullScreen: 'Exit Full Screen',
    hamburgerMenu: 'Tools',
    showSearchBar: 'Show Search Bar',
    viewMenu: 'Layout Options',
    searchOptions: 'Search Options',
    matchCaseMenuItem: 'Match Case',
    wholeWordMenuItem: 'Match Whole Word',
    thumbnails: 'Page Thumbnails',
    outlines: 'Document Map',
    loading: 'Loading...',
    pdfExportName: 'Adobe PDF',
    docxExportName: 'Open XML Word',
    xlsxExportName: 'Open XML Excel',
    docExportName: 'Microsoft Word',
    xlsExportName: 'Microsoft Excel',
    mhtmlExportName: 'Web archive (MHTML)',
    htmlExportName: 'HTML document',
    rtfExportName: 'RTF document',
    metafileExportName: 'Compressed metafiles',
    csvExportName: 'CSV',
    tiffExportName: 'Tiff images',
    bmpExportName: 'BMP images',
    emfExportName: 'Enhanced metafile',
    gifExportName: 'GIF images',
    jpgExportName: 'JPEG images',
    jpegExportName: 'JPEG images',
    pngExportName: 'PNG images',
    abstractMethodException: 'It is an abstract method, please implement it.',
    cannotRenderPageNoViewPage: 'Cannot render page without document source and view page.',
    cannotRenderPageNoDoc: 'Cannot render page without document source and view page.',
    exportFormat: 'Export format:',
    exportOptionTitle: 'Export options',
    documentRestrictionsGroup: 'Document restrictions',
    passwordSecurityGroup: 'Password security',
    outputRangeGroup: 'Output range',
    documentInfoGroup: 'Document info',
    generalGroup: 'General',
    docInfoTitle: 'Title',
    docInfoAuthor: 'Author',
    docInfoManager: 'Manager',
    docInfoOperator: 'Operator',
    docInfoCompany: 'Company',
    docInfoSubject: 'Subject',
    docInfoComment: 'Comment',
    docInfoCreator: 'Creator',
    docInfoProducer: 'Producer',
    docInfoCreationTime: 'Creation time',
    docInfoRevisionTime: 'Revision time',
    docInfoKeywords: 'Keywords',
    embedFonts: 'Embed TrueType fonts',
    pdfACompatible: 'PDF/A compatible (level 2B)',
    useCompression: 'Use compression',
    useOutlines: 'Generate outlines',
    allowCopyContent: 'Allow content copying or extraction',
    allowEditAnnotations: 'Allow annotations editing',
    allowEditContent: 'Allow content editing',
    allowPrint: 'Allow printing',
    ownerPassword: 'Permissions (owner) password:',
    userPassword: 'Document open (user) password:',
    encryptionType: 'Encryption level:',
    paged: 'Paged',
    showNavigator: 'Show Navigator',
    navigatorPosition: 'Navigator Position',
    singleFile: 'Single File',
    tolerance: 'Tolerance when detecting text bounds (points):',
    pictureLayer: 'Use separate picture layer',
    metafileType: 'Metafile Type:',
    monochrome: 'Monochrome',
    resolution: 'Resolution:',
    outputRange: 'Page range:',
    outputRangeInverted: 'Inverted',
    showZoomBar: 'Zoom Bar',
    searchPrev: 'Search Previous',
    searchNext: 'Search Next',
    checkMark: '\u2713',
    exportOk: 'Export...',
    cannotSearch: 'Search requires a document source to be specified.',
    parameters: 'Parameters',
    requiringParameters: 'Please input parameters.',
    nullParameterError: 'Value cannot be null.',
    invalidParameterError: 'Invalid input.',
    parameterNoneItemsSelected: '(none)',
    parameterAllItemsSelected: '(all)',
    parameterSelectAllItemText: '(Select All)',
    selectParameterValue: '(select value)',
    apply: 'Apply',
    errorOccured: 'An error has occured.'
};
'use strict';
var _SearchManager = (function () {
    function _SearchManager() {
        this._currentIndex = -1;
        this.currentChanged = new wjcCore.Event();
        this.searchStarted = new wjcCore.Event();
        this.searchCompleted = new wjcCore.Event();
    }
    _SearchManager.prototype._onCurrentChanged = function () {
        this.currentChanged.raise(this, new wjcCore.EventArgs());
    };
    _SearchManager.prototype._onSearchStarted = function () {
        this.searchStarted.raise(this, new wjcCore.EventArgs());
    };
    _SearchManager.prototype._onSearchCompleted = function () {
        this.searchCompleted.raise(this, new wjcCore.EventArgs());
    };
    Object.defineProperty(_SearchManager.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (value) {
            if (this._text === value) {
                return;
            }
            this._text = value;
            this._needUpdate = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_SearchManager.prototype, "matchCase", {
        get: function () {
            return this._matchCase;
        },
        set: function (value) {
            if (this._matchCase === value) {
                return;
            }
            this._matchCase = value;
            this._needUpdate = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_SearchManager.prototype, "wholeWord", {
        get: function () {
            return this._wholeWord;
        },
        set: function (value) {
            if (this._wholeWord === value) {
                return;
            }
            this._wholeWord = value;
            this._needUpdate = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_SearchManager.prototype, "searchResults", {
        get: function () {
            return this._searchResults;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_SearchManager.prototype, "currentIndex", {
        get: function () {
            return this._currentIndex;
        },
        set: function (value) {
            var _this = this;
            if (value === this._currentIndex) {
                return;
            }
            this._getSearchResults().then(function (v) {
                _this._currentIndex = value;
                _this._onCurrentChanged();
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_SearchManager.prototype, "current", {
        get: function () {
            if (this._currentIndex < 0) {
                return null;
            }
            return this._searchResults[this._currentIndex];
        },
        enumerable: true,
        configurable: true
    });
    _SearchManager.prototype._clearResults = function () {
        this._searchResults = null;
    };
    _SearchManager.prototype._getSearchResults = function () {
        var _this = this;
        var p = new _Promise();
        if (this._searchResults) {
            p.resolve(this._searchResults);
            return p;
        }
        if (!this.documentSource) {
            p.reject(wjcCore.culture.Viewer.cannotSearch);
            return p;
        }
        if (this._text == null || this._text.length === 0) {
            return p;
        }
        this._needUpdate = false;
        this._onSearchStarted();
        return this.documentSource.search({ text: encodeURIComponent(this.text), matchCase: this.matchCase, wholeWord: this.wholeWord }).then(function (v) {
            _this._searchResults = v;
            _this._onSearchCompleted();
        });
    };
    Object.defineProperty(_SearchManager.prototype, "documentSource", {
        get: function () {
            return this._documentSource;
        },
        set: function (value) {
            this._documentSource = value;
            this._clearResults();
            this._text = null;
            this._matchCase = false;
            this._wholeWord = false;
            this._currentIndex = -1;
        },
        enumerable: true,
        configurable: true
    });
    _SearchManager.prototype.search = function (pre) {
        var _this = this;
        if (this._needUpdate) {
            this._clearResults();
        }
        this._getSearchResults().then(function (v) {
            var length = _this._searchResults.length;
            if (pre) {
                _this._currentIndex--;
                if (_this._currentIndex < 0) {
                    _this._currentIndex = length - 1;
                }
            }
            else {
                _this._currentIndex++;
                if (_this._currentIndex >= length) {
                    _this._currentIndex = 0;
                }
            }
            _this._currentIndex = Math.max(Math.min(_this._currentIndex, length - 1), 0);
            _this._onCurrentChanged();
        });
    };
    return _SearchManager;
}());
exports._SearchManager = _SearchManager;
window['TouchEvent'] = window['TouchEvent'] || (function () { });
window['PointerEvent'] = window['PointerEvent'] || (function () { });
window['Touch'] = window['Touch'] || (function () { });
var _eventSeparator = ',', _touchEventsMap = {
    startName: 'touchstart',
    moveName: 'touchmove',
    endName: ['touchend', 'touchcancel', 'touchleave'].join(_eventSeparator)
}, _pointerEventsMap = {
    startName: ['pointerdown', 'pointerenter'].join(_eventSeparator),
    moveName: 'pointermove',
    endName: ['pointerup', 'pointercancel', 'pointerleave'].join(_eventSeparator)
};
function _getTouchEventMap() {
    return ('ontouchstart' in window) ? _touchEventsMap : _pointerEventsMap;
}
exports._getTouchEventMap = _getTouchEventMap;
var _TouchDirection;
(function (_TouchDirection) {
    _TouchDirection[_TouchDirection["None"] = 0] = "None";
    _TouchDirection[_TouchDirection["Left"] = 1] = "Left";
    _TouchDirection[_TouchDirection["Up"] = 2] = "Up";
    _TouchDirection[_TouchDirection["Right"] = 3] = "Right";
    _TouchDirection[_TouchDirection["Down"] = 4] = "Down";
})(_TouchDirection = exports._TouchDirection || (exports._TouchDirection = {}));
var _TouchInfo = (function () {
    function _TouchInfo(source) {
        this._systemTouchInfo = source;
        if (source instanceof Touch) {
            this._id = source.identifier;
        }
        else {
            this._id = source.pointerId;
        }
        this._target = source.target;
        this._screenX = source.screenX;
        this._screenY = source.screenY;
        this._clientX = source.clientX;
        this._clientY = source.clientY;
    }
    _TouchInfo.getCenter = function (start, end) {
        return new wjcCore.Point(start.x + (end.x - start.x) / 2, start.y + (end.y - start.y) / 2);
    };
    _TouchInfo.getCenterClient = function (startInfo, endInfo) {
        return _TouchInfo.getCenter(new wjcCore.Point(startInfo.clientX, startInfo.clientY), new wjcCore.Point(endInfo.clientX, endInfo.clientY));
    };
    _TouchInfo.getCenterScreen = function (startInfo, endInfo) {
        return _TouchInfo.getCenter(new wjcCore.Point(startInfo.screenX, startInfo.screenY), new wjcCore.Point(endInfo.screenX, endInfo.screenY));
    };
    _TouchInfo.getDistance = function (startInfo, endInfo) {
        var deltaX = Math.abs(startInfo.clientX - endInfo.clientX), deltaY = Math.abs(startInfo.clientY - endInfo.clientY);
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    };
    _TouchInfo._getDirection = function (start, end) {
        var deltaX = end.clientX - start.clientX, deltaY = end.clientY - start.clientY, isHorizontal = Math.abs(deltaX) >= Math.abs(deltaY);
        if (isHorizontal) {
            if (deltaX > 0)
                return _TouchDirection.Right;
            if (deltaX < 0)
                return _TouchDirection.Left;
            return _TouchDirection.None;
        }
        if (deltaY > 0)
            return _TouchDirection.Down;
        if (deltaY < 0)
            return _TouchDirection.Up;
        return _TouchDirection.None;
    };
    Object.defineProperty(_TouchInfo.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TouchInfo.prototype, "systemTouchInfo", {
        get: function () {
            return this._systemTouchInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TouchInfo.prototype, "screenX", {
        get: function () {
            return this._screenX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TouchInfo.prototype, "screenY", {
        get: function () {
            return this._screenY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TouchInfo.prototype, "clientX", {
        get: function () {
            return this._clientX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TouchInfo.prototype, "clientY", {
        get: function () {
            return this._clientY;
        },
        enumerable: true,
        configurable: true
    });
    return _TouchInfo;
}());
exports._TouchInfo = _TouchInfo;
var _SpeedReducer = (function () {
    function _SpeedReducer() {
        this._timeInterval = 50;
        this._speedInterval = 5;
    }
    Object.defineProperty(_SpeedReducer.prototype, "timeInterval", {
        get: function () {
            return this._timeInterval;
        },
        set: function (value) {
            this._timeInterval = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_SpeedReducer.prototype, "speedInterval", {
        get: function () {
            return this._speedInterval;
        },
        set: function (value) {
            this._speedInterval = value;
        },
        enumerable: true,
        configurable: true
    });
    _SpeedReducer.prototype.stop = function () {
        if (this._timer != null) {
            clearInterval(this._timer);
            this._timer = null;
        }
    };
    _SpeedReducer.prototype.start = function (speedX, speedY, intervalAction) {
        var _this = this;
        this.stop();
        if (!intervalAction)
            return;
        var directionX = speedX >= 0 ? 1 : -1, directionY = speedY >= 0 ? 1 : -1, curSpeedX = Math.abs(speedX * this._timeInterval), curSpeedY = Math.abs(speedY * this._timeInterval);
        var largerSpeed = Math.max(curSpeedX, curSpeedY);
        var times = Math.floor(largerSpeed / this.speedInterval);
        var xInterval = Math.floor(curSpeedX / times), yInterval = Math.floor(curSpeedY / times);
        this._timer = setInterval(function () {
            curSpeedX -= xInterval;
            curSpeedY -= yInterval;
            curSpeedX = Math.max(0, curSpeedX);
            curSpeedY = Math.max(0, curSpeedY);
            if (!curSpeedX || !curSpeedY) {
                _this.stop();
                return;
            }
            intervalAction(curSpeedX * directionX, curSpeedY * directionY);
        }, this._timeInterval);
    };
    return _SpeedReducer;
}());
exports._SpeedReducer = _SpeedReducer;
var _TouchEventType;
(function (_TouchEventType) {
    _TouchEventType[_TouchEventType["Start"] = 0] = "Start";
    _TouchEventType[_TouchEventType["Move"] = 1] = "Move";
    _TouchEventType[_TouchEventType["End"] = 2] = "End";
})(_TouchEventType = exports._TouchEventType || (exports._TouchEventType = {}));
var _TouchEventArgs = (function (_super) {
    __extends(_TouchEventArgs, _super);
    function _TouchEventArgs(systemEvent) {
        var _this = _super.call(this) || this;
        if (systemEvent instanceof _TouchEventArgs) {
            _this._systemEvent = systemEvent.systemEvent;
            _this._type = systemEvent.type;
            _this._touchInfos = systemEvent.touchInfos;
            return _this;
        }
        _this._systemEvent = systemEvent;
        _TouchManager._registerTouchInfo(systemEvent);
        _this._type = _TouchManager._isTouchStart(systemEvent.type) ? _TouchEventType.Start
            : (_TouchManager._isTouchEnd(systemEvent.type) ? _TouchEventType.End : _TouchEventType.Move);
        _this._touchInfos = _TouchManager._allTouchInfos ? _TouchManager._allTouchInfos.slice() : [];
        return _this;
    }
    Object.defineProperty(_TouchEventArgs.prototype, "timeStamp", {
        get: function () {
            return this.systemEvent.timeStamp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TouchEventArgs.prototype, "touchInfos", {
        get: function () {
            return this._touchInfos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TouchEventArgs.prototype, "systemEvent", {
        get: function () {
            return this._systemEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TouchEventArgs.prototype, "target", {
        get: function () {
            return this.systemEvent.target;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TouchEventArgs.prototype, "currentTarget", {
        get: function () {
            return this.systemEvent.currentTarget;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TouchEventArgs.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TouchEventArgs.prototype, "pointersCount", {
        get: function () {
            return this.touchInfos.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TouchEventArgs.prototype, "cancelBubble", {
        get: function () {
            return this._systemEvent.cancelBubble;
        },
        set: function (value) {
            this._systemEvent.cancelBubble = value;
        },
        enumerable: true,
        configurable: true
    });
    _TouchEventArgs.prototype.preventDefault = function () {
        this._systemEvent.preventDefault();
    };
    return _TouchEventArgs;
}(wjcCore.EventArgs));
exports._TouchEventArgs = _TouchEventArgs;
var _TouchEvent = (function (_super) {
    __extends(_TouchEvent, _super);
    function _TouchEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _TouchEvent.prototype.raise = function (sender, args) {
        _super.prototype.raise.call(this, sender, args);
    };
    return _TouchEvent;
}(wjcCore.Event));
exports._TouchEvent = _TouchEvent;
var _TouchTrigger = (function () {
    function _TouchTrigger(source) {
        var _this = this;
        this.touchMove = new _TouchEvent();
        this.touchStart = new _TouchEvent();
        this.touchEnd = new _TouchEvent();
        var element = wjcCore.getElement(source);
        this._element = element;
        var trigger = _TouchTrigger.getTrigger(element);
        if (trigger) {
            var touchHandler = this._onTouchEvent.bind(this);
            trigger.touchMove.addHandler(touchHandler);
            trigger.touchStart.addHandler(touchHandler);
            trigger.touchEnd.addHandler(touchHandler);
            this._disposeAction = function () {
                trigger.touchMove.removeHandler(touchHandler);
                trigger.touchStart.removeHandler(touchHandler);
                trigger.touchEnd.removeHandler(touchHandler);
                _this._disposeAction = null;
            };
            return;
        }
        var touchEventsMap = _getTouchEventMap(), sysTouchHandler = this._onSystemTouchEvent.bind(this);
        _addEvent(element, touchEventsMap.startName, sysTouchHandler);
        _addEvent(element, touchEventsMap.moveName, sysTouchHandler);
        _addEvent(element, touchEventsMap.endName, sysTouchHandler);
        _TouchTrigger.bindElement(element, this);
        this._disposeAction = function () {
            _removeEvent(element, touchEventsMap.startName, sysTouchHandler);
            _removeEvent(element, touchEventsMap.moveName, sysTouchHandler);
            _removeEvent(element, touchEventsMap.endName, sysTouchHandler);
            _TouchTrigger.unbindElement(element);
            _this._disposeAction = null;
        };
    }
    _TouchTrigger.bindElement = function (element, trigger) {
        if (element[_TouchTrigger._elementDataName]) {
            throw 'Cannot bind multi _TouchTrigger on the same element.';
        }
        element[_TouchTrigger._elementDataName] = trigger;
    };
    _TouchTrigger.unbindElement = function (element) {
        element[_TouchTrigger._elementDataName] = null;
    };
    _TouchTrigger.getTrigger = function (element) {
        return element[_TouchTrigger._elementDataName];
    };
    _TouchTrigger.prototype._onSystemTouchEvent = function (event) {
        var touchEventArgs = this._createTouchEventArgs(event);
        if (touchEventArgs) {
            this._onTouchEvent(this, touchEventArgs);
        }
    };
    _TouchTrigger.prototype._createTouchEventArgs = function (e) {
        return _TouchManager._isTouchEvent(e) ? new _TouchEventArgs(e) : null;
    };
    _TouchTrigger.prototype.dispose = function () {
        if (this._disposeAction)
            this._disposeAction();
    };
    Object.defineProperty(_TouchTrigger.prototype, "hostElement", {
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    _TouchTrigger.prototype._onTouchEvent = function (sender, e) {
        switch (e.type) {
            case _TouchEventType.Start:
                this.onTouchStart(e);
                return;
            case _TouchEventType.Move:
                this.onTouchMove(e);
                return;
            case _TouchEventType.End:
                this.onTouchEnd(e);
        }
    };
    _TouchTrigger.prototype.onTouchEnd = function (event) {
        this.touchEnd.raise(this, event);
    };
    _TouchTrigger.prototype.onTouchStart = function (event) {
        this.touchStart.raise(this, event);
    };
    _TouchTrigger.prototype.onTouchMove = function (event) {
        this.touchMove.raise(this, event);
    };
    _TouchTrigger._elementDataName = '__wjTouchTrigger';
    return _TouchTrigger;
}());
exports._TouchTrigger = _TouchTrigger;
var _PanEventArgs = (function (_super) {
    __extends(_PanEventArgs, _super);
    function _PanEventArgs(args, pre, type) {
        var _this = _super.call(this, args) || this;
        _this._panType = type == null ? args.type : type;
        _this._client = new wjcCore.Point(_this.touchInfo.clientX, _this.touchInfo.clientY);
        _this._screen = new wjcCore.Point(_this.touchInfo.screenX, _this.touchInfo.screenY);
        if (pre) {
            _this._clientDelta = new wjcCore.Point(_this.client.x - pre.client.x, _this.client.y - pre.client.y);
            _this._screenDelta = new wjcCore.Point(_this.screen.x - pre.screen.x, _this.screen.y - pre.screen.y);
        }
        return _this;
    }
    Object.defineProperty(_PanEventArgs.prototype, "type", {
        get: function () {
            return this._panType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PanEventArgs.prototype, "clientDelta", {
        get: function () {
            return this._clientDelta;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PanEventArgs.prototype, "screenDelta", {
        get: function () {
            return this._screenDelta;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PanEventArgs.prototype, "client", {
        get: function () {
            return this._client;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PanEventArgs.prototype, "screen", {
        get: function () {
            return this._screen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PanEventArgs.prototype, "pointersCount", {
        get: function () {
            return this.type == _TouchEventType.End ? 0 : 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PanEventArgs.prototype, "touchInfo", {
        get: function () {
            return this.touchInfos[0] || {};
        },
        enumerable: true,
        configurable: true
    });
    return _PanEventArgs;
}(_TouchEventArgs));
exports._PanEventArgs = _PanEventArgs;
var _PanEvent = (function (_super) {
    __extends(_PanEvent, _super);
    function _PanEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _PanEvent.prototype.raise = function (sender, args) {
        _super.prototype.raise.call(this, sender, args);
    };
    return _PanEvent;
}(_TouchEvent));
exports._PanEvent = _PanEvent;
var _PanTrigger = (function (_super) {
    __extends(_PanTrigger, _super);
    function _PanTrigger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.panMove = new _PanEvent();
        _this.panStart = new _PanEvent();
        _this.panEnd = new _PanEvent();
        return _this;
    }
    _PanTrigger.prototype.onPanEnd = function (args) {
        this.panEnd.raise(this, args);
    };
    _PanTrigger.prototype.onPanStart = function (args) {
        this.panStart.raise(this, args);
    };
    _PanTrigger.prototype.onPanMove = function (args) {
        this.panMove.raise(this, args);
    };
    _PanTrigger.prototype._prepareMove = function (args) {
        var _this = this;
        this._prePanEventArgs = args;
        this._panEvents.queue(function () {
            _this.onPanMove(args);
        });
    };
    _PanTrigger.prototype._prepareStart = function (args) {
        var _this = this;
        this._prePanEventArgs = args;
        this._panEvents.queue(function () {
            _this.onPanStart(args);
        });
        this._clearPanStartTimer();
        this._panStartTimer = setTimeout(function () {
            if (_this._panEvents)
                _this._panEvents.start();
            _this._clearPanStartTimer();
        }, _PanTrigger._threhold);
    };
    _PanTrigger.prototype._prepareEnd = function (args) {
        var _this = this;
        this._prePanEventArgs = null;
        this._panEvents.queue(function () {
            var endArgs = args instanceof _PanEventArgs ? args : new _PanEventArgs(args, null, _TouchEventType.End);
            _this.onPanEnd(endArgs);
            _this._stopPan();
        });
    };
    _PanTrigger.prototype._clearPanStartTimer = function () {
        if (this._panStartTimer != null) {
            clearTimeout(this._panStartTimer);
            this._panStartTimer = null;
        }
    };
    _PanTrigger.prototype._tryStopPan = function (args) {
        if (!this._panEvents || !this._panEvents.isStarted) {
            this._stopPan();
            return;
        }
        this._prepareEnd(args);
    };
    _PanTrigger.prototype._stopPan = function () {
        this._clearPanStartTimer();
        this._panEvents = null;
        this._prePanEventArgs = null;
    };
    _PanTrigger.prototype._processPan = function (args) {
        var panEventArgs = this._createPanEventArgs(args);
        if (!panEventArgs) {
            this._tryStopPan(args);
            return;
        }
        switch (panEventArgs.type) {
            case _TouchEventType.Start:
                this._prepareStart(panEventArgs);
                return;
            case _TouchEventType.Move:
                this._prepareMove(panEventArgs);
                return;
            case _TouchEventType.End:
                this._prepareEnd(panEventArgs);
                return;
        }
    };
    _PanTrigger.prototype.onTouchStart = function (args) {
        _super.prototype.onTouchStart.call(this, args);
        this._processPan(args);
    };
    _PanTrigger.prototype.onTouchMove = function (args) {
        _super.prototype.onTouchMove.call(this, args);
        this._processPan(args);
    };
    _PanTrigger.prototype.onTouchEnd = function (args) {
        _super.prototype.onTouchEnd.call(this, args);
        var panEventArgs = this._createPanEventArgs(args);
        if (panEventArgs) {
            this._prepareEnd(panEventArgs);
            return;
        }
        this._tryStopPan(args);
    };
    _PanTrigger.prototype._createPanEventArgs = function (args) {
        if ((args.type == _TouchEventType.End && args.pointersCount != 0)
            || (args.type != _TouchEventType.End && args.pointersCount != 1)) {
            return null;
        }
        var panEventArgs = new _PanEventArgs(args, this._prePanEventArgs);
        if (panEventArgs.type != _TouchEventType.Start) {
            if (!this._panEvents)
                return null;
        }
        else {
            this._panEvents = new _ActionQueue();
        }
        return panEventArgs;
    };
    _PanTrigger._threhold = 10;
    return _PanTrigger;
}(_TouchTrigger));
exports._PanTrigger = _PanTrigger;
var _SwipeEventArgs = (function (_super) {
    __extends(_SwipeEventArgs, _super);
    function _SwipeEventArgs(startInfo, endInfo, panEventArgs, duration) {
        var _this = _super.call(this, panEventArgs) || this;
        _this._duration = duration;
        _this._startTouchInfo = startInfo;
        _this._endTouchInfo = endInfo;
        var distance = _pointMove(false, new wjcCore.Point(_this.endTouchInfo.clientX, _this.endTouchInfo.clientY), new wjcCore.Point(_this.startTouchInfo.clientX, _this.startTouchInfo.clientY));
        _this._speed = new wjcCore.Point(_SwipeTrigger.getSpeed(distance.x, _this.duration), _SwipeTrigger.getSpeed(distance.y, _this.duration));
        _this._direction = _TouchInfo._getDirection(_this.startTouchInfo, _this.endTouchInfo);
        return _this;
    }
    Object.defineProperty(_SwipeEventArgs.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_SwipeEventArgs.prototype, "startTouchInfo", {
        get: function () {
            return this._startTouchInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_SwipeEventArgs.prototype, "endTouchInfo", {
        get: function () {
            return this._endTouchInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_SwipeEventArgs.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_SwipeEventArgs.prototype, "pointersCount", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_SwipeEventArgs.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        enumerable: true,
        configurable: true
    });
    return _SwipeEventArgs;
}(_PanEventArgs));
exports._SwipeEventArgs = _SwipeEventArgs;
var _SwipeEvent = (function (_super) {
    __extends(_SwipeEvent, _super);
    function _SwipeEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _SwipeEvent.prototype.raise = function (sender, args) {
        _super.prototype.raise.call(this, sender, args);
    };
    return _SwipeEvent;
}(_PanEvent));
exports._SwipeEvent = _SwipeEvent;
var _SwipeTrigger = (function (_super) {
    __extends(_SwipeTrigger, _super);
    function _SwipeTrigger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.swipe = new _SwipeEvent();
        return _this;
    }
    _SwipeTrigger.getSpeed = function (distance, duration) {
        return distance / duration;
    };
    _SwipeTrigger.prototype.onPanStart = function (args) {
        _super.prototype.onPanStart.call(this, args);
        this._panStartEventArgs = args;
    };
    _SwipeTrigger.prototype.onPanMove = function (args) {
        _super.prototype.onPanMove.call(this, args);
        this._prePanMoveEventArgs = args;
    };
    _SwipeTrigger.prototype.onPanEnd = function (args) {
        _super.prototype.onPanEnd.call(this, args);
        var swipeEventArgs = this._createSwipeEventArgs(args);
        if (swipeEventArgs) {
            this.onSwipe(swipeEventArgs);
        }
        this._panStartEventArgs = null;
        this._prePanMoveEventArgs = null;
    };
    _SwipeTrigger.prototype.onSwipe = function (args) {
        this.swipe.raise(this, args);
    };
    _SwipeTrigger.prototype._createSwipeEventArgs = function (endArgs) {
        if (!this._panStartEventArgs || !this._prePanMoveEventArgs) {
            return null;
        }
        var duration = endArgs.timeStamp - this._panStartEventArgs.timeStamp;
        if (duration > _SwipeTrigger.maxDuration) {
            return null;
        }
        var distance = _TouchInfo.getDistance(this._panStartEventArgs.touchInfo, this._prePanMoveEventArgs.touchInfo);
        if (distance < _SwipeTrigger.minDistance) {
            return null;
        }
        return new _SwipeEventArgs(this._panStartEventArgs.touchInfo, this._prePanMoveEventArgs.touchInfo, endArgs, duration);
    };
    _SwipeTrigger.minDistance = 50;
    _SwipeTrigger.maxDuration = 300;
    return _SwipeTrigger;
}(_PanTrigger));
exports._SwipeTrigger = _SwipeTrigger;
var _PinchEventArgs = (function (_super) {
    __extends(_PinchEventArgs, _super);
    function _PinchEventArgs(touchEventArgs, pinchType, pre) {
        var _this = _super.call(this, touchEventArgs) || this;
        _this._zoom = 1;
        _this._pinchType = pinchType;
        _this._pre = pre || {};
        if (_this.type == _TouchEventType.End)
            return _this;
        _this._pinchDistance = _TouchInfo.getDistance(_this.touchInfos[0], _this.touchInfos[1]);
        _this._centerClient = _TouchInfo.getCenterClient(_this.touchInfos[0], _this.touchInfos[1]);
        _this._centerScreen = _TouchInfo.getCenterScreen(_this.touchInfos[0], _this.touchInfos[1]);
        if (_this.type == _TouchEventType.Start)
            return _this;
        _this._zoom = _this.pinchDistance / _this.prePinchDistance;
        _this._centerClientDelta = new wjcCore.Point((_this.centerClient.x - _this.preCenterClient.x), (_this.centerClient.y - _this.preCenterClient.y));
        _this._centerScreenDelta = new wjcCore.Point((_this.centerScreen.x - _this.preCenterScreen.x), (_this.centerScreen.y - _this.preCenterScreen.y));
        return _this;
    }
    Object.defineProperty(_PinchEventArgs.prototype, "zoom", {
        get: function () {
            return this._zoom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PinchEventArgs.prototype, "pointersCount", {
        get: function () {
            return this.type == _TouchEventType.End ? 0 : 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PinchEventArgs.prototype, "prePinchDistance", {
        get: function () {
            return this._pre.pinchDistance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PinchEventArgs.prototype, "pinchDistance", {
        get: function () {
            return this._pinchDistance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PinchEventArgs.prototype, "centerScreenDelta", {
        get: function () {
            return this._centerScreenDelta;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PinchEventArgs.prototype, "centerClientDelta", {
        get: function () {
            return this._centerClientDelta;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PinchEventArgs.prototype, "centerClient", {
        get: function () {
            return this._centerClient;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PinchEventArgs.prototype, "preCenterClient", {
        get: function () {
            return this._pre.centerClient;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PinchEventArgs.prototype, "centerScreen", {
        get: function () {
            return this._centerScreen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PinchEventArgs.prototype, "preCenterScreen", {
        get: function () {
            return this._pre.centerScreen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PinchEventArgs.prototype, "type", {
        get: function () {
            return this._pinchType;
        },
        enumerable: true,
        configurable: true
    });
    return _PinchEventArgs;
}(_TouchEventArgs));
exports._PinchEventArgs = _PinchEventArgs;
var _PinchEvent = (function (_super) {
    __extends(_PinchEvent, _super);
    function _PinchEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _PinchEvent.prototype.raise = function (sender, args) {
        _super.prototype.raise.call(this, sender, args);
    };
    return _PinchEvent;
}(_TouchEvent));
exports._PinchEvent = _PinchEvent;
var _PinchTrigger = (function (_super) {
    __extends(_PinchTrigger, _super);
    function _PinchTrigger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pinch = new _PinchEvent();
        return _this;
    }
    _PinchTrigger.prototype.onPinch = function (args) {
        this.pinch.raise(this, args);
    };
    _PinchTrigger.prototype.onTouchStart = function (args) {
        this._process(args);
    };
    _PinchTrigger.prototype.onTouchend = function (args) {
        this._process(args);
    };
    _PinchTrigger.prototype.onTouchMove = function (args) {
        this._process(args);
    };
    _PinchTrigger.prototype._onPinching = function (args) {
        var pinchArgs = new _PinchEventArgs(args, this._preEventArgs ? _TouchEventType.Move : _TouchEventType.Start, this._preEventArgs);
        this.onPinch(pinchArgs);
        this._preEventArgs = pinchArgs;
    };
    _PinchTrigger.prototype._onPinchEnd = function (args) {
        if (this._preEventArgs) {
            var endArgs = new _PinchEventArgs(args, _TouchEventType.End, this._preEventArgs);
            this.onPinch(endArgs);
            this._preEventArgs = null;
        }
    };
    _PinchTrigger.prototype._process = function (args) {
        if (args.pointersCount != 2) {
            this._onPinchEnd(args);
            return;
        }
        switch (args.type) {
            case _TouchEventType.Start:
            case _TouchEventType.Move:
                this._onPinching(args);
                return;
            case _TouchEventType.End:
                this._onPinchEnd(args);
                return;
        }
    };
    return _PinchTrigger;
}(_TouchTrigger));
exports._PinchTrigger = _PinchTrigger;
var _TouchManager = (function () {
    function _TouchManager(element, removeDefaultTouch) {
        if (removeDefaultTouch === void 0) { removeDefaultTouch = true; }
        var _this = this;
        this.touchMove = new _TouchEvent();
        this.touchStart = new _TouchEvent();
        this.touchEnd = new _TouchEvent();
        this.panMove = new _PanEvent();
        this.panStart = new _PanEvent();
        this.panEnd = new _PanEvent();
        this.swipe = new _SwipeEvent();
        this.pinch = new _PinchEvent();
        this._trigger = new _SwipeTrigger(element);
        this._trigger.touchStart.addHandler(function (s, e) { return _this.onTouchStart(e); });
        this._trigger.touchMove.addHandler(function (s, e) { return _this.onTouchMove(e); });
        this._trigger.touchEnd.addHandler(function (s, e) { return _this.onTouchEnd(e); });
        this._trigger.panStart.addHandler(function (s, e) { return _this.onPanStart(e); });
        this._trigger.panMove.addHandler(function (s, e) { return _this.onPanMove(e); });
        this._trigger.panEnd.addHandler(function (s, e) { return _this.onPanEnd(e); });
        this._trigger.swipe.addHandler(function (s, e) { return _this.onSwipe(e); });
        this._pinchTrigger = new _PinchTrigger(element);
        this._pinchTrigger.pinch.addHandler(function (s, e) { return _this.onPinch(e); });
        this.removeDefaultTouch = removeDefaultTouch;
    }
    _TouchManager._isTouchEvent = function (event) {
        return event instanceof TouchEvent ||
            (event.pointerType || '').toLowerCase() === _TouchManager._touchPointerName;
    };
    _TouchManager._isTouchStart = function (type) {
        return _TouchManager._eventTypeContains(type, _getTouchEventMap().startName);
    };
    _TouchManager._isTouchEnd = function (type) {
        return _TouchManager._eventTypeContains(type, _getTouchEventMap().endName);
    };
    _TouchManager._isTouchMove = function (type) {
        return _TouchManager._eventTypeContains(type, _getTouchEventMap().moveName);
    };
    _TouchManager._eventTypeContains = function (current, definitions) {
        var defEvents = definitions.split(',');
        current = current.toLowerCase();
        for (var i = 0, length = defEvents.length; i < length; i++) {
            var event = defEvents[i].trim().toLowerCase();
            if (current.indexOf(event) > -1)
                return true;
        }
        return false;
    };
    _TouchManager._registerTouchInfo = function (systemEvent) {
        if (!_TouchManager._isTouchEvent(systemEvent))
            return;
        if (systemEvent instanceof TouchEvent) {
            _TouchManager._allTouchInfos = [];
            for (var i = 0, length = systemEvent.touches.length; i < length; i++) {
                _TouchManager._allTouchInfos.push(new _TouchInfo(systemEvent.touches.item(i)));
            }
            return;
        }
        if (systemEvent instanceof PointerEvent) {
            _TouchManager._allTouchInfos = _TouchManager._allTouchInfos || [];
            if (_TouchManager._isTouchEnd(systemEvent.type)) {
                for (var index = 0, length = _TouchManager._allTouchInfos.length; index < length; index++) {
                    if (_TouchManager._allTouchInfos[index].id == systemEvent.pointerId) {
                        _TouchManager._allTouchInfos.splice(index, 1);
                        return;
                    }
                }
                return;
            }
            for (var index = 0, length = _TouchManager._allTouchInfos.length; index < length; index++) {
                if (_TouchManager._allTouchInfos[index].id == systemEvent.pointerId) {
                    _TouchManager._allTouchInfos[index] = new _TouchInfo(systemEvent);
                    return;
                }
            }
            _TouchManager._allTouchInfos.push(new _TouchInfo(systemEvent));
        }
    };
    _TouchManager.prototype.onPinch = function (event) {
        this.pinch.raise(this, event);
    };
    _TouchManager.prototype.onSwipe = function (event) {
        this.swipe.raise(this, event);
    };
    _TouchManager.prototype.onTouchEnd = function (event) {
        this.touchEnd.raise(this, event);
    };
    _TouchManager.prototype.onTouchStart = function (event) {
        this.touchStart.raise(this, event);
    };
    _TouchManager.prototype.onTouchMove = function (event) {
        this.touchMove.raise(this, event);
    };
    _TouchManager.prototype.onPanEnd = function (args) {
        this.panEnd.raise(this, args);
    };
    _TouchManager.prototype.onPanStart = function (args) {
        this.panStart.raise(this, args);
    };
    _TouchManager.prototype.onPanMove = function (args) {
        this.panMove.raise(this, args);
    };
    Object.defineProperty(_TouchManager.prototype, "removeDefaultTouch", {
        get: function () {
            return this._removeDefaultTouch;
        },
        set: function (value) {
            this._removeDefaultTouch = value;
            var style = this.hostElement.style;
            if (value) {
                style.touchAction = 'none';
                style.msTouchAction = 'none';
            }
            else {
                style.touchAction = this._defaultTouchAction;
                style.msTouchAction = this._defaultMsTouchAction;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TouchManager.prototype, "hostElement", {
        get: function () {
            return this._pinchTrigger.hostElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TouchManager.prototype, "contentElement", {
        get: function () {
            return this.hostElement.children.length ? this.hostElement.children[0] : null;
        },
        enumerable: true,
        configurable: true
    });
    _TouchManager.prototype.dispose = function () {
        if (this._pinchTrigger) {
            this._pinchTrigger.dispose();
        }
        if (this._trigger) {
            this._trigger.dispose();
        }
        if (this.removeDefaultTouch) {
            this.removeDefaultTouch = false;
        }
    };
    _TouchManager._touchPointerName = 'touch';
    _TouchManager._allTouchInfos = [];
    return _TouchManager;
}());
exports._TouchManager = _TouchManager;
'use strict';
var _PageSetupEditor = (function (_super) {
    __extends(_PageSetupEditor, _super);
    function _PageSetupEditor(ele) {
        var _this = _super.call(this, ele) || this;
        _this._uiUpdating = false;
        var depErr = 'Missing dependency: _PageSetupEditor requires ';
        wjcCore.assert(wjcInput.ComboBox != null, depErr + 'wijmo.input.');
        var tpl;
        tpl = _this.getTemplate();
        _this.applyTemplate('wj-control wj-content', tpl, {
            _divPaperKind: 'div-paper-kind',
            _divOrientation: 'div-page-orientation',
            _divMarginsLeft: 'div-margins-left',
            _divMarginsRight: 'div-margins-right',
            _divMarginsTop: 'div-margins-top',
            _divMarginsBottom: 'div-margins-bottom',
            _gPaperKind: 'g-paperkind',
            _gOrientation: 'g-orientation',
            _gMargins: 'g-margins',
            _gLeft: 'g-left',
            _gRight: 'g-right',
            _gTop: 'g-top',
            _gBottom: 'g-bottom'
        });
        _this._numMarginsLeft = new wjcInput.InputNumber(_this._divMarginsLeft);
        _this._numMarginsLeft.valueChanged.addHandler(_this._updateValue, _this);
        _this._numMarginsRight = new wjcInput.InputNumber(_this._divMarginsRight);
        _this._numMarginsRight.valueChanged.addHandler(_this._updateValue, _this);
        _this._numMarginsTop = new wjcInput.InputNumber(_this._divMarginsTop);
        _this._numMarginsTop.valueChanged.addHandler(_this._updateValue, _this);
        _this._numMarginsBottom = new wjcInput.InputNumber(_this._divMarginsBottom);
        _this._numMarginsBottom.valueChanged.addHandler(_this._updateValue, _this);
        _this._cmbPaperKind = new wjcInput.ComboBox(_this._divPaperKind, {
            itemsSource: _enumToArray(_PaperKind),
            displayMemberPath: 'text',
            selectedValuePath: 'value',
            isEditable: false
        });
        _this._cmbPaperKind.selectedIndexChanged.addHandler(_this._updateValue, _this);
        _this._cmbOrientation = new wjcInput.ComboBox(_this._divOrientation, {
            itemsSource: [wjcCore.culture.Viewer.portrait, wjcCore.culture.Viewer.landscape],
            isEditable: false
        });
        _this._cmbOrientation.selectedIndexChanged.addHandler(_this._updateValue, _this);
        _this._globalize();
        return _this;
    }
    Object.defineProperty(_PageSetupEditor.prototype, "pageSettings", {
        get: function () {
            return this._pageSettings;
        },
        set: function (pageSettings) {
            var value = _clonePageSettings(pageSettings);
            this._pageSettings = value;
            this._updateUI();
            this._cmbPaperKind.focus();
        },
        enumerable: true,
        configurable: true
    });
    _PageSetupEditor.prototype._globalize = function () {
        var g = wjcCore.culture.Viewer;
        this._gPaperKind.textContent = g.paperKind;
        this._gOrientation.textContent = g.orientation;
        this._gMargins.textContent = g.margins;
        this._gLeft.textContent = g.left;
        this._gRight.textContent = g.right;
        this._gTop.textContent = g.top;
        this._gBottom.textContent = g.bottom;
        var selectedIndex = this._cmbOrientation.selectedIndex;
        this._cmbOrientation.itemsSource = [wjcCore.culture.Viewer.portrait, wjcCore.culture.Viewer.landscape];
        this._cmbOrientation.selectedIndex = selectedIndex;
    };
    _PageSetupEditor.prototype._updateValue = function () {
        if (this._uiUpdating) {
            return;
        }
        var pageSettings = this.pageSettings;
        if (pageSettings) {
            pageSettings.bottomMargin = new _Unit(this._numMarginsBottom.value, _UnitType.Inch);
            pageSettings.leftMargin = new _Unit(this._numMarginsLeft.value, _UnitType.Inch);
            pageSettings.rightMargin = new _Unit(this._numMarginsRight.value, _UnitType.Inch);
            pageSettings.topMargin = new _Unit(this._numMarginsTop.value, _UnitType.Inch);
            pageSettings.paperSize = this._cmbPaperKind.selectedValue;
            _setLandscape(pageSettings, this._cmbOrientation.text === wjcCore.culture.Viewer.landscape);
            this._updateUI();
        }
    };
    _PageSetupEditor.prototype._updateUI = function () {
        this._uiUpdating = true;
        var pageSettings = this.pageSettings, setMargin = function (input, unit) {
            input.value = _Unit.convertValue(unit.value, unit.units, _UnitType.Inch);
        };
        if (pageSettings) {
            this._cmbPaperKind.selectedValue = pageSettings.paperSize;
            this._cmbOrientation.text = pageSettings.landscape ? wjcCore.culture.Viewer.landscape : wjcCore.culture.Viewer.portrait;
            setMargin(this._numMarginsLeft, pageSettings.leftMargin);
            setMargin(this._numMarginsRight, pageSettings.rightMargin);
            setMargin(this._numMarginsTop, pageSettings.topMargin);
            setMargin(this._numMarginsBottom, pageSettings.bottomMargin);
        }
        this._uiUpdating = false;
    };
    _PageSetupEditor.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        _super.prototype.refresh.call(this, fullUpdate);
        if (fullUpdate) {
            this._globalize();
        }
    };
    _PageSetupEditor.controlTemplate = '<div>' +
        '<div style="padding:12px;">' +
        '<table style="table-layout:fixed">' +
        '<tr>' +
        '<td wj-part="g-paperkind"></td><td><div wj-part="div-paper-kind"></div></td>' +
        '</tr>' +
        '<tr>' +
        '<td wj-part="g-orientation"></td><td><div wj-part="div-page-orientation"></div></td>' +
        '</tr>' +
        '</table>' +
        '<fieldset style="margin-top: 12px">' +
        '<legend wj-part="g-margins"></legend>' +
        '<table style="table-layout:fixed">' +
        '<tr>' +
        '<td wj-part="g-left"></td><td><div wj-part="div-margins-left"></div></td>' +
        '</tr>' +
        '<tr>' +
        '<td wj-part="g-right"></td><td><div wj-part="div-margins-right"></div></td>' +
        '</tr>' +
        '<tr>' +
        '<td wj-part="g-top"></td><td><div wj-part="div-margins-top"></div></td>' +
        '</tr>' +
        '<tr>' +
        '<td wj-part="g-bottom"></td><td><div wj-part="div-margins-bottom"></div></td>' +
        '</tr>' +
        '</table>' +
        '</fieldset>' +
        '</div>' +
        '</div>';
    return _PageSetupEditor;
}(wjcCore.Control));
exports._PageSetupEditor = _PageSetupEditor;
var _ExportOptionEditor = (function (_super) {
    __extends(_ExportOptionEditor, _super);
    function _ExportOptionEditor(element) {
        var _this = _super.call(this, element) || this;
        _this._options = {};
        _this._optionLabels = null;
        _this._groupTitleField = null;
        wjcCore.addClass(element, 'wj-export-editor');
        return _this;
    }
    Object.defineProperty(_ExportOptionEditor.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_ExportOptionEditor.prototype, "exportDescription", {
        get: function () {
            return this._exportDescription;
        },
        set: function (value) {
            this._exportDescription = value;
            this._options = {};
            if (!value) {
                return;
            }
            this._options['format'] = this.exportDescription.format;
            this._render();
        },
        enumerable: true,
        configurable: true
    });
    _ExportOptionEditor.prototype._skipOption = function (name) {
        return _ExportOptionEditor._skippedOptions.indexOf(name) >= 0;
    };
    _ExportOptionEditor.prototype._render = function () {
        _removeChildren(this.hostElement);
        if (!this.exportDescription) {
            return;
        }
        var table = document.createElement('table'), optionDescs = this.exportDescription.optionDescriptions, groupOptions = {};
        if (optionDescs) {
            for (var i = 0; i < optionDescs.length; i++) {
                var optionDesc = optionDescs[i];
                if (this._skipOption(optionDesc.name)) {
                    continue;
                }
                if (optionDesc.group) {
                    if (!groupOptions[optionDesc.group]) {
                        groupOptions[optionDesc.group] = [];
                    }
                    groupOptions[optionDesc.group].push(optionDesc);
                    continue;
                }
                if (!groupOptions[_ExportOptionEditor._generalGroupName]) {
                    groupOptions[_ExportOptionEditor._generalGroupName] = [];
                }
                optionDesc.group = _ExportOptionEditor._generalGroupName;
                groupOptions[_ExportOptionEditor._generalGroupName].push(optionDesc);
            }
        }
        for (var p in groupOptions) {
            this.hostElement.appendChild(this._generateGroup(groupOptions[p]));
        }
        this._updateEditors();
    };
    _ExportOptionEditor.prototype._generateEditor = function (desc) {
        var editor;
        if (wjcCore.isArray(desc.allowedValues)) {
            editor = this._generateComboEditor(desc);
        }
        else {
            switch (desc.type) {
                case 'bool':
                    editor = this._generateBoolEditor(desc);
                    break;
                case 'int':
                case 'float':
                    editor = this._generateNumberEditor(desc);
                    break;
                case 'unit':
                    desc.defaultValue = new _Unit(desc.defaultValue);
                case 'string':
                default:
                    editor = this._generateStringEditor(desc);
                    break;
            }
        }
        editor.setAttribute(_ExportOptionEditor._optionIdAttr, desc.name);
        return editor;
    };
    _ExportOptionEditor.prototype._generateComboEditor = function (desc) {
        var _this = this;
        var combo, itemsSource = [], element = document.createElement('div');
        for (var i = 0; i < desc.allowedValues.length; i++) {
            itemsSource.push(desc.allowedValues[i]);
        }
        combo = new wjcInput.ComboBox(element);
        combo.isEditable = false;
        combo.itemsSource = itemsSource;
        combo.selectedValue = desc.defaultValue;
        combo.selectedIndexChanged.addHandler(function (sender) {
            _this._setOptionValue(desc.name, sender.selectedValue.toString());
        });
        return element;
    };
    _ExportOptionEditor.prototype._generateBoolEditor = function (desc) {
        var _this = this;
        var element;
        if (desc.nullable) {
            element = document.createElement('div');
            var checkEditor = new wjcInput.ComboBox(element), itemsSource = [];
            checkEditor.isEditable = false;
            checkEditor.displayMemberPath = 'name';
            checkEditor.selectedValuePath = 'value';
            itemsSource.push({ name: 'None', value: null });
            itemsSource.push({ name: 'True', value: true });
            itemsSource.push({ name: 'False', value: false });
            checkEditor.itemsSource = itemsSource;
            checkEditor.selectedValue = desc.defaultValue;
            checkEditor.selectedIndexChanged.addHandler(function (sender) {
                _this._setOptionValue(desc.name, sender.selectedValue);
                _this._updateEditors(desc.name);
            });
        }
        else {
            element = document.createElement('input');
            element.type = 'checkbox';
            var defaultValue = wjcCore.changeType(desc.defaultValue, wjcCore.DataType.Boolean, null);
            element.checked = defaultValue;
            _addEvent(element, 'click', function () {
                _this._setOptionValue(desc.name, element.checked);
                _this._updateEditors(desc.name);
            });
        }
        return element;
    };
    _ExportOptionEditor.prototype._generateNumberEditor = function (desc) {
        var _this = this;
        var element, inputNumber, isIntType = desc.type === 'int';
        element = document.createElement('div');
        inputNumber = new wjcInput.InputNumber(element);
        inputNumber.format = isIntType ? 'n0' : 'n2';
        inputNumber.isRequired = !desc.nullable;
        inputNumber.value = desc.defaultValue;
        inputNumber.valueChanged.addHandler(function (sender) {
            _this._setOptionValue(desc.name, sender.value);
        });
        return element;
    };
    _ExportOptionEditor.prototype._generateStringEditor = function (desc) {
        var _this = this;
        var element;
        element = document.createElement('input');
        if (desc.name.match(/password/i)) {
            element.type = 'password';
        }
        else {
            element.type = 'text';
        }
        element.value = desc.defaultValue;
        _addEvent(element, 'change,keyup,paste,input', function () {
            _this._setOptionValue(desc.name, element.value);
        });
        return element;
    };
    _ExportOptionEditor.prototype._generateGroup = function (optionDescs) {
        var fieldSet = document.createElement('fieldset'), legend = document.createElement('legend'), groupName = optionDescs[0].group;
        wjcCore.addClass(fieldSet, 'wj-exportformats-group');
        legend.innerHTML = this._groupTitle[groupName];
        legend.setAttribute(_ExportOptionEditor._optionNameAttr, groupName);
        fieldSet.appendChild(legend);
        var table = document.createElement('table');
        for (var i = 0; i < optionDescs.length; i++) {
            var optionDesc = optionDescs[i];
            var tr = document.createElement('tr'), tdTitle = document.createElement('td'), tdEditor = document.createElement('td');
            tdTitle.innerHTML = this._getOptionLabel(optionDesc.name);
            tdTitle.setAttribute(_ExportOptionEditor._optionNameAttr, optionDesc.name);
            tdEditor.appendChild(this._generateEditor(optionDesc));
            tr.appendChild(tdTitle);
            tr.appendChild(tdEditor);
            table.appendChild(tr);
        }
        fieldSet.appendChild(table);
        return fieldSet;
    };
    _ExportOptionEditor.prototype._updateEditors = function (optionName) {
        if (optionName === 'pdfACompatible' || !optionName) {
            var embedFonts = this.hostElement.querySelector('[' + _ExportOptionEditor._optionIdAttr + '="embedFonts"]');
            if (embedFonts) {
                var pdfACompatibleValue = wjcCore.changeType(this._getOptionValue('pdfACompatible'), wjcCore.DataType.Boolean, null);
                if (pdfACompatibleValue) {
                    this._previousEmbedFonts = embedFonts.checked;
                    embedFonts.checked = true;
                    this._setOptionValue('embedFonts', true);
                }
                else {
                    embedFonts.checked = this._previousEmbedFonts;
                    this._setOptionValue('embedFonts', this._previousEmbedFonts);
                }
                embedFonts.disabled = pdfACompatibleValue;
            }
            return;
        }
        if (optionName === 'paged' || !optionName) {
            var showNavigator = this.hostElement.querySelector('[' + _ExportOptionEditor._optionIdAttr + '="showNavigator"]');
            if (showNavigator) {
                var paged = wjcCore.changeType(this._getOptionValue('paged'), wjcCore.DataType.Boolean, null);
                if (!paged) {
                    this._previousShowNavigator = showNavigator.checked;
                    showNavigator.checked = false;
                    this._setOptionValue('showNavigator', false);
                }
                else {
                    showNavigator.checked = this._previousShowNavigator;
                    this._setOptionValue('showNavigator', this._previousShowNavigator);
                }
                showNavigator.disabled = !paged;
            }
        }
    };
    _ExportOptionEditor.prototype._getOptionLabel = function (optionName) {
        var label = this._optionLabelsText[optionName];
        if (label) {
            return label;
        }
        return optionName[0].toUpperCase() + optionName.substring(1);
    };
    _ExportOptionEditor.prototype._getOptionDescByName = function (optionName) {
        var item = null;
        this._exportDescription.optionDescriptions.some(function (v) {
            if (v.name === optionName) {
                item = v;
                return true;
            }
            return false;
        });
        return item;
    };
    _ExportOptionEditor.prototype._getOptionValue = function (optionName) {
        if (this._options[optionName] !== undefined) {
            return this._options[optionName];
        }
        return this._getOptionDescByName(optionName).defaultValue;
    };
    _ExportOptionEditor.prototype._setOptionValue = function (optionName, value) {
        var optionDesc = this._getOptionDescByName(optionName);
        var defaultValue = optionDesc.defaultValue;
        if (optionDesc.type === 'unit') {
            defaultValue = optionDesc.defaultValue.toString();
        }
        if (value === defaultValue) {
            if (this._options[optionName] !== undefined) {
                delete this._options[optionName];
            }
            return;
        }
        this._options[optionName] = value;
    };
    Object.defineProperty(_ExportOptionEditor.prototype, "_optionLabelsText", {
        get: function () {
            if (!this._optionLabels) {
                this._optionLabels = {
                    title: wjcCore.culture.Viewer.docInfoTitle,
                    author: wjcCore.culture.Viewer.docInfoAuthor,
                    manager: wjcCore.culture.Viewer.docInfoManager,
                    operator: wjcCore.culture.Viewer.docInfoOperator,
                    company: wjcCore.culture.Viewer.docInfoCompany,
                    subject: wjcCore.culture.Viewer.docInfoSubject,
                    comment: wjcCore.culture.Viewer.docInfoComment,
                    creator: wjcCore.culture.Viewer.docInfoCreator,
                    producer: wjcCore.culture.Viewer.docInfoProducer,
                    creationTime: wjcCore.culture.Viewer.docInfoCreationTime,
                    revisionTime: wjcCore.culture.Viewer.docInfoRevisionTime,
                    keywords: wjcCore.culture.Viewer.docInfoKeywords,
                    embedFonts: wjcCore.culture.Viewer.embedFonts,
                    pdfACompatible: wjcCore.culture.Viewer.pdfACompatible,
                    useCompression: wjcCore.culture.Viewer.useCompression,
                    useOutlines: wjcCore.culture.Viewer.useOutlines,
                    allowCopyContent: wjcCore.culture.Viewer.allowCopyContent,
                    allowEditAnnotations: wjcCore.culture.Viewer.allowEditAnnotations,
                    allowEditContent: wjcCore.culture.Viewer.allowEditContent,
                    allowPrint: wjcCore.culture.Viewer.allowPrint,
                    ownerPassword: wjcCore.culture.Viewer.ownerPassword,
                    userPassword: wjcCore.culture.Viewer.userPassword,
                    encryptionType: wjcCore.culture.Viewer.encryptionType,
                    paged: wjcCore.culture.Viewer.paged,
                    showNavigator: wjcCore.culture.Viewer.showNavigator,
                    navigatorPosition: wjcCore.culture.Viewer.navigatorPosition,
                    singleFile: wjcCore.culture.Viewer.singleFile,
                    tolerance: wjcCore.culture.Viewer.tolerance,
                    pictureLayer: wjcCore.culture.Viewer.pictureLayer,
                    metafileType: wjcCore.culture.Viewer.metafileType,
                    monochrome: wjcCore.culture.Viewer.monochrome,
                    resolution: wjcCore.culture.Viewer.resolution,
                    outputRange: wjcCore.culture.Viewer.outputRange,
                    outputRangeInverted: wjcCore.culture.Viewer.outputRangeInverted
                };
            }
            return this._optionLabels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_ExportOptionEditor.prototype, "_groupTitle", {
        get: function () {
            if (!this._groupTitleField) {
                this._groupTitleField = {
                    documentRestrictions: wjcCore.culture.Viewer.documentRestrictionsGroup,
                    passwordSecurity: wjcCore.culture.Viewer.passwordSecurityGroup,
                    outputRange: wjcCore.culture.Viewer.outputRangeGroup,
                    documentInfo: wjcCore.culture.Viewer.documentInfoGroup,
                    general: wjcCore.culture.Viewer.generalGroup
                };
            }
            return this._groupTitleField;
        },
        enumerable: true,
        configurable: true
    });
    _ExportOptionEditor.prototype._globalize = function () {
        var globalizeElements = this.hostElement.querySelectorAll('[' + _ExportOptionEditor._optionNameAttr + ']');
        for (var i = 0; i < globalizeElements.length; i++) {
            var element = globalizeElements[i];
            if (element instanceof HTMLLegendElement) {
                element.innerHTML = this._groupTitle[element.getAttribute(_ExportOptionEditor._optionNameAttr)];
                continue;
            }
            element.innerHTML = this._getOptionLabel(element.getAttribute(_ExportOptionEditor._optionNameAttr));
        }
    };
    _ExportOptionEditor.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        _super.prototype.refresh.call(this, fullUpdate);
        if (fullUpdate) {
            this._optionLabels = null;
            this._groupTitleField = null;
            this._globalize();
        }
    };
    _ExportOptionEditor._optionIdAttr = 'option-id';
    _ExportOptionEditor._optionNameAttr = 'option-name';
    _ExportOptionEditor._skippedOptions = ['shapesWord2007Compatible', 'sheetName', 'navigatorPositions'];
    _ExportOptionEditor._generalGroupName = 'general';
    return _ExportOptionEditor;
}(wjcCore.Control));
exports._ExportOptionEditor = _ExportOptionEditor;
'use strict';
var _Toolbar = (function (_super) {
    __extends(_Toolbar, _super);
    function _Toolbar(element) {
        var _this = _super.call(this, element) || this;
        _this.svgButtonClicked = new wjcCore.Event();
        var tpl;
        tpl = _this.getTemplate();
        _this.applyTemplate('wj-toolbar', tpl, {
            _toolbarWrapper: 'toolbar-wrapper',
            _toolbarContainer: 'toolbar-container',
            _toolbarLeft: 'toolbar-left',
            _toolbarRight: 'toolbar-right'
        });
        _addEvent(_this._toolbarLeft, 'mouseover', function () { _this._scrollLeft(); });
        _addEvent(_this._toolbarLeft, 'mouseout', function () { _this._clearToolbarMoveTimer(); });
        _addEvent(_this._toolbarRight, 'mouseover', function () { _this._scrollRight(); });
        _addEvent(_this._toolbarRight, 'mouseout', function () { _this._clearToolbarMoveTimer(); });
        return _this;
    }
    _Toolbar.prototype.applyTemplate = function (css, tpl, parts) {
        var host = this.hostElement;
        wjcCore.addClass(host, css);
        host.appendChild(_toDOMs(tpl));
        if (parts) {
            for (var part in parts) {
                var wjPart = parts[part];
                this[part] = host.querySelector('[wj-part="' + wjPart + '"]');
                if (this[part] == null && host.getAttribute('wj-part') == wjPart) {
                    this[part] = tpl;
                }
                if (this[part] == null) {
                    throw 'Missing template part: "' + wjPart + '"';
                }
            }
        }
        return host;
    };
    _Toolbar.prototype._clearToolbarMoveTimer = function () {
        if (this._toolbarMoveTimer != null) {
            clearTimeout(this._toolbarMoveTimer);
            this._toolbarMoveTimer = null;
        }
    };
    _Toolbar.prototype._scrollRight = function () {
        var _this = this;
        var rightBtnWidth = this._toolbarRight.getBoundingClientRect().width, minLeft = this._toolbarContainer.getBoundingClientRect().width - this._toolbarWrapper.getBoundingClientRect().width, newLeft = this._toolbarWrapper.offsetLeft - rightBtnWidth - _Toolbar._moveStep;
        this._checkMoveButtonEnabled();
        if (newLeft < minLeft) {
            return;
        }
        this._toolbarWrapper.style.left = newLeft + 'px';
        this._toolbarMoveTimer = setTimeout(function () { return _this._scrollRight(); }, _Toolbar._moveInterval);
    };
    _Toolbar.prototype._scrollLeft = function () {
        var _this = this;
        var leftBtnWidth = this._toolbarLeft.getBoundingClientRect().width, newLeft = this._toolbarWrapper.offsetLeft - leftBtnWidth + _Toolbar._moveStep;
        this._checkMoveButtonEnabled();
        if (newLeft > 0) {
            return;
        }
        this._toolbarWrapper.style.left = newLeft + 'px';
        this._toolbarMoveTimer = setTimeout(function () { return _this._scrollLeft(); }, _Toolbar._moveInterval);
    };
    _Toolbar.prototype._checkMoveButtonEnabled = function () {
        var leftBtnWidth = this._toolbarLeft.getBoundingClientRect().width, newLeft = this._toolbarWrapper.offsetLeft - leftBtnWidth + _Toolbar._moveStep, leftBtnEnabled = newLeft <= 0, leftBtnHasEnableClass = wjcCore.hasClass(this._toolbarLeft, _Toolbar._enabledCss);
        if (leftBtnEnabled) {
            if (!leftBtnHasEnableClass) {
                wjcCore.addClass(this._toolbarLeft, _Toolbar._enabledCss);
            }
        }
        else {
            if (leftBtnHasEnableClass) {
                wjcCore.removeClass(this._toolbarLeft, _Toolbar._enabledCss);
            }
        }
        var rightBtnWidth = this._toolbarRight.getBoundingClientRect().width, minLeft = this._toolbarContainer.getBoundingClientRect().width - this._toolbarWrapper.getBoundingClientRect().width, newLeft = this._toolbarWrapper.offsetLeft - rightBtnWidth - _Toolbar._moveStep, rightBtnEnabled = newLeft >= minLeft, rightBtnHasEnabledClass = wjcCore.hasClass(this._toolbarRight, _Toolbar._enabledCss);
        if (rightBtnEnabled) {
            if (!rightBtnHasEnabledClass) {
                wjcCore.addClass(this._toolbarRight, _Toolbar._enabledCss);
            }
        }
        else if (rightBtnHasEnabledClass) {
            wjcCore.removeClass(this._toolbarRight, _Toolbar._enabledCss);
        }
    };
    _Toolbar.prototype._showToolbarMoveButton = function (show) {
        var visibility = show ? 'visible' : 'hidden';
        this._toolbarLeft.style.visibility = visibility;
        this._toolbarRight.style.visibility = visibility;
        this._checkMoveButtonEnabled();
    };
    _Toolbar.prototype._globalize = function () {
    };
    _Toolbar.prototype.resetWidth = function () {
        var toolbarLeftWidth = this._toolbarLeft.getBoundingClientRect().width;
        var toolbarRightWidth = this._toolbarRight.getBoundingClientRect().width;
        var toolbarWidth = this.hostElement.getBoundingClientRect().width;
        this._toolbarContainer.style.width = '1500px';
        this._toolbarWrapper.style.width = 'auto';
        var toolbarWrapperWidth = this._toolbarWrapper.getBoundingClientRect().width + 2;
        this._toolbarWrapper.style.width = toolbarWrapperWidth + 'px';
        this._toolbarContainer.style.width = toolbarWidth - toolbarLeftWidth - toolbarRightWidth + 'px';
        var showMoveButton = toolbarLeftWidth + toolbarRightWidth + toolbarWrapperWidth > toolbarWidth;
        this._showToolbarMoveButton(showMoveButton);
        if (!showMoveButton) {
            this._toolbarWrapper.style.left = '0px';
        }
    };
    _Toolbar.prototype.addSeparator = function () {
        var element = document.createElement('span');
        element.className = 'wj-separator';
        this._toolbarWrapper.appendChild(element);
        return element;
    };
    _Toolbar.prototype.onSvgButtonClicked = function (e) {
        this.svgButtonClicked.raise(this, e);
    };
    _Toolbar.prototype.addCustomItem = function (element, commandTag) {
        if (wjcCore.isString(element)) {
            element = _toDOM(element);
        }
        if (commandTag != null) {
            element.setAttribute(exports._commandTagAttr, commandTag.toString());
        }
        this._toolbarWrapper.appendChild(element);
    };
    _Toolbar.prototype.addSvgButton = function (title, svgContent, commandTag, isToggle) {
        var _this = this;
        var button = _createSvgBtn(svgContent);
        button.title = title;
        button.setAttribute(exports._commandTagAttr, commandTag.toString());
        this._toolbarWrapper.appendChild(button);
        _addEvent(button, 'click,keydown', function (event) {
            var e = event || window.event, needExe = (e.type === 'keydown' && e.keyCode === wjcCore.Key.Enter) || e.type === 'click';
            if (!needExe || _isDisabledImageButton(button) || (!isToggle && _isCheckedImageButton(button))) {
                return;
            }
            _this.onSvgButtonClicked({ commandTag: commandTag });
        });
        return button;
    };
    _Toolbar.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        _super.prototype.refresh.call(this, fullUpdate);
        if (fullUpdate) {
            this._globalize();
        }
    };
    _Toolbar._moveStep = 2;
    _Toolbar._moveInterval = 5;
    _Toolbar._enabledCss = 'enabled';
    _Toolbar.controlTemplate = '<div class="wj-toolbar-move left" wj-part="toolbar-left"><span class="wj-glyph-left"></span></div>' +
        '<div class="wj-toolbarcontainer" wj-part="toolbar-container">' +
        '<div class="wj-toolbarwrapper wj-btn-group" wj-part="toolbar-wrapper">' +
        '</div>' +
        '</div>' +
        '<div class="wj-toolbar-move right" wj-part="toolbar-right"><span class="wj-glyph-right"></span></div>';
    return _Toolbar;
}(wjcCore.Control));
exports._Toolbar = _Toolbar;
var _ViewerToolbarBase = (function (_super) {
    __extends(_ViewerToolbarBase, _super);
    function _ViewerToolbarBase(element, viewer) {
        var _this = _super.call(this, element) || this;
        _this._viewer = viewer;
        _this._initToolbarItems();
        var update = function () { return _this.isDisabled = !_this._viewer._getDocumentSource(); };
        _this._viewer._documentSourceChanged.addHandler(update);
        update();
        _this._viewer._viewerActionStatusChanged.addHandler(function (sender, e) {
            var action = e.action, actionElement = _this.hostElement.querySelector('[command-tag="' + action.actionType.toString() + '"]');
            _checkImageButton(actionElement, action.checked);
            _disableImageButton(actionElement, action.disabled);
            _showImageButton(actionElement, action.shown);
            _checkSeparatorShown(_this._toolbarWrapper);
        });
        return _this;
    }
    _ViewerToolbarBase.prototype._initToolbarItems = function () {
        throw wjcCore.culture.Viewer.abstractMethodException;
    };
    _ViewerToolbarBase.prototype.onSvgButtonClicked = function (e) {
        _super.prototype.onSvgButtonClicked.call(this, e);
        this._viewer._executeAction(parseInt(e.commandTag));
    };
    Object.defineProperty(_ViewerToolbarBase.prototype, "viewer", {
        get: function () {
            return this._viewer;
        },
        enumerable: true,
        configurable: true
    });
    _ViewerToolbarBase._initToolbarZoomValue = function (hostToolbar, viewer) {
        var toolbar = wjcCore.Control.getControl(hostToolbar), zoomDiv = document.createElement('div'), zoomValueCombo, temp, i, j, zoomValues = ViewerBase._defaultZoomValues;
        zoomDiv.className = 'wj-input-zoom';
        toolbar.addCustomItem(zoomDiv, _ViewerActionType.ZoomValue);
        zoomValueCombo = new wjcInput.ComboBox(zoomDiv);
        zoomValueCombo.deferUpdate(function () {
            for (i = 0; i < zoomValues.length; i++) {
                for (j = i + 1; j < zoomValues.length; j++) {
                    if (zoomValues[i].value > zoomValues[j].value) {
                        temp = zoomValues[i];
                        zoomValues[i] = zoomValues[j];
                        zoomValues[j] = temp;
                    }
                }
            }
            zoomValueCombo.itemsSource = zoomValues;
            zoomValueCombo.isEditable = true;
            zoomValueCombo.displayMemberPath = 'name';
            zoomValueCombo.selectedValuePath = 'value';
            zoomValueCombo.selectedValue = 1;
        });
        zoomValueCombo.selectedIndexChanged.addHandler(function () {
            if (zoomValueCombo.isDroppedDown) {
                var zoomFactor = zoomValueCombo.selectedValue;
                if (zoomFactor == null) {
                    var zoomFactorText = zoomValueCombo.text.replace(",", "");
                    zoomFactor = parseFloat(zoomFactorText);
                    if (isNaN(zoomFactor)) {
                        zoomFactor = 100;
                    }
                    zoomFactor = zoomFactor * 0.01;
                }
                viewer.zoomFactor = zoomFactor;
            }
        });
        _addEvent(zoomDiv, 'keypress', function (e) {
            var event = e || window.event, zoomText = zoomValueCombo.text, zoomFactor;
            if (event.keyCode === wjcCore.Key.Enter) {
                if (zoomText.lastIndexOf('%') === zoomText.length - 1) {
                    zoomText = zoomText.substring(0, zoomValueCombo.text.length - 1);
                }
                zoomText = zoomText.replace(",", "");
                zoomFactor = parseFloat(zoomText);
                if (!isNaN(zoomFactor)) {
                    viewer.zoomFactor = zoomFactor * 0.01;
                }
                else {
                    zoomValueCombo.text = wjcCore.Globalize.format(viewer.zoomFactor, 'p0');
                }
            }
        });
        _addEvent(zoomDiv.querySelector('.wj-form-control'), 'blur', function (e) {
            zoomValueCombo.text = wjcCore.Globalize.format(viewer.zoomFactor, 'p0');
        });
        viewer.zoomFactorChanged.addHandler(function () {
            zoomValueCombo.isDroppedDown = false;
            zoomValueCombo.text = wjcCore.Globalize.format(viewer.zoomFactor, 'p0');
        });
    };
    _ViewerToolbarBase._initToolbarPageNumberInput = function (hostToolbar, viewer) {
        var toolbar = wjcCore.Control.getControl(hostToolbar), pageNumberDiv = document.createElement('div'), pageCountSpan = document.createElement('span'), pageNumberInput, updatePageNumber = function () {
            var documentSource = viewer._getDocumentSource();
            if (!documentSource || documentSource.pageCount == null) {
                return;
            }
            pageNumberInput.value = viewer.pageIndex + 1;
        }, updatePageCount = function () {
            var documentSource = viewer._getDocumentSource();
            if (!documentSource || documentSource.pageCount == null) {
                return;
            }
            pageCountSpan.innerHTML = documentSource.pageCount.toString();
            pageNumberInput.max = documentSource.pageCount;
            pageNumberInput.min = Math.min(documentSource.pageCount, 1);
            updatePageNumber();
        }, sourceChanged = function () {
            var documentSource = viewer._getDocumentSource();
            if (!documentSource) {
                return;
            }
            updatePageCount();
            _addWjHandler(viewer._documentEventKey, documentSource.pageCountChanged, updatePageCount);
            _addWjHandler(viewer._documentEventKey, documentSource.loadCompleted, updatePageCount);
        };
        pageNumberDiv.className = 'wj-pagenumber';
        toolbar.addCustomItem(pageNumberDiv, _ViewerActionType.PageNumber);
        pageNumberInput = new wjcInput.InputNumber(pageNumberDiv);
        pageNumberInput.format = 'n0';
        _addEvent(pageNumberDiv, 'keyup', function (e) {
            var event = e || window.event;
            if (event.keyCode === wjcCore.Key.Enter) {
                viewer.moveToPage(pageNumberInput.value - 1);
            }
        });
        _addEvent(pageNumberInput.inputElement, 'blur', function (e) {
            viewer.moveToPage(pageNumberInput.value - 1);
        });
        toolbar.addCustomItem('<span class="slash">/</span>');
        pageCountSpan.className = 'wj-pagecount';
        toolbar.addCustomItem(pageCountSpan, _ViewerActionType.PageCountLabel);
        viewer.pageIndexChanged.addHandler(updatePageNumber);
        if (viewer._getDocumentSource()) {
            sourceChanged();
        }
        viewer._documentSourceChanged.addHandler(sourceChanged);
    };
    return _ViewerToolbarBase;
}(_Toolbar));
exports._ViewerToolbarBase = _ViewerToolbarBase;
var _ViewerToolbar = (function (_super) {
    __extends(_ViewerToolbar, _super);
    function _ViewerToolbar(element, viewer) {
        return _super.call(this, element, viewer) || this;
    }
    _ViewerToolbar.prototype._globalize = function () {
        var g = wjcCore.culture.Viewer;
        this._gPaginated.title = g.paginated;
        this._gPrint.title = g.print;
        this._gExports.title = g.exports;
        this._gPortrait.title = g.portrait;
        this._gLandscape.title = g.landscape;
        this._gPageSetup.title = g.pageSetup;
        this._gFirstPage.title = g.firstPage;
        this._gPreviousPage.title = g.previousPage;
        this._gNextPage.title = g.nextPage;
        this._gLastPage.title = g.lastPage;
        this._gBackwardHistory.title = g.backwardHistory;
        this._gForwardHistory.title = g.forwardHistory;
        this._gSelectTool.title = g.selectTool;
        this._gMoveTool.title = g.moveTool;
        this._gContinuousMode.title = g.continuousMode;
        this._gSingleMode.title = g.singleMode;
        this._gWholePage.title = g.wholePage;
        this._gPageWidth.title = g.pageWidth;
        this._gZoomOut.title = g.zoomOut;
        this._gZoomIn.title = g.zoomIn;
        this._gRubberbandTool.title = g.rubberbandTool;
        this._gMagnifierTool.title = g.magnifierTool;
        this._gRotateDocument.title = g.rotateDocument;
        this._gRotatePage.title = g.rotatePage;
        this._gFullScreen.title = g.fullScreen;
    };
    _ViewerToolbar.prototype._initToolbarItems = function () {
        this._gPaginated = this.addSvgButton(wjcCore.culture.Viewer.paginated, exports.icons.paginated, _ViewerActionType.TogglePaginated, true);
        this._gPrint = this.addSvgButton(wjcCore.culture.Viewer.print, exports.icons.print, _ViewerActionType.Print);
        this._gExports = this.addSvgButton(wjcCore.culture.Viewer.exports, exports.icons.exports, _ViewerActionType.ShowExportsPanel);
        this.addSeparator();
        this._gPortrait = this.addSvgButton(wjcCore.culture.Viewer.portrait, exports.icons.portrait, _ViewerActionType.Portrait);
        this._gLandscape = this.addSvgButton(wjcCore.culture.Viewer.landscape, exports.icons.landscape, _ViewerActionType.Landscape);
        this._gPageSetup = this.addSvgButton(wjcCore.culture.Viewer.pageSetup, exports.icons.pageSetup, _ViewerActionType.ShowPageSetupDialog);
        this.addSeparator();
        this._gFirstPage = this.addSvgButton(wjcCore.culture.Viewer.firstPage, exports.icons.firstPage, _ViewerActionType.FirstPage);
        this._gPreviousPage = this.addSvgButton(wjcCore.culture.Viewer.previousPage, exports.icons.previousPage, _ViewerActionType.PrePage);
        this._gNextPage = this.addSvgButton(wjcCore.culture.Viewer.nextPage, exports.icons.nextPage, _ViewerActionType.NextPage);
        this._gLastPage = this.addSvgButton(wjcCore.culture.Viewer.lastPage, exports.icons.lastPage, _ViewerActionType.LastPage);
        _ViewerToolbarBase._initToolbarPageNumberInput(this.hostElement, this.viewer);
        this.addSeparator();
        this._gBackwardHistory = this.addSvgButton(wjcCore.culture.Viewer.backwardHistory, exports.icons.backwardHistory, _ViewerActionType.Backward);
        this._gForwardHistory = this.addSvgButton(wjcCore.culture.Viewer.forwardHistory, exports.icons.forwardHistory, _ViewerActionType.Forward);
        this.addSeparator();
        this._gSelectTool = this.addSvgButton(wjcCore.culture.Viewer.selectTool, exports.icons.selectTool, _ViewerActionType.SelectTool);
        this._gMoveTool = this.addSvgButton(wjcCore.culture.Viewer.moveTool, exports.icons.moveTool, _ViewerActionType.MoveTool);
        this._gContinuousMode = this.addSvgButton(wjcCore.culture.Viewer.continuousMode, exports.icons.continuousView, _ViewerActionType.Continuous);
        this._gSingleMode = this.addSvgButton(wjcCore.culture.Viewer.singleMode, exports.icons.singleView, _ViewerActionType.Single);
        this.addSeparator();
        this._gWholePage = this.addSvgButton(wjcCore.culture.Viewer.wholePage, exports.icons.fitWholePage, _ViewerActionType.FitWholePage);
        this._gPageWidth = this.addSvgButton(wjcCore.culture.Viewer.pageWidth, exports.icons.fitPageWidth, _ViewerActionType.FitPageWidth);
        this._gZoomOut = this.addSvgButton(wjcCore.culture.Viewer.zoomOut, exports.icons.zoomOut, _ViewerActionType.ZoomOut);
        this._gZoomIn = this.addSvgButton(wjcCore.culture.Viewer.zoomIn, exports.icons.zoomIn, _ViewerActionType.ZoomIn);
        this._gRubberbandTool = this.addSvgButton(wjcCore.culture.Viewer.rubberbandTool, exports.icons.rubberbandTool, _ViewerActionType.RubberbandTool);
        this._gMagnifierTool = this.addSvgButton(wjcCore.culture.Viewer.magnifierTool, exports.icons.magnifierTool, _ViewerActionType.MagnifierTool);
        this._gRotateDocument = this.addSvgButton(wjcCore.culture.Viewer.rotateDocument, exports.icons.rotateDocument, _ViewerActionType.RotateDocument);
        this._gRotatePage = this.addSvgButton(wjcCore.culture.Viewer.rotatePage, exports.icons.rotatePage, _ViewerActionType.RotatePage);
        _ViewerToolbarBase._initToolbarZoomValue(this.hostElement, this.viewer);
        this._gFullScreen = this.addSvgButton(wjcCore.culture.Viewer.fullScreen, exports.icons.fullScreen, _ViewerActionType.ToggleFullScreen, true);
    };
    return _ViewerToolbar;
}(_ViewerToolbarBase));
exports._ViewerToolbar = _ViewerToolbar;
var _ViewerMiniToolbar = (function (_super) {
    __extends(_ViewerMiniToolbar, _super);
    function _ViewerMiniToolbar(element, viewer) {
        return _super.call(this, element, viewer) || this;
    }
    _ViewerMiniToolbar.prototype._initToolbarItems = function () {
        this._gPrint = this.addSvgButton(wjcCore.culture.Viewer.print, exports.icons.print, _ViewerActionType.Print);
        this.addSeparator();
        this._gPreviousPage = this.addSvgButton(wjcCore.culture.Viewer.previousPage, exports.icons.previousPage, _ViewerActionType.PrePage);
        this._gNextPage = this.addSvgButton(wjcCore.culture.Viewer.nextPage, exports.icons.nextPage, _ViewerActionType.NextPage);
        _ViewerToolbarBase._initToolbarPageNumberInput(this.hostElement, this.viewer);
        this.addSeparator();
        this._gZoomOut = this.addSvgButton(wjcCore.culture.Viewer.zoomOut, exports.icons.zoomOut, _ViewerActionType.ZoomOut);
        this._gZoomIn = this.addSvgButton(wjcCore.culture.Viewer.zoomIn, exports.icons.zoomIn, _ViewerActionType.ZoomIn);
        this._gExitFullScreen = this.addSvgButton(wjcCore.culture.Viewer.exitFullScreen, exports.icons.exitFullScreen, _ViewerActionType.ToggleFullScreen, true);
    };
    _ViewerMiniToolbar.prototype._globalize = function () {
        var g = wjcCore.culture.Viewer;
        this._gPrint.title = g.print;
        this._gPreviousPage.title = g.previousPage;
        this._gNextPage.title = g.nextPage;
        this._gZoomOut.title = g.zoomOut;
        this._gZoomIn.title = g.zoomIn;
        this._gExitFullScreen.title = g.exitFullScreen;
    };
    return _ViewerMiniToolbar;
}(_ViewerToolbarBase));
exports._ViewerMiniToolbar = _ViewerMiniToolbar;
var _ViewerMobileToolbarBase = (function (_super) {
    __extends(_ViewerMobileToolbarBase, _super);
    function _ViewerMobileToolbarBase(element, viewer) {
        var _this = _super.call(this, element, viewer) || this;
        wjcCore.addClass(_this.hostElement, 'mobile');
        return _this;
    }
    return _ViewerMobileToolbarBase;
}(_ViewerToolbarBase));
exports._ViewerMobileToolbarBase = _ViewerMobileToolbarBase;
var _ViewerMobileToolbar = (function (_super) {
    __extends(_ViewerMobileToolbar, _super);
    function _ViewerMobileToolbar(element, viewer) {
        return _super.call(this, element, viewer) || this;
    }
    _ViewerMobileToolbar.prototype._initToolbarItems = function () {
        this._gShowHamburgerMenu = this.addSvgButton(wjcCore.culture.Viewer.hamburgerMenu, exports.icons.hamburgerMenu, _ViewerActionType.ShowHamburgerMenu);
        this.viewer._initHamburgerMenu(this._gShowHamburgerMenu);
        this._gPrevPage = this.addSvgButton(wjcCore.culture.Viewer.previousPage, exports.icons.previousPage, _ViewerActionType.PrePage);
        this._gNextPage = this.addSvgButton(wjcCore.culture.Viewer.nextPage, exports.icons.nextPage, _ViewerActionType.NextPage);
        _ViewerToolbarBase._initToolbarPageNumberInput(this.hostElement, this.viewer);
        this._gShowViewMenu = this.addSvgButton(wjcCore.culture.Viewer.viewMenu, exports.icons.viewMenu, _ViewerActionType.ShowViewMenu);
        this.viewer._initViewMenu(this._gShowViewMenu);
        this._gShowSearchBar = this.addSvgButton(wjcCore.culture.Viewer.showSearchBar, exports.icons.search, _ViewerActionType.ShowSearchBar, true);
        this._gFullScreen = this.addSvgButton(wjcCore.culture.Viewer.fullScreen, exports.icons.fullScreen, _ViewerActionType.ToggleFullScreen, true);
    };
    _ViewerMobileToolbar.prototype._globalize = function () {
        var g = wjcCore.culture.Viewer;
        this._gShowHamburgerMenu.title = g.hamburgerMenu;
        this._gPrevPage.title = g.previousPage;
        this._gNextPage.title = g.nextPage;
        this._gShowViewMenu.title = g.viewMenu;
        this._gShowSearchBar.title = g.showSearchBar;
        this._gFullScreen.title = g.fullScreen;
    };
    return _ViewerMobileToolbar;
}(_ViewerMobileToolbarBase));
exports._ViewerMobileToolbar = _ViewerMobileToolbar;
var _ViewerZoomBar = (function (_super) {
    __extends(_ViewerZoomBar, _super);
    function _ViewerZoomBar(element, viewer) {
        var _this = _super.call(this, element, viewer) || this;
        wjcCore.addClass(_this.hostElement, 'wj-zoombar');
        return _this;
    }
    _ViewerZoomBar.prototype._initToolbarItems = function () {
        this._gZoomOut = this.addSvgButton(wjcCore.culture.Viewer.zoomOut, exports.icons.zoomOut, _ViewerActionType.ZoomOut);
        _ViewerToolbarBase._initToolbarZoomValue(this.hostElement, this.viewer);
        this._gZoomIn = this.addSvgButton(wjcCore.culture.Viewer.zoomIn, exports.icons.zoomIn, _ViewerActionType.ZoomIn);
    };
    _ViewerZoomBar.prototype._globalize = function () {
        var g = wjcCore.culture.Viewer;
        this._gZoomOut.title = g.zoomOut;
        this._gZoomIn.title = g.zoomIn;
    };
    return _ViewerZoomBar;
}(_ViewerMobileToolbarBase));
exports._ViewerZoomBar = _ViewerZoomBar;
var _SearchBar = (function (_super) {
    __extends(_SearchBar, _super);
    function _SearchBar(element, viewer) {
        return _super.call(this, element, viewer) || this;
    }
    _SearchBar.prototype._initToolbarItems = function () {
        this._gSearchOptions = this.addSvgButton(wjcCore.culture.Viewer.searchOptions, exports.icons.searchOptions, _ViewerActionType.ShowSearchOptions);
        this.viewer._initSearchOptionsMenu(this._gSearchOptions);
        this._initSearchInput();
        this._initSearchBtnGroups();
    };
    _SearchBar.prototype._initSearchInput = function () {
        var _this = this;
        var searchContainerHtml = '<div class="wj-searchcontainer">' +
            '<input class="wj-searchbox" wj-part="search-box" type="text"/>' +
            '<div class="wj-btn-group">' +
            '<button class="wj-btn wj-btn-search">' + _createSvgBtn(exports.icons.search).innerHTML + '</button>' +
            '</div>' +
            '</div>', searchContainer = _toDOM(searchContainerHtml), input = searchContainer.querySelector('input[type="text"]'), searchBtn = searchContainer.querySelector('.wj-btn-search');
        _addEvent(input, 'input', function () { _this.viewer._searchManager.text = input.value; });
        _addEvent(searchBtn, 'click', function () { _this.viewer._searchManager.search(); });
        this.viewer._searchManager.searchStarted.addHandler(function () {
            input.disabled = true;
        });
        this.viewer._searchManager.searchCompleted.addHandler(function () {
            input.disabled = false;
        });
        this.addCustomItem(searchContainer);
    };
    _SearchBar.prototype._initSearchBtnGroups = function () {
        var searchBtnGroupsHtml = '<div class="wj-searchbtn-groups wj-btn-group wj-toolbarwrapper">' +
            '</div>', searchBtnGroups = _toDOM(searchBtnGroupsHtml);
        this._gSearchPrev = this.addSvgButton(wjcCore.culture.Viewer.searchPrev, exports.icons.searchLeft, _ViewerActionType.SearchPrev);
        this._gSearchNext = this.addSvgButton(wjcCore.culture.Viewer.searchNext, exports.icons.searchRight, _ViewerActionType.SearchNext);
        searchBtnGroups.appendChild(this._gSearchPrev);
        searchBtnGroups.appendChild(this._gSearchNext);
        this.addCustomItem(searchBtnGroups);
    };
    _SearchBar.prototype._globalize = function () {
        var g = wjcCore.culture.Viewer;
        this._gSearchOptions.title = g.searchOptions;
        this._gSearchPrev.title = g.searchPrev;
        this._gSearchNext.title = g.searchNext;
    };
    return _SearchBar;
}(_ViewerMobileToolbarBase));
exports._SearchBar = _SearchBar;
'use strict';
var _RotateAngle;
(function (_RotateAngle) {
    _RotateAngle[_RotateAngle["NoRotate"] = 0] = "NoRotate";
    _RotateAngle[_RotateAngle["Rotation90"] = 1] = "Rotation90";
    _RotateAngle[_RotateAngle["Rotation180"] = 2] = "Rotation180";
    _RotateAngle[_RotateAngle["Rotation270"] = 3] = "Rotation270";
})(_RotateAngle = exports._RotateAngle || (exports._RotateAngle = {}));
var _Page = (function () {
    function _Page(documentSource, index, size) {
        this._content = null;
        this._rotateAngle = _RotateAngle.NoRotate;
        this.linkClicked = new wjcCore.Event();
        this._documentSource = documentSource;
        this._index = index;
        this._size = size;
    }
    Object.defineProperty(_Page.prototype, "index", {
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_Page.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_Page.prototype, "rotateAngle", {
        get: function () {
            return this._rotateAngle;
        },
        set: function (value) {
            this._rotateAngle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_Page.prototype, "content", {
        get: function () {
            return this._content;
        },
        enumerable: true,
        configurable: true
    });
    _Page.prototype.getContent = function () {
        var _this = this;
        var promise = new _Promise(), documentSource = this._documentSource;
        if (!documentSource) {
            promise.reject(wjcCore.culture.Viewer.cannotRenderPageNoDoc);
            return promise;
        }
        if (this._content) {
            promise.resolve(this._content);
            return promise;
        }
        documentSource.renderToFilter({
            format: 'html',
            paged: documentSource.paginated,
            outputRange: (this.index + 1).toString()
        }).then(function (data) {
            if (_this._documentSource !== documentSource) {
                return;
            }
            var tempDiv = document.createElement('div'), svg, g;
            tempDiv.innerHTML = _this._addGlobalUniqueId(data.responseText);
            var section = tempDiv.querySelector('section');
            var pageSize;
            if (section && section.style) {
                pageSize = { width: new _Unit(section.style.width), height: new _Unit(section.style.height) };
            }
            svg = tempDiv.querySelector('svg');
            g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            while (svg.hasChildNodes()) {
                g.appendChild(svg.firstChild);
            }
            svg.appendChild(g);
            _this._size = pageSize;
            _this._content = svg;
            _this._replaceActionLinks(svg);
            promise.resolve(_this._content);
        });
        return promise;
    };
    _Page.prototype._onLinkClicked = function (e) {
        this.linkClicked.raise(this, e);
    };
    _Page.prototype._replaceActionLinks = function (svg) {
        var self = this;
        var aList = svg.querySelectorAll('a');
        for (var i = 0; i < aList.length; i++) {
            var a = aList.item(i);
            var url = a.href ? a.href.baseVal : '';
            if (url.indexOf('navigate') > 0) {
                var result = _Page._bookmarkReg.exec(url);
                if (result) {
                    if (result[1] && result[1].length > 0) {
                        a.href.baseVal = _Page._invalidHref;
                        a.setAttribute(_Page._bookmarkAttr, result[1]);
                        _addEvent(a, 'click', function () { self._onLinkClicked(new _LinkClickedEventArgs(this)); });
                    }
                    else {
                        a.removeAttribute("xlink:href");
                    }
                }
            }
            else if (_Page._customActionReg.test(url)) {
                a.href.baseVal = _Page._invalidHref;
                a.setAttribute(_Page._customActionAttr, url.substr(3));
                _addEvent(a, 'click', function () { self._onLinkClicked(new _LinkClickedEventArgs(this)); });
            }
        }
    };
    _Page.prototype._addGlobalUniqueId = function (svgHtml) {
        var uniqueId = new Date().getTime().toString();
        svgHtml = svgHtml.replace(_Page._idReg, '$1$2' + uniqueId + '$3$4');
        svgHtml = svgHtml.replace(_Page._idReferReg, '$1$2' + uniqueId + '$3$4');
        return svgHtml;
    };
    _Page._bookmarkReg = /javascript\:navigate\(['|"](.*)['|"]\)/;
    _Page._bookmarkAttr = 'bookmark';
    _Page._customActionReg = /^CA\:/;
    _Page._customActionAttr = 'customAction';
    _Page._idReg = /(\<[^\>]+)(id=['|"])(\w+)(['|"])/g;
    _Page._idReferReg = /(\<[^\>]+)(url\(#)(\w+)(\))/g;
    _Page._invalidHref = 'javascript:void(0)';
    return _Page;
}());
exports._Page = _Page;
var _CompositePageView = (function (_super) {
    __extends(_CompositePageView, _super);
    function _CompositePageView(element) {
        var _this = _super.call(this, element) || this;
        _this._viewMode = ViewMode.Single;
        _this.pageIndexChanged = new wjcCore.Event();
        _this.zoomFactorChanged = new wjcCore.Event();
        _this.zoomModeChanged = new wjcCore.Event();
        _this.positionChanged = new wjcCore.Event();
        _this.rotateAngleChanged = new wjcCore.Event();
        var tpl;
        tpl = _this.getTemplate();
        _this.applyTemplate('wj-viewpanel-container', tpl, {
            _singlePageView: 'single-pageview',
            _continuousPageView: 'continuous-pageview'
        });
        _this._initPageView();
        return _this;
    }
    _CompositePageView.prototype.applyTemplate = function (css, tpl, parts) {
        var host = this.hostElement;
        wjcCore.addClass(host, css);
        host.appendChild(_toDOMs(tpl));
        if (parts) {
            for (var part in parts) {
                var wjPart = parts[part];
                this[part] = host.querySelector('[wj-part="' + wjPart + '"]');
                if (this[part] == null && host.getAttribute('wj-part') == wjPart) {
                    this[part] = tpl;
                }
                if (this[part] == null) {
                    throw 'Missing template part: "' + wjPart + '"';
                }
            }
        }
        return host;
    };
    Object.defineProperty(_CompositePageView.prototype, "pageIndex", {
        get: function () {
            return this._activePageView.pageIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_CompositePageView.prototype, "pages", {
        get: function () {
            return this._activePageView.pages;
        },
        set: function (value) {
            this._activePageView.pages = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_CompositePageView.prototype, "zoomMode", {
        get: function () {
            return this._activePageView.zoomMode;
        },
        set: function (value) {
            this._activePageView.zoomMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_CompositePageView.prototype, "zoomFactor", {
        get: function () {
            return this._activePageView.zoomFactor;
        },
        set: function (value) {
            this._activePageView.zoomFactor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_CompositePageView.prototype, "panMode", {
        get: function () {
            return this._activePageView.panMode;
        },
        set: function (value) {
            this._activePageView.panMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_CompositePageView.prototype, "viewMode", {
        get: function () {
            return this._viewMode;
        },
        set: function (value) {
            if (this._viewMode === value) {
                return;
            }
            this._viewMode = value;
            this._updateActivePageView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_CompositePageView.prototype, "scrollTop", {
        get: function () {
            return this._activePageView.scrollTop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_CompositePageView.prototype, "scrollLeft", {
        get: function () {
            return this._activePageView.scrollLeft;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_CompositePageView.prototype, "_activePageViewElement", {
        get: function () {
            return this.viewMode === ViewMode.Single ? this._singlePageView : this._continuousPageView;
        },
        enumerable: true,
        configurable: true
    });
    _CompositePageView.prototype.onPageIndexChanged = function () {
        this.pageIndexChanged.raise(this);
    };
    _CompositePageView.prototype.onZoomFactorChanged = function (oldValue, newValue) {
        this.zoomFactorChanged.raise(this, { oldValue: oldValue, newValue: newValue });
    };
    _CompositePageView.prototype.onZoomModeChanged = function (oldValue, newValue) {
        this.zoomModeChanged.raise(this, { oldValue: oldValue, newValue: newValue });
    };
    _CompositePageView.prototype.onPositionChanged = function () {
        this.positionChanged.raise(this);
    };
    _CompositePageView.prototype.onRotateAngleChanged = function () {
        this.rotateAngleChanged.raise(this);
    };
    _CompositePageView.prototype._updateActivePageView = function () {
        var currentPageIndex = this._activePageView.pageIndex, pages = this._activePageView.pages, zoomFactor = this._activePageView.zoomFactor, zoomMode = this._activePageView.zoomMode, panMode = this._activePageView.panMode;
        this._removePageViewHandlers(this._activePageView);
        this._activePageView = wjcCore.Control.getControl(this._activePageViewElement);
        this._addPageViewHandlers(this._activePageView);
        if (!this._activePageView.pages) {
            this._activePageView.pages = pages;
        }
        this._activePageView.invalidate();
        this._activePageView.moveToPage(currentPageIndex);
        this._activePageView.zoomFactor = zoomFactor;
        this._activePageView.zoomMode = zoomMode;
        this._activePageView.panMode = panMode;
        this._updatePageViewsVisible();
    };
    _CompositePageView.prototype._initPageView = function () {
        this._activePageView = new _SinglePageView(this._singlePageView);
        this._addPageViewHandlers(this._activePageView);
        new _ContinuousPageView(this._continuousPageView);
        this._updatePageViewsVisible();
    };
    _CompositePageView.prototype._addPageViewHandlers = function (pageView) {
        var _this = this;
        this._activePageView.pageIndexChanged.addHandler(function () {
            _this.onPageIndexChanged();
        });
        this._activePageView.zoomFactorChanged.addHandler(function (sender, e) {
            _this.onZoomFactorChanged(e.oldValue, e.newValue);
        });
        this._activePageView.zoomModeChanged.addHandler(function (sender, e) {
            _this.onZoomModeChanged(e.oldValue, e.newValue);
        });
        this._activePageView.positionChanged.addHandler(function () {
            _this.onPositionChanged();
        });
        this._activePageView.rotateAngleChanged.addHandler(function () {
            _this.onRotateAngleChanged();
        });
    };
    _CompositePageView.prototype._removePageViewHandlers = function (pageView) {
        pageView.pageIndexChanged.removeHandler(this.onPageIndexChanged, this);
        pageView.zoomFactorChanged.removeHandler(this.onZoomFactorChanged, this);
        pageView.zoomModeChanged.removeHandler(this.onZoomModeChanged, this);
        pageView.positionChanged.removeHandler(this.onPositionChanged, this);
        pageView.rotateAngleChanged.removeHandler(this.onRotateAngleChanged, this);
    };
    _CompositePageView.prototype._updatePageViewsVisible = function () {
        var showSingle = this.viewMode === ViewMode.Single;
        if (showSingle) {
            wjcCore.removeClass(this._singlePageView, exports._hiddenCss);
            if (!wjcCore.hasClass(this._continuousPageView, exports._hiddenCss)) {
                wjcCore.addClass(this._continuousPageView, exports._hiddenCss);
            }
        }
        else {
            wjcCore.removeClass(this._continuousPageView, exports._hiddenCss);
            if (!wjcCore.hasClass(this._singlePageView, exports._hiddenCss)) {
                wjcCore.addClass(this._singlePageView, exports._hiddenCss);
            }
        }
    };
    _CompositePageView.prototype.moveToPage = function (pageIndex) {
        return this._activePageView.moveToPage(pageIndex);
    };
    _CompositePageView.prototype.moveToPosition = function (position) {
        return this._activePageView.moveToPosition(position);
    };
    _CompositePageView.prototype.rotatePageTo = function (pageIndex, rotateAngle) {
        this._activePageView.rotatePageTo(pageIndex, rotateAngle);
    };
    _CompositePageView.prototype.hitTest = function (x, y) {
        return this._activePageView.hitTest(x, y);
    };
    _CompositePageView.prototype.resetPages = function () {
        wjcCore.Control.getControl(this._singlePageView).resetPages();
        wjcCore.Control.getControl(this._continuousPageView).resetPages();
    };
    _CompositePageView.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        _super.prototype.refresh.call(this, fullUpdate);
        wjcCore.Control.getControl(this._activePageViewElement).invalidate();
        this._activePageView.refresh();
    };
    _CompositePageView.prototype.isPageContentLoaded = function (pageIndex) {
        return this._activePageView.isPageContentLoaded(pageIndex);
    };
    _CompositePageView.controlTemplate = '<div class="wj-pageview" wj-part="single-pageview"></div>' +
        '<div class="wj-pageview" wj-part="continuous-pageview"></div>';
    return _CompositePageView;
}(wjcCore.Control));
exports._CompositePageView = _CompositePageView;
var _PageViewBase = (function (_super) {
    __extends(_PageViewBase, _super);
    function _PageViewBase(element) {
        var _this = _super.call(this, element) || this;
        _this._autoHeightCalculated = false;
        _this._startX = null;
        _this._startY = null;
        _this._panMode = false;
        _this._pageIndex = -1;
        _this._zoomFactor = 1.0;
        _this._zoomMode = ZoomMode.Custom;
        _this._zoomModeUpdating = false;
        _this.pageIndexChanged = new wjcCore.Event();
        _this.zoomFactorChanged = new wjcCore.Event();
        _this.zoomModeChanged = new wjcCore.Event();
        _this.positionChanged = new wjcCore.Event();
        _this.rotateAngleChanged = new wjcCore.Event();
        var tpl;
        tpl = _this.getTemplate();
        _this.applyTemplate('wj-pageview', tpl, _this._getTemplateParts());
        _this._fBorderBoxMode = getComputedStyle(element).boxSizing === 'border-box';
        _this._init();
        return _this;
    }
    _PageViewBase.prototype._getTemplateParts = function () {
        return {
            _pagesWrapper: 'pages-wrapper'
        };
    };
    _PageViewBase.prototype._getPagesContainer = function () {
        return this.hostElement;
    };
    _PageViewBase.prototype._init = function () {
        this._bindEvents();
    };
    _PageViewBase.prototype.dispose = function () {
        if (this._touchManager)
            this._touchManager.dispose();
        _super.prototype.dispose.call(this);
    };
    _PageViewBase.prototype._bindTouchEvents = function (touchManager) {
        var _this = this;
        touchManager.touchStart.addHandler(function () {
            _this.hostElement.focus();
        });
        touchManager.panMove.addHandler(function (sender, args) {
            touchManager.hostElement.scrollTop -= args.clientDelta.y;
            touchManager.hostElement.scrollLeft -= args.clientDelta.x;
        });
        touchManager.pinch.addHandler(this._zoomByPinch, this);
    };
    _PageViewBase.prototype._initTouchEvents = function () {
        var element = this._pagesWrapper.parentElement;
        var touchManager = new _TouchManager(element);
        this._touchManager = touchManager;
        this._bindTouchEvents(touchManager);
    };
    Object.defineProperty(_PageViewBase.prototype, "_borderBoxMode", {
        get: function () {
            return this._fBorderBoxMode;
        },
        enumerable: true,
        configurable: true
    });
    _PageViewBase.prototype._zoomByPinch = function (touchManager, args) {
        args.preventDefault();
        if (args.type != _TouchEventType.Move)
            return;
        var contentRect = wjcCore.getElementRect(touchManager.contentElement), contentStyle = getComputedStyle(touchManager.contentElement), contentMarignTop = parseInt(contentStyle.marginTop), contentMarignLeft = parseInt(contentStyle.marginLeft), contentCenter = _pointMove(false, args.preCenterClient, contentRect.left - contentMarignLeft, contentRect.top - contentMarignTop);
        this._zoom(touchManager.hostElement, args.zoom, contentCenter, args.centerClientDelta);
    };
    _PageViewBase.prototype._getFixedPosition = function (position) {
        return new wjcCore.Point(_PageViewBase._pageMargin, _PageViewBase._pageMargin + this._getAbovePageCount(position.y) * _PageViewBase._pageMargin);
    };
    _PageViewBase.prototype._getAbovePageCount = function (top) {
        return 0;
    };
    _PageViewBase.prototype._zoom = function (container, value, center, delta) {
        var preContainerCenter = _pointMove(false, center, container.scrollLeft, container.scrollTop), fixedPos = this._getFixedPosition(center);
        var lastZoomFactor = this.zoomFactor;
        this.zoomFactor = this.zoomFactor * value;
        var zoom = this.zoomFactor / lastZoomFactor;
        var newCenter = new wjcCore.Point((center.x - fixedPos.x) * zoom + fixedPos.x, (center.y - fixedPos.y) * zoom + fixedPos.y), containerCenter = _pointMove(true, preContainerCenter, delta), position = _pointMove(false, newCenter, containerCenter);
        container.scrollTop = Math.round(position.y);
        container.scrollLeft = Math.round(position.x);
    };
    Object.defineProperty(_PageViewBase.prototype, "pageIndex", {
        get: function () {
            return this._pageIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PageViewBase.prototype, "pages", {
        get: function () {
            return this._pages;
        },
        set: function (value) {
            this._pages = value;
            this._reserveViewPage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PageViewBase.prototype, "scrollTop", {
        get: function () {
            return this.hostElement.scrollTop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PageViewBase.prototype, "scrollLeft", {
        get: function () {
            return this.hostElement.scrollLeft;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PageViewBase.prototype, "zoomFactor", {
        get: function () {
            return this._zoomFactor;
        },
        set: function (value) {
            value = Math.max(0.05, Math.min(10, value));
            if (this._zoomFactor == value) {
                return;
            }
            var oldValue = this._zoomFactor;
            this._zoomFactor = value;
            this._updatePageViewTransform();
            if (!this._zoomModeUpdating) {
                this.zoomMode = ZoomMode.Custom;
            }
            this._onZoomFactorChanged(oldValue, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PageViewBase.prototype, "zoomMode", {
        get: function () {
            return this._zoomMode;
        },
        set: function (value) {
            if (this._zoomMode == value) {
                return;
            }
            this._zoomModeUpdating = true;
            var oldValue = this._zoomMode;
            this._calcZoomModeZoom(value);
            this._zoomMode = value;
            this._onZoomModeChanged(oldValue, value);
            this._zoomModeUpdating = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PageViewBase.prototype, "panMode", {
        get: function () {
            return this._panMode;
        },
        set: function (value) {
            if (this._panMode == value) {
                return;
            }
            this._panMode = value;
        },
        enumerable: true,
        configurable: true
    });
    _PageViewBase.prototype._bindEvents = function () {
        var _this = this;
        _addEvent(document, 'mousemove', function (e) {
            var isPanning = _this._startX !== null && _this._startY !== null;
            if (isPanning) {
                _this._panning(e);
            }
        });
        _addEvent(document, 'mouseup', function (e) {
            _this._stopPanning();
        });
        this._initTouchEvents();
    };
    _PageViewBase.prototype._startPanning = function (e) {
        this._startX = e.screenX;
        this._startY = e.screenY;
    };
    _PageViewBase.prototype._panning = function (e) {
        var pagesContainer = this._getPagesContainer();
        pagesContainer.scrollLeft += this._startX - e.screenX;
        pagesContainer.scrollTop += this._startY - e.screenY;
        this._startX = e.screenX;
        this._startY = e.screenY;
    };
    _PageViewBase.prototype._stopPanning = function () {
        this._startX = null;
        this._startY = null;
    };
    _PageViewBase.prototype._onPageIndexChanged = function () {
        this.pageIndexChanged.raise(this);
    };
    _PageViewBase.prototype._onZoomFactorChanged = function (oldValue, newValue) {
        this.zoomFactorChanged.raise(this, { oldValue: oldValue, newValue: newValue });
    };
    _PageViewBase.prototype._onZoomModeChanged = function (oldValue, newValue) {
        this.zoomModeChanged.raise(this, { oldValue: oldValue, newValue: newValue });
    };
    _PageViewBase.prototype._onPositionChanged = function () {
        this.positionChanged.raise(this);
    };
    _PageViewBase.prototype._onRotateAngleChanged = function () {
        this.rotateAngleChanged.raise(this);
    };
    _PageViewBase.prototype._onPageLoaded = function (pageIndex) {
    };
    _PageViewBase.prototype._renderViewPage = function (viewPage, pageIndex) {
        var _this = this;
        var loadingDiv, promise = new _Promise();
        pageIndex = pageIndex < 0 ? 0 : pageIndex;
        if (!viewPage) {
            promise.reject(wjcCore.culture.Viewer.cannotRenderPageNoViewPage);
            return promise;
        }
        _removeChildren(viewPage);
        if (this._pages[pageIndex].content) {
            var svg = this._pages[pageIndex].content;
            viewPage.appendChild(svg);
            this._setPageTransform(viewPage, pageIndex);
            promise.resolve(pageIndex);
            return promise;
        }
        loadingDiv = document.createElement('div');
        loadingDiv.className = 'wj-loading';
        loadingDiv.style.height = viewPage.style.height;
        loadingDiv.style.lineHeight = viewPage.style.height;
        loadingDiv.innerHTML = wjcCore.culture.Viewer.loading;
        viewPage.appendChild(loadingDiv);
        this._pages[pageIndex].getContent().then(function (content) {
            var svg = content;
            _removeChildren(viewPage);
            viewPage.appendChild(svg);
            _this._setPageTransform(viewPage, pageIndex);
            _this._onPageLoaded(pageIndex);
            promise.resolve(pageIndex);
        }).catch(function (reason) {
            loadingDiv.innerHTML = _getErrorMessage(reason);
        });
        return promise;
    };
    _PageViewBase.prototype._reserveViewPage = function () {
        throw wjcCore.culture.Viewer.abstractMethodException;
    };
    _PageViewBase.prototype._getViewPortHeight = function () {
        var style = this._pagesWrapper['currentStyle'] || window.getComputedStyle(this._pagesWrapper);
        return this.hostElement.offsetHeight - parseFloat(style.marginBottom) - parseFloat(style.marginTop);
    };
    _PageViewBase.prototype._getViewPortWidth = function () {
        var style = this._pagesWrapper['currentStyle'] || window.getComputedStyle(this._pagesWrapper);
        return this.hostElement.offsetWidth - parseFloat(style.marginLeft) - parseFloat(style.marginRight);
    };
    _PageViewBase.prototype._setPageTransform = function (viewPage, pageIndex) {
        var g, svg;
        if (!viewPage) {
            return;
        }
        var size = this._getPageSize(pageIndex);
        var rotateAngle = this._pages[pageIndex].rotateAngle;
        viewPage.style.height = size.height.valueInPixel * this._zoomFactor + 'px';
        viewPage.style.width = size.width.valueInPixel * this._zoomFactor + 'px';
        g = viewPage.querySelector('g');
        if (g) {
            g.parentNode.setAttribute('height', size.height.valueInPixel * this._zoomFactor + 'px');
            g.parentNode.setAttribute('width', size.width.valueInPixel * this._zoomFactor + 'px');
            _transformSvg(g.parentNode, this._pages[pageIndex].size.width.valueInPixel, this._pages[pageIndex].size.height.valueInPixel, this._zoomFactor, rotateAngle);
        }
    };
    _PageViewBase.prototype._addViewPage = function () {
        var _this = this;
        var viewPage = document.createElement('div');
        viewPage.className = 'wj-view-page';
        _addEvent(viewPage, 'mousedown', function (e) {
            if (!_this._panMode) {
                return;
            }
            _this._startPanning(e);
        });
        _addEvent(viewPage, 'dragstart', function (e) {
            if (!_this._panMode) {
                return;
            }
            e.preventDefault();
        });
        this._pagesWrapper.appendChild(viewPage);
        return viewPage;
    };
    _PageViewBase.prototype._getPageSize = function (pageIndex) {
        if (pageIndex < 0 || pageIndex >= this._pages.length) {
            return null;
        }
        var page = this._pages[pageIndex];
        return _getRotatedSize(page.size, page.rotateAngle);
    };
    _PageViewBase.prototype._render = function (pageIndex) {
        throw wjcCore.culture.Viewer.abstractMethodException;
    };
    _PageViewBase.prototype._moveToPagePosition = function (position) {
        throw wjcCore.culture.Viewer.abstractMethodException;
    };
    _PageViewBase.prototype._updatePageViewTransform = function () {
        throw wjcCore.culture.Viewer.abstractMethodException;
    };
    _PageViewBase.prototype._updatePageIndex = function (index) {
        if (!this.pages) {
            return;
        }
        index = this.resolvePageIndex(index);
        if (this._pageIndex === index) {
            return;
        }
        this._pageIndex = index;
        this._onPageIndexChanged();
    };
    _PageViewBase.prototype.moveToPage = function (pageIndex) {
        return this.moveToPosition({
            pageIndex: pageIndex
        });
    };
    _PageViewBase.prototype.resolvePageIndex = function (pageIndex) {
        return Math.min((this.pages || []).length - 1, Math.max(pageIndex, 0));
    };
    _PageViewBase.prototype.moveToPosition = function (position) {
        var _this = this;
        var pageIndex = position.pageIndex || 0, promise = new _Promise();
        if (!this.pages || pageIndex < 0) {
            promise.resolve(pageIndex);
            return promise;
        }
        pageIndex = this.resolvePageIndex(pageIndex);
        position.pageIndex = pageIndex;
        if (pageIndex !== this._pageIndex) {
            this._updatePageIndex(pageIndex);
            promise = this._render(pageIndex);
        }
        else {
            promise.resolve(pageIndex);
        }
        promise.then(function () { _this._moveToPagePosition(position); });
        return promise.then(function (_) {
            return pageIndex;
        }).then(function () {
            _this._calcZoomModeZoom();
            _this._onPositionChanged();
        });
    };
    _PageViewBase.prototype._calcZoomModeZoom = function (zoomMode) {
        this._zoomModeUpdating = true;
        zoomMode = zoomMode == null ? this.zoomMode : zoomMode;
        switch (zoomMode) {
            case ZoomMode.PageWidth:
                this._zoomToViewWidth();
                break;
            case ZoomMode.WholePage:
                this._zoomToView();
                break;
        }
        this._zoomModeUpdating = false;
    };
    _PageViewBase.prototype._zoomToView = function () {
        var viewHeight = this._getViewPortHeight(), viewWidth = this._getViewPortWidth(), pageSize = this._getPageSize(this.pageIndex);
        if (!pageSize) {
            return;
        }
        this.zoomFactor = Math.min(viewHeight / pageSize.height.valueInPixel, viewWidth / pageSize.width.valueInPixel);
    };
    _PageViewBase.prototype._zoomToViewWidth = function () {
        throw wjcCore.culture.Viewer.abstractMethodException;
    };
    _PageViewBase.prototype._getTransformedPoint = function (pageIndex, top, left) {
        top /= this.zoomFactor;
        left /= this.zoomFactor;
        var currentPage = this.pages[pageIndex], size = currentPage.size, rotateAngle = currentPage.rotateAngle;
        switch (rotateAngle) {
            case _RotateAngle.Rotation90:
                var tmpTop = top;
                top = size.height.valueInPixel - left;
                left = tmpTop;
                break;
            case _RotateAngle.Rotation180:
                top = size.height.valueInPixel - top;
                left = size.width.valueInPixel - left;
                break;
            case _RotateAngle.Rotation270:
                var tmpTop = top;
                top = left;
                left = size.width.valueInPixel - tmpTop;
                break;
        }
        return new wjcCore.Point(left, top);
    };
    _PageViewBase.prototype._hitTestPagePosition = function (pnt) {
        if (!pnt || pnt.pageIndex < 0) {
            return null;
        }
        var top = pnt.y, left = pnt.x, pageIndex = pnt.pageIndex;
        top -= _PageViewBase._pageMargin + _PageViewBase._pageBorderWidth;
        left -= _PageViewBase._pageMargin + _PageViewBase._pageBorderWidth;
        var transformedPoint = this._getTransformedPoint(pnt.pageIndex, top, left);
        top = transformedPoint.y;
        left = transformedPoint.x;
        var pageY = _pixelToTwip(top), pageX = _pixelToTwip(left), size = this.pages[pageIndex].size, hitWorkingArea = top >= 0 && top <= size.height.valueInPixel &&
            left >= 0 && left <= size.width.valueInPixel;
        return {
            pageIndex: pageIndex,
            x: pageX,
            y: pageY,
            hitWorkingArea: hitWorkingArea
        };
    };
    _PageViewBase.prototype.rotatePageTo = function (pageIndex, rotateAngle) {
        var currentPage = this._pages[pageIndex];
        currentPage.rotateAngle = rotateAngle;
        this._updatePageViewTransform();
        this._onRotateAngleChanged();
    };
    _PageViewBase.prototype.hitTest = function (clientX, clientY) {
        if (this._pointInViewPanelClientArea(clientX, clientY)) {
            var point = this._panelViewPntToPageView(clientX, clientY);
            return this._hitTestPagePosition(point);
        }
        return null;
    };
    _PageViewBase.prototype.resetPages = function () {
        this._pageIndex = -1;
        this._pages = null;
        _removeChildren(this._pagesWrapper);
        this._addViewPage();
        this.invalidate();
    };
    _PageViewBase.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        _super.prototype.refresh.call(this, fullUpdate);
        this._autoHeightCalculated = false;
        if (!this.pages || this.pages.length == 0 ||
            this.pageIndex < 0 || this.pageIndex >= this.pages.length) {
            return;
        }
        this._render(this.pageIndex);
        this._calcZoomModeZoom();
    };
    _PageViewBase.prototype.isPageContentLoaded = function (pageIndex) {
        var p = this.pages;
        return (!!p && (pageIndex >= 0) && (pageIndex < p.length) && !!p[pageIndex].content);
    };
    _PageViewBase.prototype._hitTestPageIndex = function (top) {
        throw wjcCore.culture.Viewer.abstractMethodException;
    };
    _PageViewBase.prototype._pointInViewPanelClientArea = function (clientX, clientY) {
        throw wjcCore.culture.Viewer.abstractMethodException;
    };
    _PageViewBase.prototype._panelViewPntToPageView = function (clientX, clientY) {
        throw wjcCore.culture.Viewer.abstractMethodException;
    };
    _PageViewBase._pageMargin = 30;
    _PageViewBase._pageBorderWidth = 1;
    _PageViewBase.controlTemplate = '<div class="wj-pages-wrapper" wj-part="pages-wrapper"></div>';
    return _PageViewBase;
}(wjcCore.Control));
exports._PageViewBase = _PageViewBase;
var _Scroller = (function (_super) {
    __extends(_Scroller, _super);
    function _Scroller() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _Scroller.getScrollbarWidth = function (refresh) {
        var parent, child;
        if (!_Scroller._scrollbarWidth || refresh) {
            parent = document.createElement('div');
            parent.style.width = '50px';
            parent.style.height = '50px';
            parent.style.overflow = 'auto';
            document.body.appendChild(parent);
            child = document.createElement('div');
            child.style.height = '60px';
            parent.appendChild(child);
            _Scroller._scrollbarWidth = parent.offsetWidth - parent.clientWidth;
            document.body.removeChild(parent);
        }
        return _Scroller._scrollbarWidth;
    };
    _Scroller._scrollbarWidth = null;
    return _Scroller;
}(wjcCore.Control));
exports._Scroller = _Scroller;
var _VScroller = (function (_super) {
    __extends(_VScroller, _super);
    function _VScroller(element) {
        var _this = _super.call(this, element) || this;
        _this._height = 100;
        _this._max = 100;
        _this._desiredValue = 0;
        _this.valueChanged = new wjcCore.Event();
        var tpl;
        tpl = _this.getTemplate();
        _this.applyTemplate(null, tpl, {
            _wrapper: 'wrapper'
        });
        _this.hostElement.style.width = _Scroller.getScrollbarWidth() + 1 + 'px';
        _addEvent(_this.hostElement, "scroll", function () {
            _this.onValueChanged();
        });
        return _this;
    }
    _VScroller.prototype.onValueChanged = function () {
        if (this._desiredValue == this.value) {
            return;
        }
        this.valueChanged.raise(this);
    };
    _VScroller.prototype.preventScrollEvent = function () {
        this._desiredValue = this.hostElement.scrollTop;
    };
    Object.defineProperty(_VScroller.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            if (value === this._height) {
                return;
            }
            this._height = value;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_VScroller.prototype, "value", {
        get: function () {
            return this.hostElement.scrollTop;
        },
        set: function (value) {
            this.hostElement.scrollTop = value;
            this.preventScrollEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_VScroller.prototype, "max", {
        get: function () {
            return this._max;
        },
        set: function (value) {
            if (this._max === value) {
                return;
            }
            this._max = value;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    _VScroller.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        _super.prototype.refresh.call(this, fullUpdate);
        var hostHeight = this._height + 'px';
        if (this.hostElement.style.height !== hostHeight) {
            this.hostElement.style.height = hostHeight;
        }
        var contentHeight = (this._max + this.hostElement.clientHeight) + 'px';
        if (this._wrapper.style.height !== contentHeight) {
            this._wrapper.style.height = contentHeight;
        }
        this.preventScrollEvent();
    };
    _VScroller.controlTemplate = '<div class="wj-vscroller-wrapper" wj-part="wrapper"></div>';
    return _VScroller;
}(_Scroller));
exports._VScroller = _VScroller;
var _SinglePageView = (function (_super) {
    __extends(_SinglePageView, _super);
    function _SinglePageView(element) {
        var _this = _super.call(this, element) || this;
        _this._innerNavigating = false;
        _this._virtualScrollMode = true;
        wjcCore.addClass(element, "wj-pageview-single");
        return _this;
    }
    _SinglePageView.prototype._init = function () {
        _super.prototype._init.call(this);
        this._initScroller();
        this._initEvents();
    };
    _SinglePageView.prototype._initScroller = function () {
        var _this = this;
        var scroller = new _VScroller(this._vscroller);
        scroller.valueChanged.addHandler(function () {
            setTimeout(function () { return _this._doScrollerValueChanged(); });
        });
    };
    _SinglePageView.prototype._initEvents = function () {
        var _this = this;
        _addEvent(this._pagesContainer, 'wheel', function (e) {
            _this._doContainerWheel(e);
        });
        _addEvent(this._pagesContainer, 'scroll', function (e) {
            _this._doContainerScroll();
        });
        _addEvent(this._pagesContainer, 'keydown', function (e) {
            _this._doContainerKeyDown();
        });
        _addEvent(this._pagesContainer, 'click', function (e) {
            _this._pagesContainer.focus();
        });
    };
    _SinglePageView.prototype._bindTouchEvents = function (touchManager) {
        var _this = this;
        _super.prototype._bindTouchEvents.call(this, touchManager);
        touchManager.swipe.addHandler(function (sender, args) {
            switch (args.direction) {
                case _TouchDirection.Down:
                    var preIndex = _this.resolvePageIndex(_this.pageIndex - 1);
                    if (preIndex != _this.pageIndex) {
                        _this.moveToPage(preIndex);
                    }
                    break;
                case _TouchDirection.Up:
                    var nextIndex = _this.resolvePageIndex(_this.pageIndex + 1);
                    if (nextIndex != _this.pageIndex) {
                        _this.moveToPage(nextIndex);
                    }
                    break;
            }
        });
    };
    _SinglePageView.prototype._getTemplateParts = function () {
        return {
            _pagesWrapper: 'pages-wrapper',
            _pagesContainer: 'pages-container',
            _vscroller: 'vscroller'
        };
    };
    _SinglePageView.prototype.applyTemplate = function (css, tpl, parts) {
        var host = this.hostElement;
        wjcCore.addClass(host, css);
        host.appendChild(_toDOMs(tpl));
        if (parts) {
            for (var part in parts) {
                var wjPart = parts[part];
                this[part] = host.querySelector('[wj-part="' + wjPart + '"]');
                if (this[part] == null && host.getAttribute('wj-part') == wjPart) {
                    this[part] = tpl;
                }
                if (this[part] == null) {
                    throw 'Missing template part: "' + wjPart + '"';
                }
            }
        }
        return host;
    };
    Object.defineProperty(_SinglePageView.prototype, "virtualScrollMode", {
        get: function () {
            return this._virtualScrollMode;
        },
        set: function (value) {
            if (this._virtualScrollMode === value) {
                return;
            }
            this._virtualScrollMode = value;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_SinglePageView.prototype, "_isScrollerVisible", {
        get: function () {
            return this._virtualScrollMode && this.pages && this.pages.length > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_SinglePageView.prototype, "_scroller", {
        get: function () {
            return wjcCore.Control.getControl(this._vscroller);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_SinglePageView.prototype, "_hasPageVScrollBar", {
        get: function () {
            return _hasScrollbar(this._pagesContainer);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_SinglePageView.prototype, "_hasPageHScrollBar", {
        get: function () {
            return _hasScrollbar(this._pagesContainer, true);
        },
        enumerable: true,
        configurable: true
    });
    _SinglePageView.prototype._getPagesContainer = function () {
        return this._pagesContainer;
    };
    _SinglePageView.prototype._getPageHeightWithoutZoom = function (pageIndex) {
        var minHeigth = this._pagesContainer.clientHeight;
        var pageHeight = this._getPageSize(pageIndex).height.valueInPixel + _PageViewBase._pageMargin * 2;
        return Math.max(pageHeight, minHeigth);
    };
    _SinglePageView.prototype._updateScroller = function () {
        if (!this._isScrollerVisible)
            return;
        var scroller = this._scroller;
        scroller.height = this._pagesContainer.clientHeight;
        var maxValue = 0;
        for (var index = 0; index < this.pages.length; index++) {
            maxValue += this._getPageHeightWithoutZoom(index);
        }
        scroller.max = maxValue;
        this._updateScrollerValue();
    };
    _SinglePageView.prototype._updateScrollerValue = function () {
        if (!this._isScrollerVisible)
            return;
        var pageIndex = this.pageIndex;
        if (pageIndex < 0) {
            return;
        }
        var pagePercent = 0;
        if (this._pagesContainer.scrollTop > 0) {
            pagePercent = this._pagesContainer.scrollTop / (this._pagesContainer.scrollHeight - this._pagesContainer.clientHeight);
        }
        var scroller = this._scroller;
        var pageCount = this.pages.length;
        var value = 0;
        for (var index = 0; index < pageIndex; index++) {
            value += this._getPageHeightWithoutZoom(index);
        }
        var pageHeight = this._getPageHeightWithoutZoom(pageIndex);
        value += pageHeight * pagePercent;
        if (pageIndex >= pageCount - 1 && !this._hasPageVScrollBar) {
            value = scroller.max;
        }
        scroller.value = value;
    };
    _SinglePageView.prototype._doScrollerValueChanged = function () {
        if (!this._isScrollerVisible)
            return;
        var scroller = this._scroller;
        var pageCount = this.pages.length;
        var value = scroller.value;
        var pageIndex = 0, pagePercent = 1;
        for (; pageIndex < pageCount; pageIndex++) {
            var pageHeight = this._getPageHeightWithoutZoom(pageIndex);
            if (value > pageHeight) {
                value -= pageHeight;
                continue;
            }
            else {
                pagePercent = value / pageHeight;
                break;
            }
        }
        if (pageIndex >= pageCount) {
            pageIndex = pageCount - 1;
        }
        this._innerMoveToPage(pageIndex, pagePercent);
    };
    _SinglePageView.prototype._doContainerWheel = function (e) {
        if (!this._isScrollerVisible)
            return;
        if (e.deltaY == 0) {
            return;
        }
        var isScrollUp = e.deltaY < 0;
        if (this._hasPageVScrollBar) {
            if (isScrollUp) {
                if (this._pagesContainer.scrollTop > 0) {
                    return;
                }
            }
            else {
                if (this._pagesContainer.scrollTop < this._pagesContainer.scrollHeight - this._pagesContainer.clientHeight) {
                    return;
                }
            }
        }
        if (isScrollUp) {
            this._innerMoveToPreviousPageAtBottom(e);
        }
        else {
            this._innerMoveToNextPageAtTop(e);
        }
    };
    _SinglePageView.prototype._doContainerScroll = function () {
        if (!this._isScrollerVisible)
            return;
        if (this._pagesContainer.scrollTop == this._desiredPageScrollTop) {
            return;
        }
        this._updateScrollerValue();
        this._onPositionChanged();
    };
    _SinglePageView.prototype._doContainerKeyDown = function () {
        if (!this._isScrollerVisible)
            return;
        var e = event;
        if (this._hasPageVScrollBar) {
            switch (e.keyCode) {
                case wjcCore.Key.PageDown: {
                    if (this._pagesContainer.scrollTop >= this._pagesContainer.scrollHeight - this._pagesContainer.clientHeight) {
                        this._innerMoveToNextPageAtTop(e);
                    }
                    break;
                }
                case wjcCore.Key.PageUp: {
                    if (this._pagesContainer.scrollTop == 0) {
                        this._innerMoveToPreviousPageAtBottom(e);
                    }
                    break;
                }
            }
        }
        else {
            switch (e.keyCode) {
                case wjcCore.Key.Down:
                case wjcCore.Key.PageDown: {
                    this._innerMoveToNextPageAtTop(e);
                    break;
                }
                case wjcCore.Key.Up:
                case wjcCore.Key.PageUp: {
                    this._innerMoveToPreviousPageAtBottom(e);
                    break;
                }
            }
        }
    };
    _SinglePageView.prototype._preventContainerScroll = function () {
        this._desiredPageScrollTop = this._pagesContainer.scrollTop;
    };
    _SinglePageView.prototype._innerMoveToPreviousPageAtBottom = function (e) {
        if (this.pageIndex > 0) {
            if (e) {
                e.preventDefault();
            }
            this._innerMoveToPage(this.pageIndex - 1, 1);
            this._updateScrollerValue();
        }
    };
    _SinglePageView.prototype._innerMoveToNextPageAtTop = function (e) {
        if (this.pageIndex < this.pages.length - 1) {
            if (e) {
                e.preventDefault();
            }
            this._innerMoveToPage(this.pageIndex + 1, 0);
            this._updateScrollerValue();
        }
    };
    _SinglePageView.prototype._innerMoveToPage = function (pageIndex, pagePercent) {
        var _this = this;
        this._innerNavigating = true;
        var position = { pageIndex: pageIndex };
        this.moveToPosition(position).then(function (_) {
            _this._innerMoveToPagePosition(pagePercent);
            _this._innerNavigating = false;
        });
    };
    _SinglePageView.prototype._innerMoveToPagePosition = function (pagePercent) {
        if (!this._hasPageVScrollBar) {
            return;
        }
        var scrollTop = (this._pagesContainer.scrollHeight - this._pagesContainer.clientHeight) * pagePercent;
        this._pagesContainer.scrollTop = scrollTop;
        this._preventContainerScroll();
    };
    _SinglePageView.prototype.moveToPosition = function (position) {
        var promise = _super.prototype.moveToPosition.call(this, position);
        if (!this._innerNavigating) {
            this._updateScrollerValue();
        }
        return promise;
    };
    _SinglePageView.prototype._moveToPagePosition = function (position) {
        var bound = position.pageBounds || { x: 0, y: 0, width: 0, height: 0 }, margin = position.pageBounds ? _PageViewBase._pageMargin : 0, currentPage = this.pages[this.pageIndex], offsetPoint = _getTransformedPosition(bound, currentPage.size, currentPage.rotateAngle, this.zoomFactor);
        this._pagesContainer.scrollTop = offsetPoint.y + margin;
        this._pagesContainer.scrollLeft = offsetPoint.x + margin;
    };
    _SinglePageView.prototype._hitTestPageIndex = function (top) {
        return this.pageIndex;
    };
    _SinglePageView.prototype._pointInViewPanelClientArea = function (clientX, clientY) {
        return (clientX >= 0) &&
            (clientY >= 0) &&
            (clientX < this._pagesContainer.clientWidth) &&
            (clientY < this._pagesContainer.clientHeight);
    };
    _SinglePageView.prototype._panelViewPntToPageView = function (clientX, clientY) {
        if (this.pageIndex < 0) {
            return null;
        }
        var top = this._pagesContainer.scrollTop + clientY, left = 0;
        if (this._pagesContainer.scrollLeft > 0) {
            left = this._pagesContainer.scrollLeft + clientX;
        }
        else {
            var containerRect = this._pagesContainer.getBoundingClientRect(), wrapperRect = this._pagesWrapper.getBoundingClientRect();
            left = clientX - (wrapperRect.left - containerRect.left) + _PageViewBase._pageMargin;
        }
        return { x: left, y: top, pageIndex: this.pageIndex };
    };
    _SinglePageView.prototype._render = function (pageIndex) {
        return this._renderViewPage(this._pagesWrapper.querySelector('.wj-view-page'), pageIndex);
    };
    _SinglePageView.prototype._guessPageIndex = function () {
        return this.pageIndex;
    };
    _SinglePageView.prototype._reserveViewPage = function () {
        _removeChildren(this._pagesWrapper);
        this._addViewPage();
        this.invalidate();
    };
    _SinglePageView.prototype._updatePageViewTransform = function () {
        var viewPages, viewPage;
        viewPage = this._pagesWrapper.querySelector('.wj-view-page');
        this._setPageTransform(viewPage, this.pageIndex);
    };
    _SinglePageView.prototype._onPageLoaded = function (pageIndex) {
        _super.prototype._onPageLoaded.call(this, pageIndex);
        this._updateScroller();
    };
    _SinglePageView.prototype._onZoomFactorChanged = function (oldValue, newValue) {
        _super.prototype._onZoomFactorChanged.call(this, oldValue, newValue);
        this._updateScroller();
    };
    _SinglePageView.prototype._zoomToViewWidth = function () {
        var viewHeight, viewWidth;
        viewHeight = this._getViewPortHeight();
        viewWidth = this._getViewPortWidth();
        var pageSize = this._getPageSize(this.pageIndex);
        if (!pageSize) {
            return;
        }
        var pageHeight = pageSize.height.valueInPixel;
        var pageWidth = pageSize.width.valueInPixel;
        if (viewWidth / pageWidth > viewHeight / pageHeight) {
            viewWidth -= _Scroller.getScrollbarWidth();
        }
        this.zoomFactor = viewWidth / pageWidth;
    };
    _SinglePageView.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        _super.prototype.refresh.call(this, fullUpdate);
        if (this._isScrollerVisible) {
            wjcCore.addClass(this.hostElement, "virtual");
        }
        else {
            wjcCore.removeClass(this.hostElement, "virtual");
        }
        this._updateScroller();
    };
    _SinglePageView.controlTemplate = '<div class="wj-pageview-pagescontainer" wj-part="pages-container" tabindex="0">' +
        '   <div class="wj-pages-wrapper" wj-part="pages-wrapper"></div>' +
        '</div>' +
        '<div class="wj-pageview-vscroller" wj-part="vscroller" tabindex="-1"></div> ';
    return _SinglePageView;
}(_PageViewBase));
exports._SinglePageView = _SinglePageView;
var _ContinuousPageView = (function (_super) {
    __extends(_ContinuousPageView, _super);
    function _ContinuousPageView(element) {
        var _this = _super.call(this, element) || this;
        wjcCore.addClass(element, "wj-pageview-continuous");
        return _this;
    }
    _ContinuousPageView.prototype._init = function () {
        var _this = this;
        _super.prototype._init.call(this);
        _addEvent(this.hostElement, 'click', function (e) {
            _this.hostElement.focus();
        });
        _addEvent(this.hostElement, 'scroll', function () {
            _this._onPositionChanged();
            clearTimeout(_this._scrollingTimer);
            _this._scrollingTimer = setTimeout(function () {
                _this._ensurePageIndexPosition();
            }, 200);
        });
        this.zoomFactorChanged.addHandler(function () {
            clearTimeout(_this._zoomFactorTimer);
            _this._zoomFactorTimer = setTimeout(function () {
                _this._ensurePageIndexPosition();
            }, 200);
        });
    };
    _ContinuousPageView.prototype.dispose = function () {
        clearTimeout(this._scrollingTimer);
        clearTimeout(this._zoomFactorTimer);
        if (this._disposeBodyStopSwipe) {
            this._disposeBodyStopSwipe();
        }
        _super.prototype.dispose.call(this);
    };
    _ContinuousPageView.prototype._stopSwip = function () {
        if (this._swipeSpeedReducer) {
            this._swipeSpeedReducer.stop();
        }
    };
    _ContinuousPageView.prototype._bindTouchEvents = function (touchManager) {
        var _this = this;
        _super.prototype._bindTouchEvents.call(this, touchManager);
        touchManager.touchStart.addHandler(this._stopSwip, this);
        touchManager.swipe.addHandler(function (sender, args) {
            if (!_this._swipeSpeedReducer)
                _this._swipeSpeedReducer = new _SpeedReducer();
            _this._swipeSpeedReducer.start(args.speed.x, args.speed.y, function (x, y) {
                var oldLeft = touchManager.hostElement.scrollLeft, oldTop = touchManager.hostElement.scrollTop;
                touchManager.hostElement.scrollLeft -= x;
                touchManager.hostElement.scrollTop -= y;
                if (oldLeft == touchManager.hostElement.scrollLeft
                    && oldTop == touchManager.hostElement.scrollTop) {
                    _this._stopSwip();
                }
            });
        });
        var bodyTouchManager = new _TouchManager(document.body, false), stopSwip = this._stopSwip.bind(this);
        _addEvent(document.body, 'mousedown', stopSwip, true);
        bodyTouchManager.touchStart.addHandler(stopSwip);
        this._disposeBodyStopSwipe = function () {
            _this._stopSwip();
            _removeEvent(document.body, 'mousedown', stopSwip);
            bodyTouchManager.touchStart.removeHandler(stopSwip);
            bodyTouchManager.dispose();
            _this._disposeBodyStopSwipe = null;
        };
    };
    _ContinuousPageView.prototype._getAbovePageCount = function (top) {
        return this._hitTestPageIndex(top);
    };
    _ContinuousPageView.prototype.refresh = function (fullUpdate) {
        this._stopSwip();
        _super.prototype.refresh.call(this, fullUpdate);
    };
    _ContinuousPageView.prototype._hitTestPageIndex = function (top) {
        if (!this.pages) {
            return this.pageIndex;
        }
        var index = 0, pageEndPosition = 0;
        for (; index < this.pages.length; index++) {
            pageEndPosition += this._getPageSize(index).height.valueInPixel * this.zoomFactor + _PageViewBase._pageMargin;
            if (top < pageEndPosition) {
                if (pageEndPosition - top < 1) {
                    continue;
                }
                break;
            }
        }
        return Math.min(index, this.pages.length - 1);
    };
    _ContinuousPageView.prototype._guessPageIndex = function () {
        var result;
        if (this.pages && (this.hostElement.scrollHeight - this.hostElement.clientHeight <= this.hostElement.scrollTop)) {
            result = this.pages.length - 1;
        }
        else {
            result = this._hitTestPageIndex(this.hostElement.scrollTop);
        }
        return result;
    };
    _ContinuousPageView.prototype._render = function (pageIndex) {
        var pageCount = this.pages.length, start = pageIndex - _ContinuousPageView._preFetchPageCount, end = pageIndex + _ContinuousPageView._preFetchPageCount, promises = [];
        start = start < 0 ? 0 : start;
        end = end > pageCount - 1 ? pageCount - 1 : end;
        for (var i = start; i <= end; i++) {
            promises.push(this._renderViewPage(this._pagesWrapper.querySelectorAll('.wj-view-page').item(i), i));
        }
        return new _CompositedPromise(promises);
    };
    _ContinuousPageView.prototype._moveToPagePosition = function (position) {
        this._stopSwip();
        var pageHeight, scrollTop = 0, scrollLeft = 0, moveToPage = !position.pageBounds, bound = position.pageBounds || { x: 0, y: 0, width: 0, height: 0 }, margin = moveToPage ? 0 : _PageViewBase._pageMargin, currentPage = this.pages[this.pageIndex];
        for (var index = 0; index < position.pageIndex; index++) {
            pageHeight = this._getPageSize(index).height.valueInPixel * this.zoomFactor;
            scrollTop += pageHeight + _PageViewBase._pageMargin;
            if (!this._borderBoxMode) {
                scrollTop += _PageViewBase._pageBorderWidth * 2;
            }
        }
        var offsetPoint = _getTransformedPosition(bound, currentPage.size, moveToPage
            ? _RotateAngle.NoRotate
            : currentPage.rotateAngle, this.zoomFactor);
        scrollTop += offsetPoint.y + margin;
        scrollLeft += offsetPoint.x + margin;
        scrollLeft += this._getPageViewOffsetLeft(position.pageIndex);
        this.hostElement.scrollTop = scrollTop;
        this.hostElement.scrollLeft = scrollLeft;
    };
    _ContinuousPageView.prototype._pointInViewPanelClientArea = function (clientX, clientY) {
        return (clientX >= 0) &&
            (clientY >= 0) &&
            (clientX < this.hostElement.clientWidth) &&
            (clientY < this.hostElement.clientHeight);
    };
    _ContinuousPageView.prototype._panelViewPntToPageView = function (clientX, clientY) {
        var top = this.hostElement.scrollTop + clientY, left = 0;
        if (this.hostElement.scrollLeft > 0) {
            left = this.hostElement.scrollLeft + clientX;
        }
        else {
            var containerRect = this.hostElement.getBoundingClientRect(), wrapperRect = this._pagesWrapper.getBoundingClientRect();
            left = clientX - (wrapperRect.left - containerRect.left) + _PageViewBase._pageMargin;
        }
        var hitPageIndex = this._hitTestPageIndex(top);
        if (hitPageIndex < 0) {
            return null;
        }
        left -= this._getPageViewOffsetLeft(hitPageIndex);
        for (var index = 0; index < hitPageIndex; index++) {
            top -= this._getPageSize(index).height.valueInPixel * this.zoomFactor
                + _PageViewBase._pageMargin;
            if (!this._borderBoxMode) {
                top -= _PageViewBase._pageBorderWidth * 2;
            }
        }
        return { x: left, y: top, pageIndex: hitPageIndex };
    };
    _ContinuousPageView.prototype._reserveViewPage = function () {
        _removeChildren(this._pagesWrapper);
        for (var i = 0; i < (this.pages || []).length; i++) {
            var viewPage = this._addViewPage(), size = this._getPageSize(i);
            viewPage.style.height = size.height.valueInPixel * this.zoomFactor + 'px';
            viewPage.style.width = size.width.valueInPixel * this.zoomFactor + 'px';
        }
    };
    _ContinuousPageView.prototype._updatePageViewTransform = function () {
        var viewPages;
        viewPages = this._pagesWrapper.querySelectorAll('.wj-view-page');
        for (var i = 0; i < viewPages.length; i++) {
            this._setPageTransform(viewPages.item(i), i);
        }
    };
    _ContinuousPageView.prototype._zoomToViewWidth = function () {
        if (this.pages.length == 0) {
            return;
        }
        var viewHeight, viewWidth;
        viewHeight = this._getViewPortHeight();
        viewWidth = this._getViewPortWidth();
        var maxPageWidth = 0, totalPageHeight = 0;
        for (var i = 0; i < this.pages.length; i++) {
            var size = this._getPageSize(i);
            if (size.width.valueInPixel > maxPageWidth) {
                maxPageWidth = size.width.valueInPixel;
            }
            totalPageHeight += size.height.valueInPixel;
        }
        if (viewWidth / maxPageWidth > viewHeight / totalPageHeight) {
            viewWidth -= _Scroller.getScrollbarWidth();
        }
        this.zoomFactor = viewWidth / maxPageWidth;
    };
    _ContinuousPageView.prototype._ensurePageIndexPosition = function () {
        var currentPageIndex = this._guessPageIndex();
        if (this.pageIndex !== currentPageIndex) {
            this._render(currentPageIndex);
            this._updatePageIndex(currentPageIndex);
        }
    };
    _ContinuousPageView.prototype._getPageViewOffsetLeft = function (pageIndex) {
        var viewPage = this._pagesWrapper.querySelectorAll('.wj-view-page').item(pageIndex);
        if (viewPage) {
            return viewPage.offsetLeft - this._pagesWrapper.offsetLeft;
        }
        return 0;
    };
    _ContinuousPageView._preFetchPageCount = 3;
    return _ContinuousPageView;
}(_PageViewBase));
exports._ContinuousPageView = _ContinuousPageView;
'use strict';
var _SideTabs = (function (_super) {
    __extends(_SideTabs, _super);
    function _SideTabs(element) {
        var _this = _super.call(this, element) || this;
        _this._idCounter = 0;
        _this._tabPages = [];
        _this._tabPageDic = {};
        _this.tabPageActived = new wjcCore.Event();
        _this.tabPageVisibilityChanged = new wjcCore.Event();
        _this.expanded = new wjcCore.Event();
        _this.collapsed = new wjcCore.Event();
        var tpl = _this.getTemplate();
        _this.applyTemplate('wj-control', tpl, {
            _headersContainer: 'wj-headers',
            _contentsContainer: 'wj-contents'
        });
        return _this;
    }
    _SideTabs.prototype.applyTemplate = function (css, tpl, parts) {
        var host = this.hostElement;
        wjcCore.addClass(host, css);
        host.appendChild(_toDOMs(tpl));
        if (parts) {
            for (var part in parts) {
                var wjPart = parts[part];
                this[part] = host.querySelector('[wj-part="' + wjPart + '"]');
                if (this[part] == null && host.getAttribute('wj-part') == wjPart) {
                    this[part] = tpl;
                }
                if (this[part] == null) {
                    throw 'Missing template part: "' + wjPart + '"';
                }
            }
        }
        return host;
    };
    Object.defineProperty(_SideTabs.prototype, "tabPages", {
        get: function () {
            return this._tabPages;
        },
        enumerable: true,
        configurable: true
    });
    _SideTabs.prototype.getTabPage = function (id) {
        return this._tabPageDic[id];
    };
    _SideTabs.prototype.getFirstShownTabPage = function (except) {
        var first;
        this._tabPages.some(function (i) {
            if (!i.isHidden && i !== except) {
                first = i;
                return true;
            }
            return false;
        });
        return first;
    };
    Object.defineProperty(_SideTabs.prototype, "visibleTabPagesCount", {
        get: function () {
            var count = 0;
            this._tabPages.forEach(function (tabPage) {
                if (!tabPage.isHidden) {
                    count++;
                }
            });
            return count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_SideTabs.prototype, "activedTabPage", {
        get: function () {
            var first;
            this._tabPages.some(function (i) {
                if (i.isActived) {
                    first = i;
                    return true;
                }
                return false;
            });
            return first;
        },
        enumerable: true,
        configurable: true
    });
    _SideTabs.prototype.removePage = function (page) {
        var tabPage;
        tabPage = typeof page === 'string' ? this.getTabPage(page) : page;
        if (!tabPage) {
            return;
        }
        var id = tabPage.id;
        var index = this._tabPages.indexOf(tabPage);
        if (index < 0) {
            return;
        }
        this._tabPages.splice(index, 1);
        this._tabPageDic[id] = void (0);
        if (!this.isCollapsed && tabPage.isActived) {
            var first = this.getFirstShownTabPage();
            if (first) {
                this.active(first);
            }
            else {
                this.collapse();
            }
        }
        this._headersContainer.removeChild(tabPage.header);
        this._contentsContainer.removeChild(tabPage.outContent);
    };
    _SideTabs.prototype.addPage = function (title, svgIcon, index) {
        var _this = this;
        var id = this._getNewTabPageId(), header = document.createElement('li'), outContentHtml = '<div class="wj-tabpane">' +
            '<div class="wj-tabtitle-wrapper"><h3 class="wj-tabtitle">' + title + '</h3><span class="wj-close">×</span></div>' +
            '<div class="wj-tabcontent-wrapper"><div class="wj-tabcontent-inner"></div></div>' +
            '</div>', outContent = _toDOM(outContentHtml);
        var icon = _createSvgBtn(svgIcon);
        header.appendChild(icon);
        index = index == null ? this._tabPages.length : index;
        index = Math.min(Math.max(index, 0), this._tabPages.length);
        if (index >= this._tabPages.length) {
            this._headersContainer.appendChild(header);
            this._contentsContainer.appendChild(outContent);
        }
        else {
            this._headersContainer.insertBefore(header, this._tabPages[index].header);
            this._contentsContainer.insertBefore(outContent, this._tabPages[index].outContent);
        }
        _addEvent(outContent.querySelector('.wj-close'), 'click', function () {
            _this.collapse();
        });
        _addEvent(header.querySelector('a'), 'click,keydown', function (e) {
            var currentTab = _this.getTabPage(id);
            if (!currentTab) {
                return;
            }
            var needExe = (e.type === 'keydown' && e.keyCode === wjcCore.Key.Enter) || e.type === 'click';
            if (!needExe) {
                return;
            }
            _this.active(currentTab);
        });
        var tabPage = new _TabPage(outContent, header, id);
        if (index >= this._tabPages.length) {
            this._tabPages.push(tabPage);
        }
        else {
            this._tabPages.splice(index, 0, tabPage);
        }
        this._tabPageDic[id] = tabPage;
        if (!this.isCollapsed) {
            var actived = this.activedTabPage;
            if (!actived) {
                this.active(tabPage);
            }
        }
        return tabPage;
    };
    Object.defineProperty(_SideTabs.prototype, "isCollapsed", {
        get: function () {
            return wjcCore.hasClass(this.hostElement, _SideTabs._collapsedCss);
        },
        enumerable: true,
        configurable: true
    });
    _SideTabs.prototype.hide = function (page) {
        var tabPage = typeof page === 'string' ? this.getTabPage(page) : page;
        if (!tabPage) {
            return;
        }
        if (wjcCore.hasClass(tabPage.header, exports._hiddenCss)) {
            return;
        }
        wjcCore.addClass(tabPage.header, exports._hiddenCss);
        this.onTabPageVisibilityChanged(tabPage);
        this.deactive(tabPage);
    };
    _SideTabs.prototype.show = function (page) {
        var tabPage = typeof page === 'string' ? this.getTabPage(page) : page;
        if (!tabPage) {
            return;
        }
        if (!wjcCore.hasClass(tabPage.header, exports._hiddenCss)) {
            return;
        }
        wjcCore.removeClass(tabPage.header, exports._hiddenCss);
        this.onTabPageVisibilityChanged(tabPage);
        if (!this.isCollapsed) {
            var actived = this.activedTabPage;
            if (!actived) {
                this.active(tabPage);
            }
        }
    };
    _SideTabs.prototype.deactive = function (page) {
        var tabPage = typeof page === 'string' ? this.getTabPage(page) : page;
        if (!tabPage || !tabPage.isActived) {
            return;
        }
        wjcCore.removeClass(tabPage.outContent, _SideTabs._activedCss);
        _checkImageButton(tabPage.header.querySelector('a'), false);
        var shown = this.getFirstShownTabPage(tabPage);
        if (shown) {
            this.active(shown);
        }
        else {
            this.collapse();
        }
    };
    _SideTabs.prototype.active = function (page) {
        var tabPage = typeof page === 'string' ? this.getTabPage(page) : page;
        if (!tabPage) {
            return;
        }
        this.expand();
        if (tabPage.isActived) {
            return;
        }
        this._clearActiveStyles();
        this.show(tabPage);
        wjcCore.addClass(tabPage.outContent, _SideTabs._activedCss);
        _checkImageButton(tabPage.header.querySelector('a'), true);
        this.onTabPageActived();
    };
    _SideTabs.prototype.enable = function (page, value) {
        if (value === void 0) { value = true; }
        var tabPage = typeof page === 'string' ? this.getTabPage(page) : page;
        if (tabPage) {
            tabPage.enable(value);
        }
    };
    _SideTabs.prototype.enableAll = function (value) {
        if (value === void 0) { value = true; }
        this._tabPages.forEach(function (page) {
            page.enable(value);
        });
    };
    _SideTabs.prototype.onTabPageActived = function () {
        this.tabPageActived.raise(this, new wjcCore.EventArgs());
    };
    _SideTabs.prototype.onTabPageVisibilityChanged = function (tabPage) {
        this.tabPageVisibilityChanged.raise(this, { tabPage: tabPage });
    };
    _SideTabs.prototype.onExpanded = function () {
        this.expanded.raise(this, new wjcCore.EventArgs());
    };
    _SideTabs.prototype.onCollapsed = function () {
        this.collapsed.raise(this, new wjcCore.EventArgs());
    };
    _SideTabs.prototype.collapse = function () {
        if (this.isCollapsed) {
            return;
        }
        this._clearActiveStyles();
        wjcCore.addClass(this.hostElement, _SideTabs._collapsedCss);
        this.onCollapsed();
    };
    _SideTabs.prototype.expand = function () {
        if (!this.isCollapsed) {
            return;
        }
        wjcCore.removeClass(this.hostElement, _SideTabs._collapsedCss);
        if (!this.activedTabPage) {
            var shown = this.getFirstShownTabPage();
            if (shown) {
                this.active(shown);
            }
        }
        this.onExpanded();
    };
    _SideTabs.prototype.toggle = function () {
        if (this.isCollapsed) {
            this.expand();
        }
        else {
            this.collapse();
        }
    };
    _SideTabs.prototype._clearActiveStyles = function () {
        this._tabPages.forEach(function (i) {
            wjcCore.removeClass(i.outContent, _SideTabs._activedCss);
            _checkImageButton(i.header.querySelector('a'), false);
        });
    };
    _SideTabs.prototype._getNewTabPageId = function () {
        while (this._tabPageDic[(this._idCounter++).toString()]) {
        }
        return this._idCounter.toString();
    };
    _SideTabs._activedCss = 'active';
    _SideTabs._collapsedCss = 'collapsed';
    _SideTabs.controlTemplate = '<ul class="wj-nav wj-btn-group" wj-part="wj-headers"></ul>' +
        '<div class="wj-tabcontent" wj-part="wj-contents"></div>';
    return _SideTabs;
}(wjcCore.Control));
exports._SideTabs = _SideTabs;
var _TabPage = (function () {
    function _TabPage(outContent, header, id) {
        this._header = header;
        this._outContent = outContent;
        this._content = outContent.querySelector('.wj-tabcontent-inner');
        this._id = id;
    }
    Object.defineProperty(_TabPage.prototype, "isActived", {
        get: function () {
            return wjcCore.hasClass(this.outContent, _SideTabs._activedCss);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TabPage.prototype, "isHidden", {
        get: function () {
            return wjcCore.hasClass(this.header, exports._hiddenCss);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TabPage.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TabPage.prototype, "header", {
        get: function () {
            return this._header;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TabPage.prototype, "content", {
        get: function () {
            return this._content;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TabPage.prototype, "outContent", {
        get: function () {
            return this._outContent;
        },
        enumerable: true,
        configurable: true
    });
    _TabPage.prototype.enable = function (value) {
        if (value === void 0) { value = true; }
        wjcCore.enable(this._header, value);
        wjcCore.enable(this._content, value);
    };
    _TabPage.prototype.format = function (customizer) {
        customizer(this);
    };
    return _TabPage;
}());
exports._TabPage = _TabPage;
'use strict';
var _ViewerMenuBase = (function (_super) {
    __extends(_ViewerMenuBase, _super);
    function _ViewerMenuBase(viewer, owner, options) {
        var _this = _super.call(this, document.createElement('div'), options) || this;
        _this.owner = owner;
        _this.hostElement.style.display = 'none';
        _this.owner.appendChild(_this.hostElement);
        _this.showDropDownButton = false;
        _this.itemClicked.addHandler(_this._onItemClicked, _this);
        _this.formatItem.addHandler(_this._formatItem, _this);
        _this._viewer = viewer;
        _this.displayMemberPath = 'title';
        _this.selectedValuePath = 'commandTag';
        _this._bindMenuItems();
        _this._viewer._viewerActionStatusChanged.addHandler(function (s, e) {
            var actionElement = _this.dropDown.querySelector('[' + exports._commandTagAttr + '="' + e.action.actionType.toString() + '"]');
            _this._updateActionStatusCore(actionElement, e.action);
        });
        return _this;
    }
    Object.defineProperty(_ViewerMenuBase.prototype, "viewer", {
        get: function () {
            return this._viewer;
        },
        enumerable: true,
        configurable: true
    });
    _ViewerMenuBase.prototype._bindMenuItems = function () {
        this.itemsSource = this._initItems();
    };
    _ViewerMenuBase.prototype._initItems = function () {
        throw wjcCore.culture.Viewer.abstractMethodException;
    };
    _ViewerMenuBase.prototype._internalFormatItem = function (item, itemElement) {
        if (!item || item.commandTag === undefined) {
            return;
        }
        _removeChildren(itemElement);
        if (item.icon) {
            var iconSpan = document.createElement('span');
            iconSpan.appendChild(_createSvgBtn(item.icon));
            itemElement.insertBefore(iconSpan, itemElement.firstChild);
        }
        itemElement.setAttribute(exports._commandTagAttr, item.commandTag.toString());
        this._updateActionStatus(itemElement, item.commandTag);
    };
    _ViewerMenuBase.prototype._formatItem = function (sender, e) {
        this._internalFormatItem(this.itemsSource[e.index], e.item);
    };
    _ViewerMenuBase.prototype._onItemClicked = function (menu) {
        this._viewer._executeAction(parseInt(menu.selectedItem.commandTag));
    };
    _ViewerMenuBase.prototype._updateActionStatus = function (actionElement, actionType) {
        this._updateActionStatusCore(actionElement, {
            actionType: actionType,
            checked: this._viewer._actionIsChecked(actionType),
            disabled: this._viewer._actionIsDisabled(actionType),
            shown: this._viewer._actionIsShown(actionType)
        });
    };
    _ViewerMenuBase.prototype._updateActionStatusCore = function (actionElement, action) {
        _checkImageButton(actionElement, action.checked);
        _disableImageButton(actionElement, action.disabled);
        _showImageButton(actionElement, action.shown);
    };
    _ViewerMenuBase.prototype._updateItemsStatus = function () {
        var elements = this.dropDown.querySelectorAll('[' + exports._commandTagAttr + ']');
        for (var i = 0; i < elements.length; i++) {
            var actionElement = elements[i], commandTagValue = actionElement.getAttribute(exports._commandTagAttr);
            if (commandTagValue == null) {
                continue;
            }
            this._updateActionStatus(actionElement, parseInt(commandTagValue));
        }
        _checkSeparatorShown(this.dropDown);
    };
    _ViewerMenuBase.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        _super.prototype.refresh.call(this, fullUpdate);
        if (fullUpdate) {
            this._bindMenuItems();
        }
        if (this.isDroppedDown) {
            this.showMenu();
        }
    };
    _ViewerMenuBase.prototype.showMenu = function (above) {
        this.selectedIndex = -1;
        wjcCore.showPopup(this.dropDown, this.owner, above, false, false);
        this.dropDown.style.color = this._viewer.hostElement.style.color;
        wjcCore.addClass(this.dropDown, 'wj-btn-group-vertical');
        wjcCore.addClass(this.dropDown, 'wj-viewer-menu');
        this._updateItemsStatus();
        this.dropDown.focus();
    };
    return _ViewerMenuBase;
}(wjcInput.Menu));
exports._ViewerMenuBase = _ViewerMenuBase;
var _HamburgerMenu = (function (_super) {
    __extends(_HamburgerMenu, _super);
    function _HamburgerMenu(viewer, owner, options) {
        return _super.call(this, viewer, owner, options) || this;
    }
    _HamburgerMenu.prototype._initItems = function () {
        var items = [];
        items.push({ title: wjcCore.culture.Viewer.thumbnails, icon: exports.icons.thumbnails, commandTag: _ViewerActionType.ShowThumbnails });
        items.push({ title: wjcCore.culture.Viewer.outlines, icon: exports.icons.outlines, commandTag: _ViewerActionType.ShowOutlines });
        items.push({ title: wjcCore.culture.Viewer.exports, icon: exports.icons.exports, commandTag: _ViewerActionType.ShowExportsPanel });
        items.push({ title: ViewerBase._seperatorHtml });
        items.push({ title: wjcCore.culture.Viewer.portrait, icon: exports.icons.portrait, commandTag: _ViewerActionType.Portrait });
        items.push({ title: wjcCore.culture.Viewer.landscape, icon: exports.icons.landscape, commandTag: _ViewerActionType.Landscape });
        items.push({ title: wjcCore.culture.Viewer.pageSetup, icon: exports.icons.pageSetup, commandTag: _ViewerActionType.ShowPageSetupPanel });
        items.push({ title: ViewerBase._seperatorHtml });
        items.push({ title: wjcCore.culture.Viewer.showZoomBar, icon: exports.icons.showZoomBar, commandTag: _ViewerActionType.ShowZoomBar });
        items.push({ title: ViewerBase._seperatorHtml });
        items.push({ title: wjcCore.culture.Viewer.paginated, icon: exports.icons.paginated, commandTag: _ViewerActionType.TogglePaginated });
        items.push({ title: wjcCore.culture.Viewer.print, icon: exports.icons.print, commandTag: _ViewerActionType.Print });
        items.push({ title: ViewerBase._seperatorHtml });
        items.push({ title: wjcCore.culture.Viewer.backwardHistory, icon: exports.icons.backwardHistory, commandTag: _ViewerActionType.Backward });
        items.push({ title: wjcCore.culture.Viewer.forwardHistory, icon: exports.icons.forwardHistory, commandTag: _ViewerActionType.Forward });
        return items;
    };
    return _HamburgerMenu;
}(_ViewerMenuBase));
exports._HamburgerMenu = _HamburgerMenu;
var _ViewMenu = (function (_super) {
    __extends(_ViewMenu, _super);
    function _ViewMenu(viewer, owner, options) {
        return _super.call(this, viewer, owner, options) || this;
    }
    _ViewMenu.prototype._initItems = function () {
        var items = [];
        items.push({ title: wjcCore.culture.Viewer.singleMode, icon: exports.icons.singleView, commandTag: _ViewerActionType.Single });
        items.push({ title: wjcCore.culture.Viewer.continuousMode, icon: exports.icons.continuousView, commandTag: _ViewerActionType.Continuous });
        items.push({ title: ViewerBase._seperatorHtml });
        items.push({ title: wjcCore.culture.Viewer.wholePage, icon: exports.icons.fitWholePage, commandTag: _ViewerActionType.FitWholePage });
        items.push({ title: wjcCore.culture.Viewer.pageWidth, icon: exports.icons.fitPageWidth, commandTag: _ViewerActionType.FitPageWidth });
        return items;
    };
    return _ViewMenu;
}(_ViewerMenuBase));
exports._ViewMenu = _ViewMenu;
var _SearchOptionsMenu = (function (_super) {
    __extends(_SearchOptionsMenu, _super);
    function _SearchOptionsMenu(viewer, owner, options) {
        return _super.call(this, viewer, owner, options) || this;
    }
    _SearchOptionsMenu.prototype._initItems = function () {
        var items = [];
        items.push({ title: wjcCore.culture.Viewer.wholeWordMenuItem, commandTag: _ViewerActionType.SearchMatchWholeWord });
        items.push({ title: wjcCore.culture.Viewer.matchCaseMenuItem, commandTag: _ViewerActionType.SearchMatchCase });
        return items;
    };
    _SearchOptionsMenu.prototype._internalFormatItem = function (item, itemElement) {
        _super.prototype._internalFormatItem.call(this, item, itemElement);
        if (!item || item.commandTag === undefined) {
            return;
        }
        var checkSpan = document.createElement('span');
        checkSpan.innerHTML = wjcCore.culture.Viewer.checkMark;
        wjcCore.addClass(checkSpan, 'checkIcon');
        itemElement.insertBefore(checkSpan, itemElement.firstChild);
    };
    _SearchOptionsMenu.prototype._updateActionStatus = function (actionElement, actionType) {
        _super.prototype._updateActionStatus.call(this, actionElement, actionType);
        if (this.viewer._actionIsChecked(actionType)) {
            wjcCore.addClass(actionElement, 'checked');
        }
    };
    return _SearchOptionsMenu;
}(_ViewerMenuBase));
exports._SearchOptionsMenu = _SearchOptionsMenu;
'use strict';
var MouseMode;
(function (MouseMode) {
    MouseMode[MouseMode["SelectTool"] = 0] = "SelectTool";
    MouseMode[MouseMode["MoveTool"] = 1] = "MoveTool";
    MouseMode[MouseMode["RubberbandTool"] = 2] = "RubberbandTool";
    MouseMode[MouseMode["MagnifierTool"] = 3] = "MagnifierTool";
})(MouseMode = exports.MouseMode || (exports.MouseMode = {}));
var ViewMode;
(function (ViewMode) {
    ViewMode[ViewMode["Single"] = 0] = "Single";
    ViewMode[ViewMode["Continuous"] = 1] = "Continuous";
})(ViewMode = exports.ViewMode || (exports.ViewMode = {}));
var ZoomMode;
(function (ZoomMode) {
    ZoomMode[ZoomMode["Custom"] = 0] = "Custom";
    ZoomMode[ZoomMode["PageWidth"] = 1] = "PageWidth";
    ZoomMode[ZoomMode["WholePage"] = 2] = "WholePage";
})(ZoomMode = exports.ZoomMode || (exports.ZoomMode = {}));
var _LinkClickedEventArgs = (function (_super) {
    __extends(_LinkClickedEventArgs, _super);
    function _LinkClickedEventArgs(a) {
        var _this = _super.call(this) || this;
        _this._a = a;
        return _this;
    }
    Object.defineProperty(_LinkClickedEventArgs.prototype, "element", {
        get: function () {
            return this._a;
        },
        enumerable: true,
        configurable: true
    });
    return _LinkClickedEventArgs;
}(wjcCore.EventArgs));
exports._LinkClickedEventArgs = _LinkClickedEventArgs;
var _HistoryManager = (function () {
    function _HistoryManager() {
        this._items = [{}];
        this._position = 0;
        this.statusChanged = new wjcCore.Event();
    }
    _HistoryManager.prototype._onStatusChanged = function () {
        this.statusChanged.raise(this, new wjcCore.EventArgs());
    };
    Object.defineProperty(_HistoryManager.prototype, "current", {
        get: function () {
            return this._items[this._position];
        },
        enumerable: true,
        configurable: true
    });
    _HistoryManager.prototype.clear = function () {
        this._items = [{}];
        this._position = 0;
        this._onStatusChanged();
    };
    _HistoryManager.prototype.add = function () {
        this._items.splice(++this._position);
        this._items.push({});
        this._onStatusChanged();
    };
    _HistoryManager.prototype.forward = function () {
        if (!this.canForward()) {
            return null;
        }
        var item = this._items[++this._position];
        this._onStatusChanged();
        return item;
    };
    _HistoryManager.prototype.backward = function () {
        if (!this.canBackward()) {
            return null;
        }
        var item = this._items[--this._position];
        this._onStatusChanged();
        return item;
    };
    _HistoryManager.prototype.canForward = function () {
        return this._position < this._items.length - 1;
    };
    _HistoryManager.prototype.canBackward = function () {
        return this._position > 0;
    };
    return _HistoryManager;
}());
exports._HistoryManager = _HistoryManager;
var ViewerBase = (function (_super) {
    __extends(ViewerBase, _super);
    function ViewerBase(element, options) {
        var _this = _super.call(this, element, options, true) || this;
        _this._pages = [];
        _this._pageIndex = 0;
        _this._mouseMode = MouseMode.SelectTool;
        _this._viewMode = ViewMode.Single;
        _this._needBind = false;
        _this._historyManager = new _HistoryManager();
        _this._fullScreen = false;
        _this._miniToolbarPinnedTimer = null;
        _this._autoHeightCalculated = false;
        _this._searchManager = new _SearchManager();
        _this._thresholdWidth = 767;
        _this._historyMoving = false;
        _this._documentSourceChanged = new wjcCore.Event();
        _this.pageIndexChanged = new wjcCore.Event();
        _this.viewModeChanged = new wjcCore.Event();
        _this.selectMouseModeChanged = new wjcCore.Event();
        _this.mouseModeChanged = new wjcCore.Event();
        _this.fullScreenChanged = new wjcCore.Event();
        _this.zoomFactorChanged = new wjcCore.Event();
        _this.queryLoadingData = new wjcCore.Event();
        _this._viewerActionStatusChanged = new wjcCore.Event();
        _this._documentEventKey = new Date().getTime().toString();
        _this._init(options);
        return _this;
    }
    Object.defineProperty(ViewerBase.prototype, "serviceUrl", {
        get: function () {
            return this._serviceUrl;
        },
        set: function (value) {
            if (value != this._serviceUrl) {
                this._serviceUrl = value;
                this._needBindDocumentSource();
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewerBase.prototype, "filePath", {
        get: function () {
            return this._filePath;
        },
        set: function (value) {
            if (value != this._filePath) {
                this._filePath = value;
                this._needBindDocumentSource();
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewerBase.prototype, "thresholdWidth", {
        get: function () {
            return this._thresholdWidth;
        },
        set: function (value) {
            if (value != this._thresholdWidth) {
                this._thresholdWidth = value;
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewerBase.prototype, "_innerPaginated", {
        get: function () {
            if (this._documentSource && !this._needBind) {
                return this._documentSource.paginated;
            }
            else {
                return this._paginated;
            }
        },
        set: function (value) {
            if (this._documentSource && !this._needBind) {
                this._setPaginated(value);
            }
            else {
                this._paginated = value == null ? null : wjcCore.asBoolean(value);
            }
            this._setViewerAction(_ViewerActionType.TogglePaginated, true);
        },
        enumerable: true,
        configurable: true
    });
    ViewerBase.prototype.reload = function () {
        this._needBindDocumentSource();
        this.invalidate();
    };
    ViewerBase.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        _super.prototype.refresh.call(this, fullUpdate);
        if (this._needBind) {
            this._setDocumentSource(this._getSource());
            this._needBind = false;
        }
        if (fullUpdate) {
            var toolbar = wjcCore.Control.getControl(this._toolbar);
            if (toolbar) {
                toolbar.refresh();
            }
            var miniToolbar = wjcCore.Control.getControl(this._miniToolbar);
            if (miniToolbar) {
                miniToolbar.refresh();
            }
            var mobileToolbar = wjcCore.Control.getControl(this._mobileToolbar);
            if (mobileToolbar) {
                mobileToolbar.refresh();
            }
            var zoomBar = wjcCore.Control.getControl(this._zoomBar);
            if (zoomBar) {
                zoomBar.refresh();
            }
            var searchBar = wjcCore.Control.getControl(this._searchBar);
            if (searchBar) {
                searchBar.refresh();
            }
            if (this._hamburgerMenu) {
                this._hamburgerMenu.refresh();
            }
            if (this._viewMenu) {
                this._viewMenu.refresh();
            }
            if (this._searchOptionsMenu) {
                this._searchOptionsMenu.refresh();
            }
            ViewerBase._exportItems = null;
            this._updateExportTab(true);
            this._globalize();
            this._updateLayout();
        }
        this._resetMiniToolbarPosition();
        this._resetToolbarWidth();
        this._resetViewPanelContainerWidth();
        this._autoHeightCalculated = false;
    };
    ViewerBase.prototype._updateLayout = function () {
        this._switchTemplate(this._isMobileTemplate());
    };
    ViewerBase.prototype._switchTemplate = function (mobile) {
        var outer = this.hostElement.querySelector('.wj-viewer-outer'), mobileCss = 'mobile', sideTabs = wjcCore.Control.getControl(this._sidePanel), pageSetupPage = sideTabs.getTabPage(this._pageSetupPageId);
        if (mobile) {
            wjcCore.addClass(outer, mobileCss);
            sideTabs.show(pageSetupPage);
        }
        else {
            wjcCore.removeClass(outer, mobileCss);
            sideTabs.hide(pageSetupPage);
        }
    };
    ViewerBase.prototype._getSource = function () {
        if (!this.filePath) {
            return null;
        }
        return new _DocumentSource({
            serviceUrl: this._serviceUrl,
            filePath: this._filePath
        });
    };
    ViewerBase.prototype._needBindDocumentSource = function () {
        this._needBind = true;
    };
    ViewerBase.prototype._supportsPageSettingActions = function () {
        return false;
    };
    ViewerBase.prototype._isMobileTemplate = function () {
        return this.thresholdWidth > this.hostElement.getBoundingClientRect().width;
    };
    ViewerBase.prototype._init = function (options) {
        var _this = this;
        this._createChildren();
        this._autoCalculateHeight();
        this._resetToolbarWidth();
        this._resetViewPanelContainerWidth();
        this._bindEvents();
        this._initTools();
        this.deferUpdate(function () {
            _this.initialize(options);
        });
    };
    ViewerBase.prototype._initTools = function () {
        var _this = this;
        this._rubberband = new _Rubberband(document.createElement('div'), this._viewpanelContainer, this._pageView);
        this._rubberband.applied.addHandler(function (sender, args) {
            var bandRect = args.rect, hitTestInfo = _this._pageView.hitTest(bandRect.left, bandRect.top), containerRect = _this._viewpanelContainer.getBoundingClientRect();
            if (bandRect.width > bandRect.height) {
                _this._pageView.zoomFactor *= containerRect.width / bandRect.width;
            }
            else {
                _this._pageView.zoomFactor *= containerRect.height / bandRect.height;
            }
            _this._pageView.moveToPosition(_getPositionByHitTestInfo(hitTestInfo));
        });
        this._magnifier = new _Magnifier(document.createElement('div'), this._viewpanelContainer, this._pageView);
    };
    ViewerBase.prototype._globalize = function () {
        var g = wjcCore.culture.Viewer;
        this._gSearchTitle.textContent = g.search;
        this._gMatchCase.innerHTML = '&nbsp;&nbsp;&nbsp;' + g.matchCase;
        this._gWholeWord.innerHTML = '&nbsp;&nbsp;&nbsp;' + g.wholeWord;
        this._gSearchResults.textContent = g.searchResults;
        this._gThumbnailsTitle.textContent = g.thumbnails;
        this._gOutlinesTitle.textContent = g.outlines;
        this._gPageSetupTitle.textContent = g.pageSetup;
        this._gPageSetupApplyBtn.textContent = g.ok;
        this._gExportsPageTitle.textContent = g.exports;
        this._gExportsPageApplyBtn.textContent = g.exportOk;
        this._gExportFormatTitle.textContent = g.exportFormat;
    };
    ViewerBase.prototype._autoCalculateHeight = function () {
        if (!this._shouldAutoHeight()) {
            return;
        }
        var viewpanelContainerStyleHeight = this._viewpanelContainer.style.height;
        this._viewpanelContainer.style.height = '100%';
        this._viewerContainer.style.height =
            Math.max(this._viewpanelContainer.getBoundingClientRect().height, ViewerBase._viewpanelContainerMinHeight) + 'px';
        this._viewpanelContainer.style.height = viewpanelContainerStyleHeight;
    };
    ViewerBase.prototype._bindEvents = function () {
        var _this = this;
        _addEvent(window, 'unload', function () {
            if (_this._documentSource) {
                _this._documentSource.dispose();
            }
        });
        _addEvent(document, 'mousemove', function (e) {
            if (_this.fullScreen && _this._miniToolbar) {
                var miniToolbarVisible = _this._checkMiniToolbarVisible(e);
                if (_this._miniToolbarPinnedTimer != null && miniToolbarVisible) {
                    clearTimeout(_this._miniToolbarPinnedTimer);
                    _this._miniToolbarPinnedTimer = null;
                    _this._showMiniToolbar(miniToolbarVisible);
                }
                else if (_this._miniToolbarPinnedTimer == null) {
                    _this._showMiniToolbar(miniToolbarVisible);
                }
            }
        });
        _addEvent(document, 'keydown', function (e) {
            if (e.keyCode === wjcCore.Key.Escape) {
                _this.fullScreen = false;
            }
        });
        this._historyManager.statusChanged.addHandler(this._onHistoryManagerStatusUpdated, this);
        this._onHistoryManagerStatusUpdated();
        this._pageView.pageIndexChanged.addHandler(function () {
            _this._addHistory(false, true);
            _this._updatePageIndex(_this._pageView.pageIndex);
        });
        this._pageView.zoomFactorChanged.addHandler(function (sender, e) {
            if (_this.zoomMode === ZoomMode.Custom) {
                _this._addHistory(false, true, { zoomFactor: e.oldValue });
            }
            _this.onZoomFactorChanged();
        });
        this._pageView.zoomModeChanged.addHandler(function (sender, e) {
            _this._addHistory(false, true, { zoomMode: e.oldValue });
            _this._updateZoomModeActions();
        });
        this._pageView.positionChanged.addHandler(function () {
            setTimeout(function () {
                _this._historyManager.current.position = _this._getCurrentPosition();
            }, ViewerBase._historyTimeout);
        });
        var highlighting = false;
        this._searchManager.currentChanged.addHandler(function () {
            if (highlighting) {
                return;
            }
            var result = _this._searchManager.current;
            if (!result) {
                return;
            }
            highlighting = true;
            _this._highlightPosition(result.pageIndex, result.boundsList);
            highlighting = false;
        });
    };
    ViewerBase.prototype._checkMiniToolbarVisible = function (e) {
        var x = e.clientX, y = e.clientY;
        var bound = this._miniToolbar.getBoundingClientRect(), visibleOffset = 60, visibleLeft = bound.left - visibleOffset, visibleRight = bound.right + visibleOffset, visibleTop = bound.top - visibleOffset, visibleBottom = bound.bottom + visibleOffset;
        return x >= visibleLeft && x <= visibleRight &&
            y >= visibleTop && y <= visibleBottom;
    };
    ViewerBase.prototype._showMiniToolbar = function (visible) {
        var opacity = parseFloat(getComputedStyle(this._miniToolbar, '')['opacity']), step = 0.01, t, toolbar = this._miniToolbar;
        if (visible) {
            t = setInterval(function () {
                if (opacity >= 0.8) {
                    window.clearInterval(t);
                    return;
                }
                opacity += step;
                toolbar.style.opacity = opacity.toString();
            }, 1);
        }
        else {
            t = setInterval(function () {
                if (opacity < 0) {
                    window.clearInterval(t);
                    return;
                }
                opacity -= step;
                toolbar.style.opacity = opacity.toString();
            }, 1);
        }
    };
    ViewerBase.prototype._goToBookmark = function (name) {
        var _this = this;
        if (!this._documentSource || name === "") {
            return;
        }
        this._documentSource.getBookmark(name).then(function (bookmark) {
            if (bookmark) {
                _this._scrollToPosition(bookmark, true);
            }
        });
    };
    ViewerBase.prototype._executeCustomAction = function (actionString) {
        var _this = this;
        if (!this._documentSource || actionString === "") {
            return;
        }
        this._initialPosition = {
            pageIndex: this._pageIndex,
            pageBounds: { x: 0, y: 0, width: 0, height: 0 }
        };
        this._resetDocument();
        this._showViewPanelMessage();
        this._setDocumentRendering();
        var documentSource = this._documentSource;
        this._documentSource.executeCustomAction(actionString).then(function (position) {
            _this._initialPosition = position || _this._initialPosition;
            _this._getStatusUtilCompleted(documentSource);
        }).catch(function (reason) {
            _this._showViewPanelErrorMessage(_getErrorMessage(reason));
        });
    };
    ViewerBase.prototype._getStatusUtilCompleted = function (documentSource) {
        var _this = this;
        if (!documentSource || documentSource.isLoadCompleted
            || documentSource.isDisposed) {
            return;
        }
        documentSource.getStatus().then(function (v) {
            if (_this._documentSource !== documentSource) {
                return;
            }
            setTimeout(function () { return _this._getStatusUtilCompleted(documentSource); }, 100);
        });
    };
    ViewerBase.prototype._initChildren = function () {
        this._initPageView();
        this._initToolbar();
        this._initSidePanel();
        this._initSplitter();
        this._initFooter();
        this._initSearchBar();
        this._initMiniToolbar();
    };
    ViewerBase.prototype._initSearchBar = function () {
        new _SearchBar(this._searchBar, this);
        this._showSearchBar(false);
    };
    ViewerBase.prototype._showSearchBar = function (show) {
        var outer = this.hostElement.querySelector('.wj-viewer-outer'), withSearchBarCss = 'with-searchbar';
        if (show) {
            wjcCore.removeClass(this._searchBar, exports._hiddenCss);
            wjcCore.addClass(outer, withSearchBarCss);
        }
        else {
            wjcCore.addClass(this._searchBar, exports._hiddenCss);
            wjcCore.removeClass(outer, withSearchBarCss);
        }
    };
    ViewerBase.prototype._initFooter = function () {
        var _this = this;
        new _ViewerZoomBar(this._zoomBar, this);
        _addEvent(this._footer.querySelector('.wj-close'), 'click', function () {
            _this._showFooter(false);
        });
    };
    ViewerBase.prototype._showFooter = function (show) {
        var outer = this.hostElement.querySelector('.wj-viewer-outer'), withFooterCss = 'with-footer';
        if (show) {
            wjcCore.removeClass(this._footer, exports._hiddenCss);
            wjcCore.addClass(outer, withFooterCss);
        }
        else {
            wjcCore.addClass(this._footer, exports._hiddenCss);
            wjcCore.removeClass(outer, withFooterCss);
        }
    };
    ViewerBase.prototype._createChildren = function () {
        var tpl = this.getTemplate();
        this.applyTemplate('wj-viewer wj-control', tpl, {
            _viewpanelContainer: 'viewpanel-container',
            _toolbar: 'toolbar',
            _mobileToolbar: 'mobile-toolbar',
            _miniToolbar: 'mini-toolbar',
            _leftPanel: 'viewer-left-panel',
            _sidePanel: 'side-panel',
            _viewerContainer: 'viewer-container',
            _splitter: 'splitter',
            _footer: 'viewer-footer',
            _zoomBar: 'zoom-bar',
            _searchBar: 'search-bar'
        });
        this._initChildren();
    };
    ViewerBase.prototype._initPageView = function () {
        var pageView = new _CompositePageView(this._viewpanelContainer);
        pageView.viewMode = this.viewMode;
    };
    Object.defineProperty(ViewerBase.prototype, "_pageView", {
        get: function () {
            return wjcCore.Control.getControl(this._viewpanelContainer);
        },
        enumerable: true,
        configurable: true
    });
    ViewerBase.prototype._initSplitter = function () {
        var _this = this;
        _addEvent(this._splitter, 'click', function () { return _this._toggleSplitter(); });
    };
    ViewerBase.prototype._toggleSplitter = function (collapsed) {
        var leftCss = 'wj-glyph-left', rightCss = 'wj-glyph-right', arrow = this._splitter.querySelector('span'), tabs = wjcCore.Control.getControl(this._sidePanel);
        if (collapsed === true) {
            if (wjcCore.hasClass(arrow, rightCss)) {
                return;
            }
        }
        else if (collapsed === false) {
            if (wjcCore.hasClass(arrow, leftCss)) {
                return;
            }
        }
        else {
            collapsed = wjcCore.hasClass(arrow, leftCss);
        }
        if (!collapsed) {
            if (tabs.visibleTabPagesCount === 0) {
                return;
            }
            arrow.className = leftCss;
            tabs.expand();
        }
        else {
            tabs.collapse();
            arrow.className = rightCss;
        }
        this._resetViewPanelContainerWidth();
    };
    ViewerBase.prototype._resetMiniToolbarPosition = function () {
        if (!this._miniToolbar) {
            return;
        }
        var containerWidth = this.hostElement.getBoundingClientRect().width, selfWidth = this._miniToolbar.getBoundingClientRect().width;
        this._miniToolbar.style.left = (containerWidth - selfWidth) / 2 + 'px';
    };
    ViewerBase.prototype._resetToolbarWidth = function () {
        var toolbar = wjcCore.Control.getControl(this._toolbar);
        toolbar.resetWidth();
    };
    ViewerBase.prototype._resetViewPanelContainerWidth = function () {
        if (!this._isMobileTemplate() && this.hostElement.getBoundingClientRect().width <= ViewerBase._narrowWidthThreshold) {
            wjcCore.addClass(this.hostElement, ViewerBase._narrowCss);
        }
        else {
            wjcCore.removeClass(this.hostElement, ViewerBase._narrowCss);
        }
        var splitterWidth = this._splitter ? this._splitter.getBoundingClientRect().width : 0, leftPanelWidth = this._leftPanel ? this._leftPanel.getBoundingClientRect().width : 0;
        this._viewpanelContainer.style.width = this._viewerContainer.getBoundingClientRect().width -
            splitterWidth - leftPanelWidth + 'px';
        this._pageView.invalidate();
    };
    ViewerBase.prototype._shouldAutoHeight = function () {
        return (this.hostElement.style.height === '100%' || this.hostElement.style.height === 'auto') && !this.fullScreen;
    };
    ViewerBase.prototype._initSidePanel = function () {
        var _this = this;
        var sideTabs = new _SideTabs(this._sidePanel);
        sideTabs.collapse();
        sideTabs.collapsed.addHandler(function () {
            _this._toggleSplitter(true);
        });
        sideTabs.expanded.addHandler(function () {
            _this._toggleSplitter(false);
            var splitterWidth = _this._splitter ? _this._splitter.getBoundingClientRect().width : 0, sidePanelAndSplitterWidth = _this._sidePanel.getBoundingClientRect().width + splitterWidth;
            if (sidePanelAndSplitterWidth > _this._viewerContainer.getBoundingClientRect().width) {
                wjcCore.addClass(_this._sidePanel, "collapsed");
            }
        });
        sideTabs.tabPageVisibilityChanged.addHandler(function (sender, e) {
            if ((!e.tabPage.isHidden && sideTabs.visibleTabPagesCount == 1)
                || (e.tabPage.isHidden && sideTabs.visibleTabPagesCount == 0)) {
                _this._resetViewPanelContainerWidth();
            }
        });
        this._initSidePanelThumbnails();
        this._initSidePanelOutlines();
        this._initSidePanelSearch();
        this._initSidePanelExports();
        this._initSidePanelPageSetup();
    };
    ViewerBase.prototype._clearPreHightLights = function () {
        this._pages.forEach(function (page) {
            var preHighlights;
            if (page.content) {
                preHighlights = page.content.querySelectorAll('.highlight');
                for (var i = 0; i < preHighlights.length; i++) {
                    preHighlights.item(i).parentNode.removeChild(preHighlights.item(i));
                }
            }
        });
    };
    ViewerBase.prototype._highlightPosition = function (pageIndex, boundsList) {
        var _this = this;
        var g, oldPageIndex = this._pageIndex, oldScrollTop = this._pageView.scrollTop, oldScrollLeft = this._pageView.scrollLeft, position = { pageIndex: pageIndex, pageBounds: boundsList.length > 0 ? boundsList[0] : null };
        this._scrollToPosition(position, true).then(function (_) {
            _this._clearPreHightLights();
            _this._pages[_this.pageIndex].getContent().then(function (content) {
                g = content.querySelector('g');
                for (var i = 0; i < boundsList.length; i++) {
                    var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    rect.setAttributeNS(null, 'x', _twipToPixel(boundsList[i].x).toString());
                    rect.setAttributeNS(null, 'y', _twipToPixel(boundsList[i].y).toString());
                    rect.setAttributeNS(null, 'height', _twipToPixel(boundsList[i].height).toString());
                    rect.setAttributeNS(null, 'width', _twipToPixel(boundsList[i].width).toString());
                    rect.setAttributeNS(null, 'class', 'highlight');
                    g.appendChild(rect);
                }
            });
        });
    };
    ViewerBase.prototype._scrollToPosition = function (position, addHistory) {
        if (addHistory === true) {
            this._addHistory(true, false);
        }
        position.pageIndex = position.pageIndex || 0;
        var promise = this._pageView.moveToPosition(position);
        return promise;
    };
    ViewerBase.prototype._initSidePanelSearch = function () {
        var _this = this;
        var sideTabs = wjcCore.Control.getControl(this._sidePanel), searchPage = sideTabs.addPage(wjcCore.culture.Viewer.search, exports.icons.search);
        this._gSearchTitle = searchPage.outContent.querySelector('.wj-tabtitle');
        searchPage.format(function (t) {
            var settingsHtml = '<div class="wj-searchcontainer">' +
                '<input class="wj-searchbox" wj-part="search-box" type="text"/>' +
                '<div class="wj-btn-group">' +
                '<button class="wj-btn wj-btn-searchpre">' + _createSvgBtn(exports.icons.searchPrevious).innerHTML + '</button>' +
                '<button class="wj-btn wj-btn-searchnext">' + _createSvgBtn(exports.icons.searchNext).innerHTML + '</button>' +
                '</div>' +
                '</div>' +
                '<div class="wj-searchoption">' +
                '<label><span wj-part="g-matchCase">&nbsp;&nbsp;&nbsp;' + wjcCore.culture.Viewer.matchCase + '</span><input type="checkbox" wj-part="match-case" /></label>' +
                '</div>' +
                '<div class="wj-searchoption">' +
                '<label><span wj-part="g-wholeWord">&nbsp;&nbsp;&nbsp;' + wjcCore.culture.Viewer.wholeWord + '</span><input type="checkbox" wj-part="whole-word" /></label>' +
                '</div>' +
                '<h3 wj-part="g-searchResults" class="wj-searchresult">' + wjcCore.culture.Viewer.searchResults + '</h3>', settingsElement = _toDOMs(settingsHtml);
            _this._gMatchCase = settingsElement.querySelector('[wj-part="g-matchCase"]');
            _this._gWholeWord = settingsElement.querySelector('[wj-part="g-wholeWord"]');
            _this._gSearchResults = settingsElement.querySelector('[wj-part="g-searchResults"]');
            t.outContent.querySelector('.wj-tabtitle-wrapper').appendChild(settingsElement);
            var matchCaseCheckBox = t.outContent.querySelectorAll('input[type="checkbox"]')[0], wholeWordCheckBox = t.outContent.querySelectorAll('input[type="checkbox"]')[1], input = t.outContent.querySelector('input[type="text"]'), preBtn = t.outContent.querySelector('.wj-btn-searchpre'), nextBtn = t.outContent.querySelector('.wj-btn-searchnext');
            wjcCore.addClass(t.content.parentElement, 'search-wrapper');
            wjcCore.addClass(t.content, 'wj-searchresultlist');
            var list = new wjcInput.ListBox(t.content), isSettingItemsSource = false, highlighting = false;
            list.formatItem.addHandler(function (sender, e) {
                var searchItem = e.item, data = e.data, searchPageNumberDiv = document.createElement('div'), searchTextDiv = document.createElement('div');
                searchItem.innerHTML = '';
                searchTextDiv.innerHTML = data.nearText;
                searchTextDiv.className = 'wj-search-text';
                searchPageNumberDiv.innerHTML = 'Page ' + (data.pageIndex + 1);
                searchPageNumberDiv.className = 'wj-search-page';
                wjcCore.addClass(searchItem, 'wj-search-item');
                searchItem.setAttribute('tabIndex', '-1');
                searchItem.appendChild(searchTextDiv);
                searchItem.appendChild(searchPageNumberDiv);
            });
            list.selectedIndexChanged.addHandler(function () { return _this._searchManager.currentIndex = list.selectedIndex; });
            var enableInputs = function (enable) {
                if (enable === void 0) { enable = true; }
                var inputs = searchPage.outContent.querySelectorAll('input');
                for (var i = 0; i < inputs.length; i++) {
                    inputs.item(i).disabled = !enable;
                }
            };
            _this._searchManager.searchStarted.addHandler(function () {
                enableInputs(false);
            });
            _this._searchManager.searchCompleted.addHandler(function () {
                isSettingItemsSource = true;
                list.itemsSource = _this._searchManager.searchResults;
                isSettingItemsSource = false;
                enableInputs(true);
            });
            _this._searchManager.currentChanged.addHandler(function () {
                if (isSettingItemsSource || highlighting) {
                    return;
                }
                var result = _this._searchManager.current;
                if (!result) {
                    return;
                }
                highlighting = true;
                list.selectedIndex = _this._searchManager.currentIndex;
                highlighting = false;
            });
            var update = function () {
                list.itemsSource = null;
                matchCaseCheckBox.checked = false;
                wholeWordCheckBox.checked = false;
                input.value = '';
                if (!_this._documentSource || !_this._documentSource.features
                    || (_this._documentSource.paginated && !_this._documentSource.features.textSearchInPaginatedMode)) {
                    sideTabs.hide(t);
                    return;
                }
                sideTabs.show(t);
            };
            _this._documentSourceChanged.addHandler(function () {
                if (_this._documentSource) {
                    _addWjHandler(_this._documentEventKey, _this._documentSource.loadCompleted, update);
                }
                update();
            });
            _addEvent(matchCaseCheckBox, 'click', function () { _this._searchManager.matchCase = matchCaseCheckBox.checked; });
            _addEvent(wholeWordCheckBox, 'click', function () { _this._searchManager.wholeWord = wholeWordCheckBox.checked; });
            _addEvent(input, 'input', function () { _this._searchManager.text = input.value; });
            _addEvent(input, 'keyup', function (e) {
                var event = e || window.event;
                if (event.keyCode === wjcCore.Key.Enter) {
                    _this._searchManager.search(event.shiftKey);
                }
            });
            _addEvent(nextBtn, 'click', function () { return _this._searchManager.search(); });
            _addEvent(preBtn, 'click', function () { return _this._searchManager.search(true); });
            _addEvent(t.header, 'keydown', function (e) {
                var next, toolbar = _this._toolbar;
                if (e.keyCode === wjcCore.Key.Tab) {
                    next = toolbar.querySelector('[tabIndex=0]')
                        || toolbar.querySelector('input:not([type="hidden"])')
                        || toolbar;
                    if (next && next['focus']) {
                        next.focus();
                        e.preventDefault();
                    }
                }
            });
        });
    };
    ViewerBase.prototype._initSidePanelOutlines = function () {
        var _this = this;
        var sideTabs = wjcCore.Control.getControl(this._sidePanel), outlinesPage = sideTabs.addPage(wjcCore.culture.Viewer.outlines, exports.icons.outlines);
        this._gOutlinesTitle = outlinesPage.outContent.querySelector('.wj-tabtitle');
        this._outlinesPageId = outlinesPage.id;
        outlinesPage.format(function (t) {
            wjcCore.addClass(t.content, 'wj-outlines-tree');
            var tree = new wjcGrid.FlexGrid(t.content);
            tree.initialize({
                autoGenerateColumns: false,
                columns: [
                    { binding: 'caption', width: '*' }
                ],
                isReadOnly: true,
                childItemsPath: 'children',
                allowResizing: wjcGrid.AllowResizing.None,
                headersVisibility: wjcGrid.HeadersVisibility.None
            });
            tree.itemFormatter = function (panel, r, c, cell) {
                var itemHeader;
                if (cell.firstElementChild) {
                    itemHeader = cell.firstElementChild.outerHTML;
                }
                else {
                    itemHeader = '&nbsp;&nbsp;&nbsp;&nbsp;';
                }
                var dataItem = panel.rows[r].dataItem;
                cell.innerHTML = itemHeader + '<a>' + dataItem.caption + '</a>';
            };
            var updatingOutlineSource = true;
            tree.selectionChanged.addHandler(function (flexGrid, e) {
                if (updatingOutlineSource) {
                    return;
                }
                var row = e.panel.rows[e.row];
                if (row) {
                    var dataItem = row.dataItem;
                    if (dataItem.position) {
                        _this._scrollToPosition(dataItem.position, true);
                    }
                    else if (dataItem.target) {
                        if (!_this._documentSource) {
                            return;
                        }
                        _this._documentSource.getBookmark(dataItem.target).then(function (pos) {
                            dataItem.position = pos;
                            if (flexGrid.getSelectedState(e.row, e.col) != wjcGrid.SelectedState.None) {
                                _this._scrollToPosition(pos, true);
                            }
                        }, function (reason) {
                        });
                    }
                    if (_this._isMobileTemplate()) {
                        sideTabs.collapse();
                    }
                }
            });
            var isTreeRefreshed = false, refreshTree = function () {
                if (isTreeRefreshed)
                    return;
                if (sideTabs.isCollapsed || !t.isActived || t.isHidden) {
                    return;
                }
                tree.refresh();
                isTreeRefreshed = true;
            }, toggleTab = function () {
                if (!_this._documentSource) {
                    tree.itemsSource = null;
                    sideTabs.hide(t);
                    return;
                }
                var update = function () {
                    if (!_this._documentSource.hasOutlines) {
                        tree.itemsSource = null;
                        sideTabs.hide(t);
                        return;
                    }
                    _this._documentSource.getOutlines().then(function (items) {
                        isTreeRefreshed = false;
                        tree.itemsSource = items;
                        sideTabs.show(t);
                        refreshTree();
                        updatingOutlineSource = false;
                    });
                };
                _addWjHandler(_this._documentEventKey, _this._documentSource.loadCompleted, update);
                update();
            };
            _this._documentSourceChanged.addHandler(toggleTab);
            sideTabs.expanded.addHandler(refreshTree);
            sideTabs.tabPageActived.addHandler(refreshTree);
            toggleTab();
        });
    };
    ViewerBase.prototype._initSidePanelThumbnails = function () {
        var _this = this;
        var sideTabs = wjcCore.Control.getControl(this._sidePanel), thumbnailsPage = sideTabs.addPage(wjcCore.culture.Viewer.thumbnails, exports.icons.thumbnails);
        this._gThumbnailsTitle = thumbnailsPage.outContent.querySelector('.wj-tabtitle');
        this._thumbnailsPageId = thumbnailsPage.id;
        thumbnailsPage.format(function (t) {
            wjcCore.addClass(t.content, 'wj-thumbnaillist');
            var list = new wjcInput.ListBox(t.content), pngUrls = null, isItemsSourceSetting = false, svgStart = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml: space = "preserve" >';
            list.formatItem.addHandler(function (sender, e) {
                var item = e.item, data = e.data;
                item.innerHTML = '';
                if (!_this._pageView.pages) {
                    return;
                }
                var svgContainer = document.createElement('div'), svg = _toDOM(svgStart + '</svg>'), g = document.createElementNS('http://www.w3.org/2000/svg', 'g'), img = document.createElementNS('http://www.w3.org/2000/svg', 'image'), indexDiv = document.createElement('div'), page = _this._pageView.pages[e.index], thumbHeight = page.size.height.valueInPixel * ViewerBase._thumbnailWidth / page.size.width.valueInPixel;
                wjcCore.addClass(item, 'wj-thumbnail-item');
                img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', data);
                img.setAttribute('x', '0');
                img.setAttribute('y', '0');
                img.setAttribute('width', ViewerBase._thumbnailWidth.toString());
                img.setAttribute('height', thumbHeight.toString());
                wjcCore.addClass(svgContainer, 'wj-pagethumbnail');
                svgContainer.setAttribute('tabIndex', '-1');
                g.appendChild(img);
                svg.appendChild(g);
                svgContainer.appendChild(svg);
                item.appendChild(svgContainer);
                rotateThumb(svg, page);
                indexDiv.className = 'page-index';
                indexDiv.innerHTML = (e.index + 1).toString();
                item.appendChild(indexDiv);
            });
            list.selectedIndexChanged.addHandler(function () {
                if (isItemsSourceSetting || list.selectedIndex < 0
                    || list.selectedIndex == _this._pageIndex) {
                    return;
                }
                _this.moveToPage(list.selectedIndex);
                if (_this._isMobileTemplate()) {
                    sideTabs.collapse();
                }
            });
            _this.pageIndexChanged.addHandler(function () { return list.selectedIndex = _this._pageIndex; });
            var rotateThumb = function (svg, page) {
                var thumbWidth = ViewerBase._thumbnailWidth, thumbHeight = page.size.height.valueInPixel * thumbWidth / page.size.width.valueInPixel, container = svg.parentNode;
                _transformSvg(svg, thumbWidth, thumbHeight, 1, page.rotateAngle);
                switch (page.rotateAngle) {
                    case _RotateAngle.Rotation90:
                    case _RotateAngle.Rotation270:
                        var tmpHeight = thumbHeight;
                        thumbHeight = thumbWidth;
                        thumbWidth = tmpHeight;
                        break;
                }
                container.style.width = thumbWidth + 'px';
                container.style.height = thumbHeight + 'px';
                svg.setAttribute('width', thumbWidth.toString());
                svg.setAttribute('height', thumbHeight.toString());
            };
            var createThumbnails = function () {
                if (!_this._documentSource || !_this._documentSource.isLoadCompleted) {
                    return null;
                }
                var urls = [];
                for (var i = 0; i < _this._documentSource.pageCount; i++) {
                    urls.push(_this._documentSource.getRenderToFilterUrl({ format: 'png', resolution: 50, outputRange: i + 1 }));
                }
                return urls;
            };
            var updateItems = function () {
                if (sideTabs.isCollapsed || !t.isActived) {
                    return;
                }
                if (!pngUrls) {
                    pngUrls = createThumbnails();
                }
                if (t.isActived && list.itemsSource !== pngUrls) {
                    list.deferUpdate(function () {
                        isItemsSourceSetting = true;
                        list.itemsSource = pngUrls;
                        list.selectedIndex = _this._pageIndex;
                        isItemsSourceSetting = false;
                    });
                }
            };
            var update = function () {
                if (!_this._documentSource
                    || !_this._documentSource.paginated) {
                    sideTabs.hide(t);
                    list.itemsSource = null;
                    return;
                }
                sideTabs.show(t);
                pngUrls = null;
                updateItems();
            };
            var bindEvents = function () {
                if (!_this._documentSource) {
                    sideTabs.hide(t);
                    list.itemsSource = null;
                    return;
                }
                _addWjHandler(_this._documentEventKey, _this._documentSource.loadCompleted, update);
                _addWjHandler(_this._documentEventKey, _this._documentSource.pageCountChanged, update);
                _addWjHandler(_this._documentEventKey, _this._documentSource.pageSettingsChanged, update);
                update();
            };
            _this._documentSourceChanged.addHandler(bindEvents);
            bindEvents();
            sideTabs.expanded.addHandler(updateItems);
            sideTabs.tabPageActived.addHandler(updateItems);
            updateItems();
            _this._pageView.rotateAngleChanged.addHandler(function () {
                var svgs = list.hostElement.querySelectorAll('svg');
                for (var i = 0; i < svgs.length; i++) {
                    rotateThumb(svgs.item(i), _this._pageView.pages[i]);
                }
            });
        });
    };
    ViewerBase.prototype._initSidePanelExports = function () {
        var _this = this;
        var sideTabs = wjcCore.Control.getControl(this._sidePanel);
        var exportsPage = sideTabs.addPage(wjcCore.culture.Viewer.exports, exports.icons.exports);
        this._gExportsPageTitle = exportsPage.outContent.querySelector('.wj-tabtitle');
        this._exportsPageId = exportsPage.id;
        exportsPage.format(function (t) {
            var settingsHtml = '<div class="wj-exportcontainer">' +
                '<label wj-part="g-wj-exportformat">' + wjcCore.culture.Viewer.exportFormat + '</label>' +
                '<div class="wj-exportformats"></div>' +
                '</div>', settingsElement = _toDOMs(settingsHtml), searchResults;
            t.outContent.querySelector('.wj-tabtitle-wrapper').appendChild(settingsElement);
            _this._gExportFormatTitle = t.outContent.querySelector('[wj-part="g-wj-exportformat"]');
            var exportFormatsDiv = t.outContent.querySelector('.wj-exportformats');
            new wjcInput.ComboBox(exportFormatsDiv);
            wjcCore.addClass(t.content.parentElement, 'wj-exportformats-wrapper');
            var editorElement = document.createElement('div');
            var editor = new _ExportOptionEditor(editorElement);
            t.content.appendChild(editorElement);
            var footerHtml = '<div class="wj-exportformats-footer">' +
                '<a wj-part="btn-apply" href="javascript:void(0)" tabindex="-1" draggable="false">' + wjcCore.culture.Viewer.exportOk + '</a>' +
                '</div>';
            var footerElement = _toDOMs(footerHtml);
            t.content.appendChild(footerElement);
            var applyBtn = t.content.querySelector('[wj-part="btn-apply"]');
            _this._gExportsPageApplyBtn = applyBtn;
            _addEvent(applyBtn, 'click', function () {
                _this._export(editor.options);
                sideTabs.collapse();
            });
        });
        var updateExportTab = true;
        this._documentSourceChanged.addHandler(function () {
            updateExportTab = true;
            if (!_this._documentSource) {
                return;
            }
            _addWjHandler(_this._documentEventKey, _this._documentSource.loadCompleted, function () {
                if (updateExportTab) {
                    _this._ensureExportFormatsLoaded().then(function () {
                        _this._updateExportTab();
                        updateExportTab = (_this._exportFormats == null);
                    });
                }
            });
        });
        sideTabs.tabPageActived.addHandler(function () {
            if (updateExportTab && (sideTabs.activedTabPage.id === _this._exportsPageId)) {
                _this._ensureExportFormatsLoaded().then(function () {
                    _this._updateExportTab();
                    updateExportTab = (_this._exportFormats == null);
                });
            }
        });
    };
    ViewerBase.prototype._ensureExportFormatsLoaded = function () {
        var _this = this;
        if (!this._exportFormats && this._documentSource && !this._documentSource.isDisposed) {
            return this._documentSource.getSupportedExportDescriptions().then(function (items) {
                _this._exportFormats = items;
                _this._setViewerAction(_ViewerActionType.ShowExportsPanel);
            });
        }
        var promise = new _Promise();
        promise.resolve();
        return promise;
    };
    ViewerBase.prototype._updateExportTab = function (refresh) {
        var _this = this;
        if (!this._exportFormats) {
            return;
        }
        var sideTabs = wjcCore.Control.getControl(this._sidePanel), exportsPage = sideTabs.getTabPage(this._exportsPageId), comboExportFormats = wjcCore.Control.getControl(exportsPage.outContent.querySelector('.wj-exportformats')), editor = wjcCore.Control.getControl(exportsPage.content.firstElementChild);
        if (refresh) {
            editor.refresh();
            if (comboExportFormats.itemsSource) {
                comboExportFormats.itemsSource.forEach(function (item) {
                    item.name = _this._exportItemDescriptions[item.format].name;
                });
            }
            comboExportFormats.refresh();
        }
        else {
            var bindingItems = [];
            this._exportFormats.forEach(function (item) {
                var itemDescription = _this._exportItemDescriptions[item.format];
                if (isIOS() && !itemDescription.supportIOS) {
                    return;
                }
                item.name = itemDescription.name;
                bindingItems.push(item);
            });
            comboExportFormats.selectedIndexChanged.addHandler(function () {
                editor.exportDescription = comboExportFormats.selectedItem;
            });
            comboExportFormats.itemsSource = bindingItems;
            comboExportFormats.displayMemberPath = 'name';
            comboExportFormats.selectedValuePath = 'format';
            comboExportFormats.selectedIndex = -1;
        }
    };
    ViewerBase.prototype._initSidePanelPageSetup = function () {
        var _this = this;
        var sideTabs = wjcCore.Control.getControl(this._sidePanel);
        var pageSetupPage = sideTabs.addPage(wjcCore.culture.Viewer.pageSetup, exports.icons.pageSetup);
        this._gPageSetupTitle = pageSetupPage.outContent.querySelector('.wj-tabtitle');
        this._pageSetupPageId = pageSetupPage.id;
        pageSetupPage.format(function (t) {
            var editorElement = document.createElement('div');
            var editor = new _PageSetupEditor(editorElement);
            t.content.appendChild(editorElement);
            wjcCore.addClass(editorElement, 'wj-pagesetupcontainer');
            var footerHtml = '<div class="wj-pagesetup-footer">' +
                '<a wj-part="btn-apply" href="javascript:void(0)" tabindex="-1" draggable="false">' + wjcCore.culture.Viewer.ok + '</a>' +
                '</div>';
            var footerElement = _toDOMs(footerHtml);
            t.content.appendChild(footerElement);
            var applyBtn = t.content.querySelector('[wj-part="btn-apply"]');
            _this._gPageSetupApplyBtn = applyBtn;
            _addEvent(applyBtn, 'click', function () {
                _this._setPageSettings(editor.pageSettings);
                sideTabs.collapse();
            });
            var updatePageSettings = function () {
                editor.pageSettings = _this._documentSource.pageSettings;
            }, update = function () {
                if (!_this._documentSource) {
                    return;
                }
                _addWjHandler(_this._documentEventKey, _this._documentSource.pageSettingsChanged, updatePageSettings);
                updatePageSettings();
            };
            _this._documentSourceChanged.addHandler(update);
            update();
        });
    };
    ViewerBase.prototype._executeAction = function (action) {
        if (this._actionIsDisabled(action)) {
            return;
        }
        switch (action) {
            case _ViewerActionType.TogglePaginated:
                this._innerPaginated = !this._innerPaginated;
                break;
            case _ViewerActionType.Print:
                if (this._documentSource) {
                    this._documentSource.print(this._pages.map(function (page) { return page.rotateAngle; }));
                }
                break;
            case _ViewerActionType.ShowExportsPanel:
                wjcCore.Control.getControl(this._sidePanel).active(this._exportsPageId);
                break;
            case _ViewerActionType.Portrait:
                this._setPageLandscape(false);
                break;
            case _ViewerActionType.Landscape:
                this._setPageLandscape(true);
                break;
            case _ViewerActionType.ShowPageSetupDialog:
                this.showPageSetupDialog();
                break;
            case _ViewerActionType.FirstPage:
                this.moveToPage(0);
                break;
            case _ViewerActionType.LastPage:
                this._moveToLastPage();
                break;
            case _ViewerActionType.PrePage:
                this.moveToPage(this._pageIndex - 1);
                break;
            case _ViewerActionType.NextPage:
                this.moveToPage(this._pageIndex + 1);
                break;
            case _ViewerActionType.Backward:
                this._moveBackwardHistory();
                break;
            case _ViewerActionType.Forward:
                this._moveForwardHistory();
                break;
            case _ViewerActionType.SelectTool:
                this.mouseMode = MouseMode.SelectTool;
                break;
            case _ViewerActionType.MoveTool:
                this.mouseMode = MouseMode.MoveTool;
                break;
            case _ViewerActionType.Continuous:
                this._addHistory(false, true);
                this.viewMode = ViewMode.Continuous;
                break;
            case _ViewerActionType.Single:
                this._addHistory(false, true);
                this.viewMode = ViewMode.Single;
                break;
            case _ViewerActionType.FitPageWidth:
                this.zoomMode = ZoomMode.PageWidth;
                break;
            case _ViewerActionType.FitWholePage:
                this.zoomMode = ZoomMode.WholePage;
                break;
            case _ViewerActionType.ZoomOut:
                this._zoomBtnClicked(false, ViewerBase._defaultZoomValues);
                break;
            case _ViewerActionType.ZoomIn:
                this._zoomBtnClicked(true, ViewerBase._defaultZoomValues);
                break;
            case _ViewerActionType.ToggleFullScreen:
                this.fullScreen = !this.fullScreen;
                break;
            case _ViewerActionType.ShowHamburgerMenu:
                this._hamburgerMenu.showMenu();
                break;
            case _ViewerActionType.ShowViewMenu:
                this._viewMenu.showMenu();
                break;
            case _ViewerActionType.ShowSearchBar:
                this._showSearchBar(wjcCore.hasClass(this._searchBar, exports._hiddenCss));
                this._setViewerAction(_ViewerActionType.ShowSearchBar);
                break;
            case _ViewerActionType.ShowThumbnails:
                wjcCore.Control.getControl(this._sidePanel).active(this._thumbnailsPageId);
                break;
            case _ViewerActionType.ShowOutlines:
                wjcCore.Control.getControl(this._sidePanel).active(this._outlinesPageId);
                break;
            case _ViewerActionType.ShowPageSetupPanel:
                wjcCore.Control.getControl(this._sidePanel).active(this._pageSetupPageId);
                break;
            case _ViewerActionType.ShowZoomBar:
                this._showFooter(true);
                break;
            case _ViewerActionType.SearchPrev:
                this._searchManager.search(true);
                break;
            case _ViewerActionType.SearchNext:
                this._searchManager.search();
                break;
            case _ViewerActionType.ShowSearchOptions:
                this._searchOptionsMenu.showMenu(true);
                break;
            case _ViewerActionType.SearchMatchCase:
                this._searchManager.matchCase = !this._searchManager.matchCase;
                break;
            case _ViewerActionType.SearchMatchWholeWord:
                this._searchManager.wholeWord = !this._searchManager.wholeWord;
                break;
            case _ViewerActionType.RubberbandTool:
                this.mouseMode = MouseMode.RubberbandTool;
                break;
            case _ViewerActionType.MagnifierTool:
                this.mouseMode = MouseMode.MagnifierTool;
                break;
            case _ViewerActionType.RotateDocument:
                this._rotateDocument();
                break;
            case _ViewerActionType.RotatePage:
                this._rotatePage();
                break;
        }
    };
    ViewerBase.prototype._initSearchOptionsMenu = function (owner) {
        this._searchOptionsMenu = new _SearchOptionsMenu(this, owner);
    };
    ViewerBase.prototype._initHamburgerMenu = function (owner) {
        this._hamburgerMenu = new _HamburgerMenu(this, owner);
    };
    ViewerBase.prototype._initViewMenu = function (owner) {
        this._viewMenu = new _ViewMenu(this, owner);
    };
    ViewerBase.prototype._initToolbar = function () {
        new _ViewerToolbar(this._toolbar, this);
        new _ViewerMobileToolbar(this._mobileToolbar, this);
    };
    ViewerBase.prototype._clearExportFormats = function () {
        this._exportFormats = null;
    };
    Object.defineProperty(ViewerBase.prototype, "_exportItemDescriptions", {
        get: function () {
            if (!ViewerBase._exportItems) {
                ViewerBase._exportItems = {
                    'pdf': { name: wjcCore.culture.Viewer.pdfExportName, supportIOS: true },
                    'doc': { name: wjcCore.culture.Viewer.docExportName, supportIOS: false },
                    'docx': { name: wjcCore.culture.Viewer.docxExportName, supportIOS: false },
                    'rtf': { name: wjcCore.culture.Viewer.rtfExportName, supportIOS: false },
                    'xlsx': { name: wjcCore.culture.Viewer.xlsxExportName, supportIOS: true },
                    'xls': { name: wjcCore.culture.Viewer.xlsExportName, supportIOS: true },
                    'mhtml': { name: wjcCore.culture.Viewer.mhtmlExportName, supportIOS: true },
                    'html': { name: wjcCore.culture.Viewer.htmlExportName, supportIOS: true },
                    'zip': { name: wjcCore.culture.Viewer.metafileExportName, supportIOS: false },
                    'csv': { name: wjcCore.culture.Viewer.csvExportName, supportIOS: true },
                    'tiff': { name: wjcCore.culture.Viewer.tiffExportName, supportIOS: true },
                    'bmp': { name: wjcCore.culture.Viewer.bmpExportName, supportIOS: false },
                    'emf': { name: wjcCore.culture.Viewer.emfExportName, supportIOS: false },
                    'gif': { name: wjcCore.culture.Viewer.gifExportName, supportIOS: false },
                    'jpeg': { name: wjcCore.culture.Viewer.jpegExportName, suportIOS: false },
                    'jpg': { name: wjcCore.culture.Viewer.jpegExportName, supportIOS: false },
                    'png': { name: wjcCore.culture.Viewer.pngExportName, supportIOS: false }
                };
            }
            return ViewerBase._exportItems;
        },
        enumerable: true,
        configurable: true
    });
    ViewerBase.prototype._actionIsChecked = function (action) {
        switch (action) {
            case _ViewerActionType.TogglePaginated:
                return this._innerPaginated === true;
            case _ViewerActionType.Landscape:
                if (this._documentSource && this._documentSource.pageSettings) {
                    return this._documentSource.pageSettings.landscape;
                }
                return false;
            case _ViewerActionType.Portrait:
                if (this._documentSource && this._documentSource.pageSettings) {
                    return !this._documentSource.pageSettings.landscape;
                }
                return false;
            case _ViewerActionType.SelectTool:
                return this.mouseMode === MouseMode.SelectTool;
            case _ViewerActionType.MoveTool:
                return this.mouseMode === MouseMode.MoveTool;
            case _ViewerActionType.RubberbandTool:
                return this.mouseMode === MouseMode.RubberbandTool;
            case _ViewerActionType.MagnifierTool:
                return this.mouseMode === MouseMode.MagnifierTool;
            case _ViewerActionType.Continuous:
                return this.viewMode == ViewMode.Continuous;
            case _ViewerActionType.Single:
                return this.viewMode == ViewMode.Single;
            case _ViewerActionType.ToggleFullScreen:
                return this.fullScreen;
            case _ViewerActionType.FitPageWidth:
                return this.zoomMode == ZoomMode.PageWidth;
            case _ViewerActionType.FitWholePage:
                return this.zoomMode == ZoomMode.WholePage;
            case _ViewerActionType.SearchMatchCase:
                return this._searchManager.matchCase;
            case _ViewerActionType.SearchMatchWholeWord:
                return this._searchManager.wholeWord;
            case _ViewerActionType.ShowSearchBar:
                return !wjcCore.hasClass(this._searchBar, exports._hiddenCss);
        }
        return false;
    };
    ViewerBase.prototype._isDocumentSourceLoaded = function () {
        return this._documentSource && this._documentSource.isLoadCompleted;
    };
    ViewerBase.prototype._actionIsDisabled = function (action) {
        if (!this._isDocumentSourceLoaded() || !(this._documentSource.pageCount > 0)) {
            return true;
        }
        switch (action) {
            case _ViewerActionType.TogglePaginated:
                return this._innerPaginated == null;
            case _ViewerActionType.ShowExportsPanel:
                return !this._exportFormats || this._exportFormats.length === 0;
            case _ViewerActionType.Landscape:
            case _ViewerActionType.Portrait:
            case _ViewerActionType.ShowPageSetupDialog:
            case _ViewerActionType.ShowPageSetupPanel:
                if (this._documentSource && this._documentSource.pageSettings) {
                    return !this._documentSource.paginated;
                }
                return true;
            case _ViewerActionType.FirstPage:
            case _ViewerActionType.PrePage:
                return this._pageIndex <= 0;
            case _ViewerActionType.LastPage:
            case _ViewerActionType.NextPage:
                return this._pageIndex >= this._documentSource.pageCount - 1;
            case _ViewerActionType.Backward:
                return !this._historyManager.canBackward();
            case _ViewerActionType.Forward:
                return !this._historyManager.canForward();
            case _ViewerActionType.Continuous:
            case _ViewerActionType.Single:
                return !this._documentSource || !this._documentSource.paginated;
            case _ViewerActionType.ZoomOut:
                return this.zoomFactor <= ViewerBase._defaultZoomValues[0].value;
            case _ViewerActionType.ZoomIn:
                var zoomValues = ViewerBase._defaultZoomValues;
                return this.zoomFactor >= zoomValues[zoomValues.length - 1].value;
        }
        return false;
    };
    ViewerBase.prototype._actionIsShown = function (action) {
        var features = this._documentSource ? (this._documentSource.features) : null;
        switch (action) {
            case _ViewerActionType.TogglePaginated:
                return features && features.paginated && features.nonPaginated;
            case _ViewerActionType.Landscape:
            case _ViewerActionType.Portrait:
            case _ViewerActionType.ShowPageSetupDialog:
            case _ViewerActionType.ShowPageSetupPanel:
                return features ? features.pageSettings : this._supportsPageSettingActions();
            case _ViewerActionType.SelectTool:
            case _ViewerActionType.MoveTool:
            case _ViewerActionType.MagnifierTool:
            case _ViewerActionType.RubberbandTool:
                return !wjcCore.isMobile();
            case _ViewerActionType.ShowSearchBar:
                return features && (!this._documentSource.paginated || features.textSearchInPaginatedMode);
            case _ViewerActionType.ShowOutlines:
                return this._documentSource && this._documentSource.hasOutlines;
        }
        return true;
    };
    ViewerBase.prototype._onViewerActionStatusChanged = function (e) {
        this._viewerActionStatusChanged.raise(this, e);
    };
    ViewerBase.prototype._setViewerAction = function (actionType, disabled, checked, shown) {
        var action = {
            actionType: actionType,
            disabled: disabled ? disabled : this._actionIsDisabled(actionType),
            checked: checked ? checked : this._actionIsChecked(actionType),
            shown: shown ? shown : this._actionIsShown(actionType)
        };
        this._onViewerActionStatusChanged({ action: action });
    };
    ViewerBase.prototype._updateViewerActions = function () {
        this._updatePageSettingsActions();
        this._updateViewModeActions();
        this._updateMouseModeActions();
        this._setViewerAction(_ViewerActionType.ShowExportsPanel);
    };
    ViewerBase.prototype._updateViewModeActions = function () {
        this._setViewerAction(_ViewerActionType.Continuous);
        this._setViewerAction(_ViewerActionType.Single);
    };
    ViewerBase.prototype._updatePageSettingsActions = function () {
        this._setViewerAction(_ViewerActionType.TogglePaginated);
        this._setViewerAction(_ViewerActionType.Landscape);
        this._setViewerAction(_ViewerActionType.Portrait);
        this._setViewerAction(_ViewerActionType.ShowPageSetupDialog);
    };
    ViewerBase.prototype._updateMouseModeActions = function () {
        this._setViewerAction(_ViewerActionType.SelectTool);
        this._setViewerAction(_ViewerActionType.MoveTool);
        this._setViewerAction(_ViewerActionType.MagnifierTool);
        this._setViewerAction(_ViewerActionType.RubberbandTool);
    };
    ViewerBase.prototype._updateZoomModeActions = function () {
        this._setViewerAction(_ViewerActionType.FitPageWidth);
        this._setViewerAction(_ViewerActionType.FitWholePage);
    };
    ViewerBase.prototype._updateZoomFactorActions = function () {
        this._setViewerAction(_ViewerActionType.ZoomOut);
        this._setViewerAction(_ViewerActionType.ZoomIn);
    };
    ViewerBase.prototype._onPageSettingsUpdated = function () {
        this._updatePageSettingsActions();
        this._updateViewModeActions();
        this._resetToolbarWidth();
    };
    ViewerBase.prototype._onPageCountUpdated = function () {
        this._updatePageNavActions();
        this._resetToolbarWidth();
    };
    ViewerBase.prototype._updatePageNavActions = function () {
        this._setViewerAction(_ViewerActionType.FirstPage);
        this._setViewerAction(_ViewerActionType.LastPage);
        this._setViewerAction(_ViewerActionType.PrePage);
        this._setViewerAction(_ViewerActionType.NextPage);
    };
    ViewerBase.prototype._onHistoryManagerStatusUpdated = function () {
        this._setViewerAction(_ViewerActionType.Backward);
        this._setViewerAction(_ViewerActionType.Forward);
    };
    ViewerBase.prototype._updateUI = function () {
        var _this = this;
        Object.keys(_ViewerActionType).forEach(function (value) {
            if (!isNaN(value)) {
                _this._setViewerAction(_ViewerActionType[_ViewerActionType[value]]);
            }
        });
        var sideTabs = wjcCore.Control.getControl(this._sidePanel);
        if (sideTabs) {
            sideTabs.enableAll(this._isDocumentSourceLoaded());
        }
    };
    ViewerBase.prototype._updateViewContainerCursor = function () {
        var showMoveTool = this.mouseMode === MouseMode.MoveTool;
        if (showMoveTool) {
            if (!wjcCore.hasClass(this._viewpanelContainer, 'move')) {
                wjcCore.addClass(this._viewpanelContainer, 'move');
            }
        }
        else if (wjcCore.hasClass(this._viewpanelContainer, 'move')) {
            wjcCore.removeClass(this._viewpanelContainer, 'move');
        }
    };
    ViewerBase.prototype._updateFullScreenStyle = function () {
        var fullScreenClass = 'full-screen', body = document.body;
        if (this.fullScreen) {
            this._bodyOriginScrollLeft = (document.documentElement && document.documentElement.scrollLeft) || body.scrollLeft;
            this._bodyOriginScrollTop = (document.documentElement && document.documentElement.scrollTop) || body.scrollTop;
            wjcCore.addClass(this.hostElement, fullScreenClass);
            wjcCore.addClass(body, fullScreenClass);
            this._hostOriginWidth = this.hostElement.style.width;
            this._hostOriginHeight = this.hostElement.style.height;
            this.hostElement.style.width = '100%';
            this.hostElement.style.height = '100%';
            window.scrollTo(0, 0);
        }
        else {
            wjcCore.removeClass(this.hostElement, fullScreenClass);
            wjcCore.removeClass(body, fullScreenClass);
            this.hostElement.style.width = this._hostOriginWidth;
            this.hostElement.style.height = this._hostOriginHeight;
            if (wjcCore.isNumber(this._bodyOriginScrollLeft)) {
                if (document.documentElement) {
                    document.documentElement.scrollLeft = this._bodyOriginScrollLeft;
                }
                body.scrollLeft = this._bodyOriginScrollLeft;
            }
            if (wjcCore.isNumber(this._bodyOriginScrollTop)) {
                if (document.documentElement) {
                    document.documentElement.scrollTop = this._bodyOriginScrollTop;
                }
                body.scrollTop = this._bodyOriginScrollTop;
            }
        }
        this.refresh();
    };
    ViewerBase.prototype._export = function (options) {
        var url = this._documentSource.getRenderToFilterUrl(options);
        if (isIOS()) {
            window.open(url);
            return;
        }
        var iframe = document.querySelector('#viewDownloader');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'viewDownloader';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
        }
        iframe.src = url;
    };
    ViewerBase.prototype.showPageSetupDialog = function () {
        if (!this._pageSetupDialog) {
            this._createPageSetupDialog();
        }
        this._pageSetupDialog.showWithValue(this._documentSource.pageSettings);
    };
    ViewerBase.prototype._createPageSetupDialog = function () {
        var self = this, ele = document.createElement("div");
        ele.style.display = 'none';
        self.hostElement.appendChild(ele);
        self._pageSetupDialog = new _PageSetupDialog(ele);
        self._pageSetupDialog.applied.addHandler(function () { return self._setPageSettings(self._pageSetupDialog.pageSettings); });
    };
    ViewerBase.prototype.zoomToView = function () {
        wjcCore._deprecated('zoomToView', 'zoomMode');
        var doc = this._documentSource;
        if (!doc) {
            return;
        }
        this.zoomMode = ZoomMode.WholePage;
    };
    ViewerBase.prototype.zoomToViewWidth = function () {
        wjcCore._deprecated('zoomToViewWidth', 'zoomMode');
        var doc = this._documentSource;
        if (!doc) {
            return;
        }
        this.zoomMode = ZoomMode.PageWidth;
    };
    ViewerBase.prototype._setPageLandscape = function (landscape) {
        var self = this, pageSettings = this._documentSource.pageSettings;
        _setLandscape(pageSettings, landscape);
        self._setPageSettings(pageSettings);
    };
    ViewerBase.prototype._setPaginated = function (paginated) {
        var features = this._documentSource.features, pageSettings = this._documentSource.pageSettings;
        if (!features || !pageSettings)
            return;
        if (paginated == pageSettings.paginated)
            return;
        if (paginated && features.paginated) {
            pageSettings.paginated = true;
            this._setPageSettings(pageSettings);
        }
        else if (!paginated && features.nonPaginated) {
            pageSettings.paginated = false;
            this._setPageSettings(pageSettings);
        }
    };
    ViewerBase.prototype._setPageSettings = function (pageSettings) {
        var _this = this;
        this._showViewPanelMessage();
        this._setDocumentRendering();
        return this._documentSource.setPageSettings(pageSettings).then(function (data) {
            _this._resetDocument();
            _this._reRenderDocument();
        }).catch(function (reason) {
            _this._showViewPanelErrorMessage(_getErrorMessage(reason));
        });
    };
    ViewerBase.prototype._showViewPanelErrorMessage = function (message) {
        this._showViewPanelMessage(message, 'errormessage');
    };
    ViewerBase.prototype._showViewPanelMessage = function (message, className) {
        var div = this._viewpanelContainer.querySelector('.wj-viewer-loading');
        if (!div) {
            div = document.createElement('div');
            div.innerHTML = '<span class="verticalalign"></span><span class="textspan"></span>';
            this._viewpanelContainer.appendChild(div);
        }
        div.className = 'wj-viewer-loading';
        if (className) {
            wjcCore.addClass(div, className);
        }
        var textspan = div.querySelector('.textspan');
        if (textspan) {
            textspan.innerHTML = message || wjcCore.culture.Viewer.loading;
        }
    };
    ViewerBase.prototype._removeViewPanelMessage = function () {
        var div = this._viewpanelContainer.querySelector('.wj-viewer-loading');
        if (div) {
            this._viewpanelContainer.removeChild(div);
        }
    };
    ViewerBase.prototype._reRenderDocument = function () {
        if (this._documentSource) {
            this._showViewPanelMessage();
            this._documentSource.load();
        }
    };
    ViewerBase.prototype._zoomBtnClicked = function (zoomIn, zoomValues) {
        var i, zoomIndex, isFixedValue;
        for (i = 0; i < zoomValues.length; i++) {
            if (zoomValues[i].value > this.zoomFactor) {
                zoomIndex = i - 0.5;
                break;
            }
            else if (zoomValues[i].value === this.zoomFactor) {
                zoomIndex = i;
                break;
            }
        }
        if (zoomIndex == null) {
            zoomIndex = zoomValues.length - 0.5;
        }
        if (zoomIndex <= 0 && !zoomIn) {
            return;
        }
        if (zoomIndex >= zoomValues.length - 1 && zoomIn) {
            return;
        }
        if (zoomIn) {
            zoomIndex = Math.floor(zoomIndex) + 1;
        }
        else {
            zoomIndex = Math.ceil(zoomIndex) - 1;
        }
        this.zoomFactor = zoomValues[zoomIndex].value;
    };
    ViewerBase.prototype._getDocumentSource = function () {
        return this._documentSource;
    };
    ViewerBase.prototype._setDocumentSource = function (value) {
        var _this = this;
        this._loadDocument(value).then(function (v) {
            if (_this._documentSource != value) {
                return;
            }
            _this._ensureExportFormatsLoaded();
        });
    };
    ViewerBase.prototype._loadDocument = function (value) {
        var _this = this;
        var promise = new _Promise();
        if (this._documentSource === value) {
            return promise;
        }
        this._disposeDocument();
        this._documentSource = value;
        if (value) {
            _addWjHandler(this._documentEventKey, value.loading, function () {
                _this._updateUI();
            }, this);
            _addWjHandler(this._documentEventKey, value.loadCompleted, this._onDocumentSourceLoadCompleted, this);
            _addWjHandler(this._documentEventKey, value.queryLoadingData, function (s, e) {
                _this.onQueryLoadingData(e);
            }, this);
            if (!value.isLoadCompleted) {
                this._showViewPanelMessage();
                value.load().then(function (v) {
                    _this._keepServiceConnection();
                    promise.resolve(v);
                }).catch(function (reason) {
                    _this._showViewPanelErrorMessage(_getErrorMessage(reason));
                });
            }
            else {
                this._onDocumentSourceLoadCompleted();
                this._keepServiceConnection();
                promise.resolve();
            }
        }
        this._onDocumentSourceChanged();
        return promise;
    };
    ViewerBase.prototype._hyperlinkClicked = function (a) {
        var bookmarkAttr = a.getAttribute(_Page._bookmarkAttr);
        if (bookmarkAttr) {
            this._goToBookmark(bookmarkAttr);
            return;
        }
        var customActionAttr = a.getAttribute(_Page._customActionAttr);
        if (customActionAttr) {
            this._executeCustomAction(customActionAttr);
        }
    };
    ViewerBase.prototype._onDocumentSourceLoadCompleted = function () {
        var _this = this;
        var errorList = this._documentSource.errors;
        if (this._documentSource.isLoadCompleted) {
            this._removeViewPanelMessage();
            this._pages.length = 0;
            if (this._documentSource.pageCount <= 0) {
                this._updateUI();
                return;
            }
            var defaultPageSize = {
                width: this._documentSource.pageSettings.width,
                height: this._documentSource.pageSettings.height
            };
            for (var i = 0; i < this._documentSource.pageCount; i++) {
                var page = new _Page(this._documentSource, i, defaultPageSize);
                page.linkClicked.addHandler(function (s, e) { _this._hyperlinkClicked(e.element); });
                this._pages.push(page);
            }
            this._pageView.pages = this._pages;
            if (!this._documentSource.paginated) {
                this.viewMode = ViewMode.Single;
            }
            if (!this._autoHeightCalculated) {
                this._autoCalculateHeight();
                this._autoHeightCalculated = true;
            }
            var position = this._documentSource.initialPosition || this._initialPosition;
            this._documentSource.initialPosition = null;
            this._initialPosition = null;
            if (!position || position.pageIndex == 0) {
                this._pageIndex = 0;
                position = { pageIndex: 0 };
            }
            this._scrollToPosition(position);
            this._updateHistoryCurrent();
            if (errorList && errorList.length > 0) {
                var errors = "";
                for (var i = 0; i < errorList.length; i++) {
                    errors += errorList[i] + "\r\n";
                }
            }
            this._updateUI();
        }
    };
    ViewerBase.prototype._clearKeepSerConnTimer = function () {
        if (this._keepSerConnTimer != null) {
            clearTimeout(this._keepSerConnTimer);
        }
    };
    ViewerBase.prototype._keepServiceConnection = function () {
        var _this = this;
        this._clearKeepSerConnTimer();
        var documentSource = this._documentSource;
        if (!documentSource) {
            return;
        }
        this._keepSerConnTimer = setTimeout(function () {
            if (_this._documentSource !== documentSource) {
                return;
            }
            _this._documentSource.getStatus().then(function (v) { return _this._keepServiceConnection(); });
        }, this._getExpiredTime());
    };
    ViewerBase.prototype._getExpiredTime = function () {
        if (this._expiredTime) {
            return this._expiredTime;
        }
        var documentSource = this._documentSource;
        if (!documentSource || !documentSource.expiredDateTime || !documentSource.executionDateTime) {
            return 6000;
        }
        this._expiredTime = documentSource.expiredDateTime.getTime() - documentSource.executionDateTime.getTime();
        this._expiredTime = Math.max(this._expiredTime - 120000, 0);
        return this._expiredTime;
    };
    ViewerBase.prototype._disposeDocument = function () {
        if (this._documentSource) {
            _removeAllWjHandlers(this._documentEventKey, this._documentSource.disposed);
            _removeAllWjHandlers(this._documentEventKey, this._documentSource.pageCountChanged);
            _removeAllWjHandlers(this._documentEventKey, this._documentSource.pageSettingsChanged);
            _removeAllWjHandlers(this._documentEventKey, this._documentSource.loadCompleted);
            _removeAllWjHandlers(this._documentEventKey, this._documentSource.queryLoadingData);
            this._documentSource.dispose();
        }
        this._resetDocument();
    };
    ViewerBase.prototype._resetDocument = function () {
        this._pages.length = 0;
        this._pageView.resetPages();
        this._pageIndex = 0;
        clearTimeout(this._historyTimer);
        this._historyManager.clear();
        if (this._rubberband) {
            this._rubberband.reset();
        }
        if (this._magnifier) {
            this._magnifier.reset();
        }
    };
    ViewerBase.prototype._setDocumentRendering = function () {
        this._documentSource._updateIsLoadCompleted(false);
    };
    ViewerBase.prototype.moveToPage = function (index) {
        return this._innerMoveToPage(index);
    };
    ViewerBase.prototype._getCurrentPosition = function () {
        return _getPositionByHitTestInfo(this._pageView.hitTest(0, 0));
    };
    ViewerBase.prototype._resolvePageIndex = function (pageIndex) {
        return Math.min(this._documentSource.pageCount - 1, Math.max(pageIndex, 0));
    };
    ViewerBase.prototype._innerMoveToPage = function (pageIndex) {
        var resolvedIndex = this._resolvePageIndex(pageIndex);
        if (resolvedIndex != this.pageIndex) {
            this._addHistory(false, true);
        }
        this._updatePageIndex(pageIndex);
        return this._pageView.moveToPage(pageIndex);
    };
    ViewerBase.prototype._moveToLastPage = function () {
        var promise = new _Promise();
        if (!this._ensureDocumentLoadCompleted(promise)) {
            return promise;
        }
        return this._innerMoveToPage(this._documentSource.pageCount - 1);
    };
    ViewerBase.prototype._moveBackwardHistory = function () {
        if (!this._ensureDocumentLoadCompleted() || !this._historyManager.canBackward()) {
            return;
        }
        var history = this._historyManager.backward();
        this._moveToHistory(history);
    };
    ViewerBase.prototype._moveForwardHistory = function () {
        if (!this._ensureDocumentLoadCompleted() || !this._historyManager.canForward()) {
            return;
        }
        var history = this._historyManager.forward();
        this._moveToHistory(history);
    };
    ViewerBase.prototype._moveToHistory = function (history) {
        var _this = this;
        if (!history) {
            return;
        }
        this._historyMoving = true;
        this.viewMode = history.viewMode;
        if (history.zoomMode === ZoomMode.Custom) {
            this.zoomFactor = history.zoomFactor;
        }
        else {
            this.zoomMode = history.zoomMode;
        }
        this._scrollToPosition(history.position).then(function (_) {
            _this._historyMoving = false;
        });
        for (var i = 0; i < history.pageAngles.length; i++) {
            this._pageView.rotatePageTo(i, history.pageAngles[i]);
        }
    };
    ViewerBase.prototype._isPositionEquals = function (p1, p2, checkBounds) {
        if (p1.pageIndex !== p2.pageIndex) {
            return false;
        }
        if (!checkBounds) {
            return true;
        }
        if (p1.pageBounds == p2.pageBounds) {
            return true;
        }
        if (p1.pageBounds == null || p2.pageBounds == null) {
            return false;
        }
        return p1.pageBounds.x === p2.pageBounds.x && p1.pageBounds.y === p2.pageBounds.y;
    };
    ViewerBase.prototype._isPageAnglesChanged = function (pageAngles) {
        if (pageAngles.length != this._pageView.pages.length) {
            return true;
        }
        var length = pageAngles.length;
        for (var i = 0; i < length; i++) {
            if (pageAngles[i] !== this._pageView.pages[i].rotateAngle) {
                return true;
            }
        }
        return false;
    };
    ViewerBase.prototype._updateHistoryCurrent = function () {
        this._historyManager.current.position = this._getCurrentPosition();
        this._historyManager.current.zoomMode = this.zoomMode;
        this._historyManager.current.zoomFactor = this.zoomFactor;
        this._historyManager.current.viewMode = this.viewMode;
        this._updateCurrentPageAngles(this._historyManager.current);
    };
    ViewerBase.prototype._innerAddHistory = function (checkBounds) {
        var currentPosition = this._getCurrentPosition(), current = this._historyManager.current;
        if (this._isPositionEquals(currentPosition, current.position, checkBounds)
            && this.viewMode === current.viewMode
            && this.zoomMode === current.zoomMode
            && this.zoomFactor === current.zoomFactor
            && !this._isPageAnglesChanged(current.pageAngles)) {
            return;
        }
        current.position = current.position || this._getCurrentPosition();
        current.viewMode = current.viewMode == null ? this.viewMode : current.viewMode;
        current.zoomMode = current.zoomMode == null ? this.zoomMode : current.zoomMode;
        current.zoomFactor = current.zoomFactor == null ? this.zoomFactor : current.zoomFactor;
        if (!current.pageAngles) {
            this._updateCurrentPageAngles(current);
        }
        this._historyManager.add();
        this._updateHistoryCurrent();
    };
    ViewerBase.prototype._addHistory = function (checkBounds, delay, history) {
        var _this = this;
        if (this.isUpdating || this._historyMoving) {
            return;
        }
        if (!delay) {
            this._innerAddHistory(checkBounds);
            return;
        }
        this._mergeHistory(history);
        if (this._historyTimer != null) {
            clearTimeout(this._historyTimer);
        }
        this._historyTimer = setTimeout(function () {
            _this._historyTimer = null;
            _this._innerAddHistory(checkBounds);
        }, ViewerBase._historyTimeout);
    };
    ViewerBase.prototype._updateCurrentPageAngles = function (current) {
        if (!current.pageAngles) {
            current.pageAngles = new Array();
        }
        var pagesLength = this._pageView.pages.length;
        for (var i = 0; i < pagesLength; i++) {
            current.pageAngles[i] = this._pageView.pages[i].rotateAngle;
        }
    };
    ViewerBase.prototype._mergeHistory = function (history) {
        var current = this._historyManager.current;
        if (!history) {
            current.viewMode = this.viewMode;
            current.zoomMode = this.zoomMode;
            current.zoomFactor = this.zoomFactor;
            this._updateCurrentPageAngles(current);
            return;
        }
        if (history.viewMode != null) {
            current.viewMode = history.viewMode;
        }
        if (history.zoomMode != null) {
            current.zoomMode = history.zoomMode;
        }
        if (history.zoomFactor != null) {
            current.zoomFactor = history.zoomFactor;
        }
        if (history.pageAngles) {
            current.pageAngles = new Array();
            var pagesLength = this._pageView.pages.length;
            for (var i = 0; i < pagesLength; i++) {
                current.pageAngles[i] = history.pageAngles[i];
            }
        }
    };
    ViewerBase.prototype._ensureDocumentLoadCompleted = function (promise) {
        if (!this._documentSource) {
            if (promise) {
                promise.reject('Cannot set page index without document source.');
            }
            return false;
        }
        if (!this._documentSource.isLoadCompleted) {
            if (promise) {
                promise.reject('Cannot set page index when document source is not loaded completely.');
            }
            return false;
        }
        return true;
    };
    ViewerBase.prototype._updatePageIndex = function (index) {
        if (!this._documentSource) {
            return;
        }
        index = Math.min(this._documentSource.pageCount - 1, Math.max(index, 0));
        if (this._pageIndex === index) {
            return;
        }
        this._pageIndex = index;
        this.onPageIndexChanged();
    };
    ViewerBase.prototype._getRotatedAngle = function (currentAngle) {
        switch (currentAngle) {
            case _RotateAngle.NoRotate:
                return _RotateAngle.Rotation90;
            case _RotateAngle.Rotation90:
                return _RotateAngle.Rotation180;
            case _RotateAngle.Rotation180:
                return _RotateAngle.Rotation270;
            case _RotateAngle.Rotation270:
                return _RotateAngle.NoRotate;
        }
        return _RotateAngle.NoRotate;
    };
    ViewerBase.prototype._rotateDocument = function () {
        this._addHistory(false, true);
        var pagesLength = this._pageView.pages.length;
        for (var i = 0; i < pagesLength; i++) {
            this._pageView.rotatePageTo(i, this._getRotatedAngle(this._pageView.pages[i].rotateAngle));
        }
    };
    ViewerBase.prototype._rotatePage = function () {
        this._addHistory(false, true);
        var currentPage = this._pageView.pages[this._pageIndex];
        this._pageView.rotatePageTo(this._pageIndex, this._getRotatedAngle(currentPage.rotateAngle));
    };
    Object.defineProperty(ViewerBase.prototype, "zoomMode", {
        get: function () {
            return this._pageView.zoomMode;
        },
        set: function (value) {
            this._pageView.zoomMode = value;
            this._updateZoomModeActions();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewerBase.prototype, "zoomFactor", {
        get: function () {
            return this._pageView.zoomFactor;
        },
        set: function (value) {
            this._pageView.zoomFactor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewerBase.prototype, "viewMode", {
        get: function () {
            return this._viewMode;
        },
        set: function (value) {
            if (this._viewMode === value) {
                return;
            }
            this._viewMode = value;
            this.onViewModeChanged();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewerBase.prototype, "selectMouseMode", {
        get: function () {
            return this._mouseMode === MouseMode.SelectTool;
        },
        set: function (value) {
            wjcCore._deprecated('selectMouseMode', 'mouseMode');
            if ((value && this._mouseMode === MouseMode.SelectTool) ||
                (!value && this._mouseMode !== MouseMode.SelectTool)) {
                return;
            }
            this.mouseMode = value ? MouseMode.SelectTool : MouseMode.MoveTool;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewerBase.prototype, "mouseMode", {
        get: function () {
            return this._mouseMode;
        },
        set: function (value) {
            if (this._mouseMode === (value = wjcCore.asEnum(value, MouseMode))) {
                return;
            }
            var prevSelectMouseMode = this.selectMouseMode;
            this._mouseMode = value;
            switch (this._mouseMode) {
                case MouseMode.RubberbandTool:
                    this._rubberband.activate();
                    this._magnifier.deactivate();
                    break;
                case MouseMode.MagnifierTool:
                    this._magnifier.activate();
                    this._rubberband.deactivate();
                    break;
                default:
                    this._magnifier.deactivate();
                    this._rubberband.deactivate();
                    break;
            }
            this.onMouseModeChanged();
            if (prevSelectMouseMode != this.selectMouseMode) {
                this.onSelectMouseModeChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewerBase.prototype, "fullScreen", {
        get: function () {
            return this._fullScreen;
        },
        set: function (value) {
            if (this._fullScreen === value) {
                return;
            }
            this._fullScreen = value;
            this.onFullScreenChanged();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewerBase.prototype, "pageIndex", {
        get: function () {
            return this._pageIndex;
        },
        enumerable: true,
        configurable: true
    });
    ViewerBase.prototype._initMiniToolbar = function () {
        var miniToolbar = wjcCore.Control.getControl(this._miniToolbar);
        if (!miniToolbar) {
            new _ViewerMiniToolbar(this._miniToolbar, this);
            wjcCore.addClass(this._miniToolbar, "wj-mini-toolbar");
        }
    };
    ViewerBase.prototype._pinMiniToolbar = function () {
        var _this = this;
        this._showMiniToolbar(true);
        this._miniToolbarPinnedTimer = setTimeout(function () {
            _this._showMiniToolbar(false);
            _this._miniToolbarPinnedTimer = null;
        }, ViewerBase._miniToolbarPinnedTime);
    };
    ViewerBase.prototype._onDocumentSourceChanged = function (e) {
        this._clearExportFormats();
        this._documentSourceChanged.raise(this, e || new wjcCore.EventArgs());
        this._updateViewerActions();
        this._onPageSettingsUpdated();
        this._onPageCountUpdated();
        this._updateViewModeActions();
        this._searchManager.documentSource = this._documentSource;
        if (this._documentSource) {
            _addWjHandler(this._documentEventKey, this._documentSource.pageSettingsChanged, this._onPageSettingsUpdated, this);
            _addWjHandler(this._documentEventKey, this._documentSource.pageCountChanged, this._onPageCountUpdated, this);
            _addWjHandler(this._documentEventKey, this._documentSource.loadCompleted, this._onPageCountUpdated, this);
        }
    };
    ViewerBase.prototype.onPageIndexChanged = function (e) {
        this.pageIndexChanged.raise(this, e || new wjcCore.EventArgs());
        this._updatePageNavActions();
    };
    ViewerBase.prototype.onViewModeChanged = function (e) {
        this.viewModeChanged.raise(this, e || new wjcCore.EventArgs());
        this._updateViewModeActions();
        this._pageView.viewMode = this.viewMode;
    };
    ViewerBase.prototype.onSelectMouseModeChanged = function (e) {
        if (this.selectMouseModeChanged.hasHandlers) {
            wjcCore._deprecated('selectMouseModeChanged', 'mouseModeChanged');
        }
        this.selectMouseModeChanged.raise(this, e);
    };
    ViewerBase.prototype.onMouseModeChanged = function (e) {
        this.mouseModeChanged.raise(this, e || new wjcCore.EventArgs());
        if ((this.mouseMode === MouseMode.MoveTool || this.mouseMode === MouseMode.SelectTool) && wjcCore.isMobile()) {
            return;
        }
        this._updateMouseModeActions();
        this._updateViewContainerCursor();
        this._pageView.panMode = this.mouseMode === MouseMode.MoveTool;
    };
    ViewerBase.prototype.onFullScreenChanged = function (e) {
        this.fullScreenChanged.raise(this, e || new wjcCore.EventArgs());
        this._setViewerAction(_ViewerActionType.ToggleFullScreen);
        this._updateFullScreenStyle();
        if (this.fullScreen) {
            this._pinMiniToolbar();
        }
    };
    ViewerBase.prototype.onZoomFactorChanged = function (e) {
        this.zoomFactorChanged.raise(this, e || new wjcCore.EventArgs());
        this._updateZoomFactorActions();
        this._updateZoomModeActions();
    };
    ViewerBase.prototype.onQueryLoadingData = function (e) {
        this.queryLoadingData.raise(this, e);
    };
    ViewerBase._seperatorHtml = "<div class='wj-separator' style='width:100%;height: 1px;margin: 3px 0;background-color:rgba(0,0,0,.2)'/>";
    ViewerBase._viewpanelContainerMinHeight = 300;
    ViewerBase._miniToolbarPinnedTime = 3000;
    ViewerBase._narrowCss = 'narrow';
    ViewerBase._narrowWidthThreshold = 400;
    ViewerBase._thumbnailWidth = 100;
    ViewerBase._historyTimeout = 300;
    ViewerBase._defaultZoomValues = [{ name: wjcCore.Globalize.format(0.05, 'p0'), value: 0.05 }, { name: wjcCore.Globalize.format(0.25, 'p0'), value: 0.25 },
        { name: wjcCore.Globalize.format(0.5, 'p0'), value: 0.5 },
        { name: wjcCore.Globalize.format(0.75, 'p0'), value: 0.75 }, { name: wjcCore.Globalize.format(1, 'p0'), value: 1 },
        { name: wjcCore.Globalize.format(2, 'p0'), value: 2 }, { name: wjcCore.Globalize.format(3, 'p0'), value: 3 }, { name: wjcCore.Globalize.format(4, 'p0'), value: 4 },
        { name: wjcCore.Globalize.format(8, 'p0'), value: 8 }, { name: wjcCore.Globalize.format(10, 'p0'), value: 10 }];
    ViewerBase.controlTemplate = '<div class="wj-viewer-outer wj-content with-footer">' +
        '<div wj-part="toolbar"></div>' +
        '<div wj-part="mobile-toolbar"></div>' +
        '<div class="wj-viewer-container" wj-part="viewer-container">' +
        '<div class="wj-viewer-leftpanel" wj-part="viewer-left-panel">' +
        '<div class="wj-viewer-tabsleft" wj-part="side-panel">' +
        '</div>' +
        '</div>' +
        '<div class="wj-viewer-splitter" wj-part="splitter">' +
        '<button class="wj-btn wj-btn-default" type="button">' +
        '<span class="wj-glyph-right"></span>' +
        '</button>' +
        '</div>' +
        '<div class="wj-viewpanel-container" wj-part="viewpanel-container"></div>' +
        '</div>' +
        '<div wj-part="mini-toolbar"></div>' +
        '<div class="wj-searchbar mobile" wj-part="search-bar"></div>' +
        '<div class="wj-viewer-footer mobile" class="wj-viewer-footer" wj-part="viewer-footer">' +
        '<div wj-part="zoom-bar"></div>' +
        '<span class="wj-close">×</span>' +
        '</div>' +
        '</div>';
    return ViewerBase;
}(wjcCore.Control));
exports.ViewerBase = ViewerBase;
var _PageSetupDialog = (function (_super) {
    __extends(_PageSetupDialog, _super);
    function _PageSetupDialog(ele) {
        var _this = _super.call(this, ele) || this;
        _this.applied = new wjcCore.Event();
        var tpl;
        _this.modal = true;
        _this.hideTrigger = wjcInput.PopupTrigger.None;
        tpl = _this.getTemplate();
        _this.applyTemplate('wj-control wj-content', tpl, {
            _gHeader: 'g-header',
            _pageSetupEditorElement: 'pagesetup-editor',
            _btnApply: 'btn-apply',
            _btnCancel: 'btn-cancel',
            _btnClose: 'a-close'
        });
        _this._pageSetupEditor = new _PageSetupEditor(_this._pageSetupEditorElement);
        _this._globalize();
        _this._addEvents();
        return _this;
    }
    Object.defineProperty(_PageSetupDialog.prototype, "pageSettings", {
        get: function () {
            return this._pageSetupEditor.pageSettings;
        },
        enumerable: true,
        configurable: true
    });
    _PageSetupDialog.prototype._globalize = function () {
        var g = wjcCore.culture.Viewer;
        this._gHeader.textContent = g.pageSetup;
        this._btnApply.textContent = g.ok;
        this._btnCancel.textContent = g.cancel;
    };
    _PageSetupDialog.prototype._addEvents = function () {
        var self = this;
        _addEvent(self._btnClose, 'click', function () {
            self.hide();
        });
        _addEvent(self._btnCancel, 'click', function () {
            self.hide();
        });
        _addEvent(self._btnApply, 'click', function () {
            self._apply();
            self.hide();
        });
    };
    _PageSetupDialog.prototype._apply = function () {
        this.onApplied();
    };
    _PageSetupDialog.prototype.onApplied = function () {
        this.applied.raise(this, new wjcCore.EventArgs);
    };
    _PageSetupDialog.prototype.showWithValue = function (pageSettings) {
        this._pageSetupEditor.pageSettings = pageSettings;
        _super.prototype.show.call(this);
    };
    _PageSetupDialog.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        _super.prototype.refresh.call(this, fullUpdate);
        if (fullUpdate) {
            this._globalize();
            this._pageSetupEditor.refresh();
        }
    };
    _PageSetupDialog.controlTemplate = '<div>' +
        '<div wj-part="g-header" class="wj-dialog-header">' +
        '<a class="wj-hide" wj-part="a-close" style="float:right;outline:none;text-decoration:none;padding:0px 6px" href="" tabindex="-1" draggable="false">&times;</a>' +
        '</div>' +
        '<div style="padding:12px;">' +
        '<div wj-part="pagesetup-editor">' +
        '</div>' +
        '<div class="wj-dialog-footer">' +
        '<a class="wj-hide" wj-part="btn-apply" href="" tabindex="-1" draggable="false"></a>&nbsp;&nbsp;' +
        '<a class="wj-hide" wj-part="btn-cancel" href="" tabindex="-1" draggable="false"></a>' +
        '</div>' +
        '</div>' +
        '</div>';
    return _PageSetupDialog;
}(wjcInput.Popup));
exports._PageSetupDialog = _PageSetupDialog;
var _ViewerActionType;
(function (_ViewerActionType) {
    _ViewerActionType[_ViewerActionType["TogglePaginated"] = 0] = "TogglePaginated";
    _ViewerActionType[_ViewerActionType["Print"] = 1] = "Print";
    _ViewerActionType[_ViewerActionType["Portrait"] = 2] = "Portrait";
    _ViewerActionType[_ViewerActionType["Landscape"] = 3] = "Landscape";
    _ViewerActionType[_ViewerActionType["ShowPageSetupDialog"] = 4] = "ShowPageSetupDialog";
    _ViewerActionType[_ViewerActionType["FirstPage"] = 5] = "FirstPage";
    _ViewerActionType[_ViewerActionType["PrePage"] = 6] = "PrePage";
    _ViewerActionType[_ViewerActionType["NextPage"] = 7] = "NextPage";
    _ViewerActionType[_ViewerActionType["LastPage"] = 8] = "LastPage";
    _ViewerActionType[_ViewerActionType["PageNumber"] = 9] = "PageNumber";
    _ViewerActionType[_ViewerActionType["PageCountLabel"] = 10] = "PageCountLabel";
    _ViewerActionType[_ViewerActionType["Backward"] = 11] = "Backward";
    _ViewerActionType[_ViewerActionType["Forward"] = 12] = "Forward";
    _ViewerActionType[_ViewerActionType["SelectTool"] = 13] = "SelectTool";
    _ViewerActionType[_ViewerActionType["MoveTool"] = 14] = "MoveTool";
    _ViewerActionType[_ViewerActionType["Continuous"] = 15] = "Continuous";
    _ViewerActionType[_ViewerActionType["Single"] = 16] = "Single";
    _ViewerActionType[_ViewerActionType["ZoomOut"] = 17] = "ZoomOut";
    _ViewerActionType[_ViewerActionType["ZoomIn"] = 18] = "ZoomIn";
    _ViewerActionType[_ViewerActionType["ZoomValue"] = 19] = "ZoomValue";
    _ViewerActionType[_ViewerActionType["FitWholePage"] = 20] = "FitWholePage";
    _ViewerActionType[_ViewerActionType["FitPageWidth"] = 21] = "FitPageWidth";
    _ViewerActionType[_ViewerActionType["ToggleFullScreen"] = 22] = "ToggleFullScreen";
    _ViewerActionType[_ViewerActionType["ShowHamburgerMenu"] = 23] = "ShowHamburgerMenu";
    _ViewerActionType[_ViewerActionType["ShowViewMenu"] = 24] = "ShowViewMenu";
    _ViewerActionType[_ViewerActionType["ShowSearchBar"] = 25] = "ShowSearchBar";
    _ViewerActionType[_ViewerActionType["ShowThumbnails"] = 26] = "ShowThumbnails";
    _ViewerActionType[_ViewerActionType["ShowOutlines"] = 27] = "ShowOutlines";
    _ViewerActionType[_ViewerActionType["ShowExportsPanel"] = 28] = "ShowExportsPanel";
    _ViewerActionType[_ViewerActionType["ShowPageSetupPanel"] = 29] = "ShowPageSetupPanel";
    _ViewerActionType[_ViewerActionType["ShowZoomBar"] = 30] = "ShowZoomBar";
    _ViewerActionType[_ViewerActionType["ShowSearchOptions"] = 31] = "ShowSearchOptions";
    _ViewerActionType[_ViewerActionType["SearchPrev"] = 32] = "SearchPrev";
    _ViewerActionType[_ViewerActionType["SearchNext"] = 33] = "SearchNext";
    _ViewerActionType[_ViewerActionType["SearchMatchCase"] = 34] = "SearchMatchCase";
    _ViewerActionType[_ViewerActionType["SearchMatchWholeWord"] = 35] = "SearchMatchWholeWord";
    _ViewerActionType[_ViewerActionType["RubberbandTool"] = 36] = "RubberbandTool";
    _ViewerActionType[_ViewerActionType["MagnifierTool"] = 37] = "MagnifierTool";
    _ViewerActionType[_ViewerActionType["RotateDocument"] = 38] = "RotateDocument";
    _ViewerActionType[_ViewerActionType["RotatePage"] = 39] = "RotatePage";
})(_ViewerActionType = exports._ViewerActionType || (exports._ViewerActionType = {}));
var _MouseTool = (function (_super) {
    __extends(_MouseTool, _super);
    function _MouseTool(element, viewPanelContainer, pageView, stopOnClientOut, css, activeCss, visibleCss) {
        var _this = _super.call(this, element) || this;
        _this._stopOnClientOut = stopOnClientOut;
        _this._css = css;
        _this._activeCss = activeCss;
        _this._visibleCss = visibleCss;
        _this._pageView = pageView;
        _this._viewPanelContainer = viewPanelContainer;
        _this._initElement();
        _this._bindEvents();
        return _this;
    }
    _MouseTool.prototype.activate = function () {
        if (!this._isActive) {
            this._isActive = true;
            wjcCore.addClass(this._viewPanelContainer, this._activeCss);
        }
    };
    _MouseTool.prototype.deactivate = function () {
        if (this._isActive) {
            this._isActive = false;
            wjcCore.removeClass(this._viewPanelContainer, this._activeCss);
        }
    };
    _MouseTool.prototype.reset = function () {
        this._innerStop(null);
    };
    Object.defineProperty(_MouseTool.prototype, "isActive", {
        get: function () {
            return this._isActive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_MouseTool.prototype, "startPnt", {
        get: function () {
            return this._startPnt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_MouseTool.prototype, "pageView", {
        get: function () {
            return this._pageView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_MouseTool.prototype, "viewPanelContainer", {
        get: function () {
            return this._viewPanelContainer;
        },
        enumerable: true,
        configurable: true
    });
    _MouseTool.prototype._initElement = function () {
        this.applyTemplate(this._css, this.getTemplate(), this._getTemplateParts());
        this._viewPanelContainer.appendChild(this.hostElement);
    };
    _MouseTool.prototype._innerStop = function (pnt) {
        try {
            this._stop(pnt);
        }
        finally {
            this._isStarted = false;
            this._startPnt = null;
        }
    };
    _MouseTool.prototype._getTemplateParts = function () {
        return null;
    };
    _MouseTool.prototype._onMouseDown = function (e) {
        var pnt = this._toClientPoint(e), ht = this._testPageWorkingAreaHit(pnt);
        if (ht && this.pageView.isPageContentLoaded(ht.pageIndex)) {
            if (typeof (window.getSelection) != 'undefined') {
                getSelection().removeAllRanges();
            }
            this._isStarted = true;
            this._startPnt = pnt;
            this._start(ht);
        }
    };
    _MouseTool.prototype._onMouseMove = function (e) {
        if (!this._isStarted) {
            return;
        }
        var pnt = this._toClientPoint(e), ht = this._testPageWorkingAreaHit(pnt);
        if (ht && this.pageView.isPageContentLoaded(ht.pageIndex)) {
            this._move(pnt, ht);
        }
        else {
            if (this._stopOnClientOut) {
                this._stop(pnt);
            }
        }
    };
    _MouseTool.prototype._onMouseUp = function (e) {
        if (!this._isStarted) {
            return;
        }
        this._innerStop(this._toClientPoint(e));
    };
    _MouseTool.prototype._start = function (ht) {
        wjcCore.addClass(this.hostElement, this._visibleCss);
    };
    _MouseTool.prototype._move = function (pnt, ht) {
    };
    _MouseTool.prototype._stop = function (pnt) {
        wjcCore.removeClass(this.hostElement, this._visibleCss);
    };
    _MouseTool.prototype._bindEvents = function () {
        var _this = this;
        this.addEventListener(this._viewPanelContainer, 'mousedown', function (e) {
            if (_this._isActive) {
                _this._onMouseDown(e);
            }
        });
        this.addEventListener(this._viewPanelContainer, 'mousemove', function (e) {
            if (_this._isActive) {
                _this._onMouseMove(e);
            }
        });
        this.addEventListener(document, 'mouseup', function (e) {
            if (_this._isActive) {
                _this._onMouseUp(e);
            }
        });
    };
    _MouseTool.prototype._toClientPoint = function (e) {
        var clientRect = this._viewPanelContainer.getBoundingClientRect();
        return new wjcCore.Point(e.clientX - clientRect.left, e.clientY - clientRect.top);
    };
    _MouseTool.prototype._testPageWorkingAreaHit = function (pnt) {
        var hitTest = this._pageView.hitTest(pnt.x, pnt.y);
        return hitTest && hitTest.hitWorkingArea ? hitTest : null;
    };
    return _MouseTool;
}(wjcCore.Control));
exports._MouseTool = _MouseTool;
var _RubberbandOnAppliedEventArgs = (function (_super) {
    __extends(_RubberbandOnAppliedEventArgs, _super);
    function _RubberbandOnAppliedEventArgs(rect) {
        var _this = _super.call(this) || this;
        _this._rect = rect;
        return _this;
    }
    Object.defineProperty(_RubberbandOnAppliedEventArgs.prototype, "rect", {
        get: function () {
            return this._rect;
        },
        enumerable: true,
        configurable: true
    });
    return _RubberbandOnAppliedEventArgs;
}(wjcCore.EventArgs));
exports._RubberbandOnAppliedEventArgs = _RubberbandOnAppliedEventArgs;
var _Rubberband = (function (_super) {
    __extends(_Rubberband, _super);
    function _Rubberband(element, viewPanelContainer, pageView) {
        var _this = _super.call(this, element, viewPanelContainer, pageView, false, 'wj-rubberband', 'rubberband-actived', 'show') || this;
        _this.applied = new wjcCore.Event();
        return _this;
    }
    _Rubberband.prototype._start = function (ht) {
        _super.prototype._start.call(this, ht);
        this.hostElement.style.left = this.startPnt.x + 'px';
        this.hostElement.style.top = this.startPnt.y + 'px';
    };
    _Rubberband.prototype._move = function (pnt, ht) {
        if (this.startPnt) {
            var clientRect = this.viewPanelContainer.getBoundingClientRect();
            this.hostElement.style.width = pnt.x - this.startPnt.x + 'px';
            this.hostElement.style.height = pnt.y - this.startPnt.y + 'px';
        }
    };
    _Rubberband.prototype._stop = function (pnt) {
        if (pnt) {
            var bandRect = this.hostElement.getBoundingClientRect();
            if (bandRect.width > 5 && bandRect.height > 5) {
                this._onApplied(new _RubberbandOnAppliedEventArgs(new wjcCore.Rect(this.startPnt.x, this.startPnt.y, bandRect.width, bandRect.height)));
            }
        }
        this.hostElement.style.width = '0px';
        this.hostElement.style.height = '0px';
        _super.prototype._stop.call(this, pnt);
    };
    _Rubberband.prototype._onApplied = function (e) {
        this.applied.raise(this, e);
    };
    return _Rubberband;
}(_MouseTool));
exports._Rubberband = _Rubberband;
var _Magnifier = (function (_super) {
    __extends(_Magnifier, _super);
    function _Magnifier(element, viewPanelContainer, pageView) {
        var _this = _super.call(this, element, viewPanelContainer, pageView, true, 'wj-magnifier', 'magnifier-actived', 'show') || this;
        _this._Magnification = 2;
        _this._currentPageIndex = -1;
        return _this;
    }
    _Magnifier.prototype.deactivate = function () {
        _super.prototype.deactivate.call(this);
        this._currentPageIndex = -1;
    };
    _Magnifier.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this._currentPageIndex = -1;
    };
    _Magnifier.prototype._getTemplateParts = function () {
        return {
            _viewPageDiv: 'view-page-div'
        };
    };
    _Magnifier.prototype._bindEvents = function () {
        var _this = this;
        _super.prototype._bindEvents.call(this);
        var updateViewPage = function () {
            if (_this._currentPageIndex < 0) {
                return;
            }
            var currentPage = _this.pageView.pages[_this._currentPageIndex], rotatedSize = _getRotatedSize(currentPage.size, currentPage.rotateAngle), svg = _this._viewPageDiv.querySelector('svg');
            _this._viewPageDiv.style.height = rotatedSize.height.valueInPixel * _this.pageView.zoomFactor * _this._Magnification + 'px';
            _this._viewPageDiv.style.width = rotatedSize.width.valueInPixel * _this.pageView.zoomFactor * _this._Magnification + 'px';
            svg.setAttribute('width', _this._viewPageDiv.style.width);
            svg.setAttribute('height', _this._viewPageDiv.style.height);
            _transformSvg(svg, currentPage.size.width.valueInPixel, currentPage.size.height.valueInPixel, _this._Magnification * _this.pageView.zoomFactor, currentPage.rotateAngle);
        };
        this.pageView.zoomFactorChanged.addHandler(function () {
            updateViewPage();
        });
        this.pageView.rotateAngleChanged.addHandler(function () {
            updateViewPage();
        });
    };
    _Magnifier.prototype._start = function (ht) {
        _super.prototype._start.call(this, ht);
        this._showMagnifer(this.startPnt, ht);
    };
    _Magnifier.prototype._move = function (pnt, ht) {
        this._showMagnifer(pnt, ht);
    };
    _Magnifier.prototype._showMagnifer = function (pnt, ht) {
        var magnifierRect = this.hostElement.getBoundingClientRect(), position = _getPositionByHitTestInfo(ht);
        this.hostElement.style.left = (pnt.x - magnifierRect.width / 2) + 'px';
        this.hostElement.style.top = (pnt.y - magnifierRect.height / 2) + 'px';
        this._fillPage(position);
        this._showHitPosition(position);
    };
    _Magnifier.prototype._fillPage = function (hitPosition) {
        var _this = this;
        if (hitPosition.pageIndex === this._currentPageIndex) {
            return;
        }
        this._currentPageIndex = hitPosition.pageIndex;
        this.pageView.pages[this._currentPageIndex].getContent().then(function (pageContent) {
            var clone = pageContent.cloneNode(true);
            _this._viewPageDiv.innerHTML = '';
            _this._viewPageDiv.appendChild(clone);
            clone.setAttribute('width', new _Unit(clone.getAttribute('width')).valueInPixel * _this._Magnification + 'px');
            clone.setAttribute('height', new _Unit(clone.getAttribute('height')).valueInPixel * _this._Magnification + 'px');
            var size = _this.pageView.pages[_this._currentPageIndex].size;
            _transformSvg(clone, size.width.valueInPixel, size.height.valueInPixel, _this._Magnification * _this.pageView.zoomFactor, _this.pageView.pages[_this._currentPageIndex].rotateAngle);
            _this._viewPageDiv.style.width = clone.getAttribute('width');
            _this._viewPageDiv.style.height = clone.getAttribute('height');
        });
    };
    _Magnifier.prototype._showHitPosition = function (hitPosition) {
        var magnifierRect = this.hostElement.getBoundingClientRect(), currentPage = this.pageView.pages[this._currentPageIndex], transformedBound = _getTransformedPosition(hitPosition.pageBounds, currentPage.size, currentPage.rotateAngle, this.pageView.zoomFactor);
        this._viewPageDiv.style.left = (-transformedBound.x * this._Magnification + magnifierRect.width / 2) + 'px';
        this._viewPageDiv.style.top = (-transformedBound.y * this._Magnification + magnifierRect.height / 2) + 'px';
    };
    _Magnifier.controlTemplate = '<div wj-part="view-page-div" class="wj-view-page"></div>';
    return _Magnifier;
}(_MouseTool));
exports._Magnifier = _Magnifier;
'use strict';
var parametersIcon = '<path d="M24,11.9v-2h-4V7h0V5h0h-1h-5V2h0V0h0h-1H1H0h0v2h0v11h0v1h0h1h5v4h0v1h0h1h3v4h0v1h0h1h2.1v-1H11V12h2.1v-2H11h-1h0v2h0v6H7V7h12v2.9h-1v2h5V23h-4.9v1H23h1h0v-1h0L24,11.9L24,11.9z M6,5L6,5l0,2h0v6H1V2h12v3H7H6z"/>' +
    '<path d="M20,20v-3v-1h-1h-1v-1v-1h-1h-3h-1v1v3v1h1h1v2h0h1h3h1h0L20,20L20,20z M14,18v-3h3v1h-1h-1v1v1H14z M17,17v1h-1v-1H17z M16,20v-1h1h1v-1v-1h1v3H16z"/>';
var ReportViewer = (function (_super) {
    __extends(ReportViewer, _super);
    function ReportViewer(element, options) {
        var _this = _super.call(this, element, options) || this;
        _this._initSidePanelParameters();
        return _this;
    }
    Object.defineProperty(ReportViewer.prototype, "reportName", {
        get: function () {
            return this._reportName;
        },
        set: function (value) {
            if (value != this._reportName) {
                this._reportName = value;
                this._needBindDocumentSource();
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportViewer.prototype, "paginated", {
        get: function () {
            return this._innerPaginated;
        },
        set: function (value) {
            this._innerPaginated = value;
        },
        enumerable: true,
        configurable: true
    });
    ReportViewer.getReportNames = function (serviceUrl, reportFilePath) {
        return _Report.getReportNames(serviceUrl, reportFilePath);
    };
    ReportViewer.getReports = function (serviceUrl, path, data) {
        return _Report.getReports(serviceUrl, path, data);
    };
    ReportViewer.prototype._globalize = function () {
        _super.prototype._globalize.call(this);
        var g = wjcCore.culture.Viewer;
        this._gParameterTitle.textContent = g.parameters;
    };
    ReportViewer.prototype._executeAction = function (action) {
        _super.prototype._executeAction.call(this, action);
        if (this._actionIsDisabled(action)) {
            return;
        }
        switch (action) {
            case ReportViewer._parameterCommandTag:
                wjcCore.Control.getControl(this._sidePanel).active(this._parametersPageId);
                break;
        }
    };
    ReportViewer.prototype._actionIsDisabled = function (action) {
        switch (action) {
            case ReportViewer._parameterCommandTag:
                return !this._innerDocumentSource || !this._innerDocumentSource.hasParameters;
        }
        return _super.prototype._actionIsDisabled.call(this, action);
    };
    ReportViewer.prototype._initHamburgerMenu = function (owner) {
        this._hamburgerMenu = new _ReportHamburgerMenu(this, owner);
    };
    ReportViewer.prototype._initSidePanelParameters = function () {
        var _this = this;
        var sideTabs = wjcCore.Control.getControl(this._sidePanel), page = sideTabs.addPage(wjcCore.culture.Viewer.parameters, parametersIcon, 2);
        this._parametersPageId = page.id;
        this._gParameterTitle = page.outContent.querySelector('.wj-tabtitle');
        page.format(function (t) {
            _this._paramsEditor = new _ParametersEditor(t.content);
            _this._paramsEditor.commit.addHandler(function () {
                if (!_this._innerDocumentSource || !_this._innerDocumentSource.hasParameters) {
                    return;
                }
                _this._showViewPanelMessage();
                _this._innerDocumentSource.setParameters(_this._paramsEditor.parameters).then(function (v) {
                    var newParams = (v || []);
                    var hasError = newParams.some(function (p) { return !!p.error; });
                    _this._paramsEditor._reset();
                    if (hasError) {
                        _this._paramsEditor.itemsSource = newParams;
                    }
                    else {
                        _this._resetDocument();
                        _this._paramsEditor.isDisabled = true;
                        _this._renderDocumentSource();
                    }
                }).catch(function (reason) {
                    _this._showViewPanelErrorMessage(_getErrorMessage(reason));
                });
                if (_this._isMobileTemplate()) {
                    sideTabs.collapse();
                }
            });
            _this._paramsEditor.validate.addHandler(function () {
                if (!_this._innerDocumentSource || !_this._innerDocumentSource.hasParameters) {
                    return;
                }
                _this._paramsEditor.isDisabled = true;
                _this._innerDocumentSource.setParameters(_this._paramsEditor.parameters).then(function (v) {
                    _this._paramsEditor.itemsSource = v;
                    _this._paramsEditor.isDisabled = false;
                }, function (v) {
                    _this._paramsEditor.isDisabled = false;
                });
            });
            var updateParametersPanel = function () {
                var documentSource = _this._innerDocumentSource;
                if (documentSource.status === _ExecutionStatus.cleared ||
                    documentSource.status === _ExecutionStatus.notFound) {
                    _removeChildren(t.content);
                }
                else if (documentSource.status === _ExecutionStatus.rendering) {
                    _this._paramsEditor.isDisabled = true;
                }
                else if (documentSource.status === _ExecutionStatus.completed) {
                    _this._paramsEditor.isDisabled = false;
                }
                if (documentSource.status !== _ExecutionStatus.loaded) {
                    return;
                }
                if (!documentSource.hasParameters) {
                    sideTabs.hide(t);
                    return;
                }
                documentSource.getParameters().then(function (params) {
                    if (!params.filter(function (p) { return !p.hidden; }).length) {
                        sideTabs.hide(t);
                    }
                    else {
                        sideTabs.show(t);
                        sideTabs.active(t);
                    }
                    if (_this._innerDocumentSource != documentSource || documentSource.isDisposed) {
                        return;
                    }
                    _this._paramsEditor.itemsSource = params;
                    if (params.filter(function (p) { return p.value == null && !p.nullable && !p.hidden; }).length) {
                        _this._showViewPanelMessage(wjcCore.culture.Viewer.requiringParameters);
                    }
                    else {
                        _this._paramsEditor.isDisabled = true;
                        _this._renderDocumentSource();
                    }
                });
            }, update = function () {
                if (!_this._innerDocumentSource) {
                    return;
                }
                _addWjHandler(_this._documentEventKey, _this._innerDocumentSource.statusChanged, updateParametersPanel);
                updateParametersPanel();
            };
            _this._documentSourceChanged.addHandler(update);
            update();
        });
    };
    Object.defineProperty(ReportViewer.prototype, "_innerDocumentSource", {
        get: function () {
            return this._getDocumentSource();
        },
        enumerable: true,
        configurable: true
    });
    ReportViewer.prototype._loadDocument = function (value) {
        var isChanged = this._innerDocumentSource !== value;
        var promise = _super.prototype._loadDocument.call(this, value);
        if (value && isChanged) {
            _addWjHandler(this._documentEventKey, value.statusChanged, this._onDocumentStatusChanged, this);
        }
        return promise;
    };
    ReportViewer.prototype._reRenderDocument = function () {
        this._renderDocumentSource();
    };
    ReportViewer.prototype._onDocumentStatusChanged = function () {
        if (!this._innerDocumentSource
            || this._innerDocumentSource.status !== _ExecutionStatus.loaded
            || this._innerDocumentSource.hasParameters) {
            return;
        }
        this._renderDocumentSource();
    };
    ReportViewer.prototype._renderDocumentSource = function () {
        var _this = this;
        if (!this._innerDocumentSource) {
            return;
        }
        this._setDocumentRendering();
        var documentSource = this._innerDocumentSource;
        documentSource.render().then(function (v) { return _this._getStatusUtilCompleted(documentSource); });
    };
    ReportViewer.prototype._disposeDocument = function () {
        if (this._innerDocumentSource) {
            _removeAllWjHandlers(this._documentEventKey, this._innerDocumentSource.statusChanged);
        }
        _super.prototype._disposeDocument.call(this);
    };
    ReportViewer.prototype._setDocumentRendering = function () {
        this._innerDocumentSource._updateStatus(_ExecutionStatus.rendering);
        _super.prototype._setDocumentRendering.call(this);
    };
    ReportViewer.prototype._getSource = function () {
        if (!this.filePath) {
            return null;
        }
        return new _Report({
            serviceUrl: this.serviceUrl,
            filePath: this.filePath,
            reportName: this.reportName,
            paginated: this.paginated
        });
    };
    ReportViewer.prototype._supportsPageSettingActions = function () {
        return true;
    };
    ReportViewer.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        _super.prototype.refresh.call(this, fullUpdate);
        if (fullUpdate) {
            this._paramsEditor.refresh();
        }
    };
    ReportViewer._parameterCommandTag = 99;
    return ReportViewer;
}(ViewerBase));
exports.ReportViewer = ReportViewer;
var _ParametersEditor = (function (_super) {
    __extends(_ParametersEditor, _super);
    function _ParametersEditor(element) {
        var _this = _super.call(this, element) || this;
        _this._parameters = {};
        _this._errors = [];
        _this._errorsVisible = false;
        _this.commit = new wjcCore.Event();
        _this.validate = new wjcCore.Event();
        wjcCore.addClass(_this.hostElement, 'wj-parameterscontainer');
        _this._updateErrorsVisible();
        return _this;
    }
    _ParametersEditor.prototype._setErrors = function (value) {
        this._errors = value;
        this._updateErrorDiv();
    };
    Object.defineProperty(_ParametersEditor.prototype, "parameters", {
        get: function () {
            return this._parameters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_ParametersEditor.prototype, "itemsSource", {
        get: function () {
            return this._itemSources;
        },
        set: function (value) {
            this._itemSources = value;
            this._parameters = {};
            this._render();
            var errors = [];
            (value || []).forEach(function (v) {
                if (v.error) {
                    errors.push({ key: v.name, value: v.error });
                }
            });
            this._setErrors(errors);
        },
        enumerable: true,
        configurable: true
    });
    _ParametersEditor.prototype._reset = function () {
        this._lastEditedParam = null;
    };
    _ParametersEditor.prototype._setErrorsVisible = function (value) {
        this._errorsVisible = value;
        this._updateErrorsVisible();
    };
    _ParametersEditor.prototype._updateErrorsVisible = function () {
        if (this._errorsVisible) {
            wjcCore.removeClass(this.hostElement, _ParametersEditor._errorsHiddenCss);
        }
        else {
            wjcCore.addClass(this.hostElement, _ParametersEditor._errorsHiddenCss);
        }
    };
    _ParametersEditor.prototype.onCommit = function () {
        this.commit.raise(this, new wjcCore.EventArgs());
    };
    _ParametersEditor.prototype.onValidate = function () {
        this.validate.raise(this, new wjcCore.EventArgs());
        this._setErrorsVisible(false);
    };
    _ParametersEditor.prototype._deferValidate = function (paramName, beforeValidate, afterValidate) {
        var _this = this;
        if (this._validateTimer != null) {
            clearTimeout(this._validateTimer);
            this._validateTimer = null;
        }
        this._validateTimer = setTimeout(function () {
            if (beforeValidate != null) {
                beforeValidate();
            }
            _this.onValidate();
            if (afterValidate != null) {
                afterValidate();
            }
            _this._lastEditedParam = paramName;
            _this._validateTimer = null;
        }, 500);
    };
    _ParametersEditor.prototype._updateErrorDiv = function () {
        var errorList = this._errors || [], errorDivList = this.hostElement.querySelectorAll('.error');
        for (var i = 0; i < errorDivList.length; i++) {
            errorDivList[i].parentNode.removeChild(errorDivList[i]);
        }
        for (var i = 0; i < errorList.length; i++) {
            var errorMessageDiv, element = this.hostElement.querySelector('*[' + _ParametersEditor._paramIdAttr + '="' + errorList[i].key + '"]'), message = errorList[i].value;
            if (element) {
                errorMessageDiv = document.createElement('div');
                errorMessageDiv.innerHTML = message;
                errorMessageDiv.className = 'error';
                element.appendChild(errorMessageDiv);
            }
        }
    };
    _ParametersEditor.prototype._render = function () {
        var _this = this;
        var lastEditor;
        _removeChildren(this.hostElement, function (e) {
            if (!_this._lastEditedParam || (e.getAttribute(_ParametersEditor._paramIdAttr) !== _this._lastEditedParam)) {
                return true;
            }
            lastEditor = e;
        });
        if (!this._itemSources) {
            return;
        }
        this._itemSources.forEach(function (p) {
            if (_this._lastEditedParam === p.name) {
                _this._lastEditedParam = null;
                lastEditor = null;
                return;
            }
            if (!!p.hidden) {
                return;
            }
            var parameterContainer = document.createElement('div'), parameterLabel = document.createElement('span'), parameterControl = null;
            parameterContainer.className = 'wj-parametercontainer';
            parameterLabel.className = 'wj-parameterhead';
            parameterLabel.innerHTML = p.prompt || p.name;
            if (wjcCore.isArray(p.allowedValues)) {
                parameterControl = _this._generateComboEditor(p);
            }
            else {
                switch (p.dataType) {
                    case _ParameterType.Boolean:
                        parameterControl = _this._generateBoolEditor(p);
                        break;
                    case _ParameterType.DateTime:
                    case _ParameterType.Time:
                    case _ParameterType.Date:
                        parameterControl = _this._generateDateTimeEditor(p);
                        break;
                    case _ParameterType.Integer:
                    case _ParameterType.Float:
                        parameterControl = _this._generateNumberEditor(p);
                        break;
                    case _ParameterType.String:
                        parameterControl = _this._generateStringEditor(p);
                        break;
                }
            }
            if (parameterControl) {
                parameterControl.className += ' wj-parametercontrol';
                parameterContainer.setAttribute(_ParametersEditor._paramIdAttr, p.name);
                parameterContainer.appendChild(parameterLabel);
                parameterContainer.appendChild(parameterControl);
                if (lastEditor) {
                    _this.hostElement.insertBefore(parameterContainer, lastEditor);
                }
                else {
                    _this.hostElement.appendChild(parameterContainer);
                }
            }
        });
        var applyBtn = document.createElement('input');
        applyBtn.type = 'button';
        applyBtn.value = wjcCore.culture.Viewer.apply;
        applyBtn.className = 'wj-applybutton';
        _addEvent(applyBtn, 'click', function () {
            if (_this._validateParameters()) {
                _this._errors = [];
                _this.onCommit();
            }
            _this._setErrorsVisible(true);
        });
        this.hostElement.appendChild(applyBtn);
    };
    _ParametersEditor.prototype.refresh = function (fullUpdate) {
        if (fullUpdate === void 0) { fullUpdate = true; }
        _super.prototype.refresh.call(this, fullUpdate);
        if (fullUpdate) {
            this._reset();
            this._render();
        }
    };
    _ParametersEditor.prototype._validateParameters = function () {
        var textareas = this.hostElement.querySelectorAll('textarea'), element, errorList = [], parameters = this.itemsSource;
        for (var i = 0; i < parameters.length; i++) {
            var curParam = parameters[i];
            element = this.hostElement.querySelector('[' + _ParametersEditor._paramIdAttr + '="' + curParam.name + '"]');
            if (!curParam.nullable && !this.parameters.hasOwnProperty(curParam.name) && !this.parameters[curParam.name]
                && (curParam.value === null || curParam.value === undefined || curParam.value === "")) {
                if (element) {
                    errorList.push({ key: curParam.name, value: wjcCore.culture.Viewer.nullParameterError });
                }
            }
        }
        for (var i = 0; i < textareas.length; i++) {
            var textarea = textareas.item(i), dataType, values = [], currentResult = true;
            dataType = parseInt(textarea.getAttribute('data-type'));
            switch (dataType) {
                case _ParameterType.Date:
                case _ParameterType.DateTime:
                case _ParameterType.Time:
                    currentResult = _ParametersEditor._checkValueType(textarea.value, wjcCore.isDate);
                    break;
                case _ParameterType.Float:
                    currentResult = _ParametersEditor._checkValueType(textarea.value, _ParametersEditor._isFloat);
                    break;
                case _ParameterType.Integer:
                    currentResult = _ParametersEditor._checkValueType(textarea.value, wjcCore.isInt);
                    break;
            }
            if (!currentResult) {
                errorList.push({ key: textarea.parentElement.id, value: wjcCore.culture.Viewer.invalidParameterError });
            }
        }
        this._setErrors(errorList);
        return errorList.length <= 0;
    };
    _ParametersEditor._isFloat = function (value) {
        return !isNaN(parseFloat(value));
    };
    _ParametersEditor._checkValueType = function (value, isSpecificType) {
        var values = value.split('\n');
        for (var i = 0; i < values.length; i++) {
            if (values[i].trim().length <= 0 || isSpecificType(values[i].trim())) {
                continue;
            }
            else {
                return false;
            }
        }
        return true;
    };
    _ParametersEditor.prototype._generateComboEditor = function (parameter) {
        var _this = this;
        var combo, itemsSource = [], element = document.createElement('div'), multiSelect, values, checkedItems = [], isParameterResolved = (parameter.allowedValues && parameter.allowedValues.length > 0);
        if (parameter.multiValue) {
            combo = new _MultiSelectEx(element);
        }
        else {
            combo = new wjcInput.ComboBox(element);
            if (parameter.nullable) {
                itemsSource.push({ name: wjcCore.culture.Viewer.parameterNoneItemsSelected, value: null });
            }
            else if (parameter.value == null && isParameterResolved) {
                itemsSource.push({ name: wjcCore.culture.Viewer.selectParameterValue, value: null });
            }
        }
        combo.isEditable = false;
        combo.displayMemberPath = 'name';
        combo.selectedValuePath = 'value';
        combo.isDisabled = !isParameterResolved;
        for (var i = 0; i < parameter.allowedValues.length; i++) {
            itemsSource.push({ name: parameter.allowedValues[i].key, value: parameter.allowedValues[i].value });
        }
        combo.itemsSource = itemsSource;
        if (parameter.multiValue) {
            multiSelect = combo;
            if (!isParameterResolved) {
                multiSelect.checkedItems = [];
            }
            else if (parameter.value) {
                for (var i = 0; i < parameter.value.length; i++) {
                    for (var j = 0; j < multiSelect.itemsSource.length; j++) {
                        if (multiSelect.itemsSource[j].value === parameter.value[i]) {
                            checkedItems.push(multiSelect.itemsSource[j]);
                            break;
                        }
                    }
                }
                multiSelect.checkedItems = checkedItems;
            }
            multiSelect.checkedItemsChanged.addHandler(function () {
                _this._deferValidate(parameter.name, function () {
                    values = [];
                    for (var i = 0; i < multiSelect.checkedItems.length; i++) {
                        values.push(multiSelect.checkedItems[i]['value']);
                    }
                    _this._updateParameters(parameter, values);
                }, function () {
                    if (values.length > 0 && !parameter.nullable) {
                        _this._validateNullValueOfParameter(element);
                    }
                });
            });
        }
        else {
            if (!isParameterResolved) {
                combo.selectedValue = null;
            }
            else {
                combo.selectedValue = parameter.value;
            }
            var updating = false;
            combo.selectedIndexChanged.addHandler(function (sender) {
                _this._deferValidate(parameter.name, function () {
                    if (updating) {
                        return;
                    }
                    _this._updateParameters(parameter, sender.selectedValue);
                    if (sender.selectedValue && sender.itemsSource[0]['name'] === wjcCore.culture.Viewer.selectParameterValue) {
                        setTimeout(function () {
                            updating = true;
                            var value = sender.selectedValue;
                            var index = sender.selectedIndex;
                            sender.itemsSource.shift();
                            sender.collectionView.refresh();
                            sender.selectedValue = value;
                            sender.selectedIndex = index - 1;
                            updating = false;
                        });
                    }
                }, function () { return _this._validateNullValueOfParameter(element); });
            });
        }
        return element;
    };
    _ParametersEditor.prototype._updateParameters = function (parameter, value) {
        var spliteNewLine = function (value, multiValues) {
            if (multiValues && !wjcCore.isArray(value)) {
                return value.split(/[\r\n]+/);
            }
            else {
                return value;
            }
        }, item;
        this.itemsSource.some(function (v) {
            if (v.name === parameter.name) {
                item = v;
                return true;
            }
            return false;
        });
        this._parameters[parameter.name] = item.value = parameter.value = spliteNewLine(value, parameter.multiValue);
    };
    _ParametersEditor.prototype._generateBoolEditor = function (parameter) {
        var _this = this;
        var checkEditor, itemsSource = [], element;
        if (parameter.nullable) {
            element = document.createElement('div');
            checkEditor = new wjcInput.ComboBox(element);
            checkEditor.isEditable = false;
            checkEditor.displayMemberPath = 'name';
            checkEditor.selectedValuePath = 'value';
            itemsSource.push({ name: 'None', value: null });
            itemsSource.push({ name: 'True', value: true });
            itemsSource.push({ name: 'False', value: false });
            checkEditor.itemsSource = itemsSource;
            checkEditor.selectedValue = parameter.value;
            checkEditor.selectedIndexChanged.addHandler(function (sender) {
                _this._deferValidate(parameter.name, function () { return _this._updateParameters(parameter, sender.selectedValue); });
            });
        }
        else {
            element = document.createElement('input');
            element.type = 'checkbox';
            element.checked = parameter.value;
            _addEvent(element, 'click', function () {
                _this._deferValidate(parameter.name, function () { return _this._updateParameters(parameter, element.checked); });
            });
        }
        return element;
    };
    _ParametersEditor.prototype._generateStringEditor = function (parameter) {
        var self = this, element;
        if (parameter.multiValue) {
            element = self._createTextarea(parameter.value, parameter.dataType);
        }
        else {
            element = document.createElement('input');
            element.type = 'text';
            if (parameter.value) {
                element.value = parameter.value;
            }
        }
        self._bindTextChangedEvent(element, parameter);
        return element;
    };
    _ParametersEditor.prototype._createTextarea = function (value, dataType) {
        var textarea = document.createElement('textarea'), format, dates = [];
        if (dataType === _ParameterType.DateTime || dataType === _ParameterType.Time || dataType === _ParameterType.Date) {
            format = _ParametersEditor._dateTimeFormat;
        }
        if (value && value.length > 0) {
            if (format) {
                for (var i = 0; i < value.length; i++) {
                    dates.push(wjcCore.Globalize.formatDate(new Date(value[i]), format));
                }
                textarea.value = dates.join('\n');
            }
            else {
                textarea.value = value.join('\n');
            }
        }
        textarea.wrap = 'off';
        textarea.setAttribute('data-type', dataType.toString());
        return textarea;
    };
    _ParametersEditor.prototype._bindTextChangedEvent = function (element, parameter) {
        var _this = this;
        _addEvent(element, 'change,keyup,paste,input', function () {
            _this._deferValidate(parameter.name, function () { return _this._updateParameters(parameter, element.value); }, function () {
                if (element.value && !parameter.nullable) {
                    _this._validateNullValueOfParameter(element);
                }
            });
        });
    };
    _ParametersEditor.prototype._generateNumberEditor = function (parameter) {
        var _this = this;
        var element, inputNumber;
        if (parameter.multiValue) {
            element = this._createTextarea(parameter.value, parameter.dataType);
            this._bindTextChangedEvent(element, parameter);
        }
        else {
            element = document.createElement('div');
            inputNumber = new wjcInput.InputNumber(element);
            inputNumber.format = parameter.dataType === _ParameterType.Integer ? 'n0' : 'n2';
            inputNumber.isRequired = !parameter.nullable;
            if (parameter.value) {
                inputNumber.value = parameter.dataType === _ParameterType.Integer ? parseInt(parameter.value) : parseFloat(parameter.value);
            }
            inputNumber.valueChanged.addHandler(function (sender) {
                _this._deferValidate(parameter.name, function () { return _this._updateParameters(parameter, sender.value); });
            });
        }
        return element;
    };
    _ParametersEditor.prototype._generateDateTimeEditor = function (parameter) {
        var _this = this;
        var element, input;
        if (parameter.multiValue) {
            element = this._createTextarea(parameter.value, parameter.dataType);
            element.title = _ParametersEditor._dateTimeFormat;
            this._bindTextChangedEvent(element, parameter);
        }
        else {
            element = document.createElement('div');
            if (parameter.dataType == _ParameterType.Date) {
                input = new wjcInput.InputDate(element);
            }
            else {
                if (parameter.dataType == _ParameterType.DateTime) {
                    input = new wjcInput.InputDateTime(element);
                    input.timeStep = 60;
                }
                else {
                    input = new wjcInput.InputTime(element);
                    input.step = 60;
                }
            }
            input.isRequired = !parameter.nullable;
            if (parameter.value != null) {
                input.value = new Date(parameter.value);
            }
            else {
                input.value = null;
            }
            input.valueChanged.addHandler(function () {
                _this._deferValidate(parameter.name, function () { return _this._updateParameters(parameter, input.value.toJSON()); });
            });
        }
        return element;
    };
    _ParametersEditor.prototype._validateNullValueOfParameter = function (element) {
        var errors = this._errors;
        if (!errors || !errors.length) {
            return;
        }
        for (var i = 0; i < errors.length; i++) {
            if (errors[i].key !== element.parentElement.getAttribute(_ParametersEditor._paramIdAttr)) {
                continue;
            }
            var errorDiv = element.parentElement.querySelector('.error');
            if (!errorDiv) {
                continue;
            }
            element.parentElement.removeChild(errorDiv);
            errors.splice(i, 1);
            break;
        }
    };
    _ParametersEditor._paramIdAttr = 'param-id';
    _ParametersEditor._errorsHiddenCss = 'wj-parametererrors-hidden';
    _ParametersEditor._dateTimeFormat = 'MM/dd/yyyy HH:mm';
    return _ParametersEditor;
}(wjcCore.Control));
exports._ParametersEditor = _ParametersEditor;
var _MultiSelectEx = (function () {
    function _MultiSelectEx(element) {
        this._selectedAll = false;
        this._innerCheckedItemsChanged = false;
        this.checkedItemsChanged = new wjcCore.Event();
        var self = this, multiSelect = new wjcInput.MultiSelect(element);
        self._multiSelect = multiSelect;
        multiSelect.checkedItemsChanged.addHandler(self.onCheckedItemsChanged, self);
        multiSelect.isDroppedDownChanged.addHandler(self.onIsDroppedDownChanged, self);
        multiSelect.headerFormatter = function () { return self._updateHeader(); };
    }
    _MultiSelectEx.prototype._updateHeader = function () {
        var self = this, checkedItems = self.checkedItems || [], texts = [], displayMemberPath = self.displayMemberPath;
        if (!checkedItems.length) {
            return wjcCore.culture.Viewer.parameterNoneItemsSelected;
        }
        if (self._selectedAll) {
            return wjcCore.culture.Viewer.parameterAllItemsSelected;
        }
        if (displayMemberPath) {
            for (var i = 0; i < checkedItems.length; i++) {
                texts[i] = checkedItems[i][displayMemberPath];
            }
            return texts.join(', ');
        }
        return checkedItems.join(', ');
    };
    _MultiSelectEx.prototype.onIsDroppedDownChanged = function () {
        if (!this._multiSelect.isDroppedDown) {
            return;
        }
        this._updateSelectedAll();
    };
    _MultiSelectEx.prototype.onCheckedItemsChanged = function (sender, e) {
        var self = this;
        if (self._innerCheckedItemsChanged) {
            return;
        }
        if (!self._selectAllItem) {
            self.checkedItemsChanged.raise(self, e);
            return;
        }
        self._updateSelectedAll();
        self.checkedItemsChanged.raise(self, e);
    };
    Object.defineProperty(_MultiSelectEx.prototype, "isEditable", {
        get: function () {
            return this._multiSelect.isEditable;
        },
        set: function (value) {
            this._multiSelect.isEditable = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_MultiSelectEx.prototype, "isDisabled", {
        get: function () {
            return this._multiSelect.isDisabled;
        },
        set: function (value) {
            this._multiSelect.isDisabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_MultiSelectEx.prototype, "displayMemberPath", {
        get: function () {
            return this._multiSelect.displayMemberPath;
        },
        set: function (value) {
            this._multiSelect.displayMemberPath = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_MultiSelectEx.prototype, "selectedValuePath", {
        get: function () {
            return this._multiSelect.selectedValuePath;
        },
        set: function (value) {
            this._multiSelect.selectedValuePath = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_MultiSelectEx.prototype, "itemsSource", {
        get: function () {
            return this._itemsSource;
        },
        set: function (value) {
            var self = this, displayMemberPath = self.displayMemberPath || 'name';
            self._itemsSource = value;
            var innerSources = [];
            if (value) {
                if (value.length > 1) {
                    self._selectAllItem = {};
                    self._selectAllItem[displayMemberPath] = wjcCore.culture.Viewer.parameterSelectAllItemText;
                    innerSources.push(self._selectAllItem);
                }
                else {
                    self._selectAllItem = null;
                }
                innerSources = innerSources.concat(value);
            }
            self._multiSelect.itemsSource = innerSources;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_MultiSelectEx.prototype, "checkedItems", {
        get: function () {
            var self = this, items = [];
            if (self._multiSelect.checkedItems) {
                items = self._multiSelect.checkedItems.slice();
            }
            var index = items.indexOf(self._selectAllItem);
            if (index > -1) {
                items.splice(index, 1);
            }
            return items;
        },
        set: function (value) {
            var self = this;
            self._multiSelect.checkedItems = value;
            self._selectedAll = false;
            self._updateSelectedAll();
        },
        enumerable: true,
        configurable: true
    });
    _MultiSelectEx.prototype._updateSelectedAll = function () {
        var self = this;
        if (!self._selectAllItem) {
            return;
        }
        var checkedItems = self._multiSelect.checkedItems || [], selectedAllIndex = checkedItems.indexOf(self._selectAllItem), selectedAll = selectedAllIndex > -1, selectAllItemChanged = self._selectedAll !== selectedAll;
        if (selectAllItemChanged) {
            self._selectedAll = selectedAll;
            self._innerCheckedItemsChanged = true;
            if (self._selectedAll) {
                self._multiSelect.checkedItems = self._multiSelect.itemsSource.slice();
            }
            else {
                self._multiSelect.checkedItems = [];
            }
            self._innerCheckedItemsChanged = false;
            return;
        }
        self._selectedAll = checkedItems && self._itemsSource &&
            (checkedItems.length - (selectedAll ? 1 : 0) === self._itemsSource.length);
        if (self._selectedAll === selectedAll) {
            return;
        }
        self._innerCheckedItemsChanged = true;
        if (self._selectedAll) {
            self._multiSelect.checkedItems = checkedItems.concat(self._selectAllItem);
        }
        else {
            checkedItems = checkedItems.slice();
            checkedItems.splice(selectedAllIndex, 1);
            self._multiSelect.checkedItems = checkedItems;
        }
        self._innerCheckedItemsChanged = false;
    };
    return _MultiSelectEx;
}());
exports._MultiSelectEx = _MultiSelectEx;
var _ReportHamburgerMenu = (function (_super) {
    __extends(_ReportHamburgerMenu, _super);
    function _ReportHamburgerMenu(viewer, owner, options) {
        return _super.call(this, viewer, owner, options) || this;
    }
    _ReportHamburgerMenu.prototype._initItems = function () {
        var items = _super.prototype._initItems.call(this);
        items.splice(2, 0, { title: wjcCore.culture.Viewer.parameters, icon: parametersIcon, commandTag: ReportViewer._parameterCommandTag });
        return items;
    };
    return _ReportHamburgerMenu;
}(_HamburgerMenu));
exports._ReportHamburgerMenu = _ReportHamburgerMenu;
'use strict';
var PdfViewer = (function (_super) {
    __extends(PdfViewer, _super);
    function PdfViewer(element, options) {
        return _super.call(this, element, options) || this;
    }
    Object.defineProperty(PdfViewer.prototype, "_innerDocumentSource", {
        get: function () {
            return this._getDocumentSource();
        },
        enumerable: true,
        configurable: true
    });
    PdfViewer.prototype._getSource = function () {
        if (!this.filePath) {
            return null;
        }
        return new _PdfDocumentSource({
            serviceUrl: this.serviceUrl,
            filePath: this.filePath
        });
    };
    return PdfViewer;
}(ViewerBase));
exports.PdfViewer = PdfViewer;
//# sourceMappingURL=wijmo.viewer.js.map