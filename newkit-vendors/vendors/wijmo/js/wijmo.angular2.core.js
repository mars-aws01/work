"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
* Contains Angular 2 components for the <b>wijmo</b> module.
*
* <b>wijmo.angular2.core</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjCore from 'wijmo/wijmo.angular2.core';
* &nbsp;
* &#64;Component({
*     directives: [wjCore.WjTooltip],
*     template: '&lt;span [wjTooltip]="'Greeting'"&gt;Hello&lt;/span&gt;',
*     selector: 'my-cmp',
* })
* export class MyCmp {
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.core'/>
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var ngCore = require("@angular/core");
var common_1 = require("@angular/common");
var wijmo_angular2_directiveBase_1 = require("wijmo/wijmo.angular2.directiveBase");
exports.wjTooltipMeta = {
    selector: '[wjTooltip]',
    inputs: [],
    outputs: [
        'initialized',
    ],
    exportAs: 'wjTooltip',
    providers: []
};
/**
    * Angular 2 directive for the @see:Tooltip class.
    *
    * Use the <b>wjTooltip</b> directive to add tooltips to elements on the page.
    * The wjTooltip directive supports HTML content, smart positioning, and touch.
    *
    * The wjTooltip directive is specified as a parameter added to the
    * element that the tooltip applies to. The parameter value is the tooltip
    * text or the id of an element that contains the text. For example:
    *
    * <pre>&lt;p [wjTooltip]="'#fineprint'" &gt;
    *     Regular paragraph content...&lt;/p&gt;
    * ...
    * &lt;div id="fineprint" style="display:none"&gt;
    *   &lt;h3&gt;Important Note&lt;/h3&gt;
    *   &lt;p&gt;
    *     Data for the current quarter is estimated
    *     by pro-rating etc.&lt;/p&gt;
    * &lt;/div&gt;</pre>
    */
var WjTooltip = /** @class */ (function () {
    function WjTooltip(elRef, injector, parentCmp) {
        /**
         * Indicates whether the component has been initialized by Angular.
         * Changes its value from false to true right before triggering the <b>initialized</b> event.
         */
        this.isInitialized = false;
        var behavior = this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this._elRef = elRef;
        if (!WjTooltip._toolTip) {
            WjTooltip._toolTip = new wjcCore.Tooltip();
        }
        this.created();
    }
    /**
     * If you create a custom component inherited from a Wijmo component, you can override this
     * method and perform necessary initializations that you usually do in a class constructor.
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    WjTooltip.prototype.created = function () {
    };
    WjTooltip.prototype.ngOnInit = function () {
        this._wjBehaviour.ngOnInit();
    };
    WjTooltip.prototype.ngAfterViewInit = function () {
        this._wjBehaviour.ngAfterViewInit();
    };
    WjTooltip.prototype.ngOnDestroy = function () {
        this._wjBehaviour.ngOnDestroy();
        this.wjTooltip = null;
    };
    Object.defineProperty(WjTooltip.prototype, "wjTooltip", {
        get: function () {
            return this._toolTipText;
        },
        set: function (value) {
            if (this._toolTipText != value) {
                this._toolTipText != value;
                WjTooltip._toolTip.setTooltip(this._elRef.nativeElement, value);
            }
        },
        enumerable: true,
        configurable: true
    });
    WjTooltip.meta = {
        outputs: exports.wjTooltipMeta.outputs,
    };
    WjTooltip.decorators = [
        { type: core_2.Directive, args: [{
                    selector: exports.wjTooltipMeta.selector,
                    inputs: exports.wjTooltipMeta.inputs,
                    outputs: exports.wjTooltipMeta.outputs,
                    exportAs: exports.wjTooltipMeta.exportAs,
                    providers: [
                        { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjTooltip; }) }
                    ].concat(exports.wjTooltipMeta.providers)
                },] },
    ];
    /** @nocollapse */
    WjTooltip.ctorParameters = function () { return [
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
        { type: core_2.Injector, decorators: [{ type: core_3.Inject, args: [core_2.Injector,] },] },
        { type: undefined, decorators: [{ type: core_3.Inject, args: ['WjComponent',] }, { type: core_3.SkipSelf }, { type: core_2.Optional },] },
    ]; };
    WjTooltip.propDecorators = {
        'wjTooltip': [{ type: core_3.Input },],
    };
    return WjTooltip;
}());
exports.WjTooltip = WjTooltip;
/**
    * TBD
    */
var WjComponentLoader = /** @class */ (function () {
    function WjComponentLoader(/*@Inject(DynamicComponentLoader) private _dcl: DynamicComponentLoader,*/ _cmpResolver, _elementRef) {
        this._cmpResolver = _cmpResolver;
        this._elementRef = _elementRef;
        this._isInit = false;
        this.propertiesChange = new ngCore.EventEmitter();
    }
    Object.defineProperty(WjComponentLoader.prototype, "component", {
        get: function () {
            return this._component;
        },
        set: function (value) {
            if (this._component !== value) {
                this._component = value;
                this._createComponent();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WjComponentLoader.prototype, "properties", {
        get: function () {
            return this._properties;
        },
        set: function (value) {
            this._properties = value;
            this._updateProperties();
        },
        enumerable: true,
        configurable: true
    });
    WjComponentLoader.prototype.ngOnInit = function () {
        this._isInit = true;
        this._createComponent();
    };
    WjComponentLoader.prototype._createComponent = function () {
        if (this._isInit) {
            if (this._cmpRef) {
                this._cmpRef.destroy();
                this._cmpRef = null;
            }
            var value = this._component;
            if (value && this._anchor) {
                //this._dcl.loadNextToLocation(value, this._anchor).then((cmpRef) => {
                //    this._cmpRef = cmpRef;
                //    this._updateProperties();
                //});
                this._cmpRef = this._anchor.createComponent(this._cmpResolver.resolveComponentFactory(value));
                this._updateProperties();
            }
        }
    };
    WjComponentLoader.prototype._updateProperties = function () {
        var cmp = this._cmpRef && this._cmpRef.instance, properties = this.properties;
        if (cmp && properties) {
            var propNames = Object.getOwnPropertyNames(properties);
            for (var _i = 0, propNames_1 = propNames; _i < propNames_1.length; _i++) {
                var pName = propNames_1[_i];
                cmp[pName] = properties[pName];
                var propChange = cmp[pName + 'Change'];
                if (propChange instanceof core_1.EventEmitter) {
                    //TBD: unsubscribe
                    this._addPropListener(cmp, pName, propChange);
                }
            }
        }
    };
    WjComponentLoader.prototype._addPropListener = function (component, propName, propChange) {
        var _this = this;
        propChange.subscribe(function (data) {
            _this.properties[propName] =
                _this.properties[propName] = component[propName];
            _this.propertiesChange.next(_this.properties);
        });
    };
    WjComponentLoader.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'wj-component-loader',
                    template: "<div #anchor></div>",
                    inputs: ['component', 'properties'],
                    outputs: ['propertiesChange']
                },] },
    ];
    /** @nocollapse */
    WjComponentLoader.ctorParameters = function () { return [
        { type: core_1.ComponentFactoryResolver, decorators: [{ type: core_3.Inject, args: [core_1.ComponentFactoryResolver,] },] },
        { type: core_2.ElementRef, decorators: [{ type: core_3.Inject, args: [core_2.ElementRef,] },] },
    ]; };
    WjComponentLoader.propDecorators = {
        '_anchor': [{ type: core_1.ViewChild, args: ['anchor', { read: core_2.ViewContainerRef },] },],
    };
    return WjComponentLoader;
}());
exports.WjComponentLoader = WjComponentLoader;
var moduleExports = [
    WjTooltip, WjComponentLoader
];
var WjCoreModule = /** @class */ (function () {
    function WjCoreModule() {
    }
    WjCoreModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                    declarations: moduleExports.slice(),
                    exports: moduleExports.slice(),
                },] },
    ];
    /** @nocollapse */
    WjCoreModule.ctorParameters = function () { return []; };
    return WjCoreModule;
}());
exports.WjCoreModule = WjCoreModule;
//# sourceMappingURL=wijmo.angular2.core.js.map