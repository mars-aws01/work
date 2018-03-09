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
var wjcViewer = require("wijmo/wijmo.viewer");
var wjcCore = require("wijmo/wijmo");
/*
    *
    * Wijmo Library 5.20173.405
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the GrapeCity Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */
/**
* Contains Angular 2 components for the <b>wijmo.viewer</b> module.
*
* <b>wijmo.angular2.viewer</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjViewer from 'wijmo/wijmo.angular2.viewer';
* &nbsp;
* &#64;Component({
*     directives: [wjViewer.WjReportViewer, wjViewer.WjPdfViewer],
*     template: `
*       &lt;wj-report-viewer [reportName]="sales" [serviceUrl]="'webserviceApi'"&gt;
*       &lt;/wj-report-viewer;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.viewer'/>
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjReportViewerMeta = {
    selector: 'wj-report-viewer',
    template: "",
    inputs: [
        'asyncBindings',
        'wjModelProperty',
        'serviceUrl',
        'filePath',
        'fullScreen',
        'zoomFactor',
        'mouseMode',
        'selectMouseMode',
        'viewMode',
        'paginated',
        'reportName',
    ],
    outputs: [
        'initialized',
        'pageIndexChangedNg: pageIndexChanged',
        'viewModeChangedNg: viewModeChanged',
        'viewModeChangePC: viewModeChange',
        'mouseModeChangedNg: mouseModeChanged',
        'mouseModeChangePC: mouseModeChange',
        'selectMouseModeChangedNg: selectMouseModeChanged',
        'selectMouseModeChangePC: selectMouseModeChange',
        'fullScreenChangedNg: fullScreenChanged',
        'fullScreenChangePC: fullScreenChange',
        'zoomFactorChangedNg: zoomFactorChanged',
        'zoomFactorChangePC: zoomFactorChange',
        'queryLoadingDataNg: queryLoadingData',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.viewer.ReportViewer control.
 *
 * Use the <b>wj-report-viewer</b> component to add <b>ReportViewer</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjReportViewer</b> component is derived from the <b>ReportViewer</b> control and
 * inherits all its properties, events and methods.
*/
var WjReportViewer = /** @class */ (function (_super) {
    __extends(WjReportViewer, _super);
    function WjReportViewer(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjReportViewer.prototype.created = function () {
    };
    WjReportViewer.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjReportViewer.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjReportViewer.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjReportViewer.prototype.addEventListener = function (target, type, fn, capture) {
        var _this = this;
        if (capture === void 0) { capture = false; }
        var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
        if (ngZone && behCl.outsideZoneEvents[type]) {
            ngZone.runOutsideAngular(function () {
                _super.prototype.addEventListener.call(_this, target, type, fn, capture);
            });
        }
        else {
            _super.prototype.addEventListener.call(this, target, type, fn, capture);
        }
    };
    WjReportViewer.prototype.onSelectMouseModeChanged = function (e) {
        // Wijmo interop always subscribes to any event, so we issue a deprecated warning
        // only if there are more than one subscriber. 
        if (this.selectMouseModeChanged['_handlers'].length > 1 ||
            this.selectMouseModeChangedNg.observers.length > 0) {
            wjcCore._deprecated('selectMouseModeChanged', 'mouseModeChanged');
        }
        this.selectMouseModeChanged.raise(this, e);
    };
    WjReportViewer.meta = {
        outputs: exports.wjReportViewerMeta.outputs,
        changeEvents: {
            'viewModeChanged': ['viewMode'],
            'mouseModeChanged': ['mouseMode'],
            'selectMouseModeChanged': ['selectMouseMode'],
            'fullScreenChanged': ['fullScreen'],
            'zoomFactorChanged': ['zoomFactor']
        },
    };
    WjReportViewer.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjReportViewerMeta.selector,
                    template: exports.wjReportViewerMeta.template,
                    inputs: exports.wjReportViewerMeta.inputs,
                    outputs: exports.wjReportViewerMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjReportViewer; }) }
                    ].concat(exports.wjReportViewerMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjReportViewer.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjReportViewer;
}(wjcViewer.ReportViewer));
exports.WjReportViewer = WjReportViewer;
exports.wjPdfViewerMeta = {
    selector: 'wj-pdf-viewer',
    template: "",
    inputs: [
        'asyncBindings',
        'wjModelProperty',
        'serviceUrl',
        'filePath',
        'fullScreen',
        'zoomFactor',
        'mouseMode',
        'selectMouseMode',
        'viewMode',
    ],
    outputs: [
        'initialized',
        'pageIndexChangedNg: pageIndexChanged',
        'viewModeChangedNg: viewModeChanged',
        'viewModeChangePC: viewModeChange',
        'mouseModeChangedNg: mouseModeChanged',
        'mouseModeChangePC: mouseModeChange',
        'selectMouseModeChangedNg: selectMouseModeChanged',
        'selectMouseModeChangePC: selectMouseModeChange',
        'fullScreenChangedNg: fullScreenChanged',
        'fullScreenChangePC: fullScreenChange',
        'zoomFactorChangedNg: zoomFactorChanged',
        'zoomFactorChangePC: zoomFactorChange',
        'queryLoadingDataNg: queryLoadingData',
    ],
    providers: [
        {
            provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.viewer.PdfViewer control.
 *
 * Use the <b>wj-pdf-viewer</b> component to add <b>PdfViewer</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
 *
* The <b>WjPdfViewer</b> component is derived from the <b>PdfViewer</b> control and
 * inherits all its properties, events and methods.
*/
var WjPdfViewer = /** @class */ (function (_super) {
    __extends(WjPdfViewer, _super);
    function WjPdfViewer(elRef, injector, parentCmp) {
        var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        _this.isInitialized = false;
        var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
        _this.created();
        return _this;
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjPdfViewer.prototype.created = function () {
    };
    WjPdfViewer.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjPdfViewer.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjPdfViewer.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
    };
    WjPdfViewer.prototype.addEventListener = function (target, type, fn, capture) {
        var _this = this;
        if (capture === void 0) { capture = false; }
        var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
        if (ngZone && behCl.outsideZoneEvents[type]) {
            ngZone.runOutsideAngular(function () {
                _super.prototype.addEventListener.call(_this, target, type, fn, capture);
            });
        }
        else {
            _super.prototype.addEventListener.call(this, target, type, fn, capture);
        }
    };
    WjPdfViewer.prototype.onSelectMouseModeChanged = function (e) {
        // Wijmo interop always subscribes to any event, so we issue a deprecated warning
        // only if there are more than one subscriber. 
        if (this.selectMouseModeChanged['_handlers'].length > 1 ||
            this.selectMouseModeChangedNg.observers.length > 0) {
            wjcCore._deprecated('selectMouseModeChanged', 'mouseModeChanged');
        }
        this.selectMouseModeChanged.raise(this, e);
    };
    WjPdfViewer.meta = {
        outputs: exports.wjPdfViewerMeta.outputs,
        changeEvents: {
            'viewModeChanged': ['viewMode'],
            'mouseModeChanged': ['mouseMode'],
            'selectMouseModeChanged': ['selectMouseMode'],
            'fullScreenChanged': ['fullScreen'],
            'zoomFactorChanged': ['zoomFactor']
        },
    };
    WjPdfViewer.decorators = [
        { type: core_1.Component, args: [{
                    selector: exports.wjPdfViewerMeta.selector,
                    template: exports.wjPdfViewerMeta.template,
                    inputs: exports.wjPdfViewerMeta.inputs,
                    outputs: exports.wjPdfViewerMeta.outputs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPdfViewer; }) }
                    ].concat(exports.wjPdfViewerMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjPdfViewer.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    return WjPdfViewer;
}(wjcViewer.PdfViewer));
exports.WjPdfViewer = WjPdfViewer;
var moduleExports = [
    WjReportViewer,
    WjPdfViewer
];
var WjViewerModule = /** @class */ (function () {
    function WjViewerModule() {
    }
    WjViewerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                },] },
    ];
    /** @nocollapse */
    WjViewerModule.ctorParameters = function () { return []; };
    return WjViewerModule;
}());
exports.WjViewerModule = WjViewerModule;
//# sourceMappingURL=wijmo.angular2.viewer.js.map