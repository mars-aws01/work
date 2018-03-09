var popover = {};
popover.obj = function () {
    this.defaults = {
        template: '<div class="popover"><div class="popover-title"></div><div class="popover-content"><div class="arrow"></div></div></div>',
        trigger: 'hover,joint',
        title: '',
        content: ''
    };
    var targetSelecter = typeof arguments[0] === 'object' && arguments[0].target ? arguments[0].target : arguments[0],
        options = $.extend({}, this.defaults, typeof arguments[0] === 'object' && arguments[0].target ? arguments[0] : ''),
        element = typeof targetSelecter === 'object' ? targetSelecter : $(targetSelecter),
        popover = this;

    this.init = function () {
        var triggers = (element.attr('popover-trigger') || options.trigger).split(','), self = this;
        $.each(triggers, function () {
            self.actions[this.toString()] && self.actions[this.toString()]();
        });
    }

    this.assign = function () {
        options.title = element.attr('popover-title') || element.children().attr('popover-title') || options.title;
        options.content = element.attr('popover-content') || element.children().attr('popover-content') || options.content || '&nbsp;';
        options.single = element.attr('single') || element.children().attr('single') || options.single || true;
        options.region = element.attr('popover-region') || element.children().attr('popover-region') || options.region || 'right';
    }

    this.actions = {
        hover: function () {
            var popObj, handler = this.evtHandler, removePop = this.removePop;
            element.hover(function () {
                handler(function (pop) {
                    popObj = pop;
                    if (options.trigger.indexOf('joint') >= 0) {
                        removePop(pop)
                    }
                })
            }, function () {
                if (options.trigger.indexOf('joint') < 0)
                    popObj && popObj.remove();
            });
        },
        click: function () {
            var removePop = this.removePop, handler = this.evtHandler, popObj = null;
            element.click(function () {
                if (options.trigger.indexOf('joint') >= 0) {
                    handler(function (pop) {
                        removePop(pop);
                    })
                }
                else {
                    if (!popObj) {
                        popObj = handler();
                        popObj.click(function () { return false; });
                    }
                    else { popObj.remove(); popObj = null; }
                }
                return false;
            });

            $(document).click(function () { popObj = null; });
        },
        evtHandler: function (callback) {
            popover.assign();
            var self = popover.actions;
            if (options.single) $('.popover').hide().remove();
            var pop = popover.popObj = self.newPop();
            if (pop) self.addPop(pop);
            callback && callback(pop);
            $(document).click(function () {
                var selected = document.all ? document.selection.createRange().text : document.getSelection();
                if (selected.toString()) return false;
                pop.remove();
            });
            return pop;
        },
        newPop: function () {
            return popover.view.render($(options.template));
        },
        addPop: function (obj) {
            obj.appendTo(document.body)
            popover.view.afterLoad(obj);
            obj.show();
        },
        removePop: function (obj) {
            element.click(function () { return false; });
            obj && obj.mouseleave && obj.mouseleave(function () {
                obj.remove();
                return false;
            })
        }
    }

    this.view = {
        isOnNorth: function () {
            return options.region === 'top' || false;
        },
        isOnSouth: function () {
            return options.region === 'bottom' || false;
        },
        isOnWest: function () {
            return options.region === 'left' || false;
        },
        isOnEast: function () {
            return options.region === 'right' || true;
        },
        render: function (pop) {
            this.title(pop);
            this.content(pop);

            return pop;
        },
        region: function () {
            if (this.isOnNorth())
                return 'top';
            else if (this.isOnSouth())
                return 'bottom'
            else if (this.isOnWest())
                return 'left'
            else if (this.isOnEast())
                return 'right'
        },
        afterLoad: function (pop) {
            var arrowHeight = 15,
                arrowSize = 15,
                contentPadding = 9,
                titleAndPaddingHeight = options.title && 35 || 0,
                popWidth = options.width || pop.outerWidth() || 300;
            var position = {
                top: {
                    x: element.offset().left - (popWidth - element.outerWidth()) / 2 + arrowSize / 2 - 1,
                    y: element.offset().top - pop.outerHeight() - arrowSize
                },
                left: {
                    x: element.offset().left - popWidth - arrowSize,
                    y: element.offset().top - titleAndPaddingHeight - element.outerHeight() / 2
                },
                right: {
                    x: element.offset().left + element.outerWidth() + arrowSize,
                    y: element.offset().top - titleAndPaddingHeight - element.outerHeight() / 2
                },
                bottom: {
                    x: element.offset().left - (popWidth - element.outerWidth()) / 2 + arrowSize / 2 - 1,
                    y: element.offset().top + element.outerHeight() + arrowSize
                }
            },
            pos = position[this.region()];

            pop.css({
                left: pos.x + 'px',
                top: pos.y + 'px'
            })

            this.arrow(pop, { arrowSize: arrowSize, arrowHeight: arrowHeight, titleHeight: titleAndPaddingHeight, contentPadding: contentPadding })
        },
        title: function (pop) {
            if (options.title) {
                pop.children('.popover-title').html(options.title);
                pop.children('.popover-title').attr({
                    title: options.title
                });
            }
            else pop.children('.popover-title').remove();
        },
        content: function (pop) {
            var content = pop.children('.popover-content'), arrow = content.children('.arrow');
            if (arrow.length)
                content.html(content.html() + options.content);
            else arrow.appendTo(content);
        },
        arrow: function (pop, cfg) {
            var region = this.region(), title = pop.children('.popover-title'),
                content = pop.children('.popover-content'),
                arrow = pop.find('.arrow'), position = {
                    top: {
                        x: pop.outerWidth() / 2 - cfg.arrowHeight,
                        y: pop.outerHeight() + cfg.arrowSize - 1,
                        color: ''
                    },
                    left: {
                        x: pop.offset().left + pop.outerWidth() + cfg.arrowSize - 1,
                        //由于旋转后的 0 0坐标值需要加上箭头的高度，所以计算方式和right会有所不同
                        y: cfg.titleHeight + element.outerHeight() + cfg.arrowHeight / 2 - 1
                    },
                    bottom: {
                        x: pop.outerWidth() / 2,
                        y: 0 - cfg.arrowSize
                    },
                    right: {
                        x: 0 - cfg.arrowSize,
                        y: cfg.titleHeight + element.outerHeight() - cfg.arrowHeight / 2 - 2
                    }
                }, pos = position[region];
            arrow.addClass('arrow-' + region);

            pos && arrow.css({
                left: pos.x + 'px',
                top: pos.y + 'px'
            });
        }
    }

    this.render = function () {
        this.init();
    }
}
popover.create = function () {
    var cfg = arguments[0],
        options = typeof cfg == 'object' && cfg.target ? cfg.target : cfg

    if (typeof options == 'string') {
        var eles = $(options);
        eles.each(function () {
            new popover.obj($.extend({}, cfg, { target: $(this) })).render();
        })
    }
    else new popover.obj(arguments[0]).render();
}