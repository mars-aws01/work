(function ($) {

  var _original = $.fn.modal.Constructor.prototype.backdrop;

  $.extend($.fn.modal.Constructor.prototype, {
    backdrop: function (callback) {
      var self = this;
      _original.call(this, function () {
        if (self.$backdrop) {
          self.$backdrop.appendTo(self.$element.parent());
        }        
        callback && callback();
      });
    }
  });
})(jQuery);
