"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wjcCore = require("wijmo/wijmo");
var core_1 = require("@angular/core");
'use strict';
/**
 * Exposes global options for the Wijmo for Angular 2 interop.
 */
var WjOptions = /** @class */ (function () {
    function WjOptions() {
    }
    /**
    * Indicates whether Wijmo components update binding sources of the two-way bound properties asynchronously
    * or synchronously.
    *
    * If this property is set to true (default) then changes to the Wijmo components' properties
    * with two-way bindings (like WjInputNumber.value) will cause the component to update a binding
    * source property asynchronously, after the current change detection cycle is completed.
    * Otherwise, if this property is set to false, the binding source will be updated immediately.
    * A corresponding property change event (like WjInputNumber.valueChanged) is also triggered
    * asynchronously or synchronously depending on this property value, after the binding source
    * was updated.
    *
    * This global setting can be changed for specific instances of Wijmo components, by assigning
    * the component's <b>asyncBindings</b> property with a specific boolean value.
    *
    * Transition to asynchronous binding source updates has happened in Wijmo version 350. Before that version,
    * binding sources were updated immediately after the component's property change. In some cases this
    * could lead to the <b>ExpressionChangedAfterItHasBeenCheckedError</b> exception in the applications running
    * Angular in the debug mode. For example, if your component's property value is set to 0.12345, and
    * you two-way bind it to the <b>value</b> property of the <b>WjInputNumber</b> component with the <b>format</b>
    * property set to <b>'n2'</b>, the WjInputNumber immediately converts this value to 0.12. This change,
    * in turn, causes Angular to update your component property (the source of this binding), so that its
    * value changes from 0.12345 to 0.12. If this source update is performed synchronously then the binding
    * source property changes its value during the same change detection cycle, which is prohibited by Angular.
    * If Angular runs in debug mode then it executes a special check after every change detection cycle, which
    * detects this change and raises the <b>ExpressionChangedAfterItHasBeenCheckedError</b> exception.
    * Asynchronous binding source updates resolve this problem, because the binding source property
    * is updated after the current change detection cycle has finished.
    *
    * If the <b>ExpressionChangedAfterItHasBeenCheckedError</b> is not an issue for you, and parts of
    * you application logic are sensible to a moment when binding source update happens, you can change
    * this functionality by setting the global <b>asyncBindings</b> property to false. This should be
    * done before the first Wijmo component was instantiated by your application logic, and the best
    * place to do it is the file where you declare the application's root NgModule. This can be done
    * with the code like this:
    * <pre>import * as wjBase from 'wijmo/wijmo.angular2.directiveBase';
    * wjBase.WjOptions.asyncBindings = false;</pre>
    *
    * Alternatively, you can change the update mode for the specific component using its own
    * <b>asyncBindings</b> property. For example:
    * <pre>&lt;wj-input-number [asyncBindings]="false" [(value)]="amount"&gt;&lt;/wj-input-number&gt;</pre>
    */
    WjOptions.asyncBindings = true;
    return WjOptions;
}());
exports.WjOptions = WjOptions;
var WjComponentResolvedMetadata = /** @class */ (function () {
    function WjComponentResolvedMetadata(rawMeta) {
        this.changeEventMap = [];
        this.allImplEvents = [];
        this.resolveChangeEventMap(rawMeta);
    }
    WjComponentResolvedMetadata.prototype.resolveChangeEventMap = function (rawMeta) {
        var map = this.changeEventMap, outputs = rawMeta.outputs, changeEvents = rawMeta.changeEvents || {};
        map.splice(0, map.length);
        this.allImplEvents = [];
        if (!(outputs && outputs.length)) {
            return;
        }
        var allEventsMap = outputs.map(function (strPair) { return strPair.split(':'); })
            .map(function (arrPair) { return { implName: arrPair[0].trim(), exposeName: arrPair[1] && arrPair[1].trim() }; });
        this.allImplEvents = allEventsMap.map(function (arrPair) { return arrPair.implName; });
        // Creates array of { implName, exposeName } objects, with both properties defined.
        var outputPairs = allEventsMap.filter(function (arrPair) { return arrPair.implName && arrPair.exposeName; });
        //let outputPairs = outputs.map((strPair) => strPair.split(':'))
        //    .filter((arrPair) => arrPair.length === 2 && arrPair[0] && arrPair[1])
        //    .map((arrPair) => { return { implName: arrPair[0].trim(), exposeName: arrPair[1].trim() } });
        for (var _i = 0, outputPairs_1 = outputPairs; _i < outputPairs_1.length; _i++) {
            var pair = outputPairs_1[_i];
            var wjEvent = Ng2Utils.getWjEventName(pair.implName);
            if (wjEvent) {
                var eventItem = {
                    eventImpl: pair.implName, event: pair.exposeName
                };
                var changeProps = changeEvents[pair.exposeName];
                if (changeProps && changeProps.length) {
                    eventItem.props = changeProps.map(function (prop) {
                        var ret = {
                            prop: prop,
                            evExposed: Ng2Utils.getChangeEventNameExposed(prop),
                            evImpl: Ng2Utils.getChangeEventNameImplemented(prop)
                        };
                        return ret;
                    });
                }
                map.push(eventItem);
            }
        }
        // add parent path ("dot") prop change events
        for (var propChangeEvent in changeEvents) {
            if (propChangeEvent.indexOf('.') > -1) {
                var eventItem = {
                    eventImpl: null,
                    event: propChangeEvent,
                    props: changeEvents[propChangeEvent].map(function (prop) {
                        var ret = {
                            prop: prop,
                            evExposed: Ng2Utils.getChangeEventNameExposed(prop),
                            evImpl: Ng2Utils.getChangeEventNameImplemented(prop)
                        };
                        return ret;
                    })
                };
                map.push(eventItem);
            }
        }
    };
    return WjComponentResolvedMetadata;
}());
exports.WjComponentResolvedMetadata = WjComponentResolvedMetadata;
var WjDirectiveBehavior = /** @class */ (function () {
    function WjDirectiveBehavior(directive, elementRef, injector, injectedParent) {
        this._pendingEvents = [];
        this.isInitialized = false;
        this.isDestroyed = false;
        this.directive = directive;
        this.elementRef = elementRef;
        this.injector = injector;
        this.injectedParent = injectedParent;
        var typeData = this.typeData =
            directive.constructor[WjDirectiveBehavior.directiveTypeDataProp];
        if (typeData.siblingId == null) {
            typeData.siblingId = (++WjDirectiveBehavior.siblingDirId) + '';
        }
        var resolvedTypeData = directive.constructor[WjDirectiveBehavior.directiveResolvedTypeDataProp];
        if (resolvedTypeData) {
            this.resolvedTypeData = resolvedTypeData;
        }
        else {
            directive.constructor[WjDirectiveBehavior.directiveResolvedTypeDataProp] =
                resolvedTypeData = this.resolvedTypeData = new WjComponentResolvedMetadata(typeData);
        }
        directive[WjDirectiveBehavior.BehaviourRefProp] = this;
        injector[WjDirectiveBehavior.BehaviourRefProp] = this;
        directive[WjDirectiveBehavior.isInitializedPropAttr] = false;
        this._createEvents();
        this._setupAsChild();
        if (this._isHostElement()) {
            elementRef.nativeElement.setAttribute(WjDirectiveBehavior.siblingDirIdAttr, typeData.siblingId);
        }
        // We can subscribe only to 'own' (without '.' in event name) events here. Handlers to foreign
        // events will be added in ngOnInit.
        this.subscribeToEvents(false);
    }
    WjDirectiveBehavior.getHostElement = function (ngHostElRef, injector) {
        if (!WjDirectiveBehavior.ngZone) {
            WjDirectiveBehavior.ngZone = injector.get(core_1.NgZone);
        }
        return ngHostElRef.nativeElement;
    };
    WjDirectiveBehavior.attach = function (directive, elementRef, injector, injectedParent) {
        return new WjDirectiveBehavior(directive, elementRef, injector, injectedParent);
    };
    WjDirectiveBehavior.prototype.ngOnInit = function () {
        this.isInitialized = true;
        this._initParent();
        // subscribe to foreign events here (like Column's 'grid.selectionChanged').
        this.subscribeToEvents(true);
    };
    WjDirectiveBehavior.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.directive[WjDirectiveBehavior.isInitializedPropAttr] = true;
        setTimeout(function () {
            if (!_this.isDestroyed) {
                _this.directive[WjDirectiveBehavior.initializedEventAttr].emit(undefined);
            }
        });
    };
    WjDirectiveBehavior.prototype.ngOnDestroy = function () {
        if (this.isDestroyed) {
            return;
        }
        this.isDestroyed = true;
        var control = this.directive;
        if (this._siblingInsertedEH) {
            this.elementRef.nativeElement.removeEventListener('DOMNodeInserted', this._siblingInsertedEH);
        }
        if (this._isChild() && this.parentBehavior) {
            var parControl = this.parentBehavior.directive, parProp = this._getParentProp();
            if (!this.parentBehavior.isDestroyed && parControl && parProp && control) {
                var parArr = parControl[parProp];
                if (wjcCore.isArray(parArr)) {
                    if (parArr) {
                        var idx = parArr.indexOf(control);
                        if (idx >= 0) {
                            parArr.splice(idx, 1);
                        }
                    }
                }
            }
        }
        if (control instanceof wjcCore.Control) {
            // We call dispose() with a delay, to get directives such as ng-if/ng-repeat a chance to remove its child subtree
            // berore the control will be disposed. Otherwise, Control.dispose() replaces its host element with an assignment 
            // to outerHTML, that creates an element clone in its parent with a different pointer, not the one that
            // ng-if stores locally, so this clone is out of ng-if control and stays in DOM forever.
            // TBD: do we need this delay in Ng2?
            // Answer: no, it breaks controls in templates, because Ng2 reuses control's host elements.
            //setTimeout(function () {
            if (control.hostElement) {
                // control.dispose() kills current host element (by outerHTML=... assignment), while Ng2 reuses it,
                // so we need to keep it in its correct position after call to control.dispose().
                var host = this.elementRef.nativeElement, hostParent = host && host.parentNode, hostIdx = hostParent ? Array.prototype.indexOf.call(hostParent.childNodes, host) : -1;
                //TBD: !!! control.dispose() will dispose all child controls, we need to dispose all directives before it!!!
                control.dispose();
                if (hostIdx > -1 && Array.prototype.indexOf.call(hostParent.childNodes, host) < 0) {
                    host.textContent = '';
                    if (hostIdx < hostParent.childNodes.length) {
                        hostParent.replaceChild(host, hostParent.childNodes[hostIdx]);
                    }
                    //else {
                    //    hostParent.appendChild(host);
                    //}
                }
            }
            //}, 0);
        }
        this.injector[WjDirectiveBehavior.BehaviourRefProp] = null;
    };
    WjDirectiveBehavior.instantiateTemplate = function (parent, viewContainerRef, templateRef, domRenderer, useTemplateRoot, dataContext) {
        if (useTemplateRoot === void 0) { useTemplateRoot = false; }
        if (dataContext === void 0) { dataContext = {}; }
        var viewRef = viewContainerRef.createEmbeddedView(templateRef, dataContext, viewContainerRef.length);
        var nodes = viewRef.rootNodes, rootEl;
        if (useTemplateRoot && nodes.length === 1) {
            rootEl = nodes[0];
        }
        else {
            rootEl = document.createElement('div');
            for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                var curNode = nodes_1[_i];
                rootEl.appendChild(curNode);
            }
        }
        if (parent) {
            parent.appendChild(rootEl);
        }
        return { viewRef: viewRef, rootElement: rootEl };
    };
    WjDirectiveBehavior.prototype.getPropChangeEvent = function (propName) {
        var evToProps = this.typeData.changeEvents;
        if (evToProps) {
            for (var event_1 in evToProps) {
                if (evToProps[event_1].indexOf(propName) > -1) {
                    return event_1;
                }
            }
        }
        return null;
    };
    WjDirectiveBehavior.prototype._createEvents = function () {
        var events = this.resolvedTypeData.allImplEvents;
        for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
            var evName = events_1[_i];
            //let isAsync = evName === 'initialized';
            //this.directive[evName] = new EventEmitter(isAsync);
            this.directive[evName] = new core_1.EventEmitter(false);
        }
    };
    // afterInit - indicates the phase (constructor (false) or ngOnInit (true))
    WjDirectiveBehavior.prototype.subscribeToEvents = function (afterInit) {
        var changeEvents = this.resolvedTypeData.changeEventMap;
        afterInit = !!afterInit;
        // Add handlers
        for (var _i = 0, changeEvents_1 = changeEvents; _i < changeEvents_1.length; _i++) {
            var curEventMap = changeEvents_1[_i];
            if (afterInit !== (curEventMap.event.indexOf(".") < 0)) {
                this.addHandlers(curEventMap);
            }
        }
        if (afterInit) {
            // update two-way bindings in the target-to-source direction
            for (var _a = 0, changeEvents_2 = changeEvents; _a < changeEvents_2.length; _a++) {
                var curEventMap = changeEvents_2[_a];
                this.triggerPropChangeEvents(curEventMap, true);
            }
        }
    };
    WjDirectiveBehavior.prototype.addHandlers = function (eventMap) {
        var _this = this;
        var directive = this.directive;
        WjDirectiveBehavior.evaluatePath(directive, eventMap.event).addHandler(function (s, e) {
            // ensure that events are triggered in ngzone, this will cause change detection after handlers
            // will be executed
            _this._runInsideNgZone(function () {
                // Trigger property change events
                if (_this.isInitialized) {
                    _this.triggerPropChangeEvents(eventMap);
                }
                // Trigger Wijmo event
                if (eventMap.eventImpl) {
                    _this._triggerEvent(directive[eventMap.eventImpl], e, eventMap.props && eventMap.props.length > 0);
                    //(<ng2.EventEmitter<any>>directive[eventMap.eventImpl]).emit(e);
                }
            });
        });
    };
    WjDirectiveBehavior.prototype.triggerPropChangeEvents = function (eventMap, allowAsync) {
        if (allowAsync === void 0) { allowAsync = true; }
        var directive = this.directive;
        if (eventMap.props && eventMap.props.length) {
            // Trigger property change events
            for (var _i = 0, _a = eventMap.props; _i < _a.length; _i++) {
                var curChangeProp = _a[_i];
                this._triggerEvent(directive[curChangeProp.evImpl], directive[curChangeProp.prop], allowAsync);
                //(<ng2.EventEmitter<any>>directive[curChangeProp.evImpl]).emit(directive[curChangeProp.prop]);
            }
        }
    };
    WjDirectiveBehavior.prototype._setupAsChild = function () {
        if (!this._isChild()) {
            return;
        }
        if (this._isHostElement()) {
            this.elementRef.nativeElement.style.display = 'none';
        }
        this.parentBehavior = WjDirectiveBehavior.getBehavior(this.injectedParent);
    };
    WjDirectiveBehavior.prototype._isAsyncBinding = function () {
        var dirValue = this.directive[WjDirectiveBehavior.asyncBindingUpdatePropAttr];
        return dirValue == null ? WjOptions.asyncBindings : dirValue;
    };
    // --------------------- Child directive ------------------------
    //Determines whether this is a child link.
    //NOTE: functionality is *not* based on _parentPropDesc
    WjDirectiveBehavior.prototype._isChild = function () {
        return this._isParentInitializer() || this._isParentReferencer();
    };
    // Indicates whether this directictive operates as a child directictive that initializes a property of its parent.
    WjDirectiveBehavior.prototype._isParentInitializer = function () {
        return this.directive[WjDirectiveBehavior.parPropAttr] != null;
    };
    // Indicates whether this directictive operates as a child directictive that references a parent in its property or
    // a constructor.
    WjDirectiveBehavior.prototype._isParentReferencer = function () {
        // only non-empty string resolves to true
        return !!this.typeData.parentRefProperty;
    };
    //For the child directives returns parent's property name that it services. Property name defined via
    //the wjProperty attribute of directive tag has priority over the directive._property definition.
    //NOTE: functionality is *not* based on _parentPropDesc
    WjDirectiveBehavior.prototype._getParentProp = function () {
        return this.directive[WjDirectiveBehavior.parPropAttr];
    };
    // For a child directive, the name of the property of the directive's underlying object that receives the reference
    // to the parent, or an empty string that indicates that the reference to the parent should be passed as the 
    // underlying object's constructor parameter.
    WjDirectiveBehavior.prototype._getParentReferenceProperty = function () {
        //return this.typeData.metaData.parentReferenceProperty;
        return this.typeData.parentRefProperty;
    };
    // Determines whether the child link uses an object created by the parent property, instead of creating it by
    // itself, and thus object's initialization should be delayed until parent link's control is created.
    //IMPORTANT: functionality is *based* on _parentPropDesc
    WjDirectiveBehavior.prototype._useParentObj = function () {
        // we can't support this, all affected properties should be read-write
        return false;
    };
    // For the child referencer directive, indicates whether the parent should be passed as a parameter the object
    // constructor.
    WjDirectiveBehavior.prototype._parentInCtor = function () {
        return this._isParentReferencer() && this._getParentReferenceProperty() == '';
    };
    WjDirectiveBehavior.prototype._initParent = function () {
        if (!this.parentBehavior || this._useParentObj()) {
            return;
        }
        var parDir = this.parentBehavior.directive, propName = this._getParentProp(), control = this.directive;
        if (this._isParentInitializer()) {
            var parProp = this._getParentProp();
            var parArr = parDir[propName];
            if (wjcCore.isArray(parArr)) {
                // insert child at correct index, which is the same as an index of the directive element amid sibling directives
                // of the same type
                var isHostElement = this._isHostElement(), linkIdx = isHostElement ? this._getSiblingIndex() : -1;
                if (linkIdx < 0 || linkIdx >= parArr.length) {
                    linkIdx = parArr.length;
                }
                parArr.splice(linkIdx, 0, control);
                if (isHostElement) {
                    this._siblingInsertedEH = this._siblingInserted.bind(this);
                    this.elementRef.nativeElement.addEventListener('DOMNodeInserted', this._siblingInsertedEH);
                }
            }
            else {
                parDir[propName] = control;
            }
        }
        if (this._isParentReferencer() && !this._parentInCtor()) {
            control[this._getParentReferenceProperty()] = parDir;
        }
    };
    // Gets an index of this directive host element among another host elements pertain to the same directive type.
    WjDirectiveBehavior.prototype._getSiblingIndex = function () {
        var thisEl = this.elementRef.nativeElement, parEl = thisEl.parentElement;
        // If parentElement is null, e.g. because this element is temporary in DocumentFragment, the index
        // of the element isn't relevant to the item's position in the array, so we return -1 and thus force
        // a calling code to not reposition the item in the array at all.  
        if (!parEl) {
            return -1;
        }
        var siblings = parEl.childNodes, idx = -1, dirId = this.typeData.siblingId;
        for (var i = 0; i < siblings.length; i++) {
            var curEl = siblings[i];
            if (curEl.nodeType == 1 && curEl.getAttribute(WjDirectiveBehavior.siblingDirIdAttr) == dirId) {
                ++idx;
                if (curEl === thisEl) {
                    return idx;
                }
            }
        }
        return -1;
    };
    WjDirectiveBehavior.prototype._siblingInserted = function (e) {
        if (e.target === this.elementRef.nativeElement) {
            var lIdx = this._getSiblingIndex(), parArr = this.parentBehavior.directive[this._getParentProp()], directive = this.directive, arrIdx = parArr.indexOf(directive);
            if (lIdx >= 0 && arrIdx >= 0 && lIdx !== arrIdx) {
                parArr.splice(arrIdx, 1);
                lIdx = Math.min(lIdx, parArr.length);
                parArr.splice(lIdx, 0, directive);
            }
        }
    };
    // Indicates whether the host node is HTMLElement. E.g. for template directive a host node is comment.
    WjDirectiveBehavior.prototype._isHostElement = function () {
        return this.elementRef.nativeElement.nodeType === Node.ELEMENT_NODE;
    };
    // --- end of Child directive ------------------------
    WjDirectiveBehavior.prototype._runInsideNgZone = function (func) {
        var behCl = WjDirectiveBehavior;
        if (behCl.ngZone && !behCl._ngZoneRun) {
            behCl._ngZoneRun = behCl.ngZone.run.bind(behCl.ngZone);
        }
        return (behCl._ngZoneRun || (function (fn) { return fn(); }))(func);
    };
    WjDirectiveBehavior.prototype._triggerEvent = function (event, args, allowAsync) {
        var _this = this;
        if (allowAsync && this._isAsyncBinding()) {
            var pendingEvents = this._pendingEvents, delayedEvent = {
                event: event,
                args: args
            };
            pendingEvents.push(delayedEvent);
            if (this._pendingEventsTO == null) {
                this._pendingEventsTO = setTimeout(function () {
                    _this._triggerPendingEvents(false);
                }, 0);
            }
        }
        else {
            event.emit(args);
        }
    };
    WjDirectiveBehavior.prototype._triggerPendingEvents = function (flush) {
        if (this._pendingEventsTO != null) {
            clearTimeout(this._pendingEventsTO);
            this._pendingEventsTO = null;
        }
        if (this.isDestroyed) {
            return;
        }
        // clone pending events array
        var pendingEvents = [].concat(this._pendingEvents);
        this._pendingEvents.splice(0, this._pendingEvents.length);
        for (var _i = 0, pendingEvents_1 = pendingEvents; _i < pendingEvents_1.length; _i++) {
            var curEvent = pendingEvents_1[_i];
            curEvent.event.emit(curEvent.args);
        }
        // if flushing and previous events caused new events, trigger
        // new events too.
        if (flush && this._pendingEvents.length) {
            this._triggerPendingEvents(true);
        }
    };
    // Triggers pending events queued for the asynchronous execution immediately.
    WjDirectiveBehavior.prototype.flushPendingEvents = function () {
        this._triggerPendingEvents(true);
    };
    // ----- Utility methods
    WjDirectiveBehavior.evaluatePath = function (obj, path) {
        this._pathBinding.path = path;
        return this._pathBinding.getValue(obj);
    };
    // Gets WjDirectiveBehavior associated with specified directive.
    WjDirectiveBehavior.getBehavior = function (directive) {
        return directive ? directive[WjDirectiveBehavior.BehaviourRefProp] : null;
    };
    // Name of the property created on directive and Injector instances that references this behavior
    WjDirectiveBehavior.directiveTypeDataProp = 'meta';
    WjDirectiveBehavior.directiveResolvedTypeDataProp = '_wjResolvedMeta';
    WjDirectiveBehavior.BehaviourRefProp = '_wjBehaviour';
    WjDirectiveBehavior.parPropAttr = 'wjProperty';
    WjDirectiveBehavior.wjModelPropAttr = 'wjModelProperty';
    WjDirectiveBehavior.initializedEventAttr = 'initialized';
    WjDirectiveBehavior.isInitializedPropAttr = 'isInitialized';
    WjDirectiveBehavior.siblingDirIdAttr = 'wj-directive-id';
    WjDirectiveBehavior.asyncBindingUpdatePropAttr = 'asyncBindings';
    WjDirectiveBehavior.siblingDirId = 0;
    WjDirectiveBehavior.wijmoComponentProviderId = 'WjComponent';
    // An hash object of event names that Wijmo controls should subscribe to outside NgZone.
    WjDirectiveBehavior.outsideZoneEvents = {
        // IMPORTANT: don't include the commented out events!
        //'drag': true,
        //'dragover': true,
        'pointermove': true,
        'pointerover': true,
        'mousemove': true,
        'wheel': true,
        'touchmove': true
    };
    WjDirectiveBehavior._pathBinding = new wjcCore.Binding('');
    return WjDirectiveBehavior;
}());
exports.WjDirectiveBehavior = WjDirectiveBehavior;
var Ng2Utils = /** @class */ (function () {
    function Ng2Utils() {
    }
    // Returns an array for the @Component 'outputs' property.
    Ng2Utils.initEvents = function (directiveType, changeEvents) {
        var ret = [];
        for (var _i = 0, changeEvents_3 = changeEvents; _i < changeEvents_3.length; _i++) {
            var curEventMap = changeEvents_3[_i];
            var changeProps = curEventMap.props;
            if (curEventMap.event && curEventMap.eventImpl) {
                ret.push(curEventMap.eventImpl + ':' + curEventMap.event);
            }
            if (changeProps && changeProps.length) {
                for (var _a = 0, changeProps_1 = changeProps; _a < changeProps_1.length; _a++) {
                    var curChangeProp = changeProps_1[_a];
                    ret.push(curChangeProp.evImpl + ':' + curChangeProp.evExposed);
                }
            }
        }
        return ret;
    };
    Ng2Utils.getChangeEventNameImplemented = function (propertyName) {
        //return Ng2Utils.getChangeEventNameExposed(propertyName) + 'Ng';
        return Ng2Utils.getChangeEventNameExposed(propertyName) + Ng2Utils.changeEventImplementSuffix; //'PC';
    };
    Ng2Utils.getChangeEventNameExposed = function (propertyName) {
        return propertyName + 'Change';
    };
    Ng2Utils.getWjEventNameImplemented = function (eventName) {
        //return eventName + 'Wj';
        return eventName + Ng2Utils.wjEventImplementSuffix; //'Ng';
    };
    Ng2Utils.getWjEventName = function (ngEventName) {
        if (ngEventName) {
            var ngSuffix = Ng2Utils.wjEventImplementSuffix;
            var suffixIdx = ngEventName.length - ngSuffix.length;
            if (suffixIdx > 0 && ngEventName.substr(suffixIdx) === ngSuffix) {
                return ngEventName.substr(0, suffixIdx);
            }
        }
        return null;
    };
    // Gets the base type for the specified type.
    Ng2Utils.getBaseType = function (type) {
        var proto;
        return type && (proto = Object.getPrototypeOf(type.prototype)) && proto.constructor;
    };
    Ng2Utils.getAnnotations = function (type) {
        //return type && reflector.annotations(type);
        return Reflect.getMetadata('annotations', type);
    };
    Ng2Utils.getAnnotation = function (annotations, annotationType) {
        if (annotationType && annotations) {
            for (var _i = 0, annotations_1 = annotations; _i < annotations_1.length; _i++) {
                var curAnno = annotations_1[_i];
                if (curAnno instanceof annotationType) {
                    return curAnno;
                }
            }
        }
        return null;
    };
    // Gets the annotation of the specified annotationType defined on the specified 'type'. 
    // If 'own' is true then method will traverse up the type inheritance hierarchy to find the requested
    // annotation type.
    Ng2Utils.getTypeAnnotation = function (type, annotationType, own) {
        for (var curType = type; curType; curType = own ? null : Ng2Utils.getBaseType(curType)) {
            var anno = Ng2Utils.getAnnotation(Ng2Utils.getAnnotations(curType), annotationType);
            if (anno) {
                return anno;
            }
        }
        return null;
    };
    Ng2Utils.equals = function (v1, v2) {
        return (v1 != v1 && v2 != v2) || wjcCore.DateTime.equals(v1, v2) || v1 === v2;
    };
    // override - if true then array property values will be replaced; otherwise, concatenated.
    // includePrivate - if true then properties whose names start with '_' will be copied.
    // filter - function(name, value): boolean
    Ng2Utils._copy = function (dst, src, override, includePrivate, filter) {
        if (dst && src) {
            for (var prop in src) {
                if (includePrivate || prop[0] !== '_') {
                    var val = src[prop];
                    if (!filter || filter(prop, val)) {
                        var dstVal = dst[prop];
                        if (wjcCore.isArray(val)) {
                            dst[prop] = (!wjcCore.isArray(dstVal) || override ? [] : dstVal)
                                .concat(val);
                        }
                        else if (val !== undefined) {
                            dst[prop] = val;
                        }
                    }
                }
            }
        }
    };
    Ng2Utils.changeEventImplementSuffix = 'PC';
    Ng2Utils.wjEventImplementSuffix = 'Ng';
    return Ng2Utils;
}());
exports.Ng2Utils = Ng2Utils;
//@Injectable()
var WjValueAccessor = /** @class */ (function () {
    function WjValueAccessor(/*@Inject(Injector) injector: Injector*/ directive) {
        this._isFirstChange = true;
        this._isSubscribed = false;
        this._onChange = function (_) { };
        this._onTouched = function () { };
        //this._injector = injector;
        this._directive = directive;
        this._behavior = WjDirectiveBehavior.getBehavior(directive);
    }
    WjValueAccessor.prototype.writeValue = function (value) {
        var _this = this;
        //this._ensureDirective();
        this._modelValue = value;
        // the directive can be not initialized yet during this call, so we wait for its initialization
        // and assign the value only after it
        if (this._directive.isInitialized) {
            this._ensureInitEhUnsubscribed();
            this._updateDirective();
            this._isFirstChange = false; //see _updateDirective()
        }
        else {
            if (this._dirInitEh) {
                this._isFirstChange = false; //see _updateDirective()
            }
            else {
                var initEvent = this._directive.initialized;
                this._dirInitEh = initEvent.subscribe(function () {
                    _this._updateDirective();
                    _this._ensureInitEhUnsubscribed();
                });
            }
        }
    };
    WjValueAccessor.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    WjValueAccessor.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    WjValueAccessor.prototype._updateDirective = function () {
        // patch: seems a bug introduced in RC.4 - ngModel always writes a null during initialization,
        // though the source value is not a null, so we avoid value propagation during the first call
        // using _notFirstChange.
        // Note that this is not the issue when accessors is initialized by the FormControlName->FormGroupDirective
        // (in scenarios like in Ng2 DynamicForms sample).
        if (!this._isFirstChange || this._modelValue != null) {
            this._ensureNgModelProp();
            if (this._directive && this._ngModelProp) {
                var normValue = this._modelValue;
                // Ng2 converts nulls/indefined to '', we have to convert them back.
                if (normValue === '') {
                    normValue = null;
                }
                this._directive[this._ngModelProp] = normValue;
            }
            this._ensureSubscribed();
        }
    };
    WjValueAccessor.prototype._ensureSubscribed = function () {
        if (this._isSubscribed) {
            return;
        }
        var directive = this._directive;
        if (directive) {
            this._ensureNgModelProp();
            var ngModelProp = this._ngModelProp = directive[WjDirectiveBehavior.wjModelPropAttr];
            if (ngModelProp) {
                var changeEvent = this._behavior.getPropChangeEvent(ngModelProp);
                if (changeEvent) {
                    directive[changeEvent].addHandler(this._dirValChgEh, this);
                }
            }
            if (directive instanceof wjcCore.Control) {
                directive.lostFocus.addHandler(this._dirLostFocusEh, this);
            }
            this._isSubscribed = true;
        }
    };
    WjValueAccessor.prototype._ensureNgModelProp = function () {
        if (!this._ngModelProp && this._directive) {
            this._ngModelProp = this._directive[WjDirectiveBehavior.wjModelPropAttr];
        }
    };
    WjValueAccessor.prototype._ensureInitEhUnsubscribed = function () {
        if (this._dirInitEh) {
            this._dirInitEh.unsubscribe();
            this._dirInitEh = null;
        }
    };
    WjValueAccessor.prototype._dirValChgEh = function (s, e) {
        if (this._onChange && this._directive && this._ngModelProp) {
            var dirValue = this._directive[this._ngModelProp];
            // write the value to the model only if it's really different; otherwise, the form will be marked
            // as dirty, which may dirty form right during initialization.
            if (!Ng2Utils.equals(this._modelValue, dirValue)) {
                this._modelValue = dirValue;
                this._onChange(dirValue);
            }
        }
    };
    WjValueAccessor.prototype._dirLostFocusEh = function (s, e) {
        if (this._onTouched) {
            this._onTouched();
        }
    };
    return WjValueAccessor;
}());
exports.WjValueAccessor = WjValueAccessor;
function WjValueAccessorFactory(/*injector: Injector*/ directive) {
    return new WjValueAccessor(/*injector*/ directive);
}
exports.WjValueAccessorFactory = WjValueAccessorFactory;
var moduleExports = [];
var WjDirectiveBaseModule = /** @class */ (function () {
    function WjDirectiveBaseModule() {
    }
    WjDirectiveBaseModule.decorators = [
        { type: core_1.NgModule, args: [{},] },
    ];
    /** @nocollapse */
    WjDirectiveBaseModule.ctorParameters = function () { return []; };
    return WjDirectiveBaseModule;
}());
exports.WjDirectiveBaseModule = WjDirectiveBaseModule;
//# sourceMappingURL=wijmo.angular2.directiveBase.js.map