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
var wjcSelf = require("wijmo/wijmo.nav");
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['nav'] = wjcSelf;
var TreeView = (function (_super) {
    __extends(TreeView, _super);
    function TreeView(element, options) {
        var _this = _super.call(this, element) || this;
        _this._itmPath = new _BindingArray('items');
        _this._dspPath = new _BindingArray('header');
        _this._imgPath = new _BindingArray();
        _this._html = false;
        _this._animated = true;
        _this._xpndOnClick = true;
        _this._autoColl = true;
        _this._showChk = false;
        _this._srch = '';
        _this._isReadOnly = true;
        _this.itemsSourceChanged = new wjcCore.Event();
        _this.loadingItems = new wjcCore.Event();
        _this.loadedItems = new wjcCore.Event();
        _this.itemClicked = new wjcCore.Event();
        _this.selectedItemChanged = new wjcCore.Event();
        _this.checkedItemsChanged = new wjcCore.Event();
        _this.isCollapsedChanging = new wjcCore.Event();
        _this.isCollapsedChanged = new wjcCore.Event();
        _this.isCheckedChanging = new wjcCore.Event();
        _this.isCheckedChanged = new wjcCore.Event();
        _this.formatItem = new wjcCore.Event();
        _this.dragStart = new wjcCore.Event();
        _this.dragOver = new wjcCore.Event();
        _this.drop = new wjcCore.Event();
        _this.dragEnd = new wjcCore.Event();
        _this.nodeEditStarting = new wjcCore.Event();
        _this.nodeEditStarted = new wjcCore.Event();
        _this.nodeEditEnding = new wjcCore.Event();
        _this.nodeEditEnded = new wjcCore.Event();
        var tpl = _this.getTemplate();
        _this.applyTemplate('wj-control wj-content wj-treeview', tpl, {
            _root: 'root'
        });
        var host = _this.hostElement;
        wjcCore.setAttribute(host, 'role', 'tree', true);
        wjcCore.addClass(_this._root, TreeView._CNDL);
        wjcCore.setAttribute(_this._root, 'role', 'group', true);
        _this.addEventListener(host, 'mousedown', _this._mousedown.bind(_this));
        _this.addEventListener(host, 'click', _this._click.bind(_this));
        _this.addEventListener(host, 'keydown', _this._keydown.bind(_this));
        _this.addEventListener(host, 'keypress', _this._keypress.bind(_this));
        _this.addEventListener(host, 'wheel', function (e) {
            if (host.scrollHeight > host.offsetHeight) {
                if ((e.deltaY < 0 && host.scrollTop == 0) ||
                    (e.deltaY > 0 && host.scrollTop + host.offsetHeight >= host.scrollHeight)) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        });
        _this.addEventListener(host, 'blur', function (e) {
            if (_this._edtNode && !wjcCore.contains(_this._edtNode.element, wjcCore.getActiveElement())) {
                _this.finishEditing();
            }
        }, true);
        _this.initialize(options);
        _this.refresh();
        return _this;
    }
    Object.defineProperty(TreeView.prototype, "itemsSource", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            if (this._items != value) {
                this._items = wjcCore.asArray(value);
                this.onItemsSourceChanged();
                this._reload();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeView.prototype, "childItemsPath", {
        get: function () {
            return this._itmPath.path;
        },
        set: function (value) {
            if (value != this.childItemsPath) {
                this._itmPath.path = value;
                this._reload();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeView.prototype, "displayMemberPath", {
        get: function () {
            return this._dspPath.path;
        },
        set: function (value) {
            if (value != this.displayMemberPath) {
                this._dspPath.path = value;
                this._reload();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeView.prototype, "imageMemberPath", {
        get: function () {
            return this._imgPath.path;
        },
        set: function (value) {
            if (value != this.imageMemberPath) {
                this._imgPath.path = value;
                this._reload();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeView.prototype, "isContentHtml", {
        get: function () {
            return this._html;
        },
        set: function (value) {
            if (value != this._html) {
                this._html = wjcCore.asBoolean(value);
                this._reload();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeView.prototype, "showCheckboxes", {
        get: function () {
            return this._showChk;
        },
        set: function (value) {
            if (value != this._showChk) {
                this._showChk = wjcCore.asBoolean(value);
                this._reload();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeView.prototype, "autoCollapse", {
        get: function () {
            return this._autoColl;
        },
        set: function (value) {
            this._autoColl = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeView.prototype, "isAnimated", {
        get: function () {
            return this._animated;
        },
        set: function (value) {
            if (value != this._animated) {
                this._animated = wjcCore.asBoolean(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeView.prototype, "isReadOnly", {
        get: function () {
            return this._isReadOnly;
        },
        set: function (value) {
            this._isReadOnly = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    TreeView.prototype.startEditing = function (node) {
        if (this.isReadOnly) {
            return false;
        }
        if (!node) {
            node = this.selectedNode;
        }
        if (!node || node.isDisabled) {
            return false;
        }
        if (!this.finishEditing()) {
            return false;
        }
        var editor = node.element.querySelector('.' + TreeView._CNDT);
        if (!editor) {
            return false;
        }
        var e = new TreeNodeEventArgs(node);
        if (!this.onNodeEditStarting(e)) {
            return false;
        }
        editor.tabIndex = 0;
        editor.focus();
        editor.contentEditable = 'true';
        editor.style.cursor = 'auto';
        var rng = document.createRange();
        rng.selectNodeContents(editor);
        var sel = getSelection();
        sel.removeAllRanges();
        sel.addRange(rng);
        editor.focus();
        wjcCore.setAttribute(editor, 'autocomplete', 'off');
        wjcCore.setAttribute(editor, 'autocorrect', 'off');
        this._edtNode = node;
        this.onNodeEditStarted(e);
        return true;
    };
    TreeView.prototype.finishEditing = function (cancel) {
        var node = this._edtNode;
        if (node) {
            var editor = node.element.querySelector('.' + TreeView._CNDT);
            if (!editor) {
                return false;
            }
            var e = new TreeNodeEventArgs(node);
            if (!this.onNodeEditEnding(e)) {
                return false;
            }
            var item = node.dataItem, level = node.level;
            if (this.isContentHtml) {
                if (cancel) {
                    editor.innerHTML = this._dspPath.getValue(item, level);
                }
                else {
                    this._dspPath.setValue(item, level, editor.innerHTML);
                }
            }
            else {
                if (cancel) {
                    editor.textContent = this._dspPath.getValue(item, level);
                }
                else {
                    this._dspPath.setValue(item, level, editor.textContent);
                }
            }
            var rng = document.createRange();
            rng.selectNodeContents(editor);
            var sel = getSelection();
            sel.removeAllRanges();
            editor.contentEditable = 'false';
            editor.style.cursor = '';
            this._edtNode = null;
            this.onNodeEditEnded(e);
        }
        return true;
    };
    Object.defineProperty(TreeView.prototype, "allowDragging", {
        get: function () {
            return this._dd != null;
        },
        set: function (value) {
            if (value != this.allowDragging) {
                if (wjcCore.asBoolean(value)) {
                    this._dd = new _TreeDragDropManager(this);
                }
                else {
                    this._dd.dispose();
                    this._dd = null;
                }
                var nodes = this.hostElement.querySelectorAll('.' + TreeView._CND);
                for (var i = 0; i < nodes.length; i++) {
                    var node = nodes[i];
                    wjcCore.setAttribute(node, 'draggable', this._dd ? true : null);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeView.prototype, "expandOnClick", {
        get: function () {
            return this._xpndOnClick;
        },
        set: function (value) {
            this._xpndOnClick = wjcCore.asBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeView.prototype, "selectedItem", {
        get: function () {
            return this._selNode ? this._selNode.dataItem : null;
        },
        set: function (value) {
            if (value != this.selectedItem) {
                this.selectedNode = value ? this.getNode(value) : null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeView.prototype, "selectedNode", {
        get: function () {
            return this._selNode;
        },
        set: function (value) {
            if (value != this.selectedNode) {
                this._prevSel = this._selNode;
                if (value) {
                    value.select();
                }
                else if (this._selNode) {
                    wjcCore.removeClass(this._selNode.element, TreeView._CSEL);
                    this._selNode = null;
                    this.onSelectedItemChanged();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeView.prototype, "selectedPath", {
        get: function () {
            var path = [];
            for (var nd = this.selectedNode; nd; nd = nd.parentNode) {
                var text = this._dspPath.getValue(nd.dataItem, nd.level);
                path.splice(0, 0, text);
            }
            return path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeView.prototype, "checkedItems", {
        get: function () {
            if (this._chkItems == null) {
                var tv = TreeView, qry = '.' + tv._CND + '.' + tv._CEMP + ' > input:checked.' + tv._CNDC, chk = this._root.querySelectorAll(qry);
                this._chkItems = [];
                for (var i = 0; i < chk.length; i++) {
                    var item = chk[i].parentElement[tv._DATAITEM_KEY];
                    this._chkItems.push(item);
                }
            }
            return this._chkItems;
        },
        set: function (value) {
            if (this.showCheckboxes) {
                var tv = TreeView, qry = '.' + tv._CND + '.' + tv._CEMP, chk = this._root.querySelectorAll(qry), changed = false;
                for (var i = 0; i < chk.length; i++) {
                    var node = new TreeNode(this, chk[i]), checked = value.indexOf(node.dataItem) > -1;
                    if (node.isChecked != checked) {
                        node.isChecked = checked;
                        changed = true;
                    }
                }
                if (changed) {
                    this.onCheckedItemsChanged();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    TreeView.prototype.checkAllItems = function (check) {
        if (this.showCheckboxes) {
            var tv = TreeView, qry = '.' + tv._CND + '.' + tv._CEMP, chk = this._root.querySelectorAll(qry), changed = false;
            for (var i = 0; i < chk.length; i++) {
                var node = new TreeNode(this, chk[i]);
                if (node.isChecked != check) {
                    node.isChecked = check;
                    changed = true;
                }
            }
            if (changed) {
                this.onCheckedItemsChanged();
            }
        }
    };
    Object.defineProperty(TreeView.prototype, "totalItemCount", {
        get: function () {
            var nodes = this.hostElement.querySelectorAll('.' + TreeView._CND);
            return nodes.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeView.prototype, "lazyLoadFunction", {
        get: function () {
            return this._lazyLoad;
        },
        set: function (value) {
            if (value != this._lazyLoad) {
                this._lazyLoad = wjcCore.asFunction(value);
                this._reload();
            }
        },
        enumerable: true,
        configurable: true
    });
    TreeView.prototype.getFirstNode = function (visible, enabled) {
        var first = this.hostElement.querySelector('.' + TreeView._CND), node = first ? new TreeNode(this, first) : null;
        if (visible && node && !node.element.offsetHeight) {
            node = node.next(visible, enabled);
        }
        if (enabled && node && node.isDisabled) {
            node = node.next(visible, enabled);
        }
        return node;
    };
    TreeView.prototype.getLastNode = function (visible, enabled) {
        var last = this.hostElement.querySelectorAll('.' + TreeView._CND + ':last-child'), node = last.length ? new TreeNode(this, last[last.length - 1]) : null;
        if (visible && node && !node.element.offsetHeight) {
            node = node.previous(visible, enabled);
        }
        if (enabled && node && node.isDisabled) {
            node = node.previous(visible, enabled);
        }
        return node;
    };
    Object.defineProperty(TreeView.prototype, "nodes", {
        get: function () {
            return TreeNode._getChildNodes(this, this._root);
        },
        enumerable: true,
        configurable: true
    });
    TreeView.prototype.getNode = function (item) {
        if (this._isDirty) {
            this._loadTree();
        }
        var nodes = this.hostElement.querySelectorAll('.' + TreeView._CND);
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node[TreeView._DATAITEM_KEY] == item) {
                return new TreeNode(this, node);
            }
        }
        return null;
    };
    TreeView.prototype.addChildNode = function (index, dataItem) {
        var nd = this._createNode(dataItem);
        var nodes = this.nodes;
        if (!nodes) {
            nd.move(this, DropPosition.Into);
        }
        else if (index < nodes.length) {
            nd.move(nodes[index], DropPosition.Before);
        }
        else {
            nd.move(nodes[nodes.length - 1], DropPosition.After);
        }
        return nd;
    };
    TreeView.prototype.collapseToLevel = function (level) {
        var animated = this._animated;
        var autoColl = this._autoColl;
        this._animated = this._autoColl = false;
        this._collapseToLevel(this.nodes, level, 0);
        this._animated = animated;
        this._autoColl = autoColl;
    };
    TreeView.prototype.loadTree = function (preserveOutlineState) {
        this._loadTree(preserveOutlineState);
    };
    TreeView.prototype.onItemsSourceChanged = function (e) {
        this.itemsSourceChanged.raise(this, e);
    };
    TreeView.prototype.onLoadingItems = function (e) {
        this.loadingItems.raise(this, e);
        return !e.cancel;
    };
    TreeView.prototype.onLoadedItems = function (e) {
        this.loadedItems.raise(this, e);
    };
    TreeView.prototype.onItemClicked = function (e) {
        this.itemClicked.raise(this, e);
    };
    TreeView.prototype.onSelectedItemChanged = function (e) {
        this.selectedItemChanged.raise(this, e);
    };
    TreeView.prototype.onCheckedItemsChanged = function (e) {
        this._chkItems = null;
        this.checkedItemsChanged.raise(this, e);
    };
    TreeView.prototype.onIsCollapsedChanging = function (e) {
        this.isCollapsedChanging.raise(this, e);
        return !e.cancel;
    };
    TreeView.prototype.onIsCollapsedChanged = function (e) {
        this.isCollapsedChanged.raise(this, e);
    };
    TreeView.prototype.onIsCheckedChanging = function (e) {
        this.isCheckedChanging.raise(this, e);
        return !e.cancel;
    };
    TreeView.prototype.onIsCheckedChanged = function (e) {
        this.isCheckedChanged.raise(this, e);
    };
    TreeView.prototype.onFormatItem = function (e) {
        this.formatItem.raise(this, e);
    };
    TreeView.prototype.onDragStart = function (e) {
        this.dragStart.raise(this, e);
        return !e.cancel;
    };
    TreeView.prototype.onDragOver = function (e) {
        this.dragOver.raise(this, e);
        return !e.cancel;
    };
    TreeView.prototype.onDrop = function (e) {
        this.drop.raise(this, e);
        return !e.cancel;
    };
    TreeView.prototype.onDragEnd = function (e) {
        this.dragEnd.raise(this, e);
    };
    TreeView.prototype.onNodeEditStarting = function (e) {
        this.nodeEditStarting.raise(this, e);
        return !e.cancel;
    };
    TreeView.prototype.onNodeEditStarted = function (e) {
        this.nodeEditStarted.raise(this, e);
    };
    TreeView.prototype.onNodeEditEnding = function (e) {
        this.nodeEditEnding.raise(this, e);
        return !e.cancel;
    };
    TreeView.prototype.onNodeEditEnded = function (e) {
        this.nodeEditEnded.raise(this, e);
    };
    TreeView.prototype.refresh = function () {
        _super.prototype.refresh.call(this);
        if (!this.isUpdating && this._isDirty) {
            this._loadTree();
        }
    };
    TreeView.prototype._reload = function () {
        this._isDirty = true;
        this.invalidate();
    };
    TreeView.prototype._createNode = function (dataItem) {
        var t = new TreeView(document.createElement('div'), {
            childItemsPath: this.childItemsPath,
            displayMemberPath: this.displayMemberPath,
            imageMemberPath: this.imageMemberPath,
            isContentHtml: this.isContentHtml,
            showCheckboxes: this.showCheckboxes,
            itemsSource: [dataItem]
        });
        return t.getFirstNode();
    };
    TreeView.prototype._mousedown = function (e) {
        if (!e.defaultPrevented) {
            var cb = wjcCore.closest(e.target, 'input.' + TreeView._CNDC), ne = wjcCore.closestClass(e.target, TreeView._CND), node = ne ? new TreeNode(this, ne) : null;
            if (node && !node.isDisabled) {
                this.selectedNode = node;
            }
            this._dnIndet = cb && cb.indeterminate;
        }
    };
    TreeView.prototype._click = function (e) {
        var _this = this;
        if (!e.defaultPrevented) {
            var nodeElement = wjcCore.closestClass(e.target, TreeView._CND);
            if (nodeElement) {
                var node_1 = new TreeNode(this, nodeElement), cb_1 = wjcCore.closest(e.target, 'input.' + TreeView._CNDC);
                if (node_1.isDisabled) {
                    return;
                }
                if (!cb_1 && node_1.equals(this._edtNode)) {
                    return;
                }
                nodeElement.focus();
                if (cb_1) {
                    e.preventDefault();
                    e.stopPropagation();
                    setTimeout(function () {
                        cb_1.indeterminate = false;
                        node_1.isChecked = !node_1.isChecked;
                        _this.onCheckedItemsChanged();
                    });
                }
                if (!cb_1) {
                    var el = e.target, ctrlKey = e.ctrlKey || e.metaKey, collToLevel = ctrlKey && !node_1.hasPendingChildren, rc = nodeElement.getBoundingClientRect(), offset = this.rightToLeft ? rc.right - e.clientX : e.clientX - rc.left, toggled = false;
                    if (offset <= el.offsetHeight) {
                        if (collToLevel) {
                            this.collapseToLevel(node_1.isCollapsed ? node_1.level + 1 : node_1.level);
                        }
                        else {
                            node_1.isCollapsed = !node_1.isCollapsed;
                        }
                        toggled = true;
                    }
                    else if (this.expandOnClick && node_1.isCollapsed) {
                        if (collToLevel) {
                            this.collapseToLevel(node_1.level);
                        }
                        else {
                            node_1.isCollapsed = false;
                        }
                        toggled = true;
                    }
                    if (toggled && collToLevel && this.selectedNode) {
                        this.selectedNode.ensureVisible();
                    }
                    if (!toggled && !this.isReadOnly) {
                        if (this.selectedNode && this.selectedNode.equals(this._prevSel)) {
                            this.startEditing();
                        }
                    }
                }
                if (this.selectedItem) {
                    this.onItemClicked();
                }
            }
        }
    };
    TreeView.prototype._keydown = function (e) {
        if (!e.defaultPrevented) {
            var node = this._selNode, newNode = void 0, key = e.keyCode, handled = true;
            if (node && !node.isDisabled) {
                switch (key) {
                    case wjcCore.Key.F2:
                        this.startEditing();
                        e.preventDefault();
                        break;
                    case wjcCore.Key.Escape:
                        this.finishEditing(true);
                        e.preventDefault();
                        break;
                    case wjcCore.Key.Up:
                    case wjcCore.Key.Down:
                        this.finishEditing();
                        break;
                    case wjcCore.Key.Enter:
                        if (this._edtNode) {
                            this.finishEditing();
                            key = wjcCore.Key.Down;
                        }
                        else {
                            this.startEditing();
                            e.preventDefault();
                        }
                        break;
                }
                if (this._edtNode) {
                    return;
                }
                if (this.rightToLeft) {
                    switch (key) {
                        case wjcCore.Key.Left:
                            key = wjcCore.Key.Right;
                            break;
                        case wjcCore.Key.Right:
                            key = wjcCore.Key.Left;
                            break;
                    }
                }
                switch (key) {
                    case wjcCore.Key.Left:
                        if (!node.isCollapsed && node.hasChildren) {
                            node.setCollapsed(true);
                        }
                        else {
                            node = node.parentNode;
                            if (node) {
                                node.select();
                            }
                        }
                        break;
                    case wjcCore.Key.Right:
                        node.setCollapsed(false);
                        break;
                    case wjcCore.Key.Up:
                        newNode = node.previous(true, true);
                        break;
                    case wjcCore.Key.Down:
                        newNode = node.next(true, true);
                        break;
                    case wjcCore.Key.Home:
                        newNode = this.getFirstNode(true, true);
                        break;
                    case wjcCore.Key.End:
                        newNode = this.getLastNode(true, true);
                        break;
                    case wjcCore.Key.Space:
                        if (this.selectedItem) {
                            var cb = node.checkBox;
                            if (cb) {
                                node.isChecked = !cb.checked;
                                this.onCheckedItemsChanged();
                            }
                        }
                        break;
                    case wjcCore.Key.Enter:
                        if (this.selectedItem) {
                            this.onItemClicked();
                        }
                        break;
                    default:
                        handled = false;
                }
                if (handled) {
                    e.preventDefault();
                    if (newNode) {
                        newNode.select();
                    }
                }
            }
        }
    };
    TreeView.prototype._keypress = function (e) {
        var _this = this;
        if (!e.defaultPrevented) {
            if (e.ctrlKey || e.metaKey || e.altKey)
                return;
            if (e.target instanceof HTMLInputElement)
                return;
            if (this._edtNode)
                return;
            if (e.charCode > 32 && this.startEditing(this.selectedNode)) {
                var edt = wjcCore.getActiveElement();
                if (wjcCore.contains(this._edtNode.element, edt)) {
                    edt.textContent = String.fromCharCode(e.charCode);
                    e.preventDefault();
                    var rng = document.createRange();
                    rng.selectNodeContents(edt);
                    rng.collapse(false);
                    var sel = getSelection();
                    sel.removeAllRanges();
                    sel.addRange(rng);
                }
                return;
            }
            if (e.charCode > 32 || (e.charCode == 32 && this._srch)) {
                e.preventDefault();
                this._srch += String.fromCharCode(e.charCode).toLowerCase();
                if (this._toSrch) {
                    clearTimeout(this._toSrch);
                }
                this._toSrch = setTimeout(function () {
                    _this._toSrch = null;
                    _this._srch = '';
                }, TreeView._AS_DLY);
                var item = this._findNext();
                if (item == null && this._srch.length > 1) {
                    this._srch = this._srch[this._srch.length - 1];
                    item = this._findNext();
                }
                if (item != null) {
                    this.selectedItem = item;
                }
            }
        }
    };
    TreeView.prototype._findNext = function () {
        if (this.hostElement && this.selectedItem) {
            var start = this.getNode(this.selectedItem), node = start, wrapped = false, skip = false;
            if (this._srch.length == 1) {
                skip = true;
            }
            for (; node;) {
                if (!node.isDisabled && !skip) {
                    var txt = node.element.textContent.trim().toLowerCase();
                    if (txt.indexOf(this._srch) == 0) {
                        return node.dataItem;
                    }
                }
                var next = node.next(true, true);
                if (next == start && wrapped) {
                    break;
                }
                if (!next && !wrapped) {
                    next = this.getFirstNode(true, true);
                    wrapped = true;
                }
                node = next;
                skip = false;
            }
        }
        return null;
    };
    TreeView.prototype._loadTree = function (preserveOutlineState) {
        var root = this._root;
        if (root) {
            if (!this.onLoadingItems(new wjcCore.CancelEventArgs())) {
                return;
            }
            this._isDirty = false;
            var focus_1 = this.containsFocus();
            var sel = this.selectedItem;
            this.selectedItem = null;
            this._chkItems = null;
            this._ldLvl = -1;
            var collapsedMap = void 0;
            if (preserveOutlineState && wjcCore.isFunction(window['Map'])) {
                collapsedMap = new Map();
                var nodes = this.hostElement.querySelectorAll('.' + TreeView._CND);
                for (var i = 0; i < nodes.length; i++) {
                    var node = nodes[i];
                    if (wjcCore.hasClass(node, TreeView._CCLD)) {
                        collapsedMap.set(node[TreeView._DATAITEM_KEY], true);
                    }
                }
            }
            root.innerHTML = '';
            if (this._items) {
                for (var i = 0; i < this._items.length; i++) {
                    this._addItem(root, 0, this._items[i]);
                }
            }
            if (collapsedMap) {
                var nodes = this.hostElement.querySelectorAll('.' + TreeView._CND);
                for (var i = 0; i < nodes.length; i++) {
                    var node = nodes[i], hasList = TreeNode._isNodeList(node), collapsed = collapsedMap.get(node[TreeView._DATAITEM_KEY]);
                    wjcCore.toggleClass(node, TreeView._CCLD, collapsed == true);
                    wjcCore.setAttribute(node, 'aria-expanded', hasList ? (!collapsed).toString() : null);
                }
            }
            if (focus_1 && !this.containsFocus()) {
                this.focus();
            }
            this.selectedItem = sel;
            this.onLoadedItems();
            this._ldLvl = -1;
        }
    };
    TreeView.prototype._addItem = function (host, level, item) {
        var text = this._dspPath.getValue(item, level), imgSrc = this._imgPath.getValue(item, level), arr = wjcCore.asArray(this._itmPath.getValue(item, level), true);
        var node = document.createElement('div');
        wjcCore.addClass(node, TreeView._CND);
        node.tabIndex = 0;
        wjcCore.setAttribute(node, 'role', 'treeitem', true);
        var span = document.createElement('span');
        if (this.isContentHtml) {
            span.innerHTML = text;
        }
        else {
            span.textContent = text;
        }
        wjcCore.addClass(span, TreeView._CNDT);
        node.appendChild(span);
        if (imgSrc) {
            var img = document.createElement('img');
            img.src = imgSrc;
            node.insertBefore(img, node.firstChild);
        }
        if (this._showChk && !this._lazyLoad) {
            var cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.tabIndex = -1;
            wjcCore.addClass(cb, TreeView._CNDC);
            node.insertBefore(cb, node.firstChild);
        }
        if (this._dd) {
            node.setAttribute('draggable', 'true');
        }
        host.appendChild(node);
        node[TreeView._DATAITEM_KEY] = item;
        if (arr && arr.length == 0 && !this.lazyLoadFunction) {
            arr = null;
        }
        if (arr) {
            var expanded = true;
            if (level > this._ldLvl) {
                this._ldLvl = level;
                if (arr.length == 0) {
                    wjcCore.addClass(node, TreeView._CCLD);
                    expanded = false;
                }
            }
            else {
                wjcCore.addClass(node, TreeView._CCLD);
                expanded = false;
                if (level < this._ldLvl) {
                    this._ldLvl = 10000;
                }
            }
            if (arr.length > 0) {
                var nodeList = document.createElement('div');
                wjcCore.addClass(nodeList, TreeView._CNDL);
                for (var i = 0; i < arr.length; i++) {
                    this._addItem(nodeList, level + 1, arr[i]);
                }
                host.appendChild(nodeList);
                wjcCore.setAttribute(node, 'aria-expanded', expanded.toString(), true);
                wjcCore.setAttribute(nodeList, 'role', 'group', true);
            }
        }
        else {
            wjcCore.addClass(node, TreeView._CEMP);
        }
        if (this.formatItem.hasHandlers) {
            this.onFormatItem(new FormatNodeEventArgs(item, node, level));
        }
    };
    TreeView.prototype._collapseToLevel = function (nodes, maxLevel, currentLevel) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node.hasPendingChildren) {
                continue;
            }
            node.isCollapsed = currentLevel >= maxLevel;
            if (node.hasChildren) {
                this._collapseToLevel(node.nodes, maxLevel, currentLevel + 1);
            }
        }
    };
    TreeView.prototype._lazyLoadNode = function (node) {
        var host = this.hostElement;
        if (!wjcCore.hasClass(host, TreeView._CLDG)) {
            wjcCore.addClass(host, TreeView._CLDG);
            wjcCore.addClass(node.element, TreeView._CLDG);
            this.lazyLoadFunction(node, this._lazyLoadCallback.bind(node));
        }
    };
    TreeView.prototype._lazyLoadCallback = function (result) {
        var node = this, tree = node.treeView;
        tree._lazyLoadNodeDone(node, result);
    };
    TreeView.prototype._lazyLoadNodeDone = function (node, result) {
        var tv = TreeView;
        wjcCore.removeClass(node.element, tv._CLDG);
        wjcCore.removeClass(this.hostElement, tv._CLDG);
        var item = node.dataItem, level = node.level, arr = wjcCore.asArray(result, true);
        if (arr == null || arr.length == 0) {
            this._itmPath.setValue(item, level, null);
            wjcCore.addClass(node.element, tv._CEMP);
        }
        else if (arr.length) {
            this._itmPath.setValue(item, level, arr);
            var nodeList = document.createElement('div'), nodeElement = node.element;
            wjcCore.addClass(nodeList, tv._CNDL);
            nodeElement.parentElement.insertBefore(nodeList, nodeElement.nextSibling);
            for (var i = 0; i < arr.length; i++) {
                this._addItem(nodeList, level + 1, arr[i]);
            }
            node.isCollapsed = false;
        }
    };
    TreeView._DATAITEM_KEY = 'wj-Data-Item';
    TreeView._AS_DLY = 600;
    TreeView._AN_DLY = 200;
    TreeView._CND = 'wj-node';
    TreeView._CNDL = 'wj-nodelist';
    TreeView._CEMP = 'wj-state-empty';
    TreeView._CNDT = 'wj-node-text';
    TreeView._CNDC = 'wj-node-check';
    TreeView._CSEL = 'wj-state-selected';
    TreeView._CCLD = 'wj-state-collapsed';
    TreeView._CCLG = 'wj-state-collapsing';
    TreeView._CLDG = 'wj-state-loading';
    TreeView.controlTemplate = '<div wj-part="root"></div>';
    return TreeView;
}(wjcCore.Control));
exports.TreeView = TreeView;
var TreeNode = (function () {
    function TreeNode(treeView, nodeElement) {
        if (wjcCore.hasClass(nodeElement, 'wj-treeview')) {
            treeView = wjcCore.Control.getControl(nodeElement);
            nodeElement = null;
        }
        else {
            TreeNode._assertNode(nodeElement);
        }
        this._t = treeView;
        this._e = nodeElement;
    }
    Object.defineProperty(TreeNode.prototype, "dataItem", {
        get: function () {
            return this._e[TreeView._DATAITEM_KEY];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "element", {
        get: function () {
            return this._e;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "treeView", {
        get: function () {
            return this._t;
        },
        enumerable: true,
        configurable: true
    });
    TreeNode.prototype.ensureVisible = function () {
        for (var p = this.parentNode; p; p = p.parentNode) {
            p.isCollapsed = false;
        }
        var host = this._t.hostElement, rco = this.element.getBoundingClientRect(), rcc = host.getBoundingClientRect();
        if (rco.bottom > rcc.bottom) {
            host.scrollTop += rco.bottom - rcc.bottom;
        }
        else if (rco.top < rcc.top) {
            host.scrollTop -= rcc.top - rco.top;
        }
    };
    TreeNode.prototype.equals = function (node) {
        return node != null && node.element == this.element;
    };
    TreeNode.prototype.select = function () {
        var tree = this._t;
        var selNode = tree._selNode;
        if (!this.equals(selNode)) {
            if (selNode) {
                wjcCore.removeClass(selNode.element, TreeView._CSEL);
            }
            tree._selNode = this;
            wjcCore.addClass(this.element, TreeView._CSEL);
            this.ensureVisible();
            if (tree.containsFocus()) {
                this.element.focus();
            }
            tree.onSelectedItemChanged();
        }
    };
    Object.defineProperty(TreeNode.prototype, "index", {
        get: function () {
            var index = 0;
            for (var p = this._pse(this.element); p; p = this._pse(p)) {
                if (TreeNode._isNode(p)) {
                    index++;
                }
            }
            return index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "parentNode", {
        get: function () {
            var parent = null;
            if (this._e) {
                var nodeList = this._e.parentElement;
                TreeNode._assertNodeList(nodeList);
                parent = this._pse(nodeList);
            }
            return parent ? new TreeNode(this._t, parent) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "level", {
        get: function () {
            var level = -1;
            for (var e = this; e; e = e.parentNode) {
                level++;
            }
            return level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "hasChildren", {
        get: function () {
            return TreeNode._isNode(this._e) && !TreeNode._isEmpty(this._e);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "hasPendingChildren", {
        get: function () {
            return this.isCollapsed && this.hasChildren &&
                !TreeNode._isNodeList(this.element.nextElementSibling) &&
                wjcCore.isFunction(this._t.lazyLoadFunction);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "nodes", {
        get: function () {
            return this.hasChildren
                ? TreeNode._getChildNodes(this._t, this._e.nextSibling)
                : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "checkBox", {
        get: function () {
            return this._e.querySelector('input.' + TreeView._CNDC);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "isCollapsed", {
        get: function () {
            return this.hasChildren && wjcCore.hasClass(this._e, TreeView._CCLD);
        },
        set: function (value) {
            if (value != this.isCollapsed) {
                var tree = this._t, e = new TreeNodeEventArgs(this);
                if (tree.onIsCollapsedChanging(e)) {
                    this.setCollapsed(wjcCore.asBoolean(value), tree.isAnimated, tree.autoCollapse);
                    tree.onIsCollapsedChanged(e);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "isChecked", {
        get: function () {
            var cb = this.checkBox;
            return cb && !cb.indeterminate
                ? cb.checked
                : null;
        },
        set: function (value) {
            if (value != this.isChecked) {
                var tree = this._t, e = new TreeNodeEventArgs(this);
                if (tree.onIsCheckedChanging(e)) {
                    this.setChecked(wjcCore.asBoolean(value), true);
                    tree.onIsCheckedChanged(e);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "isDisabled", {
        get: function () {
            return this._e && this._e.getAttribute('disabled') != null;
        },
        set: function (value) {
            value = wjcCore.asBoolean(value, true);
            if (value != this.isDisabled) {
                wjcCore.enable(this._e, !value);
            }
        },
        enumerable: true,
        configurable: true
    });
    TreeNode.prototype.previous = function (visible, enabled) {
        var prev = this._pse(this._e);
        if (!prev && TreeNode._isNodeList(this._e.parentElement)) {
            prev = this._pse(this._e.parentElement);
        }
        if (TreeNode._isNodeList(prev)) {
            while (TreeNode._isNodeList(prev) && prev.childElementCount) {
                prev = prev.lastChild;
            }
            if (TreeNode._isNodeList(prev)) {
                prev = this._pse(prev);
            }
        }
        var node = TreeNode._isNode(prev) ? new TreeNode(this._t, prev) : null;
        if (visible && node && !node.element.offsetHeight) {
            node = node.previous(visible, enabled);
        }
        if (enabled && node && node.isDisabled) {
            node = node.previous(visible, enabled);
        }
        return node;
    };
    TreeNode.prototype.next = function (visible, enabled) {
        var next = this._e.nextSibling;
        if (TreeNode._isNodeList(next)) {
            next = next.childElementCount
                ? next.firstChild
                : next.nextSibling;
        }
        if (!next) {
            for (var e = this._e.parentElement; !next && TreeNode._isNodeList(e); e = e.parentElement) {
                next = e.nextSibling;
            }
        }
        var node = TreeNode._isNode(next) ? new TreeNode(this._t, next) : null;
        if (visible && node && !node.element.offsetHeight) {
            node = node.next(visible, enabled);
        }
        if (enabled && node && node.isDisabled) {
            node = node.next(visible, enabled);
        }
        return node;
    };
    TreeNode.prototype.previousSibling = function () {
        var prev = this._pse(this.element);
        if (TreeNode._isNodeList(prev)) {
            prev = this._pse(prev);
        }
        return prev ? new TreeNode(this._t, prev) : null;
    };
    TreeNode.prototype.nextSibling = function () {
        var next = this.element.nextSibling;
        if (TreeNode._isNodeList(next)) {
            next = next.nextSibling;
        }
        return next ? new TreeNode(this._t, next) : null;
    };
    TreeNode.prototype.setCollapsed = function (collapsed, animate, collapseSiblings) {
        var tree = this._t, node = this._e, list = this._e.nextElementSibling, hasList = TreeNode._isNodeList(list);
        wjcCore.setAttribute(node, 'aria-expanded', hasList ? (!collapsed).toString() : null);
        if (collapsed == this.isCollapsed) {
            return;
        }
        if (!collapsed && !hasList && wjcCore.isFunction(tree.lazyLoadFunction)) {
            tree._lazyLoadNode(this);
            return;
        }
        if (animate == null) {
            animate = tree.isAnimated;
        }
        if (collapseSiblings == null) {
            collapseSiblings = tree.autoCollapse;
        }
        if (!animate) {
            wjcCore.toggleClass(node, TreeView._CCLD, collapsed);
        }
        else {
            if (hasList) {
                var h_1 = list.offsetHeight, s_1 = list.style;
                if (!collapsed) {
                    wjcCore.toggleClass(node, TreeView._CCLD, false);
                    s_1.height = s_1.opacity = '0';
                    wjcCore.animate(function (pct) {
                        if (pct >= 1) {
                            s_1.height = s_1.opacity = '';
                        }
                        else {
                            s_1.height = (pct * h_1).toFixed(0) + 'px';
                        }
                    }, TreeView._AN_DLY);
                }
                else {
                    wjcCore.toggleClass(node, TreeView._CCLG, true);
                    wjcCore.animate(function (pct) {
                        if (pct < 1) {
                            pct = 1 - pct;
                            s_1.height = (pct * h_1).toFixed(0) + 'px';
                        }
                        else {
                            s_1.height = s_1.opacity = '';
                            wjcCore.toggleClass(node, TreeView._CCLD, true);
                            wjcCore.toggleClass(node, TreeView._CCLG, false);
                        }
                    }, TreeView._AN_DLY);
                }
            }
        }
        if (!collapsed && collapseSiblings) {
            var list_1 = node.parentElement;
            if (TreeNode._isNodeList(list_1)) {
                for (var i = 0; i < list_1.children.length; i++) {
                    var sibling = list_1.children[i];
                    if (sibling != node && TreeNode._isNode(sibling)) {
                        wjcCore.toggleClass(sibling, TreeView._CCLD, true);
                        sibling.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        }
    };
    TreeNode.prototype.setChecked = function (checked, updateParent) {
        var cb = this.checkBox;
        cb.checked = checked;
        cb.indeterminate = false;
        if (this.hasChildren) {
            var nodes = this.nodes;
            for (var i = 0; i < nodes.length; i++) {
                var child = nodes[i];
                child.setChecked(checked, false);
            }
        }
        if (updateParent) {
            var parent_1 = this.parentNode;
            if (parent_1) {
                parent_1._updateCheckedState();
            }
        }
    };
    TreeNode.prototype.remove = function () {
        var tree = this._t, parent = this.parentNode, arr = this._getArray(), index = arr.indexOf(this.dataItem);
        if (tree.selectedNode == this) {
            var newSel = this.nextSibling() || this.previousSibling() || this.parentNode;
            if (newSel) {
                tree.selectedNode = newSel;
            }
        }
        wjcCore.removeChild(this.element);
        if (parent) {
            parent._updateState();
        }
        arr.splice(index, 1);
        this._t = null;
    };
    TreeNode.prototype.addChildNode = function (index, dataItem) {
        var nd = this._t._createNode(dataItem);
        var nodes = this.nodes;
        if (!nodes) {
            nd.move(this, DropPosition.Into);
        }
        else if (index < nodes.length) {
            nd.move(nodes[index], DropPosition.Before);
        }
        else {
            nd.move(nodes[nodes.length - 1], DropPosition.After);
        }
        return nd;
    };
    TreeNode.prototype.refresh = function (dataItem) {
        var arr = this._getArray();
        if (dataItem) {
            arr[this.index] = dataItem;
        }
        dataItem = arr[this.index];
        var newNode = this._t._createNode(dataItem);
        var nodeList = this.hasChildren && !this.hasPendingChildren
            ? this.element.nextSibling
            : null;
        if (nodeList) {
            wjcCore.removeChild(nodeList);
        }
        nodeList = newNode.hasChildren && !newNode.hasPendingChildren
            ? newNode.element.nextSibling
            : null;
        if (nodeList) {
            this.element.parentElement.insertBefore(nodeList, this.element.nextSibling);
        }
        this.element.innerHTML = newNode.element.innerHTML;
        this._updateState();
    };
    TreeNode.prototype.move = function (refNode, position) {
        if (refNode instanceof TreeNode && this._contains(refNode)) {
            return false;
        }
        var parentOld = this.parentNode, arrOld = this._getArray();
        this._moveElements(refNode, position);
        var parentNew = this.parentNode, arrNew = this._getArray();
        if (parentOld) {
            parentOld._updateState();
        }
        if (parentNew) {
            parentNew._updateState();
        }
        var item = this.dataItem, index = arrOld.indexOf(item);
        arrOld.splice(index, 1);
        arrNew.splice(this.index, 0, item);
        if (refNode.treeView) {
            this._t = refNode.treeView;
        }
        return true;
    };
    Object.defineProperty(TreeNode.prototype, "itemsSource", {
        get: function () {
            return this._getArray();
        },
        enumerable: true,
        configurable: true
    });
    TreeNode.prototype._pse = function (e) {
        return e.previousElementSibling;
    };
    TreeNode.prototype._contains = function (node) {
        for (; node; node = node.parentNode) {
            if (node.element == this.element) {
                return true;
            }
        }
        return false;
    };
    TreeNode.prototype._getArray = function () {
        var tree = this._t, parent = this.parentNode, arr = tree.itemsSource;
        if (parent) {
            var path = tree._itmPath;
            arr = path.getValue(parent.dataItem, this.level);
            if (!arr) {
                arr = [];
                path.setValue(parent.dataItem, this.level, arr);
            }
        }
        return arr;
    };
    TreeNode.prototype._moveElements = function (refNode, position) {
        var frag = document.createDocumentFragment(), nodeList = this.hasChildren && !this.hasPendingChildren
            ? this.element.nextSibling
            : null;
        frag.appendChild(this.element);
        if (nodeList) {
            TreeNode._assertNodeList(nodeList);
            frag.appendChild(nodeList);
        }
        if (refNode instanceof TreeView) {
            refNode._root.insertBefore(frag, null);
            return;
        }
        var ref = refNode.element, parent = (ref ? ref.parentElement : refNode.treeView._root);
        TreeNode._assertNodeList(parent);
        var dp = DropPosition;
        switch (position) {
            case dp.Before:
                parent.insertBefore(frag, ref);
                break;
            case dp.After:
                refNode = refNode.nextSibling();
                ref = refNode ? refNode.element : null;
                parent.insertBefore(frag, ref);
                break;
            case dp.Into:
                if (!refNode.hasChildren || refNode.hasPendingChildren) {
                    nodeList = document.createElement('div');
                    wjcCore.addClass(nodeList, TreeView._CNDL);
                    parent.insertBefore(nodeList, ref.nextSibling);
                }
                parent = refNode.element.nextSibling;
                TreeNode._assertNodeList(parent);
                parent.insertBefore(frag, null);
                break;
        }
    };
    TreeNode.prototype._updateState = function () {
        this._updateEmptyState();
        this._updateCheckedState();
    };
    TreeNode.prototype._updateEmptyState = function () {
        var nodeList = this.element.nextSibling, hasChildren = false;
        if (TreeNode._isNodeList(nodeList)) {
            if (nodeList.childElementCount) {
                hasChildren = true;
            }
            else {
                wjcCore.removeChild(nodeList);
            }
        }
        wjcCore.toggleClass(this.element, TreeView._CEMP, !hasChildren);
        if (!hasChildren) {
            this.element.removeAttribute('aria-expanded');
        }
    };
    TreeNode.prototype._updateCheckedState = function () {
        var cb = this.checkBox, nodes = this.nodes, checked = 0, unchecked = 0;
        if (cb && nodes) {
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                switch (node.isChecked) {
                    case true:
                        checked++;
                        break;
                    case false:
                        unchecked++;
                        break;
                }
            }
            if (checked == nodes.length) {
                cb.checked = true;
                cb.indeterminate = false;
            }
            else if (unchecked == nodes.length) {
                cb.checked = false;
                cb.indeterminate = false;
            }
            else {
                cb.checked = false;
                cb.indeterminate = true;
            }
        }
        var parent = this.parentNode;
        if (parent) {
            parent._updateCheckedState();
        }
    };
    TreeNode._getChildNodes = function (treeView, nodeList) {
        TreeNode._assertNodeList(nodeList);
        var arr = [];
        if (TreeNode._isNodeList(nodeList)) {
            var children = nodeList.children;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (TreeNode._isNode(child)) {
                    arr.push(new TreeNode(treeView, child));
                }
            }
        }
        return arr;
    };
    TreeNode._isNode = function (e) {
        return e && wjcCore.hasClass(e, TreeView._CND);
    };
    TreeNode._isNodeList = function (e) {
        return e && wjcCore.hasClass(e, TreeView._CNDL);
    };
    TreeNode._isEmpty = function (node) {
        return TreeNode._isNode(node) && wjcCore.hasClass(node, TreeView._CEMP);
    };
    TreeNode._isCollapsed = function (node) {
        return TreeNode._isNode(node) && !TreeNode._isEmpty(node) && wjcCore.hasClass(node, TreeView._CCLD);
    };
    TreeNode._assertNode = function (node) {
        wjcCore.assert(TreeNode._isNode(node), 'node expected');
    };
    TreeNode._assertNodeList = function (nodeList) {
        wjcCore.assert(TreeNode._isNodeList(nodeList), 'nodeList expected');
    };
    return TreeNode;
}());
exports.TreeNode = TreeNode;
var FormatNodeEventArgs = (function (_super) {
    __extends(FormatNodeEventArgs, _super);
    function FormatNodeEventArgs(dataItem, element, level) {
        var _this = _super.call(this) || this;
        _this._data = dataItem;
        _this._e = wjcCore.asType(element, HTMLElement);
        _this._level = level;
        return _this;
    }
    Object.defineProperty(FormatNodeEventArgs.prototype, "dataItem", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormatNodeEventArgs.prototype, "element", {
        get: function () {
            return this._e;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormatNodeEventArgs.prototype, "level", {
        get: function () {
            return this._level;
        },
        enumerable: true,
        configurable: true
    });
    return FormatNodeEventArgs;
}(wjcCore.EventArgs));
exports.FormatNodeEventArgs = FormatNodeEventArgs;
var TreeNodeEventArgs = (function (_super) {
    __extends(TreeNodeEventArgs, _super);
    function TreeNodeEventArgs(node) {
        var _this = _super.call(this) || this;
        _this._node = node;
        return _this;
    }
    Object.defineProperty(TreeNodeEventArgs.prototype, "node", {
        get: function () {
            return this._node;
        },
        enumerable: true,
        configurable: true
    });
    return TreeNodeEventArgs;
}(wjcCore.CancelEventArgs));
exports.TreeNodeEventArgs = TreeNodeEventArgs;
var TreeNodeDragDropEventArgs = (function (_super) {
    __extends(TreeNodeDragDropEventArgs, _super);
    function TreeNodeDragDropEventArgs(dragSource, dropTarget, position) {
        var _this = _super.call(this) || this;
        _this._src = wjcCore.asType(dragSource, TreeNode);
        _this._tgt = wjcCore.asType(dropTarget, TreeNode);
        _this._pos = position;
        return _this;
    }
    Object.defineProperty(TreeNodeDragDropEventArgs.prototype, "dragSource", {
        get: function () {
            return this._src;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNodeDragDropEventArgs.prototype, "dropTarget", {
        get: function () {
            return this._tgt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNodeDragDropEventArgs.prototype, "position", {
        get: function () {
            return this._pos;
        },
        set: function (value) {
            this._pos = wjcCore.asEnum(value, DropPosition);
        },
        enumerable: true,
        configurable: true
    });
    return TreeNodeDragDropEventArgs;
}(wjcCore.CancelEventArgs));
exports.TreeNodeDragDropEventArgs = TreeNodeDragDropEventArgs;
var DropPosition;
(function (DropPosition) {
    DropPosition[DropPosition["Before"] = 0] = "Before";
    DropPosition[DropPosition["After"] = 1] = "After";
    DropPosition[DropPosition["Into"] = 2] = "Into";
})(DropPosition = exports.DropPosition || (exports.DropPosition = {}));
;
var _TreeDragDropManager = (function () {
    function _TreeDragDropManager(treeView) {
        this._tree = wjcCore.asType(treeView, TreeView);
        this._dragstartBnd = this._dragstart.bind(this);
        this._dragoverBnd = this._dragover.bind(this);
        this._dropBnd = this._drop.bind(this);
        this._dragendBnd = this._dragend.bind(this);
        var tree = this._tree, host = tree.hostElement;
        tree.addEventListener(host, 'dragstart', this._dragstartBnd);
        tree.addEventListener(host, 'dragover', this._dragoverBnd);
        tree.addEventListener(host, 'dragleave', this._dragoverBnd);
        tree.addEventListener(host, 'drop', this._dropBnd);
        tree.addEventListener(host, 'dragend', this._dragendBnd);
        tree.addEventListener(host, 'keydown', this._keydown);
    }
    _TreeDragDropManager.prototype.dispose = function () {
        var tree = this._tree, host = tree.hostElement;
        tree.removeEventListener(host, 'dragstart', this._dragstartBnd);
        tree.removeEventListener(host, 'dragover', this._dragoverBnd);
        tree.removeEventListener(host, 'dragleave', this._dragoverBnd);
        tree.removeEventListener(host, 'drop', this._dropBnd);
        tree.removeEventListener(host, 'dragend', this._dragendBnd);
        tree.removeEventListener(host, 'keydown', this._keydown);
        this._showDragMarker();
    };
    _TreeDragDropManager.prototype._dragstart = function (e) {
        if (!e.defaultPrevented) {
            var tree = this._tree, target = wjcCore.closestClass(e.target, TreeView._CND), ddm = _TreeDragDropManager;
            ddm._drgSrc = TreeNode._isNode(target) ? new TreeNode(tree, target) : null;
            if (ddm._drgSrc) {
                var ee = new TreeNodeEventArgs(ddm._drgSrc);
                if (!tree.onDragStart(ee)) {
                    ddm._drgSrc = null;
                }
            }
            if (ddm._drgSrc && e.dataTransfer) {
                wjcCore._startDrag(e.dataTransfer, 'copyMove');
                e.stopPropagation();
            }
            else {
                e.preventDefault();
            }
        }
    };
    _TreeDragDropManager.prototype._dragover = function (e) {
        this._handleDragDrop(e, false);
    };
    _TreeDragDropManager.prototype._drop = function (e) {
        this._handleDragDrop(e, true);
    };
    _TreeDragDropManager.prototype._dragend = function (e) {
        _TreeDragDropManager._drgSrc = null;
        this._showDragMarker();
        this._tree.onDragEnd();
    };
    _TreeDragDropManager.prototype._keydown = function (e) {
        if (!e.defaultPrevented) {
            if (e.keyCode == wjcCore.Key.Escape) {
                this._dragendBnd(null);
            }
        }
    };
    _TreeDragDropManager.prototype._handleDragDrop = function (e, drop) {
        var tree = this._tree, ddm = _TreeDragDropManager, ee, dp = DropPosition, pos = dp.Into, rc;
        if (!e.defaultPrevented && ddm._drgSrc) {
            var element = document.elementFromPoint(e.clientX, e.clientY), target = wjcCore.closestClass(element, TreeView._CND);
            if (target == null) {
                var tt = wjcCore.Control.getControl(wjcCore.closest(element, '.wj-treeview'));
                if (tt instanceof TreeView && tt.totalItemCount == 0) {
                    target = tt.hostElement;
                }
            }
            if (target == ddm._drgSrc.element) {
                target = null;
            }
            if (target) {
                rc = target.getBoundingClientRect();
                var targetNode = new TreeNode(tree, target), szCheck = targetNode.hasPendingChildren ? rc.height / 2 : rc.height / 3;
                if (targetNode.element == null) {
                    rc = wjcCore.Rect.fromBoundingRect(rc);
                    rc.inflate(-12, -12);
                    pos = dp.Before;
                }
                else if (e.clientY < rc.top + szCheck) {
                    pos = dp.Before;
                }
                else if (e.clientY > rc.bottom - szCheck || targetNode.hasPendingChildren) {
                    pos = dp.After;
                    if (targetNode.hasChildren && !targetNode.isCollapsed && !targetNode.hasPendingChildren) {
                        pos = dp.Before;
                        targetNode = targetNode.next(true, false);
                        target = targetNode.element;
                        rc = target.getBoundingClientRect();
                    }
                }
                if (ddm._drgSrc._contains(targetNode)) {
                    target = null;
                }
                else {
                    ee = new TreeNodeDragDropEventArgs(ddm._drgSrc, targetNode, pos);
                    ee.cancel = ddm._drgSrc.treeView != targetNode.treeView;
                    if (!tree.onDragOver(ee)) {
                        target = null;
                    }
                }
            }
            if (target) {
                pos = ee.position;
                if (pos == dp.Before) {
                    var next = ee.dragSource.next(true, false);
                    if (next && next.element == target) {
                        target = null;
                    }
                }
                else if (pos == dp.After) {
                    var prev = ee.dragSource.previous(true, false);
                    if (prev && prev.element == target) {
                        target = null;
                    }
                }
            }
            if (target && !drop) {
                e.dataTransfer.dropEffect = 'move';
                e.preventDefault();
                e.stopPropagation();
                this._showDragMarker(rc, pos);
            }
            else {
                this._showDragMarker();
            }
            if (target && drop) {
                if (tree.onDrop(ee)) {
                    tree.hostElement.focus();
                    var src = ee.dragSource;
                    src.move(ee.dropTarget, ee.position);
                    src.select();
                }
            }
        }
    };
    _TreeDragDropManager.prototype._showDragMarker = function (rc, pos) {
        var tree = this._tree, parent = _TreeDragDropManager._dMarker.parentElement;
        if (rc) {
            var rcHost = tree.hostElement.getBoundingClientRect(), top_1 = pos == DropPosition.After ? rc.bottom : rc.top, css = {
                top: Math.round(top_1 - rcHost.top + tree.hostElement.scrollTop - 2),
                width: '75%',
                height: pos == DropPosition.Into ? rc.height : 4,
                opacity: pos == DropPosition.Into ? '0.15' : ''
            };
            if (tree.rightToLeft) {
                css.right = Math.round(rcHost.right - rc.right);
            }
            else {
                css.left = Math.round(rc.left - rcHost.left);
            }
            wjcCore.setCss(_TreeDragDropManager._dMarker, css);
            if (parent != tree._root) {
                tree._root.appendChild(_TreeDragDropManager._dMarker);
            }
        }
        else {
            if (parent) {
                parent.removeChild(_TreeDragDropManager._dMarker);
            }
        }
    };
    _TreeDragDropManager._dMarker = wjcCore.createElement('<div class="wj-marker">&nbsp;</div>');
    return _TreeDragDropManager;
}());
exports._TreeDragDropManager = _TreeDragDropManager;
var _BindingArray = (function () {
    function _BindingArray(path) {
        this.path = path;
    }
    Object.defineProperty(_BindingArray.prototype, "path", {
        get: function () {
            return this._path;
        },
        set: function (value) {
            this._path = value;
            if (wjcCore.isString(value)) {
                this._bindings = [
                    new wjcCore.Binding(value)
                ];
            }
            else if (wjcCore.isArray(value)) {
                this._bindings = [];
                for (var i = 0; i < value.length; i++) {
                    this._bindings.push(new wjcCore.Binding(value[i]));
                }
            }
            else if (value != null) {
                wjcCore.assert(false, 'Path should be a string or an array of strings.');
            }
            this._maxLevel = this._bindings ? this._bindings.length - 1 : -1;
        },
        enumerable: true,
        configurable: true
    });
    _BindingArray.prototype.getValue = function (dataItem, level) {
        var index = Math.min(level, this._maxLevel);
        return index > -1 ? this._bindings[index].getValue(dataItem) : null;
    };
    _BindingArray.prototype.setValue = function (dataItem, level, value) {
        var index = Math.min(level, this._maxLevel);
        if (index > -1) {
            this._bindings[index].setValue(dataItem, value);
        }
    };
    return _BindingArray;
}());
exports._BindingArray = _BindingArray;
//# sourceMappingURL=wijmo.nav.js.map
